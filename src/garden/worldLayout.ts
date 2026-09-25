/** The shared landscape contract. Units are metres; bridge pieces use the crossing's local frame. */
import {localReview} from './assets/profile.js';
import {createReviewTrees} from './sceneryLayout.js';
export type WorldPoint={x:number;z:number};
export type RegionId='dock'|'crossing'|'garden'|'bakery'|'workshop'|'lane';
export type Polygon=readonly WorldPoint[];
export type WorldTree=WorldPoint&{height:number;scale:number;rotation:number;radius:number};
const p=(x:number,z:number):WorldPoint=>({x,z});
const polygon=(pairs:readonly (readonly [number,number])[]):Polygon=>pairs.map(([x,z])=>p(x,z));
export const LAYOUT_VERSION=2 as const;
export const WALK_SPEED=1.7;
export const DOCK_PASSENGER_EXITS=[{x:-8.65,z:-12.95},{x:-8.35,z:-13.25}] as const;
export const WATER_SURFACE_Y=-.09;
// PaperArt's existing bevel extends 2 cm above the nominal extruded surface.
export const WATER_TOP_Y=WATER_SURFACE_Y+.02;
export const WATER_CUE_Y=WATER_TOP_Y+.025;
export const PLANTING_BED={scale:localReview?2:1,radius:localReview?.66:.33,clearance:.26,seedRadius:localReview?.60:.30} as const;
/** One frame for both source-derived bridge halves and their six sockets.
 * Walking planks finish at native Z +/-.62; outer Z scale makes a 1.55m span. */
export const BRIDGE_GEOMETRY={
 halfLength:.62*1.25,length:2*.62*1.25,walkHalfWidth:.38,
 envelopeHalfLength:localReview?.775*1.25:.775,envelopeHalfWidth:.56,
 // The four original socket floors differ slightly. Seat installed posts on
 // their measured floors; these offsets include normalization and outer Y.
 postOffset:localReview?.315*1.42:.51,postInsertion:localReview?.007:.02,
 socketFloor:{negative:{north:.00556747689001,south:.0047968192035475},positive:{north:.0017321228538628,south:.0049596885454841}},
 modelOffset:.03,modelScale:[1.42,.40,1.25] as const,modelYaw:Math.PI/2,
 centerPostScale:[.42,1.2,.29] as const,endPostScale:[.38,1.1,.38] as const,
 sourceSurface:localReview?.13462385136527454:.14690698435387234,knotScale:[.48,.70,.48] as const,
} as const;
/** Supplied deck centre surfaces measured without modifying either source.
 * Both crossings share raised bank landings and boat clearance. */
export const BRIDGE_LEVELS={deck:localReview?.99:.13,rise:localReview?.86:0,base:.13,rampLength:8.5,landingDepth:.35,landingHalfWidth:.65,crossings:[-2,3] as readonly number[],sourceSurface:{a:BRIDGE_GEOMETRY.sourceSurface,b:localReview?BRIDGE_GEOMETRY.sourceSurface:.12462385136527454},minimumUnderside:localReview?.99-BRIDGE_GEOMETRY.sourceSurface+BRIDGE_GEOMETRY.modelOffset:0,ropeAboveDeck:.49} as const;
export function bridgeBankHeight(point:WorldPoint):number{
 if(!localReview)return .13;
 const smooth=(v:number)=>{const t=Math.max(0,Math.min(1,v));return t*t*(3-2*t);};
 let height=BRIDGE_LEVELS.crossings.reduce((highest,z)=>{
  const along=Math.max(0,Math.abs(point.x-riverCenter(z))-riverHalfWidth(z)-BRIDGE_LEVELS.landingDepth),across=Math.max(0,Math.abs(point.z-z)-BRIDGE_LEVELS.landingHalfWidth);
  // Distance from each level landing gives a maximum ramp grade of
  // 1.5 * .86 / 8.5 = .152, below 1:6, including the rounded shoulders.
  return Math.max(highest,BRIDGE_LEVELS.base+BRIDGE_LEVELS.rise*smooth(1-Math.hypot(along,across)/BRIDGE_LEVELS.rampLength));
 },BRIDGE_LEVELS.base);
 // The far shoulders taper into level activity aprons. They do not lift the
 // gathering seats, bakery shelf or their hand-contact supports.
 for(const p of LEVEL_WORK_AREAS){const d=Math.max(0,Math.hypot(point.x-p.x,point.z-p.z)-.75);height=Math.min(height,BRIDGE_LEVELS.base+(d-.2*(1-Math.exp(-d/.2)))/6);}
 return height;
}
export const WORLD_WORKBENCH={x:localReview?13.1:11,z:localReview?-10:-9.1,y:.92,width:2.3,depth:1.45} as const;
export const WORKBENCH_APPROACH={x:WORLD_WORKBENCH.x,z:WORLD_WORKBENCH.z+WORLD_WORKBENCH.depth/2+.60};
/** Uniform outer model transforms. The fronts face the working aprons, with
 * adult-sized doorways; measured roof/overhang bounds include actor clearance. */
