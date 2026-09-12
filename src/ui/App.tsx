import {useEffect,useLayoutEffect,useRef,useSyncExternalStore} from 'react';
import type {Draft,Order} from '../../contracts/types.js';
import {store,saves} from '../controller.js';
import {content,copy,parts,tileName} from '../core/content.js';
import {available,displayedText,exposedRefs,sourceOf} from '../core/evidence.js';
import type {State,View} from '../core/state.js';
import {atWork} from '../core/reducer.js';
import {ownerRoom} from '../physical/navigation.js';
import {initialPuppet,storyDescription} from '../story/engine.js';
import {World} from '../world/World.js';
import {assetUrl} from '../world/assets.js';
import {Button} from './primitives.js';
import {Reader} from './Reader.js';
import {Sprite} from './Sprite.js';
import {Help,VisibleHelp} from './Help.js';
import {Home,SaveStatus} from './SaveViews.js';
import {StoryCanvas} from './StoryCanvas.js';
import {Ending} from './Ending.js';
import {RoomDescription} from './RoomDescription.js';
import {Passage} from './Passage.js';
import {goal,localOwners,ownerLabel,roomName} from './labels.js';
import {Intro,Recap,Reading,Words,CrewText,Portrait,NarratorCard,Support,showReading} from './Experience.js';
import {roles,roomPurposes} from '../core/experience.js';
import {Compare,Ideas,Timeline,Picker,Lead,NotesTabs,ExposedDetails} from './Reasoning.js';
import {questionIds} from '../core/reasoning.js';
import './app.css';
const send=store.send;
let invoker:HTMLElement|null=null;
const open=(view:View)=>{if(store.getSnapshot().runtime.view.page==='world'&&view.page!=='world')invoker=document.activeElement instanceof HTMLButtonElement?document.activeElement:null;send({type:'VIEW',view});};
function Lines({ids,slots={}}:{ids:string[];slots?:Record<string,string|number>}){return <>{ids.map((id,index)=><p key={`${id}-${index}`}>{copy(id,slots)}</p>)}</>;}
function Captions({s}:{s:State}){return <>{s.runtime.caption.map((ct,index)=>{const refs=[...parts.values()].filter(p=>p.ctId===ct&&available(s.case,p.refId)).map(p=>p.refId),access=s.case.grants.find(g=>g.refs.some(r=>refs.includes(r)))?.viaAccessId;return refs.length&&access?<Passage key={`${ct}-${index}`} ct={ct} refs={refs} access={access} store={store}/>:<p key={`${ct}-${index}`}>{copy(ct,s.runtime.captionSlots)}</p>;})}</>;}
function Heading({ct}:{ct:string}){return <h2 tabIndex={-1} data-focus-heading>{copy(ct)}</h2>;}
function Details({s,draft,onChange}:{s:State;draft:Draft;onChange:(refs:string[])=>void}){
 return <ExposedDetails s={s} draft={draft} onChange={onChange} open={open}/>;
}
function Kit({s}:{s:State}){
 const p=s.case.physical;const local=ownerRoom(s.case,'KIT.CADDY')===p.room;
 return <><Heading ct="CT.KIT.TITLE"/><p>{copy(p.caddyHost==='ACT.PLAYER'?'CT.KIT.CARRIED':p.caddyHost==='ST.RACK.BAY'?'CT.KIT.AT_STAGE':'CT.KIT.CONTENTS')}</p>
  {local?<><div className="native-rack">{(['BLOOM','FERRY','PLANT','BRIDGE'] as const).map(t=><Button key={t} onClick={()=>send({type:'TARGET',target:`TILE.${t}`})}><Sprite className="tile-icon" id={`ASSET.TILE.${t}`}/>{tileName(`TILE.${t}`)}</Button>)}</div>
  <div className="actions"><Button data-focus-owner="KIT.NOTE.E6" ct="CT.KIT.NOTE_JO" onClick={()=>send({type:'TARGET',target:'KIT.NOTE.E6'})}/><Button data-focus-owner="KIT.NOTE.E7" ct="CT.KIT.NOTE_REMY" onClick={()=>send({type:'TARGET',target:'KIT.NOTE.E7'})}/></div>
  {p.caddyHost==='MD.RACK.STATION'&&<Button className="primary" ct="CT.KIT.COLLECT" onClick={()=>send({type:'TARGET',target:'KIT.CADDY',action:'collect'})}/>}</>:null}
  {p.caddyHost==='ACT.PLAYER'&&p.room==='SC.ST'&&<Button className="primary" ct="CT.KIT.HANDOFF" onClick={()=>send({type:'TARGET',target:'ST.RACK.BAY'})}/>}
 </>;
}
function positionWatchedStory(){
 const state=store.getSnapshot();
 if(state.runtime.view.page!=='work'||state.session.presentation!=='watch'||document.activeElement?.matches('textarea,input,select,[contenteditable=true]'))return;
 const story=document.querySelector<HTMLElement>('[data-testid="whole-story"]');if(!story)return;
 if(matchMedia('(max-width:900px), (max-height:600px)').matches){
  const dock=document.querySelector<HTMLElement>('.world-dock'),top=(dock?.getBoundingClientRect().height??0)+16;
  window.scrollTo({top:Math.max(0,window.scrollY+story.getBoundingClientRect().top-top),left:0,behavior:'instant'});
 }else story.scrollIntoView({block:'start'});
}
function Work({s}:{s:State}){
 const c=s.case,p=c.physical,r=c.playback,h=s.session.heldTile,mode=r?.mode==='show'?'Premiere':'Rehearsal',modeLower=mode.toLowerCase();
 useLayoutEffect(()=>{
  if(s.session.presentation!=='watch'||!matchMedia('(max-width:900px), (max-height:600px)').matches)return;
  const show=document.querySelector<HTMLElement>('.narrated-show'),caption=show?.querySelector<HTMLElement>('.local-feedback');if(!show||!caption)return;
  const measure=()=>{show.style.setProperty('--watch-caption-height',`${caption.getBoundingClientRect().height}px`);requestAnimationFrame(positionWatchedStory);};
  const observer=new ResizeObserver(measure);observer.observe(caption);measure();return()=>observer.disconnect();
 },[s.session.presentation]);
 const tileLayout=useRef<{order:string;boxes:Map<string,DOMRect>}>({order:p.order.join(),boxes:new Map()});
 useLayoutEffect(()=>{
  const before=tileLayout.current,order=p.order.join(),boxes=new Map<string,DOMRect>();
  for(const el of document.querySelectorAll<HTMLElement>('[data-tile]')){
   const key=el.dataset.tile!,rect=el.getBoundingClientRect();boxes.set(key,rect);const old=before.boxes.get(key);
   if(old&&before.order!==order&&s.preferences.motion!=='reduced'){
    const dx=old.left-rect.left,dy=old.top-rect.top,arc=dx<0?-3:3;
    el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:`translate(${dx/2}px,${dy/2+arc}px)`},{transform:'translate(0,0)'}],{duration:180,easing:'ease-out'});
   }
  }
  tileLayout.current={order,boxes};
 },[p.order.join(),h?.tile,s.session.presentation,s.preferences.motion]);
 useEffect(()=>{
  if(s.session.presentation!=='watch')return;
  const frame=requestAnimationFrame(positionWatchedStory);
  return()=>cancelAnimationFrame(frame);
 },[s.session.presentation,r?.id,r?.status,r?.pauseReason]);
 const previousHeld=useRef<string|null>(null);useEffect(()=>{if(previousHeld.current&&!h)document.querySelector<HTMLButtonElement>(`[data-tile="${previousHeld.current}"]`)?.focus({preventScroll:true});previousHeld.current=h?.tile??null;},[h]);
 const choose=(tile:Order[number])=>send({type:'SELECT_TILE',tile});
 const place=(index:number)=>send({type:'EDIT_RAIL',operation:'insert',index});
 return <>{s.session.presentation!=='watch'&&<div className="caption local-feedback" role="status"><Captions s={s}/></div>}<Heading ct="CT.RAIL.TITLE"/><CrewText ct="CT.ER13.REHEARSAL_CONTEXT" s={s}/>
  <div className="actions"><Button ct="CT.RAIL.ARRANGE_MODE" aria-pressed={s.session.presentation==='arrange'} onClick={()=>send({type:'PRESENTATION',mode:'arrange'})}/><Button ct={r?.mode==='show'?'CT.RAIL.WATCH_SHOW':'CT.RAIL.WATCH'} aria-pressed={s.session.presentation==='watch'} onClick={()=>{send({type:'PRESENTATION',mode:'watch'});requestAnimationFrame(positionWatchedStory);}}/></div>
  {s.session.presentation==='watch'?<>{['docked','projecting'].includes(p.loop.mode)?<div className="narrated-show"><StoryCanvas s={s}/><div className="caption local-feedback" role="status"><Captions s={s}/></div><NarratorCard s={s}/></div>:<p>{copy('CT.WORK.MISSING_LOOP')}</p>}</>:<><NarratorCard s={s}/>
  {p.caddyHost!=='ST.RACK.BAY'?<><p>{copy('CT.WORK.MISSING_KIT')}</p>{p.caddyHost==='ACT.PLAYER'&&<Button ct="CT.KIT.HANDOFF" onClick={()=>send({type:'TARGET',target:'ST.RACK.BAY'})}/>}</>:<>
   {!['docked','projecting'].includes(p.loop.mode)&&<p>{copy('CT.WORK.MISSING_LOOP')}</p>}
   <p>{copy('CT.RAIL.HELP')}</p>
   <div className="native-rail" data-testid="rail" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();place(p.order.length);}}>
    {!p.order.length&&<p>{copy('CT.WORK.EMPTY')}</p>}
    {p.order.map((tile,i)=><Button key={tile} data-tile={tile} aria-pressed={h?.tile===tile} draggable onDragStart={()=>choose(tile)} onDragEnd={()=>send({type:'CANCEL_TILE',invalid:true})} onClick={()=>choose(tile)} onDrop={e=>{e.preventDefault();e.stopPropagation();send({type:'EDIT_RAIL',operation:store.getSnapshot().session.heldTile?.origin==='rail'?'swap':'replace',index:i});}}><Sprite className="tile-icon" id={'ASSET.'+tile}/>{copy('CT.RAIL.POSITION',{tile:tileName(tile),position:i+1})}</Button>)}
   </div>
   <div className="native-rack" data-testid="rack" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();send({type:'EDIT_RAIL',operation:'return',index:0});}}>{(['TILE.BLOOM','TILE.FERRY','TILE.PLANT','TILE.BRIDGE'] as const).filter(t=>!p.order.includes(t)).map(tile=><Button key={tile} data-tile={tile} draggable onDragStart={()=>choose(tile)} onDragEnd={()=>send({type:'CANCEL_TILE',invalid:true})} aria-pressed={h?.tile===tile} onClick={()=>choose(tile)}><Sprite className="tile-icon" id={'ASSET.'+tile}/>{copy('CT.RAIL.SELECT',{tile:tileName(tile)})}</Button>)}</div>
   {h&&<section className="tile-actions"><h3>{copy('CT.RAIL.CHOOSE',{tile:tileName(h.tile)})}</h3><div className="actions">
    <Button ct="CT.RAIL.AT_START" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();place(0);}} onClick={()=>place(0)}/>{h.origin==='rail'&&<><Button ct="CT.RAIL.LEFT" onClick={()=>send({type:'EDIT_RAIL',operation:'left',index:0})}/><Button ct="CT.RAIL.RIGHT" onClick={()=>send({type:'EDIT_RAIL',operation:'right',index:0})}/></>}
    {p.order.filter(t=>t!==h.tile).map(tile=>{const i=p.order.indexOf(tile),name=tileName(tile);return <div key={tile} className="stack"><Button ct="CT.RAIL.BEFORE" slots={{neighbor:name}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();place(i);}} onClick={()=>place(i)}/><Button ct="CT.RAIL.AFTER" slots={{neighbor:name}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();send({type:'EDIT_RAIL',operation:'after',index:i});}} onClick={()=>send({type:'EDIT_RAIL',operation:'after',index:i})}/><Button ct={h.origin==='rail'?'CT.RAIL.SWAP':'CT.RAIL.REPLACE'} slots={{other:name}} onClick={()=>send({type:'EDIT_RAIL',operation:h.origin==='rail'?'swap':'replace',index:i})}/></div>;})}
    {h.origin==='rail'&&<Button ct="CT.RAIL.RETURN" slots={{tile:tileName(h.tile)}} onClick={()=>send({type:'EDIT_RAIL',operation:'return',index:0})}/>}
    <Button ct="CT.OBJ.INSPECT_TILE" slots={{tile:tileName(h.tile)}} onClick={()=>send({type:'TARGET',target:h.tile})}/><Button ct="CT.RAIL.CANCEL" onClick={()=>send({type:'CANCEL_TILE'})}/>
   </div></section>}
   <div className="actions"><Button data-focus-owner="KIT.NOTE.E6" ct="CT.KIT.NOTE_JO" onClick={()=>send({type:'TARGET',target:'KIT.NOTE.E6'})}/><Button data-focus-owner="KIT.NOTE.E7" ct="CT.KIT.NOTE_REMY" onClick={()=>send({type:'TARGET',target:'KIT.NOTE.E7'})}/></div>
  </>}
  </>}
  {r?.status==='paused'&&r.nextCue>0&&r.order[r.nextCue-1]==='TILE.PLANT'&&r.puppet.pip==='left'&&<Support s={s} id="CT.ER13.PROMISE_SUPPORT"/>}
  {c.certificate&&<><p>{c.premiere?'Replay our show.':'Put on our first show.'}</p><CrewText ct={c.premiere?'CT.ER13.REPLAY_CONTEXT':'CT.ER13.PREMIERE_CONTEXT'} s={s}/></>}
  {r&&<div className="run-status" aria-live="polite"><p>{copy(r.status==='paused'?(r.nextCue===r.order.length?'CT.RUN.TERMINAL':'CT.RUN.PAUSED'):r.status==='finalized'?'CT.RUN.FINISHED':'CT.RUN.TITLE',{mode,modeLower})}</p>{r.activeCue&&<p>{copy('CT.RUN.CURRENT',{tile:tileName(r.activeCue.tile)})}</p>}{r.status==='paused'&&r.order[r.nextCue]&&<p>{copy('CT.RUN.NEXT',{nextTile:tileName(r.order[r.nextCue]!)})}</p>}</div>}
  <div className="actions">
   {r?.status==='running'?<Button className="sun" ct="CT.RUN.STOP" icon="STOP" onClick={()=>send({type:'PAUSE_RUN',reason:'user'})}/>:r?.status==='paused'?<Button className="primary" ct={r.nextCue===r.order.length?'CT.RUN.FINALIZE':'CT.RUN.CONTINUE'} slots={{modeLower}} onClick={()=>send({type:'CONTINUE_RUN'})}/>:<Button className="primary" ct="CT.WORK.REHEARSE" icon="PLAY" onClick={()=>send({type:'RUN',mode:'rehearsal'})}/>}
   <Button ct={c.certificate?.arrangementRevision===p.arrangementRevision?(c.premiere?'CT.WORK.REPLAY':'CT.WORK.LAUNCH'):'CT.WORK.PREVIEW'} onClick={()=>c.certificate?send({type:'RUN',mode:'show'}):send({type:'TARGET',target:'ST.CONTROL.SHOW'})}/>
   {r&&<Button ct="CT.RUN.RESTART" slots={{modeLower}} onClick={()=>send({type:'RESTART_RUN'})}/>}
   <Button ct="CT.STORY.OPEN" onClick={()=>open({page:'story'})}/><Button ct="CT.WORK.MORE" onClick={()=>open({page:'confirm',action:'more',previous:{page:'work'}})}/>
   <Button ct="CT.PLAN.STORY" onClick={()=>open({page:'plan',topic:'story'})}/><Button ct="CT.UI.HELP" onClick={()=>open({page:'help',topic:'story'})}/>
  </div>
 </>;
}
function Talk({s}:{s:State}){
 const v=s.runtime.view,actor=v.actor!,isJo=actor==='ACT.JO',isRemy=actor==='ACT.REMY',topics=isJo?['ROLE','LOOP','CANCELED','JO_NOTE','HELP','DIRECT']:isRemy?['CANCELED','REMY_NOTE','CLIP','HELP']:['LOOP','CANCELED','REQUEST','FILMING','WAIT','SLATE','NOTES','MATERIALS'];
 return <><div className="speaker"><Portrait actor={actor}/><h2 tabIndex={-1} data-focus-heading>{ownerLabel(s.case,actor)}<small>{roles[actor]}</small></h2></div>
  {v.dialogue?.map((ct,i)=>{
   const canonical=ct==='CT.ARI.FILMING_AFTER'?'CT.SRC.E5.B':ct,refs=[...parts.values()].filter(p=>p.ctId===canonical&&available(s.case,p.refId)).map(p=>p.refId);
   const access=s.case.grants.find(g=>g.refs.some(r=>refs.includes(r))&&(ct!=='CT.ARI.FILMING_AFTER'||g.viaAccessId==='NPC.ARI.FILMING_AFTER'))?.viaAccessId;
   return s.runtime.npcHelp?.ct===ct?<VisibleHelp key={s.runtime.npcHelp.id} ids={[ct]} onVisible={()=>send({type:'NPC_HELP_DISPLAY',id:s.runtime.npcHelp!.id})}/>:refs.length&&access?<Passage key={i} ct={canonical} refs={refs} access={access} store={store} {...(ct==='CT.ARI.FILMING_AFTER'?{range:[0,Array.from(copy(ct)).length] as [number,number]}:{})}/>:<CrewText key={i} ct={ct} s={s}/>;
  })}
  {v.dialogue?.includes('CT.SRC.E6')&&<Button onClick={()=>showReading(s,'READ.PROMISE')}>Read with the crew</Button>}
  {v.selected?.map(r=><blockquote key={r}>{displayedText(s.case,r)}</blockquote>)}
  <div className="stack">{topics.map(t=><Button key={t} ct={`CT.TALK.${t}`} onClick={()=>send({type:'TALK',topic:`CT.TALK.${t}`})}/>)}</div>
  <div className="actions"><Button ct="CT.PRESENT.OPEN" onClick={()=>open({page:'present',actor,selected:[]})}/>{isJo&&<Button ct="CT.PLAN.STORY" onClick={()=>open({page:'plan',topic:'story'})}/>}</div>
 </>;
}
function Panel({s}:{s:State}){
 const v=s.runtime.view,c=s.case,p=c.physical;
 switch(v.page){
 case 'intro':return <Intro s={s}/>;
 case 'recap':return <Recap s={s}/>;
 case 'reading':return <Reading s={s}/>;
 case 'words':return <Words s={s}/>;
 case 'compare':return <Compare s={s} open={open}/>;
 case 'timeline':return <Timeline s={s} open={open}/>;
 case 'idea':return <Ideas s={s} open={open}/>;
 case 'picker':return <Picker s={s} open={open}/>;
 case 'objects':return <><Heading ct="CT.UI.MOVE"/><RoomDescription s={s}/><p>{copy('CT.WORLD.LOCAL_LIST',{room:roomName(p.room)})}</p><div className="stack">{localOwners(c).filter(o=>!v.selected||v.selected.includes(o.id)).map(o=><Button data-owner={o.id} key={o.id} onClick={()=>send({type:'TARGET',target:o.id})}>{ownerLabel(c,o.id)}</Button>)}</div></>;
 case 'map':return <><Heading ct="CT.UI.MAP"/>{content.rooms.map(room=><section className={c.reasoning?.leadDestination===room.id?'venue chosen-destination':'venue'} aria-current={c.reasoning?.leadDestination===room.id?'location':undefined} key={room.id}><h3>{roomName(room.id)}</h3><Passage ct={`CT.NAV.${room.id==='SC.MD'?'MEDIA':room.id.slice(3)}`} refs={[`NAV.${room.id==='SC.MD'?'MEDIA':room.id.slice(3)}`]} access="ACC.VENUE" store={store}/><Button ct="CT.WORLD.GO" slots={{room:roomName(room.id)}} disabled={room.id===p.room} onClick={()=>send({type:'GO',destination:room.id})}/></section>)}</>;
 case 'reader':return <Reader state={s} store={store}/>;
 case 'notice':return <><Heading ct="CT.OBJ.NOTICE_CURLED"/><Passage ct="CT.OBJ.NOTICE_PARTIAL" refs={['CT.OBJ.NOTICE_PARTIAL']} access="CY.SOURCE.E3" store={store}/><Button className="primary" ct="CT.OBJ.NOTICE_FLATTEN" onClick={()=>send({type:'TARGET',target:'CY.SOURCE.E3',action:'flatten'})}/></>;
 case 'notes':{const ids=[...new Set(c.grants.map(g=>g.sourceId))];return <><Heading ct="CT.UI.NOTES"/><NotesTabs s={s} open={open}/><Button onClick={()=>open({page:'words',previous:v})}>Words from our story</Button>{!ids.length?<p>{copy('CT.NOTES.EMPTY')}</p>:<div className="stack">{ids.map(id=><Button key={id} onClick={()=>open({page:'reader',sourceId:id,accessId:`ACC.EVIDENCE.${id}`,previous:v})}>{copy(content.sources.find(s=>s.id===id)!.titleCt)}</Button>)}</div>}<div className="actions"><Button ct="CT.PRESENT.OPEN" onClick={()=>open({page:'present',selected:[]})}/><Button ct="CT.PLAN.SEARCH" onClick={()=>open({page:'plan',topic:'search'})}/></div></>;}
 case 'kit':return <Kit s={s}/>;
 case 'work':return <Work s={s}/>;
 case 'story':return <><Heading ct="CT.STORY.TITLE"/>{p.loop.mode==='standby'||p.loop.mode==='following'?<p>{copy('CT.WORK.MISSING_LOOP')}</p>:<><StoryCanvas s={s}/><Lines ids={storyDescription(c.playback?.puppet??initialPuppet())}/></>}</>;
 case 'talk':return <Talk s={s}/>;
 case 'plan':{const topic=v.topic??'search',d=c.drafts.find(d=>d.id===`${topic}-plan`)!;return <><Heading ct={topic==='story'?'CT.PLAN.STORY':'CT.PLAN.SEARCH'}/><label className="stack">{copy('CT.HELP.FIELD')}<textarea aria-label={copy(topic==='story'?'CT.PLAN.STORY':'CT.PLAN.SEARCH')} value={d.text} onFocus={()=>send({type:'FOCUS',owner:'text'})} onChange={e=>send({type:'DRAFT',id:d.id,text:e.target.value})}/></label>{Array.from(d.text).length>=500&&<p>{copy('CT.UI.COUNT',{count:Array.from(d.text).length})}</p>}<Details s={s} draft={d} onChange={refs=>send({type:'DRAFT',id:d.id,text:d.text,refs})}/><div className="actions"><Button ct="CT.PLAN.RECORD" onClick={()=>send({type:'RECORD_PLAN',topic})}/>{topic==='story'&&<Button ct="CT.PLAN.EXPLAIN" onClick={()=>send({type:'DELIVER_PLAN',topic})}/>}</div>{v.action==='recorded'&&<p>{copy('CT.PLAN.RECORDED')}</p>}</>;}
 case 'present':{const draft:Draft={id:'private',text:'',revision:0,selectedRefs:v.selected??[]},actors=c.encounteredActors.filter(a=>a!=='ACT.LOOP') as Array<'ACT.JO'|'ACT.REMY'|'ACT.ARI'>;return <><Heading ct="CT.PRESENT.OPEN"/><Details s={s} draft={draft} onChange={refs=>open({...v,selected:refs})}/><p>{copy('CT.PRESENT.WHO')}</p><div className="stack">{actors.filter(a=>ownerRoom(c,a)===p.room).map(actor=><Button key={actor} ct="CT.PRESENT.SHOW" slots={{person:ownerLabel(c,actor)}} disabled={!draft.selectedRefs.length} onClick={()=>send({type:'PRESENT',actor,refs:draft.selectedRefs})}/>)}</div>{!actors.some(a=>ownerRoom(c,a)===p.room)&&<p>{copy('CT.PRESENT.NO_RECIPIENT')}</p>}<p>{copy('CT.PRESENT.MET')}</p>{actors.filter(a=>ownerRoom(c,a)!==p.room).map(a=><p key={a}>{ownerLabel(c,a)} · {roomName(ownerRoom(c,a)!)}</p>)}</>;}
 case 'lead':return <Lead s={s} open={open}/>;
 case 'help':{const topic=v.topic??(c.selectedLead==='story-plan'?'story':'search'),d=c.drafts.find(d=>d.id===`coach-${topic}`)!;return <Help s={s} store={store} open={open} details={<Details s={s} draft={d} onChange={refs=>send({type:'DRAFT',id:d.id,text:d.text,refs})}/>}/>;}
 case 'goal':return <><Heading ct="CT.UI.GOAL"/><p>{copy(goal(c))}</p>{c.selectedLead&&<p>{copy('CT.GOAL.QUESTION',{question:copy(questionIds[c.selectedLead])})}</p>}{c.reasoning?.leadDestination&&<Button ct="CT.WORLD.GO" slots={{room:roomName(c.reasoning.leadDestination)}} disabled={c.reasoning.leadDestination===p.room} onClick={()=>send({type:'GO',destination:c.reasoning!.leadDestination!})}/>}<Button onClick={()=>open({page:'recap',previous:v})}>Our story so far</Button><div className="actions"><Button ct="CT.LEAD.CHOOSE" onClick={()=>open({page:'lead'})}/><Button ct="CT.PLAN.SEARCH" onClick={()=>open({page:'plan',topic:'search'})}/>{c.premiere&&<Button ct="CT.ENDING.REOPEN" onClick={()=>open({page:'ending',action:'recap'})}/>}</div></>;
 case 'settings':return <><Heading ct="CT.UI.SETTINGS"/>{Object.entries({sound:['on','off'],motion:['standard','reduced'],text:['regular','larger','largest'],spacing:['standard','roomier']}).map(([key,values])=><label key={key} className="setting">{copy(`CT.SETTINGS.${key.toUpperCase()}`)}<select aria-label={copy(`CT.SETTINGS.${key.toUpperCase()}`)} value={s.preferences[key as 'sound']} onChange={e=>send({type:'PREF',key:key as 'sound',value:e.target.value})}>{values.map(value=><option key={value} value={value}>{value.slice(0,1).toUpperCase()+value.slice(1)}</option>)}</select></label>)}{s.runtime.preferenceFailed&&<p>{copy('CT.SETTINGS.UNSAVED')}</p>}<Lines ids={['CT.ACCESS.KEYBOARD','CT.ACCESS.TYPING','CT.ACCESS.BACK','CT.ACCESS.SELECTION']}/></>;
 case 'pause':return <><Heading ct="CT.PAUSE.TITLE"/>{s.runtime.foregroundNotice&&<p role="status">{copy('CT.RETURN.VISIBLE')}</p>}<div className="stack"><Button ct="CT.UI.FESTIVAL" onClick={()=>open({page:'world'})}/><Button ct="CT.UI.SETTINGS" onClick={()=>open({page:'settings',previous:v})}/><Button ct="CT.PAUSE.HOME" onClick={()=>open({page:'home'})}/><Button ct="CT.START.OVER" onClick={()=>open({page:'confirm',action:'new-game',previous:v})}/></div></>;
 case 'confirm':return v.action==='replace'?<><Heading ct="CT.RECOVERY.REPLACE"/><p>{copy(s.session.saving.mode==='conflict'?'CT.RECOVERY.REPLACE_KNOWN':'CT.RECOVERY.REPLACE_UNKNOWN')}</p><div className="actions"><Button data-safe-focus ct="CT.RECOVERY.KEEP_UNSAVED" onClick={()=>open({page:'world'})}/><Button ct="CT.RECOVERY.REPLACE" onClick={()=>saves.replace()}/></div></>:v.action==='more'?<><Heading ct="CT.WORK.MORE"/><div className="stack"><Button ct="CT.WORK.RESET" onClick={()=>open({...v,action:'reset'})}/><Button ct="CT.WORK.CLEAR" onClick={()=>open({...v,action:'clear'})}/></div></>:<><Heading ct={v.action==='reset'?'CT.WORK.RESET':v.action==='clear'?'CT.WORK.CLEAR':'CT.START.OVER'}/>{v.action==='new-game'&&<p>{copy('CT.RESET.SCOPE')}</p>}{v.action!=='new-game'&&<p>{copy(v.action==='reset'?'CT.WORK.RESET_DESCRIPTION':'CT.WORK.CLEAR_DESCRIPTION')}</p>}<div className="actions"><Button data-safe-focus ct="CT.UI.CANCEL" onClick={()=>open(v.previous??{page:'world'})}/><Button ct={v.action==='reset'?'CT.WORK.RESET':v.action==='clear'?'CT.WORK.CLEAR':'CT.RECOVERY.NEW'} onClick={()=>{if(v.action==='new-game')void saves.reset();else{send({type:v.action==='reset'?'RESET_RUN':'CLEAR_RAIL'});open({page:'work'});}}}/></div></>;
 case 'toast':return <><Heading ct="CT.TOAST.TITLE"/><p>Maximum Toast — an invention demonstration.</p>{v.action==='magnifier'?<><div className="magnifier"><img src={assetUrl('ASSET.PROP.TOAST.PIECE')} alt=""/></div><p>{copy('CT.TOAST.ENLARGED')}</p></>:<p>{copy(s.runtime.toastElapsed!==null?(s.runtime.toastReplay?'CT.TOAST.FLOURISH':s.runtime.toastElapsed<3000?'CT.TOAST.ARMS':s.runtime.toastElapsed<5000?'CT.TOAST.TRAY':'CT.TOAST.MAGNIFIER'):p.objects.toastRevealed?'CT.TOAST.PUNCHLINE':'CT.TOAST.COVERED')}</p>}<div className="actions"><Button disabled={s.runtime.toastElapsed!==null} ct={p.objects.toastRevealed?'CT.TOAST.REPLAY':'CT.TOAST.START'} onClick={()=>send({type:'TOAST_START'})}/>{p.objects.toastRevealed&&<><Button disabled={s.runtime.toastElapsed!==null} ct="CT.TOAST.LOOK" onClick={()=>open({page:'toast',action:'magnifier'})}/><Button ct="CT.TOAST.SKIP" onClick={()=>open({page:'toast',action:'revealed'})}/></>}</div></>;
 case 'ending':return <Ending s={s} open={open}/>;
 case 'recovery':return <><Heading ct="CT.RECOVERY.RUN"/><Button ct="CT.UI.ROOM" onClick={()=>open({page:'world'})}/></>;
 case 'model':return <article className="model-view"><h2 data-focus-heading tabIndex={-1}>Our paper model</h2><p>Pip’s journey starts here.</p><StoryCanvas s={s} model/><div className="caption local-feedback" role="status"><Captions s={s}/></div>{s.case.physical.objects.modelTabTried&&!s.runtime.intent&&<div className="actions"><Button onClick={()=>send({type:'TARGET',target:'ST.MODEL.TAB'})}>Pull the tab again</Button><Button className="primary" onClick={()=>send({type:'TARGET',target:'ST.CONTROL.SHOW'})}>Try the big screen</Button></div>}</article>;
 case 'world':case 'home':return null;
 }
}
export function App(){
 const s=useSyncExternalStore(store.subscribe,store.getSnapshot),v=s.runtime.view,task=useRef<HTMLElement>(null),p=s.case.physical;
 useEffect(()=>{const root=document.documentElement;root.style.setProperty('--text',s.preferences.text==='largest'?'36px':s.preferences.text==='larger'?'30px':'24px');root.style.setProperty('--leading',s.preferences.spacing==='roomier'?'1.875':'1.5');root.dataset.motion=s.preferences.motion;},[s.preferences.text,s.preferences.spacing,s.preferences.motion]);
 useLayoutEffect(()=>{if(v.page!=='world')return;const elements=['.game-header','.world-mission','.world-identities','.world-controls','.world-tools nav','.foreground-notice'].map(selector=>document.querySelector<HTMLElement>(selector)).filter((el):el is HTMLElement=>!!el);
  const measure=()=>{const reserved=elements.reduce((sum,el)=>sum+el.getBoundingClientRect().height,0)+48;document.documentElement.style.setProperty('--world-overview-height',Math.max(240,innerHeight-reserved)+'px');};
  const observer=new ResizeObserver(measure);for(const element of elements)observer.observe(element);window.addEventListener('resize',measure);measure();return()=>{observer.disconnect();window.removeEventListener('resize',measure);};
 },[v.page,p.room,s.runtime.foregroundNotice]);
 const lastPage=useRef(v.page),lastRoom=useRef(p.room);const viewKey=[v.page,v.sourceId,v.actor,v.action,v.page==='idea'?v.ref:''].join('|');
 useEffect(()=>{let target:HTMLElement|null=null;
  if(v.page==='world'){if(!s.runtime.intent&&s.runtime.hasLiveVisit&&lastPage.current!=='home'&&lastPage.current!=='intro'&&lastRoom.current===p.room){target=invoker?.isConnected?invoker:document.querySelector<HTMLElement>(`[data-focus-owner="${s.case.worldReturn.ownerId}"]`)??document.querySelector<HTMLElement>('[data-focus-owner="ACC.OBJECTS"]');invoker=null;}target??=document.querySelector<HTMLCanvasElement>('[data-testid=world]');}
  else if((v.page==='work'||v.page==='kit')&&lastPage.current==='reader')target=task.current?.querySelector<HTMLElement>(`[data-tile="${s.case.worldReturn.ownerId}"],[data-focus-owner="${s.case.worldReturn.ownerId}"]`)??null;
  else if(v.focusSlot&&['picker','reader','map'].includes(lastPage.current))target=task.current?.querySelector<HTMLElement>(`[data-focus-slot="${v.focusSlot}"]`)??null;
  const returningToOwner=target!==null&&v.page!=='world';
  target??=task.current?.querySelector<HTMLElement>('[data-safe-focus]')??task.current?.querySelector<HTMLElement>('[data-focus-heading]')??null;
  target?.focus({preventScroll:true});
  // A lower world control may have scrolled the document before opening a panel.
  // Reader owns its saved passage position; a surviving tile/note owns its return focus.
  if(task.current&&(v.page!=='reader'||v.action==='enlarge')&&!returningToOwner)task.current.scrollTop=0;
  if(v.page==='world')window.scrollTo({top:0,left:0});
  if(v.page!=='world'){
   if(matchMedia('(max-width:900px), (max-height:600px)').matches)target?.scrollIntoView({block:'start'});
   else {window.scrollTo({top:0,left:0});if(returningToOwner)target?.scrollIntoView({block:'nearest'});}
  }
  lastPage.current=v.page;lastRoom.current=p.room;
 },[viewKey,p.room]);
 useEffect(()=>{const escape=(e:KeyboardEvent)=>{if(e.key!=='Escape')return;e.preventDefault();const state=store.getSnapshot();if(state.session.heldTile)send({type:'CANCEL_TILE'});else if(state.runtime.intent)send({type:'STOP_WALK'});else open(state.runtime.view.page==='world'?{page:'pause'}:state.runtime.view.previous??{page:'world'});};document.addEventListener('keydown',escape);return ()=>document.removeEventListener('keydown',escape);},[]);
 if(v.page==='home')return <Home s={s}/>;
 return <div className="game">
  <header className="game-header"><a href="#" onClick={e=>{e.preventDefault();open({page:'pause'});}}>{copy('CT.START.TITLE')}</a><strong>{roomName(p.room)}</strong><Button ct="CT.UI.MENU" onClick={()=>open({page:'pause'})}/></header>
  <div className={`game-layout ${v.page==='world'?'world-only':''} ${v.action==='enlarge'?'enlarged':''} ${v.page==='compare'?'comparing':''}`}>
   <section className="world-column"><div className="world-mission"><Button className="mission-control" onClick={()=>open({page:'recap'})}><small>Our story so far</small>{copy(goal(s.case))}</Button></div><World state={s} store={store}/><div className="world-tools">{s.runtime.foregroundNotice&&v.page!=='pause'&&<aside className="foreground-notice" role="status"><p>{copy('CT.RETURN.VISIBLE')}</p><Button ct="CT.UI.FESTIVAL" onClick={()=>open({page:'world'})}/></aside>}<nav aria-label="Room tools"><Button data-focus-owner="ACC.OBJECTS" ct="CT.UI.MOVE" icon="MAP" onClick={()=>open({page:'objects'})}/><Button ct="CT.UI.MAP" onClick={()=>open({page:'map'})}/><Button ct="CT.UI.NOTES" icon="NOTES" onClick={()=>open({page:'notes'})}/><Button ct="CT.UI.GOAL" onClick={()=>open({page:'goal'})}/><Button ct={['offered','expired'].includes(s.session.coach.status)?'CT.HELP.AVAILABLE':s.session.coach.status==='ready'?'CT.HELP.READY':'CT.UI.HELP'} icon="HELP" onClick={()=>open({page:'help'})}/>{p.caddyHost==='ACT.PLAYER'&&<Button data-focus-owner="KIT.CADDY" ct="CT.UI.KIT" onClick={()=>open({page:'kit'})}/>}</nav>{!['model','work'].includes(v.page)&&<div className="caption" role="status"><Captions s={s}/></div>}
    {s.runtime.intent&&<div className="actions"><Button ct="CT.WORLD.STOP" icon="STOP" onClick={()=>send({type:'STOP_WALK'})}/></div>}
    {p.room==='SC.ST'&&<div className="program-card"><Button onClick={()=>showReading(s)}>Read with the crew</Button></div>}
    <p className="room-purpose">{roomPurposes[p.room]}</p>
    {s.case.experience?.legacyOffer&&<aside className="guidance"><Button onClick={()=>open({page:'recap'})}>Meet the crew / Our story so far</Button><Button onClick={()=>send({type:'INTRO',action:'dismiss-legacy'})}>Keep exploring</Button></aside>}
    {!s.case.guidance.openingDismissed&&p.room==='SC.ST'&&!p.objects.previewTried&&p.loop.mode==='standby'&&p.caddyHost==='MD.RACK.STATION'&&<aside className="guidance"><p>{copy(p.objects.modelTabTried?'CT.GUIDE.PREVIEW':'CT.GUIDE.TAB')}</p><Button ct="CT.UI.DISMISS" onClick={()=>send({type:'DISMISS_GUIDE',guide:'openingDismissed'})}/></aside>}

    <SaveStatus s={s}/><p id="movement-help" className={s.case.guidance.movementDismissed?'sr-only':'movement-help'}>{copy('CT.ACCESS.MOVEMENT')}</p>{!s.case.guidance.movementDismissed&&<Button ct="CT.UI.DISMISS" onClick={()=>send({type:'DISMISS_GUIDE',guide:'movementDismissed'})}/>}
   </div></section>
   {v.page!=='world'&&<section ref={task} className="task-panel native-sheet" data-task aria-label="Task controls"><div className="task-close"><Button {...(['reading','words'].includes(v.page)?{}:{ct:v.previous?'CT.UI.BACK':'CT.UI.ROOM'})} icon="BACK" onClick={()=>open(v.previous??{page:'world'})}>{['reading','words'].includes(v.page)?'Return to story':undefined}</Button></div><Panel s={s}/></section>}
  </div>
 </div>;
}
