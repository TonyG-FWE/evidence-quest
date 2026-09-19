import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry,readGlb} from './pilot-glb.mjs';
import {VisualAssetLibrary,CharacterVisual} from '../evidence/hands-on-20260916/pilot/runtime/visualAsset.js';
const root=path.resolve('evidence/hands-on-20260916'),manifest=JSON.parse(await fs.readFile(path.join(root,'pilot/review-manifest.json')));
const readAsset=uri=>loadPilotGeometry(path.join(root,uri));
const pip=manifest.assets.find(a=>a.id==='pip');

test('review artwork cannot enter normal runtime acquisition',async()=>{
 let requests=0;const library=new VisualAssetLibrary(async()=>{requests++;throw Error('should not load');});
 await assert.rejects(library.acquire(pip.visual),/Form approval/);assert.equal(requests,0);library.dispose();
});
test('concurrent instances share source resources but own bones; only final release disposes',async()=>{
 let requests=0;const source=await readAsset(pip.visual.uri),meshes=[];source.scene.traverse(o=>{if(o.isMesh)meshes.push(o);});
 let geometryDisposals=0,materialDisposals=0;meshes[0].geometry.addEventListener('dispose',()=>geometryDisposals++);meshes[0].material.addEventListener('dispose',()=>materialDisposals++);
 const library=new VisualAssetLibrary(async()=>{requests++;return source;});
 const [a,b]=await Promise.all([library.acquire(pip.visual,{reviewOnly:true}),library.acquire(pip.visual,{reviewOnly:true})]);
 assert.equal(requests,1);assert.notEqual(a.root.getObjectByName('bone_9'),b.root.getObjectByName('bone_9'));
 const ma=a.root.getObjectByProperty('isSkinnedMesh',true),mb=b.root.getObjectByProperty('isSkinnedMesh',true);
 assert.equal(ma.geometry,mb.geometry);assert.notEqual(ma.skeleton,mb.skeleton);
 a.release();assert.equal(geometryDisposals,0);assert.equal(library.activeSources,1);
 b.release();b.release();assert.equal(geometryDisposals,1);assert.equal(materialDisposals,1);assert.equal(library.activeSources,0);library.dispose();
});
test('closing during loading and a rejected load release their reservations',async()=>{
 let finish;const source=await readAsset(pip.visual.uri);let disposed=0;source.scene.getObjectByProperty('isMesh',true).geometry.addEventListener('dispose',()=>disposed++);
 const library=new VisualAssetLibrary(()=>new Promise(resolve=>{finish=resolve;}));
 const waiting=library.acquire(pip.visual,{reviewOnly:true});library.dispose();finish(source);await assert.rejects(waiting,/closed during loading/);assert.equal(disposed,1);assert.equal(library.activeSources,0);
 const failing=new VisualAssetLibrary(async()=>{throw Error('local loader failure');});await assert.rejects(failing.acquire(pip.visual,{reviewOnly:true}),/local loader failure/);assert.equal(failing.activeSources,0);failing.dispose();
});
for(const asset of manifest.assets){
 test(`${asset.id}: original files, geometry counts and embedded texture bytes are retained`,async()=>{
  const source=await readGlb(path.join(root,asset.intake.source)),review=await readGlb(path.join(root,asset.model));
  assert.equal(createHash('sha256').update(source.bytes).digest('hex'),asset.intake.sourceSha256);
  assert.equal(createHash('sha256').update(review.bytes).digest('hex'),asset.visual.sha256);
  const images=({json,bin})=>json.images.map(image=>{const v=json.bufferViews[image.bufferView];return createHash('sha256').update(bin.subarray(v.byteOffset??0,(v.byteOffset??0)+v.byteLength)).digest('hex');});
  assert.deepEqual(images(review),images(source));assert.equal(review.json.images.length,3);
  const model=await readAsset(asset.visual.uri),bounds=new T.Box3().setFromObject(model.scene);
  assert(Math.abs(bounds.min.y)<.00001);assert(Math.abs(bounds.max.y-asset.dimensions[1])<.00001);
  let triangles=0;model.scene.traverse(o=>{if(o.isMesh)triangles+=o.geometry.index.count/3;});assert.equal(triangles,asset.files.find(f=>f.operation==='make').triangles);
 });
 if(asset.visual.hand)test(`${asset.id}: walking, carry contact, pause and recovery follow supplied state`,async()=>{
  const library=new VisualAssetLibrary(readAsset),lease=await library.acquire(asset.visual,{reviewOnly:true}),actor=new CharacterVisual(lease);
  const state=Object.freeze({position:Object.freeze([3,.13,-2]),yaw:.7,motion:'walk',carrying:true,paused:false,reducedMotion:false});
  actor.sync(state);let maxContactError=0;
  for(let frame=0;frame<72;frame++){
   actor.update(1/30);actor.root.updateMatrixWorld(true);actor.root.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
   const palm=actor.hand.getWorldPosition(new T.Vector3()),up=new T.Vector3(0,1,0).applyQuaternion(actor.hand.getWorldQuaternion(new T.Quaternion()));
   assert(up.dot(new T.Vector3(0,1,0))>.999);
   const hit=new T.Raycaster(palm.clone().addScaledVector(up,.08),up.clone().negate()).intersectObject(actor.root,true)[0];assert(hit,'palm mesh remains under carried seed');
   maxContactError=Math.max(maxContactError,hit.point.distanceTo(palm));
  }
  assert(maxContactError<.012,`Hand contact gap ${maxContactError.toFixed(4)}m`);
  assert.deepEqual(actor.root.position.toArray(),state.position);assert.equal(actor.root.rotation.y,state.yaw);
  actor.sync({...state,paused:true});actor.update(0);const paused=actor.hand.getWorldPosition(new T.Vector3());actor.update(10);assert(paused.distanceTo(actor.hand.getWorldPosition(new T.Vector3()))<1e-6);
  actor.sync({...state,carrying:false,motion:'still'});actor.update(0);const released=actor.hand.getWorldPosition(new T.Vector3());assert(released.distanceTo(paused)>.05);
  actor.sync({...state,reducedMotion:true,carrying:false});actor.update(1);assert(released.distanceTo(actor.hand.getWorldPosition(new T.Vector3()))<1e-6);
  actor.dispose();assert.equal(library.activeSources,0);library.dispose();
 });
}
