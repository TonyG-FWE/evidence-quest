import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
export default defineConfig({...base,workers:3,grepInvert:/production cold Stage|production DPR2/,outputDir:'output/playwright/functional-raw',reporter:[['list'],['json',{outputFile:'evidence/er13/final-functional-matrix.json'}]]});
