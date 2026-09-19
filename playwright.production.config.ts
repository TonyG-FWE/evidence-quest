import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4177),evidence=process.env['EQ_EVIDENCE_DIR']??'evidence/er13';
export default defineConfig({...base,testIgnore:[],testMatch:['**/production-formats.spec.ts'],outputDir:'output/playwright/production-raw',reporter:[['list'],['json',{outputFile:evidence+'/final-formats-matrix.json'}]],use:{...base.use,baseURL:`http://127.0.0.1:${port}`},webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000}});
