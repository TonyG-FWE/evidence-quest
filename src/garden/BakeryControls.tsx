import type {GardenState,GardenStore,Point} from './model.js';
import {anchors} from './worldLayout.js';
import {BAKERY_APPROACH,BAKERY_SOL,TILE_SHELF,TILE_APPROACH,WORKSHOP_DOOR,bakeryInstruction,near,type BakeryStep} from './bakery.js';
export function BakeryActions({s,store}:{s:GardenState;store:GardenStore}){
 const c=s.chapter,b=c.bakery,busy=!!s.action||s.background||s.viewLost;
 const step=(step:BakeryStep)=>store.send({type:'BAKERY_STEP',step});
 const go=(point:Point,target:string)=>store.send({type:'GO',point,target});
 const talk=()=>store.send({type:'TALK',who:'rina'});
 return <div className="g-bakery-current">
  {b.stage==='arrival'&&<button className="g-primary" disabled={busy} onClick={talk}>Talk to Rina</button>}
  {b.stage==='needed'&&(near(c.pip,TILE_SHELF)?<button className="g-primary" disabled={busy} onClick={()=>step('PICKUP')}>Take the spare tile</button>:<button className="g-primary" disabled={busy} onClick={()=>go(TILE_APPROACH,'Rina’s tile shelf')}>Go to the tile shelf</button>)}
  {b.stage==='carried'&&(near(c.pip,BAKERY_SOL)?<button className="g-primary" disabled={busy} onClick={()=>step('DELIVER')}>Give the tile to Sol</button>:<button className="g-primary" disabled={busy} onClick={()=>go(BAKERY_APPROACH,'Sol beside the ladder')}>Bring the tile to Sol</button>)}
  {['delivered','gap','misplaced'].includes(b.stage)&&s.mode!=='bakery-repair'&&(near(c.pip,BAKERY_SOL)?<button className="g-primary" disabled={busy} onClick={()=>step('REPAIR')}>Direct Sol’s roof repair</button>:<button className="g-primary" disabled={busy} onClick={()=>go(BAKERY_APPROACH,'Sol beside the ladder')}>Return to Sol’s ladder</button>)}
  {s.mode==='bakery-repair'&&<>
   {b.stage==='delivered'&&<button className="g-primary" disabled={busy} onClick={()=>step('REMOVE')}>Remove the cracked tile</button>}
   {['gap','misplaced'].includes(b.stage)&&<><p className="g-small">Preview a position, then tell Sol to place the same tile.</p><div className="g-row">{(['gap','beside'] as const).map(position=><button key={position} className={position==='gap'?'g-primary':'g-alternative'} disabled={busy} aria-pressed={s.bakeryPreview===position} onClick={()=>store.send({type:'TILE_PREVIEW',position})}>{position==='gap'?'Over the opening':'Beside the opening'}</button>)}</div><button className="g-primary" disabled={busy||!s.bakeryPreview} onClick={()=>step('PLACE')}>Place the tile</button>{s.bakeryPreview&&<button className="g-secondary" disabled={busy} onClick={()=>store.send({type:'CANCEL'})}>Cancel placement</button>}</>}
   <button className="g-secondary" disabled={busy} onClick={()=>step('BACK')}>Back to Pip</button>
  </>}
  {b.stage==='sealed'&&<button className="g-primary" disabled={busy} onClick={()=>step('CHECK')}>Let Rina check the flour</button>}
  {['checked','mixed','shaped','baked'].includes(b.stage)&&(!near(c.pip,b.rina,1.65)?<button className="g-primary" disabled={busy} onClick={()=>go(b.rina,'Rina at the bakery')}>Go to Rina</button>:<button className="g-primary" disabled={busy} onClick={()=>step(b.stage==='checked'?'MIX':b.stage==='mixed'?'SHAPE':b.stage==='shaped'?'BAKE':'TAKE_LOAF')}>{b.stage==='checked'?'Make the dough with Rina':b.stage==='mixed'?'Shape the loaves':b.stage==='shaped'?'Bake the bread':'Take a loaf to thank Sol'}</button>)}
  {b.stage==='escorting'&&<>{near(c.pip,WORKSHOP_DOOR,1.6)&&near(b.rina,WORKSHOP_DOOR,1.8)?<button className="g-primary" disabled={busy} onClick={()=>step('THANK')}>Let Rina give Sol the loaf</button>:<button className="g-primary" disabled={busy} onClick={()=>go({x:anchors.workshop.person.x+.15,z:anchors.workshop.person.z+.90},'Sol’s workshop with Rina')}>Walk with Rina to the workshop</button>}{!near(c.pip,b.rina,1.65)&&<button className="g-secondary" disabled={busy} onClick={()=>go(b.rina,'Rina, who is waiting with the loaf')}>Go back to Rina</button>}<p className="g-small">Rina waits if you leave this path. The loaf stays with her.</p></>}
  </div>;
}
export function BakeryControls({s,store}:{s:GardenState;store:GardenStore}){
 const c=s.chapter,b=c.bakery,busy=!!s.action||s.background||s.viewLost;
 return <aside className="garden-bakery-controls" aria-label="Help at Rina’s bakery" tabIndex={-1}>
  <p className="g-kicker">{s.mode==='bakery-repair'?'DIRECT SOL’S REPAIR':'PIP’S VISIT TODAY'}</p><h2>{b.stage==='escorting'?'Walk with Rina':'Rina’s bakery'}</h2><p>{bakeryInstruction(s)}</p>
  <div className="g-bakery-actions">
   {b.stage==='mixed'&&near(c.pip,b.rina,1.65)&&<button className="g-alternative" disabled={busy} onClick={()=>store.send({type:'BAKERY_STEP',step:'BAKE_UNSHAPED'})}>Try baking the whole lump</button>}
   {b.met&&b.stage!=='arrival'&&s.mode==='walk'&&<button className="g-secondary" disabled={busy} onClick={()=>store.send({type:'TALK',who:'rina'})}>Talk with Rina about what happens next</button>}
   {b.met&&<button className="g-secondary" disabled={busy} onClick={()=>store.send({type:'OPEN',panel:'bakery'})}>Read the bakery account</button>}
  </div><p className="g-small">{s.mode==='bakery-repair'?'You choose the position. Sol uses his ladder and tools; Pip waits beside him.':'Guide Pip with the arrow keys or click a place. Your actions happen here in the garden.'}</p>
 </aside>;
}
