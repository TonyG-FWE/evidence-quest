import type * as T from 'three';
import {VILLAGE_BUILDINGS} from '../worldLayout.js';
import {personalGrass} from './profile.js';
import {attachPersonalMemoryLandscape,type PersonalMemoryLandscapeOptions} from './personalMemoryLandscape.js';
import type {VisualAssetLibrary} from './visualAsset.js';

export type PersonalStoryLandscape=ReturnType<typeof attachPersonalMemoryLandscape>;
type Clearing={x:number;z:number;radius:number};

/** Cover the actual furniture footprint with overlapping circular exclusions. */
function rectangle(minX:number,maxX:number,minZ:number,maxZ:number):Clearing[]{
 const columns=Math.max(1,Math.ceil((maxX-minX)/.75)),rows=Math.max(1,Math.ceil((maxZ-minZ)/.75));
 const width=(maxX-minX)/columns,depth=(maxZ-minZ)/rows,radius=Math.hypot(width,depth)/2+.10;
 return Array.from({length:columns*rows},(_,index)=>({x:minX+(index%columns+.5)*width,z:minZ+(Math.floor(index/columns)+.5)*depth,radius}));
}
const person=(x:number,z:number):Clearing=>({x,z,radius:.48});
const flower=(x:number,z:number):Clearing=>({x,z,radius:.44});

/** Local composition coordinates match StoryProps, not the live village.
 * These exclusions are visual clearings; they do not change actions or routes. */
export function personalStoryLandscapeOptions(kind:string):PersonalMemoryLandscapeOptions{
 const bakery=['bread','thanks','both','draft'].includes(kind);
 const bounds=bakery?{minX:-4.4,maxX:4.4,minZ:-6.3,maxZ:2.3}:{minX:-3,maxX:3,minZ:-1.7,maxZ:1.7};
 if(['duet','repair','promise','delivery'].includes(kind))return {kind,bounds,groundY:0,
  // Review presentation offset only; native hull/dock waterline review remains
  // pending. The supplied support surfaces continue to place every actor.
  water:{x:0,z:0,width:6,depth:3.4,y:-.08},clearings:[]};
 let clearings:Clearing[];
 if(bakery){
  const building=VILLAGE_BUILDINGS.bakery,footprint=building.footprint.map(point=>({x:point.x-building.position[0]-.65,z:point.z-building.position[2]-3.3}));
  clearings=[...rectangle(Math.min(...footprint.map(p=>p.x)),Math.max(...footprint.map(p=>p.x)),Math.min(...footprint.map(p=>p.z)),Math.max(...footprint.map(p=>p.z))),
   ...rectangle(.3,2.1,-.65,.75),{x:-2.55,z:.65,radius:.38},{x:-2.14,z:.65,radius:.38},person(1.8,1.35)];
  // Rina's complete authored walk runs from x=-.65 to 1.05 at z=1.35.
  for(const x of [-.65,-.225,.2,.625,1.05])clearings.push(person(x,1.35));
 }else if(kind==='picnic'||kind==='bench')clearings=[]; // Original grass continues beneath static furniture and around standing feet.
 else if(kind==='waiting-flower'||kind==='planting')clearings=[flower(0,.3),...(kind==='planting'?[person(-.65,.3),person(.7,.3)]:[])];
 else clearings=[flower(-2.3,.9),flower(2.4,.9)];
 return {kind,bounds,groundY:0,clearings};
}

export function attachPersonalStoryLandscape(parent:T.Object3D,library:VisualAssetLibrary,kind:string):PersonalStoryLandscape|null{
 return personalGrass?attachPersonalMemoryLandscape(parent,library,personalStoryLandscapeOptions(kind)):null;
}
