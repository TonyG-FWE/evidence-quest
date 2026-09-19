import {test} from 'node:test';
import assert from 'node:assert/strict';
import {AssetWorkQueue} from '../src/garden/assets/workQueue.js';

test('asset work stays bounded, releases once and rejects queued work on disposal',async()=>{
 const queue=new AssetWorkQueue(2),a=await queue.acquire(),b=await queue.acquire();let entered=false;
 const waiting=queue.acquire().then(release=>{entered=true;return release;});
 await Promise.resolve();assert.equal(entered,false);assert.equal(queue.pending,1);
 a();a();const c=await waiting;assert.equal(entered,true);
 const blocked=queue.acquire();const rejected=assert.rejects(blocked,/owner closed/);queue.close();await rejected;
 await assert.rejects(queue.acquire(),/owner closed/);b();c();
});

test('a stuck retired decode cannot leave the current location waiting forever',async()=>{
 const queue=new AssetWorkQueue(1),stuck=await queue.acquire();
 await assert.rejects(queue.acquire(15),/waited too long/);assert.equal(queue.pending,0);
 let entered=false;const next=queue.acquire(1000).then(release=>{entered=true;return release;});
 await Promise.resolve();assert.equal(entered,false);
 stuck();const release=await next;assert.equal(entered,true);release();queue.close();
});
