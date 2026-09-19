/** Source geometry and annotated doorway features; not visual acceptance. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {VILLAGE_BUILDINGS,WORLD,anchors,findRoute,segmentClear,pointInPolygon,navigable,clearExpandedBuilding,regionAt} from '../.cache/checks/src/garden/worldLayout.js';
const directory='evidence/final-demo-20260918',manifest=JSON.parse(await fs.readFile(directory+'/review-assets.json','utf8'));
const featureFile='evidence/independent-repair-20260918/door-features/feature-annotations.json',featureBytes=await fs.readFile(featureFile),features=JSON.parse(featureBytes);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const reports=[];
for(const [name,id,priorScale] of [['dock','cottage',1.8],['workshop','cottage-1',1.85],['bakery','bakery',1.8]]){
 const definition=manifest.assets[id],binding=manifest.bindings.find(b=>b.id===id),source=await fs.readFile(binding.source);
 if(hash(source)!==definition.sourceSha256)throw Error('Source binding mismatch: '+id);
 const gltf=await loadPilotGeometry(binding.source),root=new T.Group(),wrapper=new T.Group(),origin=new T.Group(),building=VILLAGE_BUILDINGS[name];
 wrapper.scale.fromArray(definition.normalization.scale);wrapper.rotation.set(...definition.normalization.rotation);origin.position.fromArray(definition.normalization.offset);origin.add(gltf.scene);wrapper.add(origin);root.add(wrapper);
 root.position.fromArray(building.position);root.rotation.y=building.rotation;root.scale.setScalar(building.scale);root.updateMatrixWorld(true);
 let baseVertices=0,offLand=0;const baseBounds=new T.Box3();
 root.traverse(object=>{if(!object.isMesh)return;const a=object.geometry.attributes.position;for(let i=0;i<a.count;i++){const p=new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(object.matrixWorld);if(p.y>building.position[1]+.5)continue;baseVertices++;baseBounds.expandByPoint(p);if(!WORLD.banks.some(bank=>pointInPolygon(p,bank.polygon)))offLand++;}});
 const feature=features.features.find(f=>f.building===name),ratio=building.scale/priorScale,interval=feature.heightIntervalMetres.map(n=>n*ratio);
 reports.push({name,id,source:binding.source,sourceSha256:definition.sourceSha256,normalization:definition.normalization,outer:building,bounds:new T.Box3().setFromObject(root),baseBounds,baseVertices,offLand,doorway:{annotation:featureFile,view:feature.view,priorScale,scale:building.scale,ratio,heightMetres:feature.heightMetres*ratio,intervalMetres:interval,minimumMetres:1.9,pass:interval[0]>=1.9,scope:name==='bakery'?'Arched aperture centreline only; annotation uncertainty retained.':'Visible threshold to lintel; annotation uncertainty retained.'}});
}
const approaches=Object.entries(anchors).filter(([,a])=>'approach'in a).map(([name,a])=>({name,point:a.approach,clear:navigable(a.approach)}));
const routes=[['bakery','workshop'],['garden','bakery'],['garden','workshop']].map(([from,to])=>{const start=anchors[from].approach,path=findRoute(start,anchors[to].approach);return {from,to,path,clear:!!path.length&&path.every((p,i)=>segmentClear(i?path[i-1]:start,p))};});
let enclosed=0,unresolved=0;
for(let x=-15;x<=24;x+=.2)for(let z=-20;z<=22;z+=.2){const p={x,z};if(!Object.values(VILLAGE_BUILDINGS).some(b=>pointInPolygon(p,b.footprint)))continue;const q=clearExpandedBuilding(p);if(!q)continue;enclosed++;if(!navigable(q)||regionAt(p)!==regionAt(q))unresolved++;}
const result={at:new Date().toISOString(),worldLayoutSha256:hash(await fs.readFile('src/garden/worldLayout.ts')),featureAnnotationSha256:hash(featureBytes),method:'Unmodified source vertices transformed by the same normalization and uniform outer transforms as the review runtime. Door features are proportional corrections of independently annotated source geometry; annotation uncertainty is retained. No native gameplay or human acceptance is claimed.',reports,approaches,routes,currentSaveRelocation:{scope:'Synthetic grid of positions for which the current-playthrough helper supplies a replacement; not historical migration.',enclosed,unresolved}};
await fs.writeFile(directory+'/building-clearance-final.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(reports.some(r=>r.offLand||!r.doorway.pass)||approaches.some(a=>!a.clear)||routes.some(r=>!r.clear)||unresolved)process.exitCode=1;
