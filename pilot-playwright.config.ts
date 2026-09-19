import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./pilot-browser-tests',timeout:90000,expect:{timeout:15000},workers:1,fullyParallel:false,
 outputDir:'output/playwright/pilot-raw',reporter:[['list'],['json',{outputFile:'evidence/hands-on-20260916/pilot/browser-results.json'}]],
 use:{baseURL:'http://127.0.0.1:4318',viewport:{width:1280,height:900},screenshot:'only-on-failure',trace:'retain-on-failure'},
 projects:(['chromium','firefox','webkit'] as const).flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-dpr${deviceScaleFactor}`,use:{browserName,deviceScaleFactor,...(browserName==='chromium'?{channel:'chromium'}:{})}}))),
});
