import type {CaseState, Run, SaveEnvelope} from '../../contracts/types.js';
import {validateCaseSnapshot, validateSaveEnvelope} from '../../contracts/generated/validators.mjs';
import {IDENTITY} from '../core/state.js';
import {content, parts, texts} from '../core/content.js';
import {validExposure, exposed, sourceOf,available} from '../core/evidence.js';
import {comparisonRefs,knownRooms,metadata} from '../core/reasoning.js';
import {legal, roomData, distance} from '../physical/navigation.js';
import {applyTile, initialPuppet, successful} from '../story/engine.js';
import {eligible} from '../coach/authored.js';
import {readingAvailable,wordContext,supportAvailable} from '../core/experience.js';
import {workStops} from '../physical/presentation.js';

const equal=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b);
export function validRun(c:CaseState,run:Run):boolean {
 let puppet=initialPuppet();
 if(run.nextCue>run.order.length||run.cueResultIds.length!==run.nextCue)return false;
 for(let i=0;i<run.nextCue;i++){
  const out=applyTile(puppet,run.order[i]!);puppet=out.to;
  const o=c.observations.find(o=>o.id===run.cueResultIds[i]);
  if(!o||o.kind!=='cue-outcome'||o.runId!==run.id||o.cueIndex!==i||o.outcome!==out.result||!equal(o.puppet,puppet))return false;
 }
 if(!equal(puppet,run.puppet))return false;
 if(run.activeCue){const cue=run.activeCue,tile=run.order[run.nextCue];if(!tile)return false;const out=applyTile(puppet,tile);
  if(run.status!=='running'||cue.index!==run.nextCue||cue.tile!==tile||!equal(cue.from,puppet)||!equal(cue.to,out.to)||cue.result!==out.result)return false;
 }
 if(run.status==='finalized'){
  if(run.activeCue||run.nextCue!==run.order.length||run.finalizedSeq===null)return false;
  const o=c.observations.find(o=>o.seq===run.finalizedSeq);
  if(!o||o.kind!=='run-finalized'||o.runId!==run.id||!equal(o.puppet,puppet)||o.outcome!==(successful(puppet)?'success':'unsuccessful'))return false;
 }else if(run.finalizedSeq!==null)return false;
 return true;
}

