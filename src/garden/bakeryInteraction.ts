import type {GardenState,Point} from './model.js';
import {BAKERY_APPROACHES} from './worldLayout.js';
import {BAKERY_APPROACH,BAKERY_SOL,TILE_SHELF,TILE_APPROACH,WORKSHOP_DOOR,near,nearBakery,nearBakeryWork,bakeryInstruction} from './bakery.js';

export type BakeryObject='spareTile'|'crackedTile'|'flour'|'dough'|'dough-cut'|'loaf';
export const isBakeryObject=(id:unknown):id is BakeryObject=>typeof id==='string'&&['spareTile','crackedTile','flour','dough','dough-cut','loaf'].includes(id);

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
 switch(b.stage){
 case 'needed':return 'Click the spare tile to walk to the shelf. Drag the tile to Pip to carry it.';
 case 'carried':return 'Click Sol to walk to him. Drag the tile from Pip to Sol’s hands.';
 case 'delivered':return 'You direct Sol. Drag the cracked tile away from the opening; Sol will lift it out.';
 case 'gap':case 'misplaced':return 'Drag the spare tile over the roof opening and release. Sol will place it where you choose.';
 case 'sealed':return 'Click the flour sack to let Rina check it. The roof now keeps the flour dry.';
 case 'checked':return c.hands.flourInBowl?'Drag the dough back and forth in the bowl to mix it with Rina.':'Click the flour sack to approach it. Drag flour into the bowl on the table.';
 case 'mixed':return 'Draw two cuts across the dough. Move a cut to make three similar-sized portions.';
 case 'shaped':return 'Drag the shaped bread to the oven opening. Rina will put the loaves inside.';
 case 'baked':return 'Click the baked loaf to approach the oven. Drag it to Rina; she will carry it to Sol.';
 case 'escorting':return near(c.pip,WORKSHOP_DOOR,1.6)?near(c.pip,b.rina,1.65)?'Drag the loaf from Rina to Sol to give him her thanks.':'Click Rina’s loaf to step closer, then drag it to Sol.':'Click the ground toward Sol’s workshop. Walk with Rina and her loaf.';
 default:return bakeryInstruction(s);
 }
}

export function bakeryPointerContext(s:GardenState){return s.chapter.crossed&&s.chapter.bakery.edition==='connected-20260915'&&s.chapter.story.phase==='planning'&&(nearBakery(s.chapter)||s.chapter.bakery.stage==='escorting');}
