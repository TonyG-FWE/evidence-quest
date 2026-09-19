import {test,expect} from '@playwright/test';
test('Investigate native readonly and editable textarea keyboard ranges',async({page},info)=>{
 await page.setContent('<label for="readonly">Readonly</label><textarea id="readonly" readonly>Rina baked the bread.</textarea><label for="editable">Editable</label><textarea id="editable">Rina baked the bread.</textarea>');
 const trace=[];
 for(const id of ['readonly','editable']){
  const field=page.locator('#'+id);await field.click();
  for(const key of ['Control+Home','Shift+ArrowRight','Shift+ArrowRight','Control+Shift+ArrowRight']){await page.keyboard.press(key);trace.push(await field.evaluate((el,key)=>({field:el.id,key,active:document.activeElement?.id,start:(el as HTMLTextAreaElement).selectionStart,end:(el as HTMLTextAreaElement).selectionEnd}),key));}
 }
 await info.attach('keyboard-range-comparison',{body:JSON.stringify(trace,null,2),contentType:'application/json'});
 expect(trace.some(t=>t.field==='editable'&&t.end>t.start)).toBe(true);
});
