import {defineConfig} from '@playwright/test';
import hands from './playwright.hands.config.js';
export default defineConfig({...hands,testMatch:['**/garden-landscape.spec.ts'],outputDir:'output/playwright/landscape-current',reporter:[['list'],['json',{outputFile:process.env['PLAYWRIGHT_JSON_OUTPUT_NAME']??'evidence/hands-on-20260916/browser-landscape-final.json'}]]});
