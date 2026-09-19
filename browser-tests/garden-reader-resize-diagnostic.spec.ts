import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {CROSSING} from '../src/garden/model.js';
import {savedChapter} from './garden-save-fixture.js';
const png=createRequire(import.meta.url)('pngjs') as {PNG:{sync:{read(bytes:Buffer):{width:number;height:number;data:Buffer}}}};
for(const mode of ['inert-with-fixed-size','resize-without-reader'] as const)test('diagnostic reader boundary: '+mode,async({page},info)=>{
 const button=(name:string)=>page.getByRole('button',{name,exact:true}),scene=page.locator('.garden-scene'),rows:unknown[]=[];
 await page.goto('/garden');await button('Begin Pip’s adventure').click();await button('Start playing').click();await button('Go to the bridge pieces').click();await expect(scene).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));await savedChapter(page);
 async function capture(label:string){const bytes=await scene.locator('canvas').screenshot({path:info.outputPath(label+'.png'),animations:'allow'}),image=png.PNG.sync.read(bytes);let total=0,green=0;for(let y=Math.floor(image.height*.28);y<image.height*.76;y+=3)for(let x=Math.floor(image.width*.30);x<image.width*.76;x+=3){const i=(y*image.width+x)*4;total++;if(image.data[i+1]!>image.data[i]!+4&&image.data[i+1]!>image.data[i+2]!+5)green++;}rows.push({label,greenFraction:green/total,meta:await scene.evaluate(e=>{const canvas=e.querySelector('canvas')!,r=canvas.getBoundingClientRect();return {inert:!!e.closest('[inert]'),size:[canvas.width,canvas.height],cssSize:[r.width,r.height],frame:(e as HTMLElement).dataset['renderedFrame'],hidden:document.hidden};})});}
 await capture('00-before');
 if(mode==='inert-with-fixed-size'){
  const size=await scene.evaluate(e=>({width:e.clientWidth,height:e.clientHeight}));
  // Test-only geometry hold isolates inert toggling from reader resize. This
  // intentionally changes layout and is not a proposed production appearance.
  await page.addStyleTag({content:`.garden-world{flex:0 0 ${size.width}px!important;width:${size.width}px!important;min-width:${size.width}px!important;height:${size.height}px!important;min-height:${size.height}px!important}`});
  await button('Pause').click();await expect(page.locator('.garden-world')).toHaveAttribute('inert','');await capture('01-reader-inert');await page.locator('.g-reader-top .g-close').click();
 }else{
  await page.setViewportSize({width:1400,height:980});await expect.poll(()=>scene.locator('canvas').evaluate(e=>e.width)).toBe(2800);await capture('01-resized-no-reader');await page.setViewportSize({width:1440,height:1000});await expect.poll(()=>scene.locator('canvas').evaluate(e=>e.width)).toBe(2880);
 }
 await capture('02-after');
 if(process.env['EQ_DIAG_CANVAS_LAYER']==='1'){
  await page.addStyleTag({content:'.garden-scene canvas{transform:translateZ(0)}'});
  await capture('03-isolated-canvas-layer');await page.setViewportSize({width:1400,height:980});await expect.poll(()=>scene.locator('canvas').evaluate(e=>e.width)).toBe(2800);await capture('04-isolated-layer-resize');
  await page.setViewportSize({width:1440,height:1000});await expect.poll(()=>scene.locator('canvas').evaluate(e=>e.width)).toBe(2880);await capture('05-isolated-layer-restored-size');
 }
 if(process.env['EQ_DIAG_CANVAS_LAYER']==='reattach'){
  const original=await scene.locator('canvas').elementHandle();
  await original!.evaluate(canvas=>{const parent=canvas.parentElement!;canvas.remove();parent.prepend(canvas);});await capture('03-same-canvas-reattached');
  expect(await original!.evaluate(canvas=>canvas===document.querySelector('.garden-scene canvas'))).toBe(true);
  await page.setViewportSize({width:1400,height:980});await expect.poll(()=>scene.locator('canvas').evaluate(e=>e.width)).toBe(2800);await capture('04-resize-after-reattach');
  await original!.evaluate(canvas=>{const parent=canvas.parentElement!;canvas.remove();parent.prepend(canvas);});await capture('05-same-canvas-reattached-again');
 }
 await writeFile(info.outputPath('reader-resize-diagnostic.json'),JSON.stringify({mode,scope:'One test-only fixed-layout inert discriminator or ordinary viewport resize; optional test-only independent canvas compositing layer. No renderer/context mutation, state injection or timing claim.',rows},null,2)+'\n');
});
