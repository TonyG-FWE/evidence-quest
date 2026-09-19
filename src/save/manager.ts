import type {CaseState} from '../../contracts/types.js';
import type {Store} from '../core/store.js';
import {IndexedSave,SaveError,type Head} from './indexed-db.js';

type Pending={state:CaseState;visitId:string};
/** Owns storage transactions, never gameplay. Reducer receipts own visible status. */
export class SaveManager {
 private head:Head|null=null;private enabled=false;private active=false;private pending:Pending|null=null;
 private idle:ReturnType<typeof setTimeout>|null=null;private maximum:ReturnType<typeof setTimeout>|null=null;
 private replacement:Head|null=null;private generation='';private prefQueue=Promise.resolve();
 constructor(private readonly store:Store,private readonly disk=new IndexedSave()){}
 async boot(){
  const generation=crypto.randomUUID();this.generation=generation;this.store.send({type:'BOOT_CHECK',generation});
  const preferenceRevision=this.store.getSnapshot().preferences.revision;
  const timeout=setTimeout(()=>{if(this.generation===generation){this.generation='';this.store.send({type:'BOOT',generation,status:'read-error',candidate:null});}},5000);
  try{
   const result=await this.disk.read();if(this.generation!==generation||this.store.getSnapshot().runtime.hasLiveVisit)return;
   this.head=result.head;
   if(result.preferences&&this.store.getSnapshot().preferences.revision===preferenceRevision)this.store.send({type:'LOAD_PREFS',preferences:result.preferences});
   const good=result.current.status==='valid'||result.current.status==='run';
   const previous=!good&&['valid','run'].includes(result.previous.status)?result.previous.envelope:null;
   this.enabled=result.current.status==='empty'||good;
   this.store.send({type:'BOOT',generation,status:result.current.status==='valid'?'saved':result.current.status,
    candidate:good?result.current.envelope!.payload:previous?.payload??null,preserve:!!previous,slotRevision:result.head.revision});
  }catch{if(this.generation===generation)this.store.send({type:'BOOT',generation,status:'read-error',candidate:null});}
  finally{clearTimeout(timeout);}
 }
 start(save=true){
  this.generation='';this.clearTimers();this.pending=null;
  this.enabled=save&&this.head!==null;
  this.store.send({type:'NEW_GAME',caseId:crypto.randomUUID(),visitId:crypto.randomUUID(),save:this.enabled});
 }
 restore(){
  const s=this.store.getSnapshot();this.generation='';this.enabled=!s.runtime.restorePreservesSlots;
  this.store.send({type:'RESTORE',visitId:crypto.randomUUID()});
 }
 enqueue(draft=false){
  const s=this.store.getSnapshot();if(!s.runtime.hasLiveVisit)return;
  this.pending={state:s.case,visitId:s.session.visitId};
  if(!this.enabled||s.session.saving.mode!=='normal')return;
  if(draft){if(this.idle)clearTimeout(this.idle);this.idle=setTimeout(()=>this.flush(),400);this.maximum??=setTimeout(()=>this.flush(),2000);}
  else this.flush();
 }
 private clearTimers(){if(this.idle)clearTimeout(this.idle);if(this.maximum)clearTimeout(this.maximum);this.idle=this.maximum=null;}
 private queued():Pending|null{return this.pending;}
 flush(){this.clearTimers();void this.drain();}
 private async drain(){
  if(this.active||!this.pending||!this.enabled||!this.head)return;
  const item=this.pending;this.pending=null;this.active=true;
  const token=crypto.randomUUID(),owner={caseId:item.state.caseRunId,visitId:item.visitId};
  this.store.callback({type:'SAVE_BEGIN',token,revision:item.state.revision},owner);
  try{
   this.head=await this.disk.write(item.state,item.visitId,this.head);
   this.store.callback({type:'SAVE_ACK',token,revision:item.state.revision,slotRevision:this.head.revision,...owner},owner);
  }catch(error){
   const mode=error instanceof SaveError?error.kind:'unavailable';
   this.store.callback({type:'SAVE_FAILED',token,mode},owner);
   // A retired write may finish after reset. Its failure still affects the new
   // visit's storage capability, but cannot replace its gameplay or revision.
   if(this.store.getSnapshot().case.caseRunId!==item.state.caseRunId)this.store.send({type:'SAVE_MODE',mode});
   this.enabled=false;
  }finally{
   this.active=false;
   const latest=this.queued();
   if(latest?.state.caseRunId===item.state.caseRunId&&latest.visitId===item.visitId&&latest.state.revision===item.state.revision)this.pending=null;
   if(this.pending&&this.enabled)void this.drain();
  }
 }
 async retry(){
  const mode=this.store.getSnapshot().session.saving.mode;
  if(mode==='unavailable'&&this.head){this.enabled=true;this.store.send({type:'SAVE_MODE',mode:'normal'});this.enqueue();return;}
  try{
   this.replacement=(await this.disk.read()).head;
   this.store.send({type:'VIEW',view:{page:'confirm',action:'replace',previous:{page:'world'}}});
  }catch{this.store.send({type:'SAVE_MODE',mode:'unavailable'});}
 }
 replace(){
  if(!this.replacement)return;
  this.head=this.replacement;this.replacement=null;this.enabled=true;
  this.store.send({type:'SAVE_MODE',mode:'normal'});this.store.send({type:'VIEW',view:{page:'world'}});this.enqueue();
 }
 async reset(){
  // Reset itself is explicit replacement consent. Preserve the head that the
  // user saw; CAS rejects any competing change made before commit.
  if(!this.head){try{this.head=(await this.disk.read()).head;}catch{this.start(false);return;}}
  this.start(true);
 }
 preferences(){
  const value=this.store.getSnapshot().preferences;
  this.prefQueue=this.prefQueue.then(async()=>{try{await this.disk.preferences(value);this.store.send({type:'PREF_RESULT',revision:value.revision,failed:false});}catch{this.store.send({type:'PREF_RESULT',revision:value.revision,failed:true});}});
 }
}
