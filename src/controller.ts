import {Store} from './core/store.js';
import {initialState} from './core/state.js';
import {SaveManager} from './save/manager.js';
import type {Effect,Envelope} from './core/commands.js';
const id=()=>crypto.randomUUID();
let development:{handle:(effect:Effect,envelope:Envelope)=>void}|null=null;
export const store=new Store(initialState(id(),id(),matchMedia('(prefers-reduced-motion: reduce)').matches),(effect,envelope)=>{
 if(effect.kind==='timer')window.setTimeout(()=>store.callback(effect.command,envelope),effect.ms);
 if(effect.kind==='save')saves.enqueue(effect.draft);
 if(effect.kind==='preferences')saves.preferences();
 development?.handle(effect,envelope);
});
if(import.meta.env.DEV&&new URL(location.href).searchParams.has('coach-test'))void import('./coach/development-transport.js').then(module=>{development=module.install(store);});
export const saves=new SaveManager(store);
void saves.boot();
let previousView=store.getSnapshot().runtime.view;
store.subscribe(()=>{const view=store.getSnapshot().runtime.view;if(view.page!==previousView.page){previousView=view;saves.flush();}});
let previous=performance.now();
function frame(now:number){const elapsed=now-previous;previous=now;const s=store.getSnapshot();if(!document.hidden&&(s.runtime.toastElapsed!==null||s.runtime.intent||s.session.heldKeys.length||s.case.playback?.status==='running'||s.case.physical.loop.mode==='following'))store.send({type:'TICK',ms:elapsed});requestAnimationFrame(frame);}
requestAnimationFrame(frame);
document.addEventListener('visibilitychange',()=>{if(document.hidden){store.send({type:'BACKGROUND'});saves.flush();}previous=performance.now();});
window.addEventListener('blur',()=>store.send({type:'BACKGROUND'}));
window.addEventListener('pagehide',()=>{store.send({type:'BACKGROUND'});saves.flush();});
