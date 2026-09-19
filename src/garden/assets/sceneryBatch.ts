import * as T from 'three';
import type {VisualAssetDefinition,VisualAssetLibrary,VisualLease} from './visualAsset.js';

/** Repeated static scenery keeps the supplied source geometry and materials.
 * Each nearby cell owns a lease, while identical meshes share one GPU draw. */
export class SceneryBatch {
 readonly root=new T.Group();readonly proxy:T.Mesh;
 private lease:VisualLease|null=null;private meshes:T.InstancedMesh[]=[];
 private cullingBuffers:Float64Array[]=[];
 private loading=false;private wanted=false;private closed=false;error:string|null=null;
 constructor(private library:VisualAssetLibrary,readonly definition:VisualAssetDefinition,private matrices:readonly T.Matrix4[],private castShadow=true){
  this.root.name=definition.id+'-visual';this.proxy=new T.Mesh(new T.BoxGeometry(.01,.01,.01),new T.MeshBasicMaterial({visible:false}));
 }
 get ready(){return !!this.lease;}
 get required(){return this.wanted&&!this.closed;}
 get activeError(){return this.required?this.error:null;}
 demand(wanted:boolean){
  this.wanted=wanted;if(!wanted)this.error=null;if(!wanted&&this.lease)this.release();
  if(this.closed||!wanted||this.loading||this.lease||this.error)return;
  this.loading=true;void this.library.acquire(this.definition).then(lease=>{
   if(this.closed||!this.wanted){lease.release();return;}
   this.lease=lease;lease.root.updateMatrixWorld(true);
   lease.root.traverse(source=>{
    if(!(source instanceof T.Mesh))return;
    if(source instanceof T.SkinnedMesh)throw Error('Animated models cannot enter a static scenery batch');
    const mesh=new T.InstancedMesh(source.geometry,source.material,this.matrices.length),matrix=new T.Matrix4();
    for(let i=0;i<this.matrices.length;i++)mesh.setMatrixAt(i,matrix.multiplyMatrices(this.matrices[i]!,source.matrixWorld));
    mesh.name=this.definition.id+'-instances';mesh.castShadow=this.castShadow;mesh.receiveShadow=true;
    mesh.computeBoundingBox();mesh.computeBoundingSphere();this.meshes.push(mesh);this.root.add(mesh);
    if(this.definition.id==='grass-patch-original'&&!this.castShadow)this.compactGrass(mesh,source.matrixWorld.clone());
   });
  }).catch(error=>{this.release();if(!this.closed&&this.wanted)this.error=String(error);}).finally(()=>{this.loading=false;});
 }
 /** Keep original instance transforms and source geometry resident. The renderer
  * calls intersectsFrustum before WebGLObjects uploads instanceMatrix; doing
  * this in onBeforeRender would show the preceding camera's packed matrices.
  * Aggregate bounds deliberately remain those of every original instance. */
 private compactGrass(mesh:T.InstancedMesh,sourceTransform:T.Matrix4){
  const count=this.matrices.length,box=new T.Box3(),sphere=new T.Sphere(),matrix=new T.Matrix4();
  // Six local box coordinates and four cached world sphere values per patch.
  // Local boxes conservatively contain the fully normalized/tilted source.
  const bounds=new Float64Array(count*10);this.cullingBuffers.push(bounds);
  if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
  for(let i=0;i<count;i++){
   box.copy(mesh.geometry.boundingBox!).applyMatrix4(matrix.multiplyMatrices(this.matrices[i]!,sourceTransform));
   const k=i*10;bounds[k]=box.min.x;bounds[k+1]=box.min.y;bounds[k+2]=box.min.z;bounds[k+3]=box.max.x;bounds[k+4]=box.max.y;bounds[k+5]=box.max.z;
  }
  const priorMatrix=new T.Matrix4(),priorFrustum=new T.Frustum(),originalIntersects=mesh.intersectsFrustum.bind(mesh);
  let prepared=false,order=Array.from({length:count},(_,i)=>i);const visible:number[]=[];
  const pack=(indices:readonly number[])=>{
   const changed=order.length!==indices.length||indices.some((index,i)=>order[i]!==index);
   mesh.count=indices.length;if(!changed)return;
   for(let i=0;i<indices.length;i++)mesh.setMatrixAt(i,matrix.multiplyMatrices(this.matrices[indices[i]!]!,sourceTransform));
   if(indices.length){mesh.instanceMatrix.clearUpdateRanges();mesh.instanceMatrix.addUpdateRange(0,indices.length*16);mesh.instanceMatrix.needsUpdate=true;}
   order=Array.from(indices);
  };
  mesh.intersectsFrustum=frustum=>{
   // Multi-view callers retain the original full batch; the ordinary garden
   // and story renderers use a single Frustum. Never cull by Pip's distance.
   if(!(frustum instanceof T.Frustum)){pack(Array.from({length:count},(_,i)=>i));prepared=false;return originalIntersects(frustum);}
   const moved=!prepared||!priorMatrix.equals(mesh.matrixWorld),viewChanged=!prepared||frustum.planes.some((plane,i)=>!plane.equals(priorFrustum.planes[i]!));
   if(!moved&&!viewChanged)return mesh.count>0;
   if(moved)for(let i=0;i<count;i++){
    const k=i*10;box.min.set(bounds[k]!,bounds[k+1]!,bounds[k+2]!);box.max.set(bounds[k+3]!,bounds[k+4]!,bounds[k+5]!);
    // Transform box corners before deriving a sphere: even a scaled/rotated
    // miniature parent cannot make a tilted blade fall outside its bound.
    box.applyMatrix4(mesh.matrixWorld).getBoundingSphere(sphere);bounds[k+6]=sphere.center.x;bounds[k+7]=sphere.center.y;bounds[k+8]=sphere.center.z;bounds[k+9]=sphere.radius;
   }
   visible.length=0;
   if(originalIntersects(frustum))for(let i=0;i<count;i++){
    const k=i*10;sphere.center.set(bounds[k+6]!,bounds[k+7]!,bounds[k+8]!);sphere.radius=bounds[k+9]!+.08;
    if(frustum.intersectsSphere(sphere))visible.push(i);
   }
   // Plane 5 is the inward-facing near plane in this installed Three.js
   // Frustum. Its signed distance orders opaque patches near-to-far for
   // orthographic and perspective views, with a stable tie-breaker.
   const near=frustum.planes[5]!,n=near.normal;
   visible.sort((a,b)=>{const x=a*10+6,y=b*10+6;return n.x*(bounds[x]!-bounds[y]!)+n.y*(bounds[x+1]!-bounds[y+1]!)+n.z*(bounds[x+2]!-bounds[y+2]!)||a-b;});
   pack(visible);priorMatrix.copy(mesh.matrixWorld);priorFrustum.copy(frustum);prepared=true;return mesh.count>0;
  };
 }
 private release(){for(const mesh of this.meshes){mesh.removeFromParent();mesh.dispose();}this.meshes=[];this.cullingBuffers=[];this.lease?.release();this.lease=null;}
 get instanceBytes(){return this.meshes.reduce((n,mesh)=>n+mesh.instanceMatrix.array.byteLength,0);}
 /** Full buffers remain allocated even when the current view draws fewer rows. */
 get cullingCpuBytes(){return this.cullingBuffers.reduce((n,buffer)=>n+buffer.byteLength,0);}
 get instanceAllocationBytes(){return 2*this.instanceBytes+this.cullingCpuBytes;}
 get visibleInstances(){return this.meshes.reduce((n,mesh)=>n+mesh.count,0);}
 dispose(){this.closed=true;this.release();this.proxy.geometry.dispose();(this.proxy.material as T.Material).dispose();this.root.clear();}
}
