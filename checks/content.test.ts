import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import type { AuthoredContent, Identity, Point, Puppet } from '../contracts/types.js';

const identity:Identity={caseId:'sparkfest-little-bridge-001',contentVersion:3,contentRevision:1};
const point:Point=[20,50];
const puppet:Puppet={pip:'left',seed:'left',boats:'separate',lit:false};
test('schema-linked fixed identity, tuple and puppet types retain selected contracts',()=>{
  assert.equal(identity.contentVersion,3);assert.equal(point.length,2);assert.equal(puppet.seed,'left');
});
test('E2 source slices cannot turn the first frame or photo into later recording/notice facts',()=>{
  const content=JSON.parse(readFileSync('content/authored.json','utf8')) as AuthoredContent;
  const entries=new Map(content.texts.map(t=>[t.id,t.text]));
  const e2=content.sources.find(s=>s.id==='E2');assert(e2);
  const first=e2.parts.find(p=>p.refId==='E2.a/frame1');assert(first);
  assert.equal(entries.get(first.ctId),'Loop is on a low wheeled crew cart in the courtyard.');
  assert(!entries.get(first.ctId)?.includes('door'));
  assert.equal(entries.get('CT.SRC.E2.B'),'Part of the courtyard notice.');
  assert.deepEqual(e2.parts.find(p=>p.refId==='E2.a')?.requiresAll,['E2.a/frame1','E2.a/frame2','E2.a/frame3','E2.a/end']);
});
test('all physical copies share exact canonical E6/E7 and no collection grants their reading',()=>{
  const content=JSON.parse(readFileSync('content/authored.json','utf8')) as AuthoredContent;
  for(const sourceId of ['E6','E7']){
    const copies=content.copies.filter(c=>c.sourceId===sourceId);
    assert.equal(copies.length,3);
    assert(copies.some(c=>c.id===`KIT.NOTE.${sourceId}`));
    assert(copies.some(c=>c.id===`MD.SOURCE.${sourceId}`));
    assert(copies.every(c=>c.bodyRefs.every(ref=>ref.startsWith(sourceId+'.'))));
  }
  assert.deepEqual(content.accesses.find(a=>a.id==='MD.ACCESS.E8')?.grants,[]);
});
