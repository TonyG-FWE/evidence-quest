import { createRoot } from 'react-dom/client';
import {Component,type ReactNode} from 'react';
import bootstrap from '../content/bootstrap.json' with {type:'json'};
import './ui/tokens.css';
function retry(){const url=new URL(location.href);url.searchParams.set('eq-retry',crypto.randomUUID());location.replace(url.href);}
function Failure(){return <main style={{padding:32,maxWidth:800,margin:'auto'}}><h1>{bootstrap['CT.TECH.CONTENT_ERROR']}</h1><button type="button" onClick={retry}>{bootstrap['CT.RECOVERY.RETRY']}</button></main>;}
class Boundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<Failure/>:this.props.children;}
}
const root=createRoot(document.getElementById('root')!);
root.render(<p role="status" style={{padding:32}}>{bootstrap['CT.TECH.LOADING']}</p>);
async function loadApp(){
 const token=new URL(location.href).searchParams.get('eq-retry');
 if(!import.meta.env.PROD||!token)return import('./ui/App.js');
 // WebKit can retain a failed module across ordinary reloads. An explicit
 // Retry starts a fresh document and requests only this build's own module
 // under a fresh URL. No game/storage data is rewritten or auto-retried.
 const response=await fetch('/client-entry.json',{cache:'no-store'});if(!response.ok)throw Error('Client entry unavailable');
 const entry:unknown=await response.json();if(!entry||typeof entry!=='object')throw Error('Invalid client entry');
 const {module,styles}=entry as {module:unknown;styles:unknown};
 if(typeof module!=='string'||!/^\/assets\/App-[\w-]+\.js$/.test(module)||!Array.isArray(styles)||!styles.every(s=>typeof s==='string'&&/^\/assets\/[\w-]+\.css$/.test(s)))throw Error('Invalid client entry paths');
 const query='?eq-retry='+encodeURIComponent(token);
 await Promise.all(styles.map(path=>new Promise<void>((resolve,reject)=>{const link=document.createElement('link');link.rel='stylesheet';link.href=path+query;link.onload=()=>resolve();link.onerror=()=>reject(Error('Client styles unavailable'));document.head.append(link);})));
 return import(/* @vite-ignore */ module+query) as Promise<typeof import('./ui/App.js')>;
}
void loadApp().then(({App})=>{const url=new URL(location.href);if(url.searchParams.has('eq-retry')){url.searchParams.delete('eq-retry');history.replaceState(null,'',url);}root.render(<Boundary><App/></Boundary>);}).catch(error=>{console.error('Evidence Quest client module failed',error);root.render(<Failure/>);});
