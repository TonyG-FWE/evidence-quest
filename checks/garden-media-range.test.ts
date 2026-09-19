import test from 'node:test';
import assert from 'node:assert/strict';
import {byteRange,EphemeralCastMedia,sendMedia} from '../server/mediaRange.js';
import type {IncomingMessage,ServerResponse} from 'node:http';

test('media ranges preserve exact inclusive bytes, suffixes and HEAD metadata',()=>{
 assert.deepEqual(byteRange('bytes=0-1',12),{start:0,end:1});assert.deepEqual(byteRange('bytes=7-',12),{start:7,end:11});assert.deepEqual(byteRange('bytes=-3',12),{start:9,end:11});
 for(const value of ['bytes=12-','bytes=3-2','bytes=0-1,3-4','bytes=-0','bytes=999999999999999999999-'])assert.equal(byteRange(value,12),'invalid');
 let status=0,headers:Record<string,unknown>={},body:unknown;
 const response={writeHead:(code:number,value:Record<string,unknown>)=>{status=code;headers=value;},end:(value:unknown)=>{body=value;}} as unknown as ServerResponse;
 sendMedia({method:'GET',headers:{range:'bytes=2-4'}} as IncomingMessage,response,Buffer.from('abcdef'),'audio/wav');
 assert.equal(status,206);assert.equal(headers['Content-Range'],'bytes 2-4/6');assert.equal(headers['Content-Length'],3);assert.equal(String(body),'cde');
 sendMedia({method:'HEAD',headers:{range:'bytes=2-4'}} as IncomingMessage,response,Buffer.from('abcdef'),'audio/wav');assert.equal(status,206);assert.equal(body,undefined);
 sendMedia({method:'GET',headers:{range:'bytes=9-'}} as IncomingMessage,response,Buffer.from('abcdef'),'audio/wav');assert.equal(status,416);assert.equal(headers['Content-Range'],'bytes */6');
});
test('dynamic media capabilities are independent, bounded, revocable and expire',()=>{
 const cache=new EphemeralCastMedia(6,1000),first=cache.put(Buffer.from('abc'),'audio/wav',0)!,second=cache.put(Buffer.from('def'),'audio/wav',0)!;
 assert.notEqual(first,second);assert.match(first,/^\/api\/garden\/cast-media\/[a-f0-9]{48}$/);
 const token=(uri:string)=>uri.split('/').at(-1)!;
 cache.revoke(token(first));assert.equal(cache.get(token(first),1),undefined);assert.equal(String(cache.get(token(second),1)?.audio),'def');
 assert.equal(cache.put(Buffer.alloc(7),'audio/wav',1),null);assert.equal(cache.get(token(second),1000),undefined);
});
