import{test}from'@playwright/test';
import{writeFile}from'node:fs/promises';
import{workstation,putTile}from'./helpers.js';
test('diagnostic WebKit active Canvas calls and state operations',async({browser},info)=>{
 const context=await browser.newContext({baseURL:info.project.use.baseURL,viewport:{width:1440,height:1000},deviceScaleFactor:2}),page=await context.newPage();
 await page.addInitScript(()=>{
  const state={active:false,costs:{} as Record<string,{calls:number;ms:number;maxMs:number}>};Object.assign(window,{eqMeasuredCosts:state});
  const measure=(name:string,fn:()=>unknown)=>{if(!state.active)return fn();const start=performance.now();try{return fn();}finally{const elapsed=performance.now()-start,row=state.costs[name]??={calls:0,ms:0,maxMs:0};row.calls++;row.ms+=elapsed;row.maxMs=Math.max(row.maxMs,elapsed);}};
  const clone=window.structuredClone.bind(window);window.structuredClone=((...args:Parameters<typeof structuredClone>)=>measure('structuredClone',()=>clone(...args))) as typeof structuredClone;
  const uuid=crypto.randomUUID.bind(crypto);crypto.randomUUID=()=>measure('randomUUID',uuid) as ReturnType<typeof crypto.randomUUID>;
  const freeze=Object.freeze;Object.freeze=((value:unknown)=>measure('Object.freeze',()=>freeze(value))) as typeof Object.freeze;
  for(const method of ['drawImage','fillRect','strokeRect','fill','stroke','clip'] as const){const original=CanvasRenderingContext2D.prototype[method];(CanvasRenderingContext2D.prototype[method] as unknown) =function(this:CanvasRenderingContext2D,...args:unknown[]){const source=args[0] as HTMLImageElement|undefined;const image=method==='drawImage'&&source?.src?new URL(source.src,location.href).pathname:'geometry';return measure(`${this.canvas.dataset.testid??'offscreen'}:${method}:${image}`,()=>Reflect.apply(original,this,args));};}
 });
 await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.waitForLoadState('networkidle');await page.getByRole('button',{name:'Try this ending',exact:true}).click();
 const result=await page.evaluate(()=>new Promise(resolve=>{const state=(window as unknown as {eqMeasuredCosts:{active:boolean;costs:unknown}}).eqMeasuredCosts;state.active=true;const start=performance.now(),frames:number[]=[];let previous=start;const frame=(now:number)=>{frames.push(now-previous);previous=now;if(now<start+2000)requestAnimationFrame(frame);else{state.active=false;resolve({frames,costs:state.costs,elapsed:performance.now()-start});}};requestAnimationFrame(frame);}));
 await writeFile('evidence/er13/render-cost-diagnostic.json',JSON.stringify({scope:'Diagnostic wrappers measure synchronous Canvas API calls and clone/freeze/UUID operations during an actual two-second rehearsal. Deferred compositing and total React commit duration are not attributed. Instrumentation overhead is included; this is diagnosis, not qualification.',result},null,2)+'\n');await context.close();
});