export const VILLAGE_BUILDINGS={
 dock:{position:[-9.4,.13,-16] as const,rotation:-Math.PI/2,scale:1.8,footprint:polygon([[-12.02,-18.35],[-6.78,-18.35],[-6.78,-13.65],[-12.02,-13.65]])},
 workshop:{position:[8.7,.13,-15.2] as const,rotation:-Math.PI/2,scale:2.7,footprint:polygon([[5.88,-19.43],[11.52,-19.43],[11.52,-10.97],[5.88,-10.97]])},
 bakery:{position:[17.7,.13,-3.1] as const,rotation:-Math.PI/2,scale:1.84,footprint:polygon([[14.20,-5.85],[21.20,-5.85],[21.20,-.35],[14.20,-.35]])},
};
/** Source contacts measured with the former 1.8 uniform outer scale. Keep
 * their common building pivot when correcting doorway clearance. */
export const bakeryContactScale=VILLAGE_BUILDINGS.bakery.scale/1.8;
export function bakerySourceContact(x:number,y:number,z:number){const b=VILLAGE_BUILDINGS.bakery;return {x:b.position[0]+(x-17.7)*bakeryContactScale,y:b.position[1]+(y-.13)*bakeryContactScale,z:b.position[2]+(z+3.1)*bakeryContactScale};}
// Source-mesh probes bind the opening, fitted tile and native ladder. The
// opening floor is lower than the shingles; pointer dragging uses that actual
// source surface rather than a horizontal plane above the roof.
export const REVIEW_BAKERY_REPAIR={
 gap:{x:19.25,y:4.10,z:-2.22},beside:{x:18.10,y:4.10,z:-2.22},
 dropHalf:{x:.46,z:.30},openingY:3.69,rotation:[.70,0,0] as const,tileScale:1.25,
 ladder:{x:19.2394700532946,y:.13,z:-.2425242389218354,scale:1.525,yaw:5.084970115502541},
 ladderFoot:{x:19.25,y:.13,z:.50},ladderTop:{x:19.25,y:3.3151266412104947,z:-1.0579490152546909},
 solTop:{x:19.25,y:3.815558225334185,z:-1.60},
} as const;
export const BAKERY_REPAIR:{gap:{x:number;y:number;z:number};beside:{x:number;y:number;z:number};tileScale:number;rotation:readonly[number,number,number];openingY:number;dropHalf:{x:number;z:number};ladder:typeof REVIEW_BAKERY_REPAIR.ladder;ladderFoot:typeof REVIEW_BAKERY_REPAIR.ladderFoot;ladderTop:typeof REVIEW_BAKERY_REPAIR.ladderTop;solTop:typeof REVIEW_BAKERY_REPAIR.solTop}=localReview?REVIEW_BAKERY_REPAIR:{...REVIEW_BAKERY_REPAIR,gap:{x:18.45,y:1.92,z:-.70},beside:{x:19.16,y:1.92,z:-.70},tileScale:1,rotation:[0,0,0],openingY:1.92,dropHalf:{x:.27,z:.27}};
export function roofDropTarget(point:WorldPoint):'gap'|'beside'|null{
 // Adjacent rows on the supplied sloped roof are recoverable misplaced drops.
 // Only the unchanged, tighter opening area can seal the leak.
 for(const name of ['gap','beside'] as const){const target=BAKERY_REPAIR[name],depth=localReview&&name==='beside'?.9:BAKERY_REPAIR.dropHalf.z;if(Math.abs(point.x-target.x)<=BAKERY_REPAIR.dropHalf.x&&Math.abs(point.z-target.z)<=depth)return name;}
 return null;
}
const priorBuildings=[
 polygon([[-8.95,-15.3],[-7.15,-15.3],[-7.15,-13.7],[-8.95,-13.7]]),
 polygon([[8.35,-12.6],[10.45,-12.6],[10.45,-10.65],[8.35,-10.65]]),
 polygon([[18.1,-1.7],[20.6,-1.7],[20.6,.65],[18.1,.65]]),
];
export const offsets={dock:p(-3,-10),garden:p(3,8),bakery:p(11,2),workshop:p(5,-8),crossing:p(0,0)} as const;
export function translated(point:WorldPoint,offset:WorldPoint):WorldPoint{return p(point.x+offset.x,point.z+offset.z);}
export const anchors={
 dock:{person:p(-6.5,-14),approach:p(-6.5,-13.05),boat:p(-4.1,-14.1),safe:p(-6.5,-13.05)},
 crossing:{approach:p(-2.8,.8),safe:p(-3.5,-1.8),materials:p(-2.8,1.75),wide:p(0,-2),narrow:p(0,3)},
 garden:{person:localReview?p(5.65,11.55):p(7.4,11.6),approach:localReview?p(5.1,12.35):p(6.25,11.2),plant:p(6.75,11.55),safe:localReview?p(5.1,12.35):p(6.25,11.2)},
 bakery:{person:p(19.5,1.3),approach:p(18.05,1.45),building:p(19.25,-.15),sol:p(18.05,.5),shelf:localReview?p(16.7,2.45):p(20.15,1.6),safe:p(18.05,1.45)},
 workshop:{person:p(9.5,-10.15),approach:p(8.55,-9.4),safe:p(8.55,-9.4)},
 boat:{launch:p(-1.4,.8),landing:p(2.58,9.2)},
 gathering:{mara:p(7.4,8.4),sol:p(8.2,8.1),approach:p(7,8.1)},
} as const;
const LEVEL_WORK_AREAS=[...Object.entries(anchors).filter(([area])=>!['crossing','boat'].includes(area)).flatMap(([,group])=>Object.values(group)),{x:anchors.boat.landing.x+.70,z:anchors.boat.landing.z}];

