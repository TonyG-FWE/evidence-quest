import {secureBridgeHalf,bridgeWalk,handPlace,buildBridge} from './garden-bridge-actions.js';
import {postPoint,constructionOf} from '../src/garden/bridgeConstruction.js';
import {advance as tick,completeConversation,steerSeedToGrandma} from './garden-play-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,bridgeReady,bridgeCenter,encounterDone,CROSSING,MARA,GRANDMA,GRANDMA_APPROACH,TREE_POSITIONS,GAP,LOOSE,walkable,type Point,type Chapter} from '../src/garden/model.js';
import {sources,sourcePrefix,words,meaning} from '../src/garden/content.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
import {offsets,translated} from '../src/garden/worldLayout.js';
let n=0;
function game(){const store=new GardenStore(initialGarden('test-run-'+(++n)),()=>String(++n));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});return store;}
function go(store:GardenStore,point:Point){store.send({type:'GO',point});tick(store);assert.ok(Math.hypot(store.getSnapshot().chapter.pip.x-point.x,store.getSnapshot().chapter.pip.z-point.z)<.01,'Actor must actually reach the target');}
function section(store:GardenStore,key:'a'|'b',point:Point){store.send({type:'SELECT',section:key});store.send({type:'PREVIEW',point});store.send({type:'PLACE'});}
function assembly(store:GardenStore,z=3,center=0){go(store,CROSSING);store.send({type:'COLLECT_ROPES'});tick(store);store.send({type:'ARRANGE'});section(store,'a',{x:center-.775,z});section(store,'b',{x:center+.775,z});store.send({type:'JOIN'});}
function secure(store:GardenStore){secureBridgeHalf(store,'west');secureBridgeHalf(store,'east');assert.equal(bridgeReady(store.getSnapshot().chapter),true);go(store,CROSSING);}
function ferry(s:GardenStore){s.send({type:'FERRY'});tick(s);if(s.getSnapshot().chapter.seed==='boat')steerSeedToGrandma(s);}
function receivePage(store:GardenStore){go(store,{x:MARA.x,z:MARA.z+.95});store.send({type:'TALK',who:'mara'});completeConversation(store);store.send({type:'TAKE_PAGE'});tick(store);store.send({type:'CLOSE'});}
function cross(store:GardenStore){go(store,GRANDMA_APPROACH);assert.equal(store.getSnapshot().chapter.crossed,true);}
test('D029 / D081.R15.AC01-03: carried seed, actual walking, page report and source remain distinct',()=>{
 const s=game();receivePage(s);assert.equal(s.getSnapshot().chapter.page,'pip');assert.equal(s.getSnapshot().chapter.grandmaHeard,false);
 assembly(s);secure(s);assert.equal(s.getSnapshot().chapter.crossed,false);assert.ok(s.getSnapshot().chapter.pip.x<0);
 cross(s);s.send({type:'TALK',who:'grandma'});s.send({type:'PLANT'});tick(s);s.send({type:'BLOOM'});tick(s);
 assert.equal(s.getSnapshot().chapter.seed,'soil');assert.equal(s.getSnapshot().chapter.bloomed,true);assert.equal(encounterDone(s.getSnapshot().chapter),false);
 s.send({type:'TALK',who:'grandma'});s.send({type:'REPORT'});tick(s);
 assert.equal(s.getSnapshot().chapter.page,'grandma');assert.equal(s.getSnapshot().chapter.grandmaHeard,false);s.send({type:'STORY',event:{kind:'REPORT_MARA'}});assert.equal(s.getSnapshot().chapter.grandmaHeard,true);assert.equal(encounterDone(s.getSnapshot().chapter),false,'First encounter is not the complete chapter');
 assert.ok(!s.getSnapshot().chapter.exposed.some(id=>id.includes('STORY')),'Delivery is not source exposure');
 s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,'grandma','Report returns to its actual conversation');s.send({type:'CLOSE'});go(s,CROSSING);assert.ok(s.getSnapshot().chapter.pip.x<0,'Persistent return route');
});
test('Boat/bridge correction: seed boat never moves bridge sections, Pip or his page',()=>{
 const s=game();receivePage(s);go(s,CROSSING);const before=s.getSnapshot().chapter;s.send({type:'FERRY'});tick(s,480);
 assert.equal(s.getSnapshot().action?.kind,'loadSeed');assert.deepEqual(s.getSnapshot().chapter.sections,before.sections);assert.deepEqual(s.getSnapshot().chapter.pip,before.pip);tick(s);s.send({type:'UNLOAD_SEED'});tick(s);ferry(s);
 assert.equal(s.getSnapshot().chapter.seed,'grandma');assert.equal(s.getSnapshot().chapter.ferrySide,'east');assert.deepEqual(s.getSnapshot().chapter.pip,before.pip);assert.equal(s.getSnapshot().chapter.page,'pip');assert.deepEqual(s.getSnapshot().chapter.sections,before.sections);
 assembly(s);secure(s);cross(s);s.send({type:'PLANT'});tick(s);s.send({type:'BLOOM'});tick(s);assert.equal(s.getSnapshot().chapter.seed,'soil');
});
test('Boat/bridge correction: a fastened footbridge stays fixed during seed delivery',()=>{
 const s=game();receivePage(s);assembly(s);secure(s);const before=s.getSnapshot().chapter;ferry(s);
 const c=s.getSnapshot().chapter;assert.equal(c.seed,'grandma');assert.equal(c.ferrySide,'east');assert.equal(c.crossed,false);assert.equal(bridgeReady(c),true);assert.deepEqual(c.sections,before.sections);assert.deepEqual(c.pip,before.pip);assert.equal(c.page,before.page);
 cross(s);assert.equal(s.getSnapshot().chapter.ferrySide,'east');
});
test('Boat/bridge correction: placing or turning a section cannot block the boat channel',()=>{
 const s=game();go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);s.send({type:'ARRANGE'});const before=s.getSnapshot().chapter.sections;
 section(s,'a',{x:0,z:.8});assert.deepEqual(s.getSnapshot().chapter.sections,before);assert.match(s.getSnapshot().notice,/clear for the seed boat/);
 section(s,'a',{x:0,z:2.15});const placed=s.getSnapshot().chapter.sections;s.send({type:'ROTATE',direction:1});assert.deepEqual(s.getSnapshot().chapter.sections,placed);assert.match(s.getSnapshot().notice,/away from the seed boat/);assert.equal(validChapter(s.getSnapshot().chapter),true);
});
test('D030 / D081.R15.AC02: visible wide gap, wrong anchor, loose end and direct correction',()=>{
 const s=game();assembly(s,-2,-.8);assert.equal(bridgeReady(s.getSnapshot().chapter),false);s.send({type:'GO',point:GRANDMA_APPROACH});tick(s);assert.ok(s.getSnapshot().chapter.pip.x<0,'A water gap supplies no route');
 s.send({type:'ARRANGE'});const middle=bridgeCenter(s.getSnapshot().chapter);section(s,'a',{x:s.getSnapshot().chapter.sections.a.x-middle.x,z:3});secureBridgeHalf(s,'west');
 s.send({type:'HAND_BEGIN',object:'rope:north'});assert.equal(s.getSnapshot().gesture,null,'A far rope needs its far post first');
 s.send({type:'GO',point:GRANDMA_APPROACH});tick(s);assert.equal(s.getSnapshot().chapter.story.bridgeFailures,1);assert.equal(s.getSnapshot().chapter.joined,false);assert.equal(s.getSnapshot().chapter.west,true,'The stable first half survives');
 handPlace(s,'section:b',{x:.775,z:3});secureBridgeHalf(s,'east');cross(s);
});

