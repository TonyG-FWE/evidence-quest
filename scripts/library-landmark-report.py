import bpy,json,pathlib,sys
from mathutils import Vector
aid=sys.argv[sys.argv.index('--')+1];root=pathlib.Path.cwd()/'evidence/hands-on-20260916/pilot/articulated-library-20260917'
bpy.ops.wm.open_mainfile(filepath=str(root/'intake'/aid/(aid+'-normalized.blend')))
pts=[Vector((v.co.x,v.co.z,-v.co.y)) for o in bpy.context.scene.objects if o.type=='MESH' for v in o.data.vertices]
h=max(p.y for p in pts);rows=[]
for f in [.08,.12,.20,.28,.32,.36,.40,.44,.48,.52,.56,.60,.64,.68]:
 row={'height':round(f*h,4),'parts':[]}
 for sign in [-1,1]:
  layer=[p for p in pts if abs(p.y-f*h)<h*.012 and p.x*sign>(.13 if f>.30 else .015)]
  if not layer:continue
  # Outer third gives the arm without torso. Full foot/leg cross section below hip.
  if f>.30:
   cutoff=max(p.x*sign for p in layer)-h*.070
   layer=[p for p in layer if p.x*sign>=cutoff]
  centre=sum(layer,Vector())/len(layer)
  row['parts'].append({'side':'L' if sign>0 else 'R','centre':[round(v,4) for v in centre],'x':[round(min(p.x for p in layer),4),round(max(p.x for p in layer),4)],'z':[round(min(p.z for p in layer),4),round(max(p.z for p in layer),4)]})
 rows.append(row)
out={'asset':aid,'height':h,'rows':rows};(root/'intake'/aid/'landmarks-measured.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out))
