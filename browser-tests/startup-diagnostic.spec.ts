import {test,expect} from '@playwright/test';
test('production startup diagnostic',async({page})=>{
 const errors:string[]=[];page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('pageerror',e=>errors.push(e.stack??e.message));await page.goto('/');
 await expect(page.getByRole('button',{name:'Join the crew',exact:true}),errors.join('\n')).toBeVisible({timeout:3000}).catch(e=>{throw Error(errors.join('\n')+'\n'+e.message);});
});
