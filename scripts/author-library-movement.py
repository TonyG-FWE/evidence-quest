"""Re-author review clips on an existing fitted skin, preserving source anatomy."""
import bpy,json,pathlib,sys,importlib.util
from mathutils.kdtree import KDTree
from mathutils import Vector
import math
root=pathlib.Path.cwd();spec=importlib.util.spec_from_file_location('rig',root/'scripts/build-articulated-character.py');R=importlib.util.module_from_spec(spec);spec.loader.exec_module(R)
for aid in sys.argv[sys.argv.index('--')+1:]:
 folder=R.LIB/'models'/aid;meta=json.loads((folder/'model.json').read_text());fit=json.loads((R.LIB/'fits'/(aid+'.json')).read_text());R.archive(folder)
 bpy.ops.wm.open_mainfile(filepath=str(folder/(aid+'-articulated.blend')))
 arm=bpy.data.objects[aid+'_rig'];arm.animation_data_clear()
 # Weight the forefoot geometry to its existing anatomical hinge. This keeps
 # the fitted leg and ankle weights unchanged and permits toe flex in swing.
 body=bpy.data.objects[aid+'_painted_body']
 if fit.get('preserveValidatedBodyWeights'):
  source=root/fit['preserveValidatedBodyWeights'];before=set(bpy.data.objects)
  with bpy.data.libraries.load(str(source),link=False) as (available,loaded):loaded.objects=[aid+'_painted_body']
  prior=next(o for o in set(bpy.data.objects)-before if o.type=='MESH');tree=KDTree(len(prior.data.vertices))
  for vertex in prior.data.vertices:tree.insert(vertex.co,vertex.index)
  tree.balance();rows=[{prior.vertex_groups[g.group].name:g.weight for g in v.groups} for v in prior.data.vertices]
  for group in list(body.vertex_groups):body.vertex_groups.remove(group)
  groups={name:body.vertex_groups.new(name=name) for name in {n for row in rows for n in row}}
  for vertex in body.data.vertices:
   nearby=tree.find_n(vertex.co,4);weights={}
   if nearby[0][2]<.00001:weights=rows[nearby[0][1]]
   else:
    for _,idx,distance in nearby:
     for name,value in rows[idx].items():weights[name]=weights.get(name,0)+value/max(.00001,distance)**2
   weights=dict(sorted(weights.items(),key=lambda kv:-kv[1])[:4]);total=sum(weights.values())
   for name,value in weights.items():groups[name].add([vertex.index],value/total,'REPLACE')
  bpy.data.objects.remove(prior,do_unlink=True);meta['weightProvenance']={'editableSource':fit['preserveValidatedBodyWeights'],'sha256':R.sha(source),'method':'Preserve validated weights at matching rest vertices; interpolate locally added surface vertices.'}
 # Sample a clear skin patch rather than an atlas seam beside a cuff/backpack.
 # Rebuilt hands keep the original PBR buffers, with their own safe UV patch.
 image=next((n.image for n in body.active_material.node_tree.nodes if n.type=='TEX_IMAGE' and ('color' in n.name.lower() or 'color' in n.image.name.lower())),None)
 if image is None:image=next(n.image for n in body.active_material.node_tree.nodes if n.type=='TEX_IMAGE')
 pixels=list(image.pixels);iw,ih=image.size;uvs=body.data.uv_layers.active.data
 def color_at(uv):
  index=(min(ih-1,max(0,int(uv.y*ih)))*iw+min(iw-1,max(0,int(uv.x*iw))))*4;return pixels[index:index+3]
 meta['handSkinSamples']={}
 for side in ['L','R']:
  sh,el,wr=[Vector(p) for p in fit['arms'][side]];target=Vector(fit['handSkinReferencePoint']) if 'handSkinReferencePoint' in fit else wr+(el-wr).normalized()*.035+Vector((0,0,.012));candidates=[]
  for poly in body.data.polygons:
   uv=sum((uvs[i].uv for i in poly.loop_indices),Vector((0,0)))/len(poly.loop_indices);r,g,b=color_at(uv)
   if r>g*1.08 and r<g*2.10 and g>b*1.12 and b>g*.40 and r>.22:
    centre=sum((R.G(body.data.vertices[i].co) for i in poly.vertices),Vector())/len(poly.vertices);candidates.append(((centre-target).length_squared,uv))
  assert candidates,aid+' '+side+' has no suitable source skin patch';_,uv=min(candidates,key=lambda row:row[0]);hand=bpy.data.objects[aid+'_articulated_hand_'+side]
  for loop in hand.data.loops:hand.data.uv_layers.active.data[loop.index].uv=uv+Vector((math.sin(loop.vertex_index*.53)*.00020,math.cos(loop.vertex_index*.37)*.00020))
  forearm=bpy.data.objects.get(aid+'_closed_forearm_'+side)
  if forearm:
   for loop in forearm.data.loops:forearm.data.uv_layers.active.data[loop.index].uv=uv+Vector((math.sin(loop.vertex_index*.53)*.00020,math.cos(loop.vertex_index*.37)*.00020))
  meta['handSkinSamples'][side]={'uv':list(uv),'rgb':color_at(uv),'sourceImage':image.name}
 if fit.get('wristBoundaryBinding'):
  for v in body.data.vertices:
   p=R.G(v.co);side='L' if p.x>=0 else 'R';sh,el,wr=[Vector(q) for q in fit['arms'][side]];d=(wr-el).normalized();d.z=0;d.normalize();relative=p-wr;along=relative.dot(d);perp=(relative-d*along).length
   if perp<fit['handWidth']*1.8 and along>-.080:
    row={body.vertex_groups[g.group].name:g.weight for g in v.groups};armWeight=sum(w for n,w in row.items() if n.startswith(('forearm','hand_')));blend=R.smooth((along+.080)/.075)*(1-R.smooth((perp-fit['handWidth']*.80)/(fit['handWidth']*.90)))*R.smooth((armWeight-.20)/.45)
    if blend>.00001:
     for g in list(v.groups):body.vertex_groups[g.group].remove([v.index])
     for name,value in row.items():body.vertex_groups[name].add([v.index],value*(1-blend),'REPLACE')
     group=body.vertex_groups['hand_'+side];existing=row.get('hand_'+side,0)*(1-blend);group.add([v.index],existing+blend,'REPLACE')
  # Restored tunic faces follow the torso, even where their surface lies near
  # the original hand. This is a garment mask, not a hand animation override.
  colors={loop.vertex_index:color_at(uvs[loop.index].uv) for loop in body.data.loops}
  for v in body.data.vertices:
   x,y,z=R.G(v.co);r,g,b=colors[v.index]
   if fit.get('tunicHem',999)-.01<y<fit['shoulderY']-.13 and abs(x)<fit.get('tunicWidth',.2)+.01 and z>-.13 and g>r*1.08 and b>r*1.08:
    for entry in list(v.groups):body.vertex_groups[entry.group].remove([v.index])
    body.vertex_groups['pelvis'].add([v.index],.75,'REPLACE');body.vertex_groups['spine_lower'].add([v.index],.25,'REPLACE')
 if fit.get('fittedSleeveOwnership') and 'eq_limb_region' in body.data.attributes:
  for vertex in body.data.vertices:
   p=R.G(vertex.co);region=body.data.attributes['eq_limb_region'].data[vertex.index].value;row={body.vertex_groups[g.group].name:g.weight for g in vertex.groups}
   if not(fit['hipY']+.035<p.y<fit['neckY']-.01):continue
   if region in [1,2]:
    side='L' if region==1 else 'R';sh,el,wr=[Vector(q) for q in fit['arms'][side]];fore=R.smooth((el.y-p.y+.08)/.16);row={'upper_arm_'+side:1-fore,'forearm_'+side:fore}
   else:
    moved=sum(row.pop(n,0) for n in list(row) if n.startswith(('clavicle_','upper_arm_','forearm_','hand_')));row['chest']=row.get('chest',0)+moved
   for entry in list(vertex.groups):body.vertex_groups[entry.group].remove([vertex.index])
   for name,value in row.items():
    if value>0:body.vertex_groups[name].add([vertex.index],value,'REPLACE')
 for v in body.data.vertices:
  p=R.G(v.co);weights={body.vertex_groups[g.group].name:g.weight for g in v.groups}
  for side in ['L','R']:
   if fit.get('kneeBlendAfterBind') and abs(p.y-fit['kneeY'])<.08:
    first,second='shin_'+side,'thigh_'+side;total=weights.get(first,0)+weights.get(second,0);band=fit['kneeBlendAfterBind'];fraction=R.smooth((p.y-fit['kneeY']+band/2)/band)
    if total>.2:body.vertex_groups[first].add([v.index],total*(1-fraction),'REPLACE');body.vertex_groups[second].add([v.index],total*fraction,'REPLACE')
   if fit.get('elbowBlendAfterBind') and abs(p.y-fit['arms'][side][1][1])<.08:
    first,second='upper_arm_'+side,'forearm_'+side;total=weights.get(first,0)+weights.get(second,0);band=fit['elbowBlendAfterBind'];fraction=R.smooth((fit['arms'][side][1][1]-p.y+band/2)/band)
    if total>.6:body.vertex_groups[first].add([v.index],total*(1-fraction),'REPLACE');body.vertex_groups[second].add([v.index],total*fraction,'REPLACE')
 for side,sign in [('L',1),('R',-1)]:
  foot=body.vertex_groups.get('foot_'+side);toe=body.vertex_groups.get('toe_'+side) or body.vertex_groups.new(name='toe_'+side)
  for v in body.data.vertices:
   p=R.G(v.co)
   if p.x*sign<=0 or p.y>fit['ankleY']+.01:continue
   amount=R.smooth((p.z-(fit.get('footZ',0)+fit['footLength']*.42))/.035)
   weights={body.vertex_groups[g.group].name:g.weight for g in v.groups};total=weights.get('foot_'+side,0)+weights.get('toe_'+side,0)
   if total>0:foot.add([v.index],total*(1-amount),'REPLACE');toe.add([v.index],total*amount,'REPLACE')
 for action in list(bpy.data.actions):bpy.data.actions.remove(action)
 bones,hands=R.make_bones(fit);clips,contacts=R.animate(arm,bones,hands,fit,aid)
 bpy.ops.wm.save_as_mainfile(filepath=str(folder/(aid+'-articulated.blend')))
 output=folder/meta['file'];bpy.ops.export_scene.gltf(filepath=str(output),export_format='GLB',export_image_format='AUTO',export_keep_originals=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_merge_animation='ACTION',export_rest_position_armature=True,export_reset_pose_bones=True,export_skins=True,export_def_bones=False,export_extras=True)
 meta['originalImages']=R._helpers.restore_images(root/meta['source'],output);meta['sha256']=R.sha(output);meta['clips']=clips;meta['motionGeneratorSha256']=R.sha(root/'scripts/build-articulated-character.py');meta['fitSha256']=R.sha(R.LIB/'fits'/(aid+'.json'))
 meta['adapter']={'joints':{n:n for n in bones},'clips':{'idle':clips['idle']['name'],'walk':clips['walk']['name'],'carryIdle':clips['carry_idle']['name'],'carryWalk':clips['carry_walk']['name'],**({'jog':clips['jog']['name'],'carryJog':clips['carry_jog']['name']} if 'jog' in clips else {})},'attachments':{side:{'wrist':meta['hands'][side]['wrist'],'palm':meta['hands'][side]['palm'],'normal':meta['hands'][side]['normal']} for side in ['L','R']},'authority':'presentation-only; caller owns position, possessions and consequences'}
 (folder/'model.json').write_text(json.dumps(meta,indent=2)+'\n');(folder/'contact-targets.json').write_text(json.dumps(contacts,separators=(',',':'))+'\n')
 print('MOTION',aid,len(clips),flush=True)
