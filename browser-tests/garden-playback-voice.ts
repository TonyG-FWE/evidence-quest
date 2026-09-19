import {expect,type Page} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sources} from '../src/garden/content.js';
import {narrativeDialogue} from '../src/garden/narrativeDialogue.js';

/** Synthetic media fixture: exact text, routing and cancellation only.
 * It does not establish native decoding, speaker quality or audible output. */
export async function installPlaybackVoice(page:Page,{legacySources=false}:{legacySources?:boolean}={}){
 const manifest=JSON.parse(await readFile('public/audio/cast/manifest.json','utf8'));
 const synthetic=(entry:any)=>{const sha256=createHash('sha256').update(entry.speaker+'\0'+entry.text.replace(/\s+/g,' ').trim()).digest('hex');return {...entry,clip:{uri:'/audio/cast/clips/'+sha256+'.wav',sha256,bytes:32044,duration:1,sourceSha256:sha256,sourceWavSha256:sha256,startSample:0,endSample:16000,sampleRate:16000,channels:1}};};
 const entries=manifest.entries.map(synthetic);
 // Historical fixture sources remain test data, never added to the production voice library.
 const legacy=legacySources?[...Object.values(sources).flatMap(s=>s.paragraphs),...Object.keys(narrativeDialogue)]:[];
 for(const [index,text]of legacy.entries())for(const speaker of Object.keys(manifest.cast))entries.push(synthetic({id:'legacy-'+speaker+'-'+index,text,speaker,voiceId:manifest.cast[speaker]}));
 const entryByUri=Object.fromEntries(entries.map((e:any)=>[e.clip.uri,{text:e.text,speaker:e.speaker,voiceId:e.voiceId,origin:'authored-display'}]));
 await page.route('**/audio/cast/manifest.json',route=>route.fulfill({json:{...manifest,playback:'independent-pcm-v1',entries}}));
 let dynamicId=0;
 await page.route('**/api/garden/cast-audio',route=>route.fulfill({json:{uri:'/api/garden/cast-media/'+String(++dynamicId).padStart(48,'0')}}));
 await page.route('**/api/garden/cast-media/*',route=>route.fulfill({status:204}));
 await page.addInitScript(({entryByUri})=>{
  const dynamic=new Map<string,{text:string;speaker:string;origin:string;revision:string|number}>();
  const voice={spoken:[] as string[],segments:[] as any[],dynamicRequests:[] as any[],utterances:[] as any[],callbacks:[] as (()=>void)[],pending:null as any,auto:false,timer:0,canceled:0,
   finish(){const utterance=this.pending;this.pending=null;if(utterance)utterance.onend?.();},
   setAuto(value:boolean){this.auto=value;clearTimeout(this.timer);if(value&&this.pending)this.timer=window.setTimeout(()=>this.finish(),20);},
  };(window as any).__playbackVoice=voice;
  const originalFetch=window.fetch.bind(window);window.fetch=async(input,options)=>{const response=await originalFetch(input,options);if(String(input).includes('/api/garden/cast-audio')&&options?.method==='POST'){const request=JSON.parse(String(options.body)),metadata=await response.clone().json();voice.dynamicRequests.push(request);if(metadata.uri)dynamic.set(metadata.uri,request);}return response;};
  class SyntheticAudio extends EventTarget{
   src='';preload='';currentTime=0;paused=true;text='';duration=1;onend:(()=>void)|null=null;
   load(){if(this.src)queueMicrotask(()=>this.dispatchEvent(new Event('loadedmetadata')));}
   play(){this.paused=false;const path=new URL(this.src,location.href).pathname;const segment=dynamic.get(path)??entryByUri[path];if(!segment)return Promise.reject(Error('Unknown exact synthetic audio identity: '+path));this.text=segment.text;voice.segments.push({...segment,uri:path});
    this.onend=()=>{this.currentTime=this.duration;this.dispatchEvent(new Event('ended'));};voice.spoken.push(this.text);voice.utterances.push(this);voice.callbacks.push(this.onend);voice.pending=this;if(voice.auto)voice.timer=window.setTimeout(()=>voice.finish(),20);return Promise.resolve();}
   pause(){this.paused=true;if(voice.pending===this){clearTimeout(voice.timer);voice.pending=null;voice.canceled++;}}
   removeAttribute(name:string){if(name==='src')this.src='';}
  }
  Object.defineProperty(window,'Audio',{configurable:true,value:SyntheticAudio});
 },{entryByUri});
}
export async function automaticVoice(page:Page,value:boolean){await page.evaluate(value=>(window as any).__playbackVoice?.setAuto(value),value);}
export async function finishVoiceSegment(page:Page){await expect.poll(()=>page.evaluate(()=>!!(window as any).__playbackVoice.pending)).toBe(true);await page.evaluate(()=>(window as any).__playbackVoice.finish());}
export async function spokenWords(page:Page):Promise<string[]>{return page.evaluate(()=>(window as any).__playbackVoice.spoken);}

export async function spokenSegments(page:Page):Promise<{text:string;speaker:string;voiceId?:string;origin:string;revision?:number|string;uri:string}[]>{return page.evaluate(()=>(window as any).__playbackVoice.segments);}
