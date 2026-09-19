import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {content} from '../src/core/content.js';
import {Store} from '../src/core/store.js';
import {initialState} from '../src/core/state.js';
import type {Command,Envelope} from '../src/core/commands.js';
import {actorHome,workStops,stageLeft,stageRight,doorBounds,mediaKitStop} from '../src/physical/presentation.js';
import {approaches,clearSegment,distance,legal,pathToOwner,roomData} from '../src/physical/navigation.js';
import {actorContentBounds,overlaps} from '../src/world/actor-geometry.js';
import {projectionFrameKey} from '../src/world/paint.js';
import {validCase} from '../src/save/validate.js';

test('ER13.06 changed NPC, console and door approaches remain reachable with unchanged floor obstacles',()=>{
 const c=structuredClone(initialState(randomUUID(),randomUUID()).case);
 for(const host of ['ACT.PLAYER','ST.RACK.BAY','MD.RACK.STATION'] as const){c.physical.caddyHost=host;
  for(const room of content.rooms){c.physical.room=room.id;c.physical.avatar=[...room.initialArrival];
   for(const owner of content.objects.filter(o=>o.room===room.id&&['ACT.JO','ACT.REMY','ACT.ARI','ST.CONSOLE','ST.RAIL','ST.RACK.BAY','ST.CONTROL.SHOW','ST.CONTROL.REHEARSE',...(host==='MD.RACK.STATION'?['MD.ACCESS.E8','KIT.CADDY','KIT.NOTE.E6','KIT.NOTE.E7']:[])].includes(o.id))){
    const path=pathToOwner(c,owner.id);assert(path,owner.id);let from=c.physical.avatar;
    for(const to of path){assert(clearSegment(room,from,to),owner.id);from=to;}
    if(owner.id.startsWith('ACT.'))for(const stop of approaches(c,owner.id))assert(distance(stop,actorHome(owner.id))>=13);
   }
   for(const door of content.doors.filter(d=>d.room===room.id)){assert(pathToOwner(c,door.id),door.id);const b=doorBounds(door.id)!;assert(b[3]-b[1]>=33);assert(legal(room,door.threshold));}
  }
 }
});

test('ER13.07 side workstation playback and legacy running saves validate, while walking away pauses',()=>{
 for(const stop of workStops()){
  const state=structuredClone(initialState(randomUUID(),randomUUID()));state.runtime.hasLiveVisit=true;state.runtime.view={page:'work'};
  const p=state.case.physical;p.avatar=[...stop];p.caddyHost='ST.RACK.BAY';p.objects.dockFlapOpen=true;p.loop={room:'SC.ST',feet:[76,35],mode:'docked'};p.order=['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM'];
  const store=new Store(state);store.send({type:'RUN',mode:'rehearsal'});assert.equal(store.getSnapshot().case.playback?.status,'running');assert(validCase(store.getSnapshot().case));
  store.send({type:'BACKGROUND'});assert(validCase(store.getSnapshot().case));store.send({type:'CONTINUE_RUN'});assert.equal(store.getSnapshot().case.playback?.status,'running');assert(validCase(store.getSnapshot().case));
  store.send({type:'WALK',point:[20,55]});assert.equal(store.getSnapshot().case.playback?.status,'paused');assert(validCase(store.getSnapshot().case));
 }
});