/** Separate working areas leave the ladder and the public approach clear. Both
 * scene placement and physical gesture targets use these same coordinates. */
export const BAKERY_WORK=localReview?{
 table:{x:19.25,y:.13,z:3.20},tableScale:[1.4,.82,1.45] as const,tableTop:.773542,
 mixing:{x:18.55,y:.92,z:3.20},preparation:{x:19.65,y:.92,z:3.20},discard:{x:20.03,y:.80,z:3.45},
 oven:{x:22,y:.13,z:.45,yaw:-Math.PI/2},ovenTarget:{x:22,z:.83},
 dryFlour:{x:21,y:.13,z:3.85},flourSetdown:{x:20.35,z:4.15},
 threatenedFlour:{x:18.10,y:1.128,z:-1.13},
 mixingActor:{x:18.55,z:2.20},preparationActor:{x:19.65,z:2.20},ovenActor:{x:22,z:1.40},
 toolkit:{x:18.45,y:.26,z:-.10},
 tileApproach:{x:17.5,z:2.45},
}:{
 table:{x:19.55,y:.13,z:.65},tableScale:[.70,.785,.80] as const,tableTop:.734,mixing:{x:19.45,y:.89,z:.65},preparation:{x:19.45,y:.89,z:.65},discard:{x:19.03,y:.80,z:.50},
 oven:{x:19.75,y:.13,z:-.45,yaw:0},ovenTarget:{x:19.7,z:-.2},
 dryFlour:{x:20.22,y:0,z:.17},flourSetdown:{x:20.03,z:.72},
 threatenedFlour:bakerySourceContact(18.85,1.115,-1.13),
 mixingActor:{x:19.5,z:1.3},preparationActor:{x:19.5,z:1.3},ovenActor:{x:19.5,z:1.3},toolkit:{x:18.25,y:.26,z:1},tileApproach:anchors.bakery.shelf,
};
/** Child standing places are on the clear side of each working surface, never
 * at its centre or inside the adult's body. Rendering and input share them. */
export const BAKERY_APPROACHES={
 flour:localReview?{x:21,z:4.65}:anchors.bakery.approach,
 mixing:localReview?{x:18.55,z:4.25}:anchors.bakery.approach,
 preparation:localReview?{x:19.65,z:4.25}:anchors.bakery.approach,
 oven:localReview?{x:22,z:1.65}:anchors.bakery.approach,
};
/** The preparation canopy covers the table, flour and the child's working side.
 * Its four posts are real navigation obstacles, outside all work approaches. */
export const BAKERY_SHELTER={left:17.45,right:21.95,back:1.60,front:5.05,backY:3.0,frontY:2.60,
 posts:[{x:17.60,z:1.75},{x:21.65,z:1.75},{x:17.60,z:4.90},{x:21.80,z:4.90}]} as const;
/** The oven's authored mouth faces +X before this shared outer yaw. */
export function bakeryOvenPoint(forward:number,lateral:number,y:number){const o=BAKERY_WORK.oven,c=Math.cos(o.yaw),s=Math.sin(o.yaw);return {x:o.x+forward*c+lateral*s,y,z:o.z-forward*s+lateral*c};}
const rect=(center:WorldPoint,halfX:number,halfZ:number):Polygon=>polygon([[center.x-halfX,center.z-halfZ],[center.x+halfX,center.z-halfZ],[center.x+halfX,center.z+halfZ],[center.x-halfX,center.z+halfZ]]);
/** Measured complete bench footprint, including the seated back and actor
 * clearance. Native +X faces out from its seat. */
