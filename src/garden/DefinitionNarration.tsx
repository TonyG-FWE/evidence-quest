import {useEffect,useRef,useState} from 'react';
import {playCastSpeech} from './castSpeech.js';
import {definitionNarrator} from './definitionCatalogue.js';
import type {SpeechState} from './voiceTypes.js';
/** Exact authored meanings come from the packaged narrator catalogue. */
export function DefinitionNarration({definition}:{definition:string|undefined}){
 const [phase,setPhase]=useState<SpeechState>('idle'),[notice,setNotice]=useState(''),stop=useRef<(()=>void)|null>(null);
 useEffect(()=>{setNotice('');return()=>{stop.current?.();stop.current=null;};},[definition]);
 if(!definition)return null;
 return <div className="g-definition-narration" data-narrator={definitionNarrator.voiceId}><button data-reading-command="true" type="button" className="g-secondary" onClick={()=>{if(phase!=='idle'){stop.current?.();return;}setNotice('');stop.current=playCastSpeech({text:definition,speaker:'narrator',origin:'authored-display'},{onState:setPhase,onError:setNotice});}}>{phase==='idle'?'Listen to the meaning':'Stop listening'}</button>{phase==='loading'&&<p className="g-small" role="status">Getting the narrator ready…</p>}{notice&&<p className="g-small" role="status">{notice}</p>}</div>;
}
