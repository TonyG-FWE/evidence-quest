import type {Chapter,SourceId} from './model.js';
import {bakeryRank} from './bakery.js';
export const observationIds=['dock-duty','bridge-crossed','seed-planted','flower-grown','mara-message-delivered','bird-repaired','bakery-roof','bakery-flour','bakery-unshaped','bakery-bread','bakery-thanks','last-passengers','guests-arrived','mara-telling','sol-telling','cushions-returned','grandma-telling','pip-memory','grandma-copy-delivered'] as const;
export type ObservationId=typeof observationIds[number];
export type Observation={id:ObservationId;title:string;text:string;context:'today'|'mara-story';sources:SourceId[]};
export type JournalState={version:1;notes:string;storyboard:ObservationId[]};
export type JournalCommand={type:'NOTES';text:string}|{type:'REORDER';order:ObservationId[]};
export type GatheringPicture='mara-reading'|'mara-listening'|'mara-absent';
export type ObservationPictureSpec={event:ObservationId;gathering:GatheringPicture;sol:'draft'|'bread'|'thanks'|'both';solOrigin:'child'|'prepared'|null;memory:'planting'|'gathering'|null};
export const JOURNAL_NOTE_LIMIT=4000;
export const freshJournal=():JournalState=>({version:1,notes:'',storyboard:[]});
const knownIds=new Set<string>(observationIds);

/** The saved notebook contains only personal writing and a preferred card order.
 * Event facts, source exposure, possessions and story contributions stay in their
 * existing owners. A missing notebook can be initialized without migrating them. */
export function validJournal(value:unknown,chapter?:Chapter):value is JournalState{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const j=value as JournalState;
 if(Object.keys(j).length!==3||j.version!==1||typeof j.notes!=='string'||j.notes.length>JOURNAL_NOTE_LIMIT||!Array.isArray(j.storyboard)||j.storyboard.length>observationIds.length)return false;
 const seen=new Set<string>();
 for(const id of j.storyboard){if(typeof id!=='string'||!knownIds.has(id)||seen.has(id))return false;seen.add(id);}
 if(chapter){const available=new Set(observationsFor(chapter).map(card=>card.id));if(j.storyboard.some(id=>!available.has(id)))return false;}
 return true;
}

/** A related page is offered only when the existing chapter makes it available.
 * Opening it must still use the ordinary reader; a journal reference does not
 * itself establish source exposure or delivery. */
function availableSource(c:Chapter,id:SourceId):boolean{
 switch(id){
 case 'mara':return c.maraHeard;
 case 'bakery':return c.bakery.met;
 case 'story':return c.page!=='mara'||!!c.story.records.mara||c.story.phase==='mara';
 case 'sol':return c.story.metSol;
 case 'later':return c.story.laterKnown;
 case 'empty':return c.story.records.grandma||c.gathering.pageComplete;
 case 'opening':case 'sections':return true;
 default:return false;
 }
}

/** Derive completed, participated events. Do not derive these from text exposure,
 * a selected story ending, possession of a page, or legacy inferred records.
 * Catalog order groups related moments; it does not claim a played chronology. */
