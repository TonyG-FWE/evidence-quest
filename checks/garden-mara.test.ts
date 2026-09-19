import {buildBridge} from './garden-bridge-actions.js';
import {completeConversation} from './garden-play-actions.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,MARA,GRANDMA_APPROACH,type Point} from '../src/garden/model.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
import {BIRD_BOY,DOCK_OFFICE} from '../src/garden/mara.js';
import {advance,shareTornWing} from './garden-play-actions.js';
let serial=0;
const fresh=()=>{const s=new GardenStore(initialGarden('mara-'+serial++),()=>String(serial++));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});return s;};
const close=(s:GardenStore)=>{for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});};
const walk=(s:GardenStore,point:Point)=>{close(s);s.send({type:'GO',point});advance(s);assert.ok(Math.hypot(s.getSnapshot().chapter.pip.x-point.x,s.getSnapshot().chapter.pip.z-point.z)<.02);};
const event=(s:GardenStore,kind:'OFFER_LATER'|'BRIDGE_OFFER'|'WATCH_DUTY'|'REPORT_MARA'|'ASK_LATER'|'SHARE_MARA')=>s.send({type:'STORY',event:{kind}});
function dock(s:GardenStore){walk(s,{x:MARA.x,z:MARA.z+.95});s.send({type:'TALK',who:'mara'});completeConversation(s);}
function garden(s:GardenStore){walk(s,CROSSING);buildBridge(s);walk(s,GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});event(s,'REPORT_MARA');}
function early(){const s=fresh();dock(s);s.send({type:'TAKE_PAGE'});advance(s);garden(s);s.send({type:'REPORT'});advance(s);s.send({type:'OPEN',panel:'story'});return s;}
function reload(s:GardenStore){const c=s.getSnapshot().chapter,raw={format:1,content:'garden-chapter-3',revision:c.revision,writer:'test-envelope',payload:c,checksum:checksum(JSON.stringify(c))};const updated=unpack(raw);assert.ok(updated);const next=new GardenStore(initialGarden('reloaded'),()=>String(serial++));next.send({type:'BOOT',chapter:updated.payload});return next;}
const currentFacts=(s:GardenStore)=>{const c=s.getSnapshot().chapter;return JSON.stringify({pip:c.pip,seed:c.seed,page:c.page,sections:c.sections,west:c.west,east:c.east,boat:c.river.boat,plan:c.story.plan,time:c.story.timeAgreed,sol:c.story.solInvitation,mara:c.story.maraInvitation,service:c.mara.service});};

