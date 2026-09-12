import type {Store} from '../core/store.js';
import type {Effect,Envelope} from '../core/commands.js';
async function json(response:Response,limit:number){
 if(!response.ok||!response.body)throw Error('unavailable');const reader=response.body.getReader(),chunks:Uint8Array[]=[];let size=0;
 try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit){await reader.cancel();throw Error('limit');}chunks.push(value);}}finally{reader.releaseLock();}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return JSON.parse(new TextDecoder().decode(bytes)) as Record<string,unknown>;
}
export function installHTTP(store:Store){
 const active=new Map<string,AbortController>();
 void fetch('/api/config',{cache:'no-store',signal:AbortSignal.timeout(3000)}).then(r=>json(r,2048)).then(config=>store.send({type:'COACH_CONFIG',live:config['mode']==='adult-evaluation'&&config['liveAvailable']===true})).catch(()=>store.send({type:'COACH_CONFIG',live:false}));
 return {handle(effect:Effect,envelope:Envelope){
  if(effect.kind==='coach-abort'){active.get(effect.requestId)?.abort();active.delete(effect.requestId);}
  if(effect.kind!=='coach-send'||store.getSnapshot().runtime.coachTransport!=='live')return;
  const request=effect.request,abort=new AbortController();active.set(request.requestId,abort);
  void fetch('/api/coach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(request),signal:abort.signal}).then(r=>json(r,8192)).then(response=>store.callback({type:'COACH_RECEIVE',requestId:request.requestId,response},envelope)).catch(()=>{if(!abort.signal.aborted)store.callback({type:'COACH_RECEIVE',requestId:request.requestId,response:null},envelope);}).finally(()=>active.delete(request.requestId));
 }};
}
