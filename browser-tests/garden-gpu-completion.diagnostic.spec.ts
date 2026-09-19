import {test,expect} from '@playwright/test';
test.use({trace:'off',video:'off'});
test('diagnostic actual-game GPU completion separates submitted work from presentation cost',async({page},info)=>{
 test.setTimeout(180000);await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();await page.getByRole('button',{name:'Go to the bridge pieces',exact:true}).click();const scene=page.locator('.garden-scene');await expect(scene).toHaveAttribute('data-pip-x','-2.800');await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe('approved-r2-feet');
 const results=[];
 for(const view of ['encounter','overview']){
  if(view==='overview'){await page.keyboard.up('ArrowLeft');await page.getByRole('button',{name:'Map overview',exact:true}).click();await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-metrics')??'{}').imported?.sources??0).toBe(2);}
  await scene.locator('canvas').focus();await page.keyboard.down('ArrowLeft');
  for(const mode of ['normal','gpu-finish','normal']){
   const beforeFrame=JSON.parse(await scene.getAttribute('data-metrics')??'{}').frames??0;
   await page.evaluate(mode=>(window as unknown as {eqRenderProfile:(mode:string)=>void}).eqRenderProfile(mode),mode);
   await expect.poll(async()=>{const m=JSON.parse(await scene.getAttribute('data-metrics')??'{}');return m.diagnostic===mode&&m.frames>beforeFrame?m.activeSamples:0;},{timeout:35000}).toBeGreaterThanOrEqual(180);
   const metrics=JSON.parse((await scene.getAttribute('data-metrics'))!),gpu=JSON.parse((await scene.getAttribute('data-gpu-timing'))!);expect(metrics.dpr).toBe(2);expect(gpu.msaa).toBeGreaterThan(0);results.push({view,mode,metrics,gpu});
  }
 }
 await page.keyboard.up('ArrowLeft');await info.attach('gpu-completion-diagnostic',{body:JSON.stringify({qualification:false,scope:'Only diagnostic finish() scheduling differs; no flags, DPR, geometry, shaders, shadows or MSAA sample count are changed.',results}),contentType:'application/json'});
});
