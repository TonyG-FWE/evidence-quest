import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {gardenDemo} from '../server/gardenDemo.js';
import {GardenFeedbackService,type GardenRequest} from '../server/garden.js';
import {sourceComponentsFor} from '../src/garden/content.js';
const request=(id:string):GardenRequest=>({contract:1,requestId:id,activity:'sol-ending',revision:2,draftRevision:1,text:'Rina baked the bread.',narrativeEdition:'literary-20260916',exposed:[...sourceComponentsFor({narrativeEdition:'literary-20260916'}).keys()].filter(k=>k.startsWith('GA.SRC.SOL.')||k.startsWith('GA.SRC.LATER.'))});
const fixtureResponse=(q:GardenRequest)=>new Response(JSON.stringify({model:'gpt-5.6-luna',status:'completed',usage:{input_tokens:1200,output_tokens:70},output:[{type:'message',status:'completed',content:[{type:'output_text',text:JSON.stringify({status:'supported',feedback:'The dry flour let Rina bake the bread.',scene:'bread',refs:q.exposed.slice(0,1)})}]}]}),{status:200});
test('Garden demo stays offline by default and rejects non-loopback activation',async()=>{
 const demo=await gardenDemo({enabled:false,root:'.',host:'0.0.0.0'});assert.equal(demo.provider,undefined);assert.equal(await demo.available(),false);
 await assert.rejects(()=>gardenDemo({enabled:true,key:'synthetic',root:'.',host:'0.0.0.0'}));
});
test('Garden demo preserves two-attempt cap through duplicate IDs and restart; records real usage fields',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-demo-'));let calls=0;
 const fetcher:typeof fetch=async(_url,init)=>{calls++;const body=JSON.parse(String(init?.body));assert.equal(body.model,'gpt-5.6-luna');assert.deepEqual(body.reasoning,{effort:'none'});assert.equal(body.store,false);return fixtureResponse(request('a'));};
 try{
  const demo=await gardenDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher});
  const service=new GardenFeedbackService(demo.provider);assert.equal((await service.handle(request('a')))?.status,'supported');
  assert.equal((await service.handle(request('a')))?.status,'busy');
  const restarted=await gardenDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher});
  assert.equal(await restarted.provider!(request('a'),new AbortController().signal),null);
  await restarted.provider!(request('b'),new AbortController().signal);
  assert.equal(await restarted.provider!(request('c'),new AbortController().signal),null);
  assert.equal(calls,2);assert.equal(await restarted.available(),false);
  const budget=await restarted.snapshot();assert.equal(budget.attempts,2);assert.ok(budget.reservedUSD<.10);assert.ok(budget.reportedCostUSD>0);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('Garden demo serializes concurrent providers and never retries failures',async()=>{
 const root=await mkdtemp(join(tmpdir(),'eq-demo-'));let calls=0,release!:()=>void;
 const waiting=new Promise<void>(resolve=>release=resolve);
 const fetcher:typeof fetch=async()=>{calls++;await waiting;return new Response('{}',{status:429});};
 try{
  const demo=await gardenDemo({enabled:true,key:'synthetic',root,host:'127.0.0.1',fetcher});
  const first=demo.provider!(request('a'),new AbortController().signal);
  while(!calls)await new Promise(resolve=>setTimeout(resolve,1));
  assert.equal(await demo.provider!(request('b'),new AbortController().signal),null);
  release();assert.equal(await first,null);assert.equal(calls,1);assert.equal((await demo.snapshot()).attempts,1);
  const abort=new AbortController();abort.abort();assert.equal(await demo.provider!(request('c'),abort.signal),null);assert.equal(calls,1);
 }finally{release();await rm(root,{recursive:true,force:true});}
});
