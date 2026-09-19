import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {encodePng,decodePng} from './image-codec.mjs';
const checks=[];
for(const mixedAlpha of[false,true]){
 const image={width:37,height:29,data:Buffer.alloc(37*29*4)};for(let i=0;i<image.data.length;i+=4){image.data[i]=(i*19)%256;image.data[i+1]=(i*7)%256;image.data[i+2]=(i*13)%256;image.data[i+3]=mixedAlpha?(i/4)%256:255;}
 const encoded=encodePng(image),decoded=decodePng(encoded);assert.equal(decoded.width,image.width);assert.equal(decoded.height,image.height);assert(decoded.data.equals(image.data));if(mixedAlpha)assert.equal(encoded[25],6,'Partial/zero alpha must retain RGBA encoding');checks.push({name:mixedAlpha?'Partial alpha and hidden RGB remain exact':'Opaque sample pixels and reconstructed alpha remain exact',status:'PASS'});
}
const manifest=JSON.parse(execFileSync('git',['show','HEAD:content/production-assets.json'],{maxBuffer:8*1024*1024})),frame=manifest['ASSET.ENV.CY.BACKPLATE/base'].levels[2].frames[0],original=await fs.readFile('public'+frame.fallbackUrl),image=decodePng(original),encoded=encodePng(image),decoded=decodePng(encoded);assert(decoded.data.equals(image.data));assert.equal(encoded[25],2);assert(encoded.length<original.length);checks.push({name:'Actual CY background uses smaller opaque RGB encoding with exact RGBA',status:'PASS',before:original.length,after:encoded.length});
await fs.writeFile('evidence/staged-bridge-20260916/transfer-reuse/rgb-codec-checks.json',JSON.stringify({at:new Date().toISOString(),scope:'Encoder regression checks against the preserved HEAD derivative. This script writes no runtime asset or manifest.',checks},null,2)+'\n');console.log(JSON.stringify(checks));
