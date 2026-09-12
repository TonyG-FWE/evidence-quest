"""Static Item 08 design composition. No gameplay or service logic."""
from pathlib import Path
import re,json,html,math
from PIL import ImageFont

OUT=Path(__file__).resolve().parents[1]
ROOT=OUT.parent
CT={}
for line in (ROOT/'07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md').read_text(encoding='utf-8-sig').splitlines():
    cells=[c.strip() for c in line.split('|')]
    if len(cells)>4 and re.fullmatch(r'`CT\.[A-Z0-9_.]+`',cells[1]):
        key=cells[1].strip('`'); value=cells[3]
        if key.startswith('CT.HINT.') and ': “' in cells[2]: value=cells[2].split(': “',1)[1].rsplit('”',1)[0]
        value=re.sub(r'^(Jo|Remy|Ari): “(.*)”$',r'\2',value)
        if value.startswith('“') and value.endswith('”'): value=value[1:-1]
        CT[key]=value.replace('<br>','\n')
USED=set(); REG=[]; TEXTS=[]; ACTIONS=[]
def ct(k,**kw):
    USED.add(k)
    if k not in CT: raise KeyError(k)
    value=CT[k]
    for n,v in kw.items(): value=value.replace('{'+n+'}',str(v))
    return value
P={'ink':'#18324B','teal':'#14646B','mint':'#D9EFDF','coral':'#E9725C','gold':'#F3C65C','blue':'#3867D6','plum':'#704F89','paper':'#FFF9E9','white':'#FFFEFA','line':'#657989','muted':'#425B6D','pale':'#ECF1F3','focus':'#224FC4','wood':'#DBAA77','woodlight':'#EEC69D'}
def esc(s): return html.escape(str(s),quote=True)
def rect(x,y,w,h,fill,rx=0,stroke='none',sw=1,extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'
def path(d,fill='none',stroke='none',sw=1,extra=''): return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'
def ellipse(x,y,rx,ry,fill,extra=''): return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" {extra}/>'
def circle(x,y,r,fill,stroke='none',sw=1): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def group(s,t): return f'<g transform="{t}">{s}</g>'
FONTS={}
def font(size,bold=False):
    k=(int(size),bold)
    if k not in FONTS:FONTS[k]=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf' if bold else 'C:/Windows/Fonts/segoeui.ttf',int(size))
    return FONTS[k]
def measure(s,size=22,bold=False):return font(size*10,bold).getlength(str(s))/10
def txt(s,x,y,size=22,fill=None,bold=False,anchor='start'):
    TEXTS.append({'text':str(s),'x':x,'y':y,'size':size,'width':round(measure(s,size,bold),2)})
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill or P["ink"]}" font-weight="{700 if bold else 400}" text-anchor="{anchor}" font-family="Segoe UI, Arial, sans-serif">{esc(s)}</text>'
def wrap(s,x,y,w,size=24,lh=None,fill=None,bold=False):
    lh=lh or size*1.5; result=''; count=0
    for para in str(s).split('\n'):
        line=''
        for word in para.split(' '):
            cand=(line+' '+word).strip()
            if line and measure(cand,size,bold)>w:
                result+=txt(line,x,y+count*lh,size,fill,bold);count+=1;line=word
            else: line=cand
        result+=txt(line,x,y+count*lh,size,fill,bold);count+=1
    return result,count*lh
def button(label,x,y,w=None,kind='secondary',focus=False,size=20,h=50):
    w=w or max(80,math.ceil(measure(label,size,True)+34))
    ACTIONS.append({'label':label,'kind':kind,'width':w,'height':h,'textSize':size,'focus':focus,'fits':measure(label,size,True)<=w-16})
    fill={'primary':P['teal'],'secondary':P['white'],'selected':P['gold'],'quiet':P['pale'],'disabled':P['pale']}[kind]
    s=rect(x,y,w,h,fill,12,P['ink'] if kind!='disabled' else P['line'],1.6)
    if focus:s=rect(x-5,y-5,w+10,h+10,P['white'],16,P['focus'],3)+s
    s+=txt(label,x+w/2,y+(h+size*.7)/2,size,P['white'] if kind=='primary' else P['ink'],True,'middle')
    meta=esc(json.dumps({'label':label,'kind':kind,'width':w,'height':h,'textSize':size,'focus':focus,'fits':measure(label,size,True)<=w-16},ensure_ascii=False))
    return f'<g data-design-control="{meta}">{s}</g>'
def buttons(labels,x,y,maxw=900,size=20):
    s='';sx=x
    for item in labels:
        label=item[0] if isinstance(item,tuple) else item
        kind=item[1] if isinstance(item,tuple) else 'secondary';w=max(88,math.ceil(measure(label,size,True)+34))
        if sx+w>x+maxw:sx=x;y+=64
        s+=button(label,sx,y,w,kind,size=size);sx+=w+12
    return s,y+50
DEFS='''<defs>
<linearGradient id="wall" x2="0" y2="1"><stop stop-color="#F7EAD8"/><stop offset="1" stop-color="#EAD6C5"/></linearGradient>
<linearGradient id="floor" x2="0.8" y2="1"><stop stop-color="#EACBAB"/><stop offset="1" stop-color="#F5DCC1"/></linearGradient>
<linearGradient id="paper" x2="0.4" y2="1"><stop stop-color="#FFFEFA"/><stop offset="1" stop-color="#FFF3D3"/></linearGradient>
<radialGradient id="glow"><stop stop-color="#FFF2A8" stop-opacity=".62"/><stop offset="1" stop-color="#FFF2A8" stop-opacity="0"/></radialGradient>
<pattern id="grain" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M1 1h.08M4 4h.06" stroke="#18324B" opacity=".08" stroke-width=".1"/></pattern>
</defs>'''
def svg(w,h,s,title):return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><title>{esc(title)}</title>{DEFS}{s}</svg>'
def save(id,title,s,w=1440,h=960,pattern='',state='',refs='',concealed='',companion='',note=''):
    (OUT/(id+'.svg')).write_text(svg(w,h,s,title),encoding='utf-8')
    REG.append(dict(id=id,title=title,width=w,height=h,pattern=pattern,state=state,refs=refs,ct=sorted(USED),controls=ACTIONS.copy(),concealed=concealed,companion=companion,note=note))
    USED.clear();TEXTS.clear();ACTIONS.clear()

# Functional cast diagrams only. The illustrated references govern final art quality.
def backpack(x=0,y=0,s=1):
    d=path('M-12 -26v-7q12 -10 24 0v7','none','#A64F43',5)+rect(-23,-28,46,56,P['coral'],7,'#A64F43',3)+path('M-22 -13q22 12 44 0','none','#A64F43',3)+rect(-5,-20,14,14,P['gold'],1)+path('M-15 18l28 -17','none',P['paper'],2,extra='stroke-dasharray="5 4"')
    return group(d,f'translate({x} {y}) scale({s})')
def person(who,x,y,h=140,pose='idle'):
    if who=='loop':return loop(x,y,h*.52,pose)
    paper=who in ('pip','grandma')
    skin={'player':'#BD7A48','jo':'#F2BD99','remy':'#EBAB76','ari':'#C68B59','pip':'#D8A453','grandma':'#B88047'}[who]
    shirt={'player':P['gold'],'jo':'#E8755F','remy':P['plum'],'ari':P['blue'],'pip':'#23828B','grandma':P['coral']}[who]
    pants={'player':P['blue'],'jo':'#147D83','remy':P['ink'],'ari':P['gold'],'pip':P['ink'],'grandma':P['plum']}[who]
    hair={'player':'#38271F','jo':'#593629','remy':'#B95C2A','ari':'#222E3D','pip':'#293240','grandma':'#F2E8D3'}[who]
    out='#6A5848' if paper else '#314456'; sw=2.4
    s=ellipse(0,-1,38,7,'#18324B',extra='opacity=".12"')
    if who=='grandma':s+=path('M-23 -82L-35 -16Q0 -6 36 -16L24 -82Z',pants,out,sw)
    else:s+=path('M-23 -87L-27 -11L-5 -10L0 -63L6 -10L30 -11L24 -87Z',pants,out,sw)
    s+=path('M-28 -16l24 1v10h-37q-5 -7 13 -11M7 -15l23 -1q19 5 15 11H7Z',P['paper'] if who in ('ari','jo') else (P['coral'] if who=='player' else '#2B7F93'),out,sw)
    s+=path('M-26 -132Q0 -144 25 -132L32 -73Q0 -61 -33 -73Z',shirt,out,sw)
    if who=='player':s+=path('M-6 -136L-8 -74L14 -72L10 -134Z','#25848A')+path('M-23 -127l15 12M22 -127l-10 12','none','#BC8438',3)
    if who=='jo':s+=path('M-18 -134v29h36v-29M-24 -100h48v34h-48Z',pants,out,sw)+rect(-12,-91,24,17,'#258892',2,out,2)
    if who=='ari':s+=path('M-15 -137l14 16L-4 -139M4 -139l10 17 10 -15',P['coral'])+circle(1,-113,2,P['paper'])
    if who=='remy':s+=path('M-30 -130q30 -30 60 0l-10 20q-20 -15 -40 0Z','#5A4177',out,sw)+path('M-17 -84q17 9 34 0','none','#503E70',3)
    left= 'M-29 -126L-50 -108L-72 -115L-77 -104L-48 -93L-26 -104Z' if pose in ('present','wave','plant') or who=='jo' else 'M-27 -125L-39 -87L-32 -69L-21 -77L-24 -92L-13 -121Z'
    if pose=='receive':left='M-29 -126L-47 -99L-67 -54L-59 -44L-39 -87L-18 -112Z'
    right='M24 -128L45 -113L55 -132L65 -127L54 -99L40 -97L18 -111Z' if pose in ('operate','wave','plant') else 'M24 -127L42 -90L34 -72L23 -80L29 -91L13 -117Z'
    s+=path(left,shirt,out,sw)+path(right,shirt,out,sw)
    s+=circle(-62 if pose=='receive' else -75 if pose in ('present','wave','plant') or who=='jo' else -30,-47 if pose=='receive' else -110 if pose in ('present','wave','plant') or who=='jo' else -72,7,skin,out,sw)
    s+=circle(60 if pose in ('operate','wave','plant') else 30,-130 if pose in ('operate','wave','plant') else -75,7,skin,out,sw)
    if who=='remy':s+=group(rect(-20,-38,43,57,P['ink'],5,'#587180',3)+circle(0,-30,2,'#ABC9D3'),'translate(28 -77) rotate(-8)')
    s+=rect(-8,-149,16,21,skin,5,out,sw)
    if who=='ari':s+=path('M-34 -173Q-40 -202 0 -203Q40 -202 35 -166L38 -135Q0 -125 -40 -138Z',hair,out,sw)
    if who=='grandma':
        for cx,cy in [(-24,-184),(0,-194),(25,-183),(-36,-163),(37,-161)]:s+=circle(cx,cy,17,hair,out,1)
    s+=ellipse(0,-164,30,32,skin)+circle(-28,-162,7,skin)+circle(28,-162,7,skin)
    if who in ('player','jo'):
        for cx,cy in [(-26,-185),(-12,-199),(5,-199),(22,-191),(-30,-174),(29,-178)]:s+=circle(cx,cy,11,hair,out,1.5)
        if who=='jo':s+=circle(-38,-201,20,hair,out,2)+circle(35,-205,21,hair,out,2)
    if who=='remy':s+=path('M-33 -175L-33 -196Q-5 -220 31 -198L47 -205Q42 -185 14 -184L-3 -197L-12 -172Z',hair,'#96502B',2)
    if who=='ari':s+=path('M-33 -165L-29 -190Q12 -213 30 -184L32 -165L15 -180L-12 -173Z',hair)
    if who=='pip':s+=path('M-34 -175L-40 -186L-25 -191L-26 -203L-9 -196L2 -207L18 -196L34 -193L29 -180L36 -170L12 -179L-1 -190L-17 -176Z',hair)
    if who=='grandma':s+=path('M-30 -183Q-12 -205 7 -185L19 -192L31 -181L24 -176L7 -184L-8 -174Z',hair)
    s+=ellipse(-10,-163,3.5,5,P['ink'])+ellipse(13,-163,3.5,5,P['ink'])+path('M-5 -148q7 6 14 -2','none',P['ink'],2.3)
    s+=ellipse(-20,-151,5,3,'#E9725C',extra='opacity=".45"')+ellipse(24,-151,5,3,'#E9725C',extra='opacity=".45"')
    if who=='pip':s+=backpack(30,-105,.63)
    if paper:s+=rect(-30,-190,65,172,'url(#grain)')
    return group(s,f'translate({x} {y}) scale({h/218})')
def loop(x,y,h=65,state='idle'):
    s=ellipse(0,0,43,8,'#18324B',extra='opacity=".12"')
    s+=path('M-23 -90v-19q22 -31 45 0v19','none',P['teal'],8)
    s+=rect(-43,-96,86,84,'url(#paper)',20,P['ink'],3)+path('M-42 -42q42 12 84 0v13q0 17 -19 17h-49q-17 0 -16 -16Z','#24858C',P['ink'],2)
    s+=circle(7,-66,25,P['ink'],'#607A88',4)+circle(7,-66,17,'#254762')+circle(13,-73,6,P['white'])+ellipse(-31,-67,5,9,P['coral'])
    s+=rect(-30,-18,16,21,P['ink'],7)+rect(17,-18,16,21,P['ink'],7)
    if state=='projecting':s=path('M14 -64L145 -139L145 -20Z','#FFF4A1','none',extra='opacity=".16"')+s
    if state=='following':s+=path('M-60 -27l-10 0M-58 -42h-17','none',P['teal'],4)
    if state=='docked':s=rect(-56,-8,111,14,'#638991',6)+s
    return group(s,f'translate({x} {y}) scale({h/125})')
