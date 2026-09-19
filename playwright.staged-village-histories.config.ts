import {defineConfig} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import base from './playwright.config.js';

const bindingPath='evidence/staged-bridge-20260916/village-histories-frozen-build-third-binding.json';
const binding=JSON.parse(readFileSync(bindingPath,'utf8')) as {build:string;artifacts:{file:string;sha256:string}[]};
// This functional run may coexist with the long matrix. It must not silently
// become evidence for a later rebuild or be described as timing qualification.
if(binding.build!=='required/build-third.log')throw Error('Unexpected frozen village-history build binding');
for(const artifact of binding.artifacts){
 const actual=createHash('sha256').update(readFileSync(artifact.file)).digest('hex');
 if(actual!==artifact.sha256)throw Error('Frozen build-third changed before village histories: '+artifact.file);
}
const port=Number(process.env['EQ_TEST_PORT']??4356);
export default defineConfig({...base,
 testMatch:['**/garden-physical-arrangements.spec.ts'],testIgnore:[],workers:1,fullyParallel:false,retries:0,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:'off',video:'off'},
 metadata:{scope:'Four normal village histories, frozen-build-third; not timing or BPFL acceptance',binding:bindingPath},
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
 outputDir:'output/playwright/staged-village-histories/frozen-build-third',
 reporter:[['list'],['json',{outputFile:'evidence/staged-bridge-20260916/village-histories-frozen-build-third.json'}]],
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
