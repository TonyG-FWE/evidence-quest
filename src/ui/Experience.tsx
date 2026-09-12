import {useEffect,useRef,useState} from 'react';
import type {State,View} from '../core/state.js';
import {store} from '../controller.js';
import {copy} from '../core/content.js';
import {readings,readingIds,readingAvailable,roles,roomPurposes,wordContext,definition,type ReadingId,type WordContext,supportAvailable} from '../core/experience.js';
import {exposed} from '../core/evidence.js';
import {Sprite} from './Sprite.js';
import {Button} from './primitives.js';
import {Passage} from './Passage.js';
import {VisibleHelp} from './Help.js';
import {assetUrl} from '../world/assets.js';
import {goal,roomName} from './labels.js';
const send=store.send;
export const showReading=(s:State,id:ReadingId='READ.WELCOME')=>send({type:'VIEW',view:{page:'reading',sourceId:id,previous:s.runtime.view}});
export function openWord(s:State,context:WordContext){send({type:'WORD_SEEN',id:context.id});if(!store.getSnapshot().case.experience?.wordContexts.includes(context.id))return;send({type:'WORD_LOOKUP',id:context.id});send({type:'VIEW',view:{page:'words',ref:context.id,previous:s.runtime.view}});}
export function CrewText({ct,s}:{ct:string;s:State}){return <Passage ct={ct} refs={[]} access="ER13" store={store} onWord={(_word,context)=>context&&openWord(s,context)}/>;}
export function Portrait({actor}:{actor:string}){return <div className="crew-portrait"><Sprite id={'ASSET.'+actor} variant="talk"/></div>;}
export function Intro({s}:{s:State}){
 const beat=s.runtime.view.frame??0;
 return <article className="crew-intro"><div className="speaker"><Portrait actor="ACT.JO"/><div><p className="eyebrow">Meet your crew</p><h2 data-focus-heading tabIndex={-1}>Jo <small>story writer</small></h2></div></div>
  <CrewText ct={`CT.ER13.INTRO${beat}`} s={s}/>
  {beat===1&&<div className="paper-cast"><Sprite id="ASSET.PUP.PIP" variant="waiting" alt="Pip, our paper traveler"/><img src={assetUrl('ASSET.PUP.BACKPACK')} alt="The red backpack you helped make"/><Sprite id="ASSET.PUP.GRANDMA" variant="waiting" alt="Grandma, our paper character"/></div>}
  <div className="actions"><Button className="primary" onClick={()=>send({type:'INTRO',action:'next'})}>{beat===3?'Let’s get the show ready':'Next'}</Button><Button onClick={()=>send({type:'INTRO',action:'skip'})}>Keep exploring</Button></div>
  {beat>=1&&<div className="actions"><Button onClick={()=>send({type:'TARGET',target:'ST.MODEL.TAB'})}>Try the paper model</Button>{beat===3&&<Button onClick={()=>send({type:'TARGET',target:'ST.CONTROL.SHOW'})}>Try the big screen</Button>}</div>}
 </article>;
}
export function Recap({s}:{s:State}){
 const c=s.case,p=c.physical;
 return <article><p className="eyebrow">SparkFest · The Little Bridge</p><h2 data-focus-heading tabIndex={-1}>Our story so far</h2>
  <p>SparkFest is our festival of stories and inventions. Our crew made a paper show called <em>The Little Bridge</em>. You helped make Pip’s red backpack. Now you’re running the show with us.</p>
  <p>Pip and Grandma are paper characters in our show. Pip promised to visit Grandma and plant a seed with her, but the river washed the bridge away.</p>
  <div className="crew-list">{['ACT.JO',...c.encounteredActors.filter(a=>a!=='ACT.JO'&&a!=='ACT.LOOP')].map(a=><div key={a}><Portrait actor={a}/><strong>{a.slice(4,5)+a.slice(5).toLowerCase()}<small>{roles[a]}</small></strong></div>)}</div>
  <p>Loop is our rolling projector. It makes the paper characters move on the big screen.</p>
  <section className="mission-paper"><h3>What our crew needs now</h3><p>{copy(goal(c))}</p>{p.loop.mode==='standby'&&<p>Ari borrowed Loop to record the last scene. Explore the festival, talk with the crew, and use what you find.</p>}</section>
  <p>{roomName(p.room)} · {roomPurposes[p.room]}</p>
  <div className="actions"><Button onClick={()=>send({type:'INTRO',action:'open'})}>Meet the crew</Button><Button onClick={()=>showReading(s)}>Read with the crew</Button></div>
  <h3>Our show program</h3><CrewText ct="CT.ER13.PREMIERE_CONTEXT" s={s}/><CrewText ct="CT.ER13.REHEARSAL_CONTEXT" s={s}/>
 </article>;
}
// This service owns only requested speech. No microphone, cloud voice or gameplay callbacks.
function useSpeech(onStarted?:()=>void){
 const [status,setStatus]=useState<'checking'|'ready'|'starting'|'speaking'|'unavailable'|'error'>('checking');
 const voice=useRef<SpeechSynthesisVoice|null>(null),utterance=useRef<SpeechSynthesisUtterance|null>(null),ticket=useRef(0),start=useRef(onStarted);start.current=onStarted;
 useEffect(()=>{
  if(!('speechSynthesis'in window)){setStatus('unavailable');return;}
  const synth=window.speechSynthesis;
  const load=()=>{voice.current=synth.getVoices().find(v=>v.localService&&/^en(?:-|_|$)/i.test(v.lang))??null;setStatus(prior=>prior==='speaking'||prior==='starting'?prior:voice.current?'ready':'unavailable');};
  load();synth.addEventListener('voiceschanged',load);
  const halt=()=>{ticket.current++;if(utterance.current){synth.cancel();utterance.current=null;}setStatus(voice.current?'ready':'unavailable');};
  const hidden=()=>{if(document.hidden)halt();};document.addEventListener('visibilitychange',hidden);window.addEventListener('blur',halt);
  return()=>{ticket.current++;if(utterance.current)synth.cancel();synth.removeEventListener('voiceschanged',load);document.removeEventListener('visibilitychange',hidden);window.removeEventListener('blur',halt);};
 },[]);
 const stop=()=>{ticket.current++;if(utterance.current)window.speechSynthesis.cancel();utterance.current=null;setStatus(voice.current?'ready':'unavailable');};
 const listen=(text:string)=>{
  stop();if(!voice.current){setStatus('unavailable');return;}
  const mine=++ticket.current,u=new SpeechSynthesisUtterance(text);utterance.current=u;u.voice=voice.current;u.lang=voice.current.lang;u.rate=.9;setStatus('starting');
  u.onstart=()=>{if(ticket.current===mine){setStatus('speaking');start.current?.();}};
  u.onend=()=>{if(ticket.current===mine){ticket.current++;utterance.current=null;setStatus('ready');}};
  u.onerror=()=>{if(ticket.current===mine){utterance.current=null;setStatus('error');}};
  window.speechSynthesis.speak(u);
  window.setTimeout(()=>{if(ticket.current===mine&&!window.speechSynthesis.speaking){ticket.current++;window.speechSynthesis.cancel();utterance.current=null;setStatus('error');}},2500);
 };
 return {status,listen,stop};
}
function SpeechStatus({status}:{status:ReturnType<typeof useSpeech>['status']}){return <p className="speech-status" role="status">{status==='speaking'?'Listening to this passage.':status==='starting'?'Starting the voice…':status==='unavailable'?'A local English reading voice is not available in this browser. You can still use reading phrases and try the passage aloud.':status==='error'?'The reading voice did not play. Try again, or read the passage aloud.':status==='checking'?'Checking for a local English reading voice…':'Listen to the passage, or read it in your own voice.'}</p>;}
export function Reading({s}:{s:State}){
 const id=s.runtime.view.sourceId??'READ.WELCOME',valid=readingAvailable(s.case,id),reading=readings[valid?id:'READ.WELCOME'];
 const [practice,setPractice]=useState(false),[repeat,setRepeat]=useState(false);
 const voice=useSpeech(()=>send({type:'READING',id,action:'model-played'}));
 const active=voice.status==='speaking'||voice.status==='starting';
 if(!valid)return <p>This reading is not available in our story yet.</p>;
 const refs=id==='READ.PROMISE'?['E6.a','E6.b']:[],access=s.case.grants.find(g=>g.sourceId==='E6')?.viaAccessId??'ER13';
 return <article className="reading-tool"><p className="eyebrow">Read with the crew</p><h2 data-focus-heading tabIndex={-1}>{reading.title}</h2>
  <div className="reading-tabs" aria-label="Available readings">{readingIds(s.case).map(r=><Button key={r} aria-pressed={id===r} onClick={()=>{voice.stop();setPractice(false);setRepeat(false);send({type:'VIEW',view:{...s.runtime.view,sourceId:r}});}}>{readings[r].title}</Button>)}</div>
  <Passage ct={reading.ct} refs={refs} access={access} store={store} phrases={s.case.experience?.phrases??false} onWord={(_word,context)=>context&&openWord(s,context)}/>
  <div className="actions"><Button onClick={()=>active?voice.stop():voice.listen(copy(reading.ct))}>{active?'Stop listening':'Listen'}</Button><Button aria-pressed={s.case.experience?.phrases??false} onClick={()=>send({type:'READING',id,action:'phrases'})}>Show reading phrases</Button></div>
  <SpeechStatus status={voice.status}/>
  <div className="actions"><Button onClick={()=>{voice.stop();setPractice(true);setRepeat(false);send({type:'READING',id,action:'practice'});}}>My turn</Button><Button onClick={()=>{voice.stop();setPractice(true);setRepeat(true);send({type:'READING',id,action:'practice'});}}>Try it again</Button></div>
  {practice&&<aside className="practice-card"><p>Read it aloud when you’re ready. Take your time. Pause at the punctuation.</p>{repeat&&<p>{reading.focus}</p>}<Button onClick={()=>{send({type:'READING',id,action:'self-report'});setPractice(false);}}>I finished my turn</Button></aside>}
  <div className="actions"><Button aria-pressed={s.case.experience?.narratorCard===id} onClick={()=>send({type:'READING',id,action:'card'})}>Use this as my narrator card</Button><Button onClick={()=>send({type:'VIEW',view:{page:'words',previous:s.runtime.view}})}>Words from our story</Button></div>
  {s.case.experience?.narratorCard===id&&<p>This card is ready for you at the Stage desk.</p>}
 </article>;
}
export function Words({s}:{s:State}){
 const id=s.runtime.view.ref,context=id&&s.case.experience?.wordContexts.includes(id)?wordContext(id):undefined;
 const voice=useSpeech();
 if(!context)return <article><h2 data-focus-heading tabIndex={-1}>Words from our story</h2><p>Open a word in a passage to explore what it means there.</p><div className="stack">{s.case.experience?.wordContexts.map(key=>{const c=wordContext(key);return c?<Button key={key} onClick={()=>openWord(s,c)}>{c.word.toLowerCase()} · {c.sentence}</Button>:null;})}</div></article>;
 const meaning=definition(context),active=voice.status==='speaking'||voice.status==='starting';
 return <article className="word-card"><p className="eyebrow">Words from our story</p><h2 data-focus-heading tabIndex={-1}>{context.word.toLowerCase()}</h2><h3>In our story</h3><blockquote>{context.sentence}</blockquote><p>{meaning.definition}</p><h3>Another example</h3><p>{meaning.example}</p><Button onClick={()=>active?voice.stop():voice.listen([context.sentence,meaning.definition,meaning.example].join(' '))}>{active?'Stop listening':'Listen'}</Button><SpeechStatus status={voice.status}/><Button onClick={()=>{send({type:'VIEW',view:s.runtime.view.previous??{page:'world'}});requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>(`[data-word-context="${context.id}"]`)?.focus());}}>Return to the passage</Button></article>;
}
export function NarratorCard({s}:{s:State}){
 const id=s.case.experience?.narratorCard;if(!id||!readingAvailable(s.case,id))return null;
 return <aside className="narrator-card"><h3>My narrator card · {readings[id].title}</h3><Passage ct={readings[id].ct} refs={id==='READ.PROMISE'?['E6.a','E6.b']:[]} access={s.case.grants.find(g=>g.sourceId==='E6')?.viaAccessId??'ER13'} store={store}/><p>You can read along while the paper story moves.</p><Button aria-pressed={s.case.experience?.narratorPauses??false} onClick={()=>send({type:'READING',id,action:'pauses'})}>{s.case.experience?.narratorPauses?'Watch the show without pauses':'Pause between story steps for my narration'}</Button></aside>;
}
export function Support({s,id}:{s:State;id:string}){if(!supportAvailable(s.case,id))return null;return <aside className="crew-support"><small>Jo · story writer</small><VisibleHelp ids={[id]} onVisible={()=>send({type:'SUPPORT_SEEN',id})}/></aside>;}
export function ReadingRecap({s}:{s:State}){
 const o=s.case.observations,lookups=new Set(o.filter(x=>x.kind==='word-looked-up').flatMap(x=>x.contentIds)),practices=o.filter(x=>x.kind==='reading-practice-requested');
 return lookups.size||practices.length?<section><h3>Reading with the crew</h3>{readingIds(s.case).filter(id=>practices.some(x=>x.contentIds.includes(id))).map(id=><p key={id}>You chose to practice “{readings[id].title}”.</p>)}{[...lookups].map(id=>wordContext(id)).filter(Boolean).map(c=><p key={c!.id}>You opened “{c!.word.toLowerCase()}” in: {c!.sentence}</p>)}</section>:null;
}
