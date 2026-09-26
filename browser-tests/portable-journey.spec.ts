import {test,expect,type Page} from '@playwright/test';
import {playDemoRoute} from './garden-demo-route.js';
import {completeConversation,deliverMaraReport,playArrivals,openStoryDirections,placeMemory,resumeGathering,inspectBirdConversation} from './garden-actions.js';

const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
async function close(page:Page){for(let i=0;i<12&&await page.locator('.garden-reader').count();i++)await page.locator('.g-reader-top .g-close').click();await expect(page.locator('.garden-reader')).toHaveCount(0);}
async function walk(page:Page,who:'Mara'|'Sol'|'Grandma'){
 await close(page);const talk=button(page,who==='Sol'?'Talk to Sol':'Talk to '+who+' E');
 if(!await talk.isVisible()){const places=page.locator('.garden-access');if(await places.getAttribute('open')===null)await places.locator(':scope>summary').click();await places.getByRole('button',{name:'Go to '+who,exact:true}).click();await places.locator(':scope>summary').click();}
 await expect(talk).toBeVisible({timeout:90000});await talk.click();if(who!=='Grandma')await completeConversation(page);
}
async function playback(page:Page,until:()=>Promise<boolean>){
 const deadline=Date.now()+300000;
 while(Date.now()<deadline){
  if(await until())return;
  if(await page.getByRole('button',{name:/^Listen to my words as /}).isVisible()&&await button(page,'Read without narration').isVisible())await button(page,'Read without narration').click();
  else if(await page.locator('.g-continuous-playback[data-playback-state="paused"]').isVisible())throw Error('Native recorded narration paused unexpectedly');
  await page.waitForTimeout(250);
 }
 throw Error('Native story playback did not complete');
}
test('portable offline journey reaches the finale and six-story library using real recorded voices',async({page},info)=>{
 test.skip(!process.env['EQ_PORTABLE_PACKAGE_DIRECTORY'],'Requires an extracted portable archive');
 const errors:string[]=[],external:string[]=[],feedback:string[]=[];
 await page.context().route('**/*',route=>{const url=route.request().url();if(url.startsWith('http://127.0.0.1:4364/'))return route.continue();external.push(url);return route.abort();});
 page.on('pageerror',error=>errors.push(error.message));page.on('request',request=>{if(request.method()==='POST'&&request.url().endsWith('/api/garden/feedback'))feedback.push(request.url());});
 const turn=async()=>{await expect(page.locator('.garden-reader')).toHaveCount(0);await playback(page,()=>page.locator('.garden-reader').isVisible());};
 await playDemoRoute(page,info,undefined,{opening:async()=>{
  await button(page,'promised').click();await button(page,'Listen to the sentence').click();const stop=page.locator('.garden-word-card').getByRole('button',{name:'Stop listening',exact:true});await expect(stop).toBeVisible();await expect(stop).toBeHidden({timeout:45000});await button(page,'Close word help').click();
 }});
 await button(page,'Talk to Sol').click();await completeConversation(page);await button(page,'Let’s finish the ending together.').click();
 await page.getByLabel('Your ending for Sol’s story',{exact:true}).fill('I fixed the roof so Rina’s flour stayed dry. She baked the bread she had promised. Later, she brought me a loaf. My little repair had helped her keep her promise.');
 await button(page,'Baking, then the visit').click();await button(page,'Try my ending').click();await expect(page.locator('.garden-world-activity>.g-story-stage')).toHaveAttribute('aria-busy','false',{timeout:60000});await button(page,'Use this ending').click();
 await walk(page,'Mara');await button(page,'I can read your story to Grandma.').click();await expect(page.locator('.garden-reading-scroll')).toContainText('Pip is carrying her copy.');
 await walk(page,'Grandma');await page.getByRole('button',{name:/^(Let’s talk about why Mara stopped visiting\.|Tell Grandma what Mara said)$/}).click();await deliverMaraReport(page);await button(page,'Back to Grandma').click();await page.getByRole('button',{name:/^Sol wants to come/}).click();await page.getByRole('button',{name:/^(Plan|Review) the gathering( plan)? with Grandma$/}).click();await button(page,'At the usual time').click();await button(page,'Pip reads Mara’s story').click();await button(page,'Preview the gathering').click();await button(page,'Use this plan').click();
 await walk(page,'Sol');await button(page,'We’re starting at the usual time.').click();await walk(page,'Mara');await button(page,'We’re keeping the usual time. I’ll read your story for you.').click();await walk(page,'Grandma');await page.getByRole('button',{name:/^(Plan|Review) the gathering( plan)? with Grandma$/}).click();await button(page,'Tell Grandma everyone has agreed').click();await button(page,'Begin the gathering').click();await playArrivals(page);
 await button(page,'Welcome everyone in the garden').click();await turn();await button(page,'Share The Torn Wing').click();
 await openStoryDirections(page);await button(page,'Speak to the boy').click();await inspectBirdConversation(page);await button(page,'Would you like some help?').click();await openStoryDirections(page);
 for(const action of ['Walk to the dock office','Pick up the tape','Return to the boy','Line up the torn wing','Tape across the tear','Place the strip','Let the boy carry his bird','Return to Grandma’s garden'])await button(page,action).click();
 await expect(page.locator('.g-mara-scene')).toHaveCount(0);await expect.poll(async()=>await page.locator('.garden-gathering-controls').isVisible()||await page.locator('.garden-reader').isVisible()).toBe(true);if(await page.locator('.garden-gathering-controls').isVisible())await turn();
 await button(page,'Invite Sol to share').click();await button(page,'Let Sol share with everyone').click();await turn();await button(page,'Hear Grandma ask Sol').click();await turn();await button(page,'Let Grandma bring out the cushions').click();await expect(button(page,'Let Grandma finish her account')).toBeVisible({timeout:60000});await button(page,'Let Grandma finish her account').click();await button(page,'Let Grandma share her story').click();await turn();
 await button(page,'Sharing our stories').click();await placeMemory(page);await resumeGathering(page);await button(page,'Hear Grandma’s offer for Mara').click();await turn();await button(page,'Take a copy for Mara').click();await expect(page.locator('.garden-reading-scroll')).toContainText('The copy is in Pip’s backpack.');
 await walk(page,'Mara');await button(page,'Give Grandma’s story').click();await turn();await button(page,'Finish the chapter').click();await button(page,'Watch the ending').click();await expect(page.locator('[data-world-activity="ending-presentation"]')).toBeVisible();await playback(page,async()=>!await page.locator('[data-world-activity="ending-presentation"]').count());await button(page,'Read the garden’s stories').click();await expect(page.locator('.g-lantern-library article')).toHaveCount(6);await page.screenshot({path:info.outputPath('complete-finale.png')});
 expect(errors).toEqual([]);expect(external).toEqual([]);expect(feedback).toEqual([]);
});
