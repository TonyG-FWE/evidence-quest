import {useEffect,useRef} from 'react';
import type {Draft} from '../../contracts/types.js';
import type {State,View} from '../core/state.js';
import {store} from '../controller.js';
import {content,copy,parts} from '../core/content.js';
import {available,displayedText,exposed,permittedSpans,sourceOf} from '../core/evidence.js';
import {comparisonDraft,comparisonRefs,detailGroups,knownRooms,metadata,metadataKnown,provenance,questionIds,recordComparison,relationshipIds,timeline} from '../core/reasoning.js';
import {Button} from './primitives.js';
import {Passage} from './Passage.js';
import {roomName} from './labels.js';

type Props={s:State;open:(view:View)=>void};
const send=store.send;
const title=(ref:string)=>copy(content.sources.find(source=>source.id===sourceOf(ref))!.titleCt);
export const historical=(ref:string)=>ref==='CT.OBJ.NOTICE_PARTIAL'?'Earlier view of the curled notice.':ref==='E5.c/seen'?'Earlier during your visit to the Media room.':ref==='E5.c/response'?'Earlier, when you woke Loop.':null;
function readerFor(ref:string,previous:View):View{return {page:'reader',sourceId:sourceOf(ref),accessId:'ACC.EVIDENCE.'+sourceOf(ref),ref,...(ref.startsWith('E2.a/frame')||ref==='E2.a/end'?{frame:ref==='E2.a/end'?3:Number(ref.at(-1)),ref:'frames'}:{}),previous};}
function Heading({ct}:{ct:string}){return <h2 tabIndex={-1} data-focus-heading>{copy(ct)}</h2>;}
export function NotesTabs({s,open}:Props){return <nav className="actions notes-tabs" aria-label={copy('CT.UI.NOTES')}>{([['notes','EVIDENCE'],['compare','COMPARE'],['timeline','TIMELINE'],['idea','IDEAS']] as const).map(([page,ct])=><Button key={page} ct={'CT.NOTES.'+ct} aria-pressed={s.runtime.view.page===page} onClick={()=>open({page})}/>)}</nav>;}

