/** Native codecs + actual cast controller on a temporary loopback harness. No provider calls. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createServer} from 'node:http';
import {createHash} from 'node:crypto';
import ts from 'typescript';
process.env.PLAYWRIGHT_BROWSERS_PATH??=path.resolve('.cache/browsers');
const {chromium,firefox,webkit}=await import('@playwright/test');
const cache='.cache/cast-native';await fs.mkdir(cache,{recursive:true});
const module=ts.transpileModule(await fs.readFile('server/mediaRange.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
await fs.writeFile(cache+'/mediaRange.mjs',module);
const {sendMedia,EphemeralCastMedia}=await import('../'+cache+'/mediaRange.mjs');
const raw=await fs.readFile('public/audio/cast/manifest.json'),manifest=JSON.parse(raw),sha=x=>createHash('sha256').update(x).digest('hex');
const sourceBindings=[];for(const file of ['src/garden/castSpeech.ts','src/garden/audio.ts','src/garden/voiceTypes.ts','src/garden/sourceVoiceRouting.ts','server/mediaRange.ts','scripts/qualify-cast-audio.mjs'])sourceBindings.push({file,sha256:sha(await fs.readFile(file))});
const samples=Object.keys(manifest.cast).map(speaker=>{
 const entries=manifest.entries.filter(e=>e.speaker===speaker&&e.clip&&e.clip.duration>=.7&&e.clip.duration<=3&&/[.!?][”"']?$/.test(e.text)&&e.text.split(/\s+/).length>=3);
 const entry=entries.sort((a,b)=>(b.start>30)-(a.start>30)||a.clip.duration-b.clip.duration)[0];
 if(!entry)throw Error('Missing native voice sample: '+speaker);return {id:entry.id,speaker,text:entry.text,clip:entry.clip,masterStart:entry.start};
});
const media=new EphemeralCastMedia(),dynamicBytes=await fs.readFile('public'+samples[0].clip.uri),modules=new Map(),requests=[];
const server=createServer(async(req,res)=>{
 try{
 const url=new URL(req.url,'http://127.0.0.1'),pathname=url.pathname;
 if(pathname==='/'){res.writeHead(200,{'Content-Type':'text/html'});res.end('<!doctype html><button id="play">Play exact clip</button>');return;}
 if(pathname==='/api/garden/cast-audio'&&req.method==='POST'){for await(const _ of req){}const uri=media.put(dynamicBytes,'audio/wav');res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({uri}));return;}
 if(/^\/api\/garden\/cast-media\/[a-f0-9]{48}$/.test(pathname)){const token=pathname.split('/').at(-1);if(req.method==='DELETE'){media.revoke(token);res.writeHead(204);res.end();return;}const value=media.get(token);if(!value){res.writeHead(404);res.end();return;}sendMedia(req,res,value.audio,value.mime);return;}
 if(/^\/audio\/cast\/clips\/[a-f0-9]{64}\.wav$/.test(pathname)){requests.push({uri:pathname,range:req.headers.range??null,method:req.method});sendMedia(req,res,await fs.readFile('public'+pathname),'audio/wav');return;}
 if(pathname==='/audio/cast/manifest.json'){res.writeHead(200,{'Content-Type':'application/json'});res.end(raw);return;}
 if(/^\/[A-Za-z0-9]+\.js$/.test(pathname)){let code=modules.get(pathname);if(!code){code=ts.transpileModule(await fs.readFile('src/garden'+pathname.replace(/\.js$/,'.ts'),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;modules.set(pathname,code);}res.writeHead(200,{'Content-Type':'text/javascript'});res.end(code);return;}
 res.writeHead(404);res.end();
 }catch(error){res.writeHead(500);res.end(error.message);}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+server.address().port,results=[];
try{
 for(const [name,engine]of Object.entries({chromium,firefox,webkit})){
  console.log(JSON.stringify({browser:name,phase:'launch'}));
  let browser;
  try{
   browser=await engine.launch({headless:true,timeout:20000,...(name==='chromium'?{args:['--autoplay-policy=no-user-gesture-required']}:{})});const page=await browser.newPage();page.setDefaultTimeout(20000);await page.goto(base);
   await page.evaluate(async()=>{
    const {playCastSpeech}=await import('/castSpeech.js');window.results=[];const original=HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play=function(){const record={uri:this.currentSrc||this.src,start:this.currentTime,duration:this.duration,ended:false,end:null};window.results.push(record);this.addEventListener('ended',()=>{record.ended=true;record.end=this.currentTime;},{once:true,capture:true});return original.call(this);};
    document.querySelector('#play').onclick=()=>{window.pending=new Promise(resolve=>playCastSpeech(window.request,{onDone:()=>resolve({done:true}),onError:error=>resolve({done:false,error})}));};
   });
   for(const sample of samples){
    await page.evaluate(sample=>{window.request={text:sample.text,speaker:sample.speaker,origin:'authored-display'};},sample);await page.locator('#play').click();const result=await page.evaluate(()=>Promise.race([window.pending,new Promise(resolve=>setTimeout(()=>resolve({done:false,error:'HARNESS_TIMEOUT'}),20000))])),native=await page.evaluate(()=>window.results.at(-1));const pass=result.done&&native?.ended&&Math.abs(native.start)<.01&&Math.abs(native.duration-sample.clip.duration)<.08&&Math.abs(native.end-native.duration)<.12;
    results.push({browser:name,speaker:sample.speaker,text:sample.text,clipSha256:sample.clip.sha256,masterStart:sample.masterStart,native,result,pass});console.log(JSON.stringify({browser:name,speaker:sample.speaker,pass,duration:native?.duration,error:result.error}));
   }
   console.log(JSON.stringify({browser:name,phase:'dynamic'}));await page.evaluate(()=>{window.request={text:'Synthetic dynamic-delivery request; audio is a known saved clip.',speaker:'narrator',origin:'child-draft',revision:'native-codec-fixture'};});await page.locator('#play').click();const result=await page.evaluate(()=>Promise.race([window.pending,new Promise(resolve=>setTimeout(()=>resolve({done:false,error:'HARNESS_TIMEOUT'}),20000))])),native=await page.evaluate(()=>window.results.at(-1));const pass=result.done&&native?.ended&&native.uri.includes('/api/garden/cast-media/');results.push({browser:name,scope:'Synthetic dynamic service response through real HTTP/native media/controller; no provider/meaning claim',result,native,pass});console.log(JSON.stringify({browser:name,phase:'dynamic',result,native,pass}));
  }catch(error){results.push({browser:name,pass:false,error:error.message});}
  finally{await browser?.close();await fs.writeFile('evidence/cast-audio-20260919/native-independent-clips-progress.json',JSON.stringify({results,requests},null,2)+'\n');}
 }
}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
const report={schema:'eq.native-independent-audio.v1',at:new Date().toISOString(),node:process.version,manifestSha256:sha(raw),sourceBindings,scope:'Actual castSpeech with native browser media, all eight selected recordings; this is codec/controller proof, not human listening acceptance or full-game qualification.',providerRequests:0,results,requests};
await fs.writeFile('evidence/cast-audio-20260919/native-independent-clips.json',JSON.stringify(report,null,2)+'\n');
if(results.some(result=>!result.pass))process.exitCode=1;
