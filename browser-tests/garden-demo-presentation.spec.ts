import {test,expect} from '@playwright/test';

test('clean compiled demo keeps welcome and reading controls visible',async({page},info)=>{
 test.skip(process.env['EQ_DEMO_PRESENTATION']!=='1','Clean presentation is an explicit compiled-demo profile.');
 await page.goto('/garden');
 const sizes=[{width:1422,height:800},{width:1366,height:768},{width:1920,height:1080}];
 for(const size of sizes){
  await page.setViewportSize(size);
  await expect(page.getByRole('button',{name:'Begin Pip’s adventure',exact:true})).toBeInViewport({ratio:1});
  await expect(page.getByRole('button',{name:'Read the welcome with help',exact:true})).toBeInViewport({ratio:1});
  await expect(page.getByRole('button',{name:'Full screen',exact:true})).toBeInViewport({ratio:1});
  await page.screenshot({path:info.outputPath('welcome-'+size.width+'.png')});
 }
 await page.setViewportSize({width:320,height:568});
 await expect(page.getByRole('button',{name:'Full screen',exact:true})).toBeInViewport({ratio:1});
 await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeInViewport({ratio:1});
 await page.setViewportSize(sizes[0]!);
 await page.getByRole('button',{name:'Full screen',exact:true}).click();
 await expect(page.getByRole('button',{name:'Exit full screen',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Exit full screen',exact:true}).click();
 await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();
 await expect(page.locator('.garden-review-tools')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Inspect studio',exact:true})).toHaveCount(0);
 for(const size of sizes){
  await page.setViewportSize(size);
  await expect(page.getByRole('button',{name:'Start playing',exact:true})).toBeInViewport({ratio:1});
  await expect(page.getByRole('button',{name:'Full screen',exact:true})).toBeInViewport({ratio:1});
  const reading=page.locator('.garden-reading-scroll');await expect(reading).toBeVisible();
  const box=(await reading.boundingBox())!;expect(box.height).toBeGreaterThan(200);
  await page.screenshot({path:info.outputPath('opening-'+size.width+'.png')});
 }
});