export function SourceMetadata({refId}:{refId:string}){
 const root=useRef<HTMLParagraphElement>(null),meta=metadata(refId);
 useEffect(()=>{
  if(!meta)return;let frame=0;
  const measure=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const el=root.current;if(!el||document.hidden)return;
   const world=document.querySelector('[data-world]')?.getBoundingClientRect();
   let top=matchMedia('(max-width:900px), (max-height:600px)').matches?Math.max(0,world?.bottom??0):0,bottom=innerHeight,left=0,right=innerWidth;
   for(let node:HTMLElement|null=el;node;node=node.parentElement){const style=getComputedStyle(node),box=node.getBoundingClientRect();if(style.visibility!=='visible')return;
    if(/auto|scroll|hidden|clip/.test(style.overflowY)){top=Math.max(top,box.top+node.clientTop);bottom=Math.min(bottom,box.top+node.clientTop+node.clientHeight);}
    if(/auto|scroll|hidden|clip/.test(style.overflowX)){left=Math.max(left,box.left+node.clientLeft);right=Math.min(right,box.left+node.clientLeft+node.clientWidth);}
   }
   const words=[...el.querySelectorAll('[data-meta-word]')];
   if(words.length&&words.every(word=>[...word.getClientRects()].every(box=>box.width>0&&box.top>=top-.5&&box.bottom<=bottom+.5&&box.left>=left-.5&&box.right<=right+.5)))send({type:'METADATA_SEEN',ref:refId});
  });};
  measure();document.addEventListener('scroll',measure,true);document.addEventListener('visibilitychange',measure);window.addEventListener('resize',measure);const resize=new ResizeObserver(measure);if(root.current)resize.observe(root.current);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('scroll',measure,true);document.removeEventListener('visibilitychange',measure);window.removeEventListener('resize',measure);resize.disconnect();};
 },[refId,meta?.text]);
 return meta?<p ref={root} className="source-provenance" data-metadata-ref={refId}>{meta.text.split(/(\s+)/).map((word,i)=>/^\s+$/.test(word)?word:<span data-meta-word key={i}>{word}</span>)}</p>:null;
}
function Detail({s,refId}:{s:State;refId:string}){
 const meta=metadata(refId);
 return <div className="chosen-detail"><h3>{title(refId)}</h3><p className="source-provenance">{provenance(refId)}{meta&&metadataKnown(s.case,refId)?' · '+meta.text:''}</p>{historical(refId)&&<p className="source-provenance">{historical(refId)}</p>}<blockquote>{displayedText(s.case,refId)}</blockquote></div>;
}
export function ExposedDetails({s,draft,onChange,open}:{s:State;draft:Draft;onChange:(refs:string[])=>void;open:(view:View)=>void}){
 const groups=detailGroups(s.case,true);
 return <fieldset className="details" aria-describedby="detail-limit"><legend>{copy('CT.SOURCE.DETAIL')}</legend><p id="detail-limit">{copy('CT.SOURCE.LIMIT')}</p><Button ct="CT.SOURCE.OPEN_VENUE" onClick={()=>open({page:'map',previous:s.runtime.view})}/>{!groups.length&&<p>{copy('CT.SOURCE.NO_AVAILABLE')}</p>}{groups.map(group=><section className="evidence-group" key={group.id}><h3>{group.title}</h3><p className="source-provenance">{provenance(group.refs[0]!)}</p>{group.refs.map(ref=>{
  const checked=draft.selectedRefs.includes(ref),meta=metadata(ref);
  return <label key={ref}><input data-ref={ref} type="checkbox" checked={checked} disabled={!checked&&draft.selectedRefs.length>=2} onChange={()=>onChange(checked?draft.selectedRefs.filter(r=>r!==ref):[...draft.selectedRefs,ref])}/><span>{meta&&metadataKnown(s.case,ref)&&<small className="source-provenance">{meta.text}</small>}{historical(ref)&&<small className="source-provenance">{historical(ref)}</small>}{displayedText(s.case,ref)}</span></label>;
 })}</section>)}</fieldset>;
}
function TextDraft({text,onChange}:{text:string;onChange:(text:string)=>void}){return <><label className="stack">{copy('CT.IDEA.FIELD')}<textarea aria-label={copy('CT.IDEA.FIELD')} value={text} onFocus={()=>send({type:'FOCUS',owner:'text'})} onChange={event=>onChange(event.target.value)}/></label>{Array.from(text).length>=500&&<p>{copy('CT.UI.COUNT',{count:Array.from(text).length})}</p>}{Array.from(text).length>600&&<p>{copy('CT.UI.LIMIT_RECORD')}</p>}</>;}
function Slot({s,open,slot,refId}:{s:State;open:Props['open'];slot:string;refId?:string|null|undefined}){
 return <section className="comparison-slot"><h3>{copy(slot.endsWith('leftRef')||slot.endsWith('0')?'CT.COMPARE.FIRST':'CT.COMPARE.SECOND')}</h3>{refId&&<Detail s={s} refId={refId}/>}<div className="actions"><Button data-focus-slot={slot} ct={refId?'CT.SOURCE.CHANGE':'CT.SOURCE.ADD'} onClick={()=>open({page:'picker',action:slot,previous:{...s.runtime.view,focusSlot:slot}})}/>{refId&&<Button ct="CT.SOURCE.REMOVE" onClick={()=>{
  if(slot.startsWith('compare'))send({type:'COMPARISON',slot:slot.endsWith('leftRef')?'leftRef':'rightRef',ref:null});
  else {const d=s.case.drafts.find(d=>d.id==='private')!;send({type:'DRAFT',id:'private',text:d.text,refs:d.selectedRefs.filter((_,i)=>i!==Number(slot.at(-1)))});}
 }}/>}</div></section>;
}
export function Compare({s,open}:Props){
 const row=comparisonDraft(s.case);
 return <><Heading ct="CT.NOTES.COMPARE"/><NotesTabs s={s} open={open}/><p>{copy('CT.COMPARE.INSTRUCTION')}</p><div className="comparison-details"><Slot s={s} open={open} slot="compare-leftRef" refId={row?.leftRef}/><Slot s={s} open={open} slot="compare-rightRef" refId={row?.rightRef}/></div><fieldset><legend>{copy('CT.COMPARE.RELATION')}</legend><div className="actions">{Object.entries(relationshipIds).map(([value,ct])=><Button key={value} ct={ct} aria-pressed={row?.relationship===value} onClick={()=>send({type:'COMPARISON',relationship:value as keyof typeof relationshipIds})}/>)}</div><p>{copy('CT.COMPARE.RELATION_HELP')}</p>{row?.relationship&&<Button ct="CT.COMPARE.CLEAR_RELATION" onClick={()=>send({type:'COMPARISON',relationship:null})}/>}</fieldset><TextDraft text={row?.note??''} onChange={note=>send({type:'COMPARISON',note})}/><p>{copy('CT.IDEA.PRIVATE')}</p><div className="actions"><Button ct="CT.IDEA.SAVE" onClick={()=>send({type:'SAVE_IDEA',comparison:true})}/><Button ct="CT.PRESENT.OPEN" onClick={()=>open({page:'present',selected:comparisonRefs(row),previous:s.runtime.view})}/><Button ct="CT.HELP.THINK" onClick={()=>send({type:'IDEA_HELP',comparison:true})}/></div><Feedback s={s}/></>;
}
function Feedback({s}:{s:State}){const ids=s.runtime.caption.filter(ct=>['CT.UI.NOTHING','CT.UI.LIMIT_RECORD','CT.SOURCE.NONE','CT.IDEA.RECORDED'].includes(ct));return ids.length?<div role="status">{ids.map(ct=><p key={ct}>{copy(ct)}</p>)}</div>:null;}
export function Picker({s,open}:Props){
 const v=s.runtime.view,groups=detailGroups(s.case),group=groups.find(g=>g.id===v.group),candidate=group?.refs.includes(v.ref??'')?v.ref:undefined,preview=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(candidate){preview.current?.focus();preview.current?.scrollIntoView({block:'nearest'});}},[candidate]);
 const use=()=>{if(!candidate||!exposed(s.case,candidate))return;
  if(v.action?.startsWith('compare'))send({type:'COMPARISON',slot:v.action.endsWith('leftRef')?'leftRef':'rightRef',ref:candidate});
  else {const d=s.case.drafts.find(d=>d.id==='private')!,refs=[...d.selectedRefs];refs[Number(v.action?.at(-1)??0)]=candidate;send({type:'DRAFT',id:'private',text:d.text,refs:[...new Set(refs.filter(Boolean))]});}
  open(v.previous??{page:'compare'});
 };
 return <><Heading ct="CT.SOURCE.DETAIL"/><p>{copy('CT.SOURCE.CHOOSE')}</p>{!groups.length&&<p>{copy('CT.SOURCE.NO_AVAILABLE')}</p>}<div className="stack">{groups.filter(g=>g.sourceId!=='NAV').map(g=><Button key={g.id} aria-pressed={group?.id===g.id} onClick={()=>open({...v,group:g.id,sourceId:g.sourceId,ref:''})}>{g.title}</Button>)}</div><h3>{copy('CT.SOURCE.VENUE')}</h3><div className="actions">{groups.filter(g=>g.sourceId==='NAV').map(g=><Button key={g.id} onClick={()=>open({...v,group:g.id,sourceId:g.sourceId,ref:''})}>{g.title}</Button>)}<Button ct="CT.SOURCE.OPEN_VENUE" onClick={()=>open({page:'map',previous:v})}/></div>
  {group&&<section className="picker-source"><h3>{group.title}</h3><p>{provenance(group.refs[0]!)}</p><div className="actions">{group.refs.map((ref,i)=><Button key={ref} data-picker-ref={ref} aria-pressed={candidate===ref} onClick={()=>open({...v,ref})}>{copy('CT.SOURCE.DETAIL')} {i+1}</Button>)}</div>{candidate&&<div className="picker-preview" tabIndex={-1} ref={preview}><SourceMetadata refId={candidate}/>{historical(candidate)&&<p className="source-provenance">{historical(candidate)}</p>}{permittedSpans(s.case,candidate).map((range,i)=><Passage key={i} ct={parts.get(candidate)!.ctId} refs={[candidate]} access={'ACC.EVIDENCE.'+group.sourceId} range={range} store={store}/>)}</div>}<Button ct="CT.NOTES.OPEN_SOURCE" slots={{sourceTitle:group.title}} onClick={()=>open(candidate?readerFor(candidate,v):{page:'reader',sourceId:group.sourceId,accessId:'ACC.EVIDENCE.'+group.sourceId,previous:v})}/></section>}
  <div className="actions"><Button ct="CT.SOURCE.USE" disabled={!candidate||!exposed(s.case,candidate)} onClick={use}/><Button ct="CT.UI.CANCEL" onClick={()=>open(v.previous??{page:'compare'})}/></div>
 </>;
}
export function Ideas({s,open}:Props){
 const c=s.case,v=s.runtime.view,d=c.drafts.find(d=>d.id==='private')!,records=c.records.filter(r=>r.kind==='private-idea'),saved=v.action==='recorded'?records.find(r=>r.id===v.ref):undefined,row=saved&&recordComparison(c,saved),earlier=saved?.previousRecordId?records.find(r=>r.id===saved.previousRecordId):undefined;
 return <><Heading ct="CT.NOTES.IDEAS"/><NotesTabs s={s} open={open}/>{saved?<><p>{copy('CT.IDEA.RECORDED')}</p><h3>{copy('CT.IDEA.CURRENT')}</h3>{saved.text&&<blockquote>{saved.text}</blockquote>}{saved.refs.map(ref=><Detail key={ref} s={s} refId={ref}/>)}{row?.relationship&&<p>{copy('CT.COMPARE.RELATION_HELP')} {copy(relationshipIds[row.relationship])}</p>}{saved.arrangementRevision!==c.physical.arrangementRevision&&<p>{copy('CT.IDEA.PAST_PLAN')}</p>}<Button ct="CT.IDEA.EDIT" onClick={()=>send({type:'EDIT_IDEA',id:saved.id})}/>{earlier&&<details><summary>{copy('CT.IDEA.EARLIER')}</summary>{earlier.text&&<blockquote>{earlier.text}</blockquote>}{earlier.refs.map(ref=><Detail key={ref} s={s} refId={ref}/>)}{recordComparison(c,earlier)?.relationship&&<p>{copy(relationshipIds[recordComparison(c,earlier)!.relationship!])}</p>}</details>}<div className="actions"><Button ct="CT.LEAD.CHOOSE" onClick={()=>open({page:'lead',previous:v})}/><Button ct="CT.PRESENT.OPEN" onClick={()=>open({page:'present',selected:saved.refs,previous:v})}/></div></>:<><p>{copy('CT.IDEA.PRIVATE')}</p><TextDraft text={d.text} onChange={text=>send({type:'DRAFT',id:'private',text})}/><div className="comparison-details">{[0,1].map(i=><Slot key={i} s={s} open={open} slot={'private-'+i} refId={d.selectedRefs[i]}/>)}</div><div className="actions"><Button ct="CT.IDEA.SAVE" onClick={()=>send({type:'SAVE_IDEA'})}/><Button ct="CT.HELP.THINK" onClick={()=>send({type:'IDEA_HELP'})}/><Button ct="CT.LEAD.CHOOSE" onClick={()=>open({page:'lead',previous:v})}/></div><Feedback s={s}/></>}
  {!!records.length&&<section><h3>{copy('CT.NOTES.IDEAS')}</h3>{[...records].reverse().map(r=><div className="saved-idea" key={r.id}>{r.text&&<p>{r.text}</p>}<Button ct="CT.IDEA.CURRENT" onClick={()=>open({page:'idea',action:'recorded',ref:r.id})}/></div>)}</section>}
 </>;
}
export function Timeline({s,open}:Props){
 const v=s.runtime.view,rows=timeline(s.case,v.action==='discovery');
 return <><Heading ct="CT.NOTES.TIMELINE"/><NotesTabs s={s} open={open}/><div className="actions"><Button ct="CT.TIMELINE.EVENT" aria-pressed={v.action!=='discovery'} onClick={()=>open({...v,action:'events'})}/><Button ct="CT.TIMELINE.DISCOVERY" aria-pressed={v.action==='discovery'} onClick={()=>open({...v,action:'discovery'})}/></div>{!rows.length?<p>{copy('CT.TIMELINE.EMPTY')}</p>:<ol className="known-timeline">{rows.map(row=><li key={row.id} data-timeline-row={row.id}><h3>{row.minute===null?copy('CT.META.VISIT'):`${Math.floor(row.minute/60)}:${String(row.minute%60).padStart(2,'0')}`} · {copy(row.typeCt)}</h3><p>{row.title}</p><p className="source-provenance">{provenance(row.ref)}</p><Button data-focus-slot={'timeline-'+row.id} ct="CT.NOTES.OPEN_SOURCE" slots={{sourceTitle:row.title}} onClick={()=>open(readerFor(row.ref,{...v,focusSlot:'timeline-'+row.id}))}/></li>)}</ol>}</>;
}
export function Lead({s,open}:Props){
 const v=s.runtime.view,chosen=v.lead??s.case.selectedLead,destination=v.destination??s.case.reasoning?.leadDestination??null;
 return <><Heading ct="CT.LEAD.CHOOSE"/><div className="stack">{Object.entries(questionIds).map(([lead,ct])=><Button key={lead} ct={ct} aria-pressed={chosen===lead} onClick={()=>open({...v,lead:lead as keyof typeof questionIds})}/>)}</div><fieldset><legend>{copy('CT.LEAD.DESTINATION')}</legend><div className="actions">{knownRooms(s.case).map(room=><Button key={room.id} aria-pressed={destination===room.id} onClick={()=>open({...v,destination:room.id})}>{roomName(room.id)}</Button>)}</div></fieldset><Button ct="CT.LEAD.FOLLOW" disabled={!chosen} onClick={()=>send({type:'LEAD',lead:chosen,destination})}/></>;
}
