/** Finite pronunciation replacement plan. No network, credentials or provider request. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {isPronunciationEntry,pronunciationKey} from './cast-catalogue-text.mjs';
import {audioWords} from './cast-audio-identity.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex'),file='public/audio/cast/manifest.json',raw=await fs.readFile(file),manifest=JSON.parse(raw),groups=new Map();
for(const entry of manifest.entries.filter(isPronunciationEntry)){
 const key=pronunciationKey(entry.text),group=groups.get(key)??{word:key,entryIds:[],spellings:[]};group.entryIds.push(entry.id);if(!group.spellings.includes(entry.text))group.spellings.push(entry.text);groups.set(key,group);
}
const pilot=['have','promised','the','a','and','to','of','we','obligation','hesitated'];
const words=[...groups.values()].sort((a,b)=>a.word.localeCompare(b.word,'en')).map(group=>{
 const word=group.word==='i'?'I':group.word,text=word+'.',voiceId=manifest.cast.narrator,model=manifest.model,speed=manifest.speed;
 if(audioWords(text).length!==1)throw Error('Not a single lexical word');
 return {...group,text,id:sha(JSON.stringify({purpose:'isolated-word-v1',text,voiceId,model,speed})),pilot:pilot.includes(group.word)};
});
const plan={schema:'eq.word-recordings-plan.v1',at:new Date().toISOString(),authority:'docs/game-review/DEMO-REPAIR-20260919.md: Repair only missing or defective authored recordings using the approved free Fish model.',reason:'Human review rejected sentence-derived word clips, including adjacent speech and SVG-code contamination. Each replacement is one complete single-word recording; no forced alignment or sentence slicing.',model:manifest.model,voiceId:manifest.cast.narrator,speaker:'narrator',speed:manifest.speed,expectedChargeUSD:0,maximumRequests:words.length,automaticRetries:0,manifestSha256:sha(raw),words};
if(plan.model!=='s2.1-pro-free'||words.length>1826||pilot.some(word=>!groups.has(word)))throw Error('Unexpected fixed pronunciation scope');
await fs.mkdir('evidence/nerdy-demo-20260924',{recursive:true});const output=JSON.stringify(plan,null,2)+'\n';await fs.writeFile('evidence/nerdy-demo-20260924/word-recordings-plan.json',output);
console.log(JSON.stringify({words:words.length,entries:words.reduce((n,w)=>n+w.entryIds.length,0),pilot:pilot.length,expectedChargeUSD:0,planSha256:sha(output)}));
