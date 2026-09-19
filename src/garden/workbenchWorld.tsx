import {useEffect,useRef} from 'react';
import {createRoot,type Root} from 'react-dom/client';
import * as T from 'three';
import type {Chapter,GardenState} from './model.js';
import {PaperArt} from './art.js';
import {ObservationPicture} from './ObservationPicture.js';
import {storyboardFor,type Observation,type ObservationId} from './journal.js';
import {WORKBENCH,cardSlot,nearestCardSlot} from './workbench.js';
import {makeWorkbenchTable} from './chapterWorld.js';

/** Render the exact factual notebook illustration into an isolated DOM root.
 * Its static SVG becomes a texture; no reader/exposure callbacks run here. */
function CardImage({chapter,card,ready}:{chapter:Chapter;card:Observation;ready:(image:HTMLImageElement)=>void}){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{const svg=host.current?.querySelector('svg');if(!svg)return;const copy=svg.cloneNode(true) as SVGSVGElement;copy.setAttribute('xmlns','http://www.w3.org/2000/svg');copy.setAttribute('width','360');copy.setAttribute('height','200');const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)],{type:'image/svg+xml'})),image=new Image();let alive=true;image.onload=()=>{if(alive)ready(image);URL.revokeObjectURL(url);};image.onerror=()=>URL.revokeObjectURL(url);image.src=url;return()=>{alive=false;image.onload=null;image.onerror=null;URL.revokeObjectURL(url);};},[chapter,card,ready]);
 return <div ref={host}><ObservationPicture chapter={chapter} observation={card}/></div>;
}
export function makeWorkbench(a:PaperArt){
 const root=new T.Group(),table=makeWorkbenchTable(a),pictures=new T.Group(),entries=new Map<ObservationId,{mesh:T.Mesh;texture:T.CanvasTexture;dom:Root}>();root.add(table,pictures);
 const marker=a.box(pictures,0,WORKBENCH.y+.009,0,.415,.007,.286,'#e9bd65');marker.visible=false;
 let key='',disposed=false,revision=0,loaded=0,generation=0,interactive=false;
 function clear(){generation++;loaded=0;for(const item of entries.values()){item.dom.unmount();item.texture.dispose();item.mesh.geometry.dispose();(item.mesh.material as T.Material).dispose();pictures.remove(item.mesh);}entries.clear();}
 function sync(s:GardenState){
  interactive=s.mode==='workbench';
  // A committed telling remains on the physical table when Pip steps away.
  // Load the pictures only near the workshop; distant scenery keeps no images.
  pictures.visible=interactive||s.chapter.journal.storyboard.length>0&&Math.hypot(s.chapter.pip.x-WORKBENCH.x,s.chapter.pip.z-WORKBENCH.z)<5;
  if(!pictures.visible){if(entries.size){clear();key='';}return;}
  const cards=storyboardFor(s.chapter,s.chapter.journal),next=JSON.stringify(cards.map(c=>[c.id,c.text]));
  if(next!==key){clear();key=next;const token=generation;cards.forEach(card=>{
   const canvas=document.createElement('canvas');canvas.width=512;canvas.height=320;const context=canvas.getContext('2d')!;
   const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
   const mat=new T.MeshStandardMaterial({map:texture,roughness:.95}),mesh=new T.Mesh(new T.PlaneGeometry(.4,.25),mat);mesh.rotation.x=-Math.PI/2;mesh.userData['target']='picture:'+card.id;mesh.receiveShadow=true;pictures.add(mesh);
   const paint=(image?:HTMLImageElement)=>{if(disposed||token!==generation)return;context.fillStyle='#fff6df';context.fillRect(0,0,512,320);if(image){context.drawImage(image,12,10,488,271);loaded++;}context.fillStyle='#4c5f49';context.font='20px sans-serif';context.textAlign='center';context.fillText(card.title,256,305,482);texture.needsUpdate=true;revision++;};paint();
   const dom=createRoot(document.createElement('div'));dom.render(<CardImage chapter={s.chapter} card={card} ready={paint}/>);entries.set(card.id,{mesh,texture,dom});
  });}
  cards.forEach((card,index)=>{const item=entries.get(card.id);if(!item)return;const held=s.cardGesture?.id===card.id,p=held?s.cardGesture!.point:cardSlot(index);item.mesh.position.set(p.x,WORKBENCH.y+(held?.075:.018),p.z);});
  marker.visible=!!s.cardGesture;if(s.cardGesture){const p=cardSlot(nearestCardSlot(s.cardGesture.point,cards.length));marker.position.set(p.x,WORKBENCH.y+.01,p.z);}
 }
 return {root,table,pictures,sync,get revision(){return revision;},get loaded(){return loaded;},pickables:()=>interactive?[...entries.values()].map(item=>item.mesh):[],dispose:()=>{disposed=true;clear();}};
}
