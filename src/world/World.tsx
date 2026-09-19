import {roles} from '../core/experience.js';
import {useEffect,useLayoutEffect,useRef} from 'react';
import type {Point} from '../../contracts/types.js';
import {content,copy,parts} from '../core/content.js';
import {exposed,available} from '../core/evidence.js';
import type {State} from '../core/state.js';
import type {Store} from '../core/store.js';
import {ownerRoom,approaches,distance} from '../physical/navigation.js';
import {Button} from '../ui/primitives.js';
import {Assets,artCacheStats} from './assets.js';
import {paintWorld,paintProjection,projectionFrameKey} from './paint.js';
import {roomName,localOwners,ownerLabel} from '../ui/labels.js';
import {actorHome,carryGeometry,consoleLift,mountedBounds} from '../physical/presentation.js';
import {actorContentBounds} from './actor-geometry.js';
import {observeResize} from '../ui/resize.js';
export function World({state,store}:{state:State;store:Store}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const dock=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const el=dock.current;if(!el)return;
  const measure=()=>{const style=document.documentElement.style,height=`${el.getBoundingClientRect().height}px`;if(style.getPropertyValue('--compact-dock-height')!==height)style.setProperty('--compact-dock-height',height);};
  const observer=observeResize([el],measure);measure();return()=>observer.disconnect();
 },[]);
 const paint=useRef<()=>void>(()=>{});
 const assetFrame=useRef<number|null>(null);
 const assets=useRef<Assets|null>(null);
 if(!assets.current)assets.current=new Assets(()=>{if(assetFrame.current===null)assetFrame.current=requestAnimationFrame(()=>{assetFrame.current=null;paint.current();});},()=>store.send({type:'ART_FAILED'}));
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  let ctx:CanvasRenderingContext2D|null;try{ctx=el.getContext('2d',{alpha:false});}catch{ctx=null;}
  if(!ctx){store.send({type:'CANVAS_FAILED'});return;}
  let previousKey:string|null=null,previousGeneration=-1,fullFrames=0,projectionFrames=0;
  paint.current=()=>{const box=el.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),width=Math.ceil(box.width*dpr),height=Math.ceil(box.height*dpr),resized=el.width!==width||el.height!==height;if(el.width!==width)el.width=width;if(el.height!==height)el.height=height;ctx!.setTransform(el.width/120,0,0,el.height/80,0,0);const current=store.getSnapshot(),key=projectionFrameKey(current),partial=key!==null&&key===previousKey&&!resized&&previousGeneration===assets.current!.generation;assets.current!.begin(partial);if(partial){paintProjection(ctx!,current,assets.current!);projectionFrames++;}else{paintWorld(ctx!,current,assets.current!);fullFrames++;}previousKey=key;previousGeneration=assets.current!.generation;Object.assign(el,{artFrameStats:{full:fullFrames,projection:projectionFrames}});
   const s=store.getSnapshot(),p=s.case.physical;if(!document.hidden&&!s.runtime.artFailure&&box.bottom>0&&box.top<innerHeight&&p.room==='SC.MD'&&p.loop.mode==='standby'&&available(s.case,'E5.c/seen')&&!exposed(s.case,'E5.c/seen')&&assets.current!.image('ASSET.ACT.LOOP','standby',dpr>=1.5?2:1)){
    const part=parts.get('E5.c/seen')!;store.send({type:'EXPOSE',exposure:{refId:part.refId,ctId:part.ctId,spans:part.spans,visualComplete:true,viaAccessId:'SC.MD'}});
   }assets.current!.end();const cache=artCacheStats();for(const [key,value]of Object.entries({artBytes:cache.reservedBytes,artPeakBytes:cache.peakBytes,artEvictions:cache.evictions,rasterBytes:cache.raster.reservedBytes,rasterPeakBytes:cache.raster.peakBytes})){const text=String(value);if(el.dataset[key]!==text)el.dataset[key]=text;}
  };
  const resize=observeResize([el],()=>paint.current());paint.current();return ()=>{resize.disconnect();if(assetFrame.current!==null)cancelAnimationFrame(assetFrame.current);assetFrame.current=null;assets.current?.dispose();};
 },[store]);
 // Canvas is an imperative visual consumer of this committed React state.
 // Draw before the browser paints, rather than one passive-effect phase later.
 useLayoutEffect(()=>paint.current(),[state]);
 const keys=useRef(new Set<'up'|'down'|'left'|'right'>());
 useEffect(()=>{
  const clear=()=>keys.current.clear(),hidden=()=>{if(document.hidden)clear();};
  window.addEventListener('blur',clear);document.addEventListener('visibilitychange',hidden);
  return()=>{window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',hidden);};
 },[]);
 const key=(k:string)=>({ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'} as const)[k as 'ArrowUp'];
 const nearby=localOwners(state.case).filter(o=>approaches(state.case,o.id).some(p=>distance(p,state.case.physical.avatar)<=3));
 const interact=()=>{if(nearby.length===1)store.send({type:'TARGET',target:nearby[0]!.id});else if(nearby.length>1)store.send({type:'VIEW',view:{page:'objects',selected:nearby.map(o=>o.id)}});};
 return <div ref={dock} className="world-dock"><div className="world-frame" data-world>
  <canvas ref={canvas} role="application" tabIndex={0} data-testid="world" aria-label={`${roomName(state.case.physical.room)}. ${ownerLabel(state.case,'ACT.PLAYER')}`} aria-describedby="movement-help"
   onFocus={()=>store.send({type:'FOCUS',owner:'world'})} onBlur={()=>{keys.current.clear();store.send({type:'KEYS',keys:[]});store.send({type:'FOCUS',owner:'task'});}}
   onKeyDown={e=>{const direction=key(e.key);if(direction){e.preventDefault();keys.current.add(direction);store.send({type:'KEYS',keys:[...keys.current]});}else if(['e','E',' ','Enter'].includes(e.key)&&!e.repeat){e.preventDefault();interact();}}}
   onKeyUp={e=>{const direction=key(e.key);if(direction){e.preventDefault();keys.current.delete(direction);store.send({type:'KEYS',keys:[...keys.current]});}}}
   onPointerDown={e=>{
    if(!['world','work'].includes(state.runtime.view.page))return;e.currentTarget.focus();const box=e.currentTarget.getBoundingClientRect();const point:Point=[(e.clientX-box.left)/box.width*120,(e.clientY-box.top)/box.height*80];
    const allowed=localOwners(state.case).map(o=>o.id);const hits=content.objects.filter(o=>{
     if(!allowed.includes(o.id)||ownerRoom(state.case,o.id)!==state.case.physical.room)return false;
     let hit=mountedBounds(o.id,o.hit);const p=state.case.physical;
     if(['ACT.JO','ACT.REMY','ACT.ARI'].includes(o.id))hit=actorContentBounds(o.id,actorHome(o.id),state.runtime.view.actor===o.id?'talk':'home');
     if(o.id==='ACT.LOOP')hit=actorContentBounds(o.id,p.loop.feet,p.loop.mode==='following'?`rolling-${state.runtime.loopFacing==='up'?'back':state.runtime.loopFacing==='down'?'front':state.runtime.loopFacing??'front'}`:p.loop.mode);
     if(o.id==='KIT.CADDY')hit=p.caddyHost==='ACT.PLAYER'?carryGeometry(p.avatar,p.facing).rect:p.caddyHost==='ST.RACK.BAY'?[50,66-consoleLift(),62,75-consoleLift()]:hit;
     const dx=Math.max(0,(48/box.width*120-(hit[2]-hit[0]))/2),dy=Math.max(0,(48/box.height*80-(hit[3]-hit[1]))/2);
     return point[0]>=hit[0]-dx&&point[0]<=hit[2]+dx&&point[1]>=hit[1]-dy&&point[1]<=hit[3]+dy;
    });
    const children=hits.filter(h=>!hits.some(other=>other.parentId===h.id));
    if(children.length>1)store.send({type:'VIEW',view:{page:'objects',selected:children.map(h=>h.id)}});else if(children[0])store.send({type:'TARGET',target:children[0].id});else store.send({type:'WALK',point});
   }}/>
  {state.case.physical.room==='SC.ST'&&<svg className="world-program" viewBox="0 0 300 100" role="img" aria-label={`${copy('CT.ER13.SIGN')}. ${copy('CT.ER13.PROGRAM')}`}>
   <rect width="300" height="100" rx="4" fill="#fff3d8" fillOpacity=".94"/>
   <g textAnchor="middle" fill="#4b3630" fontFamily="system-ui,sans-serif">
    <text x="150" y="34" fontSize="28" fontWeight="700">{copy('CT.ER13.SIGN').split(' — ')[0]}</text>
    <text x="150" y="60" fontSize="16">{copy('CT.ER13.PROGRAM').split(': ')[0]}:</text>
    <text x="150" y="86" fontSize="21" fontWeight="600">{copy('CT.ER13.PROGRAM').split(': ')[1]}</text>
   </g>
  </svg>}
  {state.runtime.view.page==='intro'&&state.runtime.view.frame===1&&<div className="world-model-emphasis"/>}
  {state.case.physical.room==='SC.CY'&&<svg className="world-notice-text" viewBox="0 0 120 80" aria-hidden="true">
   {state.case.physical.objects.noticeFlat?<text x="94" y="21" textAnchor="middle" fill="#4b3630" fontSize="1.15" fontFamily="system-ui,sans-serif">
    {copy('CT.SRC.E3').split('\n').flatMap(line=>{const words=line.split(' '),lines:string[]=[];let text='';for(const word of words){if(text&&text.length+word.length>23){lines.push(text);text='';}text+=(text?' ':'')+word;}if(text)lines.push(text);return lines;}).map((line,index)=><tspan key={index} x="94" dy={index?1.6:0} fontWeight={index===0?700:400}>{line}</tspan>)}
   </text>:<text x="94" y="27.2" textAnchor="middle" fill="#4b3630" fontSize="1.9" fontWeight="700" fontFamily="system-ui,sans-serif">CANCELED</text>}
  </svg>}
  {state.runtime.canvasFailure?<p className="render-error">{copy('CT.TECH.CANVAS_ERROR')}</p>:state.runtime.artFailure?<div className="render-error"><p>{copy('CT.TECH.ART_ERROR')}</p><Button ct="CT.RECOVERY.RETRY" onClick={()=>{store.send({type:'ART_RETRY'});assets.current?.retry();}}/></div>:null}
 </div><div className="world-identities">
  {content.actors.filter(a=>a.id!=='ACT.PLAYER'&&a.id!=='ACT.LOOP'&&a.room===state.case.physical.room).map(a=><span key={a.id}><strong>{ownerLabel(state.case,a.id)}</strong> · {roles[a.id]}</span>)}
  {state.case.physical.loop.room===state.case.physical.room&&state.case.encounteredActors.includes('ACT.LOOP')&&<span><strong>Loop</strong> · rolling projector</span>}
 </div><div className="world-controls">
  {content.doors.filter(d=>d.room===state.case.physical.room).map(d=>{const side=d.id==='WK.EXIT.MD'?'north':d.id==='MD.EXIT.WK'?'south':d.threshold[0]<60?'left':'right';return <button key={d.id} type="button" className={`door-label ${side}`} aria-label={copy('CT.WORLD.GO',{room:roomName(d.destinationRoom)})} onClick={()=>store.send({type:'TARGET',target:d.id})}>{side==='left'?'←':side==='right'?'→':side==='north'?'↑':'↓'} {roomName(d.destinationRoom)}</button>;})}
  {state.runtime.view.page==='world'&&!state.runtime.intent&&nearby.some(o=>o.kind!=='door')&&<div className="nearby"><Button data-focus-owner={nearby.length===1?nearby[0]!.id:undefined} onClick={interact}>{nearby.length===1?ownerLabel(state.case,nearby[0]!.id):`Use something nearby: ${nearby.slice(0,2).map(o=>ownerLabel(state.case,o.id)).join(' or ')}`}</Button></div>}
 </div></div>;
}
