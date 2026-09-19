import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import type {SaveEnvelope} from '../contracts/types.js';
import {newCase,IDENTITY,initialState} from '../src/core/state.js';
import {inspectSave} from '../src/save/validate.js';
import {Store} from '../src/core/store.js';
function envelope():SaveEnvelope{return {contractKind:'SaveEnvelope',saveFormatVersion:1,identity:IDENTITY,appBuild:'synthetic-test',slotRevision:3,writerVisitId:randomUUID(),writtenAt:new Date().toISOString(),payload:newCase(randomUUID())};}
test('save decoder rejects unknown identities, oversized, malformed, impossible physical and source facts without selective salvage',()=>{
 const good=envelope();assert.equal(inspectSave(JSON.stringify(good)).status,'valid');assert.equal(inspectSave(undefined).status,'empty');
 assert.equal(inspectSave('{').status,'damaged');assert.equal(inspectSave('x'.repeat(2*1024*1024+1)).status,'damaged');
 const variants=[{...good,saveFormatVersion:2},{...good,identity:{...IDENTITY,contentRevision:99}}];for(const v of variants)assert.equal(inspectSave(JSON.stringify(v)).status,'version');
 for(const edit of [(v:SaveEnvelope)=>{v.payload.physical.avatar=[0,0];},(v:SaveEnvelope)=>{v.payload.physical.loop.mode='docked';},(v:SaveEnvelope)=>{v.payload.physical.order=['TILE.FERRY'];},(v:SaveEnvelope)=>{v.payload.grants.push({sourceId:'E3',refs:['E3.a'],viaAccessId:'ST.ACCESS.E2',seq:0});}]){const v=structuredClone(good);edit(v);assert.equal(inspectSave(JSON.stringify(v)).status,'damaged');}
});
test('only a damaged pending playback is salvageable; a damaged historical premiere is not fabricated',()=>{
 const good=envelope();good.payload.physical.caddyHost='ST.RACK.BAY';good.payload.physical.loop={mode:'docked',room:'SC.ST',feet:[76,35]};good.payload.physical.objects.dockFlapOpen=true;
 const broken=JSON.parse(JSON.stringify(good));broken.payload.playback={unexpected:'synthetic corrupt run'};
 const result=inspectSave(JSON.stringify(broken));assert.equal(result.status,'run');assert.equal(result.envelope?.payload.playback,null);
 broken.payload.physical.avatar=[0,0];assert.equal(inspectSave(JSON.stringify(broken)).status,'damaged');
 const history=structuredClone(good);history.payload.premiere={runId:randomUUID(),arrangementRevision:0,order:[],completedSeq:0};assert.equal(inspectSave(JSON.stringify(history)).status,'damaged');
});
test('disk restoration retires old visit, marks uncertainty, pauses at committed cue boundary without replaying',()=>{
 const s=structuredClone(initialState(randomUUID(),randomUUID()));s.runtime.hasLiveVisit=true;s.runtime.view={page:'work'};s.case.physical.avatar=[78,58];s.case.physical.caddyHost='ST.RACK.BAY';s.case.physical.loop={mode:'docked',room:'SC.ST',feet:[76,35]};s.case.physical.objects.dockFlapOpen=true;s.case.physical.order=['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM'];
 const original=new Store(s);original.send({type:'RUN',mode:'rehearsal'});const active=original.getSnapshot().case.playback!.activeCue!;
 const boot=new Store(initialState(randomUUID(),randomUUID()));boot.send({type:'BOOT',generation:boot.getSnapshot().runtime.bootGeneration,status:'saved',candidate:original.getSnapshot().case});boot.send({type:'RESTORE',visitId:randomUUID()});
 const after=boot.getSnapshot();assert(after.case.historyUncertain);assert.equal(after.case.playback!.nextCue,0);assert.equal(after.case.playback!.status,'paused');assert.equal(after.case.playback!.activeCue,null);assert.equal(after.case.playback!.mode,'rehearsal');assert(after.case.observations.some(o=>o.kind==='possible-outcome'&&o.cueIndex===active.index));
 boot.send({type:'CUE_READY',runId:after.case.playback!.id,cueId:active.id});assert.equal(boot.getSnapshot().case.playback!.nextCue,0);
});
