import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {terrainHeight,riverCenter,riverHalfWidth,navigable} from '../.cache/landscape-review/garden/worldLayout.js';
const manifest=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8'));
const search=process.argv.includes('--search');
const placements=search?[...Array.from({length:7},(_,i)=>({id:'coastal-bank',position:[1.25+i*.15,-.50,15.5],yaw:Math.PI/2})),...Array.from({length:7},(_,i)=>({id:'riverbank',position:[3.4-i*.15,-.50,18.7],yaw:-Math.PI/2}))]:[{id:'coastal-bank',position:[1.15,-.50,15.5],yaw:Math.PI/2},{id:'riverbank',position:[3.55,-.50,18.7],yaw:-Math.PI/2}];
const rows=[];
for(const item of placements){
 const d=manifest.assets[item.id],binding=manifest.bindings.find(b=>b.id===item.id),{scene}=await loadPilotGeometry(binding.source),outer=new T.Group(),normalized=new T.Group(),origin=new T.Group();
 origin.position.fromArray(d.normalization.offset);origin.add(scene);normalized.scale.fromArray(d.normalization.scale);normalized.rotation.set(...d.normalization.rotation);normalized.add(origin);outer.add(normalized);outer.position.fromArray(item.position);outer.rotation.y=item.yaw;outer.updateMatrixWorld(true);
 const bounds=new T.Box3().setFromObject(outer),aboveWalkable=new T.Box3(),aboveWater=new T.Box3(),p=new T.Vector3();let elevatedWalkVertices=0,maxWalkRise=0;
 outer.traverse(o=>{if(!(o instanceof T.Mesh))return;const positions=o.geometry.getAttribute('position');for(let i=0;i<positions.count;i++){
  p.fromBufferAttribute(positions,i).applyMatrix4(o.matrixWorld);
  if(p.y>-.08)aboveWater.expandByPoint(p);
  if(navigable(p)&&p.y>terrainHeight(p)+.07){aboveWalkable.expandByPoint(p);elevatedWalkVertices++;maxWalkRise=Math.max(maxWalkRise,p.y-terrainHeight(p));}
 }});
 rows.push({...item,source:binding.source,sourceSha256:binding.sourceSha256,bounds:{min:bounds.min.toArray(),max:bounds.max.toArray()},aboveWater:{min:aboveWater.min.toArray(),max:aboveWater.max.toArray()},elevatedWalkable:{vertices:elevatedWalkVertices,maxRise:maxWalkRise,min:aboveWalkable.min.toArray(),max:aboveWalkable.max.toArray()},boatReachSeparated:bounds.min.z>10.5,shoreAtCentre:{west:riverCenter(item.position[2])-riverHalfWidth(item.position[2]),east:riverCenter(item.position[2])+riverHalfWidth(item.position[2])}});
}
const result={at:new Date().toISOString(),scope:'Source-only bank placement study, not runtime acceptance. Above-walkable vertices include plants and rocks as well as ground.',placements:rows};
await fs.writeFile('evidence/independent-repair-20260918/bank-fit-'+(search?'offset-study':'envelopes')+'.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(search?rows.map(r=>({id:r.id,position:r.position,elevated:r.elevatedWalkable.vertices,maxRise:r.elevatedWalkable.maxRise,aboveWater:r.aboveWater})):rows,null,2));