export const GARDEN_BENCHES=(localReview?[
 {id:'garden-bench',x:8.15,z:10.28,yaw:Math.PI*1.5},
 {id:'garden-bench-south',x:7.8,z:13.3,yaw:Math.atan2(1.75,-1.05)},
]:[{id:'garden-bench',x:8.15,z:10.28,yaw:Math.PI/2}]).map(bench=>({...bench,scale:[.7,.78,1] as const,footprint:polygon([[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,z])=>{
 const u=x!*(.4663166*.7+.22),v=z!*(.85+.22),c=Math.cos(bench.yaw),s=Math.sin(bench.yaw);return [bench.x+u*c+v*s,bench.z-u*s+v*c] as const;
}))}));
export const GARDEN_STORAGE={x:8.95,z:9.18};
/** Raised supplied woodland terrace. Its full source envelope plus Pip's body
 * clearance is shared by visible placement, routes and current-save recovery. */
export const WOODLAND_TERRACE={position:[-1.35,-.18,13.9] as const,scale:.65,footprint:rect({x:-1.35,z:13.9},1.195,1.378)};
/** Two distinct supplied shores sit downstream of both boat routes. Only the
 * raised plants/rocks plus actor clearance block walking; submerged water in
 * the original meshes must not become a large invisible obstacle. */
export const DOWNSTREAM_SHORES=[
 {id:'coastal-bank',position:[1.15,-.5,15.5] as const,yaw:Math.PI/2,footprint:polygon([[-.603,12.760],[.618,12.760],[.618,17.903],[-.603,17.903]])},
 {id:'riverbank',position:[3.55,-.5,18.7] as const,yaw:-Math.PI/2,footprint:polygon([[4.147,16.406],[5.246,16.406],[5.246,20.880],[4.147,20.880]])},
] as const;
/** Two supplied plank slopes meet over the boat rail, then descend onto its
 * existing bench. Neither walking passenger crosses a gap or the hull wall. */
export const PASSENGER_GANGWAY={
 position:[anchors.dock.boat.x-1.13,.035,anchors.dock.boat.z] as const,
 outer:{offset:[0,0,0] as const,scale:[1.1/1.4,1.65,.46/.46302] as const,yaw:Math.PI},
 inner:{offset:[.755,.330,0] as const,scale:[.68/1.4,.33,.46/.46302] as const,yaw:0},
};
const TERRACE_OBSTACLES=localReview?[{id:'woodland-terrace',polygon:WOODLAND_TERRACE.footprint},...DOWNSTREAM_SHORES.map(s=>({id:s.id,polygon:s.footprint}))]:[];
/** Source furniture bounds, including clearance for Pip's body. */
export const BAKERY_OBSTACLES=localReview?[
 {id:'bakery-oven',polygon:rect(BAKERY_WORK.oven,.76,.70)},
 {id:'bakery-preparation',polygon:rect(BAKERY_WORK.table,1.34,.73)},
 {id:'bakery-tile-shelf',polygon:rect(anchors.bakery.shelf,.57,.39)},
 ...BAKERY_SHELTER.posts.map((point,i)=>({id:`bakery-canopy-post-${i}`,polygon:rect(point,.20,.20)})),
]:[];

