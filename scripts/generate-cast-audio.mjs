/** Approved finite FREE-model recording job. Never called by build or authored play. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {audioWords as tokenize} from './cast-audio-identity.mjs';
const root='public/audio/cast',evidence='evidence/cast-audio-20260919',manifest=JSON.parse(await fs.readFile(root+'/manifest.json','utf8'));
const sha=value=>createHash('sha256').update(value).digest('hex');
if(manifest.model!=='s2.1-pro-free'||!process.env.FISH_API_KEY&&!process.argv.includes('--reuse-only'))throw Error('Fixed free model and local Fish credential required');
await fs.mkdir(evidence+'/batches',{recursive:true});const lock=await fs.open(evidence+'/generation.lock','wx');
const ledger=evidence+'/attempts.jsonl';let writeChain=Promise.resolve();
const record=data=>{writeChain=writeChain.then(()=>fs.appendFile(ledger,JSON.stringify({at:new Date().toISOString(),...data})+'\n'));return writeChain;};
let saveChain=Promise.resolve();const save=()=>{saveChain=saveChain.then(()=>fs.writeFile(root+'/manifest.json',JSON.stringify(manifest,null,2)+'\n'));return saveChain;};
if(process.argv.includes('--repair-stream')){
 await fs.copyFile(root+'/manifest.json',evidence+'/manifest-invalid-stream-v1.json').catch(()=>{});
 for(const entry of manifest.entries)for(const key of ['uri','sha256','bytes','start','end','duration','wavUri','wavSha256','wavBytes','batchDuration'])delete entry[key];
}
// Reuse exact intervals from already receipted batches before planning any new request.
for(const file of await fs.readdir(evidence+'/batches')){
 if(!/^[a-f0-9]{64}\.json$/.test(file))continue;const receipt=JSON.parse(await fs.readFile(evidence+'/batches/'+file,'utf8'));
 if(receipt.streamAssembly!=='all-audio-deltas-v2')continue;
 if(receipt.model!==manifest.model||receipt.voiceId!==manifest.cast[receipt.speaker]||sha(await fs.readFile(root+'/'+receipt.sha256+'.mp3'))!==receipt.sha256)throw Error('Receipt binding mismatch');
 const actual=receipt.alignment;if(actual.some(s=>tokenize(s.text).length!==1))continue;const words=actual.map(s=>tokenize(s.text)[0].text);
 for(const entry of manifest.entries.filter(e=>!e.uri&&e.speaker===receipt.speaker)){
  const wanted=tokenize(entry.text).map(t=>t.text);if(!wanted.length)continue;
  for(let i=0;i<=words.length-wanted.length;i++)if(wanted.every((w,j)=>w===words[i+j])){const start=actual[i].start,end=actual[i+wanted.length-1].end;if(end<=start)continue;Object.assign(entry,{uri:'/audio/cast/'+receipt.sha256+'.mp3',sha256:receipt.sha256,bytes:receipt.bytes,start,end,duration:end-start});break;}
 }
}
await save();
// Each source recording can supply exact word/sentence intervals, without extra synthesis.
const pending=manifest.entries.filter(e=>!e.uri),roots=[];
for(const speaker of Object.keys(manifest.cast)){
 const candidates=pending.filter(e=>e.speaker===speaker).sort((a,b)=>b.text.length-a.text.length),keepers=[];
 for(const entry of candidates){const tokens=tokenize(entry.text).map(t=>t.text).join(' '),owner=keepers.find(other=>(' '+tokenize(other.text).map(t=>t.text).join(' ')+' ').includes(' '+tokens+' '));if(owner){owner.dependents.push(entry);}else{entry.dependents=[];keepers.push(entry);}}
 roots.push(...keepers);
}
const batches=[];for(const speaker of Object.keys(manifest.cast)){
 let entries=[],length=0;const finish=()=>{if(!entries.length)return;const text=entries.map(e=>e.text).join('\n\n'),id=sha(JSON.stringify({text,voiceId:manifest.cast[speaker],model:manifest.model,speed:manifest.speed}));batches.push({id,speaker,text,entries});entries=[];length=0;};
 for(const entry of roots.filter(e=>e.speaker===speaker)){if(length+entry.text.length>1800)finish();entries.push(entry);length+=entry.text.length+2;}finish();
}
// Short cast batches establish every chosen voice before the larger narrator catalogue.
batches.sort((a,b)=>(a.speaker==='narrator')-(b.speaker==='narrator'));
await fs.writeFile(evidence+'/generation-plan.json',JSON.stringify({at:new Date().toISOString(),model:manifest.model,cast:manifest.cast,entries:manifest.entries.length,remainingEntries:pending.length,batches:batches.map(({id,speaker,text,entries})=>({id,speaker,textBytes:Buffer.byteLength(text),entries:entries.map(e=>e.id)})),requests:batches.length,expectedChargeUSD:0},null,2)+'\n');
let cursor=0,completed=0,stopped=false;const limit=process.argv.includes('--reuse-only')?0:process.argv.includes('--first')?1:batches.length;
function bind(batch,receipt){
 if(receipt.alignment.some(segment=>tokenize(segment.text).length!==1))throw Error('Timestamp endpoint returned non-word alignment: '+batch.id);
 const expected=tokenize(batch.text),actual=receipt.alignment.flatMap(segment=>tokenize(segment.text).map(token=>({...token,start:segment.start,end:segment.end})));if(expected.map(t=>t.text).join(' ')!==actual.map(t=>t.text).join(' '))throw Error('Word alignment did not match exact authored text: '+batch.id);
 let offset=0;
 for(const entry of batch.entries){const words=tokenize(entry.text),first=actual[offset],last=actual[offset+words.length-1];if(!first||!last)throw Error('Missing clip alignment');if(last.end<=first.start){offset+=words.length;continue;}const apply=(e,start,end)=>{e.uri='/audio/cast/'+receipt.sha256+'.mp3';e.sha256=receipt.sha256;e.bytes=receipt.bytes;e.start=start;e.end=end;e.duration=end-start;};apply(entry,first.start,last.end);const ownWords=words.map(t=>t.text);
  for(const child of entry.dependents){const childWords=tokenize(child.text).map(t=>t.text);let index=-1;for(let i=0;i<=ownWords.length-childWords.length;i++)if(childWords.every((w,j)=>w===ownWords[i+j])){index=i;break;}if(index<0)throw Error('Missing exact source substring');const a=actual[offset+index],b=actual[offset+index+childWords.length-1];if(b.end<=a.start)continue;apply(child,a.start,b.end);}
  offset+=words.length;
 }
}
async function generate(batch){
 const receiptPath=evidence+'/batches/'+batch.id+'.json';let receipt;try{receipt=JSON.parse(await fs.readFile(receiptPath,'utf8'));if(sha(await fs.readFile(root+'/'+receipt.sha256+'.mp3'))!==receipt.sha256)throw Error('Stored audio hash mismatch');if(receipt.streamAssembly!=='all-audio-deltas-v2'){await fs.copyFile(receiptPath,receiptPath.replace('.json','.invalid-stream-v1.json'));receipt=undefined;}}catch(error){if(error.code!=='ENOENT')throw error;}
 if(!receipt){
  await record({event:'reserved',id:batch.id,speaker:batch.speaker,voiceId:manifest.cast[batch.speaker],model:manifest.model,textSha256:sha(batch.text),textBytes:Buffer.byteLength(batch.text),expectedChargeUSD:0});
  const response=await fetch('https://api.fish.audio/v1/tts/stream/with-timestamp',{method:'POST',headers:{Authorization:'Bearer '+process.env.FISH_API_KEY,'Content-Type':'application/json',model:'s2.1-pro-free'},body:JSON.stringify({text:batch.text,reference_id:manifest.cast[batch.speaker],format:'mp3',mp3_bitrate:128,latency:'normal',prosody:{speed:manifest.speed,volume:0}}),signal:AbortSignal.timeout(240000)});
  if(!response.ok)throw Error('Fish HTTP '+response.status);
  const payload=await response.text();if(payload.length>40000000)throw Error('Unexpected stream size');
  const events=payload.split(/\r?\n\r?\n/).flatMap(block=>{const data=block.split(/\r?\n/).filter(line=>line.startsWith('data:')).map(line=>line.slice(5).trim()).join('\n');if(!data||data==='[DONE]')return [];return [JSON.parse(data)];});
  const chunks=new Map(),audioDeltas=[];for(const event of events){if(event.error)throw Error('Fish stream reported an error');if(event.audio_base64)audioDeltas.push(Buffer.from(event.audio_base64,'base64'));if(event.alignment){const key=event.chunk_seq??chunks.size;chunks.set(key,event);}}
  const ordered=[...chunks.values()].sort((a,b)=>(a.chunk_seq??0)-(b.chunk_seq??0)),audio=Buffer.concat(audioDeltas);
  if(audio.length<512||audio.length>20000000)throw Error('Incomplete audio stream');
  receipt={id:batch.id,streamAssembly:'all-audio-deltas-v2',audioDeltas:audioDeltas.map(delta=>({bytes:delta.length,sha256:sha(delta)})),speaker:batch.speaker,voiceId:manifest.cast[batch.speaker],model:manifest.model,text:batch.text,textSha256:sha(batch.text),sha256:sha(audio),bytes:audio.length,alignment:ordered.flatMap(e=>(e.alignment?.segments??[]).map(s=>({...s,start:s.start+(e.chunk_audio_offset_sec??0),end:s.end+(e.chunk_audio_offset_sec??0)}))),chunks:ordered.map(e=>({seq:e.chunk_seq,offset:e.chunk_audio_offset_sec,duration:e.alignment?.audio_duration})),expectedChargeUSD:0};
  await fs.writeFile(root+'/'+receipt.sha256+'.mp3',audio);await fs.writeFile(receiptPath,JSON.stringify(receipt,null,2)+'\n');await record({event:'completed',id:batch.id,sha256:receipt.sha256,bytes:audio.length});
 }
 bind(batch,receipt);await save();completed++;console.log(JSON.stringify({completed,total:batches.length,speaker:batch.speaker,covered:manifest.entries.filter(e=>e.uri).length}));
}
async function worker(){while(!stopped&&cursor<limit){const batch=batches[cursor++];try{await generate(batch);}catch(error){stopped=true;await record({event:'failed',id:batch.id,reason:error.message});console.error(error.message);process.exitCode=1;}}}
try{console.log(JSON.stringify({entries:manifest.entries.length,remaining:pending.length,requests:batches.length,textBytes:batches.reduce((n,b)=>n+Buffer.byteLength(b.text),0),model:manifest.model}));await Promise.all(Array.from({length:Math.min(5,limit)},worker));for(const entry of manifest.entries)delete entry.dependents;await save();}finally{await lock.close();await fs.unlink(evidence+'/generation.lock');}
