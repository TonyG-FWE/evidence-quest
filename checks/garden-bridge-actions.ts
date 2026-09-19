import assert from 'node:assert/strict';
import {GardenStore,type Point} from '../src/garden/model.js';
import {handAnchor,type HandObject} from '../src/garden/hands.js';
import {bridgePosts,ropeSides,postPoint,ropeTarget,firstPart,type BridgePostId} from '../src/garden/bridgeConstruction.js';
import {advance} from './garden-play-actions.js';

export function handPlace(store:GardenStore,object:HandObject,point:Point){
 store.send({type:'HAND_BEGIN',object,point:handAnchor(store.getSnapshot(),object)});
 assert.equal(store.getSnapshot().gesture?.object,object,`Available: ${object}`);
 store.send({type:'HAND_MOVE',point});store.send({type:'HAND_RELEASE'});
 assert.equal(store.getSnapshot().gesture,null);
}
export function bridgeWalk(store:GardenStore,point:Point){store.send({type:'GO',point});advance(store);assert.ok(Math.hypot(store.getSnapshot().chapter.pip.x-point.x,store.getSnapshot().chapter.pip.z-point.z)<.02,`Reached ${point.x},${point.z}: ${store.getSnapshot().notice}`);}
export function installBridgePosts(store:GardenStore,posts:readonly BridgePostId[]){for(const id of posts)if(!store.getSnapshot().chapter.river.construction?.posts[id])handPlace(store,`post:${id}`,postPoint(store.getSnapshot().chapter,id));}
export function secureBridgeHalf(store:GardenStore,end:'west'|'east'){
 const c=store.getSnapshot().chapter,first=c.sections[firstPart(c)];
 bridgeWalk(store,end==='west'?{x:first.x-1.2,z:first.z}:{...first});
 installBridgePosts(store,bridgePosts.filter(id=>end==='west'?!id.startsWith('east'):id.startsWith('east')));
 for(const side of ropeSides){const chapter=store.getSnapshot().chapter;if(end==='west'&&chapter.river.construction?.ropes[side].west||end==='east'&&chapter.river.construction?.ropes[side].east)continue;handPlace(store,`rope:${side}`,postPoint(chapter,ropeTarget(chapter,side)));}
}
export function buildBridge(store:GardenStore){
 store.send({type:'BACK'});bridgeWalk(store,{x:-2.8,z:.8});
 store.send({type:'COLLECT_ROPES'});advance(store);
 handPlace(store,'section:a',{x:-.775,z:3});secureBridgeHalf(store,'west');
 bridgeWalk(store,{x:-.775,z:3});handPlace(store,'section:b',{x:.775,z:3});secureBridgeHalf(store,'east');
}
