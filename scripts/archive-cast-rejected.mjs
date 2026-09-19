/** Preserve unreferenced generation artifacts outside the finite runtime packet. */
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('public/audio/cast'),evidence=path.resolve('evidence/cast-audio-20260919'),archive=path.resolve('.cache/cast-audio-rejected-stream-v1');
const manifest=JSON.parse(await fs.readFile(path.join(root,'manifest.json'),'utf8'));
if(manifest.entries.some(e=>!e.uri||!e.wavUri))throw Error('Archive only after complete runtime binding');
const keep=new Set(manifest.entries.flatMap(e=>[path.basename(e.uri),path.basename(e.wavUri)]));await fs.mkdir(archive,{recursive:true});let count=0;
for(const file of await fs.readdir(root))if(/^[a-f0-9]{64}\.(mp3|wav)$/.test(file)&&!keep.has(file)){await fs.rename(path.join(root,file),path.join(archive,file));count++;}
const retainedHashes=new Set(manifest.entries.map(e=>e.sha256));
for(const file of await fs.readdir(path.join(evidence,'batches'))){let rejected=file.endsWith('.invalid-stream-v1.json');if(/^[a-f0-9]{64}\.json$/.test(file)){const receipt=JSON.parse(await fs.readFile(path.join(evidence,'batches',file),'utf8'));rejected=receipt.streamAssembly!=='all-audio-deltas-v2';}else if(file.endsWith('.wav.json')){const receipt=JSON.parse(await fs.readFile(path.join(evidence,'batches',file),'utf8'));rejected=!retainedHashes.has(receipt.sourceSha256);}if(rejected){await fs.rename(path.join(evidence,'batches',file),path.join(archive,file));count++;}}
try{await fs.rename(path.join(evidence,'manifest-invalid-stream-v1.json'),path.join(archive,'manifest-invalid-stream-v1.json'));count++;}catch(error){if(error.code!=='ENOENT')throw error;}
console.log(JSON.stringify({preservedOutsideRuntime:count,archive:'.cache/cast-audio-rejected-stream-v1'}));