def seed(x,y,r=3):return ellipse(x,y,r*.78,r,'#B47B32')+path(f'M{x-.3} {y-r*.7}q{-r*.2} {r*.6} .5 {r}','none','#F2CD81',r*.2)
def boat(x,y,w=14,joined=False):
    s=path(f'M{x-w/2} {y}L{x+w/2} {y}L{x+w*.3} {y+4}L{x-w*.3} {y+4}Z',P['coral'],'#8D5745',.4)
    s+=path(f'M{x-w/2} {y}L{x} {y-3}L{x+w/2} {y}Z','#FFE4BA','#8D5745',.4)
    if joined:s+=path(f'M{x-w/2} {y-2}h{w}v3h{-w}Z',P['woodlight'],'#8D5745',.4)
    return s
def story(state='initial',x=0,y=0,w=760,h=230):
    # Exact local Item 05 positions; figures use narrow silhouettes inside stated extents.
    s=rect(0,0,100,100,'#E2EAF4',1)+path('M0 0h100v40Q68 28 53 42Q20 29 0 45Z','#C5D6E8')
    s+=circle(12,17,8,'#F7DB93')+path('M0 60L9 57L17 58L25 56L35 59V100H0Z','#9DB9A3','#537F6A',.25)
    s+=path('M65 60Q72 38 85 38Q95 36 100 45V100H65Z','#B7BE93','#637953',.35)
    s+=path('M35 60Q48 56 65 60V100H35Z','#73BBCD')
    for yy in (76,85,94):s+=path(f'M40 {yy}q8 3 17 0','none','#C9ECED',.7)
    s+=path('M29 70l6 2 -3 4M66 72l5 -2','none','#B67C53',2)
    crossed=state in ('crossed','planted','success','changed','historical','ferry_extra')
    planted=state in ('planted','success','changed','historical','ferry_extra')
    glow=state in ('success','changed','historical','ferry_extra')
    if glow:s+=rect(0,0,100,100,'#FFE69C',extra='opacity=".18"')
    if crossed:s+=boat(43,72,18,True)+boat(58,72,18,True)
    else:s+=boat(43,86,12)+boat(57,86,12)
    if planted:
        s+=path('M83 66v-30','none','#466B53',1.3)+path('M83 66v11m0 -6l-6 7m6 -5l6 8','none','#795933',1)
        if glow:
            s+=ellipse(83,30,31,35,'url(#glow)')
            for dx,dy in [(0,-8),(7,-4),(7,4),(0,8),(-7,4),(-7,-4)]:s+=ellipse(83+dx*.75,26+dy*.75,4,5,P['gold'])
            s+=circle(83,26,3,P['paper'])
        else:s+=ellipse(83,40,3,5,'#5F8C69')
    # Preserve both banks, attached bag and grandma's actual location.
    pp=person('pip',0,0,28,'plant' if planted else 'idle')
    gg=person('grandma',0,0,28,'plant' if planted else 'receive' if state in ('seed','unmet') or crossed else 'present')
    s+=group(pp,f'translate({77 if crossed else 23} {66 if crossed else 70}) scale(.5 1)')
    s+=group(gg,'translate(91 65) scale(.5 1)')
    if not planted:s+=seed(87 if state in ('seed','unmet') or crossed else 29,59 if state in ('seed','unmet') or crossed else 74,3.5)
    s+=rect(0,0,100,100,'url(#grain)')
    return group(s,f'translate({x} {y}) scale({w/100} {h/100})')
def tile(kind,x,y,size=70,selected=False):
    label={'F':'One Boat','B':'Joined Boats','P':'Hill','L':'Flower'}[kind]
    s=rect(-30,-30,60,60,'#FFF5D4',7,'#8C6A51',2)+rect(-26,-26,52,49,P['paper'],4)
    if kind=='F':s+=boat(0,0,39)
    if kind=='B':s+=boat(-6,-6,29,True)+boat(5,6,29,True)
    if kind=='P':s+=path('M-22 18Q-7 -29 17 1L24 18Z','#9DB58A','#5E7954',1.5)+path('M-1 6v9m0 -4l-5 5m5 -4l5 5','none','#856044',1.5)
    if kind=='L':
        s+=path('M0 20V-9','none','#588165',3)
        for dx,dy in [(0,-15),(10,-8),(9,3),(-9,3),(-10,-8)]:s+=ellipse(dx,dy,7,9,P['gold'])
        s+=circle(0,-6,5,P['coral'])
    if selected:s+=rect(-33,-33,66,66,'none',9,P['ink'],3)+path('M-20 29h40','none',P['gold'],5)
    return group(s,f'translate({x} {y}) scale({size/60})')
def caddy(x,y,w=120,opened=True,empty=False,remaining='LFPB'):
    s=rect(0,9,120,62,'#245E69',8,P['ink'],2)+path('M7 10L13 0h94l8 10Z','#4C9295',P['ink'],2)
    if opened:
        s+=rect(3,-17,114,30,'#75A1A0',7,P['ink'],2)+rect(13,-12,35,20,P['paper'],2)+rect(67,-12,38,20,P['paper'],2)
        s+=txt('Jo',29,2,11,bold=True,anchor='middle')+txt('Remy',86,2,11,bold=True,anchor='middle')
        if not empty:
            for k,xx,yy in [('L',32,27),('F',87,27),('P',32,54),('B',87,54)]:
                if k in remaining:s+=tile(k,xx,yy,23)
    else:s+=rect(4,7,112,55,'#73A39F',7,P['ink'],2)+path('M39 15v-18h41v18','none',P['ink'],4)
    return group(group(s,'translate(0 17)'),f'translate({x} {y}) scale({w/120} {w*7/12/88})')
def table(x,y,w,h,top=None):
    return rect(x+1,y+h-4,w-2,4,'#18324B',1,extra='opacity=".10"')+path(f'M{x+2} {y+h-7}v7h2v-7M{x+w-4} {y+h-7}v7h2v-7', '#95744F')+rect(x,y,w,h-5,top or P['woodlight'],1,'#967451',.3)+path(f'M{x} {y+h-8}h{w}v3h{-w}Z',P['wood'],'#967451',.2)
def sheet(x,y,w,h,curled=False,folded=False):
    s=rect(x+.4,y+.4,w,h,'#18324B',.3,extra='opacity=".12"')
    if curled:
        s+=path(f'M{x} {y+3}q{w/2} -5 {w} 0v{h-6}q{-w/2} -4 {-w} 0Z','url(#paper)','#B28B67',.25)+path(f'M{x} {y+3}q{w/2} 5 {w} 0M{x} {y+h-3}q{w/2} -5 {w} 0','none','#D3B891',1)
        s+=txt('CANCELED',x+w/2,y+h*.55,max(1,w*.10),bold=True,anchor='middle')
    else:
        s+=rect(x,y,w,h,'url(#paper)',.3,'#B9A585',.25)
        if folded:s+=path(f'M{x} {y}l{w/2} {h/2} {w/2} {-h/2}','none','#C8AC83',.3)
        else:s+=path(f'M{x+1} {y+1}h{w-2}M{x+1} {y+2}h{w-3}','none','#728794',.18)
    return s

def room(code,state='initial',avatar=None,annotations=False,order=None,opened=None):
    if order is None:order={'seed':'FP','unmet':'FP','success':'FBPL','changed':'FPLB','historical':'FPLB'}.get(state,'')
    s=rect(0,0,120,80,'url(#wall)')+rect(0,28,120,52,'url(#floor)')+path('M0 28H120','none','#BE9A77',.7)
    for yy in [36,45,54,63,72]:s+=path(f'M0 {yy}H120','none','#D5B491',.25)
    # Soft floor markings carry no collision or navigation implication.
    for xx,yy in [(16,36),(67,45),(40,54),(100,72)]:s+=path(f'M{xx} {yy}v9','none','#D5B491',.22)
    def side(which,label):
        x=0 if which=='left' else 112
        return rect(x,54,8,16,'#DAE9E6',1)+path(f'M{x+1} 69V55h6v14','none','#43787D',.8)+path(f'M{x+2} 62h4m{-3 if which=="left" else -1} -2l{-2 if which=="left" else 2} 2 {2 if which=="left" else -2} 2','none',P['ink'],.5)+txt(label,1 if which=='left' else 119,74,1.8,bold=True,anchor='start' if which=='left' else 'end')
    if code!='MD':
        names={'ST':('Courtyard','Workshop'),'CY':('Stage','Workshop'),'WK':('Stage','Courtyard')}[code];s+=side('left',names[0])+side('right',names[1])
    # Fixed wall banner stays outside projection and every route.
    if code!='MD':s+=path('M5 7Q19 11 34 7','none','#647A7A',.25)
    if code=='ST':
        s+=txt('SparkFest',8,8,4.1,P['teal'],True)+txt('THE LITTLE BRIDGE',8,12,1.55,P['muted'],True)
        s+=rect(38,2,76,23,'#D7DFE6',.7,P['ink'],.4)
        if state!='initial':s+=story(state if state in ('seed','unmet','success','changed','historical','planted','crossed') else 'initial',38,2,76,23)
        else:s+=path('M73 10l5 0v6h-5Z','none','#B6C5D0',.4)
        s+=table(8,17,24,23)+story('initial',15,19,15,12)+sheet(8,24,7,9,folded=True)+rect(16,36,8,4,P['coral'],.7,P['ink'],.3)+path('M18 38h4','none',P['paper'],.4)+rect(25,35,6,4,'#C49B6B',.5,'#8C704F',.3)+path('M27 37h2','none',P['ink'],.5)
        s+=table(46,26,16,12,'#D6C5A8')+sheet(47,26,7,8,folded=opened!='E4')+rect(55,27,7,9,P['teal'],.6,P['ink'],.3)+path('M56 29h5v4h-5Z',P['paper'])
        s+=rect(68,26,16,15,'#7E999E',1,P['ink'],.35)+ellipse(76,34,6,3,'#28465A')+rect(70,34,10,6,'#B1C9C7',.5,P['ink'],.3)+circle(83.5,39,.9,P['gold'])
        if state not in ('initial','kit_only','kit_carried','both_carried'):s+=loop(76,36,7,'docked')
        s+=table(48,66,58,10,'#689699')+rect(49,67,14,8,'#B7D3CB',.8,P['ink'],.3)+rect(64,67,29,8,'#CCE0D5',.6,P['ink'],.25)
        if state not in ('initial','loop_only','kit_carried','both_carried'):s+=caddy(50,68,12,remaining=''.join(k for k in 'LFPB' if k not in order))
        for i,k in enumerate(order):s+=tile(k,67+i*7,71,5.6)
        for xx,yy,col in [(95,67,P['gold']),(100,67,P['coral']),(95,72,P['paper']),(100,72,P['paper'])]:s+=rect(xx,yy,4,3,col,.5,P['ink'],.25)
        s+=person('jo',37,48,14,'present');av=avatar or (20,50)
    elif code=='CY':
        s=rect(0,0,120,80,'#D6EBE8')+path('M0 20Q22 9 40 19T80 15T120 20V30H0Z','#A7C9B2')+rect(0,28,120,52,'#E9D5B7')+s[s.index('<path d="M0 28'):]
        s+=table(10,19,32,21)+boat(16,30,7)+sheet(21,29,9,8)
        s+=path('M14 13Q29 18 42 13','none','#55796D',.3)
        for xx,yy in [(17,20),(25,18),(33,23),(40,20)]:s+=path(f'M{xx} {yy-5}l2 4 -1 5 -2 -3Z','#F4BF82','#B98362',.2)
        s+=table(48,22,10,16,'#72A1A6')+rect(49,24,8,11,P['teal'],.7,P['ink'],.3)+rect(50,25,6,7,P['paper'],.3)
        s+=rect(80,12,28,28,'#6A9290',1,P['ink'],.35)+sheet(84,17,20,21,curled=state!='flat')+rect(92,37,4,1.5,P['ink'],.3)
        if state=='flat':
            for i,line in enumerate(ct('CT.SRC.E3').split('\n')):
                ss,_=wrap(line,85,21+i*4,18,1.5,1.6,bold=i==0);s+=ss
        s+=person('remy',64,48,14);av=avatar or (30,58)
    elif code=='WK':
        s+=table(12,16,28,24)+path('M15 29V16l7 0v7h4V13h7v15Z','#8CAEA0','#496D60',.3)+path('M16 13l18 3','none','#547984',.3)+sheet(33,28,4,7)
        s+=rect(44,13,7,26,'#D2AD7A',.7,P['ink'],.3)+rect(44.4,16,6.2,16,P['paper'],.4)+path('M46 19h4m-2 -2 2 2 -2 2M46 24h4M46 29h4','none',P['teal'],.7)
        s+=rect(55,20,14,13,'#E7F0E9',1)+path('M56 32V21h12v11','none',P['teal'],.9)+txt('Media',62,18,2.2,P['ink'],True,'middle')
        s+=table(82,28,26,18,'#87A8A0')+rect(82,12,26,19,'#DA9B68',3,P['ink'],.4)+path('M83 14Q94 3 107 14','none','#BCA184',.7)+ellipse(95,29,10,2,'#D4E1D8')
        if state in ('revealed','magnifier'):s+=rect(94,26,2,2,'#C58644',.5,'#825435',.2)+circle(100,20,4,'#EDF6F1','#486A72',.5)+path('M103 23l3 3','none',P['ink'],1)
        else:s+=path('M85 27V22q10 -11 20 0v5Z','#F1CC9D','#9B7653',.4)
        s+=rect(91,37,10,7,P['gold'],1,P['ink'],.3)+txt('Maximum Toast',95,34,1.8,bold=True,anchor='middle');av=avatar or (31,58)
    else:
        s+=rect(22,2,82,16,P['paper'],.4,'#D3C2AF',.25)+table(22,19,39,22)
        for xx,yy in [(28,24),(34,27),(41,23)]:s+=path(f'M{xx-2} {yy}q2 -4 4 0q-2 3 -4 0',P['coral'],'#A56853',.2)
        s+=rect(44,29,13,9,'#315A6C',.5)+path('M45 30h11','none',P['paper'],.5)+path('M46 33h8m-8 2h5','none','#CCDFD7',.4)
        s+=table(78,18,32,23,'#85A49D')+sheet(79,22,7,15)+sheet(87,22,7,15)+rect(95,27,14,13,'#477A7F',.7)
        s+=txt('Jo',82.5,25,1.5,bold=True,anchor='middle')+txt('Remy',90.5,25,1.35,bold=True,anchor='middle')
        if state not in ('departed','kit_gone'):s+=caddy(96,32,12,opened=state=='open')
        if state not in ('departed','loop_gone'):s+=loop(68,45,8)
        s+=person('ari',39,52,14)+rect(55,72,14,8,'#BCD6CD',1,P['teal'],.4)+path('M62 73v4m-2 -2 2 2 2 -2','none',P['ink'],.5)+txt('Workshop',72,78,1.7,bold=True);av=avatar or (62,66)
    s+=person('player',av[0],av[1],12,'operate' if avatar else 'idle')
    if state in ('kit_carried','both_carried'):s+=caddy(av[0]+2,av[1]-6,12,opened=False)
    if state=='both_carried':s+=loop(av[0]-7,av[1]+2,8,'following')
    s+=rect(0,0,120,80,'url(#grain)')
    return s
