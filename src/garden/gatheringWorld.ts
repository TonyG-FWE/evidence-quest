import * as T from 'three';
import {PaperArt} from './art.js';
import type {SceneActor} from './assets/actor.js';
import {type GardenState,type Point,MARA,GRANDMA,bridgeCenter,bridgeReady} from './model.js';
import {SOL,GATHER_SOL,GATHER_MARA} from './chapter.js';
import {connectedGathering,turnLines} from './gathering.js';
import {anchors,DOCK_PASSENGER_EXITS,findRoute} from './worldLayout.js';
import {GRANDMA_STORAGE,GRANDMA_STORAGE_PATH,GRANDMA_STORAGE_WALK_MS,GRANDMA_CUSHION_MS} from './grandmaTravel.js';
import {passengerVesselPose,passengerSeat} from './passengerVessel.js';
type Character=SceneActor;
type Cast={pip:Character;mara:Character;sol:Character;grandma:Character;passengers:Character[];operator:Character;boat:T.Group;gangway:T.Mesh;solPage:T.Group;cushions:T.Group};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*Math.max(0,Math.min(1,t));
const dockLanding={x:anchors.dock.boat.x-.95,z:anchors.dock.boat.z};
const serviceSpot={x:anchors.dock.person.x+.70,z:anchors.dock.person.z+.10};
const storage=GRANDMA_STORAGE;
const passengerExit=(i:number):Point=>({...DOCK_PASSENGER_EXITS[i]!});
/** Missing routes leave the actor at the source. Presentation cannot create a crossing. */
const route=(from:Point,to:Point,bridge?:Point)=>[from,...findRoute(from,to,bridge)];
function follow(character:Character,points:readonly Point[],progress:number,time:number,reduced:boolean){
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i]!.x,p.z-points[i]!.z)),total=lengths.reduce((a,b)=>a+b,0);
 let left=Math.max(0,Math.min(1,progress))*total,at=points.at(-1)!;
 for(let i=0;i<lengths.length;i++){
  const length=lengths[i]!;if(!length)continue;
  if(left<=length||i===lengths.length-1){const p=points[i]!,q=points[i+1]!,f=left/length;at={x:lerp(p.x,q.x,f),z:lerp(p.z,q.z,f)};character.rig.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);break;}
  left-=length;
 }
 character.rig.position.set(at.x,.13,at.z);character.swing(total>0&&progress>0&&progress<1&&!reduced,time);
}
export function makeGathering(a:PaperArt){
 const root=new T.Group(),box=new T.Group();box.position.set(storage.x,.12,storage.z);root.add(box);a.box(box,0,.23,0,.72,.46,.6,'#a48460');const lid=new T.Group();box.add(lid);a.box(lid,0,0,.325,.76,.06,.65,'#d4b587');a.box(box,0,.28,.315,.17,.08,.035,'#e4cc8b');
 const carriedCushions=new T.Group();for(const y of [0,.09])a.box(carriedCushions,0,y,0,.50,.08,.42,'#e6c477');root.add(carriedCushions);
 const manuscript=new T.Group();a.box(manuscript,0,0,0,.28,.35,.02,'#fff7df');for(let i=0;i<5;i++)a.box(manuscript,0,.10-i*.04,.02,.19,.008,.004,'#a29a7d');root.add(manuscript);
 const speakingRing=new T.Mesh(new T.RingGeometry(.38,.43,40),new T.MeshBasicMaterial({color:'#f4d37f',side:T.DoubleSide,transparent:true,opacity:.85,depthWrite:false}));a.resources.add(speakingRing.geometry);a.resources.add(speakingRing.material);speakingRing.rotation.x=-Math.PI/2;root.add(speakingRing);
 const solRoute=route(SOL,GATHER_SOL),storageRoute=GRANDMA_STORAGE_PATH,storageReturn=storageRoute.slice().reverse();
 const serviceRoute=route(MARA,serviceSpot),serviceReturn=serviceRoute.slice().reverse(),passengerRoutes=new Map<number,Point[]>();
 let crossingKey='',maraRoute:Point[]=[MARA];
 function maraArrivalRoute(s:GardenState){
  const center=bridgeReady(s.chapter)?bridgeCenter(s.chapter):undefined,key=center?center.x+','+center.z:'closed';
  if(key!==crossingKey){
   crossingKey=key;maraRoute=[MARA];
   if(center){const before=findRoute(MARA,center,center),after=findRoute(center,GATHER_MARA,center);if(before.length&&after.length)maraRoute=[MARA,...before,...after];}
  }
  return maraRoute;
 }
 function render(s:GardenState,cast:Cast,time:number){
  const c=s.chapter,g=c.gathering,f=c.story,action=s.action,k=action?.kind,t=action?Math.min(1,action.elapsed/action.duration):0;
  root.visible=c.started;carriedCushions.visible=false;manuscript.visible=false;speakingRing.visible=false;lid.rotation.x=0;lid.position.set(0,.48,-.325);
  if(!connectedGathering(c))return null;
  cast.cushions.visible=g.cushions;const later=f.plan?.time==='later',begun=f.phase!=='planning',offDuty=later&&['passengers-ashore','sol-arrived','ready'].includes(g.arrival);
  if(begun){
   const moored=anchors.dock.boat,vessel=passengerVesselPose(k==='finalBoat'?t:later&&g.arrival==='not-started'?0:1);
   cast.boat.visible=true;cast.boat.position.set(vessel.x,-.1,vessel.z);cast.boat.rotation.y=Math.PI/2+vessel.heading;
   cast.gangway.visible=!later||g.arrival!=='not-started';
   cast.gangway.position.set(moored.x-.55,.20,moored.z);cast.gangway.rotation.set(0,0,0);
   cast.passengers.forEach((p,i)=>{
    p.rig.visible=true;
    const ashore=later?(offDuty?1:k==='finalPassengers'?Math.max(0,Math.min(1,(t-i*.16)/.7)):0):c.mara.service==='served'?1:0;
    let onshore=passengerRoutes.get(i);if(!onshore){onshore=route(dockLanding,passengerExit(i));passengerRoutes.set(i,onshore);}
    // The first two segments are inside the vessel and its physical gangway; land movement uses the shared navigator.
    follow(p,[passengerSeat(vessel,0,i?-.23:.30),{x:cast.boat.position.x,z:cast.boat.position.z},...onshore],ashore,time,c.reducedMotion);if(ashore===0)p.rig.rotation.y=vessel.heading;
   });
   if(k==='finalPassengers'){
    follow(cast.mara,t>.86?serviceReturn:serviceRoute,t>.86?(t-.86)/.14:Math.min(1,t/.12),time,c.reducedMotion);
    cast.mara.rig.rotation.y=t>=.12&&t<=.86?1.2:cast.mara.rig.rotation.y;cast.mara.gesture(0,-.5);
   }
   if(k==='solArrival')follow(cast.sol,solRoute,t,time,c.reducedMotion);
   if(k==='maraArrival')follow(cast.mara,maraArrivalRoute(s),t,time,c.reducedMotion);
   const operatorSeat=passengerSeat(vessel,.1,-.65);cast.operator.rig.visible=true;cast.operator.rig.position.set(operatorSeat.x,.12,operatorSeat.z);cast.operator.rig.rotation.y=-1.4+vessel.heading;
   cast.solPage.visible=true;cast.solPage.position.set(cast.sol.rig.position.x+.18,.81,cast.sol.rig.position.z+.13);
  }
  if(k==='bringCushions'){
   const elapsed=action!.elapsed,returnStart=GRANDMA_STORAGE_WALK_MS+1300,outbound=Math.min(1,elapsed/GRANDMA_STORAGE_WALK_MS),returning=Math.max(0,(elapsed-returnStart)/GRANDMA_STORAGE_WALK_MS);
   follow(cast.grandma,elapsed<returnStart?storageRoute:storageReturn,elapsed<returnStart?outbound:returning,time,c.reducedMotion);lid.rotation.x=elapsed>GRANDMA_STORAGE_WALK_MS-300&&elapsed<returnStart+600?-1.2:0;
   carriedCushions.visible=elapsed>GRANDMA_STORAGE_WALK_MS+300&&elapsed<GRANDMA_CUSHION_MS-300;carriedCushions.userData['retrievalProgress']=Math.max(0,Math.min(1,(elapsed-GRANDMA_STORAGE_WALK_MS-300)/800));carriedCushions.position.set(cast.grandma.rig.position.x-.18,.85,cast.grandma.rig.position.z+.16);
   cast.cushions.visible=elapsed>=GRANDMA_CUSHION_MS-300;
  }
  if(k==='finishGrandmaPage'||g.pageComplete){manuscript.visible=true;manuscript.position.set(cast.grandma.rig.position.x-.18,.86,cast.grandma.rig.position.z+.16);manuscript.rotation.set(-.15,.3,0);if(k==='finishGrandmaPage')cast.grandma.gesture(1,-.5);}
  const line=g.turn?turnLines(c)[g.turn.index]:null;
  if(line){const teller=cast[line.who.toLowerCase() as 'pip'|'mara'|'sol'|'grandma'];speakingRing.visible=true;speakingRing.position.set(teller.rig.position.x,.16,teller.rig.position.z);teller.gesture(0,-.35+(!s.panel&&!s.background&&!c.reducedMotion?Math.sin(time*2.4)*.12:0));
   for(const name of (g.turn?.kind==='receipt'?['pip','mara']:['pip','grandma','sol',...(later?['mara']:[])])){const listener=cast[name as 'pip'|'grandma'|'sol'|'mara'];if(listener!==teller)listener.rig.rotation.y=Math.atan2(teller.rig.position.x-listener.rig.position.x,teller.rig.position.z-listener.rig.position.z);}
  }
  return {arrival:g.arrival,offDuty,sol:{x:cast.sol.rig.position.x,z:cast.sol.rig.position.z},mara:{x:cast.mara.rig.position.x,z:cast.mara.rig.position.z},speaker:line?.who??null,turn:g.turn?.kind??null,part:g.turn?.index??null,cushions:g.cushions,pageComplete:g.pageComplete,grandmaPerformed:g.grandmaPerformed};
 }
 return {root,render,carriedCushions,manuscript,storageBox:box,storageLid:lid};
}
