import {defineConfig} from '@playwright/test';
import base from './playwright.production.config.js';
export default defineConfig({...base,testIgnore:[],testMatch:['**/input-probe-diagnostic.spec.ts'],outputDir:'output/playwright/input-diagnostic',reporter:[['list'],['json',{outputFile:'evidence/er13/input-probe-diagnostic-results.json'}]]});
