import type { Command, Effect, Envelope } from './commands.js';
import type { State } from './state.js';
import { reduce } from './reducer.js';
import {SerializedQueue} from './serialized.js';

export class Store {
 private state:State;private listeners=new Set<()=>void>();private queue:SerializedQueue<Envelope>;
 constructor(initial:State,private readonly effects:(effect:Effect,envelope:Envelope)=>void=()=>{},private readonly allocate:()=>string=()=>crypto.randomUUID()){this.state=initial;this.queue=new SerializedQueue(e=>{const result=reduce(this.state,e);if(result.state===this.state)return;this.state=result.state;for(const fn of this.listeners)fn();for(const effect of result.effects)this.effects(effect,e);});}
 getSnapshot=():State=>this.state;
 subscribe=(fn:()=>void)=>{this.listeners.add(fn);return ()=>{this.listeners.delete(fn);};};
 send=(command:Command)=>{const s=this.state;this.callback(command,{caseId:s.case.caseRunId,visitId:s.session.visitId});};
 callback=(command:Command,owner:Pick<Envelope,'caseId'|'visitId'>)=>{this.dispatch({id:this.allocate(),ids:Array.from({length:32},this.allocate),caseId:owner.caseId,visitId:owner.visitId,command});};
 dispatch=(envelope:Envelope)=>{
  this.queue.push(envelope);
 };
}
