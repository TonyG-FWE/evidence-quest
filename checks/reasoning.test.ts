import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {initialState} from '../src/core/state.js';
import {reduce} from '../src/core/reducer.js';
import type {Command} from '../src/core/commands.js';
import {parts} from '../src/core/content.js';
import {comparisonDraft,timeline,metadataKnown} from '../src/core/reasoning.js';
import {validCase} from '../src/save/validate.js';
import {goal} from '../src/ui/labels.js';

function game(){
 let s=initialState(randomUUID(),randomUUID());
 const send=(command:Command)=>{s=reduce(s,{command,id:randomUUID(),ids:Array.from({length:32},randomUUID),visitId:s.session.visitId,caseId:s.case.caseRunId}).state;return s;};
 const finish=()=>{for(let i=0;s.runtime.intent&&i<1000;i++){if(s.runtime.intent.stage==='operating')send({type:'ACTION_READY',actionId:s.runtime.intent.id});else send({type:'TICK',ms:100});}assert.equal(s.runtime.intent,null);};
 const target=(target:string,action?:string)=>{send({type:'TARGET',target,...(action?{action}:{})});finish();};
 const expose=(refId:string,viaAccessId='ACC.EVIDENCE.'+(refId.startsWith('NAV')?'NAV':refId.slice(0,2)))=>{const part=parts.get(refId)!;send({type:'EXPOSE',exposure:{refId,ctId:part.ctId,spans:part.spans,visualComplete:false,viaAccessId}});};
 send({type:'NEW_GAME',caseId:randomUUID(),visitId:randomUUID()});send({type:'INTRO',action:'skip'});
 return {send,finish,target,expose,get:()=>s};
}

test('FIX11.TOOLS empty, text-only and excess Unicode drafts remain private; only actual revisions gain a prior snapshot',()=>{
 const h=game();h.send({type:'VIEW',view:{page:'compare'}});assert.equal(h.get().session.taskState,'UI.COMPARE.EMPTY');
 h.send({type:'SAVE_IDEA',comparison:true});assert.equal(h.get().runtime.caption[0],'CT.UI.NOTHING');assert.equal(h.get().case.records.length,0);
 const excess='🌱'.repeat(601);h.send({type:'COMPARISON',note:excess});h.send({type:'SAVE_IDEA',comparison:true});assert.equal(comparisonDraft(h.get().case)!.note,excess);assert.equal(h.get().case.records.length,0);assert(validCase(h.get().case));
 h.send({type:'COMPARISON',note:'I want to check the notice.'});h.send({type:'SAVE_IDEA',comparison:true});
 const first=h.get().case.records[0]!,frozen=structuredClone(first);assert.equal(first.previousRecordId,null);assert.equal(first.recipient,null);assert.equal(h.get().session.taskState,'UI.IDEA.RECORDED');
 h.send({type:'EDIT_IDEA',id:first.id});h.send({type:'SAVE_IDEA',comparison:true});assert.equal(h.get().case.records.length,1,'Unchanged edit is not a fabricated revision');
 h.send({type:'EDIT_IDEA',id:first.id});h.send({type:'COMPARISON',note:'I want to ask what the notice applies to.'});h.send({type:'SAVE_IDEA',comparison:true});assert.equal(h.get().case.records[1]!.previousRecordId,first.id);assert.deepEqual(h.get().case.records[0],frozen);
 h.send({type:'DRAFT',id:'private',text:'My separate idea'});h.send({type:'SAVE_IDEA'});const separate=h.get().case.records.at(-1)!;assert.equal(separate.previousRecordId,null);assert.equal(separate.recipient,null);assert.deepEqual(h.get().case.npcReceived,[]);assert(validCase(h.get().case));
});

test('FIX11.TOOLS owned comparison slots accept one or same-source details; relationships never change source chronology',()=>{
 const h=game();h.send({type:'COMPARISON',slot:'leftRef',ref:'E3.a'});assert.equal(h.get().case.comparisons.length,0);
 h.target('ST.EXIT.CY');h.target('CY.SOURCE.E3','flatten');h.expose('E3.a');h.expose('E3.b');
 h.send({type:'VIEW',view:{page:'compare'}});h.send({type:'COMPARISON',slot:'leftRef',ref:'E3.a'});assert.equal(h.get().session.taskState,'UI.COMPARE.PARTIAL');
 h.send({type:'SAVE_IDEA',comparison:true});assert.deepEqual(h.get().case.records[0]!.refs,['E3.a']);
 h.send({type:'EDIT_IDEA',id:h.get().case.records[0]!.id});h.send({type:'COMPARISON',slot:'rightRef',ref:'E3.b'});assert.equal(h.get().session.taskState,'UI.COMPARE.READY');
 const before=timeline(h.get().case),observations=h.get().case.observations.length;h.send({type:'COMPARISON',relationship:'happened-before'});assert.deepEqual(timeline(h.get().case),before);assert.equal(h.get().case.observations.length,observations);
 h.send({type:'SAVE_IDEA',comparison:true});const snapshot=structuredClone(h.get().case.comparisons.find(row=>row.recordedSeq!==null&&row.id===h.get().case.records.at(-1)!.id));
 h.send({type:'COMPARISON',slot:'leftRef',ref:null});assert.deepEqual(h.get().case.comparisons.find(row=>row.id===snapshot!.id),snapshot);assert(validCase(h.get().case));
 const corrupt=structuredClone(h.get().case);corrupt.comparisons[0]!.rightRef='E6.a';assert(!validCase(corrupt));
 const changed=structuredClone(h.get().case);changed.comparisons.find(row=>row.recordedSeq!==null)!.note='fabricated';assert(!validCase(changed));
});

