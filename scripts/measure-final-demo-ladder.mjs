import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
const report=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8')),d=report.assets.ladder,g=await loadPilotGeometry(report.bindings.find(b=>b.id==='ladder').source),points=[],scale=d.normalization.scale[0],offset=new T.Vector3(...d.normalization.offset);
g.scene.updateMatrixWorld(true);g.scene.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.attributes.position;for(let i=0;i<a.count;i++)points.push(new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld).add(offset).multiplyScalar(scale));});
const samples=[.05,.20,.45,.7,.95,1.2,1.45,1.7,1.95,2.05].map(y=>{const ps=points.filter(p=>Math.abs(p.y-y)<.045),b=new T.Box3().setFromPoints(ps);return {y,count:ps.length,min:b.min.toArray(),max:b.max.toArray(),center:b.getCenter(new T.Vector3()).toArray()};});await fs.writeFile('evidence/final-demo-20260918/ladder-profile.json',JSON.stringify(samples,null,2));console.log(JSON.stringify(samples));
