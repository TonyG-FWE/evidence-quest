/** Bound resource work; closing an owner rejects queued work before it starts. */
export class AssetWorkQueue {
 private active=0;
 private closed=false;
 private waiting:{resolve:(release:()=>void)=>void;reject:(error:Error)=>void}[]=[];
 constructor(private readonly limit:number){if(!Number.isInteger(limit)||limit<1)throw Error('Invalid asset concurrency');}
 acquire(waitMs=0):Promise<()=>void>{
  if(!Number.isFinite(waitMs)||waitMs<0)return Promise.reject(Error('Invalid asset queue deadline'));
  if(this.closed)return Promise.reject(Error('Asset owner closed'));
  return new Promise((resolve,reject)=>{
   let timer:ReturnType<typeof setTimeout>|undefined;
   const waiter={resolve:(release:()=>void)=>{clearTimeout(timer);resolve(release);},reject:(error:Error)=>{clearTimeout(timer);reject(error);}};
   if(waitMs)timer=setTimeout(()=>{
    const index=this.waiting.indexOf(waiter);if(index<0)return;
    this.waiting.splice(index,1);waiter.reject(Error('Artwork waited too long for a loading slot. Restore the view to retry.'));
   },waitMs);
   this.waiting.push(waiter);this.drain();
  });
 }
 private drain(){while(!this.closed&&this.active<this.limit&&this.waiting.length){
  const next=this.waiting.shift()!;this.active++;let released=false;
  next.resolve(()=>{if(released)return;released=true;this.active--;this.drain();});
 }}
 close(){this.closed=true;for(const waiter of this.waiting)waiter.reject(Error('Asset owner closed'));this.waiting=[];}
 get pending(){return this.waiting.length;}
}
