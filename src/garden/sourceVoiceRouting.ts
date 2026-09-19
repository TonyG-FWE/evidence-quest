import {literaryParagraphs} from './literaryContent.js';
import {sourcesFor} from './content.js';
import type {VoiceSpeaker,SpeechSource} from './voiceTypes.js';
import {normalizeSpeech} from './voiceTypes.js';

export type AuthoredVoiceSpan={text:string;speaker:VoiceSpeaker;source:string;paragraph:number;start:number;end:number};
const authors:Record<string,VoiceSpeaker>={story:'mara',sol:'sol',later:'sol',empty:'grandma',picnic:'grandma',duet:'mara',notice:'pip',breadEnding:'sol',thanksEnding:'sol'};
// Quote speakers are editorial metadata over unchanged exact source spans.
// Attribution and other prose retain the narrator/first-person author's voice.
const quotations:Record<string,VoiceSpeaker[]>={
 'opening:1':['grandma','grandma'],'opening:3':['grandma'],
 'mara:1':['pip'],'mara:2':['mara'],'mara:3':['pip'],'mara:4':['mara'],'mara:5':['pip'],'mara:6':['mara','mara'],
 'bakery:1':['rina','rina'],'report:0':['pip'],'report:1':['grandma','grandma'],
 'story:1':['mara'],'story:2':['boy','boy'],'story:4':['mara','mara'],'story:5':['boy','mara'],'story:7':['boy','mara'],'story:9':['boy'],
 'sol:1':['rina','rina'],'later:0':['sol'],'empty:3':['grandma'],
 'picnic:1':['grandma'],'picnic:2':['sol','sol'],'picnic:5':['grandma'],'picnic:6':['sol'],'duet:1':['mara','mara'],
};
export const authoredVoiceSpans:AuthoredVoiceSpan[]=Object.entries(literaryParagraphs).flatMap(([source,paragraphs])=>paragraphs.flatMap((text,paragraph)=>{
 const base=authors[source]??'narrator',quotes=quotations[source+':'+paragraph]??[],spans:AuthoredVoiceSpan[]=[];let cursor=0,index=0;
 for(const match of text.matchAll(/“[^”]*”/g)){
  const start=match.index,end=start+match[0].length;
  if(start>cursor)spans.push({text:text.slice(cursor,start),speaker:base,source,paragraph,start:cursor,end:start});
  spans.push({text:match[0],speaker:quotes[index++]??base,source,paragraph,start,end});cursor=end;
 }
 if(cursor<text.length)spans.push({text:text.slice(cursor),speaker:base,source,paragraph,start:cursor,end:text.length});
 return spans;
}));

/** Exact literal matching permits current page/paragraph excerpts without changing text. */
export function routeAuthoredText(text:string,source?:SpeechSource):{text:string;speaker:VoiceSpeaker;source?:SpeechSource}[]{
 const normalized=normalizeSpeech(text);
 if(!normalized)return [];
 if(source&&source.edition!==undefined&&!['original','literary-20260916'].includes(source.edition))throw Error('This source edition is not available for narration.');
 if(source&&source.maintenanceEdition!==undefined&&source.maintenanceEdition!=='staged-20260916')throw Error('This source edition is not available for narration.');
 if(source&&source.paragraph!==undefined){
  const edition=source.edition??'literary-20260916',corpus=sourcesFor({narrativeEdition:edition as 'original'|'literary-20260916',...(source.maintenanceEdition==='staged-20260916'?{maintenanceEdition:'staged-20260916' as const}:{})});
  const original=corpus[source.id as keyof typeof corpus]?.paragraphs[source.paragraph];
  if(original){const start=source.start??original.indexOf(text.trim()),end=source.end??start+text.trim().length;
   if(Number.isInteger(start)&&Number.isInteger(end)&&start>=0&&end>start&&end<=original.length&&normalizeSpeech(original.slice(start,end))===normalized){
    if(source.start===undefined&&original.indexOf(text.trim(),start+1)>=0)throw Error('Choose the exact occurrence to hear these words.');
    const spans=edition==='literary-20260916'?authoredVoiceSpans.filter(s=>s.source===source.id&&s.paragraph===source.paragraph&&s.end>start&&s.start<end):[];
    if(spans.length)return spans.map(s=>{const a=Math.max(start,s.start),b=Math.min(end,s.end);return {text:original.slice(a,b),speaker:s.speaker,source:{...source,edition,start:a,end:b}};});
    return [{text,speaker:authors[source.id]??'narrator',source:{...source,edition,start,end}}];
   }
  }
  throw Error('These words no longer match the selected source. Choose the passage again.');
 }
 if(source){
  if(source.start!==undefined||source.end!==undefined)throw Error('Choose a canonical paragraph for these source offsets.');
  const corpus=sourcesFor({narrativeEdition:source.edition==='original'?'original':'literary-20260916',...(source.maintenanceEdition==='staged-20260916'?{maintenanceEdition:'staged-20260916' as const}:{})}),selected=corpus[source.id as keyof typeof corpus];
  if(selected&&normalized===normalizeSpeech(selected.paragraphs.join('\n\n')))return selected.paragraphs.flatMap((paragraph,index)=>routeAuthoredText(paragraph,{...source,paragraph:index,start:0,end:paragraph.length}));
  throw Error('These words no longer match the selected source. Choose the passage again.');
 }
 const paragraphs=Object.entries(literaryParagraphs).flatMap(([id,values])=>values.map((value,index)=>({id,index,text:normalizeSpeech(value)})));
 const exacts=paragraphs.filter(p=>p.text===normalized),exact=exacts.length===1?exacts[0]:undefined;
 if(exacts.length>1)throw Error('Choose the exact source to hear these words.');
 if(exact)return authoredVoiceSpans.filter(s=>s.source===exact.id&&s.paragraph===exact.index).map(({text,speaker,start,end})=>({text,speaker,source:{id:exact.id,paragraph:exact.index,edition:'literary-20260916',start,end}}));
 const candidates=paragraphs.filter(p=>p.text.includes(normalized)),contained=candidates.length===1?candidates[0]:undefined;
 if(candidates.length>1)throw Error('Choose the exact source to hear these words.');
 if(contained){
  const original=literaryParagraphs[contained.id as keyof typeof literaryParagraphs][contained.index]!;
  const start=original.indexOf(text.trim());
  if(start>=0&&original.indexOf(text.trim(),start+1)<0){const end=start+text.trim().length;return authoredVoiceSpans.filter(s=>s.source===contained.id&&s.paragraph===contained.index&&s.end>start&&s.start<end).map(s=>({text:original.slice(Math.max(start,s.start),Math.min(end,s.end)),speaker:s.speaker,source:{id:contained.id,paragraph:contained.index,edition:'literary-20260916',start:Math.max(start,s.start),end:Math.min(end,s.end)}}));}
  if(start>=0)throw Error('Choose the exact occurrence to hear these words.');
 }
 const parts=text.split(/\n\s*\n/);if(parts.length>1)return parts.flatMap(part=>routeAuthoredText(part));
 return [{text,speaker:'narrator'}];
}
