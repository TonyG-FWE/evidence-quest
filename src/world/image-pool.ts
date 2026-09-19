export interface ImageResource {url:string;rgbaBytes:number;level:1|2;group:string;}
interface Entry<T> {resource:ImageResource;value:T|null;status:'loading'|'ready'|'failed';used:number;owners:Set<symbol>;abort:AbortController;}
export class ImagePool<T> {
 private entries=new Map<string,Entry<T>>();private clients=new Map<symbol,()=>void>();private clock=0;private peak=0;private evictions=0;private admissions=0;
 constructor(private load:(url:string,signal:AbortSignal)=>Promise<T>,private release:(value:T)=>void,readonly maximumBytes=48*1024*1024){}
 subscribe(owner:symbol,changed:()=>void){this.clients.set(owner,changed);}
 private bytes(){return [...this.entries.values()].reduce((sum,entry)=>sum+(entry.status==='failed'?0:entry.resource.rgbaBytes),0);}
 private drop(url:string){const entry=this.entries.get(url);if(!entry)return;this.entries.delete(url);entry.abort.abort();if(entry.value)this.release(entry.value);this.evictions++;}
 request(resource:ImageResource,owner:symbol){
  let entry=this.entries.get(resource.url);
  if(!entry){
   for(const candidate of [...this.entries.values()].filter(entry=>!entry.owners.size).sort((a,b)=>a.used-b.used)){
    if(this.bytes()+resource.rgbaBytes<=this.maximumBytes)break;this.drop(candidate.resource.url);
   }
   if(this.bytes()+resource.rgbaBytes>this.maximumBytes)return {value:null,status:'budget' as const};
   entry={resource,value:null,status:'loading',used:++this.clock,owners:new Set([owner]),abort:new AbortController()};this.entries.set(resource.url,entry);this.admissions++;this.peak=Math.max(this.peak,this.bytes());
   const captured=entry;
   void this.load(resource.url,captured.abort.signal).then(value=>{
    if(this.entries.get(resource.url)!==captured){this.release(value);return;}
    captured.value=value;captured.status='ready';for(const client of captured.owners)this.clients.get(client)?.();
   },()=>{if(this.entries.get(resource.url)!==captured)return;captured.status='failed';for(const client of captured.owners)this.clients.get(client)?.();});
  }
  entry.used=++this.clock;entry.owners.add(owner);return {value:entry.value,status:entry.status};
 }
 /** Adopt a matching decode already admitted by another draw/consumer. This
  * never starts a request or re-admits a failed frame, and the new owner must
  * still retain/release it through the ordinary lifecycle. */
 existing(url:string,owner:symbol,includeFailed=false){
  const entry=this.entries.get(url);if(!entry||entry.status==='failed'&&!includeFailed)return null;
  entry.used=++this.clock;entry.owners.add(owner);return {value:entry.value,status:entry.status,resource:entry.resource};
 }
 retain(owner:symbol,urls:ReadonlySet<string>){
  for(const [url,entry]of this.entries){if(!urls.has(url))entry.owners.delete(owner);if(!entry.owners.size&&entry.resource.level===2)this.drop(url);}
 }
 dispose(owner:symbol){this.clients.delete(owner);this.retain(owner,new Set());}
 retry(){for(const [url,entry]of this.entries)if(entry.status==='failed')this.drop(url);for(const changed of this.clients.values())changed();}
 stats(){return {reservedBytes:this.bytes(),readyBytes:[...this.entries.values()].filter(entry=>entry.status==='ready').reduce((sum,entry)=>sum+entry.resource.rgbaBytes,0),peakBytes:this.peak,entries:this.entries.size,admissions:this.admissions,evictions:this.evictions,maximumBytes:this.maximumBytes};}
}
