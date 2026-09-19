import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,bridgeReady,walkable} from '../src/garden/model.js';
import {constructionOf,sectionSecured,postPoint,ropePoints,bridgePosts,unstableSectionAt} from '../src/garden/bridgeConstruction.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
import {advance} from './garden-play-actions.js';
import {handPlace,bridgeWalk,secureBridgeHalf,buildBridge} from './garden-bridge-actions.js';
function game(){const s=new GardenStore(initialGarden('staged-bridge'));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});bridgeWalk(s,CROSSING);s.send({type:'COLLECT_ROPES'});advance(s);return s;}
test('a dropped section releases input ownership and ground clicks walk without moving it',()=>{
 const s=game();handPlace(s,'section:a',{x:-.775,z:3});const before=structuredClone(s.getSnapshot().chapter.sections);
 assert.equal(s.getSnapshot().mode,'walk');bridgeWalk(s,{x:-2.4,z:3});assert.deepEqual(s.getSnapshot().chapter.sections,before);
 s.send({type:'HAND_BEGIN',object:'section:b'});s.send({type:'HAND_CANCEL'});assert.equal(s.getSnapshot().mode,'walk');bridgeWalk(s,CROSSING);assert.deepEqual(s.getSnapshot().chapter.sections,before);
});
test('the first secured section is a usable platform before a second section exists',()=>{
 const s=game();handPlace(s,'section:a',{x:-.775,z:3});secureBridgeHalf(s,'west');
 assert.equal(sectionSecured(s.getSnapshot().chapter,'a'),true);assert.equal(bridgeReady(s.getSnapshot().chapter),false);assert.equal(s.getSnapshot().chapter.joined,false);
 bridgeWalk(s,{x:-.7,z:3});assert.equal(s.getSnapshot().chapter.story.bridgeFailures,0);assert.ok(validChapter(s.getSnapshot().chapter));
 assert.equal(walkable(s.getSnapshot().chapter,{x:.7,z:3}),false);
 handPlace(s,'section:b',{x:.775,z:3});secureBridgeHalf(s,'east');assert.equal(bridgeReady(s.getSnapshot().chapter),true);
 bridgeWalk(s,{x:2.4,z:3});assert.equal(s.getSnapshot().chapter.crossed,true);assert.equal(s.getSnapshot().chapter.history.filter(x=>x==='B').length,1);
});
test('placing two pieces without fastening allows a real collapse and retains the seed and materials',()=>{
 const s=game();handPlace(s,'section:a',{x:-.775,z:3});handPlace(s,'section:b',{x:.775,z:3});
 s.send({type:'GO',point:{x:.7,z:3}});advance(s);assert.equal(s.getSnapshot().chapter.story.bridgeFailures,1);assert.equal(s.getSnapshot().chapter.seed,'pip');assert.equal(s.getSnapshot().mode,'walk');assert.ok(validChapter(s.getSnapshot().chapter));assert.equal(s.getSnapshot().chapter.crossed,false);
 buildBridge(s);assert.equal(bridgeReady(s.getSnapshot().chapter),true);
});
test('collapse recovery leaves unused storage untouched and both original sections separately reusable',()=>{
 for(const first of ['a','b'] as const)for(const site of [{x:-.775,z:3},{x:-1.575,z:-2}]){
  const other=first==='a'?'b':'a',s=game(),stored=structuredClone(s.getSnapshot().chapter.sections);
  handPlace(s,`section:${first}`,site);handPlace(s,'post:west-north',postPoint(s.getSnapshot().chapter,'west-north'));advance(s);
  s.send({type:'GO',point:site});advance(s);
  const recovered=s.getSnapshot().chapter;assert.equal(recovered.story.bridgeFailures,1);assert.equal(s.getSnapshot().mode,'walk');assert.equal(s.getSnapshot().gesture,null);
  assert.deepEqual(recovered.sections[other],stored[other],'The unused section stays where Pip left it');
  assert.ok(Math.abs(recovered.sections.a.z-recovered.sections.b.z)>1.12,'Both source decks have separate visible footprints');assert.equal(recovered.seed,'pip');assert.ok(validChapter(recovered));
  const record=unpack({format:1,content:recovered.content,revision:recovered.revision,writer:'current-collapse',payload:recovered,checksum:checksum(JSON.stringify(recovered))});assert.ok(record);
  const resumed=new GardenStore(initialGarden('unused'));resumed.send({type:'BOOT',chapter:record.payload});assert.deepEqual(resumed.getSnapshot().chapter.sections,recovered.sections);
  buildBridge(resumed);assert.equal(bridgeReady(resumed.getSnapshot().chapter),true);
 }
});
test('after both sections collapse either recovered section can become the first support',()=>{
 for(const originalFirst of ['a','b'] as const){
  const recoveredFirst=originalFirst==='a'?'b':'a',s=game();
  handPlace(s,`section:${originalFirst}`,{x:-.775,z:3});handPlace(s,`section:${recoveredFirst}`,{x:.775,z:3});
  s.send({type:'GO',point:{x:.7,z:3}});advance(s);assert.equal(s.getSnapshot().chapter.story.bridgeFailures,1);
  handPlace(s,`section:${recoveredFirst}`,{x:-.775,z:3});secureBridgeHalf(s,'west');
  assert.equal(constructionOf(s.getSnapshot().chapter).first,recoveredFirst);assert.equal(sectionSecured(s.getSnapshot().chapter,recoveredFirst),true);
  bridgeWalk(s,{x:-.7,z:3});handPlace(s,`section:${originalFirst}`,{x:.775,z:3});secureBridgeHalf(s,'east');
  bridgeWalk(s,{x:2.4,z:3});assert.equal(s.getSnapshot().chapter.crossed,true);assert.ok(validChapter(s.getSnapshot().chapter));
 }
});
test('an overlapping loose section cannot remove the secured support beneath Pip for either section identity',()=>{
 for(const first of ['a','b'] as const){
  const second=first==='a'?'b':'a',s=game();handPlace(s,`section:${first}`,{x:-.775,z:3});secureBridgeHalf(s,'west');bridgeWalk(s,{x:-.7,z:3});
  const stable=structuredClone(s.getSnapshot().chapter.sections[first]);handPlace(s,`section:${second}`,{x:-.775,z:3});
  assert.equal(unstableSectionAt(s.getSnapshot().chapter,s.getSnapshot().chapter.pip),null);s.send({type:'TICK',ms:80});
  assert.equal(s.getSnapshot().action,null);assert.equal(s.getSnapshot().chapter.story.bridgeFailures,0);assert.deepEqual(s.getSnapshot().chapter.sections[first],stable);
  // The same loose section still fails when Pip leaves stable support and steps onto it.
  handPlace(s,`section:${second}`,{x:.775,z:3});s.send({type:'GO',point:{x:.7,z:3}});advance(s);
  assert.equal(s.getSnapshot().chapter.story.bridgeFailures,1);assert.equal(sectionSecured(s.getSnapshot().chapter,first),true);assert.deepEqual(s.getSnapshot().chapter.sections[first],stable);assert.ok(validChapter(s.getSnapshot().chapter));
 }
});
test('stepping onto a loose second section preserves the secured first section, posts and ropes',()=>{
 const s=game();handPlace(s,'section:a',{x:-.775,z:3});secureBridgeHalf(s,'west');bridgeWalk(s,{x:-.7,z:3});handPlace(s,'section:b',{x:.775,z:3});const stable=structuredClone(s.getSnapshot().chapter.sections.a);
 s.send({type:'GO',point:{x:.7,z:3}});advance(s);assert.equal(s.getSnapshot().chapter.story.bridgeFailures,1);assert.deepEqual(s.getSnapshot().chapter.sections.a,stable);assert.equal(sectionSecured(s.getSnapshot().chapter,'a'),true);assert.equal(ropePoints(s.getSnapshot().chapter,'north').length,2);assert.ok(validChapter(s.getSnapshot().chapter));
 handPlace(s,'section:b',{x:.775,z:3});secureBridgeHalf(s,'east');assert.ok(bridgeReady(s.getSnapshot().chapter));
});
test('invalid post drops, unfinished rope drags and interruption cannot create structural support',()=>{
 const s=game();handPlace(s,'section:a',{x:-.775,z:3});bridgeWalk(s,{x:-1.975,z:3});
 handPlace(s,'post:west-north',{x:-3,z:2});assert.equal(constructionOf(s.getSnapshot().chapter).posts['west-north'],false);
 handPlace(s,'post:west-north',postPoint(s.getSnapshot().chapter,'west-north'));handPlace(s,'post:center-north',postPoint(s.getSnapshot().chapter,'center-north'));
 s.send({type:'HAND_BEGIN',object:'rope:north'});s.send({type:'HAND_MOVE',point:postPoint(s.getSnapshot().chapter,'center-north')});s.send({type:'INTERRUPT',background:true});s.send({type:'HAND_RELEASE'});
 assert.equal(constructionOf(s.getSnapshot().chapter).ropes.north.center,false);assert.equal(sectionSecured(s.getSnapshot().chapter,'a'),false);
});
test('saved partial construction resumes on its secured surface with no replay or phantom knots',()=>{
 const s=game();handPlace(s,'section:a',{x:-.775,z:3});secureBridgeHalf(s,'west');bridgeWalk(s,{x:-.7,z:3});const payload=s.getSnapshot().chapter;
 const e=unpack({format:1,content:'garden-chapter-3',revision:payload.revision,writer:'test',payload,checksum:checksum(JSON.stringify(payload))});assert.ok(e);
 const restored=new GardenStore(initialGarden('unused'));restored.send({type:'BOOT',chapter:e.payload});assert.deepEqual(restored.getSnapshot().chapter,payload);assert.equal(restored.getSnapshot().gesture,null);assert.equal(bridgePosts.filter(id=>constructionOf(e.payload).posts[id]).length,4);
});

