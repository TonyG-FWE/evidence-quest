import {defineConfig} from '@playwright/test';
import checkpoint from './playwright.checkpoint.config.js';
const cases:Record<string,RegExp>={
 'chromium-dpr1':/direct seed loading|seed first: separate/,
 'firefox-dpr2':/direct seed loading/,
 'webkit-dpr1':/ordinary world route/,
 'webkit-dpr2':/direct seed loading|ordinary world route/,
};
export default defineConfig({...checkpoint,projects:checkpoint.projects!.filter(project=>!!cases[project.name!]).map(project=>({...project,grep:cases[project.name!]}))});
