import test from 'node:test';
import assert from 'node:assert/strict';
import {ImagePool,type ImageResource} from '../src/world/image-pool.js';
const item=(url:string,rgbaBytes:number,level:1|2=1):ImageResource=>({url,rgbaBytes,level,group:'fixture'});
const turn=()=>new Promise(resolve=>setTimeout(resolve,0));
test('TASK11.20 image cache shares in-flight decodes, never evicts an active owner, and bounds inactive retained pixels',async()=>{
 const loads:string[]=[],released:string[]=[],pool=new ImagePool<string>(async url=>{loads.push(url);return url;},value=>released.push(value),100);
 const world=Symbol('world'),story=Symbol('story');pool.subscribe(world,()=>{});pool.subscribe(story,()=>{});
 pool.request(item('shared',40),world);pool.request(item('shared',40),story);await turn();assert.deepEqual(loads,['shared']);
 pool.request(item('room',50),world);await turn();assert.equal(pool.request(item('too-large',30),story).status,'budget');assert.equal(pool.stats().reservedBytes,90);assert.deepEqual(released,[]);
 pool.retain(world,new Set(['shared']));pool.request(item('next',50),story);await turn();assert.deepEqual(released,['room']);assert.equal(pool.stats().reservedBytes,90);assert(pool.stats().peakBytes<=100);
 pool.dispose(world);assert.equal(pool.request(item('shared',40),story).value,'shared');pool.dispose(story);
});
test('TASK11.20 high-density images retire after their last owner and canceled old callbacks cannot resurrect a decode',async()=>{
 let complete:((value:string)=>void)|undefined,aborted=false;const released:string[]=[],owner=Symbol(),pool=new ImagePool<string>((_url,signal)=>new Promise(resolve=>{complete=resolve;signal.addEventListener('abort',()=>{aborted=true;});}),value=>released.push(value),100);
 pool.request(item('high',80,2),owner);assert.equal(pool.stats().reservedBytes,80);pool.dispose(owner);assert.equal(aborted,true);assert.equal(pool.stats().reservedBytes,0);
 complete!('late high');await turn();assert.deepEqual(released,['late high']);assert.equal(pool.stats().entries,0);
});
test('TASK11.20 failed image loads can be retried without an unbounded request loop',async()=>{
 let calls=0;const owner=Symbol(),pool=new ImagePool<string>(async()=>{calls++;if(calls===1)throw Error('fixture image error');return 'ready';},()=>{},100);
 pool.request(item('image',20),owner);await turn();assert.equal(pool.request(item('image',20),owner).status,'failed');assert.equal(calls,1);pool.retry();pool.request(item('image',20),owner);await turn();assert.equal(pool.request(item('image',20),owner).value,'ready');assert.equal(calls,2);
});