def world(code='ST',state='initial',caption=None,goal=None,kit=False,focus=None,avatar=None,opened=None,order=None):
    name={'ST':'Stage','CY':'Courtyard','WK':'Workshop','MD':'Media'}[code]
    s=rect(0,0,1440,960,P['paper'])+txt(name,40,47,28,bold=True)
    goal=goal or ct('CT.GOAL.RESOURCES' if code=='MD' else 'CT.GOAL.LAUNCH' if code=='ST' and state=='success' else 'CT.GOAL.REHEARSE' if code=='ST' and state not in ('initial','loop_only','kit_only') else 'CT.GOAL.LOOP' if state=='kit_only' else 'CT.GOAL.KIT' if state=='loop_only' else 'CT.GOAL.SEARCH')
    s+=button(ct('CT.UI.GOAL'),210,16,85)+txt(goal,316,47,23)+button(ct('CT.UI.MENU'),1303,16,99)
    s+=group(room(code,state,avatar=avatar,opened=opened,order=order),'translate(150 80) scale(9.5)')
    if focus:
        xx,yy,label=focus;s+=ellipse(150+xx*9.5,80+yy*9.5,45,25,'none',extra='stroke="#18324B" stroke-width="3"')
        s+=button(label,650,899,420,focus=True)
    if caption:s+=wrap(caption,48,880,1340,23,32)[0]
    s+=buttons([ct('CT.UI.MOVE'),ct('CT.UI.MAP'),ct('CT.UI.NOTES'),ct('CT.UI.HELP')]+([ct('CT.UI.KIT')] if kit else []),48,899,maxw=1250)[0]
    return s
def surface(title,body,code='ST',state='initial',x=220,y=110,w=1000,h=740,footer=True,avatar=None,opened=None,order=None,goal=None,home=False):
    base=rect(0,0,1440,960,P['paper'])+txt(ct('CT.START.TITLE'),48,70,45,bold=True)+txt(ct('CT.START.CASE'),48,117,28)+person('player',170,766,267)+loop(1263,766,137) if home else world(code,state,avatar=avatar,opened=opened,order=order,goal=goal)
    s=base+rect(0,0 if home else 80,1440,960 if home else 780,P['ink'],extra='opacity=".28"')+rect(x+7,y+10,w,h,'#18324B',24,extra='opacity=".14"')+rect(x,y,w,h,P['white'],22,P['line'],1.5)
    s+=txt(title,x+30,y+48,32,bold=True)+button(ct('CT.UI.CLOSE'),x+w-112,y+17,88)
    s+=path(f'M{x+24} {y+88}H{x+w-24}','none','#CDD9DD',1.5)+body
    if footer:s+=button(ct('CT.UI.ROOM'),x+30,y+h-75,190)
    return s
def block(text,x,y,w,size=24,lh=None,fill=None,bold=False):return wrap(text,x,y,w,size,lh,fill,bold)[0]
def rows(labels,x,y,w,size=22,selected=-1):
    s=''
    for i,l in enumerate(labels):s+=button(l,x,y+i*64,w,kind='selected' if i==selected else 'secondary',size=size)
    return s

def build_rooms_and_cast():
    variants=[('ST','initial','Opening Stage'),('ST','ready','Stage ready for rehearsal'),('CY','initial','Curled courtyard notice'),('CY','flat','Courtyard after flattening'),('WK','initial','Workshop and open passages'),('WK','revealed','Maximum Toast revealed'),('MD','initial','Media on first arrival'),('MD','departed','Media after recovery')]
    spots={
    'ST':[(20,33,'ST.MODEL / TAB / E1 / E6'),(37,48,'ACT.JO'),(50,30,'ST.SOURCE.E4'),(58,31,'ST.ACCESS.E2'),(76,35,'ST.DOCK / FLAP / PAD'),(54,70,'ST.RACK.BAY'),(79,71,'ST.RAIL / A–D'),(99,70,'ST.CONTROL.*'),(76,12,'ST.PROJECTION'),(4,62,'ST.EXIT.CY'),(116,62,'ST.EXIT.WK'),(20,50,'ACT.PLAYER')],
    'CY':[(24,31,'CY.MODEL.BENCH / E7'),(27,19,'CY.PETALS'),(53,28,'CY.ACCESS.E2'),(64,48,'ACT.REMY'),(94,28,'CY.SOURCE.E3 / BOARD'),(4,62,'CY.EXIT.ST'),(116,62,'CY.EXIT.WK')],
    'WK':[(27,26,'WK.BENCH / SCENERY'),(48,24,'WK.ACCESS.NAV'),(62,27,'WK.EXIT.MD'),(96,27,'WK.TOAST / MAGNIFIER'),(96,40,'WK.TOAST.START'),(4,62,'WK.EXIT.ST'),(116,62,'WK.EXIT.CY')],
    'MD':[(61,12,'MD.PLAIN.WALL'),(38,30,'MD.RECORDING.TABLE'),(51,33,'MD.SOURCE.E5'),(39,52,'ACT.ARI'),(68,45,'ACT.LOOP / FOLLOW.PAD'),(83,30,'MD.SOURCE.E6'),(90,30,'MD.SOURCE.E7'),(101,34,'MD.ACCESS.E8 / CADDY'),(62,75,'MD.EXIT.WK')]
    }
    for code,state,title in variants:
        id=f'V08-ROOM-{code}-{state.upper()}'
        save(id,title,group(room(code,state),'scale(12)'),1440,960,'P.WORLD','UI.WORLD.IDLE',f'SC.{code}; '+ '; '.join(z[2] for z in spots[code]),'Unread source bodies remain unexposed; Media cast appears only after entry.',id+'-A')
        s=rect(0,0,1440,1040,P['paper'])+txt(title+' · placement reference',30,42,30,bold=True)+group(room(code,state),'translate(0 100) scale(10)')
        for i,(x,y,label) in enumerate(spots[code],1):
            s+=circle(x*10,y*10+100,15,P['white'],P['ink'],2)+txt(str(i),x*10,y*10+106,16,bold=True,anchor='middle')
            s+=circle(1224,122+(i-1)*66,13,P['ink'])+txt(str(i),1224,127+(i-1)*66,14,P['white'],True,'middle')+block(label.replace(' / ','\n'),1245,122+(i-1)*66,175,16,21)
        s+=path('M40 680H1160','none',P['focus'],2,extra='stroke-dasharray="6 7"')+txt('REVIEW OVERLAY: clear through-route y58–62; no new floor obstacle.',30,950,21,P['muted'])+txt('120 × 80 logical room. Artwork and accesses retain Item 05 positions. Numbers are not child-facing.',30,987,21,P['muted'])
        save(id+'-A',title+' — annotated',s,1440,1040,'P.WORLD','UI.WORLD.IDLE',f'SC.{code}; '+ '; '.join(z[2] for z in spots[code]),'Annotations are review-only.',id,note='Number labels outside the scene and coordinate overlay are author annotations.')
    s=rect(0,0,1440,960,P['paper'])+txt('One crew. One paper story.',48,62,42,bold=True)+txt('FUNCTIONAL CAST DIAGRAM · Use V08-CAST-ILLUSTRATED for the final drawing quality.',48,106,22,P['muted'])
    cast=['player','loop','jo','remy','ari','pip','grandma']
    for i,who in enumerate(cast):
        x=105+i*201;s+=person(who,x,420,245 if who!='loop' else 245)
        s+=txt({'player':'You','loop':'Loop','jo':'Jo','remy':'Remy','ari':'Ari','pip':'Pip','grandma':'Grandma'}[who],x,466,27,bold=True,anchor='middle')
    s+=path('M50 504H1390','none','#B8C9C8',2)+txt('Recognition through action',48,552,30,bold=True)
    for i,st in enumerate(['idle','following','docked','projecting']):
        s+=loop(138+i*238,767,142,st)+txt(['Standby','Following','Docked','Projecting'][i],138+i*238,809,23,bold=True,anchor='middle')
    s+=backpack(1140,695,1.9)+person('pip',1294,777,183,'plant')+txt('Your backpack → Pip',1160,843,24,bold=True,anchor='middle')
    s+=txt('Warm lens / aligned roller feet / settled dock pose / soft beam. Loop never looks damaged.',48,905,22,P['muted'])
    save('V08-CAST','Functional cast silhouettes and Loop states',s,pattern='P.ART',state='UI.WORLD.IDLE; UI.WORLD.OPERATING',refs='ACT.PLAYER; ACT.LOOP; ACT.JO; ACT.REMY; ACT.ARI; MODEL.BACKPACK; PUP.*',companion='V08-CAST-ILLUSTRATED; V08-STORYBOARD-RECOVERY',note='Functional pose/state diagram only. Jo is a white girl with fair skin and brown hair in two buns. The illustrated cast governs final appearance and detail.')
    s=rect(0,0,1440,960,P['paper'])+txt('SparkFest / built by the crew',48,65,43,bold=True)+txt('Warm festival materials. Crisp controls. A paper story you can change.',48,108,26,P['muted'])
    for i,k in enumerate(['ink','teal','gold','coral','blue','plum','paper','mint']):
        x=48+i*172;s+=rect(x,154,148,97,P[k],16,P['line'],1)+txt(k.upper(),x,282,19,bold=True)+txt(P[k],x,314,21)
    s+=txt('Find a useful object',50,390,34,bold=True)+person('player',108,603,166,'operate')+group(room('ST'),'translate(206 348) scale(3.5)')
    s+=txt('Segoe UI / regular & bold',752,390,34,bold=True)+block(ct('CT.SRC.E6'),752,440,618,25,39)
    s+=txt('Distinct states, even without color',48,746,30,bold=True)
    s+=button('Available action',48,780,225)+button('Selected target',295,780,225,'selected')+button('Keyboard focus',542,780,225,focus=True)+button('Active control',789,780,225,'primary')+button('Unavailable',1036,780,225,'disabled')
    s+=txt('Read-only scenery has no button frame. Unavailable actions retain their reason beside the control.',48,891,23,P['muted'])
    save('V08-DIRECTION','Visual direction, type and interaction hierarchy',s,pattern='P.ART',state='shared',refs='05 §2; 06 C3/C6; CT.SRC.E6',companion='V08-COMPACT-NAV',note='State names on this art-direction board are review annotations, not added game labels.')

def media_picture(frame,x,y,w,h):
    s=rect(0,0,400,200,'#C9E1DE',8)+rect(0,125,400,75,'#DEC19D')+path('M0 125H400','none','#879F92',2)
    if frame>1:s+=rect(250,15,120,153,'#3D6C73',6)+rect(267,25,87,140,'#E7EEE8',3)
    if frame<3:
        xx=115 if frame==1 else 289
        s+=rect(xx-52,151,105,10,'#8C6C54',3)+circle(xx-33,176,10,P['ink'])+circle(xx+33,176,10,P['ink'])+path(f'M{xx+50} 157v-60h-20','none','#556A72',5)+loop(xx,150,104)
    return group(s,f'translate({x} {y}) scale({w/400} {h/200})')

