"""Blender authoring intake. Writes review sources only, never public/runtime tiers."""
import bpy
import hashlib
import json
import math
import pathlib
import struct
import sys
from array import array
from mathutils import Vector, Matrix

ROOT = pathlib.Path.cwd() / 'evidence/hands-on-20260916'
if (ROOT / 'pilot/character-rejection.json').exists():
    raise SystemExit('R1 was rejected and is preserved for comparison. Use rebuild-character-rigs.py for the corrected revision.')
PROPS = json.loads((ROOT / 'props.json').read_text())
LEDGER = json.loads((ROOT / 'tripo-ledger.json').read_text())
IDS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [a['id'] for a in PROPS['assets']]

def sha(file):
    return hashlib.sha256(pathlib.Path(file).read_bytes()).hexdigest()

def preserve_source_textures(source, output):
    """Keep original embedded images byte-for-byte after Blender's rig-only export."""
    def read_glb(file):
        raw = pathlib.Path(file).read_bytes()
        length = struct.unpack_from('<I', raw, 12)[0]
        document = json.loads(raw[20:20+length])
        return document, raw[28+length:]
    original, original_bin = read_glb(source)
    review, review_bin = read_glb(output)
    source_names = [m.get('name') for m in original['materials']]
    for mesh in review['meshes']:
        for primitive in mesh['primitives']:
            primitive['material'] = source_names.index(review['materials'][primitive['material']].get('name'))
    payload = bytearray(review_bin)
    image_records = []
    review['images'] = []
    for source_image in original.get('images', []):
        view = original['bufferViews'][source_image['bufferView']]
        start = view.get('byteOffset', 0)
        image_bytes = original_bin[start:start+view['byteLength']]
        payload.extend(b'\0' * (-len(payload) % 4))
        image_view = {'buffer': 0, 'byteOffset': len(payload), 'byteLength': len(image_bytes)}
        review['bufferViews'].append(image_view)
        payload.extend(image_bytes)
        review['images'].append({**source_image, 'bufferView': len(review['bufferViews'])-1})
        image_records.append({'name': source_image.get('name'), 'bytes': len(image_bytes), 'sha256': hashlib.sha256(image_bytes).hexdigest()})
    for key in ['materials', 'textures', 'samplers']:
        if key in original:
            review[key] = original[key]
    review['buffers'] = [{'byteLength': len(payload)}]
    payload.extend(b'\0' * (-len(payload) % 4))
    metadata = json.dumps(review, separators=(',', ':')).encode()
    metadata += b' ' * (-len(metadata) % 4)
    output.write_bytes(struct.pack('<III', 0x46546c67, 2, 28+len(metadata)+len(payload)) + struct.pack('<II', len(metadata), 0x4e4f534a) + metadata + struct.pack('<II', len(payload), 0x004e4942) + payload)
    return image_records

def bounds():
    bpy.context.view_layer.update()
    graph = bpy.context.evaluated_depsgraph_get()
    vertices = []
    for obj in bpy.context.scene.objects:
        if obj.type != 'MESH':
            continue
        evaluated = obj.evaluated_get(graph)
        mesh = evaluated.to_mesh()
        vertices.extend(evaluated.matrix_world @ vertex.co for vertex in mesh.vertices)
        evaluated.to_mesh_clear()
    return Vector([min(v[i] for v in vertices) for i in range(3)]), Vector([max(v[i] for v in vertices) for i in range(3)])

def geometry_hash(objects):
    digest = hashlib.sha256()
    for obj in objects:
        for vertex in obj.data.vertices:
            digest.update(struct.pack('<3f', *vertex.co))
        for polygon in obj.data.polygons:
            digest.update(struct.pack('<'+'I'*len(polygon.vertices), *polygon.vertices))
    return digest.hexdigest()

