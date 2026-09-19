import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4337);
/** Functional browser matrix. Timing is qualified separately with a quiet GPU. */
export default defineConfig({...base,
 testMatch:['**/garden*.spec.ts','**/workstation.spec.ts'],
 testIgnore:['**/*diagnostic.spec.ts','**/garden-rendering.spec.ts','**/garden-measurements.spec.ts','**/garden-assets.spec.ts'],
 workers:3,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:'off'},
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>(browserName==='chromium'?[2]:[1,2]).map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
 outputDir:'output/playwright/staged-functional/'+(process.env['EQ_QUALIFICATION_RUN']??String(Date.now())),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/story-integration/browser-matrix.json'}]],
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`},reuseExistingServer:false,timeout:15000},
});
