import {buildBridge} from './garden-bridge-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,MARA,GRANDMA_APPROACH,type Point} from '../src/garden/model.js';
import {preparedMaraMessage,type StoryEvent} from '../src/garden/chapter.js';
import {readerStep} from '../src/garden/conversation.js';
import {checksum,unpack,validChapter} from '../src/garden/persistence.js';
import {advance,completeConversation} from './garden-play-actions.js';
let n=0;
const story=(s:GardenStore,event:StoryEvent)=>s.send({type:'STORY',event});
const close=(s:GardenStore)=>{for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});};
const go=(s:GardenStore,point:Point)=>{close(s);s.send({type:'GO',point});advance(s);assert.ok(Math.hypot(s.getSnapshot().chapter.pip.x-point.x,s.getSnapshot().chapter.pip.z-point.z)<.02);};
function fresh(){const s=new GardenStore(initialGarden('message-'+n++),()=>String(n++));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});go(s,{x:MARA.x,z:MARA.z+.95});s.send({type:'TALK',who:'mara'});completeConversation(s);story(s,{kind:'OFFER_LATER'});return s;}
function reachGrandma(s:GardenStore){go(s,CROSSING);buildBridge(s);go(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'OPEN',panel:'report'});}
function reload(s:GardenStore){const c=s.getSnapshot().chapter,envelope={format:1,content:'garden-chapter-3',revision:c.revision,writer:'message-check',payload:c,checksum:checksum(JSON.stringify(c))},loaded=unpack(envelope);assert.ok(loaded);assert.deepEqual(loaded.payload,c);const r=new GardenStore(initialGarden('reload'),()=>String(n++));r.send({type:'BOOT',chapter:loaded.payload});return r;}

test('Prepared relay is not a report, invitation, page handoff or time agreement; only actual delivery informs Grandma',()=>{
 const s=fresh();story(s,{kind:'PREPARE_MARA_MESSAGE',mode:'prepared'});story(s,{kind:'REPORT_MARA'});
 let c=s.getSnapshot().chapter;assert.equal(c.story.maraReported,false);assert.equal(c.story.timeAgreed,null);assert.equal(c.story.plan,null);assert.equal(c.story.maraInvitation,null);assert.equal(c.page,'mara');assert.equal(c.story.maraMessage?.text,preparedMaraMessage);assert.equal(c.story.maraMessage?.delivered,null);assert.equal(validChapter(c),true);
 reachGrandma(s);story(s,{kind:'REPORT_MARA'});c=s.getSnapshot().chapter;assert.equal(c.story.maraReported,true);assert.deepEqual(c.story.maraMessage?.delivered,{mode:'prepared',text:preparedMaraMessage});assert.equal(c.story.timeAgreed,null);assert.equal(c.grandmaHeard,false);story(s,{kind:'ASK_LATER'});assert.equal(s.getSnapshot().chapter.story.timeAgreed,'later');reload(s);
});
test('Own wording survives support/reload, needs intentional confirmation, and delivered words cannot be rewritten by drafts',()=>{
 let s=fresh();story(s,{kind:'PREPARE_MARA_MESSAGE',mode:'own'});const key=readerStep(s.getSnapshot()),words='Mara is helping passengers. Can we meet after the last boat?';story(s,{kind:'EDIT_MARA_MESSAGE',text:words});assert.equal(readerStep(s.getSnapshot()),key);
 s.send({type:'OPEN',panel:'help'});s.send({type:'CLOSE'});s=reload(s);assert.equal(s.getSnapshot().chapter.story.maraMessage?.text,words);reachGrandma(s);story(s,{kind:'REPORT_MARA'});assert.equal(s.getSnapshot().chapter.story.maraReported,false);
 story(s,{kind:'CONFIRM_MARA_MESSAGE'});story(s,{kind:'REPORT_MARA'});story(s,{kind:'ANSWER',activity:'mara-message',text:'A changed working draft'});story(s,{kind:'EDIT_MARA_MESSAGE',text:'Overwrite'});story(s,{kind:'PREPARE_MARA_MESSAGE',mode:'prepared'});story(s,{kind:'REPORT_MARA'});
 assert.deepEqual(s.getSnapshot().chapter.story.maraMessage?.delivered,{mode:'own',text:words});assert.equal(s.getSnapshot().chapter.story.answers['mara-message'],'A changed working draft');assert.equal(validChapter(s.getSnapshot().chapter),true);reload(s);
});
test('Blank or unconfirmed own message retains a prepared route; the game does not claim semantic validation',()=>{
 const s=fresh();story(s,{kind:'PREPARE_MARA_MESSAGE',mode:'own'});story(s,{kind:'EDIT_MARA_MESSAGE',text:'   '});story(s,{kind:'CONFIRM_MARA_MESSAGE'});assert.equal(s.getSnapshot().chapter.story.maraMessage?.confirmed,false);
 story(s,{kind:'EDIT_MARA_MESSAGE',text:'Mara is a purple spaceship.'});story(s,{kind:'CONFIRM_MARA_MESSAGE'});reachGrandma(s);story(s,{kind:'REPORT_MARA'});assert.equal(s.getSnapshot().chapter.story.maraMessage?.delivered?.text,'Mara is a purple spaceship.');assert.equal(s.getSnapshot().chapter.story.timeAgreed,null);assert.equal(validChapter(s.getSnapshot().chapter),true);
 const c=structuredClone(s.getSnapshot().chapter);c.story.maraMessage!.delivered!.mode='prepared';assert.equal(validChapter(c),false);
});
test('Old completed reports remain valid without inventing delivered child words from old feedback answers',()=>{
 const s=fresh();reachGrandma(s);story(s,{kind:'REPORT_MARA'});const c=structuredClone(s.getSnapshot().chapter);delete c.story.maraMessage;c.story.answers['grandma-assumption']='Old optional answer';assert.equal(validChapter(c),true);
 const loaded=unpack({format:1,content:'garden-chapter-3',revision:c.revision,writer:'synthetic-prior-format',payload:c,checksum:checksum(JSON.stringify(c))});assert.ok(loaded);assert.equal(loaded.payload.story.maraMessage,undefined);assert.equal(loaded.payload.story.maraReported,true);
});
