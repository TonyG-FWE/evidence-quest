import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {decodePng,losslessWebp} from './image-codec.mjs';
import decodeWebp,{init as initWebp} from '@jsquash/webp/decode.js';
await initWebp(await WebAssembly.compile(await fs.readFile('node_modules/@jsquash/webp/codec/dec/webp_dec.wasm')));
const manifest=JSON.parse(await fs.readFile('content/production-assets.json','utf8')),rows=[];
for(const key of ['ASSET.ACT.PLAYER/walk-front','ASSET.ACT.PLAYER/walk-left']){
 const frames=manifest[key].levels[2].frames,images=await Promise.all(frames.map(async f=>decodePng(await fs.readFile('public'+f.fallbackUrl))));
 for(const align of ['top-left','feet']){
  const maxX=Math.max(...frames.map(f=>f.anchor[0])),maxY=Math.max(...frames.map(f=>f.anchor[1])),offsets=frames.map(f=>align==='feet'?[Math.round(maxX-f.anchor[0]),Math.round(maxY-f.anchor[1])]:[0,0]),width=Math.max(...images.map((image,i)=>image.width+offsets[i][0])),height=Math.max(...images.map((image,i)=>image.height+offsets[i][1]));
  const canvases=images.map((image,i)=>{const data=Buffer.alloc(width*height*4);for(let y=0;y<image.height;y++)image.data.copy(data,((y+offsets[i][1])*width+offsets[i][0])*4,y*image.width*4,(y+1)*image.width*4);return data;});
  for(const predictor of ['base','previous'])for(const operation of ['xor','subtract']){
   const encoded=[],similarities=[];let exact=true;
   for(let index=0;index<canvases.length;index++){
    const original=canvases[index],reference=canvases[predictor==='previous'?index-1:0],delta=Buffer.from(original);let equalPixels=0;
    if(index)for(let i=0;i<delta.length;i+=4){let equal=true;for(let c=0;c<4;c++){equal&&=original[i+c]===reference[i+c];delta[i+c]=operation==='xor'?original[i+c]^reference[i+c]:(original[i+c]-reference[i+c])&255;}if(equal)equalPixels++;}
    const data=await losslessWebp({width,height,data:delta}),decoded=await decodeWebp(data.buffer.slice(data.byteOffset,data.byteOffset+data.byteLength)),reconstructed=Buffer.from(decoded.data);
    if(index)for(let i=0;i<reconstructed.length;i++)reconstructed[i]=operation==='xor'?reconstructed[i]^reference[i]:(reconstructed[i]+reference[i])&255;
    assert(reconstructed.equals(original),'RGBA mismatch, including hidden RGB');encoded.push(data.length);similarities.push(equalPixels/(width*height));
   }
   const row={key,align,predictor,operation,width,height,decodedCanvasBytes:width*height*4,encoded,bytes:encoded.reduce((a,b)=>a+b,0),priorWebp:frames.reduce((n,f)=>n+f.bytes,0),equalPixelFractions:similarities,exactRGBA:exact};rows.push(row);console.log(JSON.stringify(row));
  }
 }
}
await fs.writeFile('evidence/staged-bridge-20260916/transfer-reuse/interframe-probe.json',JSON.stringify({at:new Date().toISOString(),qualification:false,scope:'Bounded offline lossless prediction probe. No production changes. Every decoded candidate reconstructs every original RGBA byte, including transparent pixels.',rows},null,2)+'\n');
