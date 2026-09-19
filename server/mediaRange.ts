import {randomBytes} from 'node:crypto';
import type {IncomingMessage,ServerResponse} from 'node:http';

/** One byte range over identity bytes. Multiple ranges are deliberately rejected. */
export function byteRange(header:string|undefined,size:number):{start:number;end:number}|null|'invalid'{
 if(!header)return null;
 const match=/^bytes=(\d*)-(\d*)$/.exec(header.trim());
 if(!match||!size||(!match[1]&&!match[2]))return 'invalid';
 let start=match[1]?Number(match[1]):0,end=match[2]?Number(match[2]):size-1;
 if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end))return 'invalid';
 if(!match[1]){if(end<=0)return 'invalid';start=Math.max(0,size-end);end=size-1;}
 if(start>=size||end<start)return 'invalid';
 return {start,end:Math.min(end,size-1)};
}
export function sendMedia(req:IncomingMessage,res:ServerResponse,bytes:Buffer,mime:string,cacheControl='no-store'){
 const range=byteRange(typeof req.headers.range==='string'?req.headers.range:undefined,bytes.length);
 const headers={'Content-Type':mime,'Accept-Ranges':'bytes','Cache-Control':cacheControl,'X-Content-Type-Options':'nosniff'};
 if(range==='invalid'){res.writeHead(416,{...headers,'Content-Range':'bytes */'+bytes.length,'Content-Length':0});res.end();return;}
 const body=range?bytes.subarray(range.start,range.end+1):bytes;
 res.writeHead(range?206:200,{...headers,'Content-Length':body.length,...(range?{'Content-Range':`bytes ${range.start}-${range.end}/${bytes.length}`}:{})});
 res.end(req.method==='HEAD'?undefined:body);
}
/** Per-listen capability, not a content/text URL. Expiration never generates a replacement. */
export class EphemeralCastMedia{
 private records=new Map<string,{audio:Buffer;mime:string;expires:number}>();
 constructor(private readonly limit=24*1024*1024,private readonly ttl=5*60*1000){}
 private prune(now:number){for(const [key,value]of this.records)if(value.expires<=now)this.records.delete(key);}
 put(audio:Buffer,mime:string,now=Date.now()):string|null{
  this.prune(now);if(audio.length>this.limit)return null;
  let total=[...this.records.values()].reduce((sum,value)=>sum+value.audio.length,0);
  while(total+audio.length>this.limit){const first=this.records.entries().next().value;if(!first)break;this.records.delete(first[0]);total-=first[1].audio.length;}
  const token=randomBytes(24).toString('hex');this.records.set(token,{audio,mime,expires:now+this.ttl});
  const timer=setTimeout(()=>this.records.delete(token),this.ttl);timer.unref();
  return '/api/garden/cast-media/'+token;
 }
 get(token:string,now=Date.now()){this.prune(now);return this.records.get(token);}
 revoke(token:string){this.records.delete(token);}
}
