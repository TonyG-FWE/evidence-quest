import type {GardenState,Point} from './model.js';
import {BAKERY_APPROACHES,BAKERY_WORK} from './worldLayout.js';
import {BAKERY_APPROACH,BAKERY_SOL,TILE_SHELF,TILE_APPROACH,WORKSHOP_DOOR,near,nearBakery,nearBakeryWork,bakeryInstruction} from './bakery.js';

export type BakeryObject='spareTile'|'crackedTile'|'flour'|'dough'|'dough-cut'|'loaf';
export const isBakeryObject=(id:unknown):id is BakeryObject=>typeof id==='string'&&['spareTile','crackedTile','flour','dough','dough-cut','loaf'].includes(id);

export interface BakerySelection {object:'spareTile'|'flour'|'loaf';stage:GardenState['chapter']['bakery']['stage'];destination?:string;}
export function bakeryTransfer(s:GardenState){
 const c=s.chapter,b=c.bakery;
 if(!bakeryHands(s,false).length)return null;
 switch(b.stage){
 case 'needed':return {object:'spareTile' as const,target:'pip',label:'Pip',point:c.pip,approach:TILE_APPROACH};
 case 'carried':return {object:'spareTile' as const,target:'sol',label:'Sol',point:BAKERY_SOL,approach:BAKERY_APPROACH};
 case 'checked':return c.hands.flourInBowl?null:{object:'flour' as const,target:'dough',label:'the bowl',point:BAKERY_WORK.mixing,approach:BAKERY_APPROACHES.flour};
 case 'shaped':return {object:'loaf' as const,target:'oven',label:'the oven',point:BAKERY_WORK.ovenTarget,approach:BAKERY_APPROACHES.preparation};
 case 'baked':return {object:'loaf' as const,target:'rina',label:'Rina',point:b.rina,approach:BAKERY_APPROACHES.oven};
 case 'escorting':return {object:'loaf' as const,target:'sol',label:'Sol',point:WORKSHOP_DOOR,approach:{x:WORKSHOP_DOOR.x+.15,z:WORKSHOP_DOOR.z+.9}};
 default:return null;
 }
}

export function bakeryTransferReady(s:GardenState){
 const transfer=bakeryTransfer(s);if(!transfer||!bakeryHands(s).includes(transfer.object))return false;
 const c=s.chapter,b=c.bakery;
 if(b.stage==='needed')return near(c.pip,TILE_APPROACH,.10);
 if(b.stage==='carried')return near(c.pip,BAKERY_SOL);
 if(b.stage==='escorting')return near(c.pip,WORKSHOP_DOOR,1.6)&&near(b.rina,WORKSHOP_DOOR,1.8);
 return true;
}

/** Availability describes the actual work surface. Rina is not an invisible
 * remote switch for the flour, dough or oven. */
export function bakeryHands(s:GardenState,withinReach=true):BakeryObject[]{
 const c=s.chapter,b=c.bakery;
 if(!c.started||!c.crossed||c.story.phase!=='planning'||b.edition!=='connected-20260915')return [];
 const can=(condition:boolean)=>!withinReach||condition;
 if(b.stage==='needed')return can(near(c.pip,TILE_SHELF))?['spareTile']:[];
 if(b.stage==='carried')return ['spareTile'];
 if(b.stage==='delivered')return can(near(c.pip,BAKERY_SOL))?['crackedTile']:[];
 if(['gap','misplaced'].includes(b.stage))return can(near(c.pip,BAKERY_SOL))?['spareTile']:[];
 if(b.stage==='sealed')return can(nearBakeryWork(c,'dryFlour'))?['flour']:[];
 const besideRina=near(c.pip,b.rina,1.65);
 if(b.stage==='checked')return can(besideRina||nearBakeryWork(c,c.hands.flourInBowl?'mixing':'dryFlour'))?[c.hands.flourInBowl?'dough':'flour']:[];
 if(b.stage==='mixed')return can(besideRina||nearBakeryWork(c,'preparation'))?['dough','dough-cut']:[];
 if(b.stage==='shaped')return can(besideRina||nearBakeryWork(c,'preparation'))?['loaf']:[];
 if(b.stage==='baked')return can(besideRina||nearBakeryWork(c,'oven'))?['loaf']:[];
 if(b.stage==='escorting')return can(besideRina)?['loaf']:[];
 return [];
}

export function bakeryObjectApproach(s:GardenState,id:BakeryObject):Point{
 const b=s.chapter.bakery;
 if(id==='spareTile'||id==='crackedTile')return b.stage==='needed'?TILE_APPROACH:BAKERY_APPROACH;
 if(id==='flour')return BAKERY_APPROACHES.flour;
 if(id==='dough'||id==='dough-cut')return s.chapter.bakery.stage==='checked'?BAKERY_APPROACHES.mixing:BAKERY_APPROACHES.preparation;
 if(b.stage==='baked')return BAKERY_APPROACHES.oven;
 if(b.stage==='escorting')return {x:b.rina.x+.65,z:b.rina.z+.35};
 return BAKERY_APPROACHES.preparation;
}

export function bakeryPointerHint(s:GardenState):string{
 const c=s.chapter,b=c.bakery;
 const transfer=bakeryTransfer(s);
 if(s.bakerySelection&&transfer)return s.bakerySelection.destination?`Approaching ${transfer.label}. The handoff happens when everyone is within reach.`:`Selected ${transfer.object==='spareTile'?'tile':transfer.object==='flour'?'flour':'bread'}. Click ${transfer.label}, or drag the selected object there. Escape cancels.`;
 switch(b.stage){
 case 'needed':return 'Click the spare tile, then Pip to pick it up. You can also drag the tile to Pip.';
 case 'carried':return 'Click Pip’s tile, then Sol to hand it over. You can also drag the tile to Sol.';
 case 'delivered':return 'You direct Sol. Drag the cracked tile away from the opening; Sol will lift it out.';
 case 'gap':case 'misplaced':return 'Drag the spare tile over the roof opening and release. Sol will place it where you choose.';
 case 'sealed':return 'Click the flour sack to let Rina check it. The roof now keeps the flour dry.';
 case 'checked':return c.hands.flourInBowl?'Press and move the dough in the bowl. Short strokes add up; release and grab again whenever you like.':'Click the flour sack, then the bowl to pour. You can also drag flour into the bowl.';
 case 'mixed':return 'Draw two cuts across the dough. Move a cut to make three similar-sized portions.';
 case 'shaped':return 'Click the shaped bread, then the oven. Or drag the bread to the oven; Rina will put it inside.';
 case 'baked':return 'Click the baked loaf, then Rina. Or drag it to her; she will carry it to Sol.';
 case 'escorting':return near(c.pip,WORKSHOP_DOOR,1.6)?'Click Rina’s loaf, then Sol. Or drag the loaf to Sol to give him her thanks.':'Walk with Rina toward Sol’s workshop. Select her loaf, then click Sol when you see him; dragging also works.';
 default:return bakeryInstruction(s);
 }
}

export function bakeryPointerContext(s:GardenState){return s.chapter.crossed&&s.chapter.bakery.edition==='connected-20260915'&&s.chapter.story.phase==='planning'&&(nearBakery(s.chapter)||s.chapter.bakery.stage==='escorting');}