/** Straight through both construction sites; bends belong to the stretches beyond them. */
export function riverCenter(z:number){
 if(z< -3)return -Math.min(3.1,(-3-z)*.235);
 if(z>4)return Math.sin(Math.min(Math.PI,(z-4)*.105))*2.45;
 return 0;
}
export function riverHalfWidth(z:number){
 if(z< -3)return 2.2+Math.min(.55,(-3-z)*.045);
 if(z>4)return 1.4+Math.min(.35,(z-4)*.055);
 return 2.2-.8*Math.max(0,Math.min(1,(z+2)/5));
}
const bankEdge=(side:number)=>Array.from({length:85},(_,i)=>{const z=-20+i*.5;return p(riverCenter(z)+side*(riverHalfWidth(z)+(Math.min(Math.abs(z-3),Math.abs(z+2))<=.5?.10:.17)),z);});
const westOutline=polygon([[-13,-20],[-16,-16],[-15,-10],[-11,-6],[-9,0],[-11,7],[-10,13],[-7,19],[-3,22]]);
const eastOutline=polygon([[6,-20],[12,-19],[16,-15],[15,-10],[21,-6],[24,0],[22,6],[17,8],[13,14],[10,21],[4,22]]);
const westBank:Polygon=[...bankEdge(-1),...westOutline.slice().reverse()];
const eastBank:Polygon=[...bankEdge(1),...eastOutline.slice().reverse()];
export const WORLD={
 version:LAYOUT_VERSION,
 bounds:{minX:-16,maxX:24,minZ:-20,maxZ:22},
 terrain:{baseHeight:.13,rises:[
  {center:p(-8,-7),radius:5.2,height:.75},
  {center:p(11.6,4.2),radius:6.0,height:localReview?.70:.95},
  {center:p(6.5,-4.2),radius:4.2,height:.55},
  {center:p(9,17),radius:5.5,height:1.3},
 ]},
 banks:[{id:'west',polygon:westBank},{id:'east',polygon:eastBank}],
 regions:[
  {id:'dock' as const,name:'Passenger dock',polygon:polygon([[-13,-19],[-4,-19],[-3,-10],[-10,-9]]),safe:anchors.dock.safe},
  {id:'crossing' as const,name:'Storm crossings',polygon:polygon([[-8,-5],[5,-5],[5,6],[-8,6]]),safe:anchors.crossing.safe},
  {id:'garden' as const,name:'Grandma’s garden',polygon:polygon([[4,7],[12,7],[13,15],[5,16]]),safe:anchors.garden.safe},
  {id:'bakery' as const,name:'Rina’s bakery',polygon:polygon([[16,-4],[23,-4],[23,5],[16,5]]),safe:anchors.bakery.safe},
  {id:'workshop' as const,name:'Sol’s workshop',polygon:polygon([[6,-14],[13,-14],[14,-6],[6,-6]]),safe:anchors.workshop.safe},
  {id:'lane' as const,name:'Village lane',polygon:polygon([[5,-6],[17,-6],[20,5],[10,8],[5,5]]),safe:p(10,2)},
 ],
 // Actor clearance is included in these footprints. Rendering uses the corresponding anchor.
 obstacles:[
  {id:'dock-office',polygon:localReview?VILLAGE_BUILDINGS.dock.footprint:priorBuildings[0]!},
  {id:'workbench',polygon:polygon([[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,z])=>[WORLD_WORKBENCH.x+x!*(WORLD_WORKBENCH.width/2+.05),WORLD_WORKBENCH.z+z!*(WORLD_WORKBENCH.depth/2+.075)] as const))},
  {id:'workshop',polygon:localReview?VILLAGE_BUILDINGS.workshop.footprint:priorBuildings[1]!},
  {id:'bakery',polygon:localReview?VILLAGE_BUILDINGS.bakery.footprint:priorBuildings[2]!},
  ...BAKERY_OBSTACLES,
  ...TERRACE_OBSTACLES,
  ...(localReview?GARDEN_BENCHES.map(bench=>({id:bench.id,polygon:bench.footprint})):[{id:'garden-bench',polygon:polygon([[7.35,9.85],[9.0,9.85],[9.0,10.7],[7.35,10.7]])}]),
  {id:'planting-bed',polygon:Array.from({length:12},(_,i)=>p(anchors.garden.plant.x+Math.cos(i*Math.PI/6)*(PLANTING_BED.radius+PLANTING_BED.clearance),anchors.garden.plant.z+Math.sin(i*Math.PI/6)*(PLANTING_BED.radius+PLANTING_BED.clearance)))},
 ],
 connections:[{id:'footbridge',from:'west',to:'east',condition:'bridgeAttemptable',width:.76}],
 paths:[
  {id:'dock-approach',points:[anchors.dock.approach,p(-7,-9),p(-4.5,-5),p(-3.5,-1.8),anchors.crossing.approach]},
  {id:'garden-path',points:[p(1.9,3),p(3.8,4.2),p(5.2,7.2),p(localReview?5:5.5,10.3),anchors.garden.approach]},
  {id:'village-lane',points:[anchors.garden.approach,...(localReview?[p(5,10.3)]:[]),p(9.5,6.3),p(14.7,3),anchors.bakery.approach]},
  {id:'workshop-lane',points:localReview?[anchors.bakery.approach,p(13.7,.35),p(13.6,-5.9),p(12.5,-6.5),anchors.workshop.approach]:[anchors.bakery.approach,p(16,-3),p(12.5,-6.5),anchors.workshop.approach]},
  {id:'riverside-shortcut',points:[p(3.8,4.2),p(4.4,-1.7),p(6,-6),anchors.workshop.approach]},
 ],
 landmarks:[{id:'dock-bell',point:p(-7.3,-13.4)},{id:'garden-arbor',point:p(5.5,8.3)},{id:'oven-chimney',point:p(19.7,-1.2)},{id:'workshop-wind-vane',point:p(9.7,-11.2)}],
 get trees():readonly WorldTree[]{return TREES;},
} as const;

