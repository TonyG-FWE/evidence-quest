import {buildBridge} from './garden-bridge-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,freshChapter,CROSSING,GRANDMA_APPROACH,MARA,type Point} from '../src/garden/model.js';
import {sources,sourcePrefix} from '../src/garden/content.js';
import {advance,completeConversation,finishBakery,shareTornWing} from './garden-play-actions.js';
import {freshJournal,validJournal,observationsFor,storyboardFor,updateJournal,observationIds,observationPictureFor,JOURNAL_NOTE_LIMIT,type JournalState} from '../src/garden/journal.js';

let serial=0;
function game(){const store=new GardenStore(initialGarden('journal-'+serial++),()=>String(serial++));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});return store;}
function close(store:GardenStore){for(let i=0;i<20&&store.getSnapshot().panel;i++)store.send({type:'CLOSE'});}
function go(store:GardenStore,point:Point){close(store);store.send({type:'GO',point});advance(store);assert.ok(Math.hypot(store.getSnapshot().chapter.pip.x-point.x,store.getSnapshot().chapter.pip.z-point.z)<.02);}
function bridge(store:GardenStore){
 go(store,CROSSING);buildBridge(store);go(store,GRANDMA_APPROACH);
}
const ids=(store:GardenStore)=>observationsFor(store.getSnapshot().chapter).map(card=>card.id);

test('Journal: source exposure, possessions, assistance and personal writing do not become witnessed events',()=>{
 const store=game();store.send({type:'OPEN',panel:'sections'});store.send({type:'EXPOSE',id:sourcePrefix('sections',store.getSnapshot().chapter)+'1'});store.send({type:'HELP_USED',id:'word:bridge'});store.send({type:'READ_POSITION',id:'sections',position:1});
 assert.equal(store.getSnapshot().chapter.exposed.length,1);assert.deepEqual(ids(store),[]);
 // Deliberately synthetic non-event fields: none is evidence that its story happened.
 const c=structuredClone(store.getSnapshot().chapter);c.exposed=Object.values(sources).flatMap(s=>s.paragraphs.map((_,i)=>sourcePrefix(s.id)+(i+1)));c.page='pip';c.seed='grandma';c.story.solDraft={text:'I think everyone came to the garden.',revision:1};c.story.answers['my-idea']='Perhaps the flour was wet.';
 assert.deepEqual(observationsFor(c),[]);
 assert.ok(observationIds.every(id=>observationPictureFor(c,id)===null),'Reading and possession cannot create a witnessed-event picture');
});

test('Journal: completed real handlers add physical observations without any reading requirement',()=>{
 const store=game();bridge(store);assert.deepEqual(ids(store),['bridge-crossed']);
 store.send({type:'PLANT'});assert.equal(ids(store).includes('seed-planted'),false);advance(store);
 assert.ok(ids(store).includes('seed-planted'));assert.equal(ids(store).includes('flower-grown'),false);store.send({type:'BLOOM'});advance(store);assert.ok(ids(store).includes('flower-grown'));
 finishBakery(store);const cards=observationsFor(store.getSnapshot().chapter);
 for(const id of ['bakery-roof','bakery-flour','bakery-bread','bakery-thanks'])assert.ok(cards.some(card=>card.id===id),id);
 assert.equal(cards.some(card=>card.id==='bakery-unshaped'),false);assert.deepEqual(store.getSnapshot().chapter.exposed,[]);
 assert.ok(cards.every(card=>card.sources.every(id=>Object.hasOwn(sources,id))));
 assert.ok(cards.every(card=>observationPictureFor(store.getSnapshot().chapter,card.id)?.event===card.id),'Every admitted event has its own visual binding');
 const restored=JSON.parse(JSON.stringify(store.getSnapshot().chapter));assert.deepEqual(observationsFor(restored),cards);
});

test('Journal: optional failed batch appears only when the player actually tried it',()=>{
 const store=game();bridge(store);finishBakery(store,false,true);const cards=observationsFor(store.getSnapshot().chapter);
 assert.ok(cards.some(card=>card.id==='bakery-unshaped'));assert.ok(cards.some(card=>card.id==='bakery-bread'));
 assert.match(cards.find(card=>card.id==='bakery-unshaped')!.text,/middle.*doughy/);
});

test('Journal: the earlier bird activity is attributed to Mara rather than Pip witnessing it today',()=>{
 const store=game();go(store,{x:MARA.x,z:MARA.z+.95});store.send({type:'TALK',who:'mara'});completeConversation(store);store.send({type:'TAKE_PAGE'});advance(store);bridge(store);
 store.send({type:'TALK',who:'grandma'});store.send({type:'STORY',event:{kind:'REPORT_MARA'}});store.send({type:'REPORT'});advance(store);store.send({type:'OPEN',panel:'story'});
 assert.equal(ids(store).includes('bird-repaired'),false);shareTornWing(store);
 const card=observationsFor(store.getSnapshot().chapter).find(card=>card.id==='bird-repaired');assert.ok(card);assert.equal(card.context,'mara-story');assert.match(card.text,/guided Mara/);assert.deepEqual(card.sources,['story']);
});

test('Journal: historical editions and unfinished tellings never fabricate connected observations',()=>{
 // Synthetic migration fixture retains story records without inventing witnessed actions.
 const c=freshChapter('historical');c.story.metSol=true;c.story.records.sol='bread';c.story.records.mara='repair';c.story.records.grandma=true;c.bakery={...c.bakery,edition:'earlier-chapter',stage:'historical',tile:'unrecorded',cracked:'unrecorded',loaf:'unrecorded'};c.mara.edition='earlier-chapter';c.mara.sharedAt='gathering';c.gathering.edition='earlier-chapter';
 assert.deepEqual(observationsFor(c),[]);
 const active=freshChapter('unfinished');active.gathering.turn={kind:'sol',index:0,contribution:null,question:null};active.story.phase='sol';active.story.solChoice='draft';
 assert.equal(observationsFor(active).some(card=>card.id==='sol-telling'),false);
});

