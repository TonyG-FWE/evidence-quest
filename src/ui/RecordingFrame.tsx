import {useId} from 'react';
import {assetUrl,illustration} from '../world/assets.js';
import {Sprite} from './Sprite.js';

export function RecordingFrame({frame}:{frame:number}){
 const key=useId(),x=frame===1?31:59;
 if(!illustration('ASSET.ACT.LOOP','rolling-right'))return <img className="source-image" src={assetUrl('ASSET.SOURCE.E2.CLIP',`frame${frame}`)} alt=""/>;
 // Same 2:1 frame, door, cart and Loop coordinates as the original three stills.
 return <svg className="source-image" viewBox="0 0 200 100" aria-hidden="true" data-recording-frame={frame}>
  <defs>
   <linearGradient id={key+'wall'} x2=".7" y2="1"><stop stopColor="#fff0d3"/><stop offset="1" stopColor="#dfba8b"/></linearGradient>
   <linearGradient id={key+'wood'} x2="0" y2="1"><stop stopColor="#e9b46d"/><stop offset=".45" stopColor="#b67d42"/><stop offset=".6" stopColor="#d49a56"/><stop offset="1" stopColor="#895530"/></linearGradient>
   <linearGradient id={key+'door'} x2="1" y2="1"><stop stopColor="#c5c9b6"/><stop offset="1" stopColor="#8d9e91"/></linearGradient>
  </defs>
  <rect width="200" height="100" fill={`url(#${key}wall)`}/>
  <path d="M0 0H43L131 68H0Z" fill="#fff6dd" opacity=".22"/>
  <rect y="68" width="200" height="32" fill={`url(#${key}wood)`}/>
  <path d="M0 68H200M0 82H200M0 97H200M43 68V82M123 82V97" fill="none" stroke="#916035" strokeWidth=".5"/>
  <rect x="128" y="8" width="40" height="74" rx="1" fill={`url(#${key}wood)`} stroke="#694831" strokeWidth="1.2"/>
  <rect x="134" y="12" width="28" height="67" fill={`url(#${key}door)`}/>
  <path d="M134 12H162V79" fill="none" stroke="#fff0cf" strokeWidth=".7" opacity=".7"/>
  {frame!==3&&<>
   <ellipse cx={x*2+24} cy="85" rx="27" ry="2" fill="#664a32" opacity=".17"/>
   <rect x={x*2} y="68" width="48" height="9" rx="1.2" fill={`url(#${key}wood)`} stroke="#745031" strokeWidth=".8"/>
   {[4,36].map(dx=><g key={dx}><ellipse cx={x*2+dx+5} cy="80" rx="5" ry="4" fill="#243743"/><ellipse cx={x*2+dx+5} cy="80" rx="2" ry="1.7" fill="#b9c4c1"/></g>)}
   <svg x={(x+4)*2} y="34" width="36" height="35"><Sprite id="ASSET.ACT.LOOP" variant="rolling-right"/></svg>
  </>}
 </svg>;
}
