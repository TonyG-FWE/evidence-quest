import type {GardenState,GardenStore} from './model.js';
import {atMooring} from './river.js';
export function BoatControls({s,store}:{s:GardenState;store:GardenStore}){
 const c=s.chapter,loaded=c.river.boat.phase==='loaded',busy=!!s.action||s.background||s.viewLost;
 const move=(x:number,z:number)=>{const position=store.getSnapshot().chapter.river.boat.position;store.send({type:'STEER',point:{x:position.x+x,z:position.z+z}});};
 return <aside className="garden-builder garden-boat-controls" aria-label="Steer the seed boat">
  <span className="g-kicker">YOU STEER THE SEED BOAT</span><h2>Bring the seed<br/>to Grandma.</h2>
  <p>Pip waits on the bank. The seed stays aboard until someone takes it out.</p>
  {loaded?<button className="g-primary" disabled={busy} onClick={()=>store.send({type:'LAUNCH_BOAT'})}>Launch the seed boat</button>:<>
   <p>Drag to guide the boat through open water. Release to stop. You can also use the arrow keys or direction buttons. Steer around rocks to the blue landing.</p>
   <div className="g-boat-directions" aria-label="Move the boat through the water">
    <button disabled={busy} onClick={()=>move(0,-.55)}>Upstream ↑</button><button disabled={busy} onClick={()=>move(-.55,0)}>← Dock side</button><button disabled={busy} onClick={()=>move(.55,0)}>Garden side →</button><button disabled={busy} onClick={()=>move(0,.55)}>Downstream ↓</button>
   </div>
   <button className="g-primary" disabled={busy} onClick={()=>store.send({type:'DOCK_SEED'})}>{atMooring(c,'east')?'Give the seed to Grandma':'Try docking at Grandma’s landing'}</button>
  </>}
  <button className="g-secondary" disabled={busy} onClick={()=>store.send({type:'UNLOAD_SEED'})}>{atMooring(c,'west')?'Unload the seed at Pip’s launch':'I want to bring the seed back'}</button>
  <p className="g-small">To carry the seed instead, steer back to the yellow launch and unload it. Help and Pause keep the boat where it is.</p>
 </aside>;
}
