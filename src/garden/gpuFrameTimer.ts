type TimerExtension={TIME_ELAPSED_EXT:number;GPU_DISJOINT_EXT:number};

/** Optional local profiling, using asynchronous GPU queries rather than finish().
 * https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/
 * This measures submitted rendering work, not VRAM, input latency or display time.
 */
export class GpuFrameTimer {
 private extension:TimerExtension|null;
 private active:WebGLQuery|null=null;
 private pending:WebGLQuery[]=[];
 private samples:number[]=[];
 private disjointCount=0;
 private skipped=0;
 private closed=false;
 constructor(private gl:WebGL2RenderingContext){this.extension=gl.getExtension('EXT_disjoint_timer_query_webgl2') as TimerExtension|null;}
 poll(){
  if(this.closed||!this.extension)return;
  if(this.gl.isContextLost()){this.pending=[];this.active=null;this.samples=[];return;}
  if(this.gl.getParameter(this.extension.GPU_DISJOINT_EXT)){
   this.disjointCount++;this.samples=[];
   for(const query of this.pending)this.gl.deleteQuery(query);this.pending=[];return;
  }
  while(this.pending.length){
   const query=this.pending[0]!;
   if(!this.gl.getQueryParameter(query,this.gl.QUERY_RESULT_AVAILABLE))break;
   const elapsed=Number(this.gl.getQueryParameter(query,this.gl.QUERY_RESULT))/1e6;
   this.gl.deleteQuery(query);this.pending.shift();
   if(Number.isFinite(elapsed)&&elapsed>=0){this.samples.push(elapsed);if(this.samples.length>600)this.samples.shift();}
  }
 }
 begin(){
  this.poll();
  if(this.closed||!this.extension||this.active||this.gl.isContextLost())return;
  if(this.pending.length>=4){this.skipped++;return;}
  const query=this.gl.createQuery();if(!query)return;
  this.gl.beginQuery(this.extension.TIME_ELAPSED_EXT,query);this.active=query;
 }
 end(){
  if(!this.active||!this.extension)return;
  const query=this.active;this.active=null;
  if(this.gl.isContextLost())return;
  this.gl.endQuery(this.extension.TIME_ELAPSED_EXT);this.pending.push(query);
 }
 reset(){
  if(this.active&&this.extension&&!this.gl.isContextLost())this.gl.endQuery(this.extension.TIME_ELAPSED_EXT);
  for(const query of [...this.pending,...(this.active?[this.active]:[])])this.gl.deleteQuery(query);
  this.active=null;this.pending=[];this.samples=[];this.disjointCount=0;this.skipped=0;
  if(!this.gl.isContextLost())this.extension=this.gl.getExtension('EXT_disjoint_timer_query_webgl2') as TimerExtension|null;
 }
 get metrics(){
  const sorted=[...this.samples].sort((a,b)=>a-b),at=(fraction:number)=>sorted.length?sorted[Math.min(sorted.length-1,Math.floor(sorted.length*fraction))]!:null;
  return {method:'EXT_disjoint_timer_query_webgl2',available:!!this.extension,samples:sorted.length,pending:this.pending.length,medianMs:at(.5),p95Ms:at(.95),p99Ms:at(.99),disjointCount:this.disjointCount,skipped:this.skipped,scope:'GPU elapsed time for submitted rendering; nonblocking; excludes presentation and input latency'};
 }
 dispose(){if(this.closed)return;this.reset();this.closed=true;}
}
