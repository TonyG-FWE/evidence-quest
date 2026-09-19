"""Editable local model tools for the approved Evidence Quest reference library.

Coordinates at the public authoring boundary are metres, Y up, +Z forward.
Only review GLBs are written. Each mesh stays a named, separable component.
"""
import bpy,math,random,pathlib,json,hashlib,datetime,shutil,struct
import numpy as np
from mathutils import Vector
ROOT=pathlib.Path.cwd();LIB=ROOT/'evidence/hands-on-20260916/pilot/articulated-library-20260917';REF=LIB.parent/'reference-library-20260917'
TAU=math.tau;M={};ASSET=None;PARENT=None;STATES=[];ANCHORS={};CLIPS={};WORLD='Village'
COLORS={'paper':'ead9b7','wood':'a9703c','woodlight':'ce9b5d','wooddark':'674a32','teal':'327c7d','green':'657949','leaf':'7d9654','leaflight':'a4af68','cream':'ede4d0','coral':'c96348','red':'994735','purple':'775676','blue':'567b86','navy':'374958','iron':'4e5652','glass':'719baf','rubber':'313b3c','soil':'74503a','earth':'a9855d','stone':'9a9a80','grass':'899c58','water':'72a5aa','flour':'f1dfb0','crust':'ac6d31','crumb':'ddba7d','white':'f6edda','gold':'d9b96d'}
def V(p):return Vector((p[0],-p[2],p[1]))
def game(p):return (p.x,p.z,-p.y)
def sha(p):return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
def linear(v):return v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4
def rgb(code):return tuple(linear(int(code[i:i+2],16)/255) for i in (0,2,4))
def material(key,color=None,texture=True,rough=.80,metal=0,alpha=1):
 name=WORLD+'_'+key
 if name in M:return M[name]
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');c=rgb(color or COLORS.get(key,'d5b98c'));p.inputs['Base Color'].default_value=(*c,alpha);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 m.diffuse_color=(*c,alpha)
 if texture and key not in ['glass','water','rubber','iron']:
  # Deterministic woven/wood/paper albedo; small-scale texture is separate from
  # silhouette construction. Embedded images survive GLB without shader tricks.
  n=256;y,x=np.mgrid[0:n,0:n];rng=np.random.default_rng(sum(map(ord,name)));noise=rng.normal(0,.019,(n,n))
  if 'wood' in key:grain=.038*np.sin(x*.23+np.sin(y*.031)*2)+.025*np.sin(x*.74+np.sin(y*.08));noise+=grain
  elif WORLD=='Village':noise+=.018*np.sin(x*.71+y*.31)+.014*np.cos(x*.21-y*.93)
  else:noise+=.012*((x%4==0)+(y%4==0))
  encoded=np.array([int((color or COLORS.get(key,'d5b98c'))[i:i+2],16)/255 for i in (0,2,4)])
  pix=np.ones((n,n,4),dtype=np.float32);pix[:,:,:3]=np.clip(encoded[None,None,:]*(1+noise[:,:,None]),.001,1)
  im=bpy.data.images.new(name+'_paint',width=n,height=n,alpha=True);im.colorspace_settings.name='sRGB';im.pixels.foreach_set(pix.ravel());im.pack()
  tex=m.node_tree.nodes.new('ShaderNodeTexImage');tex.image=im;m.node_tree.links.new(tex.outputs['Color'],p.inputs['Base Color'])
 if key=='glass':p.inputs['Transmission Weight'].default_value=.65;p.inputs['Roughness'].default_value=.10;p.inputs['IOR'].default_value=1.45
 M[name]=m;return m
def finish(o,name,mat='wood',parent=None,smooth=False):
 o.name=name
 if mat:o.data.materials.append(material(mat) if isinstance(mat,str) else mat)
 o.parent=parent if parent is not None else PARENT
 if smooth and o.type=='MESH':
  for p in o.data.polygons:p.use_smooth=True
 return o
def group(name,at=(0,0,0),parent=None):
 o=bpy.data.objects.new(name,None);bpy.context.collection.objects.link(o);o.location=V(at);o.parent=parent if parent is not None else PARENT;return o
def anchor(name,point,normal=(0,0,1),purpose='attachment'):
 o=group('anchor_'+name,point);o['purpose']=purpose;ANCHORS[name]={'node':o.name,'position':list(point),'normal':list(normal),'purpose':purpose};return o
