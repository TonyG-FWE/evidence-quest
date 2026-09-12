import type { CaseState, Observation, Order, Point, Run } from '../../contracts/types.js';
import type { Command, Effect, Envelope } from './commands.js';
import { freeze, initialState, type State, type View } from './state.js';
import { content, parts, tileName } from './content.js';
import { available, exposed, exposedRefs, mergeSpans, sourceOf, validExposure } from './evidence.js';
import { advancePath, approaches, clearSegment, distance, findPath, legal, ownerRoom, pathLength, pathToOwner, roomData } from '../physical/navigation.js';
import { applyTile, initialPuppet, newRun, successful } from '../story/engine.js';
import {startHelp,coachingTime,receive,choose,display,cancelHelp,reconcile} from '../coach/lifecycle.js';
import { deliver, help, queueDelivery, record, talk } from './people.js';
import {newExperience,readingAvailable,wordContext,mayEncounter,supportAvailable} from './experience.js';
import {changeComparison,comparisonDraft,comparisonRefs,saveIdea,editIdea,recordMetadata,reasoning,knownRooms,questionIds,timeline,nextDoor} from './reasoning.js';

export interface Mutation {s:State;e:Envelope;effects:Effect[];caseChanged:boolean;contextChanged:boolean;nextId:number;}
export function allocate(m:Mutation):string{const id=m.e.ids[m.nextId++];if(!id)throw new Error('Command identity pool exhausted');return id;}
export const touch=(m:Mutation,context=true)=>{m.caseChanged=true;m.contextChanged ||= context;};
export function observe(m:Mutation,kind:Observation['kind'],fields:Partial<Observation>={}):number{
 const seq=++m.s.case.lastObservationSeq;
 m.s.case.observations.push({id:allocate(m),seq,visitId:m.s.session.visitId,kind,refs:[],contentIds:[],actionId:null,runId:null,cueIndex:null,recordId:null,requestId:null,outcome:null,puppet:null,assistanceLevel:null,origin:'player',interpretation:null,uncertain:false,...fields});touch(m);return seq;
}
export function grant(m:Mutation,refs:string[],access:string){
 for(const sourceId of new Set(refs.map(sourceOf))){
  const list=refs.filter(r=>sourceOf(r)===sourceId);let g=m.s.case.grants.find(g=>g.sourceId===sourceId&&g.viaAccessId===access);
  const fresh=list.filter(r=>!g?.refs.includes(r));if(!fresh.length)continue;
  const seq=observe(m,'source-available',{refs:fresh,origin:access.startsWith('NPC.')?'npc':'world'});
  if(g)g.refs.push(...fresh);else m.s.case.grants.push({sourceId,refs:fresh,viaAccessId:access,seq});
 }
}
export function caption(m:Mutation,ct:string[],slots:Record<string,string|number>={}){m.s.runtime.caption=ct;m.s.runtime.captionSlots=slots;}
export function setView(m:Mutation,view:View){
 const s=m.s;
 const hasReader=(v:View):boolean=>v.page==='reader'||!!v.previous&&hasReader(v.previous);
 if(s.case.readerResume&&!hasReader(view)){s.case.readerResume=null;touch(m,false);}
 s.runtime.view=view;s.session.heldKeys=[];
 if(view.page!=='toast'||view.action==='revealed'||view.action==='magnifier')s.runtime.toastElapsed=null;
 s.session.inputOwner=view.page==='world'?'world':view.page==='home'?'home':view.page==='confirm'?'confirmation':'task';
 const names:Partial<Record<View['page'],string>>={world:'WORLD.IDLE',home:'HOME.EMPTY',objects:'NAV.OBJECTS',map:'NAV.MAP',reader:'SOURCE.TEXT',notes:'NOTES.LIST',notice:'WORLD.OPERATING',kit:'KIT.OPEN',talk:'TALK.TOPICS',plan:'PLAN.PRIVATE',present:'PRESENT.SELECT',work:'WORK.READY',story:'STORY.DESCRIBE',help:'COACH.ENTRY',toast:'TOAST.COVERED',ending:'ENDING.CELEBRATION',confirm:'RESET.CASE',recovery:'RECOVERY.READ'};
 s.session.taskState=view.page==='world'?null:`UI.${names[view.page]??view.page.toUpperCase()}`;
 if(view.page==='compare'){const row=comparisonDraft(s.case),count=Number(!!row?.leftRef)+Number(!!row?.rightRef);s.session.taskState=`UI.COMPARE.${count===0?'EMPTY':count===1?'PARTIAL':'READY'}`;}
 if(view.page==='timeline')s.session.taskState=timeline(s.case).length?'UI.TIMELINE.KNOWN':'UI.TIMELINE.EMPTY';
 if(view.page==='idea')s.session.taskState=view.action==='recorded'?'UI.IDEA.RECORDED':'UI.IDEA.DRAFT';
 if(view.page==='picker')s.session.taskState='UI.SOURCE.PICK';
 s.session.heldTile=null;
}
export function cancelIntent(m:Mutation){m.s.runtime.intent=null;m.s.session.pendingAction=null;m.s.session.heldKeys=[];m.s.runtime.operationElapsedMs=0;}
export function settleCue(m:Mutation,reason:Run['pauseReason']=null){
 const c=m.s.case,run=c.playback,cue=run?.activeCue;if(!run)return;
 if(cue){
  const {caption:ct}=applyTile(cue.from,cue.tile);run.puppet={...cue.to};run.nextCue=cue.index+1;run.activeCue=null;
  const seq=observe(m,'cue-outcome',{runId:run.id,cueIndex:cue.index,actionId:cue.id,outcome:cue.result,puppet:{...cue.to},contentIds:[ct],origin:'world'});
  run.cueResultIds.push(m.s.case.observations.find(o=>o.seq===seq)!.id);caption(m,[ct]);
  if(cue.result==='unmet')reason??='unmet';
  if(m.s.case.experience?.narratorPauses)reason??='user';
 }
 if(reason){run.status='paused';run.pauseReason=reason;c.physical.loop.mode='docked';if(!(m.s.session.presentation==='watch'&&(reason==='unmet'||reason==='user'&&m.s.case.experience?.narratorPauses)))m.s.session.presentation='arrange';touch(m);}
}
function pause(m:Mutation,reason:Exclude<Run['pauseReason'],null>){if(m.s.case.playback?.status==='running')settleCue(m,reason);}
function startCue(m:Mutation,runId:string){
 const r=m.s.case.playback;if(!r||r.id!==runId||r.status!=='running'||r.activeCue||r.nextCue>=r.order.length)return;
 const tile=r.order[r.nextCue]!,out=applyTile(r.puppet,tile),id=allocate(m);
 r.activeCue={id,index:r.nextCue,tile,from:{...r.puppet},to:out.to,result:out.result};m.s.runtime.cueElapsedMs=0;
 observe(m,'cue-started',{runId:r.id,cueIndex:r.nextCue,actionId:id,puppet:{...r.puppet},origin:'world'});
 m.effects.push({kind:'timer',ms:m.s.preferences.motion==='reduced'?300:out.result==='unmet'?800:tile==='TILE.BRIDGE'?1400:1200,command:{type:'CUE_READY',runId:r.id,cueId:id}});
}
const ready=(c:CaseState)=>c.physical.caddyHost==='ST.RACK.BAY'&&['docked','projecting'].includes(c.physical.loop.mode);
export const atWork=(c:CaseState)=>c.physical.room==='SC.ST'&&[[78,58],[100,58]].some(p=>distance(c.physical.avatar,p as Point)<=2);
export function target(m:Mutation,id:string,action='default',destination?:CaseState['physical']['room']){
 const s=m.s,returnView=['kit','work','talk','notes'].includes(m.s.runtime.view.page)?structuredClone(m.s.runtime.view):undefined;if(s.runtime.intent?.target===id&&s.runtime.intent.action===action)return;
 if(['ST.CONTROL.SHOW','ST.CONTROL.REHEARSE'].includes(id)&&s.case.playback?.status==='running'){caption(m,['CT.RUN.BUSY']);setView(m,{page:'work'});return;}
 pause(m,'inspection');cancelIntent(m);
 let path=pathToOwner(s.case,id);
 const door=content.doors.find(d=>d.id===id);
 if(door&&path)path=[...path,door.threshold];
 if(!path){caption(m,['CT.WORLD.UNREACHABLE']);setView(m,{page:'world'});return;}
 setView(m,{page:'world'});s.runtime.intent={id:m.e.id,target:id,action,path,stage:'approaching',...(returnView?{returnView}:{}),...(destination?{destination}:{})};
 s.session.pendingAction={id:m.e.id,targetId:id,stage:'approaching',commitRule:'rollback-before-endpoint'};
 s.session.taskState='UI.WORLD.MOVING';
 if(pathLength(s.case.physical.avatar,path)<.1)arrive(m);
}
function arrive(m:Mutation){
 const intent=m.s.runtime.intent;if(!intent)return;
 if(intent.action==='go'){caption(m,[]);cancelIntent(m);return;}
 const p=m.s.case.physical;
 if(p.loop.mode==='following'&&distance(p.loop.feet,p.avatar)<5){
  const candidates=[...m.s.runtime.loopHistory].reverse().filter(q=>distance(q,p.avatar)>=5&&legal(roomData(p.room),q));
  if(!candidates.length)for(let i=0;i<16;i++){const a=i*Math.PI/8,q:Point=[p.avatar[0]+7*Math.cos(a),p.avatar[1]+7*Math.sin(a)];if(legal(roomData(p.room),q))candidates.push(q);}
  if(candidates[0]){p.loop.feet=[...candidates[0]];touch(m,false);}
 }
 intent.stage='operating';m.s.session.pendingAction!.stage='operating';m.s.session.taskState='UI.WORLD.OPERATING';m.s.runtime.operationElapsedMs=0;
 const id=intent.target,ms=intent.action==='flatten'?800:id.startsWith('ST.MODEL')?600:id.startsWith('ST.DOCK')?(p.loop.mode==='following'?13/15*1000+500:450):id==='ST.RACK.BAY'&&p.caddyHost==='ACT.PLAYER'?350:intent.action==='collect'?350:id==='ACT.LOOP'||id==='LOOP.FOLLOW.PAD'?500:id.includes('SOURCE.')||id.startsWith('KIT.')||id==='MD.ACCESS.E8'?450:200;
 if(id.startsWith('ST.MODEL')){setView(m,{page:'model'});caption(m,[]);}
 m.effects.push({kind:'timer',ms:m.s.preferences.motion==='reduced'&&ms!==800?120:ms,command:{type:'ACTION_READY',actionId:intent.id}});
}
export function source(m:Mutation,sourceId:string,accessId:string,refs?:string[]){
 const previous=['talk','work','kit','notes'].includes(m.s.runtime.view.page)?structuredClone(m.s.runtime.view):undefined;
 const access=content.accesses.find(a=>a.id===accessId),allowed=refs??access?.grants??[];grant(m,allowed,accessId);
 setView(m,{page:'reader',sourceId,accessId,...(sourceId==='E2'?{frame:1}:{}),...(previous?{previous}:{})});
 m.s.case.readerResume={sourceId,componentRef:allowed[0]??sourceId,accessId,scrollFraction:0,selectedRefs:[],frame:sourceId==='E2'?1:null};touch(m,false);
}
function physical(m:Mutation){
 const i=m.s.runtime.intent;if(!i)return;const id=i.target,action=i.action,s=m.s,c=s.case,p=c.physical;
 cancelIntent(m);
 const door=content.doors.find(d=>d.id===id);
 if(door){
  pause(m,'leaving');p.room=door.destinationRoom;p.avatar=[...door.avatarArrival];p.facing=door.facing;
  if(p.loop.mode==='following'){p.loop.room=p.room;p.loop.feet=[...door.loopArrival];}
  s.runtime.loopHistory=[[...p.avatar]];if(!c.visitedRooms.includes(p.room))c.visitedRooms.push(p.room);
  const actors=content.actors.filter(a=>a.room===p.room&&a.id!=='ACT.PLAYER'&&(a.id!=='ACT.LOOP'||p.loop.mode==='standby'));
  for(const a of actors)if(!c.encounteredActors.includes(a.id as 'ACT.JO'))c.encounteredActors.push(a.id as 'ACT.JO');
  observe(m,'physical-commit',{actionId:i.id,origin:'world'});setView(m,{page:'world'});caption(m,[]);
  if(p.room==='SC.MD'&&p.loop.room==='SC.MD'&&p.loop.mode==='standby'){
   grant(m,['E5.c','E5.c/seen'],'SC.MD');
   caption(m,['CT.OBS.LOOP.SEEN']);
  }
  if(i.destination&&p.room!==i.destination){const next=nextDoor(p.room,i.destination);if(next)target(m,next,'default',i.destination);}
  return;
 }
 c.worldReturn={ownerId:id,actionCtId:content.objects.find(o=>o.id===id)?.defaultActionCt??null};
 if(id==='ST.MODEL'||id==='ST.MODEL.TAB'){p.objects.modelTabTried=true;setView(m,{page:'model'});caption(m,['CT.OBJ.MODEL_RESULT','CT.JO.MODEL']);}
 else if(id==='ST.SOURCE.E1'){p.objects.briefOpen=true;source(m,'E1',id);}
 else if(id==='ST.SOURCE.E6'){p.objects.storyNoteOpen=true;source(m,'E6',id);}
 else if(id==='ST.SOURCE.E4'){p.objects.filmingRequestOpen=true;source(m,'E4',id);}
 else if(id==='ST.ACCESS.E2'||id==='CY.ACCESS.E2')source(m,'E2',id);
 else if(id==='CY.SOURCE.E3'){
  if(action==='flatten'||p.objects.noticeFlat){p.objects.noticeFlat=true;source(m,'E3',id);caption(m,['CT.OBJ.NOTICE_DONE']);}
  else{grant(m,['CT.OBJ.NOTICE_PARTIAL'],id);setView(m,{page:'notice',accessId:id});}
 }
 else if(['CY.SOURCE.E7','MD.SOURCE.E6','MD.SOURCE.E7','MD.SOURCE.E5','KIT.NOTE.E6','KIT.NOTE.E7','WK.ACCESS.NAV'].includes(id))source(m,id==='WK.ACCESS.NAV'?'NAV':id.split('.').at(-1)!,id);
 else if(id.startsWith('TILE.'))source(m,'E8',id,[`E8/${id}`]);
 else if(id==='MD.ACCESS.E8'||id==='KIT.CADDY'){
  if(action==='collect'&&p.caddyHost==='MD.RACK.STATION'){p.caddyHost='ACT.PLAYER';caption(m,['CT.KIT.HAVE']);}
  p.objects.rackOpened=true;setView(m,{page:'kit',accessId:'KIT.CADDY'});
 }
 else if(id==='ACT.LOOP'||id==='LOOP.FOLLOW.PAD'){
  if(p.loop.mode==='standby'){
   p.loop.mode='following';p.loop.feet=[68,45];s.runtime.loopHistory=[[...p.avatar]];
   grant(m,['E5.c/response'],'ACT.LOOP');caption(m,['CT.OBJ.WAKE_RESULT','CT.OBS.LOOP.RESPONSE']);
  }else caption(m,['CT.OBJ.FOLLOWING']);
 }
 else if(id.startsWith('ST.DOCK')){
  p.objects.dockFlapOpen=true;
  if(p.loop.mode==='following'){p.loop={room:'SC.ST',feet:[76,35],mode:'docked'};caption(m,['CT.JO.DOCKED']);}
  else caption(m,[p.loop.mode==='standby'?'CT.OBJ.DOCK_EMPTY_RESULT':'CT.OBJ.DOCK_READY']);
 }
 else if(id==='ST.RACK.BAY'){
  if(p.caddyHost==='ACT.PLAYER'){p.caddyHost='ST.RACK.BAY';caption(m,['CT.KIT.SEATED']);observe(m,'physical-commit',{actionId:i.id,origin:'world'});target(m,'ST.RAIL');return;}
  setView(m,{page:p.caddyHost==='ST.RACK.BAY'?'work':'kit'});
 }
 else if(id==='ST.RAIL'||id.startsWith('ST.RAIL.')||id.startsWith('ST.CONTROL.')){
  setView(m,{page:'work'});
  if(id==='ST.CONTROL.SHOW'&&!c.certificate){p.objects.previewTried=true;caption(m,[['docked','projecting'].includes(p.loop.mode)?'CT.WORK.CHECK':'CT.WORK.PREVIEW_RESULT']);}
  else if(id==='ST.CONTROL.SHOW')run(m,'show');
  else if(id==='ST.CONTROL.REHEARSE')run(m,'rehearsal');
 }
 else if(['ACT.JO','ACT.REMY','ACT.ARI'].includes(id)){
  if(i.delivery){deliver(m,i.delivery);return;}
  const ex=c.experience??=newExperience(true),first=!ex.npcIntroductions.includes(id as 'ACT.JO');
  if(first){ex.npcIntroductions.push(id as 'ACT.JO');touch(m,false);}
  setView(m,{page:'talk',actor:id as 'ACT.JO',dialogue:[...(first&&id!=='ACT.JO'?[id==='ACT.REMY'?'CT.ER13.REMY':'CT.ER13.ARI']:[]),id==='ACT.JO'?(!p.objects.modelTabTried?'CT.GOAL.ASSIGNMENT':p.loop.mode==='standby'?'CT.JO.BORROW':p.loop.mode==='following'?'CT.OBJ.FOLLOWING':'CT.OBJ.DOCK_READY'):id==='ACT.REMY'?'CT.REMY.GREETING':p.loop.mode==='standby'&&p.caddyHost==='MD.RACK.STATION'?'CT.ARI.INVITE':'CT.ARI.NO_LOOP_FIRST_LINE']});
 }
 else if(id==='WK.TOAST'||id==='WK.TOAST.START'||id==='WK.TOAST.MAGNIFIER')setView(m,{page:'toast',action:id.endsWith('MAGNIFIER')?'magnifier':p.objects.toastRevealed?'revealed':'covered'});
 else if(id==='WK.WAYFINDING')source(m,'NAV','WK.ACCESS.NAV');
 if(s.runtime.view.page==='reader'&&i.returnView)s.runtime.view.previous=i.returnView;
 observe(m,'physical-commit',{actionId:i.id,origin:'world'});
}
function addExposure(m:Mutation,e:Parameters<typeof validExposure>[1]){
 if(!validExposure(m.s.case,e))return;
 const existing=m.s.case.exposures.find(x=>x.refId===e.refId&&x.ctId===e.ctId&&x.viaAccessId===e.viaAccessId);
 const spans=mergeSpans([...(existing?.spans??[]),...e.spans]),visual=e.visualComplete||existing?.visualComplete||false;
 if(existing&&JSON.stringify(existing.spans)===JSON.stringify(spans)&&existing.visualComplete===visual)return;
 const seq=observe(m,'source-displayed',{refs:[e.refId],contentIds:[e.ctId],origin:e.viaAccessId.startsWith('NPC.')?'npc':'access'});
 if(existing){existing.spans=spans;existing.visualComplete=visual;existing.count++;existing.lastSeq=seq;}
 else m.s.case.exposures.push({...e,spans,visualComplete:visual,firstSeq:seq,lastSeq:seq,count:1});
}
function tick(m:Mutation,ms:number){
 const s=m.s,p=s.case.physical,room=roomData(p.room);const duration=Math.min(100,Math.max(0,ms));
 s.runtime.clockMs+=duration;s.runtime.cueElapsedMs+=duration;s.runtime.operationElapsedMs+=duration;
 if(s.runtime.toastElapsed!==null)s.runtime.toastElapsed+=duration;
 const steps=Math.ceil(duration/(1000/60));if(!steps)return;
 for(let j=0;j<steps;j++){
  const units=15*duration/1000/steps,prev:Point=[...p.avatar];
  const intent=s.runtime.intent;
  if(intent?.stage==='approaching'){
   const next=advancePath(p.avatar,intent.path,units);p.avatar=next.position;intent.path=next.path;
   if(!intent.path.length)arrive(m);
  }else if(s.session.inputOwner==='world'&&s.session.heldKeys.length){
   const keys=s.session.heldKeys,dx=Number(keys.includes('right'))-Number(keys.includes('left')),dy=Number(keys.includes('down'))-Number(keys.includes('up')),n=Math.hypot(dx,dy)||1;
   const next:Point=[p.avatar[0]+dx/n*units,p.avatar[1]+dy/n*units];
   if(clearSegment(room,p.avatar,next))p.avatar=next;
   else for(const a of [0,1] as const){const axis:Point=[...p.avatar];axis[a]=next[a];if(clearSegment(room,p.avatar,axis))p.avatar=axis;}
  }
  if(distance(prev,p.avatar)>.001){
   p.facing=Math.abs(p.avatar[0]-prev[0])>Math.abs(p.avatar[1]-prev[1])?(p.avatar[0]>prev[0]?'right':'left'):p.avatar[1]>prev[1]?'down':'up';
   s.runtime.loopHistory.push([...p.avatar]);s.runtime.loopHistory=s.runtime.loopHistory.slice(-150);touch(m,false);
  }
  if(p.loop.mode==='following'){
   p.loop.room=p.room;let behind:Point|null=null,total=0,last=p.avatar;
   for(const point of [...s.runtime.loopHistory].reverse()){total+=distance(last,point);last=point;if(total>=7){behind=point;break;}}
   if(!behind&&distance(p.avatar,p.loop.feet)>8)behind=p.avatar;
   if(behind&&distance(p.loop.feet,behind)>.1){const route=findPath(room,p.loop.feet,behind);if(route){p.loop.feet=advancePath(p.loop.feet,route,units*1.2).position;touch(m,false);}}
  }
 }
}
function run(m:Mutation,mode:Run['mode'],restart=false){
 const c=m.s.case;if(!atWork(c)||c.playback?.status==='running'&&!restart)return;
 if(!ready(c)){caption(m,[...(c.physical.caddyHost!=='ST.RACK.BAY'?['CT.WORK.MISSING_KIT']:[]),...(!['docked','projecting'].includes(c.physical.loop.mode)?['CT.WORK.MISSING_LOOP']:[])]);return;}
 if(!c.physical.order.length){caption(m,['CT.WORK.EMPTY']);return;}
 if(mode==='show'&&c.certificate?.arrangementRevision!==c.physical.arrangementRevision)return;
 pause(m,'user');if(c.playback)c.runHistory.push(structuredClone(c.playback));
 if(mode==='rehearsal')c.certificate=null;
 c.playback=newRun(allocate(m),mode,c.physical.order,c.physical.arrangementRevision,c.lastObservationSeq+1);c.physical.loop.mode='projecting';m.s.session.presentation='watch';setView(m,{page:'work'});m.s.session.presentation='watch';caption(m,[]);touch(m);startCue(m,c.playback.id);
}
function edit(m:Mutation,cmd:Extract<Command,{type:'EDIT_RAIL'}>){
 const s=m.s,p=s.case.physical,h=s.session.heldTile;if(!h||!atWork(s.case)||p.caddyHost!=='ST.RACK.BAY'||h.arrangementRevision!==p.arrangementRevision)return;
 const old=[...p.order],order=[...old],current=order.indexOf(h.tile);let index=cmd.index;
 if(cmd.operation==='return'){if(current>=0)order.splice(current,1);}
 else if(cmd.operation==='swap'||cmd.operation==='left'||cmd.operation==='right'){
  if(cmd.operation!=='swap'){index=current+(cmd.operation==='left'?-1:1);if(index<0||index>=order.length){s.session.heldTile=null;caption(m,[cmd.operation==='left'?'CT.RAIL.START_LIMIT':'CT.RAIL.END_LIMIT']);return;}}
  if(current<0||!order[index])return;[order[current],order[index]]=[order[index]!,order[current]!];
 }
 else if(cmd.operation==='replace'){if(!order[index])return;if(current>=0)return;order[index]=h.tile;}
 else{
  if(index<0||index>order.length)return;
  if(cmd.operation==='after')index++;
  if(current>=0){order.splice(current,1);if(current<index)index--;}
  order.splice(Math.min(index,order.length),0,h.tile);
 }
 if(order.length>4||new Set(order).size!==order.length)return;
 s.session.heldTile=null;
 if(JSON.stringify(old)===JSON.stringify(order)){caption(m,['CT.RAIL.SAME'],{tile:content.texts.find(t=>t.id===`CT.TILE.LABEL.${h.tile.slice(5)}`)!.text});return;}
 pause(m,'inspection');if(s.case.playback)s.case.runHistory.push(structuredClone(s.case.playback));s.case.playback=null;s.case.certificate=null;p.order=order;p.arrangementRevision++;p.loop.mode=p.loop.mode==='projecting'?'docked':p.loop.mode;
 const other=old[index],slots={tile:tileName(h.tile),position:order.indexOf(h.tile)+1,other:other?tileName(other):'',otherPosition:other?order.indexOf(other)+1:0};
 caption(m,[cmd.operation==='replace'?'CT.RAIL.REPLACED':['swap','left','right'].includes(cmd.operation)?'CT.RAIL.SWAPPED':cmd.operation==='return'?'CT.RAIL.RETURNED':'CT.RAIL.PLACED','CT.RAIL.CHANGED'],slots);touch(m);
}
export function reduce(previous:State,e:Envelope):{state:State;effects:Effect[]}{
 if(e.command.type!=='NEW_GAME'&&(e.visitId!==previous.session.visitId||e.caseId!==previous.case.caseRunId||previous.runtime.lastHandled.includes(e.id)))return {state:previous,effects:[]};
 if(e.command.type==='NEW_GAME'){
  const next=structuredClone(initialState(e.command.caseId,e.command.visitId));next.preferences=structuredClone(previous.preferences);next.runtime.coachTransport=previous.runtime.coachTransport;next.runtime.homeStatus='empty';next.runtime.hasLiveVisit=true;next.runtime.view={page:'intro',frame:0};next.case.encounteredActors=['ACT.JO'];next.session.inputOwner='task';next.session.taskState='UI.INTRO';next.session.saving.mode=e.command.save===false?'unknown-record':'normal';next.runtime.caption=['CT.GOAL.ASSIGNMENT'];return {state:freeze(next),effects:[{kind:'save'}]};
 }
 const m:Mutation={s:structuredClone(previous),e,effects:[],caseChanged:false,contextChanged:false,nextId:0},s=m.s,c=s.case,p=c.physical,cmd=e.command;
 switch(cmd.type){
 case 'CONTINUE':setView(m,{page:'world'});break;
 case 'BOOT_CHECK':s.runtime.bootGeneration=cmd.generation;s.runtime.homeStatus='checking';break;
 case 'BOOT':if(cmd.generation===s.runtime.bootGeneration&&!s.runtime.hasLiveVisit){s.runtime.homeStatus=cmd.status;s.runtime.savedCandidate=cmd.candidate;s.runtime.restorePreservesSlots=cmd.preserve??false;s.session.saving.knownSlotRevision=cmd.slotRevision??null;}break;
 case 'RESTORE':{
  if(!s.runtime.savedCandidate||s.runtime.hasLiveVisit)break;
  s.case=structuredClone(s.runtime.savedCandidate);s.session.visitId=cmd.visitId;s.runtime.hasLiveVisit=true;
  if(!s.case.experience){s.case.experience=newExperience(true);touch(m,false);}
  s.runtime.loopHistory=[[...s.case.physical.avatar]];s.case.historyUncertain=true;
  s.session.saving.mode=s.runtime.restorePreservesSlots?'conflict':'normal';
  s.session.saving.currentRevision=s.case.revision;s.session.saving.acknowledgedRevision=s.runtime.restorePreservesSlots?null:s.case.revision;
  const r=s.case.playback;
  if(r?.activeCue){observe(m,'possible-outcome',{runId:r.id,cueIndex:r.activeCue.index,outcome:'possibly-seen',puppet:{...r.activeCue.to},origin:'recovery',uncertain:true});r.activeCue=null;}
  if(r&&r.status!=='finalized'){r.status='paused';r.pauseReason='recovery';s.case.physical.loop.mode='docked';}
  observe(m,'history-uncertain',{origin:'recovery',uncertain:true});
  const resume=s.case.readerResume;
  setView(m,s.runtime.homeStatus==='run'?{page:'recovery',action:'run'}:resume&&available(s.case,resume.componentRef)?{page:'reader',sourceId:resume.sourceId,accessId:`ACC.EVIDENCE.${resume.sourceId}`,ref:resume.componentRef,...(resume.frame?{frame:resume.frame}:{})}:{page:'world'});
  caption(m,[r&&r.status!=='finalized'?'CT.RECOVERY.UNCERTAIN_CUE':'CT.SAVE.RETURNED']);break;
 }
 case 'VIEW':{pause(m,'inspection');cancelIntent(m);let view=cmd.view;if(view.page==='help'){const topic=s.runtime.helpOpportunity?(s.runtime.helpOpportunity.context.topic==='story-plan'?'story':'search'):s.runtime.view.topic;if(view.topic!==undefined&&topic!==undefined&&view.topic!==topic)m.contextChanged=true;if(view.topic===undefined&&topic!==undefined)view={...view,topic};}setView(m,view);if(view.page==='map')grant(m,['NAV.ST','NAV.CY','NAV.WK','NAV.MEDIA'],'ACC.VENUE');break;}
 case 'FOCUS':s.session.inputOwner=cmd.owner;if(cmd.owner!=='world')s.session.heldKeys=[];break;
 case 'INTRO':{
  const ex=c.experience??=newExperience(true);
  if(cmd.action==='open'){pause(m,'inspection');cancelIntent(m);setView(m,{page:'intro',frame:Math.min(3,ex.introBeat)});}
  else if(cmd.action==='next'&&s.runtime.view.page==='intro'){ex.introBeat=Math.min(4,(s.runtime.view.frame??0)+1);setView(m,ex.introBeat===4?{page:'world'}:{page:'intro',frame:ex.introBeat});}
  else if(cmd.action==='skip'){ex.introDismissed=true;setView(m,{page:'world'});}
  ex.legacyOffer=false;touch(m,false);break;
 }
 case 'READING':{
  if(!readingAvailable(c,cmd.id))break;
  const ex=c.experience??=newExperience(true);
  if(cmd.action==='phrases')ex.phrases=!ex.phrases;
  else if(cmd.action==='pauses')ex.narratorPauses=!ex.narratorPauses;
  else if(cmd.action==='card')ex.narratorCard=cmd.id;
  else if(s.runtime.view.page==='reading'&&s.runtime.view.sourceId===cmd.id)observe(m,cmd.action==='model-played'?'reading-model-played':cmd.action==='practice'?'reading-practice-requested':'reading-self-reported',{contentIds:[cmd.id]});
  touch(m,false);break;
 }
 case 'WORD_SEEN':{const context=wordContext(cmd.id),ex=c.experience??=newExperience(true);if(context&&mayEncounter(s,context)&&!ex.wordContexts.includes(cmd.id)){ex.wordContexts.push(cmd.id);touch(m,false);}break;}
 case 'WORD_LOOKUP':if(c.experience?.wordContexts.includes(cmd.id))observe(m,'word-looked-up',{contentIds:[cmd.id]});break;
 case 'SUPPORT_SEEN':{const ex=c.experience??=newExperience(true);if(supportAvailable(c,cmd.id)&&!ex.supports.includes(cmd.id)){ex.supports.push(cmd.id);observe(m,'supplied-support',{contentIds:[cmd.id],origin:'npc',assistanceLevel:2});}break;}
 case 'COACH_CONFIG':if(s.runtime.coachTransport!=='development')s.runtime.coachTransport=cmd.live?'live':'authored';break;
 case 'KEYS':if(s.session.inputOwner==='world'){cancelIntent(m);s.session.heldKeys=cmd.keys;}break;
 case 'TARGET':target(m,cmd.target,cmd.action);break;
 case 'WALK':{
  if(!['world','work'].includes(s.runtime.view.page))break;
  pause(m,'inspection');cancelIntent(m);setView(m,{page:'world'});const path=findPath(roomData(p.room),p.avatar,cmd.point);
  if(path){s.runtime.intent={id:e.id,target:'FLOOR',action:'go',path,stage:'approaching'};s.session.pendingAction={id:e.id,targetId:'SC.'+p.room.slice(3),stage:'approaching',commitRule:'rollback-before-endpoint'};}else caption(m,['CT.WORLD.BLOCKED']);break;
 }
 case 'TICK':tick(m,cmd.ms);break;
 case 'ACTION_READY':if(s.runtime.intent?.id===cmd.actionId&&s.runtime.intent.stage==='operating')physical(m);break;
 case 'STOP_WALK':cancelIntent(m);caption(m,['CT.WORLD.STOPPED']);break;
 case 'EXPOSE':addExposure(m,cmd.exposure);break;
 case 'SOURCE_POSITION':{
  if(s.runtime.view.page!=='reader'||s.runtime.view.sourceId!==cmd.sourceId||!available(c,cmd.componentRef)||sourceOf(cmd.componentRef)!==cmd.sourceId)break;
  const resume={sourceId:cmd.sourceId,componentRef:cmd.componentRef,accessId:s.runtime.view.accessId??`ACC.EVIDENCE.${cmd.sourceId}`,scrollFraction:Math.min(1,Math.max(0,cmd.scrollFraction)),selectedRefs:c.readerResume?.selectedRefs??[],frame:cmd.frame};
  if(JSON.stringify(resume)!==JSON.stringify(c.readerResume)){c.readerResume=resume;touch(m,false);}break;
 }
 case 'LEAD':{if(cmd.destination&&!knownRooms(c).some(room=>room.id===cmd.destination))break;const lead=cmd.lead;c.selectedLead=lead;reasoning(c).leadDestination=cmd.destination??null;touch(m);if(lead){caption(m,['CT.GOAL.QUESTION'],{question:content.texts.find(t=>t.id===questionIds[lead])!.text});setView(m,{page:'world'});}break;}
 case 'GO':{if(cmd.destination===p.room||s.runtime.view.page!=='map'&&!knownRooms(c).some(room=>room.id===cmd.destination))break;const door=nextDoor(p.room,cmd.destination);if(door)target(m,door,'default',cmd.destination);break;}
 case 'METADATA_SEEN':recordMetadata(m,cmd.ref);break;
 case 'COMPARISON':changeComparison(m,cmd);if(s.runtime.view.page==='compare'){const row=comparisonDraft(c),count=Number(!!row?.leftRef)+Number(!!row?.rightRef);s.session.taskState=`UI.COMPARE.${count===0?'EMPTY':count===1?'PARTIAL':'READY'}`;}break;
 case 'SAVE_IDEA':saveIdea(m,cmd.comparison);break;
 case 'EDIT_IDEA':editIdea(m,cmd.id);break;
 case 'IDEA_HELP':{const source=c.drafts.find(d=>d.id==='private')!,row=comparisonDraft(c),topic=c.selectedLead==='story-plan'?'story':'search',draft=c.drafts.find(d=>d.id===`coach-${topic}`)!;draft.text=cmd.comparison?row?.note??'':source.text;draft.selectedRefs=cmd.comparison?comparisonRefs(row):[...source.selectedRefs];draft.revision++;touch(m);setView(m,{page:'help',topic});startHelp(m);break;}
 case 'DRAFT':{const d=c.drafts.find(d=>d.id===cmd.id);if(d&&(d.text!==cmd.text||cmd.refs&&JSON.stringify(d.selectedRefs)!==JSON.stringify(cmd.refs))){d.text=cmd.text;if(cmd.refs)d.selectedRefs=cmd.refs.filter(r=>exposed(c,r)).slice(0,2);d.revision++;touch(m);}break;}
 case 'SELECT_TILE':if(p.caddyHost==='ST.RACK.BAY'&&atWork(c)){pause(m,'inspection');const index=p.order.indexOf(cmd.tile);s.session.heldTile={tile:cmd.tile,origin:index<0?'caddy':'rail',originIndex:index<0?null:index,arrangementRevision:p.arrangementRevision};}break;
 case 'EDIT_RAIL':edit(m,cmd);break;
 case 'CANCEL_TILE':if(s.session.heldTile){s.session.heldTile=null;caption(m,[cmd.invalid?'CT.RAIL.INVALID':'CT.RAIL.CANCELED']);}break;
 case 'PRESENTATION':if(cmd.mode==='arrange')pause(m,'inspection');s.session.presentation=cmd.mode;break;
 case 'RUN':run(m,cmd.mode);break;
 case 'START_CUE':startCue(m,cmd.runId);break;
 case 'CUE_READY':{
  const r=c.playback;if(!r||r.id!==cmd.runId||r.activeCue?.id!==cmd.cueId||r.status!=='running')break;
  settleCue(m);if(r.status==='running')m.effects.push({kind:'timer',ms:500,command:r.nextCue>=r.order.length?{type:'FINALIZE_RUN',runId:r.id}:{type:'START_CUE',runId:r.id}});break;
 }
 case 'FINALIZE_RUN':{
  const r=c.playback;if(!r||r.id!==cmd.runId||r.status!=='running'||r.activeCue||r.nextCue!==r.order.length)break;
  r.status='finalized';p.loop.mode='docked';const success=successful(r.puppet);r.finalizedSeq=observe(m,'run-finalized',{runId:r.id,outcome:success?'success':'unsuccessful',puppet:{...r.puppet},origin:'world'});
  if(success&&r.mode==='rehearsal'){c.certificate={runId:r.id,arrangementRevision:r.arrangementRevision};caption(m,[c.premiere?'CT.ER13.REPLAY_READY':'CT.WORK.CERTIFIED']);}
  else if(success&&r.mode==='show'){if(!c.premiere)c.premiere={runId:r.id,arrangementRevision:r.arrangementRevision,order:[...r.order],completedSeq:r.finalizedSeq};setView(m,{page:'ending',action:'celebration'});caption(m,['CT.JO.ENDING']);}
  else caption(m,['CT.WORK.CHECK']);break;
 }
 case 'PAUSE_RUN':pause(m,cmd.reason);break;
 case 'CONTINUE_RUN':if(c.playback?.status==='paused'&&ready(c)&&atWork(c)){c.playback.status='running';c.playback.pauseReason=null;p.loop.mode='projecting';s.session.presentation='watch';touch(m);if(c.playback.nextCue===c.playback.order.length)m.effects.push({kind:'timer',ms:0,command:{type:'FINALIZE_RUN',runId:c.playback.id}});else startCue(m,c.playback.id);}break;
 case 'RESTART_RUN':run(m,c.playback?.mode??'rehearsal',true);break;
 case 'RESET_RUN':case 'CLEAR_RAIL':{
  if(!atWork(c))break;pause(m,'user');if(c.playback)c.runHistory.push(structuredClone(c.playback));c.playback=null;c.certificate=null;
  if(cmd.type==='CLEAR_RAIL'&&p.order.length){p.order=[];p.arrangementRevision++;}s.session.heldTile=null;s.session.presentation='arrange';caption(m,[cmd.type==='CLEAR_RAIL'?'CT.WORK.CLEAR_RESULT':'CT.WORK.RESET_RESULT']);touch(m);break;
 }
 case 'PREF':{
  const values={sound:['on','off'],motion:['standard','reduced'],text:['regular','larger','largest'],spacing:['standard','roomier']};
  if(values[cmd.key].includes(cmd.value)&&s.preferences[cmd.key]!==cmd.value){Object.assign(s.preferences,{[cmd.key]:cmd.value});s.preferences.revision++;m.effects.push({kind:'preferences'});}break;
 }
 case 'LOAD_PREFS':s.preferences=structuredClone(cmd.preferences);break;
 case 'PREF_RESULT':if(cmd.revision===s.preferences.revision)s.runtime.preferenceFailed=cmd.failed;break;
 case 'SAVE_MODE':s.session.saving.mode=cmd.mode;break;
 case 'SAVE_BEGIN':s.runtime.pendingSaveToken=cmd.token;s.session.saving.writeInFlight=true;s.session.saving.requestedRevision=cmd.revision;break;
 case 'SAVE_ACK':if(cmd.token===s.runtime.pendingSaveToken&&cmd.caseId===c.caseRunId&&cmd.visitId===s.session.visitId){s.runtime.pendingSaveToken=null;s.session.saving.writeInFlight=false;s.session.saving.acknowledgedRevision=cmd.revision;s.session.saving.knownSlotRevision=cmd.slotRevision;}break;
 case 'SAVE_FAILED':if(cmd.token===s.runtime.pendingSaveToken){s.runtime.pendingSaveToken=null;s.session.saving.writeInFlight=false;s.session.saving.mode=cmd.mode;}break;
 case 'ART_RETRY':s.runtime.artFailure=false;break;
 case 'ART_FAILED':s.runtime.artFailure=true;break;
 case 'CANVAS_FAILED':s.runtime.canvasFailure=true;break;
 case 'DISMISS_GUIDE':c.guidance[cmd.guide]=true;touch(m,false);break;
 case 'BACKGROUND':pause(m,'background');cancelIntent(m);s.session.heldKeys=[];if(s.runtime.toastElapsed!==null){s.runtime.toastElapsed=null;setView(m,{page:'toast',action:'revealed'});caption(m,['CT.TOAST.PUNCHLINE']);}break;
 case 'TOAST_START':if(p.room==='SC.WK'&&s.runtime.view.page==='toast'&&s.runtime.toastElapsed===null){const was=p.objects.toastRevealed;p.objects.toastRevealed=true;setView(m,{page:'toast',action:e.id});s.runtime.toastElapsed=0;s.runtime.toastReplay=was;caption(m,[was?'CT.TOAST.FLOURISH':'CT.TOAST.ARMS']);observe(m,'physical-commit',{actionId:e.id,origin:'world'});m.effects.push({kind:'timer',ms:s.preferences.motion==='reduced'?300:was?2000:7000,command:{type:'TOAST_DONE',actionId:e.id}});}break;
 case 'TOAST_DONE':if(s.runtime.view.page==='toast'&&s.runtime.view.action===cmd.actionId){s.runtime.toastElapsed=null;setView(m,{page:'toast',action:'revealed'});caption(m,['CT.TOAST.PUNCHLINE']);}break;
 // Native dialogue/records and request lifecycle are attached by their dependent tasks.
 case 'TALK':talk(m,cmd.topic);break;
 case 'PRESENT':queueDelivery(m,{actor:cmd.actor,refs:cmd.refs,text:'',topic:'search',plan:false});break;
 case 'DELIVER_PLAN':{const d=c.drafts.find(d=>d.id===cmd.topic+'-plan')!;if(!d.text.trim()||Array.from(d.text).length>600){caption(m,[d.text.trim()?'CT.UI.LIMIT':'CT.UI.ADD_IDEA']);break;}queueDelivery(m,{actor:'ACT.JO',refs:[...d.selectedRefs],text:d.text,topic:cmd.topic,plan:true});break;}
 case 'RECORD_PLAN':{const d=c.drafts.find(d=>d.id===cmd.topic+'-plan')!;if(record(m,'crew-plan',cmd.topic,d.text,d.selectedRefs,null)){setView(m,{page:'plan',topic:cmd.topic,action:'recorded'});caption(m,['CT.PLAN.RECORDED']);}break;}
 case 'HELP':pause(m,'inspection');startHelp(m,cmd.direct,cmd.noteHelp);break;
 case 'COACH_TIME':coachingTime(m,cmd.requestId,cmd.ms);break;
 case 'COACH_RECEIVE':receive(m,cmd.requestId,cmd.response);break;
 case 'COACH_CHOOSE':choose(m,cmd.choice);break;
 case 'COACH_DISPLAY':display(m,cmd.requestId);break;
 case 'COACH_CANCEL':cancelHelp(m);break;
 case 'COACH_FOCUS':s.session.coach.fallbackFocused=cmd.focused;break;
 case 'NPC_HELP_DISPLAY':{const h=s.runtime.npcHelp;if(h&&h.id===cmd.id&&!h.displayed&&s.runtime.view.page==='talk'&&s.runtime.view.actor===h.actor&&s.runtime.view.dialogue?.includes(h.ct)){h.displayed=true;observe(m,'help-displayed',{contentIds:[h.ct],origin:'npc',assistanceLevel:3});}break;}
 case 'COACH_DEVELOPMENT':s.runtime.coachTransport='development';break;
 }
 if(m.caseChanged){s.case.revision++;s.session.saving.currentRevision=s.case.revision;m.effects.push({kind:'save',draft:cmd.type==='DRAFT'||cmd.type==='COMPARISON'||cmd.type==='TICK'||cmd.type==='SOURCE_POSITION'});}
 if(m.contextChanged)s.runtime.contextRevision++;
 reconcile(m);
 s.runtime.lastHandled=[...s.runtime.lastHandled,e.id].slice(-128);
 return {state:freeze(s),effects:m.effects};
}
