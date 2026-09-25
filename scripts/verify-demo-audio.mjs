import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256} from './demo-assets.mjs';
import {selectedCast} from '../src/garden/voiceTypes.ts';
import {matchingWords,pcmWave,slicePcmWave,wordClipWindow,padPcmWave,completeWordWindow,isWholeWordRecording} from './cast-audio-identity.mjs';
import {isPronunciationEntry,isSpokenText} from './cast-catalogue-text.mjs';

/** Hashes plus exact word identity, provenance, independent PCM bounds and source freshness. */
export async function verifyDemoAudio(publicRoot='public',sourceRoot=process.cwd(),{scope='source'}={}){
 if(!['source','runtime'].includes(scope))throw Error('Invalid audio verification scope');
 const manifestPath=path.join(publicRoot,'audio/cast/manifest.json'),raw=await fs.readFile(manifestPath),manifest=JSON.parse(raw.toString());
 if(manifest.schema!=='eq.cast-audio.v1'||manifest.playback!=='independent-pcm-v1'||!Array.isArray(manifest.entries)||!manifest.entries.length)throw Error('Invalid independent authored cast manifest');
 if(Object.keys(manifest.cast??{}).length!==Object.keys(selectedCast).length||Object.entries(selectedCast).some(([role,id])=>manifest.cast?.[role]!==id))throw Error('Authored cast differs from the approved eight voices');
 const inputFiles=new Map(),files=new Map(),ids=new Set(),speakers=new Set(),receipts=new Map(),runtimePcm=new Map();
 const input=async(file,expected)=>{if(!/^(src\/garden\/[\w.-]+\.(ts|tsx)|evidence\/cast-audio-20260919\/batches\/[a-f0-9]{64}(?:\.wav)?\.json)$/.test(file))throw Error('Invalid audio source input: '+file);const raw=await fs.readFile(path.join(sourceRoot,file));if(sha256(raw)!==expected)throw Error('Stale audio source input: '+file);inputFiles.set(file,{file,sha256:expected});return raw;};
 if(!Array.isArray(manifest.sourceRecords)||!manifest.sourceRecords.length)throw Error('Missing audio source bindings');
 if(scope==='source')for(const record of manifest.sourceRecords)await input(record.file,record.sha256);
 const audio=async(uri,hash,size)=>{if(!/^\/audio\/cast\/(?:clips\/)?[a-f0-9]{64}\.(mp3|wav)$/.test(uri??'')||!/^[a-f0-9]{64}$/.test(hash??'')||!Number.isSafeInteger(size)||size<=0)throw Error('Invalid authored audio binding: '+uri);const previous=files.get(uri);if(previous){if(previous.sha256!==hash||previous.bytes!==size)throw Error('Conflicting audio identity');return null;}const bytes=await fs.readFile(path.join(publicRoot,uri.slice(1)));if(bytes.length!==size||sha256(bytes)!==hash)throw Error('Authored audio hash mismatch: '+uri);files.set(uri,{uri,sha256:hash,bytes:size});return bytes;};
 const groups=new Map();
 for(const entry of manifest.entries){
  if(typeof entry.id!=='string'||ids.has(entry.id)||!entry.text?.trim()||entry.voiceId!==manifest.cast[entry.speaker]||!entry.clip||!entry.binding)throw Error('Invalid or unfinished authored entry: '+entry.id);
  ids.add(entry.id);speakers.add(entry.speaker);
  if(/\s/.test(entry.text)&&!isSpokenText(entry.text))throw Error('Non-reading data entered the audio catalogue: '+entry.id);
  if(isPronunciationEntry(entry)&&entry.clip.boundaryMethod!=='complete-word-recording-v1')throw Error('Sentence-derived word audio is not accepted: '+entry.text);
  if(![entry.start,entry.end,entry.duration,entry.batchDuration].every(Number.isFinite)||entry.start<0||entry.end<=entry.start||entry.end>entry.batchDuration||Math.abs(entry.duration-(entry.end-entry.start))>.001)throw Error('Invalid authored timing: '+entry.id);
  if(scope==='runtime'){
   const clip=entry.clip;if(!/^\/audio\/cast\/clips\/[a-f0-9]{64}\.wav$/.test(clip.uri)||!Number.isFinite(clip.duration)||clip.duration<=0)throw Error('Invalid independent runtime clip');
   const leading=clip.leadingSilenceSamples??0,trailing=clip.trailingSilenceSamples??0;
   const bytes=await audio(clip.uri,clip.sha256,clip.bytes);if(bytes)runtimePcm.set(clip.uri,pcmWave(bytes));const pcm=runtimePcm.get(clip.uri);if(!pcm||![clip.startSample,clip.endSample,leading,trailing].every(value=>Number.isSafeInteger(value)&&value>=0)||pcm.sampleRate!==clip.sampleRate||pcm.channels!==clip.channels||pcm.samples!==clip.endSample-clip.startSample+leading+trailing||Math.abs(clip.duration-pcm.samples/pcm.sampleRate)>1e-9)throw Error('Runtime PCM bounds mismatch');continue;
  }
  await audio(entry.uri,entry.sha256,entry.bytes);
  let receipt=receipts.get(entry.binding.receiptPath);if(!receipt){receipt=JSON.parse(await input(entry.binding.receiptPath,entry.binding.receiptSha256));receipts.set(entry.binding.receiptPath,receipt);}
  const whole=isWholeWordRecording(receipt,entry.text),bound=whole?entry.binding.wordStart===0&&entry.binding.wordEnd===1&&entry.start===0&&entry.end===entry.batchDuration:matchingWords(entry.text,receipt.alignment).some(match=>match.wordStart===entry.binding.wordStart&&match.wordEnd===entry.binding.wordEnd&&match.start===entry.start&&match.end===entry.end);
  if(receipt.streamAssembly!=='all-audio-deltas-v2'||receipt.sha256!==entry.sha256||receipt.voiceId!==entry.voiceId||receipt.speaker!==entry.speaker||entry.binding.textSha256!==sha256(entry.text)||!bound)throw Error('Authored words do not match recorded words: '+entry.id);
  const group=groups.get(entry.wavSha256)??[];group.push(entry);groups.set(entry.wavSha256,group);
 }
 const checkedClips=new Set();
 for(const entries of groups.values()){
  const first=entries[0],master=await audio(first.wavUri,first.wavSha256,first.wavBytes);if(!master)throw Error('Ambiguous PCM master');const pcm=pcmWave(master);
  const wavReceiptPath='evidence/cast-audio-20260919/batches/'+first.sha256+'.wav.json',wavRaw=await fs.readFile(path.join(sourceRoot,wavReceiptPath)),wavReceipt=JSON.parse(wavRaw);inputFiles.set(wavReceiptPath,{file:wavReceiptPath,sha256:sha256(wavRaw)});
  if(wavReceipt.sourceSha256!==first.sha256||wavReceipt.sha256!==first.wavSha256||wavReceipt.bytes!==master.length||wavReceipt.sampleRate!==pcm.sampleRate||wavReceipt.channels!==pcm.channels||Math.abs(wavReceipt.duration-pcm.samples/pcm.sampleRate)>1/pcm.sampleRate)throw Error('PCM decode receipt does not match master');
  for(const entry of entries){
   const clip=entry.clip;
   const bounded=clip.boundaryMethod==='bounded-word-energy-v1';if(bounded&&!/^[A-Za-z]+(?:['’][A-Za-z]+)?$/.test(entry.text))throw Error('Word boundary method applied to a passage');
   const receipt=receipts.get(entry.binding.receiptPath),whole=clip.boundaryMethod==='complete-word-recording-v1';
   if(isPronunciationEntry(entry)&&!isWholeWordRecording(receipt,entry.text))throw Error('Word master contains other text: '+entry.text);
   const window=whole?completeWordWindow(master,receipt,entry.text):bounded?wordClipWindow(master,receipt.alignment,entry.binding):{startSample:Math.floor(entry.start*pcm.sampleRate),endSample:Math.ceil(entry.end*pcm.sampleRate),leadingSilenceSamples:0,trailingSilenceSamples:0};
   const leading=clip.leadingSilenceSamples??0,trailing=clip.trailingSilenceSamples??0;
   if(clip.sourceSha256!==entry.sha256||clip.sourceWavSha256!==entry.wavSha256||entry.wavSha256!==first.wavSha256||entry.wavBytes!==master.length||clip.sampleRate!==pcm.sampleRate||clip.channels!==pcm.channels||clip.startSample!==window.startSample||clip.endSample!==window.endSample||leading!==window.leadingSilenceSamples||trailing!==window.trailingSilenceSamples||Math.abs(clip.duration-(clip.endSample-clip.startSample+leading+trailing)/pcm.sampleRate)>1e-9)throw Error('Independent PCM provenance mismatch: '+entry.id);
   if(!/^\/audio\/cast\/clips\/[a-f0-9]{64}\.wav$/.test(clip.uri))throw Error('Audio clip is not independent');
   if(!checkedClips.has(clip.sha256)){const derived=padPcmWave(slicePcmWave(master,clip.startSample,clip.endSample),leading,trailing);if(sha256(derived)!==clip.sha256||derived.length!==clip.bytes)throw Error('Independent samples differ from master: '+entry.id);await audio(clip.uri,clip.sha256,clip.bytes);checkedClips.add(clip.sha256);}
  }
 }
 const expected=Object.keys(selectedCast);if(expected.some(speaker=>!speakers.has(speaker))||speakers.size!==expected.length)throw Error('Authored cast incomplete');
 const runtimeFiles=[...files.values()].filter(file=>file.uri.startsWith('/audio/cast/clips/')),sourceAudioFiles=[...files.values()].filter(file=>!file.uri.startsWith('/audio/cast/clips/'));
 return {schema:'evidence-quest.demo-audio-verification.v2',verificationScope:scope,manifestSha256:sha256(raw),entries:ids.size,roles:[...speakers].sort(),files:files.size,bytes:[...files.values()].reduce((total,file)=>total+file.bytes,0),runtimeFiles,sourceAudioFiles,inputFiles:[...inputFiles.values()],status:scope==='source'?'COMPLETE_EXACT_PCM_VERIFIED':'RUNTIME_CLIP_BYTES_VERIFIED',scope:scope==='source'?'Exact source/word/speaker/master/clip bytes and sample boundaries. Native listening and browser acceptance remain separate.':'Compiled manifest and independent clip bytes/bounds only. Source provenance must be established separately with the same manifest hash; native listening remains separate.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await verifyDemoAudio(process.argv[2]??'public'),null,2));
