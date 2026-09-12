import type {Context,Record as IdeaRecord,Run} from '../../contracts/types.js';
import {content,parts} from './content.js';
import {available,exposed,exposedRefs} from './evidence.js';
import type {Delivery,State} from './state.js';
import {allocate,caption,grant,observe,setView,source,target,touch,type Mutation} from './reducer.js';
import {applyTile,initialPuppet} from '../story/engine.js';
import {ownerRoom,pathLength,pathToOwner} from '../physical/navigation.js';
import {startHelp as help} from '../coach/lifecycle.js';

export function record(m:Mutation,kind:IdeaRecord['kind'],topic:'search'|'story',text:string,refs:string[],recipient:IdeaRecord['recipient']):IdeaRecord|null{
 if(kind!=='evidence-delivery'&&(!text.trim()||Array.from(text).length>600)){caption(m,[text.trim()?'CT.UI.LIMIT_RECORD':'CT.UI.ADD_IDEA']);return null;}
 const id=allocate(m),previous=[...m.s.case.records].reverse().find(r=>r.kind===kind&&r.topic===topic&&r.recipient===recipient);
 const seq=observe(m,kind==='evidence-delivery'?'evidence-delivered':'explanation-recorded',{recordId:id,refs,origin:'player'});
 const r:IdeaRecord={id,kind,topic,text,refs:[...refs],recipient,previousRecordId:previous?.id??null,arrangementRevision:m.s.case.physical.arrangementRevision,puppet:{...(m.s.case.playback?.puppet??initialPuppet())},seq};m.s.case.records.push(r);return r;
}
export function deliver(m:Mutation,delivery:Delivery){
 const {actor,refs,text,topic,plan}=delivery,c=m.s.case;
 if(ownerRoom(c,actor)!==c.physical.room)return;
 const valid=refs.filter(r=>exposed(c,r)).slice(0,2);
 const r=record(m,plan?'jo-explanation':'evidence-delivery',topic,text,valid,actor);if(!r)return;
 let received=c.npcReceived.find(n=>n.actorId===actor);if(!received){received={actorId:actor,refs:[],deliveryRecordIds:[]};c.npcReceived.push(received);}
 received.refs=[...new Set([...received.refs,...valid])];received.deliveryRecordIds.push(r.id);
 const known=received.refs,has=(ref:string)=>known.includes(ref),selected=(ref:string)=>valid.includes(ref);
 const ari=actor==='ACT.ARI';let ct='CT.NPC.UNSUPPORTED';
 if(plan)ct='CT.JO.PLAN_REPLY';
 else if(valid.some(r=>r.startsWith('E3.'))||selected('E2.c')){
  ct=ari?'CT.ARI.EVENT':has('E3.a')&&has('E3.b')?actor==='ACT.JO'?'CT.JO.NOTICE_FULL':selected('E2.c')?'CT.REMY.POST_PAST':'CT.REMY.CORRECT':has('E3.a')?'CT.NPC.SCOPE':has('E3.b')?'CT.NPC.STATUS':actor==='ACT.JO'?'CT.JO.CANCEL_UNKNOWN':'CT.SRC.E2.C';
 }else if(selected('E2.b'))ct=ari?'CT.ARI.EVENT':'CT.NPC.PHOTO';
 else if(valid.some(r=>r.startsWith('E2.a')||r==='CT.REMY.CLIP'))ct=ari?ariAccount(m):actor==='ACT.JO'?'CT.NPC.FRAME':'CT.REMY.CLIP';
 else if(valid.some(r=>r.startsWith('E4.')))ct=ari?ariAccount(m):actor==='ACT.REMY'?'CT.REMY.REQUEST':c.physical.loop.mode==='standby'?'CT.JO.BORROW':'CT.NPC.DETAILS';
 else if(selected('E5.a'))ct=ari?ariAccount(m):'CT.NPC.SLATE';
 else if(selected('E5.b'))ct=ari?'CT.NPC.DETAILS':'CT.NPC.ACCOUNT';
 else if(selected('E5.c')||selected('E5.c/seen'))ct=ari?ariProgress(m)[0]!:'CT.NPC.OBSERVATION';
 else if(valid.some(r=>/^E[1678][./]/.test(r)))ct='CT.NPC.DETAILS';
 if(ct==='CT.REMY.CLIP')grant(m,['CT.REMY.CLIP'],'NPC.REMY.CLIP');
 if(ct==='CT.SRC.E2.C')grant(m,['E2.c'],'NPC.REMY.POST');
 setView(m,{page:'talk',actor,dialogue:[ct],selected:valid});caption(m,[plan?'CT.PLAN.DELIVERED':'CT.PRESENT.DONE'],{person:actor.slice(4,5)+actor.slice(5).toLowerCase()});
 observe(m,'physical-commit',{actionId:m.e.id,contentIds:[ct],origin:'npc'});
}
function ariProgress(m:Mutation):string[]{const p=m.s.case.physical;return [p.loop.mode==='following'&&p.loop.room==='SC.MD'?'CT.ARI.FOLLOWING':p.loop.mode==='standby'?'CT.ARI.NO_LOOP_FIRST_LINE':'CT.ARI.DEPARTED',p.caddyHost==='MD.RACK.STATION'?'CT.ARI.KIT_READY':'CT.ARI.KIT_GONE'];}
function ariAccount(m:Mutation):string{const full=m.s.case.physical.loop.mode==='standby'&&m.s.case.physical.caddyHost==='MD.RACK.STATION';grant(m,['E5.b'],full?'NPC.ARI.FILMING':'NPC.ARI.FILMING_AFTER');return full?'CT.SRC.E5.B':'CT.ARI.FILMING_AFTER';}
export function talk(m:Mutation,topic:string){
 const actor=m.s.runtime.view.actor;if(!actor||ownerRoom(m.s.case,actor)!==m.s.case.physical.room)return;
 const path=pathToOwner(m.s.case,actor);if(!path||pathLength(m.s.case.physical.avatar,path)>2)return;
 const c=m.s.case,p=c.physical;let ct='CT.NPC.UNSUPPORTED';
 const own:Record<string,[string,string[]]>={'CT.TALK.JO_NOTE':['E6',['E6.a','E6.b']],'CT.TALK.REMY_NOTE':['E7',['E7.a','E7.b','E7.c']],'CT.TALK.REQUEST':['E4',['E4.a','E4.b']],'CT.TALK.SLATE':['E5',['E5.a']]};
 if(own[topic]&&(actor==='ACT.JO'&&topic==='CT.TALK.JO_NOTE'||actor==='ACT.REMY'&&topic==='CT.TALK.REMY_NOTE'||actor==='ACT.ARI'&&['CT.TALK.REQUEST','CT.TALK.SLATE'].includes(topic))){const [id,refs]=own[topic]!;source(m,id,`NPC.${actor.slice(4)}.${topic.slice(8)}`,refs);return;}
 if(topic==='CT.TALK.ROLE')ct='CT.GOAL.ASSIGNMENT';
 else if(topic==='CT.TALK.LOOP')ct=actor==='ACT.JO'?p.loop.mode==='standby'?'CT.JO.BORROW':p.loop.mode==='following'?'CT.OBJ.FOLLOWING':'CT.OBJ.DOCK_READY':ariAccount(m);
 else if(topic==='CT.TALK.FILMING')ct=ariAccount(m);
 else if(topic==='CT.TALK.WAIT')ct='CT.ARI.WAIT';
 else if(topic==='CT.TALK.NOTES')ct='CT.ARI.NOTES';
 else if(topic==='CT.TALK.MATERIALS')ct=p.caddyHost==='MD.RACK.STATION'?'CT.ARI.KIT_READY':'CT.ARI.KIT_GONE';
 else if(topic==='CT.TALK.CLIP'&&actor==='ACT.REMY'){ct='CT.REMY.CLIP';grant(m,['CT.REMY.CLIP'],'NPC.REMY.CLIP');}
 else if(topic==='CT.TALK.CANCELED'){
  const received=c.npcReceived.find(n=>n.actorId===actor)?.refs??[],a=received.includes('E3.a'),b=received.includes('E3.b');
  ct=actor==='ACT.ARI'?'CT.ARI.EVENT':a&&b?actor==='ACT.JO'?'CT.JO.NOTICE_FULL':'CT.REMY.CORRECT':a?'CT.NPC.SCOPE':b?'CT.NPC.STATUS':actor==='ACT.JO'?'CT.JO.CANCEL_UNKNOWN':'CT.SRC.E2.C';
  if(ct==='CT.SRC.E2.C')grant(m,['E2.c'],'NPC.REMY.POST');
 }else if(topic==='CT.TALK.HELP'){
  if(actor==='ACT.REMY')ct='CT.REMY.CROSS_HELP';
  else if(actor==='ACT.JO'&&c.playback?.puppet.seed==='right'&&c.playback.puppet.pip==='left')ct='CT.JO.SEED_HELP';
  else {help(m,false,false);return;}
  m.s.runtime.npcHelp={id:allocate(m),actor,ct,displayed:false};
 }else if(topic==='CT.TALK.DIRECT'){help(m,true,false);return;}
 setView(m,{page:'talk',actor,dialogue:[ct,...(ct==='CT.ARI.FILMING_AFTER'?ariProgress(m):[])]});observe(m,'physical-commit',{contentIds:[ct],origin:'npc'});
}
export function queueDelivery(m:Mutation,delivery:Delivery){
 if(delivery.refs.some(r=>!exposed(m.s.case,r))||delivery.refs.length>2)return;
 if(!m.s.case.encounteredActors.includes(delivery.actor))return;
 if(ownerRoom(m.s.case,delivery.actor)!==m.s.case.physical.room){caption(m,['CT.PRESENT.HERE'],{person:delivery.actor.slice(4,5)+delivery.actor.slice(5).toLowerCase()});return;}
 target(m,delivery.actor,'deliver');if(m.s.runtime.intent)m.s.runtime.intent.delivery=delivery;
}
export function contextOf(s:State,topic:Context['topic']):Context{
 const c=s.case,p=c.physical,r=c.playback;
 const outcomes:Context['observedOutcomes']=[];
 for(const run of [...c.runHistory,...(r?[r]:[])]){
  let from=initialPuppet();for(let i=0;i<run.nextCue;i++){const tile=run.order[i]!,result=applyTile(from,tile);if(c.observations.some(o=>o.kind==='cue-outcome'&&o.runId===run.id&&o.cueIndex===i&&!o.uncertain))outcomes.push({refId:`OBS.${run.id}.${i}`,tile,from:{...from},to:result.to,result:result.result});from=result.to;}
 }
 const draft=c.drafts.find(d=>d.id===(topic==='story-plan'?'coach-story':'coach-search'))!;
 return {visitId:s.session.visitId,caseRunId:c.caseRunId,revision:s.runtime.contextRevision,room:p.room,topic,loopMode:p.loop.mode,caddyHost:p.caddyHost,arrangementRevision:p.arrangementRevision,order:[...p.order],puppet:{...(r?.puppet??initialPuppet())},runId:r?.id??null,nextCue:r?.nextCue??0,runStatus:r?.status??'none',certified:c.certificate?.arrangementRevision===p.arrangementRevision,premiered:!!c.premiere,exposedRefs:exposedRefs(c),availableAccesses:content.accesses.filter(a=>a.room===p.room||a.id.startsWith('KIT.NOTE.')&&p.caddyHost==='ACT.PLAYER').map(a=>a.id),observedOutcomeRefs:outcomes.map(o=>o.refId),selectedRefs:[...draft.selectedRefs],priorHelp:c.observations.filter(o=>o.kind==='help-displayed').map(o=>({moveId:o.contentIds[0]??'',refs:o.refs,level:o.assistanceLevel??0})),introducedFacts:c.coachingHistory.some(h=>h.contentIds.includes('CT.DIRECT.RAIL')&&h.displayedSeq!==null)?['FACT.STORY.BRIDGE_BEFORE_PLANT','FACT.STORY.PLANT_BEFORE_BLOOM','FACT.STORY.FERRY_OPTIONAL']:[],explanationRevision:draft.revision,theoryRevision:0,observedOutcomes:outcomes};
}
export {startHelp as help} from '../coach/lifecycle.js';
