import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {randomUUID} from 'node:crypto';
import {CoachService,requestBody,MODEL,boundedJSON} from '../.cache/checks/server/coach.js';
import {prepared} from '../.cache/checks/src/coach/authored.js';
import {openLedger} from './attempt-ledger.mjs';
import {fixtures,fixtureRequest,fixturePath,fixtureSha256,judge,sha} from './fixtures.mjs';
const args=process.argv.slice(2).join(' '),live=args==='--mode adult-evaluation --max-attempts 75';
if(!live&&args!=='--mode preflight')throw Error('Use explicit --mode preflight or --mode adult-evaluation --max-attempts 75.');
const dir='evidence/er13/live-evaluation';await mkdir(dir,{recursive:true});
const preflight=fixtures.map(f=>{const {q,expected,aliases}=fixtureRequest(f);return {id:f.id,preset:f.preset,explanation:q.explanation,context:q.context,expected,aliases,local:expected.apiCalls===0};});
const normalized=preflight.slice(0,5).map(x=>{const c=structuredClone(x.context);delete c.visitId;return c;});for(const c of normalized)assert.deepEqual(c,normalized[0],'E01–E05 share exactly the same semantic context');
const local=fixtures.filter(f=>f.expected.apiCalls===0).map(f=>{const {q}=fixtureRequest(f),help=prepared(q.context,{direct:f.id.endsWith('E25')});assert.equal(help.contentIds[0],f.expected.contentRefs[0]);return {id:f.id,apiCalls:0,help};});
const sourceHashes=Object.fromEntries(await Promise.all(['server/coach.ts','contracts/contracts.schema.json','content/authored.json','evaluation/live.mjs','evaluation/fixtures.mjs','evaluation/attempt-ledger.mjs'].map(async p=>[p,sha(await readFile(p,'utf8'))])));
await writeFile(dir+'/preflight.json',JSON.stringify({checkedAt:new Date().toISOString(),fixturePath,fixtureSha256,sourceHashes,model:MODEL,mode:'synthetic preflight; zero API calls',contexts:preflight,local},null,2)+'\n');
if(!live){console.log('27 exact fixture contexts validated; E01–E05 equivalent; empty/direct local cases pass; zero API calls.');process.exit(0);}
if(!process.env.OPENAI_API_KEY)throw Error('Server-only evaluation key is missing.');
if(process.env.COACH_MODE==='child-live')throw Error('Child-live mode is prohibited.');
const ledger=await openLedger(dir+'/attempts.jsonl');
let current=null,server;const runId=randomUUID(),startedAt=new Date().toISOString(),trials=[];
const safeId=value=>typeof value==='string'&&/^[a-zA-Z0-9._:-]{1,200}$/.test(value)?value:null;
const guardedFetch=async(url,options)=>{
  if(url!=='https://api.openai.com/v1/responses'||options?.method!=='POST'||!current)throw Error('Unexpected evaluation provider operation.');
  const body=JSON.parse(options.body);assert.equal(body.model,MODEL);assert.equal(body.store,false);assert(!body.tools&&!body.previous_response_id);
  current.attempt=await ledger.reserve({runId,fixtureId:current.id,trial:current.trial,model:MODEL,bodySha256:sha(body)});
  try{
    const response=await fetch(url,options);current.httpStatus=response.status;
    const raw=await boundedJSON(response.clone(),262144).catch(()=>null);
    current.responseId=safeId(raw?.id);current.returnedModel=safeId(raw?.model);current.providerStatus=safeId(raw?.status);
    if(raw?.usage&&typeof raw.usage==='object')current.usage=Object.fromEntries(Object.entries(raw.usage).filter(([k,v])=>/tokens/.test(k)&&typeof v==='number'&&Number.isFinite(v)));
    if(!response.ok){current.error={type:safeId(raw?.error?.type),code:safeId(raw?.error?.code)};await ledger.halt(`Provider HTTP ${response.status}; ${current.error.code??'unspecified'}; no automatic retry.`);}
    const messages=raw?.output?.filter(x=>x.type==='message')??[];
    if(messages.length===1&&messages[0].content?.length===1&&messages[0].content[0].type==='output_text'){
      try{const p=JSON.parse(messages[0].content[0].text);current.proposal={moveId:safeId(p.moveId),interpretation:safeId(p.interpretation),uncertain:p.uncertain===true,refs:Array.isArray(p.refs)?p.refs.slice(0,64).map(safeId):null};}catch{current.error={code:'invalid_proposal_json'};}
    }
    return response;
  }catch(e){current.transportError=['AbortError','TimeoutError'].includes(e?.name)?e.name:'transport-failure';await ledger.halt(current.transportError+'; no automatic retry.');throw e;}
};
try{
  if(ledger.halted)throw Error('A prior provider access/transport failure halted this evaluation; inspect the persisted evidence.');
  const service=new CoachService(process.env.OPENAI_API_KEY,true,guardedFetch);
  server=createServer(async(req,res)=>{
    if(req.method!=='POST'||req.url!=='/adult-evaluation'||req.socket.remoteAddress!=='127.0.0.1'){res.writeHead(404).end();return;}
    try{let raw='';for await(const b of req){raw+=b;if(Buffer.byteLength(raw)>32768)throw Error('request-size');}const reply=await service.handle(JSON.parse(raw));res.writeHead(reply?200:400,{'Content-Type':'application/json'}).end(JSON.stringify(reply));}catch{res.writeHead(500).end('{}');}
  });server.listen(0,'127.0.0.1');await once(server,'listening');
  const completed=new Set(ledger.entries.filter(x=>x.kind==='reserved').map(x=>`${x.fixtureId}:${x.trial}`));
  for(let trial=1;trial<=3;trial++)for(const f of fixtures){
    if(f.expected.apiCalls===0||completed.has(`${f.id}:${trial}`)||ledger.halted||ledger.used>=75)continue;
    const {q,expected,aliases}=fixtureRequest(f),body=requestBody(q),before=sha(q.context);
    current={id:f.id,trial,runId,request:q,body,aliases,expected,startedAt:new Date().toISOString()};const start=performance.now();
    const response=await fetch(`http://127.0.0.1:${server.address().port}/adult-evaluation`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(q)});
    current.reply=await response.json();current.latencyMs=Math.round(performance.now()-start);current.contextUnchanged=before===sha(q.context);
    current.evaluation=judge(current.proposal,expected,q);current.evaluation.pass&&=current.contextUnchanged&&['selected','unavailable'].includes(current.reply?.status);
    if(!current.attempt){await ledger.halt('Local service did not admit the exact fixture.');current.localFailure=true;}
    if(current.attempt){await writeFile(`${dir}/attempt-${String(current.attempt).padStart(3,'0')}.json`,JSON.stringify(current,null,2)+'\n');await ledger.result(current.attempt,{fixtureId:f.id,trial,status:current.reply?.status??null,httpStatus:current.httpStatus??null,pass:current.evaluation.pass,latencyMs:current.latencyMs});}
    trials.push({id:f.id,trial,attempt:current.attempt??null,pass:current.evaluation.pass,httpStatus:current.httpStatus??null,status:current.reply?.status??null,latencyMs:current.latencyMs});console.log(JSON.stringify(trials.at(-1)));
  }
}finally{
  if(server)await new Promise(resolve=>server.close(resolve));
  await writeFile(`${dir}/run-${runId}.json`,JSON.stringify({runId,startedAt,endedAt:new Date().toISOString(),mode:'adult-evaluation',model:MODEL,fixtureSha256,sourceHashes,totalReservedAttempts:ledger.used,ceiling:75,halted:ledger.halted,trials,local,scope:'Exact prepared synthetic explanations. No participant, learning, child-live, or release qualification.'},null,2)+'\n');
  await ledger.close();
}
