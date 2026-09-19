import test,{type TestContext} from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {boundedPersonalRequest,loadPersonalTexture} from '../src/garden/assets/personalAssetRequest.js';
import {attachPersonalRiver} from '../src/garden/assets/personalRiverSurface.js';

function installImage(t:TestContext,decode:()=>Promise<void>){
 const prior=Object.getOwnPropertyDescriptor(globalThis,'Image'),images:{src:string;naturalWidth:number;naturalHeight:number}[]=[];
 class NativeImageFixture{
  src='';naturalWidth=2048;naturalHeight=1024;
  constructor(){images.push(this);}
  decode(){return decode();}
  removeAttribute(name:string){if(name==='src')this.src='';}
 }
 Object.defineProperty(globalThis,'Image',{configurable:true,writable:true,value:NativeImageFixture});
 t.after(()=>{if(prior)Object.defineProperty(globalThis,'Image',prior);else Reflect.deleteProperty(globalThis,'Image');});
 return images;
}

test('A stalled personal request rejects by deadline, aborts work and names its source',async()=>{
 let signal:AbortSignal|undefined;
 const request=boundedPersonalRequest('/personal-landscape/path/path-derived.json',new AbortController().signal,async owned=>{signal=owned;return await new Promise(()=>{});},15);
 await assert.rejects(request,/too long.*path-derived.json/);assert.equal(signal?.aborted,true);
});

test('An already released owner cannot start personal asset work',async()=>{
 const owner=new AbortController();owner.abort(Error('Owner left the village'));let started=false;
 await assert.rejects(boundedPersonalRequest('/source.png',owner.signal,async()=>{started=true;return 1;}),/left the village/);assert.equal(started,false);
});

test('Personal textures retain native dimensions and Texture defaults without resizing',async t=>{
 const images=installImage(t,async()=>{}),revoked:string[]=[];
 t.mock.method(globalThis,'fetch',async()=>new Response(new Uint8Array([1,2,3]),{headers:{'Content-Type':'image/png'}}));
 t.mock.method(URL,'createObjectURL',()=>'blob:native-image-fixture');t.mock.method(URL,'revokeObjectURL',(url:string)=>{revoked.push(url);});
 const texture=await loadPersonalTexture('/original.png',new AbortController().signal),defaults=new T.Texture();
 assert.ok(texture.image);assert.equal(texture.image,images[0]);assert.equal(texture.image.naturalWidth,2048);assert.equal(texture.image.naturalHeight,1024);
 assert.equal(texture.flipY,defaults.flipY);assert.equal(texture.generateMipmaps,defaults.generateMipmaps);assert.equal(texture.minFilter,defaults.minFilter);
 assert.deepEqual(revoked,['blob:native-image-fixture']);assert.equal(images[0]!.src,'blob:native-image-fixture');texture.dispose();defaults.dispose();
});

test('Canceling a stalled native image decode revokes its URL and rejects late publication',async t=>{
 let release=()=>{};const images=installImage(t,()=>new Promise<void>(resolve=>{release=resolve;})),revoked:string[]=[];
 t.mock.method(globalThis,'fetch',async()=>new Response(new Uint8Array([1,2,3])));
 t.mock.method(URL,'createObjectURL',()=>'blob:pending-decode');t.mock.method(URL,'revokeObjectURL',(url:string)=>{revoked.push(url);});
 const owner=new AbortController(),pending=loadPersonalTexture('/pending.png',owner.signal);
 await new Promise(resolve=>setImmediate(resolve));assert.equal(images.length,1);owner.abort(Error('Restore view replaced this owner'));
 await assert.rejects(pending,/replaced this owner/);assert.equal(images[0]!.src,'');assert.deepEqual(revoked,['blob:pending-decode']);
 release();await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(revoked,['blob:pending-decode']);
});

test('Actual river owner exposes failed responses and stays unready',async t=>{
 t.mock.method(globalThis,'fetch',async()=>new Response('',{status:503}));
 const root=new T.Group(),river=attachPersonalRiver(root);
 await river.ready;assert.equal(river.readyState,'failed');
 assert.match(river.errors[0]!,/503.*personal-landscape/);assert.equal(river.root.visible,false);
 river.dispose();assert.equal(root.children.length,0);
});

test('Disposing a pending river owner aborts requests without adding failure notices',async t=>{
 const signals:AbortSignal[]=[];t.mock.method(globalThis,'fetch',async(_input:unknown,options?:RequestInit)=>{signals.push(options!.signal!);return await new Promise<Response>(()=>{});});
 const root=new T.Group(),river=attachPersonalRiver(root);
 river.dispose();await river.ready;
 assert.equal(signals.length,3);assert.ok(signals.every(signal=>signal.aborted));assert.equal(river.readyState,'disposed');
 assert.deepEqual(river.errors,[]);assert.equal(root.children.length,0);
});