def build_interfaces():
    s=world(goal=ct('CT.GOAL.SEARCH'),focus=(20,38,ct('CT.OBJ.MODEL')))
    s+=txt(ct('CT.GOAL.ASSIGNMENT'),48,864,23)+txt(ct('CT.GUIDE.TAB'),48,890,18,P['muted'])+button(ct('CT.UI.DISMISS'),1120,899,250)
    s+=txt(ct('CT.WORLD.YOU'),340,432,20,P['ink'],True)
    save('V08-OPENING','Opening, visible avatar and a concrete action',s,pattern='P.WORLD',state='UI.GUIDE.OPENING; UI.WORLD.IDLE',refs='SC.ST; ST.MODEL.TAB; ACC.GOAL; ACC.OBJECTS; T.GUIDE.DISMISS',concealed='Blank dock and projection; no robot location, no source body.',companion='V08-COMPACT-WORLD')
    b=block(ct('CT.WORLD.CHOOSE'),435,260,560,27,40)+rows([ct('CT.OBJ.MODEL'),ct('CT.OBJ.BRIEF_OPEN'),ct('CT.UI.CANCEL')],435,310,570)
    save('V08-CHOOSER','Explicit overlapping-target choice',surface(ct('CT.WORLD.CHOOSE'),b,x=395,y=160,w=650,h=520),pattern='P.SHEET',state='UI.WORLD.CHOOSER',refs='ST.MODEL.TAB; ST.SOURCE.E1; ACC.OBJECTS',concealed='Only actual candidates; no recommended answer.',companion='V08-COMPACT-NAV')
    b=''
    # Topology is public; no unseen occupants in the map.
    for x1,y1,x2,y2 in [(405,302,705,367),(705,367,1005,302),(405,302,1005,302),(1005,302,1005,232)]:b+=path(f'M{x1} {y1}L{x2} {y2}','none','#89A6A4',3)
    for label,x,y in [('Stage',310,277),('Courtyard',610,342),('Workshop',910,277),('Media',910,207)]:b+=button(label,x,y,190,kind='selected' if label=='Workshop' else 'secondary')
    for i,k in enumerate(['ST','CY','WK','MEDIA']):
        yy=443+i*77;b+=txt(ct('CT.NAV.'+k),260,yy,23)+button(ct('CT.WORLD.GO',room={'ST':'Stage','CY':'Courtyard','WK':'Workshop','MEDIA':'Media'}[k]),966,yy-31,211,size=19)
    save('V08-NAV','Venue map with public room descriptions',surface(ct('CT.UI.MAP'),b,code='WK'),pattern='P.SHEET',state='UI.NAV.MAP',refs='WK.ACCESS.NAV; ACC.VENUE; NAV.*; T.NAV.GO',concealed='Media is a suitable place to search; no Ari or Loop listed.',companion='V08-COMPACT-NAV')
    for source,code in [('E4','ST'),('E3','CY'),('E6','ST'),('E7','MD')]:
        b=txt('By '+('Ari' if source in ('E4','E3') else 'Jo' if source=='E6' else 'Remy'),270,248,22,P['muted'])
        if source in ('E4','E3'):b+=txt(ct('CT.META.POSTED',time='9:05' if source=='E4' else '9:10'),920,248,22,P['muted'])
        b+=rect(257,279,920,358,'url(#paper)',12,'#D4C6A8',1)+block(ct('CT.SRC.'+source),286,331,844,29,46)
        b+=buttons([ct('CT.SOURCE.ENLARGE'),ct('CT.SOURCE.DETAIL'),ct('CT.PRESENT.OPEN')],267,668,maxw=900)[0]
        save('V08-READ-'+source,'Reading '+ct('CT.TITLE.'+source),surface(ct('CT.TITLE.'+source),b,code=code,state='flat' if source=='E3' else 'initial' if source=='E4' else 'ready',avatar={'E4':(50,45),'E3':(92,48),'E6':(55,58),'E7':(90,48)}[source],opened=source),pattern='P.READER',state='UI.SOURCE.TEXT; UI.SOURCE.ZOOM',refs=('CY.SOURCE.E3' if source=='E3' else 'ST.SOURCE.E4' if source=='E4' else 'KIT.NOTE.E6' if source=='E6' else 'MD.SOURCE.E7')+'; ACC.EVIDENCE.'+source,concealed='No selection or highlighting of the decisive passage by default.',companion='V08-COMPACT-SOURCE-TOP; V08-COMPACT-SOURCE-END')
    for state in ['FIRST','END','PHOTO','FULL']:
        b=txt('Remy · '+ct('CT.META.RECORDED',time='9:12'),265,236,22,P['muted'])
        b+=buttons([(ct('CT.MEDIA.RECORDING'),'selected' if state!='PHOTO' else 'secondary'),(ct('CT.MEDIA.PHOTO'),'selected' if state=='PHOTO' else 'secondary')],265,260)[0]
        if state in ('FIRST','END'):
            f=1 if state=='FIRST' else 3;b+=media_picture(f,265,332,462,226)
            b+=txt(ct('CT.MEDIA.MESSAGE'),758,352,22,bold=True)+block(ct('CT.SRC.E2.C'),758,395,403,26,39)
            b+=block(ct('CT.MEDIA.FRAME'+str(f)),265,593,890,23,34)
            if state=='END':b+=txt(ct('CT.MEDIA.END'),265,633,23,bold=True)
            b+=txt(ct('CT.CLIP.FIRST' if state=='FIRST' else 'CT.CLIP.LAST'),755,633,20,P['muted'])
            b+=buttons([(ct('CT.CLIP.PREVIOUS'),'disabled' if f==1 else 'secondary')]+[(ct('CT.MEDIA.FRAME'+str(i)+'.LABEL'),'selected' if i==f else 'secondary') for i in [1,2,3]]+[(ct('CT.CLIP.NEXT'),'disabled' if f==3 else 'secondary'),ct('CT.CLIP.REPLAY' if state=='END' else 'CT.CLIP.PLAY')],265,658,maxw=900,size=17)[0]
            b+=button(ct('CT.CLIP.DESCRIBE'),265,722,231,size=19)+button(ct('CT.SOURCE.ENLARGE'),515,722,196,size=19)
        elif state=='PHOTO':
            b+=group(sheet(0,0,26,30,curled=True),'translate(295 338) scale(8)')+block(ct('CT.SRC.E2.B'),611,382,525,28,43)+block(ct('CT.MEDIA.PARTIAL'),611,459,525,25,40)+button(ct('CT.CLIP.ENLARGE_PHOTO'),612,635,214)
        else:
            b+=rect(264,346,910,261,P['paper'],16)+block(ct('CT.SRC.E2.A'),298,399,835,30,48)+button(ct('CT.UI.BACK'),265,653,110)
        save('V08-E2-'+state,'E2 '+state.lower()+' component',surface(ct('CT.TITLE.E2'),b,state='initial',h=790),pattern='P.READER',state='UI.SOURCE.POST; UI.SOURCE.CLIP' if state in ('FIRST','END') else 'UI.SOURCE.PHOTO' if state=='PHOTO' else 'UI.SOURCE.TEXT',refs='ST.ACCESS.E2; CY.ACCESS.E2; ACC.EVIDENCE.E2; E2.a/b/c',concealed='FIRST excludes end/doorway caption; PHOTO never offers physical flattening. FULL requires explicit Describe recording.',companion='V08-COMPACT-E2')
    # Vocabulary child retains source; definition is access assistance, not an answer.
    b=txt('premiere',445,320,34,bold=True)+txt(ct('CT.WORD.PREMIERE'),445,380,29)+button(ct('CT.SOURCE.DEFINITION_CLOSE'),445,444,246)+button(ct('CT.UI.BACK'),445,510,100)
    save('V08-WORD','An exact vocabulary definition',surface('premiere',b,x=395,y=200,w=650,h=430,footer=False),pattern='P.READER',state='UI.SOURCE.WORD',refs='E1; ACC.EVIDENCE.E1; CT.WORD.PREMIERE',concealed='No added clue or hint.',companion='V08-COMPACT-SOURCE-TOP')
    b=buttons([(ct('CT.NOTES.EVIDENCE'),'selected'),ct('CT.NOTES.COMPARE'),ct('CT.NOTES.TIMELINE'),ct('CT.NOTES.IDEAS')],258,221)[0]
    b+=rows([ct('CT.TITLE.E4'),ct('CT.TITLE.E2'),ct('CT.TITLE.E3')],258,315,280,size=20,selected=2)
    b+=txt(ct('CT.TITLE.E3'),570,343,29,bold=True)+txt('By Ari · '+ct('CT.META.POSTED',time='9:10'),570,381,21,P['muted'])+block(ct('CT.SRC.E3'),570,441,590,27,44)
    b+=button(ct('CT.SOURCE.DETAIL'),570,665,188)+button(ct('CT.NOTES.LOCATION'),778,665,245)
    save('V08-NOTES','Evidence browsing after three actual discoveries',surface(ct('CT.UI.NOTES'),b,state='ready'),pattern='P.READER',state='UI.NOTES.LIST; UI.SOURCE.PICK',refs='ACC.EVIDENCE.E4/E2/E3; ACC.COMPARE',concealed='Only acquired records; no E5–E8 placeholders.',companion='V08-COMPACT-PLAN')
    b=buttons([ct('CT.NOTES.EVIDENCE'),ct('CT.NOTES.COMPARE'),ct('CT.NOTES.TIMELINE'),ct('CT.NOTES.IDEAS')],258,231)[0]+block(ct('CT.NOTES.EMPTY'),272,383,850,30,48)
    save('V08-NOTES-EMPTY','Notes before discovery',surface(ct('CT.UI.NOTES'),b),pattern='P.READER',state='UI.NOTES.EMPTY; UI.COMPARE.EMPTY; UI.TIMELINE.EMPTY',refs='ACC.EVIDENCE; ACC.COMPARE; ACC.TIMELINE',concealed='No undiscovered titles, counts, eight slots or hints.',companion='V08-COMPACT-NAV')
    b=txt(ct('CT.COMPARE.INSTRUCTION'),262,242,23)
    for idx,(sx,title,body) in enumerate([(262,'E4',ct('CT.SRC.E4').split(' If ')[0]),(747,'MEDIA',ct('CT.NAV.MEDIA'))]):
        b+=rect(sx,275,435,278,P['paper'],14,P['line'],1)+txt(ct('CT.TITLE.E4') if title=='E4' else ct('CT.META.VENUE'),sx+20,315,24,bold=True)+block(body,sx+20,359,394,25,39)+button(ct('CT.SOURCE.CHANGE'),sx+20,481,190)
    b+=txt(ct('CT.COMPARE.RELATION'),262,597,25,bold=True)+buttons([ct('CT.COMPARE.SUPPORTS'),ct('CT.COMPARE.CONFLICTS'),ct('CT.COMPARE.BEFORE')],262,620)[0]+txt(ct('CT.COMPARE.RELATION_HELP'),262,708,22,P['muted'])+button(ct('CT.IDEA.SAVE'),954,680,188)
    save('V08-COMPARE','Source requirements beside public venue conditions',surface('Compare details',b),pattern='P.COMPARE',state='UI.COMPARE.READY; UI.COMPARE.PARTIAL',refs='E4.a; NAV.MEDIA; ACC.COMPARE',concealed='No automatic relationship or occupancy confirmation; slots reflect review fixture selection.',companion='V08-COMPACT-PLAN',note='The two details are an explicitly selected review fixture, never default game input.')
    b=buttons([(ct('CT.TIMELINE.EVENT'),'selected'),ct('CT.TIMELINE.DISCOVERY')],263,231)[0]
    for i,(time,label,source) in enumerate([('9:05','PLAN','E4'),('9:10','NOTICE','E3'),('9:12','RECORDING','E2'),('9:13','POST','E2'),('9:18','CAPTURE','E5')]):
        yy=336+i*76;b+=txt(time,263,yy,27,bold=True)+txt(ct('CT.TIMELINE.'+label),370,yy,23)+txt(ct('CT.TITLE.'+source),810,yy,21,P['muted'])+path(f'M263 {yy+22}H1165','none','#CCD9D7',1)
    save('V08-TIMELINE','Known times distinguish requests from completed events',surface(ct('CT.NOTES.TIMELINE'),b,state='ready'),pattern='P.SHEET',state='UI.TIMELINE.KNOWN',refs='ACC.TIMELINE; E4 9:05; E3 9:10; E2 9:12/9:13; E5.a 9:18',concealed='Fixture has all five timed components; unknown event times are never filled in.',companion='V08-COMPACT-NAV')
    b=world('CY','flat')+rect(90,586,1260,305,P['white'],20,P['line'],1.5)+person('remy',185,818,176)+txt('Remy',280,634,32,bold=True)+block(ct('CT.REMY.CORRECT'),280,686,987,28,43)+buttons([ct('CT.PRESENT.OPEN'),ct('CT.TALK.CLIP'),ct('CT.UI.ROOM')],280,812,maxw=1020)[0]+button(ct('CT.UI.CLOSE'),1219,605,104)
    save('V08-TALK','Remy receives both notice passages at his location',b,pattern='P.TALK',state='UI.TALK.REPLY',refs='ACT.REMY; CY.SOURCE.E3; ACC.PRESENT; E3.a/b',concealed='Reply only after actual presentation; does not claim child changed their mind.',companion='V08-PLAN-DELIVERED')
    b=txt(ct('CT.PRESENT.REVIEW',person='Remy'),263,243,29,bold=True)+block(ct('CT.SRC.E3'),265,308,880,28,44)+button(ct('CT.PRESENT.SHOW',person='Remy'),264,586,179,'primary')+button(ct('CT.UI.CANCEL'),459,586,110)
    save('V08-PRESENT','Exact details reviewed before local delivery',surface(ct('CT.PRESENT.OPEN'),b,code='CY',state='flat'),pattern='P.PLAN',state='UI.PRESENT.SELECT; UI.PRESENT.REVIEW; UI.PRESENT.APPROACH',refs='ACT.REMY; ACC.PRESENT; E3.a/b',concealed='No reply before approach and delivery commit.',companion='V08-TALK')
    for st in ['PRIVATE','RECORDED','DELIVERED']:
        b=txt(ct('CT.PLAN.STORY'),267,242,26,bold=True)+txt('One Boat → Hill',267,286,24)
        b+=block(ct('CT.IDEA.PRIVATE' if st=='PRIVATE' else 'CT.PLAN.'+st),267,335,875,25,38)+txt(ct('CT.IDEA.FIELD'),267,432,24,bold=True)+rect(267,454,900,135,P['paper'],10,P['line'],1.5)
        # Empty draft is the actual default. Later states are explicit review fixture text.
        if st!='PRIVATE':b+=block('The seed can go first.',290,500,840,26,39)
        if st=='PRIVATE':b+=buttons([ct('CT.PLAN.RECORD'),ct('CT.PLAN.EXPLAIN'),ct('CT.HELP.THINK')],267,625)[0]
        elif st=='RECORDED':b+=buttons([ct('CT.UI.EDIT'),ct('CT.PLAN.EXPLAIN'),ct('CT.HELP.THINK')],267,625)[0]
        else:b+=txt('Jo',267,635,24,bold=True)+txt(ct('CT.JO.PLAN_REPLY'),267,677,27)+button(ct('CT.UI.EDIT'),975,700,125)
        save('V08-PLAN-'+st,'A '+st.lower()+' plan',surface(ct('CT.PLAN.STORY'),b,state='ready',order='FP',avatar=(37,56) if st=='DELIVERED' else (78,58)),pattern='P.PLAN',state='UI.PLAN.'+('ADDRESSED' if st=='DELIVERED' else st)+'; UI.IDEA.'+('DRAFT' if st=='PRIVATE' else 'RECORDED'),refs='ACC.PLAN.RECORD; ACT.JO; ACC.PRESENT; ST.RAIL',concealed='No inferred correctness or unrequested coaching; private/recorded states have no NPC reply.',companion='V08-COMPACT-PLAN',note='Recorded/delivered states use the labeled review fixture "The seed can go first." The initial field is blank.')
    # Kit shown as a physical tray with leaflets, not a collection checklist.
    b=txt(ct('CT.KIT.CARRIED'),264,242,25,bold=True)+block(ct('CT.KIT.CONTENTS'),264,285,880,24,36)
    for k,x,y in [('L',342,401),('F',646,401),('P',342,548),('B',646,548)]:
        b+=tile(k,x,y,84)+button(ct('CT.OBJ.INSPECT_TILE',tile={'L':'Flower','F':'One Boat','P':'Hill','B':'Joined Boats'}[k]),x-92,y+56,226,size=18)
    b+=sheet(888,335,210,115)+txt('Jo',913,379,26,bold=True)+button(ct('CT.KIT.NOTE_JO'),836,469,329,size=19)
    b+=sheet(888,548,210,105)+txt('Remy',913,589,26,bold=True)+button(ct('CT.KIT.NOTE_REMY'),836,678,329,size=19)
    save('V08-KIT','Carried kit with unopened portable notes',surface(ct('CT.KIT.TITLE'),b,state='kit_carried',avatar=(55,58)),pattern='P.KIT',state='UI.KIT.CARRIED; UI.KIT.OPEN',refs='KIT.CADDY; KIT.NOTE.E6/E7; ACC.KIT; TILE.*',concealed='No note bodies, reading checks, or solved storage order.',companion='V08-KIT-OWNERS; V08-READ-E6')

