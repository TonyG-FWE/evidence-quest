import {test,expect,type Page} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {buildStagedBridge} from './garden-actions.js';
import {CROSSING} from '../src/garden/model.js';
const pngjs=createRequire(import.meta.url)('pngjs') as {PNG:{sync:{read(bytes:Buffer):{width:number;height:number;data:Buffer}}}};

/** Test instrumentation only. No scene/store/renderer API is changed. The
 * separately labeled environment-gated comparison changes context creation.
 * A requested framebuffer read runs after the application's own RAF callback,
 * before the browser may discard its non-preserved drawing buffer. It changes
 * GPU synchronization and is therefore never performance qualification. */
type FrameRead={label:string;at:number;frame:number;hidden:boolean;visibility:string;size:number[];rect:Record<string,number>;css:Record<string,string>;dataset:Record<string,string>;context:Record<string,unknown>;tiles:unknown[];dataUrl?:string;error?:string};
type Probe={pending:{label:string;view?:string}|null;frames:FrameRead[];events:unknown[];read:(label:string,png:boolean)=>FrameRead|null};
declare global {interface Window {__eqBlankCanvasProbe:Probe}}
type ProbeWindow=Window&{__eqBlankCanvasProbe:Probe};

async function installProbe(page:Page,preserveDrawingBuffer:boolean){
 await page.addInitScript(({preserveDrawingBuffer})=>{
  const root=window as ProbeWindow;
  const watched=new WeakSet<HTMLCanvasElement>();
  const probe:Probe={pending:null,frames:[],events:[],read(label,png){
   const host=document.querySelector<HTMLElement>('.garden-scene'),canvas=host?.querySelector('canvas');if(!host||!canvas)return null;
   const box=canvas.getBoundingClientRect(),css=getComputedStyle(canvas),r:FrameRead={label,at:performance.now(),frame:Number(host.dataset['renderedFrame']),hidden:document.hidden,visibility:document.visibilityState,size:[canvas.width,canvas.height],rect:{x:box.x,y:box.y,width:box.width,height:box.height},css:{display:css.display,visibility:css.visibility,opacity:css.opacity,transform:css.transform},dataset:{...host.dataset} as Record<string,string>,context:{},tiles:[]};
   try{
    const gl=canvas.getContext('webgl2');
    if(!gl){r.context={available:false};return r;}
    const bound=gl.getParameter(gl.FRAMEBUFFER_BINDING);
    r.context={available:true,lost:gl.isContextLost(),attributes:gl.getContextAttributes(),drawingBuffer:[gl.drawingBufferWidth,gl.drawingBufferHeight],defaultFramebuffer:bound===null,viewport:Array.from(gl.getParameter(gl.VIEWPORT) as Int32Array)};
    // Never bind a framebuffer or change GL state. A non-default binding is a
    // meaningful result, and is intentionally not sampled as canvas output.
    if(!gl.isContextLost()&&bound===null){
     for(const [u,v] of [[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]]){
      const x=Math.max(0,Math.min(canvas.width-16,Math.round(canvas.width*u!))),y=Math.max(0,Math.min(canvas.height-16,Math.round(canvas.height*v!))),bytes=new Uint8Array(16*16*4);gl.readPixels(x,y,16,16,gl.RGBA,gl.UNSIGNED_BYTE,bytes);
      const colors=new Map<string,number>();let opaque=0,nonzero=0;
      for(let i=0;i<bytes.length;i+=4){const key=Array.from(bytes.subarray(i,i+4)).join(',');colors.set(key,(colors.get(key)??0)+1);if(bytes[i+3]===255)opaque++;if(bytes[i]||bytes[i+1]||bytes[i+2]||bytes[i+3])nonzero++;}
      r.tiles.push({x,y,pixels:256,unique:colors.size,opaque,nonzero,dominant:[...colors].sort((a,b)=>b[1]-a[1]).slice(0,3)});
     }
     if(png)r.dataUrl=canvas.toDataURL('image/png');
    }
   }catch(error){r.error=String(error);}
   return r;
  }};
  root.__eqBlankCanvasProbe=probe;
  if(preserveDrawingBuffer){
   // Diagnostic-only candidate. Default runs do not replace getContext at all.
   // Retain every supplied attribute except this one explicitly tested flag.
   const nativeGetContext=HTMLCanvasElement.prototype.getContext as (this:HTMLCanvasElement,type:string,attributes?:unknown)=>RenderingContext|null;
   HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,attributes?:unknown){
    if(type==='webgl2'||type==='webgl'||type==='experimental-webgl'){
     const requested=attributes&&typeof attributes==='object'?attributes:{},applied={...requested,preserveDrawingBuffer:true};
     probe.events.push({type:'DIAGNOSTIC_CONTEXT_OVERRIDE',at:performance.now(),contextType:type,requested,applied});
     return nativeGetContext.call(this,type,applied);
    }
    return nativeGetContext.call(this,type,attributes);
   } as typeof HTMLCanvasElement.prototype.getContext;
  }
  function watch(){for(const canvas of Array.from(document.querySelectorAll<HTMLCanvasElement>('canvas')))if(!watched.has(canvas)){
   watched.add(canvas);for(const type of ['webglcontextlost','webglcontextrestored','webglcontextcreationerror'])canvas.addEventListener(type,event=>probe.events.push({type,at:performance.now(),statusMessage:(event as WebGLContextEvent).statusMessage,hidden:document.hidden,frame:canvas.parentElement?.dataset['renderedFrame']}));
  }}
  new MutationObserver(watch).observe(document,{childList:true,subtree:true});
  document.addEventListener('visibilitychange',()=>probe.events.push({type:'visibilitychange',at:performance.now(),state:document.visibilityState}));
  const nativeRAF=window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame=callback=>nativeRAF(time=>{
   const before=document.querySelector<HTMLElement>('.garden-scene')?.dataset['renderedFrame'];callback(time);
   const after=document.querySelector<HTMLElement>('.garden-scene')?.dataset['renderedFrame'];
   const view=document.querySelector<HTMLElement>('.garden-scene')?.dataset['renderedView'];
   if(probe.pending&&after!==before&&(!probe.pending.view||probe.pending.view===view)){const {label}=probe.pending;probe.pending=null;const result=probe.read(label,true);if(result)probe.frames.push(result);}
  });
 },{preserveDrawingBuffer});
}

