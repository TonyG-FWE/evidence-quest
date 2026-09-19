/** Immutable minimum accounting history, separate from append-only operation. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {sha256} from './demo-assets.mjs';
export const LEDGER_BASELINE='assets/demo/operational-ledgers.json';
export const OPERATIONAL_LEDGERS=[
 {file:'evidence/voice-ai-demo-20260918/openai-attempts.jsonl',mode:'append-only'},
 {file:'evidence/demo-ai-20260919/openai-attempts.jsonl',mode:'append-only'},
 {file:'evidence/cast-audio-20260919/attempts.jsonl',mode:'append-only'},
 {file:'evidence/er13/live-evaluation/attempts.jsonl',mode:'exact'},
];
function rows(bytes,file){
 const text=bytes.toString('utf8');if(!text.length||!text.endsWith('\n'))throw Error('Ledger is empty or has an incomplete append: '+file);
 return text.split('\n').filter(Boolean).map(line=>{let row;try{row=JSON.parse(line);}catch{throw Error('Invalid ledger JSON: '+file);}
  if(!row||typeof row!=='object'||Array.isArray(row)||typeof (row.event??row.kind)!=='string')throw Error('Invalid ledger record: '+file);
  return row;
 });
}
export async function readLedgerPrefix(root,definition){
 const bytes=await fs.readFile(path.join(root,definition.file)),records=rows(bytes,definition.file);
 return {...definition,bytes:bytes.length,sha256:sha256(bytes),records:records.length};
}
export async function verifyLedgerHistory(root=process.cwd(),baseline){
 baseline??=JSON.parse(await fs.readFile(path.join(root,LEDGER_BASELINE),'utf8'));
 if(baseline.schema!=='eq.operational-ledger-baseline.v1'||!Array.isArray(baseline.ledgers)||baseline.ledgers.length!==OPERATIONAL_LEDGERS.length)throw Error('Missing complete operational-ledger baseline');
 const verified=[],seen=new Set();
 for(const record of baseline.ledgers){
  const definition=OPERATIONAL_LEDGERS.find(item=>item.file===record.file);
  if(!definition||seen.has(record.file)||record.mode!==definition.mode||!Number.isSafeInteger(record.bytes)||record.bytes<=0||!Number.isSafeInteger(record.records)||record.records<=0||!/^[a-f0-9]{64}$/.test(record.sha256??''))throw Error('Invalid operational-ledger baseline record');seen.add(record.file);
  const bytes=await fs.readFile(path.join(root,record.file));
  if(bytes.length<record.bytes||record.mode==='exact'&&bytes.length!==record.bytes||sha256(bytes.subarray(0,record.bytes))!==record.sha256)throw Error('Preserved operational history changed or was truncated: '+record.file);
  const count=rows(bytes,record.file).length;if(count<record.records)throw Error('Operational records removed: '+record.file);
  verified.push({...definition,bytes:bytes.length,sha256:sha256(bytes),records:count});
 }
 return {schema:'eq.operational-ledger-baseline.v1',ledgers:verified,scope:'Minimum preserved prefixes. Append-only ledgers may grow without changing game build inputs; missing, truncated or rewritten history fails closed. Historical TASK11.19 remains exact.'};
}
