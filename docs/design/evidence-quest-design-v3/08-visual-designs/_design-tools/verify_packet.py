"""Read-only design-document checks; no game or browser tests."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote
import hashlib,json,re,xml.etree.ElementTree as ET
from PIL import Image

out=Path(__file__).resolve().parents[1]
root=out.parent
reg=json.loads((out/'artifact-register.json').read_text(encoding='utf-8'))
issues=[]

class Links(HTMLParser):
    def __init__(self):super().__init__();self.links=[];self.ids=[];self.scripts=0;self.refs=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='script':self.scripts+=1
        if 'id' in a:self.ids.append(a['id'])
        if 'data-reference' in a:self.refs.append(a['data-reference'])
        for k in ('href','src'):
            if k in a:self.links.append(a[k])

def checklink(s,base):
    if s.startswith(('https:','http:','data:','#','mailto:')):return
    p=unquote(s.split('#')[0])
    if not (base/Path(p)).resolve().exists():issues.append('Missing link: '+str(base)+' / '+p)

hp=Links();hp.feed((out/'index.html').read_text(encoding='utf-8'))
for href in hp.links:checklink(href,out)
if hp.scripts:issues.append('Gallery contains script')
if len(hp.ids)!=len(set(hp.ids)):issues.append('Duplicate gallery DOM IDs')
for p in [root/'08-VISUAL-DIRECTION-AND-READABLE-DESIGNS.md',root/'EVIDENCE-QUEST-MASTER-CHECKLIST.md',out/'ARTIFACT-REGISTER.md',out/'STATE-CROSSWALK.md',out/'TRANSITION-CROSSWALK.md',out/'PROVENANCE.md']:
    for href in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf-8-sig')):checklink(href,p.parent)

idset={r['id'] for r in reg}
if len(idset)!=len(reg):issues.append('Duplicate artifact IDs')
if idset!=set(hp.refs):issues.append('Gallery/register coverage differs')
for r in reg:
    p=out/(r['id']+'.png')
    with Image.open(p) as im:
        if im.size!=(r['width'],r['height']):issues.append('Dimensions differ: '+r['id'])
    sp=out/(r['id']+'.svg')
    if sp.exists():ET.fromstring(sp.read_text(encoding='utf-8'))
    for companion in re.findall(r'V08-[A-Z0-9-]+',r['companion']):
        if companion not in idset:issues.append('Unknown companion: '+r['id']+' / '+companion)

six=(root/'06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md').read_text(encoding='utf-8-sig')
declared=set(re.findall(r'^\| `(UI\.[A-Z0-9_.]+)` \|',six,re.M))
mapped=set(re.findall(r'^\| `(UI\.[A-Z0-9_.]+)` \|',(out/'STATE-CROSSWALK.md').read_text(encoding='utf-8'),re.M))
if declared!=mapped:issues.append('State crosswalk mismatch')
tids=set(t for t in re.findall(r'(?<![A-Z0-9_.])(T\.[A-Z0-9_.]+)(?![A-Z0-9_.])',six) if not t.endswith('.'))
tmapped=set(re.findall(r'^\| `(T\.[A-Z0-9_.]+)` \|',(out/'TRANSITION-CROSSWALK.md').read_text(encoding='utf-8'),re.M))
if tids!=tmapped:issues.append('Transition crosswalk mismatch')

expected={
 'Evidence-Quest-Complete-Game-Specification-v3.md':'6CFB0958C7D6DEEC52B485058197B93EF4297E3F8E087A7874A9AAE3FA70AB16',
 '05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md':'3FDB67267E23A12573547B3031C2678EAB774EA7B91E6A8FB07048001B5D0A61',
 '06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md':'04BA8831C38FD3B7FB3E74A3BA68A5DEE20AB0340AEB7B0064D79180B4AF10D8',
 '07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md':'8485C42AADF34A8226A1157CA37FC54A5EFF865247C578850408BF9DDDE1BEBE'
}
foundation_ok=all(hashlib.sha256((root/p).read_bytes()).hexdigest().upper()==h for p,h in expected.items())
if not foundation_ok:issues.append('Foundation file changed')
checklist=(root/'EVIDENCE-QUEST-MASTER-CHECKLIST.md').read_text(encoding='utf-8-sig')
section=checklist.split('### 08 —',1)[1].split('### 09 —',1)[0]
if section.count('- [x]')!=6 or '- [ ]' in section:issues.append('Item 08 completion count differs')
checks=json.loads((out/'design-checks.json').read_text(encoding='utf-8'))
if not all(r['pass'] for r in checks['source_checks']):issues.append('Frozen source check failed')
if checks['button_fit_failures']:issues.append('Control fit failed')
result={'kind':'Static design-document verification only','registered_artifacts':len(reg),'declared_states':len(declared),'named_transitions':len(tids),'gallery_resource_links_checked':len(hp.links),'gallery_script_count':hp.scripts,'foundation_files_unchanged':foundation_ok,'item08_checked_subitems':section.count('- [x]'),'issues':issues}
(out/'packet-verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))
raise SystemExit(bool(issues))
