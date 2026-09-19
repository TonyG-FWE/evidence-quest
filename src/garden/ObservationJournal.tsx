import {useEffect,useId,useRef,useState,type PointerEvent} from 'react';
import type {Chapter,SourceId} from './model.js';
import {sources} from './content.js';
import {ReadingParagraph,ReadingTools,ReadWords} from './Reading.js';
import {ObservationPicture} from './ObservationPicture.js';
import {JOURNAL_NOTE_LIMIT,observationsFor,storyboardFor,type JournalCommand,type JournalState,type ObservationId} from './journal.js';
import './journal.css';

export type JournalMode='journal'|'storyboard';
export interface JournalProps {
 chapter:Chapter;journal:JournalState;onChange:(command:JournalCommand)=>void;
 onReadSource:(source:SourceId)=>void;onClose:()=>void;mode?:JournalMode;readOnly?:boolean;
}
type Drop={id:ObservationId;edge:'before'|'after'};
type Drag={id:ObservationId;pointer:number;x:number;y:number;moving:boolean};

/** An optional notebook inside the existing dialog/focus owner. Its callbacks
 * dispatch to that owner; it never writes storage, exposure or story progress. */
export function Journal({chapter,journal,onChange,onReadSource,onClose,mode='journal',readOnly=false}:JournalProps){
 const [view,setView]=useState<JournalMode>(mode),[dragging,setDragging]=useState<ObservationId|null>(null),[drop,setDrop]=useState<Drop|null>(null),[announcement,setAnnouncement]=useState('');
 const root=useRef<HTMLElement>(null),drag=useRef<Drag|null>(null),swallowClick=useRef(false),focusAfter=useRef<{id:ObservationId;control:string}|null>(null),id=useId();
 const cards=view==='storyboard'?storyboardFor(chapter,journal):observationsFor(chapter),order=cards.map(card=>card.id),orderKey=order.join('|');
 const titleId=id+'-title',notesId=id+'-notes',instructionsId=id+'-instructions';
 useEffect(()=>{setView(mode);},[mode]);
 useEffect(()=>{drag.current=null;setDragging(null);setDrop(null);},[view,readOnly]);
 useEffect(()=>{
  const pending=focusAfter.current;if(!pending)return;focusAfter.current=null;
  const card=root.current?.querySelector<HTMLElement>('[data-journal-card="'+pending.id+'"]');
  const button=card?.querySelector<HTMLButtonElement>('[data-journal-control="'+pending.control+'"]');
  (button&&!button.disabled?button:card?.querySelector<HTMLButtonElement>('[data-journal-control="handle"]'))?.focus();
 },[orderKey]);

 function moveBy(cardId:ObservationId,direction:-1|1,control:string){
  if(readOnly)return;const from=order.indexOf(cardId),to=from+direction;if(from<0||to<0||to>=order.length)return;
  const next=[...order];next.splice(from,1);next.splice(to,0,cardId);focusAfter.current={id:cardId,control};onChange({type:'REORDER',order:next});
  setAnnouncement(cards[from]!.title+' moved '+(direction<0?'earlier.':'later.'));
 }
 function targetAt(x:number,y:number):Drop|null{
  const card=document.elementFromPoint(x,y)?.closest<HTMLElement>('[data-journal-card]');
  const target=card?.dataset['journalCard'];if(!card||!root.current?.contains(card)||!order.some(value=>value===target))return null;
  const box=card.getBoundingClientRect();return {id:target as ObservationId,edge:y<box.top+box.height/2?'before':'after'};
 }
 function beginDrag(event:PointerEvent<HTMLButtonElement>,cardId:ObservationId){
  if(readOnly||event.button!==0||order.length<2)return;
  event.currentTarget.focus();event.currentTarget.setPointerCapture(event.pointerId);
  drag.current={id:cardId,pointer:event.pointerId,x:event.clientX,y:event.clientY,moving:false};swallowClick.current=false;
 }
 function dragMove(event:PointerEvent<HTMLButtonElement>){
  const current=drag.current;if(!current||current.pointer!==event.pointerId)return;
  if(!current.moving&&Math.hypot(event.clientX-current.x,event.clientY-current.y)<6)return;
  current.moving=true;event.preventDefault();setDragging(current.id);setDrop(targetAt(event.clientX,event.clientY));
 }
 function endDrag(event:PointerEvent<HTMLButtonElement>,cancel=false){
  const current=drag.current;if(!current||current.pointer!==event.pointerId)return;
  const target=cancel?null:targetAt(event.clientX,event.clientY);drag.current=null;setDragging(null);setDrop(null);swallowClick.current=current.moving;
  if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  if(readOnly||!current.moving||!target||target.id===current.id)return;
  const next=order.filter(value=>value!==current.id),index=next.indexOf(target.id);if(index<0)return;
  next.splice(index+(target.edge==='after'?1:0),0,current.id);
  if(next.every((value,index)=>value===order[index]))return;
  focusAfter.current={id:current.id,control:'handle'};onChange({type:'REORDER',order:next});
  setAnnouncement(cards.find(card=>card.id===current.id)!.title+' moved '+target.edge+' '+cards.find(card=>card.id===target.id)!.title+'.');
 }

 return <section className="g-journal" ref={root} aria-labelledby={titleId}>
  <header className="g-journal-header">
   <div className="g-journal-heading"><span className="g-journal-mark" aria-hidden="true"><svg viewBox="0 0 56 64" focusable="false"><path d="M8 9q18-7 37 0v46q-19-6-37 0Z"/><path d="M14 7v47M22 36q-3-15 15-17-1 16-15 17Zm0 0 12-12M23 37l-2 8"/></svg></span><div><p className="g-journal-eyebrow">Pip’s notebook</p><h2 id={titleId}>{view==='journal'?'Moments and ideas':'My storyboard'}</h2></div></div>
   <button type="button" className="g-secondary" onClick={onClose}>Back to the adventure</button>
  </header>
  <ReadingParagraph>A notebook for moments you took part in. Add your own thoughts or arrange the cards whenever you like.</ReadingParagraph>
  <nav className="g-journal-tabs" aria-label="Notebook pages">
   <button type="button" aria-pressed={view==='journal'} onClick={()=>setView('journal')}>Observations and notes</button>
   <button type="button" aria-pressed={view==='storyboard'} onClick={()=>setView('storyboard')}>Arrange a storyboard</button>
  </nav>
  {view==='journal'&&<section className="g-journal-notes" aria-labelledby={notesId+'-heading'}>
   <h3 id={notesId+'-heading'}><ReadWords>My ideas and questions</ReadWords></h3>
   <label htmlFor={notesId}>Personal notes (optional)</label>
   <ReadingParagraph>These are your thoughts. You can change them whenever you like.</ReadingParagraph>
   <textarea id={notesId} readOnly={readOnly} value={journal.notes} maxLength={JOURNAL_NOTE_LIMIT} rows={4} onChange={event=>{if(!readOnly)onChange({type:'NOTES',text:event.currentTarget.value});}} aria-describedby={notesId+'-limit'} placeholder="I noticed… I wonder…"/>
   <p id={notesId+'-limit'} className="g-journal-small">Up to {JOURNAL_NOTE_LIMIT.toLocaleString('en-US')} characters.</p>
   {journal.notes.trim()&&<details className="g-journal-notes-reading"><summary>Read my notes with help</summary><ReadingParagraph className="g-journal-own-words" origin="child-draft" speech={{text:journal.notes,origin:'child-draft',speaker:'narrator',revision:journal.notes,owner:chapter.runId+':journal-notes'}}>{journal.notes}</ReadingParagraph><ReadingTools text={journal.notes} label="my notebook notes" origin="child-draft" speech={{text:journal.notes,origin:'child-draft',speaker:'narrator',revision:journal.notes,owner:chapter.runId+':journal-notes'}}/></details>}
  </section>}
  <div className="g-journal-card-heading"><h3><ReadWords>{view==='storyboard'?'Arrange the moments':'What happened'}</ReadWords></h3>
   {view==='storyboard'?<ReadingParagraph>Tell these moments in any order you like. Your storyboard is optional, and the adventure’s ending stays as you played it.</ReadingParagraph>:<ReadingParagraph>These cards remember completed actions and tellings. Related pages open with the usual reading help.</ReadingParagraph>}
  </div>
  {view==='storyboard'&&<div id={instructionsId} className="g-journal-instructions"><ReadingParagraph>Use Move earlier and Move later, or drag a card by its handle. You can also focus a handle and use the up and down arrow keys. New moments join the end of your arrangement.</ReadingParagraph></div>}
  {cards.length===0?<div className="g-journal-empty"><span aria-hidden="true">✧</span><ReadingParagraph>Your first moments will appear here as you take part in the adventure. You can write a thought now or return whenever you like.</ReadingParagraph></div>:<ol className={'g-journal-cards '+(view==='storyboard'?'is-storyboard':'')} aria-label={view==='storyboard'?'Your storyboard order':'Moments you took part in'}>
   {cards.map((card,index)=><li key={card.id} data-journal-card={card.id} className={'g-journal-card'+(dragging===card.id?' is-dragging':'')+(drop?.id===card.id&&dragging!==card.id?' drop-'+drop.edge:'')}>
    <div className="g-journal-card-top"><p className="g-journal-context">{card.context==='mara-story'?'In Mara’s earlier story':'In Pip’s adventure today'}</p>{view==='storyboard'&&<button type="button" className="g-journal-grip" data-journal-control="handle" aria-label={'Reorder '+card.title} aria-describedby={instructionsId} disabled={readOnly||cards.length<2}
     onPointerDown={event=>beginDrag(event,card.id)} onPointerMove={dragMove} onPointerUp={event=>endDrag(event)} onPointerCancel={event=>endDrag(event,true)} onLostPointerCapture={()=>{drag.current=null;setDragging(null);setDrop(null);}}
     onClick={()=>{if(swallowClick.current){swallowClick.current=false;return;}setAnnouncement('Use Move earlier and Move later, or the up and down arrow keys, for '+card.title+'.');}}
     onKeyDown={event=>{if(event.key==='Escape'){drag.current=null;setDragging(null);setDrop(null);}if(event.key==='ArrowUp'||event.key==='ArrowDown'){event.preventDefault();event.stopPropagation();moveBy(card.id,event.key==='ArrowUp'?-1:1,'handle');}}}><span aria-hidden="true">⠿</span><span>Move card</span></button>}</div>
    <h4><ReadWords>{card.title}</ReadWords></h4><ObservationPicture chapter={chapter} observation={card}/><ReadingParagraph>{card.text}</ReadingParagraph><ReadingTools text={card.title+'\n'+card.text} label={'notebook moment: '+card.title}/>
    {card.sources.length>0&&<div className="g-journal-references" role="group" aria-label={'Related reading for '+card.title}><p className="g-journal-small">Related reading</p>{card.sources.map(source=><button type="button" key={source} className="g-secondary" onClick={()=>onReadSource(source)}>{sources[source].title}</button>)}</div>}
    {view==='storyboard'&&<div className="g-journal-moves" role="group" aria-label={'Move '+card.title}><button type="button" data-journal-control="earlier" disabled={readOnly||index===0} aria-label={'Move '+card.title+' earlier'} onClick={()=>moveBy(card.id,-1,'earlier')}>↑ Move earlier</button><button type="button" data-journal-control="later" disabled={readOnly||index===cards.length-1} aria-label={'Move '+card.title+' later'} onClick={()=>moveBy(card.id,1,'later')}>↓ Move later</button></div>}
   </li>)}
  </ol>}
  <div className="g-journal-status" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
 </section>;
}
