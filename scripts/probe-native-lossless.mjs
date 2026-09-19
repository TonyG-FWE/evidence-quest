import fs from 'node:fs/promises';
import sharp from 'sharp';
import {decodePng} from './image-codec.mjs';
const manifest=JSON.parse(await fs.readFile('content/production-assets.json','utf8')),rows=[];
const selected=Object.keys(manifest).filter(key=>key==='ASSET.ENV.CY.BACKPLATE/base'||key==='ASSET.PROP.CY.BOARD/base');
sharp.concurrency(1);
for(const key of selected){
 const frame=manifest[key].levels[2].frames[0],source=decodePng(await fs.readFile('public'+frame.fallbackUrl));let opaque=true;const palette=new Set();
 for(let i=0;i<source.data.length;i+=4){if(source.data[i+3]!==255)opaque=false;if(palette.size<=256)palette.add(source.data.readUInt32LE(i));}
 const make=()=>sharp(source.data,{raw:{width:source.width,height:source.height,channels:4}});
 const candidates=[['avif-lossless-444-effort4',()=>make().avif({lossless:true,chromaSubsampling:'4:4:4',bitdepth:8,effort:4}).toBuffer()],['png-adaptive-rgba',()=>make().png({compressionLevel:9,adaptiveFiltering:true,palette:false}).toBuffer()],['png-fixed-rgba',()=>make().png({compressionLevel:9,adaptiveFiltering:false,palette:false}).toBuffer()],...(opaque?[['png-adaptive-rgb',()=>make().removeAlpha().png({compressionLevel:9,adaptiveFiltering:true,palette:false}).toBuffer()],['png-fixed-rgb',()=>make().removeAlpha().png({compressionLevel:9,adaptiveFiltering:false,palette:false}).toBuffer()]]:[])];
 for(const [method,encode]of candidates){const started=performance.now(),encoded=await encode(),decoded=await sharp(encoded).ensureAlpha().raw().toBuffer({resolveWithObject:true});let different=0,maxDelta=0;for(let i=0;i<source.data.length;i++){const delta=Math.abs(source.data[i]-decoded.data[i]);if(delta)different++;maxDelta=Math.max(maxDelta,delta);}const row={key,method,width:source.width,height:source.height,opaque,paletteFits256:palette.size<=256,bytes:encoded.length,priorWebp:frame.bytes,priorPng:frame.fallbackBytes,exactRGBA:different===0&&decoded.info.width===source.width&&decoded.info.height===source.height,differentChannelSamples:different,maximumChannelDifference:maxDelta,elapsedMs:Math.round(performance.now()-started)};rows.push(row);console.log(JSON.stringify(row));
  if(method.startsWith('avif'))await fs.writeFile('evidence/staged-bridge-20260916/transfer-reuse/'+(key.includes('BACKPLATE')?'courtyard-backplate':'courtyard-board')+'-lossless-probe.avif',encoded);
 }
}
await fs.writeFile('evidence/staged-bridge-20260916/transfer-reuse/native-codec-probe.json',JSON.stringify({at:new Date().toISOString(),qualification:false,toolchain:sharp.versions,scope:'Bounded local native codec comparison; unchanged source dimensions. Exact RGBA roundtrip required, including hidden colors. No installed tools, production changes or budget changes.',documentation:'https://sharp.pixelplumbing.com/api-output/#avif',rows},null,2)+'\n');
