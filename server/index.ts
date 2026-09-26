import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {CoachService,MODEL} from './coach.js';
import {GardenFeedbackService} from './garden.js';
import {GardenSpeechService} from './gardenSpeech.js';
import {GardenWordService} from './gardenWords.js';
import {gardenDemo} from './gardenDemo.js';
import {gardenRecordingDemo} from './gardenRecordingDemo.js';
import {DefinitionNarrator} from './definitionNarrator.js';
import {CastNarrator} from './castNarrator.js';
import {EphemeralCastMedia,sendMedia} from './mediaRange.js';

const castMedia=new EphemeralCastMedia();

const root=resolve(fileURLToPath(new URL('../../',import.meta.url)));
const review=process.env['EQ_ASSET_PROFILE']==='review',personalGrass=process.env['EQ_PERSONAL_GRASS']==='1';
if(personalGrass&&!review)throw Error('Personal grass requires the explicit local review profile');
const host=process.env['HOST']??'127.0.0.1';
const candidateDirectory=process.env['EQ_REVIEW_CLIENT_DIRECTORY'];
if(candidateDirectory&&(!review||!['127.0.0.1','localhost','::1'].includes(host)||!resolve(root,candidateDirectory).startsWith(root+sep)))throw Error('Review client must stay inside the loopback workspace');
const staticRoot=resolve(root,candidateDirectory??(personalGrass?'dist/personal-review-client':review?'dist/review-client':'dist/client'));
const port=Number(process.env['PORT']??8787);
const mode=process.env['COACH_MODE']??'authored';
if(!['authored','adult-evaluation'].includes(mode))throw Error('Live child operation requires a separately reviewed activation; use authored or loopback adult-evaluation.');
if(mode==='adult-evaluation'&&!['127.0.0.1','localhost','::1'].includes(host))throw Error('Adult evaluation must bind loopback.');
if(process.env['OPENAI_MODEL']&&process.env['OPENAI_MODEL']!==MODEL)throw Error('Unevaluated model override.');
const coach=new CoachService(process.env['OPENAI_API_KEY'],mode==='adult-evaluation');
// TASK11.19 remains halted at 1/75. No runtime setting silently resumes that ledger.
const demoFactory=process.env['EQ_GARDEN_AI_SESSION']==='recording'?gardenRecordingDemo:gardenDemo;
const demo=await demoFactory({enabled:process.env['EQ_GARDEN_AI_DEMO']==='1',key:process.env['OPENAI_API_KEY'],root,host});
const gardenFeedback=new GardenFeedbackService(demo.provider);
const gardenSpeech=new GardenSpeechService();
const gardenWords=new GardenWordService();
const definitionVoice=new DefinitionNarrator({root,host,enabled:process.env['EQ_DEFINITION_NARRATOR']==='1',key:process.env['FISH_API_KEY']});
const castVoice=new CastNarrator({root,host,enabled:process.env['EQ_CAST_DYNAMIC_VOICE']==='1',key:process.env['FISH_API_KEY']});
const allowedOrigins=new Set([`http://${host}:${port}`, process.env['PUBLIC_ORIGIN']??'http://127.0.0.1:5173']);
const mime:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.wasm':'application/wasm','.glb':'model/gltf-binary','.ktx2':'image/ktx2','.mp3':'audio/mpeg','.wav':'audio/wav'};
export const server=createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
  const json=(status:number,data:unknown)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  try{
    if(req.headers.host!==`${host}:${port}` && req.headers.host!==`localhost:${port}`) {json(400,{error:'Invalid host'});return;}
    const path=new URL(req.url??'/',`http://${host}:${port}`).pathname;
    // Emscripten's pinned texture bindings construct functions in this isolated
    // worker only. The page cannot evaluate strings; the worker cannot network.
    if(path==='/garden-assets/basis/texture-worker.js')res.setHeader('Content-Security-Policy',"default-src 'none'; script-src 'unsafe-eval'; connect-src 'none'");
    if(path==='/healthz'){json(200,{status:'ok',mode});return;}
    if(path==='/api/garden/definition-audio'){
      if(req.method!=='POST'){json(405,{error:'Method not allowed'});return;}
      if(!req.headers.origin||!allowedOrigins.has(req.headers.origin)||!req.headers['content-type']?.startsWith('application/json')){json(403,{error:'Request not allowed'});return;}
      let size=0;const chunks:Buffer[]=[];for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>128){json(413,{error:'Request too large'});return;}chunks.push(Buffer.from(chunk));}
      let input:unknown;try{input=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{json(400,{error:'Invalid request'});return;}
      const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
      const result=await definitionVoice.read(input,controller.signal);
      if(result.audio){res.writeHead(200,{'Content-Type':'audio/mpeg','Content-Length':result.audio.length,'Cache-Control':'no-store'});res.end(result.audio);}else json(result.status,{status:'unavailable'});
      return;
    }
    if(/^\/api\/garden\/cast-media\/[a-f0-9]{48}$/.test(path)){
      const token=path.slice(path.lastIndexOf('/')+1);
      if(req.method==='DELETE'){if(!req.headers.origin||!allowedOrigins.has(req.headers.origin)){json(403,{error:'Request not allowed'});return;}castMedia.revoke(token);res.writeHead(204,{'Cache-Control':'no-store'});res.end();return;}
      if(req.method!=='GET'&&req.method!=='HEAD'){json(405,{error:'Method not allowed'});return;}
      const media=castMedia.get(token);if(!media){json(404,{error:'Recording unavailable'});return;}
      sendMedia(req,res,media.audio,media.mime);return;
    }
    if(path==='/api/garden/cast-audio'){
      if(req.method!=='POST'){json(405,{error:'Method not allowed'});return;}
      if(!req.headers.origin||!allowedOrigins.has(req.headers.origin)||!req.headers['content-type']?.startsWith('application/json')){json(403,{error:'Request not allowed'});return;}
      let size=0;const chunks:Buffer[]=[];for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>32768){json(413,{error:'Request too large'});return;}chunks.push(Buffer.from(chunk));}
      let input:unknown;try{input=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{json(400,{error:'Invalid request'});return;}
      const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
      const result=await castVoice.read(input,controller.signal);
      if(controller.signal.aborted)return;
      if(result.audio){if(req.headers.accept==='application/json'){const uri=castMedia.put(result.audio,result.mime??'audio/wav');if(!uri){json(503,{status:'unavailable'});return;}json(200,{uri});}else{res.writeHead(200,{'Content-Type':result.mime??'audio/wav','Content-Length':result.audio.length,'Cache-Control':'no-store'});res.end(result.audio);}}else json(result.status,{status:'unavailable'});
      return;
    }
    if(path==='/api/garden/config'&&req.method==='GET'){json(200,{content:'garden-chapter-3',textFeedback:await demo.available(),textFeedbackActivities:process.env['EQ_GARDEN_AI_DEMO']==='1'?['sol-ending']:[],readingFeedback:gardenSpeech.available,transcription:false});return;}
    if(path==='/api/garden/feedback'||path==='/api/garden/reading'||path==='/api/garden/transcript'||path==='/api/garden/word'){
      if(req.method!=='POST'){json(405,{error:'Method not allowed'});return;}
      if(!req.headers.origin||!allowedOrigins.has(req.headers.origin)){json(403,{error:'Request not allowed'});return;}
      const reading=path.endsWith('/reading')||path.endsWith('/transcript');
      if(!req.headers['content-type']?.startsWith('application/json')){json(415,{error:'Unsupported content'});return;}
      // The unavailable speech endpoint does not collect a body or forward audio.
      if(reading&&!gardenSpeech.available){req.resume();json(200,{status:'unavailable'});return;}
      let size=0;const chunks:Buffer[]=[];for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>(reading?5700000:32768)){json(413,{error:'Request too large'});return;}chunks.push(Buffer.from(chunk));}
      let input:unknown;try{input=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{json(400,{error:'Invalid request'});return;}
      const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});const result=reading?await gardenSpeech.handle(input,controller.signal):path.endsWith('/word')?await gardenWords.handle(input,controller.signal):await gardenFeedback.handle(input,controller.signal);json(result?200:400,result??{error:'Invalid request'});return;
    }
    if(path==='/api/config' && req.method==='GET') {json(200,{caseId:'sparkfest-little-bridge-001',contentVersion:3,contentRevision:1,coachContractVersion:1,mode,liveAvailable:coach.available});return;}
    if(path==='/api/coach') {
      if(req.method!=='POST') {json(405,{error:'Method not allowed'});return;}
      if(!req.headers.origin || !allowedOrigins.has(req.headers.origin) || !req.headers['content-type']?.startsWith('application/json')) {json(403,{error:'Request not allowed'});return;}
      let size=0;const chunks:Buffer[]=[];
      for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>32768){json(413,{error:'Request too large'});return;}chunks.push(Buffer.from(chunk));}
      let value:unknown;try{value=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{json(400,{error:'Invalid request'});return;}
      const cancel=new AbortController();res.on('close',()=>{if(!res.writableEnded)cancel.abort();});
      const result=await coach.handle(value,cancel.signal);json(result?200:400,result??{error:'Invalid request'});return;
    }
    if(req.method!=='GET' && req.method!=='HEAD'){json(405,{error:'Method not allowed'});return;}
    const candidate=resolve(staticRoot,'.'+decodeURIComponent(path==='/'||path==='/garden'||path==='/garden/'?'/index.html':path));
    if(!candidate.startsWith(staticRoot+sep)){json(403,{error:'Path not allowed'});return;}
    const info=await stat(candidate);
    if(!info.isFile()){json(404,{error:'Not found'});return;}
    if(/\.(mp3|wav)$/.test(candidate)){sendMedia(req,res,await readFile(candidate),mime[extname(candidate)]??'application/octet-stream',/^\/audio\/cast\/(?:clips\/)?[a-f0-9]{64}\.(mp3|wav)$/.test(path)?'public, max-age=31536000, immutable':'no-cache');return;}
    let encoding:string|undefined,bytes:Buffer|undefined;
    const accepts=req.headers['accept-encoding']??'';
    for(const [token,suffix]of [['br','.br'],['gzip','.gz']] as const){
      if(!new RegExp(`(?:^|,)\\s*${token}(?:\\s*(?:,|$)|;\\s*q=(?!0(?:\\.0*)?\\s*(?:,|$)))`).test(accepts))continue;
      try{bytes=await readFile(candidate+suffix);encoding=token;break;}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
    }
    bytes??=await readFile(candidate);
    res.writeHead(200,{'Content-Type':mime[extname(candidate)]??'application/octet-stream','Content-Length':bytes.length,'Vary':'Accept-Encoding',...(encoding?{'Content-Encoding':encoding}:{}),'Cache-Control':path.startsWith('/assets/')||/^\/audio\/cast\/[a-f0-9]{64}\.(mp3|wav)$/.test(path)||path.startsWith('/art/runtime/')||/^\/garden-assets\/[a-z-]+-[a-f0-9]{12}\.glb$/.test(path)?'public, max-age=31536000, immutable':'no-cache'});
    res.end(req.method==='HEAD'?undefined:bytes);
  }catch(error){json((error as NodeJS.ErrnoException).code==='ENOENT'?404:500,{error:'Resource unavailable'});}
});
export let startupError:Error|undefined;
server.on('error',error=>{startupError=error;console.error(error.message);process.exitCode=1;});
server.listen(port,host,()=>console.log(`Evidence Quest ${mode} server http://${host}:${port}`));
