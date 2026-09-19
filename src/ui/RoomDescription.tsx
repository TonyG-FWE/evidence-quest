import type {State} from '../core/state.js';
import {copy} from '../core/content.js';
export function RoomDescription({s}:{s:State}){
 const p=s.case.physical,ids=[`CT.SCENE.${p.room.slice(3)}`];
 if(p.room==='SC.ST'){
  ids.push(['docked','projecting'].includes(p.loop.mode)?'CT.SCENE.ST.LOOP':'CT.SCENE.ST.BLANK');
  if(p.caddyHost==='ST.RACK.BAY')ids.push('CT.SCENE.ST.KIT');
 }
 if(p.room==='SC.MD')ids.push(p.loop.room==='SC.MD'?'CT.SCENE.MD.LOOP':'CT.SCENE.MD.NO_LOOP',p.caddyHost==='MD.RACK.STATION'?'CT.SCENE.MD.KIT':'CT.SCENE.MD.NO_KIT');
 if(p.loop.mode==='following')ids.push('CT.SCENE.FOLLOW');if(p.caddyHost==='ACT.PLAYER')ids.push('CT.SCENE.CARRIED');
 return <div className="room-description">{ids.map(id=><p key={id}>{copy(id)}</p>)}</div>;
}
