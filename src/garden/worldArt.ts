import * as T from 'three';
import {PaperArt} from './art.js';
import {personalGrass} from './assets/profile.js';
import {attachPersonalRiver} from './assets/personalRiverSurface.js';
import {attachPersonalPaths} from './assets/personalPathSurface.js';
import {WORLD,anchors,riverCenter,riverHalfWidth,navigable,terrainHeight,WATER_SURFACE_Y,type WorldPoint} from './worldLayout.js';

/** Cheap visibility probes against the original crown bounds, never the
 * temporarily reduced display matrices. No triangle picking or per-tree rays. */
export function makeCanopySight(){
 const caster=new T.Raycaster(),screen=new T.Vector3(),point=new T.Vector3(),hit=new T.Vector3(),ndc=new T.Vector2();
 const probes:{ray:T.Ray;distance:number}[]=[];let count=0;
 return {
  aim(camera:T.Camera,targets:readonly (WorldPoint&{y:number})[]){
   count=targets.length;
   for(let i=0;i<count;i++){
    const target=targets[i]!;point.set(target.x,target.y,target.z);screen.copy(point).project(camera);ndc.set(screen.x,screen.y);caster.setFromCamera(ndc,camera);
    const probe=probes[i]??= {ray:new T.Ray(),distance:0};probe.ray.copy(caster.ray);probe.distance=probe.ray.origin.distanceTo(point);
   }
  },
  blocks(bounds:readonly T.Sphere[]){
   for(let i=0;i<count;i++){const probe=probes[i]!;for(const sphere of bounds)if(probe.ray.intersectSphere(sphere,hit)&&probe.ray.origin.distanceTo(hit)<probe.distance-.08)return true;}
   return false;
  },
 };
}

function surface(a:PaperArt,parent:T.Group,points:readonly WorldPoint[],color:string,y:number,depth:number){
 const shape=a.shape(parent,points.map(p=>[p.x,-p.z]),depth,color);shape.rotation.x=-Math.PI/2;shape.position.y=y;return shape;
}
function path(a:PaperArt,root:T.Group,points:readonly WorldPoint[],width:number,color:string,lift:number){
 const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(p.x,.155,p.z))),vertices:number[]=[];
 for(let i=0;i<100;i++){
  const p=curve.getPoint(i/100),q=curve.getPoint((i+1)/100),d=q.clone().sub(p).normalize(),n=new T.Vector3(-d.z,0,d.x).multiplyScalar(width/2);
  for(const v of [p.clone().add(n),q.clone().add(n),p.clone().sub(n),q.clone().add(n),q.clone().sub(n),p.clone().sub(n)])vertices.push(v.x,terrainHeight(v)+lift,v.z);
 }
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.computeVertexNormals();a.mesh(geo,color,root);
}
function slopingBank(a:PaperArt,parent:T.Group,points:readonly WorldPoint[],color:string){
 const shape=new T.Shape(points.map(p=>new T.Vector2(p.x,-p.z))),flat=new T.ShapeGeometry(shape),position=flat.attributes['position']!,index=flat.index!,vertices:number[]=[];
 const vertex=(i:number):WorldPoint=>({x:position.getX(i),z:-position.getY(i)});
 function triangle(p:WorldPoint,q:WorldPoint,r:WorldPoint,depth=0){
  const corners=[p,q,r],lengths=corners.map((v,i)=>Math.hypot(v.x-corners[(i+1)%3]!.x,v.z-corners[(i+1)%3]!.z)),longest=Math.max(...lengths);
  if(longest>1.15&&depth<16){const i=lengths.indexOf(longest),u=corners[i]!,v=corners[(i+1)%3]!,w=corners[(i+2)%3]!,mid={x:(u.x+v.x)/2,z:(u.z+v.z)/2};triangle(u,mid,w,depth+1);triangle(mid,v,w,depth+1);return;}
  for(const v of corners)vertices.push(v.x,terrainHeight(v)-.015,v.z);
 }
 for(let i=0;i<index.count;i+=3)triangle(vertex(index.getX(i)),vertex(index.getX(i+1)),vertex(index.getX(i+2)));
 flat.dispose();const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();return a.mesh(geometry,color,parent);
}
/** Join the shared walking height to the earthen base. A raised top alone
 * exposes an open gap when the child lowers or rotates the camera. */
