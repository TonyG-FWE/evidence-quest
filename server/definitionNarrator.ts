import {createHash} from 'node:crypto';
import {readFile,writeFile,appendFile,mkdir,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
import {definitionCatalogue,definitionNarrator} from '../src/garden/definitionCatalogue.js';

type Options={root:string;host:string;enabled:boolean;key?:string|undefined;fetch?:typeof fetch};
/** Only approved, authored definition IDs can reach the fixed free-model narrator. */
export class DefinitionNarrator {
 private readonly directory:string;
 private readonly request:typeof fetch;
 private readonly inFlight=new Set<string>();
 private readonly key:string|undefined;
 constructor(options:Options){
  this.directory=resolve(options.root,'evidence/word-narrator-20260918/cache',definitionNarrator.voiceId+'-free-v1');
  this.key=options.enabled&&['127.0.0.1','localhost','::1'].includes(options.host)?options.key:undefined;
  this.request=options.fetch??fetch;
 }
 async read(input:unknown,signal:AbortSignal):Promise<{status:number;audio?:Buffer;cached?:boolean}>{
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length!==1||!('id' in input)||typeof input.id!=='string'||!Object.hasOwn(definitionCatalogue,input.id))return {status:400};
  const id=input.id,text=definitionCatalogue[id]!,path=resolve(this.directory,id+'.mp3');
  if(signal.aborted)return {status:499};
  try{const audio=await readFile(path);if(audio.length>=512&&audio.length<=2000000)return {status:200,audio,cached:true};}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
  if(!this.key)return {status:503};
  if(this.inFlight.size>=2||this.inFlight.has(id))return {status:429};
  this.inFlight.add(id);
  const record=(data:Record<string,unknown>)=>appendFile(resolve(this.directory,'attempts.jsonl'),JSON.stringify({at:new Date().toISOString(),id,...data})+'\n');
  try{
   await mkdir(this.directory,{recursive:true});
   await record({event:'reserved',voiceId:definitionNarrator.voiceId,model:definitionNarrator.model,textSha256:createHash('sha256').update(text).digest('hex'),textBytes:Buffer.byteLength(text),expectedChargeUSD:0});
   const response=await this.request('https://api.fish.audio/v1/tts',{method:'POST',headers:{Authorization:'Bearer '+this.key,'Content-Type':'application/json',model:definitionNarrator.model},body:JSON.stringify({text,reference_id:definitionNarrator.voiceId,format:'mp3',mp3_bitrate:128,latency:'normal',prosody:{speed:.94,volume:0}}),signal:AbortSignal.any([signal,AbortSignal.timeout(45000)])});
   if(!response.ok){await record({event:'failed',httpStatus:response.status});return {status:503};}
   if(!response.headers.get('content-type')?.startsWith('audio/'))throw Error('Unexpected audio response');
   const reader=response.body?.getReader();if(!reader)throw Error('Missing audio');
   const chunks:Uint8Array[]=[];let size=0;
   while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>2000000){await reader.cancel();throw Error('Audio too large');}chunks.push(part.value);}
   const audio=Buffer.concat(chunks);if(audio.length<512)throw Error('Incomplete audio');
   if(signal.aborted)return {status:499};
   await writeFile(path+'.tmp',audio);await rename(path+'.tmp',path);
   await record({event:'completed',bytes:audio.length,sha256:createHash('sha256').update(audio).digest('hex')});
   return {status:200,audio,cached:false};
  }catch(error){await record({event:'stopped',reason:error instanceof Error?error.name:'Error'}).catch(()=>{});return {status:signal.aborted?499:503};}
  finally{this.inFlight.delete(id);}
 }
}
