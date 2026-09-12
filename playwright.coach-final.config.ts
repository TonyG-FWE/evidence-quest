import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
export default defineConfig({...base,workers:3,testMatch:['**/coach-fault.spec.ts'],testIgnore:[],
 outputDir:'output/playwright/coach-final-raw',reporter:[['list'],['json',{outputFile:'evidence/er13/final-coach-development-matrix.json'}]],
});
