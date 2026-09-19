import {Children,Fragment,isValidElement,useState,type ReactNode} from 'react';
import {ReadWords,ReadingTools,readingText,type ReadingOrigin} from './Reading.js';

export function Reply({who,children,origin='authored-display'}:{who:string;children:ReactNode;origin?:ReadingOrigin}){
 const text=readingText(children);
 return <div className="g-dialogue-response"><strong className="g-speaker">{who} says</strong><div><ReadWords text={text} origin={origin}/></div><ReadingTools text={text} label={who+'’s reply'} origin={origin}/></div>;
}
function choiceButtons(children:ReactNode):ReactNode[]{return Children.toArray(children).flatMap(child=>isValidElement<{children?:ReactNode}>(child)?child.type===Fragment?choiceButtons(child.props.children):child.type==='button'?[child]:[]:[]);}
export function Choices({children,label='You are Pip. Choose your response.'}:{children:ReactNode;label?:string}){
 const [help,setHelp]=useState(false),choices=choiceButtons(children);
 return <fieldset className="g-choices"><legend>{label}</legend>{choices.length>0&&<button className="g-choice-reading g-text-button" type="button" aria-expanded={help} onClick={()=>setHelp(!help)}>{help?'Hide choice reading help':'Help me read these choices'}</button>}{help&&<section className="g-choice-reading-preview" aria-label="Read the choices before choosing"><p>Reading help keeps your choices open. Use a choice button below when you are ready.</p>{choices.map((choice,index)=>isValidElement<{children?:ReactNode}>(choice)?<div key={index}><strong>Choice {index+1}</strong><p><ReadWords>{choice.props.children}</ReadWords></p><ReadingTools text={readingText(choice.props.children)} label={'choice '+(index+1)}/></div>:null)}</section>}{children}</fieldset>;
}
/** Transient acknowledgements belong in the conversation, ahead of its next choices. */
export function DialogueNotice({notice}:{notice:string}){
 const match=notice.match(/^([^:]+) says: [“"]([\s\S]*?)[”"]$/);
 return match?<Reply who={match[1]!}>{match[2]}</Reply>:notice?<div role="status" className="g-story-status"><ReadWords text={notice}/><ReadingTools text={notice} label="what happened"/></div>:null;
}
