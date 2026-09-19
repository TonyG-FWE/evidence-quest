import {test,expect,type Page} from '@playwright/test';
import {readFile} from 'node:fs/promises';
async function openMeaning(page:Page){
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 const token=page.locator('.garden-reader .g-word').filter({hasText:/^lantern$/i}).first();
 await token.click();await expect(page.getByRole('button',{name:'Hear the meaning',exact:true})).toBeVisible();return token;
}
test('Definition narrator: Escape cancels a pending local catalogue load and restores its word',async({page})=>{
 let release:(()=>void)|undefined,requests=0;
 await page.route('**/audio/cast/manifest.json',async route=>{requests++;await new Promise<void>(resolve=>{release=resolve;});await route.fulfill({status:503,body:'Unavailable'}).catch(()=>{});});
 const word=await openMeaning(page);await page.getByRole('button',{name:'Hear the meaning',exact:true}).click();await expect(page.getByRole('button',{name:'Cancel reading',exact:true})).toBeVisible();
 await page.keyboard.press('Escape');release?.();await expect(page.locator('.garden-word-card')).toHaveCount(0);await expect(word).toBeFocused();expect(requests).toBe(1);
});
test('Definition narrator: unavailable local audio preserves the meaning without device speech',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},speak(){document.documentElement.dataset['unexpectedDefinitionSpeech']='true';}}});});
 await page.route('**/audio/cast/manifest.json',route=>route.fulfill({status:503,body:'Unavailable'}));
 await openMeaning(page);const text=await page.locator('.garden-word-card>p').first().innerText();await page.getByRole('button',{name:'Hear the meaning',exact:true}).click();
 await expect(page.locator('.g-definition-narration [role=status]')).toHaveText('Voice library unavailable. Try again, or keep reading.');await expect(page.locator('.garden-word-card>p').first()).toHaveText(text);await expect(page.locator('html')).not.toHaveAttribute('data-unexpected-definition-speech','true');
});
for(const dpr of [1,2])test.describe('Native saved cast DPR '+dpr,()=>{
 test.use({deviceScaleFactor:dpr});
 test('All eight selected saved voices start at zero and finish at their own boundary, with no provider',async({page},info)=>{
  const manifest=JSON.parse(await readFile('public/audio/cast/manifest.json','utf8'));const clips=Object.keys(manifest.cast).map(speaker=>manifest.entries.find((e:any)=>e.speaker===speaker&&e.voiceId===manifest.cast[speaker]&&e.clip?.uri&&e.clip.duration>=.7&&e.clip.duration<=3));
  expect(clips.every(Boolean)).toBe(true);let providerRequests=0;await page.route('**/api/garden/*audio',route=>{providerRequests++;return route.abort();});await page.goto('/garden');
  // This intentionally uses real browser decode/playback. Acoustic voice acceptance remains Tony's review.
  const results=[];
  for(const clip of clips){
   await page.evaluate(clip=>{const button=document.createElement('button');button.textContent='Play native cast sample';button.id='native-cast-proof';button.onclick=()=>{const audio=new Audio(),uri=clip.clip.uri,proof={audio,voice:clip.voiceId,speaker:clip.speaker,text:clip.text,uri,failed:'',start:-1,ended:false};(window as any).__nativeCastProof=proof;audio.onerror=()=>{proof.failed=audio.error?.message??'Native clip could not decode';};audio.onended=()=>{proof.ended=true;};audio.onloadedmetadata=async()=>{proof.start=audio.currentTime;try{await audio.play();}catch(error){proof.failed=String(error);}};audio.src=uri;audio.load();};document.body.append(button);},clip);
   await page.locator('#native-cast-proof').click();await expect.poll(()=>page.evaluate(()=>{const p=(window as any).__nativeCastProof;return p.failed||p.ended||(!p.audio.paused&&p.audio.readyState>=2&&p.audio.currentTime>0);}),{timeout:15000}).toBeTruthy();
   await expect.poll(()=>page.evaluate(()=>(window as any).__nativeCastProof.failed)).toBe('');
   await expect.poll(()=>page.evaluate(()=>(window as any).__nativeCastProof.ended)).toBe(true);
   const result=await page.evaluate(()=>{const p=(window as any).__nativeCastProof,result={voice:p.voice,speaker:p.speaker,text:p.text,uri:p.uri,start:p.start,time:p.audio.currentTime,duration:p.audio.duration,ended:p.ended};p.audio.pause();p.audio.removeAttribute('src');p.audio.load();document.querySelector('#native-cast-proof')?.remove();return result;});
   expect(result.start).toBe(0);expect(result.ended).toBe(true);expect(Math.abs(result.duration-clip.clip.duration)).toBeLessThan(.08);expect(Math.abs(result.time-result.duration)).toBeLessThan(.12);results.push(result);
  }
  expect(providerRequests).toBe(0);await info.attach('native-selected-cast',{body:JSON.stringify({dpr,manifestPlayback:manifest.playback,results,claim:'Native independent clip decode, zero start, media-clock progression and natural ended boundary. No provider request; no acoustic acceptance claim.'},null,2),contentType:'application/json'});
 });
 test('Meaning button plays packaged selected narrator and Stop releases its media owner',async({page})=>{
  await page.addInitScript(()=>{const NativeAudio=window.Audio;(window as any).__nativeAudio=[];window.Audio=class extends NativeAudio{constructor(){super();(window as any).__nativeAudio.push(this);}};});
  let providerRequests=0;await page.route('**/api/garden/*audio',route=>{providerRequests++;return route.abort();});
  await openMeaning(page);await page.getByRole('button',{name:'Hear the meaning',exact:true}).click();await expect(page.getByRole('button',{name:'Stop listening',exact:true})).toBeVisible();
  await expect.poll(()=>page.evaluate(()=>(window as any).__nativeAudio.some((audio:HTMLAudioElement)=>!audio.paused&&audio.currentTime>0))).toBe(true);
  await page.getByRole('button',{name:'Stop listening',exact:true}).click();await expect.poll(()=>page.evaluate(()=>(window as any).__nativeAudio.every((audio:HTMLAudioElement)=>audio.paused&&!audio.getAttribute('src')))).toBe(true);expect(providerRequests).toBe(0);
 });
});
