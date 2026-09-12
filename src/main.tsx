import { createRoot } from 'react-dom/client';
import {Component,type ReactNode} from 'react';
import bootstrap from '../content/bootstrap.json' with {type:'json'};
import './ui/tokens.css';
function Failure(){return <main style={{padding:32,maxWidth:800,margin:'auto'}}><h1>{bootstrap['CT.TECH.CONTENT_ERROR']}</h1><button type="button" onClick={()=>location.reload()}>{bootstrap['CT.RECOVERY.RETRY']}</button></main>;}
class Boundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<Failure/>:this.props.children;}
}
const root=createRoot(document.getElementById('root')!);
root.render(<p role="status" style={{padding:32}}>{bootstrap['CT.TECH.LOADING']}</p>);
void import('./ui/App.js').then(({App})=>root.render(<Boundary><App/></Boundary>)).catch(()=>root.render(<Failure/>));
