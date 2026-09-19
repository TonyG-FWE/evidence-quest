import * as T from 'three';

/** Bounds of visible geometry in a chosen frame. Project each mesh separately:
 * rotating one large world-axis box invents empty corners around the picture. */
export function storyBounds(root:T.Object3D,frame=new T.Matrix4()){
 root.updateWorldMatrix(true,true);
 const bounds=new T.Box3(),box=new T.Box3(),matrix=new T.Matrix4();
 root.traverseVisible(object=>{
  if(!(object instanceof T.Mesh))return;
  const materials=Array.isArray(object.material)?object.material:[object.material];
  if(materials.every(material=>!material.visible))return;
  if(object instanceof T.SkinnedMesh){object.computeBoundingBox();box.copy(object.boundingBox!);}
  else{if(!object.geometry.boundingBox)object.geometry.computeBoundingBox();box.copy(object.geometry.boundingBox!);}
  matrix.multiplyMatrices(frame,object.matrixWorld);bounds.union(box.applyMatrix4(matrix));
 });
 return bounds;
}
