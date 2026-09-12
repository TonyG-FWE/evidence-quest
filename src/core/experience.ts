import type {CaseState,Experience} from '../../contracts/types.js';
import {content,copy,texts} from './content.js';
import {available,exposed} from './evidence.js';
import type {State} from './state.js';
export type ReadingId='READ.WELCOME'|'READ.PROMISE'|'READ.ENDING';
export const newExperience=(legacy=false):Experience=>({version:1,introBeat:legacy?4:0,introDismissed:legacy,legacyOffer:legacy,npcIntroductions:[],narratorCard:null,narratorPauses:false,phrases:false,wordContexts:[],supports:[]});
export const readings={
 'READ.WELCOME':{ct:'CT.ER13.WELCOME',title:'Welcome to our show',focus:'This time, let your voice welcome the audience to our show.'},
 'READ.PROMISE':{ct:'CT.SRC.E6',title:"Pip's promise",focus:'This time, let your voice show that Pip means his promise.'},
 'READ.ENDING':{ct:'CT.ER13.ENDING',title:'Our ending',focus:'This time, pause so the audience can picture the lantern-flower opening.'},
} as const;
export function readingAvailable(c:CaseState,id:string):id is ReadingId{return id==='READ.WELCOME'||id==='READ.PROMISE'&&available(c,'E6.a')||id==='READ.ENDING'&&c.observations.some(o=>o.kind==='run-finalized'&&o.outcome==='success');}
export const readingIds=(c:CaseState)=>(Object.keys(readings) as ReadingId[]).filter(id=>readingAvailable(c,id));
export const roles:Record<string,string>={'ACT.JO':'story writer','ACT.REMY':'model maker','ACT.ARI':'animation maker','ACT.LOOP':'rolling projector'};
export const roomPurposes:Record<string,string>={'SC.ST':"Our crew's performance space.",'SC.CY':'Outdoor practice space.','SC.WK':'Models and inventions.','SC.MD':'Indoor recording room.'};
export const words={
 PREMIERE:{definition:'The first time a show is performed for an audience.',example:'Our premiere is the first public showing of The Little Bridge.'},
 REHEARSAL:{definition:'A practice before a performance.',example:'In rehearsal, we can try an ending and change it before the audience sees it.'},
 STILL:{definition:'Continuing to be true.',example:'The premiere is still planned.'},
 TOGETHER:{definition:'With each other.',example:'Pip and Grandma will plant the seed together.'},
 FESTIVAL:{definition:'An event where people gather to celebrate and share things.',example:'At our festival, friends share stories and inventions.'},
 PROJECTOR:{definition:'A machine that puts pictures onto a large screen.',example:'Our projector shows the paper characters on the screen.'},
} as const;
export type Word=keyof typeof words;
export interface WordContext{id:string;ct:string;word:Word;sentence:string;start:number;end:number;}
export function contextsFor(ct:string,text=texts.get(ct)!.text):WordContext[]{
 const full=texts.get(ct)!.text,out:WordContext[]=[];
 for(const match of text.matchAll(/[^.!?\n]+[.!?]?/g)){
  const sentence=match[0].trim();if(!sentence)continue;
  const offset=full.indexOf(sentence);if(offset<0)continue;
  const start=Array.from(full.slice(0,offset)).length,end=start+Array.from(sentence).length;
  for(const word of Object.keys(words) as Word[])if(new RegExp(`\\b${word}\\b`,'i').test(sentence))out.push({id:ct+'.'+word+'.'+start,ct,word,sentence,start,end});
 }return out;
}
const contextIndex=new Map(content.texts.flatMap(t=>contextsFor(t.id)).map(c=>[c.id,c]));
export const wordContext=(id:string)=>contextIndex.get(id);
export function definition(c:WordContext){return c.word==='STILL'&&['CT.SRC.E4','CT.ER13.STILL_CONTEXT','CT.SCENE.MD','CT.JO.BORROW','CT.ARI.INVITE'].includes(c.ct)?{definition:'Not moving.',example:'The paper petals stay still indoors.'}:c.word==='STILL'&&c.ct!=='CT.SRC.E3'?{definition:'Continuing to be true.',example:'You can still try another ending.'}:words[c.word];}
export function mayEncounter(s:State,c:WordContext){
 const v=s.runtime.view;
 if(c.ct.startsWith('CT.SRC.'))return s.case.exposures.some(e=>e.ctId===c.ct&&e.spans.some(([a,b])=>a<=c.start&&b>=c.end));
 return v.page==='intro'&&c.ct===`CT.ER13.INTRO${v.frame??0}`||v.page==='reading'&&readingAvailable(s.case,v.sourceId??'')&&c.ct===readings[v.sourceId as ReadingId].ct||v.page==='recap'&&['CT.ER13.PREMIERE_CONTEXT','CT.ER13.REHEARSAL_CONTEXT'].includes(c.ct)||v.page==='work'&&['CT.ER13.PREMIERE_CONTEXT','CT.ER13.REHEARSAL_CONTEXT'].includes(c.ct)||v.page==='talk'&&!!v.dialogue?.includes(c.ct)||s.runtime.caption.includes(c.ct);
}
export function supportAvailable(c:CaseState,id:string){
 return id==='CT.ER13.SCOPE'?exposed(c,'E3.a')&&exposed(c,'E3.b'):id==='CT.ER13.PROMISE_SUPPORT'?c.observations.some(o=>o.kind==='cue-outcome'&&o.outcome==='unmet'&&o.puppet?.pip==='left'&&o.contentIds.some(id=>['CT.CUE.HILL_MISSING_PIP','CT.CUE.HILL_BOTH_LEFT'].includes(id))):false;
}
