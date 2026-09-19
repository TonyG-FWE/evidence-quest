import bpy,json,pathlib,sys
from mathutils import Vector
root=pathlib.Path.cwd()/'evidence/hands-on-20260916/pilot/articulated-library-20260917'
for aid in sys.argv[sys.argv.index('--')+1:]:
 bpy.ops.wm.open_mainfile(filepath=str(root/'models'/aid/(aid+'-articulated.blend')))
 mesh=bpy.data.objects[aid+'_painted_body'];image=next(n.image for n in mesh.active_material.node_tree.nodes if n.type=='TEX_IMAGE' and ('color' in n.name.lower() or 'color' in n.image.name.lower()))
 pixels=list(image.pixels);w,h=image.size
 points={'rina':(-.2119,.289,.0740),'sol':(-.142,.370,.114),'grandma':(-.1895,.5521,.0357),'mara':(-.178,.886,.0177)}
 p=points[aid];v=min(mesh.data.vertices,key=lambda v:(v.co-Vector((p[0],-p[2],p[1]))).length)
 result=[]
 for loop in mesh.data.loops:
  if loop.vertex_index!=v.index:continue
  uv=mesh.data.uv_layers.active.data[loop.index].uv;i=(min(h-1,max(0,int(uv.y*h)))*w+min(w-1,max(0,int(uv.x*w))))*4
  result.append({'uv':list(uv),'rgb':pixels[i:i+3]})
 print('SAMPLE',aid,image.name,image.colorspace_settings.name,list(v.co),result)
