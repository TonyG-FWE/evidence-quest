import {createServer,request,type ServerResponse} from 'node:http';
import type {AddressInfo} from 'node:net';

/** Test-only loopback transport: shared 10 Mbps downstream, 100 ms response
 * latency, real streamed bytes. It does not change runtime code or simulate a
 * physical device. All upstream requests stay on the owned loopback server. */
export async function networkProfile(upstream:string){
 const origin=new URL(upstream);if(origin.hostname!=='127.0.0.1')throw Error('Only the owned loopback origin may be profiled');
 const streams=new Set<{response:ServerResponse;chunks:Buffer[];offset:number;done:boolean}>();
 let bytes=0;
 const interval=setInterval(()=>{
  let remaining=12500;const active=[...streams].filter(s=>s.chunks.length),perStream=Math.ceil(remaining/active.length);
  for(const stream of active){let share=Math.min(remaining,perStream);while(share>0&&stream.chunks.length){const chunk=stream.chunks[0]!,n=Math.min(share,chunk.length-stream.offset);stream.response.write(chunk.subarray(stream.offset,stream.offset+n));bytes+=n;stream.offset+=n;remaining-=n;share-=n;if(stream.offset===chunk.length){stream.chunks.shift();stream.offset=0;}}}
  for(const stream of streams)if(stream.done&&!stream.chunks.length){stream.response.end();streams.delete(stream);}
 },10);
 const server=createServer((incoming,response)=>{
  const stream={response,chunks:[] as Buffer[],offset:0,done:false};
  const req=request(new URL(incoming.url??'/',origin),{method:incoming.method,headers:{...incoming.headers,host:origin.host}},result=>{
   let ready=false;const buffered:Buffer[]=[];
   const timer=setTimeout(()=>{if(response.destroyed)return;response.writeHead(result.statusCode??502,result.headers);ready=true;stream.chunks.push(...buffered);streams.add(stream);},100);
   result.on('data',(chunk:Buffer)=>{(ready?stream.chunks:buffered).push(chunk);});result.on('end',()=>{stream.done=true;});result.on('error',()=>response.destroy());response.on('close',()=>{clearTimeout(timer);streams.delete(stream);result.destroy();});
  });req.on('error',()=>{if(!response.headersSent)response.writeHead(502);response.end();});incoming.pipe(req);
 });await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
 return {url:'http://127.0.0.1:'+(server.address() as AddressInfo).port,bytes:()=>bytes,async close(){clearInterval(interval);server.closeAllConnections();await new Promise<void>(resolve=>server.close(()=>resolve()));}};
}
