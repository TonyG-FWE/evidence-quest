import {useEffect} from 'react';
import {cancelLocalSpeech,localSpeech,localSpeechVersion,onLocalSpeechCanceled} from './audio.js';
import {readingPages} from './readingPages.js';
import {playbackIndex,playbackLines} from './playback.js';
import type {GardenState,GardenStore} from './model.js';

/** One owner for the whole telling. Word-help and recording may interrupt it. */
export function ContinuousPlayback({s,store}:{s:GardenState;store:GardenStore}){
 const playback=s.playback,key=playback?.key,index=playbackIndex(s),text=playbackLines(s)[index]?.text??'';
 const mode=playback?.mode,paused=playback?.paused??true,blocked=!!(s.panel||s.background||s.viewLost);
 useEffect(()=>{
  if(!key||paused||blocked||!text||mode==='captions')return;
  let alive=true;
  const current=()=>{
   const state=store.getSnapshot(),p=state.playback;
   return alive&&p?.key===key&&!p.paused&&p.mode===mode&&playbackIndex(state)===index&&playbackLines(state)[index]?.text===text&&!state.panel&&!state.background&&!state.viewLost;
  };
  const send=(action:'speech'|'captions'|'pause'|'advance')=>{if(current())store.send({type:'PLAYBACK',key,index,action});};
  const synthesis=localSpeech(),Utterance=globalThis.SpeechSynthesisUtterance;
  const voice=()=>synthesis?.getVoices().find(v=>v.localService&&/^en(?:-|$)/i.test(v.lang));
  if(mode==='awaiting'){
   if(!synthesis||!Utterance){send('captions');return;}
   if(voice()){send('speech');return;}
   // Voice lists can arrive just after page load. Do not strand the story there.
   const ready=()=>{if(voice())send('speech');};
   synthesis.addEventListener('voiceschanged',ready);
   const timer=globalThis.setTimeout(()=>send(voice()?'speech':'captions'),700);
   const unsubscribe=onLocalSpeechCanceled(()=>send('pause'));
   return()=>{alive=false;unsubscribe();globalThis.clearTimeout(timer);synthesis.removeEventListener('voiceschanged',ready);};
  }
  if(mode!=='speech')return;
  const selected=voice();
  if(!synthesis||!Utterance||!selected){send('captions');return;}
  // Cancel before subscribing, so this owner's takeover is not its own pause.
  cancelLocalSpeech();
  const version=localSpeechVersion(),valid=()=>current()&&localSpeechVersion()===version;
  const unsubscribe=onLocalSpeechCanceled(()=>send('pause'));
  const parts=readingPages(text);let part=0,utterance:SpeechSynthesisUtterance|null=null;
  const play=()=>{
   if(!valid())return;
   utterance=new Utterance(parts[part]!.text);utterance.voice=selected;utterance.lang=selected.lang;utterance.rate=.9;
   utterance.onend=()=>{if(!valid())return;if(++part<parts.length)play();else send('advance');};
   utterance.onerror=event=>{if(!valid())return;send(event.error==='canceled'||event.error==='interrupted'?'pause':'captions');};
   try{synthesis.speak(utterance);}catch{send('captions');}
  };
  play();
  return()=>{
   const ownsVoice=localSpeechVersion()===version;alive=false;unsubscribe();
   if(utterance){utterance.onend=null;utterance.onerror=null;}
   // An external reader may already own speech; never cancel its replacement.
   if(ownsVoice)cancelLocalSpeech();
  };
 },[key,index,text,paused,blocked,mode,store]);
 if(!playback)return null;
 const waiting=mode==='awaiting'&&!paused&&!blocked;
 return <div className="g-continuous-playback" role="group" aria-label="Whole story playback" data-playback-state={paused||blocked?'paused':'playing'} data-playback-mode={mode}>
  <p className="g-small" role="status">{paused||blocked?'Story paused. Resume when you are ready.':waiting?'Starting story narration…':mode==='captions'?'The whole story plays automatically with text. Pause whenever you need more time.':'The whole story is playing. Its pictures and words advance automatically.'}</p>
  <div className="g-row">
   <button className="g-primary" disabled={blocked} onClick={()=>store.send({type:'PLAYBACK',key:playback.key,index,action:paused?'resume':'pause'})}>{paused?'Resume story':'Pause story'}</button>
   <button className="g-secondary" disabled={blocked} onClick={()=>store.send({type:'PLAYBACK',key:playback.key,index,action:'replay'})}>Replay story</button>
   {mode!=='captions'&&<button className="g-secondary" disabled={blocked} onClick={()=>store.send({type:'PLAYBACK',key:playback.key,index,action:'captions'})}>Read without narration</button>}
  </div>
 </div>;
}
