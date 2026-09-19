import * as T from 'three';
import {ModelProp} from './prop.js';
import {reviewAssets} from './reviewManifest.js';
import type {VisualAssetLibrary} from './visualAsset.js';
import type {StageActor} from '../StoryStage.js';
import {VILLAGE_BUILDINGS,BAKERY_REPAIR} from '../worldLayout.js';
import {roofTileContact} from '../bakeryWorld.js';

type Actor=StageActor;
type Cast='pip'|'grandma'|'mara'|'sol'|'rina'|'boy'|'passenger';
type Position=readonly [number,number,number];

/** Each picture owns its leases. It illustrates the recorded event and never
 * changes possession, the live chapter, or a selected ending. */
export class StoryProps {
 readonly props:ModelProp[]=[];
 private before:((t:number)=>void)[]=[];
 private after:((t:number)=>void)[]=[];
 constructor(private library:VisualAssetLibrary){}
 place(id:string,parent:T.Object3D,position:Position=[0,0,0],scale:Position=[1,1,1],rotation:Position=[0,0,0]){
  const definition=reviewAssets[id];if(!definition)throw Error('Missing story object: '+id);
  const prop=new ModelProp(this.library,definition,[.01,.01,.01],'');
  prop.root.position.fromArray(position);prop.root.scale.fromArray(scale);prop.root.rotation.set(...rotation);parent.add(prop.root);this.props.push(prop);return prop;
 }
 assemble(kind:string,set:T.Group,actor:(who:Cast,x:number,z:number)=>Actor,heldPaper:(actor:Actor)=>T.Group,animate:boolean){
  const place=(id:string,position:Position,scale:Position=[1,1,1],rotation:Position=[0,0,0])=>this.place(id,set,position,scale,rotation);
  const flower=(x:number,z:number,scale=1)=>place('flower-2',[x,0,z],[scale,scale,scale]);
  const bench=()=>place('bench-1',[.7,0,-.48],[.83,.70,.95],[0,Math.PI/2,0]);
  const support=(ch:Actor,prop:ModelProp)=>this.before.push(()=>{ch.rig.position.y=prop.supportHeight(ch.rig.position)??0;});
  const carry=(ch:Actor,object:T.Object3D,offset=new T.Vector3())=>{
   if(!ch.model?.ready){object.visible=false;return;}object.visible=true;
   object.position.copy(set.worldToLocal(ch.model.handPoint().add(offset)));
  };
  if(['bread','thanks','both','draft'].includes(kind)){
   const building=VILLAGE_BUILDINGS.bakery,position:Position=[-.65,0,-3.3];
   place('bakery',position,[building.scale,building.scale,building.scale],[0,building.rotation,0]);
   const repaired=new T.Group();set.add(repaired);repaired.rotation.set(...BAKERY_REPAIR.rotation);
   repaired.position.copy(roofTileContact(BAKERY_REPAIR.gap)).sub(new T.Vector3(...building.position)).add(new T.Vector3(...position));
   this.place('tile',repaired,[0,0,0],[BAKERY_REPAIR.tileScale,BAKERY_REPAIR.tileScale,BAKERY_REPAIR.tileScale]);
   for(const x of [-2.55,-2.14])place('flour',[x,0,.65]);
   place('bench',[1.2,0,.05],[.78,.80,.78],[0,Math.PI/2,0]);
   place('toolbox',[1.60,.628,.05],[.65,.65,.65]);
   const sheet=place('card',[.88,.635,.05],[1,1,1],[0,0,Math.PI/2]);
   const sol=actor('sol',1.8,1.35),rina=actor('rina',-.65,1.35);sol.rig.rotation.y=-Math.PI/2;
   if(kind==='draft'){sheet.root.visible=false;heldPaper(sol);}
   const bread=place('loaf',[1.05,.63,.18],[.72,.72,.72],[0,Math.PI/2,0]);
   const second=place('loaf',[.75,.63,-.04],[.72,.72,.72],[0,Math.PI/2,0]);
   if(kind==='draft'){bread.root.visible=false;second.root.visible=false;}
   this.before.push(t=>{const walk=kind==='thanks'?Math.min(1,t/2.8):kind==='both'?T.MathUtils.clamp((t-2)/3,0,1):0;
    rina.rig.position.x=-.65+walk*1.7;rina.rig.rotation.y=walk?Math.PI/2:0;
    rina.carrying=kind==='thanks'||kind==='both'&&t>=2;sol.carrying=kind==='draft'||walk===1;
   });
   this.after.push(t=>{const walk=kind==='thanks'?Math.min(1,t/2.8):kind==='both'?T.MathUtils.clamp((t-2)/3,0,1):0;
    if(kind==='thanks'||kind==='both'&&t>=2){
     if(walk<1)carry(rina,bread.root);else carry(sol,bread.root);
    }
   });
  }else if(['repair','promise'].includes(kind)){
   const dock=place('dock',[0,-.78,-.55],[1,.7,.7],[0,Math.PI,0]),mara=actor('mara',-.9,.12),boy=actor('boy',.58,.15);
   support(mara,dock);support(boy,dock);mara.rig.rotation.y=1;boy.rig.rotation.y=-1;boy.carrying=true;
   const bird=new T.Group();set.add(bird);bird.scale.setScalar(.75);
   this.place('bird',bird,[-.02,-.165,.09],[1,1,1],[0,Math.PI/2,0]);
   this.place('wingtip',bird,[.22,-.03,.05],[.55,.55,.55],[0,Math.PI/2,0]);
   if(kind==='repair')this.place('tape-strip',bird,[.16,-.023,.06],[1,1,1],[Math.PI/2,0,.55]);
   this.before.push(t=>{boy.action={kind:'bird',progress:Math.min(1,t/3)};});
   this.after.push(()=>carry(boy,bird,new T.Vector3(0,.025,0)));
  }else if(kind==='duet'){
   const boat=place('boat-2',[0,-.18,0],[1,1,1],[0,Math.PI/2,0]),boy=actor('boy',-.65,0),passenger=actor('passenger',.65,0);
   support(boy,boat);support(passenger,boat);boy.rig.rotation.y=.4;passenger.rig.rotation.y=-.4;
   const flute=place('recorder',[0,0,0]);
   this.before.push(t=>{boy.action={kind:'flute',progress:T.MathUtils.clamp(t/2,0,1)};});
   this.after.push(()=>{if(!boy.model?.ready){flute.root.visible=false;return;}flute.root.visible=true;
    // The native flute pose provides both hands. Keep the actual instrument
    // between them rather than mounting it to an unrelated legacy body joint.
    const right=boy.model.handPoint(),left=boy.model.attachmentPoint('leftHand'),axis=left.clone().sub(right).normalize();
    flute.root.quaternion.setFromUnitVectors(new T.Vector3(1,0,0),axis);flute.root.position.copy(set.worldToLocal(right.clone().lerp(left,.5)));
   });
  }else if(kind==='picnic'){
   place('bench',[0,0,0],[1.25,.80,1.25],[0,Math.PI/2,0]);
   place('napkin',[0,.63,0],[4.3,1,2.7]);
   for(const x of [-.73,.73])for(const z of [-.42,.42])place('rock',[x,.69,z],[.22,.15,.22]);
   place('cake',[0,.69,0]);actor('grandma',-.95,.95);actor('sol',1.65,.15);actor('mara',-.95,-1.05);
  }else if(kind==='bench'){
   bench();for(const x of [.15,.88])place('cushion',[x,.392,-.39]);heldPaper(actor('grandma',-.85,.6));
  }else if(kind==='delivery'){
   const dock=place('dock',[-.6,-.78,-.55],[1,.7,.7],[0,Math.PI,0]),m=actor('mara',-.7,-.2),p=actor('pip',-.7,.9);
   support(m,dock);support(p,dock);heldPaper(p);m.rig.rotation.y=.1;p.rig.rotation.y=2.8;
  }else if(kind==='waiting-flower'||kind==='planting'){
   place('soil-covered',[0,0,.3]);const bloom=flower(0,.3),sprout=place('sprout',[0,.05,.3]);
   if(kind==='waiting-flower'){sprout.root.visible=false;}
   else{const p=actor('pip',-.65,.3),g=actor('grandma',.7,.3);p.rig.rotation.y=.8;g.rig.rotation.y=-.8;
    this.before.push(t=>{const growth=animate?T.MathUtils.clamp((t-1)/3,0,1):1;bloom.root.visible=growth>0;bloom.root.scale.setScalar(.15+.85*growth);sprout.root.visible=growth<.4;});
   }
  }else{
   bench();const p=actor('pip',-1.2,.7),g=actor('grandma',.5,.9);actor('sol',1.8,-.1);
   const m=kind!=='gather-absent'&&kind!=='gather-waiting'?actor('mara',-1.2,-.6):null,teller=kind==='gather-mara'?m:kind==='gathering'?g:p;
   if(kind!=='gather-waiting'&&teller)heldPaper(teller);flower(-2.3,.9,.75);flower(2.4,.9,.75);
  }
 }
 updateBefore(t:number){for(const update of this.before)update(t);}
 updateAfter(t:number){for(const update of this.after)update(t);}
 demand(active:boolean){for(const prop of this.props)prop.demand(active);}
 get states(){return this.props.map(p=>({id:p.definition.id,sha256:p.definition.sha256,status:p.ready?'p2-review':p.error?'unavailable':'loading'}));}
 get pending(){return this.props.some(p=>!p.ready&&!p.error);}
 get failed(){return this.props.some(p=>!!p.error);}
 dispose(){for(const prop of this.props)prop.dispose();}
}
