import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const candidatePort=Number(process.env['EQ_TEST_PORT']??4174);
export default defineConfig({...base,
 testMatch:['**/garden-hands.spec.ts'],workers:1,
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({
  name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})},
 }))),
 outputDir:'output/playwright/hands-current',
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/hands-on-20260916/browser-hands.json'}]],
 ...(process.env['EQ_HANDS_CANDIDATE']==='1'?{webServer:{command:`"${process.execPath}" node_modules/vite/bin/vite.js preview --outDir .cache/hands-client --host 127.0.0.1 --port ${candidatePort} --strictPort`,url:`http://127.0.0.1:${candidatePort}/garden`,reuseExistingServer:false,timeout:15000}}:{}),
});
