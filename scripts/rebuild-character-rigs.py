"""Local character revision R2. No provider calls and no production-tier export.

Starts with the preserved, unrigged P1 mesh. The previous automatic skeleton,
weights and animation channels are deliberately not imported. Coordinates in
the authoring specification use the game's right-handed Y-up, +Z-forward frame.
"""
import bpy
import bmesh
import hashlib
import json
import math
import pathlib
import struct
import sys
from mathutils import Vector, Matrix, Quaternion
from array import array

ROOT = pathlib.Path.cwd()
PILOT = ROOT / 'evidence/hands-on-20260916/pilot'
OUT = PILOT / 'revision-r2'
FPS = 60
TAU = math.tau

SPECS = {
    'pip': {
        'source': 'sources/pip/tripo-out/pip-729ba162/model.glb',
        'height': 1.15, 'hipY': .355, 'hipX': .112, 'ankleY': .084,
        'footZ': .075, 'kneeY': .217, 'shoulderY': .681,
        'shoulderX': .120, 'elbowX': .192, 'elbowY': .569,
        'wristX': .264, 'wristY': .474, 'handTipX': .300,
        'handTipY': .424, 'handZ': .066, 'neckY': .757,
        'cycle': .96, 'stride': .20, 'lift': .025,
        'arms': {
            'L': [[.135, .642, .113], [.205, .537, .184], [.271, .449, .239], [.290, .351, .267]],
            'R': [[-.120, .642, .030], [-.213, .540, .040], [-.282, .448, .047], [-.309, .352, .049]],
        },
    },
    'grandma': {
        'source': 'sources/grandma/tripo-out/grandma-c0aa77f7/model.glb',
        'height': 1.30, 'hipY': .551, 'hipX': .121, 'ankleY': .075,
        'footZ': .028, 'kneeY': .319, 'shoulderY': .843,
        'shoulderX': .133, 'elbowX': .236, 'elbowY': .727,
        'wristX': .328, 'wristY': .626, 'handTipX': .374,
        'handTipY': .579, 'handZ': .021, 'neckY': .915,
        'cycle': 1.40, 'stride': .31, 'lift': .035,
        'arms': {
            'L': [[.132, .794, .038], [.239, .700, .047], [.328, .616, .057], [.351, .527, .060]],
            'R': [[-.132, .794, .018], [-.239, .700, .018], [-.328, .616, .014], [-.351, .527, .014]],
        },
    },
}


def sha(file):
    return hashlib.sha256(pathlib.Path(file).read_bytes()).hexdigest()


def B(p):
    """Game coordinates to Blender coordinates."""
    return Vector((p[0], -p[2], p[1]))


def G(p):
    return Vector((p[0], p[2], -p[1]))


def smooth(a, b, x):
    t = max(0, min(1, (x-a)/(b-a)))
    return t*t*(3-2*t)


def mix(a, b, t):
    return a*(1-t)+b*t


def segment_distance(p, a, b):
    axis = b-a
    t = max(0, min(1, (p-a).dot(axis)/max(axis.length_squared, 1e-9)))
    return (p-(a+axis*t)).length


def solve_limb(root, target, upper, lower, pole):
    """Analytic two-bone authoring IK; lengths never change."""
    delta = target-root
    distance = min(upper+lower-.0001, max(abs(upper-lower)+.0001, delta.length))
    direction = delta.normalized()
    a = (upper*upper-lower*lower+distance*distance)/(2*distance)
    height = math.sqrt(max(0, upper*upper-a*a))
    bend = pole-direction*pole.dot(direction)
    if bend.length < .0001:
        bend = Vector((1, 0, 0))
    bend.normalize()
    return root+direction*a+bend*height, root+direction*distance


