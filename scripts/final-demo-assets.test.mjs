import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {VisualAssetLibrary,CharacterVisual,ModelProp,ReviewLanternPicture} from '../.cache/checkpoint-runtime/index.js';
const report=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8'));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
async function supplied(id){
 const definition=report.assets[id],binding=report.bindings.find(b=>b.id===id),gltf=await loadPilotGeometry(binding.source);
 for(const animation of definition.animations??[]){const data=await fs.readFile('.cache/final-demo-review/assets/'+animation.uri.split('/').at(-1));assert.equal(sha(data),animation.sha256);const parsed=JSON.parse(data);assert.equal(parsed.sourceModelSha256,definition.sourceSha256);gltf.animations.push(...parsed.clips.map(c=>T.AnimationClip.parse(c)));}
 return {definition,gltf};
}
test('all originals still match the 143-file inventory; review candidates do not acquire production approval',async()=>{
 const inventory=JSON.parse(await fs.readFile('evidence/final-demo-20260918/inventory.json','utf8'));
 assert.equal(inventory.files.length,143);assert.equal(new Set(inventory.files.map(f=>f.binarySha256)).size,111);
 for(const file of inventory.files)assert.equal(sha(await fs.readFile(file.file)),file.sha256,file.file);
 for(const asset of Object.values(report.assets))assert.equal(asset.approval,'review');
 let loads=0;const library=new VisualAssetLibrary(async()=>{loads++;throw Error('should not load');});
 await assert.rejects(library.acquire(report.assets.pip),/Form approval/);assert.equal(loads,0);library.dispose();
});

test('all supplied memory pictures release their owners and cannot steal live character input',async()=>{
 const library=new VisualAssetLibrary(async(_uri,definition)=>(await supplied(definition.id)).gltf,true),picture=new ReviewLanternPicture(library);
 for(const kind of ['picnic','duet','promise','repair','bread','thanks','both','draft','bench','planting','gather-absent','gather-mara','gather-listener']){
  picture.show(kind);picture.update(true);
  for(let n=0;n<2000&&!picture.ready&&!picture.error;n++){await new Promise(r=>setTimeout(r,5));picture.update(true);}
  assert.equal(picture.error,null,kind);assert(picture.ready,kind);
  const bounds=new T.Box3().setFromObject(picture.root),targets=[];
  picture.root.traverse(o=>{if(o.userData.target)targets.push(o.userData.target);});
  assert([...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite),kind);assert.deepEqual(targets,[],kind);
  assert(library.activeSources>0);picture.update(false);assert.equal(library.activeSources,0,kind);
 }
 picture.dispose();library.dispose();
});

