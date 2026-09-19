import {legacyConstruction,syncConstruction} from '../src/garden/bridgeConstruction.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {PaperArt} from '../src/garden/art.js';
import {legacyActor as makeCharacter} from '../src/garden/assets/actor.js';
import {makeGathering} from '../src/garden/gatheringWorld.js';
import {initialGarden,bridgeCenter,bridgeReady,type GardenState,type Point} from '../src/garden/model.js';
import {gatheringDurations,type GatheringAction,type ArrivalCheckpoint} from '../src/garden/gathering.js';
import {anchors,GARDEN_STORAGE,DOCK_PASSENGER_EXITS,navigable,segmentClear,regionAt} from '../src/garden/worldLayout.js';

// Synthetic animation snapshots exercise real presentation geometry and navigation.
// They do not establish browser rendering, physical playback, story completion or a new narrative outcome.
type Options={center?:Point;secured?:boolean;reduced?:boolean;later?:boolean;arrival?:ArrivalCheckpoint};
function snapshot(kind:GatheringAction,progress:number,options:Options={}):GardenState{
 const s=initialGarden('synthetic-gathering-layout'),c=s.chapter,center=options.center??{x:0,z:3};
 c.started=true;c.reducedMotion=options.reduced??false;c.pip={...anchors.garden.approach};
 c.story.plan={time:options.later===false?'usual':'later',reader:'pip',revision:1};c.story.phase=kind==='bringCushions'?'grandma':'arriving';
 c.gathering.arrival=options.arrival??(kind==='finalBoat'?'not-started':kind==='finalPassengers'?'boat-moored':kind==='solArrival'?'passengers-ashore':kind==='maraArrival'?'sol-arrived':'ready');
 c.joined=options.secured!==false;c.west=options.secured!==false;c.east=options.secured!==false;
 c.sections.a={x:center.x-.775,z:center.z,rotation:0};c.sections.b={x:center.x+.775,z:center.z,rotation:0};
 c.river.construction=legacyConstruction(c);syncConstruction(c);
 c.mara.service='served';s.action={id:'synthetic-animation',kind,elapsed:progress*gatheringDurations[kind],duration:gatheringDurations[kind],from:{...c.pip},hasSeed:false};
 return s;
}
function fixture(){
 const art=new PaperArt(),gathering=makeGathering(art),cast={pip:makeCharacter(art,'pip'),mara:makeCharacter(art,'mara'),sol:makeCharacter(art,'sol'),grandma:makeCharacter(art,'grandma'),passengers:[makeCharacter(art,'boy'),makeCharacter(art,'passenger')],operator:makeCharacter(art,'operator'),boat:new T.Group(),gangway:art.box(new T.Group(),0,0,0,1.1,.08,.46,'#bf9868'),solPage:new T.Group(),cushions:new T.Group()};
 function render(s:GardenState,time=1){
  const before=JSON.stringify(s);
  for(const [character,point] of [[cast.pip,s.chapter.pip],[cast.mara,anchors.dock.person],[cast.sol,anchors.workshop.person],[cast.grandma,anchors.garden.person]] as const)character.rig.position.set(point.x,.13,point.z);
  const view=gathering.render(s,cast,time);assert.equal(JSON.stringify(s),before,'Rendering cannot mutate the authoritative snapshot');return view;
 }
 return {art,gathering,cast,render};
}
const point=(character:ReturnType<typeof makeCharacter>):Point=>({x:character.rig.position.x,z:character.rig.position.z});
const near=(actual:Point,expected:Point,tolerance=1e-8)=>assert.ok(Math.hypot(actual.x-expected.x,actual.z-expected.z)<tolerance,JSON.stringify({actual,expected}));

test('gathering layout: Sol traverses the navigable east bank from the relocated workshop with his manuscript',()=>{
 const f=fixture();let previous:Point|undefined;
 try{
  for(let i=0;i<=120;i++){
   f.render(snapshot('solArrival',i/120));const p=point(f.cast.sol);assert.ok(navigable(p));if(previous)assert.ok(segmentClear(previous,p));previous=p;
   near(f.cast.solPage.position,{x:p.x+.18,z:p.z+.13});
   if(i===0)near(p,anchors.workshop.person);
  }
  near(point(f.cast.sol),anchors.gathering.sol);
 }finally{f.art.dispose();}
});

test('gathering layout: Mara uses the actual secured bridge center and cannot invent an unavailable crossing',()=>{
 const f=fixture();
 try{
  for(const center of [{x:0,z:3},{x:.04,z:3.12},{x:-.04,z:2.9}]){
   let previous:Point|undefined,nearest=Infinity;
   for(let i=0;i<=240;i++){
    const s=snapshot('maraArrival',i/240,{center});assert.ok(bridgeReady(s.chapter));f.render(s);const p=point(f.cast.mara),bridge=bridgeCenter(s.chapter);
    assert.ok(navigable(p,bridge));if(previous)assert.ok(segmentClear(previous,p,bridge));previous=p;nearest=Math.min(nearest,Math.hypot(p.x-bridge.x,p.z-bridge.z));
    if(i===0)near(p,anchors.dock.person);
   }
   near(point(f.cast.mara),anchors.gathering.mara);assert.ok(nearest<.12,'The arrival actually passes the selected bridge center');
  }
  for(const progress of [0,.5,1]){f.render(snapshot('maraArrival',progress,{secured:false}));near(point(f.cast.mara),anchors.dock.person);}
 }finally{f.art.dispose();}
});

