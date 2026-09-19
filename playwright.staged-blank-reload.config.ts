import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4358);
export default defineConfig({...base,testMatch:['**/garden-blank-reload-diagnostic.spec.ts'],testIgnore:[],workers:1,retries:0,fullyParallel:false,
 use:{...base.use,baseURL:`http://127.0.0.1:${port}`,trace:'off',video:'off'},
 projects:[{name:'webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2}}],
 outputDir:'output/playwright/staged-blank-canvas/'+(process.env['EQ_QUALIFICATION_RUN']??'webkit-reload-discriminator'),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/blank-canvas-reload-browser.json'}]],
 metadata:{scope:'Uninstrumented WebKit presentation before/after ordinary save reload; no renderer/context hooks or performance claims.'},
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000},
});
