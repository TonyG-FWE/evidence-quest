import {test,expect} from '@playwright/test';

test.use({trace:'off',video:'off'});
test('diagnostic WebGL attributes in the actual game',async({browser},info)=>{
 test.setTimeout(180000);const results=[];
 for(const options of [{alpha:true,preserveDrawingBuffer:false},{alpha:false,preserveDrawingBuffer:false}]){
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:2}),page=await context.newPage();
  await context.addInitScript(value=>{
   const original=HTMLCanvasElement.prototype.getContext;
   HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,kind:string,options?:unknown){return original.call(this,kind,kind==='webgl2'?{...(options as object),...value}:options);} as typeof original;
  },options);
  await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();await page.getByRole('button',{name:'Go to the bridge pieces',exact:true}).click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-pip-x','-2.800');
  const scene=page.locator('.garden-scene');await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe('approved-r2-feet');
  for(const view of ['encounter','overview']){
   if(view==='overview'){await page.getByRole('button',{name:'Map overview',exact:true}).click();await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-metrics')??'{}').imported?.sources??0).toBe(2);}
   await scene.locator('canvas').focus();await page.keyboard.down('ArrowLeft');
   const sample=await page.evaluate(()=>new Promise(resolve=>{let warmup=45,previous=performance.now();const frames:number[]=[];function frame(now:number){const dt=now-previous;previous=now;if(warmup>0)warmup--;else frames.push(dt);if(frames.length<240)requestAnimationFrame(frame);else{frames.sort((a,b)=>a-b);const canvas=document.querySelector<HTMLCanvasElement>('.garden-scene canvas')!;resolve({samples:frames.length,median:frames[120],p95:frames[228],max:frames.at(-1),attributes:canvas.getContext('webgl2')!.getContextAttributes(),metrics:JSON.parse(document.querySelector<HTMLElement>('.garden-scene')!.dataset['metrics']!)});}}requestAnimationFrame(frame);}));
   await page.keyboard.up('ArrowLeft');results.push({options,view,sample});
  }
  await context.close();
 }
 await info.attach('actual-context-diagnostic',{body:JSON.stringify({qualification:false,scope:'Actual game and UI with only a diagnostic canvas creation override. Density, antialiasing, shadows, textures, geometry and commands unchanged.',results}),contentType:'application/json'});
});
test('diagnostic WebGL presentation options preserve density and antialiasing',async({page},info)=>{
 test.setTimeout(180000);
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 const size=await page.locator('.garden-scene canvas').evaluate(canvas=>({width:(canvas as HTMLCanvasElement).width,height:(canvas as HTMLCanvasElement).height}));
 await page.goto('about:blank');
 const measurements=await page.evaluate(async size=>{
  const rows=[];
  for(const options of [{},{preserveDrawingBuffer:true},{desynchronized:true},{alpha:true},{preserveDrawingBuffer:true,desynchronized:true}]){
   const canvas=document.createElement('canvas');canvas.width=size.width;canvas.height=size.height;canvas.style.cssText=`display:block;width:${size.width/devicePixelRatio}px;height:${size.height/devicePixelRatio}px`;document.body.append(canvas);
   const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,powerPreference:'high-performance',...options})!;if(!gl)throw Error('WebGL unavailable');
   let warmup=30,previous=performance.now();const samples:number[]=[];
   await new Promise<void>(resolve=>{function frame(now:number){const dt=now-previous;previous=now;if(warmup>0)warmup--;else samples.push(dt);gl.clearColor(.7+(samples.length%25)/1000,.8,.65,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);if(samples.length===240)resolve();else requestAnimationFrame(frame);}requestAnimationFrame(frame);});
   samples.sort((a,b)=>a-b);rows.push({options,attributes:gl.getContextAttributes(),samples:gl.getParameter(gl.SAMPLES),p95:samples[228],median:samples[120],max:samples.at(-1),frames:samples.length});
   gl.getExtension('WEBGL_lose_context')?.loseContext();canvas.remove();
  }
  return {size,dpr:devicePixelRatio,rows};
 },size);
 await info.attach('presentation-options-diagnostic',{body:JSON.stringify({qualification:false,scope:'Synthetic unchanged-density, antialiased framebuffer options; not a game qualification result.',measurements}),contentType:'application/json'});
});
test('diagnostic bare WebGL compositor floor at the game framebuffer size',async({page},info)=>{
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 const size=await page.locator('.garden-scene canvas').evaluate(canvas=>({width:(canvas as HTMLCanvasElement).width,height:(canvas as HTMLCanvasElement).height}));
 await page.goto('about:blank');
 const measurements=await page.evaluate(async size=>{
  const canvas=document.createElement('canvas');canvas.width=size.width;canvas.height=size.height;canvas.style.cssText=`display:block;width:${size.width/devicePixelRatio}px;height:${size.height/devicePixelRatio}px`;document.body.append(canvas);
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,powerPreference:'high-performance'})!;if(!gl)throw Error('WebGL unavailable');const rows=[];
  for(const mode of ['dom-only','clear-color-and-depth']){let warmup=30;const samples:number[]=[];let previous=performance.now();await new Promise<void>(resolve=>{function frame(now:number){const dt=now-previous;previous=now;if(warmup>0)warmup--;else samples.push(dt);if(mode==='clear-color-and-depth'){gl.clearColor(.7+(samples.length%25)/1000,.8,.65,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);}if(samples.length===240)resolve();else requestAnimationFrame(frame);}requestAnimationFrame(frame);});samples.sort((a,b)=>a-b);rows.push({mode,p95:samples[228],median:samples[120],max:samples.at(-1),frames:samples.length});}
  return {size,dpr:devicePixelRatio,attributes:gl.getContextAttributes(),rows};
 },size);
 await info.attach('bare-compositor-diagnostic',{body:JSON.stringify({qualification:false,scope:'Synthetic diagnostic only: no game, models, shadows, React or animated controls. Uses the real game framebuffer dimensions and unchanged DPR.',measurements}),contentType:'application/json'});
});
test('diagnostic WebKit composition at unchanged DPR and scene detail',async({page},info)=>{
 test.setTimeout(180000);
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 const scene=page.locator('.garden-scene');await page.getByRole('button',{name:'Map overview',exact:true}).click();
 await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-metrics')??'{}').imported?.sources??0).toBe(2);
 await scene.locator('canvas').focus();await page.keyboard.down('ArrowLeft');
 const variants=[['original',''],['no-transform','.garden-scene canvas{transform:none!important}'],['layout-containment','.garden-scene{contain:layout style!important}.garden-scene canvas{transform:none!important}'],['no-containment','.garden-scene{contain:none!important}.garden-scene canvas{transform:none!important}'],['original-again','']];
 const results=[];
 try{for(const [name,css]of variants){
  const style=await page.addStyleTag({content:css||'/* original composition */'});
  const sample=await page.evaluate(()=>new Promise(resolve=>{let warmup=30,previous=performance.now();const frames:number[]=[];function frame(now:number){const dt=now-previous;previous=now;if(warmup>0)warmup--;else frames.push(dt);if(frames.length<150)requestAnimationFrame(frame);else{frames.sort((a,b)=>a-b);resolve({samples:frames.length,median:frames[75],p95:frames[142],max:frames.at(-1),mean:frames.reduce((a,b)=>a+b)/frames.length,metrics:JSON.parse(document.querySelector<HTMLElement>('.garden-scene')!.dataset['metrics']!)});}}requestAnimationFrame(frame);}));
  results.push({name,sample});await style.evaluate(node=>node.remove());
 }}finally{await page.keyboard.up('ArrowLeft');}
 await info.attach('composition-diagnostic',{body:JSON.stringify({qualification:false,unchanged:'DPR2, geometry, textures, antialiasing, lighting, shadows and commands',results},null,2),contentType:'application/json'});
});
