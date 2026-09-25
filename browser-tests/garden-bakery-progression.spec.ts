import {test} from '@playwright/test';
import {playDemoRoute} from './garden-demo-route.js';

for(const method of ['drag','click'] as const)test(`fresh bakery progression through visible objects using ${method} transfers`,async({page},info)=>{
 test.setTimeout(300000);
 await playDemoRoute(page,info,undefined,{cursorMethod:method});
 await info.attach('acceptance-scope',{body:'Fresh adventure using ordinary earlier-game controls. From tile collection through the actual Sol loaf handoff, all physical bakery actions use visible scene targets. No injected progress, hidden-state pointer coordinates, physical-action buttons, providers, or recording.',contentType:'text/plain'});
});
