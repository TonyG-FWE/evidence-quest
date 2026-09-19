import type {CaseState,Room} from '../../contracts/types.js';
import {content,copy} from '../core/content.js';
import {ownerRoom} from '../physical/navigation.js';
import {exposed} from '../core/evidence.js';
export const roomName=(id:Room['id'])=>({'SC.ST':'Stage','SC.CY':'Courtyard','SC.WK':'Workshop','SC.MD':'Media room'})[id];
export function ownerLabel(c:CaseState,id:string):string{
 const p=c.physical;
 const actor=content.actors.find(a=>a.id===id);if(actor)return id==='ACT.PLAYER'?copy('CT.WORLD.YOU'):id==='ACT.LOOP'?'Loop':id.slice(4,5)+id.slice(5).toLowerCase();
 const door=content.doors.find(d=>d.id===id);if(door)return roomName(door.destinationRoom);
 const names:Record<string,string>={'ST.MODEL':'Paper model','ST.MODEL.TAB':'Paper tab','ST.SOURCE.E1':'Crew brief','ST.SOURCE.E6':copy('CT.TITLE.E6'),'ST.SOURCE.E4':'Filming request','ST.ACCESS.E2':'Crew message','ST.DOCK':'Loop’s dock','ST.DOCK.FLAP':'Dock flap','ST.DOCK.PAD':'Dock Loop','ST.RACK.BAY':'Space for the story kit','ST.RAIL':'Plan our story','CY.ACCESS.E2':'Crew message','CY.SOURCE.E3':p.objects.noticeFlat?'Courtyard notice':'Curled notice','CY.SOURCE.E7':copy('CT.TITLE.E7'),'WK.ACCESS.NAV':'Venue information','WK.WAYFINDING':'Venue information','WK.TOAST':'Maximum Toast','WK.TOAST.START':'Maximum Toast','WK.TOAST.MAGNIFIER':'Magnifier','MD.SOURCE.E5':'Recording notes','MD.SOURCE.E6':copy('CT.TITLE.E6'),'MD.SOURCE.E7':copy('CT.TITLE.E7'),'MD.ACCESS.E8':'Story kit','KIT.CADDY':'Story kit','KIT.NOTE.E6':copy('CT.TITLE.E6'),'KIT.NOTE.E7':copy('CT.TITLE.E7'),'LOOP.FOLLOW.PAD':'Loop'};
 if(id.startsWith('TILE.'))return copy('CT.TILE.LABEL.'+id.slice(5));
 if(id==='ST.CONTROL.SHOW')return copy(c.certificate?.arrangementRevision===p.arrangementRevision?(c.premiere?'CT.WORK.REPLAY':'CT.WORK.LAUNCH'):'CT.WORK.PREVIEW');
 const o=content.objects.find(o=>o.id===id);return names[id]??(o?.defaultActionCt?copy(o.defaultActionCt):id);
}
export function localOwners(c:CaseState){
 return content.objects.filter(o=>ownerRoom(c,o.id)===c.physical.room&&(o.defaultActionCt||o.kind==='door')&&o.id!=='ACT.PLAYER'&&!o.id.startsWith('TILE.')&&!o.id.startsWith('KIT.NOTE.')&&!['LOOP.FOLLOW.PAD','ST.DOCK.FLAP','ST.DOCK.PAD','WK.TOAST.START','WK.TOAST.SKIP','WK.TOAST.MAGNIFIER','WK.ACCESS.NAV','ST.CONTROL.RESET','ST.CONTROL.CLEAR','ST.CONTROL.STOP'].includes(o.id)&&!(o.id==='KIT.CADDY'&&c.physical.caddyHost==='MD.RACK.STATION')&&!(o.id==='MD.ACCESS.E8'&&c.physical.caddyHost!=='MD.RACK.STATION')&&!(o.id==='ACT.LOOP'&&c.physical.loop.mode==='docked'));
}
export function goal(c:CaseState){
 const p=c.physical,knowsLoop=exposed(c,'E5.c/seen');
 if(c.premiere)return 'CT.GOAL.AFTER';if(c.certificate)return 'CT.GOAL.LAUNCH';
 if(p.room==='SC.ST'){
  if(p.loop.mode==='following')return p.caddyHost==='ACT.PLAYER'?'CT.ER13.HANDOFF_BOTH':p.caddyHost==='ST.RACK.BAY'?'CT.ER13.HANDOFF_LOOP':'CT.ER13.LOOP_THEN_KIT';
  if(p.caddyHost==='ACT.PLAYER')return p.loop.mode==='standby'?(knowsLoop?'CT.ER13.KIT_THEN_KNOWN_LOOP':'CT.ER13.KIT_THEN_LOOP'):'CT.ER13.HANDOFF_KIT';
 }
 if(p.loop.mode==='standby'&&p.room!=='SC.MD'&&knowsLoop)return 'CT.ER13.RETURN_TO_LOOP';
 return p.loop.mode==='standby'&&p.room==='SC.MD'?'CT.ER13.WAKE':p.loop.mode==='standby'&&p.caddyHost!=='ST.RACK.BAY'?'CT.GOAL.SEARCH':p.caddyHost==='ST.RACK.BAY'&&p.loop.mode==='standby'?'CT.GOAL.LOOP':p.loop.mode==='following'?(p.caddyHost==='ST.RACK.BAY'?'CT.ER13.RETURN_LOOP':'CT.GOAL.RESOURCES'):p.caddyHost!=='ST.RACK.BAY'?'CT.GOAL.KIT':'CT.GOAL.REHEARSE';
}
