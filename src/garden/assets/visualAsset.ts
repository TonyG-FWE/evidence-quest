import * as T from 'three';
import {GLTFLoader, type GLTF} from 'three/addons/loaders/GLTFLoader.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';

export type Vec3 = readonly [number, number, number];
export interface VisualAssetDefinition {
 id:string;
 uri:string;
 sha256:string;
 approval:'review'|'approved';
 sourceSha256?:string;
 anatomySha256?:string;
 approvalRecord?:string;
 location?:string;
 locations?:readonly string[];
 reference?:{id:string;state:string;images:readonly {path:string;sha256:string;role?:string}[]};
 resources?:unknown;
 normalization?:{scale:Vec3;rotation:Vec3;offset:Vec3};
 grounding?:readonly {mesh:string;vertices:readonly number[]}[];
 animations?:readonly {uri:string;sha256:string;sourceModelSha256:string}[];
 components?:unknown;
 hand?:{wrist:string;palm:Vec3;normal:Vec3};
 rig?:{
  joints:Readonly<Record<string,string>>;
  clips:Readonly<Record<'idle'|'walk'|'carryIdle'|'carryWalk',string>>;
  walkCycleDistance:number;
  actions?:Readonly<Record<string,{clip:string}>>;
  gaits?:Readonly<Partial<Record<'jog'|'carryJog',{clip:string;cycleDistance:number}>>>;
 };
 anchors?:Readonly<Record<string,Vec3>>;
 attachments?:Readonly<Record<string,{joint:string;point:Vec3;space?:'bone'}>>;
}
export interface VisualLease {
 readonly root:T.Group;
 readonly animations:readonly T.AnimationClip[];
 readonly definition:VisualAssetDefinition;
 release():void;
}
type SourceLoader=(uri:string,definition?:VisualAssetDefinition)=>Promise<GLTF>;
type LoadedSource=Pick<GLTF,'scene'|'animations'>;
type Entry={promise:Promise<LoadedSource>;source:LoadedSource|null;refs:number;disposed:boolean};

/** A source owns shared GPU resources. Instances own their skeletons and mixers. */
export function disposeAssetSource(root:T.Object3D):void {
 const resources=new Set<{dispose():void}>();
 const images=new Set<{close():void}>();
 root.traverse(object=>{
  if(!(object instanceof T.Mesh))return;
  resources.add(object.geometry);
  if(object instanceof T.SkinnedMesh)resources.add(object.skeleton);
  for(const material of Array.isArray(object.material)?object.material:[object.material]){
   resources.add(material);
   for(const value of Object.values(material))if(value instanceof T.Texture){resources.add(value);if(typeof value.image?.close==='function')images.add(value.image);}
  }
 });
 for(const resource of resources)resource.dispose();
 for(const image of images)image.close();
}

