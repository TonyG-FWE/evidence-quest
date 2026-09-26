import {defineConfig} from '@playwright/test';
import path from 'node:path';
// Imported route helpers must use the same geometry as the packaged demo.
process.env['EQ_ASSET_PROFILE']='review';
process.env['EQ_PERSONAL_GRASS']='1';
const root=process.env['EQ_PORTABLE_PACKAGE_DIRECTORY'];
if(!root)throw Error('An extracted portable package is required');
const executable=path.join(root,'runtime',process.platform==='win32'?'node.exe':'node');
export default defineConfig({
 testDir:'./browser-tests',testMatch:'portable-journey.spec.ts',workers:1,retries:0,timeout:1800000,
 expect:{timeout:15000},outputDir:'output/playwright/portable',
 reporter:[['list'],['json',{outputFile:'output/portable/journey-'+process.platform+'-'+process.arch+'.json'}]],
 // Capture the failure image and report without tracing every heavyweight frame.
 // This does not change game quality, assertions or performance qualification.
 use:{baseURL:'http://127.0.0.1:4364',viewport:{width:1366,height:768},channel:'chromium',screenshot:'only-on-failure',trace:'off',video:'off'},
 webServer:{command:`"${executable}" "${path.join(root,'launch.mjs')}" --no-open`,url:'http://127.0.0.1:4364/healthz',timeout:120000,reuseExistingServer:false},
});
