import {test,expect} from '@playwright/test';
import {completeConversation} from './garden-actions.js';
test.setTimeout(90000);
test('Compact dialogue: full-sized story sentence, useful passage space, word help and both choices',async({page},info)=>{
 const button=(name:string)=>page.getByRole('button',{name,exact:true});
 await page.goto('/garden');await button('Begin Pip’s adventure').click();await button('Start playing').click();await button('Go to Mara').click();await button('Talk to Mara E').click();await completeConversation(page);
 await page.getByRole('navigation',{name:'Reading tools'}).getByRole('button',{name:'Pause',exact:true}).click();await page.getByLabel('Largest reading text',{exact:true}).check();await page.getByLabel('More space between lines',{exact:true}).check();await button('Back to Mara').click();await page.setViewportSize({width:320,height:568});
 const reading=page.locator('.garden-reading-scroll'),pip=page.locator('[data-source-component="GA.SRC.MARA.R20260916L.6"]'),mara=page.locator('[data-source-component="GA.SRC.MARA.R20260916L.7"]');
 expect((await reading.boundingBox())!.height).toBeGreaterThanOrEqual(170);expect(await pip.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBe(28);
 await pip.scrollIntoViewIfNeeded();await expect(pip).toBeInViewport({ratio:1});await page.screenshot({path:info.outputPath('compact-whole-pip-sentence.png')});
 await button('obligation').scrollIntoViewIfNeeded();await button('obligation').click();await expect(page.getByRole('complementary',{name:'Word help: obligation'})).toContainText('responsibility');await button('Close word help').click();await expect(button('obligation')).toBeFocused();await expect(button('obligation')).toBeInViewport();expect((await reading.boundingBox())!.height).toBeGreaterThanOrEqual(170);await page.screenshot({path:info.outputPath('compact-mara-reading-after-word-help.png')});
 const read='I can read your story to Grandma.',later="I'll ask Grandma to start the next gathering later.";
 for(const name of [read,later]){await button(name).scrollIntoViewIfNeeded();await expect(button(name)).toBeInViewport();expect((await button(name).boundingBox())!.height).toBeGreaterThanOrEqual(48);}
 expect(await mara.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBe(28);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath('compact-visible-replies-and-reading.png')});
 await info.attach('compact-measurements',{body:JSON.stringify({reading:await reading.boundingBox(),storyFont:await mara.evaluate(e=>getComputedStyle(e).fontSize),note:'Ordinary fresh play, actual28px roomier story text. No state injection or provider request.'}),contentType:'application/json'});
});
