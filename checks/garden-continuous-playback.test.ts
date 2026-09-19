import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {GardenStore,initialGarden,type Chapter} from '../src/garden/model.js';
import {turnLines} from '../src/garden/gathering.js';
import {sourcesFor} from '../src/garden/content.js';
import {captionDuration} from '../src/garden/playback.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
import {advance,finishSpokenTurn,migratedCheckpoint} from './garden-play-actions.js';

const captures=JSON.parse(readFileSync('evidence/group-7-review-20260915/group-6-migration-inputs.json','utf8').replace(/^\uFEFF/,'')) as {cases:{name:string;envelope:{payload:Chapter}}[]};
let serial=0;
/** Labeled actual-handler migration checkpoint, not a claim to replay the earlier game. */
function fixture(name:string){const s=new GardenStore(initialGarden('continuous-'+serial++),()=>String(serial++));s.send({type:'BOOT',chapter:migratedCheckpoint(captures.cases.find(x=>x.name===name)!.envelope)});return s;}
function close(s:GardenStore){for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});}
function playback(s:GardenStore,action:'pause'|'resume'|'replay'|'speech'|'captions'|'advance',index?:number,key=s.getSnapshot().playback!.key){s.send({type:'PLAYBACK',key,action,...(index===undefined?{}:{index})});}
function drain(s:GardenStore){
 for(let i=0;i<100&&s.getSnapshot().playback;i++){
  const state=s.getSnapshot();if(state.playback!.paused)playback(s,'resume');
  playback(s,'speech');playback(s,'advance',state.playback!.owner==='gathering'?state.chapter.gathering.turn!.index:state.chapter.story.presentation.page);
  assert.ok(validChapter(s.getSnapshot().chapter));
 }
 assert.equal(s.getSnapshot().playback,null);
}
function readyLoop(){const s=fixture('later-pip-prepared-before-pip-moment');s.send({type:'STORY',event:{kind:'MOMENT',moment:'gathering'}});advance(s);s.send({type:'STORY',event:{kind:'NEXT_STORY'}});finishSpokenTurn(s);s.send({type:'STORY',event:{kind:'FINISH'}});s.send({type:'START_PRESENTATION',mode:'watch'});assert.equal(s.getSnapshot().activity?.kind,'ending-presentation');return s;}

test('Pausing the ending freezes its picture clock and resumes from that same moment',()=>{
 const s=readyLoop();playback(s,'speech');s.send({type:'TICK',ms:100});const elapsed=s.getSnapshot().activity!.elapsed;assert.ok(elapsed>0&&elapsed<6000);
 playback(s,'pause');const picture=s.getSnapshot().chapter.story.presentation.page;for(let i=0;i<20;i++)s.send({type:'TICK',ms:100});assert.equal(s.getSnapshot().activity!.elapsed,elapsed);assert.equal(s.getSnapshot().chapter.story.presentation.page,picture);
 playback(s,'resume');s.send({type:'TICK',ms:100});assert.ok(s.getSnapshot().activity!.elapsed>elapsed);assert.equal(s.getSnapshot().chapter.story.presentation.page,picture);
});

test('Continuous gathering keeps the entire original and chosen ending, committing only after the last automatic segment',()=>{
 const s=fixture('sol-world-introduction'),before=structuredClone(s.getSnapshot().chapter),lines=turnLines(before),selected=before.gathering.turn!.contribution;
 assert.equal(s.getSnapshot().playback?.paused,true,'An interrupted saved telling awaits explicit resume');
 assert.deepEqual(lines.filter(line=>line.source==='sol').map(line=>line.text),sourcesFor(before).sol.paragraphs);
 assert.ok(lines.some(line=>line.text===selected!.text));
 playback(s,'resume');playback(s,'speech');const key=s.getSnapshot().playback!.key;
 for(let index=0;index<lines.length;index++){
  assert.equal(s.getSnapshot().chapter.gathering.solPerformed,null);
  playback(s,'advance',index,key);
  if(index<lines.length-1){const checkpoint=s.getSnapshot().chapter;playback(s,'advance',index,key);assert.deepEqual(s.getSnapshot().chapter,checkpoint,'Duplicate speech callback cannot consume a second segment');}
 }
 assert.deepEqual(s.getSnapshot().chapter.gathering.solPerformed,selected);assert.equal(s.getSnapshot().chapter.gathering.turn,null);assert.equal(s.getSnapshot().playback,null);
 const finished=structuredClone(s.getSnapshot().chapter);playback(s,'advance',lines.length-1,key);assert.deepEqual(s.getSnapshot().chapter,finished);
 for(const key of ['seed','river','bakery','page','pip'] as const)assert.deepEqual(s.getSnapshot().chapter[key],before[key]);
});

