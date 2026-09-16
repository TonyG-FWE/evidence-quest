import * as T from 'three';
import {PaperArt,makeCharacter} from './art.js';
import {type GardenState,type Point,MARA,GRANDMA,bridgeCenter} from './model.js';
import {SOL,GATHER_SOL,GATHER_MARA} from './chapter.js';
import {connectedGathering,turnLines} from './gathering.js';
type Character=ReturnType<typeof makeCharacter>;
type Cast={pip:Character;mara:Character;sol:Character;grandma:Character;passengers:Character[];operator:Character;boat:T.Group;gangway:T.Mesh;solPage:T.Group;cushions:T.Group};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*Math.max(0,Math.min(1,t));
function follow(character:Character,points:Point[],progress:number,time:number,reduced:boolean){
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i]!.x,p.z-points[i]!.z));let left=Math.max(0,Math.min(1,progress))*lengths.reduce((a,b)=>a+b,0),at=points.at(-1)!;
 for(let i=0;i<lengths.length;i++){if(left<=lengths[i]!){const p=points[i]!,q=points[i+1]!,f=left/lengths[i]!;at={x:lerp(p.x,q.x,f),z:lerp(p.z,q.z,f)};character.rig.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);break;}left-=lengths[i]!;}
 character.rig.position.set(at.x,.13,at.z);character.legs.forEach((leg,i)=>leg.rotation.x=progress>0&&progress<1&&!reduced?Math.sin(time*10+i*Math.PI)*.4:0);
}
export function makeGathering(a:PaperArt){
 const root=new T.Group(),box=new T.Group();box.position.set(5.95,.12,1.18);root.add(box);a.box(box,0,.23,0,.72,.46,.6,'#a48460');const lid=a.box(box,0,.48,-.01,.76,.06,.65,'#d4b587');a.box(box,0,.28,.315,.17,.08,.035,'#e4cc8b');
 const carriedCushions=new T.Group();for(const y of [0,.09])a.box(carriedCushions,0,y,0,.50,.08,.42,'#e6c477');root.add(carriedCushions);
 const manuscript=new T.Group();a.box(manuscript,0,0,0,.28,.35,.02,'#fff7df');for(let i=0;i<5;i++)a.box(manuscript,0,.10-i*.04,.02,.19,.008,.004,'#a29a7d');root.add(manuscript);
 const speakingRing=new T.Mesh(new T.RingGeometry(.38,.43,40),new T.MeshBasicMaterial({color:'#f4d37f',side:T.DoubleSide,transparent:true,opacity:.85,depthWrite:false}));a.resources.add(speakingRing.geometry);a.resources.add(speakingRing.material);speakingRing.rotation.x=-Math.PI/2;root.add(speakingRing);
 function render(s:GardenState,cast:Cast,time:number){
  const c=s.chapter,g=c.gathering,f=c.story,action=s.action,k=action?.kind,t=action?Math.min(1,action.elapsed/action.duration):0;
  root.visible=c.started;carriedCushions.visible=false;manuscript.visible=false;speakingRing.visible=false;lid.rotation.x=0;lid.position.set(0,.48,-.01);
  if(!connectedGathering(c))return null;
  cast.cushions.visible=g.cushions;const later=f.plan?.time==='later',begun=f.phase!=='planning',offDuty=later&&['passengers-ashore','sol-arrived','ready'].includes(g.arrival);
  if(begun){
   cast.boat.visible=true;cast.boat.position.set(-1.1,-.1,-4.1);cast.boat.rotation.y=Math.PI/2;
   if(later&&g.arrival==='not-started')cast.boat.position.set(.25,-.1,-4.2);
   if(k==='finalBoat')cast.boat.position.set(lerp(.25,-1.1,t),-.1,lerp(-4.2,-4.1,t));
   cast.gangway.visible=!later||g.arrival!=='not-started';
   cast.passengers.forEach((p,i)=>{
    p.rig.visible=true;
    const ashore=later?(offDuty?1:k==='finalPassengers'?Math.max(0,Math.min(1,(t-i*.16)/.7)):0):c.mara.service==='served'?1:0;
    follow(p,[{x:cast.boat.position.x,z:cast.boat.position.z+(i?-.23:.3)},{x:-2.8,z:-4.1},{x:-3.6,z:-3.4},{x:-5.65+i*.3,z:-3.35-i*.3}],ashore,time,c.reducedMotion);
   });
   if(k==='finalPassengers'){cast.mara.rig.position.set(-2.8,.13,-3.9);cast.mara.rig.rotation.y=1.2;cast.mara.arms[0]!.rotation.x=-.5;}
   if(k==='solArrival')follow(cast.sol,[SOL,{x:3.4,z:-1.4},{x:3.4,z:.1},GATHER_SOL],t,time,c.reducedMotion);
   if(k==='maraArrival'){const z=bridgeCenter(c).z;follow(cast.mara,[MARA,{x:-3.5,z:-3.05},{x:-2.6,z:3},{x:-1.9,z},{x:1.9,z},{x:2.8,z:2.9},{x:3.3,z:.4},GATHER_MARA],t,time,c.reducedMotion);}
   cast.operator.rig.visible=true;cast.operator.rig.position.set(cast.boat.position.x+.1,.12,cast.boat.position.z-.65);
   cast.solPage.visible=true;cast.solPage.position.set(cast.sol.rig.position.x+.18,.81,cast.sol.rig.position.z+.13);
  }
  if(k==='bringCushions'){
   const outbound=Math.min(1,t/.35),returning=Math.max(0,(t-.55)/.45),p=t<.55?outbound:1-returning;
   follow(cast.grandma,[GRANDMA,{x:6.15,z:3.3},{x:6.45,z:1.4}],p,time,c.reducedMotion);lid.rotation.x=t>.32&&t<.80?-1.2:0;
   carriedCushions.visible=t>.48&&t<.92;carriedCushions.position.set(cast.grandma.rig.position.x-.18,.85,cast.grandma.rig.position.z+.16);
   cast.cushions.visible=t>=.92;
  }
  if(k==='finishGrandmaPage'||g.pageComplete){manuscript.visible=true;manuscript.position.set(cast.grandma.rig.position.x-.18,.86,cast.grandma.rig.position.z+.16);manuscript.rotation.set(-.15,.3,0);if(k==='finishGrandmaPage')cast.grandma.arms[1]!.rotation.x=-.5+(c.reducedMotion?0:Math.sin(time*8)*.15);}
  const line=g.turn?turnLines(c)[g.turn.index]:null;
  if(line){const teller=cast[line.who.toLowerCase() as 'pip'|'mara'|'sol'|'grandma'];speakingRing.visible=true;speakingRing.position.set(teller.rig.position.x,.16,teller.rig.position.z);teller.arms[0]!.rotation.x=-.35+(!s.panel&&!s.background&&!c.reducedMotion?Math.sin(time*2.4)*.12:0);
   for(const name of (g.turn?.kind==='receipt'?['pip','mara']:['pip','grandma','sol',...(later?['mara']:[])])){const listener=cast[name as 'pip'|'grandma'|'sol'|'mara'];if(listener!==teller)listener.rig.rotation.y=Math.atan2(teller.rig.position.x-listener.rig.position.x,teller.rig.position.z-listener.rig.position.z);}
  }
  return {arrival:g.arrival,offDuty,sol:{x:cast.sol.rig.position.x,z:cast.sol.rig.position.z},mara:{x:cast.mara.rig.position.x,z:cast.mara.rig.position.z},speaker:line?.who??null,turn:g.turn?.kind??null,part:g.turn?.index??null,cushions:g.cushions,pageComplete:g.pageComplete,grandmaPerformed:g.grandmaPerformed};
 }
 return {root,render};
}