function imageStats(buffer:Buffer){
 const image=pngjs.PNG.sync.read(buffer),colors=new Map<string,number>();let pixels=0;
 // Center only: excludes most labels/footer. In Pause the reader can still
 // overlap this region; raw images and bounds remain the visual authority.
 for(let y=Math.floor(image.height*.30);y<image.height*.75;y+=3)for(let x=Math.floor(image.width*.32);x<image.width*.70;x+=3){const i=(y*image.width+x)*4,key=Array.from(image.data.subarray(i,i+4)).join(',');colors.set(key,(colors.get(key)??0)+1);pixels++;}
 return {width:image.width,height:image.height,centerSamples:pixels,uniqueCenterColors:colors.size,dominantFraction:Math.max(...colors.values())/pixels,dominant:[...colors].sort((a,b)=>b[1]-a[1]).slice(0,4)};
}

async function arm(page:Page,label:string,view?:string){await page.evaluate(request=>{(window as ProbeWindow).__eqBlankCanvasProbe.pending=request;},{label,...(view?{view}:{})});}
async function readFrame(page:Page,label:string){
 await expect.poll(()=>page.evaluate(label=>(window as ProbeWindow).__eqBlankCanvasProbe.frames.some(frame=>frame.label===label),label),{timeout:5000,message:'Diagnostic observes a real application render, without forcing one'}).toBe(true);
 return await page.evaluate(label=>(window as ProbeWindow).__eqBlankCanvasProbe.frames.find(frame=>frame.label===label)!,label);
}

