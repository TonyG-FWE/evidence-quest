/** Maintainer-only snapshot of the already inspected runtime bytes. No conversion. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {sha256,DEMO_MANIFEST} from './demo-assets.mjs';
import {readPersonalLandscapeAssets} from './personal-landscape-source.mjs';
import {readPersonalGrassSource} from './personal-grass-source.mjs';

const files=[],seenTargets=new Set();
async function add(source,file,targets,expected,kind){
 const bytes=await fs.readFile(source),hash=sha256(bytes);if(expected&&hash!==expected)throw Error('Source binding mismatch: '+source);
 for(const target of targets){if(seenTargets.has(target))throw Error('Duplicate packaged target: '+target);seenTargets.add(target);}
 await fs.mkdir(path.dirname(file),{recursive:true});let existing;try{existing=await fs.readFile(file);}catch(error){if(error.code!=='ENOENT')throw error;}
 if(existing&&sha256(existing)!==hash)throw Error('Packaged copy already differs; preserve and review it: '+file);
 if(!existing)await fs.copyFile(source,file);
 if(sha256(await fs.readFile(file))!==hash)throw Error('Packaged copy verification failed: '+file);
 files.push({file,targets,sha256:hash,bytes:bytes.length,kind,source});
}
const reviewPath='evidence/final-demo-20260918/review-assets.json',reviewBytes=await fs.readFile(reviewPath),review=JSON.parse(reviewBytes.toString());
if(review.profile!=='local-review'||sha256(await fs.readFile('.cache/final-demo-review/assets/manifest.json'))!==sha256(reviewBytes))throw Error('Review cache and source manifest differ');
await add(reviewPath,'assets/demo/review/manifest.json',['.cache/final-demo-review/assets/manifest.json',reviewPath],sha256(reviewBytes),'review-manifest');
const references=new Map();for(const asset of Object.values(review.assets))for(const item of [asset,...(asset.animations??[])]){
 const name=path.posix.basename(item.uri);if(!/^[a-z0-9-]+\.(glb|json)$/.test(name))throw Error('Unexpected review URI: '+item.uri);
 if(references.has(name)&&references.get(name)!==item.sha256)throw Error('Conflicting runtime asset: '+name);references.set(name,item.sha256);
}
for(const [name,expected]of [...references].sort(([a],[b])=>a.localeCompare(b)))await add('.cache/final-demo-review/assets/'+name,'assets/demo/review/'+name,['.cache/final-demo-review/assets/'+name],expected,'review-runtime');
await add('evidence/final-demo-20260918/inventory.json','assets/demo/metadata/inventory.json',['evidence/final-demo-20260918/inventory.json'],null,'original-inventory');
const landscape=await readPersonalLandscapeAssets();
for(const item of landscape.files)await add('output/personal-landscape-20260918/'+item.relative,'assets/demo/personal-landscape/'+item.relative,['output/personal-landscape-20260918/'+item.relative],item.sha256,'personal-runtime');
for(const receipt of landscape.receipt.provenance){const relative=receipt.file.replace('output/personal-landscape-20260918/','');await add(receipt.file,'assets/demo/personal-landscape/'+relative,[receipt.file],receipt.sha256,'personal-provenance');}
// The path support table is a direct TypeScript import; footprint is its retained
// source-binding input used by the current qualification recorder.
const pathReceipt=JSON.parse(await fs.readFile('output/personal-landscape-20260918/path/provenance.json','utf8'));
for(const name of ['path-support.json','path-footprint.json']){
 const target='output/personal-landscape-20260918/path/'+name,record=pathReceipt.artifacts.find(item=>item.file.replaceAll('\\','/')===target);if(!record)throw Error('Missing path metadata binding: '+name);
 await add(target,'assets/demo/personal-landscape/path/'+name,[target],record.sha256,'personal-path-metadata');
}
const grass=await readPersonalGrassSource(),originals=new Map(landscape.receipt.sources.map(source=>[source.file.replaceAll('\\','/'),source.sha256]));originals.set(grass.receipt.source,grass.receipt.sha256);
for(const [source,hash]of [...originals].sort(([a],[b])=>a.localeCompare(b)))await add(source,'assets/demo/originals/'+hash+'.glb',[source],hash,'loader-verified-original');
// The review exporter returns before production generates its local texture
// worker. Preserve the existing matching decoder bytes for clean checkouts.
for(const name of ['basis_transcoder.js','basis_transcoder.wasm','texture-worker.js']){
 const target='public/garden-assets/basis/'+name;await add(target,'assets/demo/decoders/'+name,[target],null,'runtime-decoder');
}
// Preserve the already approved runtime selection independently of the pending
// supplied review cast; never rely on untracked public-directory leftovers.
const approvedPath='public/garden-assets/manifest.json',approved=JSON.parse(await fs.readFile(approvedPath,'utf8'));
for(const asset of approved.assets){
 if(asset.approval!=='approved'||!/^\/garden-assets\/[a-z-]+-[a-f0-9]{12}\.glb$/.test(asset.uri))throw Error('Invalid retained approved runtime binding');
 const target='public'+asset.uri;await add(target,'assets/demo/approved-runtime/'+path.basename(target),[target],asset.sha256,'retained-approved-runtime');
}
await add(approvedPath,'assets/demo/approved-runtime/manifest.json',[approvedPath],null,'retained-approved-runtime');
files.sort((a,b)=>a.file.localeCompare(b.file));
const manifest={schema:'evidence-quest.demo-package.v1',profile:'local-review-personal-landscape',approval:'pending-review',filesSha256:sha256(JSON.stringify(files)),files,scope:'Finite byte-identical runtime copies and original/provenance inputs required by the current review loaders. Selected assets remain pending matching Form/movement acceptance. Original supplied files are preserved at their source paths. No regeneration, recompression, paid operation or production approval.'};
await fs.writeFile(DEMO_MANIFEST,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({manifest:DEMO_MANIFEST,files:files.length,bytes:files.reduce((n,file)=>n+file.bytes,0),byKind:Object.fromEntries([...new Set(files.map(file=>file.kind))].map(kind=>[kind,files.filter(file=>file.kind===kind).length])),filesSha256:manifest.filesSha256},null,2));
