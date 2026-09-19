import * as T from 'three';
import {PaperArt} from '../src/garden/art.js';

export type CastStudyId='mara'|'rina'|'sol'|'boy'|'operator'|'jo';
export const castStudyNotes:Record<CastStudyId,string>={
 mara:'Mara: practical navy coat, striped shirt and dock cap; open hands for asking permission and helping with the bird. This is a local reference maquette, not finished or approved production art.',
 rina:'Rina: fuller baker silhouette, rolled sleeves, tied apron and soft work cap; two free hands for flour, dough and bread. This is a local reference maquette, not finished or approved production art.',
 sol:'Sol: broad work shirt, canvas apron, pencil pocket and separate boots; clear wrists for a roof tile, tools and written pages. This is a local reference maquette, not finished or approved production art.',
 boy:'The boy from Mara’s earlier recollection: shorter proportions, soft green overshirt and two hands around his sister’s original paper bird. This is a local reference maquette, not finished or approved production art.',
 operator:'Passenger operator: distinct blue cap and waistcoat, readable at dock scale. This is a reusable supporting-cast reference maquette, not finished or approved production art.',
 jo:'Jo: fair peach skin, brown eyes, two dark curly buns, coral shirt, teal overalls and cream shoes follow the preserved canonical illustration. This articulated local candidate is a form study; it is not a finished skinned humanoid or approved production art.',
};

/** Isolated locally authored form studies. No import from production code and
 * no use as a substitute for approved, skinned character assets. */