def state(name,label=None):
 global PARENT
 PARENT=group('state_'+name,parent=bpy.data.objects.get(ASSET+'_root'));STATES.append({'id':name,'label':label or name.replace('_',' '),'nodes':[PARENT.name]});return PARENT
def base():
 global PARENT
 PARENT=bpy.data.objects[ASSET+'_root']
def cube(name,at,size,mat='wood',bevel=.008,parent=None,rot=None):
 bpy.ops.mesh.primitive_cube_add(size=1,location=V(at));o=bpy.context.object;o.scale=(size[0],size[2],size[1]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  mod=o.modifiers.new('Soft crafted edges','BEVEL');mod.width=min(bevel,min(size)*.25);mod.segments=6 if WORLD=='Sparkfest' else 3;mod.harden_normals=True;bpy.ops.object.modifier_apply(modifier=mod.name)
  for poly in o.data.polygons:poly.use_smooth=True
  mod=o.modifiers.new('Broad surface normals','WEIGHTED_NORMAL');mod.keep_sharp=True;bpy.ops.object.modifier_apply(modifier=mod.name)
 if rot:o.rotation_euler=rot
 return finish(o,name,mat,parent)
def ellipsoid(name,at,size,mat='leaf',segments=20,rings=12):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=segments,ring_count=rings,radius=1,location=V(at));o=bpy.context.object;o.scale=(size[0],size[2],size[1]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);return finish(o,name,mat,smooth=True)
def cylinder(name,at,radius,depth,mat='wood',axis=(0,1,0),vertices=24,cap=True):
 bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,end_fill_type='NGON' if cap else 'NOTHING',location=V(at));o=bpy.context.object;o.rotation_mode='QUATERNION';o.rotation_quaternion=V((0,1,0)).rotation_difference(V(axis).normalized());return finish(o,name,mat,smooth=True)
def beam(name,a,b,width=.04,mat='wood'):
 a,b=Vector(a),Vector(b);o=cube(name,(a+b)/2,(width,(b-a).length,width),mat,width*.15);o.rotation_mode='QUATERNION';o.rotation_quaternion=V((0,1,0)).rotation_difference(V(b-a));return o
def tube(name,points,r=.008,mat='rope',closed=False):
 c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.resolution_u=5 if len(points)>30 else 12;c.bevel_depth=r;c.bevel_resolution=3;s=c.splines.new('BEZIER');s.bezier_points.add(len(points)-1)
 for p,co in zip(s.bezier_points,points):p.co=V(co);p.handle_left_type='AUTO';p.handle_right_type='AUTO'
 s.use_cyclic_u=closed;o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o=bpy.context.object;o.select_set(False);return finish(o,name,'earth' if mat=='rope' else mat,smooth=True)
def ring(name,at,radius,tube_r=.008,mat='wood',axis=(0,1,0)):
 bpy.ops.mesh.primitive_torus_add(major_segments=40,minor_segments=10,location=V(at),major_radius=radius,minor_radius=tube_r);o=bpy.context.object;o.rotation_mode='QUATERNION';o.rotation_quaternion=V((0,1,0)).rotation_difference(V(axis).normalized());return finish(o,name,mat,smooth=True)
def mesh(name,vertices,faces,mat='paper',thickness=0):
 d=bpy.data.meshes.new(name);d.from_pydata([V(v) for v in vertices],[],faces);d.update();o=bpy.data.objects.new(name,d);bpy.context.collection.objects.link(o);finish(o,name,mat)
 # World-planar UVs give consistent fibre and grain density across unique parts.
 uv=d.uv_layers.new(name='UVMap')
 for loop in d.loops:
  p=d.vertices[loop.vertex_index].co;uv.data[loop.index].uv=(p.x*2,p.y*2+p.z*.71)
 if thickness:
  bpy.context.view_layer.objects.active=o;mod=o.modifiers.new('Material thickness','SOLIDIFY');mod.thickness=thickness;bpy.ops.object.modifier_apply(modifier=mod.name)
 return o
def lathe(name,profile,mat='cream',at=(0,0,0),segments=40):
 vs=[];fs=[]
 for radius,y in profile:
  for i in range(segments):a=i*TAU/segments;vs.append((at[0]+radius*math.cos(a),at[1]+y,at[2]+radius*math.sin(a)))
 for j in range(len(profile)-1):
  for i in range(segments):a=j*segments+i;b=j*segments+(i+1)%segments;fs.append((a,b,b+segments,a+segments))
 o=mesh(name,vs,fs,mat)
 for p in o.data.polygons:p.use_smooth=True
 return o
