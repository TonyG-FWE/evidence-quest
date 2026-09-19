import {CatmullRomCurve3,Matrix4,Quaternion,Vector3} from 'three';
import {WORLD,terrainHeight,pointInPolygon,type WorldPoint} from '../worldLayout.js';
import supportSource from '../../../output/personal-landscape-20260918/path/path-support.json';

export type PersonalPathRoute={readonly id:string;readonly points:readonly WorldPoint[];readonly width?:number};
export type PersonalPathSegment={a:WorldPoint;b:WorldPoint;radius:number;distance:number;routeId:string};
export type PersonalPathSample=WorldPoint&{distance:number;radius:number};
export const PERSONAL_PATH_ROUTES:readonly PersonalPathRoute[]=[...WORLD.paths];
const key=(x:number,z:number)=>`${Math.floor(x/2)},${Math.floor(z/2)}`;

/** Shared fitted corridor data. No renderer, asset loading, or browser state. */
export function makePersonalPathLayout(routes:readonly PersonalPathRoute[]=PERSONAL_PATH_ROUTES){
 const segments:PersonalPathSegment[]=[],samples=new Map<string,PersonalPathSample[]>(),cells=new Map<string,PersonalPathSegment[]>();
 for(const route of routes){
  if(route.points.length<2)continue;
  const curve=new CatmullRomCurve3(route.points.map(p=>new Vector3(p.x,0,p.z))),count=Math.max(4,Math.ceil(curve.getLength()/.12)),points:PersonalPathSample[]=[];
  let distance=0;
  for(let i=0;i<=count;i++){const p=curve.getPointAt(i/count),last=points[points.length-1];if(last)distance+=Math.hypot(p.x-last.x,p.z-last.z);points.push({x:p.x,z:p.z,distance,radius:(route.width??1.02)/2+.018*Math.sin(distance*1.8)+.008*Math.sin(distance*4.7)});}
  samples.set(route.id,points);
  for(let i=1;i<points.length;i++){
   const a=points[i-1]!,b=points[i]!,segment={a,b,radius:(a.radius+b.radius)/2,distance:a.distance,routeId:route.id};segments.push(segment);
   for(let z=Math.floor((Math.min(a.z,b.z)-1.2)/2);z<=Math.floor((Math.max(a.z,b.z)+1.2)/2);z++)for(let x=Math.floor((Math.min(a.x,b.x)-1.2)/2);x<=Math.floor((Math.max(a.x,b.x)+1.2)/2);x++){const cellKey=`${x},${z}`,list=cells.get(cellKey)??[];list.push(segment);cells.set(cellKey,list);}
  }
 }
 function routeDistance(point:WorldPoint){
  let nearest=Infinity;
  for(const {a,b,radius}of cells.get(key(point.x,point.z))??[]){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.z-a.z)*dz)/(dx*dx+dz*dz)));nearest=Math.min(nearest,Math.hypot(point.x-a.x-t*dx,point.z-a.z-t*dz)-radius);}
  return nearest;
 }
 return {routes,segments,samples,routeDistance,contains:(point:WorldPoint,margin=0)=>routeDistance(point)<=margin};
}

export const personalPathLayout=makePersonalPathLayout();
export function personalPathDistance(point:WorldPoint){return personalPathLayout.routeDistance(point);}
export function personalPathContains(point:WorldPoint,margin=0){return personalPathDistance(point)<=margin;}
/** A shallow rounded shoulder, always supported by the authoritative terrain. */
export function personalPathSurfaceHeight(point:WorldPoint,insideDistance=-personalPathLayout.routeDistance(point)){
 const edge=Math.max(0,Math.min(1,insideDistance/.09));return terrainHeight(point)+.006+.010*edge*edge*(3-2*edge);
}

export type PersonalPathLayout=ReturnType<typeof makePersonalPathLayout>;
export type PersonalPathStonePlacement={point:WorldPoint;scale:number;yaw:number;variant:number;matrix:Float32Array};
export type PersonalPathPlacementOptions={includePoint?:(point:WorldPoint)=>boolean};
export function personalPathPointAllowed(point:WorldPoint){return WORLD.banks.some(bank=>pointInPolygon(point,bank.polygon))&&!WORLD.obstacles.some(obstacle=>pointInPolygon(point,obstacle.polygon));}

