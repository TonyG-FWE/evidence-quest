import {completeConversation} from './garden-play-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,bridgeReady,type Point} from '../src/garden/model.js';
import {atMooring,ropeCount} from '../src/garden/river.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
let id=0;
const game=()=>{const s=new GardenStore(initialGarden('river-'+(++id)),()=>String(++id));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});return s;};
function tick(s:GardenStore,ms=6000){for(let t=0;t<ms;t+=80)s.send({type:'TICK',ms:80});}
function go(s:GardenStore,p:Point){s.send({type:'GO',point:p});tick(s,14000);assert.deepEqual(s.getSnapshot().chapter.pip,p);}
function assemble(s:GardenStore,swapped=false){go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);s.send({type:'ARRANGE'});for(const [section,side]of [['a',swapped?'east':'west'],['b',swapped?'west':'east']] as const){s.send({type:'SELECT',section});s.send({type:'POST_PREVIEW',site:'narrow',side});s.send({type:'PLACE'});}s.send({type:'JOIN'});}
function steer(s:GardenStore,p:Point){s.send({type:'STEER',point:p});tick(s,8000);}
function roundtrip(s:GardenStore){const c=s.getSnapshot().chapter,e={format:1,content:c.content,revision:1,writer:'test',payload:c,checksum:checksum(JSON.stringify(c))};assert.equal(validChapter(c),true);assert.deepEqual(unpack(e)?.payload,c);const restored=new GardenStore(initialGarden('unused'));restored.send({type:'BOOT',chapter:c});return restored;}
test('G3: generous visible post previews retain explicit placement, orientation, join and actual crossing',()=>{
 const s=game();go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);assert.equal(ropeCount(s.getSnapshot().chapter,'pip'),2);s.send({type:'ARRANGE'});
 for(const [section,x]of [['a',-1.1],['b',1.1]] as const){s.send({type:'SELECT',section});s.send({type:'PREVIEW',point:{x,z:3.3}});assert.equal(s.getSnapshot().chapter.sections[section].z,section==='a'?1:2.5);s.send({type:'PLACE'});}
 s.send({type:'JOIN'});s.send({type:'FASTEN',end:'west'});s.send({type:'FASTEN',end:'east'});assert.equal(bridgeReady(s.getSnapshot().chapter),true);assert.equal(s.getSnapshot().chapter.crossed,false);assert.equal(ropeCount(s.getSnapshot().chapter,'attached'),2);s.send({type:'BACK'});go(s,GRANDMA_APPROACH);assert.equal(s.getSnapshot().chapter.history.filter(h=>h==='B').length,1);roundtrip(s);
});
test('G3: no/near/far anchors survive collapse and reload; free movement cannot switch rope identity',()=>{
 for(const end of [null,'west','east'] as const)for(const swapped of [false,true]){
  let s=game();assemble(s,swapped);if(end)s.send({type:'FASTEN',end});const before=s.getSnapshot().chapter,held=end?before.river.attachments[end]:null;s.send({type:'BACK'});s.send({type:'TRY_CROSS'});tick(s,14000);
  const c=s.getSnapshot().chapter;assert.equal(c.joined,false);assert.equal(c.story.bridgeFailures,1);assert.equal(c.seed,'pip');assert.equal(c.crossed,false);if(end){assert.equal(c[end],true);assert.equal(c.river.attachments[end],held);assert.deepEqual(c.sections[held!],before.sections[held!]);}
  s=roundtrip(s);go(s,CROSSING);s.send({type:'ARRANGE'});if(end){const free=held==='a'?'b':'a';s.send({type:'SELECT',section:free});s.send({type:'PREVIEW',point:{x:end==='west'?-3.6:3.6,z:3}});s.send({type:'PLACE'});assert.equal(s.getSnapshot().chapter.river.attachments[end],held);roundtrip(s);s.send({type:'SELECT',section:held!});s.send({type:'PREVIEW',point:{x:0,z:3}});assert.equal(s.getSnapshot().preview,null);}
  s.send({type:'ADJUST'});s.send({type:'BACK'});assemble(s,swapped);s.send({type:'FASTEN',end:'west'});s.send({type:'FASTEN',end:'east'});s.send({type:'BACK'});go(s,GRANDMA_APPROACH);roundtrip(s);
 }
});
test('G3: boat navigation, wrong landing, obstruction, pause, reload, explicit unload and real receipt',()=>{
 let s=game();go(s,CROSSING);const pip=s.getSnapshot().chapter.pip;s.send({type:'FERRY'});s.send({type:'INTERRUPT',background:true});assert.equal(s.getSnapshot().chapter.seed,'boat');assert.equal(s.getSnapshot().chapter.history.includes('F'),false);s.send({type:'FOREGROUND'});s.send({type:'LAUNCH_BOAT'});steer(s,{x:0,z:.8});assert.match(s.getSnapshot().notice,/rock/);assert.equal(s.getSnapshot().chapter.seed,'boat');s.send({type:'DOCK_SEED'});assert.equal(s.getSnapshot().action,null);
 s.send({type:'SETTING',key:'reducedMotion',value:true});steer(s,{x:-.7,z:0});s.send({type:'OPEN',panel:'help'});const paused=s.getSnapshot().chapter.river.boat.position;tick(s);assert.deepEqual(s.getSnapshot().chapter.river.boat.position,paused);s=roundtrip(s);assert.equal(s.getSnapshot().mode,'boat');assert.deepEqual(s.getSnapshot().chapter.river.boat.position,paused);s.send({type:'GO',point:GRANDMA_APPROACH});assert.deepEqual(s.getSnapshot().chapter.pip,pip);
 steer(s,{x:-1.4,z:0});steer(s,{x:-1.4,z:.8});s.send({type:'UNLOAD_SEED'});tick(s);assert.equal(s.getSnapshot().chapter.seed,'pip');assert.equal(s.getSnapshot().chapter.history.includes('F'),false);s.send({type:'FERRY'});tick(s);s.send({type:'LAUNCH_BOAT'});steer(s,{x:-1.4,z:0});steer(s,{x:1.4,z:0});steer(s,{x:1.4,z:.8});assert.equal(atMooring(s.getSnapshot().chapter,'east'),true);assert.equal(s.getSnapshot().chapter.seed,'boat');s.send({type:'DOCK_SEED'});tick(s);s.send({type:'DOCK_SEED'});tick(s);assert.equal(s.getSnapshot().chapter.seed,'grandma');assert.equal(s.getSnapshot().chapter.history.filter(h=>h==='F').length,1);assert.equal(s.getSnapshot().chapter.river.soilPrepared,true);assert.deepEqual(s.getSnapshot().chapter.pip,pip);roundtrip(s);
});
test('G3: first Grandma visit can agree only the later time after a real report, without a page, planting or Sol',()=>{
 const s=game();go(s,{x:-3.5,z:-3.05});s.send({type:'TALK',who:'mara'});completeConversation(s);s.send({type:'CLOSE'});assemble(s);s.send({type:'FASTEN',end:'west'});s.send({type:'FASTEN',end:'east'});s.send({type:'BACK'});go(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'STORY',event:{kind:'REPORT_MARA'}});s.send({type:'STORY',event:{kind:'ASK_LATER'}});const c=s.getSnapshot().chapter;assert.equal(c.story.timeAgreed,'later');assert.equal(c.story.plan,null);assert.equal(c.story.maraInvitation,null);assert.equal(c.story.solInvitation,null);assert.equal(c.story.metSol,false);assert.equal(c.seed,'pip');assert.equal(c.page,'mara');roundtrip(s);
});
