import {WORLD,anchors,PLANTING_BED,terrainHeight,pointInPolygon,type WorldPoint} from '../worldLayout.js';
import {ringDistance,type SceneryContext} from '../sceneryLayout.js';
import {personalPathLayout,type PersonalPathLayout} from './personalPathLayout.js';

export type BorderPlant={id:'grass'|'shrub';point:WorldPoint;scale:number;rotation:number;radius:number;normal:readonly[number,number,number];y:number};
/** The asset called "grass" is the supplied broad-leaf succulent, not meadow
 * grass. Its source footprint is measured once; no new artwork is generated. */
const radii={grass:.173,shrub:.364} as const;

export function makePathPlanting(context:SceneryContext,layout:PersonalPathLayout=personalPathLayout):readonly BorderPlant[]{
 const result:BorderPlant[]=[],cells=new Map<string,BorderPlant[]>(),cellKey=(p:WorldPoint)=>`${Math.floor(p.x)},${Math.floor(p.z)}`;
 let seed=89131;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const nearby=(p:WorldPoint)=>{const plants:BorderPlant[]=[];for(let z=-1;z<=1;z++)for(let x=-1;x<=1;x++)plants.push(...cells.get(`${Math.floor(p.x)+x},${Math.floor(p.z)+z}`)??[]);return plants;};
 function place(id:BorderPlant['id'],point:WorldPoint,scale:number,rotation:number){
  const radius=radii[id]*scale;
  if(layout.routeDistance(point)<radius+.025
   ||!context.banks.some(bank=>pointInPolygon(point,bank)&&ringDistance(point,bank)>radius+.025)
   ||context.obstacles.some(obstacle=>pointInPolygon(point,obstacle)||ringDistance(point,obstacle)<radius+.10)
   ||context.clearings.some(p=>Math.hypot(point.x-p.x,point.z-p.z)<radius+.58)
   ||WORLD.trees.some(tree=>Math.hypot(point.x-tree.x,point.z-tree.z)<tree.radius+.06)
   ||nearby(point).some(plant=>Math.hypot(point.x-plant.point.x,point.z-plant.point.z)<(radius+plant.radius)*.60))return;
  const h=.06,sx=(terrainHeight({x:point.x+h,z:point.z})-terrainHeight({x:point.x-h,z:point.z}))/(2*h),sz=(terrainHeight({x:point.x,z:point.z+h})-terrainHeight({x:point.x,z:point.z-h}))/(2*h),length=Math.hypot(sx,1,sz);
  const plant:BorderPlant={id,point,scale,rotation,radius,normal:[-sx/length,1/length,-sz/length],y:terrainHeight(point)-.009};
  result.push(plant);const key=cellKey(point),cell=cells.get(key)??[];cell.push(plant);cells.set(key,cell);
 }
 for(const points of layout.samples.values())for(const side of [-1,1]){
  let next=.18+random()*.14,index=0;
  for(let i=1;i<points.length-1;i++){
   const p=points[i]!;if(p.distance<next)continue;next=p.distance+.27+random()*.08;
   const before=points[i-1]!,after=points[i+1]!,dx=after.x-before.x,dz=after.z-before.z,length=Math.hypot(dx,dz);if(length<1e-6)continue;
   const id=index++%4===2?'shrub':'grass',scale=id==='shrub'?.48+random()*.16:1.08+random()*.42;
   const offset=p.radius+radii[id]*scale+.035+random()*.035,nx=-dz/length*side,nz=dx/length*side;
   place(id,{x:p.x+nx*offset,z:p.z+nz*offset},scale,random()*Math.PI*2);
  }
 }
 return result;
}

/** Ten additional mature lantern plants decorate old story beds. These have
 * no pick targets, memory records, bloom actions or saved ownership. */
export const GARDEN_DECORATIVE_LANTERNS:readonly {point:WorldPoint;scale:number;rotation:number}[]=[
 [4.0,10.7,.67,.3],[4.0,11.4,.62,2.0],[4.65,13.5,.70,4.1],
 [6.1,13.25,.72,1.2],[7.3,15.0,.81,3.1],[8.2,14.2,.68,5.2],
 [9.45,12.85,.78,.7],[9.7,11.95,.68,2.7],
 [10.3,8.0,.72,4.4],[9.6,9.0,.67,5.7],
].map(([x,z,scale,rotation])=>({point:{x:x!,z:z!},scale:scale!,rotation:rotation!}));

export function gardenDressingClear(point:WorldPoint,radius:number,context:SceneryContext){
 return context.banks.some(bank=>pointInPolygon(point,bank)&&ringDistance(point,bank)>radius)
  &&!context.obstacles.some(obstacle=>pointInPolygon(point,obstacle)||ringDistance(point,obstacle)<radius+.06)
  &&personalPathLayout.routeDistance(point)>radius+.06
  &&context.clearings.every(p=>Math.hypot(point.x-p.x,point.z-p.z)>radius+.45)
  &&Math.hypot(point.x-anchors.garden.plant.x,point.z-anchors.garden.plant.z)>PLANTING_BED.radius+PLANTING_BED.clearance+radius
  &&WORLD.trees.every(tree=>Math.hypot(point.x-tree.x,point.z-tree.z)>tree.radius+radius*.4);
}