def build_work_and_help():
    cases=[('EMPTY','initial','', 'CT.WORK.EMPTY','UI.WORK.EMPTY'),('SEED','seed','FP','CT.CUE.FERRY','UI.RUN.REHEARSAL'),('UNMET','unmet','FP','CT.CUE.HILL_MISSING_PIP','UI.RUN.UNMET'),('FLOWER-UNMET','initial','L','CT.CUE.UNPLANTED','UI.RUN.UNMET'),('SUCCESS','success','FBPL','CT.WORK.CERTIFIED','UI.WORK.CERTIFIED'),('CHANGED','initial','FPLB','CT.RAIL.CHANGED','UI.WORK.READY'),('HISTORY','initial','FPLB','CT.WORK.CHECK','UI.WORK.SHOW_CHECK'),('PAUSED','seed','FBPL','CT.CUE.FERRY','UI.RUN.PAUSED')]
    names={'F':'One Boat','B':'Joined Boats','P':'Hill','L':'Flower'}
    for id,st,order,msg,u in cases:
        s=rect(0,0,1440,960,P['paper'])+txt('Stage',32,42,27,bold=True)+button(ct('CT.UI.GOAL'),177,12,84)+button(ct('CT.UI.MENU'),1305,12,99)
        # 930x620 complete room retained above 260px working band.
        s+=group(room('ST','ready' if st=='initial' else st,order=order,avatar=(78,58)),'translate(255 62) scale(7.75)')
        s+=rect(20,692,1400,248,P['white'],20,P['line'],1.5)+txt(ct(msg),46,733,26,bold=True)
        if id=='HISTORY':s+=txt(ct('CT.ENDING.FACT'),46,678,23,P['muted'])
        if id=='PAUSED':s+=txt(ct('CT.RUN.PAUSED',mode='Premiere'),47,771,22,bold=True)+txt(ct('CT.RUN.NEXT',nextTile='Joined Boats'),285,771,22)
        else:
            s+=txt(ct('CT.RAIL.TITLE'),477,778,21,bold=True)
            for i,k in enumerate(order):s+=tile(k,505+i*170,823,48)+txt(names[k],505+i*170,865,19,bold=True,anchor='middle')
            for i,k in enumerate([k for k in 'LFPB' if k not in order]):s+=tile(k,75+i*92,818,43)+txt(names[k],75+i*92,861,15,bold=True,anchor='middle')
        if id=='PAUSED':labs=[ct('CT.RUN.CONTINUE',modeLower='premiere'),ct('CT.RUN.RESTART',modeLower='premiere'),ct('CT.RAIL.ARRANGE_MODE'),ct('CT.STORY.OPEN')]
        elif id in ('UNMET','FLOWER-UNMET'):labs=[ct('CT.RUN.CONTINUE',modeLower='rehearsal'),ct('CT.RUN.RESTART',modeLower='rehearsal'),ct('CT.RAIL.ARRANGE_MODE'),ct('CT.STORY.OPEN'),ct('CT.UI.NOTES'),ct('CT.UI.HELP'),ct('CT.RUN.STOP')]
        else:labs=[ct('CT.WORK.REHEARSE'),ct('CT.WORK.REPLAY' if id=='HISTORY' else 'CT.WORK.LAUNCH'),ct('CT.RUN.STOP'),ct('CT.WORK.MORE')]
        s+=buttons(labs+['Back to Stage'],46,885,maxw=1360,size=18 if id in ('UNMET','FLOWER-UNMET') else 19)[0]
        save('V08-WORK-'+id,'Workstation: '+id.lower(),s,pattern='P.WORK',state=u,refs='ST.RAIL; ST.CONTROL.*; ACC.RAIL; ACC.STORY.STATE; PUP.*',concealed='Projection is read-only. Harmless Ferry has no penalty. Historical completion does not certify edited order.',companion='V08-COMPACT-WATCH; V08-COMPACT-ARRANGE',note='Orders shown are explicit review fixtures, not defaults. EMPTY has no default tiles.')
    b=txt(ct('CT.RAIL.CHOOSE',tile='Joined Boats'),266,241,26,bold=True)+tile('B',343,347,92,True)+txt('One Boat → Hill',452,358,30,bold=True)
    b+=rows([ct('CT.OBJ.INSPECT_TILE',tile='Joined Boats'),ct('CT.RAIL.BEFORE',neighbor='One Boat'),ct('CT.RAIL.AFTER',neighbor='One Boat'),ct('CT.RAIL.REPLACE',other='One Boat'),ct('CT.RAIL.CANCEL')],266,428,860)
    save('V08-RAIL-ACTIONS','Named placement with selected tile distinct from keyboard focus',surface(ct('CT.RAIL.DESTINATIONS'),b,state='ready',h=790),pattern='P.WORK',state='UI.RAIL.SELECTED; UI.RAIL.DESTINATIONS',refs='TILE.BRIDGE; ST.RAIL; ACC.RAIL',concealed='Occupied target explicitly says Replace; no accidental swap/insert.',companion='V08-COMPACT-ARRANGE')
    modes=[('ENTRY','CT.HELP.FIELD'),('WAITING','CT.HELP.WAITING'),('FALLBACK','CT.HELP.OFFER'),('RESPONSE','CT.HINT.FULL_PROMISE'),('DIRECT','CT.DIRECT.RAIL'),('UNAVAILABLE','CT.HELP.UNAVAILABLE'),('STALE','CT.HELP.STALE'),('CLARIFY','CT.HINT.CLARIFY')]
    for name,key in modes:
        b=txt(ct('CT.PLAN.STORY'),266,242,24,bold=True)+txt('One Boat → Hill → Flower → Joined Boats' if name=='STALE' else 'One Boat → Hill',266,286,24)
        b+=txt(ct('CT.HELP.FIELD' if name=='ENTRY' else 'CT.HELP.SUBMITTED'),266,344,23)+rect(264,369,910,100,P['paper'],12,P['line'],1.5)
        if name not in ('ENTRY','DIRECT'):b+=txt('It goes there.' if name=='CLARIFY' else 'The seed got there, so the promise is done.',287,421,25)
        if name=='ENTRY':b+=buttons([(ct('CT.HELP.THINK'),'primary'),ct('CT.HELP.DIRECT')],267,514)[0]
        else:
            if name=='DIRECT':b+=txt(ct('CT.HELP.DIRECT'),267,515,23,bold=True)
            b+=block(ct(key),267,563 if name=='DIRECT' else 526,865,28,42)
            if name in ('WAITING','FALLBACK'):b+=buttons(([ct('CT.HELP.USE_PREPARED')] if name=='FALLBACK' else [])+[ct('CT.HELP.CANCEL')],267,670)[0]
            if name=='UNAVAILABLE':b+=buttons([ct('CT.HELP.USE_PREPARED'),ct('CT.HELP.RETRY')],267,670)[0]
            if name=='STALE':b+=button(ct('CT.HELP.THIS_VERSION'),267,662,284)
            if name=='CLARIFY':b+=buttons(['Pip','Seed',ct('CT.TITLE.E8')],267,657)[0]
        b+=button(ct('CT.UI.KEEP'),937,748,218,'primary')
        save('V08-HELP-'+name,'Help: '+name.lower(),surface(ct('CT.HELP.TITLE'),b,state='changed' if name=='STALE' else 'unmet',h=760,footer=False,avatar=(78,58)),pattern='P.COACH',state='UI.COACH.'+('FALLBACK_OFFER' if name=='FALLBACK' else name),refs='ACC.COACH; ST.RAIL; E6.a only for FULL_PROMISE',concealed='No ordinary help from unread text; direct request intentionally supplies order without marking notes read.',companion='V08-COMPACT-HELP',note='Authored response display samples, not live AI. Submitted sentence is a review fixture; ENTRY field is blank.')
    s=world('WK','both_carried',goal=ct('CT.GOAL.RESOURCES'),kit=True)+button(ct('CT.HELP.READY'),748,899,190)
    save('V08-HELP-WORLD','Closed help waits without covering exploration',s,pattern='P.WORLD',state='UI.COACH.READY_CLOSED; UI.COACH.PENDING',refs='ACC.COACH; SC.WK',concealed='Only readiness marker, no response content or focus theft.',companion='V08-HELP-STALE')

def compact_button(label,y,kind='secondary',focus=False,w=342,x=20):
    # Largest 150%: 30px controls, wrap rather than shorten exact labels.
    content,hh=wrap(label,x+18,y+40,w-36,30,42,bold=True,fill=P['white'] if kind=='primary' else P['ink'])
    h=max(68,hh+28)
    ACTIONS.append({'label':label,'kind':kind,'width':w,'height':h,'textSize':30,'focus':focus,'fits':True,'wraps':hh>42})
    s=rect(x,y,w,h,P['teal'] if kind=='primary' else P['gold'] if kind=='selected' else P['pale'] if kind=='disabled' else P['white'],14,P['ink'],1.8)+content
    if focus:s=rect(x-5,y-5,w+10,h+10,P['paper'],18,P['focus'],3)+s
    return s,h
def compact_view(title,body,bodyh,scroll=0,full=False,foot='Return to room'):
    head=136;view=604;h=844 if not full else math.ceil(head+bodyh+104)
    s=rect(0,0,390,h,P['paper'])+block(title,20,46,226,30,40,bold=True)+button(ct('CT.UI.CLOSE'),267,20,104,size=30,h=58)
    s+=path('M18 118H371','none','#ADC3C7',1.5)
    if full:s+=group(body,f'translate(0 {head})')
    else:
        s+=f'<defs><clipPath id="bodyclip"><rect x="0" y="{head}" width="372" height="{view}"/></clipPath></defs><g clip-path="url(#bodyclip)">'+group(body,f'translate(0 {head-scroll})')+'</g>'
        if bodyh>view:
            thumb=max(44,view*view/bodyh);top=head+(view-thumb)*min(1,scroll/max(1,bodyh-view))
            s+=rect(379,head,4,view,'#CCDBD9',2)+rect(378,top,6,thumb,P['line'],3)
    s+=rect(0,h-100,390,100,P['paper'])
    if foot=='watch':s+=button(ct('CT.RUN.STOP'),16,h-85,104,size=30,h=69)+button('Back to Stage',132,h-85,241,size=30,h=69)
    else:s+=compact_button(foot,h-85,w=350)[0]
    return s,h
def compact_save(id,title,body,bodyh,pattern,state,refs,scroll=0,full=False,foot='Return to room',companion=''):
    s,h=compact_view(title,body,bodyh,scroll,full,foot)
    save(id,title,s,390,h,pattern,state,refs,'Static viewport into readable scroll body; no text removed. Largest + Roomier.',companion,note='Largest: 36px body / 67.5px source leading; 30px controls. A scroll extent is a design reference, not a running interface.')

