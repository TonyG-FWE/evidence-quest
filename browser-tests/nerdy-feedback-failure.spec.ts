import {test,expect} from '@playwright/test';
import {playDemoRoute} from './garden-demo-route.js';
import {completeConversation} from './garden-actions.js';

test('Nerdy demo: synthetic unavailable and real 15-second timeout preserve the ending without retry',async({page},info)=>{
 test.setTimeout(240000);
 // The adventure is ordinary fresh play. Only provider availability/responses are synthetic.
 let phase:'unavailable'|'timeout'='unavailable',requests=0,release=()=>{};
 await page.route('**/api/garden/config',async route=>{const response=await route.fetch(),config=await response.json();await route.fulfill({json:{...config,textFeedback:true,textFeedbackActivities:['sol-ending']}});});
 await page.route('**/api/garden/feedback',async route=>{
  requests++;expect(route.request().postDataJSON().activity).toBe('sol-ending');
  if(phase==='timeout')await new Promise<void>(resolve=>{release=resolve;});
  await route.fulfill({status:503,json:{status:'unavailable'}}).catch(()=>{});
 });
 const button=(name:string)=>page.getByRole('button',{name,exact:true});
 await playDemoRoute(page,info);await button('Talk to Sol').click();await completeConversation(page);await button('Let’s finish the ending together.').click();
 const draft='I repaired the roof so Rina could bake. Later, she brought me a loaf to say thank you.';
 const writing=page.getByLabel('Your ending for Sol’s story',{exact:true});await writing.fill(draft);await button('Rina thanks Sol').click();await page.getByText('Support for my ending',{exact:true}).click();
 const region=page.getByRole('region',{name:'Would you like help with your ending?'});
 await region.getByRole('button',{name:'Ask for feedback',exact:true}).click();await expect(region).toContainText('AI feedback isn’t available right now.');await expect(writing).toHaveValue(draft);await expect(button('Rina thanks Sol')).toHaveAttribute('aria-pressed','true');await expect(region.getByRole('button',{name:'Use suggested picture',exact:true})).toHaveCount(0);expect(requests).toBe(1);
 phase='timeout';const start=Date.now();await region.getByRole('button',{name:'Ask for feedback',exact:true}).click();await expect(button('Stop feedback')).toBeVisible();
 await expect(button('Stop feedback')).toBeHidden({timeout:20000});const durationMs=Date.now()-start;release();expect(durationMs).toBeGreaterThanOrEqual(14500);expect(durationMs).toBeLessThan(20000);
 await expect(region).toContainText('AI feedback isn’t available right now.');await expect(writing).toHaveValue(draft);await expect(button('Rina thanks Sol')).toHaveAttribute('aria-pressed','true');await page.waitForTimeout(600);expect(requests).toBe(2);
 await page.getByText('Support for my ending',{exact:true}).click();await button('Try my ending').click();await expect(page.locator('.garden-world-activity>.g-story-stage')).toHaveAttribute('aria-busy','false',{timeout:60000});await expect(button('Use this ending')).toBeEnabled();
 await info.attach('synthetic-feedback-failure',{body:JSON.stringify({scope:'Synthetic HTTP failure and held response; actual client timeout, unchanged draft/scene and connected preview. Zero provider calls, two explicit button actions, no automatic retry.',requests,timeoutMs:durationMs}),contentType:'application/json'});
});
