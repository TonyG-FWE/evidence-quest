import {test,expect,type Page} from '@playwright/test';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {playDemoRoute} from './garden-demo-route.js';
import {completeConversation,deliverMaraReport,playArrivals,openStoryDirections,placeMemory,resumeGathering,inspectBirdConversation} from './garden-actions.js';
import {prepareDemoCapture,startDemoCapture,finishDemoCapture} from './nerdy-demo-capture.js';

test.describe.configure({retries:0});
test.use({viewport:{width:1366,height:768},video:'off'});
test.afterEach(async({page})=>{
 // Close manual capture even when a rehearsal assertion fails before the core ends.
 await page.evaluate(async()=>{try{await (window as any).nerdyCapture?.stop();}catch{/* Already stopped or never started. */}}).catch(()=>{});
 await page.screencast.stop().catch(()=>{});
});
const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
async function close(page:Page){for(let i=0;i<12&&await page.locator('.garden-reader').count();i++)await page.locator('.g-reader-top .g-close').click();await expect(page.locator('.garden-reader')).toHaveCount(0);}
async function walk(page:Page,who:'Mara'|'Sol'|'Grandma'){
 await close(page);const talk=button(page,who==='Sol'?'Talk to Sol':'Talk to '+who+' E');
 if(!await talk.isVisible()){const places=page.locator('.garden-access');if(await places.getAttribute('open')===null)await places.locator(':scope>summary').click();await places.getByRole('button',{name:'Go to '+who,exact:true}).click();await places.locator(':scope>summary').click();}
 await expect(talk).toBeVisible({timeout:90000});await talk.click();if(who!=='Grandma')await completeConversation(page);
}
// No synthetic Audio, source injection, state injection, clock acceleration or provider retry.
async function nativePlayback(page:Page,until:()=>Promise<boolean>,captionChoices:string[]){
 const end=Date.now()+300000;
 while(Date.now()<end){
  if(await until())return;
  const ownWords=page.getByRole('button',{name:/^Listen to my words as /}),captions=button(page,'Read without narration');
  if(await ownWords.isVisible()&&await captions.isVisible()){
   captionChoices.push((await ownWords.textContent())!);await captions.click();
  }else if(await page.locator('.g-continuous-playback[data-playback-state="paused"]').isVisible()){
   throw Error('Unexpected native narration pause: '+await page.locator('.g-continuous-playback').innerText());
  }
  await page.waitForTimeout(250);
 }
 throw Error('Native whole-story playback did not finish in five minutes.');
}
async function nativeBird(page:Page,turn:()=>Promise<void>){
 await openStoryDirections(page);await button(page,'Speak to the boy').click();await inspectBirdConversation(page);await button(page,'Would you like some help?').click();await openStoryDirections(page);
 for(const action of ['Walk to the dock office','Pick up the tape','Return to the boy','Line up the torn wing','Tape across the tear','Place the strip','Let the boy carry his bird','Return to Grandma’s garden'])await button(page,action).click();
 await expect(page.locator('.g-mara-scene')).toHaveCount(0);await expect.poll(async()=>await page.locator('.garden-gathering-controls').isVisible()||await page.locator('.garden-reader').isVisible()).toBe(true);
 if(await page.locator('.garden-gathering-controls').isVisible())await turn();await expect(page.locator('.garden-reader')).toBeVisible();
}

