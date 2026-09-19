import test from 'node:test';
import assert from 'node:assert/strict';
import {Store} from '../src/core/store.js';
import {initialState} from '../src/core/state.js';

test('T.VISIBILITY.RETURN preserves the open private draft, ignores duplicate return and never records a learning outcome',()=>{
 const store=new Store(initialState('before','old-visit'));store.send({type:'NEW_GAME',caseId:'case',visitId:'visit'});store.send({type:'VIEW',view:{page:'plan',topic:'search'}});store.send({type:'DRAFT',id:'search-plan',text:'My unfinished idea 🦊'});
 const before=store.getSnapshot();store.send({type:'BACKGROUND'});store.send({type:'BACKGROUND'});store.send({type:'FOREGROUND'});store.send({type:'FOREGROUND'});
 const returned=store.getSnapshot();assert.deepEqual(returned.case,before.case);assert.deepEqual(returned.runtime.view,before.runtime.view);assert.equal(returned.runtime.foregroundNotice,true);assert.deepEqual(returned.session.heldKeys,[]);
 store.send({type:'FOCUS',owner:'text'});assert.equal(store.getSnapshot().runtime.foregroundNotice,true);
 store.send({type:'DRAFT',id:'search-plan',text:'My unfinished idea 🦊, continued'});assert.equal(store.getSnapshot().runtime.foregroundNotice,false);assert.equal(store.getSnapshot().case.records.length,0);
});

test('T.VISIBILITY.HIDE/RETURN settles one active cue, preserves mode, and requires explicit Continue after acknowledgment',()=>{
 const state=structuredClone(initialState('case','visit'));state.runtime.hasLiveVisit=true;state.runtime.view={page:'work'};state.case.physical.caddyHost='ST.RACK.BAY';state.case.physical.loop={room:'SC.ST',feet:[76,35],mode:'docked'};state.case.physical.avatar=[78,58];state.case.physical.order=['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM'];
 const store=new Store(state);store.send({type:'RUN',mode:'rehearsal'});const active=store.getSnapshot().case.playback!;assert(active.activeCue);
 store.send({type:'BACKGROUND'});const paused=structuredClone(store.getSnapshot().case.playback);store.send({type:'FOREGROUND'});store.send({type:'CUE_READY',runId:active.id,cueId:active.activeCue.id});store.send({type:'ACK_FOREGROUND'});store.send({type:'TICK',ms:1000});
 const current=store.getSnapshot();assert.deepEqual(current.case.playback,paused);assert.equal(current.case.playback!.status,'paused');assert.equal(current.case.playback!.nextCue,1);assert.equal(current.case.playback!.mode,'rehearsal');assert.equal(current.runtime.foregroundNotice,false);assert.equal(current.case.certificate,null);assert.equal(current.case.premiere,null);
 store.send({type:'CONTINUE_RUN'});assert.equal(store.getSnapshot().case.playback!.activeCue?.index,1);
});
