"""Replace the torn provider forearm boundary with closed, weighted geometry."""
import bpy,bmesh,json,pathlib,importlib.util,math
from mathutils import Vector
root=pathlib.Path.cwd();spec=importlib.util.spec_from_file_location('rig',root/'scripts/build-articulated-character.py');R=importlib.util.module_from_spec(spec);spec.loader.exec_module(R)
folder=R.LIB/'models/pip';meta=json.loads((folder/'model.json').read_text());fit=json.loads((R.LIB/'fits/pip.json').read_text());R.archive(folder)
bpy.ops.wm.open_mainfile(filepath=str(folder/'pip-articulated.blend'));arm=bpy.data.objects['pip_rig'];arm.animation_data_clear()
for bone in arm.pose.bones:bone.matrix_basis.identity()
body=bpy.data.objects['pip_painted_body'];image=next((n.image for n in body.active_material.node_tree.nodes if n.type=='TEX_IMAGE' and ('color' in n.name.lower() or 'color' in n.image.name.lower())),None)
if image is None:image=next(n.image for n in body.active_material.node_tree.nodes if n.type=='TEX_IMAGE')
pixels=list(image.pixels);iw,ih=image.size;bm=bmesh.new();bm.from_mesh(body.data);uvlayer=bm.loops.layers.uv.active;delete=[]
for face in bm.faces:
 point=R.G(face.calc_center_median());side='L' if point.x>=0 else 'R';sh,el,wr=[Vector(p) for p in fit['arms'][side]];distance,t=R.seg(point,el,wr)
 color=Vector()
 for loop in face.loops:
  uv=loop[uvlayer].uv;index=(min(ih-1,max(0,int(uv.y*ih)))*iw+min(iw-1,max(0,int(uv.x*iw))))*4;color+=Vector(pixels[index:index+3])
 r,g,b=color/len(face.loops)
 if point.y<el.y+.018 and point.y>wr.y-.15 and abs(point.x)>.155 and distance<.12 and r>g*1.08 and r>1.12*b:delete.append(face)
bmesh.ops.delete(bm,geom=delete,context='FACES');bmesh.ops.delete(bm,geom=[v for v in bm.verts if not v.link_faces],context='VERTS');bm.to_mesh(body.data);bm.free();body.data.update()
if 'eq_limb_region' not in body.data.attributes:R.detach_sleeve_seams(body,fit)
for side in ['L','R']:
 name='pip_closed_forearm_'+side
 if name in bpy.data.objects:bpy.data.objects.remove(bpy.data.objects[name],do_unlink=True)
 sh,el,wr=[Vector(p) for p in fit['arms'][side]];direction=(wr-el).normalized();start=el-direction*.015;end=wr+direction*.006;normal=Vector((0,0,1));normal=(normal-direction*normal.dot(direction)).normalized();across=direction.cross(normal).normalized();vs=[];faces=[];weights=[];rows=18;segments=16
 for i in range(rows):
  t=i/(rows-1);centre=start.lerp(end,t);rx=.033*(1-t)+fit['handWidth']*.34*t;rz=.025*(1-t)+fit['handWidth']*.25*t
  hand=R.smooth((t-.34)/.55);twist=R.smooth((t-.12)/.65)*.65
  for j in range(segments):
   angle=j/segments*math.tau;vs.append(R.B(centre+across*math.cos(angle)*rx+normal*math.sin(angle)*rz));weights.append({'forearm_'+side:(1-hand)*(1-twist),'forearm_twist_'+side:(1-hand)*twist,'hand_'+side:hand})
 for i in range(rows-1):
  for j in range(segments):faces.append((i*segments+j,i*segments+(j+1)%segments,(i+1)*segments+(j+1)%segments,(i+1)*segments+j))
 faces.extend([tuple(reversed(range(segments))),tuple((rows-1)*segments+j for j in range(segments))])
 mesh=bpy.data.meshes.new(name);mesh.from_pydata(vs,[],faces);mesh.update();obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj);obj.parent=arm;mesh.materials.append(body.active_material)
 layer=mesh.uv_layers.new(name='UVMap');uv=Vector(meta['handSkinSamples'][side]['uv'])
 for loop in mesh.loops:layer.data[loop.index].uv=uv+Vector((math.sin(loop.vertex_index*.53)*.0002,math.cos(loop.vertex_index*.37)*.0002))
 bm=bmesh.new();bm.from_mesh(mesh);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(mesh);bm.free()
 for face in mesh.polygons:face.use_smooth=True
 groups={n:obj.vertex_groups.new(name=n) for n in weights[0]}
 for i,row in enumerate(weights):
  for name,value in row.items():
   if value>0:groups[name].add([i],value,'REPLACE')
 modifier=obj.modifiers.new('Continuous forearm skin','ARMATURE');modifier.object=arm
meta['cleanup'].append('Pip forearm-to-hand surfaces rebuilt locally with closed geometry and continuous wrist weights')
meta['triangles']=sum(sum(len(f.vertices)-2 for f in o.data.polygons) for o in bpy.context.scene.objects if o.type=='MESH')
bpy.ops.wm.save_as_mainfile(filepath=str(folder/'pip-articulated.blend'));(folder/'model.json').write_text(json.dumps(meta,indent=2)+'\n');print('CLOSED_FOREARMS',len(delete),meta['triangles'])
