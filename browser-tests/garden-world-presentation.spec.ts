import {expectedAssetStatus} from './garden-asset-profile.js';
import {test,expect} from '@playwright/test';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import {CROSSING} from '../src/garden/model.js';
import {savedChapter} from './garden-save-fixture.js';
const png=createRequire(import.meta.url)('pngjs') as {PNG:{sync:{read(bytes:Buffer):{width:number;height:number;data:Buffer}}}};

test('fresh adventure presents real village pixels through movement, reading and a new adventure',async({page},info)=>{
 test.setTimeout(90000);const captures:unknown[]=[],errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 const button=(name:string)=>page.getByRole('button',{name,exact:true}),scene=page.locator('.garden-scene');
 async function visibleWorld(label:string){
  await expect(scene).toHaveAttribute('data-character-assets',new RegExp(expectedAssetStatus));
  await expect(scene).toHaveAttribute('data-rendered-view','walk');
  await expect.poll(()=>scene.evaluate(e=>{const canvas=e.querySelector('canvas')!;return Number((e as HTMLElement).dataset['renderedWidth'])===canvas.width&&Number((e as HTMLElement).dataset['renderedHeight'])===canvas.height;})).toBe(true);
  let row:{label:string;width:number;height:number;samples:number;villageColors:number;fraction:number;uniqueColors:number}|undefined;
  const deadline=Date.now()+1200;let attempts=0;
  do{
  const bytes=await scene.locator('canvas').screenshot({path:info.outputPath(label+'.png'),animations:'allow'}),image=png.PNG.sync.read(bytes);
  let samples=0,villageColors=0;const colors=new Set<string>();
  // Broad color areas of actual foliage/terrain/river. Green text or markers on
  // a CSS-only blank canvas occupy far less than15% of this central region.
  // No renderer hook, fixed screenshot baseline or synthetic scene state.
  for(let y=Math.floor(image.height*.28);y<image.height*.76;y+=3)for(let x=Math.floor(image.width*.30);x<image.width*.76;x+=3){const i=(y*image.width+x)*4,r=image.data[i]!,g=image.data[i+1]!,b=image.data[i+2]!;samples++;if(g>r+4&&g>b+5)villageColors++;colors.add(r+','+g+','+b);}
  row={label,width:image.width,height:image.height,samples,villageColors,fraction:villageColors/samples,uniqueColors:colors.size};attempts++;
  }while((row.fraction<=.15||row.uniqueColors<=500)&&Date.now()<deadline);
  captures.push({...row,attempts});
  expect.soft(row.fraction,'Actual village pixels must be present after bounded presentation settling, not only native controls over CSS background').toBeGreaterThan(.15);
  expect.soft(row.uniqueColors,'Scene detail must be visible in the captured browser presentation').toBeGreaterThan(500);
 }
 try{
  await page.goto('/garden');await button('Begin Pip’s adventure').click();await expect(button('Start playing')).toBeVisible();await button('Start playing').click();await button('Go to the bridge pieces').click();await expect(scene).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));
  await savedChapter(page);await visibleWorld('00-fresh-start-world');
  const before=await savedChapter(page);await scene.locator('canvas').focus();await page.keyboard.down('ArrowUp');
  try{await expect.poll(()=>scene.getAttribute('data-pip-z')).not.toBe(before.pip.z.toFixed(3));await visibleWorld('01-native-movement');}finally{await page.keyboard.up('ArrowUp');}
  const stopped=await savedChapter(page),sameCanvas=await scene.locator('canvas').elementHandle();await button('Pause').click();await expect(page.getByRole('checkbox',{name:'Reduced motion',exact:true})).toBeVisible();
  expect(await sameCanvas!.evaluate(canvas=>canvas===document.querySelector('.garden-scene canvas')),'Opening a later reader retains the actual canvas').toBe(true);await page.locator('.g-reader-top .g-close').click();
  expect(await sameCanvas!.evaluate(canvas=>canvas===document.querySelector('.garden-scene canvas')),'Returning from reading must not recreate the renderer').toBe(true);expect((await savedChapter(page)).pip).toEqual(stopped.pip);await visibleWorld('02-reading-return');
  await button('Pause').click();page.once('dialog',dialog=>dialog.accept());await button('Start a new adventure').click();await expect(button('Begin Pip’s adventure')).toBeVisible();await button('Begin Pip’s adventure').click();await button('Start playing').click();await button('Go to the bridge pieces').click();await expect(scene).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));
  expect((await savedChapter(page)).runId).not.toBe(stopped.runId);await visibleWorld('03-new-adventure-world');expect(errors).toEqual([]);
 }finally{const evidence={scope:'Ordinary native controls; screenshot pixel assertions without renderer/context hooks, page reload or injected state. Test-only browser-local new adventure archives its previous run.',project:info.project.name,captures,errors};await writeFile(info.outputPath('world-presentation.json'),JSON.stringify(evidence,null,2)+'\n');await info.attach('world-presentation',{body:JSON.stringify(evidence),contentType:'application/json'});}
});
