import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
const port=Number(process.env['EQ_TEST_PORT']??4322);
export default defineConfig({...base,
 use:{...base.use,...(process.env['EQ_FUNCTIONAL_TRACE_OFF']==='1'?{trace:'off' as const}:{})},
 testMatch:['**/garden*.spec.ts'],workers:1,
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{}),...(browserName==='webkit'&&process.env['EQ_WEBKIT_ACCELERATED']==='1'?{launchOptions:{ignoreDefaultArgs:['--disable-accelerated-compositing']}}:{})}}))),
 outputDir:'output/playwright/integrated-checkpoint/'+(process.env['EQ_QUALIFICATION_RUN']??String(Date.now())),
 reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/integrated-checkpoint-20260916/browser.json'}]],
 ...(process.env['EQ_CHECKPOINT_BASELINE']==='1'||process.env['EQ_CHECKPOINT_CANDIDATE']==='1'?{webServer:{command:`"${process.execPath}" node_modules/vite/bin/vite.js preview --outDir .cache/${process.env['EQ_CHECKPOINT_BASELINE']==='1'?'hands-client':'integrated-client'} --host 127.0.0.1 --port ${port} --strictPort`,url:`http://127.0.0.1:${port}/garden`,reuseExistingServer:false,timeout:15000}}:{}),
 ...(process.env['EQ_CHECKPOINT_FROZEN']==='1'||process.env['EQ_CHECKPOINT_WATER']==='1'?{webServer:{command:`"${process.execPath}" .cache/${process.env['EQ_CHECKPOINT_WATER']==='1'?'checkpoint-water':'checkpoint-final'}/dist/server/index.js`,url:`http://127.0.0.1:${port}/healthz`,env:{PORT:String(port),PUBLIC_ORIGIN:`http://127.0.0.1:${port}`},reuseExistingServer:false,timeout:15000}}:{}),
});
