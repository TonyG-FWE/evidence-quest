import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4353);
/** Final actual-game timing: one browser at a time, normal renderer and DPR. */
export default defineConfig({...base,
 testMatch:['**/garden-measurements.spec.ts','**/garden-assets.spec.ts'],
 grep:/first-encounter DPR1\/DPR2 resource and active-cadence|opening is usable with complete artwork|profile-bound character contact, native input latency/,
 workers:1,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,viewport:{width:1280,height:720},trace:'off',video:'off'},
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
 outputDir:'output/playwright/staged-performance/'+(process.env['EQ_QUALIFICATION_RUN']??String(Date.now())),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/final-performance.json'}]],
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