export class VisualAssetLibrary {
 private entries=new Map<string,Entry>();
 private leases=new Set<VisualLease>();
 private closed=false;
 constructor(private load:SourceLoader=uri=>new GLTFLoader().loadAsync(uri),private reviewProfile=false){}
 async acquire(definition:VisualAssetDefinition,options:{reviewOnly?:boolean}={}):Promise<VisualLease>{
  if(this.closed)throw new Error('Asset library is closed');
  if(definition.approval!=='approved'&&!options.reviewOnly&&!this.reviewProfile)throw new Error('Human Form approval is required for runtime artwork');
  const key=definition.uri+'#'+definition.sha256;
  let entry=this.entries.get(key);
  if(!entry){
   entry={promise:Promise.resolve(null as unknown as LoadedSource),source:null,refs:0,disposed:false};
   const pending=entry;
   pending.promise=this.load(definition.uri,definition).then(({scene,animations})=>{
    // Loaded meshes and clips own the runtime data. Retaining the parser also
    // retains its copied GLB body and dependency cache for every live source.
    const source={scene,animations};pending.source=source;return source;
   });
   this.entries.set(key,pending);
  }
  const owned=entry;owned.refs++;
  const free=()=>{
   owned.refs--;
   if(owned.refs===0){
    if(this.entries.get(key)===owned)this.entries.delete(key);
    if(owned.source&&!owned.disposed){disposeAssetSource(owned.source.scene);owned.disposed=true;}
   }
  };
  let source:LoadedSource;
  try{source=await owned.promise;if(this.closed)throw new Error('Asset library was closed during loading');}
  catch(error){free();throw error;}
  const root=new T.Group();root.name=definition.id;
  try{
   const sourceRoot=cloneSkeleton(source.scene),normalization=definition.normalization;
   if(normalization){const wrapper=new T.Group(),origin=new T.Group();wrapper.name='asset-normalization';wrapper.scale.fromArray(normalization.scale);wrapper.rotation.set(...normalization.rotation);origin.position.fromArray(normalization.offset);origin.add(sourceRoot);wrapper.add(origin);root.add(wrapper);}
   else root.add(sourceRoot);
  }catch(error){free();throw error;}
  let released=false;
  const lease:VisualLease={root,definition,animations:source.animations,release:()=>{
   if(released)return;released=true;
   root.removeFromParent();
   root.traverse(object=>{if(object instanceof T.SkinnedMesh)object.skeleton.dispose();});
   root.clear();this.leases.delete(lease);free();
  }};
  this.leases.add(lease);return lease;
 }
 dispose():void{if(this.closed)return;this.closed=true;for(const lease of [...this.leases])lease.release();}
 get activeSources():number{return this.entries.size;}
 get pendingSources():number{return [...this.entries.values()].filter(entry=>!entry.source).length;}
 get sourceBindings(){return [...this.entries.keys()].map(key=>{const split=key.lastIndexOf('#');return {uri:key.slice(0,split),sha256:key.slice(split+1)};});}
 /** Unique allocations, including imported assets, never material/instance counts. */
 allocations(){
  const buffers=new Set<ArrayBufferLike>(),textures=new Set<T.Texture>();let geometryBytes=0,textureBytes=0,animationBytes=0,skeletonBytes=0;
  const unique=(array:ArrayBufferView|null)=>{if(!array||buffers.has(array.buffer))return 0;buffers.add(array.buffer);return array.buffer.byteLength;};
  for(const entry of this.entries.values()){
   for(const clip of entry.source?.animations??[])for(const track of clip.tracks)animationBytes+=unique(track.times)+unique(track.values);
   entry.source?.scene.traverse(object=>{
   if(!(object instanceof T.Mesh))return;
   for(const attribute of [...Object.values(object.geometry.attributes),object.geometry.index]){
    if(!attribute)continue;const array=attribute instanceof T.InterleavedBufferAttribute?attribute.data.array:attribute.array;
    if(!buffers.has(array.buffer)){buffers.add(array.buffer);geometryBytes+=array.buffer.byteLength;}
   }
   for(const material of Array.isArray(object.material)?object.material:[object.material])for(const value of Object.values(material))if(value instanceof T.Texture&&!textures.has(value)){
    textures.add(value);
    if(value instanceof T.CompressedTexture)textureBytes+=value.mipmaps.reduce((sum,mip)=>sum+mip.data.byteLength,0);
    else{const image=value.image as {width?:number;height?:number}|undefined;textureBytes+=Math.ceil((image?.width??0)*(image?.height??0)*4*(value.generateMipmaps?4/3:1));}
   }
   if(object instanceof T.SkinnedMesh)skeletonBytes+=unique(object.skeleton.boneMatrices);
  });}
  for(const lease of this.leases)lease.root.traverse(object=>{if(object instanceof T.SkinnedMesh)skeletonBytes+=unique(object.skeleton.boneMatrices);});
  return {geometryBytes,textureBytes,animationBytes,skeletonBytes,decodedBytes:geometryBytes+textureBytes+animationBytes+skeletonBytes,sources:this.entries.size};
 }
}

export interface CharacterVisualState {
 readonly position:Vec3;
 readonly yaw:number;
 readonly motion:'still'|'idle'|'walk'|'jog';
 readonly carrying:boolean;
 readonly paused:boolean;
 readonly reducedMotion:boolean;
 /** Metres per second from authoritative movement. Omit for authored review pace. */
 readonly speed?:number;
 /** Committed action progress, not a second animation-owned gameplay clock. */
 readonly action?:{kind:string;progress:number};
}

