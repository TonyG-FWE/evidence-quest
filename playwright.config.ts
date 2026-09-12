import {defineConfig} from '@playwright/test';
const port=Number(process.env['EQ_TEST_PORT']??4174);
export default defineConfig({
 testDir:'./browser-tests',timeout:60000,expect:{timeout:15000},fullyParallel:false,workers:1,
 outputDir:'output/playwright/raw',reporter:[['list'],['json',{outputFile:'output/playwright/results.json'}]],
 use:{baseURL:`http://127.0.0.1:${port}`,viewport:{width:1440,height:1000},actionTimeout:15000,screenshot:{mode:'only-on-failure',fullPage:true},trace:'retain-on-failure'},
 projects:[{name:'chromium',use:{browserName:'chromium'}}],
 webServer:{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`},reuseExistingServer:false,timeout:15000},
});
