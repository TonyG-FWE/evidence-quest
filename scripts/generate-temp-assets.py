"""Original Q01 flat paper components, not edits/crops of illustrated references.
Pillow 12.3.0. Every exported component retains the Item 10 frame/padding/anchor.
"""
import json, math, hashlib, datetime
from pathlib import Path
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parent.parent
M=json.loads((ROOT/'docs/design/evidence-quest-design-v3/10-asset-production/asset-manifest.json').read_text('utf-8'))
P={'ink':'#18324B','teal':'#14646B','paper':'#FFF9E9','cream':'#FFFEFA','sun':'#F3C65C','coral':'#E9725C','blue':'#3867D6','plum':'#704F89','mint':'#D9EFDF','wood':'#DBAA77','lightwood':'#EEC69D','green':'#6C9B64','sky':'#DCECEF','water':'#68B5CA','brown':'#5D3B28','gold':'#B98332'}

class Shapes:
 def __init__(self,image,box):
  self.d=ImageDraw.Draw(image);self.x,self.y,self.r,self.b=box;self.w=self.r-self.x;self.h=self.b-self.y
 def xy(self,x,y):return (round(self.x+x*self.w/100),round(self.y+y*self.h/100))
 def box(self,b):return (*self.xy(*b[:2]),*self.xy(*b[2:]))
 def color(self,c):return P.get(c,c) if c else None
 def line(self,points,c='ink',w=2):self.d.line([self.xy(*p) for p in points],fill=self.color(c),width=max(1,round(w*min(self.w,self.h)/100)),joint='curve')
 def rect(self,b,c,outline='ink',radius=0,w=1.2):self.d.rounded_rectangle(self.box(b),radius=round(radius*min(self.w,self.h)/100),fill=self.color(c),outline=self.color(outline),width=max(1,round(w*min(self.w,self.h)/100)))
 def ellipse(self,b,c,outline=None):self.d.ellipse(self.box(b),fill=self.color(c),outline=self.color(outline),width=max(1,round(min(self.w,self.h)/90)))
 def poly(self,pts,c,outline='ink'):self.d.polygon([self.xy(*p) for p in pts],fill=self.color(c),outline=self.color(outline))

def boat(s,x,y,w=35,h=19):
 s.poly([(x,y),(x+w/2,y-h/3),(x+w,y),(x+w*.75,y+h),(x+w*.24,y+h)],'coral')
 s.poly([(x,y),(x+w/2,y-h/3),(x+w,y),(x+w/2,y+3)],'paper')
def flower(s,open=True):
 s.line([(50,95),(50,37)],'green',5);s.poly([(48,72),(24,60),(35,80),(50,84)],'green');s.poly([(52,57),(74,43),(71,64),(51,72)],'green')
 if open:
  for a in range(0,360,60):
   x=50+17*math.cos(math.radians(a));y=28+14*math.sin(math.radians(a));s.ellipse([x-12,y-11,x+12,y+11],'sun','gold')
  s.ellipse([39,18,61,40],'coral','gold')
 else:s.ellipse([40,23,60,42],'green','teal')
def robot(s,variant,frame):
 s.line([(31,25),(31,12),(50,4),(68,12),(68,25)],'teal',6)
 s.ellipse([23,79,38,99],'ink');s.ellipse([63,79,78,99],'ink')
 if frame%2:s.ellipse([25,84,35,94],'teal');s.ellipse([65,84,75,94],'teal')
 s.rect([16,21,85,84],'paper',radius=15);s.rect([17,65,84,84],'teal',radius=8)
 if 'back' in variant:s.rect([29,32,70,57],'lightwood',radius=3)
 else:
  x=58 if 'right' in variant else 39 if 'left' in variant else 51
  s.ellipse([x-19,32,x+19,65],'teal','ink');s.ellipse([x-14,35,x+14,61],'ink');s.ellipse([x+2,38,x+10,46],'cream')
  s.ellipse([21,47,27,59],'coral')
 if variant=='responsive':s.ellipse([77,63,83,69],'sun')