export function validCase(c:CaseState):boolean {
 if(!validateCaseSnapshot({contractKind:'CaseSnapshot',identity:IDENTITY,state:c}))return false;
 const p=c.physical,loop=p.loop;
 if(!legal(roomData(p.room),p.avatar))return false;
 if(loop.mode==='standby'&&(loop.room!=='SC.MD'||!equal(loop.feet,[68,45])))return false;
 if(loop.mode==='following'&&(loop.room!==p.room||!legal(roomData(loop.room),loop.feet)))return false;
 if(['docked','projecting'].includes(loop.mode)&&(loop.room!=='SC.ST'||!equal(loop.feet,[76,35])||!p.objects.dockFlapOpen))return false;
 if(p.caddyHost!=='ST.RACK.BAY'&&p.order.length)return false;
 if(new Set(c.drafts.map(d=>d.id)).size!==5)return false;
 const seq=c.observations.map(o=>o.seq),ids=c.observations.map(o=>o.id);
 if(new Set(seq).size!==seq.length||new Set(ids).size!==ids.length||seq.some((n,i)=>n>c.lastObservationSeq||(i>0&&n<=seq[i-1]!)))return false;
 if(c.observations.some(o=>o.contentIds.some(id=>!texts.has(id)&&!(o.kind.startsWith('reading-')&&readingAvailable(c,id))&&!(o.kind==='word-looked-up'&&wordContext(id)))))return false;
 if(c.experience&&(c.experience.wordContexts.some(id=>{
  const context=wordContext(id);if(!context)return true;
  if(context.ct.startsWith('CT.SRC.'))return !c.exposures.some(e=>e.ctId===context.ct&&e.spans.some(([a,b])=>a<=context.start&&b>=context.end));
  return context.ct==='CT.ER13.ENDING'&&!readingAvailable(c,'READ.ENDING');
 })||c.experience.supports.some(id=>!supportAvailable(c,id))||c.experience.narratorCard&&!readingAvailable(c,c.experience.narratorCard)))return false;
 if(c.observations.some(o=>o.kind==='word-looked-up'&&o.contentIds.some(id=>!c.experience?.wordContexts.includes(id))))return false;
 for(const g of c.grants){
  const access=content.accesses.find(a=>a.id===g.viaAccessId);
  const spoken:Record<string,string[]>={
   'NPC.JO.JO_NOTE':['E6.a','E6.b'],'NPC.REMY.REMY_NOTE':['E7.a','E7.b','E7.c'],
   'NPC.REMY.CLIP':['CT.REMY.CLIP'],'NPC.REMY.POST':['E2.c'],
   'NPC.ARI.FILMING':['E5.b'],'NPC.ARI.FILMING_AFTER':['E5.b'],
   'NPC.ARI.REQUEST':['E4.a','E4.b'],'NPC.ARI.SLATE':['E5.a'],
   'SC.MD':['E5.c','E5.c/seen'],'ACT.LOOP':['E5.c/response'],
   'ACC.VENUE':['NAV.ST','NAV.CY','NAV.WK','NAV.MEDIA'],
  };
  const permitted=[...(access?.grants??[]),...(spoken[g.viaAccessId]??[]),...(g.viaAccessId==='CY.SOURCE.E3'?['CT.OBJ.NOTICE_PARTIAL']:[])];
  if(g.refs.some(r=>!parts.has(r)||sourceOf(r)!==g.sourceId||!permitted.includes(r)))return false;
  if(g.refs.some(r=>r==='E3.a'||r==='E3.b')&&!p.objects.noticeFlat)return false;
  if(!c.observations.some(o=>o.seq===g.seq&&o.kind==='source-available'))return false;
 }
 if(c.exposures.some(e=>!validExposure(c,e)||e.firstSeq>e.lastSeq||e.lastSeq>c.lastObservationSeq))return false;
 if(c.drafts.some(d=>d.selectedRefs.some(r=>!exposed(c,r))))return false;
 const records=new Map(c.records.map(r=>[r.id,r]));if(records.size!==c.records.length)return false;
 for(const r of c.records){
  if(r.refs.some(ref=>!exposed(c,ref))||r.seq>c.lastObservationSeq||Array.from(r.text).length>600)return false;
  if(r.previousRecordId){const previous=records.get(r.previousRecordId);if(!previous||previous.seq>=r.seq||previous.topic!==r.topic||previous.kind!==r.kind||previous.recipient!==r.recipient)return false;}
  if(['private-idea','crew-plan','coaching-submission'].includes(r.kind)&&r.recipient!==null)return false;
  if(r.kind==='jo-explanation'&&r.recipient!=='ACT.JO')return false;
  if(r.kind==='evidence-delivery'&&r.recipient===null)return false;
 }
 if(new Set(c.comparisons.map(row=>row.id)).size!==c.comparisons.length||c.comparisons.filter(row=>row.recordedSeq===null).length>1)return false;
 for(const row of c.comparisons){
  if(comparisonRefs(row).some(ref=>!exposed(c,ref)))return false;
  if(row.recordedSeq!==null){const r=records.get(row.id);if(!r||r.kind!=='private-idea'||r.seq!==row.recordedSeq||r.text!==row.note||!equal(r.refs,comparisonRefs(row)))return false;}
 }
 if(c.reasoning){
  const {privateRevisionOf,comparisonRevisionOf,leadDestination}=c.reasoning;
  for(const [id,comparison]of [[privateRevisionOf,false],[comparisonRevisionOf,true]] as const)if(id){const r=records.get(id);if(!r||r.kind!=='private-idea'||c.comparisons.some(row=>row.id===id&&row.recordedSeq!==null)!==comparison)return false;}
  if(leadDestination&&(!c.selectedLead||!knownRooms(c).some(room=>room.id===leadDestination)))return false;
 }
 for(const o of c.observations)if(o.kind==='source-displayed'&&o.contentIds.some(id=>['CT.META.POSTED','CT.META.RECORDED','CT.META.CAPTURED'].includes(id))){
  if(o.origin!=='access'||o.refs.length!==1||o.contentIds.length!==1||!available(c,o.refs[0]!)||metadata(o.refs[0]!)?.ct!==o.contentIds[0])return false;
 }
 if(c.readerResume&&(!available(c,c.readerResume.componentRef)||sourceOf(c.readerResume.componentRef)!==c.readerResume.sourceId))return false;
 for(const n of c.npcReceived){const delivered=n.deliveryRecordIds.map(id=>records.get(id));
  if(delivered.some(r=>!r||r.recipient!==n.actorId||!['evidence-delivery','jo-explanation'].includes(r.kind)))return false;
  if(n.refs.some(ref=>!delivered.some(r=>r?.refs.includes(ref))))return false;
 }
 if(c.runHistory.some(r=>!validRun(c,r)))return false;
 if(c.playback){const r=c.playback;if(!validRun(c,r)||!equal(r.order,p.order)||r.arrangementRevision!==p.arrangementRevision)return false;
  if(r.status==='running'&&(loop.mode!=='projecting'||p.room!=='SC.ST'||p.caddyHost!=='ST.RACK.BAY'||!workStops().some(a=>distance(p.avatar,a)<=2)))return false;
 }else if(loop.mode==='projecting')return false;
 const runs=[...c.runHistory,...(c.playback?[c.playback]:[])];
 if(c.certificate){const r=runs.find(r=>r.id===c.certificate!.runId);if(!r||r.mode!=='rehearsal'||r.status!=='finalized'||!successful(r.puppet)||r.arrangementRevision!==p.arrangementRevision||c.certificate.arrangementRevision!==p.arrangementRevision||!equal(r.order,p.order))return false;}
 if(c.premiere){const r=runs.find(r=>r.id===c.premiere!.runId);if(!r||r.mode!=='show'||r.status!=='finalized'||!successful(r.puppet)||!equal(r.order,c.premiere.order)||r.finalizedSeq!==c.premiere.completedSeq||r.arrangementRevision!==c.premiere.arrangementRevision)return false;}
 if(new Set(c.coachingHistory.map(h=>h.requestId)).size!==c.coachingHistory.length)return false;
 for(const h of c.coachingHistory){
  if(h.context.caseRunId!==c.caseRunId||h.context.exposedRefs.some(ref=>!exposed(c,ref)))return false;
  if(h.submittedRecordId){const r=records.get(h.submittedRecordId);if(!r||r.kind!=='coaching-submission')return false;}
  if(h.selection&&(!eligible(h.context,h.selection)||h.origin!=='live-selection'||!equal(h.contentIds,[content.coachingMoves.find(move=>move.id===h.selection!.moveId)?.contentCt])))return false;
  if(h.displayedSeq!==null){const o=c.observations.find(o=>o.seq===h.displayedSeq);if(!o||o.kind!=='help-displayed'||o.requestId!==h.requestId||o.origin!==h.origin||!equal(o.contentIds,h.contentIds)||o.recordId!==h.submittedRecordId)return false;}
 }
 return true;
}