test('D081.R15.AC04: five equal physical histories, including F between planting/growth and trailing F',()=>{
 for(const history of ['BPL','FBPL','BFPL','BPFL','BPLF']){
  const s=game();go(s,CROSSING);
  for(const cue of history){
   if(cue==='B'){assembly(s);secure(s);cross(s);}
   if(cue==='F')ferry(s);
   if(cue==='P'){s.send({type:'PLANT'});tick(s);assert.equal(s.getSnapshot().chapter.bloomed,false);}
   if(cue==='L'){s.send({type:'BLOOM'});tick(s);}
  }
  assert.equal(s.getSnapshot().chapter.bloomed,true,history);assert.equal(s.getSnapshot().chapter.seed,'soil',history);
  assert.deepEqual(s.getSnapshot().chapter.history.filter(h=>['F','B','P','L'].includes(h)),history.split(''));
 }
});
test('D081.R15.AC05: cancellation, blur and duplicate actions preserve one committed result',()=>{
 const s=game();go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);s.send({type:'ARRANGE'});const before=structuredClone(s.getSnapshot().chapter.sections);s.send({type:'PREVIEW',point:{x:1,z:3}});s.send({type:'CANCEL'});assert.deepEqual(s.getSnapshot().chapter.sections,before);
 s.send({type:'BACK'});s.send({type:'FERRY'});s.send({type:'FERRY'});s.send({type:'INTERRUPT',background:true});tick(s,8000);assert.equal(s.getSnapshot().chapter.seed,'boat');assert.equal(s.getSnapshot().chapter.history.filter(h=>h==='F').length,0);
 s.send({type:'KEY',key:'w',down:true});tick(s,8000);assert.deepEqual(s.getSnapshot().keys,[]);
});
test('D081.R15: scenery shares physical bounds; keyboard placement is reversible until committed',()=>{
 const s=game(),c=s.getSnapshot().chapter;for(const [x,z]of TREE_POSITIONS)assert.equal(walkable(c,{x,z}),false);assert.equal(walkable(c,translated({x:-5.1,z:-4.5},offsets.dock)),false);assert.equal(walkable(c,translated({x:5.15,z:2.28},offsets.garden)),false);assert.equal(walkable(c,GRANDMA_APPROACH),true);
 go(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);s.send({type:'ARRANGE'});const before=structuredClone(s.getSnapshot().chapter.sections);s.send({type:'NUDGE',x:0,z:.1});assert.deepEqual(s.getSnapshot().chapter.sections,before);assert.ok(s.getSnapshot().preview);s.send({type:'CANCEL'});assert.deepEqual(s.getSnapshot().chapter.sections,before);s.send({type:'ARRANGE'});s.send({type:'NUDGE',x:0,z:.1});s.send({type:'PLACE'});assert.equal(s.getSnapshot().chapter.sections.a.z,before.a.z+.1);
});
test('D081.R16: modal/reading input cannot move Pip and hidden sources cannot be opened',()=>{
 const s=game(),before={...s.getSnapshot().chapter.pip};s.send({type:'OPEN',panel:'opening'});s.send({type:'KEY',key:'d',down:true});tick(s,8000);assert.deepEqual(s.getSnapshot().chapter.pip,before);
 s.send({type:'EXPOSE',id:sourcePrefix('story',s.getSnapshot().chapter)+'1'});assert.deepEqual(s.getSnapshot().chapter.exposed,[]);s.send({type:'OPEN',panel:'story'});assert.equal(s.getSnapshot().panel,'opening');
 const id=sourcePrefix('opening',s.getSnapshot().chapter)+'1';s.send({type:'EXPOSE',id});assert.deepEqual(s.getSnapshot().chapter.exposed,[id]);
});
test('D081.R19: save checksums, corrupt data and immutable snapshots',()=>{
 const s=game(),c=s.getSnapshot().chapter;assert.equal(validChapter(c),true);assert.ok(Object.isFrozen(c.sections.a));
 assert.throws(()=>{c.pip.x=5;});
 const envelope={format:1,content:'garden-chapter-3',revision:1,writer:'test',payload:c,checksum:checksum(JSON.stringify(c))};
 assert.ok(unpack(envelope));assert.equal(unpack({...envelope,checksum:'wrong'}),null);
 assert.equal(validChapter({...c,seed:'copied'}),false);assert.equal(validChapter({...c,bloomed:true}),false);
});
// Synthetic version-1 disk fixtures, shaped like the preceding shipped encounter.
function oldSave(c:Chapter,boats=c.sections){
 const {sections:retiredSections,ferrySide:retiredSide,...rest}=structuredClone(c);void retiredSections;void retiredSide;
 const payload={...rest,version:1,content:'garden-encounter-1',boats:structuredClone(boats)};
 return {format:1,content:'garden-encounter-1',revision:7,writer:'prior-client',payload,checksum:checksum(JSON.stringify(payload))};
}
test('Boat/bridge correction: old saves retain progress and archiveable bytes without credit for the revised note',()=>{
 const s=game();receivePage(s);go(s,CROSSING);s.send({type:'EXPOSE_WORDS',ids:[]});
 const c={...structuredClone(s.getSnapshot().chapter),exposed:['GA.SRC.MARA.1','GA.SRC.BOATS.1','GA.SRC.BOATS.1.W1'],reading:{mara:81,boats:56}};
 const raw=oldSave(c,{a:{x:-.8,z:.65,rotation:0},b:{x:.8,z:-1.2,rotation:0}}),bytes=JSON.stringify(raw),upgraded=unpack(raw)!;
 assert.ok(upgraded);assert.equal(validChapter(upgraded.payload),true);assert.equal(upgraded.payload.runId,c.runId);assert.deepEqual(upgraded.payload.pip,c.pip);assert.equal(upgraded.payload.page,'pip');assert.equal(upgraded.payload.seed,'pip');assert.equal(upgraded.payload.ferrySide,'west');assert.equal(upgraded.payload.revision,c.revision+1);
 assert.deepEqual(upgraded.payload.exposed,['GA.SRC.MARA.1']);assert.deepEqual(upgraded.payload.reading,{mara:81});assert.equal(JSON.stringify(raw),bytes);assert.equal('boats' in upgraded.payload,false);assert.deepEqual(upgraded.payload.sections.b,raw.payload.boats.b);
});
test('Boat/bridge correction: completed old carried and ferried routes preserve their footbridge and outcomes',()=>{
 for(const ferryFirst of [false,true]){
  const s=game();receivePage(s);go(s,CROSSING);if(ferryFirst)ferry(s);assembly(s);secure(s);cross(s);s.send({type:'PLANT'});tick(s);s.send({type:'BLOOM'});tick(s);s.send({type:'TALK',who:'grandma'});s.send({type:'REPORT'});tick(s);
  const c=s.getSnapshot().chapter,raw=oldSave(c),upgraded=unpack(raw)!.payload;
  assert.equal(encounterDone(upgraded),false,'Old encounter completion does not finish the new chapter');assert.equal(upgraded.bloomed,true);assert.deepEqual(upgraded.sections,c.sections);assert.deepEqual(upgraded.pip,c.pip);assert.deepEqual(upgraded.history,c.history);assert.equal(upgraded.runId,c.runId);assert.equal(upgraded.ferrySide,ferryFirst?'east':'west');assert.equal(upgraded.page,c.page);
 }
});
test('Boat/bridge correction: migration rejects damage before relocating old objects',()=>{
 const c=game().getSnapshot().chapter,raw=oldSave(c,{a:{x:-.8,z:.65,rotation:0},b:{x:.8,z:-1.2,rotation:0}});
 assert.equal(unpack({...raw,checksum:'broken'}),null);assert.equal(unpack({...raw,content:'garden-encounter-99'}),null);
 const invalidRotation=structuredClone(raw);invalidRotation.payload.boats.a.rotation=.22;invalidRotation.checksum=checksum(JSON.stringify(invalidRotation.payload));assert.equal(unpack(invalidRotation),null);
 const invalidExposure={...raw,payload:{...raw.payload,exposed:[123]}};invalidExposure.checksum=checksum(JSON.stringify(invalidExposure.payload));assert.equal(unpack(invalidExposure),null);
 assert.equal(unpack({format:1,revision:1,writer:'missing-payload'}),null);
});
test('TASK11.02: every selectable source occurrence has a local meaning and exact reviewed source identity',()=>{
 for(const source of Object.values(sources)){assert.ok(source.authority.length);source.paragraphs.forEach(p=>words(p).forEach(w=>assert.ok(meaning(w,p),source.id+': '+w)));}
 assert.equal(sources.story.title,'The Torn Wing');assert.match(sources.mara.paragraphs.join(' '),/obligation to the passengers/);
 assert.match(sources.report.paragraphs[0]!,/working at the dock/);
});

test('Native controls publish handoff boundaries without re-rendering for action time alone',async()=>{
 const store=game();go(store,CROSSING);store.send({type:'FERRY'});
 assert.equal(store.getSnapshot().action?.kind,'loadSeed');
 let viewUpdates=0,simulationUpdates=0;
 const offView=store.subscribeView(()=>viewUpdates++),offSimulation=store.subscribe(()=>simulationUpdates++);
 for(let i=0;i<8;i++)store.send({type:'TICK',ms:80});
 await new Promise(resolve=>setTimeout(resolve,100));
 assert.equal(store.getSnapshot().action?.elapsed,640);
 assert.equal(simulationUpdates,8,'Animation receives every authoritative simulation tick');
 assert.equal(viewUpdates,0,'Unchanged native controls retain their existing DOM');
 for(let i=0;i<5;i++)store.send({type:'TICK',ms:80});
 await new Promise(resolve=>setTimeout(resolve,100));
 assert.equal(store.getViewSnapshot().chapter.seed,'boat');assert.ok(viewUpdates>0);
 const before=viewUpdates;store.send({type:'NOTICE',text:'Ready to steer'});
 assert.equal(viewUpdates,before+1,'Deliberate input publishes immediately');
 offView();offSimulation();
});