def restore_images(source, output):
    """Retain source PBR images and material bytes without a texture rerender."""
    def read(file):
        data = file.read_bytes()
        n = struct.unpack_from('<I', data, 12)[0]
        return json.loads(data[20:20+n]), data[28+n:]
    original, original_bin = read(source)
    review, review_bin = read(output)
    names = [m.get('name') for m in original['materials']]
    for mesh in review['meshes']:
        for primitive in mesh['primitives']:
            primitive['material'] = names.index(review['materials'][primitive['material']].get('name'))
    payload = bytearray(review_bin)
    review['images'] = []
    images = []
    for image in original['images']:
        view = original['bufferViews'][image['bufferView']]
        start = view.get('byteOffset', 0)
        raw = original_bin[start:start+view['byteLength']]
        payload.extend(b'\0'*(-len(payload) % 4))
        review['bufferViews'].append({'buffer': 0, 'byteOffset': len(payload), 'byteLength': len(raw)})
        payload.extend(raw)
        review['images'].append({**image, 'bufferView': len(review['bufferViews'])-1})
        images.append({'bytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest()})
    for key in ['materials', 'textures', 'samplers']:
        if key in original:
            review[key] = original[key]
    review['buffers'] = [{'byteLength': len(payload)}]
    payload.extend(b'\0'*(-len(payload) % 4))
    document = json.dumps(review, separators=(',', ':')).encode()
    document += b' '*(-len(document) % 4)
    output.write_bytes(struct.pack('<III', 0x46546c67, 2, 28+len(document)+len(payload)) + struct.pack('<II', len(document), 0x4e4f534a) + document + struct.pack('<II', len(payload), 0x004e4942) + payload)
    return images


def bones_for(s, aid):
    """Explicit bilateral anatomy. Suffix L is character-left (+X)."""
    bones = {}
    def add(name, head, tail, parent=None):
        bones[name] = {'head': Vector(head), 'tail': Vector(tail), 'parent': parent}
    hip = s['hipY']
    add('root', [0, 0, 0], [0, .08, 0])
    add('pelvis', [0, hip, 0], [0, hip+.08, 0], 'root')
    add('spine', [0, hip+.08, 0], [0, s['shoulderY']-.055, 0], 'pelvis')
    add('chest', [0, s['shoulderY']-.055, 0], [0, s['neckY']-.025, 0], 'spine')
    add('neck', [0, s['neckY']-.025, 0], [0, s['neckY']+.025, 0], 'chest')
    add('head', [0, s['neckY']+.025, 0], [0, s['height']-.055, 0], 'neck')
    for side, sign in [('L', 1), ('R', -1)]:
        shoulder, elbow, wrist, palm = s['arms'][side]
        add('clavicle.'+side, [0, shoulder[1], shoulder[2]*.4], shoulder, 'chest')
        add('upper_arm.'+side, shoulder, elbow, 'clavicle.'+side)
        add('forearm.'+side, elbow, wrist, 'upper_arm.'+side)
        add('hand.'+side, wrist, palm, 'forearm.'+side)
        add('thigh.'+side, [sign*s['hipX'], hip, s['footZ']-.035], [sign*s['hipX'], s['kneeY'], s['footZ']-.018], 'pelvis')
        add('shin.'+side, [sign*s['hipX'], s['kneeY'], s['footZ']-.018], [sign*s['hipX'], s['ankleY'], s['footZ']-.035], 'thigh.'+side)
        add('foot.'+side, [sign*s['hipX'], s['ankleY'], s['footZ']-.035], [sign*s['hipX'], .045, s['footZ']+.055], 'shin.'+side)
        add('toe.'+side, [sign*s['hipX'], .045, s['footZ']+.055], [sign*s['hipX'], .035, s['footZ']+.10], 'foot.'+side)
    if aid == 'pip':
        add('backpack', [0, .50, -.11], [0, .65, -.11], 'chest')
    else:
        for sector, x, z in [('front', 0, .10), ('back', 0, -.10), ('left', .15, 0), ('right', -.15, 0)]:
            add('skirt.'+sector, [x*.5, .52, z*.5], [x, .18, z], 'pelvis')
    return bones


def skin_weights(mesh, bones, aid, s):
    """Heat binding with explicit isolation of hands, feet and painted garments.

    Provider weights and ambiguous provider bone names are never reused.
    Garment selection is bounded by anatomy and the preserved painted material.
    """
    original_weights = [{mesh.vertex_groups[g.group].name: g.weight for g in vertex.groups} for vertex in mesh.data.vertices]
    groups = {name: mesh.vertex_groups.get(name) or mesh.vertex_groups.new(name=name) for name in bones}
    counts = {}
    positions = [G(v.co) for v in mesh.data.vertices]
    # Painted garment masks distinguish the tunic/skirt from the legs beneath.
    # Spatial bounds keep similarly coloured shoes and sleeves out of the mask.
    shader = next(n for n in mesh.active_material.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    image = shader.inputs['Base Color'].links[0].from_node.image
    pixels = array('f', [0])*len(image.pixels)
    image.pixels.foreach_get(pixels)
    width, height = image.size
    cloth = set()
    for loop in mesh.data.loops:
        index = loop.vertex_index
        x, y, z = positions[index]
        uv = mesh.data.uv_layers.active.data[loop.index].uv
        offset = (min(height-1, max(0, int(uv.y*height)))*width+min(width-1, max(0, int(uv.x*width))))*4
        r, g, b = pixels[offset:offset+3]
        if aid == 'pip' and .273 < y < .47 and abs(x) < .23 and g > .19 and g > r*1.3 and b > r*1.2 and g > b*.85:
            cloth.add(index)
        if aid == 'grandma' and .09 < y < .57 and r > g*1.1 and b > g*1.04:
            cloth.add(index)
        if aid == 'grandma' and .085 < y < .22 and r > .25 and g > r*.72 and b > r*.62:
            cloth.add(index)
    # Include the neighbouring hem vertices, with bounds excluding the hands.
    for _ in range(2):
        expanded = set(cloth)
        for face in mesh.data.polygons:
            if any(i in cloth for i in face.vertices):
                for i in face.vertices:
                    p = positions[i]
                    if abs(p.x) < (.23 if aid == 'pip' else .25) and p.y > (.275 if aid == 'pip' else .105):
                        expanded.add(i)
        cloth = expanded
    cloth_points = {tuple(round(c, 5) for c in positions[i]) for i in cloth}
    cloth = {i for i, p in enumerate(positions) if tuple(round(c, 5) for c in p) in cloth_points}
    def weighted(p, candidates, softness=.040):
        distances = [(name, segment_distance(p, bones[name]['head'], bones[name]['tail'])) for name in candidates]
        nearest = min(d for _, d in distances)
        values = {name: math.exp(-((d-nearest)/softness)**2) for name, d in distances}
        return {name: w for name, w in values.items() if w > .015}
    for vertex, p in zip(mesh.data.vertices, positions):
        x, y, z = p
        side = 'L' if x >= 0 else 'R'
        arm_axis = s['arms'][side]
        weights = original_weights[vertex.index]
        if not weights:
            # Disconnected paper hair and accessory islands have no heat solution.
            candidates = [n for n in bones if n not in ['root', 'backpack'] and not n.startswith('skirt.')]
            weights = weighted(p, candidates, .025)
            counts['heatFallbackVertices'] = counts.get('heatFallbackVertices', 0)+1
        # Remove heat leakage from the short limbs into garments near the hips.
        redirected = 0
        adjusted = {}
        for name, weight in weights.items():
            factor = 1
            if name.startswith(('thigh.', 'shin.', 'foot.', 'toe.')):
                factor *= 1-smooth(s['hipY']-.025, s['hipY']+.02, y)
            if name.startswith(('upper_arm.', 'forearm.', 'hand.', 'clavicle.')):
                if aid == 'pip' and side == 'L':
                    depth = arm_axis[-1][2]
                    for high, low in zip(arm_axis, arm_axis[1:]):
                        if low[1] <= y <= high[1]:
                            depth = mix(low[2], high[2], (y-low[1])/(high[1]-low[1]))
                    if y > arm_axis[0][1]:
                        depth = arm_axis[0][2]
                    factor *= smooth(depth-.115, depth-.040, z)
                if aid == 'grandma':
                    factor *= mix(smooth(.165, .235, abs(x)), 1, smooth(.69, .76, y))
            adjusted[name] = weight*factor
            redirected += weight*(1-factor)
        adjusted['chest' if y > s['hipY']+.10 else 'pelvis'] = adjusted.get('chest' if y > s['hipY']+.10 else 'pelvis', 0)+redirected
        weights = adjusted
        if y > s['neckY']-.015:
            weights = {'head': 1}
        elif aid == 'pip' and z < -.035 and .28 < y < .75:
            weights = {'backpack': 1}
        elif aid == 'pip' and vertex.index in cloth:
            weights = {'pelvis': 1}
        elif aid == 'grandma' and mesh.data.attributes['eq_foot_part'].data[vertex.index].value:
            weights = {'foot.'+side: 1}
        elif aid == 'grandma' and (vertex.index in cloth or (.119 < y < .56 and abs(x) < .26)):
            # Four modest clothing bones, never foot or hand influences.
            radial = max(abs(x)/.19, abs(z)/.12)
            hem = (1-smooth(.43, .55, y))*smooth(.30, .75, radial)
            sector = ('left' if x > 0 else 'right') if abs(x)/.19 > abs(z)/.12 else ('front' if z > 0 else 'back')
            weights = {'pelvis': 1-hem, 'skirt.'+sector: hem}
        elif aid == 'pip' and y < .335:
            thigh = smooth(s['kneeY']-.025, s['kneeY']+.025, y)
            ankle = smooth(.105, .152, y)
            weights = {'thigh.'+side: thigh*ankle, 'shin.'+side: (1-thigh)*ankle, 'foot.'+side: 1-ankle}
        elif y < .095:
            weights = {'foot.'+side: 1}
        hand = bones['hand.'+side]
        hand_axis = hand['tail']-hand['head']
        hand_t = (p-hand['head']).dot(hand_axis)/hand_axis.length_squared
        if hand_t > 0:
            rigid = smooth(0, .35, hand_t)*(1-smooth(.08, .14, segment_distance(p, hand['head'], hand['tail'])))*smooth(.19, .25, abs(x))
            weights = {n: w*(1-rigid) for n, w in weights.items()}
            weights['hand.'+side] = weights.get('hand.'+side, 0)+rigid
        weights = dict(sorted(weights.items(), key=lambda item: -item[1])[:4])
        total = sum(weights.values())
        if total < .00001:
            raise RuntimeError('Empty anatomical weight assignment')
        for group in mesh.vertex_groups:
            group.remove([vertex.index])
        for name, weight in weights.items():
            if weight/total > .00001:
                groups[name].add([vertex.index], weight/total, 'REPLACE')
                counts[name] = counts.get(name, 0)+1
    return counts


def make_armature(bones, aid):
    data = bpy.data.armatures.new(aid+'_anatomy')
    arm = bpy.data.objects.new(aid+'_rig', data)
    bpy.context.collection.objects.link(arm)
    bpy.context.view_layer.objects.active = arm
    arm.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    for name, definition in bones.items():
        bone = data.edit_bones.new(name)
        bone.head = B(definition['head'])
        bone.tail = B(definition['tail'])
        bone.roll = 0
        if definition['parent']:
            bone.parent = data.edit_bones[definition['parent']]
        bone.use_connect = False
    bpy.ops.object.mode_set(mode='OBJECT')
    for bone in arm.pose.bones:
        bone.rotation_mode = 'QUATERNION'
    arm.show_in_front = True
    data.display_type = 'STICK'
    return arm


def pose_matrices(arm, matrices):
    for bone in arm.pose.bones:
        matrix = matrices[bone.name]
        kwargs = {'invert': True}
        if bone.parent:
            kwargs['parent_matrix'] = matrices[bone.parent.name]
            kwargs['parent_matrix_local'] = bone.parent.bone.matrix_local
        bone.matrix_basis = bone.bone.convert_local_to_pose(matrix, bone.bone.matrix_local, **kwargs)


def animate(arm, bones, aid, s):
    rest = {b.name: b.matrix_local.copy() for b in arm.data.bones}
    contacts = {}
    clips = {}
    for mode in ['idle', 'walk', 'carry_idle', 'carry_walk']:
        walking = 'walk' in mode
        carrying = 'carry' in mode
        duration = s['cycle'] if walking else 3.6
        frames = round(duration*FPS)
        duration = frames/FPS
        action = bpy.data.actions.new(aid+'_'+mode)
        action.use_fake_user = True
        arm.animation_data_create()
        arm.animation_data.action = action
        footprints = []
        for frame in range(frames+1):
            phase = frame/frames
            phase_angle = TAU*phase
            # A modest twice-per-cycle rise; no lateral pelvis travel or root motion.
            bob = .002*(1-math.cos(phase_angle*2)) if walking else .0015*math.sin(phase_angle)
            hip_drop = (.020 if aid == 'pip' else .032) if walking else .005
            shift = Vector((0, bob, 0))
            matrices = {}
            for name, bone in bones.items():
                matrices[name] = Matrix.Translation(B(shift)) @ rest[name]
            matrices['root'] = rest['root'].copy()
            foot_record = {}
            for side, sign in [('L', 1), ('R', -1)]:
                hip = bones['thigh.'+side]['head']+shift
                ankle_rest = bones['foot.'+side]['head']
                foot_phase = (phase+(0 if side == 'L' else .5)) % 1
                stance = not walking or foot_phase < .60
                if not walking:
                    z, lift = ankle_rest.z, 0
                elif stance:
                    z = ankle_rest.z+s['stride']*(.5-foot_phase/.60)
                    lift = 0
                else:
                    swing = (foot_phase-.60)/.40
                    z = ankle_rest.z+s['stride']*(smooth(0, 1, swing)-.5)
                    lift = s['lift']*math.sin(math.pi*swing)**2
                target = Vector((ankle_rest.x, ankle_rest.y+lift, z))
                thigh_length = (bones['thigh.'+side]['tail']-bones['thigh.'+side]['head']).length
                shin_length = (bones['shin.'+side]['tail']-bones['shin.'+side]['head']).length
                # Lower the pelvis enough for the longest stride to remain reachable.
                hip.y -= hip_drop
                knee, ankle = solve_limb(hip, target, thigh_length, shin_length, Vector((0, 0, 1)))
                def aim(name, head, tail):
                    rest_direction = B(bones[name]['tail']-bones[name]['head']).normalized()
                    direction = B(tail-head).normalized()
                    rotation = rest_direction.rotation_difference(direction)
                    matrices[name] = Matrix.Translation(B(head)) @ rotation.to_matrix().to_4x4() @ rest[name].to_3x3().to_4x4()
                aim('thigh.'+side, hip, knee)
                aim('shin.'+side, knee, ankle)
                # Shoes stay level; toes and soles remain attached to the foot.
                foot_delta = ankle-ankle_rest
                for name in ['foot.'+side, 'toe.'+side]:
                    matrices[name] = Matrix.Translation(B(foot_delta)) @ rest[name]
                foot_record[side] = {'stance': stance, 'target': list(target), 'ankle': list(ankle), 'knee': list(knee), 'hip': list(hip)}
                shoulder = bones['upper_arm.'+side]['head']+shift
                elbow_rest = bones['forearm.'+side]['head']
                wrist_rest = bones['hand.'+side]['head']
                upper_length = (elbow_rest-bones['upper_arm.'+side]['head']).length
                lower_length = (wrist_rest-elbow_rest).length
                # Relaxed arms fall near the sides with a small natural elbow bend.
                swing = -math.cos(phase_angle+(0 if side == 'L' else math.pi)) if walking else .045*math.sin(phase_angle)
                if carrying and side == 'R':
                    wrist_target = shoulder+Vector((sign*.077, -.12, .175 if aid == 'grandma' else .155))
                    pole = Vector((sign*.55, -.7, -.3))
                else:
                    wrist_target = shoulder+Vector((sign*.070, -(upper_length+lower_length)*.90, -.02))
                    pole = Vector((sign*.3, 0, -.9))
                elbow, wrist = solve_limb(shoulder, wrist_target, upper_length, lower_length, pole)
                swing_rotation = Quaternion((1, 0, 0), -swing*.28)
                if not (carrying and side == 'R'):
                    elbow = shoulder+swing_rotation @ (elbow-shoulder)
                    wrist = shoulder+swing_rotation @ (wrist-shoulder)
                aim('upper_arm.'+side, shoulder, elbow)
                aim('forearm.'+side, elbow, wrist)
                if carrying and side == 'R':
                    # Supination belongs to the forearm as well as the wrist.
                    # Sharing it prevents a sharp twist across the painted cuff.
                    name = 'forearm.'+side
                    rotation = matrices[name].to_3x3() @ rest[name].to_3x3().inverted()
                    direction = B(wrist-elbow).normalized()
                    normal = rotation @ B((0, 0, 1))
                    normal = (normal-direction*normal.dot(direction)).normalized()
                    up = B((0, 1, 0))
                    up = (up-direction*up.dot(direction)).normalized()
                    angle = math.atan2(direction.dot(normal.cross(up)), normal.dot(up))
                    twist = Quaternion(direction, angle).to_matrix()
                    matrices[name] = Matrix.Translation(B(elbow)) @ (twist @ rotation @ rest[name].to_3x3()).to_4x4()
                hand_direction = Vector((sign*.10, -.97, .08)).normalized()
                if carrying and side == 'R':
                    hand_direction = Vector((sign*.15, -.02, 1)).normalized()
                else:
                    hand_direction = swing_rotation @ hand_direction
                hand_length = (bones['hand.'+side]['tail']-bones['hand.'+side]['head']).length
                aim('hand.'+side, wrist, wrist+hand_direction*hand_length)
                if carrying and side == 'R':
                    name = 'hand.'+side
                    rotation = matrices[name].to_3x3() @ rest[name].to_3x3().inverted()
                    direction = B(hand_direction)
                    normal = rotation @ B((0, 0, 1))
                    normal = (normal-direction*normal.dot(direction)).normalized()
                    up = B((0, 1, 0))
                    up = (up-direction*up.dot(direction)).normalized()
                    angle = math.atan2(direction.dot(normal.cross(up)), normal.dot(up))
                    twist = Quaternion(direction, angle).to_matrix()
                    matrices[name] = Matrix.Translation(B(wrist)) @ (twist @ rotation @ rest[name].to_3x3()).to_4x4()
            # Keep pelvis, clothing and leg roots together, with modest breathing.
            drop = Vector((0, -hip_drop, 0))
            for name in ['pelvis', 'spine', 'chest', 'neck', 'head', 'backpack']:
                if name in matrices:
                    matrices[name] = Matrix.Translation(B(drop)) @ matrices[name]
            # Arms move with the same body height; no disconnected shoulder sockets.
            for side in ['L', 'R']:
                for stem in ['clavicle', 'upper_arm', 'forearm', 'hand']:
                    name = stem+'.'+side
                    matrices[name] = Matrix.Translation(B(drop)) @ matrices[name]
            for name in bones:
                if name.startswith('skirt.'):
                    # Baked fabric sway is small and cannot reach hands or shoes.
                    hinge = B(bones[name]['head']+shift+drop)
                    rotation = Quaternion((1, 0, 0), (0.028*math.sin(phase_angle) if walking else 0))
                    matrices[name] = Matrix.Translation(hinge) @ rotation.to_matrix().to_4x4() @ Matrix.Translation(-B(bones[name]['head'])) @ rest[name]
            pose_matrices(arm, matrices)
            for bone in arm.pose.bones:
                bone.keyframe_insert('location', frame=frame)
                bone.keyframe_insert('rotation_quaternion', frame=frame)
                bone.keyframe_insert('scale', frame=frame)
            footprints.append({'time': frame/FPS, 'feet': foot_record})
        for layer in action.layers:
            for strip in layer.strips:
                for bag in strip.channelbags:
                    for curve in bag.fcurves:
                        for key in curve.keyframe_points:
                            key.interpolation = 'LINEAR'
        clips[mode] = {'name': action.name, 'duration': duration, 'cycleDistance': s['stride']/0.60 if walking else 0}
        contacts[mode] = footprints
    arm.animation_data.action = None
    for bone in arm.pose.bones:
        bone.matrix_basis.identity()
    bpy.context.view_layer.update()
    return clips, contacts


def build(aid):
    s = SPECS[aid]
    source = PILOT / s['source']
    source_hash = sha(source)
    target = OUT / aid
    if (target/'rig.json').exists() and json.loads((target/'rig.json').read_text()).get('footAlignment'):
        raise RuntimeError('R2 has a reviewed foot-alignment refinement; refusing to overwrite it with the original rebuild. Start a new dated candidate for further rig changes.')
    target.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.context.scene.render.fps = FPS
    bpy.ops.import_scene.gltf(filepath=str(source), import_pack_images=True, disable_bone_shape=True)
    meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    # Normalize the actual unrigged geometry in place, retaining UVs and faces.
    points = [o.matrix_world @ v.co for o in meshes for v in o.data.vertices]
    low = Vector([min(p[i] for p in points) for i in range(3)])
    high = Vector([max(p[i] for p in points) for i in range(3)])
    scale = s['height']/(high.z-low.z)
    normalizer = Matrix.Scale(scale, 4) @ Matrix.Rotation(-math.pi/2, 4, 'Z') @ Matrix.Translation(Vector((-(low.x+high.x)/2, -(low.y+high.y)/2, -low.z)))
    for mesh in meshes:
        transform = normalizer @ mesh.matrix_world
        mesh.data.transform(transform)
        mesh.parent = None
        mesh.matrix_world = Matrix.Identity(4)
        mesh.name = aid+'_painted_mesh'
        # Weld coincident positions before heat binding; UV seams remain per-loop.
        bm = bmesh.new()
        bm.from_mesh(mesh.data)
        bmesh.ops.remove_doubles(bm, verts=list(bm.verts), dist=.000001)
        if aid == 'pip':
            # Add bending rings to the original sparse trouser legs, retaining UVs.
            for height in [s['kneeY']-.025, s['kneeY'], s['kneeY']+.025]:
                faces = [f for f in bm.faces if min(v.co.z for v in f.verts) < height < max(v.co.z for v in f.verts) and max(v.co.z for v in f.verts) < .35]
                edges = {e for f in faces for e in f.edges}
                verts = {v for f in faces for v in f.verts}
                bmesh.ops.bisect_plane(bm, geom=list(verts)+list(edges)+faces, plane_co=(0, 0, height), plane_no=(0, 0, 1), dist=.000001)
        if aid == 'grandma':
            # P1 fused the ankle surfaces to the solid skirt. Separate that seam
            # locally so a planted skirt cannot stretch a moving shoe into a fin.
            cut = bmesh.ops.bisect_plane(bm, geom=list(bm.verts)+list(bm.edges)+list(bm.faces), plane_co=(0, 0, .12), plane_no=(0, 0, 1), dist=.000001)
            boundaries = [e for e in cut['geom_cut'] if isinstance(e, bmesh.types.BMEdge)]
            bmesh.ops.split_edges(bm, edges=boundaries)
            part = bm.verts.layers.int.new('eq_foot_part')
            for face in bm.faces:
                if face.calc_center_median().z < .119999:
                    for v in face.verts:
                        v[part] = 1
            # A five-millimetre source offset left one shoe above the ground.
            for sign in [-1, 1]:
                sole = [v for v in bm.verts if v[part] and v.co.x*sign > 0]
                floor = min(v.co.z for v in sole)
                for v in sole:
                    v.co.z -= floor
        bm.to_mesh(mesh.data)
        bm.free()
    bones = bones_for(s, aid)
    arm = make_armature(bones, aid)
    counts = {}
    for mesh in meshes:
        bpy.ops.object.select_all(action='DESELECT')
        for bone in arm.data.bones:
            bone.use_deform = bone.name not in ['root', 'backpack'] and not bone.name.startswith('skirt.')
        mesh.select_set(True)
        arm.select_set(True)
        bpy.context.view_layer.objects.active = arm
        bpy.ops.object.parent_set(type='ARMATURE_AUTO')
        for bone in arm.data.bones:
            bone.use_deform = True
        counts[mesh.name] = skin_weights(mesh, bones, aid, s)
        modifier = next(m for m in mesh.modifiers if m.type == 'ARMATURE')
        modifier.name = 'Anatomical skin'
        modifier.object = arm
        modifier.use_deform_preserve_volume = False
        mesh.parent = arm
    clips, contacts = animate(arm, bones, aid, s)
    bpy.context.scene.frame_set(0)
    bpy.ops.wm.save_as_mainfile(filepath=str(target/(aid+'-anatomical.blend')))
    output = target/(aid+'-review.glb')
    bpy.ops.export_scene.gltf(filepath=str(output), export_format='GLB', export_image_format='AUTO', export_keep_originals=True, export_animations=True, export_animation_mode='ACTIONS', export_anim_single_armature=True, export_merge_animation='ACTION', export_rest_position_armature=True, export_reset_pose_bones=True, export_skins=True, export_def_bones=True)
    images = restore_images(source, output)
    if sha(source) != source_hash:
        raise RuntimeError('Original source changed')
    metadata = {'schema': 'evidence-quest.anatomical-character.v2', 'asset': aid, 'source': s['source'], 'sourceSha256': source_hash, 'model': str(output.relative_to(PILOT)), 'sha256': sha(output), 'reviewOnly': True, 'formApproval': 'PENDING', 'productionExport': False, 'additionalTripoCredits': 0, 'specification': s, 'bones': {name: {'head': list(b['head']), 'tail': list(b['tail']), 'parent': b['parent']} for name, b in bones.items()}, 'weightCounts': counts, 'clips': clips, 'originalImages': images}
    (target/'rig.json').write_text(json.dumps(metadata, indent=2)+'\n')
    (target/'foot-contacts.json').write_text(json.dumps(contacts)+'\n')
    print('REBUILT_CHARACTER '+json.dumps({'asset': aid, 'sha256': metadata['sha256'], 'bones': len(bones), 'clips': clips}))


if __name__ == '__main__':
    requested = sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else list(SPECS)
    for character in requested:
        build(character)
