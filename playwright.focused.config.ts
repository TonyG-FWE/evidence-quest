import {defineConfig} from '@playwright/test';
import base from './playwright.config.js';
export default defineConfig({...base,workers:3,
 testMatch:['**/qualification-states.spec.ts','**/access.spec.ts','**/compact.spec.ts','**/acceptance-boundaries.spec.ts','**/save.spec.ts','**/save-faults.spec.ts','**/resilience.spec.ts','**/er13.spec.ts','**/watch-position.spec.ts','**/workstation.spec.ts'],
 grep:/TASK11\.21|TASK11\.07 compact|FIX11\.ACCESS|TASK11\.14|FIX11\.SAVE|FIX11\.ART_FAILURE missing|ER13 actual browser voice|ER13 narrator|ER13 legacy|ER13 clipped|ER13 lower|ER13 Watch|TASK11\.11 drag|TASK11\.12 controlled/,
 outputDir:'output/playwright/focused-raw',reporter:[['list'],['json',{outputFile:'evidence/er13/final-focused-matrix.json'}]],
});
