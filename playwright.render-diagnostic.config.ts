import {defineConfig} from '@playwright/test';
import base from './playwright.checkpoint.config.js';
export default defineConfig({...base,testIgnore:[],testMatch:['**/garden-render-cost.diagnostic.spec.ts'],projects:[{name:'webkit-dpr2',use:{browserName:'webkit',deviceScaleFactor:2}}],webServer:{command:`"${process.execPath}" node_modules/vite/bin/vite.js preview --outDir .cache/profile-client --host 127.0.0.1 --port 4322 --strictPort`,url:'http://127.0.0.1:4322/garden',reuseExistingServer:false,timeout:15000}});
