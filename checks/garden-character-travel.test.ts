import {legacyConstruction,syncConstruction} from '../src/garden/bridgeConstruction.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,type Chapter} from '../src/garden/model.js';
import {GRANDMA_PATH_LENGTH,GRANDMA_WALK_SPEED,grandmaLocation} from '../src/garden/grandmaTravel.js';
import {LANDING} from '../src/garden/river.js';
import {unpack,checksum,validChapter} from '../src/garden/persistence.js';
import {advance} from './garden-play-actions.js';
import {pipLocomotion} from '../src/garden/locomotion.js';
import {anchors} from '../src/garden/worldLayout.js';
import {availableHands} from '../src/garden/hands.js';

function arrival(){const s=new GardenStore(initialGarden('grandma-trip'));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});s.send({type:'GO',point:CROSSING});advance(s);s.send({type:'FERRY'});advance(s);const c=structuredClone(s.getSnapshot().chapter);c.river.boat={phase:'waiting',position:{...LANDING}};c.river.collection={phase:'outbound',distance:0};s.send({type:'BOOT',chapter:c});return s;}
test('Grandma walks at the approved cycle pace while Pip can move; pickup and return survive reload',()=>{
 const s=arrival(),before={...s.getSnapshot().chapter.pip};assert.equal(s.getSnapshot().mode,'walk');
 s.send({type:'GO',point:{x:before.x-.5,z:before.z}});advance(s,800);
 assert.notDeepEqual(s.getSnapshot().chapter.pip,before);assert.ok(Math.abs(s.getSnapshot().chapter.river.collection!.distance-GRANDMA_WALK_SPEED*.8)<.00001);
 const saved=structuredClone(s.getSnapshot().chapter);assert.ok(validChapter(saved));
 const e={format:1,content:saved.content,revision:4,writer:'test',payload:saved,checksum:checksum(JSON.stringify(saved))};
 const loaded=unpack(e);assert.deepEqual(loaded!.payload,saved);s.send({type:'BOOT',chapter:loaded!.payload});
 advance(s,(GRANDMA_PATH_LENGTH/GRANDMA_WALK_SPEED)*1000+1200);
 assert.equal(s.getSnapshot().chapter.seed,'grandma');assert.equal(s.getSnapshot().action,null);assert.equal(s.getSnapshot().chapter.river.collection?.phase,'return');
 const returning=structuredClone(s.getSnapshot().chapter),position=grandmaLocation(returning);s.send({type:'BOOT',chapter:returning});assert.deepEqual(grandmaLocation(s.getSnapshot().chapter),position);
 advance(s);assert.equal(s.getSnapshot().chapter.river.collection,null);assert.equal(s.getSnapshot().chapter.history.filter(x=>x==='F').length,1);
});
test('pausing or hiding the game freezes Grandma travel without completing delivery',()=>{
 const s=arrival();advance(s,500);s.send({type:'OPEN',panel:'help'});const saved=s.getSnapshot().chapter.river.collection;
 advance(s,5000);assert.deepEqual(s.getSnapshot().chapter.river.collection,saved);assert.equal(s.getSnapshot().chapter.seed,'boat');
 s.send({type:'CLOSE'});s.send({type:'INTERRUPT',background:true});advance(s,5000);assert.deepEqual(s.getSnapshot().chapter.river.collection,saved);
});
test('old chapter envelopes gain a versioned NPC journey without changing possessions or authored work',()=>{
 const s=arrival(),old=structuredClone(s.getSnapshot().chapter) as Chapter;
 old.river.boat.phase='steering';const historical=old.river as unknown as Record<string,unknown>;delete historical['journeyVersion'];delete historical['collection'];
 const raw={format:1,content:old.content,revision:9,writer:'before',payload:old,checksum:checksum(JSON.stringify(old))},bytes=JSON.stringify(raw),loaded=unpack(raw);
 assert.ok(loaded);assert.equal(JSON.stringify(raw),bytes);assert.equal(loaded.payload.river.journeyVersion,1);assert.equal(loaded.payload.seed,'boat');assert.deepEqual(loaded.payload.story,old.story);assert.deepEqual(loaded.payload.exposed,old.exposed);
});
test('future or invalid NPC journey progress is rejected rather than silently resetting it',()=>{
 const s=arrival(),chapter=structuredClone(s.getSnapshot().chapter);chapter.river.collection!.distance=Infinity;assert.equal(validChapter(chapter),false);
 chapter.river.collection!.distance=GRANDMA_PATH_LENGTH+1;assert.equal(validChapter(chapter),false);
 chapter.river.collection=null;(chapter.river as unknown as {journeyVersion:number}).journeyVersion=2;assert.equal(validChapter(chapter),false);
});

test('switching to carried delivery still waits for Grandma to return before planting together',()=>{
 const s=arrival(),c=structuredClone(s.getSnapshot().chapter);c.seed='pip';c.river.boat={phase:'moored',position:{...anchors.boat.launch}};c.river.collection={phase:'return',distance:2};
 c.sections={a:{x:-.775,z:3,rotation:0},b:{x:.775,z:3,rotation:0}};c.joined=c.west=c.east=c.crossed=true;c.river.attachments={west:'a',east:'b'};c.river.ropeLocations={west:'attached',east:'attached'};c.pip={...anchors.garden.approach};c.river.construction=legacyConstruction(c);syncConstruction(c);assert.equal(validChapter(c),true);
 s.send({type:'BOOT',chapter:c});assert.equal(availableHands(s.getSnapshot()).includes('soil'),false);s.send({type:'PLANT'});assert.equal(s.getSnapshot().action,null);assert.equal(s.getSnapshot().chapter.seed,'pip');
 advance(s,7000);assert.equal(s.getSnapshot().chapter.river.collection,null);assert.equal(availableHands(s.getSnapshot()).includes('soil'),true);s.send({type:'PLANT'});assert.equal(s.getSnapshot().action?.kind,'plant');
});
test('approved travel gait slows for activities and crossings without storing animation state',()=>{
 const open=pipLocomotion({x:13,z:6},true),near=pipLocomotion(anchors.garden.approach,true),bridge=pipLocomotion({x:0,z:3},true);
 assert.equal(open.gait,'jog');assert.equal(open.speed,1.7);assert.equal(near.gait,'walk');assert.ok(near.speed<.4);assert.deepEqual(bridge,near);assert.equal(pipLocomotion({x:13,z:6},false).gait,'walk');
});
test('native commands publish immediately while tick coalescing cannot revive an old moving view',async()=>{
 const s=new GardenStore(initialGarden('view-publish'));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});const views:ReturnType<GardenStore['getSnapshot']>[]=[],unsubscribe=s.subscribeView(()=>views.push(s.getViewSnapshot()));
 s.send({type:'KEY',key:'arrowright',down:true});assert.deepEqual(s.getViewSnapshot().keys,['arrowright']);const initial=s.getViewSnapshot().chapter.pip;s.send({type:'TICK',ms:80});assert.notDeepEqual(s.getSnapshot().chapter.pip,initial);assert.deepEqual(s.getViewSnapshot().chapter.pip,initial);
 s.send({type:'OPEN',panel:'help'});assert.equal(s.getViewSnapshot().panel,'help');assert.deepEqual(s.getViewSnapshot().keys,[]);await new Promise(resolve=>setTimeout(resolve,90));assert.equal(views.at(-1)!.panel,'help');assert.deepEqual(s.getViewSnapshot().chapter.pip,s.getSnapshot().chapter.pip);unsubscribe();
});