test('FIX11.TOOLS timeline records only displayed metadata; request, notice, recording and post remain different events',()=>{
 const h=game();h.target('ST.SOURCE.E4');h.expose('E4.a');assert.equal(timeline(h.get().case)[0]!.minute,null);
 h.send({type:'VIEW',view:{page:'world'}});h.send({type:'METADATA_SEEN',ref:'E4.a'});assert(!metadataKnown(h.get().case,'E4.a'));
 h.send({type:'VIEW',view:{page:'reader',sourceId:'E4'}});h.send({type:'METADATA_SEEN',ref:'E4.a'});assert.equal(timeline(h.get().case)[0]!.minute,545);assert.equal(timeline(h.get().case)[0]!.typeCt,'CT.TIMELINE.PLAN');
 h.target('ST.ACCESS.E2');h.expose('E2.a/frame1');h.expose('E2.c');assert(!timeline(h.get().case).some(row=>row.id==='E2.recording'||row.id==='E2.post'));
 h.send({type:'METADATA_SEEN',ref:'E2.c'});h.send({type:'METADATA_SEEN',ref:'E2.a/frame1'});const rows=timeline(h.get().case);assert.deepEqual(rows.filter(row=>row.minute!==null).map(row=>row.minute),[545,552,553]);assert.equal(rows.find(row=>row.id==='E2.post')!.typeCt,'CT.TIMELINE.POST');
 assert.equal(h.get().case.exposures.filter(e=>e.refId==='E2.a/frame2').length,0,'Time header did not expose a hidden frame');assert(!rows.some(row=>row.minute===558));assert(validCase(h.get().case));
 const corrupt=structuredClone(h.get().case);corrupt.observations.find(o=>o.contentIds.includes('CT.META.RECORDED'))!.contentIds=['CT.META.CAPTURED'];assert(!validCase(corrupt));
});

test('FIX11.TOOLS Follow is a private question; explicit Go walks public doors, can stop, and resumes no closed reader',()=>{
 const h=game();h.target('ST.SOURCE.E1');h.send({type:'SOURCE_POSITION',sourceId:'E1',componentRef:'E1.a',frame:null,scrollFraction:.6});const reader=h.get().runtime.view;
 h.send({type:'VIEW',view:{page:'words',previous:reader}});assert.equal(h.get().case.readerResume!.scrollFraction,.6);h.send({type:'VIEW',view:reader});h.send({type:'VIEW',view:{page:'world'}});assert.equal(h.get().case.readerResume,null);
 h.send({type:'LEAD',lead:'where-loop',destination:'SC.MD'});assert.equal(h.get().case.selectedLead,null,'Unseen destination is not selected');
 h.send({type:'VIEW',view:{page:'map'}});h.expose('NAV.MEDIA');const position=h.get().case.physical.avatar;
 h.send({type:'LEAD',lead:'where-loop',destination:'SC.MD'});assert.deepEqual(h.get().case.physical.avatar,position);assert.equal(h.get().runtime.intent,null);assert.equal(h.get().runtime.view.page,'world');
 h.send({type:'GO',destination:'SC.MD'});assert.equal(h.get().runtime.intent!.target,'ST.EXIT.WK');h.send({type:'STOP_WALK'});assert.equal(h.get().case.physical.room,'SC.ST');assert.equal(h.get().runtime.intent,null);
 h.send({type:'GO',destination:'SC.MD'});h.finish();assert.equal(h.get().case.physical.room,'SC.MD');assert.equal(h.get().case.readerResume,null);assert.deepEqual(h.get().case.npcReceived,[]);assert(validCase(h.get().case));
});

test('ER13 Stage mission describes each remaining physical handoff without a tile solution',()=>{
 const h=game(),c=structuredClone(h.get().case);c.physical.loop.mode='following';c.physical.loop.room='SC.ST';c.physical.caddyHost='ACT.PLAYER';assert.equal(goal(c),'CT.ER13.HANDOFF_BOTH');
 c.physical.caddyHost='ST.RACK.BAY';assert.equal(goal(c),'CT.ER13.HANDOFF_LOOP');c.physical.caddyHost='MD.RACK.STATION';assert.equal(goal(c),'CT.ER13.LOOP_THEN_KIT');
 c.physical.caddyHost='ACT.PLAYER';c.physical.loop.mode='docked';assert.equal(goal(c),'CT.ER13.HANDOFF_KIT');c.physical.caddyHost='ST.RACK.BAY';assert.equal(goal(c),'CT.GOAL.REHEARSE');
});
