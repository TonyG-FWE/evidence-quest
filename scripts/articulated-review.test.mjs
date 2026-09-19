import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {VisualAssetLibrary} from '../evidence/hands-on-20260916/pilot/revision-r2/runtime/visualAsset.js';
import {ReviewActor} from '../evidence/hands-on-20260916/pilot/articulated-library-20260917/review-actor.js';
import {ReviewScene,DEMOS} from '../evidence/hands-on-20260916/pilot/articulated-library-20260917/review-scenes.js';
const dir='evidence/hands-on-20260916/pilot/articulated-library-20260917',manifest=JSON.parse(await fs.readFile(dir+'/manifest.json'));
const definition=id=>{const m=manifest.assets.find(a=>a.id===id).model;return {...m,id,approval:'review'};};
const load=d=>loadPilotGeometry(dir+'/'+d);
async function actor(lib,id='pip'){const d=definition(id);return new ReviewActor(await lib.acquire(d,{reviewOnly:true}),d);}

test('review models cannot be acquired as production artwork',async()=>{
 const lib=new VisualAssetLibrary(load);await assert.rejects(lib.acquire(definition('pip')),/Form approval/);assert.equal(lib.activeSources,0);lib.dispose();
});
test('changing a clip while paused immediately displays its pose rather than the previous action',async()=>{
 const lib=new VisualAssetLibrary(load),pip=await actor(lib),expected=await actor(lib);
 pip.sync({clip:'cup',paused:true});pip.seek(1.2);
 const wrist=pip.root.getObjectByName('hand_R'),before=wrist.getWorldPosition(new T.Vector3());
 pip.sync({clip:'walk',paused:true});
 expected.sync({clip:'walk',paused:true});expected.seek(0);
 const actual=wrist.getWorldPosition(new T.Vector3()),target=expected.root.getObjectByName('hand_R').getWorldPosition(new T.Vector3());
 assert.ok(actual.distanceTo(before)>.02,'the selected pose replaces the cup pose');
 assert.ok(actual.distanceTo(target)<.000001,'paused selection shows the first frame of the selected clip');
 pip.dispose();expected.dispose();assert.equal(lib.activeSources,0);lib.dispose();
});
test('a fixture loading between frames is safe and cancelling releases every lease',async()=>{
 let resume,started;const fixtureStarted=new Promise(r=>started=r);let pending=true;
 const lib=new VisualAssetLibrary(async uri=>{if(pending&&uri.includes('/seed-boat/')){started();await new Promise(r=>resume=r);}return load(uri);});
 const pip=await actor(lib),scene=new T.Scene();scene.add(pip.root);pip.sync({clip:'cup',paused:true});pip.seek(1.2);
 const demo=new ReviewScene(lib,manifest,scene),loading=demo.demonstration(pip,'boat');await fixtureStarted;
 assert.doesNotThrow(()=>demo.update(.6,false));demo.dispose();resume();await loading;pip.dispose();assert.equal(lib.activeSources,0);lib.dispose();
});
test('every functional demonstration uses actual models, keeps finite transforms and releases resources',async()=>{
 for(const [id,spec] of Object.entries(DEMOS)){
  const lib=new VisualAssetLibrary(load),person=await actor(lib,spec.actors[0]),scene=new T.Scene();scene.add(person.root);const demo=new ReviewScene(lib,manifest,scene);
  await demo.demonstration(person,id);assert.ok(demo.ready,id+' is ready');
  for(const phase of [0,.2,.5,.65,.85,.99]){const t=(person.spec?.duration??2.4)*phase;person.seek(t);demo.update(t,true);scene.updateMatrixWorld(true);for(const e of demo.entries){assert.ok(e.root.matrixWorld.elements.every(Number.isFinite),id+' '+e.id+' finite transform');}}
  assert.ok(demo.entries.length>0,id+' has actual objects');demo.dispose();person.dispose();assert.equal(lib.activeSources,0,id+' releases shared sources');lib.dispose();
 }
});
test('all models load at real scale with finite geometry and component states',async()=>{
 for(const a of manifest.assets){const g=await load(a.model.uri);g.scene.updateMatrixWorld(true);const box=new T.Box3().setFromObject(g.scene);assert.ok([...box.min,...box.max].every(Number.isFinite),a.id);assert.ok(box.getSize(new T.Vector3()).length()>0,a.id);}
});
test('both visual worlds have independent comparison assemblies and disposal',async()=>{
 for(const world of ['Village','Sparkfest']){const lib=new VisualAssetLibrary(load),scene=new T.Scene(),review=new ReviewScene(lib,manifest,scene);await review.comparison(world);review.update(1,true);assert.ok(review.entries.length>=9);for(const e of review.entries)assert.equal(manifest.assets.find(a=>a.id===e.id).world,world);review.dispose();assert.equal(lib.activeSources,0);lib.dispose();}
});

test('Jo pinches the turning page while her supporting palm remains on the facing page',async()=>{
 const lib=new VisualAssetLibrary(load),jo=await actor(lib,'jo'),scene=new T.Scene();scene.add(jo.root);const review=new ReviewScene(lib,manifest,scene);await review.demonstration(jo,'book');
 const page=review.prop.root.getObjectByName('curled_paper_leaf006');assert.ok(review.prop.root.getObjectByName('page_turn_hinge'));
 const curve=.027*Math.sin((.23-.013)/.377*Math.PI);let worstGrip=0,worstSupport=0;
 for(let step=0;step<=26;step++){
  const phase=step*.02,t=phase*4.8;jo.seek(t);review.update(t,true);scene.updateMatrixWorld(true);
  const contact=page.localToWorld(new T.Vector3(-.23,curve,-.224));worstGrip=Math.max(worstGrip,review.pinch(jo).distanceTo(contact));
  const support=review.prop.root.localToWorld(new T.Vector3(.13,.075,-.16));worstSupport=Math.max(worstSupport,review.palm(jo,'L').point.distanceTo(support));
 }
 assert.ok(worstGrip<.006,'fingertip/page gap '+worstGrip);assert.ok(worstSupport<.006,'support palm/page gap '+worstSupport);review.dispose();jo.dispose();assert.equal(lib.activeSources,0);lib.dispose();
});

test('Pip and Grandma lower the seed to the actual cradle before releasing it',async()=>{
 for(const id of ['pip','grandma']){
  const lib=new VisualAssetLibrary(load),person=await actor(lib,id),scene=new T.Scene();scene.add(person.root);const review=new ReviewScene(lib,manifest,scene);await review.demonstration(person,'boat');
  const anchor=review.fixture.root.getObjectByName('anchor_seed_cradle'),duration=person.spec.duration;let before,after;
  for(const phase of [0,.15,.3,.45,.59999,.60,.65,.9]){
   person.seek(duration*phase);review.update(duration*phase,true);scene.updateMatrixWorld(true);const seed=review.prop.root.position.clone(),cradle=anchor.getWorldPosition(new T.Vector3());
   assert.ok(seed.y>=cradle.y-.001,id+' seed remains above the cradle floor');
   if(phase===.59999)before=seed;if(phase===.60)after=seed;
   if(phase>=.60)assert.ok(seed.distanceTo(cradle)<.001,id+' seed stays at the named receiving anchor');
  }
  assert.ok(before.distanceTo(after)<.002,id+' continuous hand-to-cradle release');review.dispose();person.dispose();assert.equal(lib.activeSources,0);lib.dispose();
 }
});
