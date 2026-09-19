import {expect,type Page} from '@playwright/test';
import {automaticVoice} from './garden-playback-voice.js';
const button=(p:Page,name:string)=>p.getByRole('button',{name:name==='Back to Pip'?/^(Back to Pip|Continue to the game)$/:name==='Plan the gathering with Grandma'?/^(Plan the gathering with Grandma|Review the gathering plan with Grandma)$/:name==='Let’s talk about why Mara stopped visiting.'?/^(Let’s talk about why Mara stopped visiting\.|Tell Grandma what Mara said)$/:name,exact:true});
export async function deliverMaraReport(p:Page){
 await expect(p.getByRole('heading',{name:'Tell Grandma what you learned',exact:true})).toBeVisible();
 const prepared=button(p,'Let Grandma know what Mara said');
 if(await prepared.isVisible())await prepared.click();
 await button(p,'Tell Grandma').click();
}
/** Use the same visible, untimed conversation controls as a player. */
export async function completeConversation(p:Page){
 await expect(p.locator('.garden-reader')).toBeVisible();
 if(await button(p,'Watch Mara help these passengers').isVisible()){
  await button(p,'Watch Mara help these passengers').click();
  await expect(p.locator('.garden-scene')).toHaveAttribute('data-dock-service','served');
  await expect(p.locator('.garden-reader')).toBeVisible();
 }
 for(let i=0;i<5;i++){
  const next=button(p,'Continue conversation'),reply=button(p,'Choose Pip’s reply');
  if(await next.isVisible())await next.click();
  else if(await reply.isVisible()){await reply.click();return;}
  else return;
 }
 throw Error('Conversation did not reach its replies.');
}
export async function playSpeakingTurn(p:Page){
 await expect(p.locator('.garden-gathering-controls')).toBeVisible();
 await expect(button(p,'Continue speaking')).toHaveCount(0);await expect(button(p,'Finish this turn')).toHaveCount(0);
 const resume=button(p,'Resume story');if(await resume.isVisible())await resume.click();
 await automaticVoice(p,true);
 await expect(p.locator('.garden-reader')).toBeVisible({timeout:120000});
 await automaticVoice(p,false);
}
export async function playLoopStory(p:Page){
 await expect(p.locator('[data-world-activity="ending-presentation"]')).toBeVisible();
 await expect(button(p,'Next picture')).toHaveCount(0);await expect(button(p,'Previous picture')).toHaveCount(0);
 const resume=button(p,'Resume story');if(await resume.isVisible())await resume.click();
 await automaticVoice(p,true);await expect(p.locator('[data-world-activity="ending-presentation"]')).toHaveCount(0,{timeout:120000});await automaticVoice(p,false);
}
export async function playArrivals(p:Page){
 for(let i=0;i<6;i++){
  await expect.poll(async()=>await button(p,'Welcome everyone in the garden').isVisible()||await p.locator('.garden-gathering-controls .g-primary:enabled').count()>0).toBe(true);
  if(await button(p,'Welcome everyone in the garden').isVisible())return;
  await p.locator('.garden-gathering-controls .g-primary').click();
 }
 throw Error('Guests did not finish their actual arrival.');
}
export async function playGrandmaTelling(p:Page){
 await button(p,'Hear Grandma ask Sol').click();await playSpeakingTurn(p);await button(p,'Let Grandma bring out the cushions').click();await button(p,'Let Grandma finish her account').click();await expect(p.getByRole('heading',{name:'The Empty Bench · by Grandma'})).toBeVisible();await button(p,'Let Grandma share her story').click();await playSpeakingTurn(p);
}
export async function playBakery(p:Page,wrong=false){
 for(let i=0;i<20&&await p.locator('.garden-reader').count();i++)await p.locator('.g-reader-top .g-close').click();
 if(!await p.locator('.garden-bakery-controls').isVisible())await button(p,'Go to Rina’s bakery').click();
 await button(p,'Talk to Rina').click();await completeConversation(p);await button(p,'I can bring the spare tile to Sol.').click();await button(p,'Back to Pip').click();await button(p,'Go to the tile shelf').click();await button(p,'Take the spare tile').click();await button(p,'Bring the tile to Sol').click();await button(p,'Give the tile to Sol').click();await button(p,'Direct Sol’s roof repair').click();await button(p,'Remove the cracked tile').click();
 if(wrong){await button(p,'Beside the opening').click();await button(p,'Place the tile').click();await expect(p.locator('.garden-feedback')).toContainText('Water still comes through');}
 await button(p,'Over the opening').click();await button(p,'Place the tile').click();await button(p,'Let Rina check the flour').click();if(await button(p,'Go to Rina').isVisible())await button(p,'Go to Rina').click();await button(p,'Make the dough with Rina').click();await button(p,'Shape the loaves').click();await button(p,'Bake the bread').click();await button(p,'Take a loaf to thank Sol').click();await button(p,'Walk with Rina to the workshop').click();await button(p,'Let Rina give Sol the loaf').click();await expect(p.locator('.garden-bakery-controls')).toHaveCount(0);await expect(button(p,'Talk to Sol')).toBeVisible();
}
export async function playBird(p:Page,wrong=false){
 await button(p,'Speak to the boy').click();await expect(p.locator('.garden-passage .g-source-voice')).toHaveText(['Mara narrates','Mara','Mara narrates','The boy','Mara narrates','Mara narrates']);await expect(p.getByRole('group',{name:'You are speaking as Mara. Choose your response.'})).toBeVisible();await button(p,'Would you like some help?').click();
 await button(p,'Walk to the dock office').click();await button(p,'Pick up the tape').click();await button(p,'Return to the boy').click();await button(p,'Line up the torn wing').click();
 if(wrong){await button(p,'Tape beside the tear').click();await button(p,'Place the strip').click();await expect(p.locator('.g-mara-scene')).toHaveAttribute('data-strip','beside');await expect(p.locator('.garden-feedback')).toContainText('wing is still loose');}
 await button(p,'Tape across the tear').click();await button(p,'Place the strip').click();await button(p,'Let the boy carry his bird').click();await button(p,'Return to Grandma’s garden').click();await expect(p.locator('.g-mara-scene')).toHaveCount(0);
 // The earlier scene closes at the start of the physical return. Wait for its
 // actual destination before deciding between early sharing and public telling.
 await expect.poll(async()=>await p.locator('.garden-gathering-controls').isVisible()||await p.locator('.garden-reader').isVisible()).toBe(true);
 if(await p.locator('.garden-gathering-controls').isVisible())await playSpeakingTurn(p);await expect(p.locator('.garden-reader')).toBeVisible();
}
