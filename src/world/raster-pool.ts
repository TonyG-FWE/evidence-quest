interface Entry<T>{signature:string;bytes:number;value:T;}
/** Exact-size surfaces are owned by a live renderer; no active surface is evicted. */
export class RasterPool<T>{
 private owners=new Map<symbol,Map<string,Entry<T>>>();private reserved=0;private peak=0;private hits=0;private admissions=0;
 constructor(private release:(value:T)=>void,readonly maximumBytes=24*1024*1024){}
 get(owner:symbol,key:string,signature:string,bytes:number,create:()=>T):T|null{
  const entries=this.owners.get(owner)??new Map<string,Entry<T>>();this.owners.set(owner,entries);
  const existing=entries.get(key);if(existing?.signature===signature){this.hits++;return existing.value;}
  this.drop(owner,key);
  if(!Number.isSafeInteger(bytes)||bytes<=0||this.reserved+bytes>this.maximumBytes)return null;
  this.reserved+=bytes;this.peak=Math.max(this.peak,this.reserved);
  try{const value=create();entries.set(key,{signature,bytes,value});this.admissions++;return value;}
  catch(error){this.reserved-=bytes;throw error;}
 }
 drop(owner:symbol,key:string){const entries=this.owners.get(owner),entry=entries?.get(key);if(!entry)return;entries!.delete(key);this.reserved-=entry.bytes;this.release(entry.value);}
 retain(owner:symbol,keys:ReadonlySet<string>){for(const key of this.owners.get(owner)?.keys()??[])if(!keys.has(key))this.drop(owner,key);}
 dispose(owner:symbol){this.retain(owner,new Set());this.owners.delete(owner);}
 stats(){return{reservedBytes:this.reserved,peakBytes:this.peak,maximumBytes:this.maximumBytes,entries:[...this.owners.values()].reduce((sum,entries)=>sum+entries.size,0),hits:this.hits,admissions:this.admissions};}
}
