import {defineConfig} from '@playwright/test';
const port=Number(process.env['EQ_TEST_PORT']??4336);
export default defineConfig({
 testDir:'./browser-tests',testMatch:['**/garden-staged-bridge.spec.ts','**/garden-hands.spec.ts'],workers:1,timeout:150000,expect:{timeout:15000},
 use:{baseURL:`http://127.0.0.1:${port}`,viewport:{width:1440,height:1000},actionTimeout:15000,screenshot:'only-on-failure',trace:'retain-on-failure',video:process.env['EQ_BRIDGE_VIDEO']==='1'?{mode:'on',size:{width:1440,height:1000}}:'off'},
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
 outputDir:'output/playwright/staged-bridge-'+(process.env['EQ_QUALIFICATION_RUN']??Date.now()),reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/staged-bridge-20260916/browser.json'}]],
 webServer:process.env['EQ_BRIDGE_PRODUCTION']==='1'?{command:`"${process.execPath}" dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000}:{command:`"${process.execPath}" node_modules/vite/bin/vite.js preview --outDir .cache/staged-bridge-client --host 127.0.0.1 --port ${port} --strictPort`,url:`http://127.0.0.1:${port}/garden`,reuseExistingServer:false,timeout:15000},
});
