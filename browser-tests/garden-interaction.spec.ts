import {deliverMaraReport} from './garden-actions.js';
import {completeConversation} from './garden-actions.js';
import {playBakery} from './garden-actions.js';
import {test,expect} from '@playwright/test';
import {OrthographicCamera,Vector3} from 'three';

test('G2 ordinary keyboard route: nested letter, Help and backpack preserve focus and return context',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 await page.getByRole('button',{name:'Backpack',exact:true}).press('Enter');
 await expect(page.getByRole('heading',{name:'Pip’s backpack'})).toBeVisible();
 await page.getByRole('button',{name:'Read',exact:true}).press('Enter');
 await expect(page.getByRole('button',{name:'Back to the backpack',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'A promise to Grandma'})).toBeFocused();await page.keyboard.press('Shift+Tab');await expect(page.getByRole('button',{name:'Close page. Back to the backpack',exact:true})).toBeFocused();await page.keyboard.press('Shift+Tab');await expect(page.getByRole('navigation',{name:'Reading tools'}).getByRole('button',{name:'Pause',exact:true})).toBeFocused();
 await page.keyboard.press('Shift+Tab');await expect(page.getByRole('navigation',{name:'Reading tools'}).getByRole('button',{name:'Help',exact:true})).toBeFocused();await page.keyboard.press('Enter');
 await page.getByRole('button',{name:'Back to Grandma’s letter',exact:true}).press('Enter');
 await page.getByRole('button',{name:'Back to the backpack',exact:true}).press('Enter');
 await expect(page.getByRole('button',{name:'Read',exact:true})).toBeFocused();
 await page.getByRole('button',{name:'Continue to the game',exact:true}).press('Enter');
 await expect(page.getByRole('button',{name:'Backpack',exact:true})).toBeFocused();
 await page.getByRole('button',{name:'Pause',exact:true}).click();await expect(page.getByRole('button',{name:'Start a new adventure',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Continue to the game',exact:true}).click();
 await page.setViewportSize({width:700,height:700});await page.getByRole('button',{name:'Backpack',exact:true}).click();await page.getByRole('button',{name:'Read',exact:true}).click();await expect(page.getByRole('button',{name:'Back to the backpack',exact:true})).toBeInViewport();
 await page.screenshot({path:info.outputPath('nested-reader-compact.png')});expect(errors).toEqual([]);
});

test('G2 ordinary world route: invalid plan, exact rehearsal, nested help and prepared return',async({page},info)=>{
 // This ordinary route now includes the full river and bakery before rehearsal.
 // The functional budget does not change the separately measured frame/transfer targets.
 test.setTimeout(450000);
 const button=(name:string)=>page.getByRole('button',{name:name==='Back to Pip'?/^(Back to Pip|Continue to the game)$/:name==='Plan the gathering with Grandma'?/^(Plan the gathering with Grandma|Review the gathering plan with Grandma)$/:name==='Let’s talk about why Mara stopped visiting.'?/^(Let’s talk about why Mara stopped visiting\.|Tell Grandma what Mara said)$/:name,exact:true});
 const closeAll=async()=>{for(let depth=0;depth<20&&await page.locator('.garden-reader').count();depth++)await page.locator('.garden-reader .g-reader-top .g-close').click();await expect(page.locator('.garden-reader')).toHaveCount(0);};
 await page.goto('/garden');await button('Begin Pip’s adventure').click();await button('Start playing').click();
 await button('Go to Mara').click();await button('Talk to Mara E').click();await completeConversation(page);await button('I can read your story to Grandma.').click();
 await expect(page.locator('.garden-reader')).toHaveCount(0);await expect(page.locator('.garden-feedback')).toContainText('Mara gives Pip');
 await expect(page.locator('.garden-reading-scroll')).toContainText('Pip is carrying her copy.');await button('Back to Pip').click();
 await button('Go to the bridge pieces').click();await button('Arrange bridge').click();{const ropeButton=page.getByRole('button',{name:'Take the repair ropes',exact:true});if(await ropeButton.count()){await ropeButton.click();await expect(ropeButton).toHaveCount(0);}}
 for(const [name,x] of [['A',-.775],['B',.775]] as const){
  await page.locator('.g-select-sections').getByRole('button',{name:'Section '+name,exact:true}).click();
  const box=(await page.locator('.garden-scene canvas').boundingBox())!,aspect=box.width/box.height,h=Math.max(6.5,10.2/aspect),camera=new OrthographicCamera(-h*aspect,h*aspect,h,-h,.1,100);
  camera.position.set(8.75,16,19.1);camera.lookAt(1.25,0,.1);camera.updateMatrixWorld();const p=new Vector3(x,.13,3).project(camera);await page.mouse.click(box.x+(p.x*.5+.5)*box.width,box.y+(-p.y*.5+.5)*box.height);
 }
 await button('Join sections').click();await page.getByRole('button',{name:'Fasten dock-side end'}).click();await page.getByRole('button',{name:'Fasten garden-side end'}).click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-bridge-ready','true');await button('Back to Pip').click();
 await button('Go to Grandma').click();await button('Talk to Grandma E').click();await page.getByRole('button',{name:'Plant the seed with Grandma'}).click();await expect(page.locator('.garden-feedback')).toContainText('kept his promise');
 await button('Talk to Grandma E').click();await button('Let’s talk about why Mara stopped visiting.').click();await deliverMaraReport(page);await button('Back to Grandma').click();await button('Plan the gathering with Grandma').click();await button('Mara tells her story').click();await button('Preview the gathering').click();
 await expect(page.locator('[data-world-activity="plan-preview"]')).toBeVisible();await expect(page.locator('[data-stage-scene="gather-waiting"]')).toBeVisible();await expect(page.getByRole('img',{name:'Pip, Sol and Grandma wait. Mara is still working, so nobody is telling her story.'})).toBeVisible();await expect(button('Use this plan')).toBeDisabled();await page.screenshot({path:info.outputPath('invalid-plan-waiting.png')});
 await button('Change the plan').click();await expect(button('Preview the gathering')).toBeFocused();await closeAll();
 await playBakery(page);await button('Talk to Sol').click();await completeConversation(page);await button('Let’s finish the ending together.').click();
 const words='My repair kept the flour dry. Rina baked the bread she had promised.';
 await page.getByLabel('Your ending for Sol’s story',{exact:true}).fill(words);await button('Try my ending').click();await expect(page.locator('.garden-reader')).toHaveCount(0);
 await expect(page.locator('.garden-world-activity .g-manuscript')).toHaveText(words);await button('Help').click();await button('Read Grandma’s letter').click();
 await expect(button('Start playing')).toHaveCount(0);await button('Back to Help').click();await button('Back to the preview').click();await expect(page.locator('.garden-world-activity .g-manuscript')).toHaveText(words);
 await button('Use this ending').click();await expect(page.getByRole('heading',{name:'Finish a story with Sol'})).toBeFocused();await expect(page.locator('.garden-reading-scroll')).toContainText(words);await expect(button('Try my ending')).toHaveCount(0);await button('Change the ending').click();
 await page.getByText('Help me start with a prepared ending',{exact:true}).click();await button('Try the bread ending').click();
 await page.setViewportSize({width:700,height:700});await button('Back to my ending').click();
 await expect(page.locator('details').filter({has:page.getByText('Help me start with a prepared ending',{exact:true})})).toHaveAttribute('open','');await expect(button('Try the bread ending')).toBeFocused();
 await expect(page.getByLabel('Your ending for Sol’s story',{exact:true})).toHaveValue(words);await expect(page.locator('.g-selected-ending')).toContainText(words);await page.screenshot({path:info.outputPath('prepared-return-context.png')});
});
