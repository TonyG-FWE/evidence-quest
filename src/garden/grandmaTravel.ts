import {anchors,GARDEN_STORAGE,findRoute,type WorldPoint} from './worldLayout.js';
import type {Chapter} from './model.js';

export interface GrandmaTravel {phase:'outbound'|'waiting'|'return';distance:number;}
export const GRANDMA_WALK_SPEED=.5166666666666667/1.4;
const home=anchors.garden.person,landing={x:anchors.boat.landing.x+.70,z:anchors.boat.landing.z};
const path=[home,...findRoute(home,landing)];
const lengths=path.slice(1).map((p,i)=>Math.hypot(p.x-path[i]!.x,p.z-path[i]!.z));
export const GRANDMA_PATH_LENGTH=lengths.reduce((sum,n)=>sum+n,0);
export const GRANDMA_STORAGE=GARDEN_STORAGE;
export const GRANDMA_STORAGE_PATH=[home,...findRoute(home,{x:GRANDMA_STORAGE.x+.50,z:GRANDMA_STORAGE.z+.22})];
export const GRANDMA_STORAGE_WALK_MS=GRANDMA_STORAGE_PATH.slice(1).reduce((n,p,i)=>n+Math.hypot(p.x-GRANDMA_STORAGE_PATH[i]!.x,p.z-GRANDMA_STORAGE_PATH[i]!.z),0)/GRANDMA_WALK_SPEED*1000;
export const GRANDMA_CUSHION_MS=GRANDMA_STORAGE_WALK_MS*2+1800;
export function grandmaLocation(c:Chapter):WorldPoint{
 const trip=c.river.collection;if(!trip)return home;let left=trip.distance;
 for(let i=0;i<lengths.length;i++){const n=lengths[i]!;if(left<=n){const p=path[i]!,q=path[i+1]!,f=n?left/n:0;return {x:p.x+(q.x-p.x)*f,z:p.z+(q.z-p.z)*f};}left-=n;}
 return landing;
}
export function validGrandmaTravel(value:unknown):value is GrandmaTravel|null{
 if(value===null)return true;const v=value as GrandmaTravel;
 return !!v&&['outbound','waiting','return'].includes(v.phase)&&Number.isFinite(v.distance)&&v.distance>=0&&v.distance<=GRANDMA_PATH_LENGTH+.00001&&(v.phase!=='waiting'||Math.abs(v.distance-GRANDMA_PATH_LENGTH)<.00001);
}
export function advanceGrandma(c:Chapter,seconds:number){
 const trip=c.river.collection;if(!trip||trip.phase==='waiting')return;
 trip.distance=Math.max(0,Math.min(GRANDMA_PATH_LENGTH,trip.distance+seconds*GRANDMA_WALK_SPEED*(trip.phase==='return'?-1:1)));
 if(trip.phase==='outbound'&&trip.distance===GRANDMA_PATH_LENGTH)trip.phase='waiting';
 if(trip.phase==='return'&&trip.distance===0)c.river.collection=null;
}
