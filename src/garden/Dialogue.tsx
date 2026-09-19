import {Children,Fragment,isValidElement,cloneElement,useContext,useState,type ReactNode,type ButtonHTMLAttributes} from 'react';
import {ReadWords,ReadingTools,ReadingContext,readingText,type ReadingOrigin} from './Reading.js';
import {voiceSpeaker} from './voiceTypes.js';

export function Reply({who,children,origin='authored-display'}:{who:string;children:ReactNode;origin?:ReadingOrigin}){
 const text=readingText(children);
 return <div className="g-dialogue-response" data-speech-speaker={voiceSpeaker(who)} data-speech-origin={origin} data-speech-revision={origin==='child-draft'?text:undefined}><strong className="g-speaker">{who} says</strong><div><ReadWords text={text} origin={origin}/></div><ReadingTools text={text} label={who+'’s reply'} origin={origin} speaker={voiceSpeaker(who)} revision={origin==='child-draft'?text:undefined}/></div>;
}
function choiceButtons(children:ReactNode):ReactNode[]{return Children.toArray(children).flatMap(child=>isValidElement<{children?:ReactNode}>(child)?child.type===Fragment?choiceButtons(child.props.children):child.type==='button'?[child]:[]:[]);}
export function Choices({children,label='You are Pip. Choose your response.'}:{children:ReactNode;label?:string}){
 const [help,setHelp]=useState(false),choices=choiceButtons(children),reading=useContext(ReadingContext);
 if(!choices.length)return null;
 return <fieldset className="g-choices g-adaptive-choices"><legend>{label}</legend><div className="g-choice-rows">{choices.map((choice,index)=>{
  if(!isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>(choice))return null;
  const text=readingText(choice.props.children);
  return <div className="g-choice-row" key={choice.key??index}><button type="button" className="g-choice-listen" aria-label={'Hear choice: '+text} disabled={!reading} onClick={()=>reading?.speak({text,origin:'authored-display',speaker:/speaking as Mara/.test(label)?'mara':'pip'})}>Listen</button>{cloneElement(choice,{className:(choice.props.className??'')+' g-choice-select'},<><span>{choice.props.children}</span><span className="g-choice-select-label" aria-hidden="true">Select →</span></>)}</div>;
 })}</div><button className="g-choice-reading g-text-button" type="button" aria-expanded={help} onClick={()=>setHelp(!help)}>{help?'Hide choice reading help':'Help me read these choices'}</button>{help&&<section className="g-choice-reading-preview" aria-label="Read the choices before choosing"><p>Listening leaves every choice open. Select the reply you want Pip to use.</p>{choices.map((choice,index)=>isValidElement<{children?:ReactNode}>(choice)?<div key={index}><strong>Choice {index+1}</strong><p><ReadWords>{choice.props.children}</ReadWords></p><ReadingTools text={readingText(choice.props.children)} label={'choice '+(index+1)} speaker={/speaking as Mara/.test(label)?'mara':'pip'}/></div>:null)}</section>}</fieldset>;
}
/** Transient acknowledgements belong in the conversation, ahead of its next choices. */
export function DialogueNotice({notice}:{notice:string}){
 const match=notice.match(/^([^:]+) says: [“"]([\s\S]*?)[”"]$/);
 return match?<Reply who={match[1]!}>{match[2]}</Reply>:notice?<div role="status" className="g-story-status"><ReadWords text={notice}/><ReadingTools text={notice} label="what happened"/></div>:null;
}
