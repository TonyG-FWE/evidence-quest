import {useEffect,useId,useRef,useState,useLayoutEffect} from 'react';
import {assetUrl,illustration} from '../world/assets.js';
import {productionFrame} from '../world/production.js';
import {copy} from '../core/content.js';
import{useArtUrl}from'./useArtUrl.js';
export function Sprite({id,variant='base',alt='',className,onReady}:{id:string;variant?:string;alt?:string;className?:string;onReady?:(ready:boolean)=>void}){
 const cropId=useId(),[loadedUrl,setLoadedUrl]=useState(''),[failed,setFailed]=useState<string[]>([]),[density,setDensity]=useState(0),root=useRef<SVGSVGElement>(null);
 const base=productionFrame(id,variant),preferred=productionFrame(id,variant,density),original=illustration(id,variant);
 const candidates=[preferred,...(density===2?[base]:[])].flatMap(f=>f?[f,...(f.fallbackUrl?[{...f,url:f.fallbackUrl}]:[])]:[]);
 const frame=candidates.find(f=>!failed.includes(f.url)),art=frame?{...frame,frameWidth:frame.width,frameHeight:frame.height}:original;
 const exhausted=candidates.length>0&&!frame||!!art&&failed.includes(art.url);
 const image=useArtUrl(art?.url,!exhausted&&(!base||density>0));
 useEffect(()=>{if(image.failed)setFailed(list=>list.includes(image.source)?list:[...list,image.source]);},[image.failed,image.source]);
 useEffect(()=>onReady?.(!exhausted&&!!art&&loadedUrl===art.url),[exhausted,loadedUrl,art?.url,onReady]);
 useEffect(()=>{const retry=()=>setFailed([]);window.addEventListener('online',retry);return()=>window.removeEventListener('online',retry);},[]);
 useLayoutEffect(()=>{const el=root.current;if(!el||!base)return;const measure=()=>{const box=el.getBoundingClientRect(),w=base.contentRectPixels[2]-base.contentRectPixels[0],h=base.contentRectPixels[3]-base.contentRectPixels[1];setDensity(Math.min(box.width/w,box.height/h)*(devicePixelRatio||1)>1.05?2:1);};const resize=new ResizeObserver(measure);resize.observe(el);measure();return()=>resize.disconnect();},[id,variant,base]);
 if(!art)return <img src={assetUrl(id,variant)} alt={alt} className={className}/>;
 const [l,t,r,b]=art.contentRectPixels;
 return <svg ref={root} className={className} viewBox={`0 0 ${r!-l!} ${b!-t!}`} role={alt?'img':undefined} aria-label={alt?(exhausted?`${alt}. ${copy('CT.TECH.ART_ERROR')}`:alt):undefined} aria-hidden={!alt} preserveAspectRatio="xMidYMax meet" data-art-ready={!exhausted&&loadedUrl===art.url} data-art-state={exhausted?'failed':loadedUrl===art.url?'ready':'loading'} style={{opacity:exhausted||loadedUrl===art.url?1:0}}>
  <defs><clipPath id={cropId}><rect width={r!-l!} height={b!-t!}/></clipPath></defs>
  {exhausted?<g><rect width={r!-l!} height={b!-t!} fill="#eee6d7"/><path d={`M0 ${b!-t!}L${r!-l!} 0M0 0L${r!-l!} ${b!-t!}`} stroke="#807a70" strokeWidth="2" vectorEffect="non-scaling-stroke"/></g>:image.href&&<g clipPath={`url(#${cropId})`}><image href={image.href} data-art-url={art.url} x={-l!} y={-t!} width={art.frameWidth} height={art.frameHeight} onLoad={()=>setLoadedUrl(art.url)} onError={()=>setFailed(list=>list.includes(art.url)?list:[...list,art.url])}/></g>}
 </svg>;
}
