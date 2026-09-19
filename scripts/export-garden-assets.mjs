/** Approval-bound production copies. Never modifies review or provider sources. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression} from '@gltf-transform/extensions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
import {decodePng,losslessWebp} from './image-codec.mjs';
import {KTX2Loader} from 'three/addons/loaders/KTX2Loader.js';
import {chapterFormSelection,chapterFinishSelection} from './chapter-form-selection.mjs';
if(process.env.EQ_ASSET_PROFILE==='review'){
 // Review derivatives live outside public/ and can only enter the explicit review build.
 const manifest=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8'));
 if(manifest.profile!=='local-review')throw Error('Invalid local review asset profile');
 for(const asset of Object.values(manifest.assets)){
  for(const file of [asset,...(asset.animations??[])])if(createHash('sha256').update(await fs.readFile('.cache/final-demo-review/assets/'+path.basename(file.uri))).digest('hex')!==file.sha256)throw Error('Review derivative hash mismatch: '+asset.id+' '+file.uri);
  for(const animation of asset.animations??[])if(animation.sourceModelSha256!==asset.sourceSha256)throw Error('Review animation source mismatch: '+asset.id);
 }
 console.log('Local review profile: pending assets retained as pending; production approvals unchanged.');
 process.exit(0);
}
const evidence='evidence/integrated-checkpoint-20260916';
const approval=JSON.parse(await fs.readFile(evidence+'/character-form-approval.json','utf8'));
const review=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/revision-r2/manifest.json','utf8'));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const selected=approval.assets.map(record=>({record,visual:review.assets.find(a=>a.id===record.id).visual,approvalRecord:evidence+'/character-form-approval.json',anatomySha256:record.sha256}));
let finishApproved=false;
let remaining;
try{remaining=JSON.parse(await fs.readFile(evidence+'/remaining-form-approval.json','utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
if(remaining){
 if(remaining.schema!=='evidence-quest.checkpoint-form-approval.v1'||remaining.approvedBy!=='Tony'||!remaining.userApproval)throw Error('Missing explicit remaining Form approval');
 const candidates=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/checkpoint-review/manifest.json','utf8'));
 for(const item of remaining.assets){
  if(item.status!=='APPROVED')continue;
  if(item.id==='painted-kit'){if(item.sha256!==candidates.localKit.sha256||item.sha256!==sha(await fs.readFile(candidates.localKit.file)))throw Error('Kit Form approval hash mismatch; use the matching current chapter review');finishApproved=true;continue;}
  const visual=item.id==='pip-travel'?candidates.pip:candidates.props.find(a=>a.id===item.id)?.visual;
  if(!visual||item.sha256!==visual.sha256)throw Error('Remaining Form approval hash mismatch: '+item.id);
  const record={id:visual.id,status:'APPROVED',sha256:visual.sha256,file:'evidence/hands-on-20260916'+visual.uri};
  const next={record,visual,approvalRecord:evidence+'/remaining-form-approval.json',...(item.id==='pip-travel'?{anatomySha256:approval.assets.find(a=>a.id==='pip').sha256}:{})};
  const index=selected.findIndex(a=>a.record.id===record.id);if(index>=0)selected[index]=next;else selected.push(next);
 }
}
// The consolidated candidate includes the exact earlier gait tracks and the
// new construction clips. Its separate Form receipt never grants prop, cast
// or environment approval, and absent approval leaves R2-feet in production.
let chapterApproval;
try{chapterApproval=JSON.parse(await fs.readFile('evidence/staged-bridge-20260916/chapter-form-approval.json','utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
if(chapterApproval){
 const candidates=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/chapter-review/manifest.json','utf8'));
 const propBytes=await fs.readFile(candidates.currentPropReview.file);
 if(sha(propBytes)!==candidates.currentPropReview.sha256)throw Error('Chapter prop review manifest changed');
 const props=JSON.parse(propBytes.toString());
 const finish=chapterFinishSelection(chapterApproval,candidates);
 if(finish){for(const file of finish.files)if(sha(await fs.readFile(file.file))!==file.sha256)throw Error('Chapter environment changed after Form review: '+file.file);finishApproved=true;}
 for(const next of chapterFormSelection(chapterApproval,candidates,approval,props)){
  if(sha(await fs.readFile(next.record.file))!==next.record.sha256)throw Error('Chapter candidate changed after Form approval');
  const index=selected.findIndex(asset=>asset.record.id===next.record.id);if(index>=0)selected[index]=next;else selected.push(next);
 }
}
const output='public/garden-assets';await fs.mkdir(output,{recursive:true});
await fs.mkdir('.cache/garden-assets',{recursive:true});
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const assets=[];
const illustrations=[];
for(const file of ['public/art/sparkfest/cast-original.png','public/art/er13/loop-awake-v1.png']){
 const target=file.replace(/\.png$/,'.lossless.webp'),bytes=await fs.readFile(file);let encoded;
 try{encoded=await fs.readFile(target);}catch{encoded=await losslessWebp(decodePng(bytes));await fs.writeFile(target,encoded);}
 illustrations.push({source:file,sourceSha256:sha(bytes),runtime:target,sha256:sha(encoded),bytes:encoded.length,method:'Lossless WebP; original dimensions and RGBA pixels retained'});
}
await fs.writeFile(evidence+'/opening-illustrations.json',JSON.stringify(illustrations,null,2)+'\n');
for(const choice of selected){
 const {record}=choice;
 if(record.status!=='APPROVED')throw Error('Unapproved asset: '+record.id);
 const bytes=await fs.readFile(record.file);if(sha(bytes)!==record.sha256)throw Error('Approval hash mismatch: '+record.id);
 const target=output+'/'+record.id+'.glb',receiptFile='.cache/garden-assets/'+record.id+'-receipt.json';
 let receipt;try{receipt=JSON.parse(await fs.readFile(receiptFile,'utf8'));if(receipt.sourceSha256!==record.sha256||sha(await fs.readFile(target))!==receipt.sha256)receipt=null;}catch{receipt=null;}
 if(!receipt){
  const encoded='.cache/garden-assets/'+record.id+'-'+record.sha256.slice(0,12)+'-ktx.glb';
  // Reuse only a receipt-bound preexisting compression of this same source.
  if(choice.anatomySha256===record.sha256)try{const prior=JSON.parse(await fs.readFile(receiptFile,'utf8'));if(prior.sourceSha256===record.sha256)await fs.copyFile('.cache/garden-assets/'+record.id+'-ktx.glb',encoded);}catch{}
  try{await fs.access(encoded);}catch{const result=spawnSync(process.execPath,['node_modules/@gltf-transform/cli/bin/cli.js','etc1s',record.file,encoded,'--quality','255','--compression','5'],{stdio:'inherit',env:{...process.env,PATH:path.resolve('.tools/ktx-4.4.2/bin')+path.delimiter+process.env.PATH}});if(result.status!==0)throw Error('Texture compression failed: '+record.id);}
  const document=await io.read(encoded);
  document.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
  // No reorder, simplification, weld, quantization or animation resampling.
  await io.write(target,document);
  const original=await io.read(record.file),decoded=await io.read(target);
  const before=original.getRoot().listAccessors(),after=decoded.getRoot().listAccessors();
  if(before.length!==after.length)throw Error('Accessor count changed');
  const indices=new Set([original,decoded].flatMap(d=>d.getRoot().listMeshes().flatMap(m=>m.listPrimitives().map(p=>p.getIndices()))));
  const accessorKey=a=>{const values=Array.from(a.getArray());if(indices.has(a))for(let i=0;i<values.length;i+=3){const t=values.slice(i,i+3),j=t.indexOf(Math.min(...t));values.splice(i,3,t[j],t[(j+1)%3],t[(j+2)%3]);}return [a.getType(),a.getCount(),a.getNormalized(),sha(JSON.stringify(values))].join(':');};
  // glTF Transform may reorder accessor declarations while keeping their references.
  const matches=JSON.stringify(before.map(accessorKey).sort())===JSON.stringify(after.map(accessorKey).sort());
  if(!matches){await fs.writeFile(evidence+'/'+record.id+'-accessor-diff.json',JSON.stringify({before:before.map(a=>({name:a.getName(),key:accessorKey(a),sample:Array.from(a.getArray()).slice(0,12)})),after:after.map(a=>({name:a.getName(),key:accessorKey(a),sample:Array.from(a.getArray()).slice(0,12)}))},null,2));throw Error('Source geometry, skin or animation data changed');}
  const textures=decoded.getRoot().listTextures().map(texture=>({name:texture.getName(),size:texture.getSize(),mimeType:texture.getMimeType(),encodedBytes:texture.getImage().length}));
  if(textures.some(t=>t.size[0]!==2048||t.size[1]!==2048||t.mimeType!=='image/ktx2'))throw Error('Source texture resolution not preserved');
  const resultBytes=await fs.readFile(target);receipt={id:record.id,sourceSha256:record.sha256,sha256:sha(resultBytes),bytes:resultBytes.length,attributesAndAnimationsUnchanged:matches,triangleTopologyAndWindingUnchanged:matches,indexEncoding:'Meshopt permits cyclic rotation within each triangle; no triangle order or winding changes',textures,encoding:'Meshopt lossless attributes; ETC1S quality 255 compression 5; 2048px with mipmaps',source:record.file};
  await fs.writeFile(receiptFile,JSON.stringify(receipt,null,2)+'\n');
 }
 const runtimeFile=record.id+'-'+receipt.sha256.slice(0,12)+'.glb';await fs.copyFile(target,output+'/'+runtimeFile);
 assets.push({...choice.visual,...(record.id==='pip'?{attachments:{backpack:{joint:'backpack',point:[.065,.51,-.305]}}}:{}),uri:'/garden-assets/'+runtimeFile,sha256:receipt.sha256,approval:'approved',sourceSha256:record.sha256,anatomySha256:choice.anatomySha256,approvalRecord:choice.approvalRecord,location:record.id==='pip'?'resident':record.id==='seed-boat'?'river':'garden',resources:receipt});
}
const manifest={schema:'evidence-quest.runtime-assets.v1',assets};
await fs.writeFile(output+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');
await fs.writeFile(evidence+'/runtime-assets.json',JSON.stringify(manifest,null,2)+'\n');
await fs.mkdir(output+'/basis',{recursive:true});
for(const file of ['basis_transcoder.js','basis_transcoder.wasm'])await fs.copyFile('node_modules/three/examples/jsm/libs/basis/'+file,output+'/basis/'+file);
// Same official worker body as KTX2Loader.init, written at build time so its
// Emscripten bindings can have their own worker-only CSP. No page eval permission.
const worker=KTX2Loader.BasisWorker.toString();
await fs.writeFile(output+'/basis/texture-worker.js',[
 '// Generated from the pinned Three.js Basis worker and transcoder.',
 ...['EngineFormat','EngineType','TranscoderFormat','BasisFormat'].map(key=>'let _'+key+' = '+JSON.stringify(KTX2Loader[key])+';'),
 await fs.readFile(output+'/basis/basis_transcoder.js','utf8'),
 worker.slice(worker.indexOf('{')+1,worker.lastIndexOf('}')),
].join('\n'));
await fs.writeFile('src/garden/assets/runtimeManifest.ts','// Generated from hash-bound human approval.\nimport type {VisualAssetDefinition} from \'./visualAsset.js\';\nexport const runtimeAssets: {pip:VisualAssetDefinition;grandma:VisualAssetDefinition;boat?:VisualAssetDefinition;flower?:VisualAssetDefinition} = '+JSON.stringify(Object.fromEntries(assets.map(a=>[a.id==='seed-boat'?'boat':a.id==='lantern-flower'?'flower':a.id,a])),null,2)+';\n');
await fs.writeFile('src/garden/assets/runtimeFinish.ts',"// Generated: unapproved local finish remains confined to review.\nimport type {PaperArt} from '../art.js';\n"+(finishApproved?"import {makePaintedVillageKit} from './paintedKit.js';\nexport const makeApprovedFinish=(art:PaperArt)=>makePaintedVillageKit(art);\n":"import type {makePaintedVillageKit} from './paintedKit.js';\nexport const makeApprovedFinish=(_art:PaperArt):ReturnType<typeof makePaintedVillageKit>|null=>null;\n"));
console.log(JSON.stringify(assets.map(a=>({id:a.id,bytes:a.resources.bytes,sha256:a.sha256}))));
