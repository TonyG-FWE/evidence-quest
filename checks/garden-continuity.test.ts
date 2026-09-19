import {buildBridge} from './garden-bridge-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,MARA,GRANDMA_APPROACH,type Point} from '../src/garden/model.js';
import {conversationProgress,conversationReady} from '../src/garden/conversation.js';
import {checksum,unpack,validChapter} from '../src/garden/persistence.js';
import {BAKERY_APPROACH} from '../src/garden/bakery.js';
import {advance,completeConversation,finishBakery} from './garden-play-actions.js';
let serial=0;
const fresh=()=>{const s=new GardenStore(initialGarden('continuity-'+serial++),()=>String(serial++));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});return s;};
const close=(s:GardenStore)=>{for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});};
const go=(s:GardenStore,point:Point)=>{close(s);s.send({type:'GO',point});advance(s);assert.ok(Math.hypot(s.getSnapshot().chapter.pip.x-point.x,s.getSnapshot().chapter.pip.z-point.z)<.02);};
const dock=(s:GardenStore)=>{go(s,{x:MARA.x,z:MARA.z+.95});s.send({type:'TALK',who:'mara'});};
const next=(s:GardenStore)=>s.send({type:'CONVERSATION',direction:'next'});
function garden(s:GardenStore){
 go(s,CROSSING);buildBridge(s);go(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});
}
test('Continuity: dock duty precedes account, and offers follow the complete untimed conversation',()=>{
 const s=fresh();dock(s);next(s);s.send({type:'TAKE_PAGE'});s.send({type:'STORY',event:{kind:'OFFER_LATER'}});
 assert.equal(s.getSnapshot().chapter.page,'mara');assert.equal(s.getSnapshot().chapter.mara.asking,'none');assert.equal(s.getSnapshot().chapter.maraHeard,false);
 assert.deepEqual(conversationProgress(s.getSnapshot().chapter,'mara'),{part:0,complete:false});
 s.send({type:'STORY',event:{kind:'WATCH_DUTY'}});advance(s);
 for(let part=0;part<3;part++){
  assert.equal(conversationReady(s.getSnapshot().chapter,'mara'),false);s.send({type:'TAKE_PAGE'});assert.equal(s.getSnapshot().chapter.page,'mara');next(s);
 }
 assert.equal(s.getSnapshot().chapter.maraHeard,true);assert.deepEqual(s.getSnapshot().chapter.exposed,[]);
 s.send({type:'STORY',event:{kind:'OFFER_LATER'}});s.send({type:'TAKE_PAGE'});advance(s);
 assert.equal(s.getSnapshot().chapter.page,'pip');assert.equal(s.getSnapshot().chapter.mara.asking,'pending');assert.equal(s.getSnapshot().chapter.story.timeAgreed,null);
});
test('Continuity: Help, close and checksummed reload retain partial dialogue without inventing commitments',()=>{
 const s=fresh();dock(s);s.send({type:'STORY',event:{kind:'WATCH_DUTY'}});advance(s);next(s);
 s.send({type:'OPEN',panel:'help'});next(s);s.send({type:'CLOSE'});assert.equal(conversationProgress(s.getSnapshot().chapter,'mara').part,1);
 const c=s.getSnapshot().chapter,raw={format:1,content:'garden-chapter-3',revision:c.revision,writer:'continuity-test',payload:c,checksum:checksum(JSON.stringify(c))};
 const loaded=unpack(raw);assert.ok(loaded);assert.deepEqual(loaded.payload,c);
 const r=new GardenStore(initialGarden('reload'),()=>String(serial++));r.send({type:'BOOT',chapter:loaded.payload});r.send({type:'TALK',who:'mara'});
 assert.deepEqual(conversationProgress(r.getSnapshot().chapter,'mara'),{part:1,complete:false});assert.equal(r.getSnapshot().chapter.page,'mara');
 completeConversation(r);r.send({type:'CONVERSATION',direction:'previous'});assert.equal(conversationReady(r.getSnapshot().chapter,'mara'),true);
});
test('Continuity: Grandma-first physical play stays open; planning needs an actual account and report, never a page quota',()=>{
 const s=fresh();garden(s);s.send({type:'PLANT'});advance(s);s.send({type:'BLOOM'});advance(s);s.send({type:'TALK',who:'grandma'});
 s.send({type:'OPEN',panel:'planner'});assert.notEqual(s.getSnapshot().panel,'planner');s.send({type:'STORY',event:{kind:'REPORT_MARA'}});s.send({type:'STORY',event:{kind:'ASK_LATER'}});s.send({type:'STORY',event:{kind:'PLAN',time:'later',reader:'mara'}});
 assert.equal(s.getSnapshot().chapter.story.maraReported,false);assert.equal(s.getSnapshot().chapter.story.plan,null);assert.equal(s.getSnapshot().chapter.seed,'soil');
 dock(s);completeConversation(s);go(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'STORY',event:{kind:'REPORT_MARA'}});s.send({type:'STORY',event:{kind:'ASK_LATER'}});s.send({type:'OPEN',panel:'planner'});
 assert.equal(s.getSnapshot().panel,'planner');assert.equal(s.getSnapshot().chapter.story.timeAgreed,'later');assert.equal(s.getSnapshot().chapter.story.metSol,false);assert.equal(s.getSnapshot().chapter.page,'mara');assert.deepEqual(s.getSnapshot().chapter.exposed,[]);
});
test('Continuity: remote rereading never completes a conversation or transfers an absent character’s page',()=>{
 const s=fresh();s.send({type:'OPEN',panel:'mara'});next(s);s.send({type:'TAKE_PAGE'});
 assert.equal(s.getSnapshot().chapter.maraHeard,false);assert.equal(s.getSnapshot().chapter.page,'mara');assert.equal(s.getSnapshot().panel,null);
 dock(s);completeConversation(s);go(s,CROSSING);const before=structuredClone(s.getSnapshot().chapter);s.send({type:'OPEN',panel:'mara'});next(s);s.send({type:'TAKE_PAGE'});assert.deepEqual(s.getSnapshot().chapter,before);
});
test('Continuity: Rina introduces the tile before permission; Sol presents the draft before choosing its ending',()=>{
 const s=fresh();garden(s);go(s,BAKERY_APPROACH);s.send({type:'TALK',who:'rina'});advance(s);s.send({type:'BAKERY_STEP',step:'PERMISSION'});
 assert.equal(s.getSnapshot().chapter.bakery.stage,'arrival');next(s);assert.equal(conversationReady(s.getSnapshot().chapter,'bakery'),false);next(s);s.send({type:'BAKERY_STEP',step:'PERMISSION'});assert.equal(s.getSnapshot().chapter.bakery.stage,'needed');
 finishBakery(s);s.send({type:'TALK',who:'sol'});s.send({type:'STORY',event:{kind:'FINISH_WITH_SOL'}});s.send({type:'STORY',event:{kind:'BRING_DRAFT'}});assert.equal(s.getSnapshot().chapter.story.solChoice,'none');assert.equal(s.getSnapshot().panel,'sol');
 completeConversation(s);s.send({type:'STORY',event:{kind:'FINISH_WITH_SOL'}});assert.equal(s.getSnapshot().panel,'writing');assert.equal(validChapter(s.getSnapshot().chapter),true);
});
test('Continuity: synthetic legacy opened-only and committed saves are distinguished without resetting progress',()=>{
 const c=structuredClone(fresh().getSnapshot().chapter);delete c.conversations;c.maraHeard=true;
 assert.equal(validChapter(c),true);assert.equal(conversationReady(c,'mara'),false);c.page='pip';c.mara.permission=true;assert.equal(conversationReady(c,'mara'),true);
 const original=JSON.stringify(c),raw={format:1,content:'garden-chapter-3',revision:c.revision,writer:'synthetic-old-client',payload:c,checksum:checksum(original)};
 assert.equal(JSON.stringify(unpack(raw)?.payload),original);
 c.conversations={mara:{part:3,complete:false}};assert.equal(validChapter(c),false);
});
