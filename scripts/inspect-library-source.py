"""Normalize a preserved source into a separate review intake; no rig or source edits."""
import bpy, json, math, pathlib, sys, hashlib
from mathutils import Vector, Matrix
ROOT=pathlib.Path.cwd()
OUT=ROOT/'evidence/hands-on-20260916/pilot/articulated-library-20260917'
REF=ROOT/'evidence/hands-on-20260916/pilot/reference-library-20260917/asset-manifest.json'
aid=sys.argv[sys.argv.index('--')+1]
spec=next(a for a in json.loads(REF.read_text())['assets'] if a['id']==aid)
job=json.loads((OUT/'sources'/aid/'provenance.json').read_text())
source=pathlib.Path(job['result']['model_file']); before=hashlib.sha256(source.read_bytes()).hexdigest()
target=OUT/'intake'/aid;target.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source),import_pack_images=True)
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@v.co for o in meshes for v in o.data.vertices]
low=Vector([min(p[i] for p in points) for i in range(3)]);high=Vector([max(p[i] for p in points) for i in range(3)])
scale=spec['proposedHeightM']/(high.z-low.z)
normalizer=Matrix.Scale(scale,4)@Matrix.Rotation(-math.pi/2,4,'Z')@Matrix.Translation(Vector((-(low.x+high.x)/2,-(low.y+high.y)/2,-low.z)))
for mesh in meshes:
 mesh.data.transform(normalizer@mesh.matrix_world);mesh.parent=None;mesh.matrix_world=Matrix.Identity(4);mesh.name=aid+'_source_mesh'
 for p in mesh.data.polygons:p.use_smooth=True
stats={'asset':aid,'sourceSha256':before,'height':spec['proposedHeightM'],'meshes':len(meshes),'triangles':sum(sum(len(f.vertices)-2 for f in m.data.polygons) for m in meshes),'bounds':{m.name:[list(m.dimensions)] for m in meshes},'sourceUnchanged':True}
bpy.ops.wm.save_as_mainfile(filepath=str(target/(aid+'-normalized.blend')))
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True
scene.render.resolution_x=700;scene.render.resolution_y=840;scene.render.resolution_percentage=100
scene.world=bpy.data.worlds.new('Warm review world');scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.72,.75,.78,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.35
scene.view_settings.view_transform='AgX'
def area(name,loc,energy,size):
 d=bpy.data.lights.new(name,'AREA');d.energy=energy;d.shape='DISK';d.size=size;o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector((0,0,.65))-o.location).to_track_quat('-Z','Y').to_euler()
area('Key',(-2,-3,4),180,4);area('Fill',(3,-1,2),90,3);area('Rim',(0,3,3),150,3)
mat=bpy.data.materials.new('Warm neutral floor');mat.diffuse_color=(.65,.66,.61,1)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.002));bpy.context.object.data.materials.append(mat)
camdata=bpy.data.cameras.new('Review camera');cam=bpy.data.objects.new('Review camera',camdata);scene.collection.objects.link(cam);scene.camera=cam;camdata.type='ORTHO';camdata.ortho_scale=spec['proposedHeightM']*1.23
for name,loc in [('front',(0,-4,.72)),('right',(4,0,.72)),('back',(0,4,.72)),('left',(-4,0,.72))]:
 cam.location=loc;cam.rotation_euler=(Vector((0,0,spec['proposedHeightM']*.5))-cam.location).to_track_quat('-Z','Y').to_euler();scene.render.filepath=str(target/(name+'.png'));bpy.ops.render.render(write_still=True)
assert hashlib.sha256(source.read_bytes()).hexdigest()==before
(target/'inspection.json').write_text(json.dumps(stats,indent=2)+'\n');print('INTAKE '+json.dumps(stats))
