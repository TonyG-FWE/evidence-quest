import {secureBridgeHalf,handPlace,bridgeWalk} from './garden-bridge-actions.js';
import {advance as tick,completeConversation,steerSeedToGrandma} from './garden-play-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,bridgeReady,type Point} from '../src/garden/model.js';
import {atMooring,ropeCount,LAUNCH,ROCK,earlierRiver} from '../src/garden/river.js';
import {anchors} from '../src/garden/worldLayout.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
let id=0;
const game=()=>{const s=new GardenStore(initialGarden('river-'+(++id)),()=>String(++id));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});return s;};
function go(s:GardenStore,p:Point){s.send({type:'GO',point:p});tick(s);assert.deepEqual(s.getSnapshot().chapter.pip,p);}
function assemble(s:GardenStore,swapped=false){go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);s.send({type:'ARRANGE'});for(const [section,side]of [['a',swapped?'east':'west'],['b',swapped?'west':'east']] as const){s.send({type:'SELECT',section});s.send({type:'POST_PREVIEW',site:'narrow',side});s.send({type:'PLACE'});}s.send({type:'JOIN'});}
function steer(s:GardenStore,p:Point){s.send({type:'STEER',point:p});tick(s);}
function roundtrip(s:GardenStore){const c=s.getSnapshot().chapter,e={format:1,content:c.content,revision:1,writer:'test',payload:c,checksum:checksum(JSON.stringify(c))},loaded=unpack(e);assert.equal(validChapter(c),true);assert.ok(loaded);assert.deepEqual(loaded.payload,c);const restored=new GardenStore(initialGarden('unused'));restored.send({type:'BOOT',chapter:loaded.payload});return restored;}
test('G3: generous visible post previews retain explicit placement, orientation, join and actual crossing',()=>{
 const s=game();go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);assert.equal(ropeCount(s.getSnapshot().chapter,'pip'),2);s.send({type:'ARRANGE'});
 for(const [section,x]of [['a',-1.1],['b',1.1]] as const){s.send({type:'SELECT',section});s.send({type:'PREVIEW',point:{x,z:3.3}});assert.equal(s.getSnapshot().chapter.sections[section].z,section==='a'?1:2.5);s.send({type:'PLACE'});}
 s.send({type:'JOIN'});secureBridgeHalf(s,'west');secureBridgeHalf(s,'east');assert.equal(bridgeReady(s.getSnapshot().chapter),true);assert.equal(s.getSnapshot().chapter.crossed,false);assert.equal(ropeCount(s.getSnapshot().chapter,'attached'),2);s.send({type:'BACK'});go(s,GRANDMA_APPROACH);assert.equal(s.getSnapshot().chapter.history.filter(h=>h==='B').length,1);roundtrip(s);
});
test('G3: migrated no/near/far anchors survive collapse and reload without switching section identity',()=>{
 for(const end of [null,'west','east'] as const)for(const swapped of [false,true]){
  let s=game();assemble(s,swapped);
  // Synthetic legacy snapshot isolates the retired two-end fastening migration.
  const payload=structuredClone(s.getSnapshot().chapter);delete payload.river.construction;
  const west=swapped?'b':'a',east=swapped?'a':'b';payload.west=end==='west';payload.east=end==='east';payload.river.attachments={west:payload.west?west:null,east:payload.east?east:null};payload.river.ropeLocations={west:payload.west?'attached':'pip',east:payload.east?'attached':'pip'};
  const migrated=unpack({format:1,content:payload.content,revision:payload.revision,writer:'synthetic-old-end-binding',payload,checksum:checksum(JSON.stringify(payload))});assert.ok(migrated);
  s=new GardenStore(initialGarden('restored'));s.send({type:'BOOT',chapter:migrated.payload});const before=s.getSnapshot().chapter,held=end?before.river.attachments[end]:null;s.send({type:'TRY_CROSS'});tick(s,14000);
  const c=s.getSnapshot().chapter;assert.equal(c.joined,false);assert.equal(c.story.bridgeFailures,1);assert.equal(c.seed,'pip');assert.equal(c.crossed,false);if(end){assert.equal(c[end],true);assert.equal(c.river.attachments[end],held);assert.deepEqual(c.sections[held!],before.sections[held!]);}
  s=roundtrip(s);go(s,CROSSING);if(held){const old=structuredClone(s.getSnapshot().chapter.sections[held]);s.send({type:'HAND_BEGIN',object:held==='a'?'section:a':'section:b'});assert.equal(s.getSnapshot().gesture,null);assert.deepEqual(s.getSnapshot().chapter.sections[held],old);}
  if(!s.getSnapshot().chapter.west){handPlace(s,west==='a'?'section:a':'section:b',{x:-.775,z:3});secureBridgeHalf(s,'west');}
  bridgeWalk(s,{x:-.775,z:3});if(!s.getSnapshot().chapter.east){handPlace(s,east==='a'?'section:a':'section:b',{x:.775,z:3});secureBridgeHalf(s,'east');}
  go(s,GRANDMA_APPROACH);roundtrip(s);
 }
});
test('G3: older partial fastenings retain usable ropes when collection was not recorded',()=>{
 for(const end of [null,'west','east'] as const)for(const swapped of [false,true]){
  let s=game();assemble(s,swapped);const payload=structuredClone(s.getSnapshot().chapter);
  // Historical earlierRiver snapshots predate explicit collection progress.
  payload.west=end==='west';payload.east=end==='east';payload.river=earlierRiver(payload);assert.equal(payload.river.ropesCollected,false);assert.ok(validChapter(payload));
  const migrated=unpack({format:1,content:payload.content,revision:payload.revision,writer:'old-unrecorded-rope-collection',payload,checksum:checksum(JSON.stringify(payload))});assert.ok(migrated);
  s=new GardenStore(initialGarden('restored'));s.send({type:'BOOT',chapter:migrated.payload});const before=s.getSnapshot().chapter,held=end?before.river.attachments[end]:null;
  if(end){assert.equal(before.river.ropesCollected,true);assert.equal(ropeCount(before,'attached'),2);assert.equal(ropeCount(before,'box'),0);}
  else{assert.equal(before.river.ropesCollected,false);assert.equal(ropeCount(before,'box'),2);s.send({type:'HAND_BEGIN',object:'rope:north'});assert.equal(s.getSnapshot().gesture,null);s.send({type:'COLLECT_ROPES'});tick(s);}
  if(!before.west)secureBridgeHalf(s,'west');
  if(!before.east)secureBridgeHalf(s,'east');
  if(held)assert.deepEqual(s.getSnapshot().chapter.sections[held],before.sections[held]);
  assert.equal(bridgeReady(s.getSnapshot().chapter),true);go(s,GRANDMA_APPROACH);s=roundtrip(s);assert.equal(s.getSnapshot().chapter.crossed,true);
 }
});

