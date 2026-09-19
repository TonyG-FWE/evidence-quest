import {STAGED_SECTIONS,type Chapter,type Point,type Section} from './model.js';
import {anchors,riverCenter,riverHalfWidth,BRIDGE_LEVELS,BRIDGE_GEOMETRY} from './worldLayout.js';
import {validGrandmaTravel,type GrandmaTravel} from './grandmaTravel.js';
import {freshConstruction,validConstruction,sectionSecured,sectionPlacementTargets,safeBridgeRetreat,type BridgeConstruction} from './bridgeConstruction.js';

export interface RiverState {
 construction?:BridgeConstruction;
 journeyVersion:1;collection:GrandmaTravel|null;
 edition:'connected-20260915'|'earlier-chapter';ropesCollected:boolean;soilPrepared:boolean;
 attachments:{west:'a'|'b'|null;east:'a'|'b'|null};
 ropeLocations:{west:'box'|'pip'|'attached';east:'box'|'pip'|'attached'};
 boat:{position:Point;phase:'moored'|'loaded'|'steering'|'waiting';heading?:number};
}
export const LAUNCH=anchors.boat.launch,LANDING=anchors.boat.landing,ROCK={x:0,z:.8};
export const RIVER_ROCKS=[ROCK,{x:1.1,z:5.35},{x:.4,z:8.2}];
export const riverWidth=riverHalfWidth;
export const spanCenter=(c:Chapter)=>({x:(c.sections.a.x+c.sections.b.x)/2,z:(c.sections.a.z+c.sections.b.z)/2});
export const sectionAtEnd=(c:Chapter,end:'west'|'east')=>c.river?.attachments[end]??((c.sections.a.x<c.sections.b.x)===(end==='west')?'a':'b');
export function freshRiver():RiverState{return {construction:freshConstruction(),journeyVersion:1,collection:null,edition:'connected-20260915',ropesCollected:false,soilPrepared:false,attachments:{west:null,east:null},ropeLocations:{west:'box',east:'box'},boat:{position:{...LAUNCH},phase:'moored'}};}
export function earlierRiver(c:Chapter):RiverState{return {journeyVersion:1,collection:null,edition:'earlier-chapter',ropesCollected:false,soilPrepared:c.seed==='grandma'||c.seed==='soil',attachments:{west:c.west?((c.sections.a.x<c.sections.b.x)?'a':'b'):null,east:c.east?((c.sections.a.x<c.sections.b.x)?'b':'a'):null},ropeLocations:{west:c.west?'attached':'box',east:c.east?'attached':'box'},boat:{position:{...(c.ferrySide==='east'?LANDING:LAUNCH)},phase:'moored'}};}
export const ropeCount=(c:Chapter,where:'box'|'pip'|'attached')=>Object.values(c.river.ropeLocations).filter(v=>v===where).length;
export function atMooring(c:Chapter,side:'west'|'east'){const p=side==='west'?LAUNCH:LANDING;return Math.hypot(c.river.boat.position.x-p.x,c.river.boat.position.z-p.z)<=.34;}
export const BOAT_REACH={minZ:Math.min(...BRIDGE_LEVELS.crossings)-1.1,maxZ:10.0} as const;
export function boatWater(p:Point){return !!p&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&p.z>=BOAT_REACH.minZ&&p.z<=BOAT_REACH.maxZ&&Math.abs(p.x-riverCenter(p.z))<=riverWidth(p.z)-.32&&RIVER_ROCKS.every(rock=>Math.hypot(p.x-rock.x,p.z-rock.z)>=.42);}
/** The child chooses the route. Turning and forward travel are independent,
 * so a bow against a rock can turn away without discarding held input. */
