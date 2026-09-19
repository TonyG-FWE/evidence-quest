/** Derive independently ending PCM clips; no synthesis, resampling, gain or lossy conversion. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {matchingWords,pcmWave,slicePcmWave} from './cast-audio-identity.mjs';
const root='public/audio/cast',evidence='evidence/cast-audio-20260919',sha=x=>createHash('sha256').update(x).digest('hex');
const manifest=JSON.parse(await fs.readFile(root+'/manifest.json','utf8')),files=new Map(),inputs=new Map(),receipts=new Map(),missing=[];
await fs.mkdir(root+'/clips',{recursive:true});
for(const wavHash of new Set(manifest.entries.map(entry=>entry.wavSha256).filter(Boolean))){
 const masterPath=root+'/'+wavHash+'.wav',master=await fs.readFile(masterPath),pcm=pcmWave(master);if(sha(master)!==wavHash)throw Error('PCM master changed');
 inputs.set(masterPath,{file:masterPath,sha256:wavHash});
 for(const entry of manifest.entries.filter(entry=>entry.wavSha256===wavHash)){
  const binding=entry.binding;if(!binding){missing.push(entry.id);continue;}
  let receipt=receipts.get(binding.receiptPath);if(!receipt){const raw=await fs.readFile(binding.receiptPath);if(sha(raw)!==binding.receiptSha256)throw Error('Alignment receipt changed');receipt=JSON.parse(raw);receipts.set(binding.receiptPath,receipt);inputs.set(binding.receiptPath,{file:binding.receiptPath,sha256:sha(raw)});}
  if(receipt.sha256!==entry.sha256||receipt.voiceId!==entry.voiceId||sha(entry.text)!==binding.textSha256||!matchingWords(entry.text,receipt.alignment).some(m=>m.wordStart===binding.wordStart&&m.wordEnd===binding.wordEnd&&m.start===entry.start&&m.end===entry.end))throw Error('Exact recording words do not match clip: '+entry.id);
  const startSample=Math.floor(entry.start*pcm.sampleRate),endSample=Math.ceil(entry.end*pcm.sampleRate),bytes=slicePcmWave(master,startSample,endSample),hash=sha(bytes),uri='/audio/cast/clips/'+hash+'.wav';
  if(!files.has(hash)){let existing;try{existing=await fs.readFile(root+'/clips/'+hash+'.wav');}catch(error){if(error.code!=='ENOENT')throw error;}if(existing&&sha(existing)!==hash)throw Error('Existing independent clip changed');if(!existing)await fs.writeFile(root+'/clips/'+hash+'.wav',bytes);files.set(hash,{uri,sha256:hash,bytes:bytes.length});}
  entry.clip={uri,sha256:hash,bytes:bytes.length,duration:(endSample-startSample)/pcm.sampleRate,sourceSha256:entry.sha256,sourceWavSha256:wavHash,startSample,endSample,sampleRate:pcm.sampleRate,channels:pcm.channels};
 }
}
for(const entry of manifest.entries)if(!entry.clip&&!missing.includes(entry.id))missing.push(entry.id);
if(missing.length&&!process.argv.includes('--allow-partial'))throw Error('Missing exact PCM inputs for '+missing.length+' entries; provider requests remain separate.');
manifest.playback='independent-pcm-v1';
await fs.writeFile(root+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');
const result={schema:'eq.independent-cast-clips.v1',at:new Date().toISOString(),algorithm:'PCM16 identity samples, floor(start*rate) through ceil(end*rate), independent RIFF file',providerRequests:0,manifestSha256:sha(await fs.readFile(root+'/manifest.json')),entries:manifest.entries.length,files:[...files.values()],inputs:[...inputs.values()],missing,status:missing.length?'INCOMPLETE':'COMPLETE'};
await fs.writeFile(evidence+'/independent-clips.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({entries:manifest.entries.length,files:files.size,bytes:[...files.values()].reduce((n,f)=>n+f.bytes,0),missing:missing.length,providerRequests:0}));

