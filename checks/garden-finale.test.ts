import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {GardenStore,initialGarden,MARA,type Chapter} from '../src/garden/model.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
import {lanternIds,lanternRecord,performedEnding,presentationScene} from '../src/garden/lanterns.js';
import {endingLines} from '../src/garden/chapterContent.js';
import {advance,finishSpokenTurn} from './garden-play-actions.js';
const captured=JSON.parse(readFileSync('evidence/group-7-review-20260915/group-6-migration-inputs.json','utf8').replace(/^\uFEFF/,'')) as {cases:{name:string;envelope:{payload:Chapter}}[]};
let id=0;
/** Authentic Group6 checkpoint fixture; no claim that BOOT played the preceding route. */
function fixture(name:string){const s=new GardenStore(initialGarden('finale-fixture-'+id++),()=>String(id++));s.send({type:'BOOT',chapter:captured.cases.find(x=>x.name===name)!.envelope.payload});return s;}
function close(s:GardenStore){for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});}
function physical(c:Chapter){return {seed:c.seed,river:c.river,sections:c.sections,west:c.west,east:c.east,joined:c.joined,page:c.page,bakery:c.bakery,mara:c.mara,bloomed:c.bloomed};}
function finish(s:GardenStore,moment:'planting'|'gathering'='planting'){
 s.send({type:'STORY',event:{kind:'MOMENT',moment}});advance(s);s.send({type:'STORY',event:{kind:'NEXT_STORY'}});finishSpokenTurn(s);
 if(s.getSnapshot().chapter.story.plan!.time==='usual'){
  s.send({type:'STORY',event:{kind:'TAKE_COPY'}});advance(s);close(s);s.send({type:'GO',point:{x:MARA.x,z:MARA.z+.95}});advance(s);
  s.send({type:'STORY',event:{kind:'DELIVER_COPY'}});advance(s);assert.equal(s.getSnapshot().chapter.story.closingDone,false);assert.equal(s.getSnapshot().chapter.gathering.turn?.kind,'receipt');finishSpokenTurn(s);
 }
 s.send({type:'STORY',event:{kind:'FINISH'}});assert.ok(s.getSnapshot().chapter.story.ending);assert.ok(validChapter(s.getSnapshot().chapter));
}
test('Finale: both actual memory placements settle once across interruption without changing the seed or earlier events',()=>{
 for(const moment of ['planting','gathering'] as const){
  const s=fixture('later-pip-prepared-before-pip-moment'),before=structuredClone(physical(s.getSnapshot().chapter));s.send({type:'OPEN',panel:'gathering'});s.send({type:'CHOOSE_MEMORY',moment});s.send({type:'OPEN',panel:'help'});s.send({type:'CLOSE'});assert.equal(s.getSnapshot().viewDrafts.memoryMoment,moment);assert.equal(s.getSnapshot().chapter.story.records.pip,null);s.send({type:'STORY',event:{kind:'MOMENT',moment}});
  assert.equal(s.getSnapshot().action?.kind,'keepMemory');assert.equal(s.getSnapshot().panel,null);assert.equal(s.getSnapshot().chapter.story.records.pip,null);advance(s,400);
  s.send({type:'INTERRUPT'});s.send({type:'INTERRUPT'});assert.equal(s.getSnapshot().chapter.story.records.pip,moment);assert.equal(s.getSnapshot().chapter.history.filter(x=>x==='PIP_MEMORY_PLACED').length,1);assert.deepEqual(physical(s.getSnapshot().chapter),before);assert.ok(validChapter(s.getSnapshot().chapter));
 }
});
test('Finale: nine source outcomes keep exact performed words and actual attendee pictures through closing and replay',()=>{
 for(const source of captured.cases.filter(x=>x.name.endsWith('-before-pip-moment'))){
  const s=fixture(source.name),prior=structuredClone(physical(s.getSnapshot().chapter)),selected=performedEnding(s.getSnapshot().chapter);finish(s,'gathering');const c=s.getSnapshot().chapter;
  assert.deepEqual(physical(c),prior);assert.deepEqual(lanternRecord(c,'sol').contribution,selected);assert.equal(lanternRecord(c,'pip').scene,c.story.plan!.time==='usual'?'gather-absent':c.story.plan!.reader==='mara'?'gather-mara':'gather-listener');
  const frozen=structuredClone(c.story);s.send({type:'STORY',event:{kind:'MARA_PICTURE',picture:c.story.maraPicture==='repair'?'promise':'repair'}});assert.deepEqual(s.getSnapshot().chapter.story,frozen);
  s.send({type:'START_PRESENTATION',mode:'narrate'});assert.equal(s.getSnapshot().panel,null);assert.equal(s.getSnapshot().activity?.kind,'ending-presentation');s.send({type:'PRESENTATION',step:'finish'});assert.equal(s.getSnapshot().chapter.story.presentation.finished,false);
  for(let i=0;i<3;i++)s.send({type:'PRESENTATION',step:'next'});assert.equal(presentationScene(c,2),selected?.scene??'draft');s.send({type:'PRESENTATION',step:'finish'});assert.equal(s.getSnapshot().chapter.story.presentation.finished,true);assert.deepEqual(s.getSnapshot().chapter.story.ending,frozen.ending);
 }
});
test('Finale: finished replay starts at one; interrupted replay resumes its exact last picture, including picture four',()=>{
 const s=fixture('later-mara-draft-before-pip-moment');finish(s);s.send({type:'START_PRESENTATION',mode:'watch'});for(let i=0;i<3;i++)s.send({type:'PRESENTATION',step:'next'});s.send({type:'PRESENTATION',step:'finish'});
 s.send({type:'START_PRESENTATION',mode:'narrate'});assert.equal(s.getSnapshot().chapter.story.presentation.page,0);assert.equal(s.getSnapshot().chapter.story.presentation.finished,true);for(let i=0;i<3;i++)s.send({type:'PRESENTATION',step:'next'});s.send({type:'ACTIVITY_BACK'});
 const payload=s.getSnapshot().chapter,raw={format:1,content:payload.content,revision:payload.revision,writer:'finale-fixture',payload,checksum:checksum(JSON.stringify(payload))};const restored=unpack(raw)!;assert.ok(restored);s.send({type:'BOOT',chapter:restored.payload});s.send({type:'OPEN',panel:'studio'});s.send({type:'START_PRESENTATION',mode:'watch'});assert.equal(s.getSnapshot().chapter.story.presentation.page,3);
 s.send({type:'OPEN',panel:'endingWords'});s.send({type:'PRESENTATION',step:'previous'});assert.equal(s.getSnapshot().chapter.story.presentation.page,3);s.send({type:'CLOSE'});s.send({type:'PRESENTATION',step:'previous'});assert.equal(s.getSnapshot().chapter.story.presentation.page,2);
 s.send({type:'OPEN',panel:'endingWords'});const word='GA.SRC.FINALE.'+(Object.values(endingLines).findIndex(line=>line===s.getSnapshot().chapter.story.ending!.paragraphs[2]!)+1)+'.W1',otherVariant='GA.SRC.FINALE.'+(Object.values(endingLines).findIndex(line=>line===endingLines.absent)+1)+'.W1';s.send({type:'EXPOSE_WORDS',ids:[word,'GA.SRC.FINALE.1.W1',otherVariant]});assert.ok(s.getSnapshot().chapter.exposed.includes(word));assert.equal(s.getSnapshot().chapter.exposed.includes('GA.SRC.FINALE.1.W1'),true,'The complete-text reader includes the opening even while Loop waits at picture3');assert.equal(s.getSnapshot().chapter.exposed.includes(otherVariant),false,'A different unperformed arrangement remains outside the displayed text');
});
test('Finale: particular waiting and recorded flowers retain source return, ownership and selected words',()=>{
 const s=fixture('legacy-legacy-legacy-page-with-grandma-not-shared');const before=structuredClone(s.getSnapshot().chapter);
 s.send({type:'INSPECT_LANTERN',lantern:'mara'});assert.equal(lanternRecord(s.getSnapshot().chapter,'mara').available,false);s.send({type:'ACTIVITY_ACCEPT'});s.send({type:'ACTIVITY_BACK'});assert.deepEqual(s.getSnapshot().chapter.story,before.story);assert.deepEqual(physical(s.getSnapshot().chapter),physical(before));
 const done=fixture('later-pip-prepared-before-pip-moment');finish(done);close(done);for(const lantern of lanternIds){
  const state=structuredClone(done.getSnapshot().chapter),record=lanternRecord(state,lantern);done.send({type:'INSPECT_LANTERN',lantern});assert.equal(done.getSnapshot().activity?.kind,'lantern-inspect');
  if(record.page){done.send({type:'OPEN',panel:record.page});assert.equal(done.getSnapshot().panel,record.page);done.send({type:'CLOSE'});assert.equal(done.getSnapshot().panel,null);assert.equal(done.getSnapshot().activity?.kind,'lantern-inspect');}
  done.send({type:'ACTIVITY_BACK'});assert.deepEqual(done.getSnapshot().chapter.story,state.story);assert.deepEqual(physical(done.getSnapshot().chapter),physical(state));assert.deepEqual(done.getSnapshot().chapter.pip,state.pip);
 }
});
