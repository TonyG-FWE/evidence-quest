import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4358),dev=process.env['EQ_TEST_DEV']==='1',run=process.env['EQ_QUALIFICATION_RUN']??'candidate';
export default defineConfig({...base,
 testMatch:['**/garden-*.spec.ts','**/garden.spec.ts'],testIgnore:['**/*diagnostic.spec.ts','**/garden-chapter.spec.ts','**/garden-assets.spec.ts'],
 // Nine complete fresh chapter journeys run in the required suite. Replay
 // combinations and every physical path run here in all six conditions.
 // Timing and resource checks run separately without framebuffer recording.
 // Add existing keyboard/reading and current-save/recovery checks from garden.spec.
 // Its two duplicate physical routes and historical migration stay in required.
 grepInvert:/first-encounter DPR1\/DPR2 resource and active-cadence|carried-seed route:|seed first: separate boat trip|version-1 upgrade archives/,
 workers:1,fullyParallel:false,retries:0,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:'retain-on-failure',video:'off'},
 metadata:{profile:'local-review-pending-approval',scope:'Actual integrated garden. Ordinary fresh journeys and fixture replay are identified by each test. Performance runs separately without recording.'},
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
 outputDir:'output/playwright/final-demo/'+run,
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??`evidence/final-demo-20260918/${run}-browser.json`}]],
 webServer:{command:dev?`"${process.execPath}" node_modules/vite/bin/vite.js`:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/${dev?'':'healthz'}`,env:{PORT:String(port),EQ_WEB_PORT:String(port),EQ_ASSET_PROFILE:'review',PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:30000},
});
