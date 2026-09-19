import {defineConfig} from '@playwright/test';
const port=Number(process.env['EQ_TEST_PORT']??4347);
export default defineConfig({
 testDir:'./browser-tests',testIgnore:[],testMatch:['**/garden-gpu-completion.diagnostic.spec.ts','**/garden-measurements.spec.ts'],workers:1,timeout:180000,expect:{timeout:15000},
 use:{baseURL:`http://127.0.0.1:${port}`,viewport:{width:1280,height:720},deviceScaleFactor:2,actionTimeout:15000,trace:'off',video:'off'},
 projects:[{name:'webkit-dpr2',use:{browserName:'webkit'}}],outputDir:'output/playwright/staged-perf-'+(process.env['EQ_QUALIFICATION_RUN']??Date.now()),reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/gpu-completion.json'}]],
 webServer:{command:`"${process.execPath}" node_modules/vite/bin/vite.js preview --outDir .cache/staged-perf-client --host 127.0.0.1 --port ${port} --strictPort`,url:`http://127.0.0.1:${port}/garden`,reuseExistingServer:false,timeout:15000},
});