/** Gentle walking slopes, with level working areas and a low river shoreline.
 * Rendered ground, routes and actor contact use this same height field. */
export function terrainHeight(point:WorldPoint):number{
 const smooth=(n:number)=>{const t=Math.max(0,Math.min(1,n));return t*t*(3-2*t);};
 let level=1;
 for(const anchor of Object.values(anchors))if('person' in anchor)level=Math.min(level,smooth((Math.hypot(point.x-anchor.person.x,point.z-anchor.person.z)-2.5)/1.4));
 for(const anchor of Object.values(anchors.gathering))level=Math.min(level,smooth((Math.hypot(point.x-anchor.x,point.z-anchor.z)-1.2)/1.4));
 if(localReview)for(const p of LEVEL_WORK_AREAS)level=Math.min(level,smooth((Math.hypot(point.x-p.x,point.z-p.z)-.75)/1));
 const shore=smooth((Math.abs(point.x-riverCenter(point.z))-riverHalfWidth(point.z)-.2)/1.6);
 const rise=WORLD.terrain.rises.reduce((sum,hill)=>sum+hill.height*smooth(1-Math.hypot(point.x-hill.center.x,point.z-hill.center.z)/hill.radius),0);
 return Math.max(WORLD.terrain.baseHeight+rise*level*shore,bridgeBankHeight(point));
}

function segmentDistance(point:WorldPoint,a:WorldPoint,b:WorldPoint){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(point.x-a.x-t*dx,point.z-a.z-t*dz);}
const TREES:WorldTree[]=(()=>{
 if(localReview)return [...createReviewTrees({banks:WORLD.banks.map(b=>b.polygon),obstacles:WORLD.obstacles.map(o=>o.polygon),paths:WORLD.paths.map(path=>path.points),clearings:Object.values(anchors).flatMap(a=>Object.values(a))})];
 let seed=9461;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;},trees:WorldTree[]=[];
 for(let i=0;i<200;i++){
  const point=p(-15+random()*39,-20+random()*42);
  if(!WORLD.banks.some(b=>pointInPolygon(point,b.polygon))||[...priorBuildings,...WORLD.obstacles.filter(o=>!['dock-office','workshop','bakery'].includes(o.id)).map(o=>o.polygon)].some(p=>pointInPolygon(point,p)))continue;
  // Keep the original seeded grove stable while clearing the revised lane.
  if(WORLD.paths.map(route=>route.id==='workshop-lane'?{points:[anchors.bakery.approach,p(16,-3),p(12.5,-6.5),anchors.workshop.approach]}:route).some(route=>route.points.slice(1).some((to,i)=>segmentDistance(point,route.points[i]!,to)<1.7)))continue;
  if(Object.values(anchors).some(anchor=>'person' in anchor&&Math.hypot(anchor.person.x-point.x,anchor.person.z-point.z)<3.3))continue;
  if(Math.abs(point.x)<4.5&&point.z>-4&&point.z<5||trees.some(tree=>Math.hypot(tree.x-point.x,tree.z-point.z)<2.3))continue;
  trees.push({...point,height:1.5+random()*1.25,scale:.65+random()*.55,rotation:random()*6.28,radius:.32});
 }return trees.filter(tree=>!WORLD.obstacles.some(o=>pointInPolygon(tree,o.polygon))&&!WORLD.paths.some(route=>route.points.slice(1).some((to,i)=>segmentDistance(tree,route.points[i]!,to)<1.7)));
})();

