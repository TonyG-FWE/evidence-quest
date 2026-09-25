import {buildBridge,secureBridgeHalf,handPlace,bridgeWalk} from './garden-bridge-actions.js';
import {postPoint,constructionOf,sectionSecured} from '../src/garden/bridgeConstruction.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,bridgeReady,GRANDMA_APPROACH} from '../src/garden/model.js';
import {anchors,BAKERY_REPAIR,BAKERY_WORK,BAKERY_APPROACHES} from '../src/garden/worldLayout.js';
import {advance,completeConversation} from './garden-play-actions.js';
import type {HandObject} from '../src/garden/hands.js';
import {handAnchor} from '../src/garden/hands.js';
import {BAKERY_APPROACH,TILE_SHELF,TILE_APPROACH,BAKERY_SOL,WORKSHOP_DOOR} from '../src/garden/bakery.js';
import {BIRD_BOY,DOCK_OFFICE} from '../src/garden/mara.js';
import {validChapter} from '../src/garden/persistence.js';
import {localReview} from '../src/garden/assets/profile.js';

function game(){const s=new GardenStore(initialGarden('hands'));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});s.send({type:'GO',point:CROSSING});advance(s);return s;}
function drag(s:GardenStore,object:HandObject,from:{x:number;z:number},to:{x:number;z:number}){s.send({type:'HAND_BEGIN',object,point:from});assert.equal(s.getSnapshot().gesture?.object,object,'The physical object is reachable and permitted');s.send({type:'HAND_MOVE',point:to});s.send({type:'HAND_RELEASE'});}
function close(s:GardenStore){for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});}
function go(s:GardenStore,point:{x:number;z:number}){close(s);s.send({type:'GO',point});advance(s);assert.ok(Math.hypot(s.getSnapshot().chapter.pip.x-point.x,s.getSnapshot().chapter.pip.z-point.z)<.02);}
function bridge(s:GardenStore){buildBridge(s);go(s,GRANDMA_APPROACH);}

test('direct bridge: post drops and two side ropes support each half separately',()=>{
 const s=game();s.send({type:'COLLECT_ROPES'});advance(s);handPlace(s,'section:a',{x:-.775,z:3});secureBridgeHalf(s,'west');
 assert.equal(s.getSnapshot().chapter.west,true);assert.equal(s.getSnapshot().chapter.east,false);bridgeWalk(s,{x:-.7,z:3});handPlace(s,'section:b',{x:.775,z:3});secureBridgeHalf(s,'east');assert.equal(bridgeReady(s.getSnapshot().chapter),true);
});

