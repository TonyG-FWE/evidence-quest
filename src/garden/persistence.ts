import {legacyConstruction,syncConstruction} from './bridgeConstruction.js';
import {clearExpandedBuilding,BRIDGE_GEOMETRY} from './worldLayout.js';
import {localReview} from './assets/profile.js';
import {GRANDMA_PATH_LENGTH} from './grandmaTravel.js';
import {isNarrativeEdition} from './narrativeEdition.js';
import {validHands,freshHands} from './hands.js';
import {validJournal,freshJournal} from './journal.js';
import {validConversations} from './conversation.js';
import {migrateLayout} from './layoutMigration.js';
import {earlierGathering,validGathering,gatheringInstruction} from './gathering.js';
import {earlierBakery,validBakery,bakeryInstruction} from './bakery.js';
import {GardenStore,initialGarden,walkable,bridgeReady,reaches,blocksFerryLane,STAGED_SECTIONS,type Chapter,type GardenState} from './model.js';
import {earlierMara,validMara} from './mara.js';
import {freshStory,validStory} from './chapter.js';
import {earlierRiver,validRiver,anchoredSection} from './river.js';
export const DB_NAME='evidence-quest-garden-adventure-v1';
interface Envelope {format:1;content:'garden-chapter-3';revision:number;writer:string;payload:Chapter;checksum:string;}
export type ConflictRecovery={key:string;createdAt:number;payload:Chapter;durable:boolean};
type RecoveryRecord={kind:'conflict-recovery';createdAt:number;resolved:boolean;envelope:Envelope};
export function checksum(value:string){let hash=2166136261;for(let i=0;i<value.length;i++){hash^=value.charCodeAt(i);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(16);}
export function validChapter(value:unknown):value is Chapter{return validData(value,false);}
function validData(value:unknown,legacyLayout:boolean):value is Chapter{
 if(!value||typeof value!=='object')return false;const c=value as Chapter;
 if(c.layoutVersion!==2||(c.reviewLayoutRevision!==undefined&&c.reviewLayoutRevision!==1)||!validHands(c.hands)||!validJournal(c.journal)||c.seed==='bed'&&(!c.crossed||!c.river?.soilPrepared))return false;
 const point=(p:unknown)=>!!p&&typeof p==='object'&&Number.isFinite((p as {x:number}).x)&&Number.isFinite((p as {z:number}).z)&&Math.abs((p as {x:number}).x)<30&&Math.abs((p as {z:number}).z)<30;
 if(!(c.version===3&&c.content==='garden-chapter-3'&&validStory(c.story,c)&&(c.narrativeEdition===undefined||isNarrativeEdition(c.narrativeEdition))&&['west','east'].includes(c.ferrySide)&&typeof c.runId==='string'&&c.runId.length>0&&Number.isSafeInteger(c.revision)&&c.revision>=0&&point(c.pip)&&point(c.sections?.a)&&point(c.sections?.b)&&Number.isFinite(c.sections.a.rotation)&&Number.isFinite(c.sections.b.rotation)&&['pip','boat','grandma','bed','soil'].includes(c.seed)&&['mara','pip','grandma'].includes(c.page)&&['started','joined','west','east','crossed','bloomed','maraHeard','grandmaHeard','reducedMotion','largeText'].every(k=>typeof c[k as keyof Chapter]==='boolean')&&[c.exposed,c.assistance,c.history].every(a=>Array.isArray(a)&&a.length<5000&&a.every(v=>typeof v==='string'))&&!!c.reading&&!Array.isArray(c.reading)&&typeof c.reading==='object'&&Object.values(c.reading).every(p=>Number.isFinite(p)&&p>=0)))return false;
 const a=c.sections.a,b=c.sections.b;
 // Availability derives factual observations, so admit it only after the full
 // nested chapter shape is known. Damaged envelopes must fail closed, not throw.
 if(!validConversations(c)||!validGathering(c)||!validBakery(c)||!validMara(c)||!validRiver(c)||!validJournal(c.journal,c))return false;
 return [a,b].every(p=>Math.abs(p.x)<=(legacyLayout?3:5)&&p.z>=-3.5&&p.z<=4.2&&p.rotation>=0&&p.rotation<Math.PI*2&&Math.abs(Math.sin(p.rotation*2))<.01&&(legacyLayout||!blocksFerryLane(p)))&&(!c.joined||(Math.abs(a.z-b.z)<.001&&Math.abs(Math.abs(a.x-b.x)-BRIDGE_GEOMETRY.length)<.001&&a.rotation===b.rotation))&&walkable(c,c.pip)&&(!c.bloomed||c.seed==='soil')&&(!c.grandmaHeard||c.page==='grandma')&&(c.page==='mara'||c.maraHeard)&&(!c.west||anchoredSection(c,'west'))&&(!c.east||anchoredSection(c,'east'))&&(!c.crossed||bridgeReady(c))&&(c.seed!=='soil'||c.crossed)&&(c.ferrySide!=='east'||c.seed!=='pip');
}
/** Read the old checksummed payload without writing it. Archive it atomically with the upgrade. */
export function upgradeChapter(value:unknown):Chapter|null{
 if(!value||typeof value!=='object')return null;
 const old=value as Record<string,unknown>;
 if(old['version']===2&&old['content']==='garden-encounter-2'){
  const c={...structuredClone(old),version:3,content:'garden-chapter-3',revision:Number(old['revision'])+1,story:freshStory()} as Chapter;
  c.story.maraReported=c.grandmaHeard;
  c.river=earlierRiver(c);c.mara=earlierMara(c);c.bakery=earlierBakery(c);c.gathering=earlierGathering(c);
  // The old completed encounter is only the beginning of the full chapter.
  c.hands??=freshHands();c.journal??=freshJournal();try{migrateLayout(c);c.river.construction??=legacyConstruction(c);syncConstruction(c);}catch{return null;}return validChapter(c)?c:null;
 }
 if(old['version']!==1||old['content']!=='garden-encounter-1'||!Array.isArray(old['history'])||!Array.isArray(old['exposed'])||!Number.isSafeInteger(old['revision'])||Number(old['revision'])<0)return null;
 const boats=old['boats'] as Chapter['sections']|undefined;
 if(!boats?.a||!boats.b||![boats.a,boats.b].every(p=>Number.isFinite(p.x)&&Math.abs(p.x)<=3&&Number.isFinite(p.z)&&p.z>=-3.5&&p.z<=4.2&&Number.isFinite(p.rotation)))return null;
 const {boats:retired,...rest}=structuredClone(old);void retired;
 const history=old['history'] as string[],firstF=history.indexOf('F'),firstB=history.indexOf('B');
 const c={...rest,version:3,content:'garden-chapter-3',story:freshStory(),revision:Number(old['revision'])+1,sections:structuredClone(boats),ferrySide:old['seed']==='grandma'||firstF>=0&&(firstB<0||firstF<firstB)?'east':'west'} as Chapter;
 c.story.maraReported=c.grandmaHeard;
 c.river=earlierRiver(c);c.mara=earlierMara(c);c.bakery=earlierBakery(c);c.gathering=earlierGathering(c);
 c.hands??=freshHands();c.journal??=freshJournal();try{migrateLayout(c);c.river.construction??=legacyConstruction(c);syncConstruction(c);}catch{return null;}if(!validData(c,true))return null;
 // Unfinished loose parts are put on the bank if they occupy the now-explicit boat channel.
 if([c.sections.a,c.sections.b].some(blocksFerryLane)){
  if(c.west||c.east||c.crossed)return null;
  if(c.joined)c.sections={a:{x:-4.575,z:2.5,rotation:0},b:{x:-3.025,z:2.5,rotation:0}};
  else for(const key of ['a','b'] as const)if(blocksFerryLane(c.sections[key]))c.sections[key]={...STAGED_SECTIONS[key]};
 }
 c.exposed=c.exposed.filter(id=>!id.startsWith('GA.SRC.BOATS.'));
 if(c.reading&&typeof c.reading==='object')delete c.reading['boats'];
 return validChapter(c)?c:null;
}
export function unpack(raw:unknown):Envelope|null{
 if(!raw||typeof raw!=='object')return null;const e=raw as Envelope;
 if(e.format!==1||!Number.isSafeInteger(e.revision)||e.revision<0||typeof e.writer!=='string'||!e.payload||typeof e.payload!=='object'||e.checksum!==checksum(JSON.stringify(e.payload)))return null;
 if(e.content==='garden-chapter-3'){
  const payload=structuredClone(e.payload);let changed=false;
  if(payload.narrativeEdition==='literary-20260916'&&payload.layoutVersion===2){const safe=clearExpandedBuilding(payload.pip);if(safe){payload.pip=safe;changed=true;}}
  if(localReview&&payload.narrativeEdition==='literary-20260916'&&payload.layoutVersion===2&&payload.reviewLayoutRevision===undefined){
   // This is the current demo's prior garden route, measured before the
   // approved bed expansion. Preserve trip phase and progress, not old metres.
   const trip=payload.river?.collection,priorLength=4.970683941232104;
   if(trip&&Number.isFinite(trip.distance)&&trip.distance>=0&&trip.distance<=priorLength+.00001)trip.distance=trip.phase==='waiting'?GRANDMA_PATH_LENGTH:Math.min(1,trip.distance/priorLength)*GRANDMA_PATH_LENGTH;
   if(payload.bakery?.stage==='escorting'){const safe=clearExpandedBuilding(payload.bakery.rina);if(safe)payload.bakery.rina=safe;}
   // Section origins, two material identities and six post IDs retain their
   // values; their source geometry and sockets share the fitted definition.
   payload.reviewLayoutRevision=1;changed=true;
  }
  if(payload.story&&payload.story.maraPicture===undefined){payload.story.maraPicture='repair';changed=true;}
  if(payload.story&&payload.story.timeAgreed===undefined){payload.story.timeAgreed=payload.story.plan?.time??null;changed=true;}
  if(!payload.river&&payload.sections?.a&&payload.sections?.b){payload.river=earlierRiver(payload);delete payload.reading?.['opening'];delete payload.reading?.['sections'];changed=true;}
  if(payload.river&&payload.river.journeyVersion===undefined){payload.river.journeyVersion=1;payload.river.collection=payload.seed==='boat'?{phase:'outbound',distance:0}:null;changed=true;}
  if(!payload.mara&&payload.story){payload.mara=earlierMara(payload);changed=true;}
  if(payload.mara&&payload.mara.returnOffered===undefined){payload.mara.returnOffered=false;changed=true;}
  if(payload.mara?.scene&&payload.mara.scene.introduced===undefined){payload.mara.scene.introduced=payload.mara.scene.stage!=='ask';changed=true;}
  if(!payload.bakery&&payload.story){payload.bakery=earlierBakery(payload);changed=true;}
  if(!payload.gathering&&payload.story){payload.gathering=earlierGathering(payload);changed=true;}
  if(!payload.hands){payload.hands=freshHands();changed=true;}if(!payload.journal){payload.journal=freshJournal();changed=true;}
  try{if(migrateLayout(payload))changed=true;}catch{return null;}
  if(payload.river&&payload.sections?.a&&payload.sections?.b&&!payload.river.construction){if(!validChapter(payload))return null;payload.river.construction=legacyConstruction(payload);syncConstruction(payload);changed=true;}
  if(changed)payload.revision++;
  return validChapter(payload)?(changed?{...e,payload,checksum:checksum(JSON.stringify(payload))}:e):null;
 }
 if(!['garden-encounter-1','garden-encounter-2'].includes(e.content as string))return null;
 const payload=upgradeChapter(e.payload);return payload?{...e,content:'garden-chapter-3',payload,checksum:checksum(JSON.stringify(payload))}:null;
}
export class GardenPersistence {
 private db:Promise<IDBDatabase>;private head:Envelope|null=null;private raw:unknown=undefined;private pending:Chapter|null=null;private writing=false;private timer:ReturnType<typeof setTimeout>|null=null;private firstPendingAt=0;private disabled=false;private previous:Envelope|null=null;
 private recovery:ConflictRecovery|null=null;
 readonly writer=crypto.randomUUID();
 constructor(private store:GardenStore,private factory:IDBFactory=indexedDB){
  this.db=new Promise((resolve,reject)=>{const request=factory.open(DB_NAME,1);request.onupgradeneeded=()=>request.result.createObjectStore('slots');request.onerror=()=>reject(Error('Storage unavailable'));request.onblocked=()=>reject(Error('Storage blocked'));request.onsuccess=()=>{request.result.onversionchange=()=>request.result.close();resolve(request.result);};});
  let last:Chapter|null=null;
  store.subscribe(()=>{const s=store.getSnapshot();if(!s.ready||s.save==='loading')return;if(last?.runId===s.chapter.runId&&last.revision===s.chapter.revision)return;last=s.chapter;this.enqueue(s.chapter);});
 }
 private async read(){const db=await this.db;return new Promise<{current:unknown;previous:unknown;recovery:ConflictRecovery|null}>((resolve,reject)=>{const tx=db.transaction('slots','readonly'),slot=tx.objectStore('slots'),current=slot.get('current'),previous=slot.get('previous'),keys=slot.getAllKeys(),all=slot.getAll();tx.oncomplete=()=>{let recovery:ConflictRecovery|null=null;for(let index=0;index<all.result.length;index++){const item=all.result[index] as Partial<RecoveryRecord>|null;if(item?.kind!=='conflict-recovery'||item.resolved||typeof item.createdAt!=='number')continue;const envelope=unpack(item.envelope);if(envelope&&(!recovery||item.createdAt>recovery.createdAt))recovery={key:String(keys.result[index]),createdAt:item.createdAt,payload:envelope.payload,durable:true};}resolve({current:current.result,previous:previous.result,recovery});};tx.onabort=()=>reject(Error('Read failed'));});}
 async boot(){
  try{const records=await this.read();this.raw=records.current;this.head=unpack(records.current);this.previous=unpack(records.previous);this.recovery=records.recovery;
   if(records.current!==undefined&&!this.head){this.disabled=true;const raw=records.current as {content?:unknown;payload?:{layoutVersion?:number;river?:{journeyVersion?:number;construction?:{version?:number}}}};this.store.send({type:'BOOT',failure:raw?.content&&!['garden-encounter-1','garden-encounter-2','garden-chapter-3'].includes(String(raw.content))||(raw?.payload?.layoutVersion??2)>2||(raw?.payload?.river?.journeyVersion??1)>1||(raw?.payload?.river?.construction?.version??1)>1?'version':'damaged'});return;}
   if(this.head)this.store.send({type:'BOOT',chapter:this.head.payload,pendingWrite:JSON.stringify((records.current as {payload:unknown}).payload)!==JSON.stringify(this.head.payload)});else this.store.send({type:'BOOT'});
  }catch{this.disabled=true;this.store.send({type:'BOOT',failure:'failed'});}
 }
 private schedule(){if(this.timer)clearTimeout(this.timer);const delay=Math.min(250,Math.max(0,1000-(Date.now()-this.firstPendingAt)));this.timer=setTimeout(()=>{this.timer=null;void this.flush();},delay);}
 enqueue(chapter:Chapter){
  if(this.disabled)return;const previous=this.pending??this.head?.payload;if(!this.pending)this.firstPendingAt=Date.now();
  // Continuous NPC/player travel must not postpone a durable checkpoint forever.
  // Possession and completed-work boundaries go to disk immediately; intermediate
  // movement is coalesced for at most one second, with a 250 ms stop debounce.
  if(previous&&(chapter.seed!==previous.seed||chapter.page!==previous.page||chapter.crossed!==previous.crossed||chapter.bloomed!==previous.bloomed||chapter.bakery.stage!==previous.bakery.stage||chapter.history.length!==previous.history.length))this.firstPendingAt=Date.now()-1000;
  this.pending=Object.isFrozen(chapter)?chapter:structuredClone(chapter);this.schedule();
 }
 async flush(){
  if(this.timer){clearTimeout(this.timer);this.timer=null;}if(this.writing||!this.pending||this.disabled)return;
  const chapter=this.pending;this.pending=null;this.firstPendingAt=0;this.writing=true;this.store.send({type:'SAVE_STATUS',status:'saving'});
  try{
   const db=await this.db,expected=this.raw,revision=(this.head?.revision??0)+1;
   const envelope:Envelope={format:1,content:'garden-chapter-3',revision,writer:this.writer,payload:chapter,checksum:checksum(JSON.stringify(chapter))};
   await new Promise<void>((resolve,reject)=>{
    const tx=db.transaction('slots','readwrite'),slot=tx.objectStore('slots'),read=slot.get('current');let conflict=false;
    read.onsuccess=()=>{if(JSON.stringify(read.result)!==JSON.stringify(expected)){conflict=true;tx.abort();return;}if(unpack(expected)){slot.put(expected,'previous');if(((expected as {content:string}).content!=='garden-chapter-3'||(expected as {payload:Chapter}).payload.layoutVersion!==2||!(expected as {payload:Chapter}).payload.hands||!(expected as {payload:Chapter}).payload.journal||!(expected as {payload:Chapter}).payload.gathering||!(expected as {payload:Chapter}).payload.bakery||(!(expected as {payload:Chapter}).payload.river?.journeyVersion||!(expected as {payload:Chapter}).payload.river?.construction)||!(expected as {payload:Chapter}).payload.river||!(expected as {payload:Chapter}).payload.mara||(expected as {payload:Chapter}).payload.mara.returnOffered===undefined||!!(expected as {payload:Chapter}).payload.mara.scene&&(expected as {payload:Chapter}).payload.mara.scene!.introduced===undefined))slot.put(expected,'archive-v'+String((expected as {payload:{version:number}}).payload.version)+'-'+chapter.runId+'-'+(expected as {revision:number}).revision);}slot.put(envelope,'current');};
    tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error(conflict?'conflict':'failed'));
   });
   this.head=envelope;this.raw=envelope;this.store.send({type:'SAVE_STATUS',status:'saved',revision:chapter.revision});
  }catch(error){const conflict=error instanceof Error&&error.message==='conflict';this.pending=this.store.getSnapshot().chapter;this.disabled=true;this.store.send({type:'SAVE_STATUS',status:conflict?'conflict':'failed'});if(conflict){try{await this.preserveConflict(this.pending);}catch{/* Retain the in-memory copy and the conflict freeze. */}this.store.send({type:'SAVE_STATUS',status:'conflict'});}}
  finally{this.writing=false;if(this.pending&&!this.disabled)this.schedule();}
 }
 async retry(){
  if(this.store.getSnapshot().save==='conflict'){await this.takeControl();return;}
  this.disabled=false;this.enqueue(this.store.getSnapshot().chapter);await this.flush();
 }
 async takeControl(){
  await this.waitForWrite();
  const conflicted=this.store.getSnapshot().save==='conflict';
  try{if(conflicted)await this.preserveConflict(this.pending??this.store.getSnapshot().chapter);const records=await this.read(),current=unpack(records.current);if(!current){this.store.send({type:'SAVE_STATUS',status:conflicted?'conflict':'damaged'});return;}this.raw=records.current;this.head=current;this.pending=null;this.disabled=false;this.store.send({type:'BOOT',chapter:current.payload,pendingWrite:true});this.enqueue(current.payload);await this.flush();}catch{this.store.send({type:'SAVE_STATUS',status:conflicted?'conflict':'failed'});}
 }
 conflictRecovery():ConflictRecovery|null{return this.recovery?{...this.recovery,payload:structuredClone(this.recovery.payload)}:null;}
 private async waitForWrite(){if(this.writing)await new Promise<void>(resolve=>{const interval=setInterval(()=>{if(!this.writing){clearInterval(interval);resolve();}},20);});}
 private async preserveConflict(payload:Chapter){
  if(!this.recovery||this.recovery.payload.runId!==payload.runId||this.recovery.payload.revision!==payload.revision)this.recovery={key:'conflict-recovery-'+Date.now()+'-'+crypto.randomUUID(),createdAt:Date.now(),payload:structuredClone(payload),durable:false};
  if(this.recovery.durable)return;
  const copy=this.recovery,record:RecoveryRecord={kind:'conflict-recovery',createdAt:copy.createdAt,resolved:false,envelope:{format:1,content:'garden-chapter-3',revision:(this.head?.revision??0)+1,writer:this.writer,payload:copy.payload,checksum:checksum(JSON.stringify(copy.payload))}};
  const db=await this.db;await new Promise<void>((resolve,reject)=>{const tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,copy.key);tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error('Recovery copy could not be saved'));});copy.durable=true;
 }
 /** Explicit recovery preserves the other window's current chapter before replacing it. */
 async recoverConflict(){
  await this.waitForWrite();
  if(!this.recovery)return;
  const copy=this.recovery,local=structuredClone(this.store.getSnapshot().chapter);this.disabled=true;if(this.timer){clearTimeout(this.timer);this.timer=null;}this.store.send({type:'SAVE_STATUS',status:'conflict'});
  try{
   await this.preserveConflict(copy.payload);const records=await this.read(),current=unpack(records.current);if(!current)throw Error('Current progress unavailable');const db=await this.db;
   const envelope:Envelope={format:1,content:'garden-chapter-3',revision:current.revision+1,writer:this.writer,payload:copy.payload,checksum:checksum(JSON.stringify(copy.payload))};
   await new Promise<void>((resolve,reject)=>{const tx=db.transaction('slots','readwrite'),slot=tx.objectStore('slots'),read=slot.get('current');read.onsuccess=()=>{if(JSON.stringify(read.result)!==JSON.stringify(records.current)){tx.abort();return;}slot.put(records.current,'archive-before-conflict-recovery-'+Date.now()+'-'+crypto.randomUUID());if(checksum(JSON.stringify(local))!==current.checksum)slot.put({format:1,content:'garden-chapter-3',revision:current.revision+1,writer:this.writer,payload:local,checksum:checksum(JSON.stringify(local))} satisfies Envelope,'archive-local-before-conflict-recovery-'+Date.now()+'-'+crypto.randomUUID());slot.put(records.current,'previous');slot.put(envelope,'current');slot.put({kind:'conflict-recovery',createdAt:copy.createdAt,resolved:true,envelope} satisfies RecoveryRecord,copy.key);};tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error('Recovery conflict'));});
   this.raw=envelope;this.head=envelope;this.previous=current;this.pending=null;this.recovery=null;this.disabled=false;this.store.send({type:'BOOT',chapter:copy.payload});
  }catch{this.store.send({type:'SAVE_STATUS',status:'conflict'});}
 }
 canRestore(){return !!this.previous;}
 async restorePrevious(){if(!this.previous)return;this.disabled=false;this.store.send({type:'BOOT',chapter:this.previous.payload,pendingWrite:true});this.enqueue(this.previous.payload);await this.flush();}
 async newAdventure(){
  if(this.timer){clearTimeout(this.timer);this.timer=null;}
  if(this.writing)await new Promise<void>(resolve=>{const interval=setInterval(()=>{if(!this.writing){clearInterval(interval);resolve();}},20);});
  try{
   const db=await this.db,expected=this.raw,payload=this.store.getSnapshot().chapter,archive=unpack(expected)?{format:1,content:'garden-chapter-3',revision:(this.head?.revision??0)+1,writer:this.writer,payload,checksum:checksum(JSON.stringify(payload))}:expected;await new Promise<void>((resolve,reject)=>{const tx=db.transaction('slots','readwrite'),slot=tx.objectStore('slots'),read=slot.get('current');let conflict=false;read.onsuccess=()=>{if(JSON.stringify(read.result)!==JSON.stringify(expected)){conflict=true;tx.abort();return;}if(expected&&(!(expected as {payload:Chapter}).payload.river?.construction||(expected as {content:string}).content!=='garden-chapter-3'||(expected as {payload:Chapter}).payload.layoutVersion!==2||!(expected as {payload:Chapter}).payload.hands||!(expected as {payload:Chapter}).payload.journal||!(expected as {payload:Chapter}).payload.gathering||!(expected as {payload:Chapter}).payload.bakery||!(expected as {payload:Chapter}).payload.river||!(expected as {payload:Chapter}).payload.mara||(expected as {payload:Chapter}).payload.mara.returnOffered===undefined||!!(expected as {payload:Chapter}).payload.mara.scene&&(expected as {payload:Chapter}).payload.mara.scene!.introduced===undefined))slot.put(expected,'archive-v'+String((expected as {payload:{version:number}}).payload.version)+'-'+payload.runId+'-'+(expected as {revision:number}).revision);if(archive!==undefined)slot.put(archive,'archive-'+Date.now());slot.delete('current');slot.delete('previous');};tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error(conflict?'conflict':'failed'));});
   this.raw=undefined;this.head=null;this.previous=null;this.pending=null;this.disabled=false;this.store.send({type:'NEW',runId:crypto.randomUUID()});await this.flush();
  }catch(error){this.disabled=true;this.store.send({type:'SAVE_STATUS',status:error instanceof Error&&error.message==='conflict'?'conflict':'failed'});}
 }
}
export function createGarden(){
 const store=new GardenStore(initialGarden(crypto.randomUUID())),saves=new GardenPersistence(store);
 const hide=()=>{store.send({type:'INTERRUPT',background:true});void saves.flush();window.speechSynthesis?.cancel();};
 const show=()=>{if(!document.hidden)store.send({type:'FOREGROUND'});};
 const visibility=()=>document.hidden?hide():show();
 document.addEventListener('visibilitychange',visibility);window.addEventListener('blur',hide);window.addEventListener('focus',show);window.addEventListener('pagehide',hide);
 void saves.boot();
 return {store,saves,dispose:()=>{document.removeEventListener('visibilitychange',visibility);window.removeEventListener('blur',hide);window.removeEventListener('focus',show);window.removeEventListener('pagehide',hide);void saves.flush();}};
}
export function sceneDescription(s:GardenState){const c=s.chapter;return 'Pip is '+(c.pip.x<0?'on the dock side of the river':'on the garden side of the river')+'. '+(c.joined?'The two wooden bridge sections are joined. ':'The two wooden bridge sections are separate. ')+(c.west?'Dock-side end fastened. ':'Dock-side end not fastened. ')+(c.east?'Garden-side end fastened. ':'Garden-side end not fastened. ')+'The separate seed boat is '+(c.seed==='boat'?'waiting for your steering or docking action':c.ferrySide==='west'?'by the dock-side bank':'by the garden-side bank')+'. The seed is '+(c.seed==='boat'?'aboard the seed boat':c.seed==='pip'?"in Pip's backpack":c.seed==='grandma'?"in Grandma's hand":c.seed==='bed'?'in the prepared spot, waiting to be covered':'planted in the soil')+'. '+(c.page==='pip'?"Pip carries Mara's page.":c.page==='grandma'?"Grandma has Mara's page.":'Mara has her page.')+(c.bloomed?' The lantern-flower is open.':'')+' '+(gatheringInstruction(c)??(c.story.phase==='planning'?bakeryInstruction(s):c.story.grandmaCopy==='pip'?'Pip carries Grandma’s copy to Mara at the passenger dock.':'The garden keeps the stories that were shared.'));}
