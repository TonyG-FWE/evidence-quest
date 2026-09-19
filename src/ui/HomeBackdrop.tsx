import{useEffect,useLayoutEffect,useRef,useState}from'react';import{productionFrame}from'../world/production.js';import{useArtUrl}from'./useArtUrl.js';
export function HomeBackdrop(){
 const root=useRef<HTMLImageElement>(null),[density,setDensity]=useState(0),[failed,setFailed]=useState<string[]>([]),[ready,setReady]=useState('');
 const base=productionFrame('ASSET.ENV.ST.BACKPLATE')!,preferred=productionFrame('ASSET.ENV.ST.BACKPLATE','base',density)!;
 const frame=[preferred,...(density===2?[base]:[])].flatMap(f=>[f,...(f.fallbackUrl?[{...f,url:f.fallbackUrl}]:[])]).find(f=>!failed.includes(f.url)),image=useArtUrl(frame?.url,density>0);
 useLayoutEffect(()=>{const el=root.current;if(!el)return;const measure=()=>{const box=el.getBoundingClientRect();setDensity(Math.max(box.width/base.width,box.height/base.height)*(devicePixelRatio||1)>1.05?2:1);};const observer=new ResizeObserver(measure);observer.observe(el);measure();return()=>observer.disconnect();},[base]);
 useEffect(()=>{if(image.failed)setFailed(list=>list.includes(image.source)?list:[...list,image.source]);},[image.failed,image.source]);
 useEffect(()=>{const retry=()=>setFailed([]);window.addEventListener('online',retry);return()=>window.removeEventListener('online',retry);},[]);
 return <img ref={root} className="home-backplate" src={image.href||undefined} alt="" aria-hidden="true" data-art-url={frame?.url} data-art-state={!frame?'failed':ready===image.href&&!!image.href?'ready':'loading'} data-density={density} onLoad={()=>setReady(image.href)} onError={()=>{if(frame)setFailed(list=>list.includes(frame.url)?list:[...list,frame.url]);}}/>;
}
