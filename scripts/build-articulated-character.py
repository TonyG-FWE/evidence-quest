"""Anatomically fitted review characters. Local authoring; never submits provider work.

Source GLBs and approved references are immutable. Each local iteration archives its
predecessor. All coordinates in the fit records are game metres, Y-up, +Z forward.
"""
import bpy,bmesh,json,math,pathlib,sys,hashlib,shutil,datetime,importlib.util,heapq
from mathutils import Vector,Matrix,Quaternion
from mathutils.bvhtree import BVHTree
from mathutils.geometry import barycentric_transform
ROOT=pathlib.Path.cwd();LIB=ROOT/'evidence/hands-on-20260916/pilot/articulated-library-20260917'
FPS=30;TAU=math.tau
_helper_spec=importlib.util.spec_from_file_location('eq_preserved_rig_helpers',ROOT/'scripts/rebuild-character-rigs.py')
_helpers=importlib.util.module_from_spec(_helper_spec);_helper_spec.loader.exec_module(_helpers)
def B(v):return Vector((v[0],-v[2],v[1]))
def G(v):return Vector((v[0],v[2],-v[1]))
def sha(p):return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
def smooth(x):x=max(0,min(1,x));return x*x*(3-2*x)
def lerp(a,b,t):return a*(1-t)+b*t
def seg(p,a,b):
 d=b-a;t=max(0,min(1,(p-a).dot(d)/max(1e-9,d.length_squared)));return (p-a-d*t).length,t
def ik(root,target,a,b,pole):
 d=target-root;length=min(a+b-.00001,max(abs(a-b)+.00001,d.length));u=d.normalized()
 along=(a*a-b*b+length*length)/(2*length);off=math.sqrt(max(0,a*a-along*along));bend=pole-u*pole.dot(u)
 if bend.length<.0001:bend=Vector((1,0,0))
 return root+u*along+bend.normalized()*off,root+u*length
def archive(target):
 if not (target/'model.json').exists():return
 stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
 dest=LIB/'local-history'/target.name/stamp;dest.mkdir(parents=True)
 for p in target.iterdir():
  if p.is_file():shutil.copy2(p,dest/p.name)

def footprint_axis(points):
 points=sorted(set((p.x,p.z) for p in points))
 def half(ps):
  hull=[]
  for p in ps:
   while len(hull)>1:
    o,a=hull[-2:]
    if (a[0]-o[0])*(p[1]-o[1])-(a[1]-o[1])*(p[0]-o[0])>0:break
    hull.pop()
   hull.append(p)
  return hull[:-1]
 hull=half(points)+half(list(reversed(points)));area=cx=cz=xx=zz=xz=0
 for (x,z),(u,v) in zip(hull,hull[1:]+hull[:1]):
  c=x*v-u*z;area+=c/2;cx+=(x+u)*c/6;cz+=(z+v)*c/6;xx+=(x*x+x*u+u*u)*c/12;zz+=(z*z+z*v+v*v)*c/12;xz+=(2*x*z+x*v+u*z+2*u*v)*c/24
 cx/=area;cz/=area;return math.atan2(2*(xz/area-cx*cz),zz/area-cz*cz-(xx/area-cx*cx))/2

def align_shoes(mesh,s):
 details={}
 for side,sign in [('L',1),('R',-1)]:
  vertices=[(v,G(v.co)) for v in mesh.data.vertices if v.co.x*sign>0 and v.co.z<s['ankleY']+.075]
  lowest=min(p.y for _,p in vertices);sole=[p for _,p in vertices if p.y<lowest+.028];axis=footprint_axis(sole)
  ankle=[p for _,p in vertices if s['ankleY']<=p.y<s['ankleY']+.035];pivot=sum(ankle,Vector())/len(ankle)
  for v,p in vertices:
   fade=1-smooth((p.y-s['ankleY'])/.070);angle=-axis*fade;dx,dz=p.x-pivot.x,p.z-pivot.z
   v.co=B((pivot.x+math.cos(angle)*dx+math.sin(angle)*dz,p.y-lowest*fade,pivot.z-math.sin(angle)*dx+math.cos(angle)*dz))
  after=footprint_axis([G(v.co) for v,p in vertices if p.y<lowest+.028]);details[side]={'beforeDegrees':math.degrees(axis),'afterDegrees':math.degrees(after),'anklePivot':list(pivot),'groundAdjustment':lowest}
 mesh.data.update();return details

def make_bones(s):
 bones={}
 def add(name,head,tail,parent=None):bones[name]={'head':Vector(head),'tail':Vector(tail),'parent':parent}
 h=s['height'];hip=s['hipY'];neck=s['neckY'];shoulder=s['shoulderY'];z=s.get('bodyZ',0)
 add('root',[0,0,0],[0,h*.06,0])
 add('pelvis',[0,hip,z],[0,hip+h*.07,z],'root')
 add('spine_lower',[0,hip+h*.07,z],[0,lerp(hip,shoulder,.48),z],'pelvis')
 add('spine_upper',[0,lerp(hip,shoulder,.48),z],[0,shoulder-h*.045,z],'spine_lower')
 add('chest',[0,shoulder-h*.045,z],[0,neck-h*.02,z],'spine_upper')
 add('neck',[0,neck-h*.02,z],[0,neck+h*.025,z],'chest')
 add('head',[0,neck+h*.025,z],[0,h*.96,z],'neck')
 hands={}
 for side,sign in [('L',1),('R',-1)]:
  sh,el,wr=[Vector(p) for p in s['arms'][side]]
  add('clavicle_'+side,[0,sh.y,sh.z],sh,'chest')
  add('upper_arm_'+side,sh,el,'clavicle_'+side)
  add('forearm_'+side,el,wr,'upper_arm_'+side)
  add('forearm_twist_'+side,lerp(el,wr,.68),wr,'forearm_'+side)
  d=(wr-el).normalized();d.z=0;d.normalize()
  u=Vector((sign*abs(d.y),sign*d.x,0)).normalized();n=Vector((0,0,1))
  palm=s['handLength']*.48;width=s['handWidth'];finger=s['handLength']*.52
  add('hand_'+side,wr,wr+d*palm,'forearm_twist_'+side)
  fingers={}
  # Independent fingers with three actual bending segments, joined to a soft palm.
  for i,(digit,factor) in enumerate([('index',.93),('middle',1.0),('ring',.94),('little',.76)]):
   x=(-1.5+i)*width*.225;spread=(-1.5+i)*.050
   direction=(d+u*spread).normalized();start=wr+d*(palm*(.98 if i<3 else .87))+u*x
   lengths=[finger*factor*.45,finger*factor*.32,finger*factor*.23];joints=[start]
   parent='hand_'+side;names=[]
   for part,length in zip(['proximal','middle','distal'],lengths):
    end=start+direction*length;name=f'{digit}_{part}_{side}';add(name,start,end,parent);names.append(name);joints.append(end);start=end;parent=name
   add(f'{digit}_tip_{side}',start,start+direction*.001,parent)
   fingers[digit]={'joints':joints,'names':names,'radius':width*(.115 if digit!='little' else .095),'direction':direction}
  start=wr+d*palm*.38-u*width*.39+n*width*.05
  direction=(d*.65-u*.70+n*.16).normalized();joints=[start];names=[];parent='hand_'+side
  for part,length in zip(['base','middle','distal'],[finger*.36,finger*.28,finger*.26]):
   end=start+direction*length;name=f'thumb_{part}_{side}';add(name,start,end,parent);names.append(name);joints.append(end);start=end;parent=name
  add('thumb_tip_'+side,start,start+direction*.001,parent)
  fingers['thumb']={'joints':joints,'names':names,'radius':width*.14,'direction':direction}
  hands[side]={'wrist':wr,'d':d,'u':u,'n':n,'palm':palm,'width':width,'fingers':fingers}
  x=sign*s['hipX'];ankle=s['ankleY'];knee=s['kneeY'];fz=s.get('footZ',0)
  add('thigh_'+side,[x,hip,z],[x,knee,fz+.008],'pelvis')
  add('shin_'+side,[x,knee,fz+.008],[x,ankle,fz],'thigh_'+side)
  add('foot_'+side,[x,ankle,fz],[x,s['soleY']+.012,fz+s['footLength']*.45],'shin_'+side)
  add('toe_'+side,[x,s['soleY']+.012,fz+s['footLength']*.45],[x,s['soleY']+.010,fz+s['footLength']*.85],'foot_'+side)
 if s.get('backpack'):add('backpack',[0,hip+h*.10,z-h*.08],[0,shoulder,z-h*.08],'chest')
 if s.get('skirt'):
  for label,x,fz in [('front',0,.10),('back',0,-.10),('left',.14,0),('right',-.14,0)]:
   add('skirt_'+label,[x*.6,hip+.02,z+fz*.6],[x,s['skirtHem'],z+fz],'pelvis')
 return bones,hands

