import {useLayoutEffect,useRef,useState,type ReactNode,type RefObject} from 'react';
import type {GardenStore} from './model.js';
import {cancelLocalSpeech} from './audio.js';

type EditorPlace={id:string;index:number;start:number;end:number;direction:'forward'|'backward'|'none';scroll:number};
type Bookmark={scrolls:{key:string;top:number;left:number}[];editors:EditorPlace[]};
const places=new WeakMap<GardenStore,Map<string,Bookmark>>();
const paneKey=(node:HTMLElement,index:number)=>node.dataset['readerScroll']||node.id||String(index);
/** Presentation bookmarks never become story facts or replace the durable chapter. */
export function useReaderBookmarks(store:GardenStore,root:RefObject<HTMLElement|null>,key:string,layer:boolean){
 const entries=places.get(store)??new Map<string,Bookmark>();places.set(store,entries);
 const current=useRef(key);current.current=key;
 const remember=()=>{
  const node=root.current;if(!node||layer)return;
  entries.set(current.current,{scrolls:Array.from(node.querySelectorAll<HTMLElement>('[data-reader-scroll],.garden-reading-scroll')).map((p,index)=>({key:paneKey(p,index),top:p.scrollTop,left:p.scrollLeft})),editors:Array.from(node.querySelectorAll<HTMLTextAreaElement>('textarea')).map((p,index)=>({id:p.id,index,start:p.selectionStart,end:p.selectionEnd,direction:p.selectionDirection,scroll:p.scrollTop}))});
 };
 useLayoutEffect(()=>{
  if(layer)return;const node=root.current,entry=entries.get(key);if(!node||!entry)return;
  const restore=()=>{
   Array.from(node.querySelectorAll<HTMLElement>('[data-reader-scroll],.garden-reading-scroll')).forEach((p,index)=>{const saved=entry.scrolls.find(s=>s.key===paneKey(p,index));if(saved){p.scrollTop=saved.top;p.scrollLeft=saved.left;}});
   const editors=node.querySelectorAll<HTMLTextAreaElement>('textarea');for(const saved of entry.editors){const editor=saved.id?Array.from(editors).find(e=>e.id===saved.id):editors[saved.index];if(editor){editor.setSelectionRange(Math.min(saved.start,editor.value.length),Math.min(saved.end,editor.value.length),saved.direction);editor.scrollTop=saved.scroll;}}
  };
  restore();const frame=requestAnimationFrame(restore);return()=>cancelAnimationFrame(frame);
 },[key,layer,entries,root]);
 return remember;
}

export function AdaptiveWriting({store,source,draft,later,onHear,action}:{store:GardenStore;source:ReactNode;later:ReactNode;draft:ReactNode;action:ReactNode;onHear:(part:'draft'|'later')=>void}){
 const c=store.getSnapshot().chapter,prefix='reader-writing:'+c.narrativeEdition+':';
 const [sourceTab,setSourceTab]=useState<'draft'|'later'>(()=>c.reading[prefix+'source']===1?'draft':'later');
 const [compactTab,setCompactTab]=useState<'source'|'draft'>(()=>c.reading[prefix+'compact']===1?'source':'draft');
 const chooseSource=(value:'draft'|'later')=>{cancelLocalSpeech();setSourceTab(value);store.send({type:'READ_POSITION',id:prefix+'source',position:value==='draft'?1:0});};
 const choosePane=(value:'source'|'draft')=>{cancelLocalSpeech();setCompactTab(value);store.send({type:'READ_POSITION',id:prefix+'compact',position:value==='source'?1:0});};
 return <div className="g-adaptive-writing">
  <div className="g-compact-writing-tabs" role="group" aria-label="Writing view"><button className="g-secondary" aria-pressed={compactTab==='source'} onClick={()=>choosePane('source')}>Sol’s words</button><button className="g-secondary" aria-pressed={compactTab==='draft'} onClick={()=>choosePane('draft')}>My ending</button></div>
  <div className={'g-writing-workspace g-writing-show-'+compactTab}>
   <section className="g-writing-sources" aria-label="Sol’s words"><h3>Sol’s words</h3><div className="g-writing-source-tabs" role="group" aria-label="Choose Sol’s account"><button className="g-secondary" aria-pressed={sourceTab==='draft'} onClick={()=>chooseSource('draft')}>His draft</button><button className="g-secondary" aria-pressed={sourceTab==='later'} onClick={()=>chooseSource('later')}>What happened next</button></div>
    <div className="g-writing-source-scroll" data-reader-scroll={'sol-source-'+sourceTab} key={sourceTab} onScroll={event=>store.send({type:'READ_POSITION',id:prefix+sourceTab+'-scroll',position:event.currentTarget.scrollTop})} ref={node=>{if(node)node.scrollTop=store.getSnapshot().chapter.reading[prefix+sourceTab+'-scroll']??0;}}>{sourceTab==='draft'?source:later}</div>
    <button data-reading-command="true" className="g-secondary" onClick={()=>onHear(sourceTab)}>Listen to Sol’s {sourceTab==='draft'?'draft':'account'}</button>
   </section>
   <section className="g-writing-desk" aria-label="My ending" data-reader-scroll="sol-draft">{draft}</section>
  </div><div className="g-writing-primary">{action}</div>
 </div>;
}

/** Page only at paragraph boundaries: exact source IDs, wording and order survive. */
export function PagedSource({store,id,paragraphs,render}:{store:GardenStore;id:string;paragraphs:readonly {text:string;index:number}[];render:(text:string,index:number)=>ReactNode}){
 const pageKey='reader-pages:'+id,maximum=Math.max(0,Math.ceil(paragraphs.length/2)-1);
 const root=useRef<HTMLDivElement>(null);
 const [page,setPage]=useState(()=>Math.min(maximum,Math.max(0,Math.floor(store.getSnapshot().chapter.reading[pageKey]??0))));
 useLayoutEffect(()=>{const scroll=root.current?.closest<HTMLElement>('.garden-reading-scroll');if(!scroll)return;const positionKey=pageKey+':'+page;scroll.scrollTop=store.getSnapshot().chapter.reading[positionKey]??0;const save=()=>store.send({type:'READ_POSITION',id:positionKey,position:scroll.scrollTop});scroll.addEventListener('scroll',save);return()=>scroll.removeEventListener('scroll',save);},[store,pageKey,page]);
 const shown=paragraphs.slice(page*2,page*2+2),turn=(next:number)=>{cancelLocalSpeech();setPage(next);store.send({type:'READ_POSITION',id:pageKey,position:next});};
 return <div ref={root} className="g-paged-source"><div className="garden-passage" data-reader-scroll={'source-page-'+id+'-'+page}>{shown.map(p=>render(p.text,p.index))}</div>{maximum>0&&<nav className="g-source-page-controls" aria-label="Story pages"><button className="g-secondary" disabled={page===0} onClick={()=>turn(page-1)}>Previous page</button><span role="status">Page {page+1} of {maximum+1}</span><button className="g-primary" disabled={page===maximum} onClick={()=>turn(page+1)}>Next page</button></nav>}</div>;
}
