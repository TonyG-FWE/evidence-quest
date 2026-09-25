import type {Chapter,Command,GardenState,Point} from './model.js';
import {anchors,BAKERY_REPAIR,BAKERY_WORK,BRIDGE_LEVELS,BRIDGE_GEOMETRY,PLANTING_BED,roofDropTarget} from './worldLayout.js';
import {snapSections,ropeCount,sectionAtEnd} from './river.js';
import {nearBird,nearOffice} from './mara.js';
import {near,nearBakery,BAKERY_SOL,TILE_SHELF,WORKSHOP_DOOR} from './bakery.js';
import {bakeryHands} from './bakeryInteraction.js';
import {bridgePosts,ropeSides,firstPart,constructionOf,sectionSecured,postPoint,postStoragePoint,sectionPlacementTargets,ropeTarget,canInstallPost,canTieRope,installPost,tieRope,bridgeStatus,type BridgePostId,type RopeSide} from './bridgeConstruction.js';

export type HandObject=`post:${BridgePostId}`|'rope:north'|'rope:south'|'section:a'|'section:b'|'rope-box'|'rope:west'|'rope:east'|'seed'|'soil'|'spareTile'|'crackedTile'|'flour'|'dough'|'dough-cut'|'loaf'|'wing'|'tape'|'tape-roll'|'memory';
export type HandCommand={type:'HAND_BEGIN';object:HandObject;point?:Point}|{type:'HAND_MOVE';point:Point}|{type:'HAND_ROTATE';direction:1|-1}|{type:'HAND_RELEASE'}|{type:'HAND_CANCEL'};
export interface HandGesture {object:HandObject;origin:Point;point:Point;rotation:number;travel:number;minZ:number;maxZ:number;}
export interface HandsProgress {version:1;cuts:number[];flourInBowl?:boolean;}
export const freshHands=():HandsProgress=>({version:1,cuts:[],flourInBowl:false});
export function validHands(value:unknown):value is HandsProgress{const v=value as HandsProgress;return !!v&&v.version===1&&(v.flourInBowl===undefined||typeof v.flourInBowl==='boolean')&&Array.isArray(v.cuts)&&v.cuts.length<=2&&v.cuts.every(n=>Number.isFinite(n)&&Math.abs(n)<=.30)&&new Set(v.cuts).size===v.cuts.length;}
export const isHandCommand=(command:Command):command is HandCommand=>command.type.startsWith('HAND_');
const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.z-b.z);
const finite=(p:Point)=>Number.isFinite(p.x)&&Number.isFinite(p.z);
const roof=BAKERY_REPAIR.gap,besideRoof=BAKERY_REPAIR.beside,mixing=BAKERY_WORK.mixing,dough=BAKERY_WORK.preparation;
export const handDefinitions:Record<HandObject,{label:string;plane:number;reach:number;instruction:string;recovery:string}>={
 ...Object.fromEntries(bridgePosts.map(id=>[`post:${id}`,{label:`${id.startsWith('west')?'Near-bank':id.startsWith('center')?'Center':'Far-bank'} ${id.endsWith('north')?'upper':'lower'} post`,plane:.16,reach:2.7,instruction:'Carry the post to its matching socket. Release to seat it upright.',recovery:'An unfinished placement returns the same post to the repair materials.'}])) as Record<`post:${BridgePostId}`,{label:string;plane:number;reach:number;instruction:string;recovery:string}>,
 'rope:north':{label:'Upper-side rope',plane:.63,reach:2.7,instruction:'Draw this rope to the next post. Release to wrap and tighten it.',recovery:'The tied portion stays secure. Its loose end remains available.'},
 'rope:south':{label:'Lower-side rope',plane:.63,reach:2.7,instruction:'Draw this rope to the next post. Release to wrap and tighten it.',recovery:'The tied portion stays secure. Its loose end remains available.'},
 'section:a':{label:'Section A',plane:.16,reach:1.6,instruction:'Carry, turn and place the section. Its short end connects when it meets the other section.',recovery:'Cancel returns the preview to its last committed position.'},
 'section:b':{label:'Section B',plane:.16,reach:1.6,instruction:'Carry, turn and place the section. Its short end connects when it meets the other section.',recovery:'Cancel returns the preview to its last committed position.'},
 'rope-box':{label:'Repair ropes',plane:.5,reach:1.6,instruction:'Draw the ropes from the repair box toward Pip.',recovery:'The same two ropes stay in their last committed holder.'},
 'rope:west':{label:'Dock-side rope',plane:.3,reach:1.6,instruction:'Draw the rope from the deck to the matching bank post.',recovery:'A rope released away from a reachable post stays with Pip.'},
 'rope:east':{label:'Garden-side rope',plane:.3,reach:1.6,instruction:'Draw the rope from the deck to the matching bank post.',recovery:'A rope released away from a reachable post stays with Pip.'},
 seed:{label:'Lantern seed',plane:.23,reach:1.5,instruction:'Place the seed in the boat or the prepared planting spot.',recovery:'The seed stays with its owner until placed.'},
 soil:{label:'Planting spot',plane:.23,reach:1.5,instruction:'Draw through the soil to prepare the spot. After placing the seed, draw soil over it.',recovery:'Prepared soil and a placed seed remain after an interruption.'},
 spareTile:{label:'Spare roof tile',plane:BAKERY_REPAIR.gap.y+.05,reach:.95,instruction:'Carry the tile to Sol; then guide it over the opening and release.',recovery:'The same tile can be moved again if the opening is still exposed.'},
 crackedTile:{label:'Cracked roof tile',plane:BAKERY_REPAIR.gap.y+.05,reach:.95,instruction:'Guide Sol to lift the cracked tile away from the opening.',recovery:'An interrupted lift leaves the tile where it was.'},
 flour:{label:'Dry flour',plane:.78,reach:1.65,instruction:'Draw flour toward the bowl to begin preparing dough with Rina.',recovery:'Unfinished preparation can be resumed with the same ingredients.'},
 dough:{label:'Dough',plane:.91,reach:1.65,instruction:'Work the dough back and forth. Once it has risen, hold Shift while dragging the whole lump to the oven to try an unshaped batch. The Dough control also selects the whole lump.',recovery:'The unshaped batch can be set aside and the preparation tried again.'},
 'dough-cut':{label:'Divide the dough',plane:.92,reach:1.65,instruction:'Draw two cuts through the dough to make similar portions. A new cut near an old one adjusts it.',recovery:'Adjust the cuts freely before baking; no new ingredients are needed.'},
 loaf:{label:'Bread',plane:.85,reach:1.65,instruction:'Move the prepared bread into the oven, then help Rina take a loaf to thank Sol.',recovery:'Rina keeps her loaf if the handoff is interrupted.'},
 wing:{label:'Torn wing',plane:.82,reach:.6,instruction:'Move and turn the wing so the torn edges meet.',recovery:'The boy keeps the original bird; an unfinished alignment changes nothing.'},
 tape:{label:'Tape strip',plane:.82,reach:.6,instruction:'Lay the strip across both torn edges and release.',recovery:'Move the same strip again if it misses the tear.'},
 'tape-roll':{label:'Mara’s tape',plane:.6,reach:.6,instruction:'Take the tape from the office and bring it back to the boy.',recovery:'An unfinished pickup leaves the roll at the office.'},
 memory:{label:'Pip’s chosen memory',plane:1.1,reach:1.5,instruction:'Place the chosen memory in the lantern you grew with Grandma.',recovery:'The chosen moment is kept only after it reaches the lantern.'},
};
/** The destination surface is also the held object's visual centre. Small
 * objects follow the pointer on this plane rather than inheriting a pickup
 * offset from a different height (a hand, shelf, sack or raised roof tile). */
