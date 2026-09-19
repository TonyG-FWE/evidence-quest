import test from 'node:test';
import assert from 'node:assert/strict';
import {guardPilot} from './tripo-pilot.mjs';
const ledger=()=>({ceiling:2500,allocations:{pilot:400},actualCharged:0,jobs:[]});
test('pilot permits the exact phase ceiling and rejects one credit more',()=>{guardPilot(ledger(),400);assert.throws(()=>guardPilot(ledger(),401),/ceiling/);});
test('unknown submissions block new paid and free operations',()=>{const l=ledger();l.jobs.push({status:'UNRESOLVED',phase:'pilot',actualCredits:null});assert.throws(()=>guardPilot(l,0),/Unresolved/);});
test('actual charges constrain the remaining pilot allocation',()=>{const l=ledger();l.actualCharged=390;l.jobs.push({status:'SUCCESS',phase:'pilot',actualCredits:390});guardPilot(l,10);assert.throws(()=>guardPilot(l,11),/ceiling/);});
test('the total ceiling and accounting consistency are independent guards',()=>{const l=ledger();l.ceiling=200;assert.throws(()=>guardPilot(l,201),/ceiling/);l.actualCharged=1;assert.throws(()=>guardPilot(l,0),/mismatch/);});