test('an interrupted memory load cannot restore a hidden or disposed picture',async()=>{
 let release;const gate=new Promise(resolve=>{release=resolve;});
 const library=new VisualAssetLibrary(async(_uri,definition)=>{await gate;return (await supplied(definition.id)).gltf;},true),picture=new ReviewLanternPicture(library);
 picture.show('planting');picture.update(true);assert(picture.pending);picture.update(false);picture.show('thanks');picture.dispose();release();
 for(let n=0;n<2000&&library.pendingSources;n++)await new Promise(r=>setTimeout(r,5));
 assert.equal(library.pendingSources,0);assert.equal(library.activeSources,0);assert.equal(picture.root.children.length,0);assert.equal(picture.ready,false);library.dispose();
});
test('review normalization is outside the supplied mesh, skeleton and native clip data',async()=>{
 const {definition,gltf}=await supplied('pip'),before=[];
 gltf.scene.traverse(o=>before.push({name:o.name,matrix:o.matrix.toArray(),position:o.isMesh?o.geometry.attributes.position.array.slice():null,weights:o.isSkinnedMesh?o.geometry.attributes.skinWeight.array.slice():null,inverses:o.isSkinnedMesh?o.skeleton.boneInverses.map(m=>m.toArray()):null}));
 const native=gltf.animations.map(c=>T.AnimationClip.toJSON(c)),library=new VisualAssetLibrary(async()=>gltf,true),lease=await library.acquire(definition);
 const wrapper=lease.root.getObjectByName('asset-normalization');assert(wrapper);assert.deepEqual(wrapper.scale.toArray(),definition.normalization.scale);
 gltf.scene.traverse(o=>{const old=before.find(b=>b.name===o.name);assert.deepEqual(o.matrix.toArray(),old.matrix);if(o.isMesh)assert.deepEqual(o.geometry.attributes.position.array,old.position);if(o.isSkinnedMesh){assert.deepEqual(o.geometry.attributes.skinWeight.array,old.weights);assert.deepEqual(o.skeleton.boneInverses.map(m=>m.toArray()),old.inverses);}});
 assert.deepEqual(gltf.animations.map(c=>T.AnimationClip.toJSON(c)),native);
 const original=gltf.scene.getObjectByProperty('isSkinnedMesh',true),instance=lease.root.getObjectByProperty('isSkinnedMesh',true);assert.equal(instance.geometry,original.geometry);assert.notEqual(instance.skeleton,original.skeleton);assert.notEqual(instance.skeleton.bones[0],original.skeleton.bones[0]);lease.release();assert.equal(library.activeSources,0);library.dispose();
});
test('instance cutaway and occlusion materials preserve shared source appearance and release once',async()=>{
 const {definition,gltf}=await supplied('bird'),library=new VisualAssetLibrary(async()=>gltf,true),a=new ModelProp(library,definition,[1,1,1],'bird'),b=new ModelProp(library,definition,[1,1,1],'bird');
 a.demand(true);b.demand(true);await new Promise(resolve=>setImmediate(resolve));assert(a.ready&&b.ready);assert.equal(library.activeSources,1);
 const sourceMesh=gltf.scene.getObjectByProperty('isMesh',true),sourceMaterial=sourceMesh.material,originalOpacity=sourceMaterial.opacity;let materialDisposals=0,geometryDisposals=0;
 sourceMesh.geometry.addEventListener('dispose',()=>geometryDisposals++);a.paint(material=>{material.addEventListener('dispose',()=>materialDisposals++);material.opacity=.16;material.clippingPlanes=[new T.Plane(new T.Vector3(0,-1,0),1)];});
 assert.equal(sourceMaterial.opacity,originalOpacity);assert.equal(sourceMaterial.clippingPlanes,null);assert.equal(b.root.getObjectByName(sourceMesh.name).material,sourceMaterial);
 a.demand(false);assert(materialDisposals>0);assert.equal(geometryDisposals,0);assert.equal(library.activeSources,1);a.dispose();b.dispose();assert.equal(geometryDisposals,1);assert.equal(library.activeSources,0);library.dispose();
});
test('existing-bone hand contact clamps unreachable goals without stretching supplied limbs',async()=>{
 const {definition,gltf}=await supplied('grandma'),library=new VisualAssetLibrary(async()=>gltf,true),visual=new CharacterVisual(await library.acquire(definition));
 visual.sync({position:[0,0,0],yaw:0,motion:'idle',speed:0,carrying:false,paused:true,reducedMotion:false,action:{kind:'plant',progress:.5}});visual.update(0);
 const hand=visual.attachment('hand'),wrist=hand.parent,elbow=wrist.parent,shoulder=elbow.parent,point=o=>o.getWorldPosition(new T.Vector3());
 const lengths=[point(shoulder).distanceTo(point(elbow)),point(elbow).distanceTo(point(wrist))],local=[shoulder,elbow,wrist].map(b=>b.position.toArray());
 const near=point(hand).add(new T.Vector3(.02,.015,0));assert(visual.reachHand(near)<.025);
 const far=new T.Vector3(40,30,-20),remaining=visual.reachHand(far);assert(remaining>40);
 assert(Math.abs(point(shoulder).distanceTo(point(elbow))-lengths[0])<1e-6);assert(Math.abs(point(elbow).distanceTo(point(wrist))-lengths[1])<1e-6);assert.deepEqual([shoulder,elbow,wrist].map(b=>b.position.toArray()),local);
 for(const bone of [shoulder,elbow,wrist])assert(bone.quaternion.toArray().every(Number.isFinite));visual.dispose();library.dispose();
});
test('source-bound action pose follows committed progress and returns to native locomotion',async()=>{
 const {definition,gltf}=await supplied('pip'),library=new VisualAssetLibrary(async()=>gltf,true),visual=new CharacterVisual(await library.acquire(definition));
 const state={position:[0,0,0],yaw:0,motion:'idle',carrying:true,paused:false,reducedMotion:false,action:{kind:'tie',progress:.3}};visual.sync(state);for(let i=0;i<6;i++)visual.update(.05);const first=visual.hand.getWorldPosition(new T.Vector3());for(let i=0;i<10;i++)visual.update(.05);assert(first.distanceTo(visual.hand.getWorldPosition(new T.Vector3()))<1e-6);
 visual.sync({...state,action:{kind:'tie',progress:.7}});visual.update(.05);assert(first.distanceTo(visual.hand.getWorldPosition(new T.Vector3()))>.002);
 visual.sync({...state,action:undefined,motion:'walk',speed:.8});for(let i=0;i<6;i++)visual.update(.05);assert(visual.hand.getWorldPosition(new T.Vector3()).toArray().every(Number.isFinite));visual.dispose();assert.equal(library.activeSources,0);library.dispose();
});
test('grounding follows supplied soles without cumulative drift across repeated native cycles',async()=>{
 const {definition,gltf}=await supplied('pip'),library=new VisualAssetLibrary(async()=>gltf,true),visual=new CharacterVisual(await library.acquire(definition));
 visual.sync({position:[0,0,0],yaw:0,motion:'walk',carrying:false,paused:true,reducedMotion:false});
 const sample=()=>{let low=Infinity;for(const sole of definition.grounding){const mesh=visual.root.getObjectByName(sole.mesh),p=new T.Vector3();for(const index of sole.vertices){mesh.getVertexPosition(index,p);mesh.localToWorld(p);low=Math.min(low,p.y);}}return low;};
 for(let repeat=0;repeat<4;repeat++)for(let frame=0;frame<32;frame++){visual.seek(frame/32);assert(Math.abs(sample())<1e-5,'A supporting sole must remain on its authoritative ground plane');assert(Math.abs(visual.root.getObjectByName('asset-normalization').position.y)<.1,'Grounding must not accumulate across cycles');}
 visual.dispose();library.dispose();
});
test('the real review exporter verifies derivative and animation hashes and rejects profile or source mismatches',async()=>{
 const temporary=await fs.mkdtemp(path.resolve('.cache/final-demo-export-test-')),evidence=temporary+'/evidence/final-demo-20260918',assets=temporary+'/.cache/final-demo-review/assets',definition=structuredClone(report.assets.pip),manifest={...report,assets:{pip:definition}};
 await fs.mkdir(evidence,{recursive:true});await fs.mkdir(assets,{recursive:true});
 for(const file of [definition,...definition.animations])await fs.copyFile('.cache/final-demo-review/assets/'+path.basename(file.uri),assets+'/'+path.basename(file.uri));
 const run=()=>spawnSync(process.execPath,[path.resolve('scripts/export-garden-assets.mjs')],{cwd:temporary,env:{...process.env,EQ_ASSET_PROFILE:'review'},encoding:'utf8',windowsHide:true});
 const save=()=>fs.writeFile(evidence+'/review-assets.json',JSON.stringify(manifest));await save();assert.equal(run().status,0);
 manifest.profile='production';await save();assert.match(run().stderr,/Invalid local review asset profile/);manifest.profile='local-review';
 definition.animations[0].sourceModelSha256='0'.repeat(64);await save();assert.match(run().stderr,/animation source mismatch/);definition.animations[0].sourceModelSha256=definition.sourceSha256;
 await fs.appendFile(assets+'/'+path.basename(definition.uri),'tampered');await save();assert.match(run().stderr,/derivative hash mismatch/);
 // Only this exact test-created directory is removed, within the workspace cache.
 assert(temporary.startsWith(path.resolve('.cache')+path.sep));await fs.rm(temporary,{recursive:true,force:true});
});
