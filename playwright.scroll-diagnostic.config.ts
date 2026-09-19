import {defineConfig} from '@playwright/test';
import base from './playwright.production.config.js';
export default defineConfig({...base,testIgnore:[],testMatch:['**/watch-scroll-diagnostic.spec.ts'],outputDir:'output/playwright/scroll-diagnostic-raw',reporter:[['list'],['json',{outputFile:'evidence/er13/watch-scroll-diagnostic-results.json'}]]});
