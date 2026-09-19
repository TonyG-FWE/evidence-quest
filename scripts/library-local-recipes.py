"""Reference-bound, separable local review models. No gameplay or provider calls."""
import bpy,math,random,json,sys,pathlib,importlib.util
from mathutils import Vector
spec=importlib.util.spec_from_file_location('kit',pathlib.Path.cwd()/'scripts/library-model-kit.py');K=importlib.util.module_from_spec(spec);spec.loader.exec_module(K)
from math import sin,cos,pi
TAU=math.tau
cube=K.cube;ball=K.ellipsoid;tube=K.tube;beam=K.beam;cyl=K.cylinder;ring=K.ring;leaf=K.leaf;mesh=K.mesh;lathe=K.lathe;anchor=K.anchor;state=K.state;base=K.base

def table(spark=False):
 w,d,h=(1.4,.74,.79) if spark else (1.10,.63,.65)
 for i in range(5):cube('separate_top_board_'+str(i),(0,h,-d/2+(i+.5)*d/5),(w,.06,d/5-.005),'woodlight',.012)
 for x in [-w*.40,w*.40]:
  for z in [-d*.37,d*.37]:cube('leg',(x,h/2,z),(.075,h,.075),'wood',.010)
  beam('end_stretcher',(x,.20,-d*.37),(x,.20,d*.37),.045,'teal' if spark else 'wooddark')
  cube('apron_end',(x,h-.1,0),(.045,.15,d*.80),'wood')
 for z in [-d*.37,d*.37]:cube('apron_front',(0,h-.1,z),(w*.80,.13,.045),'teal' if spark else 'wood')
 beam('length_stretcher',(-w*.4,.2,0),(w*.4,.2,0),.055,'wood');anchor('working_surface',(0,h+.033,0),(0,1,0),'supporting work surface')

def bench():
 for z in [-.12,0,.12]:cube('seat_slat',(0,.42,z),(1.10,.048,.108),'woodlight')
 for x in [-.46,.46]:
  for z in [-.12,.12]:beam('leg',(x,.02,z*1.15),(x,.43,z),.055)
  beam('back_upright',(x,.12,-.13),(x,.83,-.20),.05);cube('arm_rest',(x,.59,0),(.07,.042,.42),'woodlight')
 for y in [.62,.75]:cube('back_slat',(0,y,-.18),(1.13,.085,.035),'woodlight')
 beam('lower_brace',(-.46,.2,0),(.46,.2,0),.04);anchor('seat',(0,.449,0),(0,1,0),'seated actor support')

def chest():
 cube('bottom',(0,.10,0),(.65,.07,.43),'wooddark')
 for y in [.17,.27,.37]:
  for z in [-.21,.21]:cube('side_board',(0,y,z),(.67,.09,.03),'wood')
  for x in [-.32,.32]:cube('end_board',(x,y,0),(.035,.09,.43),'wood')
 for x in [-.25,.25]:
  for z in [-.17,.17]:cube('foot',(x,.05,z),(.085,.10,.085),'wooddark')
 pivot=K.group('lid_hinge',(0,.42,-.225));old=K.PARENT;K.PARENT=pivot
 for x in [-.24,-.08,.08,.24]:cube('lid_board',(x,.012,.225),(.153,.055,.46),'woodlight')
 for x in [-.23,.23]:cube('lid_strap',(x,.044,.225),(.024,.01,.46),'iron')
 K.PARENT=old;anchor('hinge',(0,.42,-.225),(1,0,0),'lid rotation');cube('latch',(0,.36,.232),(.06,.10,.018),'iron');anchor('interior',(0,.13,0),(0,1,0),'open storage space')
 for frame,angle in [(0,0),(35,-1.5),(65,-1.5),(90,0)]:pivot.rotation_euler.x=angle;pivot.keyframe_insert('rotation_euler',frame=frame)
 pivot.animation_data.action.name='chest_open';K.CLIPS['open']={'name':'chest_open','duration':3,'cycleDistance':0}

def dock(garden=False):
 w,l=(1.05,1.35) if garden else (2.0,3.0);K.planks('deck',w,l,.34,.15)
 for x in [-w*.43,w*.43]:
  beam('under_deck_stringer',(x,.26,-l*.48),(x,.26,l*.48),.12)
  for z in [-l*.42,l*.42]:
   cyl('piling',(x,.27,z),.085,.65);cube('piling_cap',(x,.62,z),(.19,.05,.19),'woodlight');beam('diagonal_brace',(x,.02,z),(x,.29,z+(-.40 if z>0 else .40)),.065)
   cyl('mooring_pin',(x,.70,z),.035,.16,'iron');cyl('cleat_crossbar',(x,.755,z),.027,.18,'iron',axis=(1,0,0))
 anchor('boarding',(0,.374,l*.46),(0,1,0),'walkway connection');anchor('boat_mooring',(w*.5,.36,0),(1,0,0),'boat landing');anchor('seed_handoff',(0,.60,0),(0,1,0),'delivery position')

def roof_tile(at=(0,0,0),color='coral',scale=1):
 old=K.PARENT;root=K.group('tile_assembly',at);K.PARENT=root;x,y,z=(0,0,0);w=.27*scale;l=.35*scale
 vs=[]
 for row in range(4):
  for col in range(7):u=col/6;vs.append((x+(u-.5)*w,y+.017*scale*cos((u-.5)*pi)+row*.001,z+(row/3-.5)*l))
 o=mesh('curved_overlapping_tile',vs,[(r*7+c,r*7+c+1,(r+1)*7+c+1,(r+1)*7+c) for r in range(3) for c in range(6)],color,.009*scale)
 cube('locating_lip',(x,y+.025*scale,z-l*.44),(w*.90,.018*scale,.028*scale),color,.003)
 for dx in [-.055,.055]:ring('locating_hole',(x+dx*scale,y+.027*scale,z-l*.32),.007*scale,.003*scale,'wooddark')
 K.PARENT=old;return root

