export interface TransferResource{url:string;bytes:number;}
interface Entry<T>{resource:TransferResource;promise:Promise<T>;value:T|null;status:'loading'|'ready'|'failed';owners:Set<symbol>;used:number;abort:AbortController;}
/** Share immutable encoded bytes across native and Canvas consumers. */
export class TransferPool<T>{
 private entries=new Map<string,Entry<T>>();private clock=0;private peak=0;
 constructor(private load:(resource:TransferResource,signal:AbortSignal)=>Promise<T>,private release:(value:T)=>void,readonly maximumBytes=8*1024*1024){}
 private bytes(){return [...this.entries.values()].reduce((sum,e)=>sum+(e.status==='failed'?0:e.resource.bytes),0);}
 private drop(url:string){const e=this.entries.get(url);if(!e)return;this.entries.delete(url);e.abort.abort();if(e.value!==null)this.release(e.value);}
 acquire(resource:TransferResource,owner:symbol):Promise<T|null>{
  let entry=this.entries.get(resource.url);
  if(!entry){
   if(!Number.isSafeInteger(resource.bytes)||resource.bytes<=0)return Promise.resolve(null);
   for(const old of [...this.entries.values()].filter(e=>!e.owners.size).sort((a,b)=>a.used-b.used)){if(this.bytes()+resource.bytes<=this.maximumBytes)break;this.drop(old.resource.url);}
   if(this.bytes()+resource.bytes>this.maximumBytes)return Promise.resolve(null);
   entry={resource,promise:null as unknown as Promise<T>,value:null,status:'loading',owners:new Set(),used:++this.clock,abort:new AbortController()};this.entries.set(resource.url,entry);this.peak=Math.max(this.peak,this.bytes());
   const captured=entry;entry.promise=this.load(resource,captured.abort.signal).then(value=>{if(this.entries.get(resource.url)!==captured){this.release(value);throw new Error('Retired art response');}captured.value=value;captured.status='ready';return value;},error=>{if(this.entries.get(resource.url)===captured)captured.status='failed';throw error;});
  }
  entry.owners.add(owner);entry.used=++this.clock;return entry.promise;
 }
 dispose(owner:symbol){for(const [url,e]of this.entries){e.owners.delete(owner);if(!e.owners.size&&e.status==='loading')this.drop(url);}}
 retry(){for(const [url,e]of this.entries)if(e.status==='failed')this.drop(url);}
 stats(){return{reservedBytes:this.bytes(),peakBytes:this.peak,maximumBytes:this.maximumBytes,entries:this.entries.size};}
}
