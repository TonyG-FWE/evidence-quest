import type {Chapter,Point,Section} from './model.js';
import {riverHalfWidth,navigable,terrainHeight,BRIDGE_LEVELS,BRIDGE_GEOMETRY,type Polygon} from './worldLayout.js';
import {localReview} from './assets/profile.js';

export const bridgePosts=['west-north','west-south','center-north','center-south','east-north','east-south'] as const;
export const ropeSides=['north','south'] as const;
export type BridgePostId=typeof bridgePosts[number];
export type RopeSide=typeof ropeSides[number];
export type BridgePart='a'|'b';
export interface BridgeConstruction {
 version:1;first:BridgePart|null;
 posts:Record<BridgePostId,boolean>;
 ropes:Record<RopeSide,{west:boolean;center:boolean;east:boolean}>;
}
export const freshConstruction=():BridgeConstruction=>({version:1,first:null,posts:Object.fromEntries(bridgePosts.map(id=>[id,false])) as BridgeConstruction['posts'],ropes:{north:{west:false,center:false,east:false},south:{west:false,center:false,east:false}}});
const apart=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.z-b.z);
export const firstPart=(c:Chapter):BridgePart=>c.river.construction?.first??(c.sections.a.x<=c.sections.b.x?'a':'b');
export const secondPart=(c:Chapter):BridgePart=>firstPart(c)==='a'?'b':'a';
export function legacyConstruction(c:Chapter):BridgeConstruction{
 const state=freshConstruction();state.first=c.sections.a.x<=c.sections.b.x?'a':'b';
 for(const side of ropeSides){if(c.west){state.posts[`west-${side}`]=true;state.posts[`center-${side}`]=true;state.ropes[side].west=true;state.ropes[side].center=true;}if(c.east){state.posts[`center-${side}`]=true;state.posts[`east-${side}`]=true;state.ropes[side].center=true;state.ropes[side].east=true;}}
 return state;
}
export const constructionOf=(c:Chapter):BridgeConstruction=>c.river.construction??legacyConstruction(c);
export function ensureConstruction(c:Chapter){return c.river.construction??=legacyConstruction(c);}
/** Bank overlap is a physical requirement; a long rope cannot bridge a water gap. */
export function sectionAtBank(c:Chapter,id:BridgePart,bank:'west'|'east'){
 const section=c.sections[id],edge=section.x+(bank==='west'?-BRIDGE_GEOMETRY.halfLength:BRIDGE_GEOMETRY.halfLength),shore=(bank==='west'?-1:1)*riverHalfWidth(section.z);
 return Math.abs(Math.sin(section.rotation))<.01&&Math.min(Math.abs(section.z-3),Math.abs(section.z+2))<=.22&&(bank==='west'?edge<=shore:edge>=shore)&&Math.abs(edge-shore)<=.45;
}
export function sectionsMeet(c:Chapter){const a=c.sections.a,b=c.sections.b;return Math.abs(a.z-b.z)<.01&&Math.abs(Math.abs(a.x-b.x)-BRIDGE_GEOMETRY.length)<.01&&Math.abs(Math.sin(a.rotation))<.01&&Math.abs(a.rotation-b.rotation)<.01;}
export function postPoint(c:Chapter,id:BridgePostId):Point{
 const first=c.sections[firstPart(c)],second=c.sections[secondPart(c)],side=id.endsWith('north')?-1:1;
 const retainedFar=id.startsWith('center')&&ropeSides.some(side=>constructionOf(c).ropes[side].east);
 return {x:id.startsWith('west')?first.x-BRIDGE_GEOMETRY.halfLength:id.startsWith('center')?(retainedFar?second.x-BRIDGE_GEOMETRY.halfLength:first.x+BRIDGE_GEOMETRY.halfLength):second.x+BRIDGE_GEOMETRY.halfLength,z:(id.startsWith('east')||retainedFar?second.z:first.z)+side*BRIDGE_GEOMETRY.postOffset};
}
export function postStoragePoint(id:BridgePostId):Point{const index=bridgePosts.indexOf(id);return {x:-5.1+Math.floor(index/2)*.85,z:4.1+(index%2)*1.0};}
/** The same rendered socket supports a post after a join or partial collapse. */
export function postRootHeight(c:Chapter,id:BridgePostId){
 if(!localReview)return BRIDGE_LEVELS.deck+BRIDGE_GEOMETRY.postInsertion;
 const farCenter=id.startsWith('center')&&!sectionsMeet(c)&&ropeSides.some(side=>constructionOf(c).ropes[side].east);
 const part=id.startsWith('east')||farCenter?secondPart(c):firstPart(c),section=c.sections[part],point=postPoint(c,id),dx=point.x-section.x,dz=point.z-section.z,co=Math.cos(section.rotation),si=Math.sin(section.rotation);
 const end=dx*co-dz*si<0?'negative':'positive',side=dx*si+dz*co<0?'north':'south';
 return BRIDGE_LEVELS.deck+BRIDGE_GEOMETRY.socketFloor[end][side];
}
export const postSupplyPoint=postStoragePoint;
export function sectionPlacementTargets(c:Chapter,id:BridgePart):{label:string;point:Point}[]{
 if(sectionSecured(c,firstPart(c))&&id!==firstPart(c)){const first=c.sections[firstPart(c)];return [{label:'Connect to the first section',point:{x:first.x+BRIDGE_GEOMETRY.length,z:first.z}}];}
 return [{label:'Near bank at the narrow crossing',point:{x:-BRIDGE_GEOMETRY.halfLength,z:3}},{label:'Far half at the narrow crossing',point:{x:BRIDGE_GEOMETRY.halfLength,z:3}},{label:'Try the wide crossing',point:{x:-riverHalfWidth(-2)+BRIDGE_GEOMETRY.halfLength-.15,z:-2}},{label:'Second half at the wide crossing',point:{x:-riverHalfWidth(-2)+BRIDGE_GEOMETRY.halfLength+BRIDGE_GEOMETRY.length-.15,z:-2}}];
}
export function sectionSecured(c:Chapter,id:BridgePart):boolean{
 const state=constructionOf(c),west=id===firstPart(c),bank=west?'west':'east';
 if(!sectionAtBank(c,id,bank))return false;
 const section=c.sections[id];
 // Retained knots secure only the section physically meeting their center posts.
 if(ropeSides.some(side=>apart(postPoint(c,`center-${side}`),{x:section.x+(west?BRIDGE_GEOMETRY.halfLength:-BRIDGE_GEOMETRY.halfLength),z:section.z+(side==='north'?-BRIDGE_GEOMETRY.postOffset:BRIDGE_GEOMETRY.postOffset)})>.01))return false;
 return ropeSides.every(side=>state.posts[`${bank}-${side}`]&&state.posts[`center-${side}`]&&state.ropes[side][bank]&&state.ropes[side].center);
}
export function ropePoints(c:Chapter,side:RopeSide):Point[]{
 const rope=constructionOf(c).ropes[side];const points:Point[]=[];
 if(rope.west)points.push(postPoint(c,`west-${side}`));if(rope.center)points.push(postPoint(c,`center-${side}`));if(rope.east)points.push(postPoint(c,`east-${side}`));return points;
}
export function ropeTarget(c:Chapter,side:RopeSide):BridgePostId{return constructionOf(c).ropes[side].west?`east-${side}`:`center-${side}`;}
export function canWorkSecond(c:Chapter){return sectionSecured(c,firstPart(c))&&onSection(c.sections[firstPart(c)],c.pip,.18);}
export function canInstallPost(c:Chapter,id:BridgePostId){
 if(c.crossed||constructionOf(c).posts[id]||!sectionAtBank(c,firstPart(c),'west'))return false;
 if(id.startsWith('east'))return canWorkSecond(c)&&sectionsMeet(c)&&sectionAtBank(c,secondPart(c),'east');
 return apart(c.pip,c.sections[firstPart(c)])<=3.3;
}
export function canTieRope(c:Chapter,side:RopeSide){
 if(c.crossed)return false;const b=constructionOf(c),target=ropeTarget(c,side);
 if(!b.posts[`center-${side}`])return false;
 if(target.startsWith('center'))return b.posts[`west-${side}`]&&apart(c.pip,c.sections[firstPart(c)])<=3.3;
 return !b.ropes[side].east&&b.posts[`east-${side}`]&&canWorkSecond(c)&&sectionsMeet(c);
}
/** All committed flags consumed by old story interfaces are derived here. */
export function syncConstruction(c:Chapter){
 const construction=constructionOf(c);
 // Retained knots prove the side ropes have left storage, including saves
 // created before collection progress was recorded separately.
 if(ropeSides.some(side=>Object.values(construction.ropes[side]).some(Boolean)))c.river.ropesCollected=true;
 c.west=sectionSecured(c,firstPart(c));c.east=sectionSecured(c,secondPart(c));
 c.river.attachments={west:c.west?firstPart(c):null,east:c.east?secondPart(c):null};
 // These compatibility slots now account for the two physical side ropes.
 for(const [side,slot]of [['north','west'],['south','east']] as const){const rope=constructionOf(c).ropes[side];c.river.ropeLocations[slot]=rope.west||rope.center||rope.east?'attached':c.river.ropesCollected?'pip':'box';}
}
export function installPost(c:Chapter,id:BridgePostId){if(!canInstallPost(c,id))return false;ensureConstruction(c).posts[id]=true;syncConstruction(c);return true;}
export function tieRope(c:Chapter,side:RopeSide){
 if(!canTieRope(c,side))return false;const b=ensureConstruction(c),rope=b.ropes[side];
 if(!rope.west){rope.west=true;rope.center=true;}else rope.east=true;
 syncConstruction(c);return true;
}
export function onSection(s:Section,p:Point,margin=0){const dx=p.x-s.x,dz=p.z-s.z,co=Math.cos(s.rotation),si=Math.sin(s.rotation);return Math.abs(dx*co-dz*si)<=BRIDGE_GEOMETRY.halfLength+margin&&Math.abs(dx*si+dz*co)<=BRIDGE_GEOMETRY.walkHalfWidth+margin;}
export function sectionPolygon(s:Section):Polygon{return [[-BRIDGE_GEOMETRY.halfLength,-BRIDGE_GEOMETRY.walkHalfWidth],[BRIDGE_GEOMETRY.halfLength,-BRIDGE_GEOMETRY.walkHalfWidth],[BRIDGE_GEOMETRY.halfLength,BRIDGE_GEOMETRY.walkHalfWidth],[-BRIDGE_GEOMETRY.halfLength,BRIDGE_GEOMETRY.walkHalfWidth]].map(([x,z])=>({x:s.x+x!*Math.cos(s.rotation)+z!*Math.sin(s.rotation),z:s.z-x!*Math.sin(s.rotation)+z!*Math.cos(s.rotation)}));}
/** Source surface and floor offsets are outer transforms, never mesh edits. */
export function sectionRootHeight(section:Section,id:BridgePart){
 if(!localReview)return 0;
 const atCrossing=BRIDGE_LEVELS.crossings.some(z=>Math.abs(section.z-z)<.25)&&Math.abs(section.x)<=riverHalfWidth(section.z)+.8;
 return atCrossing?BRIDGE_LEVELS.deck-BRIDGE_LEVELS.sourceSurface[id]:terrainHeight(section)-BRIDGE_GEOMETRY.modelOffset;
}
export function bridgeWalkingHeight(c:Chapter,p:Point){
 if(localReview&&bridgeSurfaces(c).length&&(['a','b'] as const).some(id=>onSection(c.sections[id],p,.025)))return Math.max(terrainHeight(p),BRIDGE_LEVELS.deck);
 return terrainHeight(p);
}
/** Loose surfaces remain attemptable; stepping onto them causes a consequence. */
export function bridgeSurfaces(c:Chapter):Polygon[]{
 const first=firstPart(c),second=secondPart(c),parts:BridgePart[]=[];
 if(sectionAtBank(c,first,'west')){parts.push(first);if(sectionsMeet(c))parts.push(second);}
 else if(sectionAtBank(c,second,'east'))parts.push(second);
 return parts.map(id=>sectionPolygon(c.sections[id]));
}
export function unstableSectionAt(c:Chapter,p:Point):BridgePart|null{
 if(navigable(p))return null;
 const supports=(['a','b'] as const).filter(id=>onSection(c.sections[id],p));
 // A loose overlapping part does not remove the stable deck beneath Pip.
 if(supports.some(id=>sectionSecured(c,id)))return null;
 return supports[0]??null;
}
export function safeBridgeRetreat(c:Chapter,from:Point):Point{
 const stable=(['a','b'] as const).filter(id=>sectionSecured(c,id)).map(id=>({...c.sections[id]}));
 const z=c.sections[firstPart(c)].z;
 stable.push({x:-riverHalfWidth(z)-.65,z,rotation:0},{x:riverHalfWidth(z)+.65,z,rotation:0});
 return stable.sort((a,b)=>apart(a,from)-apart(b,from))[0]!;
}
export function bridgeStatus(c:Chapter){
 if(c.crossed)return 'The crossing is ready for everyone to use.';
 if(sectionSecured(c,firstPart(c)))return sectionSecured(c,secondPart(c))&&sectionsMeet(c)?'Both sections are secure. Walk across to Grandma.':'The first section is secure. Walk onto it, then place and secure the second section.';
 if(sectionAtBank(c,firstPart(c),'west'))return 'The first section is placed. Put up its four posts and tie a rope along each side before stepping onto it.';
 return 'Place a section against the bank where the two sections can reach across.';
}
export function placementChanged(c:Chapter,old:Chapter['sections']){
 const b=ensureConstruction(c),changed=(id:BridgePart)=>apart(old[id],c.sections[id])>.001||Math.abs(old[id].rotation-c.sections[id].rotation)>.001;
 if(b.first===null){b.first=(['a','b'] as const).find(id=>sectionAtBank(c,id,'west'))??null;}
 else if(changed(b.first)){
  if(!sectionSecured({...c,sections:old},b.first)){
   if(sectionSecured({...c,sections:old},secondPart(c))){for(const side of ropeSides){b.posts[`west-${side}`]=false;b.ropes[side].west=false;}}
   else{c.river.construction=freshConstruction();c.river.construction.first=(['a','b'] as const).find(id=>sectionAtBank(c,id,'west'))??null;}
  }
 }else if(changed(secondPart(c)))for(const side of ropeSides){b.posts[`east-${side}`]=false;b.ropes[side].east=false;}
 syncConstruction(c);
}
export function clearFailedConstruction(c:Chapter,failed:BridgePart[]){
 const b=ensureConstruction(c),first=firstPart(c),second=secondPart(c);
 for(const side of ropeSides){
  if(failed.includes(first)){b.posts[`west-${side}`]=false;b.ropes[side].west=false;}
  if(failed.includes(second)){b.posts[`east-${side}`]=false;b.ropes[side].east=false;}
  if(failed.length===2){b.posts[`center-${side}`]=false;b.ropes[side].center=false;}
 }
 if(failed.length===2)b.first=null;
 syncConstruction(c);
}
export function validConstruction(c:Chapter){
 const b=c.river.construction;if(!b)return true;
 if(b.version!==1||![null,'a','b'].includes(b.first)||!b.posts||!b.ropes||bridgePosts.some(id=>typeof b.posts[id]!=='boolean'))return false;
 for(const side of ropeSides){const rope=b.ropes[side];if(!rope||(['west','center','east'] as const).some(end=>typeof rope[end]!=='boolean'||rope[end]&&!b.posts[`${end}-${side}`]))return false;if(rope.west&&!rope.center||rope.east&&!rope.center)return false;}
 if(b.first===null&&(bridgePosts.some(id=>b.posts[id])||ropeSides.some(side=>Object.values(b.ropes[side]).some(Boolean))))return false;
 return c.west===sectionSecured(c,firstPart(c))&&c.east===sectionSecured(c,secondPart(c));
}
