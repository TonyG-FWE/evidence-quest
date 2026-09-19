import {createHash} from 'node:crypto';
import {readFile,writeFile,appendFile,mkdir,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
import {selectedCast,type VoiceSpeaker} from '../src/garden/voiceTypes.js';

type Options={root:string;host:string;enabled:boolean;key?:string|undefined;fetch?:typeof fetch};
type Result={status:number;audio?:Buffer;mime?:'audio/wav';cached?:boolean;revision?:string|number};
/** Only explicit Listen on the exact current own-writing revision admits new synthesis. */
export class CastNarrator {
 private readonly directory:string;private readonly request:typeof fetch;private readonly key:string|undefined;private readonly inFlight=new Set<string>();
 constructor(options:Options){this.directory=resolve(options.root,'.cache/cast-audio-dynamic');this.request=options.fetch??fetch;this.key=options.enabled&&['127.0.0.1','localhost','::1'].includes(options.host)?options.key:undefined;}
 async read(input:unknown,signal:AbortSignal):Promise<Result>{
  if(!input||typeof input!=='object'||Array.isArray(input))return {status:400};
  const x=input as Record<string,unknown>;
  if(Object.keys(x).some(k=>!['text','speaker','origin','revision','explicitListen','cacheOnly'].includes(k))||typeof x.text!=='string'||!x.text.trim()||x.text.length>6000||Buffer.byteLength(x.text)>20000||typeof x.speaker!=='string'||!Object.hasOwn(selectedCast,x.speaker)||!['child-draft','generated-feedback'].includes(String(x.origin))||x.explicitListen!==true||!['string','number'].includes(typeof x.revision)||typeof x.revision==='number'&&!Number.isFinite(x.revision)||typeof x.revision==='string'&&x.revision.length>300||x.cacheOnly!==undefined&&typeof x.cacheOnly!=='boolean')return {status:400};
  const text=x.text,speaker=x.speaker as VoiceSpeaker,revision=x.revision as string|number,voiceId=selectedCast[speaker];
  const id=createHash('sha256').update(JSON.stringify({text,voiceId,origin:x.origin,revision,model:'s2.1-pro-free',speed:.94,format:'wav'})).digest('hex'),path=resolve(this.directory,id+'.wav');
  if(signal.aborted)return {status:499};
  try{const audio=await readFile(path);if(audio.length>=44&&audio.toString('ascii',0,4)==='RIFF')return {status:200,audio,mime:'audio/wav',cached:true,revision};}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
  if(x.cacheOnly||!this.key)return {status:503};
  if(this.inFlight.size>=2||this.inFlight.has(id))return {status:429};this.inFlight.add(id);
  const record=(data:Record<string,unknown>)=>appendFile(resolve(this.directory,'attempts.jsonl'),JSON.stringify({at:new Date().toISOString(),id,...data})+'\n');
  try{
   await mkdir(this.directory,{recursive:true});await record({event:'reserved',voiceId,model:'s2.1-pro-free',textSha256:createHash('sha256').update(text).digest('hex'),textBytes:Buffer.byteLength(text),expectedChargeUSD:0});
   const response=await this.request('https://api.fish.audio/v1/tts',{method:'POST',headers:{Authorization:'Bearer '+this.key,'Content-Type':'application/json',model:'s2.1-pro-free'},body:JSON.stringify({text,reference_id:voiceId,format:'wav',latency:'normal',prosody:{speed:.94,volume:0}}),signal:AbortSignal.any([signal,AbortSignal.timeout(90000)])});
   if(!response.ok){await record({event:'failed',httpStatus:response.status});return {status:503};}
   if(!response.headers.get('content-type')?.startsWith('audio/'))throw Error('Unexpected audio response');
   const reader=response.body?.getReader();if(!reader)throw Error('Missing audio');let size=0;const chunks:Uint8Array[]=[];
   while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>20000000){await reader.cancel();throw Error('Audio too large');}chunks.push(part.value);}
   const audio=Buffer.concat(chunks);if(audio.length<44||audio.toString('ascii',0,4)!=='RIFF'||audio.toString('ascii',8,12)!=='WAVE')throw Error('Invalid WAV audio');
   if(signal.aborted)return {status:499};await writeFile(path+'.tmp',audio);await rename(path+'.tmp',path);await record({event:'completed',bytes:audio.length,sha256:createHash('sha256').update(audio).digest('hex')});
   return {status:200,audio,mime:'audio/wav',cached:false,revision};
  }catch(error){await record({event:'stopped',reason:error instanceof Error?error.name:'Error'}).catch(()=>{});return {status:signal.aborted?499:503};}finally{this.inFlight.delete(id);}
 }
}
