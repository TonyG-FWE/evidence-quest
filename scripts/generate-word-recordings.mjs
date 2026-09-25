/** Explicit, bounded FREE-model repair. Never invoked by builds or authored play. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {audioWords} from './cast-audio-identity.mjs';
import {verifyLedgerHistory} from './demo-ledgers.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex'),directory='evidence/cast-audio-20260919',root='public/audio/cast';
const raw=await fs.readFile('evidence/nerdy-demo-20260924/word-recordings-plan.json'),plan=JSON.parse(raw),approved=process.argv.find(arg=>arg.startsWith('--plan-sha='))?.slice(11);
if(approved!==sha(raw)||plan.model!=='s2.1-pro-free'||plan.expectedChargeUSD!==0||plan.maximumRequests!==plan.words.length||plan.maximumRequests>1826||plan.automaticRetries!==0||!process.env.FISH_API_KEY)throw Error('Exact finite free-model plan and local credential required');
const pilot=process.argv.includes('--pilot');if(!pilot&&!process.argv.includes('--complete-plan'))throw Error('Explicit pilot or complete-plan selection required');
const manifest=JSON.parse(await fs.readFile(root+'/manifest.json','utf8'));if(manifest.model!==plan.model||manifest.cast.narrator!==plan.voiceId||manifest.speed!==plan.speed)throw Error('Approved narrator binding changed');
for(const word of plan.words){if(audioWords(word.text).length!==1||word.id!==sha(JSON.stringify({purpose:'isolated-word-v1',text:word.text,voiceId:plan.voiceId,model:plan.model,speed:plan.speed})))throw Error('Invalid word plan');for(const id of word.entryIds){const e=manifest.entries.find(e=>e.id===id);if(!e||e.speaker!=='narrator'||audioWords(e.text)[0]?.text!==word.word)throw Error('Plan no longer matches vocabulary');}}
await verifyLedgerHistory();
const ledger=directory+'/attempts.jsonl',history=(await fs.readFile(ledger,'utf8')).trim().split('\n').map(line=>JSON.parse(line)),reserved=new Set(history.filter(row=>row.event==='reserved').map(row=>row.id));
const lock=await fs.open(directory+'/generation.lock','wx');
let ledgerWrites=Promise.resolve();const record=data=>ledgerWrites=ledgerWrites.then(()=>fs.appendFile(ledger,JSON.stringify({at:new Date().toISOString(),purpose:'isolated-word-v1',...data})+'\n'));
let completed=0,cached=0;
async function generate(word){
  const receiptPath=directory+'/batches/'+word.id+'.json';let existing;
  try{existing=JSON.parse(await fs.readFile(receiptPath,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
  if(existing){if(existing.purpose!=='isolated-word-v1'||existing.text!==word.text||sha(await fs.readFile(root+'/'+existing.sha256+'.mp3'))!==existing.sha256)throw Error('Cached single-word recording changed');cached++;return;}
  if(reserved.has(word.id))throw Error('No automatic retry of previously attempted word: '+word.word);
  await record({event:'reserved',id:word.id,word:word.word,speaker:plan.speaker,voiceId:plan.voiceId,model:plan.model,textSha256:sha(word.text),textBytes:Buffer.byteLength(word.text),expectedChargeUSD:0,planSha256:sha(raw)});
  try{
   const response=await fetch('https://api.fish.audio/v1/tts/stream/with-timestamp',{method:'POST',headers:{Authorization:'Bearer '+process.env.FISH_API_KEY,'Content-Type':'application/json',model:plan.model},body:JSON.stringify({text:word.text,reference_id:plan.voiceId,format:'mp3',mp3_bitrate:128,latency:'normal',prosody:{speed:plan.speed,volume:0}}),signal:AbortSignal.timeout(60000)});
   if(!response.ok)throw Error('Fish HTTP '+response.status);
   const payload=await response.text();if(payload.length>3000000)throw Error('Unexpected single-word stream size');
   const events=payload.split(/\r?\n\r?\n/).flatMap(block=>{const data=block.split(/\r?\n/).filter(line=>line.startsWith('data:')).map(line=>line.slice(5).trim()).join('\n');return !data||data==='[DONE]'?[]:[JSON.parse(data)];});
   const chunks=new Map(),deltas=[];
   for(const event of events){if(event.error)throw Error('Fish stream error');if(event.audio_base64)deltas.push(Buffer.from(event.audio_base64,'base64'));if(event.alignment)chunks.set(event.chunk_seq??chunks.size,event);}
   const ordered=[...chunks.values()].sort((a,b)=>(a.chunk_seq??0)-(b.chunk_seq??0)),audio=Buffer.concat(deltas),alignment=ordered.flatMap(e=>(e.alignment.segments??[]).map(s=>({...s,start:s.start+(e.chunk_audio_offset_sec??0),end:s.end+(e.chunk_audio_offset_sec??0)})));
   if(audio.length<512||audio.length>300000||alignment.length!==1||audioWords(alignment[0].text).map(w=>w.text).join(' ')!==word.word||!Number.isFinite(alignment[0].end)||alignment[0].end<=alignment[0].start||alignment[0].end>6)throw Error('Single-word response failed duration/text validation');
   const receipt={id:word.id,purpose:'isolated-word-v1',streamAssembly:'all-audio-deltas-v2',audioDeltas:deltas.map(delta=>({bytes:delta.length,sha256:sha(delta)})),speaker:plan.speaker,voiceId:plan.voiceId,model:plan.model,text:word.text,textSha256:sha(word.text),sha256:sha(audio),bytes:audio.length,alignment,chunks:ordered.map(e=>({seq:e.chunk_seq,offset:e.chunk_audio_offset_sec,duration:e.alignment.audio_duration})),expectedChargeUSD:0,planSha256:sha(raw)};
   try{await fs.writeFile(root+'/'+receipt.sha256+'.mp3',audio,{flag:'wx'});}catch(error){if(error.code!=='EEXIST'||sha(await fs.readFile(root+'/'+receipt.sha256+'.mp3'))!==receipt.sha256)throw error;}await fs.writeFile(receiptPath,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
   await record({event:'completed',id:word.id,word:word.word,sha256:receipt.sha256,bytes:audio.length});completed++;console.log(JSON.stringify({word:word.word,completed,cached,scope:pilot?'10-word pilot':'finite plan'}));
  }catch(error){await record({event:'failed',id:word.id,word:word.word,reason:error.message});throw error;}
}
const pending=plan.words.filter(word=>!pilot||word.pilot);let cursor=0,stopped=false;
async function worker(){while(!stopped&&cursor<pending.length){const word=pending[cursor++];try{await generate(word);}catch(error){stopped=true;throw error;}}}
try{const results=await Promise.allSettled(Array.from({length:pilot?1:2},worker));const failure=results.find(result=>result.status==='rejected');if(failure)throw failure.reason;}
finally{await ledgerWrites;await lock.close();await fs.unlink(directory+'/generation.lock');}
console.log(JSON.stringify({completed,cached,expectedChargeUSD:0,automaticRetries:0}));
