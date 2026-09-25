import test from 'node:test';
import assert from 'node:assert/strict';
import {playCastSpeech} from '../src/garden/castSpeech.js';
import {selectedCast} from '../src/garden/voiceTypes.js';
import {continuousSpeech} from '../src/garden/continuousSpeech.js';
import {initialGarden} from '../src/garden/model.js';
import {sourcesFor} from '../src/garden/content.js';

test('continuous reading binds current source, occurrence, revision and playback owner',()=>{
 const state=initialGarden('current-reading');state.playback={key:'telling-1',owner:'gathering',mode:'speech',paused:false,elapsed:0};state.chapter.story.solDraft.revision=7;
 const text=sourcesFor(state.chapter).sections.paragraphs[0]!;
 const request=continuousSpeech(state,{text,who:'Grandma',source:'sections',paragraph:0},3);
 assert.equal(request.text,text);assert.equal(request.speaker,'grandma');assert.equal(request.revision,7);
 assert.deepEqual(request.source,{id:'sections',paragraph:0,edition:'literary-20260916',maintenanceEdition:'staged-20260916',start:0,end:text.length});
 assert.equal(request.owner,'current-reading:playback:telling-1:3');
 const own=continuousSpeech(state,{text,who:'Sol',origin:'child-draft'},4);
 assert.equal(own.source,undefined,'Own words do not acquire a canonical identity merely by matching authored words');assert.equal(own.origin,'child-draft');assert.equal(own.speaker,'sol');
 state.playback.key='telling-2';assert.notEqual(continuousSpeech(state,{text,who:'Sol',origin:'child-draft'},4).owner,own.owner);
});

/** Synthetic control-flow proof only; native codec/voice checks are a separate suite. */
test('exact audio deadlines, retry, natural completion and retired owners',async()=>{
 const globals=globalThis as unknown as Record<string,unknown>,names=['window','document','Audio','fetch','speechSynthesis','setTimeout','clearTimeout'];
 const before=new Map(names.map(name=>[name,Object.getOwnPropertyDescriptor(globalThis,name)]));
 const originalTimeout=setTimeout,events=new EventTarget(),documentEvents=new EventTarget();
 Object.assign(globals,{window:{setInterval,clearInterval,addEventListener:events.addEventListener.bind(events),removeEventListener:events.removeEventListener.bind(events)},document:Object.assign(documentEvents,{hidden:false}),speechSynthesis:{cancel(){}},setTimeout:((callback:()=>void,ms:number)=>originalTimeout(callback,ms===12000?30:ms))});
 const wait=()=>new Promise<void>(resolve=>originalTimeout(resolve,5));
 const audios:FakeAudio[]=[];let load=true;
 class FakeAudio extends EventTarget{
  src='';preload='';duration=1;currentTime=0;paused=true;
  constructor(){super();audios.push(this);}
  load(){if(this.src&&load)queueMicrotask(()=>this.dispatchEvent(new Event('loadedmetadata')));}
  play(){this.paused=false;return Promise.resolve();}
  pause(){this.paused=true;}
  removeAttribute(){this.src='';}
  finish(){this.currentTime=this.duration;this.dispatchEvent(new Event('ended'));}
 }
 globals['Audio']=FakeAudio;
 const state=initialGarden('performed-reading');state.playback={key:'telling-1',owner:'gathering',mode:'speech',paused:false,elapsed:0};
 const performed=continuousSpeech(state,{text:sourcesFor(state.chapter).story.paragraphs[2]!,who:'Pip',source:'story',paragraph:2},2);
 const hash='a'.repeat(64),performerHash='b'.repeat(64),manifest={schema:'eq.cast-audio.v1',playback:'independent-pcm-v1',cast:selectedCast,entries:[{id:hash,text:'ill',speaker:'narrator',voiceId:selectedCast.narrator,clip:{uri:'/audio/cast/clips/'+hash+'.wav',duration:1,sha256:hash,boundaryMethod:'complete-word-recording-v1'}},{id:performerHash,text:performed.text,speaker:'pip',voiceId:selectedCast.pip,clip:{uri:'/audio/cast/clips/'+performerHash+'.wav',duration:1,sha256:performerHash}}]};
 let fetches=0,aborts=0,done=0,error='';
 globals['fetch']=(_uri:string,options?:RequestInit)=>{fetches++;return new Promise<Response>((_resolve,reject)=>options?.signal?.addEventListener('abort',()=>{aborts++;reject(options.signal?.reason);},{once:true}));};
 try{
  playCastSpeech('ill',{onDone:()=>done++,onError:message=>{error=message;}});
  for(let i=0;i<30&&!error;i++)await wait();
  assert.match(error,/too long/);assert.equal(aborts,1);assert.equal(done,0);
  globals['fetch']=async()=>{fetches++;return new Response(JSON.stringify(manifest),{headers:{'Content-Type':'application/json'}});};
  error='';const cancel=playCastSpeech('ill',{onDone:()=>done++,onError:message=>{error=message;}});
  for(let i=0;i<30&&!audios.length;i++)await wait();await wait();
  assert.equal(fetches,2);assert.equal(audios[0]!.currentTime,0);assert.equal(audios[0]!.paused,false);
  cancel();const retired=audios[0]!;
  playCastSpeech('ill',{onDone:()=>done++});await wait();retired.finish();await wait();assert.equal(done,0);
  audios.at(-1)!.finish();await wait();assert.equal(done,1);
  playCastSpeech('ill',{onDone:()=>done++,onError:message=>{error=message;}});await wait();audios.at(-1)!.dispatchEvent(new Event('ended'));await wait();assert.match(error,/before these words finished/);assert.equal(done,1);
  load=false;error='';playCastSpeech('ill',{onDone:()=>done++,onError:message=>{error=message;}});for(let i=0;i<30&&!error;i++)await wait();assert.match(error,/too long/);assert.equal(done,1);
  load=true;let current=true;playCastSpeech('ill',{isCurrent:()=>current,onDone:()=>done++});await wait();current=false;audios.at(-1)!.finish();await wait();assert.equal(done,1);
  error='';const beforeMismatch=audios.length;playCastSpeech({text:'ill',speaker:'narrator',origin:'authored-display',source:{id:'sol',paragraph:0,edition:'literary-20260916'}},{onDone:()=>done++,onError:message=>{error=message;}});await wait();assert.match(error,/no longer match/);assert.equal(audios.length,beforeMismatch);assert.equal(done,1);
  error='';playCastSpeech(performed,{onDone:()=>done++,onError:message=>{error=message;}});await wait();
  assert.equal(error,'');assert.equal(audios.at(-1)!.src,'/audio/cast/clips/'+performerHash+'.wav','Pip keeps the whole performance, including Mara/Boy quotations');audios.at(-1)!.finish();await wait();assert.equal(done,2);
  const beforeWrongEdition=audios.length;playCastSpeech({...performed,source:{...performed.source!,edition:'original'}},{onDone:()=>done++,onError:message=>{error=message;}});await wait();assert.match(error,/no longer match/);assert.equal(audios.length,beforeWrongEdition);assert.equal(done,2,'An explicit performer cannot bypass source validation');
 }finally{for(const name of names){const descriptor=before.get(name);if(descriptor)Object.defineProperty(globalThis,name,descriptor);else delete globals[name];}}
});
