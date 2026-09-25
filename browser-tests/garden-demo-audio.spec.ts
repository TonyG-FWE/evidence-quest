import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {buildStagedBridge,completeConversation} from './garden-actions.js';
import {installPlaybackVoice,automaticVoice,spokenWords,spokenSegments,finishVoiceSegment} from './garden-playback-voice.js';

test('one primary reading pair excludes helper instructions and unselected choices',async({page})=>{
 await installPlaybackVoice(page);await page.goto('/garden');
 const button=(name:string)=>page.getByRole('button',{name,exact:true});
 await button('Begin Pip’s adventure').click();await automaticVoice(page,true);
 await expect(button('Listen to this page')).toHaveCount(1);await expect(button('Listen to the conversation')).toHaveCount(0);
 await expect(button('Practise reading this page')).toHaveCount(1);
 const expected=(await page.locator('[data-source-component]').allTextContents()).join(' ').replace(/\s+/g,' ').trim();
 await button('Listen to this page').click();await expect(button('Listen to this page')).toBeVisible({timeout:15000});
 expect((await spokenWords(page)).join(' ').replace(/\s+/g,' ').trim()).toBe(expected);
 expect((await spokenWords(page)).join(' ')).not.toContain('Click a word');
 await button('Start playing').click();await button('Go to Mara').click();await button('Talk to Mara E').click();await completeConversation(page);
 await button("I'll ask Grandma to start the next gathering later.").click();
 await expect(page.locator('.garden-reading-scroll .g-dialogue-response .g-reading-tools')).toHaveCount(0);
 await expect(button('Listen to the conversation')).toHaveCount(1);await expect(button('Practise reading the conversation')).toHaveCount(1);
 const before=(await spokenSegments(page)).length;await button('Listen to the conversation').click();await expect(button('Listen to the conversation')).toBeVisible({timeout:10000});
 const actual=(await spokenSegments(page)).slice(before);expect(actual.map(part=>part.speaker)).toEqual(['pip','mara']);
 expect(actual.map(part=>part.text).join(' ')).toBe('I’ll ask Grandma to start the next gathering later. Please ask her. Starting after the last boat returns would give me time to finish work.');
});

test('bakery listening includes the visible narrator and all three replies once',async({page})=>{
 // Synthetic media completion proves text/routing; the native rehearsal checks real playback separately.
 await installPlaybackVoice(page);await page.goto('/garden');const button=(name:string)=>page.getByRole('button',{name,exact:true});
 test.setTimeout(180000);await button('Begin Pip’s adventure').click();await button('Start playing').click();await buildStagedBridge(page);await button('Go to Grandma').click();await expect(button('Talk to Grandma E')).toBeVisible();await button('Go to Rina’s bakery').click();await button('Talk to Rina').click();await completeConversation(page);
 await expect(button('Listen to the conversation')).toHaveCount(1);await expect(button('Listen to this page')).toHaveCount(0);
 await expect(button('Practise reading the conversation')).toHaveCount(1);await expect(button('Practise reading this page')).toHaveCount(0);
 const expected=(await page.locator('[data-source-component],.g-dialogue-response [data-readable-text]').allTextContents()).join(' ').replace(/\s+/g,' ').trim();
 await automaticVoice(page,true);await button('Listen to the conversation').click();await expect(button('Stop listening')).toBeVisible();await expect(button('Listen to the conversation')).toBeVisible({timeout:15000});
 const actual=await spokenSegments(page);expect(actual.map(part=>part.text).join(' ').replace(/\s+/g,' ').trim()).toBe(expected);
 expect(actual.map(part=>part.speaker).filter((speaker,index,all)=>index===0||speaker!==all[index-1])).toEqual(['narrator','pip','rina','sol']);
 expect(actual.map(part=>part.text).join(' ')).not.toContain('Click a word');expect(actual.map(part=>part.text).join(' ')).not.toContain('I can bring the spare tile');
 await expect(page.locator('.g-audio-notice')).toHaveCount(0);await expect(button('I can bring the spare tile to Sol.')).toBeVisible();
});

test('Stop during the speaker pause prevents the next queued recording',async({page})=>{
 // Synthetic media completion; real application queue, timer and native controls.
 await installPlaybackVoice(page);await page.goto('/garden');const button=(name:string)=>page.getByRole('button',{name,exact:true});
 await button('Begin Pip’s adventure').click();await button('Listen to this page').click();await finishVoiceSegment(page);
 const count=(await spokenWords(page)).length;await page.waitForTimeout(120);expect((await spokenWords(page)).length).toBe(count);
 await button('Stop listening').click();await page.waitForTimeout(750);expect((await spokenWords(page)).length).toBe(count);
 await expect(button('Listen to this page')).toBeVisible();
});

test('an isolated word plays its complete independent WAV once through native audio',async({page},info)=>{
 const manifest=JSON.parse(readFileSync('public/audio/cast/manifest.json','utf8')),word=manifest.entries.find((entry:any)=>entry.speaker==='narrator'&&entry.text==='promised');
 expect(word.clip.boundaryMethod).toBe('complete-word-recording-v1');expect(word.clip.startSample).toBe(0);expect(word.clip.leadingSilenceSamples).toBe(0);expect(word.clip.trailingSilenceSamples).toBe(0);expect(word.clip.sha256).toBe(word.wavSha256);
 await page.addInitScript(()=>{const nativePlay=HTMLMediaElement.prototype.play;(window as any).__nativeAudio=[];HTMLMediaElement.prototype.play=function(){const record={uri:this.src,duration:this.duration,ended:false,end:0};(window as any).__nativeAudio.push(record);this.addEventListener('ended',()=>{record.ended=true;record.end=this.currentTime;},{once:true,capture:true});return nativePlay.call(this);};});
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 await page.locator('[data-source-component]').getByRole('button',{name:'promised',exact:true}).click();await page.getByRole('button',{name:'Listen to the word',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>(window as any).__nativeAudio[0]?.ended)).toBe(true);
 const recordings=await page.evaluate(()=>(window as any).__nativeAudio);expect(recordings).toHaveLength(1);expect(new URL(recordings[0].uri).pathname).toBe(word.clip.uri);
 expect(recordings[0].duration).toBeCloseTo(word.clip.duration,2);expect(recordings[0].end).toBeCloseTo(recordings[0].duration,2);
 await expect(page.locator('.g-audio-notice')).toHaveCount(0);await info.attach('native-word',{body:JSON.stringify({word:'promised',clip:word.clip,recordings,limitation:'Native decoding and complete playback. Human pronunciation quality remains a separate listening check.'}),contentType:'application/json'});
});

