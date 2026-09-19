import {test,expect} from '@playwright/test';
import type {Chapter} from '../src/garden/model.js';
import {checksum,validChapter} from '../src/garden/persistence.js';
import {savedChapter} from './garden-save-fixture.js';

test('diagnostic opaque and faded architecture retain their appearance',async({page},info)=>{
 test.setTimeout(90000);
 for(const [name,point,overview]of [['overview',{x:-2.8,z:.8},true],['dock',{x:-8.7,z:-15.4},false],['bakery',{x:18.05,z:1.45},false]] as const){
  await page.goto('/garden');await savedChapter(page);if(await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).isVisible()){await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();}const payload:Chapter={...await savedChapter(page),reducedMotion:true,pip:point};expect(payload.started).toBe(true);expect(validChapter(payload)).toBe(true);
  const record={format:1,content:payload.content,revision:payload.revision,writer:'labeled-visual-fixture',payload,checksum:checksum(JSON.stringify(payload))};
  await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const request=indexedDB.open('evidence-quest-garden-adventure-v1',1);request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};}),record);
  await page.reload();const scene=page.locator('.garden-scene');await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe('approved-r2-feet');
  if(overview){await page.getByRole('button',{name:'Map overview',exact:true}).click();await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').grandma).toBe('approved-r2-feet');}
  await expect(scene).toHaveAttribute('data-pip-x',point.x.toFixed(3));await scene.locator('canvas').screenshot({path:info.outputPath(name+'.png')});
  await info.attach(name+'-view',{body:JSON.stringify({camera:JSON.parse((await scene.getAttribute('data-camera-projection'))!),yielding:await scene.getAttribute('data-yielding-buildings'),fixture:'Explicit static diagnostic save, reduced-motion pose for deterministic image comparison. Not gameplay or cadence evidence.'}),contentType:'application/json'});
 }
});
