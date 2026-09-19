import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {VisualAssetLibrary,CharacterVisual} from '../.cache/checkpoint-runtime/index.js';
const root='evidence/final-demo-20260918',manifest=JSON.parse(await fs.readFile(root+'/review-assets.json','utf8')),results=[];
for(const id of ['pip','grandma','mara','rina','sol','boy','operator','passenger','jo']){
 const d=manifest.assets[id],source=manifest.bindings.find(b=>b.id===id).source,g=await loadPilotGeometry(source);
 for(const a of d.animations??[]){const file=JSON.parse(await fs.readFile('.cache/final-demo-review/assets/'+a.uri.split('/').at(-1)));g.animations.push(...file.clips.map(c=>T.AnimationClip.parse(c)));}
 const library=new VisualAssetLibrary(async()=>g,true),v=new CharacterVisual(await library.acquire(d));
 for(const [motion,carrying,action]of [['idle',false],['idle',true],['walk',false],['walk',true],...Object.keys(d.rig.actions??{}).filter(x=>['plant','tile','sack','knead','tie','climb'].includes(x)).map(x=>['idle',false,x])]){
  const samples=[];for(let i=0;i<24;i++){
   v.sync({position:[0,0,0],yaw:0,motion,carrying,paused:true,reducedMotion:false,...(action?{action:{kind:action,progress:i/23}}:{})});if(action)v.update(0);else v.seek(i/24);
   v.root.updateMatrixWorld(true);v.root.traverse(o=>{if(o.isSkinnedMesh){o.skeleton.update();o.computeBoundingBox();}});const b=new T.Box3().setFromObject(v.root),point=name=>v.root.getObjectByName(name)?.getWorldPosition(new T.Vector3()).toArray();samples.push({phase:i/23,min:b.min.toArray(),max:b.max.toArray(),leftFoot:point('L_Foot'),rightFoot:point('R_Foot')});
  }
  results.push({id,source,sourceSha256:d.sourceSha256,motion,carrying,action:action??null,bottomRange:[Math.min(...samples.map(s=>s.min[1])),Math.max(...samples.map(s=>s.min[1]))],heightRange:[Math.min(...samples.map(s=>s.max[1])),Math.max(...samples.map(s=>s.max[1]))],samples});
 }
 v.dispose();library.dispose();
}
await fs.writeFile(root+'/actor-floor-samples.json',JSON.stringify({scope:'Source-skinned bounds and existing foot joints. Numerical geometry samples only; clothing and experience acceptance require visible review.',results},null,2)+'\n');
console.log(JSON.stringify(results.map(({samples,...r})=>r),null,2));
