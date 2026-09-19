import * as T from 'three';
import type {VisualAssetLibrary} from './visualAsset.js';
import {loadPersonalTexture} from './personalAssetRequest.js';

export type MemoryGroundBounds={minX:number;maxX:number;minZ:number;maxZ:number};
export type PersonalMemoryLandscapeOptions={
 kind:string;
 bounds:MemoryGroundBounds;
 groundY:number;
 /** Separate water attachments can extend below an elevated shore. */
 soilBottomY?:number;
 /** Callers supply the actual actor, route, furniture and handling envelopes. */
 clearings?:readonly {x:number;z:number;radius:number}[];
 water?:{x:number;z:number;width:number;depth:number;y:number};
};

const TEXTURE_ROOT='/personal-landscape/shore/';
/** Retain source-derived ground and water after the grass layer was removed. */
export function attachPersonalMemoryLandscape(parent:T.Object3D,_library:VisualAssetLibrary,options:PersonalMemoryLandscapeOptions){
 const {kind,bounds,groundY,water}=options,clearings=options.clearings??[];
 if(![bounds.minX,bounds.maxX,bounds.minZ,bounds.maxZ,groundY].every(Number.isFinite)||bounds.minX>=bounds.maxX||bounds.minZ>=bounds.maxZ)throw Error('Invalid memory landscape bounds');
 if(options.soilBottomY!==undefined&&(!Number.isFinite(options.soilBottomY)||options.soilBottomY>=groundY))throw Error('Invalid memory soil bottom');
 if(clearings.some(c=>![c.x,c.z,c.radius].every(Number.isFinite)||c.radius<0))throw Error('Invalid memory activity clearing');
 if(water&&(![water.x,water.z,water.width,water.depth,water.y].every(Number.isFinite)||water.width<=0||water.depth<=0))throw Error('Invalid memory water bounds');
 const root=new T.Group();root.name='personal-memory-landscape:'+kind;root.visible=false;root.userData['visualOnly']=true;parent.add(root);
 const geometries:T.BufferGeometry[]=[],materials:T.Material[]=[],textures:T.Texture[]=[];
 let closed=false,wanted=false,surfacesReady=false,surfaceError:string|null=null;
 let current:{controller:AbortController;textures:Set<T.Texture>}|null=null;
 const groundMaterial=new T.MeshStandardMaterial({roughness:1}),soilMaterial=new T.MeshStandardMaterial({roughness:1,side:T.DoubleSide}),waterMaterial=water?new T.MeshStandardMaterial({roughness:.78}):null;
 materials.push(groundMaterial,soilMaterial,...(waterMaterial?[waterMaterial]:[]));
 const geometry=(positions:number[],uv:number[],indices:number[])=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();geometries.push(g);return g;};
 const mesh=(name:string,g:T.BufferGeometry,material:T.Material)=>{const m=new T.Mesh(g,material);m.name=name;m.receiveShadow=true;m.castShadow=false;m.userData['visualOnly']=true;root.add(m);return m;};
 const plane=(name:string,b:MemoryGroundBounds,y:number,material:T.Material,repeat=1.05)=>mesh(name,geometry(
  [b.minX,y,b.minZ,b.maxX,y,b.minZ,b.minX,y,b.maxZ,b.maxX,y,b.maxZ],
  [b.minX/repeat,b.minZ/repeat,b.maxX/repeat,b.minZ/repeat,b.minX/repeat,b.maxZ/repeat,b.maxX/repeat,b.maxZ/repeat],[0,2,1,1,2,3]),material);
 const waterBounds=water?{minX:water.x-water.width/2,maxX:water.x+water.width/2,minZ:water.z-water.depth/2,maxZ:water.z+water.depth/2}:null;
 // Subtract the water rectangle from land rather than hiding it under a green
 // slab. The supplied docks retain their separate water passage.
 const groundRects:MemoryGroundBounds[]=[];
 const addRect=(minX:number,maxX:number,minZ:number,maxZ:number)=>{if(maxX-minX>1e-5&&maxZ-minZ>1e-5)groundRects.push({minX,maxX,minZ,maxZ});};
 const cut=waterBounds?{minX:Math.max(bounds.minX,waterBounds.minX),maxX:Math.min(bounds.maxX,waterBounds.maxX),minZ:Math.max(bounds.minZ,waterBounds.minZ),maxZ:Math.min(bounds.maxZ,waterBounds.maxZ)}:null;
 if(cut&&cut.minX<cut.maxX&&cut.minZ<cut.maxZ){
  addRect(bounds.minX,cut.minX,bounds.minZ,bounds.maxZ);addRect(cut.maxX,bounds.maxX,bounds.minZ,bounds.maxZ);
  addRect(cut.minX,cut.maxX,bounds.minZ,cut.minZ);addRect(cut.minX,cut.maxX,cut.maxZ,bounds.maxZ);
 }else groundRects.push(bounds);
 for(const [index,b]of groundRects.entries()){
  plane('source-memory-ground:'+index,b,groundY,groundMaterial);
  const corners=[[b.minX,b.minZ],[b.maxX,b.minZ],[b.maxX,b.maxZ],[b.minX,b.maxZ]] as const,positions:number[]=[],uv:number[]=[],indices:number[]=[];
  const bottom=Math.min(groundY-.14,water?water.y-.045:groundY-.14,options.soilBottomY??groundY);
  for(let i=0;i<4;i++){const a=corners[i]!,b=corners[(i+1)%4]!,start=i*4,length=Math.hypot(a[0]-b[0],a[1]-b[1]);
   positions.push(a[0],bottom,a[1],b[0],bottom,b[1],a[0],groundY,a[1],b[0],groundY,b[1]);uv.push(0,0,length/.65,0,0,(groundY-bottom)/.65,length/.65,(groundY-bottom)/.65);indices.push(start,start+1,start+2,start+1,start+3,start+2);
  }
  mesh('source-memory-earth:'+index,geometry(positions,uv,indices),soilMaterial);
 }
 if(water&&waterBounds&&waterMaterial)plane('source-memory-water',waterBounds,water.y,waterMaterial,.80);

 function retireRequest(){const previous=current;current=null;if(previous){previous.controller.abort(Error('Memory landscape was released'));for(const texture of previous.textures)texture.dispose();previous.textures.clear();}}
 function releaseSurfaces(){for(const material of [groundMaterial,soilMaterial,waterMaterial])if(material?.map){material.map=null;material.needsUpdate=true;}for(const texture of textures.splice(0))texture.dispose();surfacesReady=false;}
 function loadSurfaces(){
  if(closed||current||surfacesReady||surfaceError)return;
  const attempt={controller:new AbortController(),textures:new Set<T.Texture>()};current=attempt;
  const entries:[string,T.MeshStandardMaterial][]=[...(groundRects.length?([['bank-top',groundMaterial],['bank-soil',soilMaterial]] as [string,T.MeshStandardMaterial][]):[]),...(waterMaterial?([['river-water',waterMaterial]] as [string,T.MeshStandardMaterial][]):[])];
  void Promise.all(entries.map(async([name,material])=>{
   const texture=await loadPersonalTexture(TEXTURE_ROOT+name+'.png',attempt.controller.signal);
   if(closed||!wanted||current!==attempt||attempt.controller.signal.aborted){texture.dispose();throw Error('Memory landscape was released during loading');}
   attempt.textures.add(texture);
   texture.name='memory-source-'+name;texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=name==='river-water'?T.RepeatWrapping:T.MirroredRepeatWrapping;texture.anisotropy=8;return {texture,material};
  })).then(results=>{
   if(closed||!wanted||current!==attempt)return;
   for(const {texture,material}of results){material.map=texture;material.needsUpdate=true;textures.push(texture);}attempt.textures.clear();
   surfacesReady=true;root.visible=wanted;
  }).catch(error=>{
   if(current!==attempt)return;
   attempt.controller.abort(error);for(const texture of attempt.textures)texture.dispose();attempt.textures.clear();root.visible=false;
   if(!closed&&wanted)surfaceError=error instanceof Error?error.message:String(error);
  }).finally(()=>{if(current===attempt)current=null;});
 }
 return {
  root,
  demand(active:boolean){wanted=active&&!closed;if(!wanted){retireRequest();releaseSurfaces();surfaceError=null;}root.visible=wanted&&surfacesReady;if(wanted)loadSurfaces();},
  get ready(){return wanted&&surfacesReady;},
  get status(){return closed?'disposed':!wanted?'inactive':surfaceError?'failed':surfacesReady?'ready':'loading';},
  get error(){return wanted?surfaceError:null;},
  get resources():readonly (T.BufferGeometry|T.Material|T.Texture)[]{return [...geometries,...materials,...textures];},
  get metrics(){return {kind,grass:'removed-by-user',instanceCount:0,cellCount:0,loadedCells:0,grassTrianglesIfAllInstancesVisible:0,instanceBytes:0,instanceAllocationBytes:0,cullingCpuBytes:0,visibleGrassInstances:0,groundRects:groundRects.length,clearings:clearings.length,surfaceTriangles:geometries.reduce((sum,g)=>sum+(g.index?.count??0)/3,0),textures:entriesNames(waterMaterial!==null,groundRects.length>0)};},
  dispose(){if(closed)return;closed=true;wanted=false;retireRequest();releaseSurfaces();root.removeFromParent();for(const g of geometries)g.dispose();for(const m of materials)m.dispose();root.clear();},
 };
}

function entriesNames(water:boolean,land=true){return [...(land?['bank-top.png','bank-soil.png']:[]),...(water?['river-water.png']:[])];}
