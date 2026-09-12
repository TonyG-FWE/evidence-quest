import {useEffect,useRef} from 'react';
import type {Point} from '../../contracts/types.js';
import {content,copy} from '../core/content.js';
import type {State} from '../core/state.js';
import type {Store} from '../core/store.js';
import {ownerRoom,approaches,distance} from '../physical/navigation.js';
import {Button} from '../ui/primitives.js';
import {Assets} from './assets.js';
import {paintWorld} from './paint.js';
import {roomName,localOwners,ownerLabel} from '../ui/labels.js';
export function World({state,store}:{state:State;store:Store}){
 const canvas=useRef<HTMLCanvasElement>(null),latest=useRef(state);latest.current=state;
 const paint=useRef<()=>void>(()=>{});
 const assets=useRef<Assets|null>(null);
 if(!assets.current)assets.current=new Assets(()=>paint.current(),()=>store.send({type:'ART_FAILED'}));
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  let ctx:CanvasRenderingContext2D|null;try{ctx=el.getContext('2d');}catch{ctx=null;}
  if(!ctx){store.send({type:'CANVAS_FAILED'});return;}
  paint.current=()=>{const box=el.getBoundingClientRect(),dpr=window.devicePixelRatio||1;el.width=Math.round(box.width*dpr);el.height=Math.round(box.height*dpr);ctx!.setTransform(el.width/120,0,0,el.height/80,0,0);paintWorld(ctx!,latest.current,assets.current!);};
  const resize=new ResizeObserver(()=>paint.current());resize.observe(el);paint.current();return ()=>resize.disconnect();
 },[store]);
 useEffect(()=>paint.current(),[state]);
 const keys=useRef(new Set<'up'|'down'|'left'|'right'>());
 const key=(k:string)=>({ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'} as const)[k as 'ArrowUp'];
 const nearby=localOwners(state.case).filter(o=>approaches(state.case,o.id).some(p=>distance(p,state.case.physical.avatar)<=3));
 const interact=()=>{if(nearby.length===1)store.send({type:'TARGET',target:nearby[0]!.id});else if(nearby.length>1)store.send({type:'VIEW',view:{page:'objects',selected:nearby.map(o=>o.id)}});};
 return <div className="world-frame" data-world>
  <canvas ref={canvas} role="application" tabIndex={0} data-testid="world" aria-label={`${roomName(state.case.physical.room)}. ${ownerLabel(state.case,'ACT.PLAYER')}`} aria-describedby="movement-help"
   onFocus={()=>store.send({type:'FOCUS',owner:'world'})} onBlur={()=>{keys.current.clear();store.send({type:'KEYS',keys:[]});store.send({type:'FOCUS',owner:'task'});}}
   onKeyDown={e=>{const direction=key(e.key);if(direction){e.preventDefault();keys.current.add(direction);store.send({type:'KEYS',keys:[...keys.current]});}else if(['e','E',' ','Enter'].includes(e.key)&&!e.repeat){e.preventDefault();interact();}}}
   onKeyUp={e=>{const direction=key(e.key);if(direction){e.preventDefault();keys.current.delete(direction);store.send({type:'KEYS',keys:[...keys.current]});}}}
   onPointerDown={e=>{
    if(!['world','work'].includes(state.runtime.view.page))return;e.currentTarget.focus();const box=e.currentTarget.getBoundingClientRect();const point:Point=[(e.clientX-box.left)/box.width*120,(e.clientY-box.top)/box.height*80];
    const allowed=localOwners(state.case).map(o=>o.id);const hits=content.objects.filter(o=>allowed.includes(o.id)&&ownerRoom(state.case,o.id)===state.case.physical.room&&point[0]>=o.hit[0]&&point[0]<=o.hit[2]&&point[1]>=o.hit[1]&&point[1]<=o.hit[3]);
    const children=hits.filter(h=>!hits.some(other=>other.parentId===h.id));
    if(children.length>1)store.send({type:'VIEW',view:{page:'objects',selected:children.map(h=>h.id)}});else if(children[0])store.send({type:'TARGET',target:children[0].id});else store.send({type:'WALK',point});
   }}/>
  {content.doors.filter(d=>d.room===state.case.physical.room).map(d=>{const side=d.id==='WK.EXIT.MD'?'north':d.id==='MD.EXIT.WK'?'south':d.threshold[0]<60?'left':'right';return <button key={d.id} type="button" className={`door-label ${side}`} aria-label={copy('CT.WORLD.GO',{room:roomName(d.destinationRoom)})} onClick={()=>store.send({type:'TARGET',target:d.id})}>{side==='left'?'←':side==='right'?'→':side==='north'?'↑':'↓'} {roomName(d.destinationRoom)}</button>;})}
  {state.case.physical.room==='SC.CY'&&<span className="notice-word" aria-hidden="true">CANCELED</span>}
  {state.runtime.canvasFailure?<p className="render-error">{copy('CT.TECH.CANVAS_ERROR')}</p>:state.runtime.artFailure?<p className="render-error">{copy('CT.TECH.ART_ERROR')}</p>:null}
  {state.runtime.view.page==='world'&&nearby.length>0&&<div className="nearby"><Button onClick={interact}>{nearby.length===1?ownerLabel(state.case,nearby[0]!.id):copy('CT.WORLD.CHOOSE')}</Button></div>}
 </div>;
}
