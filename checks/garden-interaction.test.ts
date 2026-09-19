import {advance,completeConversation} from './garden-play-actions.js';
import {buildBridge} from './garden-bridge-actions.js';
import {finishBakery} from './garden-play-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,MARA,type Point} from '../src/garden/model.js';
import {SOL_APPROACH} from '../src/garden/chapter.js';
import {readerReturnLabel} from '../src/garden/interaction.js';
import {preparedEndingsFor} from '../src/garden/content.js';
let serial=0;
function game(){const store=new GardenStore(initialGarden('interaction-'+(++serial)),()=>String(++serial));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});return store;}
function tick(s:GardenStore,n?:number){advance(s,n===undefined?undefined:n*80);}
function walk(s:GardenStore,point:Point){s.send({type:'GO',point});tick(s);assert.ok(Math.hypot(s.getSnapshot().chapter.pip.x-point.x,s.getSnapshot().chapter.pip.z-point.z)<.01);}
function closeAll(s:GardenStore){for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,null);}
function garden(){const s=game();buildBridge(s);walk(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'PLANT'});tick(s);s.send({type:'BLOOM'});tick(s);return s;}
function writing(){const s=garden();closeAll(s);finishBakery(s);walk(s,SOL_APPROACH);s.send({type:'TALK',who:'sol'});completeConversation(s);s.send({type:'STORY',event:{kind:'FINISH_WITH_SOL'}});return s;}

