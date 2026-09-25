import {test,expect} from '@playwright/test';
import {completeConversation} from './garden-actions.js';
import {sourcesFor} from '../src/garden/content.js';
const sources=sourcesFor({narrativeEdition:'literary-20260916'});
import {readingPages} from '../src/garden/readingPages.js';
import {readWholeStory} from './garden-story-reading.js';
import {installPlaybackVoice,finishVoiceSegment,spokenWords} from './garden-playback-voice.js';
const normalized=(text:string)=>text.replace(/\s+/g,' ').trim();
test.setTimeout(90000);
test('Complete reading: the whole story is heard in order, can stop, and resumes without sending the page',async({page},info)=>{
 // Synthetic cast-media and microphone callbacks: exact text and ownership only, not native acoustic proof.
 await installPlaybackVoice(page);
 await page.addInitScript(()=>{
  const track={stop(){},addEventListener(){}};Object.defineProperty(navigator,'mediaDevices',{value:{getUserMedia:async()=>({getTracks:()=>[track],getAudioTracks:()=>[track]})},configurable:true});
  (window as any).AudioContext=class{sampleRate=16000;state='running';destination={};audioWorklet={addModule:async()=>{}};createMediaStreamSource(){return{connect(){}};}async resume(){}async close(){this.state='closed';}};
  (window as any).AudioWorkletNode=class{port:any={onmessage:null,postMessage:()=>{this.port.onmessage?.({data:{samples:new Float32Array(16000)}});this.port.onmessage?.({data:{done:true}});},close(){}};connect(){}disconnect(){}};
 });
 const button=(name:string)=>page.getByRole('button',{name,exact:true});
 await page.goto('/garden');await button('Begin Pip’s adventure').click();await button('Start playing').click();await button('Go to Mara').click();await button('Talk to Mara E').click();await completeConversation(page);await button('I can read your story to Grandma.').click();await expect(page.locator('.garden-reading-scroll')).toContainText('Pip is carrying her copy.');await button('Backpack').click();await page.locator('.g-item').filter({has:page.locator('strong',{hasText:'The Torn Wing'})}).getByRole('button',{name:'Read',exact:true}).click();await page.getByRole('navigation',{name:'Reading tools'}).getByRole('button',{name:'Pause',exact:true}).click();await page.getByLabel('Largest reading text',{exact:true}).check();await page.getByLabel('More space between lines',{exact:true}).check();await page.locator('.g-reader-top .g-close').click();await expect(page.getByRole('heading',{name:'The Torn Wing',exact:true})).toBeVisible();
 const tools=page.getByRole('region',{name:'Read the complete The Torn Wing',exact:true});await tools.getByRole('button',{name:'Listen to the whole story',exact:true}).click();
 const stop=tools.getByRole('button',{name:'Stop listening',exact:true});
 for(let i=0;i<200;i++){
  await expect.poll(async()=>await page.evaluate(()=>!!(window as any).__playbackVoice.pending)||!await stop.count()).toBe(true);
  if(!await stop.count())break;
  await finishVoiceSegment(page);
 }
 await expect(stop).toHaveCount(0);await expect.poll(async()=>normalized((await spokenWords(page)).join(' '))).toBe(normalized(sources.story.paragraphs.join('\n\n')));
 await tools.getByRole('button',{name:'Listen to the whole story',exact:true}).click();await expect.poll(()=>page.evaluate(()=>!!(window as any).__playbackVoice.pending)).toBe(true);await stop.click();const count=(await spokenWords(page)).length;await page.evaluate(()=>(window as any).__playbackVoice.callbacks.at(-1)?.());await expect.poll(async()=>(await spokenWords(page)).length).toBe(count);await expect(stop).toHaveCount(0);
 await tools.getByRole('button',{name:'Listen to the whole story',exact:true}).click();await expect.poll(()=>page.evaluate(()=>!!(window as any).__playbackVoice.pending)).toBe(true);const closingCount=(await spokenWords(page)).length;await button('Back to the backpack').click();await page.evaluate(()=>(window as any).__playbackVoice.callbacks.at(-1)?.());await expect.poll(async()=>(await spokenWords(page)).length).toBe(closingCount);await page.locator('.g-item').filter({has:page.locator('strong',{hasText:'The Torn Wing'})}).getByRole('button',{name:'Read',exact:true}).click();
 await readWholeStory(page,'The Torn Wing',sources.story.paragraphs.join('\n\n'));await tools.getByRole('button',{name:'Practise reading the whole story',exact:true}).click();const pageCount=readingPages(sources.story.paragraphs.join('\n\n')).length;expect(pageCount).toBeGreaterThan(2);await expect(page.locator('.g-reading-pages')).toContainText('Page '+pageCount+' of '+pageCount);await expect(button('Next reading page')).toBeDisabled();while(await button('Previous reading page').isEnabled())await button('Previous reading page').click();await expect(page.locator('.g-practice-words')).toContainText(sources.story.paragraphs[0]!);await page.setViewportSize({width:320,height:568});await expect(button('Start listening')).toBeVisible();await expect(button('Back to the story')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath('whole-story-compact.png')});await page.locator('.g-practice-overlay').getByRole('button',{name:'Listen to this part',exact:true}).click();await button('Start listening').click();await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-recording','listening');await page.locator('.g-practice-overlay').evaluate(el=>{el.scrollTop=el.scrollHeight;});await expect(button('Stop')).toBeInViewport({ratio:1});await page.locator('.g-practice-overlay').evaluate(el=>{el.scrollTop=0;});await expect(button('Stop')).toBeInViewport({ratio:1});await expect(button('Next reading page')).toBeDisabled();await button('Stop').click();await button('Discard recording').click();await button('Back to the story').click();await expect(tools.getByRole('button',{name:'Stop listening',exact:true})).toHaveCount(0);await button('Back to the backpack').click();await expect(page.locator('.g-item').filter({hasText:'The Torn Wing'})).toBeVisible();
 await info.attach('scope',{body:'Ordinary page controls, complete text, local resume and page possession. Model speech and microphone capture use labeled synthetic seams. No native microphone, replay decoder, provider or acoustic qualification.',contentType:'text/plain'});
});
