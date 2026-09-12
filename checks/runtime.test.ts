import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import type {Order,Puppet} from '../contracts/types.js';
import {validateCaseSnapshot,validateSession} from '../contracts/generated/validators.mjs';
import {initialState,IDENTITY,type State} from '../src/core/state.js';
import {reduce} from '../src/core/reducer.js';
import type {Command,Effect} from '../src/core/commands.js';
import {Store} from '../src/core/store.js';
import {content} from '../src/core/content.js';
import {validCase} from '../src/save/validate.js';
import {findPath,clearSegment,legal,roomData} from '../src/physical/navigation.js';

const fixtures=JSON.parse(readFileSync('docs/design/evidence-quest-design-v3/11-build-packet/acceptance-fixtures.json','utf8')) as {arrangements:Array<{id:string;order:Order;steps:Array<{after:Puppet;result:string;captionCtId:string;nextCue:number}>;final:Puppet;success:boolean}>};
function harness(order:Order=[],ready=true){
 let s:State=structuredClone(initialState('00000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000002'));const effects:Effect[]=[];
 s.runtime.view={page:'work'};s.session.inputOwner='task';s.case.physical.avatar=[78,58];s.case.physical.caddyHost=ready?'ST.RACK.BAY':'MD.RACK.STATION';s.case.physical.objects.dockFlapOpen=ready;s.case.physical.loop=ready?{mode:'docked',room:'SC.ST',feet:[76,35]}:s.case.physical.loop;s.case.physical.order=order;
 const send=(command:Command,id?:string)=>{const r=reduce(s,{id:id??randomUUID(),ids:Array.from({length:32},randomUUID),visitId:s.session.visitId,caseId:s.case.caseRunId,command});s=r.state;effects.push(...r.effects);return s;};
 return {send,get:()=>s,effects};
}
test('fresh constructor is closed-schema valid and immutable; React snapshots retain identity until a command',()=>{
 const s=initialState(randomUUID(),randomUUID());assert(validateCaseSnapshot({contractKind:'CaseSnapshot',identity:IDENTITY,state:s.case}),JSON.stringify(validateCaseSnapshot.errors));assert(validateSession(s.session),JSON.stringify(validateSession.errors));assert.throws(()=>{s.case.physical.avatar[0]=99;});
 const store=new Store(s);assert.equal(store.getSnapshot(),store.getSnapshot());let notifications=0;store.subscribe(()=>notifications++);store.send({type:'FOCUS',owner:'world'});assert.equal(notifications,1);assert.equal(s.session.inputOwner,'home');
});
test('serialized effect callbacks can dispatch without clobbering an earlier snapshot',()=>{
 let store:Store;store=new Store(initialState('case','visit'),effect=>{if(effect.kind==='save')store.send({type:'FOCUS',owner:'task'});});store.send({type:'NEW_GAME',caseId:'new',visitId:'new-visit'});assert.equal(store.getSnapshot().case.caseRunId,'new');assert.equal(store.getSnapshot().session.inputOwner,'task');
});
test('transport callbacks allocate a fresh receipt even when given the entire parent envelope',()=>{
 let store:Store;let pending:(()=>void)|null=null;
 store=new Store(initialState(randomUUID(),randomUUID()),(effect,envelope)=>{if(effect.kind==='timer')pending=()=>store.callback(effect.command,envelope);});
 store.send({type:'NEW_GAME',caseId:randomUUID(),visitId:randomUUID()});store.send({type:'TARGET',target:'ST.EXIT.WK'});
 for(let i=0;i<100;i++)store.send({type:'TICK',ms:100});
 assert(pending);(pending as ()=>void)();assert.equal(store.getSnapshot().case.physical.room,'SC.WK');
});
test('all 65 authored arrangements pass actual run/cue/finalization handlers and captions',()=>{
 let wins=0;
 for(const f of fixtures.arrangements){
  const h=harness(f.order);h.send({type:'RUN',mode:'rehearsal'});
  if(f.order.length===0){assert.equal(h.get().case.playback,null);continue;}
  const runId=h.get().case.playback!.id;
  for(let i=0;i<f.steps.length;i++){
   if(!h.get().case.playback!.activeCue)h.send({type:'START_CUE',runId});
   const cue=h.get().case.playback!.activeCue!;assert(cue,`${f.id}/${i}`);
   h.send({type:'CUE_READY',runId,cueId:cue.id});const state=h.get(),run=state.case.playback!,expected=f.steps[i]!;
   assert.deepEqual(run.puppet,expected.after,f.id);assert.equal(run.nextCue,expected.nextCue,f.id);assert.equal(state.runtime.caption[0],expected.captionCtId,f.id);
   const seq=state.case.lastObservationSeq;h.send({type:'CUE_READY',runId,cueId:cue.id});assert.equal(h.get().case.lastObservationSeq,seq,'duplicate endpoint');
   if(run.status==='paused')h.send({type:'CONTINUE_RUN'});
  }
  assert.equal(h.get().case.certificate,null,'No certification before full finalization');
  h.send({type:'FINALIZE_RUN',runId});assert.deepEqual(h.get().case.playback!.puppet,f.final);assert.equal(Boolean(h.get().case.certificate),f.success,f.id);
  assert(validateCaseSnapshot({contractKind:'CaseSnapshot',identity:IDENTITY,state:h.get().case}),JSON.stringify(validateCaseSnapshot.errors));assert(validCase(h.get().case),`${f.id} semantic save integrity`);if(f.success)wins++;
 }
 assert.equal(wins,5);
});
test('interruption settles an active cue once, terminal resume finalizes without replay; edits preserve historical premiere',()=>{
 const h=harness(['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM','TILE.FERRY']);h.send({type:'RUN',mode:'rehearsal'});const id=h.get().case.playback!.id,first=h.get().case.playback!.activeCue!.id;
 h.send({type:'BACKGROUND'});assert.equal(h.get().case.playback!.nextCue,1);h.send({type:'CUE_READY',runId:id,cueId:first});assert.equal(h.get().case.playback!.nextCue,1);
 h.send({type:'CONTINUE_RUN'});
 for(let i=1;i<4;i++){if(!h.get().case.playback!.activeCue)h.send({type:'START_CUE',runId:id});h.send({type:'CUE_READY',runId:id,cueId:h.get().case.playback!.activeCue!.id});}
 h.send({type:'PAUSE_RUN',reason:'user'});assert.equal(h.get().case.certificate,null);h.send({type:'CONTINUE_RUN'});h.send({type:'FINALIZE_RUN',runId:id});assert(h.get().case.certificate);
 h.send({type:'RUN',mode:'show'});const show=h.get().case.playback!.id;assert.deepEqual(h.get().case.playback!.puppet,{pip:'left',seed:'left',boats:'separate',lit:false});
 for(let i=0;i<4;i++){if(!h.get().case.playback!.activeCue)h.send({type:'START_CUE',runId:show});h.send({type:'CUE_READY',runId:show,cueId:h.get().case.playback!.activeCue!.id});}
 assert.equal(h.get().case.premiere,null);h.send({type:'FINALIZE_RUN',runId:show});const premiere=h.get().case.premiere;assert(premiere);
 h.send({type:'SELECT_TILE',tile:'TILE.FERRY'});h.send({type:'EDIT_RAIL',operation:'return',index:3});assert.equal(h.get().case.certificate,null);assert.deepEqual(h.get().case.premiere,premiere);
});
test('save acknowledgment belongs to its captured case, visit and token; it cannot acknowledge newer edits',()=>{
 const h=harness();h.send({type:'SAVE_BEGIN',token:'save-1',revision:0});h.send({type:'DRAFT',id:'search-plan',text:'My own plan'});const revision=h.get().case.revision;
 h.send({type:'SAVE_ACK',token:'save-1',revision:0,slotRevision:1,caseId:'other',visitId:'test-visit'});assert(h.get().session.saving.writeInFlight);
 h.send({type:'SAVE_ACK',token:'save-1',revision:0,slotRevision:1,caseId:h.get().case.caseRunId,visitId:h.get().session.visitId});assert.equal(h.get().session.saving.acknowledgedRevision,0);assert.equal(h.get().session.saving.currentRevision,revision);
 h.send({type:'SAVE_BEGIN',token:'save-2',revision});h.send({type:'SAVE_FAILED',token:'save-1',mode:'unavailable'});assert.equal(h.get().session.saving.mode,'normal');
});
test('all authored approach anchors are reachable without sweeping through any expanded obstacle',()=>{
 let count=0;
 for(const room of content.rooms)for(const o of content.objects.filter(o=>o.room===room.id))for(const goal of o.approaches){const path=findPath(room,room.initialArrival,goal);assert(path,`${o.id} route`);let start=room.initialArrival;for(const end of path){assert(clearSegment(room,start,end),o.id);start=end;}count++;}
 assert.equal(count,61);assert.equal(findPath(roomData('SC.ST'),[20,50],[20,33]),null);
});
test('retargeting and canceled notice operations cannot commit; fixed movement stays on legal floor',()=>{
 const h=harness([],false);h.send({type:'VIEW',view:{page:'world'}});h.send({type:'TARGET',target:'ST.SOURCE.E1'},'old');h.send({type:'TARGET',target:'ST.EXIT.WK'},'new');h.send({type:'ACTION_READY',actionId:'old'});assert.equal(h.get().case.physical.objects.briefOpen,false);
 for(let i=0;i<70;i++){h.send({type:'TICK',ms:100});assert(legal(roomData(h.get().case.physical.room),h.get().case.physical.avatar));}
 h.send({type:'ACTION_READY',actionId:'new'});assert.equal(h.get().case.physical.room,'SC.WK');assert.equal(h.get().case.physical.loop.room,'SC.MD');
});
