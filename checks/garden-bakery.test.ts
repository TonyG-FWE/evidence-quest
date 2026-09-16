import {completeConversation} from './garden-play-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,type Point} from '../src/garden/model.js';
import {BAKERY_APPROACH,TILE_SHELF,bakeryReady} from '../src/garden/bakery.js';
import {validChapter,checksum,unpack} from '../src/garden/persistence.js';
import {advance,finishBakery} from './garden-play-actions.js';
let serial=0;
function close(s:GardenStore){while(s.getSnapshot().panel)s.send({type:'CLOSE'});}
function go(s:GardenStore,point:Point){close(s);s.send({type:'GO',point});advance(s);}
function game(){const s=new GardenStore(initialGarden('bakery-'+serial++),()=>String(serial++));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});go(s,CROSSING);s.send({type:'COLLECT_ROPES'});advance(s);s.send({type:'ARRANGE'});for(const [section,side]of [['a','west'],['b','east']]as const){s.send({type:'SELECT',section});s.send({type:'POST_PREVIEW',site:'narrow',side});s.send({type:'PLACE'});}s.send({type:'JOIN'});s.send({type:'FASTEN',end:'west'});s.send({type:'FASTEN',end:'east'});s.send({type:'BACK'});go(s,GRANDMA_APPROACH);return s;}
test('G5: successful-first and recoverable placement lead to actual repair, baking and witnessed thanks',()=>{
 for(const wrong of [false,true]){const s=game(),c=s.getSnapshot().chapter,prior=structuredClone({seed:c.seed,river:c.river,story:c.story,mara:c.mara});finishBakery(s,wrong);const b=s.getSnapshot().chapter;assert.equal(b.bakery.tile,'roof');assert.equal(b.bakery.cracked,'set-aside');assert.equal(b.bakery.loaf,'sol');assert.equal(b.story.metSol,false);assert.deepEqual({seed:b.seed,river:b.river,story:b.story,mara:b.mara},prior);s.send({type:'TALK',who:'sol'});completeConversation(s);assert.equal(s.getSnapshot().panel,'sol');s.send({type:'STORY',event:{kind:'FINISH_WITH_SOL'}});assert.equal(s.getSnapshot().panel,'writing');}
});
test('G5: permission, material reach and scene preview are actual prerequisites; interruptions settle transfers once',()=>{
 let s=game();go(s,TILE_SHELF);s.send({type:'BAKERY_STEP',step:'PICKUP'});assert.equal(s.getSnapshot().chapter.bakery.tile,'shelf');s.send({type:'OPEN',panel:'bakery'});assert.equal(s.getSnapshot().panel,null);go(s,BAKERY_APPROACH);s.send({type:'TALK',who:'rina'});completeConversation(s);advance(s);assert.equal(s.getSnapshot().chapter.story.metSol,false);s.send({type:'BAKERY_STEP',step:'PERMISSION'});go(s,TILE_SHELF);s.send({type:'BAKERY_STEP',step:'PICKUP'});s.send({type:'OPEN',panel:'help'});assert.equal(s.getSnapshot().chapter.bakery.tile,'pip');const count=s.getSnapshot().chapter.history.length;s.send({type:'INTERRUPT',background:true});assert.equal(s.getSnapshot().chapter.history.length,count);s.send({type:'FOREGROUND'});close(s);go(s,BAKERY_APPROACH);s.send({type:'BAKERY_STEP',step:'DELIVER'});advance(s);s.send({type:'BAKERY_STEP',step:'REPAIR'});s.send({type:'BAKERY_STEP',step:'REMOVE'});advance(s);s.send({type:'TILE_PREVIEW',position:'gap'});s.send({type:'OPEN',panel:'help'});assert.equal(s.getSnapshot().bakeryPreview,null);assert.equal(s.getSnapshot().chapter.bakery.stage,'gap');close(s);
 const payload=structuredClone(s.getSnapshot().chapter),loaded=unpack({format:1,content:'garden-chapter-3',writer:'test',revision:1,payload,checksum:checksum(JSON.stringify(payload))});assert.ok(loaded);s=new GardenStore(initialGarden('restore'));s.send({type:'BOOT',chapter:loaded.payload});assert.equal(s.getSnapshot().mode,'bakery-repair');assert.equal(s.getSnapshot().bakeryPreview,null);s.send({type:'TILE_PREVIEW',position:'gap'});s.send({type:'BAKERY_STEP',step:'PLACE'});s.send({type:'INTERRUPT'});assert.equal(s.getSnapshot().chapter.bakery.stage,'sealed');assert.ok(validChapter(s.getSnapshot().chapter));
});
test('G5: invalid resource histories reject instead of fabricating tile or loaf progress',()=>{
 const s=game();for(const change of [{stage:'done'},{tile:'roof'},{loaf:'sol'},{permission:true}]){const c=structuredClone(s.getSnapshot().chapter);Object.assign(c.bakery,change);assert.equal(validChapter(c),false);}assert.equal(bakeryReady(s.getSnapshot().chapter),false);
});
test('Reading correction: an unshaped batch has a world consequence, retries from dry flour and preserves the repaired roof',()=>{
 const s=game();finishBakery(s,false,true);const c=s.getSnapshot().chapter;
 assert.equal(c.bakery.unshapedBatches,1);assert.equal(c.bakery.tile,'roof');assert.equal(c.bakery.loaf,'sol');assert.deepEqual(c.exposed,[]);
 const restored=unpack({format:1,content:'garden-chapter-3',writer:'test',revision:1,payload:c,checksum:checksum(JSON.stringify(c))});assert.equal(restored?.payload.bakery.unshapedBatches,1);
 for(const value of [0,-1,1.5,101]){const invalid=structuredClone(c);invalid.bakery.unshapedBatches=value;assert.equal(validChapter(invalid),false);}
});
