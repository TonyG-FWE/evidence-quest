import {defineConfig} from '@playwright/test';
import base from './playwright.checkpoint.config.js';
export default defineConfig({...base,testIgnore:[],testMatch:['**/garden-compositor.diagnostic.spec.ts'],use:{...base.use,viewport:{width:1280,height:720}},projects:[{name:'webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2,...(process.env['EQ_WEBKIT_ACCELERATED']==='1'?{launchOptions:{ignoreDefaultArgs:['--disable-accelerated-compositing']}}:{})}}]});
