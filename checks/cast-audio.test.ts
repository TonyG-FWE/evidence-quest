import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {CastNarrator} from '../server/castNarrator.js';
import {selectedCast} from '../src/garden/voiceTypes.js';
import {authoredVoiceSpans,routeAuthoredText} from '../src/garden/sourceVoiceRouting.js';
import {literaryParagraphs} from '../src/garden/literaryContent.js';
import {narrativeDialogue} from '../src/garden/narrativeDialogue.js';
const signal=()=>new AbortController().signal;
const own={text:'The roof kept the flour dry.',speaker:'sol',origin:'child-draft',revision:7,explicitListen:true};
const wav=()=>{const b=Buffer.alloc(100);b.write('RIFF');b.write('WAVE',8);return new Uint8Array(b);};
test('All four exact enriched welcome paragraphs have complete approved Jo recordings, including natural return wording',async()=>{
 const manifest=JSON.parse(await readFile('public/audio/cast/manifest.json','utf8')) as {entries:{text:string;speaker:string;voiceId:string;uri?:string;wavUri?:string;clip?:{uri:string}}[]};
 const keys=['At SparkFest, children share stories and show things they have made. The Garden Adventure is one of the stories you can step into.','Meet Loop, our rolling projector. Loop shines pictures onto a screen to bring our paper stories to life.','In this adventure, you guide Pip as he visits Grandma’s garden. Read what people say, choose how Pip responds, and help him decide what to do.','When Pip’s adventure ends, we’ll return here. Loop will show the ending you helped shape.'];
 for(const key of keys){const entry=manifest.entries.find(entry=>entry.speaker==='jo'&&entry.text===narrativeDialogue[key]);assert.ok(entry?.uri&&entry.wavUri,key);assert.equal(entry.voiceId,selectedCast.jo);assert.match(entry.clip?.uri??'',/^\/audio\/cast\/clips\/[a-f0-9]{64}\.wav$/);}
});
test('Exact private speaker spans reconstruct every unchanged source paragraph',()=>{
 for(const [source,paragraphs]of Object.entries(literaryParagraphs))for(const [paragraph,text]of paragraphs.entries()){
  const spans=authoredVoiceSpans.filter(s=>s.source===source&&s.paragraph===paragraph);assert.equal(spans.map(s=>s.text).join(''),text);
  for(const s of spans){assert.equal(text.slice(s.start,s.end),s.text);assert.ok(Object.hasOwn(selectedCast,s.speaker));}
  assert.equal(routeAuthoredText(text).map(s=>s.text).join(''),text);
 }
 assert.ok(routeAuthoredText(literaryParagraphs.story[2]!).some(s=>s.speaker==='boy'));
 assert.ok(routeAuthoredText(literaryParagraphs.sol[1]!).some(s=>s.speaker==='rina'));
});
test('Own-writing selected speech is explicit, exact-revision bound, free-model only and privately cached',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-cast-'));let calls=0;
 const request:typeof fetch=async(url,options)=>{calls++;assert.equal(url,'https://api.fish.audio/v1/tts');assert.equal(new Headers(options?.headers).get('model'),'s2.1-pro-free');const body=JSON.parse(String(options?.body));assert.equal(body.text,own.text);assert.equal(body.reference_id,selectedCast.sol);assert.equal(body.format,'wav');return new Response(wav(),{headers:{'Content-Type':'audio/wav'}});};
 try{
  const service=new CastNarrator({root,host:'127.0.0.1',enabled:true,key:'synthetic-test-key',fetch:request});
  for(const input of [{...own,explicitListen:false},{...own,origin:'authored-display'},{...own,speaker:'unapproved'},{...own,revision:undefined},{...own,extra:'no'}])assert.equal((await service.read(input,signal())).status,400);
  assert.equal((await service.read({...own,cacheOnly:true},signal())).status,503);assert.equal(calls,0);
  assert.equal((await service.read(own,signal())).cached,false);assert.equal(calls,1);
  const offline=new CastNarrator({root,host:'127.0.0.1',enabled:false,fetch:request});assert.equal((await offline.read(own,signal())).cached,true);
  assert.equal((await offline.read({...own,revision:8},signal())).status,503);assert.equal((await offline.read({...own,text:own.text+' '},signal())).status,503);assert.equal(calls,1);
  const ledger=await readFile(join(root,'.cache/cast-audio-dynamic/attempts.jsonl'),'utf8');assert.doesNotMatch(ledger,/synthetic-test-key|The roof kept/);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('Generated-feedback origin remains distinct; abort and nonloopback disable provider admission',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-cast-'));let calls=0;const request:typeof fetch=async()=>{calls++;return new Response(wav(),{headers:{'Content-Type':'audio/wav'}});};
 try{
  const unsafe=new CastNarrator({root,host:'0.0.0.0',enabled:true,key:'test',fetch:request});assert.equal((await unsafe.read(own,signal())).status,503);
  const service=new CastNarrator({root,host:'127.0.0.1',enabled:true,key:'test',fetch:request}),controller=new AbortController();controller.abort();assert.equal((await service.read(own,controller.signal)).status,499);assert.equal(calls,0);
  assert.equal((await service.read({...own,origin:'generated-feedback'},signal())).status,200);assert.equal((await service.read({...own,cacheOnly:true},signal())).status,503);assert.equal(calls,1);
 }finally{await rm(root,{recursive:true,force:true});}
});
