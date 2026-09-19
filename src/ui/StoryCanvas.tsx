import {useEffect,useLayoutEffect,useRef} from 'react';
import type {State} from '../core/state.js';
import {Assets,artCacheStats} from '../world/assets.js';
import {paintStory} from '../world/paint.js';
import {initialPuppet,storyDescription} from '../story/engine.js';
import {copy} from '../core/content.js';
import{store}from'../controller.js';
import {observeResize} from './resize.js';
export function StoryCanvas({s,model=false}:{s:State;model?:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const paint=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const el=canvas.current;let ctx:CanvasRenderingContext2D|null;try{ctx=el?.getContext('2d',{alpha:false})??null;}catch{ctx=null;}if(!el||!ctx)return;
  const draw=()=>{const state=store.getSnapshot(),box=el.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),width=Math.ceil(box.width*dpr),height=Math.ceil(box.height*dpr);if(el.width!==width)el.width=width;if(el.height!==height)el.height=height;ctx!.setTransform(el.width/100,0,0,el.height/100,0,0);const r=state.case.playback;
   const modelProgress=state.runtime.intent?.target.startsWith('ST.MODEL')&&state.runtime.intent.stage==='operating'&&state.preferences.motion!=='reduced'?state.runtime.operationElapsedMs:state.case.physical.objects.modelTabTried?600:0;
   assets.begin();paintStory(ctx!,assets,model?initialPuppet():r?.puppet??initialPuppet(),[0,0,100,100],!model&&r?.activeCue&&state.preferences.motion!=='reduced'?{cue:r.activeCue,elapsed:state.runtime.cueElapsedMs}:undefined,model?modelProgress:undefined);assets.end();const stats=artCacheStats();for(const [key,value]of Object.entries({rasterBytes:stats.raster.reservedBytes,rasterPeakBytes:stats.raster.peakBytes})){const text=String(value);if(el.dataset[key]!==text)el.dataset[key]=text;}};
  let assetFrame:number|null=null;paint.current=draw;const assets=new Assets(()=>{if(assetFrame===null)assetFrame=requestAnimationFrame(()=>{assetFrame=null;draw();});},()=>{}),resize=observeResize([el],draw);draw();return()=>{resize.disconnect();if(assetFrame!==null)cancelAnimationFrame(assetFrame);assets.dispose();};
 },[model]);
 useLayoutEffect(()=>paint.current(),[s]);
 return <canvas ref={canvas} className="whole-story" role="img" aria-label={model?(s.case.physical.objects.modelTabTried?copy('CT.OBJ.MODEL_RESULT'):'Pip and the seed are on one bank. Grandma waits across the river. The bridge is broken.'):storyDescription(s.case.playback?.puppet??initialPuppet()).map(id=>copy(id)).join(' ')} data-testid={model?'paper-model':'whole-story'}/>;
}