def person(s,who,variant,frame):
 skin={'PLAYER':'#B97743','JO':'#F4C49F','REMY':'#F3B985','ARI':'#DDA66E'}[who]
 shirt={'PLAYER':'sun','JO':'coral','REMY':'plum','ARI':'blue'}[who]
 pants={'PLAYER':'blue','JO':'teal','REMY':'ink','ARI':'sun'}[who]
 back='back' in variant;left='left' in variant;right='right' in variant
 dx=-5 if left else 5 if right else 0
 step=5*math.sin(frame*math.pi/2) if variant.startswith('walk') else 0
 s.poly([(33,64),(49,63),(46+step,93),(27+step,93)],pants)
 s.poly([(51,63),(68,64),(75-step,93),(55-step,93)],pants)
 s.rect([25+step,91,48+step,99],'coral' if who=='PLAYER' else 'cream',radius=4)
 s.rect([53-step,91,77-step,99],'coral' if who=='PLAYER' else 'cream',radius=4)
 s.poly([(33,32),(68,32),(75,66),(28,66)],shirt)
 if who=='JO':s.rect([39,35,64,66],'teal',radius=2);s.line([(40,32),(42,45),(61,45),(63,32)],'teal',5)
 if who=='PLAYER':s.poly([(42,32),(58,32),(62,64),(39,64)],'teal');s.line([(32,40),(35,60)],'gold')
 if who=='ARI':s.poly([(36,32),(50,40),(64,32)],'coral')
 reach=variant in ['talk','receive','acknowledge','celebrate'] or 'reach' in variant
 carry='carry' in variant
 s.line([(33,37),(22,52),(25,63)] if not reach else [(33,37),(16,46),(5,40)],shirt,10)
 s.line([(67,37),(79,52),(74,63)] if not carry else [(67,37),(81,46),(89,39)],shirt,10)
 s.ellipse([18 if not reach else 0,57 if not reach else 35,30 if not reach else 12,66 if not reach else 43],skin)
 s.ellipse([68 if not carry else 83,58 if not carry else 34,80 if not carry else 96,67 if not carry else 43],skin)
 s.ellipse([30+dx,5,71+dx,35],skin,'brown')
 if who=='ARI':s.poly([(27+dx,7),(47+dx,1),(72+dx,7),(79+dx,37),(68+dx,36),(66+dx,13),(32+dx,22)],'#292A32')
 elif who=='REMY':s.poly([(26+dx,14),(33+dx,4),(48+dx,0),(55+dx,6),(73+dx,4),(70+dx,17),(48+dx,10),(31+dx,22)],'#AD5028')
 else:
  for x,y in [(30,8),(39,3),(50,3),(62,3),(70,10)]:s.ellipse([x+dx-7,y-3,x+dx+9,y+10],'brown','ink')
  if who=='JO':s.ellipse([14,0,37,15],'brown','ink');s.ellipse([67,0,90,15],'brown','ink')
 if not back:
  s.ellipse([40+dx,19,44+dx,23],'ink');s.ellipse([57+dx,19,61+dx,23],'ink');s.line([(46+dx,28),(51+dx,30),(56+dx,27)],'brown',1.8)
 else:s.ellipse([30+dx,4,71+dx,30],'brown' if who in ['PLAYER','JO'] else '#AD5028' if who=='REMY' else '#292A32')
 if who=='REMY':s.rect([58,44,84,61],'ink',radius=2);s.line([(61,48),(77,48)],'teal')

