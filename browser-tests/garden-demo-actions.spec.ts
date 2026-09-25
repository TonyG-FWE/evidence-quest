import {test} from '@playwright/test';
import {playDemoRoute} from './garden-demo-route.js';

test('fresh planting and bakery actions stay visible with directions collapsed',async({page},info)=>{
 test.setTimeout(240000);await playDemoRoute(page,info);
});
