import test from'node:test';import assert from'node:assert/strict';import{TransferPool}from'../src/world/transfer-pool.js';
test('TASK11.20 encoded responses share native/Canvas ownership, bound bytes, and retire only unowned responses',async()=>{
 const loads:string[]=[],released:string[]=[],pool=new TransferPool<string>(async r=>{loads.push(r.url);return 'blob:'+r.url;},v=>released.push(v),100),native=Symbol('native'),canvas=Symbol('canvas');
 const a=pool.acquire({url:'shared',bytes:60},native),b=pool.acquire({url:'shared',bytes:60},canvas);assert.equal(await a,await b);assert.deepEqual(loads,['shared']);pool.dispose(native);
 assert.equal(await pool.acquire({url:'room',bytes:60},native),null);assert.deepEqual(released,[]);pool.dispose(canvas);assert.equal(await pool.acquire({url:'room',bytes:60},native),'blob:room');assert.deepEqual(released,['blob:shared']);assert.equal(pool.stats().reservedBytes,60);assert(pool.stats().peakBytes<=100);
});
test('TASK11.20 encoded failed responses require retry and canceled old fetches cannot return a revoked URL',async()=>{
 const owner=Symbol();let calls=0;const pool=new TransferPool<string>(async()=>{if(++calls===1)throw Error('offline');return 'blob:ready';},()=>{},100);
 await assert.rejects(pool.acquire({url:'art',bytes:50},owner));await assert.rejects(pool.acquire({url:'art',bytes:50},owner));assert.equal(calls,1);assert.equal(pool.stats().reservedBytes,0);pool.retry();assert.equal(await pool.acquire({url:'art',bytes:50},owner),'blob:ready');assert.equal(calls,2);
 let finish:(value:string)=>void=()=>{};const released:string[]=[],slow=new TransferPool<string>(()=>new Promise(resolve=>{finish=resolve;}),v=>released.push(v),100),pending=slow.acquire({url:'late',bytes:60},owner);slow.dispose(owner);finish('blob:late');await assert.rejects(pending);assert.deepEqual(released,['blob:late']);assert.equal(slow.stats().reservedBytes,0);
});
test('TASK11.20 availability inspection never starts or pins transfers and excludes failed and retired entries',async()=>{
 const owner=Symbol();let finish:(value:string)=>void=()=>{},calls=0;const pool=new TransferPool<string>(r=>{calls++;if(r.url==='failed')return Promise.reject(Error('offline'));return new Promise(resolve=>{finish=resolve;});},()=>{},100);
 assert.equal(pool.available('art'),false);assert.equal(calls,0);const pending=pool.acquire({url:'art',bytes:50},owner);assert.equal(pool.available('art'),true);finish('blob:art');await pending;assert.equal(pool.available('art'),true);
 const failed=pool.acquire({url:'failed',bytes:20},owner);await assert.rejects(failed);assert.equal(pool.available('failed'),false);pool.dispose(owner);
 const replacement=pool.acquire({url:'replacement',bytes:80},owner);assert.equal(pool.available('art'),false);finish('blob:replacement');await replacement;assert.equal(calls,3);
});
