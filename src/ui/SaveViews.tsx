import {useEffect,useRef} from 'react';
import type {State} from '../core/state.js';
import {store,saves} from '../controller.js';
import {copy} from '../core/content.js';
import {Button} from './primitives.js';

export function SaveStatus({s}:{s:State}){
 const saving=s.session.saving,failed=saving.mode!=='normal',saved=saving.acknowledgedRevision===s.case.revision;
 return <aside className="save-status" data-testid="save-status" aria-live="polite">
  <p>{copy(failed?'CT.SAVE.FAILED':saved?'CT.SAVE.SAVED':'CT.SAVE.PENDING')}</p>
  {failed&&<><p>{copy('CT.SAVE.DETAIL')}</p>{s.case.revision===0&&<p>{copy('CT.SAVE.OLD_MAY_RETURN')}</p>}<Button ct="CT.SAVE.RETRY" onClick={()=>void saves.retry()}/></>}
 </aside>;
}
export function Home({s}:{s:State}){
 const status=s.runtime.homeStatus,heading=useRef<HTMLHeadingElement>(null);
 const needsRecovery=['read-error','version','damaged','run'].includes(status),recovery=needsRecovery&&s.runtime.view.action!=='recovery-dismissed';
 useEffect(()=>{heading.current?.focus();},[status]);
 const recoveryCt=status==='version'?'CT.RECOVERY.VERSION':status==='damaged'?'CT.RECOVERY.DAMAGED':status==='run'?'CT.RECOVERY.RUN':'CT.RECOVERY.READ';
 return <div className="home"><div className="home-art"/><main>
  <p className="eyebrow">SPARKFEST</p><h1>{copy('CT.START.TITLE')}</h1>
  <h2 ref={heading} tabIndex={-1}>{copy(recovery?recoveryCt:'CT.START.CASE')}</h2>
  {recovery?<>
   {s.runtime.restorePreservesSlots&&<p>{copy('CT.TECH.PREVIOUS')}</p>}
   {s.runtime.savedCandidate&&<Button className="primary" ct="CT.START.CONTINUE" onClick={()=>saves.restore()}/>}
   <p>{copy('CT.RECOVERY.SESSION_DETAIL')}</p>
   <div className="actions"><Button ct="CT.RECOVERY.RETRY" onClick={()=>void saves.boot()}/><Button ct="CT.RECOVERY.SESSION" onClick={()=>saves.start(false)}/><Button ct="CT.UI.BACK" onClick={()=>store.send({type:'VIEW',view:{page:'home',action:'recovery-dismissed'}})}/></div>
  </>:<>
   <p>{copy('CT.GOAL.ASSIGNMENT')}</p>
   <div className="actions">{status==='checking'?<p>{copy('CT.START.CHECK')}</p>:s.runtime.hasLiveVisit?<Button className="primary" ct="CT.START.CONTINUE" onClick={()=>store.send({type:'CONTINUE'})}/>:needsRecovery?<Button className="primary" ct={s.runtime.savedCandidate?'CT.START.CONTINUE':'CT.START.START'} onClick={()=>store.send({type:'VIEW',view:{page:'home'}})}/>:s.runtime.savedCandidate?<Button className="primary" ct="CT.START.CONTINUE" onClick={()=>saves.restore()}/>:<Button className="primary" ct="CT.START.START" onClick={()=>saves.start()}/>}</div>
  </>}
  <div className="actions"><Button ct="CT.UI.SETTINGS" onClick={()=>store.send({type:'VIEW',view:{page:'settings',previous:{page:'home'}}})}/>{status!=='checking'&&(s.runtime.savedCandidate||s.runtime.hasLiveVisit||recovery)&&<Button ct="CT.START.OVER" onClick={()=>store.send({type:'VIEW',view:{page:'confirm',action:'new-game',previous:{page:'home'}}})}/>}</div>
 </main></div>;
}