export function guideBoat(boat:RiverState['boat'],goal:Point,seconds:number,speed=1.4){
 const p=boat.position,dx=goal.x-p.x,dz=goal.z-p.z,distance=Math.hypot(dx,dz);
 if(distance<.035){if(boatWater(goal))boat.position={...goal};return {arrived:true,blocked:false};}
 const wanted=Math.atan2(dx,dz),before=boat.heading??Math.PI/2,error=Math.atan2(Math.sin(wanted-before),Math.cos(wanted-before));
 const turn=Math.max(-2.6*seconds,Math.min(2.6*seconds,error));
 boat.heading=Math.atan2(Math.sin(before+turn),Math.cos(before+turn));
 // Slow into tight turns and the child's pointer; never translate sideways.
 const facing=Math.abs(error)<.18?Math.max(0,Math.cos(error)):0,step=Math.min(distance,speed*seconds*facing*Math.min(1,distance/.24));
 const next={x:p.x+Math.sin(boat.heading)*step,z:p.z+Math.cos(boat.heading)*step};
 const clear=boatWater(next)&&[-.22,.22].every(offset=>RIVER_ROCKS.every(rock=>Math.hypot(next.x+Math.sin(boat.heading!)*offset-rock.x,next.z+Math.cos(boat.heading!)*offset-rock.z)>=.42));
 if(clear)boat.position=next;
 return {arrived:false,blocked:!clear&&step>.00001};
}
export function anchoredSection(c:Chapter,end:'west'|'east'){
 const p=c.sections[sectionAtEnd(c,end)],sign=end==='west'?-1:1,edge=p.x+sign*BRIDGE_GEOMETRY.halfLength;
 return Math.min(Math.abs(p.z-3),Math.abs(p.z+2))<=.22&&Math.abs(Math.sin(p.rotation))<.01&&Math.abs(edge-sign*riverWidth(p.z))<=.45;
}
/** Recover each loose part to its own staging place; secured work stays put. */
export function collapseResult(c:Chapter){
 const sections=structuredClone(c.sections);
 for(const part of ['a','b'] as const)if(!sectionSecured(c,part))sections[part]={...STAGED_SECTIONS[part]};
 return {sections,pip:safeBridgeRetreat(c,c.pip)};
}
/** Preview is generous; committing, joining and fastening remain distinct inputs. */
export function snapSections(c:Chapter,selection:'a'|'b',point:Point,magnet=true){
 const sections=structuredClone(c.sections),from=sections[selection],targets=sectionPlacementTargets(c,selection);let p={...point};
 if(c.joined&&!sectionSecured(c,'a')&&!sectionSecured(c,'b')){const pad=magnet&&targets.find(target=>Math.hypot(target.point.x-p.x,target.point.z-p.z)<.65);if(pad)p={...pad.point};const x=p.x-from.x,z=p.z-from.z;sections.a.x+=x;sections.b.x+=x;sections.a.z+=z;sections.b.z+=z;}
 else{
  const pads=targets.map(target=>target.point);
  const pad=magnet&&pads.find(q=>Math.hypot(q.x-p.x,q.z-p.z)<.65);if(pad)p={...pad};
  sections[selection]={...from,...p,...(pad?{rotation:0}:{})};
 }
 return sections;
}
export function validRiver(c:Chapter){
 const r=c.river;if(!r||r.journeyVersion!==1||!validGrandmaTravel(r.collection)||!['connected-20260915','earlier-chapter'].includes(r.edition)||typeof r.ropesCollected!=='boolean'||typeof r.soilPrepared!=='boolean'||!r.boat||!r.attachments||!r.ropeLocations||!['moored','loaded','steering','waiting'].includes(r.boat.phase))return false;
 if(!validConstruction(c))return false;
 if((['west','east'] as const).some(end=>!['box','pip','attached'].includes(r.ropeLocations[end])||!r.construction&&c[end]!==(r.ropeLocations[end]==='attached')))return false;
 if((['west','east'] as const).some(end=>!['a','b',null].includes(r.attachments[end])||c[end]!==!!r.attachments[end])||r.attachments.west&&r.attachments.west===r.attachments.east)return false;
 if(!boatWater(r.boat.position)||r.boat.heading!==undefined&&!Number.isFinite(r.boat.heading))return false;
 if(r.boat.phase==='moored')return c.seed!=='boat'&&atMooring(c,c.ferrySide);
 return c.seed==='boat'&&(r.boat.phase==='waiting'?atMooring(c,'east')&&!!r.collection:!c.crossed)&&c.ferrySide==='west'&&(r.boat.phase!=='loaded'||atMooring(c,'west'));
}
