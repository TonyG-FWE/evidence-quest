import {cancelLocalSpeech,localSpeechVersion,onLocalSpeechCanceled} from './audio.js';
import {normalizeSpeech,selectedCast,type CastAudioManifest,type CastClip,type SpeechHandlers,type SpeechInput,type SpeechRequest} from './voiceTypes.js';
import {routeAuthoredText} from './sourceVoiceRouting.js';
import {readingPages} from './readingPages.js';
import {readingPause} from './speechTiming.js';

const LOAD_DEADLINE=12000;
let savedManifest:{manifest:CastAudioManifest;index:Map<string,CastClip>}|undefined;
const key=(speaker:string,text:string)=>speaker+'\0'+normalizeSpeech(text);
/** Cache only completed validation; canceled or stalled requests never poison retries. */
async function getManifest(signal:AbortSignal){
 if(savedManifest)return savedManifest;
 const response=await fetch('/audio/cast/manifest.json',{signal});
 if(!response.ok)throw Error('Voice library unavailable. Try again, or keep reading.');
 const manifest=await response.json() as CastAudioManifest;
 if(manifest.schema!=='eq.cast-audio.v1'||manifest.playback!=='independent-pcm-v1'||Object.entries(selectedCast).some(([role,id])=>manifest.cast?.[role as keyof typeof selectedCast]!==id))throw Error('The exact voice library is unavailable. Try again, or keep reading.');
 const index=new Map<string,CastClip>();
 for(const clip of manifest.entries){
  if(clip.voiceId!==selectedCast[clip.speaker]||!clip.clip||!/^\/audio\/cast\/clips\/[a-f0-9]{64}\.wav$/.test(clip.clip.uri)||!Number.isFinite(clip.clip.duration)||clip.clip.duration<=0)throw Error('Incomplete exact voice library. Try again, or keep reading.');
  const identity=key(clip.speaker,clip.text),previous=index.get(identity);
  if(previous&&previous.clip?.sha256!==clip.clip.sha256)throw Error('Ambiguous voice library entry. You can keep reading.');
  index.set(identity,clip);
 }
 if(signal.aborted)throw signal.reason;
 return savedManifest={manifest,index};
}
function parts(request:SpeechRequest):SpeechRequest[]{
 if(request.segments)return request.segments.flatMap(segment=>{const {segments:_segments,...parent}=request;return parts({...parent,...segment});});
 if(request.origin==='child-draft'||request.origin==='generated-feedback')return readingPages(request.text).map(page=>({...request,text:page.text}));
 // A performer may override the quote cast, never the identity of the displayed source.
 if(request.speaker){if(request.source)routeAuthoredText(request.text,request.source);return [request];}
 if(/^[A-Za-z]+(?:['’][A-Za-z]+)?$/.test(request.text.trim()))return [{...request,speaker:'narrator'}];
 return routeAuthoredText(request.text,request.source).map(part=>({...request,...part}));
}
/** Each file ends naturally. No seeking, timer-based audio cutoff or browser-selected voice. */
export function playCastSpeech(input:SpeechInput,handlers:SpeechHandlers={}):()=>void{
 const request:SpeechRequest=typeof input==='string'?{text:input,origin:'authored-display'}:input;
 cancelLocalSpeech();const version=localSpeechVersion(),controller=new AbortController();let media:HTMLAudioElement|null=null,ownedUrl:string|null=null,closed=false;
 const valid=()=>!closed&&!controller.signal.aborted&&localSpeechVersion()===version&&handlers.isCurrent?.()!==false;
 const revoke=()=>{if(ownedUrl){void fetch(ownedUrl,{method:'DELETE',keepalive:true}).catch(()=>{});ownedUrl=null;}};
 const cleanup=()=>{closed=true;controller.abort();if(media){media.pause();media.removeAttribute('src');media.load();media=null;}revoke();unsubscribe();document.removeEventListener('visibilitychange',hide);window.removeEventListener('pagehide',stop);handlers.onState?.('idle');};
 const stop=()=>{if(!closed)cleanup();};const hide=()=>{if(document.hidden)stop();};
 const unsubscribe=onLocalSpeechCanceled(stop);document.addEventListener('visibilitychange',hide);window.addEventListener('pagehide',stop);handlers.onState?.('loading');
 async function bounded<T>(operation:(signal:AbortSignal)=>Promise<T>,milliseconds=LOAD_DEADLINE):Promise<T>{
  const attempt=new AbortController(),abort=()=>attempt.abort(controller.signal.reason);controller.signal.addEventListener('abort',abort,{once:true});
  let timer:ReturnType<typeof setTimeout>|undefined;
  try{return await Promise.race([operation(attempt.signal),new Promise<never>((_,reject)=>{const fail=()=>reject(attempt.signal.reason??Error('Voice request stopped'));attempt.signal.addEventListener('abort',fail,{once:true});if(controller.signal.aborted)abort();timer=setTimeout(()=>attempt.abort(Error('The voice took too long to load. Try again, or keep reading.')),milliseconds);})]);}
  finally{if(timer!==undefined)clearTimeout(timer);controller.signal.removeEventListener('abort',abort);attempt.abort();}
 }
 async function play(uri:string,expectedDuration?:number){
  if(!valid())return;const audio=new Audio();media=audio;audio.preload='auto';audio.src=uri;
  await new Promise<void>((resolve,reject)=>{
   let settled=false,started=false,lastTime=0,lastProgress=Date.now();
   const loadTimer=setTimeout(()=>failed('The recording took too long to load. Try again, or keep reading.'),LOAD_DEADLINE);
   const progress=window.setInterval(()=>{if(!valid()){done(false);return;}if(started){if(audio.currentTime>lastTime+.01){lastTime=audio.currentTime;lastProgress=Date.now();}else if(Date.now()-lastProgress>LOAD_DEADLINE)failed('Playback stopped making progress. Try again, or keep reading.');}},250);
   const release=()=>{clearTimeout(loadTimer);clearInterval(progress);audio.removeEventListener('loadedmetadata',ready);audio.removeEventListener('ended',ended);audio.removeEventListener('error',error);controller.signal.removeEventListener('abort',aborted);};
   const done=(complete:boolean)=>{if(settled)return;settled=true;audio.pause();release();if(complete||!valid())resolve();else reject(Error('The recording ended before these words finished. Try again, or keep reading.'));};
   const failed=(message:string)=>{if(settled)return;settled=true;audio.pause();release();reject(Error(message));};
   const error=()=>failed('This recording could not play. Try again, or keep reading.');
   const aborted=()=>done(false);
   const ended=()=>done(started&&Number.isFinite(audio.duration)&&audio.currentTime>=audio.duration-.12);
   const ready=()=>{
    if(!valid())return done(false);
    if(expectedDuration!==undefined&&(!Number.isFinite(audio.duration)||Math.abs(audio.duration-expectedDuration)>.08)){failed('The recording does not match these words. You can keep reading.');return;}
    void audio.play().then(()=>{if(!valid())return done(false);started=true;lastProgress=Date.now();clearTimeout(loadTimer);handlers.onState?.('playing');},error=>failed(error instanceof Error?error.message:'The recording could not play.'));
   };
   audio.addEventListener('ended',ended);audio.addEventListener('error',error);audio.addEventListener('loadedmetadata',ready,{once:true});controller.signal.addEventListener('abort',aborted,{once:true});audio.load();
  });
  audio.pause();audio.removeAttribute('src');audio.load();if(media===audio)media=null;
 }
 async function pause(milliseconds:number){
  if(!valid())return;
  await new Promise<void>(resolve=>{
   const finish=()=>{clearTimeout(timer);controller.signal.removeEventListener('abort',finish);resolve();};
   const timer=setTimeout(finish,milliseconds);controller.signal.addEventListener('abort',finish,{once:true});
   if(!valid())finish();
  });
 }
 void (async()=>{
  let previous:SpeechRequest|undefined;
  for(const part of parts(request)){
   if(!valid())return;if(!part.text.trim())continue;handlers.onState?.('loading');
   if(previous)await pause(readingPause(previous,part));if(!valid())return;
   if(part.origin==='mixed-display')throw Error('Choose an authored passage or your own words to hear the matching voice.');
   if(part.origin==='child-draft'||part.origin==='generated-feedback'){
    const revision=typeof part.revision==='string'&&part.revision.length>200?Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(part.revision)))).map(byte=>byte.toString(16).padStart(2,'0')).join(''):part.revision??0;if(!valid())return;
    const delivery=await bounded(async signal=>{const response=await fetch('/api/garden/cast-audio',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({text:part.text,speaker:part.speaker??'narrator',origin:part.origin,revision,explicitListen:true,...(part.cacheOnly?{cacheOnly:true}:{})}),signal});if(!response.ok||!response.headers.get('content-type')?.startsWith('application/json'))throw Error(part.cacheOnly?'Choose Listen to hear these own words in the selected voice, or read without narration.':'Your selected voice could not read these words. Your writing is unchanged.');const value=await response.json() as {uri?:string};if(!/^\/api\/garden\/cast-media\/[a-f0-9]{48}$/.test(value.uri??''))throw Error('The selected voice is unavailable. Your writing is unchanged.');return value.uri!;},45000);
    if(!valid()){void fetch(delivery,{method:'DELETE',keepalive:true}).catch(()=>{});return;}ownedUrl=delivery;await play(delivery);revoke();
   }else{
    const {index}=await bounded(getManifest);if(!valid())return;
    const speaker=part.speaker??'narrator',text=normalizeSpeech(part.text),exact=index.get(key(speaker,text));
    const sentences=text.match(/[^.!?]+[.!?]+[”"’']?|[^.!?]+$/g)??[text];
    const clips=exact?[exact]:sentences.map(sentence=>index.get(key(speaker,sentence)));
    if(clips.some(clip=>!clip))throw Error('This exact reading is not in the saved '+speaker+' voice library yet. You can keep reading.');
    if(speaker==='narrator'&&/^[A-Za-z]+(?:['’][A-Za-z]+)?$/.test(text)&&exact?.clip?.boundaryMethod!=='complete-word-recording-v1')throw Error('This word’s recording is being repaired. You can listen to its sentence.');
    for(const [i,entry] of clips.entries()){if(i)await pause(readingPause({...part,text:clips[i-1]!.text},part));if(!valid())return;const clip=entry!.clip!;await play(clip.uri,clip.duration);}
   }
   previous=part;
  }
  if(valid()){cleanup();handlers.onDone?.();}else stop();
 })().catch(error=>{if(valid()){cleanup();handlers.onError?.(error instanceof Error?error.message:'The selected voice is unavailable. You can keep reading.');}else stop();});
 return stop;
}