/** These exact matrices are shared by the visible stones and foot support.
 * Float32 quantization matches InstancedMesh's instanceMatrix representation. */
export function makePersonalPathStonePlacements(layout:PersonalPathLayout=personalPathLayout,options:PersonalPathPlacementOptions={}):readonly PersonalPathStonePlacement[]{
 const allowed=options.includePoint??personalPathPointAllowed,placements:PersonalPathStonePlacement[]=[];
 let seed=316734;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const normal=new Vector3(),up=new Vector3(0,1,0),tilt=new Quaternion(),turn=new Quaternion(),rotation=new Quaternion(),position=new Vector3(),scaleVector=new Vector3(),matrix=new Matrix4();
 for(const points of layout.samples.values()){
  let next=.48+random()*.5;
  for(let i=1;i<points.length-1;i++){
   const p=points[i]!;if(p.distance<next)continue;next=p.distance+1.02+random()*.34;
   const previous=points[i-1]!,following=points[i+1]!,dx=following.x-previous.x,dz=following.z-previous.z,length=Math.hypot(dx,dz),offset=(random()-.5)*.19,point={x:p.x-dz/length*offset,z:p.z+dx/length*offset};
   if(!allowed(point)||layout.routeDistance(point)>-.25||placements.some(other=>Math.hypot(other.point.x-point.x,other.point.z-point.z)<.72))continue;
   const scale=supportSource.sourceDisplayScale*(.74+random()*.25),yaw=random()*Math.PI*2,variant=Math.floor(random()*supportSource.stones.length),step=.05;
   const slopeX=(terrainHeight({x:point.x+step,z:point.z})-terrainHeight({x:point.x-step,z:point.z}))/(step*2),slopeZ=(terrainHeight({x:point.x,z:point.z+step})-terrainHeight({x:point.x,z:point.z-step}))/(step*2);
   normal.set(-slopeX,1,-slopeZ).normalize();tilt.setFromUnitVectors(up,normal);turn.setFromAxisAngle(up,yaw);rotation.copy(tilt).multiply(turn);
   position.set(point.x,personalPathSurfaceHeight(point,-layout.routeDistance(point))-.004,point.z);scaleVector.setScalar(scale);matrix.compose(position,rotation,scaleVector);
   placements.push({point,scale,yaw,variant,matrix:new Float32Array(matrix.elements)});
  }
 }
 return placements;
}
let defaultPlacements:readonly PersonalPathStonePlacement[]|undefined;
export function getPersonalPathStonePlacements(){return defaultPlacements??=makePersonalPathStonePlacements();}

type ContactMesh={positions:Float64Array;indices:Uint16Array;minX:number;maxX:number;minZ:number;maxZ:number};
function decodedBytes(base64:string){const value=atob(base64),bytes=new Uint8Array(value.length);for(let i=0;i<value.length;i++)bytes[i]=value.charCodeAt(i);return bytes;}
let decodedSupport:readonly {positions:Float32Array;indices:Uint16Array}[]|undefined;
function sourceSupport(){
 return decodedSupport??=supportSource.stones.map(source=>({positions:new Float32Array(decodedBytes(source.vertices).buffer),indices:new Uint16Array(decodedBytes(source.indices).buffer)}));
}

function triangleSupport(positions:ArrayLike<number>,a:number,b:number,c:number,point:WorldPoint):number|null{
 const ax=positions[a]!,az=positions[a+2]!,bx=positions[b]!,bz=positions[b+2]!,cx=positions[c]!,cz=positions[c+2]!,den=(bz-cz)*(ax-cx)+(cx-bx)*(az-cz);
 if(Math.abs(den)<1e-12)return null;
 const wa=((bz-cz)*(point.x-cx)+(cx-bx)*(point.z-cz))/den,wb=((cz-az)*(point.x-cx)+(ax-cx)*(point.z-cz))/den,wc=1-wa-wb;
 return Math.min(wa,wb,wc)>=-1e-7?wa*positions[a+1]!+wb*positions[b+1]!+wc*positions[c+1]!:null;
}

/** Build once from the renderer's emitted Float32 soil positions. Clipped
 * borders and triangle interpolation are therefore identical to the visible
 * mesh; the analytic route field is never used as invisible foot support. */
