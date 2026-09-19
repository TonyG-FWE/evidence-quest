import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,GRANDMA_APPROACH,CROSSING,type Chapter} from '../src/garden/model.js';
import {anchors,navigable,findRoute,WORLD,pointInPolygon} from '../src/garden/worldLayout.js';
import {localReview} from '../src/garden/assets/profile.js';
import {checksum,unpack,validChapter} from '../src/garden/persistence.js';
import {GRANDMA_PATH_LENGTH} from '../src/garden/grandmaTravel.js';
import {advance} from './garden-play-actions.js';
import {buildBridge,handPlace} from './garden-bridge-actions.js';

const options={skip:!localReview};
function start(){const store=new GardenStore(initialGarden('screenshot-repair-contract'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});store.send({type:'GO',point:CROSSING});advance(store);return store;}
const envelope=(payload:Chapter)=>({format:1,content:payload.content,revision:payload.revision,writer:'current-demo-before-repair',payload,checksum:checksum(JSON.stringify(payload))});

test('Screenshot repairs: expanded visible bed accepts its outer seed area and preserves the explicit bloom boundary',options,()=>{
 const store=start();buildBridge(store);store.send({type:'GO',point:GRANDMA_APPROACH});advance(store);const bed=anchors.garden.plant;
 store.send({type:'HAND_BEGIN',object:'soil',point:{x:bed.x-.25,z:bed.z}});store.send({type:'HAND_MOVE',point:{x:bed.x+.25,z:bed.z}});store.send({type:'HAND_RELEASE'});
 assert.equal(store.getSnapshot().chapter.river.soilPrepared,true);handPlace(store,'seed',{x:bed.x+.45,z:bed.z});assert.equal(store.getSnapshot().chapter.seed,'bed');
 store.send({type:'HAND_BEGIN',object:'soil',point:bed});store.send({type:'HAND_CANCEL'});assert.equal(store.getSnapshot().chapter.seed,'bed');
 store.send({type:'HAND_BEGIN',object:'soil',point:{x:bed.x-.25,z:bed.z}});store.send({type:'HAND_MOVE',point:{x:bed.x+.25,z:bed.z}});store.send({type:'HAND_RELEASE'});advance(store);
 const chapter=store.getSnapshot().chapter;assert.equal(chapter.seed,'soil');assert.equal(chapter.bloomed,false);const resumed=unpack(envelope(chapter));assert.ok(resumed);assert.equal(resumed.payload.bloomed,false);
 const next=new GardenStore(initialGarden('resumed'));next.send({type:'BOOT',chapter:resumed.payload});next.send({type:'BLOOM'});advance(next);assert.equal(next.getSnapshot().chapter.bloomed,true);
});

test('Screenshot repairs: current save leaves a newly occupied footprint without changing construction or ownership',options,()=>{
 const store=start();buildBridge(store);store.send({type:'GO',point:GRANDMA_APPROACH});advance(store);const before=structuredClone(store.getSnapshot().chapter);delete before.reviewLayoutRevision;before.pip={x:6.25,z:11.2};
 const raw=envelope(before),bytes=JSON.stringify(raw),loaded=unpack(raw);assert.ok(loaded);assert.ok(validChapter(loaded.payload));assert.equal(JSON.stringify(raw),bytes);assert.notDeepEqual(loaded.payload.pip,before.pip);assert.ok(navigable(loaded.payload.pip));
 for(const key of ['sections','river','seed','page','history','gathering','bakery','story'] as const)assert.deepEqual(loaded.payload[key],before[key]);assert.equal(loaded.payload.reviewLayoutRevision,1);assert.deepEqual(unpack(loaded),loaded);
});

test('Screenshot repairs: current seed collection keeps phase and proportional travel when its home moves',options,()=>{
 const store=start();store.send({type:'FERRY'});advance(store);const before=structuredClone(store.getSnapshot().chapter);assert.equal(before.seed,'boat');delete before.reviewLayoutRevision;before.river.collection={phase:'outbound',distance:4.970683941232104*.4};
 const loaded=unpack(envelope(before));assert.ok(loaded);assert.equal(loaded.payload.river.collection?.phase,'outbound');assert.ok(Math.abs(loaded.payload.river.collection!.distance/GRANDMA_PATH_LENGTH-.4)<1e-9);assert.equal(loaded.payload.seed,'boat');assert.deepEqual(loaded.payload.river.boat,before.river.boat);
});

test('Screenshot repairs: garden approach and actor stay clear of the larger bed and both benches',options,()=>{
 assert.ok(navigable(anchors.garden.person));assert.ok(navigable(anchors.garden.approach));assert.ok(findRoute({x:3.8,z:4.2},anchors.garden.approach).length>0);
 for(const id of ['planting-bed','garden-bench','garden-bench-south']){const obstacle=WORLD.obstacles.find(o=>o.id===id);assert.ok(obstacle);assert.equal(pointInPolygon(anchors.garden.person,obstacle.polygon),false);assert.equal(pointInPolygon(anchors.garden.approach,obstacle.polygon),false);}
});
