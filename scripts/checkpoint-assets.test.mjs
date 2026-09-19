import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import decodeWebp,{init as initWebp} from '@jsquash/webp/decode.js';
import {decodePng} from './image-codec.mjs';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {CharacterVisual,VisualAssetLibrary,ModelActor,ModelProp,resourceAllocation,PaperArt} from '../.cache/checkpoint-runtime/index.js';

const sha=b=>createHash('sha256').update(b).digest('hex');
const evidence='evidence/integrated-checkpoint-20260916';
const review=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/checkpoint-review/manifest.json','utf8'));
const load=uri=>loadPilotGeometry('evidence/hands-on-20260916'+uri);

test('static palette batching preserves triangles, normals, linear colors and shadow participation',()=>{
 const art=new PaperArt(),root=new T.Group();
 const first=art.box(root,1,.4,-2,.6,.8,.3,'#356d99'),second=art.box(root,-2,.2,1,.4,.5,.9,'#efbd91');second.rotation.y=.4;
 root.updateMatrixWorld(true);
 const expected=[first,second].map(mesh=>{const geometry=mesh.geometry.toNonIndexed();geometry.applyMatrix4(mesh.matrix);return {positions:[...geometry.attributes.position.array],normals:[...geometry.attributes.normal.array],color:mesh.material.color.toArray().map(Math.fround)};});
 art.mergeStatic(root);assert.equal(root.children.length,1);const mesh=root.children[0];
 assert.equal(mesh.material.vertexColors,true);assert.equal(mesh.material.roughness,.92);assert.equal(mesh.castShadow,true);assert.equal(mesh.receiveShadow,true);
 assert.deepEqual([...mesh.geometry.attributes.position.array],expected.flatMap(e=>e.positions));
 assert.deepEqual([...mesh.geometry.attributes.normal.array],expected.flatMap(e=>e.normals));
 assert.deepEqual([...mesh.geometry.attributes.color.array],expected.flatMap(e=>Array.from({length:e.positions.length/3},()=>e.color).flat()));
 art.dispose();
});
test('the human approval is bound to both unchanged character sources and production provenance',async()=>{
 const approval=JSON.parse(await fs.readFile(evidence+'/character-form-approval.json','utf8'));
 const runtime=JSON.parse(await fs.readFile('public/garden-assets/manifest.json','utf8'));
 for(const asset of approval.assets){assert.equal(asset.status,'APPROVED');assert.equal(sha(await fs.readFile(asset.file)),asset.sha256);const result=runtime.assets.find(a=>a.id===asset.id);assert.equal(result.sourceSha256,asset.sha256);assert.equal(sha(await fs.readFile('public'+result.uri)),result.sha256);assert(result.resources.bytes<=3*1024*1024);}
 assert.deepEqual(runtime.assets.map(a=>a.id),['pip','grandma']);
});
test('full-resolution welcome derivatives preserve every source RGBA pixel',async()=>{
 await initWebp(await WebAssembly.compile(await fs.readFile('node_modules/@jsquash/webp/codec/dec/webp_dec.wasm')));
 const assets=JSON.parse(await fs.readFile(evidence+'/opening-illustrations.json','utf8'));
 for(const asset of assets){const original=decodePng(await fs.readFile(asset.source)),current=await decodeWebp(await fs.readFile(asset.runtime));assert.equal(current.width,original.width);assert.equal(current.height,original.height);assert.deepEqual(Buffer.from(current.data),original.data);}
});
test('a late character load after its location is left releases the acquired source',async()=>{
 let finish;const source=await load(review.grandma.uri),library=new VisualAssetLibrary(()=>new Promise(resolve=>finish=resolve));
 const actor=new ModelActor(library,{...review.grandma,approval:'approved'});actor.demand(true);actor.demand(false);finish(source);await new Promise(resolve=>setImmediate(resolve));assert.equal(actor.ready,false);assert.equal(library.activeSources,0);actor.dispose();library.dispose();
});
test('disposed actor cannot return from an interrupted asynchronous load',async()=>{
 let finish;const source=await load(review.pip.uri),library=new VisualAssetLibrary(()=>new Promise(resolve=>finish=resolve));
 const actor=new ModelActor(library,{...review.pip,approval:'approved'});actor.demand(true);actor.dispose();finish(source);await new Promise(resolve=>setImmediate(resolve));assert.equal(actor.ready,false);assert.equal(actor.rig.children.length,0);assert.equal(library.activeSources,0);library.dispose();
});
test('a prop load cannot export unapproved artwork or retain a source after its location unloads',async()=>{
 const definition=review.props.find(a=>a.id==='seed-boat').visual;
 let finish;const source=await load(definition.uri),library=new VisualAssetLibrary(()=>new Promise(resolve=>finish=resolve));
 await assert.rejects(library.acquire(definition),/Form approval/);assert.equal(library.activeSources,0);
 const prop=new ModelProp(library,{...definition,approval:'approved'},[.45,.35,.85],'seedBoat');prop.demand(true);prop.demand(false);finish(source);await new Promise(resolve=>setImmediate(resolve));assert.equal(prop.ready,false);assert.equal(library.activeSources,0);assert.equal(prop.root.children.length,1);prop.dispose();library.dispose();
});
test('imported allocation accounting includes animation arrays and independent skeleton buffers',async()=>{
 const source=await load(review.pip.uri),library=new VisualAssetLibrary(async()=>source),lease=await library.acquire(review.pip,{reviewOnly:true});const allocation=library.allocations();
 assert(allocation.geometryBytes>0);assert(allocation.animationBytes>0);assert(allocation.skeletonBytes>0);assert.equal(allocation.decodedBytes,allocation.geometryBytes+allocation.animationBytes+allocation.skeletonBytes+allocation.textureBytes);lease.release();assert.equal(library.allocations().decodedBytes,0);library.dispose();
});
test('decoded allocation accounting includes shared texture mipmaps without counting the same source twice',()=>{
 const geometry=new T.BoxGeometry(),texture=new T.DataTexture(new Uint8Array(16*16*4),16,16);texture.generateMipmaps=true;const clone=texture.clone();const n=resourceAllocation([geometry,geometry,texture,clone]);
 assert.equal(n.textureBytes,Math.ceil(16*16*4*4/3));assert(n.geometryBytes>0);assert.equal(n.decodedBytes,n.geometryBytes+n.textureBytes);texture.dispose();clone.dispose();geometry.dispose();
});
for(const name of ['jog','carry_jog'])test(`Pip ${name}: forward knees, stable lengths, both arms and planted supporting soles`,async()=>{
 const source=await load(review.pip.uri),mesh=source.scene.getObjectByProperty('isSkinnedMesh',true),position=mesh.geometry.attributes.position;
 const original=await loadPilotGeometry('evidence/hands-on-20260916/pilot/revision-r2/pip/pip-review.glb'),originalMesh=original.scene.getObjectByProperty('isSkinnedMesh',true);
 for(const attribute of ['position','skinWeight','skinIndex'])assert.deepEqual(mesh.geometry.attributes[attribute].array,originalMesh.geometry.attributes[attribute].array);
 const library=new VisualAssetLibrary(async()=>source),actor=new CharacterVisual(await library.acquire(review.pip,{reviewOnly:true}));
 actor.sync({position:[0,0,0],yaw:0,motion:'jog',speed:1.7,carrying:name==='carry_jog',paused:true,reducedMotion:false});
 const soles={L:[],R:[]},ranges={L:new T.Box3(),R:new T.Box3()},lengths=new Map();
 for(let i=0;i<position.count;i++)if(position.getY(i)<.006)soles[position.getX(i)<0?'R':'L'].push(i);
 const cycle=source.animations.find(c=>c.name==='pip_'+name).duration;
 for(let frame=0;frame<120;frame++){
  const phase=frame/120;actor.seek(cycle*phase);const visible=actor.root.getObjectByProperty('isSkinnedMesh',true);visible.skeleton.update();
  const at=joint=>actor.root.getObjectByName(joint).getWorldPosition(new T.Vector3());
  for(const side of ['L','R']){
   const hip=at('thigh'+side),knee=at('shin'+side),ankle=at('foot'+side),onLine=hip.clone().lerp(ankle,(hip.y-knee.y)/(hip.y-ankle.y));assert(knee.z>=onLine.z-.001,'backward knee');
   const low=Math.min(...soles[side].map(i=>visible.applyBoneTransform(i,new T.Vector3().fromBufferAttribute(position,i)).y));assert(low>-.002,'sole below ground');if((phase+(side==='R'?.5:0))%1<.37)assert(Math.abs(low)<.002,`support foot floats ${low}`);
   for(const [a,b]of [['thigh','shin'],['shin','foot'],['upper_arm','forearm'],['forearm','hand']]){const key=a+side,n=at(a+side).distanceTo(at(b+side));if(!lengths.has(key))lengths.set(key,n);assert(Math.abs(n-lengths.get(key))<.0001,'limb length changed');}
   ranges[side].expandByPoint(at('hand'+side));
  }
  if(name==='carry_jog'){const normal=new T.Vector3(0,1,0).applyQuaternion(actor.hand.getWorldQuaternion(new T.Quaternion()));assert(normal.y>.99);}
 }
 if(name==='jog')for(const side of ['L','R'])assert(ranges[side].getSize(new T.Vector3()).z>.08,'arm is frozen');
 actor.dispose();library.dispose();
});