export function handPlane(s:GardenState,id:HandObject):number{
 if(id.startsWith('section:')||id.startsWith('post:'))return BRIDGE_LEVELS.deck+.03;
 if(id==='rope:north'||id==='rope:south')return BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck;
 if(id==='spareTile'&&['needed','carried'].includes(s.chapter.bakery.stage))return .90;
 if(id==='loaf'&&s.chapter.bakery.stage==='shaped')return .85;
 if(id==='dough-cut')return BAKERY_WORK.tableTop+.09;
 return handDefinitions[id].plane;
}
export function handAnchor(s:GardenState,id:HandObject):Point{
 const c=s.chapter;
 if(id.startsWith('post:'))return postStoragePoint(id.slice(5) as BridgePostId);
 if(id==='rope:north'||id==='rope:south'){const side=id.slice(5) as RopeSide;if(!c.river.ropesCollected)return {x:anchors.crossing.materials.x+(side==='north'?-.28:.28),z:anchors.crossing.materials.z};return postPoint(c,`${constructionOf(c).ropes[side].west?'center':'west'}-${side}`);}
 if(id.startsWith('section:'))return {...c.sections[id==='section:a'?'a':'b']};
 if(id==='rope-box')return {...anchors.crossing.materials};
 if(id==='rope:west'||id==='rope:east'){const side=id==='rope:west'?'west':'east',part=c.sections[sectionAtEnd(c,side)];return {x:part.x+(side==='west'?-.62:.62),z:part.z-.28};}
 if(id==='soil')return {...anchors.garden.plant};
 if(id==='seed')return c.seed==='grandma'?{...anchors.garden.person}:c.seed==='bed'?{...anchors.garden.plant}:{...c.pip};
 if(id==='crackedTile')return {...roof};
 if(id==='spareTile')return c.bakery.tile==='shelf'?{...TILE_SHELF}:c.bakery.tile==='pip'?{...c.pip}:c.bakery.tile==='beside'?{...besideRoof}:{...BAKERY_REPAIR.solTop};
 if(id==='flour')return {...BAKERY_WORK.dryFlour};
 if(id==='dough'||id==='dough-cut')return {...(c.bakery.stage==='checked'?mixing:dough)};
 if(id==='loaf')return c.bakery.stage==='escorting'?{...c.bakery.rina}:c.bakery.stage==='baked'?{...BAKERY_WORK.ovenTarget}:{...dough};
 if(id==='wing')return {x:.22,z:-.12};
 if(id==='tape')return {x:-.15,z:.20};
 if(id==='tape-roll')return {x:-1.9,z:.35};
 return {...c.pip};
}
export function availableHands(s:GardenState):HandObject[]{
 const c=s.chapter,b=c.bakery,m=c.mara.scene,items:HandObject[]=[];
 if(!c.started||s.panel||s.action||s.background||s.viewLost||s.activity||c.gathering.turn||c.story.phase==='arriving')return items;
 if(s.mode==='mara-story'){
  if(!m)return items;
  if(m.stage==='fetch'&&m.tape==='office'&&nearOffice(m.position))items.push('tape-roll');
  if(m.tape==='mara'&&nearBird(m.position)){
   if(m.stage==='fetch')items.push('wing');
   if(m.stage==='repair')items.push('tape');
  }return items;
 }
 if(s.mode==='boat')return items;
 if(!c.crossed&&(distance(c.pip,anchors.crossing.approach)<=1.6||distance(c.pip,c.sections[firstPart(c)])<=2.7)){
  for(const section of ['a','b'] as const){
   const held=sectionSecured(c,section);
   if(!held)items.push(`section:${section}`);
  }
  if(ropeCount(c,'box')&&distance(c.pip,anchors.crossing.materials)<=1.6)items.push('rope-box');
  if(c.river.construction){
   for(const post of bridgePosts)if(canInstallPost(c,post))items.push(`post:${post}`);
   for(const side of ropeSides)if(canTieRope(c,side))items.push(`rope:${side}`);
  }else{
   if(c.joined&&c.river.ropeLocations.west==='pip')items.push('rope:west');
   if(c.joined&&c.river.ropeLocations.east==='pip')items.push('rope:east');
  }
  if(c.seed==='pip')items.push('seed');
 }
 if(c.crossed&&!c.river.collection&&distance(c.pip,anchors.garden.person)<=1.5){
  if(['pip','grandma','bed'].includes(c.seed))items.push('soil');
  if(c.seed==='pip'||c.seed==='grandma'&&!c.river.collection)items.push('seed');
  if(c.story.phase==='moment'&&(c.gathering.grandmaPerformed||c.gathering.edition==='earlier-chapter')&&c.bloomed)items.push('memory');
 }
 items.push(...bakeryHands(s));return items;
}
const bakeryStep=(step:Extract<Command,{type:'BAKERY_STEP'}>['step']):Command=>({type:'BAKERY_STEP',step});
/** Only the serialized reducer calls this function. Preview movement never establishes a story fact. */
export function applyHand(s:GardenState,command:HandCommand):Command[]{
 const c=s.chapter;
 if(command.type==='HAND_CANCEL'){s.gesture=null;s.preview=null;s.bakeryPreview=null;if(s.mode==='arrange')s.mode='walk';return [];}
 if(s.panel||s.action||s.background||s.viewLost||s.activity||!s.ready)return [];
 if(command.type==='HAND_BEGIN'){
  if(s.gesture)return [];
  if(!availableHands(s).includes(command.object))return [];
  const point=command.point??handAnchor(s,command.object);if(!finite(point))return [];
  const anchor=handAnchor(s,command.object);if(distance(point,anchor)>1.3)return [];
  delete s.bridgeWork;s.route=[];s.keys=[];s.gesture={object:command.object,origin:{...point},point:{...point},rotation:command.object.startsWith('section:')?c.sections[command.object==='section:a'?'a':'b'].rotation:command.object==='wing'?-.48:0,travel:0,minZ:point.z,maxZ:point.z};
  s.notice=handDefinitions[command.object].instruction;
  if(command.object.startsWith('section:')){s.mode='arrange';s.selection=command.object==='section:a'?'a':'b';s.preview=structuredClone(c.sections);}
  if(command.object==='crackedTile'||command.object==='spareTile'&&['gap','misplaced'].includes(c.bakery.stage))s.mode='bakery-repair';
  return [];
 }
 const gesture=s.gesture;if(!gesture)return [];
 if(command.type==='HAND_ROTATE'){
  gesture.rotation=(gesture.rotation+command.direction*(gesture.object.startsWith('section:')?Math.PI/2:.12)+Math.PI*2)%(Math.PI*2);
  if(gesture.object.startsWith('section:')&&s.preview&&!c.joined)s.preview[gesture.object==='section:a'?'a':'b'].rotation=gesture.rotation;
  return [];
 }
 if(command.type==='HAND_MOVE'){
  if(!finite(command.point))return [];
  const id=gesture.object,anchor=handAnchor(s,id),limit=id.startsWith('section:')||id.startsWith('rope:')||id.startsWith('post:')?9:id==='dough'||id==='loaf'?Math.max(2.6,distance(dough,BAKERY_WORK.ovenTarget)+.6):2.6;
  const delta=distance(command.point,anchor),point=delta>limit?{x:anchor.x+(command.point.x-anchor.x)/delta*limit,z:anchor.z+(command.point.z-anchor.z)/delta*limit}:{...command.point};
  gesture.travel+=distance(gesture.point,point);gesture.point=point;gesture.minZ=Math.min(gesture.minZ,point.z);gesture.maxZ=Math.max(gesture.maxZ,point.z);
  if(id.startsWith('post:')){const target=postPoint(c,id.slice(5) as BridgePostId);if(distance(point,target)<.35)gesture.point=target;}
  if(id==='rope:north'||id==='rope:south'){const side=id.slice(5) as RopeSide,target=postPoint(c,ropeTarget(c,side));if(distance(point,target)<.4)gesture.point=target;}
  if(id.startsWith('section:')){const section=id==='section:a'?'a':'b';s.selection=section;s.preview=snapSections(c,section,point);if(!c.joined){const snapped=sectionPlacementTargets(c,section).some(t=>distance(t.point,point)<.65); if(snapped)gesture.rotation=s.preview[section].rotation;else s.preview[section].rotation=gesture.rotation;}}
  return [];
 }
 s.gesture=null;
 const id=gesture.object,point=gesture.point,commands:Command[]=[];
 if(!availableHands(s).includes(id)){s.preview=null;return [];}
 if(id.startsWith('section:')){
  const preview=s.preview;
  const part=id==='section:a'?'a':'b',matches=preview&&sectionPlacementTargets(c,part).some(t=>distance(t.point,preview[part])<.01);
  if(!matches){s.preview=null;s.notice='That place has no connector. The same section returns to where you picked it up.';return commands;}
  commands.push({type:'PLACE'});
  if(preview&&Math.abs(preview.a.z-preview.b.z)<=.17&&Math.abs(Math.abs(preview.a.x-preview.b.x)-BRIDGE_GEOMETRY.length)<=.17)commands.push({type:'JOIN'});
 }else if(id.startsWith('post:')){
  const post=id.slice(5) as BridgePostId,target=postPoint(c,post);
  if(distance(point,target)<=.2&&installPost(c,post)){s.bridgeWork={kind:'post',object:id,point:target,elapsed:0,duration:650};s.notice=bridgeStatus(c);}else s.notice='Place the post in its matching socket. The same post is still beside the repair materials.';
 }else if(id==='rope:north'||id==='rope:south'){
  const side=id.slice(5) as RopeSide,target=postPoint(c,ropeTarget(c,side));
  if(distance(point,target)<=.2&&tieRope(c,side)){s.bridgeWork={kind:'tie',object:id,point:target,elapsed:0,duration:1200};s.notice=bridgeStatus(c);}else s.notice='The loose end needs the next installed post. The tied portion stays in place.';
 }else if(id==='rope-box'){
  if(gesture.travel>.18&&distance(point,c.pip)<.7)commands.push({type:'COLLECT_ROPES'});
 }else if(id==='rope:west'||id==='rope:east'){
  s.mode='arrange';const end=id==='rope:west'?'west':'east',sign=end==='west'?-1:1;
  const post=[-2,3].find(z=>distance(point,{x:sign*(z===3?1.65:2.45),z:z+.53})<.30);
  if(post!==undefined)commands.push({type:'FASTEN',end,atZ:post});else s.notice='The rope needs to reach a post at this crossing. It is still available.';
 }else if(id==='seed'){
  if(!c.crossed&&distance(point,anchors.boat.launch)<.55)commands.push({type:'FERRY'});
  else if(c.crossed&&distance(point,anchors.garden.plant)<PLANTING_BED.seedRadius&&c.river.soilPrepared){c.seed='bed';s.notice='The seed is in the prepared spot. Draw soil over it with Grandma.';}
  else s.notice=c.crossed&&!c.river.soilPrepared?'Prepare the soil beside Grandma first. The seed stays with its owner.':'The seed stays with its owner. Place it in the boat or the prepared soil.';
 }else if(id==='soil'){
  if(gesture.travel>=.40&&distance(point,anchors.garden.plant)<PLANTING_BED.radius+.32){
   if(c.seed==='bed')commands.push({type:'PLANT'});else {c.river.soilPrepared=true;s.notice='The planting spot is ready. Place the actual seed in the soil.';}
  }
 }else if(id==='crackedTile'){
  if(distance(point,roof)>.48)commands.push(bakeryStep('REMOVE'));
 }else if(id==='spareTile'){
  if(c.bakery.stage==='needed'&&distance(point,c.pip)<.7)commands.push(bakeryStep('PICKUP'));
  else if(c.bakery.stage==='carried'&&distance(point,BAKERY_SOL)<.70)commands.push(bakeryStep('DELIVER'));
  else if(['gap','misplaced'].includes(c.bakery.stage)){
   const target=roofDropTarget(point);
   if(target){s.bakeryPreview=target;commands.push(bakeryStep('PLACE'));}
   else s.notice='Bring the tile over the opening and release. Sol keeps the same tile.';
  }
 }else if(id==='flour'){
  if(c.bakery.stage==='sealed'&&gesture.travel>.2)commands.push(bakeryStep('CHECK'));
  else if(c.bakery.stage==='checked'&&distance(point,mixing)<.5){c.hands.flourInBowl=true;s.notice='The flour is in the bowl. Work the dough back and forth with Rina.';}
 }else if(id==='dough'){
  if(c.bakery.stage==='checked'&&c.hands.flourInBowl&&gesture.travel>.9&&distance(point,mixing)<.7)commands.push(bakeryStep('MIX'));
  else if(c.bakery.stage==='mixed'&&distance(point,BAKERY_WORK.ovenTarget)<.5){c.hands.cuts=[];c.hands.flourInBowl=false;commands.push(bakeryStep('BAKE_UNSHAPED'));}
 }else if(id==='dough-cut'){
  // Select the cut where the stroke starts on the visible dough. The preview
  // spans the dough at that position; a child need not trace a hidden world axis.
  const cut=Math.max(-.30,Math.min(.30,gesture.origin.x-dough.x));
  if(Math.abs(gesture.origin.x-dough.x)<=.43&&Math.abs(gesture.origin.z-dough.z)<=.38&&gesture.travel>=.18){
   const cuts=[...c.hands.cuts],closest=cuts.reduce((index,n,i)=>index<0||Math.abs(n-cut)<Math.abs(cuts[index]!-cut)?i:index,-1);
   if(closest>=0&&(cuts.length===2||Math.abs(cuts[closest]!-cut)<.07))cuts[closest]=cut;else cuts.push(cut);
   cuts.sort((a,b)=>a-b);c.hands.cuts=cuts;
   const lengths=[cuts[0]!+.36,(cuts[1]??.36)-cuts[0]!,.36-(cuts[1]??.36)];
   if(cuts.length===2&&Math.min(...lengths)>=.16&&Math.max(...lengths)<=.33)commands.push(bakeryStep('SHAPE'));
   else s.notice=cuts.length===1?'One cut. Make another to divide the dough into similar portions.':'The portions are different sizes. Adjust either cut and compare them before baking.';
  }else s.notice='Draw a cut all the way through the dough.';
 }else if(id==='loaf'){
  if(c.bakery.stage==='shaped'&&distance(point,BAKERY_WORK.ovenTarget)<.55)commands.push(bakeryStep('BAKE'));
  if(c.bakery.stage==='baked'&&distance(point,c.bakery.rina)<.7)commands.push(bakeryStep('TAKE_LOAF'));
  if(c.bakery.stage==='escorting'&&distance(point,WORKSHOP_DOOR)<.7)commands.push(bakeryStep('THANK'));
 }else if(id==='tape-roll'){
  if(gesture.travel>.15&&c.mara.scene&&distance(point,c.mara.scene.position)<.75)commands.push({type:'MARA_STEP',step:'TAPE'});
 }else if(id==='wing'){
  const angle=Math.atan2(Math.sin(gesture.rotation),Math.cos(gesture.rotation));
  if(distance(point,{x:0,z:0})<.10&&Math.abs(angle)<.15)commands.push({type:'MARA_STEP',step:'ALIGN'});
  else s.notice='The wing’s torn edge is still away from the body. Move and turn the same wing until the edges meet.';
 }else if(id==='tape'){
  // The strip must cross the tear rather than run along it. The visual strip's
  // reference angle is .55 radians; the tear descends about one radian.
  const across=Math.abs(point.x-.16)<.11&&Math.abs(point.z)<.1&&Math.abs(Math.sin(gesture.rotation+1.50))>.7;
  commands.push({type:'TAPE_PREVIEW',position:across?'across':'beside'},{type:'MARA_STEP',step:'PLACE'});
 }else if(id==='memory'&&distance(point,anchors.garden.plant)<.5)commands.push({type:'STORY',event:{kind:'MOMENT',moment:s.viewDrafts.memoryMoment}});
 return commands;
}
