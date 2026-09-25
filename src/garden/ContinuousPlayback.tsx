import {useEffect,useState} from 'react';
import {onLocalSpeechCanceled} from './audio.js';
import {playCastSpeech} from './castSpeech.js';
import {continuousSpeech} from './continuousSpeech.js';
import {playbackIndex,playbackLines} from './playback.js';
import type {GardenState,GardenStore} from './model.js';

/** The actual onstage performer owns this whole telling, including embedded quotes. */
export function ContinuousPlayback({s,store}:{s:GardenState;store:GardenStore}){
 const playback=s.playback,key=playback?.key,index=playbackIndex(s),line=playbackLines(s)[index],request=line?continuousSpeech(s,line,index):undefined,text=request?.text??'',origin=request?.origin??'authored-display',revision=request?.revision;
 const identity=JSON.stringify(request),mode=playback?.mode,paused=playback?.paused??true,blocked=!!(s.panel||s.background||s.viewLost);
 const [notice,setNotice]=useState(''),[consent,setConsent]=useState<string|null>(null),ownKey=text+'\0'+revision;
 useEffect(()=>{
  if(!key||paused||blocked||!text||!request||mode==='captions')return;
  let alive=true,advanceTimer:ReturnType<typeof setTimeout>|undefined;
  const current=()=>{const state=store.getSnapshot(),p=state.playback,currentLine=playbackLines(state)[index];return alive&&p?.key===key&&!p.paused&&p.mode===mode&&playbackIndex(state)===index&&!!currentLine&&JSON.stringify(continuousSpeech(state,currentLine,index))===identity&&!state.panel&&!state.background&&!state.viewLost;};
  const send=(action:'speech'|'pause'|'advance')=>{if(current())store.send({type:'PLAYBACK',key,index,action});};
  if(mode==='awaiting'){send('speech');return;}
  if(mode!=='speech')return;
  setNotice('');
  const stop=playCastSpeech({...request,cacheOnly:origin==='child-draft'&&consent!==ownKey},{isCurrent:current,onDone:()=>{advanceTimer=setTimeout(()=>send('advance'),650);},onError:message=>{if(current()){setNotice(message);send('pause');}}});
  const unsubscribe=onLocalSpeechCanceled(()=>send('pause'));
  return()=>{alive=false;if(advanceTimer!==undefined)clearTimeout(advanceTimer);unsubscribe();stop();};
 },[key,index,text,identity,origin,revision,paused,blocked,mode,store,consent,ownKey]);
 if(!playback)return null;
 return <div className="g-continuous-playback" role="group" aria-label="Whole story playback" data-playback-state={paused||blocked?'paused':'playing'} data-playback-mode={mode}>
  <p className="g-small" role="status">{notice|| (paused||blocked?'Story paused. Resume when you are ready.':mode==='awaiting'?'Starting story narration…':mode==='captions'?'The whole story plays automatically with text. Pause whenever you need more time.':'The whole story is playing. Its pictures and words advance automatically.')}</p>
  <div className="g-row">
   {origin==='child-draft'&&<button className="g-secondary" disabled={blocked} onClick={()=>{setConsent(ownKey);setNotice('');store.send({type:'PLAYBACK',key:playback.key,index,action:'resume'});}}>Listen to my words as {line?.who}</button>}
   <button className="g-primary" disabled={blocked} onClick={()=>store.send({type:'PLAYBACK',key:playback.key,index,action:paused?'resume':'pause'})}>{paused?'Resume story':'Pause story'}</button>
   <button className="g-secondary" disabled={blocked} onClick={()=>store.send({type:'PLAYBACK',key:playback.key,index,action:'replay'})}>Replay story</button>
   {mode!=='captions'&&<button className="g-secondary" disabled={blocked} onClick={()=>{store.send({type:'PLAYBACK',key:playback.key,index,action:'captions'});if(paused)store.send({type:'PLAYBACK',key:playback.key,index,action:'resume'});}}>Read without narration</button>}
  </div>
 </div>;
}