test('Journal: serializable validation preserves exact personal notes and rejects unknown or duplicated cards',()=>{
 const state=freshJournal(),notes='  My own idea: café 🌱\nMaybe Mara wanted to stay?\n';
 const updated=updateJournal(state,{type:'NOTES',text:notes});assert.notEqual(updated,state);assert.equal(state.notes,'');assert.equal(updated.notes,notes);assert.ok(validJournal(JSON.parse(JSON.stringify(updated))));
 for(const invalid of [null,[],{}, {...updated,version:2},{...updated,notes:'x'.repeat(JOURNAL_NOTE_LIMIT+1)},{...updated,storyboard:['unknown']},{...updated,storyboard:['bridge-crossed','bridge-crossed']},{...updated,storyboard:[null]},{...updated,extra:true}])assert.equal(validJournal(invalid),false);
 assert.equal(updateJournal(updated,{type:'NOTES',text:'x'.repeat(JOURNAL_NOTE_LIMIT+1)}),updated);
 assert.ok(validJournal(updateJournal(updated,{type:'NOTES',text:'x'.repeat(JOURNAL_NOTE_LIMIT)})));
 assert.notEqual(freshJournal().storyboard,freshJournal().storyboard);
});

test('Journal: reorder is an exact permutation of available cards, keeps notes, and appends new events',()=>{
 const store=game();bridge(store);store.send({type:'PLANT'});advance(store);const c=store.getSnapshot().chapter;
 const initial=updateJournal(freshJournal(),{type:'NOTES',text:'My sequence is a suggestion.\n'}),order=observationsFor(c).map(card=>card.id).reverse();
 const arranged=updateJournal(initial,{type:'REORDER',order},c);assert.deepEqual(arranged.storyboard,order);assert.equal(arranged.notes,initial.notes);assert.deepEqual(initial.storyboard,[]);assert.deepEqual(storyboardFor(c,arranged).map(card=>card.id),order);
 assert.ok(validJournal(JSON.parse(JSON.stringify(arranged)),c));assert.equal(validJournal(arranged,freshChapter('unseen')),false);
 for(const next of [[],order.slice(1),[order[0]!,order[0]!,order[2]!],[...order,'bakery-thanks'] as typeof order])assert.equal(updateJournal(arranged,{type:'REORDER',order:next},c),arranged);
 const sparse=[...order];delete sparse[1];assert.equal(updateJournal(arranged,{type:'REORDER',order:sparse},c),arranged);
 assert.equal(updateJournal(arranged,{type:'REORDER',order}),arranged,'A reorder without chapter facts is rejected');
 finishBakery(store);const extended=storyboardFor(store.getSnapshot().chapter,arranged).map(card=>card.id);assert.deepEqual(extended.slice(0,order.length),order);assert.equal(new Set(extended).size,extended.length);assert.equal(extended.length,observationsFor(store.getSnapshot().chapter).length);
 const stale:JournalState={...arranged,storyboard:['bakery-thanks',...order]};assert.deepEqual(storyboardFor(c,stale).map(card=>card.id),order,'Saved order cannot display an unwitnessed event');
});

test('Journal: arranging and writing leave the original draft, selected ending and all chapter facts untouched',()=>{
 for(const outcome of ['prepared','developed','draft'] as const){
  // Synthetic completed-telling variants exercise every Sol ending without claiming a played route.
  const c=freshChapter('ending-'+outcome),text='  My original draft, still mine. 🌻\n';c.story.metSol=true;c.story.solDraft={text,revision:7};c.story.solOutcome=outcome;c.story.records.sol=outcome==='draft'?'draft':'bread';c.gathering.solPerformed=outcome==='draft'?'draft':{text:'A proposed ending.',scene:'bread',origin:'child',revision:7};
  c.story.solEnding=outcome==='draft'?null:structuredClone(c.gathering.solPerformed as Exclude<typeof c.gathering.solPerformed,'draft'|null>);c.story.ending={mara:'absent',sol:outcome,paragraphs:['The original ending.']};
  const picture=observationPictureFor(c,'sol-telling');assert.ok(picture);assert.equal(picture.sol,outcome==='draft'?'draft':'bread');assert.equal(picture.solOrigin,outcome==='draft'?null:'child');
  c.story.solEnding={text:'A different working choice.',scene:'thanks',origin:'prepared',revision:8};assert.deepEqual(observationPictureFor(c,'sol-telling'),picture,'The picture follows the performed contribution, not the current choice');
  for(const [time,reader,variant] of [['usual','pip','mara-absent'],['later','mara','mara-reading'],['later','pip','mara-listening']] as const){c.story.plan={time,reader,revision:1};assert.equal(observationPictureFor(c,'sol-telling')?.gathering,variant);}
  c.history.push('PIP_MEMORY_PLACED');for(const moment of ['planting','gathering'] as const){c.story.records.pip=moment;assert.equal(observationPictureFor(c,'pip-memory')?.memory,moment);}
  const before=JSON.stringify(c);let journal=updateJournal(freshJournal(),{type:'NOTES',text:'My interpretation is separate.'});journal=updateJournal(journal,{type:'REORDER',order:observationsFor(c).map(card=>card.id)},c);
  assert.equal(JSON.stringify(c),before);assert.equal(c.story.solDraft.text,text);assert.equal(journal.notes,'My interpretation is separate.');assert.ok(observationsFor(c).some(card=>card.id==='sol-telling'));
 }
});
