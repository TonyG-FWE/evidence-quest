import {useEffect,useRef,type ReactNode} from 'react';
import type {State,View} from '../core/state.js';
import type {Store} from '../core/store.js';
import {copy} from '../core/content.js';
import {Button} from './primitives.js';

// Visibility is reported by the native text surface, never by a request or network callback.
export function VisibleHelp({ids,onVisible}:{ids:string[];onVisible:()=>void}){
 const ref=useRef<HTMLDivElement>(null),callback=useRef(onVisible);callback.current=onVisible;
 useEffect(()=>{let frame=0,reported=false;
  const measure=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   if(document.hidden||reported)return;const el=ref.current;if(!el)return;
   const panel=el.closest('[data-task]')?.getBoundingClientRect(),world=document.querySelector('[data-world]')?.getBoundingClientRect();
   const top=Math.max(0,panel?.top??0,matchMedia('(max-width:900px), (max-height:600px)').matches?world?.bottom??0:0),bottom=Math.min(innerHeight,panel?.bottom??innerHeight);
   const visible=[...el.querySelectorAll('[data-help-word]')].filter(word=>[...word.getClientRects()].some(r=>r.width>0&&r.top>=top&&r.bottom<=bottom&&r.left>=0&&r.right<=innerWidth));
   if(visible.map(w=>w.textContent).join(' ').length>=12){reported=true;callback.current();}
  });};measure();document.addEventListener('scroll',measure,true);document.addEventListener('visibilitychange',measure);window.addEventListener('resize',measure);const resize=new ResizeObserver(measure);if(ref.current)resize.observe(ref.current);
  return()=>{cancelAnimationFrame(frame);resize.disconnect();document.removeEventListener('scroll',measure,true);document.removeEventListener('visibilitychange',measure);window.removeEventListener('resize',measure);};
 },[ids.join('|')]);
 return <div ref={ref} className="help-response">{ids.map(ct=><p data-content-id={ct} key={ct}>{copy(ct).split(/(\s+)/).map((word,i)=>/^\s+$/.test(word)?word:<span data-help-word key={i}>{word}</span>)}</p>)}</div>;
}
export function Help({s,store,details,open}:{s:State;store:Store;details:ReactNode;open:(view:View)=>void}){
 const q=s.session.coach,op=s.runtime.helpOpportunity,p=s.runtime.helpPresentation,topic=s.runtime.view.topic??(s.case.selectedLead==='story-plan'?'story':'search'),draft=s.case.drafts.find(d=>d.id===`coach-${topic}`)!;
 const count=Array.from(draft.text).length,send=store.send;
 const active=!!op&&!['idle','canceled','stale'].includes(q.status),offer=['offered','expired'].includes(q.status);
 const again=()=>{send({type:'COACH_CANCEL'});send({type:'VIEW',view:{page:'help',topic,action:'edit'}});};
 const shown=p&&s.runtime.view.action!=='edit'&&(p.displayed||q.winner);
 return <><h2 tabIndex={-1} data-focus-heading>{copy('CT.HELP.TITLE')}</h2>
  {op?.explanation&&<details><summary>{copy('CT.HELP.SUBMITTED')}</summary><p>{op!.explanation}</p></details>}
  {shown?<><p className="eyebrow">{copy(p.earlier?'CT.HELP.EARLIER':p.origin==='live-selection'?'CT.HELP.READY':'CT.HELP.PREPARED')}</p><VisibleHelp key={p.requestId} ids={p.contentIds} onVisible={()=>send({type:'COACH_DISPLAY',requestId:p.requestId})}/><Button ct="CT.HELP.AGAIN" onClick={again}/></>:<>
   {!active&&<><p>{copy('CT.HELP.TOPIC')}</p><div className="actions"><Button ct="CT.PLAN.SEARCH" aria-pressed={topic==='search'} onClick={()=>open({page:'help',topic:'search',action:'edit'})}/><Button ct="CT.PLAN.STORY" aria-pressed={topic==='story'} onClick={()=>open({page:'help',topic:'story',action:'edit'})}/></div></>}
   <label className="stack">{copy('CT.HELP.FIELD')}<textarea aria-label={copy('CT.HELP.NEW_DRAFT')} value={draft.text} onFocus={()=>send({type:'FOCUS',owner:'text'})} onChange={e=>send({type:'DRAFT',id:draft.id,text:e.target.value})}/></label>
   {count>=500&&<p>{copy('CT.UI.COUNT',{count})}</p>}{count>600&&<p>{copy('CT.UI.LIMIT')}</p>}{details}
   {q.status==='pending'&&<p role="status">{copy('CT.HELP.PENDING')}</p>}{q.status==='waiting'&&<p role="status">{copy('CT.HELP.WAITING')}</p>}
   {offer&&<><p>{copy(q.status==='expired'?'CT.HELP.UNAVAILABLE':'CT.HELP.OFFER')}</p><Button ct="CT.HELP.USE_PREPARED" onFocus={()=>send({type:'COACH_FOCUS',focused:true})} onBlur={()=>send({type:'COACH_FOCUS',focused:false})} onClick={()=>send({type:'COACH_CHOOSE',choice:'fallback'})}/></>}
   {q.heldResponse&&!q.winner&&<Button ct="CT.HELP.VIEW_NEW" onClick={()=>send({type:'COACH_CHOOSE',choice:'live'})}/>}
   {q.status==='stale'&&<p>{copy('CT.HELP.STALE')}</p>}{q.status==='canceled'&&<p>{copy('CT.HELP.CANCELED')}</p>}
   {active&&<Button ct="CT.HELP.CANCEL" onClick={()=>send({type:'COACH_CANCEL'})}/>}
   <div className="actions"><Button className="primary" ct={active?'CT.HELP.RETRY':'CT.HELP.THINK'} disabled={count>600} onClick={()=>send({type:'HELP'})}/><Button ct="CT.HELP.DIRECT" onClick={()=>send({type:'HELP',direct:true})}/></div>
  </>}
  <Button ct="CT.UI.FESTIVAL" onClick={()=>open({page:'world'})}/>
 </>;
}