test('construction actions use explicit clip mappings and committed progress without owning a second clock',async()=>{
 const original=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/revision-r2/manifest.json','utf8')).assets.find(a=>a.id==='pip').visual;
 const file='evidence/hands-on-20260916/pilot/chapter-review/pip/pip-bridge-actions-review.glb';
 const definition={...original,uri:file,sha256:sha(await fs.readFile(file)),approval:'review',rig:{...original.rig,actions:{post:{clip:'pip_post_place'},tie:{clip:'pip_rope_tie'}}}};
 const library=new VisualAssetLibrary(async()=>loadPilotGeometry(file)),actor=new CharacterVisual(await library.acquire(definition,{reviewOnly:true}));
 const state={position:[0,0,0],yaw:0,motion:'idle',carrying:true,paused:false,reducedMotion:false,action:{kind:'tie',progress:.35}};
 actor.sync(state);for(let i=0;i<5;i++)actor.update(.05);
 const point=()=>actor.root.getObjectByName('handR').getWorldPosition(new T.Vector3());const held=point();
 for(let i=0;i<10;i++)actor.update(.05);assert(held.distanceTo(point())<1e-7,'Rendering time must not advance committed work progress');
 actor.sync({...state,action:{kind:'tie',progress:.7}});actor.update(.05);assert(held.distanceTo(point())>.005,'A changed committed gesture must advance the authored pose');
 const paused=point();actor.sync({...state,paused:true,action:{kind:'tie',progress:.7}});for(let i=0;i<10;i++)actor.update(.05);assert(paused.distanceTo(point())<1e-7);
 actor.sync({...state,action:undefined,motion:'walk',speed:.35});for(let i=0;i<5;i++)actor.update(.05);assert(actor.root.getObjectByName('handR'));
 actor.dispose();assert.equal(library.activeSources,0);library.dispose();
});

test('unknown construction clips fail before becoming usable artwork',async()=>{
 const original=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/revision-r2/manifest.json','utf8')).assets.find(a=>a.id==='pip').visual;
 const library=new VisualAssetLibrary(async()=>load(original.uri));
 const lease=await library.acquire({...original,rig:{...original.rig,actions:{tie:{clip:'missing_tie'}}}},{reviewOnly:true});
 assert.throws(()=>new CharacterVisual(lease),/construction action is missing/);assert.equal(library.activeSources,0);library.dispose();
});