def leaf(name,a,b,width=.045,mat='leaf'):
 if WORLD=='Sparkfest':
  a,b=Vector(a),Vector(b);d=b-a;u=Vector((d.z,0,-d.x)).normalized();vs=[];n,m=16,8
  for j in range(n+1):
   t=j/n;centre=a+d*t+Vector((0,0,.025*math.sin(t*math.pi)))
   for i in range(m+1):v=(i/m-.5)*2;vs.append(centre+u*(width*math.sin(t*math.pi)**.75*v)+Vector((0,0,.010*(1-v*v)*math.sin(t*math.pi))))
  o=mesh(name,vs,[(j*(m+1)+i,j*(m+1)+i+1,(j+1)*(m+1)+i+1,(j+1)*(m+1)+i) for j in range(n) for i in range(m)],mat,.001)
  for poly in o.data.polygons:poly.use_smooth=True
  tube(name+'_vein',[a,a+d*.5+Vector((0,0,.034)),b],.0012,'green');return o
 a,b=Vector(a),Vector(b);d=b-a;u=d.cross(Vector((0,0,1))).normalized()
 if u.length<.1:u=Vector((1,0,0))
 mid=(a+b)/2;vs=[a,a+d*.25-u*width*.75,mid-u*width,a+d*.8-u*width*.55,b,a+d*.8+u*width*.55,mid+u*width,a+d*.25+u*width*.75,mid+Vector((0,0,.014))]
 o=mesh(name,vs,[(i,(i+1)%8,8) for i in range(8)],mat,.002);tube(name+'_vein',[a,mid+Vector((0,0,.015)),b],.0018,'green');return o
def planks(name,width,length,y=0,step=.14,mat='wood',z=0):
 count=math.ceil(length/step)
 for n in range(count):cube(name+'_'+str(n),(0,y,z-length/2+(n+.5)*length/count),(width,.055,length/count-.006),mat,.009)
def bolts(points,r=.009):
 for i,p in enumerate(points):cylinder('pegged_joint_'+str(i),p,r,.009,'iron',axis=(0,0,1),vertices=12)
def archive(target):
 if (target/'model.json').exists():
  stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ');dest=LIB/'local-history'/target.name/stamp;dest.mkdir(parents=True)
  for p in target.iterdir():
   if p.is_file():shutil.copy2(p,dest/p.name)
def preserve_source_textures(source,output):
 def read(p):
  raw=pathlib.Path(p).read_bytes();n=struct.unpack_from('<I',raw,12)[0];return json.loads(raw[20:20+n]),raw[28+n:]
 original,orig_bin=read(source);doc,bin=read(output);payload=bytearray(bin);images=doc.setdefault('images',[]);textures=doc.setdefault('textures',[]);samplers=doc.setdefault('samplers',[]);io,to,so=len(images),len(textures),len(samplers);evidence=[]
 for im in original.get('images',[]):
  view=original['bufferViews'][im['bufferView']];raw=orig_bin[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']];payload.extend(b'\0'*(-len(payload)%4));doc['bufferViews'].append({'buffer':0,'byteOffset':len(payload),'byteLength':len(raw)});payload.extend(raw);images.append({**im,'bufferView':len(doc['bufferViews'])-1});evidence.append({'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw)})
 samplers.extend(original.get('samplers',[]))
 for tex in original.get('textures',[]):textures.append({**tex,'source':tex['source']+io,**({'sampler':tex['sampler']+so} if 'sampler' in tex else{})})
 byname={m.get('name'):m for m in original.get('materials',[])}
 def shift(node):
  if isinstance(node,dict):
   for key,val in node.items():
    if key.endswith('Texture') and isinstance(val,dict) and 'index' in val:val['index']+=to
    else:shift(val)
  elif isinstance(node,list):
   for val in node:shift(val)
 for index,m in enumerate(doc['materials']):
  if m.get('name') in byname:replacement=json.loads(json.dumps(byname[m['name']]));shift(replacement);doc['materials'][index]=replacement
 doc['buffers']=[{'byteLength':len(payload)}];payload.extend(b'\0'*(-len(payload)%4));txt=json.dumps(doc,separators=(',',':')).encode();txt+=b' '*(-len(txt)%4);pathlib.Path(output).write_bytes(struct.pack('<III',0x46546c67,2,28+len(txt)+len(payload))+struct.pack('<II',len(txt),0x4e4f534a)+txt+struct.pack('<II',len(payload),0x004e4942)+payload);return evidence
