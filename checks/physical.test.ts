import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {Store} from '../src/core/store.js';
import {initialState} from '../src/core/state.js';
import type {Command,Envelope} from '../src/core/commands.js';
import {legal,roomData,distance} from '../src/physical/navigation.js';
import {validCase} from '../src/save/validate.js';
test('TASK11.06 follower follows legal paths, yields at approaches, shares doors once, and remote owners cannot act',()=>{
 const pending:Array<{command:Command;owner:Envelope}>=[];
 const store=new Store(initialState(randomUUID(),randomUUID()),(effect,owner)=>{if(effect.kind==='timer')pending.push({command:effect.command,owner});});
 store.send({type:'NEW_GAME',caseId:randomUUID(),visitId:randomUUID()});
 function use(target:string){
  store.send({type:'TARGET',target});let steps=0;
  while(store.getSnapshot().runtime.intent&&steps++<1500){
   store.send({type:'TICK',ms:100});const c=store.getSnapshot().case;
   assert(legal(roomData(c.physical.room),c.physical.avatar));
   if(c.physical.loop.mode==='following')assert(legal(roomData(c.physical.loop.room),c.physical.loop.feet));
   if(store.getSnapshot().runtime.intent?.stage==='operating'&&c.physical.loop.mode==='following')assert(distance(c.physical.avatar,c.physical.loop.feet)>=5);
   const callback=pending.shift();if(callback)store.callback(callback.command,callback.owner);
  }
  assert(steps<1500,'physical action terminates');assert(validCase(store.getSnapshot().case),target);
 }
 use('ACT.ARI');assert.equal(store.getSnapshot().runtime.caption[0],'CT.WORLD.UNREACHABLE');assert.equal(store.getSnapshot().case.grants.length,0);
 for(const id of ['ST.EXIT.WK','WK.EXIT.MD','ACT.LOOP','MD.EXIT.WK','WK.EXIT.CY','CY.SOURCE.E7','CY.EXIT.ST','ST.DOCK'])use(id);
 assert.deepEqual(store.getSnapshot().case.physical.loop,{room:'SC.ST',feet:[76,35],mode:'docked'});
 use('ST.EXIT.WK');assert.equal(store.getSnapshot().case.physical.loop.room,'SC.ST');
});
