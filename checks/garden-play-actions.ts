import assert from 'node:assert/strict';
import {anchors,riverCenter} from '../src/garden/worldLayout.js';
import type {GardenStore} from '../src/garden/model.js';
import {BIRD_BOY,DOCK_OFFICE} from '../src/garden/mara.js';
import {BAKERY_APPROACH,TILE_APPROACH,bakeryReady,type BakeryStep} from '../src/garden/bakery.js';
import {validChapter,unpack} from '../src/garden/persistence.js';
import {atMooring,LAUNCH,LANDING,ROCK} from '../src/garden/river.js';
import {activeConversation,conversationParts,conversationProgress,conversationReady,needsDockService} from '../src/garden/conversation.js';
/** Exact elapsed ticks remain available for partial actions and pause checks. Otherwise wait for physical work, not a telling. */
export function advance(s:GardenStore,ms?:number){
 if(ms!==undefined){assert.ok(Number.isFinite(ms)&&ms>=0);for(let t=0;t<ms;t+=80)s.send({type:'TICK',ms:Math.min(80,ms-t)});return;}
 const pending=()=>{const state=s.getSnapshot();return !!(state.action||state.route.length||state.boatTarget||state.maraTarget||state.keys.length||state.chapter.river.boat.phase==='waiting'||state.chapter.river.collection?.phase==='return');};
 for(let elapsed=0;elapsed<60000&&pending();elapsed+=80)s.send({type:'TICK',ms:80});
 const state=s.getSnapshot();assert.equal(pending(),false,'Physical work did not become idle within 60000 ms: '+JSON.stringify({action:state.action?.kind,mode:state.mode,panel:state.panel,pip:state.chapter.pip,route:state.route,boatTarget:state.boatTarget,maraTarget:state.maraTarget,notice:state.notice}));
}
/** Retain the authentic envelope and use the same checksum/upgrade path as persistence before BOOT. */
export function migratedCheckpoint(raw:unknown){
 const original=JSON.stringify(raw),loaded=unpack(raw);assert.ok(loaded,'The captured checksummed checkpoint must load through persistence');
 assert.ok(validChapter(loaded.payload));assert.equal(JSON.stringify(raw),original,'Migration cannot rewrite the historical fixture');return loaded.payload;
}
/** Use real steering through the channel; delivery settles only when the boat reaches the landing. */
export function steerSeedToGrandma(s:GardenStore){
 assert.equal(s.getSnapshot().chapter.seed,'boat');assert.equal(s.getSnapshot().chapter.river.boat.phase,'steering');
 const channel=[{x:LAUNCH.x,z:ROCK.z-.8},{x:ROCK.x+1,z:ROCK.z-.8},{x:ROCK.x+1,z:ROCK.z+1.2},{x:riverCenter(4.4)+.2,z:4.4},{x:riverCenter(6.5)-.2,z:6.5},{x:riverCenter(7.4)+1,z:7.4},{x:riverCenter(8.5)+.85,z:8.5}];
 for(const point of channel){s.send({type:'STEER',point});advance(s);assert.deepEqual(s.getSnapshot().chapter.river.boat.position,point);assert.equal(s.getSnapshot().chapter.seed,'boat');}
 s.send({type:'STEER',point:LANDING});advance(s);assert.equal(atMooring(s.getSnapshot().chapter,'east'),true);assert.equal(s.getSnapshot().chapter.seed,'grandma');assert.equal(s.getSnapshot().action,null,'Reaching the landing automatically completes the physical handoff');
}
/** Follow actual untimed dialogue commands; never fabricate exposure or a correct answer. */
export function completeConversation(s:GardenStore){
 if(s.getSnapshot().action)advance(s);
 const id=activeConversation(s.getSnapshot());if(!id)return;
 if(id==='mara'&&needsDockService(s.getSnapshot().chapter)){s.send({type:'STORY',event:{kind:'WATCH_DUTY'}});advance(s);}
 for(let i=0;i<5&&conversationProgress(s.getSnapshot().chapter,id).part<conversationParts[id].length;i++)s.send({type:'CONVERSATION',direction:'next'});
 assert.equal(conversationReady(s.getSnapshot().chapter,id),true,'Conversation completed through its real commands');
}
export function finishSpokenTurn(s:GardenStore){
 for(let i=0;i<30&&s.getSnapshot().chapter.gathering.turn;i++){s.send({type:'STORY',event:{kind:'TURN_NEXT'}});assert.ok(validChapter(s.getSnapshot().chapter),'Invalid speaking-turn boundary');}
 assert.equal(s.getSnapshot().chapter.gathering.turn,null);
}
export function finishArrivals(s:GardenStore){
 for(let i=0;i<6&&s.getSnapshot().chapter.story.phase==='arriving';i++){advance(s);if(s.getSnapshot().chapter.story.phase==='arriving')s.send({type:'STORY',event:{kind:'CONTINUE_ARRIVAL'}});assert.ok(validChapter(s.getSnapshot().chapter),'Invalid arrival boundary');}
 assert.equal(s.getSnapshot().chapter.story.phase,'welcome');
}
export function tellGrandmaStory(s:GardenStore){
 s.send({type:'STORY',event:{kind:'NEXT_STORY'}});finishSpokenTurn(s);assert.equal(s.getSnapshot().chapter.gathering.solDisclosed,true);
 s.send({type:'STORY',event:{kind:'NEXT_STORY'}});advance(s);assert.equal(s.getSnapshot().chapter.gathering.cushions,true);
 s.send({type:'STORY',event:{kind:'NEXT_STORY'}});advance(s);assert.equal(s.getSnapshot().chapter.gathering.pageComplete,true);
 s.send({type:'STORY',event:{kind:'NEXT_STORY'}});finishSpokenTurn(s);assert.equal(s.getSnapshot().chapter.story.phase,'moment');
}
export function finishBakery(s:GardenStore,wrong=false,wrongDough=false){
 if(bakeryReady(s.getSnapshot().chapter))return;
 const close=()=>{for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});};
 const go=(point:{x:number;z:number})=>{close();s.send({type:'GO',point});advance(s);assert.ok(Math.hypot(s.getSnapshot().chapter.pip.x-point.x,s.getSnapshot().chapter.pip.z-point.z)<.02);};
 const step=(step:BakeryStep)=>{s.send({type:'BAKERY_STEP',step});advance(s);assert.ok(validChapter(s.getSnapshot().chapter),'Invalid bakery stage '+s.getSnapshot().chapter.bakery.stage);};
 go(BAKERY_APPROACH);s.send({type:'TALK',who:'rina'});advance(s);completeConversation(s);step('PERMISSION');close();go(TILE_APPROACH);step('PICKUP');go(BAKERY_APPROACH);step('DELIVER');step('REPAIR');step('REMOVE');
 if(wrong){s.send({type:'TILE_PREVIEW',position:'beside'});step('PLACE');assert.equal(s.getSnapshot().chapter.bakery.stage,'misplaced');}
 s.send({type:'TILE_PREVIEW',position:'gap'});step('PLACE');step('CHECK');go(s.getSnapshot().chapter.bakery.rina);step('MIX');if(wrongDough){step('BAKE_UNSHAPED');assert.equal(s.getSnapshot().chapter.bakery.stage,'checked');assert.equal(s.getSnapshot().chapter.bakery.loaf,'none');assert.equal(s.getSnapshot().chapter.bakery.unshapedBatches,1);assert.equal(s.getSnapshot().panel,null);step('MIX');}step('SHAPE');step('BAKE');step('TAKE_LOAF');go({x:anchors.workshop.person.x+.15,z:anchors.workshop.person.z+.90});step('THANK');assert.equal(s.getSnapshot().chapter.bakery.stage,'done');assert.equal(s.getSnapshot().panel,'bakery');close();
}
/** Exercise the real serialized actions; no state injection or completion seam. */
export function shareTornWing(s:GardenStore,wrong=false){
 s.send({type:'STORY',event:{kind:'SHARE_MARA'}});advance(s);
 if(!s.getSnapshot().chapter.mara.scene){if(s.getSnapshot().chapter.gathering.turn)finishSpokenTurn(s);return;}
 assert.equal(s.getSnapshot().mode,'mara-story');
 s.send({type:'MARA_STEP',step:'ASK'});advance(s);
 s.send({type:'MARA_GO',point:DOCK_OFFICE});advance(s);s.send({type:'MARA_STEP',step:'TAPE'});advance(s);
 s.send({type:'MARA_GO',point:BIRD_BOY});advance(s);s.send({type:'MARA_STEP',step:'ALIGN'});
 if(wrong){s.send({type:'TAPE_PREVIEW',position:'beside'});s.send({type:'MARA_STEP',step:'PLACE'});assert.equal(s.getSnapshot().chapter.mara.scene?.stage,'repair');}
 s.send({type:'TAPE_PREVIEW',position:'across'});s.send({type:'MARA_STEP',step:'PLACE'});s.send({type:'MARA_STEP',step:'DEPART'});advance(s);s.send({type:'MARA_STEP',step:'RETURN'});advance(s);
 assert.equal(s.getSnapshot().chapter.mara.scene,null);assert.equal(s.getSnapshot().chapter.mara.participated,true);
 if(s.getSnapshot().chapter.gathering.turn)finishSpokenTurn(s);
}
