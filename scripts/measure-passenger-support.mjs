import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {PASSENGER_GANGWAY,WORLD,terrainHeight,pointInPolygon} from '../.cache/checks/src/garden/worldLayout.js';
const directory='evidence/final-demo-20260918',manifest=JSON.parse(await fs.readFile(directory+'/review-assets.json','utf8')),models=[];
const ramps=Object.entries({outer:PASSENGER_GANGWAY.outer,inner:PASSENGER_GANGWAY.inner}).map(([name,p])=>({id:'ramp',name,position:PASSENGER_GANGWAY.position.map((v,i)=>v+p.offset[i]),scale:p.scale,yaw:p.yaw}));
for(const spec of [{id:'dock',name:'dock',position:[-5.65,-.38,-14.1],scale:[.5,.5,.5],yaw:Math.PI},...ramps,{id:'boat-2',name:'boat',position:[-4.1,-.23,-14.1],scale:[1,1,1],yaw:0}]){
 const definition=manifest.assets[spec.id],source=manifest.bindings.find(b=>b.id===spec.id).source,sha256=createHash('sha256').update(await fs.readFile(source)).digest('hex');
 if(sha256!==definition.sourceSha256)throw Error('Source changed: '+source);
 const gltf=await loadPilotGeometry(source),root=new T.Group(),normal=new T.Group(),origin=new T.Group();normal.scale.fromArray(definition.normalization.scale);normal.rotation.set(...definition.normalization.rotation);origin.position.fromArray(definition.normalization.offset);origin.add(gltf.scene);normal.add(origin);root.add(normal);root.position.fromArray(spec.position);root.scale.fromArray(spec.scale);root.rotation.y=spec.yaw;root.updateMatrixWorld(true);models.push({...spec,root,source,sha256,bounds:new T.Box3().setFromObject(root)});
}
const samples=[];
for(let x=-6.1;x< -3.95;x+=.01){const point={x,z:-14.1},contacts=models.map(({name,root})=>{const ray=new T.Raycaster(new T.Vector3(x,10,point.z),new T.Vector3(0,-1,0)),hit=ray.intersectObject(root,true).find(h=>(h.face?.normal.clone().transformDirection(h.object.matrixWorld).y??0)>.55);return {name,y:hit?.point.y??null};});if(WORLD.banks.some(b=>pointInPolygon(point,b.polygon)))contacts.push({name:'shared-bank',y:terrainHeight(point)});const heights=contacts.filter(c=>c.y!==null).map(c=>c.y);samples.push({...point,contacts,support:heights.length?Math.max(...heights):null});}
const missing=samples.filter(s=>s.support===null);let maximumStep=0;for(let i=1;i<samples.length;i++)if(samples[i].support!==null&&samples[i-1].support!==null)maximumStep=Math.max(maximumStep,Math.abs(samples[i].support-samples[i-1].support));
const report={at:new Date().toISOString(),scope:'Source-triangle boarding supports at 1 cm intervals. Includes shared bank and both ramp slopes over the native boat rail. Geometry evidence is separate from rendered animation acceptance.',models:models.map(({root,...m})=>m),samples,missingSupport:missing.length,maximumAdjacentStepM:maximumStep};
await fs.writeFile(directory+'/'+(process.argv[2]??'dock-support-refit-r4')+'.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({missingSupport:missing.length,maximumAdjacentStepM:maximumStep}));