test('word listening refuses an obsolete sentence-derived clip without a provider fallback',async({page})=>{
 const manifest=JSON.parse(readFileSync('public/audio/cast/manifest.json','utf8'));
 const word=manifest.entries.find((entry:any)=>entry.speaker==='narrator'&&entry.text==='promised');word.clip.boundaryMethod='bounded-word-energy-v1';
 await page.route('**/audio/cast/manifest.json',route=>route.fulfill({json:manifest}));
 let clipRequests=0,providerRequests=0;page.on('request',request=>{if(new URL(request.url()).pathname===word.clip.uri)clipRequests++;});
 await page.route('**/api/garden/*audio',route=>{providerRequests++;return route.abort();});
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 await page.locator('[data-source-component]').getByRole('button',{name:'promised',exact:true}).click();await page.getByRole('button',{name:'Listen to the word',exact:true}).click();
 await expect(page.locator('.g-audio-notice')).toContainText('This word’s recording is being repaired. You can listen to its sentence.');
 expect(clipRequests).toBe(0);expect(providerRequests).toBe(0);await expect(page.getByRole('button',{name:'Listen to the sentence',exact:true})).toBeVisible();
});

test('compiled opening and Read screen use the existing narrator clip for promised',async({page,request},info)=>{
 const worklet=await request.get('/garden-recorder.js');
 expect(worklet.status()).toBe(200);expect(await worklet.text()).toContain('registerProcessor');
 const manifest=JSON.parse(readFileSync('public/audio/cast/manifest.json','utf8'));
 const text='Pip had promised to come before dark today.';
 const clip=manifest.entries.find((entry:any)=>entry.speaker==='narrator'&&entry.text.trim()===text);
 expect(clip?.clip?.uri).toBeTruthy();
 const requested:string[]=[];page.on('request',r=>requested.push(new URL(r.url()).pathname));
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 const paragraph=page.locator('[data-source-component]').filter({hasText:text});
 await paragraph.getByRole('button',{name:'promised',exact:true}).click();
 await expect(page.locator('.garden-word-card')).toContainText(text);
 await page.getByRole('button',{name:'Listen to the sentence',exact:true}).click();
 await expect.poll(()=>requested.includes(clip.clip.uri)).toBe(true);
 await expect(page.locator('.g-audio-notice')).toHaveCount(0);
 await page.getByRole('button',{name:'Close word help',exact:true}).click();
 await page.getByRole('button',{name:'Read what’s on screen',exact:true}).click();
 const inspected=page.locator('[data-readable-text][data-speech-source]').filter({hasText:text});
 await expect(inspected).toHaveCount(1);
 const source=JSON.parse((await inspected.getAttribute('data-speech-source'))!);
 expect(source.id).toBe('opening');expect(source.paragraph).toBe(1);expect(source.edition).toBe('literary-20260916');
 await inspected.getByRole('button',{name:'promised',exact:true}).click();
 await page.getByRole('button',{name:'Listen to the sentence',exact:true}).click();
 await expect(page.locator('.g-audio-notice')).toHaveCount(0);
 await expect(page.locator('.garden-word-card').getByRole('button',{name:'Stop listening',exact:true})).toBeVisible();
 await page.screenshot({path:info.outputPath('promised-narrator.png')});
});

test('choice word help retains Pip as speaker and does not select the choice',async({page})=>{
 await page.goto('/garden');const button=(name:string)=>page.getByRole('button',{name,exact:true});
 await button('Begin Pip’s adventure').click();await button('Start playing').click();await button('Go to Mara').click();await button('Talk to Mara E').click();
 await completeConversation(page);
 await button('Help me read these choices').click();
 const choice=page.locator('.g-choice-reading-preview [data-readable-text]').filter({hasText:'I can read your story to Grandma.'});
 await expect(choice).toHaveAttribute('data-speech-speaker','pip');
 await choice.getByRole('button',{name:'story',exact:true}).click();
 await button('Listen to the sentence').click();await expect(page.locator('.g-audio-notice')).toHaveCount(0);
 await button('Close word help').click();await expect(button('I can read your story to Grandma.')).toBeVisible();
});

test('synthetic microphone denial leaves the recorder off and reading available',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator.mediaDevices,'getUserMedia',{configurable:true,value:async()=>{throw new DOMException('Synthetic denied permission','NotAllowedError');}}));
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 await page.getByRole('button',{name:'Practise reading this page',exact:true}).click();await page.getByRole('button',{name:'Start listening',exact:true}).click();
 const practice=page.locator('.g-practice-overlay');await expect(practice).toHaveAttribute('data-recording','ready');
 await expect(practice).toHaveAttribute('data-local-audio-bytes','0');await expect(practice).toContainText('Microphone access is not available right now.');
 await expect(page.getByRole('button',{name:'Listen to this part',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Back to the story',exact:true}).click();await expect(practice).toHaveCount(0);
});
