/** Source geometry check for tree roots at Pip's foot/shin height. */
import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {WORLD} from '../.cache/landscape-review/garden/worldLayout.js';
const manifest=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8')),results=[];
for(const tree of WORLD.trees){
 const definition=manifest.assets[tree.asset],source=manifest.bindings.find(b=>b.id===tree.asset).source,g=await loadPilotGeometry(source),n=definition.normalization;
 const wrapper=new T.Group(),origin=new T.Group();wrapper.scale.fromArray(n.scale).multiplyScalar(tree.scale);wrapper.rotation.set(...n.rotation);origin.position.fromArray(n.offset);origin.add(g.scene);wrapper.add(origin);wrapper.updateMatrixWorld(true);
 const ranges=[.15,.35,.65,1.1].map(height=>({height,radius:0,vertices:0})),point=new T.Vector3();
 wrapper.traverse(o=>{if(!(o instanceof T.Mesh))return;const p=o.geometry.getAttribute('position');for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);for(const r of ranges)if(point.y<=r.height){r.radius=Math.max(r.radius,Math.hypot(point.x,point.z));r.vertices++;}}});
 results.push({asset:tree.asset,x:tree.x,z:tree.z,height:tree.height,collisionRadius:tree.radius,ranges});
}
await fs.writeFile('evidence/independent-repair-20260918/tree-root-measurements.json',JSON.stringify({at:new Date().toISOString(),scope:'Original supplied source vertices; radial envelope at stated physical height, excluding player radius.',results},null,2)+'\n');
console.log(JSON.stringify(results,null,2));
