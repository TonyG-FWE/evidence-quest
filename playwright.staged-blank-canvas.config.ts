import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4358);
const preserve=process.env['EQ_DIAG_PRESERVE_DRAWING_BUFFER']==='1';
/** Prepared diagnostic only: never run concurrently with timing qualification. */
export default defineConfig({...base,testMatch:['**/garden-blank-canvas-diagnostic.spec.ts'],testIgnore:[],workers:1,retries:0,fullyParallel:false,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:{mode:'on',screenshots:false,snapshots:true,sources:true},video:'off'},
 projects:[{name:'chromium-dpr2',use:{browserName:'chromium',channel:'chromium',deviceScaleFactor:2}},{name:'webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2}}],
 outputDir:'output/playwright/staged-blank-canvas/'+(process.env['EQ_QUALIFICATION_RUN']??(preserve?'preserved-buffer-comparison':'default-context-first')),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??`evidence/staged-bridge-20260916/blank-canvas-diagnostic-${preserve?'preserved':'default'}-browser.json`}]],
 metadata:{scope:'Prepared isolated blank-canvas discriminator. Same-frame GPU readback invalidates timing claims. No runtime changes.',contextMode:preserve?'TEST_ONLY_PRESERVE_DRAWING_BUFFER_TRUE':'UNMODIFIED_PRODUCTION_CONTEXT'},
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
