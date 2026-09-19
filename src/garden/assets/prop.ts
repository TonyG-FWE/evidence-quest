import * as T from 'three';
import {type VisualAssetDefinition,type VisualAssetLibrary,type VisualLease} from './visualAsset.js';

/** Presentation lease only. Possession and placement remain in the store. */
export class ModelProp {
 private lease:VisualLease|null=null;private loading=false;private wanted=false;private closed=false;
 private instanceMaterials:T.Material[]=[];
 private supportCache=new Map<string,number|null>();
 readonly root=new T.Group();readonly proxy:T.Mesh;error:string|null=null;
 constructor(private library:VisualAssetLibrary,readonly definition:VisualAssetDefinition,dimensions:readonly [number,number,number],target:string){
  this.root.name=definition.id+'-visual';this.proxy=new T.Mesh(new T.BoxGeometry(...dimensions),new T.MeshBasicMaterial({visible:false}));this.proxy.position.y=dimensions[1]/2;this.proxy.userData['target']=target;this.root.add(this.proxy);
 }
 get ready(){return !!this.lease;}
 get required(){return this.wanted&&!this.closed;}
 get activeError(){return this.required?this.error:null;}
 demand(wanted:boolean){
  this.wanted=wanted;if(!wanted)this.error=null;if(!wanted&&this.lease){this.clearAppearance();this.supportCache.clear();this.lease.release();this.lease=null;}
  if(this.closed||!wanted||this.loading||this.lease||this.error)return;
  this.loading=true;void this.library.acquire(this.definition).then(lease=>{
   if(this.closed||!this.wanted){lease.release();return;}this.lease=lease;this.root.add(lease.root);lease.root.traverse(object=>{if(object instanceof T.Mesh){object.castShadow=true;object.receiveShadow=true;}});
  // A state change may retire this object while its request is still pending.
  // Only artwork that is still required can interrupt the current scene.
  }).catch(error=>{if(!this.closed&&this.wanted)this.error=String(error);}).finally(()=>{this.loading=false;});
 }
 anchor(name:string,lift=0){this.root.updateWorldMatrix(true,true);return this.root.localToWorld(new T.Vector3(...(this.definition.anchors?.[name]??[0,0,0])).add(new T.Vector3(0,lift,0)));}
 /** Feet use the supplied horizontal surface under their authoritative x/z.
  * The cache is in this object's local frame, so moving boats retain contact. */
 supportHeight(point:T.Vector3):number|null{
  if(!this.lease)return null;this.root.updateWorldMatrix(true,true);
  const local=this.root.worldToLocal(point.clone()),key=local.x.toFixed(3)+':'+local.z.toFixed(3);
  if(!this.supportCache.has(key)){
   const ray=new T.Raycaster(new T.Vector3(point.x,20,point.z),new T.Vector3(0,-1,0));
   const hit=ray.intersectObject(this.lease.root,true).find(h=>(h.face?.normal.clone().transformDirection(h.object.matrixWorld).y??0)>.55);
   if(this.supportCache.size>2048)this.supportCache.clear();this.supportCache.set(key,hit?this.root.worldToLocal(hit.point.clone()).y:null);
  }
  const y=this.supportCache.get(key);return y===null||y===undefined?null:this.root.localToWorld(new T.Vector3(local.x,y,local.z)).y;
 }
 /** Instance-only presentation changes; source geometry and textures stay shared. */
 paint(effect:(material:T.Material)=>void){
  if(!this.lease)return;
  if(!this.instanceMaterials.length){const copies=new Map<T.Material,T.Material>();this.lease.root.traverse(o=>{if(!(o instanceof T.Mesh))return;const clone=(m:T.Material)=>{let copy=copies.get(m);if(!copy){copy=m.clone();copies.set(m,copy);this.instanceMaterials.push(copy);}return copy;};o.material=Array.isArray(o.material)?o.material.map(clone):clone(o.material);});}
  for(const material of this.instanceMaterials)effect(material);
 }
 private clearAppearance(){for(const material of this.instanceMaterials)material.dispose();this.instanceMaterials=[];}
 dispose(){this.closed=true;this.clearAppearance();this.supportCache.clear();this.lease?.release();this.lease=null;this.proxy.geometry.dispose();(this.proxy.material as T.Material).dispose();this.root.clear();}
}
