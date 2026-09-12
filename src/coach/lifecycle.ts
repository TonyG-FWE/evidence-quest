import type {CoachRequest,CoachResponse,Context,CaseState} from '../../contracts/types.js';
import {validateCoachRequest,validateCoachResponse} from '../../contracts/generated/validators.mjs';
import {content} from '../core/content.js';
import {IDENTITY,type State} from '../core/state.js';
import {contextOf,record} from '../core/people.js';
import {allocate,caption,observe,setView,touch,type Mutation} from '../core/reducer.js';
import {prepared,eligible,type Help} from './authored.js';

export type Opportunity=Pick<CoachRequest,'requestId'|'context'|'explanation'>;
type Origin=CaseState['coachingHistory'][number]['origin'];
export interface Presentation extends Help {requestId:string;context:Context;origin:Origin;submittedRecordId:string|null;selection:CoachResponse['selection'];displayed:boolean;earlier:boolean;displayRevision:number|null;}
const equal=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b);
const open=(s:State)=>s.runtime.view.page==='help';
export function current(s:State,request:Pick<CoachRequest,'context'>):boolean{return equal(request.context,contextOf(s,request.context.topic));}
function options(m:Mutation,direct=false,noteHelp=false){
 const topic=m.s.runtime.view.topic==='story'?'story-plan':m.s.case.selectedLead??'where-loop',context=contextOf(m.s,topic);
 context.revision+=m.contextChanged?1:0;
 const repeat=m.s.case.coachingHistory.filter(h=>h.displayedSeq!==null&&h.context.puppet.seed===context.puppet.seed&&h.context.puppet.pip===context.puppet.pip&&h.context.runId===context.runId&&h.contentIds.some(ct=>ct.startsWith('CT.HINT.STORY_')||ct.startsWith('CT.HINT.PROMISE_'))).length;
 return {context,answer:prepared(context,{direct,noteHelp,repeat,topicSelected:m.s.runtime.view.topic!==undefined||m.s.case.selectedLead!==null})};
}
function present(m:Mutation,help:Help,origin:Origin,selection:CoachResponse['selection']=null){
 const q=m.s.session.coach,request=m.s.runtime.helpOpportunity;if(!request||q.winner)return;
 q.winner=origin==='live-selection'?'live':origin==='authored-direct'?'direct':'fallback';q.status='ready';
 m.s.runtime.helpPresentation={...help,requestId:request.requestId,context:structuredClone(request.context),origin,submittedRecordId:m.s.runtime.helpSubmission,selection,displayed:false,earlier:false,displayRevision:null};
 setView(m,{page:'help',topic:request.context.topic==='story-plan'?'story':'search',action:request.requestId});
 m.effects.push({kind:'coach-abort',requestId:request.requestId});
}
export function startHelp(m:Mutation,direct=false,noteHelp=false){
 if(!direct&&m.s.runtime.view.topic===undefined&&m.s.case.selectedLead===null){setView(m,{page:'help'});return;}
 const old=m.s.session.coach;if(old.request)m.effects.push({kind:'coach-abort',requestId:old.request.requestId});
 const {context,answer}=options(m,direct,noteHelp),draft=m.s.case.drafts.find(d=>d.id===(context.topic==='story-plan'?'coach-story':'coach-search'))!;
 if(!direct&&Array.from(draft.text).length>600){caption(m,['CT.UI.LIMIT']);return;}
 const before=m.contextChanged,submitted=!direct&&draft.text.trim()?record(m,'coaching-submission',context.topic==='story-plan'?'story':'search',draft.text,draft.selectedRefs,null):null;
 m.contextChanged=before;const requestId=allocate(m);
 observe(m,'help-requested',{requestId,recordId:submitted?.id??null,origin:direct?'authored-direct':'authored-topic'});m.contextChanged=before;
 const request:CoachRequest={contractKind:'CoachRequest',coachContractVersion:1,identity:IDENTITY,requestId,context,explanation:draft.text};
 m.s.runtime.helpOpportunity=request;
 m.s.session.coach={request:validateCoachRequest(request)?request:null,status:'pending',winner:null,heldResponse:null,fallbackFocused:false,deadlineElapsedMs:0};
 m.s.runtime.helpSubmission=submitted?.id??null;m.s.runtime.helpPresentation=null;
 setView(m,{page:'help',topic:context.topic==='story-plan'?'story':'search'});
 // This milestone has no live service. Only a separately installed development adapter can request a transport.
 if(!direct&&draft.text.trim()&&m.s.runtime.coachTransport==='development'&&validateCoachRequest(request)&&new TextEncoder().encode(JSON.stringify(request)).length<=32768){
  m.effects.push({kind:'coach-send',request});
  for(const ms of [2000,8000,20000])m.effects.push({kind:'timer',ms,command:{type:'COACH_TIME',requestId,ms}});
 }else present(m,answer,direct?'authored-direct':'authored-topic');
}
export function coachingTime(m:Mutation,requestId:string,ms:number){
 const q=m.s.session.coach;if(m.s.runtime.helpOpportunity?.requestId!==requestId||q.winner||!['pending','waiting','offered','ready'].includes(q.status))return;
 q.deadlineElapsedMs=Math.max(q.deadlineElapsedMs,ms);
 if(ms>=20000){q.status='expired';q.heldResponse=null;m.effects.push({kind:'coach-abort',requestId});}
 else if(ms>=8000)q.status='offered';else if(ms>=2000&&q.status==='pending')q.status='waiting';
}
export function receive(m:Mutation,requestId:string,value:unknown){
 const q=m.s.session.coach,r=m.s.runtime.helpOpportunity;
 if(!r||r.requestId!==requestId||q.winner||!['pending','waiting','offered','ready'].includes(q.status)||!current(m.s,r))return;
 if(new TextEncoder().encode(JSON.stringify(value)??'').length>8192||!validateCoachResponse(value)||!equal(value.identity,IDENTITY)||value.requestId!==requestId||value.contextRevision!==r.context.revision||value.contextVisitId!==r.context.visitId||value.status!=='selected'||!value.selection||!eligible(r.context,value.selection)){
  q.status='expired';q.heldResponse=null;m.effects.push({kind:'coach-abort',requestId});return;
 }
 q.heldResponse=structuredClone(value);
 const before=m.contextChanged;observe(m,'help-selected',{requestId,interpretation:value.selection.interpretation,refs:value.selection.refs,uncertain:value.selection.uncertain,origin:'live-selection'});m.contextChanged=before;
 if(q.status!=='offered'&&!q.fallbackFocused){q.status='ready';if(open(m.s))choose(m,'live');}
}
export function choose(m:Mutation,choice:'live'|'fallback'){
 const q=m.s.session.coach,r=m.s.runtime.helpOpportunity;if(!r||q.winner||!current(m.s,r)||['stale','canceled'].includes(q.status))return;
 if(choice==='live'){
  const response=q.heldResponse,selection=response?.selection;if(!selection||!eligible(r.context,selection))return;
  const move=content.coachingMoves.find(move=>move.id===selection.moveId);if(!move)return;
  present(m,{contentIds:[move.contentCt],refs:selection.refs,level:move.level,introduces:move.introduces},'live-selection',selection);
 }else present(m,prepared(r.context,{topicSelected:true}),'authored-fallback');
}
export function display(m:Mutation,requestId:string){
 const p=m.s.runtime.helpPresentation,q=m.s.session.coach,r=m.s.runtime.helpOpportunity;
 if(!open(m.s)||!p||p.requestId!==requestId||p.displayed||p.earlier||!r||!current(m.s,r))return;
 if(p.selection&&!eligible(r.context,p.selection))return;
 const seq=observe(m,'help-displayed',{requestId,recordId:p.submittedRecordId,contentIds:p.contentIds,refs:p.refs,assistanceLevel:p.level,origin:p.origin,interpretation:p.selection?.interpretation??null,uncertain:p.selection?.uncertain??false});
 m.s.case.coachingHistory.push({requestId,submittedRecordId:p.submittedRecordId,context:structuredClone(p.context),contentIds:p.contentIds,selection:p.selection,origin:p.origin,displayedSeq:seq});
 p.displayed=true;q.status='displayed';
}
export function cancelHelp(m:Mutation){
 const q=m.s.session.coach;if(q.request)m.effects.push({kind:'coach-abort',requestId:q.request.requestId});q.status='canceled';q.heldResponse=null;if(!m.s.runtime.helpPresentation?.displayed)m.s.runtime.helpPresentation=null;
}
export function reconcile(m:Mutation){
 const q=m.s.session.coach,r=m.s.runtime.helpOpportunity,p=m.s.runtime.helpPresentation;if(!r)return;
 if(p?.displayed){if(m.e.command.type==='COACH_DISPLAY'&&p.displayRevision===null)p.displayRevision=m.s.runtime.contextRevision;else if(p.displayRevision!==m.s.runtime.contextRevision)p.earlier=true;return;}
 if(!current(m.s,r)){
  if(p?.displayed)p.earlier=true;
  else {m.s.runtime.helpPresentation=null;if(!['canceled','idle'].includes(q.status))q.status='stale';}
  q.heldResponse=null;m.effects.push({kind:'coach-abort',requestId:r.requestId});
 }
}
