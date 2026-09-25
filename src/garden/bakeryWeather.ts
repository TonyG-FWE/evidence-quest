import * as T from 'three';
import type {PaperArt} from './art.js';
import {BAKERY_SHELTER as shelter,VILLAGE_BUILDINGS,pointInPolygon} from './worldLayout.js';

/** Local rain respects the same solid roofs shown in the scene. The repaired
 * indoor leak is separate, so outdoor weather continues after the repair. */
export function bakeryRainFloor(x:number,z:number){
 if(pointInPolygon({x,z},VILLAGE_BUILDINGS.bakery.footprint))return 5.8;
 if(x>=shelter.left&&x<=shelter.right&&z>=shelter.back&&z<=shelter.front)return shelter.backY+(shelter.frontY-shelter.backY)*(z-shelter.back)/(shelter.front-shelter.back);
 return .16;
}

export function makeBakeryWeather(a:PaperArt,parent:T.Group){
 const canopy=new T.Group(),frame=new T.Group(),cloth=new T.Group();canopy.add(frame,cloth);parent.add(canopy);
 const yAt=(z:number)=>shelter.backY+(shelter.frontY-shelter.backY)*(z-shelter.back)/(shelter.front-shelter.back);
 for(const p of shelter.posts){
  const y=yAt(p.z);a.cylinder(frame,p.x,(y+.13)/2,p.z,.065,.085,y-.13,'#926743');
  a.box(frame,p.x,.21,p.z,.24,.16,.24,'#b6a07b');
  for(const sign of [-1,1])a.line(frame,[new T.Vector3(p.x,y-.45,p.z),new T.Vector3(p.x+sign*.30,y-.06,p.z)],'#aa7d50',.034);
 }
 for(const z of [shelter.back,shelter.front])a.line(frame,[new T.Vector3(shelter.left,yAt(z),z),new T.Vector3(shelter.right,yAt(z),z)],'#ac8053',.055);
 for(const x of [shelter.left,shelter.right])a.line(frame,[new T.Vector3(x,shelter.backY,shelter.back),new T.Vector3(x,shelter.frontY,shelter.front)],'#ac8053',.045);
 const width=(shelter.right-shelter.left)/10,materials:T.MeshStandardMaterial[]=[];
 for(let i=0;i<10;i++){
  const x=shelter.left+i*width,geometry=new T.BufferGeometry(),v:number[]=[];
  // Slightly bowed cloth and a scalloped edge retain the bakery's striped style.
  for(let j=0;j<8;j++){
   const z0=shelter.back+(shelter.front-shelter.back)*j/8,z1=shelter.back+(shelter.front-shelter.back)*(j+1)/8;
   const y=(z:number)=>yAt(z)-.055*Math.sin((z-shelter.back)/(shelter.front-shelter.back)*Math.PI);
   v.push(x,y(z0),z0,x+width,y(z0),z0,x,y(z1),z1,x+width,y(z0),z0,x+width,y(z1),z1,x,y(z1),z1);
  }
  geometry.setAttribute('position',new T.Float32BufferAttribute(v,3));geometry.computeVertexNormals();a.resources.add(geometry);
  const material=new T.MeshStandardMaterial({color:i%2?'#e8dfba':'#57968d',roughness:.94,side:T.DoubleSide,transparent:true,depthWrite:false});a.resources.add(material);materials.push(material);
  const roof=new T.Mesh(geometry,material);roof.receiveShadow=true;cloth.add(roof);
  const fringe=a.shape(frame,[[0,0],[width,0],[width,-.14],[width*.75,-.18],[width*.5,-.20],[width*.25,-.18],[0,-.14]],.02,i%2?'#e8dfba':'#57968d');fringe.position.set(x,shelter.frontY,shelter.front);
 }
 a.mergeStatic(frame);
 const frameMaterials:T.MeshStandardMaterial[]=[];
 frame.traverse(node=>{if(node instanceof T.Mesh){const material=(node.material as T.MeshStandardMaterial).clone();material.transparent=true;material.depthWrite=false;a.resources.add(material);node.material=material;frameMaterials.push(material);}});
 const count=300,vertices=new Float32Array(count*6),geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(vertices,3));a.resources.add(geometry);
 const material=new T.LineBasicMaterial({color:'#639ca8',transparent:true,opacity:.48,depthWrite:false});a.resources.add(material);
 const rain=new T.LineSegments(geometry,material);rain.frustumCulled=false;parent.add(rain);
 const drops=Array.from({length:count},(_,i)=>({x:13.6+((i*83)%307)/307*11.0,z:-6.8+((i*139)%311)/311*13,phase:((i*47)%313)/313}));
 function update(time:number,reducedMotion:boolean,working:boolean,visible:boolean){
  canopy.visible=visible;rain.visible=visible;
  // The same cutaway convention as the bakery exposes hands and ingredients.
  // A visible frame, striped valance and translucent cloth retain the shelter.
  for(const m of materials)m.opacity=working?.14:.92;
  for(const m of frameMaterials)m.opacity=working?.35:1;
  for(let i=0;i<drops.length;i++){
   const d=drops[i]!,floor=bakeryRainFloor(d.x,d.z),height=6.7-floor,phase=(d.phase+(reducedMotion?0:time*.56))%1,y=floor+(1-phase)*height;
   // Rain above a transparent cutaway would appear to fall onto the dry work
   // surface. The intact roof hides those columns; exterior rain stays visible.
   vertices.set(working&&floor>.16?[d.x,floor,d.z,d.x,floor,d.z]:[d.x,y,d.z,d.x-.04,Math.max(floor,y-.21),d.z+.025],i*6);
  }
  geometry.getAttribute('position').needsUpdate=true;
 }
 return {update};
}
