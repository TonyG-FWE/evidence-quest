import {buildBridge} from './garden-bridge-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,GRANDMA_APPROACH,CROSSING} from '../src/garden/model.js';
import {advance,finishBakery} from './garden-play-actions.js';
import {anchors} from '../src/garden/worldLayout.js';
import {storyboardFor} from '../src/garden/journal.js';
import {cardSlot} from '../src/garden/workbench.js';

function workshop(){
 const store=new GardenStore(initialGarden('workbench-contract'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});store.send({type:'GO',point:CROSSING});advance(store);buildBridge(store);store.send({type:'GO',point:GRANDMA_APPROACH});advance(store);finishBakery(store);store.send({type:'GO',point:anchors.workshop.approach});advance(store);store.send({type:'TALK',who:'sol'});store.send({type:'WORKBENCH'});advance(store);assert.equal(store.getSnapshot().mode,'workbench');return store;
}
test('Workbench: release reorders only actual witnessed cards and preserves all story facts',()=>{
 const store=workshop(),before=structuredClone(store.getSnapshot().chapter),order=storyboardFor(before,before.journal).map(c=>c.id);assert.ok(order.length>3);
 store.send({type:'CARD_PICK',id:order[0]!});store.send({type:'CARD_MOVE',point:cardSlot(2)});assert.deepEqual(store.getSnapshot().chapter,before);
 store.send({type:'CARD_PLACE'});const after=structuredClone(store.getSnapshot().chapter);assert.deepEqual(after.journal.storyboard,[order[1],order[2],order[0],...order.slice(3)]);
 after.journal=before.journal;after.revision=before.revision;assert.deepEqual(after,before);
});
test('Workbench: interruption, invalid input, second selection and reload cannot commit a partial drag',()=>{
 const store=workshop(),before=structuredClone(store.getSnapshot().chapter),order=storyboardFor(before,before.journal).map(c=>c.id);
 store.send({type:'CARD_PICK',id:'grandma-copy-delivered'});assert.equal(store.getSnapshot().cardGesture,null);
 store.send({type:'CARD_PICK',id:order[0]!});store.send({type:'CARD_PICK',id:order[1]!});assert.equal(store.getSnapshot().cardGesture?.id,order[0]);
 store.send({type:'CARD_MOVE',point:{x:NaN,z:0}});assert.deepEqual(store.getSnapshot().cardGesture?.point,cardSlot(0));
 store.send({type:'CARD_MOVE',point:cardSlot(2)});store.send({type:'OPEN',panel:'journal'});assert.equal(store.getSnapshot().cardGesture,null);store.send({type:'CARD_PLACE'});assert.deepEqual(store.getSnapshot().chapter,before);
 store.send({type:'CLOSE'});assert.equal(store.getSnapshot().mode,'workbench');store.send({type:'CARD_PICK',id:order[0]!});store.send({type:'INTERRUPT',background:true});assert.equal(store.getSnapshot().cardGesture,null);assert.deepEqual(store.getSnapshot().chapter,before);
 const reopened=new GardenStore(initialGarden('reload'));reopened.send({type:'BOOT',chapter:before});assert.equal(reopened.getSnapshot().cardGesture,null);assert.equal(reopened.getSnapshot().mode,'walk');assert.deepEqual(reopened.getSnapshot().chapter,before);
});
test('Workbench: remote access and direct commands outside its scene are no-ops',()=>{
 const store=workshop();store.send({type:'BACK'});store.send({type:'GO',point:GRANDMA_APPROACH});advance(store);const before=structuredClone(store.getSnapshot().chapter);store.send({type:'WORKBENCH'});assert.equal(store.getSnapshot().mode,'walk');store.send({type:'CARD_PICK',id:'bridge-crossed'});assert.equal(store.getSnapshot().cardGesture,null);assert.deepEqual(store.getSnapshot().chapter,before);
});