def draw_component(s,id,v,frame):
 short=id.removeprefix('ASSET.')
 if short.startswith('ENV.') and short.endswith('BACKPLATE'):
  cy='.CY.' in short
  s.rect([0,0,100,36],'paper' if cy else 'lightwood',None);s.rect([0,36,100,100],'wood',None)
  if cy:s.rect([0,0,100,14],'sky',None)
  for y in range(36,101,11):s.line([(0,y),(100,y)],'#BF8E62',.3)
  for y,x in [(36,22),(47,48),(58,70),(69,30),(80,55),(91,80)]:s.line([(x,y),(x,y+11)],'#BF8E62',.2)
  s.line([(0,35),(100,35)],'brown',.7)
  if '.ST.' in short:s.rect([31.67,2.5,95,31.25],'wood','brown',2);s.rect([32.5,3.5,94.2,30.3],'sky','teal',1)
  if '.MD.' in short:s.rect([18.3,2.5,86.7,22.5],'paper','wood',1)
  for x in ([1,3,97,99] if cy else [1,3]):
   s.line([(x,0),(x+1,16)],'green',.25)
   for y in [2,6,10]:s.ellipse([x-1,y,x+2,y+4],'green')
 elif short=='ENV.DOOR':
  s.rect([4,1,96,98],'wood','brown',6);s.rect([15,7,86,99],'sky','teal',4)
  if v=='north':s.line([(18,95),(84,95)],'sun',4)
  elif v=='south':s.line([(18,8),(84,8)],'sun',4)
 elif short.startswith('ACT.'):
  who=short.split('.')[-1]
  robot(s,v,frame) if who=='LOOP' else person(s,who,v,frame)
 elif short.startswith('TILE.'):
  s.rect([2,2,98,98],'teal','ink',9);s.rect([7,6,93,91],'paper','teal',7)
  if short.endswith('FERRY'):boat(s,19,42,62,28)
  elif short.endswith('BRIDGE'):boat(s,15,43,35,23);boat(s,50,43,35,23);s.line([(44,54),(56,54)],'lightwood',4)
  elif short.endswith('PLANT'):s.poly([(17,76),(29,50),(46,35),(63,35),(82,76)],'green')
  else:flower(s)
 elif short.startswith('PUP.'):
  name=short[4:]
  if name=='LEFT_BANK':s.poly([(0,20),(26,3),(57,12),(100,18),(100,100),(0,100)],'green',None)
  elif name=='RIVER':s.poly([(0,8),(35,13),(65,3),(100,8),(100,100),(0,100)],'water',None);s.line([(15,65),(42,70),(67,62),(90,65)],'paper',2)
  elif name=='HILL':s.poly([(0,50),(32,22),(59,4),(100,0),(100,100),(0,100)],'green',None)
  elif name=='BROKEN_BRIDGE':s.poly([(2,35),(85,18),(70,36),(98,46),(73,58),(83,76),(3,88)],'wood')
  elif name=='BOAT':boat(s,2,24,96,66)
  elif name=='JOIN':s.poly([(1,30),(99,15),(96,74),(1,88)],'lightwood');s.line([(10,45),(86,36)],'brown')
  elif name=='SEED':s.ellipse([5,14,94,89],'gold','brown');s.line([(40,30),(60,55),(56,69)],'sun',5)
  elif name=='BACKPACK':s.rect([5,2,95,97],'coral','brown',7);s.rect([34,26,67,53],'sun','brown',2);s.line([(22,81),(65,63)],'paper',3)
  elif name=='ROOTS':s.ellipse([1,4,99,36],'brown');s.line([(50,15),(46,60),(22,92)],'gold',4);s.line([(47,53),(74,80)],'gold',4);s.line([(48,42),(26,56)],'gold',3)
  elif name=='FLOWER':flower(s,v=='open')
  elif name in ['PIP','GRANDMA']:
   gm=name=='GRANDMA';x=62 if gm else 42
   s.poly([(x-16,75),(x-3,73),(x-3,97),(x-19,97)],'ink' if not gm else 'plum');s.poly([(x+1,74),(x+15,74),(x+20,97),(x+3,97)],'ink' if not gm else 'plum')
   s.poly([(x-14,37),(x+14,37),(x+21,78),(x-21,78)],'coral' if gm else 'teal')
   s.ellipse([x-17,4,x+17,38],'#CB995F','brown')
   if gm:
    for px,py in [(x-18,6),(x-7,1),(x+6,1),(x+15,8)]:s.ellipse([px-6,py,px+8,py+14],'paper')
   else:s.poly([(x-22,18),(x-22,7),(x-11,9),(x-7,1),(x+2,6),(x+13,3),(x+22,12),(x+16,22),(x+6,11),(x-7,18)],'ink')
   s.ellipse([x-8,22,x-4,26],'ink');s.ellipse([x+5,22,x+9,26],'ink');s.line([(x-4,31),(x,33),(x+5,30)],'brown',2)
   reach=v in ['planting','receiving','crossing'];target=(4,74) if gm else (90,74)
   s.line([(x-13 if gm else x+13,44),target if reach else (x-24 if gm else x+24,65)],'coral' if gm else 'teal',9)
  else:raise ValueError(id)
 elif short=='SOURCE.E2.CLIP':
  s.rect([0,0,100,100],'paper',None);s.rect([0,68,100,100],'wood',None);s.rect([64,8,84,82],'brown','ink');s.rect([67,12,81,79],'sky',None)
  if v!='frame3':
   x=31 if v=='frame1' else 59;s.rect([x,68,x+24,77],'teal');s.ellipse([x+2,76,x+7,84],'ink');s.ellipse([x+18,76,x+23,84],'ink')
   sub=Shapes(s.d._image,(*s.xy(x+4,34),*s.xy(x+22,69)));robot(sub,'rolling-right',0)
 elif short=='SOURCE.E2.PHOTO':
  s.rect([0,0,100,100],'wood',None);s.rect([6,2,94,98],'paper','gold',3);s.poly([(6,0),(94,0),(88,33),(7,38)],'lightwood');s.poly([(6,64),(94,63),(94,100),(6,100)],'lightwood')
 elif short.startswith('PROP.'):
  n=short[5:]
  furniture=['ST.MODEL.CABINET','ST.BOARD','ST.DOCK.BODY','ST.CONSOLE','CY.BENCH','CY.STAND','CY.BOARD','WK.BENCH','WK.SIGN','MD.TABLE','MD.RACK']
  if n in furniture:
   s.rect([7,15,17,99],'wood','brown',2);s.rect([83,15,93,99],'wood','brown',2)
   s.rect([1,2,99,85],'teal' if n in ['ST.DOCK.BODY','CY.BOARD','WK.SIGN'] else 'wood','brown',4)
   s.rect([5,6,95,76],'sky' if n=='ST.MODEL.CABINET' else 'lightwood' if n not in ['ST.DOCK.BODY','CY.BOARD','MD.RACK'] else 'teal','brown',3)
   s.line([(7,81),(94,81)],'brown',2)
   if n=='MD.RACK':s.rect([52,45,96,81],'ink','teal',4)
   if n=='ST.CONSOLE':s.rect([5,13,25,70],'teal');s.rect([29,13,77,70],'teal')
  elif n in ['BRIEF.FLAP','REQUEST','LEAFLET','NOTICE','NOTE.DRAWER','MODEL.TAB','DOCK.FLAP','CADDY.LID']:
   paper=n in ['BRIEF.FLAP','REQUEST','LEAFLET','NOTICE']
   if v in ['moving','lifted','raised','open']:s.poly([(4,25),(92,3),(97,74),(8,97)],'paper' if paper else 'teal')
   else:s.rect([3,3,97,95],'paper' if paper else 'coral' if n=='MODEL.TAB' else 'teal','brown',4)
   if v in ['folded','down','pocket']:s.line([(5,5),(50,53),(95,5)],'gold',2)
   if v=='curled':s.poly([(3,1),(97,1),(94,32),(5,38)],'lightwood');s.poly([(4,65),(96,60),(96,98),(4,98)],'lightwood')
   if n in ['NOTE.DRAWER','MODEL.TAB']:s.rect([32,40,68,57],'ink',radius=4)
   if n=='CADDY.LID':s.line([(28,12),(28,3),(70,3),(70,12)],'ink',4)
  elif n in ['DEVICE','SLATE']:
   s.rect([1,1,99,98],'teal','ink',7);s.rect([12,13,88,86],'paper','ink',3)
  elif n=='CADDY.BODY':
   s.rect([1,1,99,97],'teal','ink',7);s.rect([8,8,92,88],'wood','brown',2);s.line([(50,8),(50,87)],'brown',3);s.line([(8,48),(92,48)],'brown',3)
  elif n=='NOTICE.CLIP':s.rect([10,20,90,90],'gold','ink',10);s.line([(23,30),(76,30)],'sun',4)
  elif n=='PETAL':s.poly([(50,2),(94,40 if v=='flat' else 58),(53,97),(3,57)],'coral');s.line([(50,5),(52,96)],'gold',2)
  elif n=='TOAST.BODY':s.rect([3,4,97,88],'teal','ink',8);s.rect([11,10,89,71],'wood','brown',6);s.rect([35,77,66,95],'sun','ink',4)
  elif n=='TOAST.LID':s.rect([3,3,97,97 if v=='closed' else 38],'wood','brown',12);s.line([(30,5),(36,0),(65,0),(73,6)],'gold',5)
  elif n=='TOAST.ARM':s.line([(50,97),(27,51),(72,4)],'gold',20);s.ellipse([8,39,49,61],'sun','brown')
  elif n=='TOAST.TRAY':s.ellipse([2,2,98,90],'wood','gold');s.ellipse([8,8,92,60],'lightwood','brown')
  elif n=='TOAST.PIECE':s.rect([10,10,90,93],'brown','gold',14);s.rect([17,16,83,86],'wood','brown',12);s.ellipse([33,30,39,38],'gold');s.ellipse([60,57,66,65],'gold')
  elif n=='TOAST.GLASS':s.line([(59,66),(89,96)],'teal',11);s.ellipse([1,1,80,75],None,'gold');s.ellipse([8,8,73,68],None,'ink')
  else:raise ValueError(id)
 else:raise ValueError(id)

