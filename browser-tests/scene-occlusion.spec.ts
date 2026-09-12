import {test,expect} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {start,media,target,settled,saved,closePanel,collectKit} from './helpers.js';
import {mediaKitStop} from '../src/physical/presentation.js';
import {actorContentBounds,overlaps} from '../src/world/actor-geometry.js';
const evidence=(process.env['EQ_EVIDENCE_DIR']??'evidence/scale-20260912')+'/media-final';
for(const compact of [false,true])test(`ER13.06 foreground cutaway and mounted/wake/follow visibility ${compact?'320 Largest':'1469x1105'}`,async({page},info)=>{
 test.setTimeout(120000);await mkdir(evidence,{recursive:true});await page.setViewportSize(compact?{width:320,height:568}:{width:1469,height:1105});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await start(page);
 if(compact){await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByLabel('Text size',{exact:true}).selectOption('largest');await page.getByLabel('Text spacing',{exact:true}).selectOption('roomier');await page.keyboard.press('Escape');await page.keyboard.press('Escape');}
 const prefix=`${evidence}/${info.project.name}-${compact?'compact':'1469x1105'}`;await media(page);await page.waitForLoadState('networkidle');
 // The accepted dark blue lens must remain blue where the foreground wooden
 // header previously hid it. Sample visible Canvas pixels, not internal state.
 const lens=await page.getByTestId('world').evaluate((canvas:HTMLCanvasElement)=>[...canvas.getContext('2d')!.getImageData(Math.round(canvas.width*68/120),Math.round(canvas.height*39/80),1,1).data]);expect(lens[2]!-lens[0]!).toBeGreaterThan(5);await page.screenshot({path:prefix+'-standby.png'});
 await target(page,'MD.ACCESS.E8');const mounted=(await settled(page)).payload;expect(mounted.physical.avatar).toEqual(mediaKitStop());expect(mounted.physical.caddyHost).toBe('MD.RACK.STATION');await closePanel(page);await page.screenshot({path:prefix+'-kit.png'});
 await collectKit(page);await closePanel(page);await target(page,'ACT.LOOP');const awake=(await settled(page)).payload;expect(awake.physical.loop.mode).toBe('following');expect(awake.exposures.some(e=>e.refId.startsWith('E6.'))).toBe(false);await page.screenshot({path:prefix+'-awake.png'});
 const world=page.getByTestId('world'),box=(await world.boundingBox())!;await world.click({position:{x:80/120*box.width,y:65/80*box.height}});await settled(page);
 await expect.poll(async()=>{const p=(await saved(page)).payload.physical;return !overlaps(actorContentBounds('ACT.PLAYER',p.avatar,'carry-front'),actorContentBounds('ACT.LOOP',p.loop.feet,'rolling-front'));}).toBe(true);await page.screenshot({path:prefix+'-following.png'});
 const bundles=await page.evaluate(()=>performance.getEntriesByType('resource').map(e=>new URL(e.name).pathname).filter(n=>n.startsWith('/assets/App-')&&n.endsWith('.js')));await writeFile(prefix+'.json',JSON.stringify({at:new Date().toISOString(),viewport:page.viewportSize(),bundles,lens,mounted:mounted.physical,awake:awake.physical,following:(await saved(page)).payload.physical,errors},null,2)+'\n');expect(errors).toEqual([]);
});