def building(kind):
 office=kind=='dock-office';workshop=kind=='workshop';w=2.55 if not office else 1.7;d=1.65 if not office else 1.35;floor=.18 if not office else.42;eave=1.90 if not office else 1.77;ridge=eave+.73
 K.planks('interior_floor',w,d,floor,.13,'woodlight')
 if office:
  for x in [-w*.46,w*.46]:
   for z in [-d*.43,d*.43]:cyl('office_support_pile',(x,.24,z),.075,.55);beam('office_brace',(x,.1,z),(x,.37,z*.6),.065)
  for i in range(2):cube('entry_step',(.43,.14+i*.12,d*.5+.22-i*.12),(.66,.11,.30),'woodlight')
 else:
  for i in range(9):cube('foundation_stone',(-w/2+(i+.5)*w/9,.08,d/2),(w/9-.01,.16,.23),'stone',.035)
 # Side and back walls leave the work bay and entry genuinely open.
 cube('back_wall',(0,(floor+eave)/2,-d/2),(w,eave-floor,.08),'paper')
 for x in [-w/2,w/2]:
  # Four wall panels surround a genuine glazing opening, so the interior is
  # visible from side views as well as the open front activity bay.
  wy=floor+1.01;wz=-.04;wh=.58;ww=.53
  cube('side_wall_lower',(x,(floor+wy-wh/2)/2,0),(.085,wy-wh/2-floor,d),'paper')
  cube('side_wall_upper',(x,(eave+wy+wh/2)/2,0),(.085,eave-wy-wh/2,d),'paper')
  for z0,z1 in [(-d/2,wz-ww/2),(wz+ww/2,d/2)]:cube('side_window_reveal',(x,wy,(z0+z1)/2),(.085,wh,z1-z0),'paper')
 front=d/2;split=.30 if office else .25;opening_bottom=floor+.64
 cube('front_left_sill',(-w*.24,(floor+opening_bottom)/2,front),(w*.50,opening_bottom-floor,.09),'paper')
 cube('front_entry_right',(w*.44,(floor+eave)/2,front),(w*.12,eave-floor,.09),'paper')
 cube('front_header',(0,eave-.14,front),(w,.28,.095),'paper')
 for x in [-w/2,split,w/2]:cube('front_timber_post',(x,(floor+eave)/2,front+.025),(.11,eave-floor+.08,.14),'wood')
 for y in [floor,opening_bottom,eave]:cube('cross_beam',(0,y,front+.05),(w+.12,.10,.14),'wood')
 # Gable skins and real separate tiled roof planes, including repair opening.
 for z in [-d/2,d/2]:mesh('gable', [(-w/2,eave,z),(w/2,eave,z),(0,ridge,z)],[(0,1,2)],'paper',.065)
 for sign in [-1,1]:
  beam('gable_bargeboard',(0,ridge+.02,front+.07),(sign*(w/2+.16),eave-.035,front+.07),.105,'woodlight')
  for row in range(5):
   x=sign*(row+.35)*(w/2+.18)/5;y=ridge-abs(x)*.73/(w/2)
   for col in range(7):
    z=-d*.59+(col+.5)*d*1.18/7
    if kind=='bakery' and sign==1 and row==2 and col in [4,5]:continue
    o=roof_tile((x,y,z),'green' if workshop else 'coral',1.27);o.rotation_euler.y=sign*math.atan2(.73,w/2)
  beam('eave_fascia',(sign*(w/2+.14),eave-.02,-d*.62),(sign*(w/2+.14),eave-.02,d*.62),.09,'woodlight')
 cube('ridge_cap',(0,ridge+.065,0),(.14,.09,d*1.26),'green' if workshop else 'coral')
 door=K.group('door_hinge',(split+.045,floor,front+.035));old=K.PARENT;K.PARENT=door
 width=w*.37
 for i in range(5):
  x0=i*width/5+.002;x1=(i+1)*width/5-.002
  if kind=='bakery':
   points=[(x0,0,0),(x1,0,0)]+[(x1-(x1-x0)*j/8,.95+math.sqrt(max(0,(width/2)**2-(x1-(x1-x0)*j/8-width/2)**2)),0) for j in range(9)]
   mesh('curved_top_door_plank',points,[tuple(range(len(points)))],'teal',.055)
  else:cube('door_plank',((x0+x1)/2,.69,0),(x1-x0,1.38,.055),'wood' if workshop else 'teal')
 for y in [.27,1.13]:cube('hinge_plate',(.12,y,.035),(.22,.047,.012),'iron')
 ball('door_handle',(width*.86,.72,.055),(.025,.025,.025),'iron');K.PARENT=old;door.rotation_euler.z=-.43;anchor('door_pivot',(split+.045,floor,front+.035),(0,1,0),'entry hinge')
 # Shelf and counter remain visible through open service / activity bay.
 for y in [floor+.58,floor+1.04]:cube('interior_shelf',(-w*.24,y,-d*.40),(w*.50,.045,.22),'woodlight')
 cube('working_counter',(-w*.23,opening_bottom+.03,front+.10),(w*.52,.07,.43),'woodlight');anchor('work_surface',(-w*.23,opening_bottom+.07,front+.12),(0,1,0),'visible interaction counter')
 for z in [-d*.45,0,d*.40]:cube('wall_stud',(-w*.48,(floor+eave)/2,z),(.075,eave-floor,.075),'wood')
 if not office:
  cube('chimney',(w*.34,ridge-.06,-d*.29),(.24,.72,.28),'paper');cube('chimney_cap',(w*.34,ridge+.31,-d*.29),(.32,.07,.36),'stone');cube('chimney_opening',(w*.34,ridge+.347,-d*.29),(.20,.006,.24),'wooddark')
 if kind=='bakery':
  for i in range(8):
   x=-w*.48+(i+.5)*w*.53/8;mesh('striped_canvas_awning',[(x-.085,eave-.29,front),(x+.085,eave-.29,front),(x+.085,eave-.48,front+.55),(x-.085,eave-.48,front+.55)],[(0,1,2,3)],'teal' if i%2 else 'cream',.012)
   ball('scalloped_awning_edge',(x,eave-.49,front+.55),(.087,.060,.012),'teal' if i%2 else 'cream')
  anchor('roof_repair_opening',(.62,ridge-.35,.35),(0,1,0),'missing roof tiles, open through roof');anchor('oven_chamber',(-.5,.35,-.45),(0,0,1),'baking chamber')
  cube('oven_stone_pedestal',(-.56,.46,-.45),(.62,.54,.52),'stone',.035);oven(at=(-.56,.70,-.45),scale=.71)
  for i in range(3):lathe('shelf_bowl',[(0,0),(.055,0),(.08,.05),(.09,.055),(.078,.052),(.05,.008),(0,.008)],'cream',at=(-.85+i*.22,floor+.60,-d*.4))
 # Small suspended emblem supplies identity without unreadable baked text.
 beam('sign_bracket',(-w*.48,eave-.12,front),(-w*.48,eave-.12,front+.38),.035,'iron');cube('sign_plaque',(-w*.48,eave-.32,front+.34),(.40,.23,.035),'cream')
 if office:ball('painted_boat_emblem',(-w*.48,eave-.33,front+.365),(.15,.035,.015),'teal')
 elif workshop:beam('pencil_emblem',(-w*.54,eave-.37,front+.365),(-w*.40,eave-.23,front+.365),.045,'gold')
 else:ball('bread_emblem',(-w*.48,eave-.32,front+.365),(.145,.065,.018),'crust')
 for sx in [-1,1]:
  win=K.group('side_window_assembly',(sx*(w/2+.047),floor+1.01,-.04));old=K.PARENT;K.PARENT=win
  cube('inset_window_glazing',(0,0,0),(.009,.52,.47),'glass',.002)
  for zz in [-.26,.26]:cube('window_vertical_frame',(0,0,zz),(.055,.60,.046),'woodlight')
  for yy in [-.29,0,.29]:cube('window_horizontal_frame',(0,yy,0),(.055,.039,.55),'woodlight')
  cube('window_crossbar',(0,0,0),(.06,.54,.027),'woodlight');cube('deep_window_sill',(sx*.033,-.33,0),(.14,.055,.65),'wood')
  cube('flower_box',(sx*.056,-.42,0),(.16,.12,.50),'teal')
  for j in range(5):
   z=-.20+j*.10;leaf('box_leaf',(sx*.08,-.36,z),(sx*.10,-.21,z+.045),.035,'leaf');ball('box_flower',(sx*.10,-.22,z),(.027,.025,.027),'coral')
  K.PARENT=old
 if kind=='bakery':
  state('roof_unrepaired');K.group('visible_repair_opening');state('roof_repaired')
  for col in [4,5]:
   x=2.35*(w/2+.18)/5;y=ridge-x*.73/(w/2);z=-d*.59+(col+.5)*d*1.18/7;o=roof_tile((x,y,z),'coral',1.27);o.rotation_euler.y=math.atan2(.73,w/2)
  base();bpy.data.objects[K.ASSET+'_root'].scale.x=-1
 for frame,angle in [(0,0),(35,-1.15),(65,-1.15),(90,0)]:door.rotation_euler.z=angle;door.keyframe_insert('rotation_euler',frame=frame)
 door.animation_data.action.name=kind+'_door_open';K.CLIPS['door_open']={'name':kind+'_door_open','duration':3,'cycleDistance':0}
 door.rotation_euler.z=-.43

def arbor():
 for x in [-.63,.63]:
  for z in [-.31,.31]:cube('upright',(x,.92,z),(.095,1.84,.095),'woodlight');cube('post_foot',(x,.065,z),(.16,.13,.16),'stone')
 for z in [-.34,.34]:beam('overhead_beam',(-.82,1.78,z),(.82,1.78,z),.10)
 for x in [-.70,-.42,-.14,.14,.42,.70]:beam('lattice_rafters',(x,1.88,-.53),(x,1.88,.53),.045,'woodlight')
 for x in [-.63,.63]:
  for z in [-.19,.02,.22]:beam('side_trellis',(x,.20,z),(x,1.53,z),.025)
  for y in [.45,.75,1.05,1.35]:beam('lattice_crosspiece',(x,y,-.31),(x,y,.31),.025)
 anchor('clear_open_span',(0,.01,0),(0,1,0),'walkable arch opening')