def build_compact():
    s=rect(0,0,390,844,P['paper'])+txt('Stage',18,50,34,bold=True)+button(ct('CT.UI.GOAL'),154,17,94,size=27,h=58)+button(ct('CT.UI.MENU'),264,17,107,size=27,h=58)
    s+=group(room('ST'),'translate(0 96) scale(3.25)')+block(ct('CT.GOAL.SEARCH'),20,414,344,36,55)
    s+=button(ct('CT.UI.MAP'),20,565,157,size=30,h=67)+button(ct('CT.UI.NOTES'),207,565,162,size=30,h=67)+button(ct('CT.UI.HELP'),20,655,157,size=30,h=67)
    s+=compact_button(ct('CT.UI.MOVE'),762,'primary',focus=True,w=350)[0]
    save('V08-COMPACT-WORLD','Whole Stage with dependable named movement',s,390,844,'P.WORLD','UI.WORLD.IDLE','SC.ST; ACC.OBJECTS; ACC.GOAL','Tiny world labels do not carry required instructions; Move to supplies full named actions.','V08-COMPACT-NAV',note='Largest preference; full 390×260 world overview. No camera crop.')
    body=block(ct('CT.WORLD.LOCAL_LIST'),20,40,335,36,56);y=176
    for label in [ct('CT.WORLD.VENUE'),ct('CT.WORLD.GO',room='Stage'),ct('CT.WORLD.GO',room='Courtyard'),ct('CT.WORLD.GO',room='Media'),ct('CT.TOAST.START')]:
        bs,bh=compact_button(label,y,focus=label==ct('CT.WORLD.GO',room='Media'));body+=bs;y+=bh+20
    compact_save('V08-COMPACT-NAV','Move to…',body,y,'P.SHEET','UI.NAV.OBJECTS','SC.WK; WK.ACCESS.NAV; WK.EXIT.ST/CY/MD; WK.TOAST.START; ACC.OBJECTS',companion='V08-COMPACT-NAV-END')
    compact_save('V08-COMPACT-NAV-END','Move to…',body,y,'P.SHEET','UI.NAV.OBJECTS','SC.WK; ACC.OBJECTS',scroll=max(0,y-604),companion='V08-COMPACT-NAV')
    b=txt('By Remy',20,42,30,P['muted']);text,hh=wrap(ct('CT.SRC.E7'),20,114,334,36,67.5);b+=text;y=114+hh+28
    for label in [ct('CT.SOURCE.DETAIL'),ct('CT.SOURCE.ENLARGE')]:bs,bh=compact_button(label,y);b+=bs;y+=bh+20
    compact_save('V08-COMPACT-SOURCE-TOP',ct('CT.TITLE.E7'),b,y,'P.READER','UI.SOURCE.TEXT; UI.SOURCE.ZOOM','KIT.NOTE.E7; ACC.KIT; ACC.EVIDENCE.E7; E7.a/b/c',companion='V08-COMPACT-SOURCE-END; V08-COMPACT-SOURCE-FULL')
    compact_save('V08-COMPACT-SOURCE-END',ct('CT.TITLE.E7'),b,y,'P.READER','UI.SOURCE.TEXT','KIT.NOTE.E7; E7.a/b/c',scroll=max(0,y-604),companion='V08-COMPACT-SOURCE-FULL')
    compact_save('V08-COMPACT-SOURCE-FULL',ct('CT.TITLE.E7'),b,y,'P.READER','UI.SOURCE.TEXT','KIT.NOTE.E7; E7.a/b/c',full=True,companion='V08-COMPACT-SOURCE-TOP; V08-COMPACT-SOURCE-END')
    b=txt('Remy · Recording 9:12',20,39,27,P['muted'])+media_picture(1,20,73,345,173)+block(ct('CT.MEDIA.FRAME1'),20,296,335,32,52);y=465
    for label in [ct('CT.CLIP.PLAY')]+[ct('CT.MEDIA.FRAME'+str(i)+'.LABEL') for i in [1,2,3]]+[ct('CT.CLIP.NEXT'),ct('CT.CLIP.PREVIOUS'),ct('CT.CLIP.DESCRIBE'),ct('CT.MEDIA.PHOTO')]:
        bb,bh=compact_button(label,y,'disabled' if label==ct('CT.CLIP.PREVIOUS') else 'selected' if label==ct('CT.MEDIA.FRAME1.LABEL') else 'secondary');b+=bb;y+=bh+18
        if label==ct('CT.CLIP.PREVIOUS'):b+=block(ct('CT.CLIP.FIRST'),20,y+35,334,30,45);y+=113
    b+=txt(ct('CT.MEDIA.MESSAGE'),20,y+42,30,bold=True);y+=108
    tx,hh=wrap(ct('CT.SRC.E2.C'),20,y,334,36,67.5);b+=tx;y+=hh+35
    compact_save('V08-COMPACT-E2',ct('CT.TITLE.E2'),b,y,'P.READER','UI.SOURCE.POST','ACC.EVIDENCE.E2; E2.a/frame1; E2.c',companion='V08-COMPACT-E2-FULL')
    compact_save('V08-COMPACT-E2-FULL',ct('CT.TITLE.E2'),b,y,'P.READER','UI.SOURCE.POST','ACC.EVIDENCE.E2; E2.a/frame1; E2.c',full=True,companion='V08-COMPACT-E2')
    # First-frame controls do not carry end descriptions. Full scroll is an authored review extent.
    b=block(ct('CT.IDEA.PRIVATE'),20,43,334,36,58)+txt(ct('CT.IDEA.FIELD'),20,251,30,bold=True)+rect(20,278,342,172,P['white'],12,P['line'],2);y=482
    for label in [ct('CT.SOURCE.ADD'),ct('CT.PLAN.RECORD'),ct('CT.PLAN.EXPLAIN'),ct('CT.HELP.THINK')]:bb,bh=compact_button(label,y);b+=bb;y+=bh+22
    compact_save('V08-COMPACT-PLAN',ct('CT.PLAN.STORY'),b,y,'P.PLAN','UI.PLAN.PRIVATE; UI.IDEA.DRAFT','ACC.PLAN.RECORD; ACT.JO',companion='V08-COMPACT-PLAN-FULL')
    compact_save('V08-COMPACT-PLAN-FULL',ct('CT.PLAN.STORY'),b,y,'P.PLAN','UI.PLAN.PRIVATE','ACC.PLAN.RECORD; ACT.JO',full=True,companion='V08-COMPACT-PLAN')
    b=tile('B',184,84,111,True)+block(ct('CT.RAIL.CHOOSE',tile='Joined Boats'),20,192,334,36,58)+txt('One Boat → Hill',20,376,30,bold=True);y=418
    for label in [ct('CT.RAIL.AFTER',neighbor='One Boat'),ct('CT.RAIL.REPLACE',other='One Boat'),ct('CT.OBJ.INSPECT_TILE',tile='Joined Boats'),ct('CT.RAIL.CANCEL'),ct('CT.RAIL.WATCH')]:bb,bh=compact_button(label,y,focus='after' in label);b+=bb;y+=bh+22
    compact_save('V08-COMPACT-ARRANGE',ct('CT.RAIL.ARRANGE_MODE'),b,y,'P.WORK','UI.RAIL.DESTINATIONS','ACC.RAIL; TILE.BRIDGE; ST.RAIL',foot='Back to Stage',companion='V08-COMPACT-ARRANGE-END')
    compact_save('V08-COMPACT-ARRANGE-END',ct('CT.RAIL.ARRANGE_MODE'),b,y,'P.WORK','UI.RAIL.DESTINATIONS','ACC.RAIL; TILE.BRIDGE; ST.RAIL',scroll=max(0,y-604),foot='Back to Stage',companion='V08-COMPACT-ARRANGE')
    # Entire story is re-presented in its own reserved Watch view; neither bank cropped.
    b=story('unmet',20,5,350,231)+block(ct('CT.CUE.HILL_MISSING_PIP'),20,293,334,36,60);y=524
    for label in [ct('CT.RUN.CONTINUE',modeLower='rehearsal'),ct('CT.RUN.RESTART',modeLower='rehearsal'),ct('CT.STORY.OPEN'),ct('CT.RAIL.ARRANGE_MODE')]:bb,bh=compact_button(label,y);b+=bb;y+=bh+22
    compact_save('V08-COMPACT-WATCH',ct('CT.RUN.PAUSED',mode='Rehearsal'),b,y,'P.WORK','UI.RUN.UNMET','PUP.*; ACC.STORY.STATE; ST.CONTROL.STOP',foot='watch',companion='V08-COMPACT-WATCH-ACTIONS; V08-COMPACT-ARRANGE')
    compact_save('V08-COMPACT-WATCH-ACTIONS',ct('CT.RUN.PAUSED',mode='Rehearsal'),b,y,'P.WORK','UI.RUN.UNMET','PUP.*; ACC.STORY.STATE; ST.CONTROL.STOP',scroll=y-604,foot='watch',companion='V08-COMPACT-WATCH')
    for id,title,key,acts in [('HELP',ct('CT.HELP.TITLE'),'CT.HELP.UNAVAILABLE',['CT.HELP.USE_PREPARED','CT.HELP.RETRY']),('RECOVERY',ct('CT.PAUSE.TITLE'),'CT.SAVE.DETAIL',['CT.SAVE.RETRY','CT.UI.KEEP'])]:
        b=block(ct('CT.SAVE.FAILED') if id=='RECOVERY' else ct('CT.PLAN.STORY'),20,46,334,34,56,bold=True)
        tx,hh=wrap(ct(key),20,229,334,36,67.5);b+=tx;y=229+hh+27
        for key in acts:bb,bh=compact_button(ct(key),y);b+=bb;y+=bh+22
        compact_save('V08-COMPACT-'+id,title,b,y,'P.COACH' if id=='HELP' else 'P.DECISION','UI.COACH.RESPONSE; UI.COACH.FALLBACK_OFFER' if id=='HELP' else 'UI.SAVE.SESSION','ACC.COACH' if id=='HELP' else 'ACC.SAVE',companion='V08-COMPACT-'+id+'-FULL')
        compact_save('V08-COMPACT-'+id+'-FULL',title,b,y,'P.COACH' if id=='HELP' else 'P.DECISION','UI.COACH.RESPONSE' if id=='HELP' else 'UI.SAVE.SESSION','ACC.COACH' if id=='HELP' else 'ACC.SAVE',full=True,companion='V08-COMPACT-'+id)
    # 1024 laptop: remaining world would be 840×560, so use compact overview + native list.
    s=rect(0,0,1024,768,P['paper'])+txt('Workshop',28,48,29,bold=True)+button(ct('CT.UI.GOAL'),754,14,97)+button(ct('CT.UI.MENU'),876,14,115)
    s+=group(room('WK'),'translate(12 164) scale(5.45)')+txt(ct('CT.UI.MOVE'),704,121,27,bold=True)
    s+=rows([ct('CT.WORLD.VENUE'),ct('CT.WORLD.GO',room='Stage'),ct('CT.WORLD.GO',room='Courtyard'),ct('CT.WORLD.GO',room='Media')],704,162,292,size=19)
    s+=block(ct('CT.NAV.MEDIA'),704,482,292,25,39)+buttons([ct('CT.UI.MAP'),ct('CT.UI.NOTES'),ct('CT.UI.HELP')],27,671,size=22)[0]
    save('V08-LAPTOP','1024 × 768: complete room overview and named navigation',s,1024,768,'P.WORLD','UI.WORLD.IDLE; UI.NAV.OBJECTS','SC.WK; ACC.OBJECTS; ACC.VENUE; NAV.MEDIA','No occupants named before entry.','V08-COMPACT-WORLD; V08-NAV',note='Compact layout at this reference size; no assertion of device compatibility.')

