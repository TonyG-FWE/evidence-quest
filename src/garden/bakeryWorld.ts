import * as T from 'three';
import {PaperArt,makeCharacter} from './art.js';
import {BAKERY,BAKERY_SOL,TILE_SHELF,RINA_HOME,WORKSHOP_DOOR,bakeryRank} from './bakery.js';
import type {GardenState,Point} from './model.js';

const GAP={x:7.45,y:1.92,z:-2.7},BESIDE={x:8.16,y:1.92,z:-2.7};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*Math.max(0,Math.min(1,t));
function pathAt(points:Point[],t:number){const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i]!.x,p.z-points[i]!.z));let left=Math.max(0,Math.min(1,t))*lengths.reduce((a,b)=>a+b,0);for(let i=0;i<lengths.length;i++){if(left<=lengths[i]!){const a=points[i]!,b=points[i+1]!,f=left/lengths[i]!;return {x:lerp(a.x,b.x,f),z:lerp(a.z,b.z,f),angle:Math.atan2(b.x-a.x,b.z-a.z)};}left-=lengths[i]!;}return {...points.at(-1)!,angle:0};}
export function makeBakery(a:PaperArt){
 const root=new T.Group(),fixed=new T.Group();root.add(fixed);
 // One connected extension of the same paper bank, with a path to the workshop.
 a.box(fixed,8.42,-.52,-2.02,3.28,.15,5.75,'#3f7565');a.box(fixed,8.4,-.31,-2.02,3.2,.32,5.65,'#dfd4b6');a.box(fixed,8.4,.005,-2.02,3.15,.31,5.6,'#b5cc91');
 a.line(fixed,[new T.Vector3(3.6,.17,-1.35),new T.Vector3(5.4,.17,-1.35),new T.Vector3(6.7,.17,-.6),new T.Vector3(9.4,.17,-.6)],'#e8daad',.22);
 a.box(fixed,BAKERY.x,.18,-2.35,2.85,.14,2.25,'#e6d0a6');
 a.box(fixed,BAKERY.x,.91,-3.47,2.85,1.46,.12,'#dfb78c');a.box(fixed,9.63,.68,-2.4,.12,1,2.05,'#dfb78c');
 for(const x of [6.83,9.63])a.box(fixed,x,.98,-1.31,.12,1.6,.13,'#b18458');
 a.box(fixed,BAKERY.x,1.7,-3.45,2.94,.16,.21,'#a87554');
 for(const x of [8.34,9.16])a.box(fixed,x,.64,-2.45,.13,.90,.68,'#b58162');a.box(fixed,8.75,1.01,-2.45,.94,.17,.68,'#b58162');a.box(fixed,8.75,.23,-2.45,.94,.12,.68,'#b58162');a.box(fixed,8.75,.64,-2.77,.74,.76,.055,'#3d4339');a.box(fixed,8.75,.27,-2.03,.67,.075,.36,'#795440');
 a.box(fixed,8.74,1.2,-2.47,.54,.25,.51,'#c69374');a.box(fixed,8.74,1.52,-3.2,.30,.7,.35,'#bb8665');
 a.box(fixed,8.55,.66,-1.35,1.10,.12,.58,'#b38a60');for(const x of [8.05,9.05])a.box(fixed,x,.38,-1.35,.08,.52,.08,'#8a6a50');
 a.box(fixed,TILE_SHELF.x,.47,TILE_SHELF.z,.56,.09,.50,'#9d794f');for(const x of [8.92,9.38])a.box(fixed,x,.3,-.4,.055,.35,.36,'#8c6e4e');
 // Roof tiles surround the visibly open target. The cutaway front keeps the workbench visible.
 for(let i=0;i<4;i++)for(let j=0;j<2;j++){if(i===1&&j===1)continue;a.box(fixed,6.75+i*.70,1.92,-3.52+j*.82,.67,.085,.79,'#bd7452');}
 const cracked=new T.Group();for(const x of [-.15,.15])a.box(cracked,x,.005,0,.29,.09,.76,'#b87354');a.line(cracked,[new T.Vector3(-.02,.07,-.33),new T.Vector3(.03,.07,0),new T.Vector3(-.04,.07,.32)],'#443c35',.021);root.add(cracked);
 const tile=a.box(root,0,0,0,.66,.095,.77,'#d99a68');tile.userData['target']='spareTile';
 const targets=(['gap','beside'] as const).map((id,i)=>{const target=a.box(root,i?BESIDE.x:GAP.x,1.988,GAP.z,.68,.025,.80,i?'#70aac7':'#e6bf56');const mat=(target.material as T.MeshStandardMaterial).clone();mat.transparent=true;mat.opacity=.5;a.resources.add(mat);target.material=mat;target.userData['target']='tile-'+id;return target;});
 const ladder=new T.Group();for(const x of [6.91,7.23])a.line(ladder,[new T.Vector3(x,.18,-1.65),new T.Vector3(x,1.98,-2.61)],'#8b644a',.035);for(let i=0;i<7;i++)a.box(ladder,7.07,.32+i*.25,-1.72-i*.132,.36,.055,.055,'#c19768');const ladderPivot=new T.Group();ladder.position.set(-BAKERY_SOL.x,0,-BAKERY_SOL.z);ladderPivot.add(ladder);ladderPivot.position.set(BAKERY_SOL.x,0,BAKERY_SOL.z);root.add(ladderPivot);
 const toolkit=new T.Group();a.box(toolkit,7.25,.26,-1.0,.44,.20,.30,'#756d5a');a.line(toolkit,[new T.Vector3(7.1,.36,-1),new T.Vector3(7.1,.49,-1),new T.Vector3(7.4,.49,-1),new T.Vector3(7.4,.36,-1)],'#a48c68',.024);root.add(toolkit);
 const sacks=new T.Group();for(const [x,z]of [[0,0],[.37,-.2]]){a.ball(sacks,x!,.38,z!,.25,'#ede0be',[.72,1.35,.7]);a.cylinder(sacks,x!,.68,z!,.10,.08,.08,'#b39669');a.box(sacks,x!,.39,z!+.177,.21,.11,.016,'#faf0d5');}root.add(sacks);
 const puddle=a.ball(root,7.43,.267,-2.2,.34,'#71aaa8',[1.1,.015,1.6]);
 const leak=new T.Group();for(let i=0;i<6;i++)a.box(leak,GAP.x,1.70-i*.24,GAP.z+.45,.017,.11,.017,'#80bdce');root.add(leak);
 const rain=new T.Group();for(let i=0;i<24;i++){const x=6.45+(i%8)*.45,z=-4.1+Math.floor(i/8)*.34;a.line(rain,[new T.Vector3(x,1.4+(i%3)*.22,z),new T.Vector3(x-.06,1.16+(i%3)*.22,z+.04)],'#91bec4',.008);}a.mergeStatic(rain);root.add(rain);
 const bowl=a.cylinder(root,8.45,.80,-1.35,.24,.16,.18,'#dcbd91',16),dough=a.ball(root,8.45,.89,-1.35,.2,'#f0d4a4',[1,.55,1]);
 const flourScoop=new T.Group();a.cylinder(flourScoop,0,0,0,.10,.08,.10,'#ece1c3');a.ball(flourScoop,0,.048,0,.075,'#fff5db',[1,.25,1]);root.add(flourScoop);
 const loaves=Array.from({length:3},(_,i)=>{const loaf=new T.Group();a.ball(loaf,0,0,0,.16,'#cd8d46',[1.3,.68,.8]);for(const x of [-.065,.045])a.line(loaf,[new T.Vector3(x,.098,-.055),new T.Vector3(x+.055,.105,.04)],'#f0c986',.012);root.add(loaf);return loaf;});
 const uneven=a.ball(root,8.07,.80,-1.48,.31,'#b98145',[1,.6,.7]);
 const rina=makeCharacter(a,'rina');root.add(rina.rig);rina.rig.userData['target']='rina';
 const writingPage=a.box(root,4.8,.87,-2.04,.23,.32,.015,'#fff7df');
 a.mergeStatic(fixed);let previousRina={...RINA_HOME};
 function render(s:GardenState,sol:ReturnType<typeof makeCharacter>,time:number){
  const c=s.chapter,b=c.bakery,n=bakeryRank(c),action=s.action,k=action?.kind,t=action?Math.min(1,action.elapsed/action.duration):0,legacy=b.edition==='earlier-chapter';
  root.visible=c.started;const repair=['delivered','gap','misplaced','sealed'].includes(b.stage)||k==='flourCheck';
  rina.rig.position.set(b.rina.x,.24,b.rina.z);const walking=Math.hypot(b.rina.x-previousRina.x,b.rina.z-previousRina.z)>.001;if(walking)rina.rig.rotation.y=Math.atan2(b.rina.x-previousRina.x,b.rina.z-previousRina.z);previousRina={...b.rina};
  rina.legs.forEach((leg,i)=>leg.rotation.x=walking&&!c.reducedMotion?Math.sin(time*10+i*Math.PI)*.38:0);rina.arms.forEach((arm,i)=>arm.rotation.x=['mixDough','shapeLoaves'].includes(k??'')&&!c.reducedMotion?-.5+Math.sin(t*16+i)*.18:0);
  const moved=b.met?1:k==='bakeryWelcome'?t:0;sacks.position.set(lerp(7.52,9.22,moved),0,lerp(-1.84,-1.83,moved));
  if(k==='bakeryWelcome'){rina.rig.position.set(lerp(7.68,RINA_HOME.x,t),.24,lerp(-1.0,RINA_HOME.z,t));rina.arms.forEach(arm=>arm.rotation.x=-.65);}
  if(k==='flourCheck'){const reach=Math.sin(Math.min(1,t/.3)*Math.PI);rina.rig.position.set(lerp(RINA_HOME.x,9.08,reach),.24,lerp(RINA_HOME.z,-1.42,reach));rina.body.rotation.x=reach*.3;rina.arms.forEach(arm=>arm.rotation.x=-reach*.65);}else rina.body.rotation.x=0;
  flourScoop.visible=k==='mixDough'&&t<.6;flourScoop.position.set(lerp(9.1,8.45,t/.5),1.02,lerp(-1.5,-1.35,t/.5));flourScoop.rotation.z=t*1.4;
  cracked.visible=!legacy;cracked.position.set(GAP.x,GAP.y,GAP.z);
  if(b.cracked==='set-aside')cracked.position.set(6.9,.27,-1.05);
  if(k==='tileRemoval')cracked.position.set(lerp(GAP.x,6.9,Math.max(0,(t-.5)*2)),lerp(GAP.y,.27,Math.max(0,(t-.5)*2)),lerp(GAP.z,-1.05,Math.max(0,(t-.5)*2)));
  tile.visible=!legacy;let pos=new T.Vector3(TILE_SHELF.x,.60,TILE_SHELF.z);
  if(b.tile==='pip')pos.set(c.pip.x,.90,c.pip.z+.16);if(b.tile==='sol')pos.set(sol.rig.position.x+.17,.98,sol.rig.position.z+.13);if(b.tile==='beside')pos.set(BESIDE.x,BESIDE.y,BESIDE.z);if(b.tile==='roof')pos.set(GAP.x,GAP.y,GAP.z);
  if(k==='tilePickup')pos.lerp(new T.Vector3(c.pip.x,.90,c.pip.z+.16),t);
  if(k==='tileDelivery')pos.lerp(new T.Vector3(BAKERY_SOL.x+.17,.98,BAKERY_SOL.z+.13),t);
  if(repair&&n>=4&&b.tile==='sol')pos.set(7.15,2.22,-2.38);
  if(k==='tilePlacement'){const p=action?.placement==='gap'?GAP:BESIDE;pos.lerp(new T.Vector3(p.x,p.y,p.z),t);}
  tile.position.copy(pos);tile.rotation.x=b.tile==='pip'||b.tile==='sol'&&!repair?-.35:0;
  targets.forEach((target,i)=>{target.visible=s.mode==='bakery-repair'&&!s.panel&&['gap','misplaced'].includes(b.stage);(target.material as T.MeshStandardMaterial).opacity=s.bakeryPreview===(i?'beside':'gap')?.8:.28;});
  const leakOpen=!legacy&&n<6&&!(k==='tilePlacement'&&action?.placement==='gap'&&t>.8);leak.visible=leakOpen;puddle.visible=leakOpen;rain.visible=!legacy;leak.position.y=c.reducedMotion?0:-((time*1.7)%1)*.13;rain.position.y=c.reducedMotion?0:-((time*.9)%1)*.2;
  ladderPivot.visible=!legacy;ladderPivot.rotation.z=0;ladderPivot.position.set(n>=7?3.4:BAKERY_SOL.x,0,n>=7?-2.9:BAKERY_SOL.z);toolkit.visible=!legacy;
  if(!legacy&&n<7){let high=n>=4?1.67:0;if(k==='tileRemoval')high=lerp(0,1.67,t*2);if(k==='flourCheck')high=lerp(1.67,0,t*3);sol.rig.position.set(lerp(BAKERY_SOL.x,7.08,high/1.67),.18+high,lerp(BAKERY_SOL.z,-2.42,high/1.67));sol.rig.rotation.y=.7;sol.arms.forEach(arm=>arm.rotation.x=high>1?-.65:0);}
  if(k==='flourCheck'&&t>.28){const p=pathAt([BAKERY_SOL,{x:6.7,z:-.55},{x:5.45,z:-1.4},WORKSHOP_DOOR],(t-.28)/.72);sol.rig.position.set(p.x,.13,p.z);sol.rig.rotation.y=p.angle;sol.legs.forEach((leg,i)=>leg.rotation.x=c.reducedMotion?0:Math.sin(time*10+i*Math.PI)*.4);toolkit.position.set(p.x-7.25,.6,p.z+1);ladderPivot.position.set(p.x-.2,.8,p.z+.1);ladderPivot.rotation.z=1.2;}
  else toolkit.position.set(n>=7?-2.5:0,0,n>=7?-1.55:0);
  uneven.visible=!!b.unshapedBatches||k==='bakeUnshaped';uneven.position.set(8.03,.8,-1.5);if(k==='bakeUnshaped')uneven.position.set(lerp(8.45,8.70,Math.min(1,t*3)),lerp(.89,.49,Math.min(1,t*3)),lerp(-1.35,-2.2,Math.min(1,t*3)));
  bowl.visible=!legacy&&n>=7&&n<9;dough.visible=!legacy&&(n===8||k==='mixDough')&&k!=='bakeUnshaped';if(k==='mixDough')dough.scale.setScalar(.4+.6*t);else dough.scale.setScalar(1);
  writingPage.visible=!legacy&&n>=8&&!c.story.metSol;writingPage.position.set(WORKSHOP_DOOR.x+.20,.91,WORKSHOP_DOOR.z+.14);
  loaves.forEach((loaf,i)=>{loaf.visible=!legacy&&(n>=9||k==='shapeLoaves');loaf.position.set(8.20+i*.30,.79,-1.35);loaf.scale.setScalar(k==='shapeLoaves'?Math.max(.05,Math.min(.85,t*1.4-i*.15)):n===9?.85:1);((loaf.children[0] as T.Mesh).material as T.MeshStandardMaterial).color.set(n<10&&!(k==='bakeBread'&&t>.5)?'#f0d4a4':'#cd8d46');if(k==='bakeBread'){loaf.position.set(lerp(8.20+i*.30,8.56+i*.18,Math.min(1,t*3)),lerp(.79,.49,Math.min(1,t*3)),lerp(-1.35,-2.2,Math.min(1,t*3)));}if(n>=10)loaf.position.set(8.56+i*.18,.49,-2.2);if(i===0){if(b.loaf==='rina')loaf.position.set(b.rina.x+.18,.90,b.rina.z+.18);if(b.loaf==='sol')loaf.position.set(WORKSHOP_DOOR.x-.15,.88,WORKSHOP_DOOR.z+.15);if(k==='takeLoaf')loaf.position.lerp(new T.Vector3(b.rina.x+.18,.90,b.rina.z+.18),t);if(k==='thankSol')loaf.position.lerp(new T.Vector3(WORKSHOP_DOOR.x-.15,.88,WORKSHOP_DOOR.z+.15),t);}});
  return {stage:b.stage,unshapedBatches:b.unshapedBatches??0,unevenBatchVisible:uneven.visible,leakOpen,rain:rain.visible,tile:{x:tile.position.x,y:tile.position.y,z:tile.position.z},rina:{x:rina.rig.position.x,z:rina.rig.position.z},loaf:b.loaf};
 }
 return {root,rina,tile,targets,render};
}
