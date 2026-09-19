import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {captureDemoInputs,listFiles,fileRecords,recordsDigest,changedRecords} from './demo-inputs.mjs';
import {verifyLedgerHistory} from './demo-ledgers.mjs';

export const BUILD_RECEIPT='dist/personal-review-client/demo-package.json';
export const OUTPUT_DIRECTORIES=['dist/personal-review-client','dist/server','dist/src','dist/content','dist/contracts'];
const excluded=file=>file===BUILD_RECEIPT;
export async function captureDemoOutputs(root=process.cwd()){
 const files=[];for(const directory of OUTPUT_DIRECTORIES)files.push(...await listFiles(root,directory));
 const records=await fileRecords(root,files.filter(file=>!excluded(file)));return {sha256:recordsDigest(records),records};
}
function gitIdentity(root){
 try{return {head:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim(),tree:execFileSync('git',['rev-parse','HEAD^{tree}'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim()};}
 catch{return {head:null,tree:null};}
}
export async function writeDemoReceipt({root=process.cwd(),inputs,hydrated,audio}){
 const actual=await captureDemoInputs(root),changed=changedRecords(inputs.records,actual.records);
 if(changed.length)throw Error('Demo inputs changed during build; no receipt issued: '+changed.join(', '));
 const outputs=await captureDemoOutputs(root),operationalLedgers=await verifyLedgerHistory(root);
 const receipt={schema:'evidence-quest.demo-build.v2',profile:'local-review-personal-landscape',approval:'pending-review',at:new Date().toISOString(),git:gitIdentity(root),runtime:{node:process.version,platform:process.platform,arch:process.arch},assetManifestSha256:hydrated.manifestSha256,audio,inputs:actual,outputs,operationalLedgers,scope:'Exact input and compiled delivery bytes. Source checkout and compiled trees are reverified before start; valid operational ledger appends do not alter build inputs. Browser, performance and human acceptance remain separate.'};
 await fs.writeFile(path.join(root,BUILD_RECEIPT),JSON.stringify(receipt,null,2)+'\n');return receipt;
}
export async function verifyDemoReceipt(root=process.cwd()){
 const receipt=JSON.parse(await fs.readFile(path.join(root,BUILD_RECEIPT),'utf8'));
 if(receipt.schema!=='evidence-quest.demo-build.v2'||receipt.profile!=='local-review-personal-landscape'||receipt.approval!=='pending-review'||!Array.isArray(receipt.inputs?.records)||!Array.isArray(receipt.outputs?.records))throw Error('Demo has no complete source/output receipt; run build:demo');
 if(!receipt.operationalLedgers)throw Error('Demo has no minimum operational-history binding; run build:demo');
 await verifyLedgerHistory(root);await verifyLedgerHistory(root,receipt.operationalLedgers);
 for(const name of ['inputs','outputs'])if(recordsDigest(receipt[name].records)!==receipt[name].sha256)throw Error('Invalid demo '+name+' record digest');
 const inputs=await captureDemoInputs(root),inputChanges=changedRecords(receipt.inputs.records,inputs.records);
 if(inputChanges.length)throw Error('Demo source changed; run build:demo: '+inputChanges.join(', '));
 const outputs=await captureDemoOutputs(root),outputChanges=changedRecords(receipt.outputs.records,outputs.records);
 if(outputChanges.length)throw Error('Compiled demo changed; run build:demo: '+outputChanges.join(', '));
 return receipt;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 if(process.argv.length!==3||process.argv[2]!=='verify')throw Error('Usage: node scripts/demo-build-receipt.mjs verify');
 const receipt=await verifyDemoReceipt();console.log(JSON.stringify({status:'EXACT_INPUTS_AND_OUTPUTS_MATCH',inputSha256:receipt.inputs.sha256,outputSha256:receipt.outputs.sha256,inputFiles:receipt.inputs.records.length,outputFiles:receipt.outputs.records.length},null,2));
}
