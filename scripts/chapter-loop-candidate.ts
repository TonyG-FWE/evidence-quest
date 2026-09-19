import * as T from 'three';
import type {PaperArt} from '../src/garden/art.js';

/** Local review geometry from the preserved Loop illustration. No production
 * manifest imports this module; authoring and approval remain separate. */
export function makeLoopCandidate(art:PaperArt){
 const root=new T.Group();root.name='Loop-local-review';root.scale.setScalar(.42/.484);
 const materials=new Map<string,T.MeshStandardMaterial>();
 function material(color:string,roughness=.55,metalness=0){const key=[color,roughness,metalness].join();let value=materials.get(key);if(!value){value=new T.MeshStandardMaterial({color,roughness,metalness});materials.set(key,value);art.resources.add(value);}return value;}
 function mesh(geometry:T.BufferGeometry,color:string,parent:T.Object3D=root,roughness=.55,metalness=0){art.resources.add(geometry);const result=new T.Mesh(geometry,material(color,roughness,metalness));result.castShadow=true;result.receiveShadow=true;parent.add(result);return result;}
 function shell(rings:Array<[number,number,number]>,color:string){
  const positions:number[]=[],indices:number[]=[],sides=48;
  for(const [y,w,d]of rings)for(let side=0;side<=sides;side++){const angle=side/sides*Math.PI*2,c=Math.cos(angle),s=Math.sin(angle);positions.push(Math.sign(c)*Math.pow(Math.abs(c),.54)*w,y,Math.sign(s)*Math.pow(Math.abs(s),.54)*d);}
  for(let ring=0;ring<rings.length-1;ring++)for(let side=0;side<sides;side++){const a=ring*(sides+1)+side,b=a+sides+1;indices.push(a,b,a+1,a+1,b,b+1);}
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return mesh(geometry,color);
 }
 shell([[.085,0,0],[.085,.11,.062],[.092,.146,.083],[.12,.155,.089],[.176,.155,.089],[.184,.15,.086]],'#1b9a9d');
 shell([[.181,.15,.086],[.21,.154,.089],[.28,.149,.085],[.327,.132,.073],[.352,.089,.048],[.363,0,0]],'#f5e7c9');
 const seam=mesh(new T.TorusGeometry(.152,.0015,5,48),'#368d89');seam.rotation.x=Math.PI/2;seam.position.y=.183;seam.scale.y=.568;
 const ring=mesh(new T.TorusGeometry(.085,.012,10,48),'#384c51',root,.36,.28);ring.position.set(0,.262,.088);
 const gasket=mesh(new T.TorusGeometry(.072,.004,8,48),'#0b273b');gasket.position.set(0,.262,.097);
 const lens=mesh(new T.SphereGeometry(.071,32,16),'#123655',root,.22,.08);lens.position.set(0,.262,.095);lens.scale.z=.30;
 const iris=mesh(new T.CircleGeometry(.043,32),'#08243a',root,.32);iris.position.set(0,.259,.117);
 const gleam=mesh(new T.SphereGeometry(.011,16,8),'#c5e9ec',root,.18);gleam.position.set(.025,.287,.116);gleam.scale.z=.12;
 const handle=new T.Group();handle.name='Loop-carry-handle';root.add(handle);const curve=new T.CatmullRomCurve3(Array.from({length:25},(_,i)=>{const a=Math.PI-i/24*Math.PI;return new T.Vector3(Math.cos(a)*.103,.341+Math.sin(a)*.130,-.006);}));mesh(new T.TubeGeometry(curve,32,.013,10,false),'#279b9c',handle,.38);
 const button=mesh(new T.CylinderGeometry(.023,.025,.013,20),'#ea785e');button.rotation.z=Math.PI/2;button.position.set(-.155,.241,.010);button.name='Loop-coral-button';
 const wheels:T.Group[]=[];
 for(const sign of[-1,1]){
  const wheel=new T.Group();wheel.position.set(sign*.112,.051,.002);wheel.name=sign<0?'Loop-wheel-left':'Loop-wheel-right';root.add(wheel);
  const tire=mesh(new T.CylinderGeometry(.051,.051,.039,24),'#26343a',wheel,.72);tire.rotation.z=Math.PI/2;
  const hub=mesh(new T.CylinderGeometry(.030,.030,.042,20),'#248f94',wheel,.42);hub.rotation.z=Math.PI/2;
  const axle=mesh(new T.CylinderGeometry(.012,.012,.044,16),'#235b63',wheel,.43);axle.rotation.z=Math.PI/2;
  for(let i=0;i<4;i++){const mark=mesh(new T.BoxGeometry(.001,.009,.002),'#6fc2bf',wheel,.48);mark.position.set(sign*.023,Math.cos(i*Math.PI/2)*.023,Math.sin(i*Math.PI/2)*.023);mark.rotation.x=i*Math.PI/2;}
  wheels.push(wheel);
 }
 const panel=mesh(new T.BoxGeometry(.123,.088,.003),'#e6d9bd');panel.position.set(0,.240,-.088);
 for(let i=0;i<5;i++){const vent=mesh(new T.BoxGeometry(.047,.003,.004),'#948f7d');vent.position.set(0,.237+i*.009,-.091);}
 for(const sign of[-1,1]){const screw=mesh(new T.SphereGeometry(.003,8,6),'#8a968e',root,.4,.35);screw.position.set(sign*.053,.269,-.091);screw.scale.z=.4;}
 const dock=new T.Group();dock.name='Loop-dock-contact';dock.position.set(0,.104,-.087);root.add(dock);for(const x of[-.025,.025]){const contact=mesh(new T.BoxGeometry(.014,.019,.003),'#c1a366',dock,.45,.4);contact.position.x=x;}
 const beamGeometry=new T.ConeGeometry(.18,.75,24,1,true),beamMaterial=new T.MeshBasicMaterial({color:'#ffe7a2',transparent:true,opacity:.08,depthWrite:false,side:T.DoubleSide});art.resources.add(beamGeometry);art.resources.add(beamMaterial);const beam=new T.Mesh(beamGeometry,beamMaterial);beam.position.set(0,.262,.49);beam.rotation.x=-Math.PI/2;beam.visible=false;root.add(beam);
 return {root,handle,wheels,dock,update(time:number,moving:boolean,projecting:boolean){for(const wheel of wheels)wheel.rotation.x=moving?time*5:0;beam.visible=projecting;},description:'Loop: locally modeled cream shell, teal lower housing and carry loop, navy lens, coral button, independent wheels and rear docking contacts follow the preserved illustration. Motion shows wheel rolling; Carrying shows the projector beam. This review candidate has no production export or Form approval.'};
}
