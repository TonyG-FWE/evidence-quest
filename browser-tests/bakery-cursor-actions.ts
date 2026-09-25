import {expect,type Page,type TestInfo} from '@playwright/test';

/** Inputs use only the rendered object outlines a player can see. Chapter and
 * gesture diagnostics are assertions, never sources of pointer coordinates. */
export async function bakeryCue(page:Page,id:string,drop=false){
 const target=page.locator(`[data-bakery-${drop?'drop':'object'}="${id}"]`);await expect(target).toBeVisible();
 const box=await target.boundingBox();expect(box).not.toBeNull();return {...box!,cx:box!.x+box!.width/2,cy:box!.y+box!.height/2};
}
export async function bakeryStage(page:Page,stage:string){await expect.poll(async()=>JSON.parse((await page.locator('.garden-scene').getAttribute('data-bakery'))!).stage,{timeout:30000}).toBe(stage);await expect(page.locator('.garden-scene')).toHaveAttribute('data-action-kind','none');}
export async function settleBakeryView(page:Page){
 await expect(page.locator('.garden-feedback')).not.toContainText('Walking to',{timeout:30000});
 await page.waitForTimeout(600); // Let the visible follow camera settle after arrival.
}
export async function clickBakeryCue(page:Page,id:string,drop=false){const p=await bakeryCue(page,id,drop);await page.mouse.click(p.cx,p.cy);await settleBakeryView(page);}
export async function holdBakeryObject(page:Page,id:string){const p=await bakeryCue(page,id);await page.mouse.move(p.cx,p.cy);await page.mouse.down();await page.mouse.move(p.cx+8,p.cy+8,{steps:3});await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',/^\{/);return p;}
export async function dropBakeryObject(page:Page,id:string,target:string){await holdBakeryObject(page,id);const p=await bakeryCue(page,target,true);await page.mouse.move(p.cx,p.cy,{steps:18});await page.mouse.up();}
export async function cutBakeryDough(page:Page,box:Awaited<ReturnType<typeof bakeryCue>>,position:[number,number],info:TestInfo,label:string){
 await bakeryCue(page,'dough'); // Wait for visible portions after the previous cut.
 const x=box.x+box.width*position[0],y=box.y+box.height*position[1];
 await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x,y+8,{steps:3});await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',/dough-cut/);
 await page.screenshot({path:info.outputPath('cursor-cut-preview-'+label+'.png')});
 await page.mouse.move(x,y+box.height*.45,{steps:15});await page.mouse.up();
}

export async function playCursorBakery(page:Page,info:TestInfo,checkpoint?:(kind:'roof'|'dough'|'handoff')=>Promise<void>){
 await clickBakeryCue(page,'spareTile');await dropBakeryObject(page,'spareTile','pip');await bakeryStage(page,'carried');
 await clickBakeryCue(page,'sol',true);await dropBakeryObject(page,'spareTile','sol');await bakeryStage(page,'delivered');
 await repairBakeryWithCursor(page,info,checkpoint);
}

/** Shared by the fresh route and the explicitly labeled delivered-tile fixture. */
export async function repairBakeryWithCursor(page:Page,info:TestInfo,checkpoint?:(kind:'roof'|'dough'|'handoff')=>Promise<void>){
 const scene=page.locator('.garden-scene');
 await holdBakeryObject(page,'crackedTile');await page.keyboard.press('Escape');await page.mouse.up();await bakeryStage(page,'delivered');
 const cracked=await holdBakeryObject(page,'crackedTile');await page.mouse.move(cracked.cx+cracked.width,cracked.cy+cracked.height,{steps:15});await page.mouse.up();await bakeryStage(page,'gap');
 await page.screenshot({path:info.outputPath('cursor-roof-opening.png')});await checkpoint?.('roof');
 await dropBakeryObject(page,'spareTile','opening');await bakeryStage(page,'sealed');
 await clickBakeryCue(page,'flour');await clickBakeryCue(page,'flour');await bakeryStage(page,'checked');
 await dropBakeryObject(page,'flour','bowl');await expect(page.locator('.garden-hands>p')).toContainText('back and forth');
 await clickBakeryCue(page,'dough');const bowl=await holdBakeryObject(page,'dough');
 for(const offset of [.55,-.55,.55,-.55,0])await page.mouse.move(bowl.cx+bowl.width*offset,bowl.cy,{steps:8});
 await page.mouse.up();await bakeryStage(page,'mixed');await clickBakeryCue(page,'dough');
 await page.screenshot({path:info.outputPath('cursor-dough-ready.png')});await checkpoint?.('dough');
 const dough=await bakeryCue(page,'dough');await cutBakeryDough(page,dough,[.38,.45],info,'first');await cutBakeryDough(page,dough,[.62,.45],info,'second');
 await bakeryStage(page,'shaped');await dropBakeryObject(page,'loaf','oven');await bakeryStage(page,'baked');
 await clickBakeryCue(page,'loaf');await dropBakeryObject(page,'loaf','rina');await bakeryStage(page,'escorting');
 // The view-only map exposes the actual distant character, then the world
 // click approaches him. No destination/action shortcut changes game state.
 await page.getByRole('button',{name:'Map and camera',exact:true}).click();await page.getByRole('button',{name:'Fit map',exact:true}).click();await page.getByRole('button',{name:'Map and camera',exact:true}).click();await page.waitForTimeout(700);
 await page.screenshot({path:info.outputPath('cursor-workshop-destination.png')});await clickBakeryCue(page,'sol',true);await page.waitForTimeout(1200);
 await clickBakeryCue(page,'loaf');await page.screenshot({path:info.outputPath('cursor-workshop-arrival.png')});await dropBakeryObject(page,'loaf','sol');await bakeryStage(page,'done');
 await expect(page.getByRole('heading',{name:'Rina’s thank-you visit',exact:true})).toBeVisible();
 await expect(page.locator('.garden-alternate-controls[open]')).toHaveCount(0);await expect(scene).toHaveAttribute('data-hand-gesture','');
 await page.screenshot({path:info.outputPath('cursor-bakery-handoff.png')});await checkpoint?.('handoff');
}
