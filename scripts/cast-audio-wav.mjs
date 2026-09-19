/** Decode the exact saved MP3 once to a PCM WAV alternate; never calls a provider. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH??=path.resolve('.cache/browsers');
const {chromium}=await import('@playwright/test');
const root='public/audio/cast',evidence='evidence/cast-audio-20260919',sha=x=>createHash('sha256').update(x).digest('hex');
const browser=await chromium.launch({headless:true}),page=await browser.newPage(),records=new Map();let manifest;
try{
 while(true){
 try{manifest=JSON.parse(await fs.readFile(root+'/manifest.json','utf8'));}catch{await new Promise(resolve=>setTimeout(resolve,1000));continue;}
 for(const hash of new Set(manifest.entries.filter(e=>e.uri).map(e=>e.sha256))){
  const mp3=await fs.readFile(root+'/'+hash+'.mp3');if(sha(mp3)!==hash)throw Error('MP3 source changed');
  const recordPath=evidence+'/batches/'+hash+'.wav.json';let result;try{result=JSON.parse(await fs.readFile(recordPath,'utf8'));if(sha(await fs.readFile(root+'/'+result.sha256+'.wav'))!==result.sha256)throw Error('WAV binding mismatch');}catch(error){if(error.code!=='ENOENT')throw error;}
  if(!result){
   const decoded=await page.evaluate(async base64=>{const binary=atob(base64),bytes=Uint8Array.from(binary,c=>c.charCodeAt(0)),context=new AudioContext(),audio=await context.decodeAudioData(bytes.buffer),samples=audio.length,channels=audio.numberOfChannels,rate=audio.sampleRate,pcm=new Uint8Array(samples*channels*2),view=new DataView(pcm.buffer);for(let c=0;c<channels;c++){const data=audio.getChannelData(c);for(let i=0;i<samples;i++){const value=Math.max(-1,Math.min(1,data[i]));view.setInt16((i*channels+c)*2,Math.round(value*(value<0?32768:32767)),true);}}let encoded='';for(let i=0;i<pcm.length;i+=32768)encoded+=String.fromCharCode(...pcm.subarray(i,i+32768));await context.close();return {pcm:btoa(encoded),samples,channels,rate,duration:audio.duration};},mp3.toString('base64'));
   const pcm=Buffer.from(decoded.pcm,'base64'),audio=Buffer.alloc(44+pcm.length);audio.write('RIFF',0);audio.writeUInt32LE(36+pcm.length,4);audio.write('WAVE',8);audio.write('fmt ',12);audio.writeUInt32LE(16,16);audio.writeUInt16LE(1,20);audio.writeUInt16LE(decoded.channels,22);audio.writeUInt32LE(decoded.rate,24);audio.writeUInt32LE(decoded.rate*decoded.channels*2,28);audio.writeUInt16LE(decoded.channels*2,32);audio.writeUInt16LE(16,34);audio.write('data',36);audio.writeUInt32LE(pcm.length,40);pcm.copy(audio,44);
   result={sourceSha256:hash,sha256:sha(audio),bytes:audio.length,duration:decoded.duration,sampleRate:decoded.rate,channels:decoded.channels,format:'PCM16 WAV from native MP3 decode at the browser AudioContext sample rate'};await fs.writeFile(root+'/'+result.sha256+'.wav',audio);await fs.writeFile(recordPath,JSON.stringify(result,null,2)+'\n');
  }
  if(result.format!=='PCM16 WAV from native MP3 decode at the browser AudioContext sample rate'){result.format='PCM16 WAV from native MP3 decode at the browser AudioContext sample rate';await fs.writeFile(recordPath,JSON.stringify(result,null,2)+'\n');}
  for(const entry of manifest.entries.filter(e=>e.sha256===hash)){if(entry.end>result.duration+.08)throw Error('Timestamp exceeds decoded recording: '+entry.id);Object.assign(entry,{wavUri:'/audio/cast/'+result.sha256+'.wav',wavSha256:result.sha256,wavBytes:result.bytes,batchDuration:result.duration});}
  if(!records.has(hash))console.log(JSON.stringify({decoded:records.size+1,total:new Set(manifest.entries.filter(e=>e.uri).map(e=>e.sha256)).size,seconds:result.duration}));records.set(hash,result);
 }
 let generating=false;try{await fs.access(evidence+'/generation.lock');generating=true;}catch{}
 if(!generating){const latest=JSON.parse(await fs.readFile(root+'/manifest.json','utf8'));if(latest.entries.length!==manifest.entries.length||latest.entries.some((entry,i)=>entry.uri!==manifest.entries[i]?.uri||entry.start!==manifest.entries[i]?.start||entry.end!==manifest.entries[i]?.end))continue;break;}await new Promise(resolve=>setTimeout(resolve,4000));
 }
 manifest.recordings={};for(const file of await fs.readdir(evidence+'/batches'))if(/^[a-f0-9]{64}\.json$/.test(file)){const receipt=JSON.parse(await fs.readFile(evidence+'/batches/'+file,'utf8'));if(receipt.streamAssembly==='all-audio-deltas-v2')manifest.recordings[receipt.sha256]=receipt.alignment;}
 await fs.writeFile(root+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');await fs.writeFile(evidence+'/wav-alternates.json',JSON.stringify([...records.values()],null,2)+'\n');
}finally{await browser.close();}
