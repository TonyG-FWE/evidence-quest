import type {State,View} from '../core/state.js';
import {copy} from '../core/content.js';
import {displayedText} from '../core/evidence.js';
import {assetUrl} from '../world/assets.js';
import {Button} from './primitives.js';
export function Ending({s,open}:{s:State;open:(view:View)=>void}){
 const v=s.runtime.view,c=s.case,recap=v.action==='recap',reactions=v.action==='reactions',step=v.frame??0;
 const records=c.records.filter(r=>['crew-plan','jo-explanation','private-idea'].includes(r.kind));
 const last=records.at(-1),earlier=last?.previousRecordId?records.find(r=>r.id===last.previousRecordId):null;
 const uncertain=c.historyUncertain||s.session.saving.mode!=='normal'||c.observations.some(o=>o.uncertain);
 const outcome=last&&c.observations.some(o=>o.kind==='cue-outcome'&&o.seq<last.seq);
 const hintThenTrial=last&&c.observations.some(o=>o.kind==='help-displayed'&&o.seq<last.seq)&&[...c.runHistory,...(c.playback?[c.playback]:[])].some(r=>r.startSeq>last.seq&&r.arrangementRevision===last.arrangementRevision);
 return <><h2 tabIndex={-1} data-focus-heading>{copy(recap?'CT.ENDING.RECAP':reactions?'CT.ENDING.AFTER':'CT.ENDING.TITLE')}</h2>
  {reactions?<>
   <div className="reaction-art"><img className="reaction-room" src={assetUrl(`ASSET.ENV.${step===0?'CY':'MD'}.BACKPLATE`)} alt=""/><img className="reaction-person" src={assetUrl(`ASSET.ACT.${step===0?'REMY':'ARI'}`,'talk')} alt={step===0?'Remy':'Ari'}/></div>
   <p>{copy(step===0?'CT.REMY.ENDING':'CT.ARI.ENDING')}</p>
   <div className="actions"><Button ct="CT.ENDING.NEXT" onClick={()=>open(step===0?{page:'ending',action:'reactions',frame:1}:{page:'ending',action:'recap'})}/><Button ct="CT.ENDING.SKIP_REACTIONS" onClick={()=>open({page:'ending',action:'recap'})}/></div>
  </>:<>
   <p>{copy(recap?'CT.ENDING.FACT':'CT.ENDING.LIGHT')}</p>
   {recap&&last&&<section><h3>{copy(uncertain?'CT.RECAP.RECORDED_IDEA':hintThenTrial?'CT.RECAP.HINT_THEN_PLAN':outcome?'CT.RECAP.AFTER_RUN':'CT.RECAP.PLAN')}</h3>
    {earlier&&earlier.text!==last.text?<><h4>{copy('CT.RECAP.CHANGED')}</h4><p>{copy('CT.RECAP.BEFORE',{earlierText:earlier.text})}</p><p>{copy('CT.RECAP.AFTER',{laterText:last.text})}</p></>:<blockquote>{last.text}</blockquote>}
    {!!last.refs.length&&<><h4>{copy('CT.RECAP.DETAILS')}</h4>{last.refs.map(ref=><blockquote key={ref}>{displayedText(c,ref)}</blockquote>)}</>}
   </section>}
   {!recap&&<div className="actions"><Button ct="CT.ENDING.CONTINUE" onClick={()=>open({page:'ending',action:'reactions',frame:0})}/><Button ct="CT.ENDING.SKIP" onClick={()=>open({page:'ending',action:'recap'})}/></div>}
  </>}
  <div className="actions"><Button ct="CT.ENDING.REACTIONS" onClick={()=>open({page:'ending',action:'reactions',frame:0})}/><Button ct="CT.ENDING.REOPEN" onClick={()=>open({page:'ending',action:'recap'})}/><Button ct={c.physical.room==='SC.ST'?'CT.ENDING.RETURN':'CT.UI.ROOM'} onClick={()=>open({page:'world'})}/></div>
 </>;
}
