import * as T from 'three';
import {WORLD} from './worldLayout.js';

type Pose={target:T.Vector3;offset:T.Vector3;half:number};
type Motion='left'|'right'|'up'|'down'|'turnLeft'|'turnRight'|'tiltUp'|'tiltDown'|'closer'|'farther';
const directions:readonly [Motion,string,string][]=[
 ['left','Pan left','←'],['up','Pan forward','↑'],['right','Pan right','→'],['tiltUp','Tilt up','⤴'],['tiltDown','Tilt down','⤵'],
 ['turnLeft','Rotate left','↶'],['down','Pan backward','↓'],['turnRight','Rotate right','↷'],
 ['closer','Look closer','＋'],['farther','Look farther','−'],
];
/** A view-only camera. Inspection never moves an actor or changes saved play. */
export class CameraInspection {
 readonly element=document.createElement('div');
 private panel=document.createElement('div');
 private toggle=document.createElement('button');
 private mode=document.createElement('span');
 private active=false;
 private held:Motion|null=null;
 private pose:Pose={target:new T.Vector3(),offset:new T.Vector3(7.5,13,19),half:4.2};
 private target=new T.Vector3();
 private orbit=new T.Spherical();
 private half=4.2;
 private buttons:HTMLButtonElement[]=[];
 private pointerClick=false;
 constructor(host:HTMLElement){
  this.element.className='garden-camera-controls';this.element.setAttribute('aria-label','Camera controls');
  this.toggle.type='button';this.toggle.className='garden-camera-toggle';this.toggle.textContent='⌖';
  this.toggle.setAttribute('aria-label','Map and camera');this.toggle.title='Map and camera';this.toggle.setAttribute('aria-expanded','false');
  this.panel.className='garden-camera-panel';this.panel.hidden=true;this.panel.setAttribute('role','group');this.panel.setAttribute('aria-label','Look around the village');
  this.mode.className='garden-camera-mode';this.mode.textContent='Following Pip';this.panel.append(this.mode);
  this.toggle.onclick=()=>{this.panel.hidden=!this.panel.hidden;this.toggle.setAttribute('aria-expanded',String(!this.panel.hidden));};
  const grid=document.createElement('div');grid.className='garden-camera-grid';this.panel.append(grid);
  for(const [motion,name,symbol] of directions){
   const button=this.button(name,symbol,grid);button.title=name;
   button.onpointerdown=e=>{if(e.button!==0)return;this.pointerClick=true;this.begin();this.move(motion,.06);this.held=motion;button.setPointerCapture(e.pointerId);};
   const release=(e:PointerEvent)=>{this.held=null;if(button.hasPointerCapture(e.pointerId))button.releasePointerCapture(e.pointerId);};
   button.onpointerup=release;button.onpointercancel=release;button.onlostpointercapture=()=>{this.held=null;};
   button.onclick=()=>{if(this.pointerClick){this.pointerClick=false;return;}this.begin();this.move(motion,.18);};
   button.onblur=()=>{this.held=null;this.pointerClick=false;};
  }
  this.button('Fit map','Fit map',this.panel).onclick=()=>{this.begin();this.target.set(4,.5,0);this.orbit.setFromVector3(new T.Vector3(0,32,18));this.half=23;};
  this.button('Follow Pip','Follow Pip',this.panel).onclick=()=>this.follow();
  const hint=document.createElement('small');hint.textContent='World click or movement keys return to Pip.';this.panel.append(hint);
  this.element.append(this.toggle,this.panel);host.append(this.element);
  // Camera keyboard controls stay in their own native-control group.
  this.element.addEventListener('keydown',e=>{
   if(e.key==='Escape'){e.preventDefault();e.stopPropagation();this.panel.hidden=true;this.toggle.setAttribute('aria-expanded','false');this.toggle.focus();return;}
   const motion=({ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'} as Record<string,Motion>)[e.key];
   if(motion){e.preventDefault();e.stopPropagation();this.begin();this.move(motion,.18);}
  });
 }
 private button(label:string,text:string,parent:HTMLElement){const b=document.createElement('button');b.type='button';b.textContent=text;b.setAttribute('aria-label',label);parent.append(b);this.buttons.push(b);return b;}
 private begin(){if(this.active)return;this.active=true;this.target.copy(this.pose.target);this.orbit.setFromVector3(this.pose.offset);this.half=this.pose.half;this.mode.textContent='Looking around';}
 private move(motion:Motion,dt:number){
  const pan=Math.max(2,this.half*.85)*dt,turn=1.1*dt,theta=this.orbit.theta;
  if(motion==='left'||motion==='right'){const sign=motion==='left'?-1:1;this.target.x+=Math.cos(theta)*pan*sign;this.target.z-=Math.sin(theta)*pan*sign;}
  if(motion==='up'||motion==='down'){const sign=motion==='up'?-1:1;this.target.x+=Math.sin(theta)*pan*sign;this.target.z+=Math.cos(theta)*pan*sign;}
  if(motion==='turnLeft'||motion==='turnRight')this.orbit.theta+=(motion==='turnLeft'?-1:1)*turn;
  if(motion==='tiltUp'||motion==='tiltDown')this.orbit.phi=T.MathUtils.clamp(this.orbit.phi+(motion==='tiltUp'?-1:1)*turn,.16,1.32);
  if(motion==='closer'||motion==='farther')this.half=T.MathUtils.clamp(this.half*Math.exp((motion==='closer'?-1:1)*dt),1.7,23);
  this.target.x=T.MathUtils.clamp(this.target.x,WORLD.bounds.minX+2,WORLD.bounds.maxX-2);this.target.z=T.MathUtils.clamp(this.target.z,WORLD.bounds.minZ+2,WORLD.bounds.maxZ-2);
 }
 get inspecting(){return this.active;}
 get overview(){return this.active&&this.half>15;}
 follow(){this.active=false;this.held=null;this.mode.textContent='Following Pip';}
 resolve(follow:Pose,dt:number):Pose{
  if(this.held)this.move(this.held,Math.min(.05,dt));
  return this.active?{target:this.target,offset:new T.Vector3().setFromSpherical(this.orbit),half:this.half}:follow;
 }
 observe(pose:Pose){this.pose.target.copy(pose.target);this.pose.offset.copy(pose.offset);this.pose.half=pose.half;}
 available(visible:boolean,enabled:boolean){this.element.hidden=!visible;for(const b of this.buttons)b.disabled=!enabled;if(!enabled)this.held=null;}
 dispose(){this.element.remove();}
}
