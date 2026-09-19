import {defineConfig} from '@playwright/test';
import functional from './playwright.staged-functional.config.js';
/** Focused follow-ups also cover the required suite's Chromium DPR1 condition. */
export default defineConfig({...functional,workers:1,projects:[{name:'chromium-dpr1',use:{browserName:'chromium',channel:'chromium',deviceScaleFactor:1}},...functional.projects!]});
