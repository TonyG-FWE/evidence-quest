import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdir,mkdtemp,readFile,rm} from 'node:fs/promises';
import {resolve,join,sep} from 'node:path';
import {openLedger} from './attempt-ledger.mjs';
test('75 durable reservations include failures and survive restart; concurrent runners fail closed',async()=>{
  const root=resolve('.cache/evaluation-tests');await mkdir(root,{recursive:true});const dir=await mkdtemp(join(root,'ledger-')),path=join(dir,'attempts.jsonl');
  try{let ledger=await openLedger(path);await assert.rejects(openLedger(path));
    for(let i=1;i<=40;i++)assert.equal(await ledger.reserve({fixtureId:'synthetic',trial:i}),i);
    await ledger.result(1,{status:'timeout'});await ledger.close();ledger=await openLedger(path);assert.equal(ledger.used,40);
    for(let i=41;i<=75;i++)assert.equal(await ledger.reserve({fixtureId:'synthetic',trial:i}),i);
    await assert.rejects(ledger.reserve({}),/ceiling/);await ledger.close();assert.equal((await readFile(path,'utf8')).trim().split('\n').length,76);
    ledger=await openLedger(path);assert.equal(ledger.used,75);await assert.rejects(ledger.reserve({}),/ceiling/);await ledger.close();
  }finally{assert(resolve(dir).startsWith(root+sep));await rm(dir,{recursive:true});}
});
test('provider halt is durable and does not restore attempts',async()=>{
  const root=resolve('.cache/evaluation-tests');await mkdir(root,{recursive:true});const dir=await mkdtemp(join(root,'halt-')),path=join(dir,'attempts.jsonl');
  try{let ledger=await openLedger(path);await ledger.reserve({fixtureId:'synthetic'});await ledger.halt('HTTP 404');await ledger.close();ledger=await openLedger(path);assert.equal(ledger.used,1);assert(ledger.halted);await assert.rejects(ledger.reserve({}),/halted/);await ledger.close();}
  finally{assert(resolve(dir).startsWith(root+sep));await rm(dir,{recursive:true});}
});
