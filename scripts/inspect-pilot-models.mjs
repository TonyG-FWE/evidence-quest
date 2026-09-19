import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const root=path.resolve('evidence/hands-on-20260916');
const props=JSON.parse(await fs.readFile(path.join(root,'props.json'),'utf8'));
const ledger=JSON.parse(await fs.readFile(path.join(root,'tripo-ledger.json'),'utf8'));
const assets=[];
for(const asset of props.assets){
 const jobs=ledger.jobs.filter(job=>job.assetId===asset.id&&job.status==='SUCCESS');
 const base=jobs.find(job=>job.operation==='make');if(!base)continue;
 const files=[];let visual;
 const candidates=[...jobs];
 const intakeFile=path.join(root,'pilot/review-sources',asset.id,'intake.json');
 let intake;
 try { intake=JSON.parse(await fs.readFile(intakeFile,'utf8')); } catch(error) { if(error.code!=='ENOENT')throw error; }
 if(intake){
  const reviewFile=path.join(root,intake.reviewGlb);
  if(createHash('sha256').update(await fs.readFile(reviewFile)).digest('hex')!==intake.reviewSha256)throw new Error('Review source hash mismatch');
  if(createHash('sha256').update(await fs.readFile(path.join(root,intake.source))).digest('hex')!==intake.sourceSha256)throw new Error('Original source hash mismatch');
  candidates.push({operation:'local-review',taskId:null,result:{model_file:reviewFile}});
 }
 for(const job of candidates){
  const file=job.result?.model_file;if(!file)continue;
  const bytes=await fs.readFile(file),jsonLength=bytes.readUInt32LE(12),json=JSON.parse(bytes.toString('utf8',20,20+jsonLength));
  const imageInfo=(json.images??[]).map(image=>({mimeType:image.mimeType,bytes:json.bufferViews[image.bufferView]?.byteLength}));
  // Geometry-only in-memory load for measurement; the original GLB is never edited.
  const geometryJson=structuredClone(json);delete geometryJson.images;delete geometryJson.textures;
  geometryJson.materials=(json.materials??[]).map(material=>({name:material.name}));
  const jsonBytes=Buffer.from(JSON.stringify(geometryJson)),padding=(4-jsonBytes.length%4)%4,padded=Buffer.concat([jsonBytes,Buffer.alloc(padding,32)]);
  const tail=bytes.subarray(20+jsonLength),buffer=Buffer.alloc(20+padded.length+tail.length);bytes.copy(buffer,0,0,12);buffer.writeUInt32LE(buffer.length,8);buffer.writeUInt32LE(padded.length,12);buffer.writeUInt32LE(0x4e4f534a,16);padded.copy(buffer,20);tail.copy(buffer,20+padded.length);
  const loaded=await new GLTFLoader().parseAsync(buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength),'');
  loaded.scene.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(loaded.scene),size=bounds.getSize(new T.Vector3());
  if(job.operation==='local-review'){
   loaded.scene.traverse(object=>{if(object.isSkinnedMesh)object.skeleton.update();});
   const definition={id:asset.id,uri:'/'+path.relative(root,file).replaceAll('\\','/'),sha256:createHash('sha256').update(bytes).digest('hex'),approval:'review'};
   if(asset.id==='pip'||asset.id==='grandma'){
    const isPip=asset.id==='pip',sample=new T.Vector3(isPip?-.280:.326,isPip?.417:.570,2);
    const hit=new T.Raycaster(sample,new T.Vector3(0,0,-1)).intersectObject(loaded.scene,true)[0];
    if(!hit||hit.point.z<-.1)throw new Error('Palm surface sample missed: '+asset.id);
    definition.hand={shoulder:isPip?'tripoSpine_1':'tripo1_Right_Limb_0',wrist:isPip?'bone_9':'tripo1_Right_Limb_2',palm:hit.point.toArray(),normal:[0,0,1],carryDirection:[isPip?-.35:.35,-.18,1]};
   }
   if(asset.id==='seed-boat'){
    const hit=new T.Raycaster(new T.Vector3(0,2,0),new T.Vector3(0,-1,0)).intersectObject(loaded.scene,true)[0];
    if(!hit||hit.point.y>size.y*.6)throw new Error('Cradle floor sample missed');
    definition.anchors={'seed-cradle':hit.point.toArray()};
   }
   if(asset.id==='lantern-flower')definition.anchors={'root-base':[0,0,0]};
   visual=definition;
  }
  let triangles=0,vertices=0,meshes=0,skinnedMeshes=0,missingNormals=0,missingUvs=0;const bones=[],boneDetails=[];
  loaded.scene.traverse(object=>{if(object.isBone){bones.push(object.name);boneDetails.push({name:object.name,parent:object.parent?.name,position:object.getWorldPosition(new T.Vector3()).toArray(),children:object.children.filter(child=>child.isBone).map(child=>child.name)});}if(!object.isMesh)return;meshes++;if(object.isSkinnedMesh)skinnedMeshes++;vertices+=object.geometry.getAttribute('position').count;triangles+=(object.geometry.index?.count??object.geometry.getAttribute('position').count)/3;if(!object.geometry.getAttribute('normal'))missingNormals++;if(!object.geometry.getAttribute('uv'))missingUvs++;});
  files.push({operation:job.operation,taskId:job.taskId,path:path.relative(root,file).replaceAll('\\','/'),sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,triangles,vertices,meshes,skinnedMeshes,materials:json.materials?.length??0,images:imageInfo,missingNormals,missingUvs,bounds:{min:bounds.min.toArray(),max:bounds.max.toArray(),size:size.toArray()},bones,boneDetails,animations:loaded.animations.map(clip=>({name:clip.name,duration:clip.duration,tracks:clip.tracks.length})),rawAnimationFiles:json.animations?.length??0});
  loaded.scene.traverse(object=>{if(object.isMesh){object.geometry.dispose();if(Array.isArray(object.material))object.material.forEach(material=>material.dispose());else object.material.dispose();}});
 }
 const primary=files.find(file=>file.operation==='local-review')??files.find(file=>file.operation==='animate')??files.find(file=>file.operation==='rig')??files.find(file=>file.operation==='make');
 assets.push({id:asset.id,title:asset.title,description:asset.description,dimensions:asset.dimensionsMeters,targetPolycount:asset.targetPolycount,model:primary?.path,yawRadians:primary?.operation==='local-review'?0:-Math.PI/2,visual,intake,baseModel:files.find(file=>file.operation==='make')?.path,preview:path.relative(root,base.result.preview).replaceAll('\\','/'),reference:asset.image.source,credits:jobs.reduce((sum,job)=>sum+job.actualCredits,0),files,reviewStatus:'PENDING_HUMAN_FORM_REVIEW'});
}
const manifest={schema:'evidence-quest.pilot-review.v1',updatedAt:new Date().toISOString(),actualCredits:ledger.actualCharged,reservedCredits:ledger.reservedForUnresolved,pilotCeiling:400,totalCeiling:2500,assets,limitations:['Source-candidate viewer, not production export or runtime qualification.','Local authoring intake corrects rigs and normalizes scale; production tiers remain gated by human Form approval.']};
await fs.writeFile(path.join(root,'pilot/review-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({assets:assets.map(asset=>({id:asset.id,files:asset.files.map(file=>({operation:file.operation,triangles:file.triangles,bytes:file.bytes,bones:file.bones.length,animations:file.animations}))})),actualCredits:ledger.actualCharged},null,2));