test('G3: boat navigation, wrong landing, obstruction, pause, reload, explicit unload and real receipt',()=>{
 let s=game();go(s,CROSSING);const pip=s.getSnapshot().chapter.pip;s.send({type:'FERRY'});s.send({type:'INTERRUPT',background:true});assert.equal(s.getSnapshot().chapter.seed,'boat');assert.equal(s.getSnapshot().chapter.history.includes('F'),false);s.send({type:'FOREGROUND'});assert.equal(s.getSnapshot().chapter.river.boat.phase,'steering');
 steer(s,ROCK);assert.match(s.getSnapshot().notice,/rock/);assert.equal(s.getSnapshot().chapter.seed,'boat');s.send({type:'DOCK_SEED'});assert.equal(s.getSnapshot().action,null);
 s.send({type:'SETTING',key:'reducedMotion',value:true});steer(s,{x:LAUNCH.x/2,z:ROCK.z-.8});s.send({type:'OPEN',panel:'help'});const paused=s.getSnapshot().chapter.river.boat.position;tick(s,6000);assert.deepEqual(s.getSnapshot().chapter.river.boat.position,paused);s=roundtrip(s);assert.equal(s.getSnapshot().mode,'boat');assert.deepEqual(s.getSnapshot().chapter.river.boat.position,paused);s.send({type:'GO',point:GRANDMA_APPROACH});assert.deepEqual(s.getSnapshot().chapter.pip,pip);
 steer(s,{x:LAUNCH.x,z:ROCK.z-.8});steer(s,LAUNCH);assert.equal(atMooring(s.getSnapshot().chapter,'west'),true);s.send({type:'UNLOAD_SEED'});tick(s);assert.equal(s.getSnapshot().chapter.seed,'pip');assert.equal(s.getSnapshot().chapter.history.includes('F'),false);
 s.send({type:'FERRY'});tick(s);assert.equal(s.getSnapshot().chapter.river.boat.phase,'steering');
 steerSeedToGrandma(s);
 s.send({type:'DOCK_SEED'});tick(s,6000);s.send({type:'DOCK_SEED'});tick(s,6000);assert.equal(s.getSnapshot().chapter.seed,'grandma');assert.equal(s.getSnapshot().chapter.history.filter(h=>h==='F').length,1);assert.equal(s.getSnapshot().chapter.river.soilPrepared,false,'Delivery does not prepare the planting spot');assert.deepEqual(s.getSnapshot().chapter.pip,pip);roundtrip(s);
});
test('G3: first Grandma visit can agree only the later time after a real report, without a page, planting or Sol',()=>{
 const s=game();go(s,anchors.dock.approach);s.send({type:'TALK',who:'mara'});completeConversation(s);s.send({type:'CLOSE'});assemble(s);secureBridgeHalf(s,'west');secureBridgeHalf(s,'east');s.send({type:'BACK'});go(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'STORY',event:{kind:'REPORT_MARA'}});s.send({type:'STORY',event:{kind:'ASK_LATER'}});const c=s.getSnapshot().chapter;assert.equal(c.story.timeAgreed,'later');assert.equal(c.story.plan,null);assert.equal(c.story.maraInvitation,null);assert.equal(c.story.solInvitation,null);assert.equal(c.story.metSol,false);assert.equal(c.seed,'pip');assert.equal(c.page,'mara');roundtrip(s);
});

