import fs from 'node:fs/promises';
import * as T from 'three';
import sharp from 'sharp';
import {loadPilotGeometry,readGlb} from './pilot-glb.mjs';
const base='evidence/hands-on-20260916/pilot/articulated-library-20260917';
const report=JSON.parse(await fs.readFile(process.argv[2]));
for(const a of report.assets){
 const file=base+'/models/'+a.id+'/'+a.id+'-review.glb',g=await loadPilotGeometry(file);g.scene.updateMatrixWorld(true);
 const mesh=g.scene.getObjectByName(a.worstEdge.mesh),attrs=mesh.geometry.attributes,{json,bin}=await readGlb(file),v=json.bufferViews[json.images[0].bufferView];
 const {data,info}=await sharp(bin.subarray(v.byteOffset,v.byteOffset+v.byteLength)).raw().toBuffer({resolveWithObject:true});
 console.log(a.id,a.worstEdge.ratio,a.worstEdge.mode);
 for(const i of a.worstEdge.vertices){const uv=attrs.uv,idx=(Math.max(0,Math.min(info.height-1,Math.floor(uv.getY(i)*info.height)))*info.width+Math.max(0,Math.min(info.width-1,Math.floor(uv.getX(i)*info.width))))*info.channels;
 console.log(JSON.stringify({vertex:i,position:mesh.applyBoneTransform(i,new T.Vector3().fromBufferAttribute(attrs.position,i)).applyMatrix4(mesh.matrixWorld).toArray(),color:[...data.subarray(idx,idx+3)],weights:Array.from({length:4},(_,k)=>[mesh.skeleton.bones[attrs.skinIndex.array[i*4+k]].name,attrs.skinWeight.array[i*4+k]])}));}
}
