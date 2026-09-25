/** Native decoding of complete, single-word MP3s. No provider calls or word cuts. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {audioWords,pcmWave} from './cast-audio-identity.mjs';
const root='public/audio/cast',directory='evidence/cast-audio-20260919/batches',sha=value=>createHash('sha256').update(value).digest('hex');
process.env.PLAYWRIGHT_BROWSERS_PATH??=path.resolve('.cache/browsers');
const {chromium}=await import('@playwright/test'),browser=await chromium.launch({headless:true}),page=await browser.newPage(),decoded=[];
// Freeze completed receipts before reading: generation may still be finishing other words.
const history=await fs.readFile('evidence/cast-audio-20260919/attempts.jsonl','utf8'),completeLines=history.slice(0,history.lastIndexOf('\n')).split('\n').filter(Boolean).map(line=>JSON.parse(line));
const completed=new Set(completeLines.filter(row=>row.purpose==='isolated-word-v1'&&row.event==='completed').map(row=>row.id));
try{
 for(const file of (await fs.readdir(directory)).filter(file=>/^[a-f0-9]{64}\.json$/.test(file)&&completed.has(file.slice(0,-5)))){
  const receipt=JSON.parse(await fs.readFile(directory+'/'+file,'utf8'));if(receipt.purpose!=='isolated-word-v1')continue;
  const mp3=await fs.readFile(root+'/'+receipt.sha256+'.mp3');if(sha(mp3)!==receipt.sha256||audioWords(receipt.text).length!==1)throw Error('Changed single-word source');
  const wavReceipt=directory+'/'+receipt.sha256+'.wav.json';let result;
  try{result=JSON.parse(await fs.readFile(wavReceipt,'utf8'));if(result.sourceSha256!==receipt.sha256||sha(await fs.readFile(root+'/'+result.sha256+'.wav'))!==result.sha256)throw Error('Changed complete word PCM');}catch(error){if(error.code!=='ENOENT')throw error;}
  if(!result){
   const value=await page.evaluate(async base64=>{const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0)),context=new AudioContext(),audio=await context.decodeAudioData(bytes.buffer),samples=audio.length,channels=audio.numberOfChannels,rate=audio.sampleRate,pcm=new Uint8Array(samples*channels*2),view=new DataView(pcm.buffer);for(let c=0;c<channels;c++)for(let i=0,data=audio.getChannelData(c);i<samples;i++){const v=Math.max(-1,Math.min(1,data[i]));view.setInt16((i*channels+c)*2,Math.round(v*(v<0?32768:32767)),true);}let encoded='';for(let i=0;i<pcm.length;i+=32768)encoded+=String.fromCharCode(...pcm.subarray(i,i+32768));await context.close();return {pcm:btoa(encoded),samples,channels,rate};},mp3.toString('base64'));
   const data=Buffer.from(value.pcm,'base64'),wav=Buffer.alloc(44+data.length);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(value.channels,22);wav.writeUInt32LE(value.rate,24);wav.writeUInt32LE(value.rate*value.channels*2,28);wav.writeUInt16LE(value.channels*2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(data.length,40);data.copy(wav,44);
   const duration=value.samples/value.rate;if(duration<=.1||duration>6)throw Error('Implausible complete-word duration');
   result={sourceSha256:receipt.sha256,sha256:sha(wav),bytes:wav.length,duration,sampleRate:value.rate,channels:value.channels,format:'PCM16 WAV from native MP3 decode at the browser AudioContext sample rate'};
   await fs.writeFile(root+'/'+result.sha256+'.wav',wav,{flag:'wx'});await fs.writeFile(wavReceipt,JSON.stringify(result,null,2)+'\n',{flag:'wx'});
  }
  decoded.push({word:audioWords(receipt.text)[0].text,...result});
 }
}finally{await browser.close();}
const order=['have','promised','the','a','and','to','of','we','obligation','hesitated'],parts=[];let format;
for(const word of order){const entry=decoded.find(e=>e.word===word);if(!entry)throw Error('Missing pilot word: '+word);const wav=await fs.readFile(root+'/'+entry.sha256+'.wav'),pcm=pcmWave(wav);format??={wav,pcm};if(pcm.sampleRate!==format.pcm.sampleRate||pcm.channels!==format.pcm.channels)throw Error('Pilot formats differ');parts.push(wav.subarray(pcm.offset,pcm.offset+pcm.length),Buffer.alloc(Math.round(pcm.sampleRate*.6)*pcm.blockAlign));}
const data=Buffer.concat(parts),sample=Buffer.alloc(44+data.length);format.wav.copy(sample,0,0,44);sample.writeUInt32LE(sample.length-8,4);sample.writeUInt32LE(data.length,40);data.copy(sample,44);await fs.writeFile('.cache/nerdy-isolated-word-sample.wav',sample);
const report={schema:'eq.word-recordings-decode.v1',at:new Date().toISOString(),providerRequests:0,decoded:decoded.length,words:decoded,sample:{file:'.cache/nerdy-isolated-word-sample.wav',sha256:sha(sample),order,duration:pcmWave(sample).samples/format.pcm.sampleRate},scope:'Every complete provider recording, native decoded without alignment slicing. Audible quality requires the human listening checkpoint.'};
await fs.writeFile('evidence/nerdy-demo-20260924/word-recordings-decode.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({decoded:decoded.length,sample:report.sample}));
