import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {guardProduction} from './tripo-library.mjs';
const base={ceiling:2500,allocations:{pilot:400,production:1600,corrections:500},actualCharged:290,reservedForUnresolved:0,jobs:[{phase:'pilot',status:'SUCCESS',actualCredits:290}]};
test('production uses its allocation without spending pilot or correction reserves',()=>{
 assert.doesNotThrow(()=>guardProduction(base,50));
 assert.throws(()=>guardProduction({...base,actualCharged:1850,jobs:[...base.jobs,{phase:'production',status:'SUCCESS',actualCredits:1560}]},50),/allocation/);
 assert.throws(()=>guardProduction({...base,ceiling:300},50),/allocation/);
});
test('unresolved submissions and accounting mismatches block another request',()=>{
 for(const status of ['SUBMITTING','UNRESOLVED'])assert.throws(()=>guardProduction({...base,jobs:[...base.jobs,{phase:'production',status,actualCredits:null}]},50),/Unresolved/);
 assert.throws(()=>guardProduction({...base,reservedForUnresolved:50},50),/Unresolved/);
 assert.throws(()=>guardProduction({...base,actualCharged:0},50),/accounting/);
});
test('all 77 master sources and 91 reference images match explicit approval receipts',()=>{
 const root='evidence/hands-on-20260916/pilot/reference-library-20260917/';
 const m=JSON.parse(fs.readFileSync(root+'asset-manifest.json'));
 const receipt=JSON.parse(fs.readFileSync(root+'reference-approvals.json'));
 assert.equal(m.assets.length,77);
 const images=[...m.assets.flatMap(a=>a.images),...m.contextImages];assert.equal(images.length,91);
 for(const im of images){
  assert.equal(createHash('sha256').update(fs.readFileSync(root+im.path)).digest('hex'),im.sha256);
  assert.equal(im.approvalStatus,'approved-reference');
  assert.ok(receipt.records.some(r=>r.imageId===im.id&&r.sha256===im.sha256));
 }
});
