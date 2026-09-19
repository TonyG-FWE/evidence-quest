import {expectedAssetStatus,pipAssetPattern,reviewProfile} from './garden-asset-profile.js';
import {test,expect} from '@playwright/test';
import {savedChapter} from './garden-save-fixture.js';
import {reviewAssets} from '../src/garden/assets/reviewManifest.js';

test('reduced-motion view paints a character that finishes loading without further input',async({page},info)=>{
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 await page.getByRole('button',{name:'Pause',exact:true}).click();await page.getByRole('checkbox',{name:'Reduced motion',exact:true}).check();await page.locator('.g-reader-top .g-close').click();await savedChapter(page);
 let requested=false,release!:()=>void;const held=new Promise<void>(resolve=>release=resolve);
 await page.route(pipAssetPattern,async route=>{requested=true;await held;await route.continue();});
 try{
  await page.reload();await expect.poll(()=>requested).toBe(true);await savedChapter(page);const scene=page.locator('.garden-scene');
  await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe('loading');
  const before=Number(await scene.getAttribute('data-rendered-frame'));release();
  await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe(expectedAssetStatus);
  await expect.poll(async()=>Number(await scene.getAttribute('data-rendered-frame')),{message:'An asset arriving in reduced motion must cause a real render without a new key or click',timeout:5000}).toBeGreaterThan(before);
  await page.screenshot({path:info.outputPath('reduced-motion-model-arrival.png')});await info.attach('asset-arrival-render',{body:JSON.stringify({before,after:Number(await scene.getAttribute('data-rendered-frame')),scope:'Actual native reduced-motion setting, real held model request, real loaded asset and subsequent renderer frame. No state injection.'}),contentType:'application/json'});
 }finally{release();}
});

for(const id of ['pip','tree-1'] as const)test('retired '+id+' request cannot interrupt the studio and reloads on return',async({page},info)=>{
 test.skip(!reviewProfile,'Supplied-model review location ownership.');test.setTimeout(150000);
 let requested=false,requests=0,release!:()=>void;const held=new Promise<void>(resolve=>release=resolve);
 await page.route('**'+reviewAssets[id]!.uri,async route=>{requests++;if(requests===1){requested=true;await held;await route.fulfill({status:503,body:'Synthetic delayed failure after leaving the requested location'});}else await route.continue();});
 const scene=page.locator('.garden-scene'),assets=async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}');
 try{
  await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
  if(id==='tree-1'){await page.getByRole('button',{name:'Map and camera',exact:true}).click();await page.getByRole('button',{name:'Fit map',exact:true}).click();}
  await expect.poll(()=>requested).toBe(true);
  await page.getByRole('button',{name:'Inspect studio',exact:true}).click();
  await expect.poll(async()=>(await assets()).cast?.some((actor:{id:string;ready:boolean})=>actor.id==='jo'&&actor.ready),{timeout:90000}).toBe(true);
  release();await expect.poll(async()=>(await assets()).pending,{timeout:90000}).toBe(0);
  const frame=Number(await scene.getAttribute('data-rendered-frame'));
  await expect.poll(async()=>Number(await scene.getAttribute('data-rendered-frame'))).toBeGreaterThan(frame+2);
  await expect(page.getByRole('button',{name:'Restore view',exact:true})).toHaveCount(0);
  const studio=await assets();
  await page.getByRole('button',{name:'Return to village',exact:true}).click();
  if(id==='tree-1'){if(!await page.getByRole('button',{name:'Fit map',exact:true}).isVisible())await page.getByRole('button',{name:'Map and camera',exact:true}).click();await page.getByRole('button',{name:'Fit map',exact:true}).click();}
  await expect.poll(async()=>id==='pip'?(await assets()).pip===expectedAssetStatus:(await assets()).objects?.includes(id),{timeout:90000}).toBe(true);
  expect(requests).toBeGreaterThanOrEqual(2);await expect(page.getByRole('button',{name:'Restore view',exact:true})).toHaveCount(0);
  await info.attach('retired-asset-request',{body:JSON.stringify({id,requests,studio,returned:await assets(),scope:'Synthetic delayed HTTP 503 only. Actual model request, native studio/return controls, asynchronous ownership, renderer and later reload. No state injection or graphics-quality change.'}),contentType:'application/json'});
 }finally{release();}
});
