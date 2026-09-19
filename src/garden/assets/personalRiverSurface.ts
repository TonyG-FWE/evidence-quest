import * as T from 'three';
import {BRIDGE_LEVELS,riverCenter,riverHalfWidth,terrainHeight,WATER_TOP_Y,type WorldPoint} from '../worldLayout.js';
import {loadPersonalTexture} from './personalAssetRequest.js';

type RiverSurfaceOptions={baseUrl?:string};
type Point={x:number;y:number;z:number;u:number;v:number};
/** These are connector surfaces made from original coastal/island UV samples.
 * Full source rocks and plants remain separate, undeformed scenery props. */
function strip(start:number,end:number,step:number,columns:number,sample:(z:number,t:number)=>Point,reverse=false){
 const rows=Math.ceil((end-start)/step),position:number[]=[],uv:number[]=[],indices:number[]=[];
 for(let row=0;row<=rows;row++)for(let column=0;column<=columns;column++){
  const p=sample(start+(end-start)*row/rows,column/columns);position.push(p.x,p.y,p.z);uv.push(p.u,p.v);
 }
 for(let row=0;row<rows;row++)for(let column=0;column<columns;column++){
  const a=row*(columns+1)+column,b=a+columns+1,c=a+1,d=b+1;
  indices.push(...(reverse?[a,c,b,b,c,d]:[a,b,c,b,d,c]));
 }
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(position,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();geometry.computeBoundingBox();geometry.computeBoundingSphere();return geometry;
}

/** Surface extent is shared with the physical river; it never occupies the
 * boat corridor. Decorative flow changes UVs only, keeping clearance exact. */
export function attachPersonalRiver(parent:T.Object3D,{baseUrl='/personal-landscape/shore/'}:RiverSurfaceOptions={}){
 const root=new T.Group();root.name='personal-source-river';root.visible=false;parent.add(root);
 const errors:string[]=[],textures:T.Texture[]=[],geometries:T.BufferGeometry[]=[],materials:T.Material[]=[],abort=new AbortController();let disposed=false,loaded=false;
 const bankMaterial=new T.MeshStandardMaterial({roughness:1,metalness:0}),soilMaterial=new T.MeshStandardMaterial({roughness:1,metalness:0}),waterMaterial=new T.MeshStandardMaterial({roughness:.78,metalness:0,vertexColors:true});
 materials.push(bankMaterial,soilMaterial,waterMaterial);
 const mesh=(name:string,geometry:T.BufferGeometry,material:T.Material)=>{const m=new T.Mesh(geometry,material);m.name=name;m.castShadow=false;m.receiveShadow=true;m.userData['visualOnly']=true;geometries.push(geometry);root.add(m);return m;};
 // This is a small crop of the source shoreline, not the full water atlas.
 // Keep its painted ripples at their original approximate ground scale.
 const waterGeometry=strip(-24,26,.20,16,(z,t)=>{const x=riverCenter(z)+(t*2-1)*(riverHalfWidth(z)+.105);return {x,y:WATER_TOP_Y,z,u:x/.70,v:z/.90};});
 const waterColors:number[]=[];
 for(let row=0;row<=250;row++)for(let column=0;column<=16;column++){
  const edge=Math.pow(Math.abs(column/8-1),5),depth=1-.12*(1-edge),color=new T.Color().setRGB(depth,depth,depth);waterColors.push(color.r,color.g,color.b);
 }
 waterGeometry.setAttribute('color',new T.Float32BufferAttribute(waterColors,3));mesh('continuous-source-water',waterGeometry,waterMaterial);
 for(const side of [-1,1]){
  const shore=(z:number,offset:number):WorldPoint=>({x:riverCenter(z)+side*(riverHalfWidth(z)+offset),z});
  const topOffset=(z:number)=>BRIDGE_LEVELS.crossings.some(c=>Math.abs(z-c)<=.5)?.10:.17;
  // The exposed side meets the exact existing bank outline. Its lower edge is
  // submerged so a moving camera cannot expose an open seam at the waterline.
  mesh(`${side<0?'west':'east'}-source-soil`,strip(-20,22,.15,6,(z,t)=>{
   const upper=shore(z,topOffset(z)),p=shore(z,.095+(topOffset(z)-.095)*t),top=terrainHeight(upper),y=WATER_TOP_Y-.035+(top-WATER_TOP_Y+.035)*t;
   return {...p,y,u:z/.65,v:(y-WATER_TOP_Y)/.65};
  },side<0),soilMaterial);
  mesh(`${side<0?'west':'east'}-source-bank-top`,strip(-20,22,.15,5,(z,t)=>{
   const offset=topOffset(z)+t*(.62-topOffset(z)),p=shore(z,offset);
   return {...p,y:terrainHeight(p)+.004*(1-t),u:p.x/1.05,v:z/1.05};
  },side<0),bankMaterial);
 }
 const load=async(name:string,material:T.MeshStandardMaterial)=>{
  const texture=await loadPersonalTexture(baseUrl+name+'.png',abort.signal);
  if(disposed){texture.dispose();return;}
  texture.name=`source-${name}`;texture.colorSpace=T.SRGBColorSpace;texture.wrapS=texture.wrapT=name==='river-water'?T.RepeatWrapping:T.MirroredRepeatWrapping;texture.anisotropy=8;
  textures.push(texture);material.map=texture;material.needsUpdate=true;
 };
 const ready=Promise.all([load('bank-top',bankMaterial),load('bank-soil',soilMaterial),load('river-water',waterMaterial)]).then(()=>{if(disposed)return false;loaded=true;root.visible=true;return true;}).catch((error:unknown)=>{abort.abort(error);if(!disposed)errors.push(error instanceof Error?error.message:String(error));return false;});
 return {
  root,ready,errors,
  get resources():readonly (T.BufferGeometry|T.Material|T.Texture)[]{return [...geometries,...materials,...textures];},
  get readyState(){return disposed?'disposed':loaded?'ready':errors.length?'failed':'loading';},
  metrics:{triangles:geometries.reduce((n,g)=>n+(g.index?.count??0)/3,0),meshes:root.children.length,waterHeight:WATER_TOP_Y,boatCorridorUnchanged:true,sourceTextureFiles:['bank-top.png','bank-soil.png','river-water.png']},
  update(timeSeconds:number,reducedMotion:boolean){if(disposed||!loaded||!waterMaterial.map)return;waterMaterial.map.offset.y=reducedMotion?0:timeSeconds*.012;},
  dispose(){if(disposed)return;disposed=true;abort.abort(Error('Personal river was released'));root.removeFromParent();for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of textures)t.dispose();},
 };
}