test('direct bakery: permission, physical handoffs, repair, kneading, adjusted portions and optional recovery',()=>{
 const s=game();bridge(s);go(s,BAKERY_APPROACH);s.send({type:'TALK',who:'rina'});advance(s);completeConversation(s);s.send({type:'BAKERY_STEP',step:'PERMISSION'});go(s,TILE_APPROACH);
 drag(s,'spareTile',TILE_SHELF,s.getSnapshot().chapter.pip);advance(s);go(s,BAKERY_APPROACH);
 drag(s,'spareTile',s.getSnapshot().chapter.pip,BAKERY_SOL);advance(s);assert.equal(s.getSnapshot().chapter.bakery.tile,'sol');assert.equal(s.getSnapshot().mode,'bakery-repair','Delivery immediately frames the roof without an action shortcut');
 s.send({type:'HAND_BEGIN',object:'crackedTile'});s.send({type:'HAND_MOVE',point:{x:17.8,z:-.7}});s.send({type:'HAND_CANCEL'});assert.equal(s.getSnapshot().chapter.bakery.cracked,'roof');
 drag(s,'crackedTile',handAnchor(s.getSnapshot(),'crackedTile'),{x:17.8,z:-.7});advance(s);
 drag(s,'spareTile',handAnchor(s.getSnapshot(),'spareTile'),BAKERY_REPAIR.beside);advance(s);assert.equal(s.getSnapshot().chapter.bakery.stage,'misplaced');
 if(localReview){
  // Recorded from a native cursor drop on the visible adjoining sloped roof row.
  drag(s,'spareTile',handAnchor(s.getSnapshot(),'spareTile'),{x:18.444397132137,z:-1.448752507173404});advance(s);
  assert.equal(s.getSnapshot().chapter.bakery.stage,'misplaced','An adjoining roof row stays recoverable and cannot seal the opening');
 }
 drag(s,'spareTile',handAnchor(s.getSnapshot(),'spareTile'),BAKERY_REPAIR.gap);advance(s);assert.equal(s.getSnapshot().chapter.bakery.stage,'sealed');assert.equal(s.getSnapshot().panel,null);
 go(s,BAKERY_APPROACHES.flour);drag(s,'flour',handAnchor(s.getSnapshot(),'flour'),BAKERY_WORK.mixing);advance(s);
 const prepare=()=>{go(s,BAKERY_APPROACHES.flour);drag(s,'flour',handAnchor(s.getSnapshot(),'flour'),BAKERY_WORK.mixing);assert.equal(s.getSnapshot().chapter.hands.flourInBowl,true);go(s,BAKERY_APPROACHES.mixing);s.send({type:'HAND_BEGIN',object:'dough'});for(const x of [BAKERY_WORK.mixing.x+.35,BAKERY_WORK.mixing.x-.35,BAKERY_WORK.mixing.x+.35,BAKERY_WORK.mixing.x])s.send({type:'HAND_MOVE',point:{x,z:BAKERY_WORK.mixing.z}});s.send({type:'HAND_RELEASE'});advance(s);assert.equal(s.getSnapshot().chapter.bakery.stage,'mixed');go(s,BAKERY_APPROACHES.preparation);};prepare();
 drag(s,'dough',handAnchor(s.getSnapshot(),'dough'),BAKERY_WORK.ovenTarget);advance(s);assert.equal(s.getSnapshot().chapter.bakery.unshapedBatches,1);assert.equal(s.getSnapshot().chapter.bakery.loaf,'none');prepare();
 // Deliberate diagonal strokes through the visible surface need not trace the
 // old hidden +/-0.18 world-Z endpoints. A click alone does not cut.
 drag(s,'dough-cut',BAKERY_WORK.preparation,{x:BAKERY_WORK.preparation.x+.03,z:BAKERY_WORK.preparation.z});assert.deepEqual(s.getSnapshot().chapter.hands.cuts,[]);
 const cut=(x:number)=>drag(s,'dough-cut',{x:BAKERY_WORK.preparation.x+x,z:BAKERY_WORK.preparation.z-.10},{x:BAKERY_WORK.preparation.x+x+.20,z:BAKERY_WORK.preparation.z+.10});
 cut(-.28);cut(.1);assert.equal(s.getSnapshot().chapter.bakery.stage,'mixed','Different portions remain adjustable');cut(-.12);advance(s);assert.equal(s.getSnapshot().chapter.bakery.stage,'shaped');
 drag(s,'loaf',handAnchor(s.getSnapshot(),'loaf'),BAKERY_WORK.ovenTarget);advance(s);assert.equal(s.getSnapshot().chapter.bakery.stage,'baked');assert.ok(validChapter(s.getSnapshot().chapter));
 go(s,BAKERY_APPROACHES.oven);s.send({type:'HAND_BEGIN',object:'loaf'});assert.equal(s.getSnapshot().gesture?.object,'loaf','The baked loaf is reachable at the oven independently of Rina');s.send({type:'HAND_CANCEL'});assert.equal(s.getSnapshot().chapter.bakery.loaf,'oven','An interrupted pickup retains the loaf in the oven');
 drag(s,'loaf',handAnchor(s.getSnapshot(),'loaf'),s.getSnapshot().chapter.bakery.rina);advance(s);go(s,{x:WORKSHOP_DOOR.x+.15,z:WORKSHOP_DOOR.z+.9});drag(s,'loaf',handAnchor(s.getSnapshot(),'loaf'),WORKSHOP_DOOR);advance(s);assert.equal(s.getSnapshot().chapter.bakery.stage,'done');close(s);s.send({type:'TALK',who:'rina'});assert.equal(s.getSnapshot().panel,'bakery','Rina remains readable at her actual workshop position after the handoff');
});
test('Mara repair: consent precedes pickup; wing rotation and strip orientation determine contact',()=>{
 const s=game();go(s,anchors.dock.approach);s.send({type:'TALK',who:'mara'});completeConversation(s);s.send({type:'TAKE_PAGE'});advance(s);close(s);bridge(s);s.send({type:'TALK',who:'grandma'});s.send({type:'REPORT'});advance(s);s.send({type:'STORY',event:{kind:'REPORT_MARA'}});close(s);s.send({type:'STORY',event:{kind:'SHARE_MARA'}});advance(s);
 s.send({type:'HAND_BEGIN',object:'wing'});assert.equal(s.getSnapshot().gesture,null,'No repair before consent');s.send({type:'MARA_STEP',step:'ASK'});advance(s);
 s.send({type:'MARA_GO',point:DOCK_OFFICE});advance(s);drag(s,'tape-roll',handAnchor(s.getSnapshot(),'tape-roll'),DOCK_OFFICE);advance(s);s.send({type:'MARA_GO',point:BIRD_BOY});advance(s);
 drag(s,'wing',handAnchor(s.getSnapshot(),'wing'),{x:0,z:0});assert.equal(s.getSnapshot().chapter.mara.scene?.aligned,false,'Translation alone leaves the torn edges misaligned');
 s.send({type:'HAND_BEGIN',object:'wing'});s.send({type:'HAND_MOVE',point:{x:0,z:0}});for(let i=0;i<4;i++)s.send({type:'HAND_ROTATE',direction:1});s.send({type:'HAND_RELEASE'});assert.equal(s.getSnapshot().chapter.mara.scene?.aligned,true);
 drag(s,'tape',handAnchor(s.getSnapshot(),'tape'),{x:-.15,z:0});assert.equal(s.getSnapshot().chapter.mara.scene?.strip,'beside');
 drag(s,'tape',handAnchor(s.getSnapshot(),'tape'),{x:.16,z:0});assert.equal(s.getSnapshot().chapter.mara.scene?.stage,'repaired');assert.equal(s.getSnapshot().chapter.mara.participated,false,'Ownership/departure consequence still happens in the scene');assert.ok(validChapter(s.getSnapshot().chapter));
});
test('interrupted gestures discard preview without moving materials or consuming ownership',()=>{
 const s=game(),before=structuredClone(s.getSnapshot().chapter.sections);
 s.send({type:'HAND_BEGIN',object:'section:a',point:before.a});s.send({type:'HAND_MOVE',point:{x:-.775,z:3}});
 assert.deepEqual(s.getSnapshot().chapter.sections,before);s.send({type:'INTERRUPT',background:true});
 assert.equal(s.getSnapshot().gesture,null);assert.deepEqual(s.getSnapshot().chapter.sections,before);
 s.send({type:'HAND_RELEASE'});assert.deepEqual(s.getSnapshot().chapter.sections,before);
});

