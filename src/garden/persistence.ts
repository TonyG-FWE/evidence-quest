import {validConversations} from './conversation.js';
import {earlierGathering,validGathering,gatheringInstruction} from './gathering.js';
import {earlierBakery,validBakery,bakeryInstruction} from './bakery.js';
import {GardenStore,initialGarden,walkable,bridgeReady,reaches,blocksFerryLane,STAGED_SECTIONS,type Chapter,type GardenState} from './model.js';
import {earlierMara,validMara} from './mara.js';
import {freshStory,validStory} from './chapter.js';
import {earlierRiver,validRiver,anchoredSection} from './river.js';
export const DB_NAME='evidence-quest-garden-adventure-v1';
interface Envelope {format:1;content:'garden-chapter-3';revision:number;writer:string;payload:Chapter;checksum:string;}
export function checksum(value:string){let hash=2166136261;for(let i=0;i<value.length;i++){hash^=value.charCodeAt(i);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(16);}
export function validChapter(value:unknown):value is Chapter{return validData(value,false);}
function validData(value:unknown,legacyLayout:boolean):value is Chapter{
 if(!value||typeof value!=='object')return false;const c=value as Chapter;
 const point=(p:unknown)=>!!p&&typeof p==='object'&&Number.isFinite((p as {x:number}).x)&&Number.isFinite((p as {z:number}).z)&&Math.abs((p as {x:number}).x)<20&&Math.abs((p as {z:number}).z)<20;
 if(!(c.version===3&&c.content==='garden-chapter-3'&&validStory(c.story)&&['west','east'].includes(c.ferrySide)&&typeof c.runId==='string'&&c.runId.length>0&&Number.isSafeInteger(c.revision)&&c.revision>=0&&point(c.pip)&&point(c.sections?.a)&&point(c.sections?.b)&&Number.isFinite(c.sections.a.rotation)&&Number.isFinite(c.sections.b.rotation)&&['pip','boat','grandma','soil'].includes(c.seed)&&['mara','pip','grandma'].includes(c.page)&&['started','joined','west','east','crossed','bloomed','maraHeard','grandmaHeard','reducedMotion','largeText'].every(k=>typeof c[k as keyof Chapter]==='boolean')&&[c.exposed,c.assistance,c.history].every(a=>Array.isArray(a)&&a.length<5000&&a.every(v=>typeof v==='string'))&&!!c.reading&&!Array.isArray(c.reading)&&typeof c.reading==='object'&&Object.values(c.reading).every(p=>Number.isFinite(p)&&p>=0)))return false;
 const a=c.sections.a,b=c.sections.b;
 return validConversations(c)&&validGathering(c)&&validBakery(c)&&validMara(c)&&validRiver(c)&&[a,b].every(p=>Math.abs(p.x)<=(legacyLayout?3:5)&&p.z>=-3.5&&p.z<=4.2&&p.rotation>=0&&p.rotation<Math.PI*2&&Math.abs(Math.sin(p.rotation*2))<.01&&(legacyLayout||!blocksFerryLane(p)))&&(!c.joined||(Math.abs(a.z-b.z)<.001&&Math.abs(Math.abs(a.x-b.x)-1.55)<.001&&a.rotation===b.rotation))&&walkable(c,c.pip)&&(!c.bloomed||c.seed==='soil')&&(!c.grandmaHeard||c.page==='grandma')&&(c.page==='mara'||c.maraHeard)&&(!c.west||anchoredSection(c,'west'))&&(!c.east||anchoredSection(c,'east'))&&(!c.crossed||bridgeReady(c))&&(c.seed!=='soil'||c.crossed)&&(c.ferrySide!=='east'||c.seed!=='pip');
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
  return validChapter(c)?c:null;
 }
 if(old['version']!==1||old['content']!=='garden-encounter-1'||!Array.isArray(old['history'])||!Array.isArray(old['exposed'])||!Number.isSafeInteger(old['revision'])||Number(old['revision'])<0)return null;
 const boats=old['boats'] as Chapter['sections']|undefined;
 if(!boats?.a||!boats.b||![boats.a,boats.b].every(p=>Number.isFinite(p.x)&&Math.abs(p.x)<=3&&Number.isFinite(p.z)&&p.z>=-3.5&&p.z<=4.2&&Number.isFinite(p.rotation)))return null;
 const {boats:retired,...rest}=structuredClone(old);void retired;
 const history=old['history'] as string[],firstF=history.indexOf('F'),firstB=history.indexOf('B');
 const c={...rest,version:3,content:'garden-chapter-3',story:freshStory(),revision:Number(old['revision'])+1,sections:structuredClone(boats),ferrySide:old['seed']==='grandma'||firstF>=0&&(firstB<0||firstF<firstB)?'east':'west'} as Chapter;
 c.story.maraReported=c.grandmaHeard;
 c.river=earlierRiver(c);c.mara=earlierMara(c);c.bakery=earlierBakery(c);c.gathering=earlierGathering(c);
 if(!validData(c,true))return null;
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
  if(payload.story&&payload.story.maraPicture===undefined){payload.story.maraPicture='repair';changed=true;}
  if(payload.story&&payload.story.timeAgreed===undefined){payload.story.timeAgreed=payload.story.plan?.time??null;changed=true;}
  if(!payload.river&&payload.sections?.a&&payload.sections?.b){payload.river=earlierRiver(payload);delete payload.reading?.['opening'];delete payload.reading?.['sections'];changed=true;}
  if(!payload.mara&&payload.story){payload.mara=earlierMara(payload);changed=true;}
  if(payload.mara&&payload.mara.returnOffered===undefined){payload.mara.returnOffered=false;changed=true;}
  if(payload.mara?.scene&&payload.mara.scene.introduced===undefined){payload.mara.scene.introduced=payload.mara.scene.stage!=='ask';changed=true;}
  if(!payload.bakery&&payload.story){payload.bakery=earlierBakery(payload);changed=true;}
  if(!payload.gathering&&payload.story){payload.gathering=earlierGathering(payload);changed=true;}
  if(changed)payload.revision++;
  return validChapter(payload)?(changed?{...e,payload,checksum:checksum(JSON.stringify(payload))}:e):null;
 }
 if(!['garden-encounter-1','garden-encounter-2'].includes(e.content as string))return null;
 const payload=upgradeChapter(e.payload);return payload?{...e,content:'garden-chapter-3',payload,checksum:checksum(JSON.stringify(payload))}:null;
}
export class GardenPersistence {
 private db:Promise<IDBDatabase>;private head:Envelope|null=null;private raw:unknown=undefined;private pending:Chapter|null=null;private writing=false;private timer:ReturnType<typeof setTimeout>|null=null;private disabled=false;private previous:Envelope|null=null;
 readonly writer=crypto.randomUUID();
 constructor(private store:GardenStore,private factory:IDBFactory=indexedDB){
  this.db=new Promise((resolve,reject)=>{const request=factory.open(DB_NAME,1);request.onupgradeneeded=()=>request.result.createObjectStore('slots');request.onerror=()=>reject(Error('Storage unavailable'));request.onblocked=()=>reject(Error('Storage blocked'));request.onsuccess=()=>{request.result.onversionchange=()=>request.result.close();resolve(request.result);};});
  let last:Chapter|null=null;
  store.subscribe(()=>{const s=store.getSnapshot();if(!s.ready||s.save==='loading')return;if(last?.runId===s.chapter.runId&&last.revision===s.chapter.revision)return;last=s.chapter;this.enqueue(s.chapter);});
 }
 private async read(){const db=await this.db;return new Promise<{current:unknown;previous:unknown}>((resolve,reject)=>{const tx=db.transaction('slots','readonly'),slot=tx.objectStore('slots'),current=slot.get('current'),previous=slot.get('previous');tx.oncomplete=()=>resolve({current:current.result,previous:previous.result});tx.onabort=()=>reject(Error('Read failed'));});}
 async boot(){
  try{const records=await this.read();this.raw=records.current;this.head=unpack(records.current);this.previous=unpack(records.previous);
   if(records.current!==undefined&&!this.head){this.disabled=true;const content=(records.current as {content?:unknown})?.content;this.store.send({type:'BOOT',failure:content&&!['garden-encounter-1','garden-encounter-2','garden-chapter-3'].includes(String(content))?'version':'damaged'});return;}
   if(this.head)this.store.send({type:'BOOT',chapter:this.head.payload,pendingWrite:JSON.stringify((records.current as {payload:unknown}).payload)!==JSON.stringify(this.head.payload)});else this.store.send({type:'BOOT'});
  }catch{this.disabled=true;this.store.send({type:'BOOT',failure:'failed'});}
 }
 enqueue(chapter:Chapter){if(this.disabled)return;this.pending=structuredClone(chapter);if(this.timer)clearTimeout(this.timer);this.timer=setTimeout(()=>{this.timer=null;void this.flush();},250);}
 async flush(){
  if(this.timer){clearTimeout(this.timer);this.timer=null;}if(this.writing||!this.pending||this.disabled)return;
  const chapter=this.pending;this.pending=null;this.writing=true;this.store.send({type:'SAVE_STATUS',status:'saving'});
  try{
   const db=await this.db,expected=this.raw,revision=(this.head?.revision??0)+1;
   const envelope:Envelope={format:1,content:'garden-chapter-3',revision,writer:this.writer,payload:chapter,checksum:checksum(JSON.stringify(chapter))};
   await new Promise<void>((resolve,reject)=>{
    const tx=db.transaction('slots','readwrite'),slot=tx.objectStore('slots'),read=slot.get('current');let conflict=false;
    read.onsuccess=()=>{if(JSON.stringify(read.result)!==JSON.stringify(expected)){conflict=true;tx.abort();return;}if(unpack(expected)){slot.put(expected,'previous');if(((expected as {content:string}).content!=='garden-chapter-3'||!(expected as {payload:Chapter}).payload.gathering||!(expected as {payload:Chapter}).payload.bakery||!(expected as {payload:Chapter}).payload.river||!(expected as {payload:Chapter}).payload.mara||(expected as {payload:Chapter}).payload.mara.returnOffered===undefined||!!(expected as {payload:Chapter}).payload.mara.scene&&(expected as {payload:Chapter}).payload.mara.scene!.introduced===undefined))slot.put(expected,'archive-v'+String((expected as {payload:{version:number}}).payload.version)+'-'+chapter.runId+'-'+(expected as {revision:number}).revision);}slot.put(envelope,'current');};
    tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error(conflict?'conflict':'failed'));
   });
   this.head=envelope;this.raw=envelope;this.store.send({type:'SAVE_STATUS',status:'saved',revision:chapter.revision});
  }catch(error){const conflict=error instanceof Error&&error.message==='conflict';this.pending=this.store.getSnapshot().chapter;this.disabled=true;this.store.send({type:'SAVE_STATUS',status:conflict?'conflict':'failed'});}
  finally{this.writing=false;if(this.pending&&!this.disabled)void this.flush();}
 }
 async retry(){
  if(this.store.getSnapshot().save==='conflict'){await this.takeControl();return;}
  this.disabled=false;this.enqueue(this.store.getSnapshot().chapter);await this.flush();
 }
 async takeControl(){
  try{const records=await this.read(),current=unpack(records.current);if(!current){this.store.send({type:'SAVE_STATUS',status:'damaged'});return;}this.raw=records.current;this.head=current;this.disabled=false;this.store.send({type:'BOOT',chapter:current.payload,pendingWrite:true});this.enqueue(current.payload);await this.flush();}catch{this.store.send({type:'SAVE_STATUS',status:'failed'});}
 }
 canRestore(){return !!this.previous;}
 async restorePrevious(){if(!this.previous)return;this.disabled=false;this.store.send({type:'BOOT',chapter:this.previous.payload,pendingWrite:true});this.enqueue(this.previous.payload);await this.flush();}
 async newAdventure(){
  if(this.timer){clearTimeout(this.timer);this.timer=null;}
  if(this.writing)await new Promise<void>(resolve=>{const interval=setInterval(()=>{if(!this.writing){clearInterval(interval);resolve();}},20);});
  try{
   const db=await this.db,expected=this.raw,payload=this.store.getSnapshot().chapter,archive=unpack(expected)?{format:1,content:'garden-chapter-3',revision:(this.head?.revision??0)+1,writer:this.writer,payload,checksum:checksum(JSON.stringify(payload))}:expected;await new Promise<void>((resolve,reject)=>{const tx=db.transaction('slots','readwrite'),slot=tx.objectStore('slots'),read=slot.get('current');let conflict=false;read.onsuccess=()=>{if(JSON.stringify(read.result)!==JSON.stringify(expected)){conflict=true;tx.abort();return;}if(expected&&((expected as {content:string}).content!=='garden-chapter-3'||!(expected as {payload:Chapter}).payload.gathering||!(expected as {payload:Chapter}).payload.bakery||!(expected as {payload:Chapter}).payload.river||!(expected as {payload:Chapter}).payload.mara||(expected as {payload:Chapter}).payload.mara.returnOffered===undefined||!!(expected as {payload:Chapter}).payload.mara.scene&&(expected as {payload:Chapter}).payload.mara.scene!.introduced===undefined))slot.put(expected,'archive-v'+String((expected as {payload:{version:number}}).payload.version)+'-'+payload.runId+'-'+(expected as {revision:number}).revision);if(archive!==undefined)slot.put(archive,'archive-'+Date.now());slot.delete('current');slot.delete('previous');};tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error(conflict?'conflict':'failed'));});
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
export function sceneDescription(s:GardenState){const c=s.chapter;return 'Pip is '+(c.pip.x<0?'on the dock side of the river':'on the garden side of the river')+'. '+(c.joined?'The two wooden bridge sections are joined. ':'The two wooden bridge sections are separate. ')+(c.west?'Dock-side end fastened. ':'Dock-side end not fastened. ')+(c.east?'Garden-side end fastened. ':'Garden-side end not fastened. ')+'The separate seed boat is '+(c.seed==='boat'?'waiting for your steering or docking action':c.ferrySide==='west'?'by the dock-side bank':'by the garden-side bank')+'. The seed is '+(c.seed==='boat'?'aboard the seed boat':c.seed==='pip'?"in Pip's backpack":c.seed==='grandma'?"in Grandma's hand":'planted in the soil')+'. '+(c.page==='pip'?"Pip carries Mara's page.":c.page==='grandma'?"Grandma has Mara's page.":'Mara has her page.')+(c.bloomed?' The lantern-flower is open.':'')+' '+(gatheringInstruction(c)??(c.story.phase==='planning'?bakeryInstruction(s):c.story.grandmaCopy==='pip'?'Pip carries Grandma’s copy to Mara at the passenger dock.':'The garden keeps the stories that were shared.'));}
