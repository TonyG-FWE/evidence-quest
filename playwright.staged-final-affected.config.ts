import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';

const port=Number(process.env['EQ_TEST_PORT']??4357);
/** Functional affected-path verification after the final production build.
 * Timing is a separate one-browser qualification with a controlled GPU. */
export default defineConfig({...base,
 testMatch:['**/garden-staged-bridge.spec.ts','**/garden-asset-paint.spec.ts','**/garden-edition-help.spec.ts','**/garden-hands.spec.ts','**/garden-literacy.spec.ts','**/garden-gathering.spec.ts'],
 testIgnore:[],
 grep:/staged bridge ordinary input releases objects|reduced-motion view paints a character|Narrative help uses the actual|roof and dough use real pointer gestures|Synthetic microphone device: local capture|Gathering: authentic prior-save fixture/,
 workers:2,fullyParallel:false,retries:0,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:'retain-on-failure',video:'off'},
 metadata:{scope:'Final-build functional affected paths: staged construction, asynchronous approved-model arrival, original/richer help, bakery canopy, synthetic microphone/unsupported fallback and gathering welcome-practice return focus. No timing claim.'},
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
 outputDir:'output/playwright/staged-final-affected/'+(process.env['EQ_QUALIFICATION_RUN']??'final-build'),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/final-affected-browser.json'}]],
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
