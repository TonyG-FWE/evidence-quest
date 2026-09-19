import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {randomUUID,createHash} from 'node:crypto';
import {initialState} from '../.cache/checks/src/core/state.js';
import {contextOf} from '../.cache/checks/src/core/people.js';
import {initialPuppet,applyTile} from '../.cache/checks/src/story/engine.js';
import {content} from '../.cache/checks/src/core/content.js';
import {validContext,requestBody,selectionFrom} from '../.cache/checks/server/coach.js';
import {validateCoachRequest} from '../.cache/checks/contracts/generated/validators.mjs';
export const fixturePath='docs/design/evidence-quest-design-v3/11-build-packet/acceptance-fixtures.json';
export const sha=value=>createHash('sha256').update(typeof value==='string'?value:JSON.stringify(value)).digest('hex');
const packetText=await readFile(fixturePath,'utf8');
export const fixtureSha256=sha(packetText);
export const fixtures=JSON.parse(packetText).fixtures.filter(x=>/^FIX11.COACH.(E\d\d|GRANDMA)$/.test(x.id));
assert.equal(fixtures.length,27);
const sharedRun='10000000-0000-4000-8000-000000000001', earlierRun='10000000-0000-4000-8000-000000000002';
function outcomes(order,id){let from=initialPuppet();return order.map((tile,i)=>{const o=applyTile(from,tile),result={refId:`OBS.${id}.${i}`,tile,from:{...from},to:o.to,result:o.result};from=o.to;return result;});}
export function fixtureRequest(fixture){
  const c=contextOf(initialState('10000000-0000-4000-8000-000000000003',randomUUID()),'story-plan');
  const id=fixture.id.split('.').at(-1);
  if(['READY','UNMET','TERMINAL','NO_LOOP'].includes(fixture.preset)){c.loopMode=fixture.preset==='NO_LOOP'?'standby':'docked';c.caddyHost='ST.RACK.BAY';}
  if(['NEW','E2_FIRST'].includes(fixture.preset))c.topic=['E13','E14','E21'].includes(id)?'cancellation':['E15','E16','E17'].includes(id)?'recording':'where-loop';
  if(fixture.preset==='UNMET'||fixture.preset==='TERMINAL'){
    c.order=fixture.preset==='TERMINAL'?['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM','TILE.FERRY']:['TILE.FERRY','TILE.PLANT'];
    c.runId=sharedRun;c.nextCue=c.order.length;c.runStatus=fixture.preset==='TERMINAL'?'finalized':'paused';c.arrangementRevision=1;
    c.observedOutcomes=outcomes(c.order,sharedRun);c.puppet=c.observedOutcomes.at(-1).to;
  }
  const aliases={};if(id==='E11'){
    const previous=outcomes(['TILE.BRIDGE','TILE.PLANT'],earlierRun);c.observedOutcomes.unshift(...previous);
    aliases['OBS.FIX11.BRIDGE']=previous[0].refId;aliases['OBS.FIX11.PLANT']=previous[1].refId;
  }
  c.observedOutcomeRefs=c.observedOutcomes.map(x=>x.refId);c.exposedRefs=[...fixture.sourceContext.actuallyExposedRefs];
  const q={contractKind:'CoachRequest',coachContractVersion:1,identity:content.identity,requestId:randomUUID(),context:c,explanation:id==='E24'?'':fixture.title};
  if(id==='E24')assert(!validateCoachRequest(q),'Empty local input must fail provider request schema');else assert(validateCoachRequest(q),`${id}: request schema`);
  assert(validContext(c),`${id}: semantic context`);
  const expected={...fixture.expected,allowedReferenceIds:fixture.expected.allowedReferenceIds.map(x=>aliases[x]??x)};
  if(expected.apiCalls!==0){
    const body=requestBody(q),displayed=JSON.parse(body.input).displayedSources;
    assert(displayed.every(x=>c.exposedRefs.includes(x.ref)),`${id}: no hidden source slices`);
    const candidate={moveId:expected.allowedMoveIds[0],refs:expected.allowedReferenceIds,interpretation:expected.interpretation,uncertain:expected.uncertain};
    if(candidate.moveId==='TOGETHER')candidate.refs=['E6.a'];
    selectionFrom({status:'completed',model:'gpt-6-astra',output:[{type:'message',status:'completed',role:'assistant',content:[{type:'output_text',text:JSON.stringify(candidate)}]}]},c);
  }
  return {q,expected,aliases};
}
export function judge(proposal,expected,q){
  if(!proposal)return {pass:false,reason:'No valid provider proposal'};
  const checks={meaning:expected.allowedMoveIds.includes(proposal.moveId),tag:proposal.interpretation===expected.interpretation,uncertainty:proposal.uncertain===expected.uncertain,references:Array.isArray(proposal.refs)&&proposal.refs.every(x=>expected.allowedReferenceIds.includes(x))&&(expected.allowedReferenceIds.length?proposal.refs.length>0:proposal.refs.length===0),noUnseenReferences:Array.isArray(proposal.refs)&&proposal.refs.every(x=>[...q.context.exposedRefs,...q.context.observedOutcomeRefs].includes(x))};
  if(proposal.moveId==='TESTABLE_LEAD')checks.references=checks.references&&proposal.refs.includes('E4.a')&&proposal.refs.includes('NAV.MEDIA');
  return {pass:Object.values(checks).every(Boolean),checks};
}
