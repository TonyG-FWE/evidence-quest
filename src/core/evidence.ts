import type { CaseState, Exposure, Span } from '../../contracts/types.js';
import { parts, copy } from './content.js';
export function mergeSpans(spans:Span[]):Span[]{const out:Span[]=[];for(const [a,b]of [...spans].sort((a,b)=>a[0]-b[0])){const last=out.at(-1);if(last&&a<=last[1])last[1]=Math.max(last[1],b);else out.push([a,b]);}return out;}
export const contains=(coverage:Span[],needed:Span[])=>needed.every(([a,b])=>coverage.some(([l,r])=>l<=a&&r>=b));
export function exposed(c:CaseState,ref:string):boolean{
  if(ref==='E2.a')return exposed(c,'E2.a/description')||['E2.a/frame1','E2.a/frame2','E2.a/frame3','E2.a/end'].every(r=>exposed(c,r));
  if(ref==='E5.c')return exposed(c,'E5.c/seen');
  const part=parts.get(ref);if(!part)return false;
  const list=c.exposures.filter(e=>e.refId===ref&&e.ctId===part.ctId);
  return contains(mergeSpans(list.flatMap(e=>e.spans)),part.spans)||(part.medium!=='text'&&list.some(e=>e.visualComplete));
}
export const exposedRefs=(c:CaseState)=>[...parts.keys()].filter(r=>exposed(c,r));
export const available=(c:CaseState,ref:string)=>c.grants.some(g=>g.refs.includes(ref));
export function permittedSpans(c:CaseState,ref:string):Span[]{
 const p=parts.get(ref);if(!p||!available(c,ref))return [];
 if(ref==='E5.b'&&!c.grants.some(g=>g.refs.includes(ref)&&g.viaAccessId!=='NPC.ARI.FILMING_AFTER'))return [[0,Array.from(copy('CT.ARI.FILMING_AFTER')).length]];
 return p.spans;
}
export function sourceOf(ref:string):string{return ref.startsWith('CT.REMY.')?'E2':ref.startsWith('CT.OBJ.')?'E3':ref.startsWith('NAV')?'NAV':ref.slice(0,2);}
export function displayedText(c:CaseState,ref:string):string{
  const p=parts.get(ref);if(!p)return '';
  const ranges=mergeSpans(c.exposures.filter(e=>e.refId===ref&&e.ctId===p.ctId).flatMap(e=>e.spans));
  const chars=Array.from(copy(p.ctId));return ranges.map(([a,b])=>chars.slice(a,b).join('')).join(' … ');
}
export function validExposure(c:CaseState,e:Pick<Exposure,'refId'|'ctId'|'spans'|'viaAccessId'|'visualComplete'>):boolean{
  const p=parts.get(e.refId);if(!p||p.ctId!==e.ctId||!available(c,e.refId))return false;
  if(e.spans.some(([a,b])=>!Number.isInteger(a)||!Number.isInteger(b)||b<=a||!permittedSpans(c,e.refId).some(([l,r])=>a>=l&&b<=r)))return false;
  if(e.visualComplete&&p.medium==='text')return false;
  return c.grants.some(g=>g.refs.includes(e.refId)&&g.viaAccessId===e.viaAccessId)||e.viaAccessId.startsWith('ACC.EVIDENCE.');
}
