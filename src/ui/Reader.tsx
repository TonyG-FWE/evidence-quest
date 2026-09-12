import {useEffect,useState,useRef} from 'react';
import type {State} from '../core/state.js';
import type {Store} from '../core/store.js';
import type {Span} from '../../contracts/types.js';
import {content,copy,parts} from '../core/content.js';
import {available,permittedSpans} from '../core/evidence.js';
import {Passage} from './Passage.js';
import {Button} from './primitives.js';
import {assetUrl} from '../world/assets.js';
import {openWord,showReading,Support} from './Experience.js';
import type {WordContext} from '../core/experience.js';
export function Reader({state,store}:{state:State;store:Store}){
 const view=state.runtime.view,id=view.sourceId??'E1',access=view.accessId??`ACC.EVIDENCE.${id}`,source=content.sources.find(s=>s.id===id)!;
 const [definition,setDefinition]=useState<string|null>(null),[playing,setPlaying]=useState(false),wordHeading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(definition)wordHeading.current?.focus();},[definition]);
 useEffect(()=>{const pause=()=>{setPlaying(false);};document.addEventListener('visibilitychange',pause);window.addEventListener('blur',pause);return()=>{document.removeEventListener('visibilitychange',pause);window.removeEventListener('blur',pause);};},[]);
 useEffect(()=>{
  if(!playing||definition||view.ref&&view.ref!=='frames')return;
  const timer=setTimeout(()=>{if((view.frame??1)>=3)setPlaying(false);else store.send({type:'VIEW',view:{...view,ref:'frames',frame:(view.frame??1)+1}});},1000);
  return()=>clearTimeout(timer);
 },[playing,definition,view.frame,view.ref,store]);
 const granted=source.parts.filter(p=>available(state.case,p.refId));
 const component=id==='E2'&&available(state.case,'E2.a/frame1')?(view.ref&&view.ref!=='frames'?view.ref:`E2.a/frame${view.frame??1}`):granted[0]?.refId;
 useEffect(()=>{
  if(!component)return;const panel=document.querySelector<HTMLElement>('[data-task]');if(!panel)return;
  const resume=store.getSnapshot().case.readerResume;
  if(resume?.sourceId===id&&resume.componentRef===component)panel.scrollTop=resume.scrollFraction*Math.max(0,panel.scrollHeight-panel.clientHeight);
  const remember=()=>store.send({type:'SOURCE_POSITION',sourceId:id,componentRef:component,frame:id==='E2'?view.frame??1:null,scrollFraction:panel.scrollTop/Math.max(1,panel.scrollHeight-panel.clientHeight)});
  remember();panel.addEventListener('scroll',remember);return()=>panel.removeEventListener('scroll',remember);
 },[id,component,view.frame,store]);
 const define=(word:string,context?:WordContext)=>{setPlaying(false);if(context)openWord(state,context);else setDefinition(word);};
 const display=(ref:string)=>{const p=parts.get(ref)!;return <Passage key={ref} ct={p.ctId} refs={[ref]} access={access} store={store} onWord={define}/>;};
 const change=(ref?:string,frame?:number)=>{setPlaying(false);store.send({type:'VIEW',view:{...view,...(ref?{ref}:{}),...(frame?{frame}:{})}});};
 const isFile=id==='E2'&&available(state.case,'E2.a/frame1');
 if(definition)return <article className="definition"><h2 ref={wordHeading} tabIndex={-1}>{definition.toLowerCase()}</h2><p>{copy(`CT.WORD.${definition}`)}</p><Button ct="CT.SOURCE.DEFINITION_CLOSE" onClick={()=>{const word=definition;setDefinition(null);requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>(`[data-word="${word}"]`)?.focus());}}/></article>;
 return <article className="reader">
  <h2 tabIndex={-1} data-focus-heading>{copy(source.titleCt)}</h2>
  {id==='E6'&&available(state.case,'E6.a')&&<Button onClick={()=>showReading(state,'READ.PROMISE')}>Read with the crew</Button>}
  {view.action!=='enlarge'&&<Button ct="CT.SOURCE.ENLARGE" onClick={()=>{setPlaying(false);store.send({type:'VIEW',view:{...view,action:'enlarge',previous:view}});}}/>}
  {isFile?<>
   <div className="actions"><Button ct="CT.MEDIA.RECORDING" onClick={()=>change('frames',1)}/><Button ct="CT.MEDIA.PHOTO" onClick={()=>change('E2.b')}/><Button ct="CT.MEDIA.MESSAGE" onClick={()=>change('E2.c')}/><Button ct="CT.CLIP.DESCRIBE" onClick={()=>change('E2.a/description')}/></div>
   {view.ref==='E2.b'?<><div className="source-image photo"><img src={assetUrl('ASSET.SOURCE.E2.PHOTO')} alt=""/><strong>CANCELED</strong></div>{display('E2.b')}</>:view.ref==='E2.a/description'?display('E2.a/description'):view.ref==='E2.c'?display('E2.c'):<>
    <p>{copy('CT.META.RECORDED',{time:'9:12'})}</p><img className="source-image" src={assetUrl('ASSET.SOURCE.E2.CLIP',`frame${view.frame??1}`)} alt=""/>{display(`E2.a/frame${view.frame??1}`)}
    {(view.frame??1)===3&&display('E2.a/end')}
    <div className="actions"><Button ct="CT.CLIP.PREVIOUS" disabled={(view.frame??1)===1} onClick={()=>change('frames',(view.frame??1)-1)}/><Button ct="CT.CLIP.NEXT" disabled={(view.frame??1)===3} onClick={()=>change('frames',(view.frame??1)+1)}/></div>
    <div className="actions"><Button ct={playing?'CT.CLIP.PAUSE':(view.frame??1)===3?'CT.CLIP.REPLAY':'CT.CLIP.PLAY'} onClick={()=>{if(playing)setPlaying(false);else{if((view.frame??1)===3)change('frames',1);setPlaying(true);}}}/><label>{copy('CT.CLIP.POSITION')}<input aria-label={copy('CT.CLIP.POSITION')} type="range" min="1" max="3" step="1" value={view.frame??1} onChange={e=>change('frames',Number(e.target.value))}/></label></div>
    <h3>{copy('CT.MEDIA.MESSAGE')}</h3><p>{copy('CT.META.POSTED',{time:'9:13'})}</p>{display('E2.c')}
   </>}
  </>:<>
   {['E3','E4'].includes(id)&&<p>{copy('CT.META.POSTED',{time:id==='E3'?'9:10':'9:05'})}</p>}
   {id==='E8'&&granted.map(p=><img key={p.refId} className="tile-inspection" src={assetUrl('ASSET.'+p.refId.slice(3))} alt=""/>)}
   {[...new Set(granted.map(p=>p.ctId))].map(ct=>{
    const group=granted.filter(p=>p.ctId===ct),length=Array.from(copy(ct)).length;let range:Span|undefined;
    if(group.length===1&&group[0]!.refId==='E5.b'&&permittedSpans(state.case,'E5.b')[0]![1]<length)range=permittedSpans(state.case,'E5.b')[0]!;
    return <Passage key={ct} ct={ct} refs={group.map(p=>p.refId)} access={access} store={store} onWord={define} {...(range?{range}:{})}/>;
   })}
  </>}
  {id==='E3'&&<Support s={state} id="CT.ER13.SCOPE"/>}<p className="muted">{copy('CT.ACCESS.SOURCE')}</p>
 </article>;
}
