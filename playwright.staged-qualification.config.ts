import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4347);
/** Ordinary compressed authored server, unchanged qualification tests and limits. */
export default defineConfig({...base,
 testMatch:['**/garden-measurements.spec.ts','**/garden-assets.spec.ts'],
 grep:/first-encounter DPR1\/DPR2 resource and active-cadence|opening is usable with complete artwork/,
 workers:1,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,viewport:{width:1280,height:720},deviceScaleFactor:2,trace:'off',video:'off'},
 projects:[{name:'webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2}}],
 outputDir:'output/playwright/staged-qualification/'+(process.env['EQ_QUALIFICATION_RUN']??String(Date.now())),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/quiet-webkit-dpr2.json'}]],
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
