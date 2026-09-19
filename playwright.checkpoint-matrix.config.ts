import {defineConfig} from '@playwright/test';
import checkpoint from './playwright.checkpoint.config.js';
/** Functional qualification is independent of isolated timing measurements. */
export default defineConfig({...checkpoint,testMatch:['**/*.spec.ts'],workers:2});