test('G4: dock duty, either offer order, actual request and prior spontaneous agreement stay distinct',()=>{
 for(const askFirst of [true,false]){const s=fresh();dock(s);if(askFirst)event(s,'OFFER_LATER');s.send({type:'TAKE_PAGE'});advance(s);if(!askFirst)event(s,'OFFER_LATER');assert.equal(s.getSnapshot().chapter.mara.asking,'pending');assert.equal(s.getSnapshot().chapter.story.timeAgreed,null);assert.equal(s.getSnapshot().chapter.page,'pip');
  s.send({type:'STORY',event:{kind:'OFFER_RETURN_STORY'}});assert.equal(s.getSnapshot().chapter.mara.returnOffered,true);assert.equal(s.getSnapshot().chapter.story.grandmaCopy,'none');event(s,'WATCH_DUTY');advance(s);assert.equal(s.getSnapshot().chapter.mara.service,'served');assert.equal(s.getSnapshot().chapter.story.phase,'planning');assert.equal(s.getSnapshot().chapter.story.maraInvitation,null);event(s,'BRIDGE_OFFER');assert.match(s.getSnapshot().notice,/still have to help/);
  garden(s);event(s,'ASK_LATER');assert.equal(s.getSnapshot().chapter.mara.asking,'fulfilled');assert.equal(s.getSnapshot().chapter.story.plan,null);dock(s);event(s,'OFFER_LATER');assert.equal(s.getSnapshot().chapter.mara.asking,'fulfilled');assert.equal(validChapter(s.getSnapshot().chapter),true);
 }
 const s=fresh();dock(s);garden(s);event(s,'ASK_LATER');assert.equal(s.getSnapshot().chapter.mara.asking,'none');dock(s);event(s,'OFFER_LATER');assert.equal(s.getSnapshot().chapter.mara.asking,'fulfilled');assert.equal(s.getSnapshot().chapter.page,'mara');
});
test('G4: source alone never shares; actual repair and return preserve current-day facts, both pictures and repeat telling',()=>{
 for(const wrong of [false,true]){const s=early(),before=currentFacts(s);close(s);assert.equal(s.getSnapshot().chapter.story.records.mara,null);s.send({type:'OPEN',panel:'story'});shareTornWing(s,wrong);assert.equal(currentFacts(s),before);assert.equal(s.getSnapshot().chapter.mara.sharedAt,'early');assert.equal(s.getSnapshot().chapter.story.records.mara,'repair');s.send({type:'STORY',event:{kind:'MARA_PICTURE',picture:'promise'}});assert.equal(s.getSnapshot().chapter.story.records.mara,'promise');shareTornWing(s);assert.equal(s.getSnapshot().chapter.mara.scene,null);assert.equal(currentFacts(s),before);assert.equal(validChapter(s.getSnapshot().chapter),true);}
});
test('G4: consent, actual tape pickup and durable strip survive reload; previews and travel cancel on support',()=>{
 let s=early();event(s,'SHARE_MARA');advance(s);s.send({type:'MARA_STEP',step:'TAPE'});assert.equal(s.getSnapshot().chapter.mara.scene?.tape,'office');
 s.send({type:'OPEN',panel:'birdTalk'});s.send({type:'MARA_STEP',step:'ASK'});s.send({type:'INTERRUPT'});assert.equal(s.getSnapshot().chapter.mara.scene?.stage,'fetch');close(s);s=reload(s);
 s.send({type:'MARA_GO',point:DOCK_OFFICE});advance(s,320);const p=s.getSnapshot().chapter.mara.scene!.position;s.send({type:'OPEN',panel:'help'});advance(s,12000);assert.deepEqual(s.getSnapshot().chapter.mara.scene?.position,p);close(s);s.send({type:'MARA_GO',point:DOCK_OFFICE});advance(s);s.send({type:'MARA_STEP',step:'TAPE'});s.send({type:'INTERRUPT'});close(s);s=reload(s);assert.equal(s.getSnapshot().chapter.mara.scene?.tape,'mara');
 s.send({type:'MARA_GO',point:BIRD_BOY});advance(s);s.send({type:'MARA_STEP',step:'ALIGN'});s.send({type:'TAPE_PREVIEW',position:'beside'});s.send({type:'MARA_STEP',step:'PLACE'});s.send({type:'TAPE_PREVIEW',position:'across'});s.send({type:'OPEN',panel:'backpack'});assert.equal(s.getSnapshot().chapter.mara.scene?.preview,null);assert.equal(s.getSnapshot().chapter.mara.scene?.strip,'beside');close(s);s=reload(s);s.send({type:'VIEW_LOST',lost:true});s.send({type:'TAPE_PREVIEW',position:'across'});assert.equal(s.getSnapshot().chapter.mara.scene?.preview,null);s.send({type:'VIEW_LOST',lost:false});s.send({type:'TAPE_PREVIEW',position:'across'});s.send({type:'CANCEL'});assert.equal(s.getSnapshot().chapter.mara.scene?.preview,null);
 s.send({type:'TAPE_PREVIEW',position:'across'});s=reload(s);assert.equal(s.getSnapshot().chapter.mara.scene?.preview,null);assert.equal(s.getSnapshot().chapter.mara.scene?.strip,'beside');assert.equal(s.getSnapshot().chapter.story.records.mara,null);assert.equal(validChapter(s.getSnapshot().chapter),true);
 const impossible=structuredClone(s.getSnapshot().chapter);impossible.mara.scene!.tape='office';assert.equal(validChapter(impossible),false);
});
test('G4: authored reach and withdrawal precede control, survive interruption and cannot advance pending garden growth',()=>{
 let s=early();event(s,'SHARE_MARA');advance(s,2000);assert.equal(s.getSnapshot().action?.kind,'birdIntro');assert.equal(s.getSnapshot().chapter.mara.scene?.introduced,false);s.send({type:'MARA_STEP',step:'ASK'});assert.equal(s.getSnapshot().chapter.mara.scene?.stage,'ask');s=reload(s);assert.equal(s.getSnapshot().action?.kind,'birdIntro');s.send({type:'INTERRUPT'});assert.equal(s.getSnapshot().chapter.mara.scene?.introduced,true);assert.equal(s.getSnapshot().chapter.mara.participated,false);
 s=early();s.send({type:'SETTING',key:'reducedMotion',value:true});event(s,'SHARE_MARA');assert.equal(s.getSnapshot().chapter.mara.scene?.introduced,true);assert.match(s.getSnapshot().notice,/boy pulled it closer/);assert.equal(s.getSnapshot().action,null);
 s=early();s.send({type:'PLANT'});s.send({type:'INTERRUPT'});close(s);assert.equal(s.getSnapshot().pendingBloom,true);s.send({type:'OPEN',panel:'story'});shareTornWing(s);assert.equal(s.getSnapshot().chapter.seed,'soil');assert.equal(s.getSnapshot().chapter.bloomed,false);assert.equal(s.getSnapshot().pendingBloom,true);
});
