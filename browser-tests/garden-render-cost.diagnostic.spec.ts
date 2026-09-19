import {test,expect} from '@playwright/test';
import {openDirections} from './garden-actions.js';
test('diagnostic isolated rendering costs; modified modes cannot qualify quality',async({page},info)=>{
 test.setTimeout(180000);
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 const scene=page.locator('.garden-scene');await expect.poll(async()=>JSON.parse((await scene.getAttribute('data-character-assets'))??'{}').pip).toBe('approved-r2-feet');
 await page.getByRole('button',{name:'Go to the bridge pieces',exact:true}).click();await expect(scene).toHaveAttribute('data-pip-x','-2.800');
 await scene.locator('canvas').focus();await page.keyboard.down('ArrowLeft');
 const results=[];
 for(const mode of ['normal','no-dom','static-shadows','no-shadows','unlit','no-scene']){
  await page.evaluate(mode=>(window as unknown as {eqRenderProfile:(mode:string)=>void}).eqRenderProfile(mode),mode);
  await expect.poll(async()=>{const m=JSON.parse((await scene.getAttribute('data-metrics'))??'{}');return m.diagnostic===mode?m.activeSamples:0;},{timeout:25000}).toBeGreaterThan(100);
  results.push(JSON.parse((await scene.getAttribute('data-metrics'))!));
 }
 await page.keyboard.up('ArrowLeft');
 await info.attach('diagnostic-rendering-costs',{body:JSON.stringify({qualification:false,results},null,2),contentType:'application/json'});
});
