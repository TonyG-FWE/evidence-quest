import {expect,type Page} from '@playwright/test';
/** Ordinary input: visit every reading page and verify nothing was omitted. */
export async function readWholeStory(page:Page,title:string,expected:string){
 const tools=page.getByRole('region',{name:'Read the complete '+title,exact:true});
 await tools.getByRole('button',{name:'Read the whole story aloud',exact:true}).click();
 const reader=page.getByRole('dialog',{name:'Reading practice',exact:true});
 await expect(reader).toContainText(title);await expect(reader).toHaveAttribute('data-recording','ready');
 const previous=reader.getByRole('button',{name:'Previous reading page',exact:true});
 while(await previous.count()&&await previous.isEnabled())await previous.click();
 let text=(await reader.locator('.g-practice-words').textContent())??'';
 const next=reader.getByRole('button',{name:'Next reading page',exact:true});
 for(let i=0;i<100&&await next.count()&&await next.isEnabled();i++){await next.click();text+=(await reader.locator('.g-practice-words').textContent())??'';}
 expect(text).toBe(expected);await reader.getByRole('button',{name:'Back to the story',exact:true}).click();
 await expect(tools.getByRole('button',{name:'Read the whole story aloud',exact:true})).toBeFocused();
}
