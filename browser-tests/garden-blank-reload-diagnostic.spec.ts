import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {CROSSING} from '../src/garden/model.js';
import {savedChapter} from './garden-save-fixture.js';

test('diagnostic: ordinary reload distinguishes initial adventure canvas presentation',async({page},info)=>{
 test.setTimeout(90000);
 const rows:unknown[]=[],errors:string[]=[],messages:unknown[]=[];
 page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>messages.push({type:message.type(),text:message.text()}));
 const button=(name:string)=>page.getByRole('button',{name,exact:true});
 async function capture(label:string){
  const scene=page.locator('.garden-scene'),canvas=scene.locator('canvas');
  const metadata=await scene.evaluate(element=>{const canvas=element.querySelector('canvas')!,box=canvas.getBoundingClientRect();return {dataset:{...(element as HTMLElement).dataset},hidden:document.hidden,visibility:document.visibilityState,dpr:devicePixelRatio,canvas:{width:canvas.width,height:canvas.height,box:{x:box.x,y:box.y,width:box.width,height:box.height}}};});
  await page.screenshot({path:info.outputPath(label+'-page.png'),animations:'allow'});
  await canvas.screenshot({path:info.outputPath(label+'-canvas.png'),animations:'allow'});
  rows.push({label,...metadata});
 }
 try{
  await page.goto('/garden');await button('Begin Pip’s adventure').click();await button('Start playing').click();await button('Go to the bridge pieces').click();
  const scene=page.locator('.garden-scene');await expect(scene).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));
  const before=await savedChapter(page);await page.waitForTimeout(600);await capture('00-started-walk-before-reload');
  await page.reload();await expect(page.locator('.g-save')).toHaveText('Saved in this browser');
  await expect(scene).toHaveAttribute('data-pip-x',before.pip.x.toFixed(3));await expect(scene).toHaveAttribute('data-pip-z',before.pip.z.toFixed(3));
  await expect(scene).toHaveAttribute('data-rendered-view','walk');await page.waitForTimeout(600);await capture('01-same-adventure-after-reload');
  const restored=await savedChapter(page);expect(restored.runId).toBe(before.runId);expect(restored.pip).toEqual(before.pip);expect(restored.sections).toEqual(before.sections);expect(restored.seed).toBe(before.seed);
  await scene.locator('canvas').focus();await page.keyboard.down('ArrowUp');
  try{await expect.poll(()=>scene.getAttribute('data-pip-z')).not.toBe(before.pip.z.toFixed(3));await capture('02-native-movement-after-reload');}finally{await page.keyboard.up('ArrowUp');}
 }finally{
  const evidence={scope:'Uninstrumented renderer/context: ordinary begin/start, walk, saved acknowledgement, reload of same adventure, then native movement. No RAF hooks, framebuffer reads, context options, forced renders, state injection or timing claims. DOM metadata and normal screenshots only.',project:info.project.name,errors,messages,rows};
  await writeFile(info.outputPath('reload-presentation-diagnostic.json'),JSON.stringify(evidence,null,2)+'\n');await info.attach('reload-presentation-diagnostic',{body:JSON.stringify(evidence),contentType:'application/json'});
 }
});