test('bridge target drops align automatically, missed drops roll back and ropes can be taken directly from storage',()=>{
 const s=new GardenStore(initialGarden('direct-bridge-targets'));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});bridgeWalk(s,CROSSING);
 const initial=structuredClone(s.getSnapshot().chapter.sections);handPlace(s,'section:a',{x:-3.4,z:4});assert.deepEqual(s.getSnapshot().chapter.sections,initial);assert.equal(s.getSnapshot().mode,'walk');
 s.send({type:'HAND_BEGIN',object:'section:a'});s.send({type:'HAND_ROTATE',direction:1});s.send({type:'HAND_MOVE',point:{x:-.65,z:3.2}});s.send({type:'HAND_RELEASE'});
 assert.deepEqual(s.getSnapshot().chapter.sections.a,{x:-.775,z:3,rotation:0});
 for(const id of ['west-north','west-south','center-north','center-south'] as const)handPlace(s,`post:${id}`,postPoint(s.getSnapshot().chapter,id));
 assert.equal(s.getSnapshot().chapter.river.ropesCollected,false);
 handPlace(s,'rope:north',postPoint(s.getSnapshot().chapter,'center-north'));assert.equal(s.getSnapshot().chapter.river.ropesCollected,true);assert.equal(sectionSecured(s.getSnapshot().chapter,'a'),false);
 handPlace(s,'rope:south',postPoint(s.getSnapshot().chapter,'center-south'));assert.equal(sectionSecured(s.getSnapshot().chapter,'a'),true);assert.equal(s.getSnapshot().chapter.river.ropeLocations.west,'attached');assert.equal(s.getSnapshot().chapter.river.ropeLocations.east,'attached');assert.ok(validChapter(s.getSnapshot().chapter));
});
