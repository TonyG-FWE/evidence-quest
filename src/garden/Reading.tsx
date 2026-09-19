import {Children,createContext,isValidElement,useContext,useId,type ReactNode,type RefObject} from 'react';

export type ReadingOrigin='authored-display'|'child-draft'|'mixed-display';
export type ReadingWord={word:string;sentence:string;button:HTMLButtonElement;draft:string;component:string;paragraph:number;start:number;end:number;origin:ReadingOrigin};
type ReadingSupport={word:(word:ReadingWord)=>void;speak:(text:string)=>void;practice:(text:string,id:string,opener?:HTMLElement,origin?:ReadingOrigin,title?:string)=>void;compose:(text:string,id:string,opener:HTMLElement,onTranscript:(text:string)=>void)=>void;stop:()=>void;speaking:boolean};
export const ReadingContext=createContext<ReadingSupport|null>(null);
export function readingText(children:ReactNode):string{
 return Children.toArray(children).map(child=>typeof child==='string'||typeof child==='number'?String(child):isValidElement<{children?:ReactNode}>(child)?readingText(child.props.children):'').join('');
}
/** Dynamic dialogue is readable text, never a substitute canonical source/exposure ID. */
export function ReadWords({children,text,origin='authored-display'}:{children?:ReactNode;text?:string;origin?:ReadingOrigin}){
 const support=useContext(ReadingContext),id=useId(),value=text??readingText(children);
 if(!support)return <>{children??text}</>;
 let cursor=0,wordIndex=0;
 return <span data-readable-text="true" data-reading-origin={origin}>{value.split(/([A-Za-z]+(?:['’][A-Za-z]+)?)/g).map((token,index)=>{
  const start=cursor;cursor+=token.length;if(!/^[A-Za-z]/.test(token))return token;
  const order=wordIndex++;let offset=0;const sentence=(value.match(/[^.!?]+[.!?]?/g)??[value]).find(part=>{offset+=part.length;return start<offset;})?.trim()??value;
  return <button key={index} type="button" className="g-word" tabIndex={order===0?0:-1} onClick={event=>support.word({word:token,sentence,button:event.currentTarget,draft:value,component:id,paragraph:0,start,end:start+token.length,origin})} onKeyDown={event=>{
   if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;event.preventDefault();event.stopPropagation();
   const buttons=Array.from(event.currentTarget.closest('[data-readable-text]')!.querySelectorAll<HTMLButtonElement>('.g-word'));
   buttons[buttons.indexOf(event.currentTarget)+(event.key==='ArrowRight'?1:-1)]?.focus();
  }}>{token}</button>;
 })}</span>;
}
export function ReadingTools({text,label='this passage',origin='authored-display'}:{text:string;label?:string;origin?:ReadingOrigin}){
 const support=useContext(ReadingContext),id=label;if(!support||!text.trim())return null;
 return <div className="g-reading-tools" role="group" aria-label={'Reading help for '+label}>
  <button className="g-text-button" type="button" onClick={()=>support.speak(text)} aria-label={'Hear '+label}>Hear this</button>
  <button className="g-text-button" type="button" onClick={event=>support.practice(text,'reading-'+id,event.currentTarget,origin)} aria-label={'Read '+label+' aloud'}>Read aloud</button>
  {support.speaking&&<button className="g-text-button" type="button" onClick={support.stop}>Stop listening</button>}
 </div>;
}
export function ReadingParagraph({children,className,role,origin='authored-display'}:{children:ReactNode;className?:string;role?:'status'|'alert';origin?:ReadingOrigin}){
 return <p className={className} role={role}><ReadWords origin={origin}>{children}</ReadWords></p>;
}
export function ReadingBlock({children,label='this passage',className}:{children:ReactNode;label?:string;className?:string}){
 const text=readingText(children);return <div className={className}><ReadWords text={text}/><ReadingTools text={text} label={label}/></div>;
}
/** Reads the currently available conversation, including instructions and hints, in DOM order.
 * Closed details and choice inspection stay out until deliberately opened. No gameplay event. */
export function ConversationReadingTools({root}:{root:RefObject<HTMLElement|null>}){
 const support=useContext(ReadingContext);if(!support)return null;
 function text(){return Array.from(root.current?.querySelectorAll<HTMLElement>('[data-readable-text], [data-source-component]')??[]).filter(node=>node.getClientRects().length&&!node.parentElement?.closest('[data-readable-text], [data-source-component]')).map(node=>{
  const speaker=node.closest('.g-dialogue-response')?.querySelector('.g-speaker')?.textContent;
  return (speaker?speaker+': ':'')+(node.textContent??'');
 }).join('\n\n');}
 return <div className="g-reading-tools g-conversation-reading" role="group" aria-label="Read the conversation"><button className="g-text-button" onClick={()=>support.speak(text())}>Hear this conversation</button><button className="g-text-button" onClick={event=>support.practice(text(),'conversation',event.currentTarget,'mixed-display')}>Read this conversation aloud</button>{support.speaking&&<button className="g-text-button" onClick={support.stop}>Stop listening</button>}</div>;
}
