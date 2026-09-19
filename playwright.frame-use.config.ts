import {defineConfig} from '@playwright/test';
import configuration from './playwright.transfer-reuse.config';
export default defineConfig({...configuration,grep:/production DPR2 lossless/});
