import test from 'node:test';
import assert from 'node:assert/strict';
import {bakeryMotion} from '../src/garden/bakeryMotion.js';
import {bakeryRainFloor,underBakeryShelter} from '../src/garden/bakeryWeather.js';
import {BAKERY_WORK,BAKERY_APPROACHES,BAKERY_SHELTER,navigable} from '../src/garden/worldLayout.js';
import {localReview} from '../src/garden/assets/profile.js';

test('shelter cutaway follows Pip across every edge, independently of work or story state',()=>{
 const s=BAKERY_SHELTER,center={x:(s.left+s.right)/2,z:(s.back+s.front)/2};
 assert.equal(underBakeryShelter(center),true);
 for(const edge of [{x:s.left,z:center.z},{x:s.right,z:center.z},{x:center.x,z:s.back},{x:center.x,z:s.front}])assert.equal(underBakeryShelter(edge),true);
 for(const outside of [{x:s.left-.01,z:center.z},{x:s.right+.01,z:center.z},{x:center.x,z:s.back-.01},{x:center.x,z:s.front+.01}])assert.equal(underBakeryShelter(outside),false);
 if(localReview)assert.equal(underBakeryShelter(BAKERY_APPROACHES.mixing),true);
});

test('bakery travel never uses a frozen work pose; contact and climbing keep their clips',()=>{
 for(const [kind,progress] of [['bakeryWelcome',.12],['bakeryWelcome',.60],['flourCheck',.07],['flourCheck',.60],['mixDough',.1],['mixDough',.72],['shapeLoaves',.9],['bakeBread',.18],['bakeBread',.30],['takeLoaf',.2],['takeLoaf',.8]] as const)assert.equal(bakeryMotion('rina',kind,progress).action,undefined,`${kind} at ${progress} must walk`);
 assert.equal(bakeryMotion('rina','bakeryWelcome',.60).carrying,true);
 assert.equal(bakeryMotion('rina','flourCheck',.22).action?.kind,'sack');
 assert.equal(bakeryMotion('rina','mixDough',.4).action?.kind,'mix');
 assert.equal(bakeryMotion('sol','tileRemoval',.5).action?.kind,'climb');
 assert.equal(bakeryMotion('sol','flourCheck',.10).action?.kind,'climb');
 assert.equal(bakeryMotion('sol','flourCheck',.6).action,undefined);
});

test('rain stops above the preparation shelter and building, with clear working approaches',{skip:!localReview},()=>{
 for(const p of [BAKERY_WORK.mixing,BAKERY_WORK.preparation,BAKERY_WORK.dryFlour,...Object.values(BAKERY_APPROACHES).slice(0,3)])assert.ok(bakeryRainFloor(p.x,p.z)>2.5);
 assert.ok(bakeryRainFloor(19.25,-2.22)>5);
 assert.equal(bakeryRainFloor(BAKERY_SHELTER.right+.5,BAKERY_SHELTER.front+.5),.16);
 for(const p of Object.values(BAKERY_APPROACHES))assert.equal(navigable(p),true,JSON.stringify(p));
});
