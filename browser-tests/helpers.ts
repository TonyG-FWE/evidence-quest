import {expect,type Page} from '@playwright/test';
import type {SaveEnvelope} from '../contracts/types.js';
export async function saved(page:Page):Promise<SaveEnvelope>{
 await expect(page.getByTestId('save-status')).toContainText('Saved on this device.');
 return page.evaluate(async()=>new Promise((resolve,reject)=>{
  const open=indexedDB.open('evidence-quest',1);open.onerror=()=>reject(open.error);
  open.onsuccess=()=>{const db=open.result,tx=db.transaction('caseSlots'),request=tx.objectStore('caseSlots').get('current');tx.oncomplete=()=>{db.close();resolve(JSON.parse(request.result));};tx.onabort=()=>reject(tx.error);};
 }));
}
export async function start(page:Page){await page.goto('/');await page.getByRole('button',{name:'Start',exact:true}).click();await expect(page.locator('.game-header strong')).toHaveText('Stage');}
export async function target(page:Page,owner:string){await page.getByRole('button',{name:/Move to/}).first().click();await page.locator(`[data-owner="${owner}"]`).click();}
export async function go(page:Page,owner:string,room:string){await target(page,owner);await expect(page.locator('.game-header strong')).toHaveText(room);}
export async function closePanel(page:Page){await page.locator('.task-close button').click();}
export async function settled(page:Page){await expect(page.getByRole('button',{name:'Stop walking',exact:true})).toHaveCount(0);return saved(page);}
export async function readSlots(page:Page):Promise<{current:unknown;previous:unknown;preferences:unknown}>{
 return page.evaluate(async()=>new Promise((resolve,reject)=>{const open=indexedDB.open('evidence-quest',1);open.onerror=()=>reject(open.error);open.onsuccess=()=>{const db=open.result,tx=db.transaction(['caseSlots','preferences']),current=tx.objectStore('caseSlots').get('current'),previous=tx.objectStore('caseSlots').get('previous'),preferences=tx.objectStore('preferences').get('current');tx.oncomplete=()=>{db.close();resolve({current:current.result,previous:previous.result,preferences:preferences.result});};};}));
}
export async function injectSlots(page:Page,values:{current?:unknown;previous?:unknown}){
 await page.evaluate(async values=>new Promise<void>((resolve,reject)=>{const open=indexedDB.open('evidence-quest',1);open.onerror=()=>reject(open.error);open.onsuccess=()=>{const db=open.result,tx=db.transaction('caseSlots','readwrite');for(const [key,value]of Object.entries(values))tx.objectStore('caseSlots').put(value,key);tx.oncomplete=()=>{db.close();resolve();};tx.onabort=()=>reject(tx.error);};}),values);
}
