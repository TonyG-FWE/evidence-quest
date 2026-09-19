/** Focused source/placement evidence, separate from rendered or browser acceptance. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {WORLD,terrainHeight,VILLAGE_BUILDINGS,anchors,findRoute,navigable,clearExpandedBuilding} from '../.cache/landscape-review/garden/worldLayout.js';
import {ringDistance,insideRing,pathDistance} from '../.cache/landscape-review/garden/sceneryLayout.js';
import {attachReviewLandscape} from '../.cache/landscape-review/garden/assets/reviewLandscape.js';
if(process.env.EQ_ASSET_PROFILE!=='review')throw Error('Explicit review profile required');
const sha=b=>createHash('sha256').update(b).digest('hex'),manifest=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8'));
const bindings={},sizes={},sourceScenes={};
for(const id of ['tree','tree-1','willow','cottage','cottage-1','bakery','grass','grass-tuft','grass-patch']){
 const d=manifest.assets[id],source=manifest.bindings.find(b=>b.id===id).source,bytes=await fs.readFile(source),g=await loadPilotGeometry(source),size=new T.Box3().setFromObject(g.scene).getSize(new T.Vector3()).multiply(new T.Vector3(...d.normalization.scale));
 if(sha(bytes)!==d.sourceSha256)throw Error('Original source binding changed: '+id);sourceScenes[id]=g.scene;sizes[id]=size.toArray();bindings[id]={source,sha256:sha(bytes),normalizedSize:size.toArray()};
}
const buildings=Object.entries(VILLAGE_BUILDINGS).map(([id,b])=>({id,height:sizes[id==='dock'?'cottage':id==='workshop'?'cottage-1':'bakery'][1]*b.scale}));
function measuredRootRadius(t){
 const n=manifest.assets[t.asset].normalization,wrapper=new T.Group(),origin=new T.Group();wrapper.scale.fromArray(n.scale).multiplyScalar(t.scale);wrapper.rotation.set(...n.rotation);origin.position.fromArray(n.offset);origin.add(sourceScenes[t.asset]);wrapper.add(origin);wrapper.updateMatrixWorld(true);let radius=0;const point=new T.Vector3();
 wrapper.traverse(o=>{if(!(o instanceof T.Mesh))return;const p=o.geometry.getAttribute('position');for(let i=0;i<p.count;i++){point.fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);if(point.y<=.35)radius=Math.max(radius,Math.hypot(point.x,point.z));}});return radius;
}
const trees=WORLD.trees.map(t=>({...t,measuredRootRadius:measuredRootRadius(t),measuredHeight:sizes[t.asset][1]*t.scale,groundY:terrainHeight(t),uniformScale:true,bankClearance:Math.min(...WORLD.banks.filter(b=>insideRing(t,b.polygon)).map(b=>ringDistance(t,b.polygon))),pathClearance:pathDistance(t,WORLD.paths.map(p=>p.points)),obstacleClearance:Math.min(...WORLD.obstacles.map(o=>ringDistance(t,o.polygon)))}));
const assembly=attachReviewLandscape({scatter(){}},{}),largestHouse=Math.max(...buildings.map(b=>b.height));
const visits=[anchors.dock.approach,anchors.crossing.approach,anchors.garden.approach,anchors.bakery.approach,anchors.workshop.approach,anchors.dock.approach],routes=visits.slice(1).map((to,i)=>({from:visits[i],to,points:findRoute(visits[i],to,{x:0,z:3})}));
const recovery=trees.map(t=>({from:{x:t.x,z:t.z},to:clearExpandedBuilding(t)}));
const files=['src/garden/sceneryLayout.ts','src/garden/worldLayout.ts','src/garden/worldArt.ts','src/garden/assets/reviewLandscape.ts','src/garden/assets/sceneryBatch.ts','src/garden/assets/reviewWorld.ts','src/garden/assets/reviewManifest.ts'];
const result={at:new Date().toISOString(),scope:'CPU source geometry and authored placement calculation; not rendered acceptance, performance qualification, or a complete playthrough.',sourceHashes:Object.fromEntries(await Promise.all(files.map(async p=>[p,sha(await fs.readFile(p))]))),bindings,buildings,trees,routes,recovery,models:assembly.models,placements:assembly.placements,checks:{sourceBytesPreserved:true,treeHeightMatches:trees.every(t=>Math.abs(t.measuredHeight-t.height)<1e-6),treeRootsInsideBank:trees.every(t=>t.bankClearance>t.radius),rootGeometryAndPipClearance:trees.every(t=>t.radius>=t.measuredRootRadius+.24),walkingCorridorsClear:trees.every(t=>t.pathClearance>t.radius+.525),crownsOutsideBuildingsAndWork:trees.every(t=>t.obstacleClearance>=t.crownRadius+.25),connectedWalkingRoutes:routes.every(r=>r.points.length>0),enclosedCurrentPositionsRecover:recovery.every(r=>r.to&&navigable(r.to)),mostTreesTallerThanHouses:trees.filter(t=>t.height>largestHouse).length>trees.length/2,threeSuppliedGrassPatches:assembly.models['grass-patch']===3,broadLeafPlantRetained:assembly.models.grass>0,grassTuftsAreTripo:bindings['grass-tuft'].source==='output/grass-tuft-20260918/grass-tuft.glb'}};
await fs.writeFile('evidence/independent-repair-20260918/landscape-placement-check.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({checks:result.checks,models:result.models,treeHeights:trees.map(t=>t.measuredHeight),buildingHeights:buildings},null,2));
if(Object.values(result.checks).some(value=>!value))process.exitCode=1;
