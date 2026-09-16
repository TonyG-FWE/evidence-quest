import {defineConfig} from '@playwright/test';
const port=Number(process.env['EQ_TEST_PORT']??4174);
const dev=process.env['EQ_TEST_DEV']==='1';
export default defineConfig({
 testDir:'./browser-tests',timeout:60000,expect:{timeout:15000},fullyParallel:false,workers:1,
 testIgnore:[...(dev?[]:['**/coach-fault.spec.ts']),'**/*diagnostic.spec.ts','**/production-formats.spec.ts'],
 outputDir:'output/playwright/raw',reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'output/playwright/results.json'}]],
 use:{baseURL:`http://127.0.0.1:${port}`,viewport:{width:1440,height:1000},actionTimeout:15000,screenshot:{mode:'only-on-failure',fullPage:true},trace:'retain-on-failure'},
 // Full Chromium uses the installed browser's native graphics path in new
 // headless mode. The older software shell remains an explicit diagnostic.
 // https://github.com/microsoft/playwright/blob/v1.61.0/docs/src/browsers.md
 projects:(process.env['EQ_ALL_BROWSERS']==='1'?['chromium','firefox','webkit'] as const:['chromium'] as const).map(browserName=>({name:browserName,use:{browserName,...(browserName==='chromium'&&process.env['EQ_CHROMIUM_CHANNEL']!=='shell'?{channel:'chromium'}:{})}})),
 webServer:{command:dev?`"${process.execPath}" node_modules/vite/bin/vite.js`:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/${dev?'':'healthz'}`,env:{PORT:String(port),EQ_WEB_PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`},reuseExistingServer:false,timeout:15000},
});
