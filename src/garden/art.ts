import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {riverHalf,GRANDMA,MARA,PLANT,TREE_POSITIONS} from './model.js';
import {setMaterialFade} from './materialFade.js';
export class PaperArt {
 readonly resources=new Set<{dispose:()=>void}>();
 private materials=new Map<string,T.MeshStandardMaterial>();
 private shapes=new Map<string,T.BufferGeometry>();
 private vertexMaterial:T.MeshStandardMaterial|null=null;
 material(color:string){let m=this.materials.get(color);if(!m){m=new T.MeshStandardMaterial({color,roughness:.92,metalness:0,flatShading:true});this.materials.set(color,m);this.resources.add(m);}return m;}
 geometry(key:string,create:()=>T.BufferGeometry){let g=this.shapes.get(key);if(!g){g=create();this.shapes.set(key,g);this.resources.add(g);}return g;}
 mesh(g:T.BufferGeometry,color:string,parent:T.Object3D,x=0,y=0,z=0){this.resources.add(g);const m=new T.Mesh(g,this.material(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 box(parent:T.Object3D,x:number,y:number,z:number,w:number,h:number,d:number,color:string){return this.mesh(this.geometry('box'+[w,h,d].join(','),()=>new T.BoxGeometry(w,h,d)),color,parent,x,y,z);}
 ball(parent:T.Object3D,x:number,y:number,z:number,r:number,color:string,scale:[number,number,number]=[1,1,1]){const m=this.mesh(this.geometry('sphere'+r,()=>new T.SphereGeometry(r,12,8)),color,parent,x,y,z);m.scale.set(...scale);return m;}
 cylinder(parent:T.Object3D,x:number,y:number,z:number,top:number,bottom:number,h:number,color:string,sides=8){return this.mesh(this.geometry('cyl'+[top,bottom,h,sides].join(','),()=>new T.CylinderGeometry(top,bottom,h,sides)),color,parent,x,y,z);}
 shape(parent:T.Object3D,points:number[][],depth:number,color:string){const s=new T.Shape();points.forEach((p,i)=>i?s.lineTo(p[0]!,p[1]!):s.moveTo(p[0]!,p[1]!));s.closePath();return this.mesh(new T.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSize:.025,bevelThickness:.02,bevelSegments:1,steps:1}),color,parent);}
 line(parent:T.Object3D,points:T.Vector3[],color:string,r=.018){return this.mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),Math.max(8,points.length*3),r,5,false),color,parent);}
 dispose(){for(const r of this.resources)r.dispose();this.resources.clear();}
 mergeStatic(root:T.Group){
  root.updateWorldMatrix(true,true);const inverse=root.matrixWorld.clone().invert(),groups=new Map<T.Material,T.BufferGeometry[]>(),palette=new Set(this.materials.values());
  root.traverse(object=>{if(!(object instanceof T.Mesh)||Array.isArray(object.material))return;let geo=object.geometry.clone();if(geo.index){const next=geo.toNonIndexed();geo.dispose();geo=next;}geo.applyMatrix4(inverse.clone().multiply(object.matrixWorld));if(!geo.getAttribute('uv'))geo.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(geo.getAttribute('position').count*2),2));
   let material=object.material;
   // These palette materials differ only in their linear RGB color. Baking that
   // same color into each vertex preserves every triangle and shading property
   // while drawing a static assembly once. Textured/special materials stay apart.
   if(material instanceof T.MeshStandardMaterial&&palette.has(material)&&!material.transparent&&!material.map&&material.roughness===.92&&material.metalness===0&&material.flatShading&&material.emissive.r===0&&material.emissive.g===0&&material.emissive.b===0){
    const colors=new Float32Array(geo.getAttribute('position').count*3);for(let i=0;i<colors.length;i+=3){colors[i]=material.color.r;colors[i+1]=material.color.g;colors[i+2]=material.color.b;}
    geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));
    if(!this.vertexMaterial){this.vertexMaterial=new T.MeshStandardMaterial({color:'#ffffff',roughness:.92,metalness:0,flatShading:true,vertexColors:true});this.resources.add(this.vertexMaterial);}
    material=this.vertexMaterial;
   }
   const list=groups.get(material)??[];list.push(geo);groups.set(material,list);
  });
  root.clear();
  for(const [material,geos]of groups){const merged=mergeGeometries(geos,false);for(const g of geos)g.dispose();if(!merged)throw Error('Papercraft batch mismatch');this.resources.add(merged);const mesh=new T.Mesh(merged,material);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);}
 }
}
const C={cream:'#fff1ce',paper:'#fff8e8',green:'#86ad77',dark:'#245d51',sage:'#adc58f',wood:'#ac7850',coral:'#dc7051',navy:'#304f61',gold:'#e4b354',skin:'#efbd91',hair:'#70492f'};
export function makeStudio(a:PaperArt){
 const root=new T.Group();
 a.box(root,1,-.10,0,7,.16,5.5,'#d3b28a');
 for(let i=0;i<12;i++)a.box(root,-2.15+i*.57,-.011,0,.016,.006,5.45,'#b89470');
 // A studio table, open paper story and Loop's projection surface.
 a.box(root,1.8,.63,0,3.1,.12,1.8,'#b38156');a.box(root,1.8,.705,0,3.03,.025,1.74,'#e2bd84');
 for(const x of [.5,3.1])for(const z of [-.68,.68])a.box(root,x,.30,z,.13,.60,.13,'#8e694d');
 a.box(root,1.5,.755,-.15,2.15,.075,1.22,'#3f7565');a.box(root,1.5,.81,-.15,2.08,.07,1.16,'#f6ecd0');
 a.box(root,1.5,.85,-.15,.026,.017,1.16,'#c8bca0');
 for(const x of [.97,2.03]){a.box(root,x,.86,-.15,.83,.008,.87,'#bacb98');for(let z=-.45;z<.25;z+=.19)a.box(root,x,.867,z,.67,.009,.018,'#859779');}
 a.box(root,1.5,.869,-.15,.29,.014,.91,'#75b4aa');
 // The ready studio has visible story supplies, never collectible adventure props.
 a.cylinder(root,3.03,.87,-.5,.13,.10,.30,'#e6b05f');for(let i=0;i<4;i++){const pen=a.cylinder(root,2.98+i*.035,1.10,-.5,.012,.012,.42,['#7c9973','#cf8156','#4c7770','#ddb34d'][i]!);pen.rotation.z=(i-2)*.10;}
 a.box(root,.40,.77,.46,.30,.07,.31,'#e9dab7');a.box(root,.40,.81,.46,.27,.014,.27,'#fcf5df');
 a.cylinder(root,3.8,.25,-1.45,.30,.22,.5,'#b77d57');a.cylinder(root,3.8,.48,-1.45,.29,.29,.045,'#665742');
 for(let i=0;i<5;i++){const leaf=a.shape(root,[[0,0],[-.16,.28],[0,.65],[.15,.27]],.018,i%2?'#567d5b':'#769568');leaf.position.set(3.8,.5,-1.45);leaf.rotation.y=i*1.25;leaf.rotation.z=(i-2)*.10;}
 a.mergeStatic(root);return root;
}
export function makeCharacter(a:PaperArt,kind:'pip'|'mara'|'grandma'|'jo'|'sol'|'rina'|'boy'|'operator'|'passenger'){
 const rig=new T.Group(),body=new T.Group();rig.add(body);
 const adult=kind!=='pip'&&kind!=='boy',height=['mara','jo','sol','rina','operator','passenger'].includes(kind)?1.2:kind==='grandma'?1.08:1;
 rig.scale.setScalar(height);
 const coat=kind==='pip'?C.coral:kind==='mara'?C.navy:kind==='grandma'?C.dark:kind==='sol'?'#9b754e':kind==='rina'?'#9c6680':kind==='boy'?'#729d7c':kind==='operator'?'#557ca0':kind==='passenger'?'#ac805c':C.paper;
 const skin=kind==='mara'?'#b57e59':kind==='grandma'?'#e5ad82':C.skin;
 const dress=kind==='grandma';
 const torso=a.shape(body,[[-.16,.28],[.16,.28],[.14,.61],[-.14,.61]],.17,coat);torso.position.z=-.085;
 if(dress){const skirt=a.cylinder(body,0,.30,0,.17,.25,.24,coat,10);skirt.rotation.y=.18;a.box(body,0,.39,.105,.22,.28,.014,C.cream);}
 else {a.box(body,0,.36,.099,.027,.35,.014,C.cream);for(let i=0;i<3;i++)a.ball(body,.042,.43+i*.065,.115,.011,C.gold);}
 const head=a.ball(body,0,.78,0,.175,skin,[1,1.08,.91]);
 const hair=kind==='grandma'?'#ece6d7':kind==='mara'?'#493529':C.hair;
 a.ball(body,0,.87,-.017,.174,hair,[1,.57,1]);
 if(kind==='grandma')a.ball(body,0,.95,-.08,.085,hair);
 if(kind==='pip'){for(let i=0;i<4;i++)a.ball(body,-.12+i*.072,.896,.065,.05,hair);const bag=a.box(body,0,.44,-.17,.30,.32,.12,'#d9a548');a.box(bag,0,0,-.066,.19,.15,.024,'#f2c875');}
 if(kind==='mara'){a.cylinder(body,0,.943,0,.18,.18,.05,C.cream,14);a.box(body,0,.925,.07,.36,.025,.20,C.navy);a.box(body,0,.972,.11,.065,.035,.01,C.gold);for(let i=0;i<3;i++)a.box(body,0,.43+i*.058,.101,.25,.022,.008,'#ded9bd');}
 if(kind==='sol'){a.box(body,0,.43,.11,.22,.32,.028,'#506c65');for(const x of [-.09,.09])a.box(body,x,.60,.105,.025,.17,.022,'#506c65');a.box(body,.055,.43,.145,.08,.075,.025,'#dcc391');a.cylinder(body,.055,.52,.14,.018,.018,.2,'#714e38');}
 if(kind==='rina'){a.box(body,0,.40,.12,.24,.32,.035,C.cream);a.cylinder(body,0,.98,0,.15,.16,.11,C.cream,12);}
 if(kind==='operator'){a.cylinder(body,0,.97,0,.18,.17,.09,'#456c8c',12);a.box(body,0,.935,.13,.3,.025,.18,'#456c8c');}
 a.ball(body,-.061,.785,.145,.016,'#342f2a');a.ball(body,.061,.785,.145,.016,'#342f2a');a.ball(body,0,.745,.17,.017,skin);
 a.line(body,[new T.Vector3(-.039,.708,.144),new T.Vector3(0,.699,.155),new T.Vector3(.039,.708,.144)],'#714e3a',.009);
 if(kind==='grandma'){
  const geo=a.geometry('glasses',()=>new T.TorusGeometry(.049,.007,5,16));
  a.mesh(geo,'#674c43',body,-.062,.786,.162);a.mesh(geo,'#674c43',body,.062,.786,.162);a.box(body,0,.792,.162,.035,.007,.008,'#674c43');
  a.box(body,0,.61,.10,.23,.06,.04,C.gold);
 }
 const legs:T.Group[]=[],arms:T.Group[]=[];
 for(const sign of [-1,1]){
  const leg=new T.Group();leg.position.set(sign*.087,.29,0);body.add(leg);a.cylinder(leg,0,-.095,0,.041,.037,.19,adult?'#544e43':C.navy);a.ball(leg,0,-.215,.035,.069,'#594535',[.85,.58,1.4]);legs.push(leg);
  const arm=new T.Group();arm.position.set(sign*.155,.59,0);arm.rotation.z=sign*.12;body.add(arm);a.cylinder(arm,0,-.105,0,.052,.043,.21,coat);a.ball(arm,0,-.23,0,.047,skin);arms.push(arm);
 }
 rig.rotation.y=.36;
 const fixed=new T.Group();body.add(fixed);for(const child of [...body.children])if(child!==fixed&&!legs.includes(child as T.Group)&&!arms.includes(child as T.Group))fixed.add(child);a.mergeStatic(fixed);for(const part of [...legs,...arms])a.mergeStatic(part);
 return {rig,body,legs,arms,head};
}
export function makeSection(a:PaperArt,label:'a'|'b'){
 const root=new T.Group(),deck=new T.Group();root.add(deck);root.userData['kind']='wooden-bridge-section';
 // Five exposed wooden planks on beams: a fixed walking surface, with no boat hull.
 for(const z of [-.40,.40])a.box(deck,0,.045,z,1.55,.10,.12,'#785738');
 for(let i=0;i<5;i++){
  const x=-.62+i*.31;a.box(deck,x,.112,0,.30,.076,1.12,label==='a'?'#d0a36d':'#bd8f5d');
  for(const z of [-.40,.40])a.ball(deck,x,.152,z,.019,'#665644',[1,.24,1]);
  a.line(deck,[new T.Vector3(x-.08,.151,-.39),new T.Vector3(x-.065,.152,.02),new T.Vector3(x-.09,.151,.40)],'#a77948',.006);
 }
 const glyph=document.createElement('canvas');glyph.width=128;glyph.height=128;const ctx=glyph.getContext('2d')!;ctx.clearRect(0,0,128,128);ctx.fillStyle=label==='a'?'#987344':'#446d60';ctx.font='bold 72px Georgia';ctx.textAlign='center';ctx.fillText(label.toUpperCase(),64,91);
 const tex=new T.CanvasTexture(glyph);tex.colorSpace=T.SRGBColorSpace;a.resources.add(tex);const mat=new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false});a.resources.add(mat);
 const marker=new T.Mesh(new T.PlaneGeometry(.35,.35),mat);a.resources.add(marker.geometry);marker.rotation.x=-Math.PI/2;marker.position.set(0,.155,0);root.add(marker);
 a.mergeStatic(deck);return {root};
}
export function makeSeedBoat(a:PaperArt){
 const root=new T.Group();root.userData['kind']='open-seed-boat';
 // An open, pointed hull. The floor sits below the gunwale so its interior stays visible.
 const rim=[[-.65,.25,0],[-.38,.22,-.28],[.38,.22,-.28],[.65,.27,0],[.38,.22,.28],[-.38,.22,.28]].map(p=>new T.Vector3(...p as [number,number,number]));
 const keel=rim.map(p=>new T.Vector3(p.x*.69,-.035,p.z*.52)),vertices:number[]=[];
 for(let i=0;i<rim.length;i++){
  const j=(i+1)%rim.length;
  for(const p of [rim[i]!,keel[i]!,rim[j]!,rim[j]!,keel[i]!,keel[j]!])vertices.push(p.x,p.y,p.z);
  a.line(root,[rim[i]!,rim[j]!],'#ffe5b1',.026);
 }
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.computeVertexNormals();
 const hull=artHullMaterial(a);a.resources.add(geo);const shell=new T.Mesh(geo,hull);shell.castShadow=true;shell.receiveShadow=true;root.add(shell);
 const floor=a.shape(root,keel.map(p=>[p.x,p.z]),.018,'#e9be80');floor.rotation.x=Math.PI/2;floor.position.y=.04;
 for(const x of [-.27,.27])a.box(root,x,.115,0,.12,.032,.38,'#ffe5b1');
 a.mergeStatic(root);return root;
}
function artHullMaterial(a:PaperArt){
 const material=new T.MeshStandardMaterial({color:'#356d99',roughness:.88,flatShading:true,side:T.DoubleSide});a.resources.add(material);return material;
}
function ribbon(a:PaperArt,root:T.Group,points:T.Vector3[],width:number,color:string){
 const curve=new T.CatmullRomCurve3(points),vertices:number[]=[],uv:number[]=[];
 for(let i=0;i<48;i++){const p=curve.getPoint(i/48),q=curve.getPoint((i+1)/48),d=q.clone().sub(p).normalize(),n=new T.Vector3(-d.z,0,d.x).multiplyScalar(width/2);
 const four=[p.clone().add(n),p.clone().sub(n),q.clone().add(n),q.clone().sub(n)];for(const idx of [0,1,2,2,1,3]){const v=four[idx]!;vertices.push(v.x,v.y,v.z);uv.push(0,0);}}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.computeVertexNormals();a.mesh(geo,color,root);
}
export function makeLandscape(a:PaperArt){
 const root=new T.Group(),workshopTree=new T.Group(),workshopLeaves=new T.Group(),gardenTrees=new T.Group(),gardenCrowns:T.Group[]=[];
 // A thick illustrated paper world resting on an open book.
 a.box(root,0,-.52,0,14.15,.15,12.3,'#3f7565');
 a.box(root,0,-.32,0,13.95,.32,12.1,'#dfd4b6');
 for(let i=0;i<3;i++)a.box(root,0,-.43+i*.065,0,14.0,.016,12.14,'#f9edcf');
 const waterPoints:number[][]=[];for(let z=-6;z<=6.01;z+=.25)waterPoints.push([-riverHalf(z),-z]);for(let z=6;z>=-6.01;z-=.25)waterPoints.push([riverHalf(z),-z]);
 const water=a.shape(root,waterPoints,.13,'#52a7a3');water.rotation.x=-Math.PI/2;water.position.y=-.28;
 for(const side of [-1,1]){
  const points:number[][]=[[side*6.85,6],[side*6.85,-6]];for(let z=6;z>=-6.01;z-=.25)points.push([side*riverHalf(z),-z]);
  const bank=a.shape(root,points,.34,side<0?'#afc590':'#b5cc91');bank.rotation.x=-Math.PI/2;bank.position.y=-.23;
  const edge:T.Vector3[]=[];for(let z=-5.7;z<=5.71;z+=.32)edge.push(new T.Vector3(side*(riverHalf(z)+.06),.11,z));a.line(root,edge,'#d6d6a9',.055);
 }
 ribbon(a,root,[[-4,.13,-5.7],[-3.1,.13,-3],[-3.3,.13,0],[-2.5,.13,3],[-4,.13,5.3]].map(v=>new T.Vector3(...v as [number,number,number])),.55,'#e2d9ae');
 ribbon(a,root,[[1.55,.13,3],[2.8,.13,3.0],[3.6,.13,2.7],[5.2,.13,4.8]].map(v=>new T.Vector3(...v as [number,number,number])),.6,'#e8daad');
 // Passenger dock: fixed scenery with clear land-side access.
 for(let i=0;i<12;i++)a.box(root,-2.65,.17,-4.8+i*.12,1.65,.09,.11,'#aa8861');
 for(const x of [-3.38,-1.91])for(const z of [-4.75,-3.45]){a.cylinder(root,x,.12,z,.058,.065,.62,C.wood);a.cylinder(root,x,.43,z,.072,.072,.045,C.cream);}
 const shed=new T.Group();shed.position.set(-5.1,.12,-4.5);root.add(shed);a.box(shed,0,.50,0,1.15,1,.95,'#e9c78e');const roof=a.shape(shed,[[-.7,1],[0,1.48],[.7,1]],1.17,C.coral);roof.position.z=-.59;a.box(shed,0,.45,.49,.34,.8,.035,C.navy);a.box(shed,-.35,.66,.50,.26,.27,.025,C.paper);a.box(shed,.37,.66,.50,.23,.27,.025,C.paper);
 // Garden bench, handwritten page stand, rooted older lanterns.
 for(let i=0;i<3;i++)a.box(root,5.15,.45,2.15+i*.13,1.22,.07,.11,C.wood);
 for(const x of [4.65,5.65])a.box(root,x,.27,2.28,.08,.35,.3,C.dark);
 a.box(root,5.15,.83,2.10,1.25,.28,.065,C.wood);
 const pot=a.cylinder(root,PLANT.x,.17,PLANT.z,.42,.39,.11,'#806b47',14);pot.receiveShadow=true;
 for(let i=0;i<12;i++){const angle=i*Math.PI/6;a.ball(root,PLANT.x+Math.cos(angle)*.43,.19,PLANT.z+Math.sin(angle)*.43,.071,'#d8c1a0',[1,.65,1]);}
 // Folded paper trees frame the paths, with varied leaf planes and visible trunks.
 let seed=76;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const trees=TREE_POSITIONS;
 for(const [x,z,scale]of trees){
  const t=new T.Group();t.position.set(x!,.1,z!);t.scale.setScalar(scale!);const gardenTree=x===2.15||x===6.1;(x===5.9?workshopTree:gardenTree?gardenTrees:root).add(t);a.cylinder(t,0,.55,0,.055,.12,1.1,C.wood);const crown=x===5.9?workshopLeaves:gardenTree?new T.Group():t;if(crown!==t)t.add(crown);if(gardenTree)gardenCrowns.push(crown);
  for(let i=0;i<6;i++){const angle=i*Math.PI/3;const leaf=a.shape(crown,[[0,0],[-.55,.36],[-.42,.91],[0,1.35],[.45,.91],[.52,.36]],.025,i%2?'#56816a':'#6e9974');leaf.position.set(Math.sin(angle)*.17,.6,Math.cos(angle)*.17);leaf.rotation.y=angle;}
  a.ball(crown,0,1.67,0,.23,'#8aaa79',[1,1.4,1]);
 }
 // Instancing is unnecessary after material batching; all details share a small draw set.
 for(let i=0;i<120;i++){
  const x=(rand()<.5?-1:1)*(2.8+rand()*3.4),z=rand()*10.9-5.4;
  if((Math.abs(x+3.1)<.6)||(x>2.5&&z>2.0&&z<4.6)||(x> -4.5&&x< -2.7&&z>.3&&z<3.2))continue;
  const leaf=a.shape(root,[[0,0],[-.028,.17],[0,.26],[.035,.13]],.006,i%3?'#719469':'#e6b260');leaf.position.set(x,.12,z);leaf.rotation.y=rand()*6.28;
  if(i%4===0){a.ball(root,x,.28,z,.045,i%8?'#fff0c6':'#d88770');}
 }
 for(const [x,z]of [[-2.55,-1.85],[-2.35,-2.12],[2.6,-1.85]]){a.box(root,x!,.15,z!,.54,.07,.20,'#a29373').rotation.y=.25;a.box(root,x!+.15,.19,z!-.1,.38,.06,.14,'#bdaa80').rotation.y=-.7;}
 for(let i=0;i<18;i++){const x=(i%2?-1:1)*(2.7+rand()*3.4),z=rand()*10.5-5.2,r=.07+rand()*.06;if(x> -4.5&&x< -2.7&&z>.3&&z<3.2)continue;a.ball(root,x,.14,z,r,'#c5bd9c',[1.5,.6,1]);}
 a.mergeStatic(root);
 const currents=new T.Group(),lineMaterial=a.material('#b0ded0');
 for(let i=0;i<22;i++){const z=(i*1.13)%11.8-5.9,x=Math.sin(i*1.77)*(riverHalf(z)-.38),line=a.line(currents,[new T.Vector3(x-.12,.018,z),new T.Vector3(x,.018,z+.04),new T.Vector3(x+.20,.018,z)],'#b0ded0',.009);line.material=lineMaterial;}
 a.mergeStatic(currents);currents.position.y=-.14;
 const foliage=new Map<T.Material,T.MeshStandardMaterial>();workshopLeaves.traverse(o=>{if(!(o instanceof T.Mesh)||Array.isArray(o.material))return;let material=foliage.get(o.material);if(!material){material=(o.material as T.MeshStandardMaterial).clone();a.resources.add(material);foliage.set(o.material,material);}o.material=material;});root.add(workshopTree);
 const frameWorkshop=(focused:boolean)=>{for(const material of foliage.values())setMaterialFade(material,focused?.12:1,!focused);workshopLeaves.traverse(o=>{o.castShadow=!focused;});};
 const gardenMaterials:T.MeshStandardMaterial[]=[];for(const crown of gardenCrowns){a.mergeStatic(crown);crown.traverse(o=>{if(!(o instanceof T.Mesh)||Array.isArray(o.material))return;const material=(o.material as T.MeshStandardMaterial).clone();a.resources.add(material);o.material=material;gardenMaterials.push(material);});}root.add(gardenTrees);const frameGathering=(focused:boolean)=>{for(const material of gardenMaterials)setMaterialFade(material,focused?.12:1,!focused);for(const crown of gardenCrowns)crown.traverse(o=>{o.castShadow=!focused;});};return {root,currents,frameWorkshop,frameGathering};
}
export function makeLantern(a:PaperArt,x:number,z:number,color='#e6bf61'){
 const root=new T.Group();root.position.set(x,.12,z);a.cylinder(root,0,.35,0,.019,.024,.7,C.dark);
 for(let i=0;i<5;i++){const angle=i*Math.PI*2/5;a.line(root,[new T.Vector3(0,.035,0),new T.Vector3(Math.sin(angle)*.15,.035,Math.cos(angle)*.15),new T.Vector3(Math.sin(angle+.15)*.32,.008,Math.cos(angle+.15)*.32)],'#cfb78a',.018);}
 for(const sign of [-1,1]){const leaf=a.shape(root,[[0,0],[sign*.19,.10],[sign*.28,.28],[sign*.07,.22]],.012,'#6d9972');leaf.position.y=.18;leaf.rotation.y=sign*.7;}
 const petals=new T.Group();petals.position.y=.77;root.add(petals);
 for(let i=0;i<6;i++){const angle=i*Math.PI/3,petal=a.shape(petals,[[0,-.06],[-.14,.12],[-.11,.30],[0,.37],[.11,.30],[.14,.12]],.018,color);petal.rotation.y=angle;petal.rotation.x=-.6;petal.position.set(Math.sin(angle)*.055,0,Math.cos(angle)*.055);}
 const light=a.ball(petals,0,.15,0,.115,'#ffedac');a.mergeStatic(petals);return {root,petals,light};
}
