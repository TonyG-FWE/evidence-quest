import {conversationReady} from './conversation.js';
import type {Action,Chapter,GardenState,Point} from './model.js';

export const BAKERY={x:8.25,z:-2.15},BAKERY_APPROACH={x:7.05,z:-.55},BAKERY_SOL={x:7.05,z:-1.5},TILE_SHELF={x:9.15,z:-.4},RINA_HOME={x:8.5,z:-.7},WORKSHOP_DOOR={x:4.5,z:-2.15};
export const BAKERY_STAGES=['arrival','needed','carried','delivered','gap','misplaced','sealed','checked','mixed','shaped','baked','escorting','done'] as const;
export type BakeryStage=typeof BAKERY_STAGES[number]|'historical';
export interface BakeryState {
 unshapedBatches?:number;edition:'connected-20260915'|'earlier-chapter';stage:BakeryStage;met:boolean;permission:boolean;
 tile:'shelf'|'pip'|'sol'|'beside'|'roof'|'unrecorded';cracked:'roof'|'set-aside'|'unrecorded';
 loaf:'none'|'oven'|'rina'|'sol'|'unrecorded';rina:Point;
}
export type BakeryAction='bakeryWelcome'|'tilePickup'|'tileDelivery'|'tileRemoval'|'tilePlacement'|'flourCheck'|'mixDough'|'shapeLoaves'|'bakeBread'|'bakeUnshaped'|'takeLoaf'|'thankSol';
export type BakeryStep='PERMISSION'|'PICKUP'|'DELIVER'|'REPAIR'|'REMOVE'|'PLACE'|'CHECK'|'MIX'|'SHAPE'|'BAKE'|'BAKE_UNSHAPED'|'TAKE_LOAF'|'THANK'|'BACK';
export const freshBakery=():BakeryState=>({edition:'connected-20260915',stage:'arrival',met:false,permission:false,tile:'shelf',cracked:'roof',loaf:'none',rina:{...RINA_HOME}});
export function earlierBakery(c:Chapter):BakeryState{return c.story.metSol||c.story.solChoice!=='none'||c.story.laterKnown||c.story.records.sol?{edition:'earlier-chapter',stage:'historical',met:false,permission:false,tile:'unrecorded',cracked:'unrecorded',loaf:'unrecorded',rina:{...RINA_HOME}}:freshBakery();}
export const bakeryReady=(c:Chapter)=>['done','historical'].includes(c.bakery.stage);
export const bakeryRank=(c:Chapter)=>BAKERY_STAGES.indexOf(c.bakery.stage as typeof BAKERY_STAGES[number]);
export const solAtWorkshop=(c:Chapter)=>c.bakery.stage==='historical'||bakeryRank(c)>=7;
export const near=(a:Point,b:Point,r=.95)=>Math.hypot(a.x-b.x,a.z-b.z)<=r;
export const nearBakery=(c:Chapter)=>c.pip.x>6.4&&c.pip.z<.7&&c.pip.z>-3;
export const bakeryAction=(kind:string):kind is BakeryAction=>kind in bakeryDurations;
export const bakeryDurations:Record<BakeryAction,number>={bakeryWelcome:2300,tilePickup:1000,tileDelivery:1200,tileRemoval:2600,tilePlacement:1700,flourCheck:6500,mixDough:2300,shapeLoaves:2100,bakeBread:5000,bakeUnshaped:5000,takeLoaf:1500,thankSol:2400};
export const bakeryActionText:Record<BakeryAction,string>={bakeryWelcome:'Rina moves her flour sacks away from the water dripping through the roof.',tilePickup:'Pip takes Rina’s intact spare tile from the shelf.',tileDelivery:'Pip hands the spare tile to Sol beside his ladder.',tileRemoval:'Sol climbs his ladder, removes the cracked tile and sets it aside.',tilePlacement:'Sol places the same spare tile where you directed him.',flourCheck:'Rina checks that the flour is dry. Sol packs his tools and walks back to his workshop.',mixDough:'Pip helps Rina mix the ingredients. Rina kneads the dough. Some time passes while it rests and rises. Sol writes at his workshop.',shapeLoaves:'Pip helps divide the dough. Rina shapes three similar-sized loaves.',bakeUnshaped:'Rina puts the whole lump in the oven for the recipe’s baking time. The outside browns, but the middle is still doughy. She sets this batch aside.',bakeBread:'A short time passes while the loaves bake. The gathering has not begun; Mara’s last boat is still due later.',takeLoaf:'Rina takes one baked loaf to thank Sol. The other bread stays for the people she promised.',thankSol:'Pip watches Rina hand Sol the loaf. “Thank you for fixing the roof,” she says. Sol finishes the last line of his draft.'};
export function bakeryInstruction(s:GardenState){const b=s.chapter.bakery;switch(b.stage){
 case 'arrival':return 'Visit Rina at the bakery. Water is dripping through a cracked roof tile.';
 case 'needed':return 'Rina gave permission. Guide Pip to the shelf and take the intact spare tile.';
 case 'carried':return 'Pip carries the spare tile. Bring it to Sol beside the ladder.';
 case 'delivered':return 'Sol has the spare tile. Direct him to remove the cracked tile.';
 case 'gap':return 'The cracked tile is set aside. Choose where Sol should place the spare tile.';
 case 'misplaced':return 'Water still comes through the opening. Move the same tile to cover the gap.';
 case 'sealed':return 'Water has stopped entering the bakery. Rain still falls outside. Let Rina check her flour.';
 case 'checked':return b.unshapedBatches?'The large lump did not bake evenly. Rina sets it aside. Make a new batch with the remaining dry flour.':'The flour is dry. Rina can explain how to make dough and shape the bread.';
 case 'mixed':return 'The dough has rested and risen. Decide how to prepare it for the oven. Rina explained why similar-sized loaves bake evenly.';
 case 'shaped':return 'The shaped loaves are ready for Rina’s oven.';
 case 'baked':return 'The bread is baked. Rina wants to take a loaf to thank Sol.';
 case 'escorting':return 'Walk with Rina to Sol’s workshop. She carries one loaf for him.';
 case 'done':return 'You saw the repair, the baking and Rina’s thanks. Talk to Sol about the story he has started.';
 default:return 'This adventure used the earlier Sol sequence. Its original progress is preserved.';
}}
/** All durable edits happen inside the existing serialized store. */
export function applyBakery(s:GardenState,step:BakeryStep):BakeryAction|null{
 const c=s.chapter,b=c.bakery;
 if(b.edition!=='connected-20260915'||!c.started||!c.crossed||s.action||s.background||s.viewLost||s.activity||s.mode==='boat'||s.mode==='mara-story'||c.story.phase!=='planning')return null;
 if(step==='PERMISSION'){if(s.panel==='bakery'&&b.met&&conversationReady(c,'bakery')&&nearBakery(c)&&b.stage==='arrival'){b.permission=true;b.stage='needed';s.notice='Rina says: “Yes. You may take the spare tile from that shelf. Bring it to Sol so he can replace the cracked one.”';}return null;}
 if(s.panel&&!(s.panel==='bakery'&&['CHECK','MIX','SHAPE','BAKE','BAKE_UNSHAPED','TAKE_LOAF'].includes(step)))return null;
 if(step==='BACK'){s.mode='walk';s.bakeryPreview=null;s.notice=bakeryInstruction(s);return null;}
 if(step==='PICKUP'&&b.stage==='needed'&&near(c.pip,TILE_SHELF))return 'tilePickup';
 if(step==='DELIVER'&&b.stage==='carried'&&near(c.pip,BAKERY_SOL))return 'tileDelivery';
 if(step==='REPAIR'&&['delivered','gap','misplaced'].includes(b.stage)&&near(c.pip,BAKERY_SOL)){s.mode='bakery-repair';s.route=[];s.keys=[];s.notice=bakeryInstruction(s);return null;}
 if(step==='REMOVE'&&s.mode==='bakery-repair'&&b.stage==='delivered')return 'tileRemoval';
 if(step==='PLACE'&&s.mode==='bakery-repair'&&['gap','misplaced'].includes(b.stage)&&s.bakeryPreview)return 'tilePlacement';
 if(step==='CHECK'&&b.stage==='sealed'&&nearBakery(c))return 'flourCheck';
 if(!near(c.pip,b.rina,1.65))return null;
 if(step==='MIX'&&b.stage==='checked')return 'mixDough';
 if(step==='SHAPE'&&b.stage==='mixed')return 'shapeLoaves';
 if(step==='BAKE_UNSHAPED'&&b.stage==='mixed')return 'bakeUnshaped';
 if(step==='BAKE'&&b.stage==='shaped')return 'bakeBread';
 if(step==='TAKE_LOAF'&&b.stage==='baked')return 'takeLoaf';
 if(step==='THANK'&&b.stage==='escorting'&&near(c.pip,WORKSHOP_DOOR,1.6)&&near(b.rina,WORKSHOP_DOOR,1.8))return 'thankSol';
 return null;
}
export function settleBakery(s:GardenState,a:Action){const b=s.chapter.bakery;switch(a.kind){
 case 'bakeryWelcome':b.met=true;break;
 case 'tilePickup':b.stage='carried';b.tile='pip';break;
 case 'tileDelivery':b.stage='delivered';b.tile='sol';break;
 case 'tileRemoval':b.stage='gap';b.cracked='set-aside';break;
 case 'tilePlacement':b.tile=a.placement==='gap'?'roof':'beside';b.stage=a.placement==='gap'?'sealed':'misplaced';if(b.stage==='sealed')s.mode='walk';break;
 case 'flourCheck':b.stage='checked';s.mode='walk';break;
 case 'mixDough':b.stage='mixed';break;
 case 'shapeLoaves':b.stage='shaped';break;
 case 'bakeUnshaped':b.stage='checked';b.unshapedBatches=Math.min(100,(b.unshapedBatches??0)+1);break;
 case 'bakeBread':b.stage='baked';b.loaf='oven';break;
 case 'takeLoaf':b.stage='escorting';b.loaf='rina';break;
 case 'thankSol':b.stage='done';b.loaf='sol';break;
 }s.bakeryPreview=null;s.notice=a.kind==='bakeryWelcome'?'Rina says: “I promised to have everyone’s bread ready today. If those sacks get wet, I won’t be able to bake.”':bakeryInstruction(s);
}
export function validBakery(c:Chapter){
 const b=c.bakery;if(!b||typeof b.met!=='boolean'||typeof b.permission!=='boolean'||!b.rina||!Number.isFinite(b.rina.x)||!Number.isFinite(b.rina.z))return false;
 if(b.edition==='earlier-chapter')return b.unshapedBatches===undefined&&!!(c.story.metSol||c.story.solChoice!=='none'||c.story.laterKnown||c.story.records.sol)&&b.stage==='historical'&&!b.met&&!b.permission&&b.tile==='unrecorded'&&b.cracked==='unrecorded'&&b.loaf==='unrecorded'&&near(b.rina,RINA_HOME,.001);
 if(b.edition!=='connected-20260915'||!BAKERY_STAGES.includes(b.stage as typeof BAKERY_STAGES[number]))return false;
 const n=bakeryRank(c);if(b.unshapedBatches!==undefined&&(!Number.isInteger(b.unshapedBatches)||b.unshapedBatches<1||b.unshapedBatches>100||n<7))return false;if(b.permission!==(n>=1)||n>=1&&!b.met||b.met&&!c.crossed||!bakeryReady(c)&&(c.story.metSol||c.story.solChoice!=='none'||c.story.laterKnown))return false;
 const tile=n<=1?'shelf':n===2?'pip':n<=4?'sol':n===5?'beside':'roof',cracked=n<4?'roof':'set-aside',loaf=n<10?'none':n===10?'oven':n===11?'rina':'sol';
 if(b.tile!==tile||b.cracked!==cracked||b.loaf!==loaf)return false;
 if(n<11&&!near(b.rina,RINA_HOME,.001))return false;
 return b.rina.x>=3&&b.rina.x<=9.5&&b.rina.z>=-2.4&&b.rina.z<=.7&&(n!==12||near(b.rina,WORKSHOP_DOOR,1.8));
}
