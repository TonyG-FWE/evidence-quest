import * as T from 'three';
import {ModelProp} from './prop.js';
import {SceneryBatch} from './sceneryBatch.js';
import {reviewAssets} from './reviewManifest.js';
import type {VisualAssetDefinition,VisualAssetLibrary} from './visualAsset.js';
import type {GardenState} from '../model.js';
import {setMaterialFade} from '../materialFade.js';
import {personalGrass} from './profile.js';

/** Artwork follows the existing authoritative objects. It never owns an interaction. */
export class ReviewWorld {
 private entries:{prop:ModelProp|SceneryBatch;host:T.Object3D;studio:boolean;resident?:boolean;preload?:(s:GardenState)=>boolean;when?: (s:GardenState)=>boolean;occlusion:boolean;cutaway?:(s:GardenState)=>boolean;opacity:number;blocked:boolean;bounds:T.Sphere;measured:boolean;lastWanted:number;wanted:boolean}[]=[];
 private materials:T.Material[]=[];
 private retired=new Set<T.Mesh>();
 private frustum=new T.Frustum();private projection=new T.Matrix4();private worldBounds=new T.Sphere();
 private lastProbe=0;private ray=new T.Raycaster();private roofCut=[new T.Plane(new T.Vector3(0,-1,0),1.28)];
 constructor(private library:VisualAssetLibrary){}
 attach(id:string,host:T.Object3D,options:{studio?:boolean;replace?:boolean;position?:readonly[number,number,number];rotation?:readonly[number,number,number];scale?:readonly[number,number,number];when?:(s:GardenState)=>boolean;preload?:(s:GardenState)=>boolean;occlusion?:boolean;cutaway?:(s:GardenState)=>boolean}={}){
  const sourceDefinition=reviewAssets[id];if(!sourceDefinition)throw Error('Missing review object: '+id);
  // Personal shore working copies remove embedded water, retaining every kept
  // source vertex, UV, texture and transform. Originals remain unchanged.
  const shore=personalGrass?({
   'coastal-bank':{uri:'/personal-landscape/shore/coastal-land.glb',sha256:'38d5e5873733d7af688c4e0324b9163a6098a8a26430086e2e20caf90c0f74f3'},
   riverbank:{uri:'/personal-landscape/shore/riverbank-land.glb',sha256:'0d9ebde6489a0a796c3a63788515b3aca1c3c459bf7dd7a0ac2e0fc9ad744eac'},
  } as Record<string,{uri:string;sha256:string}>)[id]:undefined;
  const definition=shore?{...sourceDefinition,...shore,resources:{sourceSha256:sourceDefinition.sourceSha256,derivation:'Source triangles retained; embedded water and underside omitted'}}:sourceDefinition;
  if(options.replace!==false)this.retire(host);
  const prop=new ModelProp(this.library,definition,[.1,.1,.1],String(host.userData['target']??''));
  if(options.position)prop.root.position.fromArray(options.position);
  if(options.rotation)prop.root.rotation.set(...options.rotation);
  if(options.scale)prop.root.scale.fromArray(options.scale);
  // Supplied objects have unit source bounds. Use a conservative envelope until
  // the first lease gives us its exact bounds, including overhangs and branches.
  const span=Math.max(...(definition.normalization?.scale??[2,2,2]));
  host.add(prop.root);this.entries.push({prop,host,studio:options.studio??false,resident:false,occlusion:options.occlusion??false,opacity:1,blocked:false,bounds:new T.Sphere(new T.Vector3(0,span*.5,0),span),measured:false,lastWanted:-Infinity,wanted:false,...(options.when?{when:options.when}:{}),...(options.preload?{preload:options.preload}:{}),...(options.cutaway?{cutaway:options.cutaway}:{})});return prop;
 }
 /** Retire appearance at assembly time, retaining the original pick/contact mesh.
  * Loading, unloading and action visibility must never expose the old artwork. */
 retire(host:T.Object3D){
  host.traverse(o=>{
   if(!(o instanceof T.Mesh)||this.retired.has(o))return;
   for(let p:T.Object3D|null=o;p&&p!==host;p=p.parent)if(p.name.endsWith('-visual'))return;
   const originals=Array.isArray(o.material)?o.material:[o.material];
   const hidden=originals.map(m=>{const next=m.clone();next.visible=false;this.materials.push(next);return next;});
   o.material=Array.isArray(o.material)?hidden:hidden[0]!;this.retired.add(o);
  });
 }
 place(id:string,parent:T.Object3D,position:readonly[number,number,number],rotation=0,studio=false,scale?:readonly[number,number,number]){
  const host=new T.Group();host.name='supplied-scenery:'+id;host.position.fromArray(position);host.rotation.y=rotation;parent.add(host);return this.attach(id,host,{studio,replace:false,occlusion:id==='arbor'||id.startsWith('tree'),...(scale?{scale}:{})});
 }
 scatter(id:string,parent:T.Object3D,placements:readonly {position:readonly [number,number,number];rotation:number;scale:number;normal?:readonly[number,number,number]}[],options:{definition?:VisualAssetDefinition;cellSize?:number;resident?:boolean;castShadow?:boolean}={}){
  // A foreground tree must yield independently when it covers the player or
  // an activity. Its geometry/textures still share the original source lease.
  if(id.startsWith('tree')){for(const p of placements)this.place(id,parent,p.position,p.rotation,false,[p.scale,p.scale,p.scale]);return;}
  const definition=options.definition??reviewAssets[id];if(!definition)throw Error('Missing supplied scenery: '+id);
  const cells=new Map<string,typeof placements[number][]>();
  const cellSize=options.cellSize??10;
  for(const p of placements){const key=Math.floor(p.position[0]/cellSize)+':'+Math.floor(p.position[2]/cellSize),cell=cells.get(key)??[];cell.push(p);cells.set(key,cell);}
  for(const [key,cell]of cells){
   const host=new T.Group();host.name='supplied-scenery:'+id+':'+key;
   const center=new T.Vector3();for(const p of cell)center.add(new T.Vector3(...p.position));center.divideScalar(cell.length);host.position.copy(center);parent.add(host);
   const matrices=cell.map(p=>{const yaw=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),p.rotation),rotation=p.normal?new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(...p.normal)).multiply(yaw):yaw;return new T.Matrix4().compose(new T.Vector3(...p.position).sub(center),rotation,new T.Vector3().setScalar(p.scale));});
   const prop=new SceneryBatch(this.library,definition,matrices,options.castShadow??true),span=Math.max(...(definition.normalization?.scale??[1,1,1]));host.add(prop.root);
   const radius=Math.max(...cell.map(p=>new T.Vector3(...p.position).distanceTo(center)+span*p.scale));
   this.entries.push({prop,host,studio:false,resident:options.resident??false,occlusion:false,opacity:1,blocked:false,bounds:new T.Sphere(new T.Vector3(),radius),measured:false,lastWanted:-Infinity,wanted:false});
  }
 }
 update(s:GardenState,inAdventure:boolean,camera?:T.Camera,activity:readonly {x:number;y:number;z:number}[]=[],overview=false){
  const position=new T.Vector3();
  const now=performance.now(),probe=now-this.lastProbe>=100;if(probe)this.lastProbe=now;
  if(camera){camera.updateMatrixWorld();this.frustum.setFromProjectionMatrix(this.projection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));}
  for(const entry of this.entries){
   let visible=true;for(let p:T.Object3D|null=entry.host;p;p=p.parent)if(!p.visible){visible=false;break;}
   if(entry.resident&&entry.prop instanceof SceneryBatch&&entry.prop.definition.id==='grass-patch-original'){
    // Resident grass needs no actor-distance or extra loading-frustum probes.
    // Its exact per-instance view culling happens immediately before rendering.
    entry.prop.root.visible=entry.when?.(s)??true;
    entry.wanted=visible&&entry.prop.root.visible&&(entry.studio?!inAdventure:inAdventure);entry.prop.demand(entry.wanted);continue;
   }
   entry.prop.root.getWorldPosition(position);
   if(entry.prop.ready&&!entry.measured){
    entry.prop.root.updateWorldMatrix(true,true);
    new T.Box3().setFromObject(entry.prop.root).applyMatrix4(entry.prop.root.matrixWorld.clone().invert()).getBoundingSphere(entry.bounds);entry.measured=true;
   }
   // A camera can still see a cottage or tree whose centre is beyond the old
   // ten-metre cutoff. Prefetch outside the view and release only offscreen,
   // with a wider retention band and brief grace period to avoid edge churn.
   this.worldBounds.copy(entry.bounds).applyMatrix4(entry.prop.root.matrixWorld);
   this.worldBounds.radius+=entry.prop.ready?3:2;
   const inView=!!camera&&this.frustum.intersectsSphere(this.worldBounds);
   const near=entry.resident||entry.studio||overview||inView||Math.hypot(position.x-s.chapter.pip.x,position.z-s.chapter.pip.z)<(entry.prop.ready?12:10);
   entry.prop.root.visible=entry.when?.(s)??true;
   const active=visible&&entry.prop.root.visible&&(entry.studio?!inAdventure:inAdventure);
   if(active&&near)entry.lastWanted=now;
   entry.wanted=(active||inAdventure&&!!entry.preload?.(s))&&(near||now-entry.lastWanted<1800);entry.prop.demand(entry.wanted);
   if(camera&&entry.prop.ready&&(entry.occlusion||entry.cutaway)){
    const architecture=['bakery','cottage','cottage-1'].includes(entry.prop.definition.id);
    if(architecture)entry.blocked=false;
    else if(probe&&entry.occlusion){entry.blocked=[{...s.chapter.pip,y:1},{...s.chapter.pip,y:.15},...activity].some(point=>{const target=new T.Vector3(point.x,point.y,point.z),screen=target.clone().project(camera);if(Math.abs(screen.x)>1||Math.abs(screen.y)>1)return false;this.ray.setFromCamera(new T.Vector2(screen.x,screen.y),camera);const hit=this.ray.intersectObject(entry.prop.root,true).find(h=>h.object!==entry.prop.proxy);return !!hit&&hit.distance<this.ray.ray.origin.distanceTo(target)-.10;});}
    const desired=entry.blocked?.16:1;entry.opacity=s.chapter.reducedMotion?desired:Math.abs(entry.opacity-desired)<.005?desired:entry.opacity+(desired-entry.opacity)*.18;
    const planes=entry.cutaway?.(s)?this.roofCut:null;
    if(entry.prop instanceof ModelProp)entry.prop.paint(material=>{if(!architecture)setMaterialFade(material,entry.opacity,entry.opacity>.99);if(material.clippingPlanes!==planes){material.clippingPlanes=planes;material.clipShadows=true;material.needsUpdate=true;}});
    entry.prop.root.traverse(o=>{if(o instanceof T.Mesh&&o!==entry.prop.proxy)o.castShadow=entry.opacity>.9;});
   }
  }
 }
 get errors(){return this.entries.flatMap(e=>e.wanted&&e.prop.error?[e.prop.definition.id+': '+e.prop.error]:[]);}
 get readiness(){return this.entries.map(e=>e.prop.ready?'1':'0').join('');}
 get loaded(){return this.entries.filter(e=>e.prop.ready).map(e=>e.prop.definition.id);}
 get sight(){return this.entries.filter(e=>e.occlusion&&e.prop.ready).map(e=>({id:e.prop.definition.id,position:e.host.position.toArray(),blocked:e.blocked,opacity:e.opacity}));}
 get coverage(){return {placements:this.entries.length,loaded:this.entries.filter(e=>e.prop.ready).length,pending:this.entries.filter(e=>e.wanted&&!e.prop.ready).length,instanceBytes:this.entries.reduce((n,e)=>n+(e.prop instanceof SceneryBatch?e.prop.instanceBytes:0),0),cullingCpuBytes:this.entries.reduce((n,e)=>n+(e.prop instanceof SceneryBatch?e.prop.cullingCpuBytes:0),0),instanceAllocationBytes:this.entries.reduce((n,e)=>n+(e.prop instanceof SceneryBatch?e.prop.instanceAllocationBytes:0),0),visibleGrassInstances:this.entries.reduce((n,e)=>n+(e.prop instanceof SceneryBatch&&e.prop.definition.id==='grass-patch-original'?e.prop.visibleInstances:0),0),retiredMeshes:this.retired.size,visibleRetiredMeshes:[...this.retired].filter(m=>(Array.isArray(m.material)?m.material:[m.material]).some(material=>material.visible)).length};}
 dispose(){for(const entry of this.entries)entry.prop.dispose();for(const material of this.materials)material.dispose();this.entries=[];this.retired.clear();}
}
