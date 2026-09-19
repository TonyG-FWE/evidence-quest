import * as T from 'three';

/** Depth-only prepass reduces opaque terrain overdraw at DPR2. It retains the
 * same framebuffer, sample count, vertices, alpha tests and shadow rendering. */
export function opaqueDepthPass(renderer:T.WebGLRenderer){
 const materials=new Map<T.Material,T.MeshDepthMaterial>();
 function depth(source:T.Material){
  let target=materials.get(source);if(!target){target=new T.MeshDepthMaterial();materials.set(source,target);const owned=target;const release=()=>{materials.delete(source);owned.map=owned.alphaMap=owned.displacementMap=null;owned.dispose();source.removeEventListener('dispose',release);};source.addEventListener('dispose',release);}
  const surface=source as T.MeshStandardMaterial;
  target.colorWrite=false;target.side=source.side;target.visible=source.visible;target.alphaTest=source.alphaTest;
  target.map=surface.map??null;target.alphaMap=surface.alphaMap??null;
  target.displacementMap=surface.displacementMap??null;target.displacementScale=surface.displacementScale??1;target.displacementBias=surface.displacementBias??0;
  target.polygonOffset=source.polygonOffset;target.polygonOffsetFactor=source.polygonOffsetFactor;target.polygonOffsetUnits=source.polygonOffsetUnits;
  target.clippingPlanes=source.clippingPlanes;target.clipIntersection=source.clipIntersection;return target;
 }
 function render(scene:T.Scene,camera:T.Camera){
  const swapped:Array<[T.Mesh,T.Material|T.Material[]]>=[],hidden:T.Object3D[]=[];
  scene.traverseVisible(object=>{
   if(!(object instanceof T.Mesh))return;const list=Array.isArray(object.material)?object.material:[object.material];
   if(list.some(m=>m.transparent||!m.depthWrite||!m.depthTest)){hidden.push(object);return;}
   swapped.push([object,object.material]);object.material=Array.isArray(object.material)?list.map(depth):depth(object.material);
  });
  for(const object of hidden)object.visible=false;
  const clear=renderer.autoClear,shadows=renderer.shadowMap.autoUpdate,shadowUpdate=renderer.shadowMap.needsUpdate,reset=renderer.info.autoReset;
  renderer.autoClear=false;renderer.info.autoReset=false;renderer.info.reset();renderer.clear();
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=false;
  try{renderer.render(scene,camera);}finally{
   for(const [mesh,material]of swapped)mesh.material=material;
   for(const object of hidden)object.visible=true;
   renderer.shadowMap.autoUpdate=shadows;renderer.shadowMap.needsUpdate=shadowUpdate;
  }
  try{renderer.render(scene,camera);}finally{renderer.autoClear=clear;renderer.info.autoReset=reset;}
 }
 return {render,dispose(){for(const material of materials.values())material.dispose();materials.clear();}};
}
