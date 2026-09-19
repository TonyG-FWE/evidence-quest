import {defineConfig} from '@playwright/test';
const variants=['baseline','candidate'] as const;
export default defineConfig({
 testDir:'./browser-tests',testMatch:['**/garden-asset-paint.spec.ts'],workers:1,timeout:60000,expect:{timeout:15000},
 use:{viewport:{width:1280,height:720},trace:'retain-on-failure',video:'off'},
 projects:[{name:'baseline-webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2,baseURL:'http://127.0.0.1:4348'}},{name:'candidate-webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2,baseURL:'http://127.0.0.1:4349'}},{name:'candidate-chromium-dpr1',use:{browserName:'chromium',channel:'chromium',deviceScaleFactor:1,baseURL:'http://127.0.0.1:4349'}}],
 webServer:variants.map((variant,i)=>({command:`"${process.execPath}" .cache/staged-opaque-${variant}/dist/server/index.js`,url:`http://127.0.0.1:${4348+i}/healthz`,env:{PORT:String(4348+i),PUBLIC_ORIGIN:`http://127.0.0.1:${4348+i}`,COACH_MODE:'authored'},reuseExistingServer:false,timeout:15000})),
 outputDir:'output/playwright/staged-cold-model',reporter:[['list'],['json',{outputFile:'evidence/staged-bridge-20260916/cold-model-render.json'}]],
});