records=[]
for a in M['assets']:
 if a['representation']!='raster':continue
 for v in a['variants']:
  for e in [x for x in a['exports'] if x['variantId']==v['id'] and x['format']=='png']:
   image=Image.new('RGBA',(e['width'],e['height']),(0,0,0,0));d=e['density'];fw=e['frameWidth'];fh=e['frameHeight'];pad=a['geometry']['paddingBasePixels']*d
   for frame in range(v['frames']):
    x=(frame%e['columns'])*fw;y=(frame//e['columns'])*fh
    draw_component(Shapes(image,(x+pad,y+pad,x+fw-pad,y+fh-pad)),a['id'],v['key'],frame)
   path=ROOT/'public/temp'/e['path'];path.parent.mkdir(parents=True,exist_ok=True);image.save(path,optimize=True)
   records.append(dict(e,exists=True,actualBytes=path.stat().st_size,sha256=hashlib.sha256(path.read_bytes()).hexdigest(),url='/temp/'+e['path'],assetId=a['id'],anchor=a['geometry']['anchor'],contentRectPixels=a['geometry']['contentRectPixels'],temporary=True))
assert len({r['assetId'] for r in records})==58
out={'createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'quality':'Q01 temporary original flat paper and line components; final illustrated production remains required.','tool':'Pillow 12.3.0','exports':records,'assets':[dict(id=a['id'],geometry=a['geometry'],variants=a['variants'],temporary=a['temporary'],budget=a['budget']) for a in M['assets'] if a['representation']=='raster'],'bindings':M['bindings'],'clips':M['clips']}
(ROOT/'content/temp-assets.json').write_text(json.dumps(out,indent=2)+'\n','utf-8')
budget=[]
for a in out['assets']:
 for density,cap in [(1,'baseTransferCapBytes'),(2,'highTransferCapBytes')]:
  size=sum(r['actualBytes'] for r in records if r['assetId']==a['id'] and r['density']==density)
  assert size<=a['budget'][cap],(a['id'],density,size,a['budget'][cap]);budget.append({'id':a['id'],'density':density,'bytes':size,'cap':a['budget'][cap]})
(ROOT/'evidence/temp-assets.json').write_text(json.dumps({'checkedAt':out['createdAt'],'fixture':'FIX11.TEMP','check':'CHECK11.VISUAL','rasterAssets':58,'variants':len({r['variantId'] for r in records}),'pngExports':len(records),'bytes':sum(r['actualBytes'] for r in records),'dimensionsAndAnchors':'Each PNG matches manifest dimensions and frame layout; anchors copied exactly.','budgets':budget,'limits':'Original temporary silhouettes; final illustration, in-browser owner composition and responsive review remain separate.'},indent=2)+'\n','utf-8')
print(json.dumps({'rasterAssets':58,'pngExports':len(records),'bytes':sum(r['actualBytes'] for r in records)}))
