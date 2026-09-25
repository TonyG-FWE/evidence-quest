/** Explicit native demo rehearsal. Default is provider-free; --live is guarded by the durable one-attempt marker. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {authoredEnvironment} from '../scripts/demo-inputs.mjs';
import {verifyDemoReceipt} from '../scripts/demo-build-receipt.mjs';
const replay=process.argv.includes('--replay-feedback'),live=process.argv.includes('--live'),label=process.argv.find(x=>x.startsWith('--label='))?.slice(8);
if(replay&&live)throw Error('Recorded response replay must never enable a provider.');
if(!label||!/^[a-z0-9-]+$/.test(label))throw Error('Unique rehearsal label required');
const output='output/nerdy-demo-rehearsal-'+label;
await fs.mkdir(output,{recursive:true});await fs.writeFile(output+'/started.json',JSON.stringify({at:new Date().toISOString(),live,replay},null,2),{flag:'wx'});
const receipt=await verifyDemoReceipt();
const env={...authoredEnvironment(),PATH:path.dirname(process.execPath)+';'+process.env.PATH,EQ_DEMO_PRESENTATION:'1',EQ_NERDY_REHEARSAL:'1',EQ_NERDY_LIVE:live?'1':'0',EQ_NERDY_REPLAY_FEEDBACK:replay?'1':'0',EQ_TEST_PORT:'4409',EQ_BROWSER_OUTPUT_DIR:output+'/raw',PLAYWRIGHT_JSON_OUTPUT_NAME:output+'/results.json'};
env.EQ_NERDY_CANDIDATE_INPUT_SHA=receipt.inputs.sha256;env.EQ_NERDY_CANDIDATE_OUTPUT_SHA=receipt.outputs.sha256;
if(live){
 try{await fs.access('evidence/nerdy-demo-20260924/live-request-attempt.json');throw Error('A live request was already reserved; no second provider attempt is authorized.');}catch(error){if(error.code!=='ENOENT')throw error;}
 process.loadEnvFile('.env.server.local');if(!process.env.OPENAI_API_KEY)throw Error('Local OpenAI key is unavailable');
 env.OPENAI_API_KEY=process.env.OPENAI_API_KEY;env.EQ_GARDEN_AI_DEMO='1';env.EQ_GARDEN_AI_SESSION='recording';
}
await fs.writeFile(output+'/candidate.json',JSON.stringify({inputSha256:receipt.inputs.sha256,outputSha256:receipt.outputs.sha256,inputs:receipt.inputs.records.length,outputs:receipt.outputs.records.length},null,2)+'\n');
const code=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['scripts/test-browser.mjs','browser-tests/nerdy-demo-rehearsal.spec.ts','--workers=1','--retries=0','--trace=off'],{env,stdio:'inherit',windowsHide:true});child.on('error',reject);child.on('exit',code=>resolve(code??1));});
process.exitCode=code;
