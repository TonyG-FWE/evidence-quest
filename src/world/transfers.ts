import{production}from'./production.js';import{TransferPool}from'./transfer-pool.js';
const sizes=new Map<string,number>();
for(const row of Object.values(production))for(const level of Object.values(row.levels))for(const frame of level.frames){sizes.set(frame.url,frame.bytes);if(frame.fallbackUrl&&frame.fallbackBytes)sizes.set(frame.fallbackUrl,frame.fallbackBytes);}
const responses=new TransferPool<string>(async(resource,signal)=>{
 const response=await fetch(resource.url,{signal,credentials:'same-origin'});if(!response.ok)throw Error('Art response unavailable');
 const blob=await response.blob();if(blob.size!==resource.bytes)throw Error('Art response length differs from the pinned export');return URL.createObjectURL(blob);
},url=>URL.revokeObjectURL(url));
function publish(){const stats=responses.stats();for(const [key,value]of Object.entries({encodedArtBytes:stats.reservedBytes,encodedArtPeak:stats.peakBytes})){const text=String(value);if(document.documentElement.dataset[key]!==text)document.documentElement.dataset[key]=text;}}
export async function acquireArtUrl(url:string,owner:symbol){const bytes=sizes.get(url);if(!bytes)return url;const promise=responses.acquire({url,bytes},owner);publish();try{return(await promise)??url;}finally{publish();}}
export const releaseArtUrl=(owner:symbol)=>{responses.dispose(owner);publish();};
export const retryArtTransfers=()=>{responses.retry();publish();};
export const artTransferStats=()=>responses.stats();
