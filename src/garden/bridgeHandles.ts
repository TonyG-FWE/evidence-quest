import * as T from 'three';
import type {GardenState,Point} from './model.js';
import {availableHands,handAnchor,handDefinitions,type HandObject} from './hands.js';
import {postPoint,ropeTarget,sectionPlacementTargets,firstPart,sectionSecured,sectionRootHeight,type BridgePostId,type RopeSide} from './bridgeConstruction.js';
import {BRIDGE_LEVELS,terrainHeight} from './worldLayout.js';

/** Visible, screen-sized grips address the same objects as their supplied mesh.
 * They never change ownership: all moves/releases still go through HAND_*. */
export function makeBridgeHandles(element:HTMLElement){
 const layer=document.createElement('div');layer.className='garden-bridge-grips';layer.setAttribute('aria-hidden','true');element.append(layer);
 const handles=new Map<string,HTMLElement>(),targets=new Map<string,HTMLElement>();
 let picks:{id:HandObject;x:number;y:number}[]=[];
 function node(map:Map<string,HTMLElement>,id:string,target=false){let el=map.get(id);if(!el){el=document.createElement('span');el.className=target?'garden-drop-target':'garden-drag-grip';el.dataset[target?'bridgeDrop':'bridgeHandle']=id;map.set(id,el);layer.append(el);}return el;}
 function update(s:GardenState,camera:T.Camera,width:number,height:number,enabled:boolean){
  layer.hidden=!enabled;picks=[];for(const el of [...handles.values(),...targets.values()])el.hidden=true;if(!enabled)return;
  const projected=(p:Point,y:number)=>{const v=new T.Vector3(p.x,y,p.z).project(camera);return {x:(v.x+1)*width/2,y:(1-v.y)*height/2};};
  const show=(el:HTMLElement,p:{x:number;y:number})=>{el.hidden=false;el.style.transform=`translate(${p.x}px,${p.y}px) translate(-50%,-50%)`;};
  const objects=availableHands(s).filter(id=>id.startsWith('section:')||id.startsWith('post:')||id==='rope:north'||id==='rope:south');
  for(const id of objects){
   if(s.gesture?.object===id)continue;
   const at=handAnchor(s,id),part=id==='section:a'?'a':'b',y=id.startsWith('rope:')?BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck:id.startsWith('post:')?terrainHeight(at)+.08:sectionRootHeight(s.chapter.sections[part],part)+BRIDGE_LEVELS.sourceSurface[part],p=projected({...at,z:at.z+(id.startsWith('post:')?.3:0)},y);
   const el=node(handles,id);el.textContent=id.startsWith('section:')?id.endsWith('a')?'A':'B':id.startsWith('post:')?'Ⅰ':'∿';el.title=handDefinitions[id].label;
   if(p.x<24||p.x>width-24||p.y<24||p.y>height-24)continue;
   show(el,p);picks.push({id,...p});
  }
  const held=s.gesture?.object;
  const options:{id:string;point:Point;y:number;text:string}[]=held?.startsWith('post:')?[{id:held,point:postPoint(s.chapter,held.slice(5) as BridgePostId),y:BRIDGE_LEVELS.deck+.03,text:'↓'}]:held==='rope:north'||held==='rope:south'?[{id:held,point:postPoint(s.chapter,ropeTarget(s.chapter,held.slice(5) as RopeSide)),y:BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck,text:'↓'}]:held?.startsWith('section:')?sectionPlacementTargets(s.chapter,held==='section:a'?'a':'b').map((t,i)=>({id:held+':'+i,point:t.point,y:BRIDGE_LEVELS.deck+.03,text:'↓'})):[];
  if(!held){
   for(const id of objects.filter(id=>id.startsWith('post:')))options.push({id,point:postPoint(s.chapter,id.slice(5) as BridgePostId),y:BRIDGE_LEVELS.deck+.03,text:'○'});
   for(const id of objects.filter(id=>id==='rope:north'||id==='rope:south'))options.push({id,point:postPoint(s.chapter,ropeTarget(s.chapter,id.slice(5) as RopeSide)),y:BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck,text:'∿'});
   const first=firstPart(s.chapter),second=first==='a'?'b':'a';
   if(!sectionSecured(s.chapter,first))for(const i of [0,2]){const target=sectionPlacementTargets(s.chapter,first)[i];if(target)options.push({id:`section:${first}:${i}`,point:target.point,y:BRIDGE_LEVELS.deck+.03,text:'▱'});}
   if(!sectionSecured(s.chapter,second)){const choices=sectionPlacementTargets(s.chapter,second),target=choices[choices.length===1?0:1]!;options.push({id:`section:${second}:1`,point:target.point,y:BRIDGE_LEVELS.deck+.03,text:'▱'});}
  }
  for(const target of options){const el=node(targets,target.id,true);el.textContent=target.text;show(el,projected(target.point,target.y));}
 }
 return {update,pick(x:number,y:number){return picks.map(p=>({...p,d:Math.hypot(p.x-x,p.y-y)})).filter(p=>p.d<=25).sort((a,b)=>a.d-b.d)[0]?.id;},dispose(){layer.remove();}};
}