export type Inspected={status:'empty'|'valid'|'run'|'version'|'damaged';envelope:SaveEnvelope|null};
export function inspectSave(raw:unknown):Inspected {
 if(raw===undefined)return {status:'empty',envelope:null};
 if(typeof raw!=='string'||new TextEncoder().encode(raw).length>2*1024*1024)return {status:'damaged',envelope:null};
 let value:unknown;try{value=JSON.parse(raw);}catch{return {status:'damaged',envelope:null};}
 if(!value||typeof value!=='object')return {status:'damaged',envelope:null};
 const head=value as Partial<SaveEnvelope>;
 if(head.contractKind==='SaveEnvelope'&&(head.saveFormatVersion!==1||head.identity?.caseId!==IDENTITY.caseId||head.identity.contentVersion!==IDENTITY.contentVersion||head.identity.contentRevision!==IDENTITY.contentRevision))return {status:'version',envelope:null};
 if(validateSaveEnvelope(value)&&Number.isFinite(Date.parse(value.writtenAt))&&validCase(value.payload))return {status:'valid',envelope:value};
 // Only pending playback and its current certificate may be discarded. All other
 // groups, including historical completion, must independently pass validation.
 const repaired=structuredClone(value) as SaveEnvelope;
 if(repaired.payload?.playback){
  repaired.payload.playback=null;repaired.payload.certificate=null;
  if(repaired.payload.physical?.loop.mode==='projecting')repaired.payload.physical.loop.mode='docked';
  if(validateSaveEnvelope(repaired)&&Number.isFinite(Date.parse(repaired.writtenAt))&&validCase(repaired.payload))return {status:'run',envelope:repaired};
 }
 return {status:'damaged',envelope:null};
}