def bridge(which):
 length=1.50 if which=='bridge-a' else 1.80;width=.90;K.planks('independent_deck',width,length,.17,.115,'woodlight')
 for x in [-.34,.34]:
  beam('support_stringer',(x,.09,-length/2),(x,.09,length/2),.115)
  for z in [-length/2,length/2]:
   cube('mating_connector',(x,.085,z+(.055 if z>0 else -.055)),(.10,.065,.20),'iron');ring('connector_eye',(x,.125,z),.027,.007,'iron')
 for x in [-.48,.48]:
  for z in [-length*.46,length*.46]:cube('post_socket_shoe',(x,.17,z),(.15,.06,.15),'iron');anchor(('left' if x<0 else 'right')+('_start' if z<0 else '_end'),(x,.22,z),(0,1,0),'post socket')
 anchor('start_connector',(0,.197,-length/2),(0,0,-1),'section snap connector');anchor('end_connector',(0,.197,length/2),(0,0,1),'section snap connector')
 K.bolts([(x,.203,z) for x in [-.35,.35] for z in [-length*.4,length*.4]])

def post(center=False):
 cube('timber_shaft',(0,.41,0),(.09,.78,.09),'woodlight');cube('cap',(0,.817,0),(.14,.065,.14),'wood')
 if center:cube('deck_mounting_shoe',(0,.065,0),(.15,.13,.15),'iron');K.bolts([(-.055,.055,.08),(.055,.055,.08)])
 else:cube('ground_collar',(0,.12,0),(.14,.075,.14),'iron');mesh('buried_point',[(-.045,.035,-.045),(.045,.035,-.045),(.045,.035,.045),(-.045,.035,.045),(0,-.10,0)],[(0,1,4),(1,2,4),(2,3,4),(3,0,4)],'wood')
 ring('rope_eye',(0,.665,.062),.032,.010,'iron',(0,0,1));anchor('rope_eye',(0,.665,.067),(0,0,1),'rope attachment')
 if center:ring('opposite_guide',(0,.665,-.062),.032,.010,'iron',(0,0,1));anchor('far_rope_guide',(0,.665,-.067),(0,0,-1),'extend second span')

def rope():
 state('loose_coil');pts=[((.045+.022*t/TAU)*cos(t),.02,.0+(.045+.022*t/TAU)*sin(t)) for t in [i*.16 for i in range(160)]];tube('loose_recoverable_rope',pts,.010);tube('free_tip',[pts[-1],(.24,.024,.06),(.35,.025,.03)],.01)
 state('wrapping');tube('loop_around_post',[(.045*cos(i*.13),.10+i*.0006,.045*sin(i*.13)) for i in range(115)],.010);tube('held_end',[(.045,.17,.03),(.13,.2,.03),(.29,.22,.03)],.010)
 state('tightened_knot');tube('taut_side_rope',[(-.7,.16,0),(-.35,.13,.01),(0,.14,0),(.35,.13,.01),(.7,.16,0)],.010)
 for z in [-.012,.014]:tube('persistent_figure_eight_knot',[(.065*sin(t),.16+.035*sin(t*2),z+.025*cos(t)) for t in [i*TAU/36 for i in range(36)]],.011,closed=True)
 tube('short_tail',[(-.03,.16,0),(-.055,.10,.026),(-.058,.06,.031)],.009);base();anchor('first_end',(-.7,.16,0));anchor('center_knot',(0,.16,0));anchor('far_end',(.7,.16,0))

def crate(toolkit=False):
 w,h,d=(.36,.20,.20) if toolkit else(.68,.40,.45);cube('bottom',(0,.035,0),(w,.045,d),'wooddark')
 for z in [-d/2,d/2]:
  for y in [.10,h-.06]:cube('open_crate_board',(0,y,z),(w,.09,.025),'wood')
 for x in [-w/2,w/2]:
  for y in [.10,h-.06]:cube('end_board',(x,y,0),(.026,.09,d),'wood')
  for z in [-d*.40,d*.4]:cube('corner_brace',(x,h/2,z),(.038,h,.045),'woodlight')
  # Handholds are open gaps between the split upper end rails.
  for z in [-d*.36,d*.36]:cube('handhold_edge',(x,h-.025,z),(.032,.05,d*.24),'woodlight')
 if toolkit:
  for x in [-.16,.16]:cube('handle_support',(x,.26,0),(.035,.27,.05),'wood')
  beam('open_carry_handle',(-.16,.39,0),(.16,.39,0),.04,'woodlight');beam('hammer_grip',(.06,.075,.04),(.09,.30,.04),.025,'wood');cube('hammer_head',(.09,.31,.04),(.13,.045,.045),'iron');ball('peg_pouch',(-.09,.12,.05),(.06,.09,.065),'cream')
 anchor('carry_handle',(0,.39 if toolkit else h,0),(0,1,0),'hand grip');anchor('interior',(0,.06,0),(0,1,0),'material containment')

def gangway():
 K.planks('boarding_planks',.70,1.2,.07,.10)
 for x in [-.28,.28]:
  beam('under_stringer',(x,.025,-.6),(x,.025,.6),.075);tube('boarding_hook',[(x,.06,-.57),(x,.07,-.68),(x,-.005,-.72)],.018,'iron')
 cube('landing_lip',(0,.088,.59),(.71,.045,.08),'iron');anchor('dock_hook',(0,.1,-.65));anchor('bank_contact',(0,.1,.62))

def boat(passenger=True):
 l,w,h=(2.25,.95,.46) if passenger else(.54,.30,.16);n=48;profiles=[(.73,0),(.94,.14),(1,.65),(.98,1),(.88,.95),(.85,.63),(.73,.20)]
 vs=[];fs=[]
 for factor,y in profiles:
  for i in range(n):t=i*2*pi/n;vs.append((cos(t)*w/2*factor,h*y,sin(t)*l/2*(.98+.02*cos(t*2))))
 for row in range(len(profiles)-1):
  for i in range(n):a=row*n+i;b=row*n+(i+1)%n;fs.append((a,b,b+n,a+n))
 mesh('open_built_hull',vs,fs,'teal' if not passenger else 'wood');mesh('inside_floor',[(cos(t)*w*.35,h*.2,sin(t)*l*.90/2) for t in [i*2*pi/n for i in range(n)]],[tuple(range(n))],'woodlight')
 tube('continuous_gunwale',[(cos(t)*w*.5,h,sin(t)*l/2) for t in [i*2*pi/n for i in range(n)]],.025 if passenger else .009,'cream',True)
 if passenger:
  for z in [-.64,0,.64]:cube('bench_thwart',(0,.34,z),(.81,.065,.22),'woodlight')
  beam('tiller_arm',(0,.38,-1.0),(.23,.54,-.63),.05,'wooddark');cube('rudder',(0,.12,-1.14),(.045,.33,.25),'wood');ring('bow_mooring_ring',(0,.45,1.13),.055,.014,'iron',(0,0,1));anchor('operator_seat',(0,.375,-.64),(0,1,0));anchor('boarding_gap',(.48,.38,.31),(1,0,0))
  for x in [-.44,.44]:
   for z in [-.7,.7]:beam('rail_upright',(x,.38,z),(x,.64,z),.03)
   tube('low_safety_rail',[(x,.64,-.7),(x,.66,-.2),(x,.64,.15)],.02,'cream')
 else:
  for x in [-.065,.065]:cube('seed_cradle_rail',(x,.075,0),(.025,.035,.17),'cream')
  for z in [-.075,.075]:cube('cradle_end_stop',(0,.075,z),(.155,.035,.025),'cream')
  tube('cargo_tie',[(-.10,.095,0),(0,.135,0),(.10,.095,0)],.006);beam('flag_mast',(0,.1,-.16),(0,.36,-.16),.014,'wood');mesh('marker_flag',[(0,.35,-.16),(.12,.31,-.16),(0,.27,-.16)],[(0,1,2)],'coral',.003);anchor('seed_cradle',(0,.078,0),(0,1,0),'actual seed support')
 anchor('carry_support',(0,h*.25,0),(0,1,0));anchor('bow',(0,h,l/2))

def seed(at=(0,0,0),scale=1):
 x,y,z=at;ball('actual_seed',(x,y+.036*scale,z),(.026*scale,.036*scale,.023*scale),'crust');tube('seed_seam',[(x+.026*scale*sin(t),y+.036*scale+.036*scale*cos(t),z+.002*scale) for t in [i*pi/12 for i in range(25)]],.001*scale,'wooddark');ball('pale_seed_mark',(x+.010*scale,y+.050*scale,z+.020*scale),(.008*scale,.010*scale,.002*scale),'cream')

