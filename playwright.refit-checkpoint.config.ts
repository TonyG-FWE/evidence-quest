import {defineConfig} from '@playwright/test';
const run=process.env['EQ_QUALIFICATION_RUN']??'refit-focus';
export default defineConfig({
 testDir:'./browser-tests',testMatch:['garden-refit-checkpoint.spec.ts','garden-bakery.spec.ts','garden-stage-actors.spec.ts','garden-hands.spec.ts','garden-river.spec.ts','garden-landscape.spec.ts'],workers:1,retries:0,timeout:180000,expect:{timeout:20000},
 use:{baseURL:'http://127.0.0.1:4360',viewport:{width:1422,height:900},actionTimeout:15000,trace:'retain-on-failure',screenshot:'only-on-failure',video:'off'},
 projects:[{name:'chromium-dpr1',use:{browserName:'chromium',channel:'chromium',deviceScaleFactor:1}}],
 outputDir:'output/playwright/final-demo/'+run,
 reporter:[['list'],['json',{outputFile:'evidence/final-demo-20260918/'+run+'-browser.json'}]],
 metadata:{scope:'Focused changing-source checkpoint; fresh camera and bridge controls, explicitly labeled bakery fixture. Not broad or performance qualification.'},
});
