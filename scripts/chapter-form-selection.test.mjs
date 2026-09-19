import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chapterFormSelection,chapterFinishSelection} from './chapter-form-selection.mjs';
const candidates=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/chapter-review/manifest.json','utf8'));
const source=JSON.parse(await fs.readFile('evidence/integrated-checkpoint-20260916/character-form-approval.json','utf8'));
// Synthetic authorization input tests gate behavior only. This file is never
// written as a production approval receipt and exports no model.
const fixture=()=>({schema:'evidence-quest.chapter-form-approval.v1',approvedBy:'Tony',userApproval:'Synthetic gate contract fixture; not a human approval',assets:[{id:'pip-chapter',sha256:candidates.pipCombined.sha256,status:'APPROVED'}]});
test('missing human text and altered model hashes cannot select a production derivative',()=>{
 assert.throws(()=>chapterFormSelection({...fixture(),userApproval:null},candidates,source),/explicit chapter Form/);
 const changed=fixture();changed.assets[0].sha256='0'.repeat(64);assert.throws(()=>chapterFormSelection(changed,candidates,source),/hash\/source mismatch/);
 assert.throws(()=>chapterFormSelection(fixture(),{...candidates,bridgeActions:{...candidates.bridgeActions,sourceSha256:'0'.repeat(64)}},source),/anatomy provenance/);
});
test('matching individual Form selects only Pip and preserves original idle and carry mappings',()=>{
 const selected=chapterFormSelection(fixture(),candidates,source);assert.equal(selected.length,1);assert.equal(selected[0].record.id,'pip');assert.equal(selected[0].visual.rig.clips.idle,'pip_idle');assert.equal(selected[0].visual.rig.clips.carryIdle,'pip_carry_idle');
 const pending=fixture();pending.assets[0].status='PENDING';assert.deepEqual(chapterFormSelection(pending,candidates,source),[]);
 const unrelated=fixture();unrelated.assets.push({id:'sol',status:'APPROVED',sha256:'0'.repeat(64)});assert.throws(()=>chapterFormSelection(unrelated,candidates,source),/Unsupported/);
});

test('prop approval selects only its matching reviewed model and never grants character or environment approval',async()=>{
 const props=JSON.parse(await fs.readFile(candidates.currentPropReview.file,'utf8'));
 const boat=candidates.pendingForm.props.find(item=>item.id==='seed-boat'),receipt={...fixture(),assets:[{...boat,status:'APPROVED'}]};
 const selected=chapterFormSelection(receipt,candidates,source,props);assert.deepEqual(selected.map(item=>item.record.id),['seed-boat']);assert.equal(chapterFinishSelection(receipt,candidates),null);
 receipt.assets[0].sha256='0'.repeat(64);assert.throws(()=>chapterFormSelection(receipt,candidates,source,props),/prop Form approval/);
});

test('environment approval binds every reviewed geometry dependency without approving models',()=>{
 const kit=candidates.pendingForm.kit,receipt={...fixture(),assets:[{id:'painted-kit',sha256:kit.sha256,dependencies:structuredClone(kit.dependencies),status:'APPROVED'}]};
 const selected=chapterFinishSelection(receipt,candidates);assert.equal(selected.files.length,5);assert.deepEqual(chapterFormSelection(receipt,candidates,source),[]);
 const changed=structuredClone(receipt);changed.assets[0].dependencies[0].sha256='0'.repeat(64);assert.throws(()=>chapterFinishSelection(changed,candidates),/dependency approval/);
 const omitted=structuredClone(receipt);omitted.assets[0].dependencies.pop();assert.throws(()=>chapterFinishSelection(omitted,candidates),/dependency approval/);
 receipt.assets[0].status='PENDING';assert.equal(chapterFinishSelection(receipt,candidates),null);
});
