import {useId,useState} from 'react';
import {Sprite} from './Sprite.js';

// E2 is a frozen photograph of the earlier curled carrier. Live E3 state is
// deliberately not an input; only CANCELED belongs on this pictured strip.
export function NoticePhoto(){
 const grain=useId(),[ready,setReady]=useState(false);return <svg className="source-image photo" viewBox="0 0 200 200" aria-hidden="true" data-photo-state="curled" data-photo-ready={ready}>
  <defs><linearGradient id={grain} x2=".7" y2="1"><stop stopColor="#d4a268"/><stop offset=".55" stopColor="#aa7847"/><stop offset="1" stopColor="#d2a474"/></linearGradient></defs>
  <g opacity={ready?1:0}><rect width="200" height="200" fill={`url(#${grain})`}/><path d="M0 37H200M0 99H200M0 162H200M46 0V37M145 37V99M76 99V162" stroke="#765433" strokeWidth="1" opacity=".55"/></g>
  <svg x="16" y="50" width="168" height="100"><Sprite id="ASSET.PROP.NOTICE" variant="curled" onReady={setReady}/></svg>
  <text opacity={ready?1:0} x="100" y="110" textAnchor="middle" fill="#4b3630" fontSize="17" fontWeight="700" fontFamily="system-ui, sans-serif">CANCELED</text>
 </svg>;
}
