import * as T from 'three';
import {makeCharacter,type PaperArt} from '../art.js';
import {CharacterVisual,type VisualAssetDefinition,type VisualAssetLibrary} from './visualAsset.js';

export interface SceneActor {
 readonly rig:T.Group;
 swing(walking:boolean,time:number):void;
 gesture(arm:number,angle:number):void;
 lean(angle:number):void;
}
export function legacyActor(art:PaperArt,kind:Parameters<typeof makeCharacter>[1]){
 const actor=makeCharacter(art,kind);
 return {...actor,swing(walking:boolean,time:number){actor.legs.forEach((leg,i)=>leg.rotation.x=walking?Math.sin(time*10+i*Math.PI)*.4:0);actor.arms.forEach((arm,i)=>arm.rotation.x=walking?Math.sin(time*10-i*Math.PI)*.25:0);},gesture(arm:number,angle:number){actor.arms[arm]!.rotation.x=angle;},lean(angle:number){actor.body.rotation.x=angle;}};
}

/** Stable interaction root; the approved skin is independent of legacy character joints. */
export class ModelActor implements SceneActor {
 readonly rig=new T.Group();
 readonly pickProxy:T.Mesh;
 private visual:CharacterVisual|null=null;
 private loading=false;private closed=false;private wanted=false;private generation=0;
 private previous=new T.Vector3();private heading=0;private positioned=false;
 private gestureCarry=false;
 error:string|null=null;
 constructor(private library:VisualAssetLibrary,readonly definition:VisualAssetDefinition){
  this.rig.name=definition.id+'-actor';
  // Pick a stable capsule, not every triangle in an animated body.
  const proxy=new T.Mesh(new T.CapsuleGeometry(.24,.70,3,6),new T.MeshBasicMaterial({visible:false}));
  this.pickProxy=proxy;proxy.position.y=.64;proxy.userData['target']=definition.id;this.rig.add(proxy);
 }
 get ready(){return !!this.visual;}
 get animation(){return this.visual?.animation??null;}
 get hand(){return this.visual?.hand??null;}
 get facingYaw(){return this.positioned?this.heading:this.rig.rotation.y;}
 swing(_walking:boolean,_time:number){/* Movement is derived from the final authoritative actor pose. */}
 gesture(_arm:number,angle:number){if(Math.abs(angle)>.12)this.gestureCarry=true;}
 lean(_angle:number){/* A whole-body rotation would break the grounded approved skeleton. */}
 get required(){return this.wanted&&!this.closed;}
 get activeError(){return this.required?this.error:null;}
 demand(wanted:boolean){
  this.wanted=wanted;if(!wanted)this.error=null;
  if(!wanted&&this.visual){this.visual.dispose();this.visual=null;this.positioned=false;}
  if(this.closed||!wanted||this.visual||this.loading||this.error)return;
  this.loading=true;const generation=++this.generation;
  void this.library.acquire(this.definition).then(lease=>{
   if(this.closed||!this.wanted||generation!==this.generation){lease.release();return;}
   this.visual=new CharacterVisual(lease);this.rig.add(this.visual.root);this.positioned=false;
   this.visual.root.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=true;o.receiveShadow=true;}});
  }).catch(error=>{if(!this.closed&&this.wanted)this.error=String(error);}).finally(()=>{this.loading=false;});
 }
 update(dt:number,options:{carrying:boolean;paused:boolean;reducedMotion:boolean;standingOnMovingSupport?:boolean;gait?:'walk'|'jog';action?:{kind:string;progress:number}}){
  const visual=this.visual;if(!visual)return;
  const step=this.positioned?this.previous.distanceTo(this.rig.position):0;
  const speed=!options.standingOnMovingSupport&&dt>0&&dt<.25&&step<.6?step/dt:0;
  const target=this.rig.rotation.y;
  if(!this.positioned)this.heading=target;
  else{const angle=Math.atan2(Math.sin(target-this.heading),Math.cos(target-this.heading));this.heading+=angle*Math.min(1,dt*14);}
  // A work pose must not freeze the legs while the authoritative actor travels.
  // Climbing is the one authored motion that intentionally moves the whole rig.
  const action=speed>.02&&options.action?.kind!=='climb'?undefined:options.action;
  visual.sync({position:[0,0,0],yaw:this.heading-target,motion:speed>.02?(options.gait??'walk'):'idle',speed,carrying:options.carrying||this.gestureCarry,paused:options.paused,reducedMotion:options.reducedMotion,...(action?{action}:{})});
  visual.update(dt);this.previous.copy(this.rig.position);this.positioned=true;this.gestureCarry=false;
 }
 handPoint(target=new T.Vector3(),lift=0){
  if(this.hand){this.rig.updateWorldMatrix(true,true);return this.hand.localToWorld(target.set(0,lift,0));}
  return target.copy(this.rig.position).add(new T.Vector3(-.12,.6,.16));
 }
 attachmentPoint(name:string,target=new T.Vector3()){
  const socket=this.visual?.attachment(name);if(socket){this.rig.updateWorldMatrix(true,true);return socket.getWorldPosition(target);}
  return this.rig.localToWorld(target.set(0,.58,-.31));
 }
 reachHand(target:T.Vector3,side:'left'|'right'='right'){return this.visual?.reachHand(target,side)??null;}
 dispose(){if(this.closed)return;this.closed=true;this.generation++;this.visual?.dispose();this.rig.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});this.rig.clear();}
}