def transfer_weights(mesh, mapping, predicate=None):
    indexes = {mesh.vertex_groups[source].index: mesh.vertex_groups[target] for source, target in mapping.items() if source in mesh.vertex_groups and target in mesh.vertex_groups}
    changed = 0
    for vertex in mesh.data.vertices:
        if predicate and not predicate(mesh.matrix_world @ vertex.co):
            continue
        original = {member.group: member.weight for member in vertex.groups}
        incoming = {}
        for source, target in indexes.items():
            if original.get(source, 0) > 0:
                incoming[target.index] = incoming.get(target.index, 0) + original[source]
        if not incoming:
            continue
        before = sum(original.values())
        for target, weight in incoming.items():
            mesh.vertex_groups[target].add([vertex.index], original.get(target, 0) + weight, 'REPLACE')
        for source in indexes:
            if source in original:
                mesh.vertex_groups[source].remove([vertex.index])
        after = sum(member.weight for member in vertex.groups)
        if abs(before - after) > 0.00001:
            raise RuntimeError('Weight conservation failed')
        changed += 1
    return changed

def stabilize_paper_skirt(mesh):
    """The illustrated skirt is one paper form, not a pair of trouser legs."""
    hip = mesh.vertex_groups['bone_21']
    colour = next(image for image in bpy.data.images if image.name.startswith('Color_'))
    pixels = array('f', [0]) * len(colour.pixels)
    colour.pixels.foreach_get(pixels)
    width, height = colour.size
    skirt = set()
    for loop in mesh.data.loops:
        vertex = mesh.data.vertices[loop.vertex_index]
        position = mesh.matrix_world @ vertex.co
        if not (.05 < position.z < .42):
            continue
        uv = mesh.data.uv_layers.active.data[loop.index].uv
        offset = (min(height-1, max(0, int(uv.y*height)))*width + min(width-1, max(0, int(uv.x*width))))*4
        r, g, b = pixels[offset:offset+3]
        if r > g*1.15 and b > g*1.08:
            skirt.add(vertex.index)
    if len(skirt) < 500:
        raise RuntimeError('Skirt colour segmentation did not identify the illustrated fabric')
    # Include the narrow cream hem neighbouring the painted skirt, not the feet.
    for _ in range(2):
        neighbours = set(skirt)
        for polygon in mesh.data.polygons:
            if any(index in skirt for index in polygon.vertices):
                neighbours.update(polygon.vertices)
        skirt = neighbours
    changed = 0
    for vertex in mesh.data.vertices:
        position = mesh.matrix_world @ vertex.co
        if .09 < position.z < .30 and math.hypot(position.x/.16, position.y/.20) > .75:
            skirt.add(vertex.index)
        if vertex.index not in skirt and not (.15 < position.z < .41 and abs(position.y) < .21):
            continue
        blend = 1 if vertex.index in skirt else min(1, (position.z-.15)/.025, (.41-position.z)/.025)
        original = {member.group: member.weight for member in vertex.groups}
        total = sum(original.values())
        for group, weight in original.items():
            mesh.vertex_groups[group].add([vertex.index], weight*(1-blend), 'REPLACE')
        hip.add([vertex.index], original.get(hip.index, 0)*(1-blend)+total*blend, 'REPLACE')
        if abs(sum(member.weight for member in vertex.groups)-total) > .00001:
            raise RuntimeError('Skirt weight conservation failed')
        changed += 1
    return changed

