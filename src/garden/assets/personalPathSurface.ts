import * as T from 'three';
import {type WorldPoint} from '../worldLayout.js';
import {makePersonalPathLayout,personalPathLayout,personalPathSurfaceHeight,personalPathPointAllowed,makePersonalPathStonePlacements,getPersonalPathStonePlacements,makePersonalPathFootSupport,makePersonalPathSoilSupport,type PersonalPathRoute} from './personalPathLayout.js';
import {boundedPersonalRequest,loadPersonalTexture} from './personalAssetRequest.js';

type SourceStone={id:string;positions:number[];normals:number[];uvs:number[];triangles:number};
type DerivedPath={schema:string;sourceSha256:string;sourceDisplayScale:number;soil:{textureMetres:[number,number];reliefResolution:number;relief:number[]};stones:SourceStone[]};
export type PersonalPathOptions={
 routes?:readonly PersonalPathRoute[];
 /** Prefix for copies served by a separate compiled local review server. */
 assetBaseUrl?:string;
 includePoint?:(point:WorldPoint)=>boolean;
 anisotropy?:number;
};
const sourceSha='3e355b7bf9bc5fe7550a3d3c9126cd28ba3c8fbd3164e660310476d2f6b4074c';
const names={data:'path-derived.json',soil:'soil-color.png',color:'stone-color.jpg',normal:'stone-normal.png'};

/** Connected fitted paths using only textures and stone detail derived from the
 * supplied garden fork. An entire route network is one union, so intersections
 * do not stack overlapping strips or acquire Z-fighting seams. */
