import type {CaseState,Comparison,Record as IdeaRecord} from '../../contracts/types.js';
import {content,copy,parts} from './content.js';
import {available,exposed,sourceOf} from './evidence.js';
import {allocate,caption,observe,setView,touch,type Mutation} from './reducer.js';
import {record} from './people.js';

export const questionIds={ 'where-loop':'CT.LEAD.WHERE',cancellation:'CT.LEAD.CANCELED',recording:'CT.LEAD.MOVED','story-plan':'CT.LEAD.PROMISE'} as const;
export const relationshipIds={supports:'CT.COMPARE.SUPPORTS','conflicts-with':'CT.COMPARE.CONFLICTS','happened-before':'CT.COMPARE.BEFORE'} as const;
export const comparisonDraft=(c:CaseState)=>c.comparisons.find(row=>row.recordedSeq===null);
export const comparisonRefs=(row?:Comparison)=>[...new Set([row?.leftRef,row?.rightRef].filter((ref):ref is string=>!!ref))];
export const reasoning=(c:CaseState)=>c.reasoning??={privateRevisionOf:null,comparisonRevisionOf:null,leadDestination:null};
export const knownRooms=(c:CaseState)=>content.rooms.filter(room=>c.visitedRooms.includes(room.id)||exposed(c,`NAV.${room.id==='SC.MD'?'MEDIA':room.id.slice(3)}`));
export function nextDoor(from:CaseState['physical']['room'],destination:CaseState['physical']['room']){
 const queue=[{room:from,first:''}],seen=new Set([from]);
 for(const step of queue)for(const door of content.doors.filter(d=>d.room===step.room)){
  const first=step.first||door.id;if(door.destinationRoom===destination)return first;
  if(!seen.has(door.destinationRoom)){seen.add(door.destinationRoom);queue.push({room:door.destinationRoom,first});}
 }
 return null;
}
export function changeComparison(m:Mutation,change:{slot?:'leftRef'|'rightRef';ref?:string|null;relationship?:Comparison['relationship'];note?:string}){
 if(change.ref&&!exposed(m.s.case,change.ref))return;
 let row=comparisonDraft(m.s.case);
 if(!row){row={id:allocate(m),leftRef:null,rightRef:null,relationship:null,note:'',recordedSeq:null};m.s.case.comparisons.push(row);}
 if(change.slot&&change.ref!==undefined)row[change.slot]=change.ref;
 if(change.relationship!==undefined)row.relationship=change.relationship;
 if(change.note!==undefined)row.note=change.note;
 touch(m);
}
export function saveIdea(m:Mutation,comparison=false){
 const c=m.s.case,d=c.drafts.find(d=>d.id==='private')!,row=comparisonDraft(c);
 const text=comparison?row?.note??'':d.text,refs=comparison?comparisonRefs(row):[...d.selectedRefs];
 if(!text.trim()&&!refs.length&&!(comparison&&row?.relationship)){caption(m,['CT.UI.NOTHING']);return;}
 const tracking=reasoning(c),previousRecordId=comparison?tracking.comparisonRevisionOf:tracking.privateRevisionOf,previous=c.records.find(r=>r.id===previousRecordId);
 const priorComparison=previous&&recordComparison(c,previous);
 if(previous&&previous.text===text&&JSON.stringify(previous.refs)===JSON.stringify(refs)&&(!comparison||priorComparison&&priorComparison.leftRef===row?.leftRef&&priorComparison.rightRef===row?.rightRef&&priorComparison.relationship===row?.relationship)){
  setView(m,{page:'idea',action:'recorded',ref:previous.id});return;
 }
 const saved=record(m,'private-idea',previous?.topic??(c.selectedLead==='story-plan'?'story':'search'),text,refs,null,{allowEmpty:true,previousRecordId});if(!saved)return;
 if(comparison&&row){c.comparisons.push({...row,id:saved.id,recordedSeq:saved.seq});tracking.comparisonRevisionOf=saved.id;}
 else tracking.privateRevisionOf=saved.id;
 setView(m,{page:'idea',action:'recorded',ref:saved.id});caption(m,['CT.IDEA.RECORDED']);
}
export function editIdea(m:Mutation,id:string){
 const c=m.s.case,saved=c.records.find(r=>r.id===id&&r.kind==='private-idea');if(!saved)return;
 const row=c.comparisons.find(r=>r.id===id&&r.recordedSeq!==null),tracking=reasoning(c);
 if(row){
  let draft=comparisonDraft(c);if(!draft){draft={...row,id:allocate(m),recordedSeq:null};c.comparisons.push(draft);}
  Object.assign(draft,{leftRef:row.leftRef,rightRef:row.rightRef,relationship:row.relationship,note:row.note});tracking.comparisonRevisionOf=id;setView(m,{page:'compare'});
 }else{const draft=c.drafts.find(d=>d.id==='private')!;draft.text=saved.text;draft.selectedRefs=[...saved.refs];draft.revision++;tracking.privateRevisionOf=id;setView(m,{page:'idea'});}
 touch(m);
}
export interface DetailGroup {id:string;sourceId:string;title:string;refs:string[];}
export function detailGroups(c:CaseState,onlyExposed=false):DetailGroup[]{
 const groups=new Map<string,DetailGroup>();
 for(const source of content.sources)for(const part of source.parts){
  const ref=part.refId;if(['E2.a','E5.c'].includes(ref)||!(onlyExposed||source.id==='NAV'?exposed(c,ref):available(c,ref)))continue;
  const id=ref.startsWith('E2.a/')?'E2.recording':ref==='E2.b'?'E2.photo':ref==='E2.c'?'E2.post':ref==='CT.REMY.CLIP'?'E2.account':ref==='CT.OBJ.NOTICE_PARTIAL'?'E3.partial':ref.startsWith('E5.')?(ref.startsWith('E5.c/')?'E5.observation':ref):source.id;
  const titles:Record<string,string>={'E2.recording':copy('CT.MEDIA.RECORDING'),'E2.photo':copy('CT.MEDIA.PHOTO'),'E2.post':copy('CT.MEDIA.MESSAGE'),'E2.account':copy('CT.META.ACCOUNT',{person:'Remy'}),'E3.partial':c.physical.objects.noticeFlat?'Earlier view of the notice':copy('CT.OBJ.NOTICE_CURLED'),'E5.a':copy('CT.TALK.SLATE'),'E5.b':copy('CT.META.ACCOUNT',{person:'Ari'}),'E5.observation':copy('CT.META.OBSERVATION')};
  let group=groups.get(id);if(!group){group={id,sourceId:source.id,title:titles[id]??copy(source.titleCt),refs:[]};groups.set(id,group);}group.refs.push(ref);
 }
 return [...groups.values()];
}
export function provenance(ref:string):string{
 const p=parts.get(ref);if(!p)return '';
 if(p.provenance==='venue')return copy('CT.META.VENUE');if(p.provenance==='tile')return copy('CT.META.CREW');if(p.provenance==='observation')return copy('CT.META.OBSERVATION');
 const person=p.authorId?.slice(4).toLowerCase().replace(/^./,v=>v.toUpperCase())??'';
 return copy(p.provenance==='spoken-account'?'CT.META.ACCOUNT':'CT.META.AUTHOR',{person});
}
export function metadata(ref:string){
 const p=parts.get(ref);if(!p||p.storyMinute===null)return null;
 const ct=p.timeKind==='captured'?'CT.META.CAPTURED':p.timeKind==='recorded'?'CT.META.RECORDED':'CT.META.POSTED';
 const time=`${Math.floor(p.storyMinute/60)}:${String(p.storyMinute%60).padStart(2,'0')}`;
 return {ct,time,text:copy(ct,{time}),minute:p.storyMinute,key:sourceOf(ref)+':'+p.storyMinute};
}
export function metadataKnown(c:CaseState,ref:string){
 const meta=metadata(ref);return !!meta&&c.observations.some(o=>o.kind==='source-displayed'&&o.contentIds.includes(meta.ct)&&o.refs.some(r=>metadata(r)?.key===meta.key));
}
export function recordMetadata(m:Mutation,ref:string){
 const v=m.s.runtime.view,meta=metadata(ref);
 if(!meta||!available(m.s.case,ref)||!['reader','picker'].includes(v.page)||v.sourceId!==sourceOf(ref)||metadataKnown(m.s.case,ref))return;
 observe(m,'source-displayed',{refs:[ref],contentIds:[meta.ct],origin:'access'});
}
export function timeline(c:CaseState,discovery=false){
 const rows: Array<{id:string;ref:string;sourceId:string;title:string;typeCt:string;minute:number|null;seq:number}>=[];
 for(const group of detailGroups(c)){
  if(group.sourceId==='NAV'||group.sourceId==='E8')continue;
  const known=group.refs.filter(ref=>exposed(c,ref)||metadataKnown(c,ref));if(!known.length)continue;
  if(['E2.recording','E2.post'].includes(group.id)&&!known.some(ref=>metadataKnown(c,ref)))continue;
  const ref=known[0]!,meta=known.map(metadata).find(Boolean),minute=meta&&known.some(r=>metadataKnown(c,r))?meta.minute:null;
  const first=c.observations.find(o=>o.kind==='source-displayed'&&o.refs.some(r=>known.includes(r)))?.seq??c.lastObservationSeq;
  const p=parts.get(ref)!,typeCt=group.id==='E4'?'CT.TIMELINE.PLAN':group.id==='E3'?'CT.TIMELINE.NOTICE':group.id==='E2.recording'?'CT.TIMELINE.RECORDING':group.id==='E2.post'?'CT.TIMELINE.POST':group.id==='E5.a'?'CT.TIMELINE.CAPTURE':p.provenance==='spoken-account'?'CT.TIMELINE.ACCOUNT':'CT.TIMELINE.OBSERVED';
  rows.push({id:group.id,ref,sourceId:group.sourceId,title:group.title,typeCt,minute,seq:first});
 }
 return rows.sort((a,b)=>discovery?a.seq-b.seq:(a.minute??Infinity)-(b.minute??Infinity)||0);
}
export function recordComparison(c:CaseState,r:IdeaRecord){return c.comparisons.find(row=>row.id===r.id&&row.recordedSeq===r.seq);}
