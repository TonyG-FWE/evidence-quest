import type { CaseState, Point, Rect, Room } from '../../contracts/types.js';
import { content, objects } from '../core/content.js';
import {presentedApproaches} from './presentation.js';
export const distance=(a:Point,b:Point)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
export const roomData=(id:Room['id'])=>content.rooms.find(r=>r.id===id)!;
export const expanded=(r:Rect):Rect=>[r[0]-2,r[1]-2,r[2]+2,r[3]+2];
export function legal(room:Room,p:Point):boolean{return Number.isFinite(p[0])&&Number.isFinite(p[1])&&p[0]>=6&&p[0]<=114&&p[1]>=30&&p[1]<=74&&room.obstacles.every(o=>{const [l,t,r,b]=expanded(o.rect);return p[0]<=l||p[0]>=r||p[1]<=t||p[1]>=b;});}
// Open-rectangle intersection permits tangency at expanded corners, never penetration.
export function clearSegment(room:Room,a:Point,b:Point):boolean{
  if(!legal(room,a)||!legal(room,b))return false;
  return room.obstacles.every(o=>{
    const r=expanded(o.rect);let lo=0,hi=1;
    for(let axis=0;axis<2;axis++){
      const delta=b[axis]!-a[axis]!,min=r[axis]!,max=r[axis+2]!;
      if(Math.abs(delta)<1e-9){if(a[axis]!<=min||a[axis]!>=max)return true;}
      else{const t1=(min-a[axis]!)/delta,t2=(max-a[axis]!)/delta;lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));}
    }
    return hi-lo<1e-9;
  });
}
export function findPath(room:Room,from:Point,to:Point):Point[]|null{
  if(!legal(room,from)||!legal(room,to))return null;
  if(clearSegment(room,from,to))return [[...to]];
  const corners:Point[]=room.obstacles.flatMap(o=>{const [l,t,r,b]=expanded(o.rect);return [[l,t],[r,t],[r,b],[l,b]] as Point[];}).filter(p=>legal(room,p));
  const nodes=[from,to,...corners],cost=nodes.map(()=>Infinity),previous=nodes.map(()=>-1),done=new Set<number>();cost[0]=0;
  for(let n=0;n<nodes.length;n++){
    let u=-1;for(let i=0;i<nodes.length;i++)if(!done.has(i)&&(u<0||cost[i]!<cost[u]!-1e-9))u=i;
    if(u<0||!Number.isFinite(cost[u]))return null;
    if(u===1){const path:Point[]=[];for(let v=1;v!==0;v=previous[v]!){if(v<0)return null;path.unshift([...nodes[v]!]);}return path;}
    done.add(u);
    for(let v=0;v<nodes.length;v++)if(!done.has(v)&&clearSegment(room,nodes[u]!,nodes[v]!)){
      const next=cost[u]!+distance(nodes[u]!,nodes[v]!);if(next<cost[v]!-1e-9){cost[v]=next;previous[v]=u;}
    }
  }return null;
}
export function pathLength(from:Point,path:Point[]):number{let last=from,sum=0;for(const p of path){sum+=distance(last,p);last=p;}return sum;}
export function ownerRoom(c:CaseState,id:string):Room['id']|null{
  if(id==='ACT.PLAYER')return c.physical.room;
  if(id==='ACT.LOOP'||id==='LOOP.FOLLOW.PAD')return c.physical.loop.room;
  if(id.startsWith('KIT.')||id.startsWith('TILE.'))return c.physical.caddyHost==='ACT.PLAYER'?c.physical.room:c.physical.caddyHost==='ST.RACK.BAY'?'SC.ST':'SC.MD';
  return objects.get(id)?.room??null;
}
export function approaches(c:CaseState,id:string):Point[]{
  const presented=presentedApproaches(c,id);if(presented)return presented;
  if((id.startsWith('KIT.')||id.startsWith('TILE.'))&&c.physical.caddyHost==='ACT.PLAYER')return [[...c.physical.avatar]];
  if((id.startsWith('KIT.')||id.startsWith('TILE.'))&&c.physical.caddyHost==='ST.RACK.BAY')return [[78,58]];
  if(id==='ST.RACK.BAY'&&c.physical.caddyHost==='ACT.PLAYER')return [[55,58]];
  if((id==='ACT.LOOP'||id==='LOOP.FOLLOW.PAD')&&c.physical.loop.mode!=='standby')return c.physical.loop.mode==='following'?[[...c.physical.avatar]]:[[86,48]];
  return objects.get(id)?.approaches??[];
}
export function pathToOwner(c:CaseState,id:string):Point[]|null{
  if(ownerRoom(c,id)!==c.physical.room)return null;
  let winner:Point[]|null=null,len=Infinity;
  for(const a of approaches(c,id)){
    const path=findPath(roomData(c.physical.room),c.physical.avatar,a);
    if(path){const n=pathLength(c.physical.avatar,path);if(n<len-1e-9){winner=path;len=n;}}
  }return winner;
}
export function advancePath(position:Point,path:Point[],units:number):{position:Point;path:Point[]}{
  let p:[number,number]=[...position],remaining=path.map(q=>[...q] as Point);
  while(remaining.length&&units>0){const end=remaining[0]!,d=distance(p,end);if(d<=units+.1){p=[...end];units-=d;remaining.shift();}else{p=[p[0]+(end[0]-p[0])*units/d,p[1]+(end[1]-p[1])*units/d];units=0;}}
  return {position:p,path:remaining};
}