export function pointInPolygon(point:WorldPoint,ring:Polygon){
 let inside=false;
 for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const a=ring[i]!,b=ring[j]!;
  const cross=(point.x-a.x)*(b.z-a.z)-(point.z-a.z)*(b.x-a.x);
  if(Math.abs(cross)<1e-8&&point.x>=Math.min(a.x,b.x)-1e-8&&point.x<=Math.max(a.x,b.x)+1e-8&&point.z>=Math.min(a.z,b.z)-1e-8&&point.z<=Math.max(a.z,b.z)+1e-8)return true;
  if((a.z>point.z)!==(b.z>point.z)&&point.x<(b.x-a.x)*(point.z-a.z)/(b.z-a.z)+a.x)inside=!inside;
 }
 return inside;
}
export function regionAt(point:WorldPoint):RegionId{return WORLD.regions.find(r=>pointInPolygon(point,r.polygon))?.id??(point.x<riverCenter(point.z)?'crossing':'lane');}
export type NavigationSurfaces=WorldPoint|readonly Polygon[];
function bridgePolygons(bridge?:NavigationSurfaces):readonly Polygon[]{
 if(!bridge)return [];
 if(Array.isArray(bridge))return bridge as readonly Polygon[];
 const center=bridge as WorldPoint;
 return [polygon([[center.x-2.15,center.z-.38],[center.x+2.15,center.z-.38],[center.x+2.15,center.z+.38],[center.x-2.15,center.z+.38]])];
}
export function navigable(point:WorldPoint,bridge?:NavigationSurfaces){
 if(!Number.isFinite(point.x)||!Number.isFinite(point.z))return false;
 if(WORLD.obstacles.some(o=>pointInPolygon(point,o.polygon)))return false;
 if(WORLD.trees.some(tree=>Math.hypot(point.x-tree.x,point.z-tree.z)<tree.radius))return false;
 // The service apron is real deck over water, with an open land-side approach.
 const dock=point.x>=-6.4&&point.x<=-4.84&&point.z>=-14.75&&point.z<=-13.44;
 const deck=bridgePolygons(bridge).some(surface=>pointInPolygon(point,surface));
 return dock||deck||WORLD.banks.some(b=>pointInPolygon(point,b.polygon));
}
/** Current-demo saves can predate the larger houses. Move only a previously
 * open point enclosed by a new footprint to its nearest clear edge. */
export function clearExpandedBuilding(point:WorldPoint):WorldPoint|null{
 if(!localReview)return null;
 if(!point||!Number.isFinite(point.x)||!Number.isFinite(point.z)||priorBuildings.some(p=>pointInPolygon(point,p)))return null;
 const footprint=WORLD.obstacles.map(o=>o.polygon).find(p=>pointInPolygon(point,p));
 if(!footprint){
  const tree=WORLD.trees.find(tree=>Math.hypot(point.x-tree.x,point.z-tree.z)<tree.radius);if(!tree)return null;
  return Array.from({length:16},(_,i)=>p(tree.x+Math.cos(i*Math.PI/8)*(tree.radius+.12),tree.z+Math.sin(i*Math.PI/8)*(tree.radius+.12))).filter(q=>navigable(q)&&regionAt(q)===regionAt(point)).sort((a,b)=>Math.hypot(a.x-point.x,a.z-point.z)-Math.hypot(b.x-point.x,b.z-point.z))[0]??null;
 }
 const xs=footprint.map(p=>p.x),zs=footprint.map(p=>p.z);
 return [p(Math.min(...xs)-.12,point.z),p(Math.max(...xs)+.12,point.z),p(point.x,Math.min(...zs)-.12),p(point.x,Math.max(...zs)+.12)].filter(q=>navigable(q)&&regionAt(q)===regionAt(point)).sort((a,b)=>Math.hypot(a.x-point.x,a.z-point.z)-Math.hypot(b.x-point.x,b.z-point.z))[0]??null;
}
/** Exact edge intersections split a route into intervals on the same surface.
 * This also catches a thin obstruction between the old fixed sample points. */