for asset in PROPS['assets']:
    if asset['id'] not in IDS:
        continue
    aid = asset['id']
    candidates = [job for job in LEDGER['jobs'] if job['assetId'] == aid and job['status'] == 'SUCCESS' and job.get('result', {}).get('model_file')]
    job = next((job for job in candidates if job['operation'] == 'animate'), next(job for job in candidates if job['operation'] == 'make'))
    source = pathlib.Path(job['result']['model_file'])
    source_hash_before = sha(source)
    output = ROOT / 'pilot/review-sources' / aid
    output.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(source), import_pack_images=True, bone_heuristic='BLENDER', disable_bone_shape=True)
    meshes = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
    armatures = [obj for obj in bpy.context.scene.objects if obj.type == 'ARMATURE']
    for arm in armatures:
        arm.data.pose_position = 'REST'
    before_hash = geometry_hash(meshes)
    changes = []
    for mesh in meshes:
        if aid == 'pip':
            mapping = {name: 'tripo::Spine_0' for name in ['tripo::1_Left_Limb_0', 'tripo::1_Left_Limb_1', 'bone_19']}
            changes.append({'reason': 'Backpack was animated as an extra limb. Attach its weights to the torso.', 'vertices': transfer_weights(mesh, mapping), 'mapping': mapping})
        if aid == 'grandma':
            palm_mapping = {f'tripo::0_Left_Limb_{i}': 'tripo::1_Right_Limb_2' for i in range(4)}
            changes.append({'reason': 'Some palm vertices were attached to a foot. Restore these influences to the wrist.', 'vertices': transfer_weights(mesh, palm_mapping, lambda p: p.z>.35 and p.y>.18), 'mapping': palm_mapping})
            mapping = {f'tripo::0_Left_Limb_{i}': f'tripo::0_Right_Limb_{i}' for i in range(4)}
            changes.append({'reason': 'Duplicate overlapping leg chain distorted the skirt and right shoe.', 'vertices': transfer_weights(mesh, mapping), 'mapping': mapping})
            changes.append({'reason': 'Keep the continuous paper skirt on the hips with soft transitions at waist and hem.', 'vertices': stabilize_paper_skirt(mesh)})
    after_hash = geometry_hash(meshes)
    if aid in ['pip', 'grandma'] and not sum(change['vertices'] for change in changes):
        raise RuntimeError('Expected rig repair did not match any vertex weights')
    if before_hash != after_hash:
        raise RuntimeError('Rig repair changed geometry')
    bottom, top = bounds()
    normalizer = bpy.data.objects.new('EQ_AssetRoot', None)
    bpy.context.scene.collection.objects.link(normalizer)
    roots = [obj for obj in bpy.context.scene.objects if obj != normalizer and obj.parent is None]
    for obj in roots:
        matrix = obj.matrix_world.copy()
        obj.parent = normalizer
        obj.matrix_world = matrix
    yaw_degrees = 0 if aid == 'seed-boat' else -90
    normalizer.rotation_euler.z = math.radians(yaw_degrees)
    scale = asset['dimensionsMeters'][1] / (top.z - bottom.z)
    normalizer.scale = (scale,) * 3
    low, high = bounds()
    normalizer.location = (-(low.x + high.x) / 2, -(low.y + high.y) / 2, -low.z)
    normalized_low, normalized_high = bounds()
    # Retain a source authoring project with the original images packed into it.
    for arm in armatures:
        arm.data.pose_position = 'POSE'
        if arm.animation_data:
            arm.animation_data.action = None
            for track in arm.animation_data.nla_tracks:
                track.mute = True
    bpy.context.scene.frame_set(0)
    blend = output / f'{aid}-review.blend'
    bpy.ops.wm.save_as_mainfile(filepath=str(blend))
    review_glb = output / f'{aid}-review.glb'
    bpy.ops.export_scene.gltf(filepath=str(review_glb), export_format='GLB', export_image_format='AUTO', export_keep_originals=True, export_animations=True, export_animation_mode='ACTIONS', export_anim_single_armature=True, export_merge_animation='ACTION', export_rest_position_armature=True, export_skins=True)
    image_records = preserve_source_textures(source, review_glb)
    if sha(source) != source_hash_before:
        raise RuntimeError('Original source changed during intake')
    record = {'schema': 'evidence-quest.blender-review-source.v1', 'asset': aid, 'blender': bpy.app.version_string, 'source': str(source.relative_to(ROOT)).replace('\\','/'), 'sourceSha256': source_hash_before, 'reviewOnly': True, 'productionExport': False, 'changes': changes, 'geometryUnchangedByWeightRepair': before_hash == after_hash, 'geometryHash': before_hash, 'normalization': {'uniformScale': scale, 'yawDegrees': yaw_degrees, 'metres': True, 'boundsBlender': {'min': list(normalized_low), 'max': list(normalized_high)}}, 'blend': str(blend.relative_to(ROOT)).replace('\\','/'), 'reviewGlb': str(review_glb.relative_to(ROOT)).replace('\\','/'), 'reviewSha256': sha(review_glb), 'sourcePreserved': True, 'productionFormApproval': 'PENDING'}
    record['originalTextureBytesPreserved'] = image_records
    (output / 'intake.json').write_text(json.dumps(record, indent=2)+'\n')
    print('PILOT_REVIEW_INTAKE '+json.dumps(record))
