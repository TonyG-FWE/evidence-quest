import type {Page} from '@playwright/test';
import fs from 'node:fs/promises';

type CaptureResult={base64:string;startedAt:number;stoppedAt:number;peak:number;plays:number};
type CaptureWindow=Window&{nerdyCapture:{start:()=>Promise<number>;stop:()=>Promise<CaptureResult>}};

/** Capture the game's actual native media output. No microphone, voice substitution,
 * fake Audio, altered clock, synthetic completion or gameplay state changes. */
export async function prepareDemoCapture(page:Page){
 await page.addInitScript(()=>{
  let context:AudioContext|undefined,destination:MediaStreamAudioDestinationNode|undefined,analyser:AnalyserNode|undefined;
  let recorder:MediaRecorder|undefined,startedAt=0,peak=0,plays=0,timer=0;
  const attached=new WeakSet<HTMLMediaElement>(),chunks:Blob[]=[];
  const ensure=()=>{
   if(!context){context=new AudioContext();destination=context.createMediaStreamDestination();analyser=context.createAnalyser();analyser.fftSize=2048;}
   return context;
  };
  const nativePlay=HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play=function(){
   const audio=ensure();
   if(!attached.has(this)){const source=audio.createMediaElementSource(this);source.connect(audio.destination);source.connect(destination!);source.connect(analyser!);attached.add(this);}
   if(recorder?.state==='recording')plays++;
   return Promise.all([audio.resume(),nativePlay.call(this)]).then(()=>undefined);
  };
  (window as CaptureWindow).nerdyCapture={
   async start(){
    const audio=ensure();await audio.resume();
    if(recorder)throw Error('Fallback audio capture already started');
    recorder=new MediaRecorder(destination!.stream,{mimeType:'audio/webm;codecs=opus',audioBitsPerSecond:128000});
    recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data);};
    startedAt=Date.now();recorder.start(1000);
    const samples=new Float32Array(analyser!.fftSize);
    timer=window.setInterval(()=>{analyser!.getFloatTimeDomainData(samples);for(const value of samples)peak=Math.max(peak,Math.abs(value));},100);
    return startedAt;
   },
   async stop(){
    if(!recorder||recorder.state!=='recording')throw Error('Fallback audio capture is not running');
    const stoppedAt=Date.now();await new Promise<void>(resolve=>{recorder!.onstop=()=>resolve();recorder!.stop();});clearInterval(timer);
    const bytes=new Uint8Array(await new Blob(chunks,{type:'audio/webm;codecs=opus'}).arrayBuffer());
    let binary='';for(let i=0;i<bytes.length;i+=16384)binary+=String.fromCharCode(...bytes.subarray(i,i+16384));
    return {base64:btoa(binary),startedAt,stoppedAt,peak,plays};
   },
  };
 });
}

export async function startDemoCapture(page:Page,video:string){
 const videoStartedAt=Date.now();await page.screencast.start({path:video,size:{width:1366,height:768}});
 const audioStartedAt=await page.evaluate(()=>(window as CaptureWindow).nerdyCapture.start());
 return {video,videoStartedAt,audioStartedAt};
}

export async function finishDemoCapture(page:Page,audio:string){
 const {base64,...evidence}=await page.evaluate(()=>(window as CaptureWindow).nerdyCapture.stop());
 await page.screencast.stop();await fs.writeFile(audio,Buffer.from(base64,'base64'));
 return {audio,...evidence};
}
