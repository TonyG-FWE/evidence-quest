import{useEffect,useState}from'react';import{acquireArtUrl,releaseArtUrl,retryArtTransfers}from'../world/transfers.js';
export function useArtUrl(source:string|undefined,enabled=true){
 const [attempt,setAttempt]=useState(0),[loaded,setLoaded]=useState({source:'',href:'',failed:false});
 useEffect(()=>{const retry=()=>{retryArtTransfers();setAttempt(n=>n+1);};window.addEventListener('online',retry);return()=>window.removeEventListener('online',retry);},[]);
 useEffect(()=>{if(!source||!enabled)return;const owner=Symbol('native-art');let active=true;setLoaded({source,href:'',failed:false});void acquireArtUrl(source,owner).then(href=>{if(active)setLoaded({source,href,failed:false});},()=>{if(active)setLoaded({source,href:'',failed:true});});return()=>{active=false;releaseArtUrl(owner);};},[source,enabled,attempt]);
 return enabled&&loaded.source===source?loaded:{source:source??'',href:'',failed:false};
}
