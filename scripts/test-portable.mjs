import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {once} from 'node:events';
import assert from 'node:assert/strict';
import {recordFile} from './portable-common.mjs';

async function run(command,args,options={}){return await new Promise((resolve,reject)=>{const child=spawn(command,args,{windowsHide:true,...options});let output='';child.stdout?.on('data',x=>output+=x);child.stderr?.on('data',x=>output+=x);child.on('error',reject);child.on('close',code=>resolve({code,output}));});}
const unit=await run(process.execPath,['--test','checks/demo-public-cleanup.test.mjs','checks/portable-distribution.test.mjs']);process.stdout.write(unit.output);assert.equal(unit.code,0);
const selection=JSON.parse(await fs.readFile('output/portable/latest-'+process.platform+'-'+process.arch+'.json','utf8'));
assert.equal((await recordFile(path.dirname(selection.archive),path.basename(selection.archive))).sha256,selection.sha256);
await fs.mkdir('.tmp',{recursive:true});const extract=await fs.mkdtemp(path.resolve('.tmp/Portable demo with spaces '));
const result=await run('tar',['-xf',selection.archive,'-C',extract]);assert.equal(result.code,0,result.output);
const names=await fs.readdir(extract);assert.equal(names.length,1);const root=path.join(extract,names[0]);
const node=path.join(root,'runtime',process.platform==='win32'?'node.exe':'node');
// No Node/npm on PATH and deliberately hostile inherited service settings.
const env={SystemRoot:process.env.SystemRoot??'',WINDIR:process.env.WINDIR??'',PATH:'',HOME:process.env.HOME??'',TMP:process.env.TMP??'',TEMP:process.env.TEMP??'',EQ_GARDEN_AI_DEMO:'1',EQ_CAST_DYNAMIC_VOICE:'1',OPENAI_API_KEY:'synthetic-not-a-key',FISH_API_KEY:'synthetic-not-a-key'};
let child,output='';
async function start(){output='';child=spawn(node,[path.join(root,'launch.mjs'),'--no-open'],{cwd:extract,env,windowsHide:true,stdio:['ignore','pipe','pipe']});child.stdout.on('data',x=>output+=x);child.stderr.on('data',x=>output+=x);let spawnError;child.on('error',e=>spawnError=e);const deadline=Date.now()+90000;while(!output.includes('Ready:')){if(spawnError)throw spawnError;if(child.exitCode!==null||Date.now()>deadline)throw Error('Portable startup failed: '+output);await new Promise(r=>setTimeout(r,100));}}
async function stop(){if(child&&child.exitCode===null){const exited=once(child,'close');child.kill();await exited;}child=undefined;}
const checks=[];
try{
 const verify=await run(node,[path.join(root,'launch.mjs'),'--verify'],{cwd:extract,env});assert.equal(verify.code,0,verify.output);checks.push('archive extraction and independent integrity check');
 await start();
 const origin='http://127.0.0.1:4364';
 assert.match(await (await fetch(origin+'/garden')).text(),/<html/i);
 const config=await (await fetch(origin+'/api/garden/config')).json();assert.equal(config.textFeedback,false);assert.equal(config.readingFeedback,false);assert.deepEqual(config.textFeedbackActivities,[]);
 assert.equal((await (await fetch(origin+'/api/config')).json()).liveAvailable,false);checks.push('authored startup with providers disabled despite inherited keys');
 const {chromium}=await import('@playwright/test');const browser=await chromium.launch({channel:'chromium',args:['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
 try{
  const context=await browser.newContext({viewport:{width:1366,height:768},permissions:['microphone']});const external=[];const failures=[];
  await context.route('**/*',route=>{const url=route.request().url();if(url.startsWith(origin+'/'))return route.continue();external.push(url);return route.abort();});
  const page=await context.newPage();page.on('pageerror',error=>failures.push(error.message));
  await page.goto(origin+'/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
  await page.getByRole('button',{name:'Start playing',exact:true}).waitFor({timeout:60000});
  await page.screenshot({path:path.join(extract,'startup.png')});
  const audio=await page.evaluate(async()=>{const m=await (await fetch('/audio/cast/manifest.json')).json();const bytes=await (await fetch(m.entries.find(x=>x.text.length>25).clip.uri)).arrayBuffer();const context=new AudioContext();try{const buffer=await context.decodeAudioData(bytes);return {duration:buffer.duration,samples:buffer.length};}finally{await context.close();}});assert.ok(audio.duration>0);assert.ok(audio.samples>0);
  const mic=await page.evaluate(async()=>{const stream=await navigator.mediaDevices.getUserMedia({audio:true});const recorder=new MediaRecorder(stream),chunks=[];recorder.ondataavailable=e=>chunks.push(e.data);const done=new Promise(resolve=>recorder.onstop=resolve);recorder.start();await new Promise(r=>setTimeout(r,500));recorder.stop();await done;stream.getTracks().forEach(t=>t.stop());return new Blob(chunks).size;});assert.ok(mic>0);
  assert.deepEqual(external,[]);assert.deepEqual(failures,[]);checks.push('offline browser opening, native recorded-audio decode, synthetic microphone capture');
 }finally{await browser.close();}
 await stop();await start();await stop();checks.push('shutdown and restart preserve fixed origin');
 const occupied=createServer((_q,r)=>r.end('unrelated server'));occupied.listen(4364,'127.0.0.1');await once(occupied,'listening');
 try{const conflict=await run(node,[path.join(root,'launch.mjs'),'--no-open'],{cwd:extract,env});assert.equal(conflict.code,1);assert.match(conflict.output,/already in use/);assert.equal(await (await fetch(origin)).text(),'unrelated server');}finally{await new Promise(resolve=>occupied.close(resolve));}checks.push('occupied port leaves unrelated server intact');
 const html=path.join(root,'dist/personal-review-client/index.html'),saved=await fs.readFile(html);await fs.appendFile(html,'tampered');
 const tampered=await run(node,[path.join(root,'launch.mjs'),'--verify'],{cwd:extract,env});assert.equal(tampered.code,1);assert.match(tampered.output,/changed/);await fs.writeFile(html,saved);checks.push('tampered archive payload rejected');
 if(process.env.EQ_PORTABLE_JOURNEY==='1'){
  const journey=await run(process.execPath,['node_modules/@playwright/test/cli.js','test','--config','playwright.portable.config.ts'],{env:{...process.env,EQ_PORTABLE_PACKAGE_DIRECTORY:root},stdio:'inherit'});assert.equal(journey.code,0,'Connected portable journey failed');checks.push('complete offline native recorded-voice journey through finale and six-story library');
 }
 const receipt={status:'PASS',at:new Date().toISOString(),commit:selection.commit,target:selection.target,archiveSha256:selection.sha256,extract,checks,limits:['Microphone uses a synthetic browser device, not human microphone acceptance.',...(process.env.EQ_PORTABLE_JOURNEY==='1'?[]:['Full journey not run on this platform.']),'Browser checks do not qualify GPU performance or every supported OS version.']};
 await fs.writeFile(path.join(path.dirname(selection.archive),'test-'+selection.target+'.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
}finally{await stop();}
