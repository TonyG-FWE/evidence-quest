import {useEffect,useRef} from 'react';
import type {State} from '../core/state.js';
import {Assets} from '../world/assets.js';
import {paintStory} from '../world/paint.js';
import {initialPuppet,storyDescription} from '../story/engine.js';
import {copy} from '../core/content.js';
export function StoryCanvas({s}:{s:State}){
 const canvas=useRef<HTMLCanvasElement>(null),latest=useRef(s);latest.current=s;
 useEffect(()=>{
  const el=canvas.current,ctx=el?.getContext('2d');if(!el||!ctx)return;
  const draw=()=>{const state=latest.current,box=el.getBoundingClientRect(),dpr=devicePixelRatio||1;el.width=box.width*dpr;el.height=box.height*dpr;ctx.setTransform(el.width/100,0,0,el.height/100,0,0);const r=state.case.playback;paintStory(ctx,assets,r?.puppet??initialPuppet(),[0,0,100,100],r?.activeCue&&state.preferences.motion!=='reduced'?{cue:r.activeCue,elapsed:state.runtime.cueElapsedMs}:undefined);};
  const assets=new Assets(draw,()=>{}),resize=new ResizeObserver(draw);resize.observe(el);let frame=0;const paint=()=>{draw();frame=requestAnimationFrame(paint);};paint();return()=>{resize.disconnect();cancelAnimationFrame(frame);};
 },[]);
 return <canvas ref={canvas} className="whole-story" role="img" aria-label={storyDescription(s.case.playback?.puppet??initialPuppet()).map(id=>copy(id)).join(' ')} data-testid="whole-story"/>;
}
