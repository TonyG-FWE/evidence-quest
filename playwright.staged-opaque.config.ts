import {defineConfig} from '@playwright/test';
const variants=['baseline','candidate'] as const;
export default defineConfig({
 testDir:'./browser-tests',testIgnore:[],testMatch:['**/garden-opaque.diagnostic.spec.ts','**/garden-measurements.spec.ts'],grep:/first-encounter DPR1\/DPR2 resource and active-cadence|opaque and faded architecture/,
 workers:1,timeout:240000,expect:{timeout:15000},
 use:{viewport:{width:1280,height:720},deviceScaleFactor:2,trace:'off',video:'off'},
 projects:variants.map((variant,i)=>({name:variant,use:{browserName:'webkit',deviceScaleFactor:2,baseURL:`http://127.0.0.1:${4348+i}`}})),
 webServer:variants.map((variant,i)=>({command:`"${process.execPath}" .cache/staged-opaque-${variant}/dist/server/index.js`,url:`http://127.0.0.1:${4348+i}/healthz`,env:{PORT:String(4348+i),PUBLIC_ORIGIN:`http://127.0.0.1:${4348+i}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000})),
 outputDir:'output/playwright/staged-opaque-'+(process.env['EQ_QUALIFICATION_RUN']??'pair'),reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/opaque-pair.json'}]],
});
