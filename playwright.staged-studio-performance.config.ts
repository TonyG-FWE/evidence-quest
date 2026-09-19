import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4354),evidence=process.env['EQ_EVIDENCE_DIR']??'evidence/staged-bridge-20260916/final-studio';
/** Original studio format/resource assertions, isolated from other browsers. */
export default defineConfig({...base,testIgnore:[],testMatch:['**/production-formats.spec.ts'],workers:1,
 projects:(['chromium','firefox','webkit'] as const).map(browserName=>({name:browserName,use:{browserName,...(browserName==='chromium'?{channel:'chromium'}:{})}})),
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:'off',video:'off'},
 outputDir:'output/playwright/staged-studio-performance/'+(process.env['EQ_QUALIFICATION_RUN']??String(Date.now())),
 reporter:[['list'],['json',{outputFile:evidence+'/final-formats-matrix.json'}]],
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