def bed():
 for t in [i*TAU/15 for i in range(15)]:ball('stone_rim',(.43*cos(t),.052,.32*sin(t)),(.095,.055,.065),'stone',14,8)
 state('unprepared');ball('undisturbed_soil',(0,.035,0),(.40,.065,.29),'soil');
 state('prepared');lathe('planting_hollow',[(0,.002),(.038,.002),(.065,.045),(.10,.071),(.20,.063),(.30,.044),(.40,.015)],'soil',segments=48)
 state('seed_in_hollow');lathe('prepared_soil',[(0,.002),(.038,.002),(.065,.045),(.10,.071),(.20,.063),(.30,.044),(.40,.015)],'soil');seed((0,.009,0))
 state('covered');ball('covered_mound',(0,.042,0),(.40,.080,.29),'soil');base();anchor('planting_center',(0,.05,0),(0,1,0),'seed and rooted flower anchor')

def trowel():
 beam('wood_grip',(0,.055,-.09),(0,.055,.045),.035,'woodlight');beam('metal_tang',(0,.055,.03),(0,.045,.10),.014,'iron')
 vs=[(0,.017,.245),(-.052,.035,.13),(-.04,.053,.083),(0,.041,.08),(.04,.053,.083),(.052,.035,.13),(0,.016,.16)];mesh('concave_trowel_blade',vs,[(0,1,6),(1,2,3,6),(3,4,5,6),(5,0,6)],'iron',.003);anchor('grip',(0,.055,-.035),(0,1,0))

def bird():
 mesh('folded_body',[(-.055,.10,0),(.055,.1,0),(0,.18,.06),(0,.12,.22),(0,.055,-.14)],[(0,1,2),(1,3,2),(0,2,3),(0,4,1)],'cream',.004)
 mesh('intact_wing',[(-.03,.12,.035),(-.25,.15,-.03),(-.09,.13,-.105)],[(0,1,2)],'paper',.003)
 for mode in ['torn','aligned','taped']:
  state(mode);mesh('wing_root',[(.03,.12,.035),(.13,.143,.008),(.118,.137,-.035),(.09,.13,-.105)],[(0,1,2,3)],'paper',.003)
  off=Vector((.03,-.07,.07)) if mode=='torn' else Vector((0,0,0));mesh('independent_torn_panel',[Vector(p)+off for p in [(.13,.143,.008),(.25,.15,-.03),(.09,.13,-.105),(.118,.137,-.035)]],[(0,1,2,3)],'cream',.003)
  if mode=='taped':cube('applied_tape_strip',(.13,.148,-.029),(.045,.002,.075),'white',.001)
 base();anchor('wing_alignment',(.12,.143,-.03),(0,1,0),'torn wing mating seam');anchor('tape_press',(.13,.15,-.029),(0,1,0))

def tape():
 lathe('open_paper_core',[(.037,.005),(.043,.005),(.043,.026),(.037,.026),(.037,.005)],'woodlight');lathe('tape_roll',[(.043,0),(.065,0),(.065,.032),(.043,.032),(.043,0)],'cream');cube('separable_strip',(.10,.005,0),(.14,.002,.032),'white',.0006);anchor('strip_grip',(.165,.009,0),(0,1,0))

def tile():
 state('intact');roof_tile();state('cracked');roof_tile();tube('visible_crack',[(-.13,.016,-.03),(-.06,.028,-.015),(.008,.029,-.045),(.05,.026,.015),(.135,.015,.045)],.003,'wooddark');state('overlapping');roof_tile((0,0,.14));roof_tile((0,.025,-.13));base();anchor('locating_lip',(0,.025,-.154),(0,1,0));anchor('hand_support',(0,0,0),(0,-1,0))

def ladder():
 for x in [-.20,.20]:beam('rail',(x,.015,.0),(x,1.56,-.20),.055);cube('non_slip_foot',(x,.045,0),(.075,.09,.075),'iron')
 for n in range(7):y=.19+n*.205;beam('rung_'+str(n),(-.20,y,-y*.128),(.20,y,-y*.128),.038,'woodlight')
 anchor('top_support',(0,1.53,-.20))

def sack():
 for mode in ['dry','damp']:
  state(mode);lathe('cloth_sack',[(0,0),(.13,0),(.16,.04),(.16,.22),(.14,.33),(.115,.35),(.105,.33),(.12,.29)],'cream');ring('folded_open_rim',(0,.335,0),.117,.024,'paper');ball('flour_surface',(0,.294,0),(.108,.023,.108),'flour' if mode=='dry' else 'earth');cube('stitched_patch',(0,.17,.157),(.095,.10,.003),'paper',.003)
  for i in range(7):tube('patch_stitch',[(-.052,.126+i*.015,.159),(-.039,.128+i*.015,.159)],.0014,'wooddark')
 base();anchor('scoop_surface',(0,.31,0),(0,1,0))

def bowl(at=(0,0,0),scale=1):
 profile=[(0,0),(.055,0),(.11,.020),(.155,.095),(.17,.145),(.162,.156),(.154,.145),(.139,.099),(.092,.030),(0,.023)];lathe('open_mixing_bowl',[(r*scale,y*scale) for r,y in profile],'cream',at);ring('rolled_bowl_rim',(at[0],at[1]+.148*scale,at[2]),.163*scale,.009*scale,'teal');anchor('mixing_center',(at[0],at[1]+.07*scale,at[2]),(0,1,0))

def scoop():
 lathe('open_scoop_cup',[(0,0),(.04,0),(.06,.015),(.07,.055),(.065,.061),(.056,.022),(.027,.008),(0,.008)],'woodlight');beam('scoop_handle',(0,.035,-.045),(0,.05,-.19),.028,'wood');ball('flour_fill',(0,.021,0),(.052,.016,.051),'flour');anchor('grip',(0,.045,-.14),(0,1,0))

def dough():
 cube('kneading_board',(0,.025,0),(.52,.045,.36),'woodlight')
 state('whole');ball('whole_dough',(0,.105,0),(.19,.082,.13),'flour')
 state('kneaded');ball('worked_dough',(0,.09,0),(.18,.067,.14),'flour');tube('folded_dough_seam',[(-.14,.114,.05),(-.06,.144,.035),(.04,.144,.02),(.13,.12,.03)],.005,'crumb')
 state('four_portions')
 for x in [-.105,.105]:
  for z in [-.08,.08]:ball('equal_portion',(x,.09,z),(.075,.056,.062),'flour')
 base();anchor('work_center',(0,.15,0),(0,1,0))

def loaf(at=(0,0,0),scale=1,mat='crust'):
 x,y,z=at;ball('scored_loaf',(x,y+.049*scale,z),(.14*scale,.066*scale,.067*scale),mat)
 for dx in [-.075,-.025,.025,.075]:tube('baked_score',[(x+(dx-.013)*scale,y+.099*scale,z-.037*scale),(x+dx*scale,y+.115*scale,z),(x+(dx+.013)*scale,y+.099*scale,z+.037*scale)],.0045*scale,'crumb')

def bread():
 for mode in ['baked_portions','unshaped_batch','recovered_bake']:
  state(mode);cube('baking_board',(0,.025,0),(.62,.035,.37),'woodlight')
  if mode=='unshaped_batch':ball('unshaped_pale_center',(0,.10,0),(.255,.077,.15),'crumb');tube('split_underdone_center',[(-.18,.146,0),(0,.175,.02),(.19,.13,.01)],.013,'flour')
  else:
   for x in [-.16,.16]:
    for z in [-.09,.09]:loaf((x,.035,z),.75)
 base();anchor('tray_carry',(0,.02,0),(0,-1,0))

def oven(at=(0,0,0),scale=1):
 x,y,z=at
 def b(name,p,size,mat='coral'):return cube(name,(x+p[0]*scale,y+p[1]*scale,z+p[2]*scale),tuple(s*scale for s in size),mat,.012*scale)
 b('oven_hearth',(0,.10,0),(.78,.20,.70),'stone');b('oven_back',(0,.43,-.29),(.70,.54,.13));b('oven_roof',(0,.73,0),(.73,.12,.66))
 for sx in [-1,1]:
  for row in range(4):b('brick_pier',(sx*.30,.20+row*.13,0),(.16,.12,.63))
 for i in range(9):a=i*pi/8;o=b('arch_voussoir',(.255*cos(a),.45+.255*sin(a),.29),(.105,.12,.16));o.rotation_euler.y=pi/2-a
 b('dark_chamber_floor',(0,.216,0),(.46,.012,.45),'wooddark');b('flue',(0,.92,-.18),(.22,.29,.22),'paper')
 for i in range(8):ball('ember',(x+random.uniform(-.16,.16)*scale,y+.23*scale,z+random.uniform(-.2,.02)*scale),(.025*scale,.01*scale,.017*scale),'coral')
 anchor('oven_mouth',(x,y+.39*scale,z+.34*scale),(0,0,1),'open baking chamber')