test('reading help cancels a held object and never restores an abandoned physical preview',()=>{
 const s=game(),before=structuredClone(s.getSnapshot().chapter.sections);
 s.send({type:'HAND_BEGIN',object:'section:a'});s.send({type:'HAND_MOVE',point:{x:-.775,z:3}});
 s.send({type:'INSPECT_TEXT',text:['Move and turn the section.']});assert.equal(s.getSnapshot().gesture,null);
 s.send({type:'CLOSE'});assert.equal(s.getSnapshot().preview,null);s.send({type:'HAND_RELEASE'});
 assert.deepEqual(s.getSnapshot().chapter.sections,before);
});

test('a secured first section retained after a collapse cannot be moved through hand commands',()=>{
 const s=game();s.send({type:'COLLECT_ROPES'});advance(s);handPlace(s,'section:a',{x:-.775,z:3});secureBridgeHalf(s,'west');bridgeWalk(s,{x:-.7,z:3});handPlace(s,'section:b',{x:.775,z:3});
 s.send({type:'GO',point:{x:.7,z:3}});advance(s);const before=structuredClone(s.getSnapshot().chapter.sections.a);s.send({type:'HAND_BEGIN',object:'section:a'});s.send({type:'HAND_MOVE',point:{x:-3.5,z:3}});s.send({type:'HAND_RELEASE'});
 assert.equal(s.getSnapshot().gesture,null);assert.deepEqual(s.getSnapshot().chapter.sections.a,before);assert.ok(validChapter(s.getSnapshot().chapter));
});

test('a held section keeps its identity when alternate construction controls are invoked',()=>{
 const s=game(),other=structuredClone(s.getSnapshot().chapter.sections.b);
 s.send({type:'HAND_BEGIN',object:'section:a'});s.send({type:'HAND_MOVE',point:{x:-.775,z:3}});s.send({type:'SELECT',section:'b'});s.send({type:'HAND_BEGIN',object:'section:b'});s.send({type:'HAND_RELEASE'});
 assert.equal(s.getSnapshot().chapter.sections.a.x,-.775);assert.deepEqual(s.getSnapshot().chapter.sections.b,other);
});
test('planting uses the actual seed and keeps prepared soil after a canceled cover gesture',()=>{
 const s=game();bridge(s);
 const bed=anchors.garden.plant;drag(s,'soil',{x:bed.x-.25,z:bed.z},{x:bed.x+.25,z:bed.z});assert.equal(s.getSnapshot().chapter.river.soilPrepared,true);
 drag(s,'seed',s.getSnapshot().chapter.pip,bed);assert.equal(s.getSnapshot().chapter.seed,'bed');
 s.send({type:'HAND_BEGIN',object:'soil',point:bed});s.send({type:'HAND_CANCEL'});assert.equal(s.getSnapshot().chapter.seed,'bed');
 drag(s,'soil',{x:bed.x-.25,z:bed.z},{x:bed.x+.25,z:bed.z});advance(s);
 assert.equal(s.getSnapshot().chapter.seed,'soil');assert.equal(s.getSnapshot().chapter.bloomed,false);s.send({type:'BLOOM'});advance(s);assert.equal(s.getSnapshot().chapter.bloomed,true);
});
