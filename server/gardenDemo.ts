import {appendFile,mkdir,readFile,open,unlink} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {gardenRequestBody,openAIProvider,type GardenRequest} from './garden.js';
import {boundedJSON} from './coach.js';

export const GARDEN_DEMO_MODEL='gpt-5.6-luna';
export const GARDEN_DEMO_LIMIT=2;
export const GARDEN_DEMO_CEILING_USD=.10;
type Receipt={event:string;requestId?:string;reservedUSD?:number;costUSD?:number;[key:string]:unknown};
type Options={enabled:boolean;key?:string|undefined;root:string;host:string;fetcher?:typeof fetch};
/** A separate, durable two-request smoke-test budget. Never resumes TASK11.19. */
export async function gardenDemo(options:Options){
 const directory=join(options.root,'evidence','voice-ai-demo-20260918');
 const ledger=join(directory,'openai-attempts.jsonl'),lockPath=join(directory,'openai.lock');
 const records=async():Promise<Receipt[]>=>{try{return (await readFile(ledger,'utf8')).split('\n').filter(Boolean).map(line=>JSON.parse(line) as Receipt);}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return [];throw error;}};
 const append=async(receipt:Receipt)=>appendFile(ledger,JSON.stringify({at:new Date().toISOString(),...receipt})+'\n');
 const snapshot=async()=>{const all=await records(),reserved=all.filter(r=>r.event==='reserved');return {enabled:options.enabled,model:GARDEN_DEMO_MODEL,attempts:reserved.length,limit:GARDEN_DEMO_LIMIT,ceilingUSD:GARDEN_DEMO_CEILING_USD,reservedUSD:reserved.reduce((n,r)=>n+(r.reservedUSD??GARDEN_DEMO_CEILING_USD),0),reportedCostUSD:all.reduce((n,r)=>n+(r.costUSD??0),0)};};
 if(options.enabled&&(!['127.0.0.1','localhost','::1'].includes(options.host)||!options.key))throw Error('Garden demo needs a loopback host and server OpenAI key');
 if(!options.enabled)return {provider:undefined,snapshot,available:async()=>false};
 await mkdir(directory,{recursive:true});
 const available=async()=>{const s=await snapshot();return s.attempts<GARDEN_DEMO_LIMIT&&s.reservedUSD<GARDEN_DEMO_CEILING_USD;};
 const provider=async(q:GardenRequest,signal:AbortSignal)=>{
  if(q.activity!=='sol-ending'||signal.aborted)return null;
  // Validate/construct before reserving; every transmitted attempt remains counted.
  const body={...gardenRequestBody(q,GARDEN_DEMO_MODEL),reasoning:{effort:'none'},service_tier:'default'};
  const bodyText=JSON.stringify(body),inputBytes=Buffer.byteLength(bodyText);
  // UTF-8 bytes + 4096 overhead bounds tokens conservatively for this short request.
  const reserve=((inputBytes+4096)*.20+body.max_output_tokens*1.20)/1_000_000;
  if(inputBytes>32768||reserve>GARDEN_DEMO_CEILING_USD)return null;
  let lock;try{lock=await open(lockPath,'wx');}catch(error){if((error as NodeJS.ErrnoException).code==='EEXIST')return null;throw error;}
  try{
   const all=await records(),reservations=all.filter(r=>r.event==='reserved');
   if(signal.aborted||reservations.some(r=>r.requestId===q.requestId)||reservations.length>=GARDEN_DEMO_LIMIT||reservations.reduce((n,r)=>n+(r.reservedUSD??GARDEN_DEMO_CEILING_USD),0)+reserve>GARDEN_DEMO_CEILING_USD)return null;
   await append({event:'reserved',requestId:q.requestId,model:GARDEN_DEMO_MODEL,inputBytes,reservedUSD:reserve,draftSha256:createHash('sha256').update(q.text).digest('hex')});
   const start=Date.now(),network=options.fetcher??fetch;
   const measured:typeof fetch=async(url,init)=>{
    const response=await network(url,{...init,body:bodyText});
    const raw=await boundedJSON(response.clone(),65536).catch(()=>null) as {usage?:{input_tokens?:number;output_tokens?:number};error?:{code?:string}}|null;
    const input=raw?.usage?.input_tokens,output=raw?.usage?.output_tokens;
    const usageKnown=Number.isSafeInteger(input)&&input!>=0&&Number.isSafeInteger(output)&&output!>=0;
    await append({event:'response',requestId:q.requestId,httpStatus:response.status,durationMs:Date.now()-start,usageKnown,...(usageKnown?{inputTokens:input,outputTokens:output,costUSD:(input!*.20+output!*1.20)/1_000_000}:{reservedCostRetained:true}),...(raw?.error?.code?{errorCode:raw.error.code}:{})});
    return response;
   };
   try{const result=await openAIProvider(options.key!,GARDEN_DEMO_MODEL,async()=>!signal.aborted,measured)(q,signal);await append({event:'validated',requestId:q.requestId,status:result?.status??'unavailable',durationMs:Date.now()-start});return result;}
   catch(error){await append({event:'failed',requestId:q.requestId,errorType:error instanceof Error?error.name:'Unknown',durationMs:Date.now()-start});return null;}
  }finally{await lock.close();await unlink(lockPath);}
 };
 return {provider,snapshot,available};
}
