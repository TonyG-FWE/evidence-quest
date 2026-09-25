import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH} from '../src/garden/model.js';
import {BAKERY_APPROACH,TILE_APPROACH,WORKSHOP_DOOR,type BakeryStep} from '../src/garden/bakery.js';
import {BAKERY_APPROACHES,BAKERY_WORK} from '../src/garden/worldLayout.js';
import {advance,completeConversation} from './garden-play-actions.js';
import {buildBridge} from './garden-bridge-actions.js';
import {KNEADING_DISTANCE} from '../src/garden/hands.js';
import {bakeryTransfer} from '../src/garden/bakeryInteraction.js';

function bowlReady(){
 const store=new GardenStore(initialGarden('kneading-regression')),send=store.send.bind(store);
 const go=(point:{x:number;z:number})=>{while(store.getSnapshot().panel)send({type:'CLOSE'});send({type:'GO',point});advance(store);};
 const step=(step:BakeryStep)=>{send({type:'BAKERY_STEP',step});advance(store);};
 send({type:'BOOT'});send({type:'BEGIN'});send({type:'START_PLAY'});go(CROSSING);buildBridge(store);go(GRANDMA_APPROACH);go(BAKERY_APPROACH);
 send({type:'TALK',who:'rina'});advance(store);completeConversation(store);step('PERMISSION');go(TILE_APPROACH);step('PICKUP');go(BAKERY_APPROACH);step('DELIVER');step('REMOVE');send({type:'TILE_PREVIEW',position:'gap'});step('PLACE');go(BAKERY_APPROACHES.flour);step('CHECK');
 send({type:'HAND_BEGIN',object:'flour'});send({type:'HAND_MOVE',point:BAKERY_WORK.mixing});send({type:'HAND_RELEASE'});go(BAKERY_APPROACHES.mixing);
 assert.equal(store.getSnapshot().chapter.hands.flourInBowl,true);return store;
}

test('short kneading strokes accumulate, stay in the bowl and finish once on an imperfect release',()=>{
 const store=bowlReady(),send=store.send.bind(store),bowl=BAKERY_WORK.mixing,revision=store.getSnapshot().chapter.revision;
 for(let stroke=0;stroke<2;stroke++){
  const origin={x:bowl.x+.18,z:bowl.z+.1};send({type:'HAND_BEGIN',object:'dough',point:origin});
  assert.ok(Math.abs((store.getSnapshot().kneading??0)-stroke*.32)<1e-9);
  for(const offset of [.08,-.08,0])send({type:'HAND_MOVE',point:{x:origin.x+offset,z:origin.z}});
  send({type:'HAND_RELEASE'});assert.equal(store.getSnapshot().action,null);assert.equal(store.getSnapshot().chapter.revision,revision);
  assert.ok(Math.abs((store.getSnapshot().kneading??0)-(stroke+1)*.32)<1e-9);
 }
 send({type:'HAND_BEGIN',object:'dough',point:bowl});send({type:'HAND_MOVE',point:{x:bowl.x+1.2,z:bowl.z+.7}});
 assert.ok(Math.hypot(store.getSnapshot().gesture!.point.x-bowl.x,store.getSnapshot().gesture!.point.z-bowl.z)<=.140001);
 send({type:'HAND_MOVE',point:{x:bowl.x-1.2,z:bowl.z-.7}});
 assert.ok((store.getSnapshot().kneading??0)>=KNEADING_DISTANCE-.0001);send({type:'HAND_RELEASE'});
 assert.equal(store.getSnapshot().action?.kind,'mixDough');const action=store.getSnapshot().action?.id;
 send({type:'HAND_RELEASE'});send({type:'HAND_BEGIN',object:'dough'});assert.equal(store.getSnapshot().action?.id,action);
 advance(store);assert.equal(store.getSnapshot().chapter.bakery.stage,'mixed');assert.equal(store.getSnapshot().kneading,0);
 assert.equal(store.getSnapshot().chapter.bakery.tile,'roof');
});

