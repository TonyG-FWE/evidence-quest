import type {Chapter,GardenState,SourceId} from './model.js';
import {MARA,distance} from './model.js';
import {maraAtGarden,GATHER_MARA,solPosition} from './chapter.js';
import {nearBakery} from './bakery.js';

export const conversationParts={mara:[[0,1,2,3],[4],[5,6]],bakery:[[0,1],[2]],sol:[[0,1,2,3,4]]} as const;
export type ConversationId=keyof typeof conversationParts;
export type ConversationProgress={part:number;complete:boolean};
export type Conversations=Partial<Record<ConversationId,ConversationProgress>>;
export const freshConversations=():Conversations=>({mara:{part:0,complete:false},bakery:{part:0,complete:false},sol:{part:0,complete:false}});
/** Old saves retain completed commitments. Merely opening the old dock reader is not a commitment. */
export function conversationProgress(c:Chapter,id:ConversationId):ConversationProgress{
 const saved=c.conversations?.[id];if(saved)return saved;
 const complete=id==='mara'?c.page!=='mara'||c.mara.asking!=='none'||c.story.maraReported||!!c.story.plan||c.story.phase!=='planning'||c.maraHeard&&c.mara.service==='served':id==='bakery'?c.bakery.stage!=='arrival':c.story.laterKnown||c.story.solChoice!=='none'||!!c.story.records.sol;
 return {part:complete?conversationParts[id].length:0,complete};
}
export const conversationReady=(c:Chapter,id:ConversationId)=>conversationProgress(c,id).complete;
export const needsDockService=(c:Chapter)=>c.mara.edition==='connected-20260915'&&c.mara.service==='waiting'&&!conversationReady(c,'mara');
export function rememberConversation(c:Chapter,id:ConversationId){c.conversations??={};return c.conversations[id]??=(conversationProgress(c,id));}
export function activeConversation(s:GardenState):ConversationId|null{
 if(s.activity||s.mode!=='walk'||s.chapter.story.phase!=='planning'||accountReading(s))return null;
 if(s.panel==='mara'&&conversationPresent(s,'mara'))return 'mara';
 if(s.panel==='sol'&&!s.chapter.story.records.sol&&conversationPresent(s,'sol'))return 'sol';
 if(s.panel==='bakery'&&s.chapter.bakery.stage==='arrival'&&s.chapter.bakery.met&&conversationPresent(s,'bakery'))return 'bakery';
 return null;
}
export function conversationPresent(s:GardenState,id:ConversationId){const c=s.chapter;return !s.activity&&s.mode==='walk'&&(id==='bakery'?(nearBakery(c)||c.bakery.stage==='done'&&distance(c.pip,solPosition(c))<=1.5):distance(c.pip,id==='sol'?solPosition(c):maraAtGarden(c)?GATHER_MARA:MARA)<=1.5);}
/** A source opened from Help, backpack or another reader stays a source, even beside its author. */
export function accountReading(s:GardenState){
 if(s.panel!=='mara'&&s.panel!=='sol'&&s.panel!=='bakery')return false;
 return !!s.panelTrail.at(-1)?.panel||!conversationPresent(s,s.panel);
}
export function moveConversation(s:GardenState,direction:'next'|'previous'){
 const id=activeConversation(s);if(!id||s.action||s.background||s.viewLost||id==='mara'&&needsDockService(s.chapter))return;
 const p=rememberConversation(s.chapter,id),length=conversationParts[id].length;
 p.part=Math.max(0,Math.min(length,p.part+(direction==='next'?1:-1)));
 if(p.part===length){p.complete=true;if(id==='mara')s.chapter.maraHeard=true;}
 s.notice='';s.chapter.reading[id]=0;s.restoreFocus=null;
}
export function validConversations(c:Chapter){
 if(c.conversations===undefined)return true;
 if(!c.conversations||typeof c.conversations!=='object'||Array.isArray(c.conversations))return false;
 return Object.entries(c.conversations).every(([id,p])=>id in conversationParts&&!!p&&Number.isInteger(p.part)&&p.part>=0&&p.part<=conversationParts[id as ConversationId].length&&typeof p.complete==='boolean'&&(p.part!==conversationParts[id as ConversationId].length||p.complete));
}

/** Presentation labels stay outside exact source words, IDs and exposure records. */
const voices:Partial<Record<SourceId,readonly string[]>>={
 opening:['Narrator','Narrator','Grandma’s letter'],
 mara:['Narrator','Pip','Mara','Pip','Mara','Pip','Mara'],
 report:['Pip','Grandma'],
 bakery:['Narrator','Rina','Narrator'],
 story:['Mara narrates','Mara','Mara narrates','The boy','Mara narrates','Mara narrates','Mara','Mara narrates','Mara narrates','Mara narrates','The boy'],
 sol:['Sol narrates','Rina','Sol narrates','Sol narrates','Sol narrates'],
 later:['Sol'],
 empty:['Grandma narrates','Grandma narrates','Grandma narrates','Grandma thinks','Grandma narrates','Grandma narrates','Grandma narrates','Grandma narrates','Grandma narrates'],
 picnic:['Grandma narrates','Grandma narrates','Sol','Grandma narrates','Grandma narrates','Grandma','Sol','Grandma narrates'],
 duet:['Mara narrates','Mara','Mara narrates','Mara narrates','Mara narrates','Mara narrates'],
 breadEnding:['Sol’s prepared ending'],thanksEnding:['Sol’s prepared ending']
};
export const sourceVoice=(id:SourceId,index:number)=>voices[id]?.[index]??null;
export const sourceNarration:Partial<Record<SourceId,string>>={story:'Mara wrote this story about an earlier visit. “I” means Mara; the boy speaks about his sister’s paper bird.',sol:'Sol wrote this draft about today’s repair. “I” means Sol.',empty:'Grandma wrote this story. “I” means Grandma.',picnic:'Grandma tells this older garden story. “I” means Grandma.',duet:'Mara tells this older story. “I” means Mara.'};

/** Decision changes are reading transitions; typing never changes this key or steals focus. */
export function readerStep(s:GardenState){
 const c=s.chapter,f=c.story,m=f.maraMessage,id=activeConversation(s);
 const part=id?conversationProgress(c,id).part:null;
 const step=s.panel==='mara'?[part,c.mara.service,c.page,c.mara.asking,c.mara.returnOffered,m?.mode,m?.confirmed,f.maraReported,f.plan?.revision,f.maraInvitation]:
  s.panel==='report'?[f.maraReported,m?.mode,m?.confirmed,f.timeAgreed]:
  s.panel==='sol'?[part,f.solChoice,f.solEnding?.revision,f.solInvitation]:
  s.panel==='bakery'?[part,c.bakery.stage]:
  s.panel==='grandma'?[c.seed,f.maraReported,f.solReported,f.timeAgreed,f.plan?.revision,c.gathering.reported]:
  s.panel==='planner'?[f.plan?.revision,c.gathering.reported]:
  s.panel==='writing'?[f.solChoice,!!s.viewDrafts.disclosures['writing-revise']]:
  s.panel==='gathering'?[f.phase,f.questions,c.gathering.solDisclosed,c.gathering.cushions,c.gathering.pageComplete]:[];
 return s.panel+':step:'+JSON.stringify(step);
}
