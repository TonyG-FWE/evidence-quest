import type {GardenState,GardenStore,Point} from './model.js';
import {availableHands,handDefinitions,type HandObject} from './hands.js';
import {postPoint,ropeTarget,sectionPlacementTargets,type BridgePostId,type RopeSide} from './bridgeConstruction.js';
import {plantingGuidance,plantingPlacement,plantingNearby} from './plantingControls.js';
import {bakeryPointerContext,bakeryPointerHint} from './bakeryInteraction.js';

/** Native inputs dispatch exactly the same gesture commands as the scene. */
export function HandControls({s,store}:{s:GardenState;store:GardenStore}){
 const objects=availableHands(s),gesture=s.gesture;
 const bakery=bakeryPointerContext(s);
 if(s.panel||s.activity||s.mode==='workbench'||(!objects.length&&!gesture&&!bakery))return null;
 const move=(x:number,z:number)=>{const g=store.getSnapshot().gesture;if(g)store.send({type:'HAND_MOVE',point:{x:g.point.x+x,z:g.point.z+z}});};
 const choose=(id:HandObject)=>{if(store.getSnapshot().gesture?.object===id){store.send({type:'HAND_RELEASE'});return;}if(store.getSnapshot().gesture)store.send({type:'HAND_CANCEL'});store.send({type:'HAND_BEGIN',object:id});};
 const place=(point:Point)=>{store.send({type:'HAND_MOVE',point});store.send({type:'HAND_RELEASE'});};
 const planting=plantingNearby(s),plant=planting?plantingPlacement(s):null;
 const plantHere=()=>{if(!plant)return;if(!store.getSnapshot().gesture)store.send({type:'HAND_BEGIN',object:plant.object});if(store.getSnapshot().gesture?.object!==plant.object)return;for(const point of plant.path)store.send({type:'HAND_MOVE',point});store.send({type:'HAND_RELEASE'});};
 const targetOptions=gesture?.object.startsWith('section:')?sectionPlacementTargets(s.chapter,gesture.object==='section:a'?'a':'b'):gesture?.object.startsWith('post:')?[{label:'Set post in its socket',point:postPoint(s.chapter,gesture.object.slice(5) as BridgePostId)}]:gesture?.object==='rope:north'||gesture?.object==='rope:south'?[{label:'Wrap and tighten at the next post',point:postPoint(s.chapter,ropeTarget(s.chapter,gesture.object.slice(5) as RopeSide))}]:gesture?.object==='rope-box'?[{label:'Take the ropes to Pip',point:s.chapter.pip}]:[];
 // Explicit screen inspection includes visible controls. Conversation playback
 // selects narrative passages separately and never reads these instructions.
 return <aside className="garden-hands" aria-label="Handle nearby objects">
  <p>{planting?plantingGuidance(s.chapter):bakery?bakeryPointerHint(s):gesture?handDefinitions[gesture.object].instruction:'Drag an object, then release to place it. Click a deck or the ground to walk. You can leave a repair unfinished.'}</p>
  {plant&&(!gesture||gesture.object===plant.object)&&<button className="g-primary" disabled={!!s.action||s.background||s.viewLost} onClick={plantHere}>{plant.label}</button>}
  <details name="garden-physical-controls"><summary>Keyboard and precise controls</summary>
   <p className="g-small">Choose an object and its destination, or move it with the arrow keys. Hold Shift for smaller moves. Q and R turn it. Enter releases it. Escape cancels.</p>
   <div className="g-row">{objects.map(id=><button key={id} data-hand-object={id} aria-pressed={gesture?.object===id} onClick={()=>choose(id)}>{handDefinitions[id].label}</button>)}</div>
   {gesture&&<>
    {targetOptions.length>0&&<div className="g-row" aria-label="Place held bridge material">{targetOptions.map(target=><button key={target.label} onClick={()=>place(target.point)}>{target.label}</button>)}</div>}
    <div className="g-row" aria-label="Move held object"><button onClick={()=>move(-.1,0)} aria-label="Move held object left">←</button><button onClick={()=>move(0,-.1)} aria-label="Move held object away">↑</button><button onClick={()=>move(0,.1)} aria-label="Move held object nearer">↓</button><button onClick={()=>move(.1,0)} aria-label="Move held object right">→</button><button onClick={()=>store.send({type:'HAND_ROTATE',direction:-1})}>Turn left</button><button onClick={()=>store.send({type:'HAND_ROTATE',direction:1})}>Turn right</button></div>
    <div className="g-row"><button className="g-primary" onClick={()=>store.send({type:'HAND_RELEASE'})}>Release object</button><button onClick={()=>store.send({type:'HAND_CANCEL'})}>Cancel gesture</button></div>
    <p className="g-small">{handDefinitions[gesture.object].recovery}</p>
   </>}
  </details>
 </aside>;
}
