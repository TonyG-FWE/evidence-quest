import {roles} from '../core/experience.js';
import {useEffect,useRef} from 'react';
import type {Point} from '../../contracts/types.js';
import {content,copy,parts} from '../core/content.js';
import {exposed,available} from '../core/evidence.js';
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
  paint.current=()=>{const box=el.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),width=Math.ceil(box.width*dpr),height=Math.ceil(box.height*dpr);if(el.width!==width)el.width=width;if(el.height!==height)el.height=height;ctx!.setTransform(el.width/120,0,0,el.height/80,0,0);paintWorld(ctx!,latest.current,assets.current!);
   const s=store.getSnapshot(),p=s.case.physical;if(!document.hidden&&!s.runtime.artFailure&&box.bottom>0&&box.top<innerHeight&&p.room==='SC.MD'&&p.loop.mode==='standby'&&available(s.case,'E5.c/seen')&&!exposed(s.case,'E5.c/seen')&&assets.current!.image('ASSET.ACT.LOOP','standby',dpr>=1.5?2:1)){
    const part=parts.get('E5.c/seen')!;store.send({type:'EXPOSE',exposure:{refId:part.refId,ctId:part.ctId,spans:part.spans,visualComplete:true,viaAccessId:'SC.MD'}});
   }
  };
  const resize=new ResizeObserver(()=>paint.current());resize.observe(el);paint.current();return ()=>resize.disconnect();
 },[store]);
 useEffect(()=>paint.current(),[state]);
 const keys=useRef(new Set<'up'|'down'|'left'|'right'>());
 const key=(k:string)=>({ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'} as const)[k as 'ArrowUp'];
 const nearby=localOwners(state.case).filter(o=>approaches(state.case,o.id).some(p=>distance(p,state.case.physical.avatar)<=3));
 const interact=()=>{if(nearby.length===1)store.send({type:'TARGET',target:nearby[0]!.id});else if(nearby.length>1)store.send({type:'VIEW',view:{page:'objects',selected:nearby.map(o=>o.id)}});};
 return <div className="world-dock"><div className="world-frame" data-world>
  <canvas ref={canvas} role="application" tabIndex={0} data-testid="world" aria-label={`${roomName(state.case.physical.room)}. ${ownerLabel(state.case,'ACT.PLAYER')}`} aria-describedby="movement-help"
   onFocus={()=>store.send({type:'FOCUS',owner:'world'})} onBlur={()=>{keys.current.clear();store.send({type:'KEYS',keys:[]});store.send({type:'FOCUS',owner:'task'});}}
   onKeyDown={e=>{const direction=key(e.key);if(direction){e.preventDefault();keys.current.add(direction);store.send({type:'KEYS',keys:[...keys.current]});}else if(['e','E',' ','Enter'].includes(e.key)&&!e.repeat){e.preventDefault();interact();}}}
   onKeyUp={e=>{const direction=key(e.key);if(direction){e.preventDefault();keys.current.delete(direction);store.send({type:'KEYS',keys:[...keys.current]});}}}
   onPointerDown={e=>{
    if(!['world','work'].includes(state.runtime.view.page))return;e.currentTarget.focus();const box=e.currentTarget.getBoundingClientRect();const point:Point=[(e.clientX-box.left)/box.width*120,(e.clientY-box.top)/box.height*80];
    const allowed=localOwners(state.case).map(o=>o.id);const hits=content.objects.filter(o=>{
     if(!allowed.includes(o.id)||ownerRoom(state.case,o.id)!==state.case.physical.room)return false;
     let hit=o.hit;const p=state.case.physical;
     if(o.id==='ACT.LOOP'){const actor=content.actors.find(a=>a.id===o.id)!,dx=p.loop.feet[0]-actor.feet[0],dy=p.loop.feet[1]-actor.feet[1];hit=[hit[0]+dx,hit[1]+dy,hit[2]+dx,hit[3]+dy];}
     if(o.id==='KIT.CADDY')hit=p.caddyHost==='ACT.PLAYER'?[p.avatar[0]-6,p.avatar[1]-7.58,p.avatar[0]+6,p.avatar[1]-.58]:p.caddyHost==='ST.RACK.BAY'?[50,66,62,75]:hit;
     const dx=Math.max(0,(48/box.width*120-(hit[2]-hit[0]))/2),dy=Math.max(0,(48/box.height*80-(hit[3]-hit[1]))/2);
     return point[0]>=hit[0]-dx&&point[0]<=hit[2]+dx&&point[1]>=hit[1]-dy&&point[1]<=hit[3]+dy;
    });
    const children=hits.filter(h=>!hits.some(other=>other.parentId===h.id));
    if(children.length>1)store.send({type:'VIEW',view:{page:'objects',selected:children.map(h=>h.id)}});else if(children[0])store.send({type:'TARGET',target:children[0].id});else store.send({type:'WALK',point});
   }}/>
  {content.doors.filter(d=>d.room===state.case.physical.room).map(d=>{const side=d.id==='WK.EXIT.MD'?'north':d.id==='MD.EXIT.WK'?'south':d.threshold[0]<60?'left':'right';return <button key={d.id} type="button" className={`door-label ${side}`} aria-label={copy('CT.WORLD.GO',{room:roomName(d.destinationRoom)})} onClick={()=>store.send({type:'TARGET',target:d.id})}>{side==='left'?'←':side==='right'?'→':side==='north'?'↑':'↓'} {roomName(d.destinationRoom)}</button>;})}
  {state.case.physical.room==='SC.ST'&&<div className="world-program">{copy('CT.ER13.SIGN')}<small>{copy('CT.ER13.PROGRAM')}</small></div>}
  {content.actors.filter(a=>a.id!=='ACT.PLAYER'&&a.id!=='ACT.LOOP'&&a.room===state.case.physical.room).map(a=><div key={a.id} className="world-cast-label" style={{left:(a.feet[0]/120*100-4)+'%',top:(a.feet[1]/80*100+2)+'%'}}>{ownerLabel(state.case,a.id)}<small>{roles[a.id]}</small></div>)}
  {state.case.physical.loop.room===state.case.physical.room&&state.case.encounteredActors.includes('ACT.LOOP')&&<div className="world-cast-label" style={{left:(state.case.physical.loop.feet[0]/120*100-4)+'%',top:(state.case.physical.loop.feet[1]/80*100+2)+'%'}}>Loop<small>rolling projector</small></div>}
  {state.runtime.view.page==='intro'&&state.runtime.view.frame===1&&<div className="world-model-emphasis"/>}
  {state.case.physical.room==='SC.CY'&&<span className="notice-word" aria-hidden="true">CANCELED</span>}
  {state.runtime.canvasFailure?<p className="render-error">{copy('CT.TECH.CANVAS_ERROR')}</p>:state.runtime.artFailure?<div className="render-error"><p>{copy('CT.TECH.ART_ERROR')}</p><Button ct="CT.RECOVERY.RETRY" onClick={()=>{store.send({type:'ART_RETRY'});assets.current?.retry();}}/></div>:null}
  {state.runtime.view.page==='world'&&!state.runtime.intent&&nearby.length>0&&<div className="nearby"><Button data-focus-owner={nearby.length===1?nearby[0]!.id:undefined} onClick={interact}>{nearby.length===1?ownerLabel(state.case,nearby[0]!.id):`Use something nearby: ${nearby.slice(0,2).map(o=>ownerLabel(state.case,o.id)).join(' or ')}`}</Button></div>}
 </div></div>;
}
