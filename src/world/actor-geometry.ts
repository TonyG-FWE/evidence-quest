import type {Point,Rect} from '../../contracts/types.js';
import {actorHeight} from '../physical/presentation.js';
import {productionFrame} from './production.js';
export function actorDrawRect(id:string,feet:Point):Rect{const h=actorHeight(id);return [feet[0]-h*.35,feet[1]-h,feet[0]+h*.35,feet[1]];}
export function actorContentBounds(id:string,feet:Point,variant:string):Rect{
 const frame=productionFrame('ASSET.'+id,variant)??productionFrame('ASSET.'+id,id==='ACT.PLAYER'?'idle-front':id==='ACT.LOOP'?'standby':'home');
 if(!frame?.referenceHeight)return actorDrawRect(id,feet);
 const scale=actorHeight(id)/frame.referenceHeight,[l,t,r,b]=frame.contentRectPixels,w=(r-l)*scale,h=(b-t)*scale;
 const x=feet[0]-frame.anchor[0]*scale,y=feet[1]-frame.anchor[1]*scale;
 return frame.mirror?[feet[0]*2-x-w,y,feet[0]*2-x,y+h]:[x,y,x+w,y+h];
}
export const overlaps=(a:Rect,b:Rect,padding=0)=>a[0]<b[2]+padding&&a[2]>b[0]-padding&&a[1]<b[3]+padding&&a[3]>b[1]-padding;
