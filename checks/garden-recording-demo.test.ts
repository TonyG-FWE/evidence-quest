import test from 'node:test';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {mkdtemp,rm,mkdir,writeFile,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {gardenRecordingDemo} from '../server/gardenRecordingDemo.js';
import type {GardenRequest} from '../server/garden.js';
import {sourceComponentsFor} from '../src/garden/content.js';
const request=(id:string):GardenRequest=>({contract:1,requestId:id,activity:'sol-ending',revision:2,draftRevision:1,text:'What happened afterward?',narrativeEdition:'literary-20260916',exposed:[...sourceComponentsFor({narrativeEdition:'literary-20260916'}).keys()].filter(k=>k.startsWith('GA.SRC.SOL.')||k.startsWith('GA.SRC.LATER.'))});
const bindHistory=async(root:string)=>{const ledgers=[];for(const name of ['voice-ai-demo-20260918','demo-ai-20260919']){const file='evidence/'+name+'/openai-attempts.jsonl',bytes=await readFile(join(root,file));ledgers.push({file,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),mode:'append-only'});}await mkdir(join(root,'assets','demo'),{recursive:true});await writeFile(join(root,'assets','demo','operational-ledgers.json'),JSON.stringify({schema:'eq.operational-ledger-baseline.v1',ledgers}));};
const seedHistory=async(root:string)=>{for(const name of ['voice-ai-demo-20260918','demo-ai-20260919']){const directory=join(root,'evidence',name);await mkdir(directory,{recursive:true});await writeFile(join(directory,'openai-attempts.jsonl'),JSON.stringify({event:'reserved',requestId:'known-'+name,reservedUSD:0.0001})+'\n');}await bindHistory(root);};
const response=()=>new Response(JSON.stringify({model:'gpt-5.6-luna',status:'completed',usage:{input_tokens:800,output_tokens:45},output:[{type:'message',status:'completed',content:[{type:'output_text',text:JSON.stringify({status:'clarify',feedback:'What did keeping the flour dry allow Rina to do?',scene:null,refs:[]})}]}]}),{status:200});
test('Recording allowance preserves prior reservations, survives restart, and never alters the prior ledger',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));let calls=0;const fetcher:typeof fetch=async()=>{calls++;return response();};
 try{
  await seedHistory(root);
  const previous=join(root,'evidence','voice-ai-demo-20260918');await mkdir(previous,{recursive:true});const old=JSON.stringify({event:'reserved',requestId:'old',reservedUSD:9.99})+'\n';await writeFile(join(previous,'openai-attempts.jsonl'),old);await bindHistory(root);
  const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher});assert.equal((await session.provider!(request('new'),new AbortController().signal))?.status,'clarify');
  const restarted=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher});assert.equal(await restarted.provider!(request('new'),new AbortController().signal),null);
  for(let i=0;i<12;i++)await restarted.provider!(request('next-'+i),new AbortController().signal);
  assert.ok(calls>0&&calls<12);assert.ok((await restarted.snapshot()).reservedUSD<=10);assert.equal(await readFile(join(previous,'openai-attempts.jsonl'),'utf8'),old);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('Recording feedback fails closed for malformed ledgers and rejects non-loopback or implicit activation',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));let calls=0;
 try{
  await seedHistory(root);
  const offline=await gardenRecordingDemo({enabled:false,root,host:'0.0.0.0'});assert.equal(offline.provider,undefined);
  await assert.rejects(()=>gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'0.0.0.0'}));
  const directory=join(root,'evidence','demo-ai-20260919');await mkdir(directory,{recursive:true});await writeFile(join(directory,'openai-attempts.jsonl'),'{"event":"reserved","reservedUSD":-1}\n');
  const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher:async()=>{calls++;return response();}});assert.equal(await session.available(),false);assert.equal(await session.provider!(request('blocked'),new AbortController().signal),null);assert.equal(calls,0);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('Recording feedback serializes attempts and keeps reservations after abort or provider error without retry',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));let calls=0,release!:()=>void;const wait=new Promise<void>(resolve=>release=resolve);
 try{
  await seedHistory(root);
  const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher:async()=>{calls++;await wait;throw Error('synthetic unavailable');}});
  const first=session.provider!(request('first'),new AbortController().signal);while(!calls)await new Promise(resolve=>setTimeout(resolve,1));assert.equal(await session.provider!(request('second'),new AbortController().signal),null);release();assert.equal(await first,null);
  assert.equal(calls,1);assert.equal((await session.snapshot()).attempts,2);assert.ok((await session.snapshot()).reservedUSD>0);
  const aborted=new AbortController();aborted.abort();assert.equal(await session.provider!(request('cancelled'),aborted.signal),null);assert.equal(calls,1);
 }finally{release();await rm(root,{recursive:true,force:true});}
});
test('A clarification that also chooses a picture remains rejected and is diagnosed without saving writing',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));
 try{
  await seedHistory(root);
  const invalid=await response().json();invalid.output[0].content[0].text=JSON.stringify({status:'clarify',feedback:'What happened?',scene:'bread',refs:[]});
  const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher:async()=>new Response(JSON.stringify(invalid),{status:200})});
  assert.equal(await session.provider!(request('invalid-scene'),new AbortController().signal),null);
  const log=await readFile(join(root,'evidence','demo-ai-20260919','openai-attempts.jsonl'),'utf8');assert.equal(log.includes(request('x').text),false);
  const diagnostic=log.trim().split('\n').map(line=>JSON.parse(line)).find(row=>row.event==='response').diagnostic;
  assert.equal(diagnostic.feedbackStatus,'clarify');assert.equal(diagnostic.scene,'bread');assert.equal(diagnostic.contractValid,false);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('Missing, empty, duplicate and unreserved accounting never permits a provider request',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));let calls=0;
 try{await seedHistory(root);const directory=join(root,'evidence','demo-ai-20260919'),ledger=join(directory,'openai-attempts.jsonl');
 const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher:async()=>{calls++;return response();}});
 for(const content of ['',JSON.stringify({event:'response',requestId:'orphan',costUSD:0.1})+'\n',[1,2].map(()=>JSON.stringify({event:'reserved',requestId:'same',reservedUSD:0.1})).join('\n')]){
  await writeFile(ledger,content);assert.equal(await session.available(),false);assert.equal(await session.provider!(request('blocked'),new AbortController().signal),null);
 }
 await rm(ledger);assert.equal(await session.available(),false);assert.equal(await session.provider!(request('missing'),new AbortController().signal),null);assert.equal(calls,0);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('A live recording session rejects reverting completed spending to a still-valid original baseline',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));let calls=0;
 try{
  await seedHistory(root);const ledger=join(root,'evidence','demo-ai-20260919','openai-attempts.jsonl'),baseline=await readFile(ledger);
  const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher:async()=>{calls++;return response();}});
  assert.equal((await session.provider!(request('spent'),new AbortController().signal))?.status,'clarify');
  const complete=await readFile(ledger);assert.ok(complete.length>baseline.length);
  await writeFile(ledger,baseline);assert.equal(await session.available(),false);await assert.rejects(session.snapshot(),/spending history changed/);
  assert.equal(await session.provider!(request('cannot-refund'),new AbortController().signal),null);assert.equal(calls,1);
  // Restoring the exact observed history permits further genuine appends.
  await writeFile(ledger,complete);assert.equal(await session.available(),true);
  assert.equal((await session.provider!(request('next-valid'),new AbortController().signal))?.status,'clarify');assert.equal(calls,2);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('Own reservation advances the observed floor before transmission without a later status read',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));let calls=0,release!:()=>void,transmitted!:()=>void;
 const released=new Promise<void>(resolve=>release=resolve),started=new Promise<void>(resolve=>transmitted=resolve);
 try{
  await seedHistory(root);const ledger=join(root,'evidence','demo-ai-20260919','openai-attempts.jsonl'),baseline=await readFile(ledger);
  const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher:async()=>{calls++;transmitted();await released;return response();}});
  const first=session.provider!(request('reserved-first'),new AbortController().signal);await started;
  assert.equal(await session.provider!(request('concurrent'),new AbortController().signal),null);
  await writeFile(ledger,baseline);release();assert.equal(await first,null);
  assert.equal(await session.available(),false);assert.equal(await session.provider!(request('after-truncation'),new AbortController().signal),null);assert.equal(calls,1);
  assert.deepEqual(await readFile(ledger),baseline); // Rejected histories are not recreated or overwritten.
 }finally{release();await rm(root,{recursive:true,force:true});}
});

test('Validated external appends advance both ledger floors and same-length rewrites fail closed',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-recording-'));let calls=0;
 try{
  await seedHistory(root);const ledger=join(root,'evidence','voice-ai-demo-20260918','openai-attempts.jsonl'),baseline=await readFile(ledger,'utf8');
  const session=await gardenRecordingDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher:async()=>{calls++;return response();}});
  const extra=JSON.stringify({event:'reserved',requestId:'added-a',reservedUSD:0.0001})+'\n';await writeFile(ledger,baseline+extra);
  const observed=await session.snapshot();assert.ok(observed.priorReservedUSD>0.0001);
  await writeFile(ledger,baseline+extra.replace('added-a','added-b'));assert.equal(await session.available(),false);
  assert.equal(await session.provider!(request('rewritten-history'),new AbortController().signal),null);assert.equal(calls,0);
 }finally{await rm(root,{recursive:true,force:true});}
});
