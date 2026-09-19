import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4358);
export default defineConfig({...base,testMatch:['**/garden-world-presentation.spec.ts'],testIgnore:[],workers:1,retries:0,fullyParallel:false,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:'retain-on-failure',video:'off'},
 projects:[{name:'chromium-dpr2',use:{browserName:'chromium',channel:'chromium',deviceScaleFactor:2}},{name:'webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2}}],
 outputDir:'output/playwright/staged-world-presentation/'+(process.env['EQ_QUALIFICATION_RUN']??'candidate'),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/world-presentation-browser.json'}]],
 metadata:{scope:'Actual screenshot pixels on ordinary fresh start, native movement, reading return and new adventure; no rendering hooks or timing claim.'},
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
