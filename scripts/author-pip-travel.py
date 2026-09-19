"""New review-only jog clips on the approved rig. Source geometry and four clips stay untouched."""
import bpy, pathlib, importlib.util, json, inspect
ROOT=pathlib.Path.cwd()
SOURCE=ROOT/'evidence/hands-on-20260916/pilot/revision-r2/pip'
OUT=ROOT/'evidence/hands-on-20260916/pilot/checkpoint-review/pip'
OUT.mkdir(parents=True,exist_ok=True)
spec=importlib.util.spec_from_file_location('rig_author',ROOT/'scripts/rebuild-character-rigs.py')
rig=importlib.util.module_from_spec(spec);spec.loader.exec_module(rig)
bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'pip-anatomical.blend'))
arm=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE')
metadata=json.loads((SOURCE/'rig.json').read_text())
bones={name:{'head':rig.Vector(b['head']),'tail':rig.Vector(b['tail']),'parent':b['parent']} for name,b in metadata['bones'].items()}
# The original walk authoring is preserved. A separate stance/flight curve adds a
# longer supported stride and aerial recovery, rather than accelerating the walk.
code=inspect.getsource(rig.animate)
code=code.replace("['idle', 'walk', 'carry_idle', 'carry_walk']","['jog', 'carry_jog']")
code=code.replace("walking = 'walk' in mode","walking = True")
code=code.replace("foot_phase < .60","foot_phase < .38")
code=code.replace("foot_phase/.60","foot_phase/.38")
code=code.replace("(foot_phase-.60)/.40","(foot_phase-.38)/.62")
code=code.replace("s['stride']/0.60","s['stride']/0.38")
code=code.replace(".002*(1-math.cos(phase_angle*2))", ".012*(1-math.cos(phase_angle*2))")
code=code.replace("(.020 if aid == 'pip' else .032)",".09")
code=code.replace("-(upper_length+lower_length)*.90", "-(upper_length+lower_length)*.72")
code=code.replace("-swing*.28", "-swing*.48")
exec(code,rig.__dict__)
settings={**metadata['specification'],'cycle':32/60,'stride':1.7*(32/60)*.38,'lift':.09}
clips,contacts=rig.animate(arm,bones,'pip',settings)
bpy.context.scene.frame_set(0)
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'pip-travel.blend'))
target=OUT/'pip-travel-review.glb'
bpy.ops.export_scene.gltf(filepath=str(target),export_format='GLB',export_image_format='AUTO',export_keep_originals=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_merge_animation='ACTION',export_rest_position_armature=True,export_reset_pose_bones=True,export_skins=True,export_def_bones=True)
rig.restore_images(SOURCE/'pip-review.glb',target)
(OUT/'travel.json').write_text(json.dumps({'schema':'evidence-quest.travel-clips.v1','approval':'PENDING','sourceSha256':rig.sha(SOURCE/'pip-review.glb'),'sha256':rig.sha(target),'clips':clips,'targetSpeed':1.7,'additionalCredits':0},indent=2)+'\n')
(OUT/'foot-contacts.json').write_text(json.dumps(contacts)+'\n')
print('TRAVEL_REVIEW '+json.dumps(clips))
