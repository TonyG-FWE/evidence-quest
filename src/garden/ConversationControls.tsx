import {ReadingParagraph,ReadWords,ReadingTools} from './Reading.js';
import type {GardenState,GardenStore} from './model.js';
import {activeConversation,conversationParts,conversationProgress,needsDockService} from './conversation.js';
import {Choices,Reply} from './Dialogue.js';
import {MaraMessage} from './MaraMessage.js';
import {ReadingDetails} from './ReadingDetails.js';

export function ConversationControls({s,store,close,backLabel}:{s:GardenState;store:GardenStore;close:()=>void;backLabel:string}){
 const id=activeConversation(s),progress=id&&!(id==='mara'&&needsDockService(s.chapter))?conversationProgress(s.chapter,id):null;
 const last=id?conversationParts[id].length:0,part=progress?.part??0;
 return <nav className="g-reader-navigation" aria-label="Conversation navigation">
  {progress&&part<last&&<ReadingParagraph className="g-small">Conversation · part {part+1} of {last}</ReadingParagraph>}
  <div className="g-row">
   {progress&&part>0&&<button className="g-secondary" disabled={!!s.action} onClick={()=>store.send({type:'CONVERSATION',direction:'previous'})}>Return to previous part</button>}
   {progress&&part<last&&<button className="g-primary" disabled={!!s.action} onClick={()=>store.send({type:'CONVERSATION',direction:'next'})}>{part===last-1?'Choose Pip’s reply':'Continue conversation'}</button>}
   {(s.panel!=='opening'||s.panelTrail.some(p=>!!p.panel))&&<button className="g-secondary" onClick={close}>{backLabel}</button>}
  </div>
 </nav>;
}

export function MaraChoices({s,store}:{s:GardenState;store:GardenStore}){
 const c=s.chapter,f=c.story,progress=conversationProgress(c,'mara'),busy=!!s.action;
 const send=(kind:'OFFER_LATER'|'OFFER_RETURN_STORY'|'WATCH_DUTY'|'DELIVER_COPY'|'FINISH')=>store.send({type:'STORY',event:{kind}});
 const ready=progress.complete&&progress.part===conversationParts.mara.length;
 const offers=<Choices>
  {c.page==='mara'&&<button className="g-primary" disabled={busy} onClick={()=>store.send({type:'TAKE_PAGE'})}>I can read your story to Grandma.</button>}
  {c.mara.asking==='none'&&f.timeAgreed!=='later'&&<button className="g-alternative" disabled={busy} onClick={()=>send('OFFER_LATER')}>I'll ask Grandma to start the next gathering later.</button>}
 </Choices>;
 if(f.phase==='planning'){
  if(needsDockService(c))return <Choices><button className="g-primary" disabled={busy} onClick={()=>send('WATCH_DUTY')}>Watch Mara help these passengers</button></Choices>;
  if(!ready)return null;
  if(f.plan){const invited=f.maraInvitation?.time===f.plan.time&&f.maraInvitation?.reader===f.plan.reader;
   return <>{invited?<><Reply who="Mara">{f.plan.time==='usual'?'I’ll still be working. You can read my story for me. Please bring me one of Grandma’s stories.':f.plan.reader==='mara'?'Yes. I’ll come over and read it once I’ve helped the last passengers ashore.':'I’d like to listen while you read it. I’ll join you after the last passengers leave.'}</Reply><ReadingParagraph>Mara knows the plan. Return to Grandma after you have also told Sol.</ReadingParagraph></>:<Choices label="Tell Mara the plan."><button className="g-primary" disabled={busy} onClick={()=>store.send({type:'STORY',event:{kind:'INVITE',who:'mara'}})}>{f.plan.time==='later'?(f.plan.reader==='mara'?'We’re starting after the last boat returns. Would you read your story?':'We’re starting after the last boat returns. I’ll read while you listen.'):'We’re keeping the usual time. I’ll read your story for you.'}</button></Choices>}
    {invited&&f.plan.reader==='pip'&&c.page==='mara'&&<Choices><button className="g-primary" onClick={()=>store.send({type:'TAKE_PAGE'})}>May I take your page to read?</button></Choices>}
   </>;
  }
  if(c.mara.asking==='pending'&&!f.maraReported)return <>
   <Reply who="Pip">I’ll ask Grandma to start the next gathering later.</Reply>
   <Reply who="Mara">Please ask her. Starting after the last boat returns would give me time to finish work.</Reply>
   <MaraMessage s={s} store={store}/>
  </>;
  if(c.page!=='mara')return <>
   <Reply who="Mara">{c.mara.returnOffered?'Thank you. If I’m still at work, I’d love to read one of Grandma’s stories afterward.':'Take this copy with you. Tell Grandma I still want to hear her stories, too.'}</Reply>
   <ReadingParagraph>{c.page==='pip'?'Pip is carrying her copy. Cross the river and give it to Grandma.':'Grandma has Mara’s copy.'}</ReadingParagraph>
   {!c.mara.returnOffered&&<Choices><button className="g-primary" onClick={()=>send('OFFER_RETURN_STORY')}>I can bring you a story if you’re still working.</button></Choices>}
   {c.mara.asking==='none'&&f.timeAgreed!=='later'&&<ReadingDetails id="mara-another-plan" s={s} store={store}><summary>Discuss another way to include Mara</summary>{offers}</ReadingDetails>}
  </>;
  if(f.maraReported||f.timeAgreed==='later')return <><Reply who="Mara">{f.timeAgreed==='later'?'Grandma has agreed to start later. Let me know who will read my story when you have made the plan.':'Thank you for telling Grandma about my work. Let me know what you decide.'}</Reply><ReadingDetails id="mara-another-plan" s={s} store={store}><summary>Discuss another way to share the story</summary>{offers}</ReadingDetails></>;
  return offers;
 }
 return <>{f.phase==='closed'&&f.grandmaCopy==='pip'&&<Choices><button className="g-primary" disabled={busy} onClick={()=>send('DELIVER_COPY')}>Give Grandma’s story</button></Choices>}{f.phase==='closed'&&f.closingDone&&<Choices><button className="g-primary" onClick={()=>send('FINISH')}>Finish the chapter</button></Choices>}</>;
}