test('ER13.06 actual pose bounds guard projection reuse when any scaled actor enters the screen',()=>{
 const s=structuredClone(initialState(randomUUID(),randomUUID()));s.runtime.hasLiveVisit=true;s.runtime.view={page:'work'};s.runtime.clockMs=2000;
 const p=s.case.physical;p.avatar=[...stageRight()];p.caddyHost='ST.RACK.BAY';p.objects.dockFlapOpen=true;p.loop={room:'SC.ST',feet:[76,35],mode:'docked'};p.order=['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM'];
 const store=new Store(s);store.send({type:'RUN',mode:'rehearsal'});const running=structuredClone(store.getSnapshot());
 assert(projectionFrameKey(running));running.case.physical.avatar=[50,40];assert.equal(projectionFrameKey(running),null);
 const npc=actorContentBounds('ACT.JO',actorHome('ACT.JO'),'home'),player=actorContentBounds('ACT.PLAYER',[24,52],'idle-right');assert(!overlaps(npc,player),'side talk approach has space between bodies');
 const kitReader=actorContentBounds('ACT.PLAYER',mediaKitStop(),'idle-left');assert(!overlaps(kitReader,[96,27,108,39]),'mounted open kit must not be drawn across the reader');
});

test('ER13.07 real carry, follow, handoff and side-control route retains unread note ownership',()=>{
 const pending:Array<{command:Command;owner:Envelope}>=[];
 const store=new Store(initialState(randomUUID(),randomUUID()),(effect,owner)=>{if(effect.kind==='timer')pending.push({command:effect.command,owner});});
 store.send({type:'NEW_GAME',caseId:randomUUID(),visitId:randomUUID()});
 function use(target:string,action?:string){
  store.send({type:'TARGET',target,...(action?{action}:{})});let steps=0;
  while(store.getSnapshot().runtime.intent&&steps++<1500){store.send({type:'TICK',ms:100});const c=store.getSnapshot().case;assert(legal(roomData(c.physical.room),c.physical.avatar));
   if(store.getSnapshot().runtime.intent?.stage==='operating'&&c.physical.loop.mode==='following')assert(distance(c.physical.avatar,c.physical.loop.feet)>=8);
   const callback=pending.shift();if(callback)store.callback(callback.command,callback.owner);
  }assert(steps<1500,target);assert(validCase(store.getSnapshot().case),target);
 }
 for(const id of ['ST.EXIT.CY','ACT.REMY','CY.EXIT.WK','ACT.ARI','WK.EXIT.MD','MD.ACCESS.E8'])use(id);
 assert.deepEqual(store.getSnapshot().case.physical.avatar,mediaKitStop());assert.equal(store.getSnapshot().case.physical.facing,'left');
 use('KIT.CADDY','collect');assert.equal(store.getSnapshot().case.physical.caddyHost,'ACT.PLAYER');use('ACT.LOOP');
 const waking=store.getSnapshot().case.physical;assert(!overlaps(actorContentBounds('ACT.PLAYER',waking.avatar,'carry-left'),actorContentBounds('ACT.LOOP',waking.loop.feet,'responsive')),'wake response remains beside the child');
 store.send({type:'WALK',point:[80,65]});for(let step=0;step<55;step++){const before=store.getSnapshot().case.physical.loop.feet;store.send({type:'TICK',ms:100});const after=store.getSnapshot().case.physical.loop.feet;assert(distance(before,after)<=1.801,'following is continuous path movement');assert(legal(roomData('SC.MD'),after));}
 const following=store.getSnapshot().case.physical;assert(!overlaps(actorContentBounds('ACT.PLAYER',following.avatar,'carry-front'),actorContentBounds('ACT.LOOP',following.loop.feet,'rolling-front')),'down-screen trail clears the larger child');
 for(const id of ['MD.EXIT.WK','WK.EXIT.CY','CY.EXIT.ST','ST.DOCK','ST.RACK.BAY'])use(id);
 assert.deepEqual(store.getSnapshot().case.physical.avatar,stageLeft());assert.equal(store.getSnapshot().case.physical.facing,'right');assert.equal(store.getSnapshot().case.physical.caddyHost,'ST.RACK.BAY');
 assert(!store.getSnapshot().case.exposures.some(e=>e.refId.startsWith('E6.')||e.refId.startsWith('E7.')));
 use('ST.CONTROL.REHEARSE');assert.deepEqual(store.getSnapshot().case.physical.avatar,stageRight());assert.equal(store.getSnapshot().case.physical.facing,'left');
});
