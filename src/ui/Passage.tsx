import {useEffect,useRef} from 'react';
import type {Span} from '../../contracts/types.js';
import {parts,copy} from '../core/content.js';
import type {Store} from '../core/store.js';
import {mergeSpans,permittedSpans} from '../core/evidence.js';
export function Passage({ct,refs,access,store,range,onWord}:{ct:string;refs:string[];access:string;store:Store;range?:Span;onWord?:(word:string)=>void}){
 const element=useRef<HTMLParagraphElement>(null);const full=copy(ct),start=range?.[0]??0,end=range?.[1]??Array.from(full).length,text=Array.from(full).slice(start,end).join('');
 let offset=start;const tokens=text.split(/(\s+)/).filter(Boolean).map(word=>{const token={word,start:offset,end:offset+Array.from(word).length};offset=token.end;return token;});
 const refsKey=refs.join('|');
 useEffect(()=>{
  const el=element.current;if(!el)return;let timer=0;
  const measure=()=>{
   cancelAnimationFrame(timer);timer=requestAnimationFrame(()=>{
    const root=el.closest('[data-task]')?.getBoundingClientRect(),world=document.querySelector('[data-world]')?.getBoundingClientRect();
    const top=Math.max(0,root?.top??0,matchMedia('(max-width: 900px), (max-height: 600px)').matches?world?.bottom??0:0),bottom=Math.min(innerHeight,root?.bottom??innerHeight),left=Math.max(0,root?.left??0),right=Math.min(innerWidth,root?.right??innerWidth);
    const visible:Span[]=[];
    for(const span of el.querySelectorAll<HTMLElement>('[data-start]')){const boxes=[...span.getClientRects()];if(boxes.length&&boxes.every(r=>r.width>0&&r.top>=top-.5&&r.bottom<=bottom+.5&&r.left>=left-.5&&r.right<=right+.5))visible.push([Number(span.dataset.start),Number(span.dataset.end)]);}
    // Whitespace between two visible adjacent words is part of that displayed passage.
    const coverage:Span[]=[];for(const interval of visible){const prior=coverage.at(-1);if(prior&&/^\s*$/.test(Array.from(full).slice(prior[1],interval[0]).join('')))prior[1]=interval[1];else coverage.push([...interval]);}
    for(const ref of refsKey.split('|')){const p=parts.get(ref);if(!p)continue;const allowed=permittedSpans(store.getSnapshot().case,ref),spans:Span[]=[];
     for(const [a,b]of coverage)for(const [l,r]of allowed){const lo=Math.max(a,l),hi=Math.min(b,r);if(hi>lo)spans.push([lo,hi]);}
     if(spans.length)store.send({type:'EXPOSE',exposure:{refId:ref,ctId:p.ctId,spans:mergeSpans(spans),visualComplete:false,viaAccessId:access}});
    }
   });
  };
  measure();document.addEventListener('scroll',measure,true);window.addEventListener('resize',measure);const resize=new ResizeObserver(measure);resize.observe(el);
  return ()=>{cancelAnimationFrame(timer);document.removeEventListener('scroll',measure,true);window.removeEventListener('resize',measure);resize.disconnect();};
 },[ct,refsKey,access,start,end,store,full]);
 return <p className="source-words" ref={element} data-content-id={ct}>{tokens.map((t,i)=>{
  if(/^\s+$/.test(t.word))return t.word;
  const word=t.word.replace(/[^\p{L}]/gu,'').toUpperCase(),defined=['PREMIERE','REHEARSAL','CAPTURED','CUE','INTERPRETATION'].includes(word);
  return <span key={i} data-start={t.start} data-end={t.end}>{defined&&onWord?<button type="button" className="word" data-word={word} onClick={()=>onWord(word)}>{t.word}</button>:t.word}</span>;
 })}</p>;
}