function edgeCuts(from:WorldPoint,to:WorldPoint,ring:Polygon):number[]{
 const rx=to.x-from.x,rz=to.z-from.z,length2=rx*rx+rz*rz,cuts:number[]=[];
 if(!length2)return cuts;
 for(let i=0;i<ring.length;i++){
  const a=ring[i]!,b=ring[(i+1)%ring.length]!,sx=b.x-a.x,sz=b.z-a.z,ax=a.x-from.x,az=a.z-from.z,denominator=rx*sz-rz*sx;
  if(Math.abs(denominator)<1e-10){
   if(Math.abs(ax*rz-az*rx)>1e-9)continue;
   for(const q of [a,b]){const t=((q.x-from.x)*rx+(q.z-from.z)*rz)/length2;if(t>=0&&t<=1)cuts.push(t);}
  }else{
   const t=(ax*sz-az*sx)/denominator,u=(ax*rz-az*rx)/denominator;
   if(t>=0&&t<=1&&u>=0&&u<=1)cuts.push(t);
  }
 }
 return cuts;
}
const dockSurface=polygon([[-6.4,-14.75],[-4.84,-14.75],[-4.84,-13.44],[-6.4,-13.44]]);
export function segmentClear(from:WorldPoint,to:WorldPoint,bridge?:NavigationSurfaces){
 if(!navigable(from,bridge)||!navigable(to,bridge))return false;
 if(WORLD.trees.some(tree=>segmentDistance(tree,from,to)<tree.radius))return false;
 if(WORLD.obstacles.some(obstacle=>edgeCuts(from,to,obstacle.polygon).length))return false;
 const surfaces:Polygon[]=[...WORLD.banks.map(bank=>bank.polygon),dockSurface];
 surfaces.push(...bridgePolygons(bridge));
 const cuts=[0,1,...surfaces.flatMap(surface=>edgeCuts(from,to,surface))].sort((a,b)=>a-b);
 for(let i=1;i<cuts.length;i++){
  if(cuts[i]!-cuts[i-1]!<1e-10)continue;const t=(cuts[i]!+cuts[i-1]!)/2;
  if(!navigable(p(from.x+(to.x-from.x)*t,from.z+(to.z-from.z)*t),bridge))return false;
 }
 return true;
}
const staticNodes:WorldPoint[]=[
 ...WORLD.paths.flatMap(path=>path.points),...WORLD.regions.map(r=>r.safe),
 ...WORLD.obstacles.flatMap(o=>{const center=o.polygon.reduce((sum,v)=>p(sum.x+v.x/o.polygon.length,sum.z+v.z/o.polygon.length),p(0,0));return o.polygon.map(v=>{const dx=v.x-center.x,dz=v.z-center.z,d=Math.hypot(dx,dz);return p(v.x+dx/d*.18,v.z+dz/d*.18);});}),
 p(-2.7,3),p(2.4,3),p(-3,-2),p(3,-2),p(-2.8,4.6),p(3.3,4.6),p(-6.5,-13),
];
/** Visibility routing across authored polygon surfaces; no rectangular room bounds or teleport links. */
export function findRoute(from:WorldPoint,to:WorldPoint,bridge?:NavigationSurfaces):WorldPoint[]{
 if(!navigable(from,bridge)||!navigable(to,bridge))return [];
 if(segmentClear(from,to,bridge))return [{...to}];
 const treeCorners=WORLD.trees.filter(tree=>segmentDistance(tree,from,to)<tree.radius+1.7).flatMap(tree=>{const r=tree.radius+.18;return [p(tree.x-r,tree.z-r),p(tree.x+r,tree.z-r),p(tree.x+r,tree.z+r),p(tree.x-r,tree.z+r)];});
 const deckNodes=bridgePolygons(bridge).map(surface=>surface.reduce((sum,v)=>p(sum.x+v.x/surface.length,sum.z+v.z/surface.length),p(0,0)));
 const nodes=[from,to,...[...staticNodes,...treeCorners,...deckNodes].filter(n=>navigable(n,bridge))];
 const costs=nodes.map(()=>Infinity),previous=nodes.map(()=>-1),used=new Set<number>();costs[0]=0;
 for(let n=0;n<nodes.length;n++){
  let current=-1;for(let i=0;i<nodes.length;i++)if(!used.has(i)&&(current<0||costs[i]!<costs[current]!))current=i;
  if(current<0||!Number.isFinite(costs[current])||current===1)break;used.add(current);
  for(let i=0;i<nodes.length;i++){
   if(used.has(i)||i===current)continue;
   const a=nodes[current]!,b=nodes[i]!,cost=costs[current]!+Math.hypot(a.x-b.x,a.z-b.z);
   if(cost<costs[i]!&&segmentClear(a,b,bridge)){costs[i]=cost;previous[i]=current;}
  }
 }
 if(!Number.isFinite(costs[1]))return [];
 const path:WorldPoint[]=[];for(let i=1;i>0;i=previous[i]!)path.unshift({...nodes[i]!});return path;
}
/** Encounter offsets preserve local precision. Bank-side positions are never moved across the river. */
export function legacyRegion(point:WorldPoint):Exclude<RegionId,'lane'>{
 if(point.x>6.6)return 'bakery';
 if(point.x>0&&point.z< -1.15)return 'workshop';
 if(point.x>2.8&&point.z>=0)return 'garden';
 if(point.x<0&&point.z< -2.8)return 'dock';
 return 'crossing';
}
export function relocateLegacyPoint(point:WorldPoint){return translated(point,offsets[legacyRegion(point)]);}
export function safeInRegion(point:WorldPoint,region:RegionId,bridge?:WorldPoint){
 if(navigable(point,bridge))return point;
 const bank=point.x<riverCenter(point.z)?-1:1;
 const area=WORLD.regions.find(r=>r.id===region)!;
 const candidates=[area.safe,...staticNodes].filter(v=>pointInPolygon(v,area.polygon)&&navigable(v,bridge)&&(v.x<riverCenter(v.z)?-1:1)===bank);
 const safe=candidates.sort((a,b)=>Math.hypot(a.x-point.x,a.z-point.z)-Math.hypot(b.x-point.x,b.z-point.z))[0];
 if(!safe)throw new Error('No safe position in the saved encounter and bank. Original save retained.');
 return safe;
}
