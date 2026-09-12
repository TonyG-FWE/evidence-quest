import {useEffect,useRef} from 'react';
import type {State} from '../core/state.js';
import {Assets} from '../world/assets.js';
import {paintStory} from '../world/paint.js';
import {initialPuppet,storyDescription} from '../story/engine.js';
import {copy} from '../core/content.js';
export function StoryCanvas({s}:{s:State}){
 const canvas=useRef<HTMLCanvasElement>(null),latest=useRef(s);latest.current=s;
 const paint=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const el=canvas.current;let ctx:CanvasRenderingContext2D|null;try{ctx=el?.getContext('2d')??null;}catch{ctx=null;}if(!el||!ctx)return;
  const draw=()=>{const state=latest.current,box=el.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),width=Math.ceil(box.width*dpr),height=Math.ceil(box.height*dpr);if(el.width!==width)el.width=width;if(el.height!==height)el.height=height;ctx!.setTransform(el.width/100,0,0,el.height/100,0,0);const r=state.case.playback;paintStory(ctx!,assets,r?.puppet??initialPuppet(),[0,0,100,100],r?.activeCue&&state.preferences.motion!=='reduced'?{cue:r.activeCue,elapsed:state.runtime.cueElapsedMs}:undefined);};
  paint.current=draw;const assets=new Assets(draw,()=>{}),resize=new ResizeObserver(draw);resize.observe(el);draw();return()=>resize.disconnect();
 },[]);
 useEffect(()=>paint.current(),[s]);
 return <canvas ref={canvas} className="whole-story" role="img" aria-label={storyDescription(s.case.playback?.puppet??initialPuppet()).map(id=>copy(id)).join(' ')} data-testid="whole-story"/>;
}
