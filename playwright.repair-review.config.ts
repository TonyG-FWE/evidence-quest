import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';

// Opt in explicitly so these independent acceptance checks do not silently
// change the integration owner's existing required-command suite.
process.env['EQ_INDEPENDENT_REVIEW']='1';
process.env['EQ_ASSET_PROFILE']='review';
const port=Number(process.env['EQ_TEST_PORT']??4362);
const dev=process.env['EQ_TEST_DEV']==='1';
const run=process.env['EQ_REPAIR_REVIEW_RUN']??new Date().toISOString().replace(/[:.]/g,'-');
export default defineConfig({...base,
 testMatch:'**/garden-repair-review.spec.ts',testIgnore:[],timeout:240000,
 workers:1,fullyParallel:false,retries:0,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,video:'off',trace:'retain-on-failure'},
 metadata:{scope:'Independent actual-game repair review. Fresh isolated saves; native input; read-only state assertions. No performance qualification.',run},
 projects:[
  ...(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,grepInvert:/@touch/,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
  {name:'chromium-touch',grep:/@touch/,use:{browserName:'chromium',channel:'chromium',hasTouch:true,deviceScaleFactor:2,viewport:{width:1024,height:768}}},
 ],
 outputDir:`evidence/independent-repair-20260918/${run}/artifacts`,
 reporter:[['list'],['json',{outputFile:`evidence/independent-repair-20260918/${run}/results.json`}]],
 webServer:{command:dev?`"${process.execPath}" node_modules/vite/bin/vite.js`:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/${dev?'garden':'healthz'}`,env:{PORT:String(port),EQ_WEB_PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,EQ_ASSET_PROFILE:'review',COACH_MODE:'authored'},reuseExistingServer:false,timeout:30000},
});
