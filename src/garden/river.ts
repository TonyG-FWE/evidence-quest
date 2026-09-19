import type {Chapter,Point,Section} from './model.js';

export interface RiverState {
 edition:'connected-20260915'|'earlier-chapter';ropesCollected:boolean;soilPrepared:boolean;
 attachments:{west:'a'|'b'|null;east:'a'|'b'|null};
 ropeLocations:{west:'box'|'pip'|'attached';east:'box'|'pip'|'attached'};
 boat:{position:Point;phase:'moored'|'loaded'|'steering'};
}
export const LAUNCH={x:-1.4,z:.8},LANDING={x:1.4,z:.8},ROCK={x:0,z:.8};
export const riverWidth=(z:number)=>2.2-.8*Math.max(0,Math.min(1,(z+2)/5));
export const spanCenter=(c:Chapter)=>({x:(c.sections.a.x+c.sections.b.x)/2,z:(c.sections.a.z+c.sections.b.z)/2});
export const sectionAtEnd=(c:Chapter,end:'west'|'east')=>c.river?.attachments[end]??((c.sections.a.x<c.sections.b.x)===(end==='west')?'a':'b');
export function freshRiver():RiverState{return {edition:'connected-20260915',ropesCollected:false,soilPrepared:false,attachments:{west:null,east:null},ropeLocations:{west:'box',east:'box'},boat:{position:{...LAUNCH},phase:'moored'}};}
export function earlierRiver(c:Chapter):RiverState{return {edition:'earlier-chapter',ropesCollected:false,soilPrepared:c.seed==='grandma'||c.seed==='soil',attachments:{west:c.west?((c.sections.a.x<c.sections.b.x)?'a':'b'):null,east:c.east?((c.sections.a.x<c.sections.b.x)?'b':'a'):null},ropeLocations:{west:c.west?'attached':'box',east:c.east?'attached':'box'},boat:{position:{...(c.ferrySide==='east'?LANDING:LAUNCH)},phase:'moored'}};}
export const ropeCount=(c:Chapter,where:'box'|'pip'|'attached')=>Object.values(c.river.ropeLocations).filter(v=>v===where).length;
export function atMooring(c:Chapter,side:'west'|'east'){const p=side==='west'?LAUNCH:LANDING;return Math.hypot(c.river.boat.position.x-p.x,c.river.boat.position.z-p.z)<=.34;}
export function boatWater(p:Point){return !!p&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&p.z>=-.35&&p.z<=1.65&&Math.abs(p.x)<=riverWidth(p.z)-.32&&Math.hypot(p.x-ROCK.x,p.z-ROCK.z)>=.42;}
export function anchoredSection(c:Chapter,end:'west'|'east'){
 const p=c.sections[sectionAtEnd(c,end)],sign=end==='west'?-1:1,edge=p.x+sign*.775;
 return Math.min(Math.abs(p.z-3),Math.abs(p.z+2))<=.22&&Math.abs(Math.sin(p.rotation))<.01&&Math.abs(edge-sign*riverWidth(p.z))<=.45;
}
/** Same two parts, held at their actual bank or in its nearby shallows. */
export function collapseResult(c:Chapter){
 const sections=structuredClone(c.sections),west=sectionAtEnd(c,'west'),east=sectionAtEnd(c,'east');
 if(!c.west)sections[west]={x:-1.35,z:3.8,rotation:0};
 if(!c.east)sections[east]={x:1.35,z:3.8,rotation:0};
 return {sections,pip:{x:-2.4,z:3}};
}
/** Preview is generous; committing, joining and fastening remain distinct inputs. */
export function snapSections(c:Chapter,selection:'a'|'b',point:Point,magnet=true){
 const sections=structuredClone(c.sections),from=sections[selection];let p={...point};
 if(c.joined){const middle=spanCenter(c),dx=from.x-middle.x;if(magnet&&Math.abs(p.z-3)<.7&&Math.abs(p.x-dx)<.8)p={x:dx,z:3};const x=p.x-from.x,z=p.z-from.z;sections.a.x+=x;sections.b.x+=x;sections.a.z+=z;sections.b.z+=z;}
 else{
  const pads=[{x:-.775,z:3},{x:.775,z:3},{x:-1.575,z:-2},{x:-.025,z:-2}];
  const pad=magnet&&pads.find(q=>Math.hypot(q.x-p.x,q.z-p.z)<.65);if(pad)p={...pad};
  sections[selection]={...from,...p};
 }
 return sections;
}
export function validRiver(c:Chapter){
 const r=c.river;if(!r||!['connected-20260915','earlier-chapter'].includes(r.edition)||typeof r.ropesCollected!=='boolean'||typeof r.soilPrepared!=='boolean'||!r.boat||!r.attachments||!r.ropeLocations||!['moored','loaded','steering'].includes(r.boat.phase))return false;
 if((['west','east'] as const).some(end=>!['box','pip','attached'].includes(r.ropeLocations[end])||c[end]!==(r.ropeLocations[end]==='attached')))return false;
 if((['west','east'] as const).some(end=>!['a','b',null].includes(r.attachments[end])||c[end]!==!!r.attachments[end])||r.attachments.west&&r.attachments.west===r.attachments.east)return false;
 if(!boatWater(r.boat.position))return false;
 if(r.boat.phase==='moored')return c.seed!=='boat'&&atMooring(c,c.ferrySide);
 return c.seed==='boat'&&!c.crossed&&c.ferrySide==='west'&&(r.boat.phase!=='loaded'||atMooring(c,'west'));
}
