import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry,readGlb} from './pilot-glb.mjs';
const dir='evidence/hands-on-20260916/pilot/articulated-library-20260917';
const ids=process.argv.slice(2).length?process.argv.slice(2):['pip','jo'];
const report={schema:'eq.articulated-geometry-audit.v1',at:new Date().toISOString(),scope:'Technical geometry, source preservation and animated anatomy screening. Not human Form or movement acceptance.',assets:[],errors:[]};
const digest=b=>createHash('sha256').update(b).digest('hex');
const worldPoint=(mesh,index)=>mesh.applyBoneTransform(index,new T.Vector3().fromBufferAttribute(mesh.geometry.attributes.position,index)).applyMatrix4(mesh.matrixWorld);
for(const id of ids){
 const folder=path.join(dir,'models',id),meta=JSON.parse(await fs.readFile(path.join(folder,'model.json'))),file=path.join(folder,meta.file),gltf=await loadPilotGeometry(file);
 const {json,bin}=await readGlb(file),source=await readGlb(meta.source);const errors=[];
 if(digest(source.bytes)!==meta.sourceSha256)errors.push('Original source changed');
 if(meta.productionExport||meta.formApproval!=='PENDING')errors.push('Unapproved model escaped review status');
 for(let i=0;i<source.json.images.length;i++){
  const read=(j,b,im)=>{const v=j.bufferViews[im.bufferView];return b.subarray(v.byteOffset??0,(v.byteOffset??0)+v.byteLength);};
  if(!json.images?.[i]||digest(read(json,bin,json.images[i]))!==digest(read(source.json,source.bin,source.json.images[i])))errors.push('Original PBR image buffer '+i+' was not preserved');
 }
 const root=gltf.scene,meshes=[];root.updateMatrixWorld(true);root.traverse(o=>{if(o.isSkinnedMesh)meshes.push(o);});
 const body=meshes.find(m=>m.name.includes('painted_body'));if(!body)throw Error('Body mesh missing '+id);
 const rest=new Map(),edges=new Map();let badWeights=0;const influence=new Set();
 for(const mesh of meshes){
  const p=mesh.geometry.attributes.position,j=mesh.geometry.attributes.skinIndex,w=mesh.geometry.attributes.skinWeight;
  const positions=[];for(let i=0;i<p.count;i++){
   positions.push(worldPoint(mesh,i));let total=0;for(let k=0;k<4;k++){const weight=w.array[i*4+k];total+=weight;if(weight>0)influence.add(mesh.skeleton.bones[j.array[i*4+k]].name);}if(Math.abs(total-1)>1e-4)badWeights++;
  }
  rest.set(mesh,positions);const set=new Map(),idx=mesh.geometry.index;
  for(let i=0;i<(idx?.count??p.count);i+=3){const a=idx?[idx.getX(i),idx.getX(i+1),idx.getX(i+2)]:[i,i+1,i+2];for(const [u,v] of [[a[0],a[1]],[a[1],a[2]],[a[2],a[0]]]){const length=positions[u].distanceTo(positions[v]);if(length>.009)set.set([Math.min(u,v),Math.max(u,v)].join(':'),{u,v,length});}}
  edges.set(mesh,[...set.values()]);
 }
 if(badWeights)errors.push(badWeights+' unnormalized weights');
 for(const side of ['L','R'])for(const digit of ['thumb','index','middle','ring','little'])for(const name of meta.hands[side].digits[digit].joints){if(!root.getObjectByName(name)||!influence.has(name))errors.push('Missing functional weighted joint '+name);}
 for(const [side,fit] of Object.entries(meta.footAlignment??{}))if(Math.abs(fit.afterDegrees)>1)errors.push(side+' shoe does not face forward');
 const soles={};for(const side of ['L','R'])soles[side]=rest.get(body).flatMap((p,i)=>p.y<.020&&p.x*(side==='L'?1:-1)>0?[i]:[]);
 const contactTargets=JSON.parse(await fs.readFile(path.join(folder,'contact-targets.json')));
 const mixer=new T.AnimationMixer(root),point=name=>root.getObjectByName(name).getWorldPosition(new T.Vector3());let worstEdge={ratio:0},worstFoot={error:0},worstLength={error:0};const wrists={L:[],R:[]};
 for(const mode of Object.keys(meta.clips)){
  const definition=meta.clips[mode],clip=gltf.animations.find(c=>c.name===definition.name);if(!clip){errors.push('Missing clip '+mode);continue;}
  mixer.stopAllAction();mixer.clipAction(clip).reset().play();
  for(let sample=0;sample<24;sample++){
   const time=clip.duration*sample/24;mixer.setTime(time);root.updateMatrixWorld(true);
   for(const side of ['L','R']){
    if(mode==='walk')wrists[side].push(point('hand_'+side).z);
    for(const [a,b] of [['upper_arm_','forearm_'],['forearm_','hand_'],['thigh_','shin_'],['shin_','foot_']]){
     const expected=new T.Vector3(...meta.bones[a+side].head).distanceTo(new T.Vector3(...meta.bones[b+side].head));const actual=point(a+side).distanceTo(point(b+side));const error=Math.abs(actual-expected);if(error>worstLength.error)worstLength={error,mode,time,side,joints:[a,b]};
    }
    const target=contactTargets[mode][Math.min(contactTargets[mode].length-1,Math.round(time*30))].feet[side];
    if(target.stance){const ground=Math.min(...soles[side].map(i=>worldPoint(body,i).y));const error=Math.abs(ground);if(error>worstFoot.error)worstFoot={error,ground,mode,time,side};}
   }
   for(const mesh of meshes){const posed=rest.get(mesh).map((p,i)=>worldPoint(mesh,i));for(const edge of edges.get(mesh)){const ratio=posed[edge.u].distanceTo(posed[edge.v])/edge.length;if(ratio>worstEdge.ratio)worstEdge={ratio,mesh:mesh.name,mode,time,vertices:[edge.u,edge.v],restLength:edge.length};}}
  }
 }
 if(worstLength.error>.001)errors.push('Limb length instability '+worstLength.error.toFixed(5)+'m');
 if(worstFoot.error>.003)errors.push('Supporting sole deviates '+worstFoot.error.toFixed(5)+'m');
 if(worstEdge.ratio>2.0)errors.push('Surface stretches '+worstEdge.ratio.toFixed(2)+'x');
 for(const side of ['L','R'])if(Math.max(...wrists[side])-Math.min(...wrists[side])<.03)errors.push(side+' arm lacks independent walking swing');
 const result={id,modelSha256:digest(await fs.readFile(file)),bones:Object.keys(meta.bones).length,clips:gltf.animations.length,badWeights,worstEdge,worstFoot,worstLength,result:errors.length?'FAIL':'PASS',errors};report.assets.push(result);report.errors.push(...errors.map(e=>id+': '+e));mixer.stopAllAction();mixer.uncacheRoot(root);
}
report.result=report.errors.length?'FAIL':'PASS';await fs.mkdir(path.join(dir,'verification'),{recursive:true});const stamp=report.at.replaceAll(':','-');await fs.writeFile(path.join(dir,'verification','anatomy-'+stamp+'.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;
