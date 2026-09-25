/** Semantic repair/reuse only: this script cannot contact a provider. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {audioWords,matchingWords,isWholeWordRecording} from './cast-audio-identity.mjs';
import {isPronunciationEntry} from './cast-catalogue-text.mjs';
const root='public/audio/cast',evidence='evidence/cast-audio-20260919',sha=value=>createHash('sha256').update(value).digest('hex');
const manifest=JSON.parse(await fs.readFile(root+'/manifest.json','utf8')),receipts=[],inputs=[],changed=[],missing=[],wavCache=new Map();
for(const file of (await fs.readdir(evidence+'/batches')).sort()){
 if(!/^[a-f0-9]{64}\.json$/.test(file))continue;
 const receiptPath=evidence+'/batches/'+file,raw=await fs.readFile(receiptPath),receipt=JSON.parse(raw);
 if(receipt.streamAssembly!=='all-audio-deltas-v2')continue;
 if(receipt.model!==manifest.model||receipt.voiceId!==manifest.cast[receipt.speaker])throw Error('Receipt identity mismatch: '+file);
 const recording=await fs.readFile(root+'/'+receipt.sha256+'.mp3');if(sha(recording)!==receipt.sha256||recording.length!==receipt.bytes)throw Error('Master bytes changed: '+file);
 if(audioWords(receipt.text).map(w=>w.text).join(' ')!==receipt.alignment.flatMap(word=>audioWords(word.text).map(w=>w.text)).join(' '))throw Error('Receipt words do not match provider input: '+file);
 receipts.push({...receipt,receiptPath,receiptSha256:sha(raw)});inputs.push({file:receiptPath,sha256:sha(raw)});
}
for(const entry of manifest.entries){
 const pronunciation=isPronunciationEntry(entry);
 const matches=receipts.filter(r=>r.speaker===entry.speaker&&(!pronunciation||isWholeWordRecording(r,entry.text))).flatMap(receipt=>matchingWords(entry.text,receipt.alignment).map(match=>({receipt,...match})));
 const singleWord=/^[A-Za-z]+(?:['’][A-Za-z]+)?$/.test(entry.text);
 // Prefer a separately spoken occurrence, then a completed phrase, over a word joined to its neighbour.
 const separation=match=>{const words=audioWords(match.receipt.text),before=match.receipt.text.slice(words[match.wordStart-1]?.end??0,words[match.wordStart].start),after=match.receipt.text.slice(words[match.wordEnd-1].end,words[match.wordEnd]?.start??match.receipt.text.length);return (/\n\n/.test(before)||match.wordStart===0?4:0)+(/\n\n/.test(after)||match.wordEnd===words.length?5:/[.!?]/.test(after)?3:0)+Math.min(.8,match.end-match.start);};
 if(singleWord)matches.sort((a,b)=>separation(b)-separation(a));
 const chosen=singleWord?matches[0]:matches.find(m=>m.receipt.sha256===entry.sha256&&Math.abs(m.start-entry.start)<.0001&&Math.abs(m.end-entry.end)<.0001)??matches[0];
 if(!chosen){missing.push({id:entry.id,speaker:entry.speaker,text:entry.text,sources:entry.sources,reason:pronunciation?'No complete isolated word recording; sentence slicing is not accepted':'No exact apostrophe-preserving, positive-duration recorded interval'});for(const field of ['uri','sha256','bytes','start','end','duration','wavUri','wavSha256','wavBytes','batchDuration','clip','binding'])delete entry[field];continue;}
 const {receipt,wordStart,wordEnd}=chosen;
 let wav;const wavPath=evidence+'/batches/'+receipt.sha256+'.wav.json';
 try{wav=wavCache.get(wavPath);if(!wav){const raw=await fs.readFile(wavPath);wav=JSON.parse(raw);if(sha(await fs.readFile(root+'/'+wav.sha256+'.wav'))!==wav.sha256||wav.sourceSha256!==receipt.sha256)throw Error('PCM master binding mismatch');wavCache.set(wavPath,wav);inputs.push({file:wavPath,sha256:sha(raw)});}}catch(error){if(error.code!=='ENOENT')throw error;}
 const whole=isWholeWordRecording(receipt,entry.text);if(whole&&!wav)throw Error('Decode the complete word before binding it: '+entry.text);
 const start=whole?0:chosen.start,end=whole?wav.duration:chosen.end;
 if(wav&&end>wav.duration)throw Error('PCM interval exceeds master: '+entry.text);
 if(entry.sha256!==receipt.sha256||entry.start!==start||entry.end!==end){changed.push({id:entry.id,text:entry.text,speaker:entry.speaker,from:{sha256:entry.sha256,start:entry.start,end:entry.end},to:{sha256:receipt.sha256,start,end}});for(const field of ['wavUri','wavSha256','wavBytes','batchDuration','clip'])delete entry[field];}
 Object.assign(entry,{uri:'/audio/cast/'+receipt.sha256+'.mp3',sha256:receipt.sha256,bytes:receipt.bytes,start,end,duration:end-start,binding:{receiptPath:receipt.receiptPath,receiptSha256:receipt.receiptSha256,wordStart,wordEnd,textSha256:sha(entry.text)}});
 if(wav)Object.assign(entry,{wavUri:'/audio/cast/'+wav.sha256+'.wav',wavSha256:wav.sha256,wavBytes:wav.bytes,batchDuration:wav.duration});
}
const report={schema:'eq.cast-semantic-repair.v1',at:new Date().toISOString(),providerRequests:0,entries:manifest.entries.length,exactBound:manifest.entries.length-missing.length,changed,missing,inputs};
await fs.writeFile(evidence+'/semantic-repair.json',JSON.stringify(report,null,2)+'\n');
if(process.argv.includes('--write')){delete manifest.playback;await fs.writeFile(root+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');}
console.log(JSON.stringify({entries:report.entries,exactBound:report.exactBound,changed:changed.length,missing:missing.length,providerRequests:0,write:process.argv.includes('--write')}));