def planter(spark=False):
 lathe('terracotta_pot',[(0,0),(.11,0),(.125,.035),(.16,.24),(.17,.25),(.17,.275),(.148,.275),(.143,.235),(.125,.06),(0,.05)],'coral');ring('pot_rim',(0,.26,0),.157,.013,'coral');ball('planting_soil',(0,.241,0),(.14,.012,.14),'soil')
 if spark:lathe('separate_saucer',[(0,0),(.19,0),(.205,.014),(.20,.034),(.175,.032),(.16,.012),(0,.012)],'red')
 for i in range(11):
  a=i*2.4;height=.43+i%4*.055;tip=(sin(a)*(.19+i%2*.07),height,cos(a)*.20);tube('natural_stem',[(0,.24,0),(tip[0]*.3,height*.85,tip[2]*.3),tip],.006,'green');leaf('shaped_leaf',(tip[0]*.45,height*.8,tip[2]*.45),tip,.065,'leaflight' if i%3 else 'leaf')
 anchor('rooted_base',(0,.25,0),(0,1,0))

def plant_cluster(kind):
 if kind=='rocks':
  for i in range(4):
   bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2,radius=1,location=K.V(((i%2-.5)*.33,.09+(i//2)*.025,(i//2-.5)*.22)));o=bpy.context.object;o.scale=(.18,.14,.13);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
   for v in o.data.vertices:
    v.co*=random.uniform(.94,1.06);v.co.z=max(v.co.z,-.085)
   K.finish(o,'grounded_rock','stone')
  return
 if kind=='arbor-vine':
  pts=[(.14*cos(i*.45),i*.035,.14*sin(i*.45)) for i in range(60)];tube('flexible_climbing_stem',pts,.011,'green')
  for i,p in enumerate(pts[2::2]):a=i*1.6;leaf('vine_leaf',p,(p[0]+.13*cos(a),p[1]+.09,p[2]+.13*sin(a)),.065,'leaf');
  return
 if kind in ['shade-tree','willow']:
  willow=kind=='willow';height=2.85 if willow else 2.5;tube('tapered_trunk',[(0,0,0),(.03,.8,.02),(-.03,1.45,-.04),(.10,height-.4,0)],.085,'wooddark')
  for i in range(7):
   a=i*TAU/7;tip=(.75*cos(a),height-.4+(i%2)*.25,.65*sin(a));tube('branch',[(0,.7,0),(.20*cos(a),1.35,.20*sin(a)),tip],.034,'wood')
   if willow:
    for j in range(4):
     p=(tip[0]+.13*cos(j*1.7),tip[1],tip[2]+.15*sin(j*1.7));end=(p[0]*1.28,.65+j*.11,p[2]*1.28);tube('arching_hanging_branch',[p,(end[0],tip[1]-.6,end[2]),end],.006,'green')
     for k in range(9):t=k/9;at=Vector(p).lerp(Vector(end),t);leaf('hanging_leaf',at,at+Vector((.065*(-1 if k%2 else 1),-.15,.015)),.027,'leaf')
   else:
    for j in range(5):ball('layered_paper_canopy',(tip[0]+random.uniform(-.25,.25),tip[1]+random.uniform(-.08,.23),tip[2]+random.uniform(-.25,.25)),(.40,.32,.37),'leaflight' if (i+j)%3 else'leaf',14,8)
   tube('visible_root',[(0,.09,0),(.18*cos(a),.045,.18*sin(a)),(.31*cos(a),.012,.31*sin(a))],.036,'wooddark')
  return
 count={'shrub':26,'grass':32,'meadow-flowers':12,'reeds':16}.get(kind,20)
 for i in range(count):
  a=i*2.399;r=random.uniform(.01,.22);x,z=cos(a)*r,sin(a)*r;h=random.uniform(.10,.34) if kind!='reeds' else random.uniform(.40,.74)
  if kind=='shrub':
   tube('woody_stem',[(x,.005,z),(x*.9,h*.55,z*.9),(x,h,z)],.005,'wood');leaf('shrub_leaf',(x,h*.5,z),(x+.07*cos(a),h+.05,z+.07*sin(a)),.065,'leaflight' if i%3 else'leaf')
  elif kind=='grass':leaf('grass_blade',(x,0,z),(x+.045*cos(a),h,z+.045*sin(a)),.013,'grass')
  else:
   tube('stem',[(x,0,z),(x,h*.5,z),(x+.012,h,z)],.0045,'green');leaf('stem_leaf',(x,h*.3,z),(x+.12*cos(a),h*.66,z+.12*sin(a)),.019,'leaf')
   if kind=='reeds':ball('cattail',(x+.012,h+.07,z),(.017,.078,.017),'wooddark')
   else:
    for p in range(5):b=p*TAU/5;ball('flower_petal',(x+.038*cos(b),h,z+.038*sin(b)),(.033,.009,.023),'cream' if i%3 else'coral')
    ball('flower_center',(x,h+.01,z),(.014,.012,.014),'gold')

def terrain(kind):
 n=64;vs=[(0,.18 if kind=='sloping-bank' else.02,0)];r1,r2=(2,1.25) if kind!='path' else(1.55,.72)
 for ring_id in range(1,7):
  f=ring_id/6
  for i in range(n):
   a=i*TAU/n;r=1+.07*sin(a*3)+.035*cos(a*7);y=(1-f)*.32 if kind=='sloping-bank' else .016*sin(a*3)*f;vs.append((r1*f*r*cos(a),y,r2*f*r*sin(a)))
 faces=[(0,1+i,1+(i+1)%n) for i in range(n)]
 for j in range(5):
  for i in range(n):a=1+j*n+i;b=1+j*n+(i+1)%n;faces.append((a,b,b+n,a+n))
 mesh('organic_ground_surface',vs,faces,'earth' if kind=='path' else'grass',.10)
 if kind=='river-shore':
  mesh('curving_water',[(-1.9,.022,-1.0),(-.5,.02,-1.22),(.2,.02,-.5),(1.8,.02,-.2),(1.7,.02,.35),(.1,.02,.1),(-.8,.02,-.72),(-1.9,.02,-.50)],[(0,1,6,7),(1,2,5,6),(2,3,4,5)],'water',.035)
  tube('wet_shore_edge',[(-1.9,.028,-.5),(-.8,.027,-.72),(.1,.027,.10),(1.7,.027,.35)],.032,'earth')
 for i in range(24):
  a=i*2.4;r=.6+random.random()*.45;ball('edge_pebble',(r1*r*cos(a),.02,r2*r*sin(a)),(.045,.025,.03),'stone',12,6)

def loop():
 cube('cream_smooth_casing',(0,.26,0),(.30,.275,.22),'cream',.065);cube('teal_lower_shell',(0,.16,0),(.30,.105,.224),'teal',.036)
 for x in [-.123,.123]:
  fork=K.group('wheel_fork_'+str(x),(x,.062,0));old=K.PARENT;K.PARENT=fork;cube('fork_arm',(0,.027,0),(.032,.07,.055),'iron');wheel=K.group('wheel_spindle_'+str(x));K.PARENT=wheel;cyl('independent_rubber_wheel',(0,0,0),.062,.04,'rubber',(1,0,0),40);cyl('wheel_hub',(x*.12,0,0),.037,.044,'teal',(1,0,0));cyl('wheel_axle',(0,0,0),.016,.066,'iron',(1,0,0));K.PARENT=old
  for frame,ang in [(0,0),(60,TAU)]:wheel.rotation_euler.x=ang;wheel.keyframe_insert('rotation_euler',frame=frame)
  wheel.animation_data.action.name='Loop_wheel_'+str(x)
 tube('open_carry_handle',[(-.085,.397,0),(-.078,.475,0),(0,.507,0),(.078,.475,0),(.085,.397,0)],.014,'teal')
 cyl('lens_dark_mount',(0,.297,.12),.09,.036,'navy',(0,0,1),48);ring('metal_lens_ring',(0,.297,.147),.076,.013,'iron',(0,0,1));ball('glass_optical_lens',(0,.297,.151),(.068,.068,.024),'glass',32,18);ball('lens_highlight',(-.024,.329,.174),(.012,.019,.003),'white')
 button=cyl('coral_button',(-.151,.275,.018),.032,.012,'coral',(1,0,0),32);anchor('button',(-.159,.275,.018),(-1,0,0),'pressable control');anchor('handle',(0,.48,0),(0,1,0),'open carry handle');anchor('lens',(0,.297,.177),(0,0,1),'projection aperture')
 for frame,depth in [(0,-.151),(24,-.143),(42,-.143),(60,-.151)]:button.location.x=depth;button.keyframe_insert('location',frame=frame)
 button.animation_data.action.name='Loop_button_press';K.CLIPS['press']={'name':'Loop_button_press','duration':2,'cycleDistance':0}

def manuscript(spark=False):
 for i in range(9):
  y=.004+i*.0022;cube('separate_ordinary_page' if spark else 'layered_paper_page',(0,y,0),(.185,.0018,.255),'white' if spark else 'paper',.0005)
 tube('cotton_binding',[(-.10,.025,0),(0,.027,0),(.10,.025,0),(.10,.002,0),(0,.001,0),(-.10,.002,0)],.003,'coral',True)
 tube('bound_bow',[(-.025,.030,0),(-.035,.032,-.025),(0,.032,0),(.035,.032,-.025),(.025,.03,0)],.0025,'coral')
 cube('separate_delivered_copy',(.24,.012,0),(.185,.024,.255),'paper' if not spark else 'white',.001)
 cube('memory_insert',(-.19,.005,.025),(.078,.003,.102),'cream',.003);ring('memory_insert_eye',(-.19,.007,-.01),.004,.001,'gold');anchor('memory_insert',(-.19,.01,.025),(0,1,0),'chosen memory token');anchor('pinch_edge',(.087,.026,.05),(0,1,0),'page handoff')

def writing(spark=False):
 lathe('open_pencil_cup',[(.034,0),(.055,0),(.055,.11),(.050,.115),(.044,.11),(.044,.018),(.034,.018)],'teal' if spark else 'woodlight')
 for i,(x,z) in enumerate([(-.023,-.013),(.015,-.014),(0,.022)]):
  cyl('painted_wood_pencil',(x,.14,z),.007,.23,['coral','gold','teal'][i],vertices=6);cyl('pencil_ferrule',(x,.24,z),.0076,.022,'iron',vertices=12)
  bpy.ops.mesh.primitive_cone_add(vertices=12,radius1=.0068,radius2=0,depth=.025,location=K.V((x,.263,z)));K.finish(bpy.context.object,'graphite_pencil_tip','woodlight');ball('graphite',(x,.276,z),(.0017,.003,.0017),'navy')
 beam('loose_pencil',(.12,.011,-.10),(.12,.011,.13),.012,'gold');anchor('writing_grip',(.12,.011,.02),(1,0,0),'pencil tripod grip')

def cushion():
 ball('soft_cushion_body',(0,.065,0),(.22,.066,.19),'teal',32,16)
 tube('stitched_seam',[(.21*cos(t),.055,.18*sin(t)) for t in [i*TAU/64 for i in range(64)]],.0025,'cream',True)
 for x in [-.15,.15]:tube('tie_cord',[(x,.025,-.14),(x-.015,.014,-.23),(x+.012,.015,-.25)],.003,'cream')

def cloth():
 n=22;vs=[]
 for j in range(n+1):
  for i in range(n+1):x=(i/n-.5)*1.25;z=(j/n-.5)*.95;y=.02+.008*sin(x*24)*sin(z*17)+.017*(abs(x)/.625)**8;vs.append((x,y,z))
 o=mesh('woven_picnic_cloth',vs,[(j*(n+1)+i,j*(n+1)+i+1,(j+1)*(n+1)+i+1,(j+1)*(n+1)+i) for j in range(n) for i in range(n)],'cream',.002)
 for z in [-.43,.43]:tube('coral_woven_border',[(-.58,.021,z),(0,.024,z),(.58,.021,z)],.006,'coral')
 for x in [-.57,.57]:tube('coral_woven_border',[(x,.03,-.43),(x,.024,0),(x,.03,.43)],.006,'coral')

def tableware():
 lathe('serving_plate',[(0,0),(.075,0),(.11,.012),(.13,.024),(.129,.031),(.12,.034),(.096,.013),(0,.009)],'cream');ring('plate_rim',(0,.029,0),.12,.004,'teal')
 lathe('hollow_cup',[(0,0),(.032,0),(.037,.007),(.047,.085),(.043,.093),(.038,.085),(.026,.012),(0,.012)],'cream',at=(.21,0,0))
 tube('open_cup_handle',[(.25,.075,0),(.28,.078,0),(.29,.05,0),(.27,.024,0),(.247,.035,0)],.006,'teal')
 ball('spoon_bowl',(-.19,.015,.065),(.028,.006,.043),'woodlight');beam('spoon_stem',(-.19,.017,.028),(-.19,.017,-.09),.011,'woodlight');anchor('cup_handle',(.275,.05,0),(1,0,0),'grip through open handle')

def cake():
 lathe('cake_plate',[(0,0),(.22,0),(.235,.015),(.22,.027),(0,.020)],'cream');cyl('baked_cake',(0,.09,0),.18,.13,'crust',vertices=48);cyl('cream_icing',(0,.161,0),.181,.018,'cream',vertices=48)
 for i in range(12):a=i*TAU/12;ball('icing_scallop',(.169*cos(a),.141,.169*sin(a)),(.024,.024,.024),'cream');ball('berry',(.13*cos(a),.18,.13*sin(a)),(.013,.017,.013),'coral')

def flute():
 # Bore stays visibly open at both ends. Tone holes have independent rims and
 # inset dark interiors, with measured centres for finger-contact review.
 cyl('hollow_flute_body',(0,.018,0),.017,.39,'woodlight',axis=(0,0,1),cap=False)
 for z in [-.195,.195]:ring('open_bore_end',(0,.018,z),.014,.003,'wooddark',(0,0,1))
 for i in range(6):
  z=-.09+i*.039;ring('tone_hole_'+str(i),(0,.035,z),.0048,.0015,'wooddark');cyl('open_hole_shadow',(0,.032,z),.004,.002,'wooddark');anchor('finger_'+str(i),(0,.037,z),(0,1,0),'flute tone hole')
 cube('mouthpiece',(0,.021,-.175),(.032,.024,.057),'cream');anchor('mouth',(0,.021,-.198),(0,0,-1),'blowing opening')

def bell():
 cube('mount',(0,.35,-.04),(.10,.16,.045),'wood');beam('bell_bracket',(0,.38,-.02),(0,.38,.12),.027,'iron');lathe('open_bell_shell',[(.085,.17),(.082,.185),(.07,.23),(.05,.29),(.024,.32),(.012,.318),(.024,.29),(.046,.235),(.07,.179),(.085,.17)],'gold',at=(0,0,.12));ball('clapper',(0,.185,.12),(.016,.022,.016),'iron');tube('bell_pull_cord',[(0,.17,.12),(.005,.07,.12),(.007,.015,.14)],.004);anchor('cord_grip',(.007,.023,.14),(0,1,0))

def lamp():
 cube('wall_plate',(0,.23,-.045),(.085,.14,.026),'iron');tube('curved_lamp_bracket',[(0,.28,-.035),(0,.41,.02),(0,.38,.15),(0,.32,.17)],.013,'iron');lathe('painted_lamp_shade',[(.11,.19),(.105,.21),(.034,.29),(.014,.30),(.014,.285),(.032,.277),(.097,.2)],'teal',at=(0,0,.17))
 for mode in ['unlit','warm_light']:
  state(mode);m=K.material('bulb_'+mode,'e0d4a1' if mode=='unlit' else 'ffe5a3',False,rough=.3)
  if mode=='warm_light':p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Emission Color'].default_value=(1,.58,.12,1);p.inputs['Emission Strength'].default_value=.7
  ball('lamp_glass',(0,.218,.17),(.031,.038,.031),m)
 base();anchor('wall_mount',(0,.23,-.065),(0,0,-1))

def basket():
 lathe('basket_inside',[(0,0),(.08,0),(.15,.05),(.20,.12),(.19,.13),(.14,.063),(.073,.012),(0,.012)],'woodlight')
 for i in range(28):
  a=i*TAU/28;tube('woven_vertical',[(.08*cos(a),.008,.08*sin(a)),(.15*cos(a),.057,.15*sin(a)),(.196*cos(a),.12,.196*sin(a))],.0037,'wood')
 for y in [.03,.047,.064,.08,.099,.119]:r=.1+y*.77;tube('woven_horizontal',[(r*cos(t),y+.0015*sin(t*28),r*sin(t)) for t in [i*TAU/112 for i in range(112)]],.0038,'woodlight',True)
 ring('rolled_open_rim',(0,.126,0),.194,.010,'wood');anchor('basket_carry',(0,.13,0),(0,-1,0))

def jug():
 lathe('hollow_ceramic_body',[(0,0),(.065,0),(.098,.06),(.095,.155),(.06,.21),(.060,.245),(.055,.253),(.047,.245),(.047,.22),(.08,.15),(.081,.07),(.053,.018),(0,.018)],'cream');tube('open_jug_handle',[(.053,.217,0),(.126,.224,0),(.145,.15,0),(.124,.074,0),(.09,.075,0)],.014,'teal');mesh('pouring_lip',[(-.024,.246,.041),(.024,.246,.041),(.018,.26,.074),(-.018,.26,.074)],[(0,1,2,3)],'cream',.004);anchor('handle',(.131,.15,0),(1,0,0))

def peel():
 cube('flat_bread_paddle',(0,.018,.10),(.26,.025,.27),'woodlight',.035);beam('long_wood_grip',(0,.018,-.04),(0,.018,-.64),.035,'wood');ring('hanging_hole',(0,.018,-.638),.012,.004,'woodlight');anchor('grip',(0,.036,-.34),(0,1,0));anchor('loaf_support',(0,.033,.10),(0,1,0))

def marker():
 beam('landing_stake',(0,0,0),(0,.64,0),.027,'woodlight');mesh('cloth_marker_flag',[(0,.61,0),(.22,.56,.014),(.17,.50,0),(0,.51,0)],[(0,1,2,3)],'coral',.003)
 for y in [.525,.59]:ring('flag_fastening',(0,y,0),.019,.003,'cream');anchor('landing_point',(0,.015,0),(0,1,0))

def picture_material(path,name):
 m=bpy.data.materials.new(name);m.use_nodes=True;im=bpy.data.images.load(str(path),check_existing=True);im.pack();tex=m.node_tree.nodes.new('ShaderNodeTexImage');tex.image=im;m.node_tree.links.new(tex.outputs['Color'],m.node_tree.nodes.get('Principled BSDF').inputs['Base Color']);return m

def picture_face(name,path,width,height,y=.004):
 o=mesh(name,[(-width/2,y,-height/2),(width/2,y,-height/2),(width/2,y,height/2),(-width/2,y,height/2)],[(0,1,2,3)],picture_material(path,name+'_print'))
 uv=o.data.uv_layers.active
 for loop in o.data.loops:uv.data[loop.index].uv=[(0,1),(1,1),(1,0),(0,0)][loop.vertex_index]
 return o

def cards(spark=False):
 themes=['bridge','seed_voyage','planting','wing_repair','roof_repair','bread','gathering','picnic','duet'];refs={'bridge':'bridge-a-r1.png','seed_voyage':'seed-boat-r1.png','planting':'planting-bed-r1.png','wing_repair':'paper-bird-r1.png','roof_repair':'roof-tile-r1.png','bread':'bread-r1.png','gathering':'arbor-r1.png','picnic':'picnic-cloth-r1.png','duet':'flute-r1.png'}
 for topic in themes:
  state(topic);cube('card_backing',(0,.0025,0),(.14,.005,.18),'white' if spark else 'paper',.003);path=K.REF/'images'/refs[topic]
  if not path.exists():path=K.REF/'images/story-card-r1.png'
  picture_face('separate_printed_village_illustration',path,.124,.164,.0052)
 base();anchor('pinch_edge',(.065,.005,0),(0,1,0))

def projection(with_states=True):
 cube('projection_fabric',(0,.52,0),(1.50,1.0,.009),'cream',.001)
 for y in [0,1.035]:cube('wood_frame_bar',(0,y,0),(1.62,.055,.06),'woodlight')
 for x in [-.78,.78]:cube('wood_side_frame',(x,.52,0),(.045,1.08,.044),'wood')
 for x in [-.50,.50]:cube('rear_mounting_bracket',(x,.96,-.035),(.055,.16,.08),'iron')
 if with_states:state('blank')
 cube('blank_matte_surface',(0,.52,.007),(1.46,.98,.001),'cream',0)
 if with_states:
  state('village_projection');o=picture_face('projected_village_art',K.REF/'images/story-card-r1.png',1.12,.95);o.rotation_euler.x=pi/2;o.location=K.V((0,.53,.011));base()
 anchor('mount',(0,.98,-.068),(0,0,-1))

def studio():
 # Elliptical platform with real board ends and a low accessible ramp.
 for row in range(18):
  z=-1.02+(row+.5)*2.04/18;half=1.70*math.sqrt(max(0,1-(z/1.08)**2));cube('oval_stage_floorboard',(0,.17,z),(half*2,.07,2.04/18-.005),'woodlight')
 tube('oval_stage_lip',[(1.70*cos(t),.17,1.06*sin(t)) for t in [i*TAU/96 for i in range(96)]],.041,'woodlight',True)
 mesh('ramp_deck',[(-.40,.002,1.65),(.40,.002,1.65),(.40,.20,1.03),(-.40,.20,1.03)],[(0,1,2,3)],'woodlight',.045)
 for x in [-.43,.43]:beam('ramp_edge',(x,.037,1.65),(x,.22,1.03),.06)
 # Curved rear wall, cream plaster over restrained sage wainscot.
 for i in range(24):
  a=-1.45+(i+.5)*2.9/24;x=1.65*sin(a);z=-.96*cos(a);o=cube('painted_rear_panel',(x,1.16,z),(.235,1.92,.065),'cream');o.rotation_euler.z=-a
  o=cube('sage_wainscot',(x,.43,z+.02),(.232,.47,.077),'green');o.rotation_euler.z=-a
 for x in [-1.57,1.57]:
  cube('wood_proscenium_post',(x,1.23,-.06),(.13,2.14,.13),'woodlight');cube('post_pedestal',(x,.36,-.06),(.22,.33,.22),'wood');cube('painted_joint_plate',(x,2.13,.022),(.15,.20,.012),'teal');cyl('joint_button',(x,2.15,.04),.022,.015,'cream',axis=(0,0,1))
 tube('shaped_top_beam',[(-1.7,2.18,-.06),(-.9,2.10,-.06),(0,2.08,-.06),(.9,2.10,-.06),(1.7,2.18,-.06)],.065,'woodlight')
 # Draped fabric, continuous sculpted pleats and gathered tie.
 vs=[];nx,ny=28,38
 for j in range(ny+1):
  t=j/ny;y=.23+t*1.82;left=-1.49;right=-1.03-.30*math.sin(t*pi)**2
  for i in range(nx+1):u=i/nx;x=left+(right-left)*u;z=-.045+.055*sin(u*TAU*5)*(1-.35*sin(t*pi));vs.append((x,y,z))
 mesh('woven_teal_curtain',vs,[(j*(nx+1)+i,j*(nx+1)+i+1,(j+1)*(nx+1)+i+1,(j+1)*(nx+1)+i) for j in range(ny) for i in range(nx)],'teal',.006)
 tube('cream_curtain_tie',[(-1.51,1.03,.015),(-1.33,1.00,.065),(-1.18,1.025,.004)],.028,'cream')
 old=K.PARENT;p=K.group('mounted_projection',(0,.79,-.86));K.PARENT=p;projection(False);K.PARENT=old
 anchor('jo_mark',(-.55,.208,.15),(0,1,0));anchor('loop_mark',(.68,.208,.15),(0,1,0));anchor('studio_table',(0,.208,.28),(0,1,0))

def book():
 for sign in [-1,1]:
  cube('clothbound_cover',(sign*.205,.019,0),(.41,.031,.49),'teal',.009)
  for layer in range(7):
   vs=[];n=20
   oldpage=K.PARENT;turnable=sign==-1 and layer==6
   if turnable:K.PARENT=K.group('page_turn_hinge',(0,.0518,0))
   for z in [-.224,.224]:
    for i in range(n+1):u=i/n;x=sign*(.013+u*.377);y=.041+layer*.0018+.027*sin(u*pi);vs.append((x,y-(.0518 if turnable else 0),z))
   mesh('curled_paper_leaf',vs,[(i,i+1,n+2+i,n+1+i) for i in range(n)],'white',.0012)
   K.PARENT=oldpage
 tube('bound_spine',[(0,.044,-.25),(0,.042,0),(0,.044,.25)],.013,'coral')
 for sign in [-1,1]:tube('cover_stitch',[(sign*.394,.037,-.21),(sign*.394,.037,0),(sign*.394,.037,.21)],.0015,'gold')
 # A separate 3D miniature, deliberately retaining the village material world.
 old=K.PARENT;mini=K.group('separate_village_insert',(.19,.074,0));K.PARENT=mini;oldworld=K.WORLD;K.WORLD='Village'
 ball('miniature_meadow',(0,0,0),(.158,.01,.18),'grass');tube('miniature_river',[(-.1,.012,-.12),(.015,.012,-.05),(-.02,.012,.07),(.11,.012,.12)],.020,'water')
 for x,z in [(-.07,.025),(.065,-.075)]:
  cube('tiny_paper_house',(x,.045,z),(.072,.060,.065),'paper',.004);mesh('tiny_gabled_roof',[(x-.044,.072,z-.04),(x+.044,.072,z-.04),(x,.106,z-.04),(x-.044,.072,z+.04),(x+.044,.072,z+.04),(x,.106,z+.04)],[(0,2,5,3),(2,1,4,5)],'coral',.004)
 for x,z in [(-.10,-.07),(.10,.085)]:cyl('tiny_tree_trunk',(x,.04,z),.008,.055,'wood');ball('tiny_paper_canopy',(x,.075,z),(.032,.034,.034),'leaf')
 K.PARENT=old;K.WORLD=oldworld;anchor('page_turn',(-.365,.062,.205),(0,1,0),'separate page corner');anchor('miniature_village',(.19,.075,0),(0,1,0),'embedded story world')

def retained_pilot(aid):
 source=K.LIB.parent/'review-sources'/aid/(aid+'-review.glb');before={o.as_pointer() for o in bpy.context.scene.objects}
 if aid=='lantern-flower':state('rooted_bloom')
 bpy.ops.import_scene.gltf(filepath=str(source),import_pack_images=True)
 added={o for o in bpy.context.scene.objects if o.as_pointer() not in before and o!=K.PARENT}
 for o in added:
  if not o.parent or o.parent not in added:o.parent=K.PARENT
  if o.type=='MESH':o.name='preserved_'+aid+'_painted_geometry'
 if aid=='seed-boat':
  # The retained hull already has an open circular cradle. Its measured inner
  # floor is 0.104 m high; cargo and lashings rest above that actual surface.
  for x in [-.085,.085]:ring('cargo_rope_eye',(x,.119,0),.008,.002,'iron')
  state('empty_cradle');K.group('empty_cradle_clearance',(0,.105,0));state('seed_loaded');seed((0,.105,0));tube('secured_cargo_line',[(-.087,.122,0),(-.025,.154,0),(-.018,.178,0),(.018,.178,0),(.025,.154,0),(.087,.122,0)],.003,'cream');base();anchor('seed_cradle',(0,.105,0),(0,1,0),'actual removable seed position above the measured cradle floor');anchor('hand_support',(0,.024,0),(0,-1,0));anchor('mooring',(0,.14,.24),(0,0,1))
 else:
  # Original painted bloom and roots retained. Added growing states share the
  # same planting origin and have independent petals and leaves.
  anchor('memory_attachment',(0,.75,.075),(0,0,1),'place memory within rooted lantern');base();state('seed');seed();state('shoot');tube('rooted_shoot',[(0,0,0),(.006,.09,0),(0,.17,0)],.009,'green');leaf('first_leaf',(0,.10,0),(.07,.18,0),.035,'leaf');leaf('second_leaf',(0,.095,0),(-.06,.145,.02),.027,'leaf')
  state('bud');tube('growing_stem',[(0,0,0),(.018,.27,0),(0,.46,0)],.014,'green')
  for i in range(5):a=i*TAU/5;leaf('closed_lantern_petal',(.036*cos(a),.43,.036*sin(a)),(.012*cos(a),.61,.012*sin(a)),.033,'gold')
  for x in [-1,1]:leaf('bud_leaf',(0,.26,0),(x*.17,.33,.025),.047,'leaf')
  for i in range(5):a=i*TAU/5;tube('visible_root',[(0,.025,0),(.07*cos(a),.015,.07*sin(a)),(.13*cos(a),0,.13*sin(a))],.009,'woodlight')
  base();anchor('planting_origin',(0,0,0),(0,1,0),'all growth states rooted at one position')
 return {'reusedSource':str(source.relative_to(K.ROOT)).replace('\\','/'),'reusedSourceSha256':K.sha(source),'reuseInspection':'Existing painted hull/bloom retained from inspected pilot; local accessible cradle or growing states added. No paid regeneration.'}

def production(aid):
 if aid in ['worktable','sparkfest-table']:table(aid.startswith('sparkfest'))
 elif aid=='bench':bench()
 elif aid=='storage-chest':chest()
 elif aid in ['passenger-dock','garden-landing']:dock(aid=='garden-landing')
 elif aid in ['bakery','workshop','dock-office']:building(aid)
 elif aid=='arbor':arbor()
 elif aid in ['bridge-a','bridge-b']:bridge(aid)
 elif aid in ['bank-post','center-post']:post(aid=='center-post')
 elif aid=='rope':rope()
 elif aid in ['material-crate','toolkit']:crate(aid=='toolkit')
 elif aid=='gangway':gangway()
 elif aid=='passenger-boat':boat()
 elif aid=='seed':seed();anchor('palm_contact',(0,.02,0),(0,-1,0))
 elif aid=='planting-bed':bed()
 elif aid=='trowel':trowel()
 elif aid=='paper-bird':bird()
 elif aid=='tape':tape()
 elif aid=='roof-tile':tile()
 elif aid=='ladder':ladder()
 elif aid=='flour-sack':sack()
 elif aid=='mixing-bowl':bowl()
 elif aid=='scoop':scoop()
 elif aid=='dough':dough()
 elif aid=='bread':bread()
 elif aid=='oven':oven()
 elif aid in ['garden-plants','sparkfest-plant']:planter(aid.startswith('sparkfest'))
 elif aid in ['shade-tree','willow','shrub','grass','meadow-flowers','reeds','rocks','arbor-vine']:plant_cluster(aid)
 elif aid in ['river-shore','sloping-bank','path']:terrain(aid)
 elif aid=='loop':loop()
 elif aid in ['manuscript','sparkfest-paperwork']:manuscript(aid.startswith('sparkfest'))
 elif aid in ['writing-supplies','sparkfest-writing']:writing(aid.startswith('sparkfest'))
 elif aid=='cushion':cushion()
 elif aid=='picnic-cloth':cloth()
 elif aid=='tableware':tableware()
 elif aid=='cake':cake()
 elif aid=='flute':flute()
 elif aid=='dock-bell':bell()
 elif aid=='wall-lamp':lamp()
 elif aid=='bread-basket':basket()
 elif aid=='ceramic-jug':jug()
 elif aid=='bread-peel':peel()
 elif aid=='landing-marker':marker()
 elif aid in ['story-card','sparkfest-cards']:cards(aid.startswith('sparkfest'))
 elif aid=='projection':projection()
 elif aid=='studio-stage':studio()
 elif aid=='storybook':book()
 elif aid in ['seed-boat','lantern-flower']:return retained_pilot(aid)
 else:return False
 return True

if __name__=='__main__':
 catalog=json.loads((K.REF/'asset-manifest.json').read_text());args=sys.argv[sys.argv.index('--')+1:];ids=args or [a['id'] for a in catalog['assets'] if a['category']!='Characters' or a['id']=='loop']
 for aid in ids:
  asset=next(a for a in catalog['assets'] if a['id']==aid);K.reset(asset)
  result=production(aid)
  if not result:print('RECIPE_PENDING '+aid);continue
  K.export(asset,'scripts/library-local-recipes.py:'+aid,result if isinstance(result,dict) else None)
