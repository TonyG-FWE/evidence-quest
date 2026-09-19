import test from 'node:test';import assert from 'node:assert/strict';import{RasterPool}from'../src/world/raster-pool.js';
test('TASK11.20 exact-size raster surfaces protect both active renderers and release on resize or source revision',()=>{
 const released:string[]=[],pool=new RasterPool<string>(value=>released.push(value),100),world=Symbol('world'),story=Symbol('story');
 assert.equal(pool.get(world,'terrain','dpr1:ready1',40,()=> 'world1'),'world1');assert.equal(pool.get(story,'terrain','dpr1:ready1',40,()=> 'story1'),'story1');
 assert.equal(pool.get(world,'terrain','dpr1:ready1',40,()=>{throw Error('cache miss');}),'world1');
 assert.equal(pool.get(world,'backplate','large',60,()=> 'too large'),null);assert.deepEqual(released,[]);assert.equal(pool.stats().reservedBytes,80);
 assert.equal(pool.get(world,'terrain','dpr2:ready1',60,()=> 'world2'),'world2');assert.deepEqual(released,['world1']);assert.equal(pool.stats().reservedBytes,100);
 assert.equal(pool.get(story,'terrain','dpr1:ready2',40,()=> 'story2'),'story2');assert.deepEqual(released,['world1','story1']);
 pool.retain(world,new Set());assert.equal(pool.stats().reservedBytes,40);pool.dispose(story);assert.equal(pool.stats().reservedBytes,0);assert.equal(pool.stats().peakBytes,100);
});
test('TASK11.20 rejected, incomplete and failed raster allocations cannot retain uncounted surfaces',()=>{
 const freed:string[]=[],pool=new RasterPool<string>(value=>freed.push(value),100),owner=Symbol();
 assert.equal(pool.get(owner,'bad','v1',NaN,()=> 'bad'),null);assert.equal(pool.get(owner,'huge','v1',101,()=> 'huge'),null);
 assert.throws(()=>pool.get(owner,'failed','v1',70,()=>{throw Error('allocation failed');}));assert.equal(pool.stats().reservedBytes,0);
 pool.get(owner,'cold','v1',80,()=> 'incomplete');pool.drop(owner,'cold');assert.deepEqual(freed,['incomplete']);assert.equal(pool.stats().reservedBytes,0);
 pool.get(owner,'cold','v2',80,()=> 'decoded');pool.dispose(owner);assert.deepEqual(freed,['incomplete','decoded']);assert.equal(pool.stats().entries,0);assert(pool.stats().peakBytes<=100);
});