def board(id,title,panels,refs,state='UI.WORLD.OPERATING',note=''):
    s=rect(0,0,1440,1280,P['paper'])+txt(title,36,53,36,bold=True)+txt('STATIC STORYBOARD · panel headings are review notes; result captions are game content.',36,96,21,P['muted'])
    for i,(label,art,caption,action) in enumerate(panels):
        x=36+(i%3)*465;y=160+(i//3)*555
        s+=block(str(i+1)+'. '+label,x,y-37,437,20,24,bold=True)+rect(x,y,438,480,P['white'],18,'#B7C8C7',1.4)+group(art,f'translate({x+15} {y+16})')
        s+=block(caption,x+19,y+281,400,23,32)
        if action:s+=button(action,x+19,y+418,400,size=19)
    save(id,title,s,1440,1280,'P.MOTION',state,refs,'Review sequence panels are separate snapshots; no future caption exists in an earlier game view.','V08-COMPACT-WORLD; V08-COMPACT-WATCH',note=note+' Normal sequence and reduced-motion endpoints use the same pictures and exact captions; sequence is not timed gameplay.')
def rail_detail(order,selection=None):
    s=rect(8,20,394,167,'#D7E9DD',14,P['line'],1.5)+txt('Your arrangement',25,52,22,bold=True)
    for i,k in enumerate(order):
        xx=56+i*98;s+=tile(k,xx,106,58,k==selection)+txt({'F':'One Boat','B':'Joined Boats','P':'Hill','L':'Flower'}[k],xx,164,17,bold=True,anchor='middle')
    if selection and selection not in order:s+=tile(selection,210,223,54,True)
    return s
def toast_detail(st):
    s=table(49,107,304,113,'#87A8A0')+rect(71,27,261,128,'#DDA675',24,P['ink'],3)
    if st==0:s+=path('M91 128V86q106 -95 212 0v42Z','#F1CE9E',P['ink'],3)
    else:
        s+=path('M90 85L40 22M310 85l55 -63','none','#557B7B',9)
        if st>=2:s+=ellipse(200,132,106,20,'#D0E0D9')+rect(191,121,19,17,'#C98E4E',5,'#8A623F',2)
        if st>=3:s+=circle(252,64,41,'#E9F3E9','#355C66',6)+path('M284 95l35 32','none',P['ink'],10)+rect(243,55,19,17,'#C98E4E',5,'#8A623F',2)
    s+=rect(166,174,72,36,P['gold'],8,P['ink'],2)
    return s
def build_storyboards():
    panels=[]
    for label,pos,opened,caption,action in [('Select the tab',(35,58),None,ct('CT.WORLD.GOING',target='paper model'),ct('CT.WORLD.STOP')),('Reach the model',(20,48),None,ct('CT.GUIDE.TAB'),ct('CT.OBJ.MODEL')),('Pull / settle the result',(20,48),None,ct('CT.OBJ.MODEL_RESULT'),ct('CT.OBJ.BRIEF_OPEN')),('Choose Ari’s request',(36,55),None,ct('CT.WORLD.GOING',target='filming request'),ct('CT.WORLD.STOP')),('Unfold at the board',(50,45),'E4',ct('CT.OBJ.REQUEST_READ'),ct('CT.OBJ.REQUEST_READ')),('Read / return',None,None,ct('CT.SOURCE.DETAIL'),ct('CT.UI.ROOM'))]:
        art=group(room('ST',avatar=pos,opened=opened),'scale(3.3)')
        if label=='Pull / settle the result':art+=rect(67,121,17,18,P['coral'],3,P['ink'],1)+path('M75 130v8','none',P['paper'],2)
        if label=='Read / return':art=rect(0,0,408,228,P['paper'],12,P['line'],1)+block(ct('CT.SRC.E4'),19,31,369,20,29)
        panels.append((label,art,caption,action))
    board('V08-STORYBOARD-EXPLORE','Selecting an object leads to a physical action',panels,'ST.MODEL.TAB; ST.SOURCE.E1/E4; ACT.PLAYER; ACC.OBJECTS; UI.WORLD.*; UI.SOURCE.TEXT')
    panels=[('Only the curled word',group(sheet(0,0,22,25,True),'translate(128 10) scale(7)'),ct('CT.OBJ.NOTICE_PARTIAL'),ct('CT.OBJ.NOTICE_FLATTEN')),('Release, pull, re-clip',group(sheet(0,0,22,25,True),'translate(128 10) scale(7)')+person('player',96,221,158,'operate')+path('M283 109v63m-8 -8 8 8 8 -8','none',P['teal'],4),ct('CT.OBJ.NOTICE_PARTIAL'),ct('CT.UI.CANCEL')),('Commit the full notice',rect(3,0,400,230,P['paper'],12,'#BFAE91',2)+block(ct('CT.SRC.E3'),21,29,362,21,29),ct('CT.OBJ.NOTICE_DONE'),ct('CT.OBJ.NOTICE_READ')),('Photo remains partial',group(sheet(0,0,22,25,True),'translate(128 10) scale(7)'),ct('CT.SRC.E2.B'),ct('CT.CLIP.ENLARGE_PHOTO')),('Optional presentation',person('player',93,227,197,'present')+person('remy',297,227,197)+sheet(158,102,48,69),ct('CT.PRESENT.REVIEW',person='Remy'),ct('CT.PRESENT.SHOW',person='Remy')),('Remy acknowledges scope',person('remy',207,227,210),ct('CT.REMY.CORRECT'),ct('CT.UI.ROOM'))]
    board('V08-STORYBOARD-NOTICE','A physical fold changes what can be read',panels,'CY.SOURCE.E3; CY.ACCESS.E2; ACT.REMY; ACC.PRESENT; E2.b; E3.a/b','UI.WORLD.OPERATING; UI.SOURCE.PHOTO; UI.SOURCE.TEXT; UI.TALK.REPLY')
    panels=[('Standby / ready to use',loop(216,205,177),ct('CT.OBJ.WAKE'),ct('CT.OBJ.WAKE')),('Response committed',person('player',115,223,184,'wave')+loop(288,215,120,'following'),ct('CT.OBJ.WAKE_RESULT'),ct('CT.WORLD.GO',room='Workshop')),('Following the legal route',group(room('ST','both_carried',avatar=(65,58)),'scale(3.3)'),ct('CT.OBJ.FOLLOWING'),ct('CT.GOAL.DOCK')),('Approach dock at (86,48)',group(room('ST','both_carried',avatar=(86,48)),'scale(3.3)'),ct('CT.GOAL.DOCK'),ct('CT.GOAL.DOCK')),('Settle in the same dock',loop(210,210,177,'docked'),ct('CT.OBJ.DOCK_READY'),ct('CT.WORK.REHEARSE')),('Project / never repair',loop(118,204,136,'projecting')+story('initial',219,13,188,145),ct('CT.JO.DOCKED'),ct('CT.RAIL.ARRANGE'))]
    board('V08-STORYBOARD-RECOVERY','Loop wakes, follows and docks',panels,'ACT.LOOP; LOOP.FOLLOW.PAD; ST.DOCK; ST.DOCK.PAD; ACC.OBJECTS; ACT.JO')
    panels=[('Closed / whole-kit collection',caddy(29,35,350,False),ct('CT.KIT.OPEN'),ct('CT.KIT.COLLECT')),('Open / notes still unopened',caddy(29,6,350,True),ct('CT.KIT.CONTENTS'),ct('CT.KIT.COLLECT')),('Carried / both leaflets travel',person('player',111,235,219,'operate')+caddy(165,92,225,False),ct('CT.KIT.CARRIED'),ct('CT.KIT.NOTE_JO')),('Read a portable copy',rect(3,0,400,231,P['paper'],12)+block(ct('CT.SRC.E6'),20,29,368,21,30),ct('CT.TITLE.E6'),ct('CT.UI.CLOSE')),('Seated in the Stage bay',caddy(25,20,356)+rect(11,6,387,223,'none',16,P['teal'],3),ct('CT.KIT.SEATED'),ct('CT.RAIL.ARRANGE')),('Media copies remain',sheet(45,30,87,152)+sheet(156,30,87,152)+txt('Jo',59,69,25,bold=True)+txt('Remy',168,69,25,bold=True)+rect(268,88,120,94,'#527D82',9),ct('CT.KIT.VACANT'),ct('CT.OBJ.REMY_NOTE'))]
    board('V08-KIT-OWNERS','One caddy, two portable notes, persistent mounted copies',panels,'KIT.CADDY; KIT.NOTE.E6/E7; MD.SOURCE.E6/E7; MD.ACCESS.E8; ST.RACK.BAY; ACC.KIT','UI.KIT.CLOSED/OPEN/CARRIED/SEATED/VACANT; UI.SOURCE.TEXT')
    panels=[('Select rack tile / order FP',rail_detail('FP','B'),ct('CT.RAIL.CHOOSE',tile='Joined Boats'),ct('CT.RAIL.CANCEL')),('Insert B after F / becomes FBP',rail_detail('FBP','B'),ct('CT.RAIL.PLACED',tile='Joined Boats',position=2),ct('CT.RAIL.AFTER',neighbor='One Boat')),('From FP: replace F / becomes BP',rail_detail('BP','B'),ct('CT.RAIL.REPLACED',tile='Joined Boats',other='One Boat'),ct('CT.RAIL.REPLACE',other='One Boat')),('From BP: swap / becomes PB',rail_detail('PB','B'),ct('CT.RAIL.SWAPPED',tile='Joined Boats',position=2,other='Hill',otherPosition=1),ct('CT.RAIL.SWAP',other='Hill')),('From PB: move / becomes BP',rail_detail('BP','B'),ct('CT.RAIL.PLACED',tile='Joined Boats',position=1),ct('CT.RAIL.MOVE_START')),('From BP: return B / leaves P',rail_detail('P')+tile('B',220,227,47),ct('CT.RAIL.RETURNED',tile='Joined Boats'),ct('CT.RAIL.RETURN',tile='Joined Boats'))]
    board('V08-STORYBOARD-TILES','Insertion, replacement, swapping and return are distinct',panels,'ST.RAIL; TILE.*; ST.RACK.BAY; ACC.RAIL','UI.RAIL.SELECTED; UI.RAIL.DESTINATIONS; UI.WORK.READY',note='Panels 2–6 are labeled examples with explicit starting orders, not one continuous rail history. F/B/P/L are review-only abbreviations; child sees tile names.')
    panels=[]
    for label,st,msg,action in [('Initial setup','initial','CT.STORY.BANKS','CT.WORK.REHEARSE'),('One Boat / seed goes alone','seed','CT.CUE.FERRY','CT.RUN.STOP'),('Hill unmet / no penalty','unmet','CT.CUE.HILL_MISSING_PIP','CT.UI.HELP'),('Joined Boats / both arrive','crossed','CT.CUE.BRIDGE_REUNITE','CT.RUN.STOP'),('Hill / plant together','planted','CT.CUE.PLANTED','CT.RUN.STOP'),('Flower / both banks lit','success','CT.CUE.FLOWER','CT.WORK.LAUNCH')]:panels.append((label,story(st,3,0,402,231),ct(msg),ct(action)))
    board('V08-STORYBOARD-REHEARSAL','The rail changes the paper story',panels,'ST.PROJECTION; PUP.*; ST.CONTROL.REHEARSE/STOP/SHOW; ACC.STORY.STATE','UI.RUN.REHEARSAL; UI.RUN.UNMET; UI.WORK.CERTIFIED',note='Panels 1–3 represent the FP attempt. Panels 4–6 represent FBPL after an actual revision and fresh rehearsal, not a silent continue beyond an unmet cue.')
    panels=[('Stop an active seed cue',story('initial',3,0,402,231)+path('M126 177Q206 99 344 136','none',P['teal'],4),ct('CT.RUN.CURRENT',tile='One Boat'),ct('CT.RUN.STOP')),('Settle once / retain mode',story('seed',3,0,402,231),ct('CT.RUN.PAUSED',mode='Premiere')+' '+ct('CT.RUN.NEXT',nextTile='Joined Boats'),ct('CT.RUN.CONTINUE',modeLower='premiere')),('Read while premiere waits',rect(3,0,400,231,P['paper'],12)+block(ct('CT.SRC.E6'),20,29,368,21,30),ct('CT.RUN.PAUSED',mode='Premiere'),ct('CT.UI.ROOM')),('Continue the next cue',story('crossed',3,0,402,231),ct('CT.CUE.BRIDGE_REUNITE'),ct('CT.RUN.STOP')),('Actual edit resets puppets',story('initial',3,0,402,231),ct('CT.RAIL.CHANGED'),ct('CT.WORK.REHEARSE')),('Hard reload / honest uncertainty',story('initial',3,0,402,231),ct('CT.RECOVERY.UNCERTAIN_CUE'),ct('CT.RUN.CONTINUE',modeLower='rehearsal'))]
    board('V08-STORYBOARD-INTERRUPT','Pause, inspect and continue at the committed boundary',panels,'ST.CONTROL.STOP; ST.RAIL; ACC.SAVE; ACC.STORY.STATE; E6','UI.RUN.SHOW; UI.RUN.PAUSED; UI.SOURCE.TEXT; UI.RESUME.RUN',note='Panel 6 is a separate rehearsal reload fixture: last saved setup can coexist with possible prior exposure of the next outcome. Never label it unseen.')
    panels=[('Covered / 0 seconds',toast_detail(0),ct('CT.TOAST.COVERED'),ct('CT.TOAST.START')),('Arms and lid / 0–3 seconds',toast_detail(1),ct('CT.TOAST.ARMS'),ct('CT.TOAST.SKIP')),('Huge tray / 3–5 seconds',toast_detail(2),ct('CT.TOAST.TRAY'),ct('CT.TOAST.SKIP')),('Magnifier / 5–7 seconds',toast_detail(3),ct('CT.TOAST.PUNCHLINE'),ct('CT.TOAST.LOOK')),('Skip / same revealed endpoint',toast_detail(3),ct('CT.TOAST.MAGNIFIER'),ct('CT.TOAST.REPLAY')),('Leave / paths remain open',group(room('WK','revealed'),'scale(3.3)'),ct('CT.WORLD.GOING',target='Media'),ct('CT.WORLD.STOP'))]
    board('V08-STORYBOARD-TOAST','Maximum effort, optional detour',panels,'WK.TOAST; WK.TOAST.START/SKIP/MAGNIFIER; WK.EXIT.MD; ACC.OBJECTS','UI.TOAST.COVERED/REVEALING/REVEALED/MAGNIFIER/REPLAY',note='Timings inherited from 05; no measured performance. Reduced motion and Skip use panel 5 immediately. Leaving follows panel 6 without waiting for the gag.')
    panels=[('Whole launched order finishes',story('success',3,0,402,231),ct('CT.ENDING.LIGHT'),ct('CT.ENDING.SKIP')),('Jo / the shared backpack',person('jo',200,237,211,'wave')+backpack(341,172,1.1),ct('CT.JO.ENDING'),ct('CT.ENDING.CONTINUE')),('Remy / Courtyard reaction',group(room('CY','flat'),'scale(3.3)'),ct('CT.REMY.ENDING'),ct('CT.ENDING.SKIP_REACTIONS')),('Ari / Media reaction',group(room('MD','departed'),'scale(3.3)'),ct('CT.ARI.ENDING'),ct('CT.ENDING.NEXT')),('Factual recap',story('success',3,0,402,231),ct('CT.ENDING.FACT'),ct('CT.ENDING.RETURN')),('Replay / current order checked',rail_detail('FBPL'),ct('CT.WORK.CERTIFIED'),ct('CT.WORK.REPLAY'))]
    board('V08-STORYBOARD-PREMIERE','Your little backpack reaches the big stage',panels,'ST.CONTROL.SHOW; PUP.BACKPACK; MODEL.BACKPACK; ACT.JO/REMY/ARI; ACC.ENDING','UI.RUN.SHOW; UI.ENDING.CELEBRATION/AFTERMATH/RECAP',note='Aftermath uses each NPC’s own room; montage is not a remote conversation. Completion commits before decoration and all reactions are skippable.')
    s=rect(0,0,1440,1120,P['paper'])+txt('Five arrangements. The same premiere.',40,57,38,bold=True)+txt('REVIEW EXAMPLES · no shortest-plan badge, extra-tile penalty, or prefilled rail.',40,102,23,P['muted'])
    for i,order in enumerate(['BPL','FBPL','BFPL','BPFL','BPLF']):
        yy=160+i*175;s+=rect(35,yy,1370,153,P['white'],16,'#B6CCC7',1)
        for j,k in enumerate(order):s+=tile(k,102+j*163,yy+55,55)+txt({'F':'One Boat','B':'Joined Boats','P':'Hill','L':'Flower'}[k],102+j*163,yy+113,22,bold=True,anchor='middle')
        s+=story('success',780,yy+16,248,121)+block(ct('CT.WORK.CERTIFIED'),1055,yy+50,309,25,38)
    save('V08-VALID-PLANS','All five valid arrangements receive equal treatment',s,1440,1120,'P.WORK','UI.WORK.CERTIFIED','ST.RAIL; TILE.*; PUP.*','Examples are review-only. Player starts with zero rail tiles.','V08-WORK-SUCCESS',note='Trailing One Boat must finish before certification; its harmless empty trip never receives error styling.')
    # Readiness makes independent resource recovery visible.
    panels=[('Kit first / empty Loop dock',group(room('ST','kit_only',avatar=(55,58)),'scale(3.3)'),ct('CT.WORK.MISSING_LOOP'),ct('CT.RAIL.ARRANGE')),('Loop first / empty rack bay',group(room('ST','loop_only',avatar=(86,48)),'scale(3.3)'),ct('CT.WORK.MISSING_KIT'),ct('CT.WORLD.GO',room='Media')),('Both here / empty rail',group(room('ST','ready',avatar=(78,58)),'scale(3.3)'),ct('CT.WORK.EMPTY'),ct('CT.RAIL.ARRANGE'))]
    board('V08-RESOURCES','One resource can arrive before the other',panels,'ST.DOCK; ST.RACK.BAY; ST.RAIL; ACT.LOOP; ACC.KIT','UI.WORK.NEEDS_LOOP; UI.WORK.NEEDS_KIT; UI.WORK.EMPTY')

def build_small_variants():
    b=tile('F',401,412,168)+txt('One Boat',579,367,34,bold=True)+block(ct('CT.SRC.E8.FERRY'),579,428,546,30,48)+button(ct('CT.UI.BACK'),268,645,133)
    save('V08-TILE-INSPECT','Inspecting a tile shows its local cue description',surface('One Boat',b,state='ready'),pattern='P.READER',state='UI.SOURCE.TILE',refs='TILE.FERRY; KIT.CADDY; ACC.EVIDENCE.E8',concealed='No passenger limit or solved crossing is demonstrated by inspection.',companion='V08-KIT')
    b=button(ct('CT.WORK.RESET'),435,327,550)+txt(ct('CT.WORK.RESET_DESCRIPTION'),435,424,25)+button(ct('CT.WORK.CLEAR'),435,471,550)+txt(ct('CT.WORK.CLEAR_DESCRIPTION'),435,568,25)+button(ct('CT.UI.CANCEL'),435,638,167,focus=True)
    save('V08-WORK-MORE','Rehearsal reset and clearing the rail have distinct scopes',surface(ct('CT.WORK.MORE'),b,x=395,y=177,w=650,h=591,footer=False,state='ready'),pattern='P.DECISION',state='UI.WORK.MORE',refs='ST.CONTROL.RESET; ST.CONTROL.CLEAR; ST.RAIL',concealed='New game is only in Menu; opening this view alone preserves certification.',companion='V08-RECOVERY-NEW-GAME')
    b=txt(ct('CT.HELP.PREPARED'),267,249,28,bold=True)+block(ct('CT.HINT.STORY_ATTENTION'),267,334,860,31,49)+buttons([ct('CT.HELP.AGAIN'),ct('CT.HELP.DIRECT'),ct('CT.UI.KEEP')],267,614)[0]
    save('V08-HELP-PREPARED','Accepted local fallback has a truthful label',surface(ct('CT.HELP.TITLE'),b,state='unmet'),pattern='P.COACH',state='UI.COACH.RESPONSE',refs='ACC.COACH; PUP.*',concealed='Uses observed story only. No claimed text diagnosis; late pending response has no display opportunity.',companion='V08-HELP-FALLBACK; V08-HELP-STALE')
    b=block(ct('CT.SOURCE.CHOOSE'),265,249,875,26,40)+rows([ct('CT.TITLE.E4'),ct('CT.TITLE.E2'),ct('CT.TITLE.E3')],265,314,381,size=23)+txt(ct('CT.SOURCE.NONE'),695,350,25)+button(ct('CT.SOURCE.USE'),695,409,241,'disabled')+button(ct('CT.UI.CANCEL'),695,493,162)
    save('V08-PICK','Choosing a source detail without a default answer',surface(ct('CT.SOURCE.DETAIL'),b),pattern='P.READER',state='UI.SOURCE.PICK',refs='ACC.COMPARE; ACC.EVIDENCE.E4/E2/E3',concealed='Only acquired titles; no passage selected on entry.',companion='V08-COMPARE')
    b=txt(ct('CT.LEAD.CHOOSE'),267,249,29,bold=True)+rows([ct('CT.LEAD.CANCELED'),ct('CT.LEAD.MOVED'),ct('CT.LEAD.WHERE')],267,315,866,size=25)+txt(ct('CT.LEAD.DESTINATION'),267,562,25)+buttons(['Stage','Courtyard','Workshop','Media'],267,590)[0]+button(ct('CT.LEAD.FOLLOW'),267,668,259,'disabled')
    save('V08-LEAD','An optional question and public destination',surface(ct('CT.NOTES.IDEAS'),b),pattern='P.PLAN',state='UI.LEAD',refs='ACC.PLAN.SEARCH; ACC.THEORY; NAV.*',concealed='Questions are not beliefs assigned to the player; choosing a lead does not move the avatar.',companion='V08-COMPACT-PLAN')
    b=block(ct('CT.RECOVERY.READ'),433,319,575,31,47)+block(ct('CT.RECOVERY.SESSION_DETAIL'),433,400,575,26,41)+button(ct('CT.RECOVERY.RETRY'),433,545,551)+button(ct('CT.RECOVERY.SESSION'),433,613,551)+button(ct('CT.UI.BACK'),433,681,154)
    save('V08-RECOVERY-READ','An unreadable save is not treated as an empty save',surface(ct('CT.START.CONTINUE'),b,x=395,y=168,w=650,h=613,footer=False,home=True),pattern='P.DECISION',state='UI.RECOVERY.READ; UI.RECOVERY.REPLACE',refs='UI.HOME.CHECKING; T.RECOVERY.RETRY',concealed='Play without saving preserves the unknown old record; no automatic overwrite or playable world behind failed startup.',companion='V08-RECOVERY-INCOMPATIBLE')

def normalize_register():
    replaces={'ACC.RAIL':'ST.RAIL','ACC.PLAN.RECORD':'ACC.PLAN.STORY','ACC.IDEA':'ACC.THEORY','ACC.SAVE':'UI.SAVE.SESSION','ACC.PAUSE':'UI.PAUSE','ACC.SETTINGS':'UI.SETTINGS','ACC.HOME':'UI.HOME.EMPTY','ACC.WORKSTATION':'ST.CONSOLE','ACC.ENDING':'UI.ENDING.RECAP','UI.COACH.UNAVAILABLE':'UI.COACH.FALLBACK_OFFER'}
    for r in REG:
        for key in ['refs','state']:
            for bad,good in replaces.items():r[key]=r[key].replace(bad,good)
        if r['id']=='V08-COMPACT-HELP':r['state']='UI.COACH.FALLBACK_OFFER'
        if r['id']=='V08-COMPACT-HELP-FULL':r['state']='UI.COACH.FALLBACK_OFFER'

def build_recovery_ending():
    b=txt(ct('CT.RUN.PAUSED',mode='Premiere'),265,244,27,bold=True)+rows([ct('CT.UI.FESTIVAL'),ct('CT.UI.SETTINGS'),ct('CT.PAUSE.HOME'),ct('CT.RECOVERY.NEW')],265,293,380)+block(ct('CT.SAVE.FAILED'),699,320,452,26,39)+block(ct('CT.SAVE.DETAIL'),699,414,452,25,40)+button(ct('CT.SAVE.RETRY'),699,639,257)
    save('V08-PAUSE-SAVE','Paused premiere with a genuine saving limitation',surface(ct('CT.PAUSE.TITLE'),b,state='seed'),pattern='P.SHEET',state='UI.PAUSE; UI.SAVE.SESSION',refs='ACC.PAUSE; ACC.SAVE; ST.CONTROL.STOP',concealed='No promise of final browser-close write or auto-resume.',companion='V08-COMPACT-RECOVERY')
    b=''
    for i,(k,opts) in enumerate([('TEXT',['Regular','Larger','Largest']),('SPACING',['Standard','Roomier']),('MOTION',['Standard','Reduced']),('SOUND',['On','Off'])]):
        yy=241+i*116;b+=txt(ct('CT.SETTINGS.'+k),264,yy,26,bold=True)+buttons([(o,'selected' if o==opts[-1] else 'secondary') for o in opts],264,yy+22)[0]
    b+=button(ct('CT.SETTINGS.CONTROLS'),264,717,168)
    save('V08-SETTINGS','Readable settings with Largest, Roomier and Reduced selected',surface(ct('CT.UI.SETTINGS'),b),pattern='P.SHEET',state='UI.SETTINGS',refs='ACC.SETTINGS; CT.SETTINGS.*',concealed='These design controls select access preferences; no help level or puzzle rules change.',companion='V08-COMPACT-SOURCE-TOP')
    for id,k,acts in [('NEW-GAME','CT.RESET.SCOPE',['CT.RESET.KEEP_PLAYING','CT.RESET.ACCEPT']),('INCOMPATIBLE','CT.RECOVERY.VERSION',['CT.UI.BACK','CT.RECOVERY.NEW']),('DAMAGED','CT.RECOVERY.DAMAGED',['CT.RECOVERY.RETRY','CT.RECOVERY.NEW']),('RESUME','CT.RECOVERY.UNCERTAIN_CUE',['CT.RUN.OPEN','CT.UI.KEEP'])]:
        title=ct('CT.RESET.QUESTION') if id=='NEW-GAME' else ct('CT.START.CONTINUE') if id in ('INCOMPATIBLE','DAMAGED') else ct('CT.PAUSE.TITLE')
        b=block(ct(k),432,336,574,29,46)+button(ct(acts[0]),433,577,284,focus=True)+button(ct(acts[1]),433,647,284)
        if id=='DAMAGED':b+=button(ct('CT.UI.BACK'),433,719,154)
        save('V08-RECOVERY-'+id,id.lower()+' recovery choice',surface(title,b,x=395,y=192,w=650,h=625,footer=False,home=id in ('INCOMPATIBLE','DAMAGED')),pattern='P.DECISION',state={'NEW-GAME':'UI.RESET.CASE','INCOMPATIBLE':'UI.RECOVERY.VERSION','DAMAGED':'UI.RECOVERY.DAMAGED','RESUME':'UI.RESUME.RUN; UI.RECOVERY.RUN'}[id],refs='UI.HOME.CHECKING' if id in ('INCOMPATIBLE','DAMAGED') else 'ACC.PAUSE; ACC.SAVE; ACC.WORKSTATION',concealed='Safe first focus; acceptance distinct from opening confirmation. Startup failures remain at Home; no recovered world is fabricated. Interrupted outcome exposure remains uncertain.',companion='V08-COMPACT-RECOVERY')
    for st in ['EMPTY','SAVED']:
        s=rect(0,0,1440,960,P['paper'])+group(room('ST'),'translate(890 80) scale(4)')+txt(ct('CT.START.TITLE'),130,217,62,bold=True)+block(ct('CT.START.CASE'),133,279,820,33,48)+person('player',325,784,320)+loop(548,794,155)
        s+=button(ct('CT.START.START' if st=='EMPTY' else 'CT.START.CONTINUE'),690,404,333,'primary',size=27,h=66)
        if st=='SAVED':s+=txt(ct('CT.START.LOCATION',room='Stage'),690,370,26)+button(ct('CT.START.OVER'),690,492,333)
        s+=button(ct('CT.UI.SETTINGS'),690,581,333)
        save('V08-HOME-'+st,'Start view: '+st.lower(),s,pattern='P.HOME',state='UI.HOME.'+st+'; UI.HOME.CHECKING',refs='ACC.HOME; CT.START.*',concealed='Start image is generic opening Stage, never a saved unseen-room screenshot.',companion='V08-COMPACT-RECOVERY')
    s=rect(0,0,1440,960,P['paper'])+txt(ct('CT.ENDING.TITLE'),40,56,38,bold=True)+story('success',50,88,1340,412)
    s+=block(ct('CT.ENDING.LIGHT'),60,550,1310,28,42)+person('jo',145,822,180,'wave')+txt('Jo',270,662,29,bold=True)+block(ct('CT.JO.ENDING'),270,706,1060,31,48)
    s+=buttons([ct('CT.ENDING.SKIP'),ct('CT.ENDING.CONTINUE')],270,831)[0]
    save('V08-PREMIERE','The premiere pays off the backpack and shared paper story',s,pattern='P.ENDING',state='UI.ENDING.CELEBRATION',refs='ST.PROJECTION; ST.CONTROL.SHOW; MODEL.BACKPACK; PUP.BACKPACK; ACT.JO',concealed='Only after full launched arrangement completes; not rehearsal or paused terminal cue.',companion='V08-STORYBOARD-PREMIERE')
    b=block(ct('CT.ENDING.FACT'),265,259,885,31,48)+story('success',267,336,900,270)+buttons([ct('CT.ENDING.RETURN'),ct('CT.WORK.REPLAY'),ct('CT.ENDING.REACTIONS')],265,660,maxw=920)[0]
    save('V08-RECAP','Factual recap without recorded reasoning',surface(ct('CT.ENDING.RECAP'),b,state='success',order='FBPL',goal=ct('CT.GOAL.AFTER'),footer=False),pattern='P.ENDING',state='UI.ENDING.RECAP',refs='ACC.ENDING; ST.CONTROL.SHOW',concealed='No learning claim, empty reasoning fields, inferred correction or comprehension score.',companion='V08-RECAP-REVISION')
    b=txt(ct('CT.ENDING.FACT'),264,240,26)+txt(ct('CT.RECAP.CHANGED'),264,306,28,bold=True)+block(ct('CT.RECAP.BEFORE',earlierText='The whole premiere is canceled.'),264,367,865,28,42)+block(ct('CT.RECAP.AFTER',laterText='The notice says the outdoor rehearsal is canceled. The premiere is still planned.'),264,463,865,28,42)+buttons([ct('CT.ENDING.RETURN'),ct('CT.WORK.REPLAY')],264,652)[0]
    save('V08-RECAP-REVISION','Recap with two actually recorded versions',surface(ct('CT.ENDING.RECAP'),b,state='success',order='FBPL',goal=ct('CT.GOAL.AFTER'),footer=False),pattern='P.ENDING',state='UI.ENDING.RECAP',refs='ACC.ENDING; ACC.IDEA; E3.a/b',concealed='Text is an explicit fixture of two actual records; never inferred from reading the notice.',companion='V08-RECAP',note='Review fixture earlier/later sentences; no default input or automatic learner diagnosis.')

if __name__=='__main__':
    build_rooms_and_cast()
    build_interfaces()
    build_work_and_help()
    build_recovery_ending()
    build_compact()
    build_storyboards()
    build_small_variants()
    normalize_register()
    (OUT/'artifact-register.json').write_text(json.dumps(REG,ensure_ascii=False,indent=2),encoding='utf-8')


