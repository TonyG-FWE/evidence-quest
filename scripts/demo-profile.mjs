import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {hydrateDemoAssets} from './demo-assets.mjs';
import {verifyDemoAudio} from './verify-demo-audio.mjs';
import {captureDemoInputs,authoredEnvironment} from './demo-inputs.mjs';
import {writeDemoReceipt,verifyDemoReceipt} from './demo-build-receipt.mjs';
import {verifyLedgerHistory} from './demo-ledgers.mjs';

/** Demo feedback can only use the current preserved recording allowance. */
export function guardDemoFeedbackEnvironment(source){
 const env={...source};
 if(env.EQ_GARDEN_AI_DEMO==='1'&&env.EQ_GARDEN_AI_SESSION!=='recording'){
  env.EQ_GARDEN_AI_DEMO='0';
  return {env,notice:'Optional Sol feedback is disabled: start:demo requires EQ_GARDEN_AI_SESSION=recording. Authored play remains available.'};
 }
 return {env,notice:null};
}

async function main(){
const operation=process.argv[2];if(!['build','start'].includes(operation)||process.argv.length!==3)throw Error('Expected build or start');
const feedback=guardDemoFeedbackEnvironment(operation==='build'?authoredEnvironment():process.env);
if(feedback.notice)console.log(feedback.notice);
const env={...feedback.env,EQ_ASSET_PROFILE:'review',EQ_PERSONAL_GRASS:'1',EQ_DEMO_PRESENTATION:'1',COACH_MODE:'authored',HOST:'127.0.0.1',PORT:'4364',PUBLIC_ORIGIN:'http://127.0.0.1:4364',EQ_GARDEN_AI_DEMO:feedback.env.EQ_GARDEN_AI_DEMO??'0',EQ_CAST_DYNAMIC_VOICE:feedback.env.EQ_CAST_DYNAMIC_VOICE??'0'};
delete env.EQ_REVIEW_CLIENT_DIRECTORY;
const run=args=>new Promise((resolve,reject)=>{const child=spawn(process.execPath,args,{env,stdio:'inherit',windowsHide:true});child.on('error',reject);child.on('exit',(code,signal)=>code===0?resolve():reject(Error('Demo command failed ('+(signal??code)+'): node '+args.join(' '))));});
const npm=process.env.npm_execpath??path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
if(operation==='build'){
 await verifyLedgerHistory();
 const audio=await verifyDemoAudio();
 const hydrated=await hydrateDemoAssets();console.log('Verified/hydrated '+hydrated.packageFiles+' exact demo source files.');
 const inputs=await captureDemoInputs();
 // This profile reuses the checked-in illustrated runtime and exact packaged 3D
 // derivatives. It deliberately performs no art export or provider generation.
 for(const script of ['build:garden-art','validate:content','check'])await run([npm,'run',script]);
 await run(['scripts/build-demo-server.mjs']);
 await run(['scripts/build-demo-client.mjs']);
 await run(['scripts/prepare-client.mjs']);
 const copiedAudio=await verifyDemoAudio('dist/personal-review-client',process.cwd(),{scope:'runtime'});
 if(copiedAudio.manifestSha256!==audio.manifestSha256)throw Error('Authored audio manifest changed during the build');
 const receipt=await writeDemoReceipt({inputs,hydrated,audio:{source:audio,runtime:copiedAudio}});
 console.log('Bound '+receipt.inputs.records.length+' input files and '+receipt.outputs.records.length+' compiled files.');
 console.log('Demo built in dist/personal-review-client. Start with npm run start:demo.');
}else{
 await fs.access('dist/personal-review-client/index.html');
 await verifyDemoReceipt();
 console.log('Evidence Quest personal review: http://127.0.0.1:4364/garden (authored mode; current origin save preserved).');
 await run(['dist/server/index.js']);
}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