test('Mara and Grandma share every paragraph once while preserving the earlier playable bird repair',()=>{
 const mara=fixture('welcome-complete-before-mara'),earlier=structuredClone(mara.getSnapshot().chapter.mara);mara.send({type:'STORY',event:{kind:'SHARE_MARA'}});
 assert.equal(mara.getSnapshot().chapter.gathering.turn?.kind,'mara');assert.equal(mara.getSnapshot().chapter.mara.scene,null);assert.equal(mara.getSnapshot().chapter.mara.sharedAt,'early');
 assert.deepEqual(turnLines(mara.getSnapshot().chapter).map(line=>line.text),sourcesFor(mara.getSnapshot().chapter).story.paragraphs);assert.ok(turnLines(mara.getSnapshot().chapter).every(line=>line.who===(mara.getSnapshot().chapter.story.plan!.reader==='mara'?'Mara':'Pip')));drain(mara);assert.equal(mara.getSnapshot().chapter.mara.sharedAt,'gathering');assert.equal(mara.getSnapshot().chapter.mara.participated,earlier.participated);
 const grandma=fixture('complete-grandma-page-before-telling');grandma.send({type:'STORY',event:{kind:'NEXT_STORY'}});
 assert.deepEqual(turnLines(grandma.getSnapshot().chapter).filter(line=>line.source==='empty').map(line=>line.text),sourcesFor(grandma.getSnapshot().chapter).empty.paragraphs);assert.equal(grandma.getSnapshot().chapter.gathering.grandmaPerformed,false);drain(grandma);assert.equal(grandma.getSnapshot().chapter.gathering.grandmaPerformed,true);assert.equal(grandma.getSnapshot().chapter.story.phase,'moment');
});

test('Continuous playback rejects paused, overlay, background and obsolete callbacks and restores without completing a story',()=>{
 const s=fixture('sol-world-introduction');playback(s,'resume');playback(s,'speech');playback(s,'advance',0);
 const index=s.getSnapshot().chapter.gathering.turn!.index,oldKey=s.getSnapshot().playback!.key;
 playback(s,'pause');playback(s,'advance',index,oldKey);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,index);
 playback(s,'resume');playback(s,'speech');s.send({type:'OPEN',panel:'help'});playback(s,'advance',index);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,index);close(s);
 assert.equal(s.getSnapshot().playback?.paused,true);playback(s,'resume');playback(s,'speech');s.send({type:'INTERRUPT'});playback(s,'advance',index);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,index);s.send({type:'FOREGROUND'});
 const payload=structuredClone(s.getSnapshot().chapter),raw={format:1,content:payload.content,revision:payload.revision,writer:'continuous-fixture',payload,checksum:checksum(JSON.stringify(payload))};
 assert.ok(unpack(raw));s.send({type:'BOOT',chapter:unpack(raw)!.payload});assert.equal(s.getSnapshot().playback?.paused,true);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,index);assert.equal(s.getSnapshot().chapter.gathering.solPerformed,null);
 const beforeReplay=s.getSnapshot().playback!.key;playback(s,'replay');assert.notEqual(s.getSnapshot().playback!.key,beforeReplay);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,0);
 playback(s,'advance',0,beforeReplay);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,0);drain(s);assert.ok(s.getSnapshot().chapter.gathering.solPerformed);
});

test('Caption fallback progresses the full telling by elapsed time and stops for reading support',()=>{
 const s=fixture('sol-world-introduction');playback(s,'resume');playback(s,'captions');advance(s,captionDuration(turnLines(s.getSnapshot().chapter)[0]!.text)+80);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,1);
 const index=s.getSnapshot().chapter.gathering.turn!.index;s.send({type:'OPEN',panel:'gathering'});advance(s,80000);assert.equal(s.getSnapshot().chapter.gathering.turn!.index,index);close(s);assert.equal(s.getSnapshot().playback?.paused,true);playback(s,'resume');playback(s,'captions');for(let i=0;i<20000&&s.getSnapshot().playback;i++)s.send({type:'TICK',ms:80});
 assert.equal(s.getSnapshot().chapter.gathering.turn,null);assert.ok(s.getSnapshot().chapter.gathering.solPerformed);assert.ok(validChapter(s.getSnapshot().chapter));
});

test('Loop automatically finishes all four actual pictures, safely replays, and preserves an interrupted saved picture',()=>{
 const s=readyLoop(),before=structuredClone(s.getSnapshot().chapter);playback(s,'speech');
 for(let index=0;index<3;index++){playback(s,'advance',index);assert.equal(s.getSnapshot().chapter.story.presentation.page,index+1);assert.equal(s.getSnapshot().chapter.story.presentation.finished,false);}
 s.send({type:'ACTIVITY_BACK'});assert.equal(s.getSnapshot().playback,null);s.send({type:'BOOT',chapter:s.getSnapshot().chapter});s.send({type:'OPEN',panel:'studio'});s.send({type:'START_PRESENTATION',mode:'watch'});assert.equal(s.getSnapshot().chapter.story.presentation.page,3);
 drain(s);assert.equal(s.getSnapshot().chapter.story.presentation.finished,true);assert.equal(s.getSnapshot().chapter.story.presentation.inProgress,false);assert.equal(s.getSnapshot().activity,null);
 s.send({type:'START_PRESENTATION',mode:'watch'});assert.equal(s.getSnapshot().chapter.story.presentation.page,0);const old=s.getSnapshot().playback!.key;playback(s,'replay');playback(s,'advance',0,old);assert.equal(s.getSnapshot().chapter.story.presentation.page,0);drain(s);
 s.send({type:'START_PRESENTATION',mode:'narrate'});assert.equal(s.getSnapshot().playback?.mode,'captions');playback(s,'replay');assert.equal(s.getSnapshot().playback?.mode,'captions','Replaying child narration does not turn on a model voice');s.send({type:'ACTIVITY_BACK'});
 assert.deepEqual(s.getSnapshot().chapter.story.ending,before.story.ending);assert.deepEqual(s.getSnapshot().chapter.gathering.solPerformed,before.gathering.solPerformed);for(const key of ['seed','river','bakery','page','pip'] as const)assert.deepEqual(s.getSnapshot().chapter[key],before[key]);
});