/** Presentation only: receives immutable state and never sends gameplay commands. */
export class CharacterVisual {
 readonly root:T.Group;
 readonly hand:T.Object3D|null;
 private mixer:T.AnimationMixer;
 private actions=new Map<string,T.AnimationAction>();
 private state:CharacterVisualState={position:[0,0,0],yaw:0,motion:'still',carrying:false,paused:false,reducedMotion:false};
 private weights=new Map<string,number>();
 private target:string|null=null;
 private initialized=false;
 private released=false;
 private sockets=new Map<string,T.Object3D>();
 private soles:{mesh:T.SkinnedMesh;vertices:readonly number[]}[]=[];
 constructor(private lease:VisualLease){
  this.root=lease.root;this.mixer=new T.AnimationMixer(this.root);
  for(const sample of lease.definition.grounding??[]){const mesh=this.root.getObjectByName(sample.mesh);if(!(mesh instanceof T.SkinnedMesh))throw Error('Grounding mesh is missing: '+sample.mesh);this.soles.push({mesh,vertices:sample.vertices});}
  for(const clip of lease.animations){
   const action=this.mixer.clipAction(clip);action.setEffectiveWeight(0).play();
   this.actions.set(clip.name,action);this.weights.set(clip.name,0);
  }
  if(!lease.definition.rig){lease.release();throw new Error('Explicit anatomical rig and clip mappings are required');}
  for(const name of Object.values(lease.definition.rig.joints))if(!this.root.getObjectByName(name)){
   lease.release();throw new Error('Anatomical joint is missing: '+name);
  }
  for(const name of Object.values(lease.definition.rig.clips))if(!this.actions.has(name)){
   lease.release();throw new Error('Authored animation is missing: '+name);
  }
  for(const gait of Object.values(lease.definition.rig.gaits??{}))if(!this.actions.has(gait.clip)){lease.release();throw new Error('Authored gait is missing: '+gait.clip);}
  for(const work of Object.values(lease.definition.rig.actions??{}))if(!this.actions.has(work.clip)){lease.release();throw new Error('Authored construction action is missing: '+work.clip);}
  const spec=lease.definition.hand;
  this.hand=null;
  if(spec){
   const wrist=this.root.getObjectByName(spec.wrist);
   if(!wrist){lease.release();throw new Error('Manifest hand bone is missing: '+lease.definition.id);}
   this.root.updateMatrixWorld(true);
   const socket=new T.Object3D();socket.name='hand-attachment';
   socket.position.fromArray(spec.palm);
   socket.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3().fromArray(spec.normal).normalize());
   this.root.add(socket);this.root.updateMatrixWorld(true);wrist.attach(socket);
   this.hand=socket;
   this.sockets.set('hand',socket);
  }
  for(const [name,spec]of Object.entries(lease.definition.attachments??{})){
   const joint=this.root.getObjectByName(spec.joint);if(!joint){lease.release();throw Error('Attachment joint is missing: '+spec.joint);}
   const socket=new T.Object3D();socket.name=name+'-attachment';socket.position.fromArray(spec.point);
   if(spec.space==='bone')joint.add(socket);else{this.root.add(socket);this.root.updateMatrixWorld(true);joint.attach(socket);}this.sockets.set(name,socket);
   if(name==='hand')this.hand=socket;
  }
 }
 attachment(name:string){return this.sockets.get(name)??null;}
 /** Correct a contact pose on the supplied arm bones. Unreachable targets are
  * clamped to the arm's real reach; this never stretches a bone or its weights. */
 reachHand(target:T.Vector3,side:'left'|'right'='right'){
  const socket=this.sockets.get(side==='left'?'leftHand':'hand'),wrist=socket?.parent,elbow=wrist?.parent,shoulder=elbow?.parent;
  if(!socket||!(wrist instanceof T.Bone)||!(elbow instanceof T.Bone)||!(shoulder instanceof T.Bone))return null;
  this.root.updateWorldMatrix(true,true);
  const a=shoulder.getWorldPosition(new T.Vector3()),b=elbow.getWorldPosition(new T.Vector3()),c=wrist.getWorldPosition(new T.Vector3()),palm=socket.getWorldPosition(new T.Vector3()),goal=target.clone().sub(palm).add(c),direction=goal.clone().sub(a),first=a.distanceTo(b),second=b.distanceTo(c),length=Math.max(.001,Math.min(direction.length(),first+second-.00001));direction.normalize();
  const pole=new T.Vector3(side==='left'?-.35:.35,-1,-.2).applyQuaternion(this.root.getWorldQuaternion(new T.Quaternion()));pole.addScaledVector(direction,-pole.dot(direction)).normalize();
  const along=(first*first-second*second+length*length)/(2*length),away=Math.sqrt(Math.max(0,first*first-along*along)),joint=a.clone().addScaledVector(direction,along).addScaledVector(pole,away);
  const aim=(bone:T.Bone,child:T.Bone,to:T.Vector3)=>{const from=bone.getWorldPosition(new T.Vector3()),current=child.getWorldPosition(new T.Vector3()).sub(from).normalize(),desired=to.clone().sub(from).normalize(),q=bone.getWorldQuaternion(new T.Quaternion()).premultiply(new T.Quaternion().setFromUnitVectors(current,desired));bone.quaternion.copy(bone.parent!.getWorldQuaternion(new T.Quaternion()).invert().multiply(q));bone.updateWorldMatrix(false,true);};
  aim(shoulder,elbow,joint);aim(elbow,wrist,a.clone().addScaledVector(direction,length));this.root.updateWorldMatrix(true,true);
  return socket.getWorldPosition(new T.Vector3()).distanceTo(target);
 }
 sync(state:CharacterVisualState):void{
  if(this.released)return;
  this.state=state;this.root.position.fromArray(state.position);this.root.rotation.y=state.yaw;
  const clips=this.lease.definition.rig!.clips;
  const mode=state.reducedMotion?'idle':state.motion;
  const gait=mode==='jog'?this.lease.definition.rig!.gaits?.[state.carrying?'carryJog':'jog']:undefined;
  const authored=state.action&&(!state.reducedMotion||state.action.kind==='roof')?this.lease.definition.rig!.actions?.[state.action.kind]:undefined;
  const next=authored?.clip??(mode==='still'?null:gait?.clip??clips[mode==='walk'||mode==='jog'?(state.carrying?'carryWalk':'walk'):(state.carrying?'carryIdle':'idle')]);
  if(next!==this.target||!this.initialized){
   this.target=next;
   // Paused inspection switches show the requested pose immediately, never a stale walk.
   if(state.paused||state.reducedMotion||!this.initialized){
    for(const [name,action] of this.actions){const weight=name===next?1:0;this.weights.set(name,weight);action.setEffectiveWeight(weight);action.time=0;}
   }
   this.initialized=true;
  }
  if(state.reducedMotion)for(const action of this.actions.values())action.time=0;
 }
 get animation(){return {clip:this.target,time:this.target?this.actions.get(this.target)?.time??0:0,motion:this.state.motion,carrying:this.state.carrying,work:this.state.action?.kind??null};}
 /** Deterministic review scrubbing; never changes gameplay state. */
 seek(seconds:number):void{
  if(this.released)return;
  for(const [name,action] of this.actions){
   const weight=name===this.target?1:0;this.weights.set(name,weight);action.setEffectiveWeight(weight);
   action.time=Math.max(0,Number.isFinite(seconds)?seconds:0)%action.getClip().duration;
  }
  this.mixer.update(0);this.root.updateMatrixWorld(true);this.groundSoles();
 }
 update(seconds:number):void{
  if(this.released)return;
  const dt=this.state.paused||this.state.reducedMotion?0:Math.max(0,Math.min(.05,Number.isFinite(seconds)?seconds:0));
  const rig=this.lease.definition.rig!;
  for(const [name,action] of this.actions){
   const desired=name===this.target?1:0,previous=this.weights.get(name)??0;
   const weight=previous+Math.sign(desired-previous)*Math.min(Math.abs(desired-previous),dt/.18);
   this.weights.set(name,weight);action.setEffectiveWeight(weight);
   const gait=Object.values(rig.gaits??{}).find(g=>g.clip===name);
   const walking=name===rig.clips.walk||name===rig.clips.carryWalk||!!gait;
   const speed=this.state.speed;
   action.setEffectiveTimeScale(walking&&speed!==undefined?Math.max(0,Number.isFinite(speed)?speed:0)*action.getClip().duration/(gait?.cycleDistance??rig.walkCycleDistance):1);
  }
  const work=this.state.action&&(!this.state.reducedMotion||this.state.action.kind==='roof')?rig.actions?.[this.state.action.kind]:undefined;
  if(work){const action=this.actions.get(work.clip)!;const progress=this.state.reducedMotion?.55:Number.isFinite(this.state.action!.progress)?Math.max(0,Math.min(1,this.state.action!.progress)):0;action.time=progress*Math.max(0,action.getClip().duration-1e-6);action.setEffectiveTimeScale(0);}
  this.mixer.update(dt);
  this.root.updateMatrixWorld(true);this.groundSoles();
 }
 private groundSoles(){
  if(!this.soles.length)return;const wrapper=this.root.getObjectByName('asset-normalization');if(!wrapper)return;
  wrapper.position.y=0;this.root.parent?.updateWorldMatrix(true,false);this.root.updateMatrixWorld(true);const inverse=this.root.matrixWorld.clone().invert(),point=new T.Vector3();let lowest=Infinity;
  for(const sample of this.soles)for(const index of sample.vertices){sample.mesh.getVertexPosition(index,point);point.applyMatrix4(sample.mesh.matrixWorld).applyMatrix4(inverse);lowest=Math.min(lowest,point.y);}
  if(Number.isFinite(lowest)){wrapper.position.y=-lowest;this.root.updateMatrixWorld(true);}
 }
 dispose():void{
  if(this.released)return;this.released=true;
  this.mixer.stopAllAction();this.mixer.uncacheRoot(this.root);for(const socket of this.sockets.values())socket.removeFromParent();this.sockets.clear();
  this.lease.release();
 }
}
