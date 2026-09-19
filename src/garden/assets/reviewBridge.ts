import * as T from 'three';
import {ModelProp} from './prop.js';
import {reviewAssets} from './reviewManifest.js';
import type {VisualAssetLibrary} from './visualAsset.js';
import type {GardenState} from '../model.js';
import {bridgePosts,ropeSides,ropePoints,postPoint,constructionOf,ropeTarget,type RopeSide} from '../bridgeConstruction.js';
import {handAnchor} from '../hands.js';
import {BRIDGE_LEVELS,BRIDGE_GEOMETRY} from '../worldLayout.js';
import type {makeBridgeWorld} from '../bridgeWorld.js';

/** The two ropes retain their original supplied braid. Knots belong to committed posts. */
export class ReviewBridge {
 private spans:ModelProp[][];
 private knots:ModelProp[];
 private moving:ModelProp;
 private wrapping:ModelProp;
 constructor(library:VisualAssetLibrary,parent:T.Object3D){
  this.spans=ropeSides.map(()=>[0,1].map(()=>new ModelProp(library,reviewAssets['rope-straight']!,[.1,.1,.1],'')));
  this.knots=bridgePosts.map(()=>new ModelProp(library,reviewAssets['knot']!,[.1,.1,.1],''));
  this.moving=new ModelProp(library,reviewAssets['rope-straight']!,[.1,.1,.1],'');this.wrapping=new ModelProp(library,reviewAssets['knot']!,[.1,.1,.1],'');
  for(const prop of [...this.spans.flat(),...this.knots,this.moving,this.wrapping])parent.add(prop.root);
  for(const prop of [...this.knots,this.wrapping])prop.root.scale.fromArray(BRIDGE_GEOMETRY.knotScale);
 }
 update(s:GardenState,bridge:ReturnType<typeof makeBridgeWorld>,visible:boolean,camera:T.Camera){
  const c=s.chapter,build=constructionOf(c),frustum=new T.Frustum().setFromProjectionMatrix(new T.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse)),near=visible&&(Math.hypot(c.pip.x,c.pip.z-3)<11||frustum.intersectsSphere(new T.Sphere(new T.Vector3(0,.5,1),5)));
  ropeSides.forEach((side,sideIndex)=>{
   const points=ropePoints(c,side),progress=s.bridgeWork?.kind==='tie'&&s.bridgeWork.object==='rope:'+side?s.bridgeWork.elapsed/s.bridgeWork.duration:1;
   this.spans[sideIndex]!.forEach((prop,i)=>{
    const from=points[i],to=points[i+1];prop.root.visible=!!from&&!!to;prop.demand(near&&prop.root.visible);
    if(from&&to){const length=Math.hypot(to.x-from.x,to.z-from.z);prop.root.position.set((from.x+to.x)/2,BRIDGE_LEVELS.deck+.464-(1-progress)*.07,(from.z+to.z)/2);prop.root.rotation.y=Math.atan2(to.x-from.x,to.z-from.z);prop.root.scale.set(.3,.3,length/1.45);}
   });
   bridge.ropes[side].visible=false;
  });
  bridgePosts.forEach((id,i)=>{
   const prop=this.knots[i]!,side=id.endsWith('north')?'north':'south',end=id.startsWith('west')?'west':id.startsWith('center')?'center':'east',point=postPoint(c,id);
   prop.root.visible=build.ropes[side][end];prop.root.position.set(point.x,BRIDGE_LEVELS.deck+.46,point.z);prop.demand(near&&prop.root.visible);
  });
  for(const side of ropeSides)bridge.wraps[side].visible=false;
  const g=s.gesture,holding=g?.object==='rope:north'||g?.object==='rope:south';this.moving.root.visible=holding;this.wrapping.root.visible=false;
  if(holding&&g){const side=g.object.slice(5) as RopeSide,from=handAnchor(s,g.object),to=g.point,target=postPoint(c,ropeTarget(c,side)),length=Math.hypot(to.x-from.x,to.z-from.z);this.moving.root.position.set((from.x+to.x)/2,BRIDGE_LEVELS.deck+.464,(from.z+to.z)/2);this.moving.root.rotation.y=Math.atan2(to.x-from.x,to.z-from.z);this.moving.root.scale.set(.3,.3,Math.max(.01,length)/1.45);this.wrapping.root.visible=Math.hypot(to.x-target.x,to.z-target.z)<.34;this.wrapping.root.position.set(target.x,BRIDGE_LEVELS.deck+.46,target.z);}
  this.moving.demand(near&&holding);this.wrapping.demand(near&&this.wrapping.root.visible);
 }
 get error(){return [...this.spans.flat(),...this.knots,this.moving,this.wrapping].find(p=>p.activeError)?.activeError;}
 get pending(){return [...this.spans.flat(),...this.knots,this.moving,this.wrapping].some(p=>p.required&&!p.ready);}
 get readiness(){return [...this.spans.flat(),...this.knots,this.moving,this.wrapping].map(p=>p.ready?'ready':'unloaded').join(',');}
 dispose(){for(const prop of [...this.spans.flat(),...this.knots,this.moving,this.wrapping])prop.dispose();}
}
