import * as T from 'three';
import {PaperArt} from './art.js';
import {legacyActor,type SceneActor} from './assets/actor.js';
import {BAKERY,BAKERY_SOL,TILE_SHELF,RINA_HOME,WORKSHOP_DOOR,THANK_RINA,bakeryRank,nearBakery} from './bakery.js';
import {findRoute,BAKERY_REPAIR,BAKERY_WORK,bakeryOvenPoint,bakerySourceContact} from './worldLayout.js';
import {makeDoughPortions,doughIntervals} from './doughPresentation.js';
import {makeBakeryWeather} from './bakeryWeather.js';
import type {GardenState,Point} from './model.js';

type PropPoint=Readonly<Point&{y:number}>;
const atBakery=(x:number,y:number,z:number):PropPoint=>({x:BAKERY.x+x,y,z:BAKERY.z+z});
export const roofGap:PropPoint=Object.freeze({...BAKERY_REPAIR.gap});
export const roofBeside:PropPoint=Object.freeze({...BAKERY_REPAIR.beside});
const legacySetAside=atBakery(-1.35,.27,1.10),highTile=atBakery(-1.10,2.22,-.23),ladderTop=atBakery(-1.17,1.85,-.27);
const wetFlour=atBakery(-.73,0,-.20),dryFlour=BAKERY_WORK.dryFlour,flourReach=BAKERY_WORK.flourSetdown;
const mixing=BAKERY_WORK.mixing,preparation=BAKERY_WORK.preparation,discard=BAKERY_WORK.discard,ovenBread=atBakery(.31,.49,-.05);
const toolkitHome=BAKERY_WORK.toolkit,workshopTools={x:WORKSHOP_DOOR.x+.25,y:.26,z:WORKSHOP_DOOR.z-.40};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*Math.max(0,Math.min(1,t));
const vector=(p:PropPoint)=>new T.Vector3(p.x,p.y,p.z);
// Both the final pose and the handoff use the same measured outer frame.
export const roofTileContact=(point:PropPoint)=>vector(point);
// Closest point on the supplied tile's actual upper surface, in its normalized
// frame. The hand grips this surface instead of the empty model origin.
export const tileGripOffset=(rotation:T.Euler)=>new T.Vector3(.10955251949731348,.1653133589347564,-.1503810051936263).multiplyScalar(BAKERY_REPAIR.tileScale).applyEuler(rotation);
// A different actual surface point supports horizontal carrying without the
// wide roof tile passing through the carrier's torso.
export const tileCarryGripOffset=(rotation:T.Euler)=>new T.Vector3(-.029223363747195308,.15219729925484157,-.2500496064918085).multiplyScalar(BAKERY_REPAIR.tileScale).applyEuler(rotation);
export const roofPlacementProgress=(t:number)=>{const p=Math.max(0,Math.min(1,(t-.30)/.45));return p*p*(3-2*p);};
function pathAt(points:readonly Point[],t:number){
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i]!.x,p.z-points[i]!.z));
 let left=Math.max(0,Math.min(1,t))*lengths.reduce((a,b)=>a+b,0);
 for(let i=0;i<lengths.length;i++){
  const length=lengths[i]!;if(length===0)continue;
  if(left<=length){const a=points[i]!,b=points[i+1]!,f=left/length;return {x:lerp(a.x,b.x,f),z:lerp(a.z,b.z,f),angle:Math.atan2(b.x-a.x,b.z-a.z)};}
  left-=length;
 }
 return {...points.at(-1)!,angle:0};
}
export function makeBakery(a:PaperArt,character:()=>SceneActor=()=>legacyActor(a,'rina'),suppliedModels=false){
 const setAside=suppliedModels?{x:TILE_SHELF.x,y:.60,z:TILE_SHELF.z}:legacySetAside;
 const threatenedFlour=suppliedModels?BAKERY_WORK.threatenedFlour:wetFlour;
 const flourPickup={x:threatenedFlour.x,y:.13,z:threatenedFlour.z+.67},flourSetdown=BAKERY_WORK.flourSetdown;
 const flourExit={x:flourPickup.x,z:.2},flourCarryRoute=[flourPickup,flourExit,...findRoute(flourExit,flourSetdown)];
 const flourCheckRoute=[RINA_HOME,...findRoute(RINA_HOME,flourReach)];
 const root=new T.Group(),fixed=new T.Group();root.add(fixed);
 // Only static architecture uses a local frame. Animated/pickable props remain in world coordinates.
 // The shared landscape owns the bank and village paths; this building has no separate terrain platform.
 fixed.position.set(BAKERY.x,0,BAKERY.z);
 a.box(fixed,0,.18,-.20,2.85,.14,2.25,'#e6d0a6');
 for(let i=0;i<9;i++)a.box(fixed,-1.24+i*.31,.254,-.20,.014,.007,2.14,'#c1a881');
 a.box(fixed,0,.91,-1.32,2.85,1.46,.12,'#dfb78c');
 a.box(fixed,1.38,.68,-.25,.12,1,2.05,'#dfb78c');
 for(const x of [-1.42,1.38])a.box(fixed,x,.98,.84,.12,1.6,.13,'#b18458');
 a.box(fixed,0,1.70,-1.30,2.94,.16,.21,'#a87554');
 for(const x of [-1.38,-.62,.14,.9])a.box(fixed,x,.92,-1.24,.075,1.42,.055,'#b18458');
 // The open front exposes the workbench, oven mouth and ladder without filling the roof opening.
 a.box(fixed,-.73,1.11,-1.235,.52,.48,.04,'#769c97');
 for(const x of [-1.02,-.44])a.box(fixed,x,1.11,-1.20,.045,.56,.065,'#eee0bb');
 for(const y of [.84,1.38])a.box(fixed,-.73,y,-1.20,.62,.045,.065,'#eee0bb');
 a.box(fixed,-.73,1.11,-1.19,.027,.50,.05,'#eee0bb');
 a.box(fixed,.49,1.20,-.32,.54,.25,.51,'#c69374');
 a.box(fixed,.49,1.52,-1.05,.30,.70,.35,'#bb8665');
 for(const y of [1.27,1.47,1.67])a.box(fixed,.49,y,-.867,.31,.025,.015,'#a77459');
 a.box(fixed,.49,1.89,-1.05,.39,.07,.44,'#cda181');
 a.box(fixed,.30,.66,.80,1.10,.12,.58,'#b38a60');
 for(const x of [-.20,.80])a.box(fixed,x,.38,.80,.08,.52,.08,'#8a6a50');
 a.box(fixed,.30,.729,.80,1.04,.018,.52,'#dbba87');
 a.box(fixed,TILE_SHELF.x-BAKERY.x,.47,TILE_SHELF.z-BAKERY.z,.56,.09,.50,'#9d794f');
 for(const x of [-.23,.23])a.box(fixed,TILE_SHELF.x-BAKERY.x+x,.30,TILE_SHELF.z-BAKERY.z,.055,.35,.36,'#8c6e4e');
 // Tile-sized opening in the rear roof; the front roof is a deliberate cutaway.
 for(let i=0;i<4;i++)for(let j=0;j<2;j++){
  if(i===1&&j===1)continue;
  a.box(fixed,-1.50+i*.70,1.92,-1.37+j*.82,.67,.085,.79,'#bd7452');
 }
 const oven=new T.Group();oven.position.set(BAKERY_WORK.oven.x,0,BAKERY_WORK.oven.z);oven.rotation.y=BAKERY_WORK.oven.yaw;oven.userData['target']='oven';root.add(oven);
 for(const x of [-.41,.41])a.box(oven,x,.64,0,.13,.90,.68,'#b58162');
 a.box(oven,0,1.01,0,.94,.17,.68,'#b58162');a.box(oven,0,.23,0,.94,.12,.68,'#b58162');
 a.box(oven,0,.64,-.32,.74,.76,.055,'#3d4339');a.box(oven,0,.27,.42,.67,.075,.36,'#795440');
 a.mergeStatic(oven);
 const cracked=new T.Group();cracked.userData['target']='crackedTile';root.add(cracked);
 for(const x of [-.15,.15])a.box(cracked,x,.005,0,.29,.09,.76,'#b87354');
 a.line(cracked,[new T.Vector3(-.02,.07,-.33),new T.Vector3(.03,.07,0),new T.Vector3(-.04,.07,.32)],'#443c35',.021);
 const tile=a.box(root,0,0,0,.66,.095,.77,'#d99a68');tile.userData['target']='spareTile';
 const targets=([roofGap,roofBeside] as const).map((point,i)=>{
  const target=a.box(root,point.x,i?point.y+.025:BAKERY_REPAIR.openingY+.025,point.z,BAKERY_REPAIR.dropHalf.x*2,.015,BAKERY_REPAIR.dropHalf.z*2,i?'#70aac7':'#e6bf56');
  const mat=(target.material as T.MeshStandardMaterial).clone();mat.transparent=true;mat.opacity=.5;a.resources.add(mat);target.material=mat;
  target.userData['target']=i?'tile-beside':'tile-gap';return target;
 });
 const ladder=new T.Group();root.add(ladder);
 // Geometry is local to the carrying pivot; packing never reuses a former world offset.
 for(const x of [-.14,.18])a.line(ladder,[new T.Vector3(x,.18,-.15),new T.Vector3(x,1.98,-1.11)],'#8b644a',.035);
 for(let i=0;i<7;i++)a.box(ladder,.02,.32+i*.25,-.22-i*.132,.36,.055,.055,'#c19768');
 a.mergeStatic(ladder);
 const toolkit=new T.Group();root.add(toolkit);
 a.box(toolkit,0,0,0,.44,.20,.30,'#756d5a');
 a.line(toolkit,[new T.Vector3(-.15,.10,0),new T.Vector3(-.15,.23,0),new T.Vector3(.15,.23,0),new T.Vector3(.15,.10,0)],'#a48c68',.024);
 a.mergeStatic(toolkit);
 const flour=new T.Group();flour.userData['target']='flour';root.add(flour);
 for(const [x,z] of [[0,0],[.37,-.20]]){
  a.ball(flour,x!,.38,z!,.25,'#ede0be',[.72,1.35,.7]);a.cylinder(flour,x!,.68,z!,.10,.08,.08,'#b39669');
  a.box(flour,x!,.39,z!+.177,.21,.11,.016,'#faf0d5');
 }
 a.mergeStatic(flour);
 const puddle=a.ball(root,roofGap.x-.02,suppliedModels?bakerySourceContact(0,1.24,0).y:.267,roofGap.z+.04,.34,'#71aaa8',[1.1,.015,1.6]);
 const counterWater=new T.Group();root.add(counterWater);
 if(suppliedModels)a.line(counterWater,[new T.Vector3(roofGap.x,bakerySourceContact(0,1.245,0).y,roofGap.z),vector(bakerySourceContact(19.023833324,1.19,-1.75)),new T.Vector3(threatenedFlour.x,threatenedFlour.y+.015,threatenedFlour.z-.15)],'#71aaa8',.055);
 const leak=new T.Group();leak.position.set(roofGap.x,0,roofGap.z);root.add(leak);
 for(let i=0;i<6;i++)a.box(leak,0,roofGap.y-.2-i*.65,0,.017,.28,.017,'#80bdce');
 a.mergeStatic(leak);
 const rain=new T.Group();rain.position.set(BAKERY.x,0,BAKERY.z);root.add(rain);
 for(let i=0;i<24;i++){
  const x=-1.80+(i%8)*.45,z=(suppliedModels?2.4:-1.95)+Math.floor(i/8)*.34;
  a.line(rain,[new T.Vector3(x,1.4+(i%3)*.22,z),new T.Vector3(x-.06,1.16+(i%3)*.22,z+.04)],'#91bec4',.008);
 }
 a.mergeStatic(rain);
 const weather=suppliedModels?makeBakeryWeather(a,root):null;
 const bowl=a.cylinder(root,mixing.x,suppliedModels?BAKERY_WORK.tableTop+.06:.80,mixing.z,.24,.16,.18,'#dcbd91',16);
 const dough=new T.Group();root.add(dough);dough.position.set(mixing.x,mixing.y,mixing.z);
 const wholeDough=a.ball(dough,0,0,0,.20,'#f0d4a4',[1,.55,1]),portions=makeDoughPortions(a);dough.add(portions.root);
 const portionHolders=Array.from({length:3},()=>{const holder=new T.Group();holder.visible=false;dough.add(holder);return holder;});
 bowl.userData['target']='dough';dough.userData['target']='dough';
 const flourScoop=new T.Group();a.cylinder(flourScoop,0,0,0,.10,.08,.10,'#ece1c3');a.ball(flourScoop,0,.048,0,.075,'#fff5db',[1,.25,1]);root.add(flourScoop);
 // Changing bread colour belongs to these loaves, not the scenery's shared material cache.
 const breadMaterial=a.material('#cd8d46').clone();a.resources.add(breadMaterial);
 const loaves=Array.from({length:3},()=>{
  const loaf=new T.Group();loaf.userData['target']='loaf';root.add(loaf);
  a.ball(loaf,0,0,0,.16,'#cd8d46',[1.3,.68,.8]).material=breadMaterial;
  for(const x of [-.065,.045])a.line(loaf,[new T.Vector3(x,.098,-.055),new T.Vector3(x+.055,.105,.04)],'#f0c986',.012);
  return loaf;
 });
 const uneven=new T.Group();root.add(uneven);
 a.ball(uneven,0,0,0,.31,'#b98145',[1,.6,.7]);
 const rawMiddle=a.ball(uneven,0,0,.185,.17,'#f0d4a4',[1,.60,.15]);
 const rina=character();root.add(rina.rig);rina.rig.userData['target']='rina';
 const writingPage=a.box(root,WORKSHOP_DOOR.x+.20,.91,WORKSHOP_DOOR.z+.14,.23,.32,.015,'#fff7df');
 a.mergeStatic(fixed);
 const returnRoute=[BAKERY_SOL,...findRoute(BAKERY_SOL,WORKSHOP_DOOR)];
 let previousRina={...RINA_HOME};
 function render(s:GardenState,sol:SceneActor,time:number){
  const c=s.chapter,b=c.bakery,n=bakeryRank(c),action=s.action,k=action?.kind,t=action?Math.min(1,action.elapsed/action.duration):0,legacy=b.edition==='earlier-chapter';
  const bakeTrip=Math.max(0,Math.min(2,Math.floor((t-.08)/.27))),tripProgress=Math.max(0,Math.min(1,(t-.08-bakeTrip*.27)/.27));
  let carriedLoaf:number|null=null,carriedUneven=false;
  root.visible=c.started;const repair=['delivered','gap','misplaced','sealed'].includes(b.stage)||k==='flourCheck';
  rina.rig.position.set(b.rina.x,.13,b.rina.z);
  const walking=Math.hypot(b.rina.x-previousRina.x,b.rina.z-previousRina.z)>.001;
  if(walking)rina.rig.rotation.y=Math.atan2(b.rina.x-previousRina.x,b.rina.z-previousRina.z);
  if(suppliedModels&&b.stage==='escorting'&&Math.hypot(b.rina.x-THANK_RINA.x,b.rina.z-THANK_RINA.z)<.12)rina.rig.rotation.y=Math.atan2(WORKSHOP_DOOR.x-b.rina.x,WORKSHOP_DOOR.z-b.rina.z);
  previousRina={...b.rina};
  rina.swing(walking&&!c.reducedMotion,time);
  if(['mixDough','shapeLoaves'].includes(k??'')&&!c.reducedMotion){rina.gesture(0,-.5+Math.sin(t*16)*.18);rina.gesture(1,-.5+Math.sin(t*16+1)*.18);}
  if(['mixDough','shapeLoaves','bakeBread','bakeUnshaped'].includes(k??''))rina.rig.rotation.y=Math.atan2(mixing.x-b.rina.x,mixing.z-b.rina.z);
  const moved=b.met?1:k==='bakeryWelcome'?t:0;
  flour.position.set(lerp(threatenedFlour.x,dryFlour.x,moved),suppliedModels?lerp(threatenedFlour.y,.13,moved):0,lerp(threatenedFlour.z,dryFlour.z,moved));
  if(k==='bakeryWelcome'){
   rina.rig.position.set(lerp(BAKERY.x-.57,RINA_HOME.x,t),.13,lerp(BAKERY.z+1.15,RINA_HOME.z,t));
   rina.rig.rotation.y=Math.atan2(flour.position.x-rina.rig.position.x,flour.position.z-rina.rig.position.z);
   rina.gesture(0,-.65);rina.gesture(1,-.65);
   if(suppliedModels){
    const p=t<.3?{x:lerp(RINA_HOME.x,flourPickup.x,t/.3),z:lerp(RINA_HOME.z,flourPickup.z,t/.3)}:t<.45?flourPickup:t<.8?pathAt(flourCarryRoute,(t-.45)/.35):t<.9?flourSetdown:{x:lerp(flourSetdown.x,RINA_HOME.x,(t-.9)/.1),z:lerp(flourSetdown.z,RINA_HOME.z,(t-.9)/.1)};
    rina.rig.position.set(p.x,.13,p.z);const face=t<.3?flourPickup:t<.45?threatenedFlour:t<.8?flourSetdown:t<.9?dryFlour:RINA_HOME;rina.rig.rotation.y=Math.atan2(face.x-p.x,face.z-p.z);
    flour.position.copy(vector(t<.45?threatenedFlour:{...dryFlour,y:.13}));
   }
  }
  if(k==='flourCheck'){
   const reach=t<.22?t/.22:t<.48?1:Math.max(0,1-(t-.48)/.27),pose=pathAt(flourCheckRoute,reach);
   rina.rig.position.set(pose.x,.13,pose.z);
   rina.rig.rotation.y=t<.22?pose.angle:t>=.48&&t<.75?pose.angle+Math.PI:Math.atan2(dryFlour.x-pose.x,dryFlour.z-pose.z);
   rina.lean(reach*.3);rina.gesture(0,-reach*.65);rina.gesture(1,-reach*.65);
  }else rina.lean(0);
  if(suppliedModels&&(k==='thankSol'||b.stage==='done'&&c.story.phase==='planning')){
   const pose=k==='thankSol'?pathAt([b.rina,...findRoute(b.rina,THANK_RINA)],Math.min(1,t/.30)):{...THANK_RINA,angle:0};
   rina.rig.position.set(pose.x,.13,pose.z);
   rina.rig.rotation.y=k==='thankSol'&&t<.30?pose.angle:Math.atan2(WORKSHOP_DOOR.x-pose.x,WORKSHOP_DOOR.z-pose.z);
   sol.rig.rotation.y=Math.atan2(THANK_RINA.x-WORKSHOP_DOOR.x,THANK_RINA.z-WORKSHOP_DOOR.z);
  }
  if(suppliedModels){
   const mix=k==='mixDough'?BAKERY_WORK.mixingActor:BAKERY_WORK.preparationActor,oven=BAKERY_WORK.ovenActor;
   let pose:Point|null=null,face:Point|null=null;
   if(k==='mixDough'||k==='shapeLoaves'){
    const approach=Math.min(1,t/.2,(1-t)/.2),shift=k==='mixDough'?Math.max(0,Math.min(1,(t-.62)/.18)):0;
    const work={x:lerp(mix.x,BAKERY_WORK.preparationActor.x,shift),z:lerp(mix.z,BAKERY_WORK.preparationActor.z,shift)};
    pose={x:lerp(RINA_HOME.x,work.x,approach),z:lerp(RINA_HOME.z,work.z,approach)};face=k==='mixDough'&&t<.62?mixing:preparation;
   }else if(k==='bakeBread'){
    if(t<.08){pose=pathAt([RINA_HOME,mix],t/.08);face=mix;}
    else if(t>.89){pose=pathAt([mix,RINA_HOME],(t-.89)/.11);face=RINA_HOME;}
    else if(tripProgress<.15){pose=mix;face=preparation;}
    else if(tripProgress<.55){pose=pathAt([mix,oven],(tripProgress-.15)/.4);face=oven;carriedLoaf=bakeTrip;}
    else if(tripProgress<.65){pose=oven;face=BAKERY_WORK.ovenTarget;carriedLoaf=bakeTrip;}
    else{pose=pathAt([oven,mix],(tripProgress-.65)/.35);face=mix;}
   }else if(k==='bakeUnshaped'){
    if(t<.15){pose=pathAt([RINA_HOME,mix],t/.15);face=mix;}
    else if(t<.25){pose=mix;face=preparation;}
    else if(t<.5){pose=pathAt([mix,oven],(t-.25)/.25);face=oven;carriedUneven=true;}
    else if(t<.65){pose=oven;face=BAKERY_WORK.ovenTarget;}
    else if(t<.9){pose=pathAt([oven,mix],(t-.65)/.25);face=mix;carriedUneven=true;}
    else{pose=pathAt([mix,RINA_HOME],(t-.9)/.1);face=RINA_HOME;}
   }else if(k==='takeLoaf'){
    pose=t<.4?pathAt([RINA_HOME,oven],t/.4):t<.6?oven:pathAt([oven,RINA_HOME],(t-.6)/.4);face=t<.6?BAKERY_WORK.ovenTarget:RINA_HOME;
   }
   if(pose){rina.rig.position.set(pose.x,.13,pose.z);if(face&&Math.hypot(face.x-pose.x,face.z-pose.z)>.001)rina.rig.rotation.y=Math.atan2(face.x-pose.x,face.z-pose.z);}
  }
  flourScoop.visible=k==='mixDough'&&t<.6;
  flourScoop.position.set(lerp(dryFlour.x,mixing.x,t/.5),1.02,lerp(dryFlour.z,mixing.z,t/.5));flourScoop.rotation.z=t*1.4;
  cracked.visible=!legacy;cracked.position.copy(vector(roofGap));
  if(b.cracked==='set-aside')cracked.position.copy(vector(setAside));
  if(k==='tileRemoval')cracked.position.lerp(vector(setAside),Math.max(0,(t-.75)*4));
  tile.visible=!legacy;const pos=new T.Vector3(TILE_SHELF.x,.60,TILE_SHELF.z);
  if(b.tile==='pip')pos.set(c.pip.x,.90,c.pip.z+.16);
  if(b.tile==='sol')pos.set(BAKERY_SOL.x+.17,.98,BAKERY_SOL.z+.13);
  if(b.tile==='beside')pos.copy(vector(roofBeside));if(b.tile==='roof')pos.copy(vector(roofGap));
  if(k==='tilePickup')pos.lerp(new T.Vector3(c.pip.x,.90,c.pip.z+.16),t);
  if(k==='tileDelivery')pos.lerp(new T.Vector3(BAKERY_SOL.x+.17,.98,BAKERY_SOL.z+.13),t);
  if(repair&&n>=4&&b.tile==='sol')pos.copy(vector(highTile));
  if(k==='tileRemoval'&&b.tile==='sol')pos.lerp(vector(highTile),Math.min(1,t*2));
  if(k==='tilePlacement')pos.lerp(vector(action?.placement==='gap'?roofGap:roofBeside),t);
  tile.position.copy(pos);tile.rotation.x=b.tile==='pip'||b.tile==='sol'&&!repair?-.35:0;
  if(suppliedModels){
   const onRoof=b.tile==='roof'||b.tile==='beside'||k==='tilePlacement';
   if(onRoof)tile.rotation.set(...BAKERY_REPAIR.rotation);else {tile.rotation.y=0;tile.rotation.z=0;}
   if(b.tile==='roof'||b.tile==='beside')tile.position.copy(roofTileContact(b.tile==='roof'?roofGap:roofBeside));
   cracked.rotation.set(...(b.cracked==='roof'?BAKERY_REPAIR.rotation:[0,0,0] as const));
   if(b.cracked==='roof'&&k!=='tileRemoval')cracked.position.copy(roofTileContact(roofGap));
   if(k==='tileRemoval')cracked.position.copy(roofTileContact(roofGap)).lerp(vector(setAside),Math.max(0,(t-.75)*4));
  }
  targets.forEach((target,i)=>{
   target.visible=s.mode==='bakery-repair'&&!s.panel&&['gap','misplaced'].includes(b.stage);
   (target.material as T.MeshStandardMaterial).opacity=s.bakeryPreview===(i?'beside':'gap')?.8:.28;
  });
  const leakOpen=!legacy&&n<6&&!(k==='tilePlacement'&&action?.placement==='gap'&&t>.8);
  leak.visible=leakOpen;puddle.visible=leakOpen;counterWater.visible=leakOpen;rain.visible=!legacy&&!suppliedModels;
  weather?.update(time,c.reducedMotion,nearBakery(c)&&(k==='bakeryWelcome'||n>=6),!legacy);
  leak.position.y=c.reducedMotion?0:-((time*1.7)%1)*.13;rain.position.y=c.reducedMotion?0:-((time*.9)%1)*.2;
  ladder.visible=!legacy;ladder.rotation.set(0,0,0);
  ladder.position.set(n>=7?WORKSHOP_DOOR.x-1.10:suppliedModels?BAKERY_REPAIR.ladder.x:BAKERY_SOL.x,0,n>=7?WORKSHOP_DOOR.z-.75:suppliedModels?BAKERY_REPAIR.ladder.z:BAKERY_SOL.z);
  toolkit.visible=!legacy;toolkit.rotation.y=0;toolkit.position.copy(vector(n>=7?workshopTools:toolkitHome));
  if(!legacy&&n<7){
   if(suppliedModels){
    const foot=BAKERY_REPAIR.ladderFoot,rail=BAKERY_REPAIR.ladderTop,top=BAKERY_REPAIR.solTop;
    const approach=k==='tileRemoval'?Math.min(1,t/.25):n>=4?1:0,climb=k==='tileRemoval'?Math.max(0,Math.min(1,(t-.25)/.5)):k==='flourCheck'?Math.max(0,1-t/.28):n>=4?1:0;
    const upper=climb>.8,start=upper?rail:{x:lerp(BAKERY_SOL.x,foot.x,approach),y:.13,z:lerp(BAKERY_SOL.z,foot.z,approach)},end=upper?top:rail,progress=upper?(climb-.8)/.2:climb/.8;
    sol.rig.position.set(lerp(start.x,end.x,progress),lerp(start.y,end.y,progress),lerp(start.z,end.z,progress));
    if(climb===1){const from=b.tile==='beside'?roofBeside.x:top.x,to=k==='tilePlacement'&&action?.placement==='beside'?roofBeside.x:top.x;sol.rig.position.x=k==='tilePlacement'?lerp(from,to,t/.25):from;}
    sol.rig.rotation.y=k==='tileRemoval'&&t<.25?Math.atan2(foot.x-BAKERY_SOL.x,foot.z-BAKERY_SOL.z):Math.PI;
    sol.swing(k==='tileRemoval'&&t<.25&&!c.reducedMotion,time);
   }else{const climbHeight=1.67;let high=n>=4?climbHeight:0;if(k==='tileRemoval')high=lerp(0,climbHeight,t*2);if(k==='flourCheck')high=lerp(climbHeight,0,t/.28);sol.rig.position.set(lerp(BAKERY_SOL.x,ladderTop.x,high/climbHeight),.18+high,lerp(BAKERY_SOL.z,ladderTop.z,high/climbHeight));sol.rig.rotation.y=.7;sol.gesture(0,high>1?-.65:0);sol.gesture(1,high>1?-.65:0);}
  }
  if(k==='flourCheck'&&t>.28){
   const p=pathAt(returnRoute,(t-.28)/.72);sol.rig.position.set(p.x,.13,p.z);sol.rig.rotation.y=p.angle;
   sol.swing(!c.reducedMotion,time);sol.gesture(0,-.35);sol.gesture(1,-.35);
   toolkit.position.set(p.x+.18*Math.cos(p.angle),.88,p.z-.18*Math.sin(p.angle));toolkit.rotation.y=p.angle;
   ladder.position.set(p.x-.25,.80,p.z+.10);ladder.rotation.set(0,p.angle,1.2);
  }
  uneven.visible=!!b.unshapedBatches||k==='bakeUnshaped';uneven.position.copy(vector(discard));rawMiddle.visible=!!b.unshapedBatches||k==='bakeUnshaped'&&t>.8;
  if(k==='bakeUnshaped'){const hearth=suppliedModels?bakeryOvenPoint(.32,0,.764):{...ovenBread,x:ovenBread.x+.14};uneven.position.copy(vector(t<.5?preparation:t<.9?hearth:discard));}
  bowl.visible=!legacy&&n>=7&&n<(suppliedModels?8:9);dough.visible=!legacy&&(n===8||n===7&&!!s.chapter.hands.flourInBowl||k==='mixDough')&&k!=='bakeUnshaped';
  const doughScale=k==='mixDough'?.4+.6*t:k==='shapeLoaves'?Math.max(.05,1-t):1;
  const prepared=n>=8?1:k==='mixDough'?Math.max(0,Math.min(1,(t-.62)/.18)):0;
  dough.position.copy(vector(mixing)).lerp(vector(preparation),prepared);dough.rotation.set(0,0,0);dough.scale.setScalar(doughScale);
  wholeDough.scale.set(1.8,.55,1.15);wholeDough.visible=!c.hands.cuts.length||n!==8;
  const divided=n===8&&c.hands.cuts.length>0,intervals=doughIntervals(c.hands.cuts),spread=k==='shapeLoaves'?1+t*2:1;
  portions.root.visible=!suppliedModels&&divided; if(portions.root.visible)portions.sync(c.hands.cuts,spread);
  portionHolders.forEach((holder,i)=>{const interval=intervals[i];holder.visible=divided&&!!interval;if(interval){holder.position.set((interval[0]+interval[1])/2+(i-(intervals.length-1)/2)*.025*spread,suppliedModels?-.15:-.1,0);holder.scale.set((interval[1]-interval[0])/.42,.55,1);}});
  writingPage.visible=!legacy&&n>=8&&!c.story.metSol;
  breadMaterial.color.set(n<10&&!(k==='bakeBread'&&t>.5)?'#f0d4a4':'#cd8d46');
  loaves.forEach((loaf,i)=>{
   // All hearth contacts share the oven's outer frame, including its mouth.
   const bench={x:preparation.x-.25+i*.30,y:suppliedModels?BAKERY_WORK.tableTop+.006:.79,z:preparation.z},baked=suppliedModels?bakeryOvenPoint(i===0?.38:.02,i===0?0:i===1?-.12:.12,i===0?.70:.718):{x:ovenBread.x+i*.18,y:ovenBread.y,z:ovenBread.z};
   loaf.visible=!legacy&&(n>=9||k==='shapeLoaves');loaf.position.copy(vector(bench));
   loaf.scale.setScalar(k==='shapeLoaves'?Math.max(.05,Math.min(.85,t*1.4-i*.15)):n===9?.85:1);
   if(k==='bakeBread'){
    if(!suppliedModels)loaf.position.lerp(vector(baked),Math.min(1,t*3));
    else if(i<bakeTrip||i===bakeTrip&&tripProgress>=.65||t>.89)loaf.position.copy(vector(baked));
   }
   if(n>=10)loaf.position.copy(vector(baked));
   if(i===0){
    if(b.loaf==='rina')loaf.position.set(b.rina.x+.18,.90,b.rina.z+.18);
    if(b.loaf==='sol')loaf.position.set(WORKSHOP_DOOR.x-.15,.88,WORKSHOP_DOOR.z+.15);
    if(k==='takeLoaf'&&!suppliedModels)loaf.position.lerp(new T.Vector3(b.rina.x+.18,.90,b.rina.z+.18),t);
    if(k==='thankSol')loaf.position.lerp(new T.Vector3(WORKSHOP_DOOR.x-.15,.88,WORKSHOP_DOOR.z+.15),t);
   }
  });
  return {stage:b.stage,unshapedBatches:b.unshapedBatches??0,unevenBatchVisible:uneven.visible,leakOpen,rain:!legacy,workProgress:k==='bakeryWelcome'?t:null,tile:{x:tile.position.x,y:tile.position.y,z:tile.position.z},rina:{x:rina.rig.position.x,z:rina.rig.position.z},loaf:b.loaf,handling:{carriedLoaf,carriedUneven,tripProgress,bakeTrip}};
 }
 return {root,shell:fixed,rina,tile,targets,cracked,bowl,dough,wholeDough,portionHolders,flourScoop,loaves,flour,oven,uneven,ladder,toolkit,writingPage,roofGap,roofBeside,threatenedFlour,returnRoute,render};
}