test('Nerdy rehearsal: ordinary fresh journey, real recorded voices, ending and complete finale',async({page},info)=>{
 test.skip(process.env['EQ_NERDY_REHEARSAL']!=='1','Explicit, separately recorded final rehearsal.');test.setTimeout(1800000);
 const started=Date.now(),cues:{name:string;ms:number}[]=[],captionChoices:string[]=[],errors:string[]=[],feedbackPosts:string[]=[],feedbackSources:{requestId:string;exposed:string[]}[]=[];
 const measurements:{name:string;metrics:unknown}[]=[],presenterPauses:{name:string;targetSeconds:number;durationMs:number}[]=[];
 const cue=(name:string)=>{const ms=Date.now()-started;cues.push({name,ms});console.log('[Nerdy rehearsal] '+name+' '+Math.round(ms/1000)+'s');};page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST'&&r.url().endsWith('/api/garden/feedback')){const q=r.postDataJSON();feedbackPosts.push(q.requestId);feedbackSources.push({requestId:q.requestId,exposed:q.exposed});}});
 // Presenter pauses follow the run-of-show. They do not alter the game clock,
 // animation, audio loading or commands, and contain no replacement narration.
 const pacedCore=process.env['EQ_NERDY_PACED_CORE']==='1';
 const pace=async(name:string,targetSeconds:number)=>{
  if(!pacedCore)return;
  const coreStart=cues.find(c=>c.name==='core-bakery-begins');if(!coreStart)throw Error('Core pacing began before capture');
  const durationMs=Math.max(0,targetSeconds*1000-(Date.now()-started-coreStart.ms));
  presenterPauses.push({name,targetSeconds,durationMs});console.log('[Nerdy rehearsal] presenter pause '+name+' '+Math.round(durationMs/1000)+'s');
  if(durationMs)await page.waitForTimeout(durationMs);
 };
 let nativeTurn=0;const turn=async()=>{const turnId=++nativeTurn;await expect(page.locator('.garden-reader')).toHaveCount(0);cue('story-turn-'+turnId+'-begins');await nativePlayback(page,()=>page.locator('.garden-reader').isVisible(),captionChoices);cue('story-turn-'+turnId+'-complete');};
 const replay=process.env['EQ_NERDY_REPLAY_FEEDBACK']==='1';let originalRequestId:string|undefined,recordedReplayCount=0;
 if(replay){
  const original=JSON.parse(await fs.readFile('evidence/nerdy-demo-20260924/live-feedback.json','utf8'));
  const marker=JSON.parse(await fs.readFile('evidence/nerdy-demo-20260924/live-request-attempt.json','utf8'));
  expect(original.requestCount).toBe(1);expect(original.result.status).toBe('supported');originalRequestId=original.requestId;
  // A labeled response fixture, separate from native media. Playwright routing
  // disables the entire HTTP cache, so leave the ordinary asset/audio path alone.
  await page.addInitScript(({original,draftSha256})=>{
   const nativeFetch=window.fetch.bind(window),calls:any[]=[];(window as any).nerdyRecordedFeedback=calls;
   window.fetch=async(input,init)=>{
    const url=new URL(input instanceof Request?input.url:String(input),location.href);
    if(url.pathname==='/api/garden/config'){
     const response=await nativeFetch(input,init),config=await response.json();
     return new Response(JSON.stringify({...config,textFeedback:true,textFeedbackActivities:['sol-ending']}),{status:200,headers:{'Content-Type':'application/json'}});
    }
    if(url.pathname==='/api/garden/feedback'){
     const q=JSON.parse(typeof init?.body==='string'?init.body:input instanceof Request?await input.clone().text():'{}');
     const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(q.text)))).map(x=>x.toString(16).padStart(2,'0')).join('');
     if(calls.length||q.activity!=='sol-ending'||digest!==draftSha256||JSON.stringify([...q.exposed].sort())!==JSON.stringify([...original.sourceContext.exposed].sort()))throw Error('Recorded feedback does not match this exact draft and opened sources.');
     const response={...original.result,requestId:q.requestId,revision:q.revision,draftRevision:q.draftRevision};calls.push({request:q,response});
     return new Response(JSON.stringify(response),{status:200,headers:{'Content-Type':'application/json'}});
    }
    return nativeFetch(input,init);
   };
  },{original,draftSha256:marker.draftSha256});
 }
 await prepareDemoCapture(page);let captureStart:Awaited<ReturnType<typeof startDemoCapture>>|undefined,captureEnd:Awaited<ReturnType<typeof finishDemoCapture>>|undefined;
 cue('fresh-opening');
 await playDemoRoute(page,info,async kind=>{cue(kind);measurements.push({name:kind,metrics:JSON.parse(await page.locator('.garden-scene').getAttribute('data-metrics')??'null')});if(kind==='roof')await pace('roof consequence',240);if(kind==='dough')await pace('preparing the promised bread',330);if(kind==='handoff')await pace('the thank-you visit',450);},{
  opening:async()=>{
   await button(page,'promised').click();await button(page,'Listen to the sentence').click();const stop=page.locator('.garden-word-card').getByRole('button',{name:'Stop listening',exact:true});await expect(stop).toBeVisible();await expect(stop).toBeHidden({timeout:45000});await expect(page.locator('.g-audio-notice')).toHaveCount(0);await button(page,'Close word help').click();
   await button(page,'Practise reading this page').click();await expect(page.locator('.g-mic-off')).toContainText('Your microphone is off');await page.waitForTimeout(1500);await page.locator('.g-practice-overlay').getByRole('button',{name:'Back to the story',exact:true}).click();
  },
  bakery:async()=>{
   if(replay)await page.evaluate(()=>{const label=document.createElement('div');label.textContent='Recorded rehearsal · feedback replayed from the verified live response';Object.assign(label.style,{position:'fixed',top:'65px',right:'12px',zIndex:'2147483647',padding:'4px 8px',background:'#183e35',color:'white',font:'11px system-ui',borderRadius:'4px',pointerEvents:'none'});document.body.append(label);});
   cue('core-bakery-begins');captureStart=await startDemoCapture(page,info.outputPath('demo-core-video.webm'));await page.waitForTimeout(3000);
   await button(page,'Listen to this page').click();await expect(button(page,'Stop listening')).toBeVisible();await expect(button(page,'Stop listening')).toBeHidden({timeout:90000});await expect(page.locator('.g-audio-notice')).toHaveCount(0);
  },
  bakeryReady:async()=>{
   await button(page,'Listen to the conversation').click();await expect(button(page,'Stop listening')).toBeVisible();await expect(button(page,'Stop listening')).toBeHidden({timeout:90000});await expect(page.locator('.g-audio-notice')).toHaveCount(0);
   await page.locator('.garden-passage').getByRole('button',{name:'intact',exact:true}).click();await expect(page.locator('.garden-word-card')).toContainText('Whole and undamaged');
   for(const name of ['Listen to the word','Listen to the sentence']){await button(page,name).click();const stop=page.locator('.garden-word-card').getByRole('button',{name:'Stop listening',exact:true});await expect(stop).toBeVisible();await expect(stop).toBeHidden({timeout:45000});await expect(page.locator('.g-audio-notice')).toHaveCount(0);}
   await page.waitForTimeout(2000);await button(page,'Close word help').click();await button(page,'Practise reading the conversation').click();await expect(page.locator('.g-mic-off')).toContainText('Your microphone is off');await page.waitForTimeout(3000);await page.locator('.g-practice-overlay').getByRole('button',{name:'Back to the story',exact:true}).click();
   await pace('premise, reading and oral practice',180);
  },
 });
 await button(page,'Talk to Sol').click();await completeConversation(page);await button(page,'Let’s finish the ending together.').click();cue('writing');
 const draft='I fixed the roof so Rina’s flour stayed dry. She baked the bread she had promised. Later, she brought me a loaf. I thought it was only a little repair, but it had helped her keep her promise.';
 // Open and scroll both accounts through ordinary native wheel input. Merely opening
 // a source tab does not establish exposure to words below its visible reading area.
 for(const source of ['His draft','What happened next']){
  await button(page,source).click();const pane=page.locator('.g-writing-source-scroll');await pane.hover();await page.waitForTimeout(400);
  let reachedEnd=false;
  for(let i=0;i<40;i++){
   const box=await pane.evaluate(e=>({top:e.scrollTop,height:e.clientHeight,total:e.scrollHeight}));
   if(box.top+box.height>=box.total-2){reachedEnd=true;break;}
   await page.mouse.wheel(0,Math.max(100,box.height*.65));await page.waitForTimeout(350);
  }
  expect(reachedEnd).toBe(true);cue('source-viewed: '+source);
 }
 await page.getByLabel('Your ending for Sol’s story',{exact:true}).fill(draft);await button(page,'Baking, then the visit').click();
 await pace('writing from the witnessed events',600);
 if(process.env['EQ_NERDY_LIVE']==='1'||replay){
  if(!replay){const config=await (await page.request.get('/api/garden/config')).json();expect(config.textFeedback).toBe(true);expect(config.textFeedbackActivities).toEqual(['sol-ending']);}
  await page.getByText('Support for my ending',{exact:true}).click();
  const marker='evidence/nerdy-demo-20260924/live-request-attempt.json',ledger='evidence/demo-ai-20260919/openai-attempts.jsonl',before=await fs.readFile(ledger);
  if(!replay)await fs.writeFile(marker,JSON.stringify({at:new Date().toISOString(),scope:'Exactly one authorized Sol-ending request; no automatic retries.',beforeLedgerSha256:createHash('sha256').update(before).digest('hex'),beforeLedgerBytes:before.length,draftSha256:createHash('sha256').update(draft).digest('hex')},null,2)+'\n',{flag:'wx'});
  cue('live-feedback');const response=replay?undefined:page.waitForResponse(r=>r.request().method()==='POST'&&r.url().endsWith('/api/garden/feedback'),{timeout:22000}).then(r=>r.json()).catch(()=>null);
  await button(page,'Ask for feedback').click();let result:any,replayedCall:any;
  if(replay){await expect.poll(()=>page.evaluate(()=>(window as any).nerdyRecordedFeedback.length)).toBe(1);replayedCall=await page.evaluate(()=>(window as any).nerdyRecordedFeedback[0]);result=replayedCall.response;recordedReplayCount=1;expect(feedbackPosts).toHaveLength(0);}else{result=await response;expect(feedbackPosts).toHaveLength(1);}
  await expect(button(page,'Stop feedback')).toHaveCount(0,{timeout:20000});
  if(result?.feedback){await page.getByText(result.feedback,{exact:true}).scrollIntoViewIfNeeded();await expect(page.getByText(result.feedback,{exact:true})).toBeInViewport();}
  const visible=await page.locator('.g-meaning-activity').innerText();await fs.writeFile(replay?info.outputPath('recorded-feedback-replay.json'):'evidence/nerdy-demo-20260924/live-feedback.json',JSON.stringify({at:new Date().toISOString(),requestCount:feedbackPosts.length,requestId:result?.requestId??feedbackPosts[0],sourceContext:replay?{requestId:replayedCall.request.requestId,exposed:replayedCall.request.exposed}:feedbackSources[0],result,visible,automaticRetries:0,replayed:replay,recordedReplayCount,originalRequestId},null,2)+'\n');await page.screenshot({path:info.outputPath('live-feedback.png')});await page.waitForTimeout(6500);
  await page.getByText('Support for my ending',{exact:true}).click();
 }
 await pace('review the recorded feedback',630);
 await button(page,'Try my ending').click();await expect(page.locator('.garden-world-activity>.g-story-stage')).toHaveAttribute('aria-busy','false',{timeout:60000});cue('ending-preview');await page.screenshot({path:info.outputPath('demo-ending.png')});await page.waitForTimeout(6500);await pace('preview and confirm the ending',720);await button(page,'Use this ending').click();cue('core-ending-confirmed');await page.waitForTimeout(2000);captureEnd=await finishDemoCapture(page,info.outputPath('demo-core-audio.webm'));expect(captureEnd.peak).toBeGreaterThan(.01);expect(captureEnd.plays).toBeGreaterThan(0);
 const candidate={inputSha256:process.env['EQ_NERDY_CANDIDATE_INPUT_SHA'],outputSha256:process.env['EQ_NERDY_CANDIDATE_OUTPUT_SHA']};
 const captureRecord=JSON.stringify({at:new Date().toISOString(),scope:'Native recorded gameplay audio and screen capture from this rehearsal. No microphone recording or synthetic audio.',candidate,cues:cues.map(row=>({...row})),coreDurationMs:cues.find(row=>row.name==='core-ending-confirmed')!.ms-cues.find(row=>row.name==='core-bakery-begins')!.ms,liveFeedbackRequests:replay?0:feedbackPosts.length,recordedFeedbackReplays:recordedReplayCount,originalRequestId,feedbackMode:replay?'explicitly-labeled-replay-of-verified-live-response':'live-verification',...captureStart,...captureEnd},null,2)+'\n';
 const timedCapture=JSON.parse(captureRecord);Object.assign(timedCapture,{pacedCore,presenterPauses,pacingScope:'Pauses for presenter explanation; no presenter voice was recorded.'});
 if(pacedCore){expect(timedCapture.coreDurationMs).toBeGreaterThanOrEqual(10*60*1000);expect(timedCapture.coreDurationMs).toBeLessThanOrEqual(15*60*1000);}
 await fs.writeFile(info.outputPath('fallback-capture.json'),JSON.stringify(timedCapture,null,2)+'\n');
 // Keep the first completed core capture, including its one live response, if a
 // later finale assertion requires a separate provider-free rehearsal.
 await fs.writeFile('evidence/nerdy-demo-20260924/'+(replay?'fallback-capture-replay.json':'fallback-capture.json'),captureRecord,{flag:'wx'}).catch(error=>{if(error.code!=='EEXIST')throw error;});
 await walk(page,'Mara');await button(page,'I can read your story to Grandma.').click();await expect(page.locator('.garden-reading-scroll')).toContainText('Pip is carrying her copy.');
 await walk(page,'Grandma');await page.getByRole('button',{name:/^(Let’s talk about why Mara stopped visiting\.|Tell Grandma what Mara said)$/}).click();await deliverMaraReport(page);await button(page,'Back to Grandma').click();await page.getByRole('button',{name:/^Sol wants to come/}).click();await page.getByRole('button',{name:/^(Plan|Review) the gathering( plan)? with Grandma$/}).click();await button(page,'At the usual time').click();await button(page,'Pip reads Mara’s story').click();await button(page,'Preview the gathering').click();await button(page,'Use this plan').click();
 await walk(page,'Sol');await button(page,'We’re starting at the usual time.').click();await walk(page,'Mara');await button(page,'We’re keeping the usual time. I’ll read your story for you.').click();await walk(page,'Grandma');await page.getByRole('button',{name:/^(Plan|Review) the gathering( plan)? with Grandma$/}).click();await button(page,'Tell Grandma everyone has agreed').click();await button(page,'Begin the gathering').click();cue('gathering');await playArrivals(page);
 await button(page,'Welcome everyone in the garden').click();await turn();await button(page,'Share The Torn Wing').click();await nativeBird(page,turn);await button(page,'Invite Sol to share').click();await button(page,'Let Sol share with everyone').click();await turn();await button(page,'Hear Grandma ask Sol').click();await turn();await button(page,'Let Grandma bring out the cushions').click();await expect(button(page,'Let Grandma finish her account')).toBeVisible({timeout:60000});await button(page,'Let Grandma finish her account').click();await button(page,'Let Grandma share her story').click();await turn();
 await button(page,'Sharing our stories').click();await placeMemory(page);await resumeGathering(page);await button(page,'Hear Grandma’s offer for Mara').click();await turn();await button(page,'Take a copy for Mara').click();await expect(page.locator('.garden-reading-scroll')).toContainText('The copy is in Pip’s backpack.');cue('copy-handed-to-pip');await walk(page,'Mara');await button(page,'Give Grandma’s story').click();await turn();await button(page,'Finish the chapter').click();cue('finale');await button(page,'Watch the ending').click();await expect(page.locator('[data-world-activity="ending-presentation"]')).toBeVisible();await nativePlayback(page,async()=>!await page.locator('[data-world-activity="ending-presentation"]').count(),captionChoices);await button(page,'Read the garden’s stories').click();await expect(page.locator('.g-lantern-library article')).toHaveCount(6);cue('complete');await page.screenshot({path:info.outputPath('complete-finale.png')});
 expect(errors).toEqual([]);const coreStart=cues.find(c=>c.name==='core-bakery-begins')!.ms,coreEnd=cues.find(c=>c.name==='core-ending-confirmed')!.ms;
 const evidence={at:new Date().toISOString(),scope:'Ordinary fresh UI journey. Native approved recorded audio; explicit captions for unpublished player words. No synthetic audio or state injection. Core fallback captures the rendered game sound and screen; no microphone audio.',candidate,feedbackMode:replay?'explicitly-labeled-replay-of-verified-live-response':'live-verification',liveProviderRequests:replay?0:feedbackPosts.length,recordedFeedbackReplays:recordedReplayCount,originalRequestId,viewport:{width:1366,height:768},durationMs:Date.now()-started,coreDurationMs:coreEnd-coreStart,cues,measurements,measurementLimits:'DOM renderer metrics during native rehearsal with capture active. RAF proxies and conservative allocations; not quiet-system or physical-display qualification.',captionChoices,feedbackPosts,pageErrors:errors,capture:{...captureStart,...captureEnd}};
 const timedEvidence={...evidence,pacedCore,presenterPauses,pacingScope:pacedCore?'Measured 12-minute run-of-show with presenter pauses; no presenter voice was recorded.':'Unpaced native journey; no presenter voice was recorded.'};
 await fs.writeFile('evidence/nerdy-demo-20260924/bakery-rehearsal.json',JSON.stringify(timedEvidence,null,2)+'\n');await info.attach('rehearsal',{body:JSON.stringify(timedEvidence,null,2),contentType:'application/json'});
});
