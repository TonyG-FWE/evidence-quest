import model from '../../content/scene-scale.json' with {type:'json'};
import type {Point,Rect,CaseState} from '../../contracts/types.js';
import {content} from '../core/content.js';

export const sceneScale=model;
const actors:Record<string,{height:number;home?:number[]}>=model.actors;
const doors:Record<string,number[]>=model.doors;
export const actorHeight=(id:string)=>actors[id]?.height??14;
export const actorHome=(id:string):Point=>[...(actors[id]?.home??content.actors.find(a=>a.id===id)!.feet)] as Point;
export const doorBounds=(id:string):Rect|undefined=>doors[id] as Rect|undefined;
export const consoleLift=()=>model.stage.raisedConsoleAvailable?model.stage.consoleLift:0;
export const stageLeft=()=>model.stage.leftStop as Point;
export const stageRight=()=>model.stage.rightStop as Point;
export const mediaKitStop=()=>model.media.kitStop as Point;
export const workStops=():Point[]=>[stageLeft(),stageRight(),...model.stage.legacyWorkStops as Point[]];
export const projectionBounds=model.stage.projection as Rect;
export function presentedApproaches(c:CaseState,id:string):Point[]|undefined{
 if(['ACT.LOOP','LOOP.FOLLOW.PAD'].includes(id)&&c.physical.loop.mode==='standby')return model.media.loopWakeStops as Point[];
 if(c.physical.caddyHost==='MD.RACK.STATION'&&(id==='MD.ACCESS.E8'||id.startsWith('KIT.')||id.startsWith('TILE.')))return [mediaKitStop()];
 if(['ACT.JO','ACT.REMY','ACT.ARI'].includes(id)){
  const [x,y]=actorHome(id);
  return [[x-13,y],[x+13,y],[x,y+14]];
 }
 if(!model.stage.raisedConsoleAvailable)return undefined;
 if(id==='ST.RACK.BAY'&&c.physical.caddyHost==='ACT.PLAYER')return [stageLeft()];
 if(id.startsWith('ST.CONTROL.'))return [stageRight()];
 if(id==='ST.RAIL'||id==='ST.CONSOLE')return [stageLeft(),stageRight()];
 if((id.startsWith('KIT.')||id.startsWith('TILE.'))&&c.physical.caddyHost==='ST.RACK.BAY')return [stageLeft()];
 return undefined;
}
export function interactionFacing(c:CaseState,id:string):CaseState['physical']['facing']|undefined{
 if(['ACT.JO','ACT.REMY','ACT.ARI','ACT.LOOP','LOOP.FOLLOW.PAD'].includes(id)){
  const target=id==='ACT.LOOP'||id==='LOOP.FOLLOW.PAD'?c.physical.loop.feet:actorHome(id),dx=target[0]-c.physical.avatar[0],dy=target[1]-c.physical.avatar[1];
  return Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';
 }
 if(c.physical.room==='SC.MD'&&Math.hypot(c.physical.avatar[0]-mediaKitStop()[0],c.physical.avatar[1]-mediaKitStop()[1])<=2)return 'left';
 if(c.physical.room!=='SC.ST')return undefined;
 if(Math.hypot(c.physical.avatar[0]-stageLeft()[0],c.physical.avatar[1]-stageLeft()[1])<=2)return 'right';
 if(Math.hypot(c.physical.avatar[0]-stageRight()[0],c.physical.avatar[1]-stageRight()[1])<=2)return 'left';
 return undefined;
}
export function mountedBounds(owner:string,original:Rect):Rect{
 if(owner==='ST.CONSOLE'&&model.stage.raisedConsoleAvailable)return model.stage.console as Rect;
 const lift=consoleLift();
 if(owner==='ST.RACK.BAY'||owner.startsWith('ST.RAIL')||owner.startsWith('ST.CONTROL.'))return [original[0],original[1]-lift,original[2],original[3]-lift];
 return doorBounds(owner)??original;
}
export function carryGeometry(feet:Point,facing:string){
 const scale=actorHeight('ACT.PLAYER')/12,handX=feet[0]+(facing==='left'?-1.7:facing==='right'?1.7:0)*scale;
 return {handX,rect:[handX-2.35*scale,feet[1]-8.6*scale,handX+2.35*scale,feet[1]-5.9*scale] as Rect,noteHand:[feet[0],feet[1]-8*scale] as Point};
}
