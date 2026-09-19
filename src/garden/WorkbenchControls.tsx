import {useEffect,useRef} from 'react';
import type {GardenState,GardenStore} from './model.js';
import {storyboardFor} from './journal.js';
import {cardSlot,nearestCardSlot} from './workbench.js';

export function WorkbenchControls({s,store}:{s:GardenState;store:GardenStore}){
 const root=useRef<HTMLElement>(null),cards=storyboardFor(s.chapter,s.chapter.journal),held=s.cardGesture;
 useEffect(()=>{root.current?.querySelector<HTMLButtonElement>('button')?.focus();},[]);
 function move(direction:number){if(!held)return;const next=Math.max(0,Math.min(cards.length-1,nearestCardSlot(held.point,cards.length)+direction));store.send({type:'CARD_MOVE',point:cardSlot(next)});}
 return <aside className="garden-workbench" aria-label="Sol’s picture workbench" ref={root} hidden={!!s.panel}>
  <h2>Moments on Sol’s workbench</h2><p>Drag a picture to put it earlier or later in your telling. The storyboard is optional.</p>
  {held&&<p role="status">{cards.find(c=>c.id===held.id)?.title} · Place {nearestCardSlot(held.point,cards.length)+1}</p>}
  {!cards.length&&<p>Pictures appear here after you take part in an event. You can return whenever you like.</p>}
  <div className="g-row"><button onClick={()=>store.send({type:'BACK'})}>Leave the workbench</button><button onClick={()=>store.send({type:'OPEN',panel:'storyboard'})}>Read these moments with help</button></div>
  <details><summary>Keyboard and picture controls</summary><p>Choose a picture. Arrow keys move it; Enter places it. Escape returns it to its previous place.</p>
   <ol>{cards.map((card,index)=><li key={card.id}><button data-workbench-card={card.id} aria-pressed={held?.id===card.id} disabled={!!held&&held.id!==card.id} onClick={()=>store.send(held?.id===card.id?{type:'CARD_PLACE'}:{type:'CARD_PICK',id:card.id})}>{index+1}. {card.title}</button></li>)}</ol>
   {held&&<div className="g-row"><button onClick={()=>move(-1)}>Move picture earlier</button><button onClick={()=>move(1)}>Move picture later</button><button onClick={()=>store.send({type:'CARD_PLACE'})}>Place picture</button><button onClick={()=>store.send({type:'CARD_CANCEL'})}>Cancel picture move</button></div>}
  </details>
 </aside>;
}