test('diagnostic: WebKit screenshot, same-frame framebuffer and idle presentation through ordinary staged play',async({page},info)=>{
 test.setTimeout(180000);const rows:unknown[]=[],consoleMessages:unknown[]=[],pageErrors:string[]=[];
 const preserveDrawingBuffer=process.env['EQ_DIAG_PRESERVE_DRAWING_BUFFER']==='1';
 page.on('console',message=>consoleMessages.push({type:message.type(),text:message.text(),location:message.location()}));page.on('pageerror',error=>pageErrors.push(error.message));
 await installProbe(page,preserveDrawingBuffer);
 const button=(name:string)=>page.getByRole('button',{name,exact:true});
 async function capture(label:string,frameAlreadyArmed=false){
  const canvas=page.locator('.garden-scene canvas');await expect(canvas).toBeVisible();
  // Baseline presentation first, before any readPixels/toDataURL in this phase.
  const screen=await page.screenshot({path:info.outputPath(label+'-page.png'),animations:'allow'}),element=await canvas.screenshot({path:info.outputPath(label+'-canvas.png'),animations:'allow'});
  const immediate=await page.evaluate(label=>(window as ProbeWindow).__eqBlankCanvasProbe.read(label+'-outside-render',false),label);
  if(!frameAlreadyArmed)await arm(page,label);
  const synchronous=await readFrame(page,label),url=synchronous.dataUrl;delete synchronous.dataUrl;
  let frameImage:ReturnType<typeof imageStats>|null=null;
  if(url){const bytes=Buffer.from(url.split(',')[1]!,'base64');await writeFile(info.outputPath(label+'-same-frame.png'),bytes);frameImage=imageStats(bytes);}
  rows.push({label,presentation:imageStats(element),page:imageStats(screen),outsideRender:immediate,sameFrame:synchronous,sameFrameImage:frameImage});
 }
 try{
  await page.goto('/garden');await button('Begin Pip’s adventure').click();await button('Start playing').click();await button('Go to the bridge pieces').click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));
  await capture('00-normal-idle');
  await page.locator('.garden-scene canvas').focus();await page.keyboard.down('ArrowUp');try{await capture('01-normal-moving');}finally{await page.keyboard.up('ArrowUp');}
  await buildStagedBridge(page);await capture('02-bridge-after-release');
  // Capture each paused/stationary state from the actual frame caused by its
  // native UI transition; never trigger an extra render to repair the image.
  await arm(page,'03-native-pause','pause');await button('Pause').click();await readFrame(page,'03-native-pause');await capture('03-native-pause',true);
  await page.getByRole('checkbox',{name:'Reduced motion',exact:true}).check();
  await arm(page,'04-reduced-idle','walk');await page.locator('.g-reader-top .g-close').click();await readFrame(page,'04-reduced-idle');await capture('04-reduced-idle',true);
  await page.locator('.garden-scene canvas').focus();await page.keyboard.down('ArrowLeft');try{await capture('05-reduced-moving');}finally{await page.keyboard.up('ArrowLeft');}
  // Pointer motion alone does not alter the story. Two uninstrumented captures
  // after release expose a presentation that disappears between actual draws.
  for(let i=0;i<2;i++){await page.waitForTimeout(300);const bytes=await page.screenshot({path:info.outputPath('06-reduced-stopped-'+i+'.png'),animations:'allow'});rows.push({label:'06-reduced-stopped-'+i,page:imageStats(bytes),dom:await page.locator('.garden-scene').evaluate(element=>({...((element as HTMLElement).dataset)}))});}
 }finally{
  const events=await page.evaluate(()=>(window as ProbeWindow).__eqBlankCanvasProbe?.events??[]).catch(()=>[]);
  const evidence={scope:'Diagnostic, not performance or final visual qualification. One ordinary fresh staged route; no save/store mutation, forced render, quality/DPR change or provider call.',contextMode:preserveDrawingBuffer?'TEST_ONLY_PRESERVE_DRAWING_BUFFER_TRUE':'UNMODIFIED_PRODUCTION_CONTEXT',contextOverride:preserveDrawingBuffer?{preserveDrawingBuffer:true}:null,caveats:['Default preserveDrawingBuffer=false can make an outside-render read empty without proving display failure.','The environment-gated preserved-buffer comparison changes only context creation in this test; it cannot qualify production or establish a runtime fix.','Same-frame readPixels/toDataURL synchronizes GPU work and may affect later presentation. Baseline captures precede each phase read.','Paused transition snapshots are captured before screenshot acquisition; PNG differences can include camera/animation and reader layout changes.','Center-color statistics are a triage signal; inspect the retained PNGs.'],project:info.project.name,consoleMessages,pageErrors,events,rows};
  await writeFile(info.outputPath('blank-canvas-diagnostic.json'),JSON.stringify(evidence,null,2)+'\n');await info.attach('blank-canvas-diagnostic',{body:JSON.stringify(evidence),contentType:'application/json'});
 }
});