export function makePersonalPathSoilSupport(positions:ArrayLike<number>){
 const cell=.25,cells=new Map<string,number[]>(),cellKey=(x:number,z:number)=>`${Math.floor(x/cell)},${Math.floor(z/cell)}`;
 for(let i=0;i<positions.length;i+=9){
  const minX=Math.min(positions[i]!,positions[i+3]!,positions[i+6]!),maxX=Math.max(positions[i]!,positions[i+3]!,positions[i+6]!),minZ=Math.min(positions[i+2]!,positions[i+5]!,positions[i+8]!),maxZ=Math.max(positions[i+2]!,positions[i+5]!,positions[i+8]!);
  for(let z=Math.floor(minZ/cell);z<=Math.floor(maxZ/cell);z++)for(let x=Math.floor(minX/cell);x<=Math.floor(maxX/cell);x++){const key=`${x},${z}`,list=cells.get(key)??[];list.push(i);cells.set(key,list);}
 }
 return (point:WorldPoint):number|null=>{
  let height=-Infinity;
  for(const offset of cells.get(cellKey(point.x,point.z))??[]){const support=triangleSupport(positions,offset,offset+3,offset+6,point);if(support!==null)height=Math.max(height,support);}
  return Number.isFinite(height)?height:null;
 };
}

/** Highest actual source triangle beneath a world point. The small contact
 * payload carries only indexed Float32 positions: no artwork or duplicated UVs.
 * Soil is included only when its actual emitted-triangle query is supplied.
 * Bridge and dock support remains with those existing scene objects. */
export function makePersonalPathFootSupport(_layout:PersonalPathLayout=personalPathLayout,placements:readonly PersonalPathStonePlacement[]=getPersonalPathStonePlacements(),_options:PersonalPathPlacementOptions={},soilSupport:(point:WorldPoint)=>number|null=()=>null){
 const cells=new Map<string,ContactMesh[]>(),sources=sourceSupport();
 for(const placement of placements){
  const source=sources[placement.variant]!,world=new Float64Array(source.positions.length),m=placement.matrix;
  const contact:ContactMesh={positions:world,indices:source.indices,minX:Infinity,maxX:-Infinity,minZ:Infinity,maxZ:-Infinity};
  for(let i=0;i<source.positions.length;i+=3){
   const x=source.positions[i]!,y=source.positions[i+1]!,z=source.positions[i+2]!,wx=m[0]!*x+m[4]!*y+m[8]!*z+m[12]!,wy=m[1]!*x+m[5]!*y+m[9]!*z+m[13]!,wz=m[2]!*x+m[6]!*y+m[10]!*z+m[14]!;
   world[i]=wx;world[i+1]=wy;world[i+2]=wz;contact.minX=Math.min(contact.minX,wx);contact.maxX=Math.max(contact.maxX,wx);contact.minZ=Math.min(contact.minZ,wz);contact.maxZ=Math.max(contact.maxZ,wz);
  }
  for(let z=Math.floor(contact.minZ/2);z<=Math.floor(contact.maxZ/2);z++)for(let x=Math.floor(contact.minX/2);x<=Math.floor(contact.maxX/2);x++){const cellKey=`${x},${z}`,list=cells.get(cellKey)??[];list.push(contact);cells.set(cellKey,list);}
 }
 return (point:WorldPoint):number|null=>{
  let height=soilSupport(point)??-Infinity;
  for(const mesh of cells.get(key(point.x,point.z))??[]){
   if(point.x<mesh.minX||point.x>mesh.maxX||point.z<mesh.minZ||point.z>mesh.maxZ)continue;
   for(let i=0;i<mesh.indices.length;i+=3){
    const support=triangleSupport(mesh.positions,mesh.indices[i]!*3,mesh.indices[i+1]!*3,mesh.indices[i+2]!*3,point);if(support!==null)height=Math.max(height,support);
   }
  }
  return Number.isFinite(height)?height:null;
 };
}
let defaultFootSupport:ReturnType<typeof makePersonalPathFootSupport>|undefined;
/** Pure stone-only contact. Scene walking uses the attached path handle's
 * supportHeight to include its exact emitted soil and lifecycle state. */
export function personalPathFootSupport(point:WorldPoint):number|null{return (defaultFootSupport??=makePersonalPathFootSupport())(point);}
