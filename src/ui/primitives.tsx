import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { copy } from '../core/content.js';
import './tokens.css';

export const iconPaths={
  BACK:'M20 12H4m7-7-7 7 7 7',CLOSE:'m6 6 12 12M18 6 6 18',PLAY:'M7 4 20 12 7 20Z',STOP:'M5 5h14v14H5Z',PAUSE:'M8 5v14M16 5v14',
  NOTES:'M5 3h10l4 5v13H5ZM15 3v6h4',MAP:'m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3ZM9 3v15m6-12v15',HELP:'M8 7a4 4 0 1 1 6 3.5c-2 1-2 2-2 3.5m0 4v1',
  SETTINGS:'M3 6h18M3 12h18M3 18h18M8 3v6m8 0v6m-5 0v6',ZOOM:'M16 16 22 22M9 5v8M5 9h8M17 9a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  CHECK:'m4 12 5 5L20 6',STATUS:'M12 7v6m0 3v1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',DRAG:'M8 5h.1M16 5h.1M8 12h.1M16 12h.1M8 19h.1M16 19h.1',
} as const;
export const effects={shadow:{alpha:.24,width:.9,height:.18,offset:[.3,.4]},foreground:{clipHeight:2},focus:{width:3,color:'#224FC4',routeWidth:2},storyLight:{alpha:.24,durationMs:600}} as const;
export function Icon({name}:{name:keyof typeof iconPaths}){return <svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><path d={iconPaths[name]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/></svg>;}
export function Button({ct,slots,icon,children,...props}:ButtonHTMLAttributes<HTMLButtonElement>&{ct?:string;slots?:Record<string,string|number>;icon?:keyof typeof iconPaths;children?:ReactNode}){return <button type="button" {...props}>{icon&&<Icon name={icon}/>}<span>{ct?copy(ct,slots):children}</span></button>;}
export function Paper({children,label}:{children:ReactNode;label?:string}){return <section className="paper" aria-label={label}>{children}</section>;}