test('guided boat turns within its angular bound, retains held input at obstacles and brakes on release',()=>{
 let s=game();go(s,CROSSING);s.send({type:'FERRY'});tick(s);
 s.send({type:'STEER',point:{x:-1.4,z:0}});s.send({type:'TICK',ms:80});
 const turn=s.getSnapshot().chapter.river.boat.heading!;assert.ok(Math.abs(turn-Math.PI/2)<=2.6*.08+1e-9);
 tick(s,1600);const moving=s.getSnapshot();assert.equal(moving.chapter.seed,'boat');
 const position={...moving.chapter.river.boat.position};s.send({type:'STEER_STOP'});tick(s,400);
 assert.equal(s.getSnapshot().boatTarget,null);assert.equal(s.getSnapshot().boatSpeed,0);assert.ok(Math.hypot(s.getSnapshot().chapter.river.boat.position.x-position.x,s.getSnapshot().chapter.river.boat.position.z-position.z)<.20);
 const heading=s.getSnapshot().chapter.river.boat.heading;s=roundtrip(s);assert.equal(s.getSnapshot().chapter.river.boat.heading,heading);assert.equal(s.getSnapshot().boatSpeed,0);
 s.send({type:'KEY',key:'arrowleft',down:true});tick(s,6000);assert.ok(s.getSnapshot().keys.includes('arrowleft'),'Contact cannot lose the still-held key');
 const stopped={...s.getSnapshot().chapter.river.boat.position};s.send({type:'KEY',key:'arrowleft',down:false});s.send({type:'KEY',key:'arrowright',down:true});tick(s,1800);
 assert.ok(Math.hypot(s.getSnapshot().chapter.river.boat.position.x-stopped.x,s.getSnapshot().chapter.river.boat.position.z-stopped.z)>.10,'Turning away from the bank remains responsive');assert.equal(s.getSnapshot().chapter.seed,'boat');
});
