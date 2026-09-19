import * as T from 'three';
import {PaperArt} from '../art.js';
import {WORLD,terrainHeight,anchors,navigable} from '../worldLayout.js';
import {makeNaturalBoundary} from './naturalBoundary.js';
import {makeCanopySight} from '../worldArt.js';

/** Locally authored finish for Form review. Shared textures, no purchased assets. */
export function makePaintedVillageKit(art:PaperArt){
 const root=new T.Group();root.name='painted-village-kit-review';
 let seed=14687;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const paper=document.createElement('canvas');paper.width=paper.height=256;const context=paper.getContext('2d')!;
 context.fillStyle='#eee7da';context.fillRect(0,0,256,256);
 for(let i=0;i<2300;i++){const c=205+Math.floor(rand()*45);context.fillStyle=`rgba(${c},${c},${c},.18)`;context.fillRect(rand()*256,rand()*256,1+rand()*18,.4+rand()*2.3);}
 const texture=new T.CanvasTexture(paper);texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=T.RepeatWrapping;art.resources.add(texture);
 const material=(color:string)=>{const m=art.material(color).clone();m.map=texture;m.roughness=.95;m.flatShading=false;art.resources.add(m);return m;};
 const wood=material('#9c7351'),leafMats=['#497956','#639060','#86a76c'].map(material),rockMat=material('#989a87');
 const boundary=makeNaturalBoundary(art,{earth:material('#9aad78'),stone:rockMat,leaves:leafMats});root.add(boundary.root);
 const leafGeo=new T.SphereGeometry(1,12,8),rockGeo=new T.IcosahedronGeometry(1,1);art.resources.add(leafGeo);art.resources.add(rockGeo);
 const leafMatrices:T.Matrix4[][]=[[],[],[]],stoneMatrices:T.Matrix4[]=[],brushMatrices:T.Matrix4[]=[],trunkMatrices:T.Matrix4[]=[];
 const branches=new T.Group();root.add(branches);
 const matrix=(x:number,y:number,z:number,sx:number,sy:number,sz:number,turn=0)=>new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromEuler(new T.Euler(0,turn,0)),new T.Vector3(sx,sy,sz));
 const pathClearance=(p:{x:number;z:number})=>Math.min(...WORLD.paths.flatMap(route=>route.points.slice(1).map((to,i)=>{const from=route.points[i]!,dx=to.x-from.x,dz=to.z-from.z,t=Math.max(0,Math.min(1,((p.x-from.x)*dx+(p.z-from.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(p.x-from.x-t*dx,p.z-from.z-t*dz);})));
 for(const [i,tree]of WORLD.trees.entries()){
  const floor=terrainHeight(tree),h=tree.height,willow=i%4===0;
  trunkMatrices.push(matrix(tree.x,floor+h*.45,tree.z,1,h,1));
  for(let j=0;j<(willow?8:5);j++){
   const angle=j*2.399+tree.rotation,r=.3+(j%3)*.16;
   const x=tree.x+Math.cos(angle)*r,z=tree.z+Math.sin(angle)*r,y=floor+h*.72+.6+(j%3)*.20;
   leafMatrices[j%3]!.push(matrix(x,y-(willow?.1:0),z,tree.scale*(willow?.43:.78),tree.scale*(willow?1.05:.58),tree.scale*(willow?.43:.76),angle));
   if(j<3)art.line(branches,[new T.Vector3(tree.x,floor+h*.55,tree.z),new T.Vector3(x,y-.15,z)],'#8e7453',.033);
  }
 }
 for(let i=0;i<170;i++){
  const p={x:-13+rand()*35,z:-18+rand()*37};
  if(!navigable(p)||pathClearance(p)<1.35||Object.values(anchors).some(a=>'person' in a&&Math.hypot(p.x-a.person.x,p.z-a.person.z)<2.5))continue;
  if(i%5===0)stoneMatrices.push(matrix(p.x,terrainHeight(p)+.09,p.z,.18+rand()*.25,.12+rand()*.1,.2+rand()*.2,rand()*6));
  else brushMatrices.push(matrix(p.x,terrainHeight(p)+.16,p.z,.18+rand()*.20,.13+rand()*.14,.21+rand()*.18,rand()*6));
 }
 const instanced=(geo:T.BufferGeometry,mat:T.Material,transforms:T.Matrix4[])=>{const mesh=new T.InstancedMesh(geo,mat,transforms.length);transforms.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;};
 const trunkGeometry=new T.CylinderGeometry(.07,.12,1,7);art.resources.add(trunkGeometry);instanced(trunkGeometry,wood,trunkMatrices);art.mergeStatic(branches);
 const crowns=leafMatrices.map((m,i)=>instanced(leafGeo,leafMats[i]!,m));instanced(rockGeo,rockMat,stoneMatrices);instanced(leafGeo,leafMats[0]!,brushMatrices);
 for(const mesh of crowns){mesh.computeBoundingBox();mesh.computeBoundingSphere();}
 // Practical village details are scenery, never compulsory collection chores.
 const details=new T.Group();root.add(details);
 for(const [x,z,turn]of [[-6.8,-12.7,.3],[8.5,12.4,-.4],[17.2,2.5,1.3]] as const){
  const bed=new T.Group();bed.position.set(x,terrainHeight({x,z}),z);bed.rotation.y=turn;details.add(bed);
  art.box(bed,0,.23,0,.82,.10,.34,'#ae8459');for(const dx of [-.30,.30])art.box(bed,dx,.11,0,.08,.22,.28,'#7e6c50');
  for(let j=0;j<4;j++)art.box(bed,-.30+j*.20,.29,0,.18,.025,.35,'#c09a6c');
 }
 for(const p of [{x:5.1,z:8.8},{x:6,z:8.9},{x:20.8,z:1.6},{x:10.5,z:-10.8}]){
  const pot=art.cylinder(details,p.x,terrainHeight(p)+.17,p.z,.17,.11,.32,'#b17857',12);pot.receiveShadow=true;
  for(let j=0;j<5;j++){const a=j*1.26;art.ball(details,p.x+Math.cos(a)*.12,terrainHeight(p)+.37+(j%2)*.1,p.z+Math.sin(a)*.12,.14,'#719463',[.7,1,.7]);}
 }
 art.mergeStatic(details);
 const factors=leafMatrices.map(m=>m.map(()=>1)),position=new T.Vector3(),quaternion=new T.Quaternion(),scale=new T.Vector3(),pose=new T.Matrix4(),sight=makeCanopySight();
 leafGeo.computeBoundingSphere();const crownBounds=leafMatrices.map(list=>list.map(matrix=>[leafGeo.boundingSphere!.clone().applyMatrix4(matrix)]));
 function revealActivity(camera:T.Camera,actor:{x:number;z:number},focus:{x:number;z:number}|undefined,reduced:boolean,activities:readonly {x:number;y:number;z:number}[]=[]){
  sight.aim(camera,[{...actor,y:terrainHeight(actor)+.7},...(focus?[{...focus,y:terrainHeight(focus)+.4}]:[]),...activities]);
  leafMatrices.forEach((list,level)=>{let changed=false;list.forEach((original,i)=>{
   const obscures=sight.blocks(crownBounds[level]![i]!);
   const target=obscures?.08:1,old=factors[level]![i]!,next=Math.abs(target-old)<.005?target:old+(target-old)*(reduced?1:.18);if(old===next)return;factors[level]![i]=next;
   original.decompose(position,quaternion,scale);pose.compose(position,quaternion,scale.multiplyScalar(next));crowns[level]!.setMatrixAt(i,pose);changed=true;
  });if(changed)crowns[level]!.instanceMatrix.needsUpdate=true;});
 }
 function paintSurfaces(...groups:T.Object3D[]){
  const finishes=new Map<T.Material,T.MeshStandardMaterial>();
  for(const group of groups)group.traverse(object=>{
   if(!(object instanceof T.Mesh)||!(object.material instanceof T.MeshStandardMaterial))return;
   let finish=finishes.get(object.material);if(!finish){finish=object.material.clone();finish.map=texture;finish.roughness=.95;finishes.set(object.material,finish);art.resources.add(finish);}object.material=finish;
   if(!object.geometry.getAttribute('uv')){const geometry=object.geometry.clone(),p=geometry.getAttribute('position'),uv=new Float32Array(p.count*2);for(let i=0;i<p.count;i++){uv[i*2]=p.getX(i)*.65;uv[i*2+1]=p.getZ(i)*.65;}geometry.setAttribute('uv',new T.BufferAttribute(uv,2));object.geometry=geometry;art.resources.add(geometry);}
  });
 }
 return {root,texture,revealActivity,paintSurfaces,boundary,description:'Painted terrain, trees, wood and roofs, shrubs, benches and pots, with low natural embankments, rounded stones and hedges around the authored outer banks. River edges and path clearances stay open; layout and navigation unchanged.'};
}
