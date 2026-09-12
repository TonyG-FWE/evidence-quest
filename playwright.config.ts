import {defineConfig} from '@playwright/test';
const port=Number(process.env['EQ_TEST_PORT']??4174);
const dev=process.env['EQ_TEST_DEV']==='1';
export default defineConfig({
 testDir:'./browser-tests',timeout:60000,expect:{timeout:15000},fullyParallel:false,workers:1,
 testIgnore:dev?[]:['**/coach-fault.spec.ts'],
 outputDir:'output/playwright/raw',reporter:[['list'],['json',{outputFile:'output/playwright/results.json'}]],
 use:{baseURL:`http://127.0.0.1:${port}`,viewport:{width:1440,height:1000},actionTimeout:15000,screenshot:{mode:'only-on-failure',fullPage:true},trace:'retain-on-failure'},
 projects:(process.env['EQ_ALL_BROWSERS']==='1'?['chromium','firefox','webkit'] as const:['chromium'] as const).map(browserName=>({name:browserName,use:{browserName}})),
 webServer:{command:dev?`"${process.execPath}" node_modules/vite/bin/vite.js`:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/${dev?'':'healthz'}`,env:{PORT:String(port),EQ_WEB_PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`},reuseExistingServer:false,timeout:15000},
});
