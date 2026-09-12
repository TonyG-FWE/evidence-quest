import type {CaseState,Preferences,SaveEnvelope} from '../../contracts/types.js';
import {validatePreferences} from '../../contracts/generated/validators.mjs';
import {IDENTITY} from '../core/state.js';
import {inspectSave,validCase,type Inspected} from './validate.js';

export class SaveError extends Error {constructor(public readonly kind:'unavailable'|'conflict'|'unknown-record'){super(kind);}}
export interface Head {raw:unknown;revision:number;valid:boolean;}
export interface ReadResult {current:Inspected;previous:Inspected;head:Head;preferences:Preferences|null;}
const rawEqual=(a:unknown,b:unknown)=>typeof a==='string'||typeof b==='string'?a===b:JSON.stringify(a)===JSON.stringify(b);
function headOf(raw:unknown):Head {const parsed=inspectSave(raw);return {raw,revision:parsed.envelope?.slotRevision??0,valid:parsed.status==='valid'};}
export class IndexedSave {
 private database:Promise<IDBDatabase>|null=null;
 constructor(private readonly factory:IDBFactory=indexedDB){}
 private open():Promise<IDBDatabase>{
  if(this.database)return this.database;
  this.database=new Promise((resolve,reject)=>{
   const request=this.factory.open('evidence-quest',1);let abandoned=false;
   const fail=()=>{abandoned=true;this.database=null;reject(new SaveError('unavailable'));};
   request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains('caseSlots'))db.createObjectStore('caseSlots');if(!db.objectStoreNames.contains('preferences'))db.createObjectStore('preferences');};
   request.onerror=fail;request.onblocked=fail;
   request.onsuccess=()=>{const db=request.result;if(abandoned){db.close();return;}db.onversionchange=()=>{db.close();this.database=null;};resolve(db);};
  });return this.database;
 }
 private transaction(db:IDBDatabase,stores:string[],mode:IDBTransactionMode):IDBTransaction{
  if(mode==='readwrite'){try{return db.transaction(stores,mode,{durability:'strict'});}catch(error){if(!(error instanceof TypeError))throw error;}}
  return db.transaction(stores,mode);
 }
 async read():Promise<ReadResult>{
  const db=await this.open();return new Promise((resolve,reject)=>{
   const tx=this.transaction(db,['caseSlots','preferences'],'readonly');
   const current=tx.objectStore('caseSlots').get('current'),previous=tx.objectStore('caseSlots').get('previous'),preferences=tx.objectStore('preferences').get('current');
   tx.onabort=()=>reject(new SaveError('unavailable'));
   tx.oncomplete=()=>{let pref:unknown=null;try{pref=JSON.parse(preferences.result as string);}catch{/* A damaged preference never damages a case. */}
    resolve({current:inspectSave(current.result),previous:inspectSave(previous.result),head:headOf(current.result),preferences:validatePreferences(pref)?pref:null});};
  });
 }
 async write(state:CaseState,visitId:string,expected:Head):Promise<Head>{
  if(!validCase(state))throw new SaveError('unavailable');
  const envelope:SaveEnvelope={contractKind:'SaveEnvelope',saveFormatVersion:1,identity:IDENTITY,appBuild:'0.1.0-connected',slotRevision:expected.revision+1,writerVisitId:visitId,writtenAt:new Date().toISOString(),payload:state};
  const raw=JSON.stringify(envelope);if(new TextEncoder().encode(raw).length>2*1024*1024)throw new SaveError('unavailable');
  const db=await this.open();return new Promise((resolve,reject)=>{
   const tx=this.transaction(db,['caseSlots'],'readwrite'),slots=tx.objectStore('caseSlots');let failure:SaveError|null=null;
   const request=slots.get('current');request.onsuccess=()=>{
    const actual=headOf(request.result);
    if(actual.revision!==expected.revision||!rawEqual(actual.raw,expected.raw)){failure=new SaveError('conflict');tx.abort();return;}
    try{if(expected.valid&&typeof expected.raw==='string')slots.put(expected.raw,'previous');slots.put(raw,'current');}
    catch{failure=new SaveError('unavailable');tx.abort();}
   };
   tx.onabort=()=>reject(failure??new SaveError('unavailable'));
   tx.oncomplete=()=>resolve({raw,revision:envelope.slotRevision,valid:true});
  });
 }
 async preferences(value:Preferences):Promise<void>{
  if(!validatePreferences(value))throw new SaveError('unavailable');const db=await this.open();
  return new Promise((resolve,reject)=>{const tx=this.transaction(db,['preferences'],'readwrite');tx.objectStore('preferences').put(JSON.stringify(value),'current');tx.oncomplete=()=>resolve();tx.onabort=()=>reject(new SaveError('unavailable'));});
 }
}
