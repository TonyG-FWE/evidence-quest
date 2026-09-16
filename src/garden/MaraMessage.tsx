import {ReadingParagraph,ReadWords,ReadingTools} from './Reading.js';
import type {GardenState,GardenStore} from './model.js';
import {preparedMaraMessage,type StoryEvent} from './chapter.js';
import {Choices,Reply} from './Dialogue.js';

/** A draft to carry is separate from the words actually delivered at Grandma's garden. */
export function MaraMessage({s,store,atGrandma=false}:{s:GardenState;store:GardenStore;atGrandma?:boolean}){
 const message=s.chapter.story.maraMessage,send=(event:StoryEvent)=>store.send({type:'STORY',event});
 if(message?.delivered)return null;
 if(!message)return <Choices label={atGrandma?'How will you tell Grandma?':'How will you carry Mara’s message?'}>
  <button className="g-primary" onClick={()=>send({kind:'PREPARE_MARA_MESSAGE',mode:'prepared'})}>Let Grandma know what Mara said</button>
  <button className="g-alternative" onClick={()=>send({kind:'PREPARE_MARA_MESSAGE',mode:'own'})}>Tell Grandma in your own words</button>
 </Choices>;
 if(!message.confirmed)return <section className="g-message-writing" aria-label="Pip’s message for Grandma">
  <ReadingParagraph>Write what Pip will tell Grandma about Mara’s work and when she could come. You are preparing a message for Grandma.</ReadingParagraph>
  <label htmlFor="mara-message">Your message to Grandma</label><textarea id="mara-message" rows={3} maxLength={100000} value={message.text} onChange={e=>send({kind:'EDIT_MARA_MESSAGE',text:e.target.value})}/>
  {message.text.trim()&&<details><summary>Read my message before using it</summary><ReadingParagraph origin="child-draft">{message.text}</ReadingParagraph><ReadingTools text={message.text} label="my message" origin="child-draft"/></details>}<Choices label="What would you like to do with your message?">
   <button className="g-primary" disabled={!message.text.trim()} onClick={()=>send({kind:'CONFIRM_MARA_MESSAGE'})}>Use my message</button>
   <button className="g-alternative" onClick={()=>send({kind:'PREPARE_MARA_MESSAGE',mode:'prepared'})}>Use Mara’s message instead</button>
  </Choices>
 </section>;
 return <section className="g-message-ready">
  <ReadingParagraph className="g-small">{atGrandma?'Your message is ready to tell Grandma.':'Pip will carry this message to Grandma. She has not heard it yet.'}</ReadingParagraph>
  <blockquote className="g-manuscript"><ReadWords text={message.text} origin={message.mode==='own'?'child-draft':'authored-display'}/><ReadingTools text={message.text} label="your message" origin={message.mode==='own'?'child-draft':'authored-display'}/></blockquote>
  {!atGrandma&&<ReadingParagraph>Return to the game, cross the river and talk to Grandma to deliver it.</ReadingParagraph>}
  <Choices label={atGrandma?'Tell Grandma your message.':'Your message is ready.'}>
   {atGrandma&&<button className="g-primary" onClick={()=>send({kind:'REPORT_MARA'})}>Tell Grandma</button>}
   <button className="g-secondary" onClick={()=>send({kind:'PREPARE_MARA_MESSAGE',mode:'own'})}>Change the message</button>
  </Choices>
 </section>;
}

export function DeliveredMaraMessage({s}:{s:GardenState}){
 const delivered=s.chapter.story.maraMessage?.delivered;
 return <Reply who="Pip" origin={delivered?.mode==='own'?'child-draft':'authored-display'}>{delivered?.text??preparedMaraMessage}</Reply>;
}
