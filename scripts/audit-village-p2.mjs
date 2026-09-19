import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry,readGlb} from './pilot-glb.mjs';
import {REVIEW,CHARACTERS} from './tripo-village-config.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex');
const all=[];
for(const c of CHARACTERS.filter(c=>!process.argv[2]||c.id===process.argv[2])){
 const dir=path.join(REVIEW,c.id),m=JSON.parse(await fs.readFile(path.join(dir,'manifest.json'),'utf8')),results=[];if(!m.stages.length)continue;
 const images=m.stages[0].images.map(i=>i.sha256).sort();
 for(const s of m.stages){assert.equal(sha(await fs.readFile(path.join(dir,s.uri))),s.sha256);assert.deepEqual(s.images.map(i=>i.sha256).sort(),images);}
 const rig=m.stages.find(s=>s.operation==='rig');
 for(const s of m.stages.filter(s=>s.animations.length)){
  assert.deepEqual(s.joints,rig.joints);const g=await loadPilotGeometry(path.join(dir,s.uri)),mixer=new T.AnimationMixer(g.scene),bones=g.scene.getObjectsByProperty('isBone',true);
  for(const clip of g.animations){mixer.stopAllAction();mixer.clipAction(clip).play();const motion=Object.fromEntries(['L_Upperarm','R_Upperarm','L_Foot','R_Foot'].map(n=>[n,[]]));let lo=Infinity,hi=-Infinity;
   for(let i=0;i<128;i++){mixer.setTime(clip.duration*i/128);g.scene.updateMatrixWorld(true);for(const b of bones)assert(b.matrixWorld.elements.every(Number.isFinite));for(const name in motion){const b=g.scene.getObjectByName(name);assert(b);motion[name].push({p:b.getWorldPosition(new T.Vector3()).toArray(),q:b.getWorldQuaternion(new T.Quaternion()).toArray()});}g.scene.traverse(o=>{if(o.isSkinnedMesh)o.computeBoundingBox();});const box=new T.Box3().setFromObject(g.scene);assert([...box.min,...box.max].every(Number.isFinite));lo=Math.min(lo,box.min.y);hi=Math.max(hi,box.min.y);}
   const metrics=Object.fromEntries(Object.entries(motion).map(([n,p])=>[n,{rotation:Math.max(...p.map(v=>new T.Quaternion().fromArray(p[0].q).angleTo(new T.Quaternion().fromArray(v.q)))),range:[0,1,2].map(a=>Math.max(...p.map(v=>v.p[a]))-Math.min(...p.map(v=>v.p[a])))}]));
   if(clip.name==='preset:biped:walk'){assert(metrics.L_Upperarm.rotation>.05&&metrics.R_Upperarm.rotation>.05);assert(metrics.L_Foot.range.some(v=>v>.03)&&metrics.R_Foot.range.some(v=>v>.03));}
   results.push({name:clip.name,duration:clip.duration,samples:128,bothArmsAndFeet:metrics,lowestSurfaceRange:[lo,hi],finite:true});
  }
 }
 const out={assetId:c.id,at:new Date().toISOString(),status:'PASS_BOUNDED_CHECKS',referenceHash:m.reference.sha256,originalFileHashes:true,textureBytesIdenticalAcrossStages:true,jointMappingsIdenticalAcrossTripoStages:true,clips:results,visualApproval:'PENDING',scope:'Finite playback, source and texture integrity, both-arm and both-foot motion. Does not establish natural movement, foot planting or human acceptance.'};await fs.mkdir(path.join(dir,'verification'),{recursive:true});await fs.writeFile(path.join(dir,'verification/native-checks.json'),JSON.stringify(out,null,2)+'\n');all.push({id:c.id,joints:rig?.joints.length,triangles:m.stages[0].triangles,clips:results.map(r=>({name:r.name,duration:r.duration,floorRange:r.lowestSurfaceRange}))});
}
console.log(JSON.stringify(all));
