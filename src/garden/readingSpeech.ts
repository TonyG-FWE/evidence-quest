import type {SpeechRequest,SpeechSource,VoiceSpeaker,ReadingOrigin} from './voiceTypes.js';
import {voiceSpeaker} from './voiceTypes.js';

/** Occurrence offsets belong to this document; source offsets belong to its canonical paragraph. */
export function speechDocument(parts:readonly SpeechRequest[],separator='\n\n'):SpeechRequest{
 let text='';
 const segments=parts.map(part=>{if(text)text+=separator;const start=text.length;text+=part.text;return {...part,start,end:text.length};});
 return {text,segments};
}
export function positionedSpeech(request:SpeechRequest):SpeechRequest{
 if(!request.segments)return request;
 let cursor=0;
 const segments=request.segments.map(part=>{
  const start=part.start??request.text.indexOf(part.text,cursor),end=part.end??start+part.text.length;
  if(start<cursor||end<start||request.text.slice(start,end)!==part.text)throw Error('Reading segments do not match their exact passage.');
  cursor=end;return {...positionedSpeech(part),start,end};
 });
 return {...request,segments};
}
/** Keep exact page text and the ownership of repeated passages, including child endings. */
export function sliceSpeech(request:SpeechRequest,start:number,end:number):SpeechRequest{
 const bound=positionedSpeech(request),text=bound.text.slice(start,end);
 const source=bound.source?{...bound.source,start:(bound.source.start??0)+start,end:(bound.source.start??0)+end}:undefined;
 if(!bound.segments)return {...bound,text,...(source?{source}:{})};
 const segments=bound.segments.flatMap(segment=>{
  const a=Math.max(start,segment.start!),b=Math.min(end,segment.end!);
  if(b<=a)return [];
  return [{...sliceSpeech(segment,a-segment.start!,b-segment.start!),start:a-start,end:b-start}];
 });
 return {...bound,text,segments,...(source?{source}:{})};
}
export function speechAttributes(speech:SpeechRequest|undefined){return speech?{
 'data-speech-speaker':speech.speaker,
 'data-speech-origin':speech.origin,
 'data-speech-revision':speech.revision,
 'data-speech-owner':speech.owner,
 'data-speech-source':speech.source?JSON.stringify(speech.source):undefined,
}:{};}
/** Semantic metadata takes precedence over display labels such as “Sol’s feedback”. */
export function speechFromElement(node:HTMLElement,text:string,occurrence?:{start:number;end:number}):SpeechRequest{
 const attr=(name:string)=>node.closest<HTMLElement>('[data-speech-'+name+']')?.getAttribute('data-speech-'+name)??undefined;
 const spoken=attr('speaker'),origin=attr('origin')??node.dataset['readingOrigin']??'authored-display',revision=attr('revision'),owner=attr('owner');
 let source:SpeechSource|undefined;
 try{const raw=attr('source');if(raw)source=JSON.parse(raw) as SpeechSource;}catch{/* Invalid metadata does not authenticate a source. */}
 const container=node.closest<HTMLElement>('[data-readable-text],[data-source-component]'),full=container?.textContent??'';
 if(source&&container&&text!==full){
  let at=occurrence?.start;
  if(occurrence&&full.slice(occurrence.start,occurrence.end)!==text)throw Error('The selected words no longer match this passage.');
  if(at===undefined){const range=node.ownerDocument.createRange();range.setStart(container,0);range.setEndBefore(node);at=full.lastIndexOf(text,range.toString().length);}
  if(at>=0)source={...source,start:(source.start??0)+at,end:(source.start??0)+at+text.length};
 }
 const label=node.closest('.g-dialogue-response')?.querySelector('.g-speaker')?.textContent?.replace(/ says$/,'');
 return {text,origin:origin as ReadingOrigin,...(spoken||label?{speaker:voiceSpeaker(spoken??label) as VoiceSpeaker}:{}),...(revision!==undefined?{revision}:{}),...(owner?{owner}:{}),...(source?{source}:{})};
}
