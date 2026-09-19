"""Review-only placement and tying clips. Never edits the approved R2 source."""
import bpy, pathlib, importlib.util, json, inspect
ROOT=pathlib.Path.cwd()
SOURCE=ROOT/'evidence/hands-on-20260916/pilot/revision-r2/pip'
OUT=ROOT/'evidence/hands-on-20260916/pilot/chapter-review/pip'
OUT.mkdir(parents=True,exist_ok=True)
spec=importlib.util.spec_from_file_location('rig_author',ROOT/'scripts/rebuild-character-rigs.py')
rig=importlib.util.module_from_spec(spec);spec.loader.exec_module(rig)
expected='61006b3597984f6e8ceca9d08a0da39cd1e5ff14b407da439672262224024905'
assert rig.sha(SOURCE/'pip-review.glb')==expected, 'Approved source changed'
bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'pip-anatomical.blend'))
arm=next(o for o in bpy.context.scene.objects if o.type=='ARMATURE')
metadata=json.loads((SOURCE/'rig.json').read_text())
bones={name:{'head':rig.Vector(b['head']),'tail':rig.Vector(b['tail']),'parent':b['parent']} for name,b in metadata['bones'].items()}
code=inspect.getsource(rig.animate)
code=code.replace("['idle', 'walk', 'carry_idle', 'carry_walk']","['post_place', 'rope_tie']")
code=code.replace("walking = 'walk' in mode","walking = False")
code=code.replace("carrying = 'carry' in mode","carrying = True")
code=code.replace("duration = s['cycle'] if walking else 3.6","duration = 2.6 if mode == 'post_place' else 3.6")
code=code.replace("if carrying and side == 'R':","if carrying:")
code=code.replace("if not (carrying and side == 'R'):","if not carrying:")
target="""wrist_target = shoulder+Vector((sign*.077, -.12, .175 if aid == 'grandma' else .155))"""
replacement="""wrist_home = shoulder+Vector((sign*.077, -.12, .155))
                    engaged = smooth(.05, .24, phase)*(1-smooth(.79, .97, phase))
                    if mode == 'post_place':
                        goal = Vector((sign*.057, .52-.12*smooth(.30, .63, phase), .21))
                    else:
                        angle = TAU*2*smooth(.24, .77, phase)+(0 if side == 'L' else math.pi)
                        goal = Vector((sign*.048+.023*math.cos(angle), .49+.022*math.sin(angle), .22+.012*math.cos(angle)))
                    wrist_target = mix(wrist_home, goal, engaged)"""
assert target in code
code=code.replace(target,replacement)
exec(code,rig.__dict__)
clips,contacts=rig.animate(arm,bones,'pip',metadata['specification'])
bpy.context.scene.frame_set(0)
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'pip-bridge-actions.blend'))
target=OUT/'pip-bridge-actions-review.glb'
bpy.ops.export_scene.gltf(filepath=str(target),export_format='GLB',export_image_format='AUTO',export_keep_originals=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_merge_animation='ACTION',export_rest_position_armature=True,export_reset_pose_bones=True,export_skins=True,export_def_bones=True)
rig.restore_images(SOURCE/'pip-review.glb',target)
(OUT/'actions.json').write_text(json.dumps({'schema':'evidence-quest.bridge-action-review.v1','approval':'PENDING','sourceSha256':expected,'sha256':rig.sha(target),'clips':clips,'additionalCredits':0,'scope':'New local clips only; approved body, weights, feet, textures and original clips remain protected.'},indent=2)+'\n')
(OUT/'foot-contacts.json').write_text(json.dumps(contacts)+'\n')
assert rig.sha(SOURCE/'pip-review.glb')==expected, 'Approved source changed during authoring'
print('BRIDGE_ACTION_REVIEW '+json.dumps(clips))
