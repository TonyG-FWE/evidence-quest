import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {decodePng} from './image-codec.mjs';
import decodeWebp,{init} from '@jsquash/webp/decode.js';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const inventory=JSON.parse(await readFile('evidence/er13/art-runtime-inventory.json','utf8'));
for(const file of inventory.files){const bytes=await readFile('public'+file.url);assert.equal(hash(bytes),file.sha256,file.url);assert.equal(bytes.length,file.bytes);}
const reportBytes=await readFile('evidence/er13/production-art-exports.json'),report=JSON.parse(reportBytes),runtime=JSON.parse(await readFile('content/production-assets.json','utf8'));
await init(await WebAssembly.compile(await readFile(new URL('../node_modules/@jsquash/webp/codec/dec/webp_dec.wasm',import.meta.url))));
const checks=[];
for(const file of report.files){
 const png=await readFile('public'+file.url),pixels=decodePng(png);assert.equal(hash(png),file.sha256);assert.equal(pixels.width,file.width);assert.equal(pixels.height,file.height);assert(file.scale<=1);
 const webp=await readFile('public'+file.webp.url),decoded=await decodeWebp(webp);assert.equal(hash(webp),file.webp.sha256);assert.equal(decoded.width,pixels.width);assert.equal(decoded.height,pixels.height);assert.deepEqual(Buffer.from(decoded.data),pixels.data,file.url);
 const pad=file.padding;for(let y=0;y<file.height;y++)for(let x=0;x<file.width;x++)if(x<pad||y<pad||x>=file.width-pad||y>=file.height-pad)assert.equal(pixels.data[(y*file.width+x)*4+3],0,'Nontransparent padding '+file.url);
 checks.push({png:file.url,webp:file.webp.url,sha256:file.sha256,webpSha256:file.webp.sha256,width:file.width,height:file.height,padding:pad,rgbaEquality:true});
}
const groups=report.groups.map(group=>({...group,levels:Object.fromEntries([1,2].map(level=>{
 const frames=[...new Map(Object.values(runtime).filter(r=>r.group===group.group).flatMap(r=>r.levels[level].frames).map(f=>[f.url,f])).values()];
 const pngBytes=frames.reduce((sum,f)=>sum+report.files.find(file=>file.url===f.fallbackUrl).bytes,0),current=group.levels[level];
 return [level,{...current,pngFallbackBytes:pngBytes,webpFitsOriginalAllocation:current.encodedBytes<=current.transferCapBytes,pngFitsOriginalAllocation:pngBytes<=current.transferCapBytes}];
}))}));
const data={recordedAt:new Date().toISOString(),sourceCount:inventory.files.length,sourceBytes:inventory.files.reduce((n,f)=>n+f.bytes,0),sourceHashesUnchanged:true,exportReportSha256:hash(reportBytes),derivativeCount:checks.length,rgbaEquality:'Every WebP decoded byte equals its paired PNG including transparent RGB and alpha; exact crops and no enlargement.',groups,checks};
await writeFile('evidence/er13/production-art-verification.json',JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({sourceCount:data.sourceCount,derivatives:checks.length,groups}));