def armature(bones,aid):
 data=bpy.data.armatures.new(aid+'_anatomical_skeleton');arm=bpy.data.objects.new(aid+'_rig',data);bpy.context.collection.objects.link(arm);bpy.context.view_layer.objects.active=arm;arm.select_set(True)
 bpy.ops.object.mode_set(mode='EDIT')
 for name,d in bones.items():
  b=data.edit_bones.new(name);b.head=B(d['head']);b.tail=B(d['tail']);b.roll=0
  if d['parent']:b.parent=data.edit_bones[d['parent']]
 bpy.ops.object.mode_set(mode='OBJECT');arm.show_in_front=True;data.display_type='OCTAHEDRAL'
 for b in arm.pose.bones:b.rotation_mode='QUATERNION'
 return arm

def sample_uv(mesh,point):
 best=(1e9,None)
 for loop in mesh.data.loops:
  distance=(G(mesh.data.vertices[loop.vertex_index].co)-point).length_squared
  if distance<best[0]:best=(distance,mesh.data.uv_layers.active.data[loop.index].uv.copy())
 return best[1]

def replace_hands(mesh,hands,s,aid):
 # Cut only the distal arm region. Bounds exclude torso hems, backpack and legs.
 samples={side:sample_uv(mesh,d['wrist']-d['d']*.015+d['n']*.022) for side,d in hands.items()}
 bm=bmesh.new();bm.from_mesh(mesh.data)
 if not s.get('preserveUVVertices'):bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
 image=next((n.image for n in mesh.active_material.node_tree.nodes if n.type=='TEX_IMAGE' and ('color' in n.name.lower() or 'color' in n.image.name.lower())),None)
 if image is None:image=next(n.image for n in mesh.active_material.node_tree.nodes if n.type=='TEX_IMAGE')
 pixels=list(image.pixels);iw,ih=image.size;uvlayer=bm.loops.layers.uv.active
 for side,d in hands.items():
  sign=1 if side=='L' else -1;w=d['wrist'];direction=d['d'];arm=s['arms'][side]
  def in_arm_face(face):
   ps=[G(v.co) for v in face.verts];centre=sum(ps,Vector())/len(ps)
   perpendicular=centre-w-direction*(centre-w).dot(direction)
   color=Vector((0,0,0))
   for loop in face.loops:
    uv=loop[uvlayer].uv;index=(min(ih-1,max(0,int(uv.y*ih)))*iw+min(iw-1,max(0,int(uv.x*iw))))*4;color+=Vector(pixels[index:index+3])
   r,g,b=color/len(face.loops);skin=r>g*1.08 and r>b*1.10 or min(r,g,b)>.40 and max(r,g,b)/max(.001,min(r,g,b))<1.5
   return skin and centre.x*sign>max(s['handCutX']*.82,s.get('safeTunicX',0)) and perpendicular.length<d['width']*1.85 and all(p.y<arm[1][1]+.04 and p.y>w.y-s['handLength']*1.7 for p in ps)
  candidates=[f for f in bm.faces if in_arm_face(f)]
  edges={e for f in candidates for e in f.edges};verts={v for f in candidates for v in f.verts}
  result=bmesh.ops.bisect_plane(bm,geom=list(verts)+list(edges)+candidates,plane_co=B(w-direction*.005),plane_no=B(direction),dist=.0000001,clear_outer=not s.get('preserveUnselectedHandFaces',False),clear_inner=False)
  ring=[G(v.co) for v in result['geom_cut'] if isinstance(v,bmesh.types.BMVert)]
  if ring:
   d['wristRadius']=[max(abs((p-w).dot(d['u'])) for p in ring),max(abs((p-w).dot(d['n'])) for p in ring)]
  distal=[f for f in bm.faces if in_arm_face(f) and (G(f.calc_center_median())-w).dot(direction)>.001]
  bmesh.ops.delete(bm,geom=distal,context='FACES')
 bmesh.ops.delete(bm,geom=[v for v in bm.verts if not v.link_faces],context='VERTS')
 bm.to_mesh(mesh.data);bm.free();mesh.data.update()
 objects=[]
 for side,d in hands.items():
  vs=[];fs=[];ws=[];uvs=[];w=d['wrist'];direction=d['d'];u=d['u'];n=d['n'];width=d['width'];palm=d['palm'];uv=samples[side]
  def v(point,weights,tex):vs.append(B(point));ws.append(weights);uvs.append(tex);return len(vs)-1
  def rings(centres,radii,weights,ux,nx):
   ids=[];segments=12
   for row,(centre,radius,weight) in enumerate(zip(centres,radii,weights)):
    ring=[]
    for j in range(segments):
     ang=j/segments*TAU;point=centre+ux*math.cos(ang)*radius[0]+nx*math.sin(ang)*radius[1]
     ring.append(v(point,weight,(uv.x+.003*math.cos(ang),uv.y+.003*row/max(1,len(centres)-1))))
    ids.append(ring)
   for a,b in zip(ids,ids[1:]):
    for j in range(segments):fs.append((a[j],a[(j+1)%segments],b[(j+1)%segments],b[j]))
   fs.append(tuple(reversed(ids[0])));fs.append(tuple(ids[-1]));return ids
  centres=[w+direction*t*palm for t in [-.10,0,.20,.50,.82,1.0,1.07]]
  rx,rz=d.get('wristRadius',[width*.34,width*.24]);rx=max(width*.30,min(width*.52,rx));rz=max(width*.21,min(width*.40,rz))
  radii=[(rx,rz),(rx,rz),(lerp(rx,width*.44,.65),lerp(rz,width*.28,.65)),(width*.50,width*.30),(width*.50,width*.26),(width*.45,width*.22),(width*.37,width*.17)]
  rings(centres,radii,[{'hand_'+side:1} for _ in centres],u,n)
  for digit,f in d['fingers'].items():
   joints=f['joints'];names=f['names'];centres=[];radii=[];weights=[]
   ux=(u-f['direction']*u.dot(f['direction'])).normalized();nx=f['direction'].cross(ux).normalized()
   for part in range(3):
    for step,t in enumerate([0,.22,.55,.80]):
     centres.append(lerp(joints[part],joints[part+1],t))
     taper=1-(part+t)*.15;radius=f['radius']*taper
     radii.append((radius,radius*.86))
     if part and t<.30:weights.append({names[part-1]:(.3-t)*1.4,names[part]:1-(.3-t)*1.4})
     elif t>.75 and part<2:weights.append({names[part]:.88,names[part+1]:.12})
     else:weights.append({names[part]:1})
   centres.extend([lerp(joints[-2],joints[-1],.95),joints[-1]]);radii.extend([(f['radius']*.40,f['radius']*.36),(f['radius']*.13,f['radius']*.12)]);weights.extend([{names[-1]:1},{names[-1]:1}])
   rings(centres,radii,weights,ux,nx)
  data=bpy.data.meshes.new(aid+'_hand_'+side);data.from_pydata(vs,[],fs);data.update();obj=bpy.data.objects.new(aid+'_articulated_hand_'+side,data);bpy.context.collection.objects.link(obj)
  for m in mesh.data.materials:data.materials.append(m)
  layer=data.uv_layers.new(name='UVMap')
  for loop in data.loops:layer.data[loop.index].uv=uvs[loop.vertex_index]
  bm=bmesh.new();bm.from_mesh(data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(data);bm.free()
  for poly in data.polygons:poly.use_smooth=True
  groups={name:obj.vertex_groups.new(name=name) for name in {name for weights in ws for name in weights}}
  for i,weights in enumerate(ws):
   for name,weight in weights.items():groups[name].add([i],weight,'REPLACE')
  objects.append(obj)
 return objects

def body_skin(mesh,bones,s):
 heat=[{mesh.vertex_groups[g.group].name:g.weight for g in v.groups} for v in mesh.data.vertices]
 for g in list(mesh.vertex_groups):mesh.vertex_groups.remove(g)
 groups={name:mesh.vertex_groups.new(name=name) for name in bones}
 arm_fields={}
 if s.get('geodesicArms'):
  points=[G(v.co) for v in mesh.data.vertices];graph=[[] for p in points]
  for edge in mesh.data.edges:
   a,b=edge.vertices;distance=(points[a]-points[b]).length;graph[a].append((b,distance));graph[b].append((a,distance))
  seeds={'torso':[i for i,p in enumerate(points) if abs(p.x)<s['torsoWidth']*.62 and s['hipY']<p.y<s['shoulderY']+.01]}
  for side,sign in [('L',1),('R',-1)]:
   sh,el,wr=[Vector(v) for v in s['arms'][side]];seeds[side]=[]
   for t in [.15,.35,.55,.75,.95]:
    centre=lerp(sh,wr,t);candidates=[((p-centre).length_squared,i) for i,p in enumerate(points) if p.x*sign>centre.x*sign+.020 and abs(p.y-centre.y)<s['height']*.018]
    seeds[side].extend(i for d,i in sorted(candidates)[:8])
  for label,indices in seeds.items():
   distances=[float('inf')]*len(points);queue=[]
   for i in indices:distances[i]=0;heapq.heappush(queue,(0,i))
   while queue:
    distance,i=heapq.heappop(queue)
    if distance>distances[i]:continue
    for j,length in graph[i]:
     value=distance+length
     if value<distances[j]:distances[j]=value;heapq.heappush(queue,(value,j))
   arm_fields[label]=distances
 # Color tags distinguish cloth and backpack from the legs and arms behind them.
 colors={};image=next((n.image for n in mesh.active_material.node_tree.nodes if n.type=='TEX_IMAGE' and ('color' in n.name.lower() or 'color' in n.image.name.lower())),None)
 if image is None:image=next(n.image for n in mesh.active_material.node_tree.nodes if n.type=='TEX_IMAGE')
 pixels=list(image.pixels);iw,ih=image.size
 for loop in mesh.data.loops:
  uv=mesh.data.uv_layers.active.data[loop.index].uv;i=(min(ih-1,max(0,int(uv.y*ih)))*iw+min(iw-1,max(0,int(uv.x*iw))))*4;colors[loop.vertex_index]=pixels[i:i+3]
 counts={}
 for vertex in mesh.data.vertices:
  # Packed byte images expose encoded sRGB values here. Applying a second
  # display gamma made brown trousers qualify as cream apron fabric.
  p=G(vertex.co);x,y,z=p;side='L' if x>=0 else 'R';sign=1 if x>=0 else -1;r,g,b=colors[vertex.index];weights={};cr,cg,cb=r,g,b;white=min(cr,cg,cb)>.34 and max(cr,cg,cb)/max(.001,min(cr,cg,cb))<1.70;apron_color=white if s.get('apronTone')!='green' else cg>cr*.98 and cg>cb*1.10
  sh,el,wr=[Vector(v) for v in s['arms'][side]]
  if s.get('backpack') and y>s['hipY']+.035 and y<s['neckY']+.025 and (z<-.130 or y>.56 and abs(x)<.145 and r>g*1.65 and b>g*.60):
   weights={'backpack':1}
  elif y>s['neckY']-.010:
   t=smooth((y-(s['neckY']-.010))/.045);weights={'neck':1-t,'head':t}
  elif s.get('skirt') and not s.get('apron') and s['skirtHem']-.01<y<s['hipY']+.05 and abs(x)<s['skirtWidth'] and (r>g*1.05 and b>g*1.04 or s.get('solidSkirt') and y<s.get('skirtSolidTop',s['hipY']) and (abs(x)>s['hipX']+.065 or abs(z-s.get('bodyZ',0))>.095)):
   sector=('left' if x>0 else 'right') if abs(x)>abs(z-s.get('bodyZ',0)) else ('front' if z>s.get('bodyZ',0) else 'back');t=smooth((s['hipY']-y)/(s['hipY']-s['skirtHem']));weights={'pelvis':1-t*.80,'skirt_'+sector:t*.80}
  elif s.get('tunicHem') and s['tunicHem']-.01<y<s['hipY']+.12 and abs(x)<s.get('tunicWidth',.21) and g>r*1.12 and b>r*1.12:
   weights={'pelvis':.75,'spine_lower':.25}
  elif y<s['hipY']-.055 or y<s['hipY']+.015 and abs(x)<s.get('legRegionX',.21):
   knee=s['kneeY'];ankle=s['ankleY']
   if y<ankle:weights={'foot_'+side:1}
   elif y<ankle+s.get('ankleBlend',.080):
    t=smooth((y-ankle)/s.get('ankleBlend',.080));weights={'foot_'+side:1-t,'shin_'+side:t}
   else:
    band=s.get('kneeBlend',.14);t=smooth((y-knee+band/2)/band);weights={'shin_'+side:1-t,'thigh_'+side:t}
   if y>s.get('crotchFloor',s['hipY']-.13):
    vertical=smooth((y-(s['hipY']-.115))/.100)
    inseam=(1-smooth(abs(x)/(s['hipX']*s.get('crotchWidth',.65))))*smooth((y-s.get('crotchFloor',s['hipY']-.13))/s.get('crotchRamp',.10))
    pelvis=max(vertical,inseam);weights={n:w*(1-pelvis) for n,w in weights.items()};weights['pelvis']=pelvis
  else:
   d_arm,t_arm=seg(p,sh,el);d_fore,t_fore=seg(p,el,wr)
   # Separation plane follows the arm instead of giving torso vertices to a hand.
   height_t=max(0,min(1,(sh.y-y)/(sh.y-wr.y)))
   arm_x=lerp(sh.x,wr.x,height_t)*sign
   boundary=lerp(s['torsoWidth'],arm_x,s.get('armBoundary',.46))
   width=s.get('planarArmBlend',.035)
   arm_weight=smooth((abs(x)-boundary+width/2)/width) if y<sh.y+.040 else 0
   if arm_fields and y<sh.y+.04:
    da=arm_fields[side][vertex.index];dt=arm_fields['torso'][vertex.index]
    if math.isfinite(da) and math.isfinite(dt):arm_weight=smooth(.5+(dt-da)/s.get('armBlendWidth',.20))
    elif math.isfinite(da):arm_weight=1
    elif math.isfinite(dt):arm_weight=0
   if not s.get('heatArmBoundary') and abs(x)>s['torsoWidth']*.95 and min(d_arm,d_fore)<s['height']*.066 and y<sh.y-.045 and (r>g*1.12 or min(r,g,b)>.45):arm_weight=1
   if s.get('cuffEnvelope') and y<el.y+.025 and abs(x)>s['torsoWidth']+.045:arm_weight=1
   if s.get('bodyEnvelope') and y<el.y+.085 and abs(x)<s['torsoWidth']+.025:arm_weight=0
   if s.get('redTorso') and cr>cg*1.30 and cr>cb*1.40 and y<el.y+.04 and abs(x)<s.get('redTorsoWidth',.225):arm_weight=0
   if s.get('whiteCuffs') and white and abs(x)>s['torsoWidth']*.98 and min(d_arm,d_fore)<s['height']*.082 and wr.y-.015<y<el.y+.055:arm_weight=1
   if s.get('armCapsule'):
    arm_weight*=1-smooth((min(d_arm,d_fore)-s['height']*.040)/(s['height']*.040))
   if arm_weight>0:
    distance=d_arm+d_fore;fore=smooth((el.y-y+.070)/.140);hand=smooth((wr.y+.015-y)/.050)
    aw={'upper_arm_'+side:(1-fore)*(1-hand),'forearm_'+side:fore*(1-hand),'hand_'+side:hand}
    twist=max(0,min(.75,t_fore-.30));aw['forearm_twist_'+side]=aw['forearm_'+side]*twist;aw['forearm_'+side]*=1-twist
   else:aw={}
   torso_names=['pelvis','spine_lower','spine_upper','chest','neck'];scores=sorted([(seg(p,bones[n]['head'],bones[n]['tail'])[0],n) for n in torso_names])[:2]
   values=[1/max(.015,d)**3 for d,n in scores];total=sum(values);weights={n:v/total*(1-arm_weight) for (d,n),v in zip(scores,values)}
   for n,v in aw.items():weights[n]=v*arm_weight
   allowed=set(torso_names+['clavicle_'+side,'upper_arm_'+side,'forearm_'+side,'hand_'+side])
   hw={n:w for n,w in heat[vertex.index].items() if n in allowed and w>.0001}
   # Heat weights resolve curved sleeves and cuffs more faithfully than a flat
   # torso boundary. Explicit body/garment/foot masks above still prevent leaks.
   if hw and sum(hw.values())>.80 and not s.get('geometricArms'):
    weights=hw
    if 'forearm_'+side in weights:
     fraction=smooth((t_fore-.35)/.65)*.80;weights['forearm_twist_'+side]=weights['forearm_'+side]*fraction;weights['forearm_'+side]*=1-fraction
    if s.get('heatArmBoundary'):
     redirected=0
     for n in list(weights):
      if n.startswith(('upper_arm_','forearm_','hand_')):redirected+=weights[n]*(1-arm_weight);weights[n]*=arm_weight
     weights['chest']=weights.get('chest',0)+redirected
   if s.get('backpack'):
    factor=1-smooth((min(d_arm,d_fore)-.075)/.055);redirect=0
    for name in list(weights):
     if name.startswith(('clavicle_','upper_arm_','forearm_','hand_')):redirect+=weights[name]*(1-factor);weights[name]*=factor
    weights['chest']=weights.get('chest',0)+redirect
  if s.get('separateSleeves') and s['hipY']-.08<y<s['neckY']-.01:
   region=mesh.data.attributes['eq_limb_region'].data[vertex.index].value
   if region in [1,2]:
    side='L' if region==1 else 'R';sh,el,wr=[Vector(v) for v in s['arms'][side]];_,t_fore=seg(p,el,wr)
    elbowBand=s.get('elbowBlend',.14);fore=smooth((el.y-y+elbowBand/2)/elbowBand);band=s.get('wristBlend',.055);hand=smooth((wr.y+band*.48-y)/band);twist=smooth((t_fore-.30)/.70)*.65
    weights={'upper_arm_'+side:(1-fore)*(1-hand),'forearm_'+side:fore*(1-hand)*(1-twist),'forearm_twist_'+side:fore*(1-hand)*twist,'hand_'+side:hand}
   else:
    leaked=sum(weights.pop(n,0) for n in list(weights) if n.startswith(('clavicle_','upper_arm_','forearm_','hand_')));weights['chest']=weights.get('chest',0)+leaked
  if s.get('geometricArms') and y>s['hipY']-.05 and y<s['neckY']-.01:
   torso=sum(weights.pop(n,0) for n in ['pelvis','spine_lower','spine_upper','chest']);weights['chest']=torso
  if s.get('apron') and y<s['hipY']+.05:
   # A continuous depth envelope follows the independently measured apron
   # surface. Painted shadows must not create abrupt changes in skin weights.
   apronBand=s.get('apronBlend',.065);blend=smooth((z-s.get('apronZ',.075))/s.get('apronDepthBlend',.070))*smooth((y-(s['skirtHem']-apronBand*.6))/apronBand)*(1-smooth((abs(x)-s['skirtWidth']+.025)/.070))
   if blend>0:
    weights={n:w*(1-blend) for n,w in weights.items()};t=smooth((s['hipY']-y)/(s['hipY']-s['skirtHem']));weights['pelvis']=weights.get('pelvis',0)+blend*(1-t*.8);weights['skirt_front']=blend*t*.8
  if s.get('rearCoat') and y<s['hipY']+.06:
   blend=smooth((-z-.10)/.06)*smooth((y-.26)/.06)*smooth((b/max(.001,g)-.80)/.14)
   weights={n:w*(1-blend) for n,w in weights.items()};weights['pelvis']=weights.get('pelvis',0)+blend
  if s.get('separateSleeves') and mesh.data.attributes['eq_limb_region'].data[vertex.index].value==3:weights={'pelvis':1}
  weights=sorted([(n,w) for n,w in weights.items() if w>.00001],key=lambda pair:-pair[1])[:4];total=sum(w for n,w in weights)
  for name,w in weights:groups[name].add([vertex.index],w/total,'REPLACE');counts[name]=counts.get(name,0)+1
 if s.get('skinSmooth',0):
  adjacency=[set() for v in mesh.data.vertices]
  for edge in mesh.data.edges:
   a,b=edge.vertices;adjacency[a].add(b);adjacency[b].add(a)
  rows=[{mesh.vertex_groups[g.group].name:g.weight for g in v.groups} for v in mesh.data.vertices]
  for iteration in range(s['skinSmooth']):
   nxt=[]
   for v,neighbors,row in zip(mesh.data.vertices,adjacency,rows):
    p=G(v.co)
    low=s['ankleY']+.05 if s.get('smoothGarments') else s['hipY']+s.get('smoothLowerOffset',.06)
    if not neighbors or not (low<p.y<s['neckY']+.025 and p.z>-.130):nxt.append(row);continue
    out={n:w*.50 for n,w in row.items()}
    for j in neighbors:
     for n,w in rows[j].items():out[n]=out.get(n,0)+w*.50/len(neighbors)
    out={n:w for n,w in out.items() if w>.00001};total=sum(out.values());nxt.append({n:w/total for n,w in out.items()})
   rows=nxt
  for group in groups.values():group.remove(list(range(len(rows))))
  for i,row in enumerate(rows):
   row=dict(sorted(row.items(),key=lambda p:-p[1])[:4]);total=sum(row.values())
   for n,w in row.items():groups[n].add([i],w/total,'REPLACE')
 return counts

def detach_sleeve_seams(mesh,s):
 """Separate AI-fused sleeve/body contact, retaining painted outer surfaces.

 Closed inner sleeve linings cover the separation. Weight smoothing cannot
 carry a hand into a jacket hem because those surfaces no longer share vertices.
 """
 bm=bmesh.new();bm.from_mesh(mesh.data);regions=bm.faces.layers.int.new('eq_region');uvlayer=bm.loops.layers.uv.active
 image=next(n.image for n in mesh.active_material.node_tree.nodes if n.type=='TEX_IMAGE' and ('color' in n.name.lower() or 'color' in n.image.name.lower()));pixels=list(image.pixels);iw,ih=image.size
 for face in bm.faces:
  p=G(face.calc_center_median());side='L' if p.x>=0 else 'R';sh,el,wr=[Vector(v) for v in s['arms'][side]]
  t=max(0,min(1,(sh.y-p.y)/(sh.y-wr.y)));boundary=lerp(s['torsoWidth'],abs(lerp(sh,wr,t).x),s.get('armBoundary',.55))
  face[regions]=(1 if p.x>=0 else 2) if abs(p.x)>boundary and s['hipY']-.09<p.y<sh.y+.055 else 0
  if s.get('backpack') and p.z<-.11:face[regions]=0
  if s.get('rearCoat') and p.y<s['hipY']+.035 and p.y>.265 and p.z<.04 and abs(p.x)<s['skirtWidth']+.02:
   colors=[]
   for loop in face.loops:
    uv=loop[uvlayer].uv;index=(min(ih-1,max(0,int(uv.y*ih)))*iw+min(iw-1,max(0,int(uv.x*iw))))*4;colors.append(Vector(pixels[index:index+3]))
   r,g,b=sum(colors,Vector())/len(colors)
   if r>g*1.15 and b>g*.82:face[regions]=3
 edges=[e for e in bm.edges if len(e.link_faces)==2 and e.link_faces[0][regions]!=e.link_faces[1][regions]]
 bmesh.ops.split_edges(bm,edges=edges)
 # Cap only boundaries created by separating the sleeves, not cuff openings.
 cuts=[e for e in bm.edges if e.is_boundary and any(f[regions] for f in e.link_faces) and G((e.verts[0].co+e.verts[1].co)/2).y>s['hipY']+.05]
 if cuts:
  filled=bmesh.ops.holes_fill(bm,edges=cuts,sides=0).get('faces',[])
  for face in filled:
   neighbors=[f for v in face.verts for f in v.link_faces if f not in filled]
   side=max([f[regions] for f in neighbors] or [0]);face[regions]=side
   uv=sum((loop[uvlayer].uv for f in neighbors for loop in f.loops),Vector((0,0)))/max(1,sum(len(f.loops) for f in neighbors))
   for loop in face.loops:loop[uvlayer].uv=uv
 regionverts=bm.verts.layers.int.new('eq_limb_region')
 for v in bm.verts:v[regionverts]=max([f[regions] for f in v.link_faces] or [0])
 bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(mesh.data);bm.free();mesh.data.update()

def pose_matrices(arm,matrices):
 for pb in arm.pose.bones:
  kwargs={'invert':True}
  if pb.parent:kwargs.update(parent_matrix=matrices[pb.parent.name],parent_matrix_local=pb.parent.bone.matrix_local)
  pb.matrix_basis=pb.bone.convert_local_to_pose(matrices[pb.name],pb.bone.matrix_local,**kwargs)

def animate(arm,bones,hands,s,aid):
 rest={b.name:b.matrix_local.copy() for b in arm.data.bones};clips={};contacts={}
 modes=['idle','walk','carry_idle','carry_walk','start','stop','turn_left','turn_right','carry_start','carry_stop','carry_turn_left','carry_turn_right','handoff','open_hand','grip','pinch','cup','press']+s.get('actions',[])
 if aid=='pip':modes+=['jog','carry_jog']
 modes=list(dict.fromkeys(modes))
 for mode in modes:
  gait=mode.removeprefix('carry_');walk=gait in ['walk','jog','start','stop','turn_left','turn_right'];jog='jog' in mode
  carry='carry' in mode;duration=s['cycle']*(.72 if jog else 1) if walk else (3.6 if mode in ['idle','carry_idle'] else 4.8 if mode in s.get('actions',[]) or mode=='handoff' else 2.4)
  frames=round(duration*FPS);duration=frames/FPS;action=bpy.data.actions.new(aid+'_'+mode);action.use_fake_user=True;arm.animation_data_create();arm.animation_data.action=action
  samples=[]
  for frame in range(frames+1):
   phase=frame/frames;angle=phase*TAU;strength=1
   if gait=='start':strength=smooth(phase)
   if gait=='stop':strength=1-smooth(phase)
   if gait.startswith('turn_'):strength=math.sin(math.pi*phase)**2*.65
   drop=s['hipDrop']*(strength if walk else .18);bob=(.0035 if jog else .002)*(1-math.cos(angle*2)) if walk else .0012*math.sin(angle)
   shift=Vector((0,bob-drop,0));matrices={n:Matrix.Translation(B(shift))@m for n,m in rest.items()};matrices['root']=rest['root'].copy()
   def aim(name,head,tail,normal=None):
    rd=B(bones[name]['tail']-bones[name]['head']).normalized();td=B(tail-head).normalized();rotation=rd.rotation_difference(td).to_matrix()
    if normal is not None:
     source_normal=B((0,0,1));a=rotation@source_normal;a=(a-td*a.dot(td)).normalized();b=B(normal);b=(b-td*b.dot(td)).normalized()
     theta=math.atan2(td.dot(a.cross(b)),a.dot(b));rotation=Quaternion(td,theta).to_matrix()@rotation
    matrices[name]=Matrix.Translation(B(head))@(rotation@rest[name].to_3x3()).to_4x4()
   feet={}
   for side,sign in [('L',1),('R',-1)]:
    hip=bones['thigh_'+side]['head']+shift;ankle0=bones['foot_'+side]['head'];fp=(phase+(0 if side=='L' else .5))%1;stance=not walk or fp<.60
    stride=s['stride']*strength*(1.2 if jog else 1);lift=0;z=ankle0.z
    if walk:
     if stance:z+=stride*(.5-fp/.60)
     else:t=(fp-.60)/.40;z+=stride*(smooth(t)-.5);lift=s['lift']*(1.6 if jog else 1)*math.sin(t*math.pi)**2*strength
    target=Vector((ankle0.x,ankle0.y+lift,z));a=(bones['thigh_'+side]['tail']-bones['thigh_'+side]['head']).length;b=(bones['shin_'+side]['tail']-bones['shin_'+side]['head']).length
    knee,ankle=ik(hip,target,a,b,Vector((0,0,1)));aim('thigh_'+side,hip,knee);aim('shin_'+side,knee,ankle)
    for name in ['foot_'+side,'toe_'+side]:matrices[name]=Matrix.Translation(B(ankle-ankle0))@rest[name]
    if walk and not stance:
     toe='toe_'+side;hinge=B(bones[toe]['head']+ankle-ankle0);angleToe=.12*math.sin((fp-.6)/.4*math.pi)
     matrices[toe]=Matrix.Translation(hinge)@Quaternion((1,0,0),angleToe).to_matrix().to_4x4()@Matrix.Translation(-B(bones[toe]['head']))@rest[toe]
    feet[side]={'stance':stance,'ankle':list(ankle),'knee':list(knee),'hip':list(hip),'target':list(target)}
    sh=bones['upper_arm_'+side]['head']+shift;el0=bones['forearm_'+side]['head'];wr0=bones['hand_'+side]['head'];a=(el0-bones['upper_arm_'+side]['head']).length;b=(wr0-el0).length
    hand_direction=Vector((sign*.06,-1,.03)).normalized();normal=Vector((0,0,1));grip=0;pinch=0;cup=0;press=0
    wrist=sh+Vector((sign*.042,-(a+b)*.93,-.006));pole=Vector((sign*.30,-.1,-1))
    pulse=math.sin(math.pi*phase)**2;active=gait not in ['idle','walk','jog','start','stop','turn_left','turn_right']
    if carry or active:
     forward=min((a+b)*.63,s['height']*.16);wrist=sh+Vector((-sign*.035,-(a+b)*.44,forward));pole=Vector((sign*.7,-.8,-.4));hand_direction=Vector((sign*.06,.02,1)).normalized();normal=Vector((0,1,0));cup=.55
     if active:
      amount=.20+.80*pulse;wrist=lerp(sh+Vector((sign*.04,-(a+b)*.90,0)),wrist,amount)
      if mode in ['grip','post','tile','roof','bread','flute']:grip=amount;cup=0;normal=Vector((-sign,0,0));hand_direction=Vector((0,-.05,1)).normalized()
      elif mode in ['pinch','tie','wing','tape','cards','memory','write','book']:pinch=amount;cup=0;normal=Vector((-sign,.35,.1)).normalized();wrist.y+=s['height']*.017*math.sin(angle+(0 if side=='L' else math.pi))
      elif mode in ['press','dough','plant']:press=amount;cup=0;normal=Vector((0,-1,0));wrist.y-=s['height']*.035*pulse
      if mode=='handoff':wrist.z+=s['height']*.045*pulse
      if mode=='flute':wrist.y+=s['height']*.12;wrist.z-=s['height']*.025;normal=Vector((0,-1,0));hand_direction=Vector((-sign,0,0));grip=.50
      # Scene actions have their own reachable targets and timed grips. They
      # remain authored clip data; no animation can transfer a game possession.
      if mode=='post':
       wrist=sh+Vector((-sign*.025,-(a+b)*.39-.075*smooth(phase),forward));normal=Vector((-sign,0,0));grip=.32*(1-smooth((phase-.65)/.25));cup=0
      elif mode=='tie':
       wrist=sh+Vector((-sign*.035,-(a+b)*.48,forward));wrist.x+=.035*math.sin(angle)*(1 if side=='R' else .20);wrist.z+=.030*math.cos(angle)*(1 if side=='R' else .20);pinch=.85;cup=0
      elif mode in ['tile','roof','bread']:
       wrist.x=sign*(.12 if mode!='book' else .16);wrist.y=sh.y-(a+b)*.50-.025*smooth(phase);normal=Vector((0,1,0));hand_direction=Vector((-sign*.25,0,1)).normalized();cup=.45;grip=0
      elif mode=='book':
       wrist.x=sign*.12;wrist.y=sh.y-(a+b)*.50;normal=Vector((-1,.20,0)) if side=='R' else Vector((0,-1,0));hand_direction=Vector((0,0,1));pinch=.85 if side=='R' else 0;press=1 if side=='L' else 0;cup=0;grip=0
      elif mode=='dough':
       wrist.x=sign*.09;wrist.y=sh.y-(a+b)*.58-.024*math.sin(angle*2)**2;wrist.z=sh.z+forward+.025*math.sin(angle*2);normal=Vector((0,-1,0));hand_direction=Vector((0,0,1));press=1;cup=0
      elif mode=='seed_load':
       reach=smooth(phase/.60)*(1-smooth((phase-.70)/.30));wrist=sh+Vector((-sign*.035,-(a+b)*.50-.06*reach,forward*(.60+.30*reach)));hand_direction=Vector((0,0,1));normal=Vector((0,1,0));cup=.62*(1-smooth((phase-.60)/.12));grip=0;pinch=0
      elif mode in ['wing','tape','cards','memory','write']:
       wrist.y=sh.y-(a+b)*.49;wrist.z=sh.z+forward;wrist.x=sign*.10+.028*math.sin(angle)*(1 if side=='R' else .12);pinch=.85;cup=0
      if mode=='flute':
       wrist.x=.066 if side=='L' else -.051;wrist.y=s['neckY']-.052;wrist.z=s.get('bodyZ',0)+s['height']*.15-.05;normal=Vector((0,-1,0));hand_direction=Vector((0,0,1));grip=.25
     if carry and side=='L':
      wrist=sh+Vector((sign*.045,-(a+b)*.91,0));hand_direction=Vector((sign*.06,-1,.03)).normalized();normal=Vector((0,0,1));cup=0
    elif walk:
     swing=-math.cos(angle+(0 if side=='L' else math.pi))*.30*strength;rot=Quaternion((1,0,0),swing);wrist=sh+rot@(wrist-sh);hand_direction=rot@hand_direction
    elbow,wrist=ik(sh,wrist,a,b,pole);aim('upper_arm_'+side,sh,elbow);aim('forearm_'+side,elbow,wrist)
    # Wrist orientation is shared progressively with the distal forearm.
    tw=lerp(elbow,wrist,.68);aim('forearm_twist_'+side,tw,wrist,normal if carry or active else None)
    aim('hand_'+side,wrist,wrist+hand_direction*hands[side]['palm'],normal)
    for digit,f in hands[side]['fingers'].items():
     for index,name in enumerate(f['names']):
      d=(bones[name]['tail']-bones[name]['head']).normalized();axis=B(d.cross(hands[side]['n']).normalized());local_axis=rest[name].to_3x3().inverted()@axis
      curl=.08+grip*[1.02,1.15,.65][index]+cup*[.35,.70,.50][index]
      if pinch:curl+=pinch*([.65,1.20,.40][index] if digit=='index' else [.20,.40,.30][index])
      if digit=='thumb':curl=.08+grip*[.60,.70,.55][index]+pinch*[.88,.75,.60][index]+cup*.20
      if press or mode=='open_hand':curl=.025
      parent=bones[name]['parent'];matrices[name]=matrices[parent]@rest[parent].inverted()@rest[name]@Quaternion(local_axis,curl).to_matrix().to_4x4()
     tip=f'{digit}_tip_{side}';parent=bones[tip]['parent'];matrices[tip]=matrices[parent]@rest[parent].inverted()@rest[tip]
    if pinch or grip:
     # Oppose the thumb through all three joints toward the index rather than
     # curling it in parallel with the fingers. FABRIK preserves bone lengths.
     chain=hands[side]['fingers']['thumb']['names'];tip='thumb_tip_'+side
     points=[matrices[n].translation.copy() for n in chain]+[matrices[tip].translation.copy()];lengths=[(bones[n]['tail']-bones[n]['head']).length for n in chain];basepoint=points[0].copy()
     goal=matrices['index_tip_'+side if pinch else 'index_middle_'+side].translation.copy();normalWorld=matrices['hand_'+side].to_3x3()@rest['hand_'+side].to_3x3().inverted()@B(hands[side]['n']);goal+=normalWorld.normalized()*(.004 if pinch else .009)
     target=points[-1].lerp(goal,min(1,max(pinch,grip)))
     for iteration in range(14):
      points[-1]=target.copy()
      for j in range(2,-1,-1):points[j]=points[j+1]+(points[j]-points[j+1]).normalized()*lengths[j]
      points[0]=basepoint.copy()
      for j in range(3):points[j+1]=points[j]+(points[j+1]-points[j]).normalized()*lengths[j]
     for j,name in enumerate(chain):aim(name,G(points[j]),G(points[j+1]))
     matrices[tip]=matrices[chain[-1]]@rest[chain[-1]].inverted()@rest[tip]
    if mode=='book':
     # Jo pinches the near edge of an actual page. The left palm supports the
     # facing page. Release at the top of the turn lets the sheet settle over.
     by=s['shoulderY']-(a+b)*.5-.07;turn=math.pi*smooth((phase-.12)/.70)
     if side=='R':
      curve=.027*math.sin((.23-.013)/.377*math.pi)
      desired=Vector((-.23*math.cos(turn)+curve*math.sin(turn),by+.0518+curve*math.cos(turn)+.23*math.sin(turn),.096))
      if phase>.52:desired=lerp(desired,Vector((-.23,by+.080,.096)),smooth((phase-.52)/.22))
      contact=(matrices['thumb_tip_R'].translation+matrices['index_tip_R'].translation)*.5
     else:
      desired=Vector((.13,by+.075,.16));contact=matrices['hand_L']@rest['hand_L'].inverted()@B(hands[side]['wrist']+hands[side]['d']*hands[side]['palm']*.65+hands[side]['n']*.012)
     oldHand=matrices['hand_'+side].copy();desiredWrist=wrist+desired-G(contact);elbow,wrist=ik(sh,desiredWrist,a,b,pole)
     aim('upper_arm_'+side,sh,elbow);aim('forearm_'+side,elbow,wrist);tw=lerp(elbow,wrist,.68);aim('forearm_twist_'+side,tw,wrist,normal);aim('hand_'+side,wrist,wrist+hand_direction*hands[side]['palm'],normal)
     transfer=matrices['hand_'+side]@oldHand.inverted()
     for digit,f in hands[side]['fingers'].items():
      for name in f['names']+[digit+'_tip_'+side]:matrices[name]=transfer@matrices[name]
   if mode=='flute':
    # Six real tone-hole targets on the authored flute, in its horizontal
    # finger-placement fixture. Each three-link finger is solved independently.
    for side,holes in [('R',[-.012,-.051,-.090]),('L',[.027,.066,.105])]:
     for digit,hole in zip(['index','middle','ring'],holes):
      chain=hands[side]['fingers'][digit]['names'];tip=digit+'_tip_'+side;points=[matrices[n].translation.copy() for n in chain]+[matrices[tip].translation.copy()];lengths=[(bones[n]['tail']-bones[n]['head']).length for n in chain];basepoint=points[0].copy();target=B((hole,s['neckY']-.073,s.get('bodyZ',0)+s['height']*.15));target=points[-1].lerp(target,.65+.35*math.sin(phase*math.pi)**2)
      for iteration in range(18):
       points[-1]=target.copy()
       for j in range(2,-1,-1):points[j]=points[j+1]+(points[j]-points[j+1]).normalized()*lengths[j]
       points[0]=basepoint.copy()
       for j in range(3):points[j+1]=points[j]+(points[j+1]-points[j]).normalized()*lengths[j]
      for j,name in enumerate(chain):aim(name,G(points[j]),G(points[j+1]))
      matrices[tip]=matrices[chain[-1]]@rest[chain[-1]].inverted()@rest[tip]
   for name in bones:
    if name.startswith('skirt_'):
     hinge=B(bones[name]['head']+shift);rotation=Quaternion((1,0,0),.035*math.sin(angle) if walk else 0);matrices[name]=Matrix.Translation(hinge)@rotation.to_matrix().to_4x4()@Matrix.Translation(-B(bones[name]['head']))@rest[name]
   pose_matrices(arm,matrices)
   for pb in arm.pose.bones:
    pb.keyframe_insert('location',frame=frame);pb.keyframe_insert('rotation_quaternion',frame=frame)
   samples.append({'time':frame/FPS,'feet':feet})
  for layer in action.layers:
   for strip in layer.strips:
    for bag in strip.channelbags:
     for curve in bag.fcurves:
      for key in curve.keyframe_points:key.interpolation='LINEAR'
  clips[mode]={'name':action.name,'duration':duration,'cycleDistance':s['stride']*(1.2 if jog else 1)/.60 if walk else 0,'rootMotion':False,'role':mode,'loop':mode in ['idle','walk','carry_idle','carry_walk','jog','carry_jog']};contacts[mode]=samples
 arm.animation_data.action=None
 for b in arm.pose.bones:b.matrix_basis.identity()
 bpy.context.view_layer.update();return clips,contacts

def build(aid):
 specfile=LIB/'fits'/(aid+'.json');s=json.loads(specfile.read_text());target=LIB/'models'/aid;target.mkdir(parents=True,exist_ok=True);archive(target)
 job=json.loads((LIB/'sources'/aid/'provenance.json').read_text());source=pathlib.Path(job['result']['model_file']);original=sha(source)
 bpy.ops.wm.open_mainfile(filepath=str(LIB/'intake'/aid/(aid+'-normalized.blend')))
 bpy.context.scene.render.fps=FPS
 meshes=[o for o in bpy.context.scene.objects if o.type=='MESH'];assert len(meshes)==1,'Fit expects a single preserved source mesh'
 mesh=meshes[0];mesh.name=aid+'_painted_body';shift=s.get('origin',[0,0,0]);rot=Matrix.Rotation(s.get('yaw',0),4,'Z');mesh.data.transform(rot@Matrix.Translation(-B(shift)))
 source_uv_mesh=mesh.data.copy() if s.get('projectKneeUV') else None
 # Add real bending geometry across knee bands; retain interpolated source UVs.
 bm=bmesh.new();bm.from_mesh(mesh.data)
 if not s.get('preserveUVVertices'):bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.000001)
 for y in [s['kneeY']-.020,s['kneeY'],s['kneeY']+.020]:
  faces=[f for f in bm.faces if min(v.co.z for v in f.verts)<y<max(v.co.z for v in f.verts) and max(v.co.z for v in f.verts)<s['hipY']]
  edges={e for f in faces for e in f.edges};verts={v for f in faces for v in f.verts}
  if faces:bmesh.ops.bisect_plane(bm,geom=list(verts)+list(edges)+faces,plane_co=(0,0,y),plane_no=(0,0,1),dist=.000001)
 bm.to_mesh(mesh.data);bm.free();mesh.data.update()
 if source_uv_mesh:
  # Bisecting faces must preserve the original painted surface, including UV
  # seams. Project added knee loops onto the original triangle's UV plane.
  source_uv_mesh.calc_loop_triangles();triangles=list(source_uv_mesh.loop_triangles);points=[v.co.copy() for v in source_uv_mesh.vertices];tree=BVHTree.FromPolygons(points,[tuple(t.vertices) for t in triangles],all_triangles=True);uv=source_uv_mesh.uv_layers.active.data
  for poly in mesh.data.polygons:
   if not any(abs(mesh.data.vertices[i].co.z-s['kneeY'])<.042 for i in poly.vertices):continue
   centre=sum((mesh.data.vertices[i].co for i in poly.vertices),Vector())/len(poly.vertices);_,_,face,_=tree.find_nearest(centre)
   tri=triangles[face];a,b,c=[points[i] for i in tri.vertices];ua,ub,uc=[Vector((*uv[i].uv,0)) for i in tri.loops]
   for li in poly.loop_indices:mesh.data.uv_layers.active.data[li].uv=barycentric_transform(mesh.data.vertices[mesh.data.loops[li].vertex_index].co,a,b,c,ua,ub,uc).xy
  bpy.data.meshes.remove(source_uv_mesh)
 for p in mesh.data.polygons:p.use_smooth=True
 foot_alignment=align_shoes(mesh,s)
 bones,hands=make_bones(s);hand_objects=replace_hands(mesh,hands,s,aid)
 if s.get('recalculateEditedNormals') and mesh.data.has_custom_normals:
  mesh.data.normals_split_custom_set([(0,0,0)]*len(mesh.data.loops));mesh.data.update()
 if s.get('separateSleeves'):detach_sleeve_seams(mesh,s)
 arm=armature(bones,aid)
 bpy.ops.object.select_all(action='DESELECT');mesh.select_set(True);arm.select_set(True);bpy.context.view_layer.objects.active=arm
 for bone in arm.data.bones:bone.use_deform=not any(part in bone.name for part in ['thumb','index','middle_','ring_','little','_tip_','forearm_twist','backpack','skirt_']) and bone.name!='root'
 bpy.ops.object.parent_set(type='ARMATURE_AUTO')
 for bone in arm.data.bones:bone.use_deform=True
 counts=body_skin(mesh,bones,s)
 for obj in [mesh,*hand_objects]:
  obj.parent=arm;modifier=next((m for m in obj.modifiers if m.type=='ARMATURE'),None) or obj.modifiers.new('Anatomical skin','ARMATURE');modifier.object=arm;modifier.use_deform_preserve_volume=False
 clips,contacts=animate(arm,bones,hands,s,aid)
 bpy.context.scene.frame_set(0);bpy.ops.wm.save_as_mainfile(filepath=str(target/(aid+'-articulated.blend')))
 output=target/(aid+'-review.glb')
 bpy.ops.export_scene.gltf(filepath=str(output),export_format='GLB',export_image_format='AUTO',export_keep_originals=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_merge_animation='ACTION',export_rest_position_armature=True,export_reset_pose_bones=True,export_skins=True,export_def_bones=False,export_extras=True)
 # The source image buffers stay byte-identical. Blender's packed-image export
 # can omit linked materials; restore those buffers and their exact PBR bindings.
 original_images=_helpers.restore_images(source,output)
 assert sha(source)==original,'Source was modified'
 hand_meta={}
 for side,d in hands.items():
  rest=arm.data.bones['hand_'+side].matrix_local
  hand_meta[side]={'wrist':'hand_'+side,'palm':list(rest.inverted()@B(d['wrist']+d['d']*d['palm']*.65+d['n']*.012)),'normal':list(rest.to_3x3().inverted()@B(d['n'])),'digits':{k:{'joints':v['names'],'tip':k+'_tip_'+side} for k,v in d['fingers'].items()},'gripProfiles':['open','grip','pinch','cup','press']}
 points=[G(v.co) for o in [mesh,*hand_objects] for v in o.data.vertices];low=[min(p[i] for p in points) for i in range(3)];high=[max(p[i] for p in points) for i in range(3)]
 meta={'schema':'eq.articulated-model.v1','asset':aid,'file':output.name,'sha256':sha(output),'sourceSha256':original,'source':str(source.relative_to(ROOT)).replace('\\','/'),'fitSha256':sha(specfile),'referenceSha256':job['referenceSha256'],'reviewOnly':True,'formApproval':'PENDING','productionExport':False,'units':'metres','up':'+Y','forward':'+Z','dimensions':[high[i]-low[i] for i in range(3)],'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in [mesh,*hand_objects]),'bones':{n:{'head':list(b['head']),'tail':list(b['tail']),'parent':b['parent']} for n,b in bones.items()},'hands':hand_meta,'clips':clips,'weightCounts':counts,'cleanup':['Distal hand geometry locally rebuilt with separate fingers and opposing thumbs','Knee bending rings preserve source UV interpolation','All skin weights rebuilt locally','High quality Tripo source preserved unchanged'],'editableSource':aid+'-articulated.blend','additionalRiggingCredits':0}
 meta['originalImages']=original_images
 meta['footAlignment']=foot_alignment
 (target/'model.json').write_text(json.dumps(meta,indent=2)+'\n');(target/'contact-targets.json').write_text(json.dumps(contacts,separators=(',',':'))+'\n')
 print('ARTICULATED '+json.dumps({'asset':aid,'triangles':meta['triangles'],'bones':len(bones),'clips':len(clips),'sha256':meta['sha256']}))
if __name__=='__main__':
 for aid in sys.argv[sys.argv.index('--')+1:]:build(aid)
