import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,GRANDMA_APPROACH,CROSSING,bridgeReady,type Chapter} from '../src/garden/model.js';
import {anchors} from '../src/garden/worldLayout.js';
import {checksum,unpack,validChapter} from '../src/garden/persistence.js';
import {observationsFor} from '../src/garden/journal.js';
import {planProblems} from '../src/garden/chapter.js';
import {buildBridge,bridgeWalk,handPlace} from './garden-bridge-actions.js';
import {advance,steerSeedToGrandma} from './garden-play-actions.js';

const arrangements=['BPL','FBPL','BFPL','BPFL','BPLF'] as const;
const physicalHistory=(c:Chapter)=>c.history.filter(event=>['B','F','P','L'].includes(event));
function begin(){const s=new GardenStore(initialGarden('physical-arrangements'));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});return s;}
function restore(s:GardenStore){
 const payload=structuredClone(s.getSnapshot().chapter),envelope={format:1,content:'garden-chapter-3',revision:payload.revision,writer:'physical-arrangements',payload,checksum:checksum(JSON.stringify(payload))};
 const loaded=unpack(envelope);assert.ok(loaded,'A real committed boundary must survive checksum validation');assert.deepEqual(loaded.payload,payload);
 const restored=new GardenStore(initialGarden('unused'));restored.send({type:'BOOT',chapter:loaded.payload});assert.deepEqual(restored.getSnapshot().chapter,payload);return restored;
}
function soil(s:GardenStore){
 const bed=anchors.garden.plant;s.send({type:'HAND_BEGIN',object:'soil',point:{x:bed.x-.25,z:bed.z}});assert.equal(s.getSnapshot().gesture?.object,'soil');s.send({type:'HAND_MOVE',point:{x:bed.x+.25,z:bed.z}});s.send({type:'HAND_RELEASE'});
}
function plantedBoundary(s:GardenStore){
 const owner=s.getSnapshot().chapter.seed;assert.ok(owner==='pip'||owner==='grandma');soil(s);assert.equal(s.getSnapshot().chapter.seed,owner);assert.equal(s.getSnapshot().chapter.river.soilPrepared,true);
 handPlace(s,'seed',anchors.garden.plant);assert.equal(s.getSnapshot().chapter.seed,'bed');s=restore(s);soil(s);assert.equal(s.getSnapshot().action?.kind,'plant');
 advance(s);assert.equal(s.getSnapshot().chapter.seed,'soil');assert.equal(s.getSnapshot().chapter.bloomed,false);assert.equal(s.getSnapshot().pendingBloom,true);assert.equal(s.getSnapshot().action,null);
 return s;
}

for(const history of arrangements)test(`village normal physical history ${history}: equal state and restored seed ownership`,()=>{
 let s=begin();const initialProblems=planProblems(s.getSnapshot().chapter);
 for(const cue of history){
  if(cue==='B'){buildBridge(s);bridgeWalk(s,GRANDMA_APPROACH);assert.equal(s.getSnapshot().chapter.crossed,true);}
  if(cue==='F'){
   const c=s.getSnapshot().chapter,before=structuredClone({pip:c.pip,sections:c.sections,construction:c.river.construction,page:c.page,seed:c.seed,boat:c.river.boat});
   if(!c.crossed){bridgeWalk(s,CROSSING);handPlace(s,'seed',anchors.boat.launch);advance(s);assert.equal(s.getSnapshot().chapter.seed,'boat');steerSeedToGrandma(s);assert.equal(s.getSnapshot().chapter.seed,'grandma');}
   else{s.send({type:'FERRY'});advance(s);const after=s.getSnapshot().chapter;assert.deepEqual({pip:after.pip,sections:after.sections,construction:after.river.construction,page:after.page,seed:after.seed,boat:after.river.boat},before,'An optional empty-boat observation cannot move or duplicate possessions');}
  }
  if(cue==='P'){s=plantedBoundary(s);s=restore(s);assert.equal(s.getSnapshot().pendingBloom,true);}
  if(cue==='L'){s.send({type:'BLOOM'});advance(s);}
 }
 const c=s.getSnapshot().chapter;assert.ok(validChapter(c));assert.equal(bridgeReady(c),true);assert.equal(c.seed,'soil');assert.equal(c.bloomed,true);assert.equal(c.crossed,true);assert.equal(c.story.bridgeFailures,0);assert.deepEqual(physicalHistory(c),history.split(''));
 assert.deepEqual(observationsFor(c).map(event=>event.id),['bridge-crossed','seed-planted','flower-grown']);assert.deepEqual(c.exposed,[],'Physical possession and observation are not reading exposure');assert.deepEqual(c.assistance,[]);
 assert.deepEqual(planProblems(c),initialProblems.filter(problem=>problem!=='Plant the seed with Grandma first.'),'Every route removes the same physical gathering prerequisite without inventing invitations or reports');assert.equal(c.story.phase,'planning');assert.equal(c.story.ending,null);
 const restored=restore(s);assert.deepEqual(physicalHistory(restored.getSnapshot().chapter),history.split(''));
});

test('village direct planting waits durably for touching the sprout; time and unrelated actions do not grow it',()=>{
 const s=begin();buildBridge(s);bridgeWalk(s,GRANDMA_APPROACH);soil(s);handPlace(s,'seed',anchors.garden.plant);soil(s);advance(s);
 assert.deepEqual(physicalHistory(s.getSnapshot().chapter),['B','P']);assert.equal(s.getSnapshot().chapter.bloomed,false);assert.equal(s.getSnapshot().panel,null);
 const resumed=restore(s);advance(resumed,60000);assert.equal(resumed.getSnapshot().chapter.bloomed,false);resumed.send({type:'BLOOM'});advance(resumed);assert.deepEqual(physicalHistory(resumed.getSnapshot().chapter),['B','P','L']);
 resumed.send({type:'BLOOM'});advance(resumed);assert.equal(resumed.getSnapshot().chapter.history.filter(event=>event==='L').length,1);
});

test('seed delivery alone cannot plant while Pip remains on the starting bank',()=>{
 const s=begin();bridgeWalk(s,CROSSING);handPlace(s,'seed',anchors.boat.launch);advance(s);steerSeedToGrandma(s);
 assert.equal(s.getSnapshot().chapter.crossed,false);assert.equal(s.getSnapshot().chapter.seed,'grandma');s.send({type:'HAND_BEGIN',object:'soil'});assert.equal(s.getSnapshot().gesture,null);s.send({type:'PLANT'});advance(s);assert.equal(s.getSnapshot().chapter.seed,'grandma');assert.equal(s.getSnapshot().chapter.bloomed,false);assert.deepEqual(physicalHistory(s.getSnapshot().chapter),['F']);
});
