import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {decodePng} from './image-codec.mjs';
const originalBytes=execFileSync('git',['show','HEAD:content/production-assets.json'],{maxBuffer:8*1024*1024}),before=JSON.parse(originalBytes),after=JSON.parse(await fs.readFile('content/production-assets.json','utf8'));
const seen=new Set(),rows=[];let totalBefore=0,totalAfter=0;
for(const [key,row]of Object.entries(before))for(const density of [1,2])for(const [index,old]of row.levels[density].frames.entries()){
 const current=after[key].levels[density].frames[index];assert(current);assert.equal(current.url,old.url,'WebP URL changed');assert.equal(current.bytes,old.bytes,'WebP size changed');
 for(const property of ['width','height','contentRectPixels','anchor','referenceHeight','mirror','rgbaBytes'])assert.deepEqual(current[property],old[property],key+': '+property);
 if(seen.has(old.fallbackUrl))continue;seen.add(old.fallbackUrl);
 const a=await fs.readFile('public'+old.fallbackUrl),b=await fs.readFile('public'+current.fallbackUrl),original=decodePng(a),optimized=decodePng(b);
 assert.equal(original.width,optimized.width);assert.equal(original.height,optimized.height);assert(original.data.equals(optimized.data),'RGBA samples changed');assert(b.length<=a.length,'PNG grew');
 totalBefore+=a.length;totalAfter+=b.length;rows.push({source:old.fallbackUrl,derivative:current.fallbackUrl,before:a.length,after:b.length,rgbaExact:true});
}
const report={at:new Date().toISOString(),baseline:'HEAD:content/production-assets.json',baselineSha256:createHash('sha256').update(originalBytes).digest('hex'),scope:'Every existing density/crop preserved with exact decoded RGBA, unchanged WebP, unchanged original PNG files. This is not browser qualification.',uniquePngs:rows.length,totalBefore,totalAfter,saved:totalBefore-totalAfter,rows};
await fs.writeFile('evidence/staged-bridge-20260916/transfer-reuse/png-optimization.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,rows:undefined}));
