import {buildStagedBridge} from './garden-actions.js';
import {waitForWalk} from './garden-actions.js';
import {openDirections,plantWithGrandma} from './garden-actions.js';
import {deliverMaraReport} from './garden-actions.js';
import {test,expect,type Page} from '@playwright/test';
import {completeConversation} from './garden-actions.js';
test.setTimeout(180000);
const button=(p:Page,name:string)=>p.getByRole('button',{name:name==='Back to Pip'?/^(Back to Pip|Continue to the game)$/:name==='Plan the gathering with Grandma'?/^(Plan the gathering with Grandma|Review the gathering plan with Grandma)$/:name==='Let’s talk about why Mara stopped visiting.'?/^(Let’s talk about why Mara stopped visiting\.|Tell Grandma what Mara said)$/:name,exact:true});
const readOffer='I can read your story to Grandma.',laterOffer="I'll ask Grandma to start the next gathering later.";
async function begin(p:Page){await p.goto('/garden');await button(p,'Begin Pip’s adventure').click();await button(p,'Start playing').click();}
async function close(p:Page){for(let i=0;i<20&&await p.locator('.garden-reader').count();i++)await p.locator('.g-reader-top .g-close').click();}
async function saved(p:Page){await expect(p.locator('.g-save')).toHaveText('Saved in this browser');return p.evaluate(async()=>new Promise<any>(resolve=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1');r.onsuccess=()=>{const db=r.result,t=db.transaction('slots'),q=t.objectStore('slots').get('current');t.oncomplete=()=>{db.close();resolve(q.result.payload);};};}));}
async function walk(p:Page,who:'Mara'|'Grandma'){
 await close(p);const talk=button(p,`Talk to ${who} E`);
 if(!await talk.isVisible()){const beforeTravel=await saved(p),access=p.locator('.garden-access');await access.locator(':scope>summary').click();await access.getByRole('button',{name:`Go to ${who}`,exact:true}).click();await access.locator(':scope>summary').click();await waitForWalk(p,who,beforeTravel);}
 await talk.click();
}
async function bridge(p:Page){
 await close(p);await buildStagedBridge(p);
}
test('Continuity: passengers first, attributed dialogue in order, resume, accessible choices and read-only source returns',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await begin(page);await button(page,'Go to Mara').click();await button(page,'Talk to Mara E').click();
 await expect(page.getByRole('heading',{name:'At Mara’s dock'})).toBeVisible();await expect(page.locator('.garden-reading-scroll .g-choices button')).toHaveText(['Help me read these choices','Watch Mara help these passengers']);await expect(page.locator('.g-reader-actions button')).toHaveText(['Continue to the game']);
 await expect(page.locator('.garden-passage')).toHaveCount(0);await expect(button(page,readOffer)).toHaveCount(0);await expect(button(page,laterOffer)).toHaveCount(0);await expect(page.getByRole('button',{name:/fix the bridge.*usual/})).toHaveCount(0);await page.screenshot({path:info.outputPath('01-only-current-action.png')});await button(page,'Back to Pip').click();await expect(button(page,'Go to the bridge pieces')).toBeVisible();await button(page,'Talk to Mara E').click();
 await button(page,'Watch Mara help these passengers').click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-dock-service','served');await expect(page.locator('.garden-passage .g-source-voice')).toHaveText(['Narrator','Pip','Mara','Pip']);
 await expect(button(page,readOffer)).toHaveCount(0);await button(page,'Continue conversation').click();await expect(page.locator('.garden-passage .g-source-voice')).toHaveText(['Mara']);await expect(page.locator('.garden-passage')).toContainText('work hours changed');
 const part=await saved(page);expect(part.conversations.mara).toEqual({part:1,complete:false});expect(part.maraHeard).toBe(false);
 await page.getByRole('navigation',{name:'Reading tools'}).getByRole('button',{name:'Help',exact:true}).click();await expect(button(page,'Reread Mara’s account')).toHaveCount(0);await button(page,'Back to Mara').click();await page.reload();await button(page,'Talk to Mara E').click();await expect(page.locator('.garden-passage')).toContainText('work hours changed');await expect(button(page,readOffer)).toHaveCount(0);
 await button(page,'Continue conversation').click();await expect(page.locator('.garden-passage .g-source-voice')).toHaveText(['Pip','Mara']);await expect(page.locator('.garden-passage')).toContainText('obligation');await expect(button(page,laterOffer)).toHaveCount(0);
 await button(page,'Choose Pip’s reply').click();await expect(page.getByRole('group',{name:'You are Pip. Choose your response.'})).toBeVisible();await expect(button(page,readOffer)).toBeVisible();await expect(button(page,laterOffer)).toBeVisible();await page.screenshot({path:info.outputPath('02-context-before-replies.png')});
 await page.getByRole('navigation',{name:'Reading tools'}).getByRole('button',{name:'Pause',exact:true}).click();await page.getByLabel('Largest reading text',{exact:true}).check();await button(page,'Back to Mara').click();await page.setViewportSize({width:320,height:568});await button(page,laterOffer).scrollIntoViewIfNeeded();await expect(button(page,laterOffer)).toBeInViewport();expect((await page.locator('.garden-reading-scroll').boundingBox())!.height).toBeGreaterThan(65);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath('03-compact-largest-text.png')});
 await page.setViewportSize({width:1440,height:1000});await button(page,laterOffer).click();await expect(page.locator('.garden-reading-scroll .g-speaker')).toHaveText(['Pip says','Mara says']);await expect(button(page,readOffer)).toHaveCount(0);await button(page,'Let Grandma know what Mara said').click();
 await close(page);await button(page,'Go to the bridge pieces').click();await button(page,'Help').click();await button(page,'Reread Mara’s account').click();await expect(page.locator('.garden-passage .g-source-voice')).toHaveCount(7);await expect(page.locator('.g-conversation-progress')).toHaveCount(0);await expect(button(page,readOffer)).toHaveCount(0);await expect(button(page,laterOffer)).toHaveCount(0);await close(page);
 expect((await saved(page)).story.maraReported).toBe(false);expect(errors).toEqual([]);
});
test('Continuity: Grandma first, report without a page, spontaneous later agreement and nearby rereading',async({page},info)=>{
 await begin(page);await bridge(page);await walk(page,'Grandma');await plantWithGrandma(page);await expect(page.locator('.garden-feedback')).toContainText('kept his promise');await button(page,'Talk to Grandma E').click();
 await expect(button(page,'Plan the gathering with Grandma')).toHaveCount(0);await expect(button(page,'Let’s talk about why Mara stopped visiting.')).toHaveCount(0);await page.screenshot({path:info.outputPath('grandma-before-account.png')});
 await walk(page,'Mara');await completeConversation(page);await walk(page,'Grandma');await expect(button(page,'Plan the gathering with Grandma')).toHaveCount(0);await button(page,'Let’s talk about why Mara stopped visiting.').click();await deliverMaraReport(page);
 await expect(page.locator('.garden-reading-scroll .g-speaker')).toHaveText(['Pip says','Grandma says']);await expect(page.locator('.g-reader-actions .g-dialogue-response')).toHaveCount(0);await expect(page.locator('.garden-reading-scroll')).not.toContainText('Let’s read what she sent');await page.screenshot({path:info.outputPath('one-attributed-no-page-report.png')});
 await button(page,'Back to Grandma').click();await button(page,'Could we start after the last boat returns?').click();const agreed=await saved(page);expect(agreed.story.timeAgreed).toBe('later');expect(agreed.page).toBe('mara');expect(agreed.story.metSol).toBe(false);
 await walk(page,'Mara');await expect(button(page,laterOffer)).toHaveCount(0);await expect(button(page,readOffer)).not.toBeVisible();await page.getByText('Discuss another way to share the story',{exact:true}).click();await expect(button(page,readOffer)).toBeVisible();await page.getByRole('navigation',{name:'Reading tools'}).getByRole('button',{name:'Help',exact:true}).click();await button(page,'Reread Mara’s account').click();await expect(page.locator('.garden-passage .g-source-voice')).toHaveCount(7);await expect(page.locator('.g-conversation-progress')).toHaveCount(0);await expect(button(page,readOffer)).toHaveCount(0);expect((await saved(page)).page).toBe('mara');await page.screenshot({path:info.outputPath('nearby-rereading-is-a-source.png')});
});
