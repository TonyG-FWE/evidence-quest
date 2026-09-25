import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH} from '../src/garden/model.js';
import {bridgeStatus,postPoint,ropeTarget,bridgePosts} from '../src/garden/bridgeConstruction.js';
import {plantingGuidance,plantingPlacement} from '../src/garden/plantingControls.js';
import {roleText} from '../src/garden/interaction.js';
import {buildBridge,bridgeWalk,handPlace} from './garden-bridge-actions.js';
import {advance} from './garden-play-actions.js';

function game(){const store=new GardenStore(initialGarden('demo-actions'));for(const type of ['BOOT','BEGIN','START_PLAY'] as const)store.send({type});bridgeWalk(store,CROSSING);return store;}
test('bridge guidance follows posts, ropes, stepping forward and the second span through real gestures',()=>{
 const store=game(),state=()=>store.getSnapshot(),chapter=()=>state().chapter,status=()=>bridgeStatus(chapter());
 store.send({type:'COLLECT_ROPES'});advance(store);assert.doesNotMatch(state().notice,/Fasten one end/);
 handPlace(store,'section:a',{x:-.775,z:3});assert.match(status(),/near corner posts/);
 for(const post of bridgePosts.filter(id=>!id.startsWith('east')))handPlace(store,`post:${post}`,postPoint(chapter(),post));
 assert.match(status(),/^Secure a rope/);assert.doesNotMatch(status(),/four posts/);
 for(const side of ['north','south'] as const)handPlace(store,`rope:${side}`,postPoint(chapter(),ropeTarget(chapter(),side)));
 assert.equal(status(),'Walk onto the secured first section.');bridgeWalk(store,{x:-.775,z:3});
 assert.equal(status(),'Connect to the first section');store.send({type:'HAND_BEGIN',object:'section:b'});assert.doesNotMatch(roleText(state()),/waits on the bank/);store.send({type:'HAND_CANCEL'});
 handPlace(store,'section:b',{x:.775,z:3});assert.equal(status(),'Seat the two far corner posts.');assert.equal(state().notice,status());
 for(const post of bridgePosts.filter(id=>id.startsWith('east')))handPlace(store,`post:${post}`,postPoint(chapter(),post));
 assert.match(status(),/^Extend each rope/);
 for(const side of ['north','south'] as const)handPlace(store,`rope:${side}`,postPoint(chapter(),ropeTarget(chapter(),side)));
 assert.equal(status(),'Both sections are secure. Walk across to Grandma.');
});
test('planting destinations perform preparation, the actual seed drop and covering through HAND commands',()=>{
 const store=game();assert.equal(plantingPlacement(store.getSnapshot()),null);buildBridge(store);bridgeWalk(store,GRANDMA_APPROACH);
 const act=(expected:string)=>{const placement=plantingPlacement(store.getSnapshot());assert.equal(placement?.label,expected);assert.ok(placement);store.send({type:'HAND_BEGIN',object:placement.object});for(const point of placement.path)store.send({type:'HAND_MOVE',point});store.send({type:'HAND_RELEASE'});advance(store);};
 assert.doesNotMatch(plantingGuidance(store.getSnapshot().chapter),/bridge|deck|repair/);
 act('Prepare the spot');assert.equal(store.getSnapshot().chapter.river.soilPrepared,true);assert.equal(store.getSnapshot().chapter.seed,'pip');
 act('Place the seed');assert.equal(store.getSnapshot().chapter.seed,'bed');assert.match(plantingGuidance(store.getSnapshot().chapter),/Cover it/);
 act('Cover it with Grandma.');assert.equal(store.getSnapshot().chapter.seed,'soil');assert.equal(store.getSnapshot().chapter.bloomed,false);assert.equal(plantingPlacement(store.getSnapshot()),null);
});
