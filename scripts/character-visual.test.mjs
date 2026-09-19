import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry,readGlb} from './pilot-glb.mjs';
const {VisualAssetLibrary,CharacterVisual}=await import(process.env.EQ_CHARACTER_ADAPTER??'../evidence/hands-on-20260916/pilot/revision-r2/runtime/visualAsset.js');

const base='evidence/hands-on-20260916',root=base+'/pilot/revision-r2';
const manifest=JSON.parse(await fs.readFile(root+'/manifest.json','utf8'));
const load=uri=>loadPilotGeometry(base+uri);
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const state={position:[0,0,0],yaw:0,motion:'walk',carrying:false,paused:false,reducedMotion:false};
const point=(root,name)=>root.getObjectByName(name).getWorldPosition(new T.Vector3());

// Measure the visible sole outline, not the already-straight foot bones.
function footprintHeading(points){
 const cross=(o,a,b)=>(a.x-o.x)*(b.z-o.z)-(a.z-o.z)*(b.x-o.x);
 const sorted=[...points].sort((a,b)=>a.x-b.x||a.z-b.z);
 const half=pts=>{const out=[];for(const p of pts){while(out.length>1&&cross(out.at(-2),out.at(-1),p)<=0)out.pop();out.push(p);}out.pop();return out;};
 const hull=[...half(sorted),...half([...sorted].reverse())];
 let area=0,cx=0,cz=0,xx=0,zz=0,xz=0;
 for(let i=0;i<hull.length;i++){
  const {x,z}=hull[i],{x:u,z:v}=hull[(i+1)%hull.length],c=x*v-u*z;
  area+=c/2;cx+=(x+u)*c/6;cz+=(z+v)*c/6;xx+=(x*x+x*u+u*u)*c/12;zz+=(z*z+z*v+v*v)*c/12;xz+=(2*x*z+x*v+u*z+2*u*v)*c/24;
 }
 cx/=area;cz/=area;return Math.atan2(2*(xz/area-cx*cz),zz/area-cz*cz-(xx/area-cx*cx))/2;
}

test('both rejected revisions and unapproved replacements remain blocked from production',async()=>{
 let called=0;const library=new VisualAssetLibrary(async()=>{called++;throw Error('Unexpected load');});
 for(const a of manifest.assets)for(const definition of [a.visual,a.previous.visual])await assert.rejects(library.acquire(definition),/Form approval/);
 assert.equal(called,0);assert.equal(manifest.actualCredits,290);assert.equal(manifest.additionalCredits,0);library.dispose();
});

test('shared geometry has independent skeletons and disposes only on final release',async()=>{
 const source=await load(manifest.assets[0].visual.uri),mesh=source.scene.getObjectByProperty('isSkinnedMesh',true);let geometry=0,material=0;
 mesh.geometry.addEventListener('dispose',()=>geometry++);mesh.material.addEventListener('dispose',()=>material++);
 let requests=0;const library=new VisualAssetLibrary(async()=>{requests++;return source;});
 const [a,b]=await Promise.all([library.acquire(manifest.assets[0].visual,{reviewOnly:true}),library.acquire(manifest.assets[0].visual,{reviewOnly:true})]);
 assert.equal(requests,1);assert.notEqual(a.root.getObjectByName('handR'),b.root.getObjectByName('handR'));
 assert.equal(a.root.getObjectByProperty('isMesh',true).geometry,b.root.getObjectByProperty('isMesh',true).geometry);
 a.release();assert.equal(geometry,0);b.release();b.release();assert.equal(geometry,1);assert.equal(material,1);assert.equal(library.activeSources,0);library.dispose();
});

