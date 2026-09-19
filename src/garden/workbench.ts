import type {GardenState,Point} from './model.js';
import {storyboardFor,updateJournal,type ObservationId} from './journal.js';
import {anchors,WORLD_WORKBENCH,WORKBENCH_APPROACH} from './worldLayout.js';

export const WORKBENCH=WORLD_WORKBENCH;
export type CardGesture={id:ObservationId;point:Point};
export type WorkbenchCommand={type:'WORKBENCH'}|{type:'CARD_PICK';id:ObservationId}|{type:'CARD_MOVE';point:Point}|{type:'CARD_PLACE'}|{type:'CARD_CANCEL'};
export function cardSlot(index:number):Point{return {x:WORKBENCH.x+(index%5-2)*.43,z:WORKBENCH.z+(Math.floor(index/5)-1.5)*.31};}
export function nearestCardSlot(point:Point,count:number){
 let nearest=0,best=Infinity;for(let i=0;i<count;i++){const p=cardSlot(i),distance=Math.hypot(point.x-p.x,point.z-p.z);if(distance<best){nearest=i;best=distance;}}return nearest;
}
export function canUseWorkbench(s:GardenState){return s.chapter.story.metSol&&s.mode==='walk'&&!s.action&&!s.activity&&!s.background&&!s.viewLost&&[anchors.workshop.person,WORKBENCH_APPROACH].some(point=>Math.hypot(s.chapter.pip.x-point.x,s.chapter.pip.z-point.z)<1.8);}
/** Cards are optional interpretations. Only a released arrangement is durable;
 * the shared store owns the drag preview, and no command edits witnessed facts. */
export function applyCard(s:GardenState,command:Exclude<WorkbenchCommand,{type:'WORKBENCH'}>){
 if(command.type==='CARD_CANCEL'){s.cardGesture=null;return;}
 if(s.mode!=='workbench'||s.panel||s.action||s.activity||s.background||s.viewLost)return;
 const cards=storyboardFor(s.chapter,s.chapter.journal),order=cards.map(c=>c.id);
 if(command.type==='CARD_PICK'){
  if(s.cardGesture)return;const index=order.indexOf(command.id);if(index<0)return;
  s.cardGesture={id:command.id,point:cardSlot(index)};s.notice=cards[index]!.title+'. Move this picture to tell it earlier or later, then release.';return;
 }
 const gesture=s.cardGesture;if(!gesture)return;
 if(command.type==='CARD_MOVE'){
  if(!Number.isFinite(command.point.x)||!Number.isFinite(command.point.z))return;
  gesture.point={x:Math.max(WORKBENCH.x-1.1,Math.min(WORKBENCH.x+1.1,command.point.x)),z:Math.max(WORKBENCH.z-.64,Math.min(WORKBENCH.z+.64,command.point.z))};return;
 }
 const from=order.indexOf(gesture.id),to=nearestCardSlot(gesture.point,order.length);
 if(from>=0){order.splice(from,1);order.splice(to,0,gesture.id);s.chapter.journal=updateJournal(s.chapter.journal,{type:'REORDER',order},s.chapter);}
 s.cardGesture=null;s.notice='The picture is on the workbench. This is your telling; the events and chosen ending stay as they happened.';
}
