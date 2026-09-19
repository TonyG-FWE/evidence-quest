import test from 'node:test';
import assert from 'node:assert/strict';
import {WORLD,anchors,pointInPolygon,navigable,findRoute,segmentClear,riverCenter,riverHalfWidth,regionAt,relocateLegacyPoint,terrainHeight,clearExpandedBuilding,WOODLAND_TERRACE,DOWNSTREAM_SHORES} from '../src/garden/worldLayout.js';
import {BOAT_REACH} from '../src/garden/river.js';
import {localReview} from '../src/garden/assets/profile.js';

test('supplied raised terrace blocks walking and releases an enclosed current-save position',()=>{
 if(!localReview)return;
 const center={x:WOODLAND_TERRACE.position[0],z:WOODLAND_TERRACE.position[2]};
 assert.equal(navigable(center),false);
 const restored=clearExpandedBuilding(center);assert.ok(restored);assert.ok(navigable(restored));assert.equal(regionAt(restored),regionAt(center));
 assert.equal(segmentClear({x:center.x-2,z:center.z},{x:center.x+2,z:center.z}),false);
});

test('downstream shore plantings block walking without occupying either boat route',()=>{
 if(!localReview)return;
 for(const shore of DOWNSTREAM_SHORES){
  assert.ok(shore.position[2]-3>BOAT_REACH.maxZ+.5);
  const center=shore.footprint.reduce((p,q)=>({x:p.x+q.x/4,z:p.z+q.z/4}),{x:0,z:0});
  assert.equal(navigable(center),false);
  const restored=clearExpandedBuilding(center);assert.ok(restored);assert.ok(navigable(restored));
  assert.equal(regionAt(restored),regionAt(center));
 }
});

test('riverside layout: banks have actual boundaries and only a built bridge connects them',()=>{
 assert.equal(navigable(anchors.dock.approach),true);
 assert.equal(navigable(anchors.garden.approach),true);
 assert.equal(navigable({x:0,z:0}),false);
 assert.equal(navigable({x:100,z:100}),false);
 assert.deepEqual(findRoute(anchors.dock.approach,anchors.garden.approach),[]);
 const route=findRoute(anchors.dock.approach,anchors.garden.approach,{x:0,z:3});
 assert.ok(route.length>1);
 let from=anchors.dock.approach;
 for(const to of route){for(let i=0;i<=100;i++)assert.ok(navigable({x:from.x+(to.x-from.x)*i/100,z:from.z+(to.z-from.z)*i/100},{x:0,z:3}));from=to;}
 assert.deepEqual(route.at(-1),anchors.garden.approach);
});

test('terrain has walking slopes while precision encounters stay level',()=>{
 for(const [name,anchor]of Object.entries(anchors))if(!['crossing','boat'].includes(name))for(const point of Object.values(anchor))assert.equal(terrainHeight(point),.13);
 let highest=.13;
 for(const path of WORLD.paths)for(let i=1;i<path.points.length;i++){
  const a=path.points[i-1]!,b=path.points[i]!;
  for(let n=0;n<100;n++){
   const p={x:a.x+(b.x-a.x)*n/100,z:a.z+(b.z-a.z)*n/100},h=terrainHeight(p);highest=Math.max(highest,h);
   for(const q of [{x:p.x+.01,z:p.z},{x:p.x,z:p.z+.01}])assert.ok(Math.abs(terrainHeight(q)-h)<.01,'No abrupt height steps along walking paths');
  }
 }
 assert.ok(highest>.6,'The connected paths include visible terrain rises');
});
test('village routes and river proportions are meaningful and regions remain identifiable',()=>{
 const route=findRoute(anchors.garden.approach,anchors.bakery.approach);
 assert.ok(route.length);assert.equal(regionAt(anchors.bakery.approach),'bakery');
 assert.ok(riverHalfWidth(-2)>riverHalfWidth(3));assert.notEqual(riverCenter(-14),riverCenter(12));
 for(const region of WORLD.regions)assert.ok(pointInPolygon(region.safe,region.polygon));
});
test('old world locations migrate inside their own region without moving bridge precision coordinates',()=>{
 assert.deepEqual(relocateLegacyPoint({x:-3.6,z:2.5}),{x:-3.6,z:2.5});
 // Historical layout translation remains frozen; only current-demo saves
 // receive the separately tested screenshot-repair position rebind.
 assert.deepEqual(relocateLegacyPoint({x:4.4,z:3.6}),{x:7.4,z:11.6});
 assert.deepEqual(relocateLegacyPoint({x:-3.5,z:-4}),anchors.dock.person);
 assert.deepEqual(relocateLegacyPoint({x:8.5,z:-.7}),anchors.bakery.person);
 assert.deepEqual(relocateLegacyPoint({x:4.5,z:-2.15}),anchors.workshop.person);
});

test('polygon routes cannot skip bank gaps, building corners or trunks between endpoints',()=>{
 const tree=WORLD.trees[0]!;assert.equal(segmentClear({x:tree.x-.6,z:tree.z},{x:tree.x+.6,z:tree.z}),false);
 assert.equal(segmentClear({x:-2.8,z:3},{x:2.8,z:3}),false);assert.equal(segmentClear({x:-2.8,z:3},{x:2.8,z:3},{x:0,z:3}),true);
 // Independently sample every admitted segment over varied positions. These
 // samples verify geometry; the runtime does not use this sampled algorithm.
 let seed=3207;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<240;i++){
  const from={x:-15+random()*38,z:-19+random()*40},to={x:-15+random()*38,z:-19+random()*40},bridge={x:0,z:3};
  if(!segmentClear(from,to,bridge))continue;
  const steps=Math.ceil(Math.hypot(to.x-from.x,to.z-from.z)/.01);
  for(let n=0;n<=steps;n++)assert.ok(navigable({x:from.x+(to.x-from.x)*n/steps,z:from.z+(to.z-from.z)*n/steps},bridge));
 }
});