export function observationsFor(c:Chapter):Observation[]{
 const cards:Observation[]=[],f=c.story,m=c.mara,b=c.bakery,g=c.gathering;
 const add=(when:boolean,id:ObservationId,title:string,text:string,sources:SourceId[]=[],context:Observation['context']='today')=>{
  if(when)cards.push({id,title,text,context,sources:sources.filter(source=>availableSource(c,source))});
 };
 add(m.edition==='connected-20260915'&&m.service==='served','dock-duty','Mara helped the passengers','Pip watched Mara help passengers safely ashore. She stayed on duty because the last boat was still due later.',['mara']);
 add(c.crossed,'bridge-crossed','Pip crossed the footbridge','Pip crossed the repaired footbridge after both ends were secured. The bridge stayed in place for the return journey.',['sections']);
 add(c.history.includes('P')&&c.seed==='soil','seed-planted','The seed reached the soil','Pip and Grandma planted the same seed together in the garden’s soil.',['opening','sections']);
 add(c.history.includes('L')&&c.bloomed,'flower-grown','A lantern-flower grew','The seed grew into a lantern-flower after it was planted.',['sections']);
 add(f.maraReported&&!!f.maraMessage?.delivered,'mara-message-delivered','Mara’s message reached Grandma','Pip told Grandma the message prepared for her after talking with Mara.',['mara']);
 add(m.edition==='connected-20260915'&&m.participated,'bird-repaired','The same bird, repaired','In Mara’s earlier story, you guided Mara to ask permission, fetch tape and help repair the boy’s bird. The boy carried that same bird onto the dock.',['story'],'mara-story');
 const bakery=b.edition==='connected-20260915',rank=bakeryRank(c);
 add(bakery&&rank>=6&&b.tile==='roof','bakery-roof','The dripping stopped','Sol replaced the cracked roof tile. Water stopped entering through the opening while rain continued outside.',['bakery','sol']);
 add(bakery&&rank>=7,'bakery-flour','The flour was dry','Rina checked the flour sacks after the roof repair. The flour was still dry.',['bakery','sol']);
 add(bakery&&(b.unshapedBatches??0)>0,'bakery-unshaped','One batch baked unevenly','Rina tried baking the whole lump for the recipe’s baking time. The outside browned while the middle stayed doughy, so she set that batch aside.',['bakery']);
 add(bakery&&rank>=10&&['oven','rina','sol'].includes(b.loaf),'bakery-bread','Rina baked the bread','Pip helped prepare the dough and similar-sized loaves. Rina baked the bread she had promised.',['bakery','later']);
 add(bakery&&b.stage==='done'&&b.loaf==='sol','bakery-thanks','Rina thanked Sol','Pip accompanied Rina to the workshop and watched her give Sol a loaf to thank him for repairing the roof.',['bakery','later']);
 const gathering=g.edition==='connected-20260915';
 add(gathering&&f.plan?.time==='later'&&['passengers-ashore','sol-arrived','ready'].includes(g.arrival),'last-passengers','Mara finished her work','The last boat returned, and Mara helped its passengers ashore before leaving the dock.',['mara']);
 add(gathering&&g.arrival==='ready','guests-arrived','The guests arrived',f.plan?.time==='later'?'Sol brought his manuscript to the garden. Mara crossed the footbridge after finishing her work.':'Sol brought his manuscript to the garden. Mara remained at work at the dock.',['mara','sol']);
 add(gathering&&c.history.includes('GATHER_MARA'),'mara-telling','The Torn Wing was shared',f.plan?.reader==='mara'?'Mara told The Torn Wing to the people in the garden.':f.plan?.time==='later'?'Pip read The Torn Wing while Mara, Sol and Grandma listened.':'Pip read The Torn Wing to Sol and Grandma while Mara was at work.',['story']);
 const performed=g.solPerformed;
 add(gathering&&performed!==null,'sol-telling','Sol shared his story',performed==='draft'?'Sol shared the original draft of A Small Repair with its ending still open.':performed?.origin==='child'?'Sol shared A Small Repair with your suggested ending. The added wording is your interpretation.':'Sol shared A Small Repair with a prepared ending from his account.',['sol']);
 add(gathering&&g.cushions,'cushions-returned','The cushions came out again','Grandma brought the stored cushions back to the garden bench.',['opening','empty']);
 add(gathering&&g.grandmaPerformed,'grandma-telling','Grandma shared her account','Grandma shared The Empty Bench with the people in the garden.',['empty']);
 add(c.history.includes('PIP_MEMORY_PLACED')&&f.records.pip!==null,'pip-memory','Pip kept a memory',f.records.pip==='planting'?'Pip placed the memory of planting the seed with Grandma in their lantern-flower.':'Pip placed the memory of sharing stories in the garden in their lantern-flower.');
 add(f.grandmaCopy==='mara','grandma-copy-delivered','A story reached Mara','Pip delivered Grandma’s copy of The Empty Bench to Mara at the dock.',['empty']);
 return cards;
}

/** Pictures use the same participated-event admission as captions. The performed
 * Sol contribution, agreed attendance and chosen memory determine variants; a
 * working draft or a merely selected future ending cannot change these images. */
export function observationPictureFor(chapter:Chapter,event:ObservationId):ObservationPictureSpec|null{
 if(!observationsFor(chapter).some(card=>card.id===event))return null;
 const performed=chapter.gathering.solPerformed;
 return {event,gathering:chapter.story.plan?.time==='later'?chapter.story.plan.reader==='mara'?'mara-reading':'mara-listening':'mara-absent',sol:performed&&performed!=='draft'?performed.scene:'draft',solOrigin:performed&&performed!=='draft'?performed.origin:null,memory:chapter.story.records.pip};
}

/** Reordering never removes cards. Newly participated events are appended, and
 * a stale saved ID cannot manufacture an event that this chapter did not record. */
export function storyboardFor(chapter:Chapter,journal:JournalState):Observation[]{
 const remaining=new Map(observationsFor(chapter).map(card=>[card.id,card])),ordered:Observation[]=[];
 for(const id of journal.storyboard){const card=remaining.get(id);if(card){ordered.push(card);remaining.delete(id);}}
 return [...ordered,...remaining.values()];
}

/** Call from the existing serialized store. Invalid/stale commands are no-ops;
 * neither this reducer nor deriving cards can modify the chapter or its drafts. */
export function updateJournal(state:JournalState,command:JournalCommand,chapter?:Chapter):JournalState{
 if(!validJournal(state))return state;
 if(command.type==='NOTES')return typeof command.text==='string'&&command.text.length<=JOURNAL_NOTE_LIMIT&&command.text!==state.notes?{...state,notes:command.text}:state;
 if(command.type!=='REORDER'||!chapter||!Array.isArray(command.order))return state;
 const cards=observationsFor(chapter),available=new Set(cards.map(card=>card.id));
 if(command.order.length!==cards.length||new Set(command.order).size!==cards.length||Array.from(command.order).some(id=>!available.has(id)))return state;
 if(command.order.length===state.storyboard.length&&command.order.every((id,index)=>id===state.storyboard[index]))return state;
 return {...state,storyboard:[...command.order]};
}
