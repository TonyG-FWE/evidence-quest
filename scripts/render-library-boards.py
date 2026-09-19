"""Render the actual review GLBs, with labels; never alters their geometry."""
import bpy,math,json,pathlib,sys
from mathutils import Vector,Matrix
root=pathlib.Path.cwd();lib=root/'evidence/hands-on-20260916/pilot/articulated-library-20260917';manifest=json.loads((lib/'manifest.json').read_text());out=lib/'boards';out.mkdir(exist_ok=True)
groups={'characters-village':('Characters','Village'),'characters-sparkfest':('Characters','Sparkfest'),'buildings':('Buildings',None),'nature':('Nature/Landscape',None),'objects-village':('Functional Objects','Village'),'objects-sparkfest':('Functional Objects','Sparkfest')}
for key in sys.argv[sys.argv.index('--')+1:] or groups:
 category,world=groups[key];assets=[a for a in manifest['assets'] if a['category']==category and (not world or a['world']==world)]
 bpy.ops.wm.read_factory_settings(use_empty=True);scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=12;scene.cycles.use_denoising=True
 is_cast=category=='Characters';cols=len(assets) if is_cast else 4 if len(assets)>4 else len(assets);rows=math.ceil(len(assets)/cols);cell=1.25 if is_cast else 2.6
 for i,a in enumerate(assets):
  before=set(bpy.context.scene.objects);bpy.ops.import_scene.gltf(filepath=str(lib/a['model']['uri']),import_pack_images=True);added=set(bpy.context.scene.objects)-before
  for o in added:
   if o.type=='ARMATURE':o.animation_data_clear();o.data.pose_position='REST'
  states=a['model'].get('states',[])
  for st in states[1:]:
   for name in st['nodes']:
    node=next((o for o in added if o.name==name),None)
    if node:
     for o in [node,*node.children_recursive]:o.hide_render=True
  meshes=[o for o in added if o.type=='MESH' and not o.hide_render];bpy.context.view_layer.update();points=[o.matrix_world@v.co for o in meshes for v in o.data.vertices];low=Vector([min(p[n] for p in points) for n in range(3)]);high=Vector([max(p[n] for p in points) for n in range(3)])
  scale=1 if is_cast else 1.75/max(high-low);pivot=bpy.data.objects.new(a['id']+'_board_pivot',None);scene.collection.objects.link(pivot)
  for o in added:
   if not o.parent or o.parent not in added:o.parent=pivot
  x=((i%cols)-(cols-1)/2)*cell;y=-(i//cols)*cell;pivot.matrix_world=Matrix.Translation((x,y,.10))@Matrix.Rotation(-.38,4,'Z')@Matrix.Scale(scale,4)@Matrix.Translation((-(low.x+high.x)/2,-(low.y+high.y)/2,-low.z))
  if is_cast:pivot.matrix_world=Matrix.Translation((x,y,0))@Matrix.Rotation(-.12,4,'Z')
  d=bpy.data.curves.new(a['id']+'_label','FONT');d.body=a['label']+' / '+a['world'];d.size=.105;d.align_x='CENTER';o=bpy.data.objects.new(a['id']+'_label',d);scene.collection.objects.link(o);o.location=(x,y-.88,.08);o.rotation_euler=(math.pi/2,0,0);ink=bpy.data.materials.get('label_ink') or bpy.data.materials.new('label_ink');ink.diffuse_color=(.045,.065,.055,1);d.materials.append(ink)
 mat=bpy.data.materials.new('neutral_review_floor');mat.diffuse_color=(.66,.69,.62,1);bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.01));bpy.context.object.data.materials.append(mat)
 scene.world=bpy.data.worlds.new('review_light');scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.8,.85,.9,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.55
 for name,at,energy,size in [('key',(-4,-5,10),1300,9),('fill',(6,3,8),850,8)]:
  d=bpy.data.lights.new(name,'AREA');d.energy=energy;d.size=size;o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=at;o.rotation_euler=(Vector((0,-rows,0))-o.location).to_track_quat('-Z','Y').to_euler()
 d=bpy.data.cameras.new('board_camera');o=bpy.data.objects.new('board_camera',d);scene.collection.objects.link(o);scene.camera=o;centre=Vector((0,-(rows-1)*cell/2,.8));o.location=centre+Vector((0,-12,14));o.rotation_euler=(centre-o.location).to_track_quat('-Z','Y').to_euler();d.type='ORTHO';d.ortho_scale=(max(cols*cell,rows*cell*.85)+.5)*1.16
 if is_cast:o.location=centre+Vector((0,-12,1.8));o.rotation_euler=(centre-o.location).to_track_quat('-Z','Y').to_euler();d.ortho_scale=cols*cell+.6
 scene.render.resolution_x=2000;scene.render.resolution_y=max(550,round(2000*1.9/(cols*cell+.6))) if is_cast else max(850,round(2000*rows/cols*.78));scene.render.resolution_percentage=100;scene.view_settings.view_transform='AgX';scene.render.filepath=str(out/(key+'.png'));bpy.ops.render.render(write_still=True);print('BOARD',key,flush=True)
