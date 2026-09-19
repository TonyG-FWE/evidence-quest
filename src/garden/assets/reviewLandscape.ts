import type * as T from 'three';
import {WORLD,anchors,BAKERY_WORK,BAKERY_REPAIR,PLANTING_BED,terrainHeight,riverCenter,riverHalfWidth,WATER_SURFACE_Y,BRIDGE_LEVELS,type WorldPoint} from '../worldLayout.js';
import {RIVER_ROCKS} from '../river.js';
import {sceneryFits,type SceneryContext,type ReviewTree} from '../sceneryLayout.js';
import type {ReviewWorld} from './reviewWorld.js';
import {makePathPlanting,GARDEN_DECORATIVE_LANTERNS,gardenDressingClear} from './pathPlantingLayout.js';

type Placement={position:readonly [number,number,number];rotation:number;scale:number;normal?:readonly[number,number,number]};
/** This same context feeds the shared tree layout. Planting stays outside doors,
 * the two bridge landings, launch/landing, and each activity's working space. */
export function landscapeContext():SceneryContext{return {
 banks:WORLD.banks.map(b=>b.polygon),obstacles:WORLD.obstacles.map(o=>o.polygon),paths:WORLD.paths.map(p=>p.points),
 clearings:[...Object.values(anchors).flatMap(a=>Object.values(a)),...Object.values(BAKERY_WORK),BAKERY_REPAIR.ladderFoot].filter((p):p is WorldPoint=>typeof p==='object'&&'x' in p&&'z' in p),
};}
const nearCrossing=(p:WorldPoint)=>BRIDGE_LEVELS.crossings.some(z=>Math.abs(p.z-z)<1.15&&Math.abs(p.x-riverCenter(z))<riverHalfWidth(z)+1.5);

/** Supplied-model scenery only. Logical river rocks and tree trunks remain in
 * worldLayout/river; no second collision or navigation graph is introduced. */
export function attachReviewLandscape(review:ReviewWorld,parent:T.Object3D){
 const context=landscapeContext(),groups=new Map<string,Placement[]>();
 const add=(id:string,p:WorldPoint,scale=1,rotation=0,y=terrainHeight(p)-.018)=>{const group=groups.get(id)??[];group.push({position:[p.x,y,p.z],scale,rotation});groups.set(id,group);};
 const outsideRoots=(p:WorldPoint,radius=0)=>WORLD.trees.every(t=>Math.hypot(t.x-p.x,t.z-p.z)>t.radius+radius);
 for(const tree of WORLD.trees){
  const t=tree as Partial<ReviewTree>&typeof tree;
  // Plant broad exposed roots into the lower side of a slope. Using only the
  // centre height left roots floating above the downhill ground.
  const rootY=Math.min(terrainHeight(t),...Array.from({length:16},(_,i)=>terrainHeight({x:t.x+Math.cos(i*Math.PI/8)*(t.radius-.24),z:t.z+Math.sin(i*Math.PI/8)*(t.radius-.24)})))-.018;
  add(t.asset??'tree-1',t,t.scale,t.rotation,rootY);
 }
 let seed=18946;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 // Grouped shoreline vegetation has deliberate gaps at bridges and docks.
 // Rocks remain entirely outside the water passage except the three authored
 // steering obstacles, whose visual envelope fits their existing collider.
 for(let z=-18.5;z<20;z+=1.2+random()*.9)for(const side of [-1,1]){
  const p={x:riverCenter(z)+side*(riverHalfWidth(z)+.35+random()*.22),z:z+(random()-.5)*.3};
  if(nearCrossing(p)||!sceneryFits(p,.10,context,.2,1.45))continue;
  add('rock',p,.7+random()*.5,random()*Math.PI*2,terrainHeight(p)-.12);
  if(random()>.34){const q={x:p.x+side*.32,z:p.z+.28};if(sceneryFits(q,.14,context,.2,1.55))add('cattail',q,.75+random()*.4,random()*6.28);}
 }
 for(const [i,p]of RIVER_ROCKS.entries())add('rock',p,.60,i*1.9,WATER_SURFACE_Y-.065);
 // Small woodland clusters; the public paths and handling areas stay open.
 for(const tree of WORLD.trees)for(let i=0;i<3;i++){
  const angle=tree.rotation+i*2.2,r=tree.radius+.35+random()*.7,p={x:tree.x+Math.cos(angle)*r,z:tree.z+Math.sin(angle)*r};
  if(sceneryFits(p,.35,context,.6,1.9)&&outsideRoots(p,.30)&&!nearCrossing(p))add(i===2?'grass':'shrub',p,i===2?.9+random()*.6:.72+random()*.45,random()*6.28);
 }
 // The supplied meadow flowers are distinct from the story's lantern bloom.
 // Low clumps frame paths without sitting on a work surface or hiding hands.
 for(const [x,z,scale,rotation]of [[-9,-11.5,.42,.6],[10.9,10.8,.46,2.1],[11.2,9.5,.38,1.2],[15,-7,.43,2.8]]){
  const p={x:x!,z:z!};if(sceneryFits(p,.30,context,.55,1.6)&&outsideRoots(p,.30))add('flower-sculpture',p,scale!,rotation!);
 }
 // The planted seed remains its own handled object, with a quiet supplied
 // pebble margin that does not cover the hands or the seed's growth states.
 add('pebbles',anchors.garden.plant,PLANTING_BED.scale,0,terrainHeight(anchors.garden.plant)+.008);
 const border=makePathPlanting(context);
 for(const plant of border){const group=groups.get(plant.id)??[];group.push({position:[plant.point.x,plant.y,plant.point.z],scale:plant.scale,rotation:plant.rotation,normal:plant.normal});groups.set(plant.id,group);}
 const gardenPlants:{id:string;point:WorldPoint}[]=[];
 for(const plant of GARDEN_DECORATIVE_LANTERNS){add('flower-2',plant.point,plant.scale,plant.rotation);gardenPlants.push({id:'flower-2',point:plant.point});}
 // Small flowering and leafy beds accompany the lantern groups. The centre
 // remains open for Pip, Grandma, planting and the gathering's carried props.
 for(const [index,lantern]of GARDEN_DECORATIVE_LANTERNS.entries())for(let i=0;i<3;i++){
  const angle=lantern.rotation+i*2.4,point={x:lantern.point.x+Math.cos(angle)*.52,z:lantern.point.z+Math.sin(angle)*.52},id=i===0?'flower-sculpture':'grass',scale=i===0?.30+(index%3)*.045:1.0+(index%3)*.15;
  if(gardenDressingClear(point,.19,context)){add(id,point,scale,angle);gardenPlants.push({id,point});}
 }
 for(const [id,placements]of groups)review.scatter(id,parent,placements,{resident:true,castShadow:id!=='grass'&&id!=='shrub'});
 // Grass coverage was removed at Tony's request. The broad-leaf 'grass'
 // asset above remains a separate plant; source files are preserved.
 return {models:Object.fromEntries([...groups].map(([id,p])=>[id,p.length])),placements:[...groups].flatMap(([id,rows])=>rows.map(p=>({id,...p}))),pathBorder:{plants:border.length,models:Object.fromEntries(['grass','shrub'].map(id=>[id,border.filter(p=>p.id===id).length]))},gardenDecorations:gardenPlants,personalGrass:{stage:'removed',count:0},legacyScenery:0};
}
