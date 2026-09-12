import test from 'node:test';
import assert from 'node:assert/strict';
import {decodePng,encodePng,cropResize,losslessWebp} from './image-codec.mjs';
import decodeWebp,{init as initDecode} from '@jsquash/webp/decode.js';
import {readFile} from 'node:fs/promises';
test('bounded Lanczos reduction preserves solid color and alpha edges; crop padding and PNG roundtrip are exact',()=>{
 const source={width:8,height:8,data:Buffer.alloc(8*8*4)};for(let i=0;i<64;i++)source.data.set([190,80,20,255],i*4);
 const output=cropResize(source,[0,0,8,8],3,3,4);assert.equal(output.width,11);assert.equal(output.height,11);assert.deepEqual([...output.data.subarray((5*11+5)*4,(5*11+5)*4+4)],[190,80,20,255]);assert(output.data.subarray(0,44).every(x=>x===0));assert.deepEqual(decodePng(encodePng(output)).data,output.data);
 assert.throws(()=>cropResize(source,[0,0,8,8],9,8));
 for(let y=0;y<8;y++)for(let x=4;x<8;x++)source.data.set([0,255,0,0],(y*8+x)*4);
 const edge=cropResize(source,[0,0,8,8],3,3);for(let i=0;i<edge.data.length;i+=4)if(edge.data[i+3]>0){assert.equal(edge.data[i],190);assert.equal(edge.data[i+1],80);assert.equal(edge.data[i+2],20);}
});
test('permissive local WASM encoder produces deterministic lossless WebP',async()=>{
 const input={width:2,height:2,data:Buffer.from([10,20,30,255,220,20,30,255,10,200,30,255,10,20,240,255])};
 const a=await losslessWebp(input),b=await losslessWebp(input);assert.deepEqual(a,b);assert.equal(a.subarray(0,4).toString(),'RIFF');assert.equal(a.subarray(12,16).toString(),'VP8L');
});

test('lossless WebP preserves each RGBA byte including fractional alpha and transparent padding',async()=>{
 await initDecode(await WebAssembly.compile(await readFile(new URL('../node_modules/@jsquash/webp/codec/dec/webp_dec.wasm',import.meta.url))));
 const input={width:3,height:2,data:Buffer.from([10,20,30,255,220,20,30,128,10,200,30,1,10,20,240,0,0,0,0,0,255,255,255,254])};
 const result=await decodeWebp(await losslessWebp(input));assert.equal(result.width,3);assert.equal(result.height,2);assert.deepEqual(Buffer.from(result.data),input.data);
});
