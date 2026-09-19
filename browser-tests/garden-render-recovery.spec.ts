import {test,expect} from '@playwright/test';
import {PNG} from 'pngjs';

for(const deviceScaleFactor of [1,2])for(const viewport of [{width:1440,height:900},{width:390,height:844}])test.describe(`opening graphics ${viewport.width}px DPR${deviceScaleFactor}`,()=>{
 test.use({viewport,deviceScaleFactor});
 test('Begin shows the village; closing the reader preserves it; restart and resize preserve play',async({page},info)=>{
  test.setTimeout(150000);const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>void dialog.accept());
  await page.goto('/garden');
  for(let run=1;run<=2;run++){
   await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
   const scene=page.locator('.garden-scene'),canvas=scene.locator('canvas');
   await expect(canvas).toBeVisible();await expect(scene).toHaveAttribute('data-scene-phase','ready',{timeout:90000});
   await expect(page.getByRole('button',{name:'Start playing',exact:true})).toBeInViewport();
   await expect.poll(()=>scene.getAttribute('data-character-assets')).toContain('"pip":"');
   const png=PNG.sync.read(await canvas.screenshot()),colors=new Set<string>();
   for(let i=0;i<png.data.length;i+=64)colors.add(png.data.subarray(i,i+3).toString('hex'));
   expect(colors.size).toBeGreaterThan(100);await page.screenshot({path:info.outputPath(`begin-${run}.png`)});
   const original=await canvas.elementHandle();await page.getByRole('button',{name:'Start playing',exact:true}).click();
   expect(await original!.evaluate(element=>element===document.querySelector('.garden-scene canvas'))).toBe(true);
   const before=await scene.getAttribute('data-pip-z');await page.keyboard.down('ArrowUp');await page.waitForTimeout(450);await page.keyboard.up('ArrowUp');
   await expect.poll(()=>scene.getAttribute('data-pip-z')).not.toBe(before);await page.screenshot({path:info.outputPath(`walk-${run}.png`)});
   await page.getByRole('button',{name:'Help',exact:true}).click();await page.locator('.g-reader-top .g-close').click();
   expect(await original!.evaluate(element=>element===document.querySelector('.garden-scene canvas'))).toBe(true);
   await page.setViewportSize({width:viewport.width-20,height:viewport.height-40});
   await expect.poll(()=>canvas.evaluate(c=>c.width===Math.floor(c.clientWidth*devicePixelRatio)&&c.height===Math.floor(c.clientHeight*devicePixelRatio))).toBe(true);
   await page.setViewportSize(viewport);
   if(run===1){await page.getByRole('button',{name:'Pause',exact:true}).click();await page.getByRole('button',{name:'Start a new adventure',exact:true}).click();}
  }
  expect(errors).toEqual([]);
  await info.attach('scope',{body:'Two ordinary fresh starts with native renderer pixels, movement, reader transitions, resize, and a restart. Screenshots require visual inspection; palette variation alone is not visual acceptance. No live providers or saved-state fixtures.',contentType:'text/plain'});
 });
});

test('actual graphics context can be recreated without resetting Pip or the chapter',async({page},info)=>{
 test.setTimeout(120000);await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 const scene=page.locator('.garden-scene');await expect(scene).toHaveAttribute('data-scene-phase','ready',{timeout:90000});await page.getByRole('button',{name:'Start playing',exact:true}).click();
 await page.keyboard.down('ArrowUp');await page.waitForTimeout(400);await page.keyboard.up('ArrowUp');
 const before=await scene.evaluate(e=>({x:e.dataset['pipX'],z:e.dataset['pipZ'],sections:e.dataset['sections'],phase:e.dataset['chapterPhase']}));
 const supported=await scene.locator('canvas').evaluate((canvas:HTMLCanvasElement)=>{const gl=canvas.getContext('webgl2'),extension=gl?.getExtension('WEBGL_lose_context');if(!extension)return false;extension.loseContext();return true;});
 test.skip(!supported,'Native context loss extension unavailable; this recovery check is NOT_RUN in this browser.');
 await expect(page.getByRole('button',{name:'Restore view',exact:true})).toBeVisible();await page.getByRole('button',{name:'Restore view',exact:true}).click();
 await expect(scene).toHaveAttribute('data-scene-phase','ready',{timeout:90000});
 expect(await scene.evaluate(e=>({x:e.dataset['pipX'],z:e.dataset['pipZ'],sections:e.dataset['sections'],phase:e.dataset['chapterPhase']}))).toEqual(before);
 await page.screenshot({path:info.outputPath('context-recovered.png')});
 await info.attach('scope',{body:'Synthetic context-loss trigger on the actual native WebGL renderer; recovery uses ordinary Restore view, retains position/chapter/material placement, and reloads supplied artwork. This does not simulate an actual device/driver crash.',contentType:'text/plain'});
});

test('a failed opening landscape exposes recovery and retries without losing the introduction',async({page},info)=>{
 test.skip(process.env['EQ_PERSONAL_GRASS']!=='1','The supplied landscape belongs to the explicit personal review profile.');
 test.setTimeout(120000);let failed=false;
 await page.route('**/personal-landscape/path/path-derived.json',async route=>{
  if(!failed){failed=true;await route.fulfill({status:503,body:'Synthetic first-request failure'});}else await route.continue();
 });
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 const start=page.getByRole('button',{name:'Start playing',exact:true});
 await expect(page.getByRole('button',{name:'Restore view',exact:true})).toBeVisible();await expect(start).toBeDisabled();
 await expect(page.locator('.garden-scene-status')).toContainText('503');
 const text=await page.locator('.garden-passage').innerText();
 await page.getByRole('button',{name:'Restore view',exact:true}).click();
 await expect(page.locator('.garden-scene')).toHaveAttribute('data-scene-phase','ready',{timeout:90000});
 await expect(page.locator('.garden-passage')).toHaveText(text);await expect(start).toBeEnabled();
 await page.screenshot({path:info.outputPath('landscape-recovered.png')});await start.click();
 const scene=page.locator('.garden-scene'),before=await scene.getAttribute('data-pip-z');
 await page.keyboard.down('ArrowUp');await page.waitForTimeout(400);await page.keyboard.up('ArrowUp');
 await expect.poll(()=>scene.getAttribute('data-pip-z')).not.toBe(before);
 await info.attach('scope',{body:'Synthetic HTTP503 on one actual landscape request; ordinary Begin, visible diagnostic, Restore view, retained introduction and walking use the compiled game. Timeout behavior is separately covered by request contracts.',contentType:'text/plain'});
});
