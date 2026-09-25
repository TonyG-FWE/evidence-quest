import * as T from 'three';
import type {GardenState} from './model.js';
import {bakeryHands,type BakeryObject} from './bakeryInteraction.js';
import {handDefinitions,KNEADING_DISTANCE,kneadingDough} from './hands.js';

/** The cue encloses the artwork the child can see. Its small screen-space
 * margin is also the pointer tolerance; it does not execute an action. */
export function makeBakeryTargets(element:HTMLElement,objects:Record<Exclude<BakeryObject,'dough-cut'>,T.Object3D>,destinations:Record<'pip'|'sol'|'rina'|'bowl'|'oven'|'opening',T.Object3D>){
 const layer=document.createElement('div');layer.className='garden-bakery-targets';layer.setAttribute('aria-hidden','true');element.append(layer);
 const nodes=new Map<string,HTMLElement>(),bounds=new T.Box3(),part=new T.Box3(),point=new T.Vector3();
 const posed=new WeakMap<T.SkinnedMesh,number>();
 let picks:{object:T.Object3D;left:number;right:number;top:number;bottom:number;drop:boolean}[]=[];
 function update(s:GardenState,camera:T.Camera,width:number,height:number,enabled:boolean){
  layer.hidden=!enabled;picks=[];for(const el of nodes.values())el.hidden=true;
  if(!enabled||s.panel||s.action)return;
  const ids=[...new Set(bakeryHands(s,false).map(id=>id==='dough-cut'?'dough':id))];
  const b=s.chapter.bakery,drop=b.stage==='needed'?'pip':b.stage==='carried'?'sol':['gap','misplaced'].includes(b.stage)?'opening':b.stage==='checked'&&!s.chapter.hands.flourInBowl?'bowl':b.stage==='shaped'?'oven':b.stage==='baked'?'rina':b.stage==='escorting'?'sol':null;
  const kneading=kneadingDough(s);
  const cues:{id:string;object:T.Object3D;label:string;drop:boolean}[]=s.gesture&&!kneading?[]:ids.map(id=>({id,object:id==='dough'&&kneading?destinations.bowl:objects[id],label:id==='dough'&&kneading?`Knead in the bowl · ${Math.round((s.kneading??0)/KNEADING_DISTANCE*100)}%`:handDefinitions[id].label,drop:false}));
  if(drop)cues.push({id:drop,object:destinations[drop],label:({pip:'Pip',sol:'Sol',rina:'Rina',bowl:'Bowl',oven:'Oven',opening:'Roof opening'})[drop],drop:true});
  for(const cue of cues){
   const {id,object}=cue;let visible=true;for(let p:T.Object3D|null=object;p;p=p.parent)if(!p.visible)visible=false;
   if(!visible)continue;object.updateWorldMatrix(true,true);bounds.makeEmpty();
   object.traverseVisible(node=>{
    if(!(node instanceof T.Mesh))return;
    const materials=Array.isArray(node.material)?node.material:[node.material];if(!materials.some(m=>m.visible))return;
    // Actor geometry is stored in its rest pose. Refresh the posed envelope at
    // eight Hz, while applying the current world transform on every frame.
    // The cue margin covers small idle changes without skinning every vertex
    // on every display frame solely to position a label.
    if(node instanceof T.SkinnedMesh){const now=performance.now();if(now-(posed.get(node)??-Infinity)>125){node.computeBoundingBox();posed.set(node,now);}if(node.boundingBox)bounds.union(part.copy(node.boundingBox).applyMatrix4(node.matrixWorld));}
    else{if(!node.geometry.boundingBox)node.geometry.computeBoundingBox();if(node.geometry.boundingBox)bounds.union(part.copy(node.geometry.boundingBox).applyMatrix4(node.matrixWorld));}
   });
   if(bounds.isEmpty())continue;
   let left=Infinity,right=-Infinity,top=Infinity,bottom=-Infinity;
   for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
    point.set(x,y,z).project(camera);const sx=(point.x+1)*width/2,sy=(1-point.y)*height/2;left=Math.min(left,sx);right=Math.max(right,sx);top=Math.min(top,sy);bottom=Math.max(bottom,sy);
   }
   const cx=(left+right)/2,cy=(top+bottom)/2,w=Math.max(44,right-left+12),h=Math.max(44,bottom-top+12);left=cx-w/2;right=cx+w/2;top=cy-h/2;bottom=cy+h/2;
   if(right<0||left>width||bottom<0||top>height)continue;
   let el=nodes.get(id);if(!el){el=document.createElement('span');el.className='garden-bakery-target';el.dataset[cue.drop?'bakeryDrop':'bakeryObject']=id;const label=document.createElement('span');label.textContent=cue.label;el.append(label);nodes.set(id,el);layer.append(el);}
   el.firstElementChild!.textContent=cue.label;
   el.classList.toggle('is-selected',!cue.drop&&s.bakerySelection?.object===id);
   el.classList.toggle('is-recipient',cue.drop&&!!s.bakerySelection);
   el.hidden=false;el.style.transform=`translate(${left}px,${top}px)`;el.style.width=w+'px';el.style.height=h+'px';picks.push({object,left,right,top,bottom,drop:cue.drop});
  }
 }
 return {update,pick(x:number,y:number,receivingOnly=false){return picks.find(p=>(!receivingOnly||p.drop)&&x>=p.left&&x<=p.right&&y>=p.top&&y<=p.bottom)?.object;},dispose(){layer.remove();}};
}
