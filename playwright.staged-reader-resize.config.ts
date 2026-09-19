import {defineConfig} from '@playwright/test';
import base from './playwright.staged-blank-reload.config.js';
const suffix=process.env['EQ_DIAG_CANVAS_LAYER']==='1'?'-canvas-layer':process.env['EQ_DIAG_CANVAS_LAYER']==='reattach'?'-same-canvas-reattach':'';
export default defineConfig({...base,testMatch:['**/garden-reader-resize-diagnostic.spec.ts'],outputDir:'output/playwright/staged-reader-resize'+suffix,reporter:[['list'],['json',{outputFile:'evidence/staged-bridge-20260916/reader-resize-diagnostic-browser'+suffix+'.json'}]]});
