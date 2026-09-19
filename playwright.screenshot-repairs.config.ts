import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
// Focused repair checks against the explicitly running local development build.
// These results are not the later frozen candidate's broad qualification.
export default defineConfig({...base,webServer:undefined,
 testMatch:['**/garden-hands.spec.ts','**/garden-bakery-pointer-repair.spec.ts','**/garden-refit-checkpoint.spec.ts','**/garden-final-contacts.spec.ts','**/garden-boat-direct.spec.ts'],workers:1,retries:0,
 use:{...base.use,baseURL:'http://127.0.0.1:4350',video:'on'},
 projects:[{name:'chromium-dpr1',use:{browserName:'chromium',channel:'chromium',deviceScaleFactor:1}}],
 outputDir:'output/playwright/screenshot-repairs/'+(process.env['EQ_REPAIR_RUN']??'focused'),
 reporter:[['list'],['json',{outputFile:'evidence/final-demo-20260918/screenshot-repair/'+(process.env['EQ_REPAIR_RUN']??'focused')+'.json'}]],
});
