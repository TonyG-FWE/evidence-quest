import {webkit} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await webkit.launch({headless:true});
try{
 const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:2}),page=await context.newPage();
 const result=await page.evaluate(async()=>{
  const results={dpr:devicePixelRatio,offscreenCanvas:typeof OffscreenCanvas,htmlTransferControl:typeof HTMLCanvasElement.prototype.transferControlToOffscreen};
  const target=document.createElement('canvas');target.width=256;target.height=128;document.body.append(target);const bitmap=target.getContext('bitmaprenderer');results.bitmapRenderer=!!bitmap;
  if(typeof OffscreenCanvas==='function'){
   const surface=new OffscreenCanvas(256,128),gl=surface.getContext('webgl2',{antialias:true,alpha:false});results.offscreenWebgl2=!!gl;
   if(gl){results.context=gl.getContextAttributes();results.samples=gl.getParameter(gl.SAMPLES);gl.clearColor(12/255,34/255,56/255,1);gl.clear(gl.COLOR_BUFFER_BIT);try{const frame=surface.transferToImageBitmap();results.bitmapDimensions=[frame.width,frame.height];if(bitmap){bitmap.transferFromImageBitmap(frame);const check=document.createElement('canvas');check.width=256;check.height=128;const read=check.getContext('2d');read.drawImage(target,0,0);results.roundTripPixel=[...read.getImageData(128,64,1,1).data];}else frame.close();}catch(error){results.transferError=String(error);}gl.getExtension('WEBGL_lose_context')?.loseContext();}
  }
  results.worker=await new Promise(resolve=>{const source=`self.onmessage=()=>{try{const supported=typeof OffscreenCanvas==='function',canvas=supported?new OffscreenCanvas(128,64):null,gl=canvas?.getContext('webgl2',{antialias:true,alpha:false});self.postMessage({offscreenCanvas:supported,webgl2:!!gl,requestAnimationFrame:typeof self.requestAnimationFrame,context:gl?.getContextAttributes(),samples:gl?.getParameter(gl.SAMPLES)});}catch(error){self.postMessage({error:String(error)});}};`,uri=URL.createObjectURL(new Blob([source],{type:'application/javascript'})),worker=new Worker(uri);const done=value=>{clearTimeout(timer);worker.terminate();URL.revokeObjectURL(uri);resolve(value);};const timer=setTimeout(()=>done({timeout:true}),5000);worker.onmessage=event=>done(event.data);worker.onerror=event=>done({error:event.message});worker.postMessage({});});
  return results;
 });
 const evidence={date:new Date().toISOString(),scope:'Capability and one-color round-trip only. No performance or game qualification; no browser flag changes.',browser:browser.version(),result};await writeFile('evidence/staged-bridge-20260916/webkit-surface-capabilities.json',JSON.stringify(evidence,null,2)+'\n');console.log(JSON.stringify(evidence,null,2));await context.close();
}finally{await browser.close();}
