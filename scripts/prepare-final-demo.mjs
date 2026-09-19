/** Local review derivatives only. Original provider bytes are never written. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression} from '@gltf-transform/extensions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
import {spawn} from 'node:child_process';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {supplied,sourceDirectory} from './final-demo-selection.mjs';
const root='evidence/final-demo-20260918',output='.cache/final-demo-review/assets';
const sha=b=>createHash('sha256').update(b).digest('hex');
const json=p=>fs.readFile(p,'utf8').then(JSON.parse);
const inventory=await json(root+'/inventory.json');
await fs.mkdir(output,{recursive:true});
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const assets={},bindings=[];
const compressed=process.argv.includes('--compress');
async function derivative(id,source){
 const bytes=await fs.readFile(source),sourceHash=sha(bytes),stem=id+'-'+sourceHash.slice(0,12);
 const target=output+'/'+stem+(compressed?'-ktx':'-source')+'.glb';
 let receipt;
 try{receipt=await json(target+'.receipt.json');if(receipt.sourceSha256!==sourceHash||sha(await fs.readFile(target))!==receipt.sha256)receipt=null;}catch{}
 if(!receipt){
  if(compressed){
   const textureFile=output+'/'+stem+'-texture.glb';
   try{await fs.access(textureFile);}catch{
    await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['node_modules/@gltf-transform/cli/bin/cli.js','etc1s',source,textureFile,'--quality','255','--compression','5'],{windowsHide:true,env:{...process.env,PATH:path.resolve('.tools/ktx-4.4.2/bin')+path.delimiter+process.env.PATH},stdio:['ignore','ignore','pipe']});let error='';child.stderr.on('data',b=>error+=b);child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(id+': '+error)));});
   }
   const document=await io.read(textureFile);
   document.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
   await io.write(target,document);
   const before=await io.read(source),after=await io.read(target);
   const signature=d=>{const indices=new Set(d.getRoot().listMeshes().flatMap(m=>m.listPrimitives().map(p=>p.getIndices())));return d.getRoot().listAccessors().map(a=>{let values=a.getArray();if(indices.has(a)){values=values.slice();for(let i=0;i<values.length;i+=3){const triangle=[values[i],values[i+1],values[i+2]],first=triangle.indexOf(Math.min(...triangle));for(let j=0;j<3;j++)values[i+j]=triangle[(first+j)%3];}}return [a.getType(),a.getCount(),a.getNormalized(),sha(Buffer.from(values.buffer,values.byteOffset,values.byteLength))].join(':');}).sort();};
   if(JSON.stringify(signature(before))!==JSON.stringify(signature(after)))throw Error('Accessor preservation failed: '+id);
   const textureSizes=d=>d.getRoot().listTextures().map(t=>t.getSize().join('x')).sort();
   if(JSON.stringify(textureSizes(before))!==JSON.stringify(textureSizes(after)))throw Error('Texture resolution changed: '+id);
  }else await fs.writeFile(target,bytes);
  const result=await fs.readFile(target);receipt={source,sourceSha256:sourceHash,sha256:sha(result),bytes:result.length,encoding:compressed?'Meshopt lossless accessors; ETC1S 255/5; source texture dimensions retained':'Unmodified source copy',accessorsPreserved:true,visualCompressionReview:compressed?'PENDING':'SOURCE',approval:'PENDING_FORM_REVIEW'};
  await fs.writeFile(target+'.receipt.json',JSON.stringify(receipt,null,2)+'\n');
 }
 console.log(id+': '+receipt.bytes+' bytes '+receipt.encoding);
 return {id,uri:'/review-assets/'+path.basename(target),sha256:receipt.sha256,sourceSha256:sourceHash,approval:'review',resources:receipt};
}
for(const id of ['pip','grandma','mara','rina','sol','boy','operator','passenger','jo']){
 const base=id==='pip'?'evidence/hands-on-20260916/pilot/pip-tripo-restart-20260917':`evidence/hands-on-20260916/pilot/village-p2-20260917/${id}`;
 const manifest=id==='jo'?null:await json(base+'/manifest.json');
 const source=id==='jo'?sourceDirectory+'/cartoon+girl+3d+model.glb':base+'/'+manifest.stages.find(s=>s.operation==='animate').uri;
 const visual=await derivative(id,source),gltf=await loadPilotGeometry(source),box=new T.Box3().setFromObject(gltf.scene),height=manifest?.height??(id==='pip'?1.05:1.17),scale=height/(box.max.y-box.min.y);
 let sidecar;try{sidecar=await json(base+'/custom-actions.json');}catch(error){if(error.code!=='ENOENT')throw error;}
 const clips=[...(sidecar?.clips??[])];
 for(const stage of manifest?.stages??[])if(stage.operation==='story'){
  const file=base+'/'+stage.uri,story=await loadPilotGeometry(file);clips.push(...story.animations.map(c=>T.AnimationClip.toJSON(c)));
 }
 try{const corrected=await json(root+'/actions/'+id+'.json');if(corrected.sourceModelSha256!==visual.sourceSha256)throw Error('Corrected clip binding differs');clips.push(...corrected.clips);}catch(error){if(error.code!=='ENOENT')throw error;}
 // Constant custom channels retain their exact sampled value and interpolation.
 // Native locomotion inside the supplied GLB is not touched.
 for(const clip of clips)for(const track of clip.tracks){const width=track.values.length/track.times.length;if(track.times.length>2&&track.values.every((v,i)=>v===track.values[i%width])){track.times=[track.times[0],track.times.at(-1)];track.values=[...track.values.slice(0,width),...track.values.slice(0,width)];}}
 const animations=[];
 if(clips.length){const data=Buffer.from(JSON.stringify({sourceModelSha256:visual.sourceSha256,clips})),hash=sha(data),file=id+'-actions-'+hash.slice(0,12)+'.json';await fs.writeFile(output+'/'+file,data);animations.push({uri:'/review-assets/'+file,sha256:hash,sourceModelSha256:visual.sourceSha256});}
 const native=gltf.animations.map(c=>c.name),idle=native.find(n=>n.includes('idle'))??native.find(n=>n.includes('fold_arms'))??native[0],walk=native.find(n=>n.includes('walk')||n.includes('swagger'));
 if(!walk)throw Error('Native locomotion missing: '+id);
 const carry=clips.findLast(c=>c.name.endsWith('carry-walk'))?.name??walk,carryIdle=clips.findLast(c=>c.name.endsWith(':carry'))?.name??idle;
 const rootBone=gltf.scene.getObjectByName('Root'),hand=gltf.scene.getObjectByName('R_Hand');
 if(!rootBone||!hand)throw Error('Expected supplied skeleton missing: '+id);
 const jointNames={root:'Root',rightHand:'R_Hand',leftHand:'L_Hand'};
 const actions=Object.fromEntries(clips.map(c=>[c.name.split(':').at(-1),{clip:c.name}]));
 assets[id]={...visual,location:id==='pip'?'resident':id==='jo'?'studio':id==='rina'?'bakery':id==='sol'?'workshop':id==='grandma'?'garden':'dock',normalization:{scale:[scale,scale,scale],rotation:[0,-Math.PI/2,0],offset:[-(box.min.x+box.max.x)/2,-box.min.y,-(box.min.z+box.max.z)/2]},animations,rig:{joints:jointNames,clips:{idle,walk,carryIdle,carryWalk:carry},walkCycleDistance:height*.7,actions},attachments:{hand:{joint:'R_Hand',point:sidecar?.handAttachments?.right?.offset??[0,.025,0],space:'bone'},leftHand:{joint:'L_Hand',point:sidecar?.handAttachments?.left?.offset??[0,.025,0],space:'bone'},backpack:{joint:'Spine',point:[-.1,0,0],space:'bone'}}};
 // Attachment names follow the supplied rig; use its actual spine rather than inventing one.
 if(!gltf.scene.getObjectByName('Spine'))delete assets[id].attachments.backpack;
 if(gltf.scene.getObjectByName('Spine02'))assets[id].attachments.backpack={joint:'Spine02',point:[-.18/scale,0,0],space:'bone'};
 bindings.push({id,source,sourceSha256:visual.sourceSha256,reference:manifest?.reference??{id:'jo'},nativeClips:native,reviewStatus:'PENDING_FORM_AND_MOVEMENT'});
}
for(const [id,name,location,span]of supplied){
 const original=inventory.files.find(f=>f.name===name);if(!original)throw Error('Source missing: '+name);
 const group=inventory.groups.find(g=>g.semanticSha256===original.semanticSha256),source=group.selected;
 const visual=await derivative(id,source),gltf=await loadPilotGeometry(source),box=new T.Box3().setFromObject(gltf.scene),size=box.getSize(new T.Vector3()),scale=span/Math.max(...size.toArray());
 assets[id]={...visual,location,normalization:{scale:[scale,scale,scale],rotation:[0,0,0],offset:[-(box.min.x+box.max.x)/2,-box.min.y,-(box.min.z+box.max.z)/2]},anchors:{base:[0,0,0]},components:{sourceMeshes:original.meshCount,sourceNodes:original.nodeCount,assembly:'Preserved; separate supplied components use independent leases'}};
 bindings.push({id,source,sourceSha256:visual.sourceSha256,location,span,triangles:original.triangles,state:id,reviewStatus:'PENDING_FORM_REVIEW'});
}
const data={schema:'eq.final-demo.review-assets.v1',profile:'local-review',approval:'PENDING',compressed,assets,bindings};
await fs.writeFile(root+'/review-assets.json',JSON.stringify(data,null,2)+'\n');
await fs.writeFile(output+'/manifest.json',JSON.stringify(data,null,2)+'\n');
await fs.writeFile('src/garden/assets/reviewManifest.ts',"// Generated local review only. This does not grant production approval.\nimport type {VisualAssetDefinition} from './visualAsset.js';\nexport const reviewAssets:Record<string,VisualAssetDefinition>="+JSON.stringify(assets,null,2)+';\n');
await import('./final-demo-metadata.mjs');
// Approved working copies remain separate from the original inventory.
if(await fs.access('output/screenshot-repairs-20260918/workshop/provenance.json').then(()=>true,()=>false))await import('./prepare-screenshot-repair-assets.mjs');
if(await fs.access('output/screenshot-repairs-20260918/platform-bridge/provenance.json').then(()=>true,()=>false))await import('./package-platform-bridge.mjs');
else if(await fs.access('output/screenshot-repairs-20260918/bridge/provenance.json').then(()=>true,()=>false))await import('./prepare-fitted-bridge.mjs');