test('G2-I01: nested sources, backpack and Help return to their actual parent without walking',()=>{
 const s=game(),pip=s.getSnapshot().chapter.pip;
 s.send({type:'OPEN',panel:'backpack',focus:{tag:'BUTTON',label:'Backpack',index:0}});
 s.send({type:'OPEN',panel:'opening',focus:{tag:'BUTTON',label:'Read',index:0}});
 s.send({type:'READ_POSITION',id:'opening',position:177});
 s.send({type:'OPEN',panel:'help'});assert.equal(readerReturnLabel(s.getSnapshot()),'Back to Grandma’s letter');
 s.send({type:'KEY',key:'d',down:true});tick(s,180);assert.deepEqual(s.getSnapshot().chapter.pip,pip);
 s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,'opening');assert.equal(s.getSnapshot().chapter.reading.opening,177);
 s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,'backpack');assert.equal(s.getSnapshot().restoreFocus?.label,'Read');
 s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,null);assert.equal(s.getSnapshot().restoreFocus?.label,'Backpack');
});
test('G2-I01/I06: a construction note and Pause preserve the construction return, cancel only the unplaced move',()=>{
 const s=game();walk(s,CROSSING);s.send({type:'COLLECT_ROPES'});tick(s);s.send({type:'ARRANGE'});const placed=s.getSnapshot().chapter.sections;
 s.send({type:'NUDGE',x:1,z:1});s.send({type:'OPEN',panel:'sections'});assert.equal(s.getSnapshot().preview,null);
 s.send({type:'INTERRUPT'});assert.equal(s.getSnapshot().panel,'pause');s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,'sections');s.send({type:'CLOSE'});
 assert.equal(s.getSnapshot().mode,'arrange');assert.deepEqual(s.getSnapshot().chapter.sections,placed);
});
test('G2-I03: a page handoff leaves the reader, settles once on interruption, and returns to Mara',()=>{
 const s=game();walk(s,{x:MARA.x,z:MARA.z+1.4});s.send({type:'TALK',who:'mara'});completeConversation(s);const beforeHandoff=s.getSnapshot().chapter.history.length;s.send({type:'TAKE_PAGE'});
 assert.equal(s.getSnapshot().panel,null);assert.equal(s.getSnapshot().chapter.page,'mara');assert.equal(s.getSnapshot().action?.kind,'page');
 s.send({type:'OPEN',panel:'help'});assert.equal(s.getSnapshot().chapter.page,'pip');const revision=s.getSnapshot().chapter.revision;
 s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,'mara');tick(s,180);assert.equal(s.getSnapshot().chapter.revision,revision);
 assert.equal(s.getSnapshot().action,null);assert.equal(s.getSnapshot().chapter.history.length,beforeHandoff+1);
});
test('G2-I04/I06: rehearsal has exact immutable input, no live-world effects, and freezes under Help',()=>{
 const s=writing(),text='The flour stayed dry. Rina baked the bread she had promised.';
 s.send({type:'STORY',event:{kind:'EDIT',text}});s.send({type:'CHOOSE_ENDING_SCENE',scene:'both'});
 const before=s.getSnapshot().chapter,contribution={text,scene:'both' as const,origin:'child' as const,revision:before.story.solDraft.revision};
 s.send({type:'REHEARSE',contribution});assert.equal(s.getSnapshot().panel,null);assert.equal(s.getSnapshot().activity?.kind,'ending-rehearsal');
 s.send({type:'KEY',key:'d',down:true});s.send({type:'STORY',event:{kind:'EDIT',text:'An unrelated edit'}});tick(s,10);
 assert.deepEqual(s.getSnapshot().chapter,before);const elapsed=s.getSnapshot().activity!.elapsed;
 s.send({type:'OPEN',panel:'help'});tick(s,20);assert.equal(s.getSnapshot().activity!.elapsed,elapsed);
 s.send({type:'OPEN',panel:'opening'});assert.equal(s.getSnapshot().panel,'opening');tick(s,10);assert.equal(s.getSnapshot().activity!.elapsed,elapsed);s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,'help');
 s.send({type:'CLOSE'});s.send({type:'OPEN',panel:'backpack'});s.send({type:'OPEN',panel:'opening'});assert.equal(s.getSnapshot().panel,'opening');s.send({type:'START_PLAY'});assert.equal(s.getSnapshot().panel,'opening','Reading a source cannot escape the rehearsal through an adventure action');s.send({type:'CLOSE'});assert.equal(s.getSnapshot().panel,'backpack');s.send({type:'CLOSE'});
 tick(s,10);assert.ok(s.getSnapshot().activity!.elapsed>elapsed);
 s.send({type:'ACTIVITY_BACK'});assert.equal(s.getSnapshot().panel,'writing');assert.equal(s.getSnapshot().chapter.story.solEnding,null);assert.equal(s.getSnapshot().viewDrafts.endingScene,'both');
 s.send({type:'REHEARSE',contribution});s.send({type:'ACTIVITY_ACCEPT'});assert.deepEqual(s.getSnapshot().chapter.story.solEnding,contribution);assert.equal(s.getSnapshot().panel,'writing');
 s.send({type:'STORY',event:{kind:'EDIT',text:'Newer words'}});s.send({type:'REHEARSE',contribution});assert.equal(s.getSnapshot().activity,null);assert.deepEqual(s.getSnapshot().chapter.story.solEnding,contribution);
});
test('G2-I04: a prepared rehearsal never overwrites the child draft before or after selection',()=>{
 const s=writing();s.send({type:'STORY',event:{kind:'EDIT',text:'My own ending stays here.'}});const draft=s.getSnapshot().chapter.story.solDraft;
 s.send({type:'REHEARSE',contribution:{text:preparedEndingsFor(s.getSnapshot().chapter).thanks,scene:'thanks',origin:'prepared',revision:draft.revision}});s.send({type:'ACTIVITY_ACCEPT'});
 assert.deepEqual(s.getSnapshot().chapter.story.solDraft,draft);assert.equal(s.getSnapshot().chapter.story.solEnding?.origin,'prepared');
});
test('G2-I05: plan preview cannot invite, advance time, or accept Mara during her working hours',()=>{
 const s=garden();closeAll(s);walk(s,{x:MARA.x,z:MARA.z+.95});s.send({type:'TALK',who:'mara'});completeConversation(s);closeAll(s);walk(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'STORY',event:{kind:'REPORT_MARA'}});s.send({type:'OPEN',panel:'planner'});const before=s.getSnapshot().chapter;
 s.send({type:'PREVIEW_PLAN',time:'usual',reader:'mara'});s.send({type:'ACTIVITY_ACCEPT'});assert.equal(s.getSnapshot().activity?.kind,'plan-preview');assert.deepEqual(s.getSnapshot().chapter,before);
 s.send({type:'ACTIVITY_BACK'});s.send({type:'DRAFT_PLAN',time:'later',reader:'mara'});s.send({type:'OPEN',panel:'pause'});s.send({type:'CLOSE'});assert.deepEqual(s.getSnapshot().viewDrafts.plan,{time:'later',reader:'mara'});
 s.send({type:'PREVIEW_PLAN',time:'later',reader:'mara'});s.send({type:'ACTIVITY_ACCEPT'});
 assert.equal(s.getSnapshot().chapter.story.plan?.time,'later');assert.equal(s.getSnapshot().chapter.story.maraInvitation,null);assert.equal(s.getSnapshot().chapter.story.solInvitation,null);assert.equal(s.getSnapshot().chapter.story.phase,'planning');
});
