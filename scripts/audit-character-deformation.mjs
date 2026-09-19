import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
const root='evidence/hands-on-20260916/pilot/revision-r2';
const output=[];
for(const id of ['pip','grandma']){
 const gltf=await loadPilotGeometry(`${root}/${id}/${id}-review.glb`),mesh=gltf.scene.getObjectByProperty('isSkinnedMesh',true),mixer=new T.AnimationMixer(gltf.scene);
 const a=mesh.geometry.attributes,indices=mesh.geometry.index.array,rest=Array.from({length:a.position.count},(_,i)=>new T.Vector3().fromBufferAttribute(a.position,i));
 const weights=i=>{const ix=new T.Vector4().fromBufferAttribute(a.skinIndex,i),w=new T.Vector4().fromBufferAttribute(a.skinWeight,i);return w.toArray().map((n,k)=>[mesh.skeleton.bones[ix.getComponent(k)].name,+n.toFixed(4)]).filter(v=>v[1]>.0001);};
 const edges=new Map();for(let i=0;i<indices.length;i+=3)for(let j=0;j<3;j++){const x=indices[i+j],y=indices[i+(j+1)%3],key=[Math.min(x,y),Math.max(x,y)].join(',');const length=rest[x].distanceTo(rest[y]);if(length>.004)edges.set(key,{x,y,length});}
 const records=[];
 for(const clip of gltf.animations){
  mixer.stopAllAction();mixer.clipAction(clip).play();const worst=[];
  for(let frame=0;frame<40;frame++){
   mixer.setTime(clip.duration*frame/40);gltf.scene.updateMatrixWorld(true);mesh.skeleton.update();
   const posed=rest.map((v,i)=>mesh.applyBoneTransform(i,v.clone()));
   let maximum={extra:0};
   for(const e of edges.values()){const length=posed[e.x].distanceTo(posed[e.y]),extra=length-e.length;if(extra>maximum.extra)maximum={...e,extra,ratio:length/e.length,phase:frame/40};}
   worst.push(maximum);
  }
  worst.sort((a,b)=>b.extra-a.extra);
  records.push({clip:clip.name,worst:worst.slice(0,2).map(e=>({...e,from:rest[e.x].toArray(),to:rest[e.y].toArray(),weightsFrom:weights(e.x),weightsTo:weights(e.y)}))});
 }
 output.push({id,records});
}
console.log(JSON.stringify(output,null,2));
if(process.argv.includes('--save'))await fs.writeFile(root+'/deformation-audit.json',JSON.stringify(output,null,2)+'\n');