test('interrupted and failed loads release resources and reservations',async()=>{
 let finish;const source=await load(manifest.assets[0].visual.uri),library=new VisualAssetLibrary(()=>new Promise(resolve=>{finish=resolve;}));
 let disposed=0;source.scene.getObjectByProperty('isMesh',true).geometry.addEventListener('dispose',()=>disposed++);
 const pending=library.acquire(manifest.assets[0].visual,{reviewOnly:true});library.dispose();finish(source);await assert.rejects(pending,/closed during loading/);assert.equal(disposed,1);assert.equal(library.activeSources,0);
 const failed=new VisualAssetLibrary(async()=>{throw Error('Unavailable asset');});await assert.rejects(failed.acquire(manifest.assets[0].visual,{reviewOnly:true}),/Unavailable/);assert.equal(failed.activeSources,0);failed.dispose();
});

for(const asset of manifest.assets){
 test(`${asset.id}: visible shoes face straight forward throughout all four clips`,async()=>{
  const gltf=await load(asset.visual.uri),mesh=gltf.scene.getObjectByProperty('isSkinnedMesh',true),p=mesh.geometry.attributes.position,mixer=new T.AnimationMixer(gltf.scene);
  const indices={L:[],R:[]};for(let i=0;i<p.count;i++)if(p.getY(i)<.045)indices[p.getX(i)<0?'R':'L'].push(i);
  for(const name of Object.values(asset.visual.rig.clips)){
   const clip=gltf.animations.find(c=>c.name===name);mixer.stopAllAction();mixer.clipAction(clip).play();
   for(let frame=0;frame<60;frame++){
    mixer.setTime(clip.duration*frame/60);gltf.scene.updateMatrixWorld(true);mesh.skeleton.update();
    for(const side of ['L','R']){
     const feet=indices[side].map(i=>mesh.applyBoneTransform(i,new T.Vector3().fromBufferAttribute(p,i)));
     const angle=footprintHeading(feet)*180/Math.PI;assert(Math.abs(angle)<.5,`${name} ${side} shoe points ${angle} degrees away from forward`);
    }
   }
  }
 });

 test(`${asset.id}: foot correction preserves body geometry, weights and all animation tracks`,async()=>{
  const before=await loadPilotGeometry(`${base}/pilot/revision-r2-before-foot-alignment/${asset.id}/${asset.id}-review.glb`),after=await load(asset.visual.uri);
  const original=before.scene.getObjectByProperty('isSkinnedMesh',true).geometry,current=after.scene.getObjectByProperty('isSkinnedMesh',true).geometry;
  assert.deepEqual(current.index.array,original.index.array);
  for(const name of ['uv','skinIndex','skinWeight'])assert.deepEqual(current.attributes[name].array,original.attributes[name].array,`${name} changed`);
  const a=original.attributes.position,b=current.attributes.position;assert.equal(a.count,b.count);
  for(let i=0;i<a.count;i++){
   assert(Math.abs(a.getY(i)-b.getY(i))<1e-6,'Foot correction changed height');
   if(a.getY(i)>=.152)assert(new T.Vector3().fromBufferAttribute(a,i).distanceTo(new T.Vector3().fromBufferAttribute(b,i))<1e-6,'Foot correction moved the upper body');
  }
  assert.equal(before.animations.length,after.animations.length);
  for(const clip of before.animations){
   const result=after.animations.find(c=>c.name===clip.name);assert(result);assert.equal(result.duration,clip.duration);assert.equal(result.tracks.length,clip.tracks.length);
   for(const track of clip.tracks){const actual=result.tracks.find(t=>t.name===track.name);assert(actual);assert.deepEqual(actual.times,track.times);assert.equal(actual.values.length,track.values.length);for(let i=0;i<track.values.length;i++)assert(Math.abs(actual.values[i]-track.values[i])<1e-6,'Animation changed');}
  }
 });

 test(`${asset.id}: original model and every embedded painted texture are preserved`,async()=>{
  const original=await readGlb(base+'/pilot/'+asset.rig.source),review=await readGlb(base+'/'+asset.model);
  assert.equal(digest(original.bytes),asset.rig.sourceSha256);assert.equal(digest(review.bytes),asset.visual.sha256);
  const images=g=>g.json.images.map(i=>{const v=g.json.bufferViews[i.bufferView],start=v.byteOffset??0;return digest(g.bin.subarray(start,start+v.byteLength));});
  assert.deepEqual(images(original),images(review));assert.equal(review.json.materials.length,original.json.materials.length);
  assert.equal(review.json.animations.length,4);assert(review.json.skins.length===1);
 });

 test(`${asset.id}: anatomical weights are normalized with no limb influence on the head or upper torso`,async()=>{
  const gltf=await load(asset.visual.uri),mesh=gltf.scene.getObjectByProperty('isSkinnedMesh',true),a=mesh.geometry.attributes;
  for(let i=0;i<a.position.count;i++){
   const index=new T.Vector4().fromBufferAttribute(a.skinIndex,i),w=new T.Vector4().fromBufferAttribute(a.skinWeight,i);
   assert(Math.abs(w.toArray().reduce((a,b)=>a+b,0)-1)<1e-5);
   for(let j=0;j<4;j++)if(w.getComponent(j)>.0001){
    const name=mesh.skeleton.bones[index.getComponent(j)].name;
    if(a.position.getY(i)>asset.rig.specification.neckY+.01)assert.equal(name,'head');
    if(a.position.getY(i)>asset.rig.specification.hipY+.03)assert(!/^(thigh|shin|foot|toe)/.test(name),`leg weight on torso at vertex ${i}`);
   }
  }
 });

 test(`${asset.id}: both arms swing; knees bend forward; steps have no lateral drift or changing bone lengths`,async()=>{
  const gltf=await load(asset.visual.uri),mixer=new T.AnimationMixer(gltf.scene),clip=gltf.animations.find(c=>c.name===asset.visual.rig.clips.walk);mixer.clipAction(clip).play();
  const ranges=Object.fromEntries(['handL','handR','forearmL','forearmR','footL','footR'].map(n=>[n,new T.Box3()]));
  for(let i=0;i<120;i++){
   mixer.setTime(clip.duration*i/120);gltf.scene.updateMatrixWorld(true);
   for(const [name,box] of Object.entries(ranges))box.expandByPoint(point(gltf.scene,name));
   for(const side of ['L','R']){
    const hip=point(gltf.scene,'thigh'+side),knee=point(gltf.scene,'shin'+side),ankle=point(gltf.scene,'foot'+side);
    const line=hip.clone().lerp(ankle,(hip.y-knee.y)/(hip.y-ankle.y));assert(knee.z>line.z-.0001,'knee bends backwards');
    for(const [from,to] of [['thigh','shin'],['shin','foot'],['upper_arm','forearm'],['forearm','hand']]){
     const spec=asset.rig.bones[from+'.'+side],expected=new T.Vector3(...spec.head).distanceTo(new T.Vector3(...spec.tail));
     assert(Math.abs(point(gltf.scene,from+side).distanceTo(point(gltf.scene,to+side))-expected)<.0001,`${from} changes length`);
    }
   }
   for(const bone of gltf.scene.getObjectsByProperty('isBone',true))assert(bone.scale.distanceTo(new T.Vector3(1,1,1))<.0001,'animated bone scaling');
  }
  for(const hand of ['handL','handR'])assert(ranges[hand].getSize(new T.Vector3()).z>.08,hand+' is frozen');
  for(const elbow of ['forearmL','forearmR'])assert(ranges[elbow].getSize(new T.Vector3()).z>.035,elbow+' is frozen');
  for(const foot of ['footL','footR'])assert(ranges[foot].getSize(new T.Vector3()).x<.001,'sideways leg motion');
 });

 test(`${asset.id}: actual soles stay grounded while standing and during each support phase`,async()=>{
  const gltf=await load(asset.visual.uri),mesh=gltf.scene.getObjectByProperty('isSkinnedMesh',true),a=mesh.geometry.attributes,mixer=new T.AnimationMixer(gltf.scene);
  const soles={L:[],R:[]};for(let i=0;i<a.position.count;i++)if(a.position.getY(i)<.006)soles[a.position.getX(i)<0?'R':'L'].push(i);
  for(const side of ['L','R'])assert(soles[side].length>3);
  for(const mode of ['idle','walk','carryIdle','carryWalk']){
   const clip=gltf.animations.find(c=>c.name===asset.visual.rig.clips[mode]);mixer.stopAllAction();mixer.clipAction(clip).play();
   const walking=mode.toLowerCase().includes('walk');const support={L:[],R:[]};
   for(let frame=0;frame<120;frame++){
    const phase=frame/120;mixer.setTime(clip.duration*phase);gltf.scene.updateMatrixWorld(true);mesh.skeleton.update();
    for(const side of ['L','R']){
     const footPhase=(phase+(side==='R'?.5:0))%1;
     const low=Math.min(...soles[side].map(i=>mesh.applyBoneTransform(i,new T.Vector3().fromBufferAttribute(a.position,i)).y));
     assert(low>-.0015,'sole penetrates ground');
     if(!walking||footPhase<.59){assert(Math.abs(low)<.0015,`${mode} ${side} sole floats ${low}`);support[side].push(phase);}
    }
   }
   assert(support.L.length>=69&&support.R.length>=69);
  }
 });

 test(`${asset.id}: carrying holds the seed against the actual palm through both clips`,async()=>{
  const library=new VisualAssetLibrary(load),actor=new CharacterVisual(await library.acquire(asset.visual,{reviewOnly:true}));
  let worst=0;
  for(const mode of ['idle','walk']){
   actor.sync({...state,position:[2,.13,-3],yaw:.7,motion:mode,carrying:true,paused:true});
   for(let i=0;i<96;i++){
    actor.seek((mode==='walk'?asset.rig.clips.walk.duration:asset.rig.clips.idle.duration)*i/96);
    actor.root.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
    const palm=actor.hand.getWorldPosition(new T.Vector3()),normal=new T.Vector3(0,1,0).applyQuaternion(actor.hand.getWorldQuaternion(new T.Quaternion()));
    assert(normal.y>.99,'palm is not facing upwards');
    const hit=new T.Raycaster(palm.clone().addScaledVector(normal,.06),normal.clone().negate(),0,.12).intersectObject(actor.root,true)[0];assert(hit,'no hand surface below seed');worst=Math.max(worst,palm.distanceTo(hit.point));
   }
  }
  assert(worst<.012,`seed-palm gap ${worst}m`);actor.dispose();library.dispose();
 });

 test(`${asset.id}: transitions, pause, zero speed, reduced motion and recovery preserve supplied state`,async()=>{
  const library=new VisualAssetLibrary(load),actor=new CharacterVisual(await library.acquire(asset.visual,{reviewOnly:true}));
  const frozen=Object.freeze({...state,position:Object.freeze([1,.1,-1])});actor.sync(frozen);actor.update(.03);
  const before=point(actor.root,'handR');actor.sync({...frozen,carrying:true});actor.update(0);assert(before.distanceTo(point(actor.root,'handR'))<1e-6,'transition snaps on state change');
  for(let n=0;n<20;n++)actor.update(.02);
  actor.sync({...frozen,carrying:true,paused:true});actor.update(0);const paused=point(actor.root,'handR');actor.update(100);assert(paused.distanceTo(point(actor.root,'handR'))<1e-6);
  actor.sync({...frozen,speed:0});for(let n=0;n<20;n++)actor.update(.02);const stopped=point(actor.root,'footL');actor.update(.05);assert(stopped.distanceTo(point(actor.root,'footL'))<1e-6);
  actor.sync({...frozen,reducedMotion:true});actor.update(0);const reduced=point(actor.root,'handR');actor.update(100);assert(reduced.distanceTo(point(actor.root,'handR'))<1e-6);
  actor.sync(frozen);for(let n=0;n<20;n++)actor.update(.02);assert(reduced.distanceTo(point(actor.root,'handR'))>.01);
  assert.deepEqual(actor.root.position.toArray(),frozen.position);assert.equal(frozen.carrying,false);actor.dispose();assert.equal(library.activeSources,0);library.dispose();
 });
}