test('an off-centre dough grab and cancellation do not fabricate motion or discard completed strokes',()=>{
 const store=bowlReady(),send=store.send.bind(store),point={x:BAKERY_WORK.mixing.x+.25,z:BAKERY_WORK.mixing.z-.2};
 send({type:'HAND_BEGIN',object:'dough',point});send({type:'HAND_MOVE',point});send({type:'HAND_RELEASE'});assert.equal(store.getSnapshot().kneading,0);
 send({type:'HAND_BEGIN',object:'dough',point});send({type:'HAND_MOVE',point:{x:point.x,z:point.z+.1}});send({type:'HAND_RELEASE'});
 const kept=store.getSnapshot().kneading;send({type:'HAND_BEGIN',object:'dough',point});send({type:'HAND_CANCEL'});send({type:'HAND_RELEASE'});
 assert.equal(store.getSnapshot().kneading,kept);assert.equal(store.getSnapshot().chapter.bakery.stage,'checked');assert.equal(store.getSnapshot().chapter.hands.flourInBowl,true);
});

test('click transfers approach before committing; wrong recipients and cancellation retain materials',()=>{
 const store=new GardenStore(initialGarden('click-bakery')),send=store.send.bind(store);
 const go=(point:{x:number;z:number})=>{while(store.getSnapshot().panel)send({type:'CLOSE'});send({type:'GO',point});advance(store);};
 const step=(step:BakeryStep)=>{send({type:'BAKERY_STEP',step});advance(store);};
 const transfer=()=>{const t=bakeryTransfer(store.getSnapshot());assert.ok(t);send({type:'BAKERY_POINTER',target:t.object});send({type:'BAKERY_POINTER',target:t.target});advance(store);};
 send({type:'BOOT'});send({type:'BEGIN'});send({type:'START_PLAY'});go(CROSSING);buildBridge(store);go(GRANDMA_APPROACH);go(BAKERY_APPROACH);send({type:'TALK',who:'rina'});advance(store);completeConversation(store);step('PERMISSION');while(store.getSnapshot().panel)send({type:'CLOSE'});
 send({type:'BAKERY_POINTER',target:'spareTile'});send({type:'BAKERY_POINTER',target:'rina'});assert.equal(store.getSnapshot().chapter.bakery.tile,'shelf');assert.match(store.getSnapshot().notice,/Choose Pip/);assert.equal(store.getSnapshot().bakerySelection?.destination,undefined);
 send({type:'HAND_CANCEL'});assert.equal(store.getSnapshot().bakerySelection,undefined);assert.equal(store.getSnapshot().route.length,0);
 transfer();assert.equal(store.getSnapshot().chapter.bakery.tile,'pip');
 send({type:'BAKERY_POINTER',target:'spareTile'});send({type:'BAKERY_POINTER',target:'sol'});assert.equal(store.getSnapshot().chapter.bakery.tile,'pip');assert.ok(store.getSnapshot().route.length>0);
 send({type:'OPEN',panel:'journal'});advance(store);assert.equal(store.getSnapshot().bakerySelection,undefined);assert.equal(store.getSnapshot().chapter.bakery.tile,'pip');send({type:'CLOSE'});
 send({type:'BAKERY_POINTER',target:'spareTile'});send({type:'GO',point:TILE_APPROACH});assert.equal(store.getSnapshot().bakerySelection,undefined);advance(store);
 transfer();assert.equal(store.getSnapshot().chapter.bakery.tile,'sol');assert.equal(store.getSnapshot().mode,'bakery-repair');
 step('REMOVE');send({type:'TILE_PREVIEW',position:'gap'});step('PLACE');go(BAKERY_APPROACHES.flour);step('CHECK');transfer();assert.equal(store.getSnapshot().chapter.hands.flourInBowl,true);
 go(BAKERY_APPROACHES.mixing);step('MIX');go(BAKERY_APPROACHES.preparation);step('SHAPE');transfer();assert.equal(store.getSnapshot().chapter.bakery.loaf,'oven');
 transfer();assert.equal(store.getSnapshot().chapter.bakery.loaf,'rina');
 // A distant destination remains a walk with Rina, not a remote handoff.
 send({type:'BAKERY_POINTER',target:'loaf'});send({type:'BAKERY_POINTER',target:'sol'});assert.equal(store.getSnapshot().chapter.bakery.loaf,'rina');
 advance(store);assert.equal(store.getSnapshot().chapter.bakery.loaf,'sol');assert.equal(store.getSnapshot().chapter.bakery.stage,'done');assert.ok(Math.hypot(store.getSnapshot().chapter.pip.x-WORKSHOP_DOOR.x,store.getSnapshot().chapter.pip.z-WORKSHOP_DOOR.z)<1.6);
 const revision=store.getSnapshot().chapter.revision;send({type:'BAKERY_POINTER',target:'sol',object:'loaf'});assert.equal(store.getSnapshot().chapter.revision,revision);
});
