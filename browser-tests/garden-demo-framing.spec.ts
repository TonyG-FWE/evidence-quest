import {test,expect} from '@playwright/test';
import {playDemoRoute} from './garden-demo-route.js';
import {completeConversation,worldPoint} from './garden-actions.js';
import {anchors} from '../src/garden/worldLayout.js';

test('fresh demo actions and ending preview remain legible at sharing resolutions',async({page},info)=>{
 test.setTimeout(360000);const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 const sizes=[{width:1098,height:1105},{width:1422,height:800},{width:1366,height:768},{width:1920,height:1080}],scene=page.locator('.garden-scene');
 await playDemoRoute(page,info,async kind=>{
  if(kind==='handoff')await expect(page.getByRole('heading',{name:'Rina’s thank-you visit',exact:true})).toBeVisible();
  for(const size of sizes){
   await page.setViewportSize(size);await expect(scene).toHaveAttribute('data-action-kind','none');
   const canvas=scene.locator('canvas');await expect(canvas).toBeVisible();const box=(await canvas.boundingBox())!;expect(box.height).toBeGreaterThan(250);
   if(kind==='planting'){
    const feet=await worldPoint(page,anchors.garden.person.x,anchors.garden.person.z,.13),head=await worldPoint(page,anchors.garden.person.x,anchors.garden.person.z,1.4);
    expect(feet.y-head.y,'Grandma must be large enough to follow the planting action').toBeGreaterThan(75);
    expect(head.y).toBeGreaterThan(box.y);expect(feet.y).toBeLessThan(box.y+box.height);
   }
   if(kind==='roof'){
    const sol=JSON.parse((await scene.getAttribute('data-bakery'))!).solScreen;
    for(const point of [sol.head,sol.feet]){expect(Math.abs(point.x)).toBeLessThan(.95);expect(Math.abs(point.y)).toBeLessThan(.95);}
   }
   await page.screenshot({path:info.outputPath(kind+'-'+size.width+'.png')});
  }
 });
 await page.getByRole('button',{name:'Talk to Sol',exact:true}).click();await completeConversation(page);await page.getByRole('button',{name:'Let’s finish the ending together.',exact:true}).click();
 await page.getByLabel('Your ending for Sol’s story',{exact:true}).fill('After Sol repaired the roof, Rina used the dry flour to bake the bread she had promised. Later, she brought Sol a loaf to thank him.');
 for(const size of sizes){await page.setViewportSize(size);await expect(page.getByLabel('Your ending for Sol’s story',{exact:true})).toBeInViewport();await expect(page.getByRole('button',{name:'Baking, then the visit',exact:true})).toBeInViewport({ratio:1});await expect(page.getByRole('button',{name:'Try my ending',exact:true})).toBeInViewport();await expect(page.getByRole('button',{name:'Full screen',exact:true})).toBeInViewport();await page.screenshot({path:info.outputPath('writing-'+size.width+'.png')});}
 await page.getByRole('button',{name:'Baking, then the visit',exact:true}).click();await page.getByRole('button',{name:'Try my ending',exact:true}).click();
 const stage=page.locator('.garden-world-activity>.g-story-stage');await expect(stage).toHaveAttribute('aria-busy','false',{timeout:60000});
 // The added narrow Codex viewport keeps at least 60% of its width for the
 // picture. Wider sharing views retain the existing 700 px minimum.
 for(const size of sizes){await page.setViewportSize(size);const box=(await stage.boundingBox())!;expect(box.width).toBeGreaterThan(Math.min(700,size.width*.60));expect(box.height).toBeGreaterThanOrEqual(320);await expect(page.getByRole('button',{name:'Use this ending',exact:true})).toBeInViewport();await page.screenshot({path:info.outputPath('ending-preview-'+size.width+'.png')});}
 expect(errors).toEqual([]);await info.attach('scope',{body:'Ordinary fresh bridge/planting/bakery route, followed by an unassessed authored-input rehearsal. No state injection or provider calls. Screenshots retain the supplied assets at native DPR.',contentType:'text/plain'});
});
