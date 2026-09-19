import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
const source='evidence/hands-on-20260916/pilot/revision-r2/pip/pip-review.glb',candidate='evidence/hands-on-20260916/pilot/chapter-review/pip/pip-chapter-review.glb';
const sourceBytes=await fs.readFile(source),original=await loadPilotGeometry(source),review=await loadPilotGeometry(candidate),originalMesh=original.scene.getObjectByProperty('isSkinnedMesh',true),mesh=review.scene.getObjectByProperty('isSkinnedMesh',true),checks=[];
function check(name,run){run();checks.push({name,status:'PASS'});}
check('Approved R2-feet source hash remains exact',()=>assert.equal(createHash('sha256').update(sourceBytes).digest('hex'),'61006b3597984f6e8ceca9d08a0da39cd1e5ff14b407da439672262224024905'));
function equalArrays(a,b){assert.deepEqual([...a],[...b]);}
check('Candidate preserves every geometry attribute, skin weight and triangle index',()=>{assert.deepEqual(Object.keys(mesh.geometry.attributes),Object.keys(originalMesh.geometry.attributes));for(const name of Object.keys(originalMesh.geometry.attributes))equalArrays(mesh.geometry.attributes[name].array,originalMesh.geometry.attributes[name].array);equalArrays(mesh.geometry.index.array,originalMesh.geometry.index.array);});
check('All four approved clips preserve exact tracks, keys and duration',()=>{assert.equal(original.animations.length,4);for(const clip of original.animations){const next=review.animations.find(c=>c.name===clip.name);assert(next);assert.equal(next.duration,clip.duration);assert.equal(next.tracks.length,clip.tracks.length);for(const track of clip.tracks){const found=next.tracks.find(t=>t.name===track.name);assert(found);equalArrays(found.times,track.times);equalArrays(found.values,track.values);}}});
const a=mesh.geometry.attributes,soles={L:[],R:[]};for(let i=0;i<a.position.count;i++)if(a.position.getY(i)<.006)soles[a.position.getX(i)<0?'R':'L'].push(i);
for(const name of ['pip_post_place','pip_rope_tie'])check(name+': independent arms, forward knees, fixed limb lengths and grounded soles for the complete cycle',()=>{
 const mixer=new T.AnimationMixer(review.scene),clip=review.animations.find(c=>c.name===name);assert(clip);mixer.clipAction(clip).play();
 const ranges={L:new T.Box3(),R:new T.Box3()},lengths=new Map(),point=name=>review.scene.getObjectByName(name).getWorldPosition(new T.Vector3());
 for(let frame=0;frame<=120;frame++){
  mixer.setTime(clip.duration*frame/121);review.scene.updateMatrixWorld(true);mesh.skeleton.update();
  for(const side of ['L','R']){
   ranges[side].expandByPoint(point('hand'+side));
   const hip=point('thigh'+side),knee=point('shin'+side),ankle=point('foot'+side),line=hip.clone().lerp(ankle,(hip.y-knee.y)/(hip.y-ankle.y));assert(knee.z>=line.z-.001,'Backwards knee');
   for(const [from,to]of [['thigh','shin'],['shin','foot'],['upper_arm','forearm'],['forearm','hand']]){const key=from+side,length=point(key).distanceTo(point(to+side));if(!lengths.has(key))lengths.set(key,length);assert(Math.abs(length-lengths.get(key))<.0001,'Changing limb length');}
   const low=Math.min(...soles[side].map(i=>mesh.applyBoneTransform(i,new T.Vector3().fromBufferAttribute(a.position,i)).y));assert(Math.abs(low)<.0015,'Unplanted sole: '+low);
  }
  for(const bone of review.scene.getObjectsByProperty('isBone',true))assert(bone.scale.distanceTo(new T.Vector3(1,1,1))<.0001,'Bone scaling');
 }
 for(const side of ['L','R'])assert(ranges[side].getSize(new T.Vector3()).length()>.08,'Frozen arm '+side);
 mixer.stopAllAction();mixer.uncacheRoot(review.scene);
});
await fs.writeFile('evidence/staged-bridge-20260916/chapter-review/bridge-action-checks.json',JSON.stringify({at:new Date().toISOString(),scope:'Local review derivative integrity and skeletal/contact checks. Human Form approval and game integration remain pending.',checks},null,2)+'\n');console.log(JSON.stringify(checks));
