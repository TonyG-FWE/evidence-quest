import * as T from 'three';
import {ModelActor} from './actor.js';
import {ModelProp} from './prop.js';
import {reviewAssets} from './reviewManifest.js';
import {StoryProps} from './storyProps.js';
import type {VisualAssetLibrary} from './visualAsset.js';
import type {StageActor} from '../StoryStage.js';
import {storyBounds} from './storyBounds.js';
import {attachPersonalStoryLandscape,type PersonalStoryLandscape} from './personalStoryLandscape.js';

/** A static picture made from the same supplied cast and objects as its memory.
 * Its leases belong to this card and are released when the card leaves view. */
export class ReviewLanternPicture {
 readonly root=new T.Group();
 private backing:ModelProp;
 private set=new T.Group();
 private props:StoryProps;
 private landscape:PersonalStoryLandscape|null=null;
 private actors:StageActor[]=[];
 private papers:{actor:StageActor;paper:T.Group}[]=[];
 private kind:string|null=null;
 private prepared=false;
 private wanted=false;
 private closed=false;
 constructor(private library:VisualAssetLibrary){
  this.root.name='supplied-memory-picture';
  this.props=new StoryProps(library);
  this.backing=new ModelProp(library,reviewAssets['card']!,[.001,.001,.001],'');
  this.backing.root.scale.setScalar(.62/.28);
  this.backing.root.quaternion.setFromAxisAngle(new T.Vector3(0,0,1),Math.PI/2)
   .multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),-Math.PI/2));
  this.backing.root.position.set(.31,0,-.03);this.root.add(this.backing.root);
 }
 show(kind:string|null){
  this.root.visible=!!kind;
  if(kind===this.kind||this.closed)return;
  this.clearContents();this.kind=kind;
  if(!kind)return;
  const actor=(who:string,x:number,z:number):StageActor=>{
   const model=new ModelActor(this.library,reviewAssets[who]!);
   const ch:StageActor={rig:model.rig,model,legacy:null,carrying:false};
   ch.rig.position.set(x,0,z);this.set.add(ch.rig);this.actors.push(ch);return ch;
  };
  const heldPaper=(ch:StageActor)=>{
   ch.carrying=true;const paper=new T.Group();this.set.add(paper);
   this.props.place('card',paper,[0,-.14,0],[1,1,1],[0,Math.PI/2,0]);
   this.papers.push({actor:ch,paper});return paper;
  };
  this.props.assemble(kind,this.set,actor,heldPaper,false);
  this.landscape=attachPersonalStoryLandscape(this.set,this.library,kind);
 }
 update(wanted:boolean){
  this.wanted=wanted&&!!this.kind&&!this.closed;
  this.backing.demand(this.wanted);this.props.demand(this.wanted);this.landscape?.demand(this.wanted);
  for(const ch of this.actors)ch.model!.demand(this.wanted);
  if(!this.wanted){
   this.set.removeFromParent();this.prepared=false;return;
  }
  if(this.prepared||this.pending||this.error)return;
  // Pose at original metre scale before fitting the scene into the card. Boat
  // supports and hand sockets therefore use the same coordinates as StoryStage.
  this.set.position.set(0,0,0);this.set.quaternion.identity();this.set.scale.setScalar(1);
  this.props.updateBefore(6);
  for(const ch of this.actors)ch.model!.update(0,{carrying:ch.carrying,paused:true,reducedMotion:false,...(ch.action?{action:ch.action}:{})});
  this.props.updateAfter(6);
  for(const {actor,paper} of this.papers){
   const model=actor.model!,palm=model.handPoint();
   model.hand!.getWorldQuaternion(paper.quaternion);
   paper.quaternion.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-Math.PI/2));
   paper.position.copy(palm.sub(new T.Vector3(0,.14,0).applyQuaternion(paper.quaternion)));
  }
  // Miniature actors are part of the picture, not live character hit targets.
  this.set.traverse(object=>{delete object.userData['target'];if(object instanceof T.Mesh)object.castShadow=false;});
  const view=new T.PerspectiveCamera();view.position.set(4,4.4,10);view.lookAt(0,.7,0);
  this.set.quaternion.copy(view.quaternion).invert();this.set.updateWorldMatrix(true,true);
  const bounds=storyBounds(this.set),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
  const scale=Math.min(.52/Math.max(.001,size.x),.35/Math.max(.001,size.y));
  this.set.scale.setScalar(scale);this.set.position.set(-center.x*scale,-center.y*scale,.02-bounds.min.z*scale);
  this.root.add(this.set);this.prepared=true;
 }
 get pending(){return this.wanted&&(!this.backing.ready&&!this.backing.error||this.props.pending||this.actors.some(ch=>!ch.model!.ready&&!ch.model!.error)||!!this.landscape&&!this.landscape.ready&&!this.landscape.error);}
 get error(){if(!this.wanted)return null;return this.backing.activeError??this.actors.find(ch=>ch.model!.error)?.model!.error??(this.props.failed?'A memory object could not load.':null)??this.landscape?.error??null;}
 get ready(){return this.wanted&&this.prepared;}
 /** Measured point on the original card surface after the outer card transform. */
 readonly grip=new T.Vector3(-.23001597027988968,-.17000231584096331,-.013493909041431749);
 handPosition(palm:T.Vector3){return palm.clone().sub(this.grip.clone().multiply(this.root.scale).applyQuaternion(this.root.quaternion));}
 get resources(){return [this.backing.proxy.geometry,...this.props.props.map(p=>p.proxy.geometry),...this.actors.map(ch=>ch.model!.pickProxy.geometry),...(this.landscape?.resources??[])];}
 get instanceBytes(){return this.landscape?.metrics.instanceBytes??0;}
 get instanceAllocationBytes(){return this.landscape?.metrics.instanceAllocationBytes??0;}
 get state(){return {kind:this.kind,ready:this.ready,pending:this.pending,error:this.error,card:this.backing.definition.sha256,actors:this.actors.map(ch=>({id:ch.model!.definition.id,sha256:ch.model!.definition.sha256,ready:ch.model!.ready})),objects:this.props.states,...(this.landscape?{landscape:{status:this.landscape.status,error:this.landscape.error,...this.landscape.metrics}}:{})};}
 private clearContents(){
  this.set.removeFromParent();for(const ch of this.actors)ch.model!.dispose();this.props.dispose();this.landscape?.dispose();this.landscape=null;
  this.actors=[];this.papers=[];this.set=new T.Group();this.props=new StoryProps(this.library);this.prepared=false;
 }
 dispose(){if(this.closed)return;this.closed=true;this.clearContents();this.backing.dispose();this.root.clear();}
}
