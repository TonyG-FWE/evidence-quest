// Loaded only by Vite's development branch and an explicit coach-test URL.
// Scripted selections are lifecycle evidence, never interpretation evaluation.
import type {CoachRequest,CoachResponse} from '../../contracts/types.js';
import type {Effect,Envelope} from '../core/commands.js';
import type {Store} from '../core/store.js';
export function install(store:Store){
 const calls:Array<{request:CoachRequest;owner:Pick<Envelope,'caseId'|'visitId'>;aborted:boolean}>=[];
 const api={
  calls:()=>structuredClone(calls),snapshot:()=>store.getSnapshot(),
  advance:(ms:number,index=calls.length-1)=>{const call=calls[index];if(call)store.callback({type:'COACH_TIME',requestId:call.request.requestId,ms},call.owner);},
  respond:(selection:CoachResponse['selection'],index=calls.length-1,status:CoachResponse['status']='selected')=>{const call=calls[index];if(!call)return;const r=call.request;
   store.callback({type:'COACH_RECEIVE',requestId:r.requestId,response:{contractKind:'CoachResponse',coachContractVersion:1,identity:r.identity,requestId:r.requestId,contextRevision:r.context.revision,contextVisitId:r.context.visitId,status,selection}},call.owner);
  },
  raw:(response:unknown,index=calls.length-1)=>{const call=calls[index];if(call)store.callback({type:'COACH_RECEIVE',requestId:call.request.requestId,response},call.owner);},
 };
 Object.assign(window,{__eqCoachTest:api});document.documentElement.dataset.coachTest='synthetic-lifecycle-only';store.send({type:'COACH_DEVELOPMENT'});
 const label=document.createElement('aside');label.textContent='Development test: scripted coaching. No model calls.';label.setAttribute('role','note');Object.assign(label.style,{position:'fixed',right:'4px',top:'4px',maxWidth:'210px',padding:'6px',font:'12px sans-serif',background:'#FFF9E9',color:'#18324B',border:'1px solid #18324B',zIndex:'9999',pointerEvents:'none'});document.body.append(label);
 return {handle:(effect:Effect,envelope:Envelope)=>{
  if(effect.kind==='coach-abort'){const call=calls.find(c=>c.request.requestId===effect.requestId);if(call)call.aborted=true;}
  if(effect.kind==='coach-send'){
   calls.push({request:structuredClone(effect.request),owner:{caseId:envelope.caseId,visitId:envelope.visitId},aborted:false});
   const index=calls.length-1;setTimeout(()=>{if(!calls[index]!.aborted)api.respond(null,index,'timeout');},15000);
  }
 }};
}
