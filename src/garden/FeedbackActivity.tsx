import {ReadingParagraph,ReadWords,ReadingTools,ReadingContext} from './Reading.js';
import {useEffect,useRef,useState,useContext} from 'react';
import type {GardenStore,SourceId} from './model.js';
import type {EndingScene} from './chapter.js';
import {sources} from './content.js';
/** Optional meaning feedback; it cannot select an ending or advance the story. */
export function FeedbackActivity({store,activity,speaker,question,help,sourceIds,reflective=false,externalText,onExternalChange,onScene}:{store:GardenStore;activity:string;speaker:string;question:string;help:string;sourceIds:SourceId[];reflective?:boolean;externalText?:string;onExternalChange?:(text:string)=>void;onScene?:(s:EndingScene)=>void}){
 const [text,setText]=useState(()=>store.getSnapshot().chapter.story.answers[activity]??''),[hint,setHint]=useState(false),[status,setStatus]=useState(''),[busy,setBusy]=useState(false),[reply,setReply]=useState(''),[checked,setChecked]=useState(false);
 const reading=useContext(ReadingContext);
 const fullDraft=externalText??text;
 const [selection,setSelection]=useState<{source:string;start:number;end:number}|null>(null),[excerpt,setExcerpt]=useState<{source:string;start:number;end:number}|null>(null);
 const usingExcerpt=excerpt?.source===fullDraft&&excerpt.end>excerpt.start;
 const draft=usingExcerpt?fullDraft.slice(excerpt.start,excerpt.end):fullDraft;
 const current=useRef<{controller:AbortController;id:string}|null>(null),latest=useRef(draft);latest.current=draft;
 const stop=()=>{current.current?.controller.abort();current.current=null;setBusy(false);};
 useEffect(()=>()=>{current.current?.controller.abort();current.current=null;},[]);
 useEffect(()=>{stop();setReply('');setStatus('');setChecked(false);},[draft]);
 async function feedback(disputed?:string){
  if(current.current||!draft.trim())return;if(Array.from(draft).length>4000){setStatus('Choose a shorter part to discuss. Your full writing is still here.');return;}
  const unresolved=activity==='later-time'?"I couldn't check that response reliably. You can reread Mara's explanation or continue planning.":activity==='sol-ending'?"I couldn't check that feedback reliably. You can keep your ending or change it after rereading Sol's story.":"I couldn't check that response reliably. You can reread the account or continue playing.";
  const id=crypto.randomUUID(),controller=new AbortController(),submitted=draft;current.current={id,controller};setBusy(true);setReply('');setStatus('Thinking about your words…');const timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const c=store.getSnapshot().chapter,exposed=c.exposed.filter(ref=>sourceIds.some(source=>ref.startsWith('GA.SRC.'+source.toUpperCase()+'.'))&&!/\.W\d+$/.test(ref));
   const response=await fetch('/api/garden/feedback',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({contract:1,requestId:id,activity,revision:c.revision,draftRevision:c.story.solDraft.revision,text:submitted,exposed,...(disputed?{disputed}:{})})});
   const data:unknown=await response.json();if(current.current?.id!==id||latest.current!==submitted)return;
   const result=data as {requestId?:string;status?:string;feedback?:string;scene?:string};
   if(disputed&&result.status==='uncertain'){setStatus(unresolved);return;}
   if(response.ok&&result.requestId===id&&['supported','clarify','contradiction','uncertain'].includes(result.status??'')&&typeof result.feedback==='string'&&result.feedback.length<=320){setReply(result.feedback);setStatus('');if(!usingExcerpt&&result.status==='supported'&&result.scene&&['bread','thanks','both'].includes(result.scene))onScene?.(result.scene as EndingScene);}
   else setStatus(disputed?unresolved:'AI feedback isn’t available right now. Your words are kept here. You can use a hint, revise, or continue.');
  }catch{if(current.current?.id===id)setStatus('AI feedback isn’t available right now. Your words are kept here. You can use a hint, revise, or continue.');}
  finally{clearTimeout(timeout);if(current.current?.id===id){current.current=null;setBusy(false);}}
 }
 return <section className="g-meaning-activity" aria-label={question}>
  <h3>{reflective?'Think about the story':speaker+' asks'}</h3><ReadingParagraph>{question}</ReadingParagraph>{externalText===undefined&&<label>Your answer, in your own words<textarea rows={3} value={text} onChange={e=>{setText(e.target.value);store.send({type:'STORY',event:{kind:'ANSWER',activity,text:e.target.value}});}}/></label>}
  {externalText!==undefined&&Array.from(fullDraft).length>4000&&<details className="g-feedback-excerpt"><summary>Choose a shorter part for feedback</summary><ReadingParagraph>Select up to 4,000 characters here with the mouse, or hold Shift while using the arrow keys. {onExternalChange?'You can edit your full draft here, too. Both writing boxes show the same draft.':'Your complete ending stays in your draft.'} Selecting words leaves your draft and previously chosen ending unchanged.</ReadingParagraph><label htmlFor={'feedback-excerpt-'+activity}>Select words from your ending</label><textarea id={'feedback-excerpt-'+activity} readOnly={!onExternalChange} onChange={e=>onExternalChange?.(e.currentTarget.value)} rows={5} value={fullDraft} onSelect={e=>setSelection({source:fullDraft,start:e.currentTarget.selectionStart,end:e.currentTarget.selectionEnd})}/><button className="g-secondary" disabled={!selection||selection.source!==fullDraft||selection.end<=selection.start||Array.from(fullDraft.slice(selection.start,selection.end)).length>4000} onClick={()=>{stop();setReply('');setStatus('');setExcerpt(selection);}}>Use selected words for feedback</button></details>}
  {externalText===undefined&&text.trim()&&<details><summary>Read my answer</summary><ReadingParagraph origin="child-draft">{text}</ReadingParagraph><ReadingTools text={text} label="my answer" origin="child-draft"/></details>}
  {usingExcerpt&&<div className="g-feedback-excerpt"><strong>Feedback on these selected words only</strong><ReadingParagraph className="g-manuscript" origin="child-draft">{draft}</ReadingParagraph><button className="g-secondary" onClick={()=>{stop();setExcerpt(null);}}>Return to feedback on the full ending</button><ReadingParagraph className="g-small">This does not change your draft, chosen ending or picture.</ReadingParagraph></div>}
  <div className="g-row"><button className="g-secondary" disabled={busy||!draft.trim()} onClick={()=>void feedback()}>Ask for feedback</button><button className="g-hint-button" onClick={()=>{setHint(true);store.send({type:'HELP_USED',id:'meaning:'+activity});}}>Give me a hint</button>{busy&&<button className="g-secondary" onClick={()=>{stop();setStatus('Feedback stopped. Your words are still here.');}}>Stop feedback</button>}</div>
  {status&&<ReadingParagraph role="status">{status}</ReadingParagraph>}{reply&&<div className="g-dialogue-response" role="status"><strong className="g-speaker">{reflective?'Reading feedback':speaker+'’s feedback'}</strong><div><ReadWords text={reply}/></div><ReadingTools text={reply} label="the feedback"/>{!checked&&<button className="g-secondary" onClick={()=>{setChecked(true);void feedback(reply);}}>Check that feedback</button>}</div>}{checked&&<details open><summary>Reread the account</summary>{sourceIds.flatMap(id=>sources[id].paragraphs.filter((_,i)=>store.getSnapshot().chapter.exposed.includes('GA.SRC.'+id.toUpperCase()+'.'+(i+1))).map((p,i)=><ReadingParagraph key={id+i}>{p}</ReadingParagraph>))}</details>}{hint&&<ReadingParagraph className="g-authored-hint"><strong>Story hint</strong> {help}</ReadingParagraph>}
  {externalText===undefined&&<button className="g-secondary" onClick={event=>reading?.compose(question,'answer-'+activity,event.currentTarget,words=>{setText(words);store.send({type:'STORY',event:{kind:'ANSWER',activity,text:words}});})}>Say my answer</button>}
  <ReadingParagraph className="g-small">You can keep playing without answering.</ReadingParagraph><details><summary>About AI feedback</summary><ReadingParagraph>When you ask for AI feedback, your answer and the relevant story text are sent to the AI service. Your story progress stays in this browser.</ReadingParagraph><ReadingParagraph>Live feedback is currently unavailable in this local demo. Hints are prepared story help.</ReadingParagraph></details>
 </section>;
}
