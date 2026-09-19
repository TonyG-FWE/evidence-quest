// Read-only inspection. This writes evidence, never a model or animation.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
const dir=path.resolve('evidence/hands-on-20260916/pilot/pip-tripo-restart-20260917');
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const hash=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
const m=await read(path.join(dir,'manifest.json')),ledger=await read(path.resolve('evidence/hands-on-20260916/tripo-ledger.json'));
const jobs=ledger.jobs.filter(j=>j.revision==='pip-tripo-p2-20260917');
assert.equal(jobs.length,4);assert(jobs.every(j=>j.status==='SUCCESS'));
assert.equal(jobs.reduce((s,j)=>s+j.actualCredits,0),155);assert.equal(ledger.actualCharged,895);assert.equal(ledger.reservedForUnresolved,0);
assert.equal(await hash(path.resolve(dir,m.reference.uri)),m.reference.sha256);
assert.equal(m.stages.length,3);const images=m.stages[0].images.map(i=>i.sha256).sort();
for(const s of m.stages){assert.equal(await hash(path.join(dir,s.uri)),s.sha256);assert.deepEqual(s.images.map(i=>i.sha256).sort(),images);assert.equal(s.triangles,5291);}
assert.equal(await hash(path.resolve('evidence/hands-on-20260916/pilot/articulated-library-20260917/models/pip/pip-review.glb')),'f260c2e24f7ab4d980ac81157c5137158108be09dc449ccf6dfaaeb6baa4d5b4');
const animated=m.stages.find(s=>s.operation==='animate'),g=await loadPilotGeometry(path.join(dir,animated.uri)),mixer=new T.AnimationMixer(g.scene);
const bones=g.scene.getObjectsByProperty('isBone',true),find=n=>g.scene.getObjectByName(n),samples=128;
const results=[];
for(const clip of g.animations){
 mixer.stopAllAction();mixer.clipAction(clip).play();
 const motion=Object.fromEntries(['L_Upperarm','R_Upperarm','L_Foot','R_Foot'].map(n=>[n,[]]));let floorMin=Infinity,floorMax=-Infinity;
 for(let i=0;i<samples;i++){
  mixer.setTime(clip.duration*i/samples);g.scene.updateMatrixWorld(true);
  for(const bone of bones)assert(bone.matrixWorld.elements.every(Number.isFinite));
  for(const name of Object.keys(motion)){const bone=find(name);assert(bone);motion[name].push({position:bone.getWorldPosition(new T.Vector3()).toArray(),quaternion:bone.getWorldQuaternion(new T.Quaternion()).toArray()});}
  g.scene.traverse(o=>{if(o.isSkinnedMesh)o.computeBoundingBox();});const box=new T.Box3().setFromObject(g.scene);assert([...box.min.toArray(),...box.max.toArray()].every(Number.isFinite));floorMin=Math.min(floorMin,box.min.y);floorMax=Math.max(floorMax,box.min.y);
 }
 const metrics=Object.fromEntries(Object.entries(motion).map(([name,poses])=>{const q0=new T.Quaternion().fromArray(poses[0].quaternion);return [name,{maxRotationFromFirstRad:Math.max(...poses.map(p=>q0.angleTo(new T.Quaternion().fromArray(p.quaternion)))),positionRange:[0,1,2].map(axis=>Math.max(...poses.map(p=>p.position[axis]))-Math.min(...poses.map(p=>p.position[axis])))}];}));
 if(/walk/.test(clip.name)){assert(metrics.L_Upperarm.maxRotationFromFirstRad>.05);assert(metrics.R_Upperarm.maxRotationFromFirstRad>.05);assert(metrics.L_Foot.positionRange.some(v=>v>.03));assert(metrics.R_Foot.positionRange.some(v=>v>.03));}
 results.push({name:clip.name,duration:clip.duration,samples,finiteTransforms:true,metrics,nativeLowestSurfaceYRange:[floorMin,floorMax],note:'Native animation origin is preserved. The viewer uses one constant display-ground offset per clip; this does not correct sliding or individual foot contact.'});
}
assert.deepEqual(g.animations.map(c=>c.name),['preset:biped:idle','preset:biped:walk']);
const output={at:new Date().toISOString(),status:'PASS',scope:'Provider file integrity, texture identity, finite clip playback and both-arm/both-foot motion only',referenceHashPreserved:true,rejectedCandidateHashPreserved:true,providerGlbHashesVerified:true,textureBytesIdenticalAcrossStages:true,triangles:5291,joints:animated.joints.length,independentFingerAndThumbJoints:0,clips:results,charges:{attempt:155,total:895,balance:1605,frozen:0},humanFormApproval:'PENDING',visualMovementApproval:'PENDING',limitations:['No independently articulated fingers or thumbs in the provider rig','No carrying, handoff or scene-specific action clips requested or fabricated','Numerical motion checks do not establish natural movement or visual acceptance'],gameRegression:'NOT_RUN: review-only Tripo assets and viewer; no gameplay changes'};
await fs.writeFile(path.join(dir,'verification','asset-checks.json'),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({status:output.status,joints:output.joints,fingers:0,clips:results.map(c=>({name:c.name,duration:c.duration,leftArm:c.metrics.L_Upperarm.maxRotationFromFirstRad,rightArm:c.metrics.R_Upperarm.maxRotationFromFirstRad})),charges:output.charges}));
