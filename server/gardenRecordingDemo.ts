import {appendFile,mkdir,readFile,open,unlink} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {gardenRequestBody,openAIProvider,type GardenRequest,validFeedback} from './garden.js';
import {boundedJSON} from './coach.js';
import {GARDEN_DEMO_MODEL} from './gardenDemo.js';

export const RECORDING_DEMO_CEILING_USD=10;
type Receipt={event:string;requestId?:string;reservedUSD?:number;costUSD?:number;[key:string]:unknown};
type Options={enabled:boolean;key?:string|undefined;root:string;host:string;fetcher?:typeof fetch};
type LedgerPrefix={file:string;bytes:number;sha256:string;mode:string};
type LedgerRead={bytes:Buffer;records:Receipt[]};
function requirePrefix(bytes:Buffer,prefix:LedgerPrefix|undefined){
 if(prefix&&(!Number.isSafeInteger(prefix.bytes)||prefix.bytes<1||!/^[a-f0-9]{64}$/.test(prefix.sha256)||prefix.mode!=='append-only'||bytes.length<prefix.bytes||createHash('sha256').update(bytes.subarray(0,prefix.bytes)).digest('hex')!==prefix.sha256))throw Error('Known demo spending history changed');
}
const readRecords=async(file:string,prefix?:LedgerPrefix):Promise<LedgerRead>=>{
 const bytes=await readFile(file);requirePrefix(bytes,prefix);
 if(!bytes.length||bytes.at(-1)!==10)throw Error('Demo spending history has an incomplete append');
 const records=bytes.toString('utf8').split('\n').filter(Boolean).map(line=>JSON.parse(line) as Receipt);
 if(!records.length)throw Error('Demo spending history is missing');
 return {bytes,records};
};
function reservedCost(records:Receipt[]){
 const attempts=new Map<string,{reserved:number;reported:number}>();
 for(const record of records){
  if(!record||typeof record.requestId!=='string'||!record.requestId||!['reserved','response','validated','failed'].includes(record.event))throw Error('Invalid demo spending record');
  if(record.event==='reserved'){
   if(attempts.has(record.requestId)||typeof record.reservedUSD!=='number'||!Number.isFinite(record.reservedUSD)||record.reservedUSD<=0)throw Error('Invalid demo budget reservation');
   attempts.set(record.requestId,{reserved:record.reservedUSD,reported:0});
  }else{
   const attempt=attempts.get(record.requestId);if(!attempt)throw Error('Unreserved demo spending record');
   if(record.costUSD!==undefined){if(typeof record.costUSD!=='number'||!Number.isFinite(record.costUSD)||record.costUSD<0)throw Error('Invalid demo reported cost');attempt.reported+=record.costUSD;}
  }
 }
 if(!attempts.size)throw Error('Demo reservation history is missing');
 return [...attempts.values()].reduce((sum,attempt)=>sum+Math.max(attempt.reserved,attempt.reported),0);
}
/** One explicitly authorized $10 recording allowance. Neither earlier ledger is modified. */
export async function gardenRecordingDemo(options:Options){
 const directory=join(options.root,'evidence','demo-ai-20260919'),ledger=join(directory,'openai-attempts.jsonl'),lockPath=join(directory,'openai.lock');
 const previousLedger=join(options.root,'evidence','voice-ai-demo-20260918','openai-attempts.jsonl');
 const observed=new Map<string,LedgerPrefix>();
 // Advance only after validating a complete history. A concurrent older read
 // must not lower the floor established by another snapshot or our own append.
 const observe=(file:string,bytes:Buffer)=>{
  requirePrefix(bytes,observed.get(file));
  observed.set(file,{file,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),mode:'append-only'});
 };
 const snapshot=async()=>{
  const baseline=JSON.parse(await readFile(join(options.root,'assets','demo','operational-ledgers.json'),'utf8')) as {schema:string;ledgers:LedgerPrefix[]};
  if(baseline.schema!=='eq.operational-ledger-baseline.v1'||!Array.isArray(baseline.ledgers))throw Error('Demo accounting baseline is missing');
  const priorPrefix=baseline.ledgers.find(row=>row.file==='evidence/voice-ai-demo-20260918/openai-attempts.jsonl'),currentPrefix=baseline.ledgers.find(row=>row.file==='evidence/demo-ai-20260919/openai-attempts.jsonl');
  if(!priorPrefix||!currentPrefix)throw Error('Demo accounting baseline is incomplete');
  const [priorRead,currentRead]=await Promise.all([readRecords(previousLedger,priorPrefix),readRecords(ledger,currentPrefix)]);
  requirePrefix(priorRead.bytes,observed.get(previousLedger));requirePrefix(currentRead.bytes,observed.get(ledger));
  const previous=priorRead.records,records=currentRead.records,priorReservedUSD=reservedCost(previous),reservedUSD=priorReservedUSD+reservedCost(records);
  observe(previousLedger,priorRead.bytes);observe(ledger,currentRead.bytes);
  return {enabled:options.enabled,model:GARDEN_DEMO_MODEL,ceilingUSD:RECORDING_DEMO_CEILING_USD,attempts:records.filter(r=>r.event==='reserved').length,priorReservedUSD,reservedUSD,remainingUSD:Math.max(0,RECORDING_DEMO_CEILING_USD-reservedUSD),reportedCostUSD:[...previous,...records].reduce((n,r)=>n+(typeof r.costUSD==='number'&&Number.isFinite(r.costUSD)&&r.costUSD>=0?r.costUSD:0),0)};
 };
 if(options.enabled&&(!['127.0.0.1','localhost','::1'].includes(options.host)||!options.key))throw Error('Recording feedback requires loopback and a server OpenAI key');
 if(!options.enabled)return {provider:undefined,snapshot,available:async()=>false};
 await mkdir(directory,{recursive:true});
 const append=async(receipt:Receipt)=>{
  const before=await readRecords(ledger,observed.get(ledger));reservedCost(before.records);
  const line=Buffer.from(JSON.stringify({at:new Date().toISOString(),...receipt})+'\n');
  await appendFile(ledger,line);
  // Bind the bytes we just wrote without needing a later config/status read.
  // The reservation floor is established before any provider transmission.
  observe(ledger,Buffer.concat([before.bytes,line]));
 };
 const available=async()=>{try{return (await snapshot()).remainingUSD>=.010056;}catch{return false;}};
 const provider=async(q:GardenRequest,signal:AbortSignal)=>{
  if(q.activity!=='sol-ending'||signal.aborted)return null;
  const body={...gardenRequestBody(q,GARDEN_DEMO_MODEL),reasoning:{effort:'none'},service_tier:'default'};
  const bodyText=JSON.stringify(body),inputBytes=Buffer.byteLength(bodyText);
  // Reserve the entire UTF-8 byte count as tokens, plus protocol overhead and
  // maximum output. Use the higher cache-write input rate; never release a
  // reservation, even after cancellation or a response with unknown usage.
  const reserve=Math.ceil(((inputBytes+4096)*.25+body.max_output_tokens*1.20)*1000)/1e9;
  if(inputBytes>32768)return null;
  let lock;try{lock=await open(lockPath,'wx');}catch(error){if((error as NodeJS.ErrnoException).code==='EEXIST')return null;throw error;}
  try{
   let records:Receipt[],budget:Awaited<ReturnType<typeof snapshot>>;
   try{budget=await snapshot();records=(await readRecords(ledger,observed.get(ledger))).records;}catch{return null;}
   if(signal.aborted||records.some(r=>r.event==='reserved'&&r.requestId===q.requestId)||budget.reservedUSD+reserve>RECORDING_DEMO_CEILING_USD)return null;
   await append({event:'reserved',requestId:q.requestId,model:GARDEN_DEMO_MODEL,inputBytes,reservedUSD:reserve,draftSha256:createHash('sha256').update(q.text).digest('hex')});
   const network=options.fetcher??fetch,start=Date.now();
   const measured:typeof fetch=async(url,init)=>{
    const response=await network(url,{...init,body:bodyText});
    const raw=await boundedJSON(response.clone(),65536).catch(()=>null) as {status?:string;model?:string;incomplete_details?:{reason?:string};usage?:{input_tokens?:number;output_tokens?:number};output?:{type?:string;status?:string;content?:{type?:string;text?:string}[]}[];error?:{code?:string}}|null;
    const input=raw?.usage?.input_tokens,output=raw?.usage?.output_tokens,known=Number.isSafeInteger(input)&&input!>=0&&Number.isSafeInteger(output)&&output!>=0;
    const messages=raw?.output?.filter(item=>item.type==='message')??[],content=messages[0]?.content?.[0];let parsed:unknown=null;
    if(content?.type==='output_text'&&typeof content.text==='string')try{parsed=JSON.parse(content.text);}catch{/* diagnosed without saving the submitted draft or raw provider text */}
    const result=parsed as {feedback?:unknown;refs?:unknown;status?:unknown;scene?:unknown}|null;
    await append({event:'response',requestId:q.requestId,httpStatus:response.status,durationMs:Date.now()-start,usageKnown:known,...(known?{inputTokens:input,outputTokens:output,costUSD:(input!*.20+output!*1.20)/1_000_000}:{reservedCostRetained:true}),diagnostic:{responseStatus:raw?.status??null,model:raw?.model??null,messageCount:messages.length,contentType:content?.type??null,incompleteReason:raw?.incomplete_details?.reason??null,feedbackCharacters:typeof result?.feedback==='string'?Array.from(result.feedback).length:null,feedbackStatus:result?.status??null,scene:result?.scene??null,refsAllExposed:Array.isArray(result?.refs)&&result.refs.every(ref=>typeof ref==='string'&&q.exposed.includes(ref)),contractValid:validFeedback(parsed,q)},...(raw?.error?.code?{errorCode:raw.error.code}:{})});
    return response;
   };
   try{const result=await openAIProvider(options.key!,GARDEN_DEMO_MODEL,async()=>!signal.aborted,measured)(q,signal);await append({event:'validated',requestId:q.requestId,status:result?.status??'unavailable'});return result;}
   catch(error){await append({event:'failed',requestId:q.requestId,errorType:error instanceof Error?error.name:'Unknown'}).catch(()=>{});return null;}
  }finally{await lock.close();await unlink(lockPath);}
 };
 return {provider,snapshot,available};
}