def reset(asset):
 global ASSET,WORLD,PARENT,STATES,ANCHORS,CLIPS,M
 bpy.ops.wm.read_factory_settings(use_empty=True);ASSET=asset['id'];WORLD=asset['visualWorld'];STATES=[];ANCHORS={};CLIPS={};M={};PARENT=None;random.seed(ASSET);PARENT=group(ASSET+'_root');bpy.context.scene.render.fps=30
def export(asset,recipe,extra=None):
 folder=LIB/'models'/ASSET;archive(folder);folder.mkdir(parents=True,exist_ok=True);bpy.context.view_layer.update()
 meshes=[o for o in bpy.context.scene.objects if o.type=='MESH'];points=[o.matrix_world@v.co for o in meshes for v in o.data.vertices];gp=[game(p) for p in points];low=[min(p[i] for p in gp) for i in range(3)];high=[max(p[i] for p in gp) for i in range(3)]
 # Keep all variations editable. Gallery visibility chooses one named state.
 source=folder/(ASSET+'-authored.blend');bpy.ops.wm.save_as_mainfile(filepath=str(source));glb=folder/(ASSET+'-review.glb')
 bpy.ops.export_scene.gltf(filepath=str(glb),export_format='GLB',export_image_format='AUTO',export_animations=True,export_extras=True,export_yup=True)
 if ASSET=='loop':
  data=glb.read_bytes();n=struct.unpack_from('<I',data,12)[0];doc=json.loads(data[20:20+n]);blob=data[28+n:];animations=doc.get('animations',[]);wheels=[a for a in animations if a['name'].startswith('Loop_wheel_')];merged={'name':'Loop_roll','samplers':[],'channels':[]}
  for a in wheels:
   offset=len(merged['samplers']);merged['samplers'].extend(a['samplers']);merged['channels'].extend([{**c,'sampler':c['sampler']+offset} for c in a['channels']])
  if wheels:doc['animations']=[a for a in animations if a not in wheels]+[merged];CLIPS['roll']={'name':'Loop_roll','duration':2,'cycleDistance':.062*TAU}
  txt=json.dumps(doc,separators=(',',':')).encode();txt+=b' '*(-len(txt)%4);glb.write_bytes(struct.pack('<III',0x46546c67,2,28+len(txt)+len(blob))+struct.pack('<II',len(txt),0x4e4f534a)+txt+struct.pack('<II',len(blob),0x004e4942)+blob)
 for record in ANCHORS.values():record['position']=list(game(bpy.data.objects[record['node']].matrix_world.translation))
 if extra and extra.get('reusedSource'):
  extra['originalImages']=preserve_source_textures(ROOT/extra['reusedSource'],glb)
 ref=next(i for i in asset['images'] if i['role']=='master');meta={'schema':'eq.local-review-model.v1','asset':ASSET,'file':glb.name,'sha256':sha(glb),'referenceSha256':ref['sha256'],'reviewOnly':True,'formApproval':'PENDING','productionExport':False,'units':'metres','up':'+Y','forward':'+Z','dimensions':[high[i]-low[i] for i in range(3)],'bounds':{'min':low,'max':high},'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes),'parts':[o.name for o in meshes],'anchors':ANCHORS,'states':STATES,'clips':CLIPS,'editableSource':source.name,'authoringRecipe':recipe,'generatorSha256':sha(ROOT/'scripts/library-local-recipes.py'),'kitSha256':sha(__file__),'paidCredits':0,'materials':{'world':WORLD,'embeddedPaintTextures':True},'requiredParts':asset['requiredParts'],'requiredStates':asset['states']}
 if extra:meta.update(extra)
 (folder/'model.json').write_text(json.dumps(meta,indent=2)+'\n');print('LOCAL_ASSET '+json.dumps({'id':ASSET,'triangles':meta['triangles'],'parts':len(meshes),'states':len(STATES),'sha256':meta['sha256']}),flush=True)
