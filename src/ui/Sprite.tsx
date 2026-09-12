import {useId,useState} from 'react';
import {assetUrl,illustration} from '../world/assets.js';
export function Sprite({id,variant='base',alt='',className}:{id:string;variant?:string;alt?:string;className?:string}){
 const cropId=useId(),[loadedUrl,setLoadedUrl]=useState('');
 const art=illustration(id,variant);if(!art)return <img src={assetUrl(id,variant)} alt={alt} className={className}/>;
 const [l,t,r,b]=art.contentRectPixels;
 return <svg className={className} viewBox={`0 0 ${r!-l!} ${b!-t!}`} role={alt?'img':undefined} aria-label={alt||undefined} aria-hidden={!alt} preserveAspectRatio="xMidYMax meet" style={{opacity:loadedUrl===art.url?1:0}}><defs><clipPath id={cropId}><rect width={r!-l!} height={b!-t!}/></clipPath></defs><g clipPath={`url(#${cropId})`}><image href={art.url} x={-l!} y={-t!} width={art.frameWidth} height={art.frameHeight} onLoad={()=>setLoadedUrl(art.url)}/></g></svg>;
}
