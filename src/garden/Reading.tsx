import {useNarrativeLine} from './NarrativeReadingContext.js';
import {Children,createContext,isValidElement,useContext,useEffect,useRef,useState,useId,type ReactNode,type RefObject} from 'react';
import {type SpeechSpeak,type VoiceSpeaker,type SpeechSource,type SpeechRequest,type ReadingOrigin as SpeechOrigin} from './voiceTypes.js';
import {positionedSpeech,speechAttributes,speechDocument,speechFromElement,sentenceAt} from './readingSpeech.js';
import {cancelLocalSpeech,onLocalSpeechCanceled} from './audio.js';

export type ReadingOrigin=SpeechOrigin;
export type ReadingWord={word:string;sentence:string;button:HTMLButtonElement;draft:string;component:string;paragraph:number;start:number;end:number;origin:ReadingOrigin};
type ReadingSupport={word:(word:ReadingWord)=>void;speak:SpeechSpeak;practice:(text:string,id:string,opener?:HTMLElement,origin?:ReadingOrigin,title?:string,speech?:SpeechRequest)=>void;compose:(text:string,id:string,opener:HTMLElement,onTranscript:(text:string)=>void)=>void;stop:()=>void;speaking:boolean};
export const ReadingContext=createContext<ReadingSupport|null>(null);
/** A reader has one primary listening/practice pair. Choice previews remain individually selectable. */
export const GroupedReadingContext=createContext(false);
export function readingText(children:ReactNode):string{
 return Children.toArray(children).map(child=>typeof child==='string'||typeof child==='number'?String(child):isValidElement<{children?:ReactNode}>(child)?readingText(child.props.children):'').join('');
}
/** Dynamic dialogue is readable text, never a substitute canonical source/exposure ID. */
export function ReadWords({children,text,origin='authored-display',speech}:{children?:ReactNode;text?:string;origin?:ReadingOrigin;speech?:SpeechRequest|undefined}){
 const support=useContext(ReadingContext),id=useId(),revise=useNarrativeLine(),raw=text??readingText(children),value=origin==='authored-display'?revise(raw):raw;
 if(!support)return <>{value===raw?(children??text):value}</>;
 let cursor=0,wordIndex=0;
 return <span data-readable-text="true" data-reading-origin={origin} {...speechAttributes(speech)}>{value.split(/([A-Za-z]+(?:['’][A-Za-z]+)?)/g).map((token,index)=>{
  const start=cursor;cursor+=token.length;if(!/^[A-Za-z]/.test(token))return token;
  const order=wordIndex++,sentence=sentenceAt(value,start).text;
  return <button key={index} type="button" className="g-word" tabIndex={order===0?0:-1} onClick={event=>support.word({word:token,sentence,button:event.currentTarget,draft:value,component:id,paragraph:0,start,end:start+token.length,origin})} onKeyDown={event=>{
   if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;event.preventDefault();event.stopPropagation();
   const buttons=Array.from(event.currentTarget.closest('[data-readable-text]')!.querySelectorAll<HTMLButtonElement>('.g-word'));
   buttons[buttons.indexOf(event.currentTarget)+(event.key==='ArrowRight'?1:-1)]?.focus();
  }}>{token}</button>;
 })}</span>;
}
/** A practice page can contain several speakers and a repeated child-authored ending. */
export function SpeechWords({speech,origin='authored-display'}:{speech:SpeechRequest;origin?:ReadingOrigin}){
 const document=positionedSpeech(speech);
 if(!document.segments)return <ReadWords text={document.text} origin={document.origin??origin} speech={document}/>;
 const {segments,...parent}=document;let cursor=0;const words:ReactNode[]=[];
 for(const part of segments){if(part.start!>cursor)words.push(document.text.slice(cursor,part.start));words.push(<SpeechWords key={part.start} speech={{...parent,...part}} origin={origin}/>);cursor=part.end!;}
 if(cursor<document.text.length)words.push(document.text.slice(cursor));
 return <>{words}</>;
}
export function ReadingTools({text,label='this passage',origin='authored-display',speechOrigin,speaker,source,revision,speech,individual=true}:{text:string;label?:string;origin?:ReadingOrigin;speechOrigin?:SpeechOrigin;speaker?:VoiceSpeaker|undefined;source?:SpeechSource|undefined;revision?:number|string|undefined;speech?:SpeechRequest|undefined;individual?:boolean}){
 const support=useContext(ReadingContext),grouped=useContext(GroupedReadingContext),revise=useNarrativeLine(),id=label,ownsSpeech=useRef(false);
 const [active,setActive]=useState(false);
 text=origin==='authored-display'?revise(text):text;
 useEffect(()=>onLocalSpeechCanceled(()=>{ownsSpeech.current=false;setActive(false);}),[]);
 useEffect(()=>()=>{if(ownsSpeech.current)cancelLocalSpeech();},[text,origin,speechOrigin,speaker,revision]);
 if(!support||!text.trim()||grouped&&!individual)return null;
 const request=speech??{text,origin:speechOrigin??origin,...(speaker?{speaker}:{}),...(source?{source}:{}),...(revision!==undefined?{revision}:{})};
 return <div data-reading-command="true" className="g-reading-tools" role="group" aria-label={'Reading help for '+label}>
  <button className="g-text-button" type="button" onClick={()=>{if(active&&support.speaking){support.stop();return;}support.speak(request,()=>{ownsSpeech.current=false;setActive(false);});ownsSpeech.current=true;setActive(true);}} aria-label={active&&support.speaking?'Stop listening':'Listen to '+label}>{active&&support.speaking?'Stop listening':'Listen'}</button>
  <button className="g-text-button" type="button" onClick={event=>support.practice(text,'reading-'+id,event.currentTarget,origin,undefined,request)} aria-label={'Practise reading '+label}>Practise reading</button>
 </div>;
}
export function ReadingParagraph({children,className,role,origin='authored-display',speech}:{children:ReactNode;className?:string;role?:'status'|'alert';origin?:ReadingOrigin;speech?:SpeechRequest|undefined}){
 return <p className={className} role={role}><ReadWords origin={origin} speech={speech}>{children}</ReadWords></p>;
}
export function ReadingBlock({children,label='this passage',className}:{children:ReactNode;label?:string;className?:string}){
 const text=readingText(children);return <div className={className}><ReadWords text={text}/><ReadingTools text={text} label={label}/></div>;
}
/** Read narrative passages and spoken replies only. Instructions and unselected choices stay separate. */
export function ConversationReadingTools({root}:{root:RefObject<HTMLElement|null>}){
 const support=useContext(ReadingContext),[available,setAvailable]=useState(false);
 function passages(){return Array.from(root.current?.querySelectorAll<HTMLElement>('[data-source-component],.g-dialogue-response [data-readable-text],[data-narration="true"] [data-readable-text]')??[]).filter(node=>node.getClientRects().length&&!node.closest('details')&&!node.parentElement?.closest('[data-readable-text], [data-source-component]'));}
 useEffect(()=>{const element=root.current;if(!element)return;const update=()=>setAvailable(!Array.from(element.querySelectorAll('.g-story-reading,.g-reading-actions,.g-adaptive-writing')).some(node=>node.getClientRects().length)&&passages().length>0);update();const observer=new MutationObserver(update);observer.observe(element,{childList:true,subtree:true});return()=>observer.disconnect();},[root]);
 if(!support||!available)return null;
 function document(){return speechDocument(passages().map(node=>speechFromElement(node,node.textContent??'')));}
 return <div data-reading-command="true" className="g-reading-tools g-conversation-reading" role="group" aria-label="Read the conversation"><button className="g-text-button" aria-label={support.speaking?'Stop listening':'Listen to the conversation'} onClick={()=>support.speaking?support.stop():support.speak(document())}>{support.speaking?'Stop listening':'Listen'}</button><button className="g-text-button" aria-label="Practise reading the conversation" onClick={event=>{const speech=document();support.practice(speech.text,'conversation',event.currentTarget,'mixed-display',undefined,speech);}}>Practise reading</button></div>;
}
