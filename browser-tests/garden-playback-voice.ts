import {expect,type Page} from '@playwright/test';

/** Explicit synthetic LOCAL speech seam. It checks text, callback sequencing and
 * cancellation ownership; it does not qualify a native voice or audio device.
 * Start held so the test can inspect a picture without racing the narration. */
export async function installPlaybackVoice(page:Page){
 await page.addInitScript(()=>{
  const voice={spoken:[] as string[],utterances:[] as any[],callbacks:[] as (()=>void)[],pending:null as any,auto:false,timer:0,canceled:0,
   finish(){const utterance=this.pending;this.pending=null;if(utterance)utterance.onend?.();},
   setAuto(value:boolean){this.auto=value;clearTimeout(this.timer);if(value&&this.pending)this.timer=window.setTimeout(()=>this.finish(),20);},
  };
  (window as any).__playbackVoice=voice;
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>[{localService:true,lang:'en-US'}],
   speak(utterance:any){voice.spoken.push(utterance.text);voice.utterances.push(utterance);voice.callbacks.push(utterance.onend);voice.pending=utterance;if(voice.auto)voice.timer=window.setTimeout(()=>voice.finish(),20);},
   cancel(){clearTimeout(voice.timer);voice.pending=null;voice.canceled++;},
  }});
  Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:class{constructor(public text:string){}}});
 });
}
export async function automaticVoice(page:Page,value:boolean){
 await page.evaluate(value=>(window as any).__playbackVoice?.setAuto(value),value);
}
export async function finishVoiceSegment(page:Page){
 await expect.poll(()=>page.evaluate(()=>!!(window as any).__playbackVoice.pending)).toBe(true);
 await page.evaluate(()=>(window as any).__playbackVoice.finish());
}
export async function spokenWords(page:Page):Promise<string[]>{
 return page.evaluate(()=>(window as any).__playbackVoice.spoken);
}