test('gathering layout: final boat and gangway stay at the relocated passenger dock',()=>{
 const f=fixture();
 try{
  f.render(snapshot('finalBoat',0));near(f.cast.boat.position,{x:anchors.dock.boat.x+1,z:anchors.dock.boat.z-2.1});assert.equal(f.cast.gangway.visible,false);
  const steps:number[]=[];let previous=f.cast.boat.position.clone();
  for(let i=1;i<=60;i++){
   f.render(snapshot('finalBoat',i/60));const at=f.cast.boat.position,heading=f.cast.boat.rotation.y-Math.PI/2,dx=at.x-previous.x,dz=at.z-previous.z;
   assert.ok(Math.abs(Math.atan2(dx,dz)-heading)<.025,'The bow follows the approach tangent');steps.push(Math.hypot(dx,dz));
   f.cast.passengers.forEach((passenger,index)=>assert.ok(Math.abs(Math.hypot(passenger.rig.position.x-at.x,passenger.rig.position.z-at.z)-(index?.23:.30))<1e-8,'Riders retain their actual deck attachment'));
   assert.ok(Math.abs(Math.hypot(f.cast.operator.rig.position.x-at.x,f.cast.operator.rig.position.z-at.z)-Math.hypot(.1,.65))<1e-8);previous=at.clone();
  }
  assert.ok(steps.at(-1)!<steps[0]!/20,'The vessel slows before mooring');
  f.render(snapshot('finalBoat',1));near(f.cast.boat.position,anchors.dock.boat);
  f.render(snapshot('finalPassengers',0));near(f.cast.gangway.position,{x:anchors.dock.boat.x-.55,z:anchors.dock.boat.z});assert.equal(f.cast.gangway.visible,true);
  near(f.cast.operator.rig.position,{x:anchors.dock.boat.x+.1,z:anchors.dock.boat.z-.65});
 }finally{f.art.dispose();}
});

test('gathering layout: passengers use the vessel and gangway, then routes that avoid the dock office',()=>{
 const f=fixture();const positions:Point[][]=[[],[]];
 try{
  for(let i=0;i<=160;i++){
   f.render(snapshot('finalPassengers',i/160));
   for(const [index,passenger] of f.cast.passengers.entries()){
    const p=point(passenger),onVesselOrGangway=p.x>=anchors.dock.boat.x-.95-1e-8&&p.x<=anchors.dock.boat.x+1e-8&&Math.abs(p.z-anchors.dock.boat.z)<=.301;
    assert.ok(onVesselOrGangway||navigable(p));const samples=positions[index]!,before=samples.at(-1);if(before)assert.ok(Math.hypot(p.x-before.x,p.z-before.z)<.11);samples.push(p);
   }
   assert.ok(navigable(point(f.cast.mara)));
  }
  near(point(f.cast.mara),anchors.dock.person);
  for(const [index,passenger] of f.cast.passengers.entries())near(point(passenger),DOCK_PASSENGER_EXITS[index]!);
  const endpoints=f.cast.passengers.map(point),s=snapshot('solArrival',.5,{arrival:'passengers-ashore'});f.render(s);
  f.cast.passengers.forEach((passenger,index)=>near(point(passenger),endpoints[index]!));
  assert.equal(f.render(s)?.offDuty,true);
 }finally{f.art.dispose();}
});

test('gathering layout: Grandma goes around the bench to garden storage and returns with the cushions',()=>{
 const f=fixture();let previous:Point|undefined;
 try{
  const box=f.gathering.root.children[0]!;assert.equal(regionAt(box.position),'garden');near(box.position,GARDEN_STORAGE);
  for(let i=0;i<=160;i++){
   f.render(snapshot('bringCushions',i/160));const p=point(f.cast.grandma);assert.ok(navigable(p));if(previous)assert.ok(segmentClear(previous,p));previous=p;
   if(i===0)near(p,anchors.garden.person);
  }
  near(point(f.cast.grandma),anchors.garden.person);assert.equal(f.cast.cushions.visible,true);
  for(const progress of [.2,.6,.9]){f.render(snapshot('bringCushions',progress,{reduced:true}));assert.ok(f.cast.grandma.legs.every(leg=>leg.rotation.x===0));}
 }finally{f.art.dispose();}
});

test('gathering layout: usual-time service keeps Mara at the dock, and historical editions remain untouched',()=>{
 const f=fixture();
 try{
  const usual=snapshot('solArrival',.5,{later:false,arrival:'not-started'}),view=f.render(usual);assert.equal(view?.offDuty,false);near(point(f.cast.mara),anchors.dock.person);near(f.cast.boat.position,anchors.dock.boat);
  const historical=snapshot('solArrival',.5);historical.chapter.gathering.edition='earlier-chapter';historical.chapter.gathering.arrival='historical';assert.equal(f.render(historical),null);
 }finally{f.art.dispose();}
});