export function attachPersonalPaths(parent:T.Object3D,options:PersonalPathOptions={}){
 const root=new T.Group();root.name='personal-source-paths';parent.add(root);
 const errors:string[]=[],resources:{dispose:()=>void}[]=[],abort=new AbortController();
 const layout=options.routes?makePersonalPathLayout(options.routes):personalPathLayout;
 const placements=!options.routes&&!options.includePoint?getPersonalPathStonePlacements():makePersonalPathStonePlacements(layout,options);
 let soilSupport:(point:WorldPoint)=>number|null=()=>null;
 const footSupport=makePersonalPathFootSupport(layout,placements,options,point=>soilSupport(point));
 let disposed=false,failed=false,loaded=false;
 const record={sourceSha256:sourceSha,routeCount:layout.routes.length,surfaceTriangles:0,stoneInstances:0,stoneTriangles:0,state:'loading'};
 root.userData['personalPath']=record;
 const own=<R extends {dispose:()=>void}>(resource:R)=>{resources.push(resource);return resource;};
 const url=(name:keyof typeof names)=>`${(options.assetBaseUrl??'/personal-landscape/path').replace(/\/$/,'')}/${names[name]}`;
 function cleanup(){soilSupport=()=>null;root.clear();for(const resource of resources.splice(0))resource.dispose();}
 async function texture(name:'soil'|'color'|'normal'){
  const value=await loadPersonalTexture(url(name),abort.signal);
  if(disposed||failed){value.dispose();throw Error('Personal paths were released during loading.');}
  return own(value);
 }
 const ready=(async()=>{
  try{
   const dataPromise=boundedPersonalRequest(url('data'),abort.signal,async signal=>{const response=await fetch(url('data'),{signal});if(!response.ok)throw Error(`Path source data: HTTP ${response.status}`);return await response.json() as DerivedPath;});
   const [data,soil,color,normal]=await Promise.all([dataPromise,texture('soil'),texture('color'),texture('normal')]);
   if(disposed)return;
   if(data.schema!=='eq.personal-path.derived.v1'||data.sourceSha256!==sourceSha||data.stones.length!==6)throw Error('Personal path source binding is invalid.');
   soil.colorSpace=T.SRGBColorSpace;soil.wrapS=soil.wrapT=T.RepeatWrapping;soil.anisotropy=options.anisotropy??8;
   color.colorSpace=T.SRGBColorSpace;color.flipY=false;color.anisotropy=options.anisotropy??8;
   normal.flipY=false;normal.anisotropy=options.anisotropy??8;
   const soilMaterial=own(new T.MeshStandardMaterial({map:soil,roughness:.94,metalness:0,vertexColors:true}));
   const stoneMaterial=own(new T.MeshStandardMaterial({map:color,normalMap:normal,roughness:.9,metalness:0,side:T.DoubleSide}));
   const allowed=options.includePoint??personalPathPointAllowed;
   function field(p:WorldPoint){
    const route=-layout.routeDistance(p);if(!allowed(p))return -.06;
    return route;
   }
   const vertices:number[]=[],uvs:number[]=[],colors:number[]=[];
   const cell=.115,bounds=layout.segments.reduce((box,{a,b,radius})=>({minX:Math.min(box.minX,a.x-radius-.15,b.x-radius-.15),maxX:Math.max(box.maxX,a.x+radius+.15,b.x+radius+.15),minZ:Math.min(box.minZ,a.z-radius-.15,b.z-radius-.15),maxZ:Math.max(box.maxZ,a.z+radius+.15,b.z+radius+.15)}),{minX:Infinity,maxX:-Infinity,minZ:Infinity,maxZ:-Infinity});
   const startX=Math.floor(bounds.minX/cell)*cell,startZ=Math.floor(bounds.minZ/cell)*cell,nx=Math.ceil((bounds.maxX-startX)/cell),nz=Math.ceil((bounds.maxZ-startZ)/cell);
   const values=new Float32Array((nx+1)*(nz+1));
   for(let z=0;z<=nz;z++)for(let x=0;x<=nx;x++)values[z*(nx+1)+x]=Math.max(-2,field({x:startX+x*cell,z:startZ+z*cell}));
   type Corner=WorldPoint&{d:number};
   function addTriangle(a:Corner,b:Corner,c:Corner){
    const input=[a,b,c],polygon:Corner[]=[];
    for(let i=0;i<3;i++){const p=input[i]!,q=input[(i+1)%3]!,inside=p.d>=0;if(inside)polygon.push(p);if(inside!==(q.d>=0)){const t=p.d/(p.d-q.d);polygon.push({x:p.x+(q.x-p.x)*t,z:p.z+(q.z-p.z)*t,d:0});}}
    for(let i=1;i<polygon.length-1;i++)for(const p of [polygon[0]!,polygon[i]!,polygon[i+1]!]){
     const depth=Math.max(0,-layout.routeDistance(p)),shade=.86+.14*Math.min(1,depth/.11);
     vertices.push(p.x,personalPathSurfaceHeight(p,depth),p.z);uvs.push(p.x/data.soil.textureMetres[0],-p.z/data.soil.textureMetres[1]);colors.push(shade,shade,shade);
    }
   }
   for(let z=0;z<nz;z++)for(let x=0;x<nx;x++){
    const a={x:startX+x*cell,z:startZ+z*cell,d:values[z*(nx+1)+x]!},b={x:a.x+cell,z:a.z,d:values[z*(nx+1)+x+1]!},c={x:a.x,z:a.z+cell,d:values[(z+1)*(nx+1)+x]!},d={x:b.x,z:c.z,d:values[(z+1)*(nx+1)+x+1]!};
    if(Math.max(a.d,b.d,c.d,d.d)<0)continue;addTriangle(a,c,b);addTriangle(b,c,d);
   }
   const surfaceGeometry=own(new T.BufferGeometry());surfaceGeometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));surfaceGeometry.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));surfaceGeometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));surfaceGeometry.computeVertexNormals();surfaceGeometry.computeBoundingSphere();
   soilSupport=makePersonalPathSoilSupport(surfaceGeometry.getAttribute('position').array);
   const surface=new T.Mesh(surfaceGeometry,soilMaterial);surface.name='connected-source-soil';surface.receiveShadow=true;surface.castShadow=false;root.add(surface);record.surfaceTriangles=vertices.length/9;

   // Stones retain the supplied silhouette, UVs and normal map. Instances are
   // supported and tilted to the actual terrain instead of floating on slopes.
   const groups:T.Matrix4[][]=data.stones.map(()=>[]);
   for(const placement of placements)groups[placement.variant]!.push(new T.Matrix4().fromArray(placement.matrix));
   for(let i=0;i<data.stones.length;i++){
    const definition=data.stones[i]!,matrices=groups[i]!;if(!matrices.length)continue;
    const geometry=own(new T.BufferGeometry());geometry.setAttribute('position',new T.Float32BufferAttribute(definition.positions,3));geometry.setAttribute('normal',new T.Float32BufferAttribute(definition.normals,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(definition.uvs,2));geometry.computeBoundingSphere();
    const mesh=own(new T.InstancedMesh(geometry,stoneMaterial,matrices.length));mesh.name=`source-path-stone-${definition.id}`;matrices.forEach((matrix,index)=>mesh.setMatrixAt(index,matrix));mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingBox();mesh.computeBoundingSphere();mesh.receiveShadow=true;mesh.castShadow=false;root.add(mesh);record.stoneInstances+=matrices.length;record.stoneTriangles+=matrices.length*definition.triangles;
   }
   loaded=true;record.state='ready';
  }catch(error){
   if(disposed)return;failed=true;record.state='failed';errors.push(error instanceof Error?error.message:String(error));abort.abort(error);cleanup();
  }
 })();
 return {root,ready,supportHeight:(point:WorldPoint)=>loaded&&!disposed?footSupport(point):null,get resources(){return resources;},get errors(){return [...errors];},get loaded(){return loaded;},get status(){return {...record,errors:[...errors]};},dispose(){if(disposed)return;disposed=true;loaded=false;record.state='disposed';abort.abort();cleanup();root.removeFromParent();}};
}
