import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {DefinitionNarrator} from '../server/definitionNarrator.js';
import {definitionCatalogue,definitionNarrator} from '../src/garden/definitionCatalogue.js';
const id=Object.keys(definitionCatalogue)[0]!,signal=()=>new AbortController().signal;

test('Meaning narration sends only the exact authored definition to the approved free narrator and reuses its saved audio',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-definition-'));let calls=0;
 const provider:typeof fetch=async(url,options)=>{
  calls++;assert.equal(url,'https://api.fish.audio/v1/tts');
  const headers=new Headers(options?.headers);assert.equal(headers.get('model'),'s2.1-pro-free');
  const body=JSON.parse(String(options?.body));assert.equal(body.reference_id,'07a44a6958304fa28cef60b0d4023c04');assert.equal(body.text,definitionCatalogue[id]);
  return new Response(new Uint8Array(768).fill(7),{headers:{'Content-Type':'audio/mpeg'}});
 };
 try{
  const service=new DefinitionNarrator({root,host:'127.0.0.1',enabled:true,key:'synthetic-not-live',fetch:provider});
  assert.equal((await service.read({text:'A child wrote this'},signal())).status,400);
  assert.equal((await service.read({id,text:'Unapproved text'},signal())).status,400);
  assert.equal((await service.read({id:'constructor'},signal())).status,400);assert.equal(calls,0);
  const first=await service.read({id},signal());assert.equal(first.status,200);assert.equal(first.cached,false);
  const offline=new DefinitionNarrator({root,host:'127.0.0.1',enabled:false,fetch:provider});
  const replay=await offline.read({id},signal());assert.equal(replay.cached,true);assert.deepEqual(replay.audio,first.audio);assert.equal(calls,1);
  const ledger=await readFile(join(root,'evidence/word-narrator-20260918/cache',definitionNarrator.voiceId+'-free-v1','attempts.jsonl'),'utf8');assert.doesNotMatch(ledger,/synthetic-not-live/);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('Meaning narration remains offline by default and rejects pre-canceled or duplicate requests without provider retries',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-definition-'));let calls=0,release:(()=>void)|undefined;
 const provider:typeof fetch=async()=>{calls++;await new Promise<void>(resolve=>{release=resolve;});return new Response('Unavailable',{status:503});};
 try{
  for(const [enabled,host]of [[false,'127.0.0.1'],[true,'0.0.0.0']] as const){const service=new DefinitionNarrator({root,enabled,host,key:'synthetic',fetch:provider});assert.equal((await service.read({id},signal())).status,503);}
  const service=new DefinitionNarrator({root,host:'127.0.0.1',enabled:true,key:'synthetic',fetch:provider}),cancel=new AbortController();cancel.abort();assert.equal((await service.read({id},cancel.signal)).status,499);assert.equal(calls,0);
  const pending=service.read({id},signal());while(!release)await new Promise(resolve=>setTimeout(resolve,1));
  assert.equal((await service.read({id},signal())).status,429);release();assert.equal((await pending).status,503);assert.equal(calls,1);
 }finally{await rm(root,{recursive:true,force:true});}
});
