import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {initialState,IDENTITY,type State} from '../src/core/state.js';
import {reduce} from '../src/core/reducer.js';
import type {Command,Effect} from '../src/core/commands.js';
import {validateSession} from '../contracts/generated/validators.mjs';
import {validCase} from '../src/save/validate.js';
function harness(){let s=structuredClone(initialState(randomUUID(),randomUUID()));s.runtime.view={page:'help',topic:'story'};const effects:Effect[]=[];
 const send=(command:Command)=>{const r=reduce(s,{command,id:randomUUID(),ids:Array.from({length:32},randomUUID),visitId:s.session.visitId,caseId:s.case.caseRunId});s=r.state;effects.push(...r.effects);return s;};
 return {send,get:()=>s,effects};
}
function response(s:State,extra:Record<string,unknown>={}){const r=s.session.coach.request!;return {contractKind:'CoachResponse',coachContractVersion:1,identity:IDENTITY,requestId:r.requestId,contextRevision:r.context.revision,contextVisitId:r.context.visitId,status:'selected',selection:{moveId:'CLARIFY',refs:[],interpretation:'unclear',uncertain:true},...extra};}
const displayed=(s:State)=>s.case.observations.filter(o=>o.kind==='help-displayed');
test('authored and direct help count only native display; empty drafts make no request and no invented reading',()=>{
 const h=harness();h.send({type:'HELP'});assert.equal(h.get().session.coach.request,null);assert(validateSession(h.get().session));assert.equal(displayed(h.get()).length,0);assert.equal(h.effects.some(e=>e.kind==='coach-send'),false);
 const p=h.get().runtime.helpPresentation!;assert(p.contentIds.includes('CT.HINT.STORY_UNTRIED'));h.send({type:'VIEW',view:{page:'world'}});h.send({type:'COACH_DISPLAY',requestId:p.requestId});assert.equal(displayed(h.get()).length,0);
 h.send({type:'VIEW',view:{page:'help',topic:'story'}});h.send({type:'COACH_DISPLAY',requestId:p.requestId});h.send({type:'COACH_DISPLAY',requestId:p.requestId});assert.equal(displayed(h.get()).length,1);assert(validCase(h.get().case));
 h.send({type:'FOCUS',owner:'task'});assert.equal(h.get().runtime.helpPresentation!.earlier,false);
 h.send({type:'HELP',direct:true});h.send({type:'COACH_DISPLAY',requestId:h.get().runtime.helpPresentation!.requestId});assert.equal(h.get().case.coachingHistory.at(-1)!.origin,'authored-direct');assert.deepEqual(h.get().case.grants,[]);assert.deepEqual(h.get().case.physical.order,[]);
});
test('closed replies stay held; focused fallback survives arrival and wins once over duplicate/late selection',()=>{
 const h=harness();h.send({type:'COACH_DEVELOPMENT'});h.send({type:'DRAFT',id:'coach-story',text:'It goes there.'});h.send({type:'HELP'});const r=h.get().session.coach.request!,reply=response(h.get());assert(validateSession(h.get().session));
 h.send({type:'COACH_TIME',requestId:r.requestId,ms:2000});assert.equal(h.get().session.coach.status,'waiting');
 h.send({type:'VIEW',view:{page:'world'}});h.send({type:'COACH_TIME',requestId:r.requestId,ms:8000});h.send({type:'COACH_RECEIVE',requestId:r.requestId,response:reply});assert.equal(h.get().runtime.helpPresentation,null);assert.equal(displayed(h.get()).length,0);
 h.send({type:'VIEW',view:{page:'help',topic:'story'}});h.send({type:'COACH_FOCUS',focused:true});h.send({type:'COACH_CHOOSE',choice:'fallback'});assert.equal(h.get().session.coach.winner,'fallback');h.send({type:'COACH_RECEIVE',requestId:r.requestId,response:reply});h.send({type:'COACH_DISPLAY',requestId:r.requestId});assert.equal(displayed(h.get()).length,1);assert.equal(h.get().case.coachingHistory[0]!.origin,'authored-fallback');assert(validateSession(h.get().session));assert(validCase(h.get().case));
});
test('relevant edits tombstone requests; save/focus/settings/movement do not; malformed/timeout fall back',()=>{
 const h=harness();h.send({type:'COACH_DEVELOPMENT'});h.send({type:'DRAFT',id:'coach-story',text:'It goes there.'});h.send({type:'HELP'});const r=h.get().session.coach.request!,reply=response(h.get());
 h.send({type:'FOCUS',owner:'world'});h.send({type:'PREF',key:'sound',value:'off'});h.send({type:'SAVE_MODE',mode:'unavailable'});h.send({type:'TICK',ms:50});assert.equal(h.get().session.coach.status,'pending');
 h.send({type:'DRAFT',id:'coach-story',text:'The seed goes there.'});assert.equal(h.get().session.coach.status,'stale');h.send({type:'COACH_RECEIVE',requestId:r.requestId,response:reply});assert.equal(displayed(h.get()).length,0);
 h.send({type:'HELP'});const second=h.get().session.coach.request!;h.send({type:'COACH_RECEIVE',requestId:second.requestId,response:{...response(h.get()),action:'finish-game'}});assert.equal(h.get().session.coach.status,'expired');assert.equal(h.get().case.premiere,null);
 h.send({type:'HELP'});h.send({type:'COACH_TIME',requestId:h.get().session.coach.request!.requestId,ms:20000});assert.equal(h.get().session.coach.status,'expired');h.send({type:'COACH_CANCEL'});assert.equal(h.get().case.drafts.find(d=>d.id==='coach-story')!.text,'The seed goes there.');
});
test('valid current live proposal is still undisplayed until native acknowledgment and rejects hidden source references',()=>{
 const h=harness();h.send({type:'COACH_DEVELOPMENT'});h.send({type:'DRAFT',id:'coach-story',text:'It goes there.'});h.send({type:'HELP'});let r=h.get().session.coach.request!;
 h.send({type:'COACH_RECEIVE',requestId:r.requestId,response:response(h.get(),{selection:{moveId:'FULL_PROMISE',refs:['E6.a'],interpretation:'goal_incomplete',uncertain:false}})});assert.equal(h.get().session.coach.status,'expired');
 h.send({type:'HELP'});r=h.get().session.coach.request!;h.send({type:'COACH_RECEIVE',requestId:r.requestId,response:response(h.get())});assert.equal(displayed(h.get()).length,0);assert.equal(h.get().runtime.helpPresentation?.origin,'live-selection');h.send({type:'COACH_DISPLAY',requestId:r.requestId});assert.equal(displayed(h.get()).length,1);assert.equal(h.get().case.coachingHistory.at(-1)?.selection?.moveId,'CLARIFY');assert(validCase(h.get().case));
});