function bankSides(a:PaperArt,parent:T.Group,points:readonly WorldPoint[]){
 const vertices:number[]=[],area=points.reduce((sum,p,i)=>{const q=points[(i+1)%points.length]!;return sum+p.x*q.z-q.x*p.z;},0);
 function edge(p:WorldPoint,q:WorldPoint){
  // Match the top surface's boundary subdivision, so the two meshes meet.
  if(Math.hypot(p.x-q.x,p.z-q.z)>1.15){const mid={x:(p.x+q.x)/2,z:(p.z+q.z)/2};edge(p,mid);edge(mid,q);return;}
  const u=area>0?p:q,v=area>0?q:p,uy=terrainHeight(u)-.015,vy=terrainHeight(v)-.015,bottom=.025;
  vertices.push(u.x,uy,u.z,v.x,vy,v.z,u.x,bottom,u.z,v.x,vy,v.z,v.x,bottom,v.z,u.x,bottom,u.z);
 }
 points.forEach((p,i)=>edge(p,points[(i+1)%points.length]!));
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();a.mesh(geometry,'#b2ad7d',parent);
}
/** Development landscape. The exact bank polygons and paths also drive navigation and the review plan. */
export function makeRiversideLandscape(a:PaperArt,keepFurniture=false){
 const root=new T.Group(),currents=new T.Group(),terrain=new T.Group(),details=new T.Group(),navigationSurfaces:T.Mesh[]=[];root.add(terrain,details);
 const waterPoints:WorldPoint[]=[];
 for(let z=-24;z<=26;z+=.5)waterPoints.push({x:riverCenter(z)-riverHalfWidth(z)-.1,z});
 for(let z=26;z>=-24;z-=.5)waterPoints.push({x:riverCenter(z)+riverHalfWidth(z)+.1,z});
 if(!personalGrass)surface(a,terrain,waterPoints,'#68aaa5',WATER_SURFACE_Y-.15,.15);
 for(const bank of WORLD.banks){
  surface(a,terrain,bank.polygon,'#b2ad7d',-.45,.48);
  navigationSurfaces.push(slopingBank(a,root,bank.polygon,bank.id==='west'?'#93ae80':'#a7bb89'));
  bankSides(a,terrain,bank.polygon);
 }
 if(!personalGrass)for(const route of WORLD.paths){path(a,terrain,route.points,1.05,'#c5b58a',.04);path(a,terrain,route.points,.81,'#e0cea3',.05);}
 // Low, rounded stones give the banks a shoreline rather than an exposed platform edge.
 let seed=9461;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(let z=-19;!keepFurniture&&z<=21;z+=.72)for(const side of [-1,1]){
  if(z> -2.5&&z<3.7||z>-15&&z<-13.1)continue;
  const x=riverCenter(z)+side*(riverHalfWidth(z)+.13);
  a.ball(details,x,.02,z,.22+rand()*.11,'#a1a694',[1.5,.65,1]);
  if(rand()>.5)for(let i=0;i<3;i++){const stem=a.cylinder(details,x+side*.22+i*.06,.33,z+.08*i,.012,.02,.55,'#648967',5);stem.rotation.z=side*.18;}
 }
 for(let i=0;!personalGrass&&i<48;i++){
  const z=-20+i*.88,x=riverCenter(z)+Math.sin(i*1.6)*(riverHalfWidth(z)-.5);
  a.line(currents,[new T.Vector3(x-.20,-.076,z),new T.Vector3(x,-.074,z+.04),new T.Vector3(x+.3,-.076,z)],'#c2e0d2',.011);
 }
 // A working passenger dock reaches into the river. Its apron matches the navigation surface.
 const dock=new T.Group();dock.position.set(-3,0,-10);details.add(dock);
 for(let i=0;i<12;i++)a.box(dock,-2.65,.17,-4.8+i*.12,1.65,.09,.11,i%3?'#bd9c72':'#c8ab82');
 for(const x of [-3.38,-1.91])for(const z of [-4.75,-3.45]){a.cylinder(dock,x,.12,z,.065,.082,.85,'#836345');a.cylinder(dock,x,.43,z,.078,.078,.06,'#e3cc9a');}
 const office=new T.Group();office.position.set(-8.1,.12,-14.5);root.add(office);
 a.box(office,0,.58,0,1.30,1.16,1.15,'#ead6ac');
 for(const x of [-.66,.66])a.box(office,x,.57,0,.09,1.2,1.2,'#8e6b4e');
 const officeRoof=a.shape(office,[[-.88,1.1],[0,1.73],[.88,1.1]],1.5,'#b77658');officeRoof.position.z=-.75;
 a.box(office,0,.45,.59,.4,.90,.045,'#537d74');a.box(office,.44,.74,.59,.27,.34,.055,'#a7c8bb');
 const bell=new T.Group();bell.position.set(-7.3,.12,-13.4);details.add(bell);a.cylinder(bell,0,.62,0,.04,.055,1.24,'#8b7654');a.box(bell,.17,1.23,0,.41,.07,.09,'#8b7654');const bellBody=a.cylinder(bell,.32,1.03,0,.075,.13,.17,'#d0ac57');
 // The garden lives in a clearing beyond the bend; a pergola frames the entrance, not a closed wall.
 const garden=new T.Group();garden.position.set(3,0,8);details.add(garden);
 for(let i=0;i<3;i++)a.box(garden,5.15,.45,2.15+i*.13,1.22,.07,.11,'#a57b54');
 for(const x of [4.65,5.65])a.box(garden,x,.27,2.28,.08,.35,.3,'#546f57');a.box(garden,5.15,.83,2.10,1.25,.28,.065,'#ac8155');
 if(!keepFurniture){
  a.cylinder(details,anchors.garden.plant.x,.17,anchors.garden.plant.z,.42,.39,.11,'#806b47',16);
  for(let i=0;i<12;i++){const angle=i*Math.PI/6;a.ball(details,anchors.garden.plant.x+Math.cos(angle)*.43,.19,anchors.garden.plant.z+Math.sin(angle)*.43,.071,'#d8c1a0',[1,.65,1]);}
 }
 const arbor=new T.Group();details.add(arbor);
 for(const x of [4.6,6.4]){a.box(arbor,x,1.05,8.3,.14,1.9,.14,'#b3a17b');a.box(arbor,x,2.03,8.3,.26,.09,.30,'#d1bd94');}
 for(const z of [8.05,8.3,8.55])a.box(arbor,5.5,2.12,z,2.25,.10,.10,'#c4ae83');
 for(let i=0;i<9;i++)a.ball(arbor,4.6+i*.23,2.15+Math.sin(i)*.07,8.3,.21,'#6e956e',[1.6,.7,1]);
 if(keepFurniture)root.add(dock,garden,arbor,bell);
 // Reusable tree geometry is instanced: foliage responds as one shared draw per colour.
 const trunks:T.Matrix4[]=[],crowns:T.Matrix4[][]=[[],[],[]],treePoints:WorldPoint[]=[];
 for(const tree of keepFurniture?[]:WORLD.trees){
  const {x,z,height:h,scale,rotation}=tree;treePoints.push({x,z});
  const floor=terrainHeight(tree);trunks.push(new T.Matrix4().compose(new T.Vector3(x,floor+h*.45,z),new T.Quaternion(),new T.Vector3(.095,h,.095)));
  for(let level=0;level<3;level++)crowns[level]!.push(new T.Matrix4().compose(new T.Vector3(x,floor-.13+h*.55+.65+level*.43,z),new T.Quaternion().setFromEuler(new T.Euler(.06,rotation,.03)),new T.Vector3(scale*(1.3-level*.17),scale*(.74-level*.09),scale*(1.1-level*.11))));
 }
 function instance(geometry:T.BufferGeometry,color:string,matrices:T.Matrix4[]){a.resources.add(geometry);const mesh=new T.InstancedMesh(geometry,a.material(color),matrices.length);matrices.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;}
 instance(new T.CylinderGeometry(.7,1,1,7),'#806b4c',trunks);
 const leaves=crowns.map((matrices,i)=>instance(new T.IcosahedronGeometry(1,1),['#5c8467','#709974','#86aa7a'][i]!,matrices));
 // Meadow flowers stay off routes and interaction clearances.
 const flowers:T.Matrix4[]=[];
 for(let i=0;!keepFurniture&&i<380;i++){const x=-13+rand()*35,z=-18+rand()*37;if(!navigable({x,z})||Math.abs(x-riverCenter(z))<riverHalfWidth(z)+.4)continue;flowers.push(new T.Matrix4().compose(new T.Vector3(x,terrainHeight({x,z})+.06,z),new T.Quaternion(),new T.Vector3(.05,.14,.05)));}
 instance(new T.ConeGeometry(1,1,4),'#d5cf88',flowers);
 a.mergeStatic(terrain);a.mergeStatic(details);a.mergeStatic(currents);a.mergeStatic(office);
 const frameWorkshop=(_focused:boolean)=>{},frameGathering=(_focused:boolean)=>{};
 const canopyFactors=treePoints.map(()=>1),position=new T.Vector3(),rotation=new T.Quaternion(),scale=new T.Vector3(),matrix=new T.Matrix4(),sight=makeCanopySight();
 for(const mesh of leaves)mesh.geometry.computeBoundingSphere();
 const crownBounds=treePoints.map((_,i)=>crowns.map((list,level)=>leaves[level]!.geometry.boundingSphere!.clone().applyMatrix4(list[i]!)));
 function revealActivity(camera:T.Camera,actor:WorldPoint,focus:WorldPoint|undefined,reduced:boolean,activities:readonly (WorldPoint&{y:number})[]=[]){
  sight.aim(camera,[{...actor,y:terrainHeight(actor)+.72},...(focus?[{...focus,y:terrainHeight(focus)+.47}]:[]),...activities]);let changed=false;
  treePoints.forEach((_,i)=>{
   const blocked=sight.blocks(crownBounds[i]!);
   const target=blocked?.08:1,previous=canopyFactors[i]!,next=Math.abs(previous-target)<.005?target:previous+(target-previous)*(reduced?1:.18);if(next===previous)return;canopyFactors[i]=next;changed=true;
   crowns.forEach((group,level)=>{group[i]!.decompose(position,rotation,scale);scale.multiplyScalar(next);matrix.compose(position,rotation,scale);leaves[level]!.setMatrixAt(i,matrix);});
  });
  if(changed)for(const mesh of leaves){mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingBox();mesh.computeBoundingSphere();}
 }
 const sourceRiver=personalGrass?attachPersonalRiver(root):null;
 const sourcePaths=personalGrass?attachPersonalPaths(root,{assetBaseUrl:'/personal-landscape/path/'}):null;
 if(sourceRiver){a.resources.add(sourceRiver);for(const resource of sourceRiver.resources)a.resources.add(resource);void sourceRiver.ready.then(()=>{for(const resource of sourceRiver.resources)a.resources.add(resource);});}
 if(sourcePaths){a.resources.add(sourcePaths);void sourcePaths.ready.then(()=>{for(const resource of sourcePaths.resources)a.resources.add(resource);});}
 return {root,currents,office,dock,garden,arbor,bellBody,navigationSurfaces,frameWorkshop,frameGathering,revealActivity,treePoints,leaves,
  supportHeight(point:{x:number;z:number}){return sourcePaths?.supportHeight(point)??null;},
  update(timeSeconds:number,reducedMotion:boolean){sourceRiver?.update(timeSeconds,reducedMotion);},
  get readyState(){return [sourceRiver?.readyState??'ready',sourcePaths?.status.state??'ready'].join(':');},
  get errors(){return [...(sourceRiver?.errors??[]),...(sourcePaths?.errors??[])];},
 };
}
