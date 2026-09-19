import fs from 'node:fs/promises';
import {decodePng,encodePng,losslessWebp} from './image-codec.mjs';
const manifest=JSON.parse(await fs.readFile('content/production-assets.json','utf8'));
const rows=[];
for(const key of ['ASSET.ACT.PLAYER/walk-front','ASSET.ACT.PLAYER/walk-left']){
 const frames=manifest[key].levels['2'].frames,images=await Promise.all(frames.map(async frame=>decodePng(await fs.readFile('public'+frame.fallbackUrl))));
 for(const direction of ['horizontal','vertical']){
  const width=direction==='horizontal'?images.reduce((n,image)=>n+image.width,0):Math.max(...images.map(i=>i.width));
  const height=direction==='vertical'?images.reduce((n,image)=>n+image.height,0):Math.max(...images.map(i=>i.height));
  const atlas={width,height,data:Buffer.alloc(width*height*4)};let x=0,y=0;
  for(const image of images){for(let row=0;row<image.height;row++)image.data.copy(atlas.data,((y+row)*width+x)*4,row*image.width*4,(row+1)*image.width*4);if(direction==='horizontal')x+=image.width;else y+=image.height;}
  const png=encodePng(atlas),webp=await losslessWebp(atlas);rows.push({key,direction,width,height,beforePng:frames.reduce((n,f)=>n+f.fallbackBytes,0),afterPng:png.length,beforeWebp:frames.reduce((n,f)=>n+f.bytes,0),afterWebp:webp.length});
 }
}
await fs.writeFile('evidence/integrated-checkpoint-20260916/animation-atlas-probe.json',JSON.stringify({qualification:false,scope:'Lossless packing size experiment only. Original images, dimensions and runtime manifest unchanged.',rows},null,2)+'\n');console.log(JSON.stringify(rows));
