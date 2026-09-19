import {completeConversation} from './garden-play-actions.js';
import {buildBridge,handPlace} from './garden-bridge-actions.js';
import {advance as tick,finishBakery,finishSpokenTurn,finishArrivals,tellGrandmaStory} from './garden-play-actions.js';
import test from 'node:test';
import {shareTornWing} from './garden-play-actions.js';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,MARA,GRANDMA_APPROACH,bridgeReady,type Point} from '../src/garden/model.js';
import {SOL_APPROACH,planProblems,type StoryEvent} from '../src/garden/chapter.js';
import {sourcesFor,preparedEndingsFor} from '../src/garden/content.js';
import {turnLines} from '../src/garden/gathering.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
import {GardenFeedbackService,validFeedback,validGardenRequest,gardenRequestBody,type GardenRequest} from '../server/garden.js';
import {wav} from '../src/garden/audio.js';
import {decodeWav,speechFeedback,GardenSpeechService} from '../server/gardenSpeech.js';
import {wordHelp} from '../src/garden/content.js';
import {wordContext,validWordReply,wordRequestBody,GardenWordService,type WordRequest} from '../server/gardenWords.js';
let id=0;
function game(){const s=new GardenStore(initialGarden('full-'+id++),()=>String(id++));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});return s;}
function close(s:GardenStore){for(let depth=0;depth<20&&s.getSnapshot().panel;depth++)s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,null);}
function go(s:GardenStore,point:Point){close(s);s.send({type:'GO',point});tick(s);const p=s.getSnapshot().chapter.pip;assert.ok(Math.hypot(p.x-point.x,p.z-point.z)<.02,`Could not reach ${JSON.stringify(point)} from ${JSON.stringify(p)}`);}
function event(s:GardenStore,e:StoryEvent){s.send({type:'STORY',event:e});}
function bridge(s:GardenStore,secure=true){close(s);if(secure){buildBridge(s);return;}go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);handPlace(s,'section:a',{x:-.775,z:3});handPlace(s,'section:b',{x:.775,z:3});}
function mara(s:GardenStore,take=false){go(s,{x:MARA.x,z:MARA.z+.95});s.send({type:'TALK',who:'mara'});completeConversation(s);if(take){s.send({type:'TAKE_PAGE'});tick(s);}close(s);}
function plant(s:GardenStore){go(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'PLANT'});tick(s);s.send({type:'BLOOM'});tick(s);}
function sol(s:GardenStore,prepared=false){finishBakery(s);go(s,SOL_APPROACH);s.send({type:'TALK',who:'sol'});completeConversation(s);if(prepared){event(s,{kind:'FINISH_WITH_SOL'});event(s,{kind:'EDIT',text:'I kept the flour dry. Rina baked the bread she had promised.'});event(s,{kind:'SELECT_ENDING',contribution:{text:s.getSnapshot().chapter.story.solDraft.text,scene:'bread',origin:'child',revision:s.getSnapshot().chapter.story.solDraft.revision}});}else event(s,{kind:'BRING_DRAFT'});}
function plan(s:GardenStore,time:'usual'|'later',reader:'pip'|'mara'){go(s,GRANDMA_APPROACH);event(s,{kind:'REPORT_MARA'});event(s,{kind:'REPORT_SOL'});event(s,{kind:'PLAN',time,reader});}
function invite(s:GardenStore){go(s,SOL_APPROACH);event(s,{kind:'INVITE',who:'sol'});go(s,{x:MARA.x,z:MARA.z+.95});event(s,{kind:'INVITE',who:'mara'});go(s,GRANDMA_APPROACH);event(s,{kind:'REPORT_ARRANGEMENTS'});}
test('Full chapter: all nine actual outcomes, six records and immutable ending replay',()=>{
 for(const arrangement of [{time:'usual',reader:'pip'},{time:'later',reader:'pip'},{time:'later',reader:'mara'}] as const)for(const outcome of ['prepared','developed','draft'] as const){
  const s=game();mara(s,arrangement.reader==='pip');bridge(s);plant(s);sol(s,outcome==='prepared');plan(s,arrangement.time,arrangement.reader);invite(s);assert.deepEqual(planProblems(s.getSnapshot().chapter),[]);
  event(s,{kind:'BEGIN_GATHERING'});assert.equal(s.getSnapshot().chapter.story.phase,'arriving');assert.equal(s.getSnapshot().chapter.story.records.grandma,false);finishArrivals(s);assert.equal(s.getSnapshot().chapter.story.phase,'welcome');
  event(s,{kind:'NEXT_STORY'});finishSpokenTurn(s);shareTornWing(s);event(s,{kind:'NEXT_STORY'});event(s,{kind:'NEXT_STORY'});
  // Resume an actual new-edition telling, with the selected contribution frozen.
  event(s,{kind:'TURN_NEXT'});const paused=structuredClone(s.getSnapshot().chapter);
  const restored=unpack({format:1,content:paused.content,revision:paused.revision,writer:'new-edition-interruption',payload:paused,checksum:checksum(JSON.stringify(paused))})!;
  assert.ok(restored);assert.deepEqual(restored.payload,paused);s.send({type:'BOOT',chapter:restored.payload});
  assert.equal(s.getSnapshot().playback?.paused,true);
  assert.deepEqual(turnLines(s.getSnapshot().chapter).filter(line=>line.source==='sol').map(line=>line.text),sourcesFor(paused).sol.paragraphs);
  finishSpokenTurn(s);
  if(outcome==='developed'){event(s,{kind:'ADD_ENDING',scene:'thanks'});assert.equal(s.getSnapshot().chapter.story.phase,'discussion');event(s,{kind:'ASK_SOL',question:'thanks'});finishSpokenTurn(s);event(s,{kind:'ADD_ENDING',scene:'thanks'});finishSpokenTurn(s);assert.equal(s.getSnapshot().chapter.story.solEnding?.text,preparedEndingsFor(s.getSnapshot().chapter).thanks);}
  if(outcome==='draft'){event(s,{kind:'KEEP_DRAFT'});finishSpokenTurn(s);}
  assert.equal(s.getSnapshot().chapter.story.phase,'grandma');tellGrandmaStory(s);event(s,{kind:'MOMENT',moment:'gathering'});tick(s);event(s,{kind:'NEXT_STORY'});finishSpokenTurn(s);event(s,{kind:'FINISH'});
  if(arrangement.time==='usual'){assert.equal(s.getSnapshot().chapter.story.ending,null);event(s,{kind:'TAKE_COPY'});tick(s);assert.equal(s.getSnapshot().chapter.story.grandmaCopy,'pip');go(s,{x:MARA.x,z:MARA.z+.95});event(s,{kind:'DELIVER_COPY'});tick(s);finishSpokenTurn(s);event(s,{kind:'FINISH'});}
  const c=s.getSnapshot().chapter,ending=c.story.ending;assert.ok(ending);assert.equal(ending.sol,outcome);assert.equal(ending.mara,arrangement.time==='usual'?'absent':arrangement.reader==='mara'?'mara':'listener');assert.equal(ending.paragraphs.length,4);assert.equal(c.story.records.sol,outcome==='draft'?'draft':outcome==='developed'?'thanks':'bread');assert.ok(c.story.records.mara&&c.story.records.grandma&&c.story.records.pip);assert.equal(validChapter(c),true);
  const frozen=JSON.stringify(ending);event(s,{kind:'PRESENT',page:3,finished:true});event(s,{kind:'PLAN',time:'usual',reader:'mara'});event(s,{kind:'FINISH'});assert.equal(JSON.stringify(s.getSnapshot().chapter.story.ending),frozen);assert.equal(s.getSnapshot().chapter.history.filter(v=>v==='B').length,1);
 }
});
test('Changed plans require actual updated invitations without deleting the writing',()=>{
 const s=game();bridge(s);plant(s);sol(s,true);assert.equal(s.getSnapshot().chapter.maraHeard,false);mara(s,true);plan(s,'usual','pip');invite(s);const draft=s.getSnapshot().chapter.story.solDraft;
 event(s,{kind:'PLAN',time:'later',reader:'mara'});assert.ok(planProblems(s.getSnapshot().chapter).some(p=>p.includes('previous time')));event(s,{kind:'BEGIN_GATHERING'});assert.equal(s.getSnapshot().chapter.story.phase,'planning');
 invite(s);assert.deepEqual(planProblems(s.getSnapshot().chapter),[]);assert.deepEqual(s.getSnapshot().chapter.story.solDraft,draft);
 event(s,{kind:'PLAN',time:'later',reader:'pip'});assert.ok(!planProblems(s.getSnapshot().chapter).some(p=>p.startsWith('Sol')));assert.ok(planProblems(s.getSnapshot().chapter).some(p=>p.includes('Mara')));
});
test('Unsecured bridge actually fails, preserving possessions and all other progress',()=>{
 const s=game();mara(s,true);bridge(s,false);s.send({type:'TRY_CROSS'});tick(s);const c=s.getSnapshot().chapter;
 assert.equal(c.story.bridgeFailures,1);assert.equal(c.joined,false);assert.equal(c.crossed,false);assert.equal(c.page,'pip');assert.equal(c.seed,'pip');assert.equal(c.maraHeard,true);assert.ok(c.pip.x<0);assert.equal(validChapter(c),true);
 bridge(s);go(s,GRANDMA_APPROACH);assert.equal(s.getSnapshot().chapter.crossed,true);assert.equal(s.getSnapshot().chapter.story.bridgeFailures,1);
});
test('A later edit never silently replaces Sol’s selected contribution',()=>{
 const s=game();bridge(s);plant(s);sol(s,true);const selected=s.getSnapshot().chapter.story.solEnding;event(s,{kind:'EDIT',text:'An unfinished revision'});assert.deepEqual(s.getSnapshot().chapter.story.solEnding,selected);
 event(s,{kind:'SELECT_ENDING',contribution:{...selected!,text:'stale words'}});assert.deepEqual(s.getSnapshot().chapter.story.solEnding,selected);assert.equal(validChapter(s.getSnapshot().chapter),true);
});
test('Encounter v2 upgrades without inventing full-chapter completion',()=>{
 const s=game();mara(s,true);bridge(s);plant(s);const c=structuredClone(s.getSnapshot().chapter),{story:removed,...old}=c;void removed;
 const payload={...old,version:2,content:'garden-encounter-2'},raw={format:1,content:'garden-encounter-2',revision:9,writer:'old',payload,checksum:checksum(JSON.stringify(payload))},original=JSON.stringify(raw),updated=unpack(raw)!;
 assert.ok(updated);assert.equal(updated.content,'garden-chapter-3');assert.equal(updated.payload.story.ending,null);assert.equal(updated.payload.story.metSol,false);assert.equal(updated.payload.bloomed,true);assert.equal(bridgeReady(updated.payload),true);assert.equal(JSON.stringify(raw),original);
});
const q:GardenRequest={contract:1,requestId:'synthetic-1',activity:'sol-ending',revision:3,draftRevision:2,text:'I fixed the tile so the flour stayed dry.',exposed:['GA.SRC.SOL.3','GA.SRC.SOL.4','GA.SRC.LATER.1']};
test('Feedback: owned context, unavailable operation makes zero calls, malformed and stale proposals rejected',async()=>{
 assert.equal(validGardenRequest(q),true);assert.equal(validGardenRequest({...q,exposed:['invented']}),false);assert.equal(validGardenRequest({...q,text:'x'.repeat(4001)}),false);
 assert.equal((await new GardenFeedbackService().handle(q))?.status,'unavailable');const body=gardenRequestBody(q,'not-a-live-evaluation');assert.equal(body.store,false);assert.ok(!body.input.includes('OPENAI'));
 assert.equal(validFeedback({status:'supported',feedback:'That follows the story.',scene:'bread',refs:['invented']},q),false);
 let calls=0,release:(v:unknown)=>void=()=>{};const provider=new GardenFeedbackService(async()=>{calls++;await new Promise(r=>release=r);return {status:'supported',feedback:'The roof repair kept the flour dry.',scene:'bread',refs:['GA.SRC.SOL.4']};});const abort=new AbortController(),pending=provider.handle(q,abort.signal);assert.equal((await provider.handle({...q,requestId:'synthetic-2'}))?.status,'busy');abort.abort();release(null);assert.equal((await pending)?.status,'unavailable');assert.equal(calls,1);
});
test('Temporary audio encoding has a bounded mono WAV header and no persistence',()=>{
 const bytes=wav(new Float32Array([0,1,-1,.5]),16000),v=new DataView(bytes.buffer);assert.equal(bytes.length,52);assert.equal(v.getUint16(22,true),1);assert.equal(v.getUint32(24,true),16000);assert.equal(v.getInt16(46,true),32767);assert.equal(v.getInt16(48,true),-32768);
});
test('Listening assessment requires acoustic evidence and an explicit qualification policy',async()=>{
 const audio=Buffer.from(wav(new Float32Array(16000),16000)).toString('base64');assert.ok(decodeWav(audio));assert.equal(decodeWav('invalid'),null);
 assert.equal(speechFeedback({transcript:'He hesitated.',words:[]},'He hesitated.',null).status,'unavailable');
 const policy={qualificationId:'SYNTHETIC-contract-only',wordThreshold:60,minimumCoverage:.5};assert.equal(speechFeedback({transcript:'He hesitated.',words:[]},'He hesitated.',policy).status,'uncertain','Transcript match is not pronunciation evidence');
 const result=await new GardenSpeechService().handle({requestId:'synthetic-audio',attempt:1,target:'story-8',text:'He hesitated. Then he held out the bird.',audio,job:'reading'},new AbortController().signal);assert.equal(result?.status,'unavailable');
});
test('Phrase help explains the actual phrase; Duet title withholds unread story details',()=>{
 const kept=wordHelp('kept','He had kept his promise.');assert.equal(kept.phrase,'kept his promise');assert.equal(kept.definition,'Did what he had said he would do.');
 assert.equal(wordHelp('put','The wind ruffled our hair and rattled the leaves, but the cloth stayed put.').phrase,'stayed put');assert.equal(wordHelp('put','He put the seed in his backpack.').phrase,null);
 assert.equal(wordHelp('Duet','The Unexpected Duet',false,true).explanation,'');assert.equal(wordHelp('Duet','The Unexpected Duet',true,true).explanation,'The boy plays the flute while another passenger whistles the same tune.');
});
test('Reject invented outcome records and mismatched ending attendance on save',()=>{
 const s=game();const c=structuredClone(s.getSnapshot().chapter);c.story.maraPicture='wrong' as never;assert.equal(validChapter(c),false);
 c.story.maraPicture='repair';c.story.closingDone=true;assert.equal(validChapter(c),false);c.story.closingDone=false;c.story.presentation.finished=true;assert.equal(validChapter(c),false);
 const interim=structuredClone(s.getSnapshot().chapter);delete (interim.story as Partial<typeof interim.story>).maraPicture;const raw={format:1,content:'garden-chapter-3',revision:2,writer:'interim',payload:interim,checksum:checksum(JSON.stringify(interim))};const result=unpack(raw);assert.ok(result);assert.equal(result.payload.story.maraPicture,'repair');assert.equal(result.payload.revision,interim.revision+1);assert.equal(raw.payload.story.maraPicture,undefined);
});
test('Word jobs bind one occurrence to the current sentence and cannot replace reviewed meanings',async()=>{
 const draft='Rina brought me a loaf to show her apreciation.',start=draft.indexOf('apreciation'),q:WordRequest={requestId:'synthetic-word',revision:1,source:null,paragraph:0,draft,start,end:start+11,word:'apreciation',sentence:draft,disputed:null};assert.ok(wordContext(q));assert.equal(wordContext({...q,start:0}),null);assert.equal(wordContext({...q,sentence:'An invented context.'}),null);
 assert.equal(validWordReply({status:'supported',meaning:'A feeling of thanks.',explanation:'A suggested spelling.',spelling:'appreciation'},q),true);assert.equal(validWordReply({status:'supported',meaning:null,explanation:'Guess',spelling:'appreciation'},q),false);assert.equal(wordRequestBody(q,'not-live').store,false);assert.equal((await new GardenWordService().handle(q,new AbortController().signal))?.status,'unavailable');
 const s=game();bridge(s);plant(s);sol(s,true);event(s,{kind:'EDIT',text:draft+' Another apreciation.'});const d=s.getSnapshot().chapter.story.solDraft,selected=s.getSnapshot().chapter.story.solEnding;event(s,{kind:'REPLACE_WORD',revision:d.revision,start,end:start+11,word:'apreciation',replacement:'appreciation'});assert.equal(s.getSnapshot().chapter.story.solDraft.text,'Rina brought me a loaf to show her appreciation. Another apreciation.');assert.deepEqual(s.getSnapshot().chapter.story.solEnding,selected);event(s,{kind:'REPLACE_WORD',revision:d.revision,start,end:start+12,word:'appreciation',replacement:'thanks'});assert.equal(s.getSnapshot().chapter.story.solDraft.text,'Rina brought me a loaf to show her appreciation. Another apreciation.');
});