export function makeCastStudy(art:PaperArt,id:CastStudyId){
 const root=new T.Group(),body=new T.Group();root.add(body);root.name=id+'-reference-study';
 const small=id==='boy',height={mara:1.20,rina:1.15,sol:1.25,boy:.82,operator:1.20,jo:1.20}[id]/1.38,skin=id==='mara'?'#b57e59':'#efbd91',hair=id==='mara'?'#493529':id==='jo'?'#4f3122':'#70492f';
 const coat={mara:'#304f61',rina:'#9c6680',sol:'#9b754e',boy:'#729d7c',operator:'#557ca0',jo:'#ec896d'}[id],width=id==='rina'?.21:id==='sol'?.22:.18;
 root.scale.setScalar(height);root.position.y=.013*height;
 const mesh=(geo:T.BufferGeometry,color:string,parent:T.Object3D=body)=>art.mesh(geo,color,parent);
 const lathe=(points:Array<[number,number]>,color:string,parent:T.Object3D=body)=>mesh(new T.LatheGeometry(points.map(p=>new T.Vector2(...p)),24),color,parent);
 const torso=lathe([[.14,0],[width,.08],[width*.97,.26],[width*.92,.40],[.12,.46]],coat);torso.position.y=.53;torso.scale.z=.68;
 const neck=art.cylinder(body,0,1.00,0,.065,.075,.14,skin,16);
 const head=new T.Group();head.position.set(0,1.145,.005);body.add(head);
 art.ball(head,0,0,0,.175,skin,[1,1.15,.92]);
 for(const sign of [-1,1]){art.ball(head,sign*.174,-.012,0,.037,skin,[.55,1,.7]);art.ball(head,sign*.056,.018,.147,.012,'#342f2a');const brow=art.box(head,sign*.057,.053,.147,.047,.009,.015,hair);brow.rotation.z=sign*.05;}
 art.ball(head,0,-.025,.163,.028,skin,[.65,.75,.68]);
 art.line(head,[new T.Vector3(-.034,-.068,.143),new T.Vector3(0,-.076,.153),new T.Vector3(.034,-.068,.143)],'#795540',.006);
 art.ball(head,0,.107,-.027,.17,hair,[1,.57,.98]);
 if(id==='mara'){art.ball(head,0,.045,-.16,.089,hair,[.85,1,.7]);art.cylinder(head,0,.184,0,.174,.174,.054,'#ece2c4',24);art.box(head,0,.167,.08,.33,.022,.20,coat);art.box(head,0,.219,.12,.055,.022,.012,'#d8b361');}
 else if(id==='rina'){art.cylinder(head,0,.18,-.015,.14,.16,.073,'#eee5cf',24);for(const x of [-.08,0,.08])art.ball(head,x,.235,-.015,.091,'#f5eddc',[.9,.72,.9]);}
 else if(id==='operator'){art.cylinder(head,0,.18,0,.17,.155,.08,'#416582',24);art.box(head,0,.15,.12,.30,.022,.18,'#355771');}
 else for(let i=0;i<5;i++)art.ball(head,-.12+i*.057,.121,.076,.046,hair,[.9,.85,.9]);
 if(id==='jo'){
  for(const sign of[-1,1]){art.ball(head,sign*.145,.16,-.018,.085,hair);for(let i=0;i<11;i++){const angle=i*2.4;art.ball(head,sign*.145+Math.cos(angle)*.066,.16+Math.sin(angle)*.059,.02+Math.cos(i*1.7)*.037,.025,i%2?hair:'#62402c');}art.ball(head,sign*.056,.018,.155,.008,'#a16c3f');art.ball(head,sign*.053,.021,.162,.0035,'#fff9ed');}
  art.box(body,0,.768,.135,.235,.29,.03,'#24848a');art.box(body,0,.765,.157,.116,.093,.012,'#2e9295');
  for(const sign of[-1,1]){const strap=art.box(body,sign*.099,.931,.114,.034,.175,.027,'#24848a');strap.rotation.z=sign*.14;art.ball(body,sign*.088,.868,.146,.011,'#dac89d',[1,1,.35]);}
 }
 if(id==='rina'||id==='sol'){
  const apron=lathe([[.155,0],[width*1.07,.06],[width*1.06,.22],[.12,.40]],id==='rina'?'#eee1be':'#4f7166');apron.position.set(0,.49,.021);apron.scale.z=.73;
  art.box(body,0,.80,.145,.19,.20,.027,id==='rina'?'#eee1be':'#4f7166');
  for(const sign of [-1,1]){const strap=art.box(body,sign*.083,.90,.12,.027,.21,.025,id==='rina'?'#e2cf9e':'#627f70');strap.rotation.z=sign*-.13;}
  art.box(body,.055,.699,.178,.094,.085,.021,id==='rina'?'#d7c398':'#bca272');
  if(id==='sol')art.cylinder(body,.055,.767,.196,.011,.011,.13,'#845d3c',10);
 }
 if(id==='mara'){for(let i=0;i<5;i++)art.box(body,0,.665+i*.044,.133,.17,.018,.015,'#ded9bd');}
 if(id!=='jo')for(const sign of [-1,1]){const collar=art.box(body,sign*.057,.969,.107,.084,.062,.018,'#e5dbc1');collar.rotation.z=sign*.43;}
 const shoulders:T.Group[]=[],elbows:T.Group[]=[],hands:T.Group[]=[],hips:T.Group[]=[],knees:T.Group[]=[],ankles:T.Group[]=[];
 for(const [i,sign] of [-1,1].entries()){
  const shoulder=new T.Group(),elbow=new T.Group(),hand=new T.Group();shoulder.name=(sign<0?'left':'right')+'_shoulder';elbow.name=(sign<0?'left':'right')+'_elbow';hand.name=(sign<0?'left':'right')+'_wrist';
  shoulder.position.set(sign*(width+.013),.943,0);body.add(shoulder);elbow.position.y=-.225;shoulder.add(elbow);hand.position.y=-.205;elbow.add(hand);
  art.ball(shoulder,0,-.02,0,.071,coat,[1,1.05,.9]);art.cylinder(shoulder,0,-.122,0,.056,.049,.205,coat,16);
  art.ball(elbow,0,0,0,.049,id==='jo'?skin:coat);art.cylinder(elbow,0,-.095,0,.045,.035,.185,id==='rina'||id==='jo'?skin:coat,16);art.ball(hand,0,-.016,0,.048,skin,[.77,1.2,.54]);art.ball(hand,-sign*.031,.002,.021,.017,skin,[.7,1.1,.7]);
  shoulders.push(shoulder);elbows.push(elbow);hands.push(hand);
  const hip=new T.Group(),knee=new T.Group(),ankle=new T.Group();hip.name=(sign<0?'left':'right')+'_hip';knee.name=(sign<0?'left':'right')+'_knee';ankle.name=(sign<0?'left':'right')+'_ankle';hip.position.set(sign*.089,.53,0);body.add(hip);knee.position.y=-.245;hip.add(knee);ankle.position.y=-.245;knee.add(ankle);
  const pants=id==='jo'?'#24848a':small?'#4f6956':'#57594f';art.cylinder(hip,0,-.113,0,.065,.052,.225,pants,16);art.ball(knee,0,0,0,.052,pants);art.cylinder(knee,0,-.114,0,.050,.040,.225,pants,16);
  art.ball(ankle,0,-.013,.043,.069,id==='jo'?'#eee5cd':'#604b3b',[.78,.61,1.46]);art.box(ankle,0,-.046,.039,.101,.020,.167,id==='jo'?'#e2d9be':'#483f35');
  if(id==='jo')for(let lace=0;lace<3;lace++)art.box(ankle,0,.024,.019+lace*.020,.053,.006,.009,'#fff8e3');
  hips.push(hip);knees.push(knee);ankles.push(ankle);
  shoulder.rotation.z=sign*.06;void i;
 }
 const fixed=new T.Group();body.add(fixed);for(const object of [...body.children])if(object!==fixed&&!shoulders.includes(object as T.Group)&&!hips.includes(object as T.Group)&&object!==head)fixed.add(object);art.mergeStatic(fixed);art.mergeStatic(head);
 function update(time:number,moving:boolean,carrying:boolean,reduced=false){
  const active=moving&&!reduced,phase=active?time*2*Math.PI/.98:0;body.position.y=0;root.position.y=(active?-.010:.013)*height;
  for(let i=0;i<2;i++){
   const swing=active?Math.sin(phase+i*Math.PI):0,z=active?swing*.12:0,lift=active?Math.max(0,Math.cos(phase+i*Math.PI))*.07:0;
   const dy=(active?-.465:-.488)+lift,distance=Math.min(.489,Math.hypot(dy,z)),middle=Math.atan2(z,-dy),angle=Math.acos(distance/.49),hipAngle=-(middle+angle),kneeAngle=2*angle;
   hips[i]!.rotation.x=hipAngle;knees[i]!.rotation.x=kneeAngle;ankles[i]!.rotation.x=-hipAngle-kneeAngle;
   shoulders[i]!.rotation.x=carrying?-.60:moving?-swing*.32:0;elbows[i]!.rotation.x=carrying?-.75:-.08;
  }
  head.rotation.y=moving?0:Math.sin(time*.7)*.04;void neck;
 }
 return {root,hands,update,id,description:castStudyNotes[id]};
}
