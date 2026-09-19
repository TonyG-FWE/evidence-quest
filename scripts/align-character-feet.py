"""Straighten the reviewed R2 shoes locally; keep its skeletons and clips intact.

Always reads the immutable pre-correction blend so a repeat cannot accumulate
rotation. No rig regeneration, provider calls, texture changes or production export.
"""
import bpy
import importlib.util
import json
import math
import pathlib
from mathutils import Vector

ROOT = pathlib.Path.cwd()
PILOT = ROOT / 'evidence/hands-on-20260916/pilot'
BEFORE = PILOT / 'revision-r2-before-foot-alignment'
OUT = PILOT / 'revision-r2'
spec = importlib.util.spec_from_file_location('character_rig', ROOT / 'scripts/rebuild-character-rigs.py')
rig = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rig)


def sole_axis(points):
    """Area-weighted footprint principal axis; independent of vertex density."""
    points = sorted(set((p.x, p.z) for p in points))
    def half(ordered):
        hull = []
        for p in ordered:
            while len(hull) > 1:
                o, a = hull[-2:]
                if (a[0]-o[0])*(p[1]-o[1])-(a[1]-o[1])*(p[0]-o[0]) > 0:
                    break
                hull.pop()
            hull.append(p)
        return hull[:-1]
    hull = half(points)+half(list(reversed(points)))
    area = cx = cz = xx = zz = xz = 0
    for (x, z), (u, v) in zip(hull, hull[1:]+hull[:1]):
        c = x*v-u*z
        area += c/2
        cx += (x+u)*c/6
        cz += (z+v)*c/6
        xx += (x*x+x*u+u*u)*c/12
        zz += (z*z+z*v+v*v)*c/12
        xz += (2*x*z+x*v+u*z+2*u*v)*c/24
    cx, cz = cx/area, cz/area
    xx, zz, xz = xx/area-cx*cx, zz/area-cz*cz, xz/area-cx*cz
    return math.atan2(2*xz, zz-xx)/2


def align(aid):
    metadata = json.loads((BEFORE/aid/'rig.json').read_text())
    previous_hash = metadata['sha256']
    bpy.ops.wm.open_mainfile(filepath=str(BEFORE/aid/(aid+'-anatomical.blend')))
    details = {}
    for mesh in [o for o in bpy.context.scene.objects if o.type == 'MESH']:
        positions = [rig.G(v.co) for v in mesh.data.vertices]
        for side, sign in [('L', 1), ('R', -1)]:
            vertices = [(v, p) for v, p in zip(mesh.data.vertices, positions) if p.x*sign > 0]
            axis = sole_axis([p for _, p in vertices if p.y < .045])
            # Pivot through the existing ankle opening, not the offset toe centre.
            ankle = [p for _, p in vertices if .09 <= p.y < .12]
            pivot = sum(ankle, Vector())/len(ankle)
            fade_end = .152 if aid == 'pip' else .12
            changed = 0
            for vertex, p in vertices:
                if p.y >= fade_end:
                    continue
                if aid == 'grandma' and not mesh.data.attributes['eq_foot_part'].data[vertex.index].value:
                    continue
                angle = -axis*(1-rig.smooth(.072, fade_end, p.y))
                dx, dz = p.x-pivot.x, p.z-pivot.z
                corrected = Vector((pivot.x+math.cos(angle)*dx+math.sin(angle)*dz,
                                    p.y,
                                    pivot.z-math.sin(angle)*dx+math.cos(angle)*dz))
                vertex.co = rig.B(corrected)
                changed += 1
            after = sole_axis([rig.G(v.co) for v, p in vertices if p.y < .045])
            details[side] = {'beforeDegrees': math.degrees(axis), 'afterDegrees': math.degrees(after),
                             'anklePivot': list(pivot), 'blendHeight': [.072, fade_end], 'vertices': changed}
        mesh.data.update()
    target = OUT/aid
    bpy.ops.wm.save_as_mainfile(filepath=str(target/(aid+'-anatomical.blend')))
    output = target/(aid+'-review.glb')
    bpy.ops.export_scene.gltf(filepath=str(output), export_format='GLB', export_image_format='AUTO', export_keep_originals=True, export_animations=True, export_animation_mode='ACTIONS', export_anim_single_armature=True, export_merge_animation='ACTION', export_rest_position_armature=True, export_reset_pose_bones=True, export_skins=True, export_def_bones=True)
    images = rig.restore_images(PILOT/metadata['source'], output)
    assert images == metadata['originalImages'], 'Original textures must remain unchanged'
    metadata['sha256'] = rig.sha(output)
    metadata['footAlignment'] = {'revision': 'R2-feet', 'previousSha256': previous_hash, 'sides': details}
    (target/'rig.json').write_text(json.dumps(metadata, indent=2)+'\n')
    print('STRAIGHTENED_FEET '+json.dumps({'asset': aid, 'sha256': metadata['sha256'], 'sides': details}))


for character in ['pip', 'grandma']:
    align(character)
