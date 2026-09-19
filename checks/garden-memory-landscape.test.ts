import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {attachPersonalMemoryLandscape} from '../src/garden/assets/personalMemoryLandscape.js';
import {VisualAssetLibrary} from '../src/garden/assets/visualAsset.js';

const options={kind:'bench',bounds:{minX:-2,maxX:2,minZ:-1,maxZ:1},groundY:0};
const settle=()=>new Promise<void>(resolve=>setImmediate(resolve));

test('Memory texture failure aborts stalled peers immediately and exposes recovery',async t=>{
 const signals:AbortSignal[]=[];t.mock.method(globalThis,'fetch',async(input:unknown,init?:RequestInit)=>{signals.push(init!.signal!);return String(input).endsWith('bank-top.png')?new Response('',{status:503}):await new Promise<Response>(()=>{});});
 const parent=new T.Group(),library=new VisualAssetLibrary(),landscape=attachPersonalMemoryLandscape(parent,library,options);
 t.after(()=>{landscape.dispose();library.dispose();});landscape.demand(true);await settle();await settle();
 assert.equal(landscape.status,'failed');assert.match(landscape.error!,/503.*bank-top\.png/);assert.equal(landscape.ready,false);assert.equal(landscape.root.visible,false);
 assert.equal(signals.length,2);assert.equal(signals[1]!.aborted,true,'A failed texture must not wait for a stalled sibling');
 landscape.demand(false);assert.equal(landscape.status,'inactive');assert.equal(landscape.error,null);
});

/** Synthetic image/decode control-flow fixture; native image fidelity is not claimed. */
test('Memory retirement cancels decodes, excludes late results and releases exact textures on leaving',async t=>{
 const prior=Object.getOwnPropertyDescriptor(globalThis,'Image'),images:ImageFixture[]=[],revoked:string[]=[],signals:AbortSignal[]=[];
 class ImageFixture{
  src='';naturalWidth=2048;naturalHeight=1024;finish=()=>{};
  constructor(){images.push(this);}
  decode(){return new Promise<void>(resolve=>{this.finish=resolve;});}
  removeAttribute(name:string){if(name==='src')this.src='';}
 }
 Object.defineProperty(globalThis,'Image',{configurable:true,writable:true,value:ImageFixture});
 t.after(()=>{if(prior)Object.defineProperty(globalThis,'Image',prior);else Reflect.deleteProperty(globalThis,'Image');});
 t.mock.method(globalThis,'fetch',async(_input:unknown,init?:RequestInit)=>{signals.push(init!.signal!);return new Response(new Uint8Array([1,2,3]));});
 let id=0;t.mock.method(URL,'createObjectURL',()=>`blob:memory-${++id}`);t.mock.method(URL,'revokeObjectURL',(url:string)=>{revoked.push(url);});
 const parent=new T.Group(),library=new VisualAssetLibrary(),landscape=attachPersonalMemoryLandscape(parent,library,options);
 t.after(()=>{landscape.dispose();library.dispose();});
 landscape.demand(true);await settle();assert.equal(images.length,2);
 landscape.demand(false);assert.ok(signals.every(signal=>signal.aborted));assert.equal(revoked.length,2);assert.ok(images.every(image=>image.src===''));
 landscape.demand(true);await settle();assert.equal(images.length,4);
 images[0]!.finish();images[1]!.finish();await settle();assert.equal(landscape.status,'loading');assert.equal(landscape.ready,false,'Retired decode completion cannot publish over a new owner');
 images[2]!.finish();images[3]!.finish();await settle();await settle();assert.equal(landscape.status,'ready');assert.equal(landscape.root.visible,true);
 const textures=landscape.resources.filter((resource):resource is T.Texture=>resource instanceof T.Texture);assert.equal(textures.length,2);
 const defaults=new T.Texture();let disposed=0;for(const texture of textures){const image=texture.image as ImageFixture;assert.equal(image.naturalWidth,2048);assert.equal(image.naturalHeight,1024);assert.equal(texture.flipY,defaults.flipY);assert.equal(texture.generateMipmaps,defaults.generateMipmaps);assert.equal(texture.colorSpace,T.SRGBColorSpace);assert.equal(texture.wrapS,T.MirroredRepeatWrapping);assert.equal(texture.anisotropy,8);texture.addEventListener('dispose',()=>{disposed++;});}defaults.dispose();
 landscape.demand(false);assert.equal(disposed,2);assert.equal(landscape.resources.some(resource=>resource instanceof T.Texture),false);assert.equal(landscape.root.visible,false);
 landscape.demand(true);await settle();assert.equal(images.length,6);landscape.dispose();assert.equal(landscape.status,'disposed');assert.equal(parent.children.length,0);assert.ok(signals.slice(-2).every(signal=>signal.aborted),'Disposal aborts both currently pending textures');
 images[4]!.finish();images[5]!.finish();await settle();assert.equal(landscape.root.children.length,0);
});
