"""Package the static design references and audit their document links."""
from pathlib import Path
from PIL import Image
import json,re,html,hashlib,base64,math
import xml.etree.ElementTree as ET
import compose as c
OUT=c.OUT;ROOT=c.ROOT
reg=[r for r in json.loads((OUT/'artifact-register.json').read_text(encoding='utf-8')) if (OUT/(r['id']+'.svg')).exists()]
for r in reg:r['role']='Functional layout/state reference; not final art quality'
illustrated=[
 ('V08-CAST-ILLUSTRATED','The crew — revised illustrated cast','Character appearance reference','ACT.PLAYER; ACT.LOOP; ACT.JO; ACT.REMY; ACT.ARI; PUP.PIP; PUP.GRANDMA; MODEL.BACKPACK','V08-CAST','No source contents or game UI.','Jo is a white girl with fair peach skin and dark-brown hair in two buns; her clothing, pose and role remain consistent. This illustrated finish governs all final game art.'),
 ('V08-STAGE-ILLUSTRATED','Stage — illustrated quality target','Stage after both resources recovered; empty rail; initial paper story','SC.ST; ACT.JO; ACT.PLAYER; ACT.LOOP; ST.MODEL; ST.BOARD; ST.CONSOLE; ST.RAIL; ST.PROJECTION','V08-ROOM-ST-READY; V08-ROOM-ST-READY-A','No readable E4/E2 or E6/E7 bodies. Unread leaflets are visible in the single seated caddy.','Both the miniature and projection use paper Pip, distinct from the yellow-clothed player. Seed and Pip start left, Grandma right, with no planted flower. Painted positions are approximate; Item 05 and the functional companions govern exact bounds.'),
 ('V08-COURTYARD-ILLUSTRATED','Courtyard — illustrated quality target','Initial room with curled notice','SC.CY; ACT.PLAYER; ACT.REMY; CY.SOURCE.E3; CY.ACCESS.E2; CY.EXIT.ST; CY.EXIT.WK','V08-ROOM-CY-INITIAL; V08-ROOM-CY-INITIAL-A','Only CANCELED is visible on the curled notice. No full notice, tablet contents or clue body.','Rich outdoor materials and warm light. Background foliage and hanging paper are decorative; they create no controls or obstacles. Item 05 governs exact anchors and clear paths.'),
 ('V08-WORKSHOP-ILLUSTRATED','Workshop — illustrated quality target','Initial room; optional Maximum Toast covered','SC.WK; ACT.PLAYER; WK.ACCESS.NAV; WK.TOAST; WK.EXIT.ST; WK.EXIT.CY; WK.EXIT.MD','V08-ROOM-WK-INITIAL; V08-ROOM-WK-INITIAL-A','Toast, tray and magnifier outcome remain concealed. No new source body.','Rich maker-room materials. Added background shelves, tools and plants are decoration only, with no new interaction or collision region. Preserve the exact Item 05 three exits, Toast bay and through-route when producing layered assets.'),
 ('V08-MEDIA-ILLUSTRATED','Media — illustrated quality target','Initial entered room; Loop standby; caddy closed','SC.MD; ACT.PLAYER; ACT.ARI; ACT.LOOP; MD.PLAIN.WALL; MD.RECORDING.TABLE; MD.SOURCE.E5; MD.SOURCE.E6; MD.SOURCE.E7; MD.ACCESS.E8; MD.EXIT.WK','V08-ROOM-MD-INITIAL; V08-ROOM-MD-INITIAL-A','E5 slate body and mounted E6/E7 remain unread. Closed caddy does not expose tile or portable-note contents.','Ari and one Loop occupy the existing Media setup. Three filming petals, two mounted notes and one closed caddy remain distinct. Plain filming wall remains plain; exact geometry comes from Item 05.')
]
painted=[]
for id,title,state,refs,companion,concealed,note in illustrated:
    with Image.open(OUT/(id+'.png')) as im:w,h=im.size
    painted.append(dict(id=id,title=title,width=w,height=h,pattern='P.ILLUSTRATED',role='Illustrated appearance and quality reference',state=state,refs=refs,ct=[],controls=[],concealed=concealed,companion=companion,note=note))
reg=painted+reg
# Reused scroll bodies contain their own labels even when they were drawn before
# the most recent save. Extract design metadata from the actual composition.
for r in reg:
    if r['pattern']=='P.ILLUSTRATED':continue
    tree=ET.fromstring((OUT/(r['id']+'.svg')).read_text(encoding='utf-8'))
    r['controls']=[json.loads(el.attrib['data-design-control']) for el in tree.iter() if 'data-design-control' in el.attrib]
    body=' '.join(' '.join(' '.join(el.itertext()).split()) for el in tree.iter() if el.tag.endswith('}text'))
    matched=[key for key,value in c.CT.items() if '{' not in value and len(value)>5 and ' '.join(value.split()) in body]
    r['ct']=sorted(set(r['ct']+matched))
    if r['pattern']=='P.ART' and not r['concealed']:r['concealed']='Review-only cast/material demonstration; no source content, assistance or playable controls.'

def scale_note(r):
    id=r['id']
    if r['pattern']=='P.ILLUSTRATED':return 'Rich illustrated appearance reference; approximate composition only. Do not derive collision bounds, text, hit areas or physical coordinates from this raster. Item 05 and the functional diagrams retain those decisions.'
    if id.startswith('V08-ROOM'):return 'Full 120 × 80 room at '+('10 px/unit; separate review legend.' if id.endswith('-A') else '12 px/unit.')
    if id=='V08-LAPTOP':return 'Full room 654 × 436 at 5.45 px/unit, with named actions alongside.'
    if id=='V08-COMPACT-WORLD':return 'Full room 390 × 260 at 3.25 px/unit; named actions below.'
    if id.startswith('V08-COMPACT-WATCH'):return 'Whole paper story 350 × 231; exact state description and named controls below. Largest/Roomier.'
    if id.startswith('V08-COMPACT'):return '390 px wide layout; Largest/Roomier. FULL is the complete vertical scroll extent; the 844 px companions are actual review viewports.'
    if id.startswith('V08-WORK-') and id!='V08-WORK-MORE':return 'Full room 930 × 620 at 7.75 px/unit; work band below, without projection overlap.'
    if r['pattern']=='P.MOTION':return 'Static panel composition; each art region fits within about 402 × 231. Review headings and sequence notes are outside the game panel. Not a runtime camera crop.'
    if r['pattern']=='P.ART':return 'Cast/material comparison plate; individual figures are enlarged for recognition. The room references govern their in-world scale.'
    if id in ('V08-RECOVERY-READ','V08-RECOVERY-INCOMPATIBLE','V08-RECOVERY-DAMAGED'):return 'Startup recovery over the Home title/cast backdrop, without an initialized world; 650 px wide decision surface.'
    if id=='V08-PREMIERE':return 'Whole paper story enlarged to 1340 × 412, with separate crew/caption region; no riverbank cropped.'
    if id=='V08-VALID-PLANS':return 'Review-only equal-size plan rows and final-story thumbnails; no runtime default order.'
    if id.startswith('V08-HOME'):return 'Title/character composition and generic opening-room thumbnail at 4 px/unit; not a saved-room disclosure.'
    return 'Desktop world behind the task: 1140 × 760 at 9.5 px/unit. Foreground source/control text is typeset at its declared size.'
byid={r['id']:r for r in reg}
def link(id,label=None):return f'[{label or id}]({id}.png)'
def image_data(id):return 'data:image/png;base64,'+base64.b64encode((OUT/(id+'.png')).read_bytes()).decode()
def contact(ids,id,title,cols=3):
    cw=456;ch=382;rows=math.ceil(len(ids)/cols);w=1440;h=112+rows*ch
    s=c.rect(0,0,w,h,c.P['paper'])+c.txt(title,38,54,36,bold=True)+c.txt('Review overview. Open individual references for source text and control-size inspection.',38,90,21,c.P['muted'])
    for i,k in enumerate(ids):
        x=28+(i%cols)*472;y=114+(i//cols)*ch
        s+=c.rect(x,y,454,335,c.P['white'],12,'#B5CACA',1)+f'<image x="{x+8}" y="{y+8}" width="438" height="319" href="{image_data(k)}" preserveAspectRatio="xMidYMid meet"/>'+c.txt(k,x,y+364,18,bold=True)
    (OUT/(id+'.svg')).write_text(c.svg(w,h,s,title),encoding='utf-8')
contact([r['id'] for r in painted],'V08-OVERVIEW','Evidence Quest / illustrated game-art quality target')
for n in range(0,len(reg),15):
    contact([r['id'] for r in reg[n:n+15]],f'REVIEW-CONTACT-{n//15+1:02}','Item 08 / reference inspection '+str(n//15+1))

# Every declared state is mapped, without inventing a new state ID.
content=(ROOT/'07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md').read_text(encoding='utf-8-sig')
state_section=content.split('## 11. Complete interface-state content crosswalk',1)[1].split('## 12.',1)[0]
states=[]
for line in state_section.splitlines():
    cells=[a.strip() for a in line.split('|')]
    if len(cells)>3 and re.fullmatch(r'`UI\.[A-Z0-9_.]+`',cells[1]):states.append((cells[1].strip('`'),cells[2],cells[3]))
def pattern(st):
    if st.startswith('UI.HOME.'):return 'P.HOME','V08-HOME-'+('SAVED' if st.endswith('SAVED') else 'EMPTY')
    if st=='UI.WORLD.CHOOSER':return 'P.SHEET','V08-CHOOSER'
    if st.startswith(('UI.WORLD.','UI.GUIDE.')):return 'P.WORLD','V08-OPENING'
    if st in ('UI.GOAL','UI.NAV.MAP'):return 'P.SHEET','V08-NAV' if st.endswith('MAP') else 'V08-OPENING'
    if st=='UI.NAV.OBJECTS':return 'P.SHEET','V08-COMPACT-NAV'
    if st.startswith('UI.NOTES.'):return 'P.READER','V08-NOTES-EMPTY' if st.endswith('EMPTY') else 'V08-NOTES'
    if st.startswith('UI.SOURCE.'):
        return 'P.READER',{'POST':'V08-E2-FIRST','CLIP':'V08-E2-END','PHOTO':'V08-E2-PHOTO','TEXT':'V08-READ-E7','ZOOM':'V08-COMPACT-SOURCE-FULL','WORD':'V08-WORD','PICK':'V08-PICK','TILE':'V08-TILE-INSPECT'}[st.rsplit('.',1)[1]]
    if st.startswith('UI.COMPARE.'):return 'P.COMPARE','V08-COMPARE'
    if st.startswith('UI.TIMELINE.'):return 'P.SHEET','V08-TIMELINE'
    if st.startswith('UI.IDEA.'):return 'P.PLAN','V08-PLAN-PRIVATE' if st.endswith('DRAFT') else 'V08-PLAN-RECORDED'
    if st=='UI.LEAD':return 'P.PLAN','V08-LEAD'
    if st.startswith('UI.TALK.'):return 'P.TALK','V08-TALK'
    if st.startswith('UI.PRESENT.'):return 'P.PLAN','V08-PRESENT'
    if st.startswith('UI.PLAN.'):return 'P.PLAN','V08-PLAN-'+('DELIVERED' if st.endswith('ADDRESSED') else st.rsplit('.',1)[1])
    if st.startswith('UI.KIT.'):return 'P.KIT','V08-KIT' if st.endswith(('OPEN','CARRIED')) else 'V08-KIT-OWNERS'
    if st.startswith('UI.WORK.'):
        return 'P.WORK',{'NEEDS_KIT':'V08-RESOURCES','NEEDS_LOOP':'V08-RESOURCES','EMPTY':'V08-WORK-EMPTY','READY':'V08-WORK-CHANGED','CERTIFIED':'V08-WORK-SUCCESS','SHOW_CHECK':'V08-WORK-HISTORY','MORE':'V08-WORK-MORE'}[st.rsplit('.',1)[1]]
    if st.startswith('UI.RAIL.'):return 'P.WORK','V08-RAIL-ACTIONS'
    if st.startswith('UI.RUN.'):
        return 'P.WORK',{'STARTING':'V08-WORK-EMPTY','REHEARSAL':'V08-WORK-SEED','SHOW':'V08-STORYBOARD-PREMIERE','UNMET':'V08-WORK-UNMET','PAUSED':'V08-WORK-PAUSED','TERMINAL':'V08-WORK-PAUSED','FAILED':'V08-WORK-UNMET'}[st.rsplit('.',1)[1]]
    if st=='UI.STORY.DESCRIBE':return 'P.READER','V08-COMPACT-WATCH'
    if st.startswith('UI.COACH.'):
        return 'P.COACH',{'ENTRY':'V08-HELP-ENTRY','TOPIC':'V08-HELP-CLARIFY','PENDING':'V08-HELP-WAITING','WAITING':'V08-HELP-WAITING','FALLBACK_OFFER':'V08-HELP-FALLBACK','READY_CLOSED':'V08-HELP-WORLD','RESPONSE':'V08-HELP-PREPARED','CLARIFY':'V08-HELP-CLARIFY','DIRECT':'V08-HELP-DIRECT','STALE':'V08-HELP-STALE','CANCELED':'V08-HELP-ENTRY'}[st.rsplit('.',1)[1]]
    if st=='UI.PAUSE':return 'P.SHEET','V08-PAUSE-SAVE'
    if st=='UI.SETTINGS':return 'P.SHEET','V08-SETTINGS'
    if st.startswith('UI.SAVE.'):return 'P.SHEET','V08-PAUSE-SAVE'
    if st.startswith('UI.RECOVERY.'):
        return 'P.DECISION','V08-RECOVERY-'+{'READ':'READ','VERSION':'INCOMPATIBLE','DAMAGED':'DAMAGED','REPLACE':'READ','RUN':'RESUME'}[st.rsplit('.',1)[1]]
    if st in ('UI.RESUME.RUN','UI.RETURN.FOREGROUND'):return 'P.DECISION','V08-RECOVERY-RESUME'
    if st=='UI.RESET.CASE':return 'P.DECISION','V08-RECOVERY-NEW-GAME'
    if st.startswith('UI.TOAST.'):return 'P.WORLD','V08-STORYBOARD-TOAST'
    if st.startswith('UI.ENDING.'):return 'P.ENDING','V08-PREMIERE' if st.endswith('CELEBRATION') else 'V08-STORYBOARD-PREMIERE' if st.endswith('AFTERMATH') else 'V08-RECAP'
    raise ValueError(st)
exceptions={
'UI.HOME.CHECKING':'Remove Start/Continue and saved room. Put Checking saved progress… in their position; retain Settings. No animated indefinite spinner.',
'UI.WORLD.MOVING':'Solid destination bracket stays at chosen object, dotted route lies on legal floor, walking avatar and Stop walking replace idle caption. New target moves the bracket.',
'UI.WORLD.BLOCKED':'Use ink text on the cream caption strip with a small outlined stop symbol; retain selected position and all exits. No red screen shake.',
'UI.GOAL':'Use the P.SHEET surface over the current stopped room: original assignment first, current objective, optional selected question, Latest action, Return. Reopen never replays the intro.',
'UI.COMPARE.EMPTY':'Use both same-size source regions from V08-COMPARE, each labeled First/Second detail plus Add detail; no example text. Keep optional blank My idea and Save idea.',
'UI.COMPARE.PARTIAL':'Only the selected region gets actual text and Change/Remove. Other region stays Add detail; no suggested source or relation.',
'UI.COMPARE.READY':'Both selected details use equal paper surfaces. The player-selected relationship gets a gold fill and textual selection indication, not a verdict. Optional My idea field can extend the scroll body.',
'UI.TIMELINE.EMPTY':'Remove every sample time and source row. Show Times from your discoveries will appear here. Keep Event times / Discovery order.',
'UI.TALK.TOPICS':'Same lower speaker band, with greeting and actual eligible topic controls instead of the correction line. No typing is required.',
'UI.PRESENT.SELECT':'Same P.PLAN column with acquired-detail picker and Here / People you’ve met elsewhere groups. No hidden recipient or reply.',
'UI.PRESENT.APPROACH':'Close the sheet to the world. The named Going to show… caption and Cancel accompany physical travel. Only arrival and delivery open the reply band.',
'UI.PLAN.ADDRESSED':'Before delivery use You’re showing Jo: plus exact draft/details and Show Jo or Go to Jo’s room. V08-PLAN-DELIVERED is the resulting state; it must not appear before commit.',
'UI.WORK.READY':'Use Ready to rehearse. Only an actual edit appends the changed-version message shown in the reference. Keep current rail and rack ownership synchronized.',
'UI.WORK.EMPTY':'Before an attempted Rehearse show CT.RAIL.HELP; after that attempt the pictured CT.WORK.EMPTY is shown. No four numbered answer blanks.',
'UI.RUN.STARTING':'Same Watch composition, nonempty actual order, initial puppets and mode heading; Stop remains available. Do not use the EMPTY error from the shared geometry reference.',
'UI.RUN.TERMINAL':'Use the same paused Watch band but replace Next tile with mode paused after its last cue. Primary is Continue to finish rehearsal/premiere. No cue replay or early celebration.',
'UI.RUN.FAILED':'Replace paused/Continue labels with Rehearsal finished. Preserve the actual last puppet state and rail. Rehearse, Arrange, Notes, Help and Return remain. No grade.',
'UI.STORY.DESCRIBE':'Use a P.READER source-like sheet after settling playback. Heading Story now, then banks, Pip/backpack, Grandma, seed, boats, roots/light using one applicable CT.STORY fragment each. Keep Enlarge the whole story and Back. No draggable objects.',
'UI.COACH.TOPIC':'Replace the three clarification subjects with only known lead questions and Your story plan. Blank text is valid. No hidden clue topic.',
'UI.COACH.PENDING':'Same waiting region with Getting help… before the two-second target. Keep submitted snapshot separate from any later editable draft.',
'UI.COACH.RESPONSE':'Use the actual eligible bank response. Local fallback bears Prepared hint; a service-selected bank response does not claim local fallback. Ask again, Show me a way and Keep playing remain available.',
'UI.COACH.CANCELED':'Return to entry with Request canceled. Your idea is kept. Preserve the real draft; remove pending/ready marker. No late insertion.',
'UI.SAVE.PENDING':'Use the quiet caption/status position with Saving…; Menu details may say Your latest changes are still being saved. No saved badge before acknowledgment.',
'UI.SAVE.SAVED':'Same position with Saved on this device. No global success animation or implication that every newer change is saved.',
'UI.RECOVERY.REPLACE':'Use P.DECISION: exact known/unknown replacement sentence; Keep this visit unsaved first and Replace saved game second. Do not reuse Retry or Play without saving from the visual family example.',
'UI.RECOVERY.VERSION':'Back remains available. Start a new game only opens the separate New game confirmation; no automatic conversion.',
'UI.RECOVERY.RUN':'Use This playback couldn’t be continued. Keep independently valid case progress; show Return/Go to Stage and Rehearse only at valid Stage approach. Do not use the normal-resume reassurance.',
'UI.RETURN.FOREGROUND':'Show Welcome back. Your game is paused. Restore the prior task/draft and retained mode; Return to festival does not autoplay.',
'UI.TOAST.MAGNIFIER':'Use the enlarged tiny-toast detail from V08-STORYBOARD-TOAST with CT.TOAST.ENLARGED and Close. No evidence toolbar or collection action.',
}
state_md=['# Item 08 — complete visual-state crosswalk','',f'{len(states)} existing Item 06 states. These linked diagrams specify functional layouts and visible states; their simple drawing quality is not the final art target. V08-CAST-ILLUSTRATED and the four illustrated room references govern the rich finish for every state. A sample fixture never authorizes displaying its source contents in a different state. Exact differences below and Item 07 govern each instance.','', '| State | Pattern / functional diagram | Canonical content | Visual exception and boundary |','|---|---|---|---|']
for st,cts,bound in states:
    p,id=pattern(st);assert id in byid
    state_md.append(f'| `{st}` | `{p}` / {link(id)} | {cts} | {exceptions.get(st,bound)} |')
(OUT/'STATE-CROSSWALK.md').write_text('\n'.join(state_md)+'\n',encoding='utf-8')

# Transition binding uses exact IDs rather than suffix matches inside ACT or ST.
six=(ROOT/'06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md').read_text(encoding='utf-8-sig')
tids=sorted(set(re.findall(r'(?<![A-Z0-9_.])(T\.[A-Z0-9_.]+)(?![A-Z0-9_.])',six)))
tids=[t for t in tids if not t.endswith('.')]
trans=[]
overrides={
 'T.HOME.CONTINUE':(['UI.HOME.SAVED','UI.WORLD.IDLE','UI.RESUME.RUN'],['V08-HOME-SAVED','V08-RECOVERY-RESUME']),
 'T.HOME.OVER':(['UI.HOME.SAVED','UI.RESET.CASE'],['V08-HOME-SAVED','V08-RECOVERY-NEW-GAME']),
 'T.HOME.START':(['UI.HOME.EMPTY','UI.WORLD.IDLE','UI.GUIDE.OPENING'],['V08-HOME-EMPTY','V08-OPENING']),
 'T.HOME.SETTINGS':(['UI.HOME.EMPTY','UI.HOME.SAVED','UI.SETTINGS'],['V08-HOME-EMPTY','V08-SETTINGS']),
 'T.ENDING.REOPEN':(['UI.GOAL','UI.PAUSE','UI.ENDING.RECAP'],['V08-RECAP','V08-RECAP-REVISION']),
 'T.POST.PLAY':(['UI.SOURCE.POST','UI.SOURCE.CLIP'],['V08-E2-FIRST','V08-E2-END']),
 'T.POST.PHOTO':(['UI.SOURCE.POST','UI.SOURCE.PHOTO'],['V08-E2-FIRST','V08-E2-PHOTO']),
 'T.CLIP.DESCRIBE':(['UI.SOURCE.CLIP'],['V08-E2-FIRST','V08-E2-END','V08-E2-FULL']),
 'T.CLIP.STEP':(['UI.SOURCE.CLIP'],['V08-E2-FIRST','V08-E2-END']),
 'T.PHOTO.ENLARGE':(['UI.SOURCE.PHOTO','UI.SOURCE.ZOOM'],['V08-E2-PHOTO']),
 'T.COACH.DIRECT':(['UI.COACH.ENTRY','UI.COACH.DIRECT'],['V08-HELP-ENTRY','V08-HELP-DIRECT']),
 'T.COACH.THINK':(['UI.COACH.ENTRY','UI.COACH.PENDING'],['V08-HELP-ENTRY','V08-HELP-WAITING']),
 'T.COACH.OFFER':(['UI.COACH.WAITING','UI.COACH.FALLBACK_OFFER'],['V08-HELP-WAITING','V08-HELP-FALLBACK']),
 'T.COACH.FALLBACK':(['UI.COACH.FALLBACK_OFFER','UI.COACH.RESPONSE'],['V08-HELP-FALLBACK','V08-HELP-PREPARED']),
 'T.COACH.OPEN_READY':(['UI.COACH.READY_CLOSED','UI.COACH.RESPONSE','UI.COACH.STALE'],['V08-HELP-WORLD','V08-HELP-RESPONSE','V08-HELP-STALE']),
 'T.RUN.BEGIN':(['UI.RUN.STARTING','UI.RUN.REHEARSAL','UI.RUN.SHOW'],['V08-STORYBOARD-REHEARSAL','V08-WORK-SEED']),
 'T.RUN.SHOW':(['UI.WORK.CERTIFIED','UI.RUN.STARTING','UI.RUN.SHOW'],['V08-WORK-SUCCESS','V08-STORYBOARD-PREMIERE']),
 'T.RUN.FINALIZE':(['UI.RUN.TERMINAL','UI.RUN.FAILED','UI.WORK.CERTIFIED','UI.ENDING.CELEBRATION'],['V08-WORK-PAUSED','V08-WORK-UNMET','V08-WORK-SUCCESS','V08-PREMIERE']),
 'T.RUN.STOP':(['UI.RUN.REHEARSAL','UI.RUN.SHOW','UI.RUN.PAUSED','UI.RUN.TERMINAL'],['V08-STORYBOARD-INTERRUPT','V08-WORK-PAUSED']),
 'T.RUN.LEAVE':(['UI.RUN.PAUSED','UI.RUN.TERMINAL','UI.WORLD.IDLE','UI.WORLD.MOVING'],['V08-STORYBOARD-INTERRUPT','V08-WORK-PAUSED']),
 'T.RUN.RESTART.REHEARSAL':(['UI.RUN.PAUSED','UI.RUN.UNMET','UI.RUN.STARTING'],['V08-WORK-PAUSED','V08-WORK-UNMET','V08-STORYBOARD-REHEARSAL']),
 'T.RUN.RESTART.SHOW':(['UI.RUN.PAUSED','UI.RUN.STARTING','UI.WORK.SHOW_CHECK'],['V08-STORYBOARD-INTERRUPT','V08-WORK-HISTORY']),
 'T.VISIBILITY.HIDE':(['UI.WORLD.IDLE','UI.RUN.PAUSED','UI.RUN.TERMINAL'],['V08-STORYBOARD-INTERRUPT','V08-RECOVERY-RESUME']),
 'T.WORLD.COMMIT':(['UI.WORLD.OPERATING','UI.WORLD.IDLE','UI.SOURCE.TEXT','UI.KIT.CARRIED'],['V08-STORYBOARD-EXPLORE','V08-STORYBOARD-NOTICE','V08-STORYBOARD-RECOVERY','V08-KIT-OWNERS']),
 'T.KIT.OPEN':(['UI.KIT.CLOSED','UI.KIT.OPEN'],['V08-KIT-OWNERS','V08-KIT']),
 'T.KIT.COLLECT':(['UI.KIT.CLOSED','UI.KIT.OPEN','UI.KIT.CARRIED'],['V08-KIT-OWNERS','V08-KIT']),
 'T.KIT.SEAT':(['UI.KIT.HANDOFF','UI.KIT.SEATED'],['V08-KIT-OWNERS','V08-ROOM-ST-READY']),
 'T.TOAST.START':(['UI.TOAST.COVERED','UI.TOAST.REVEALING'],['V08-ROOM-WK-INITIAL','V08-STORYBOARD-TOAST']),
 'T.TOAST.SETTLE':(['UI.TOAST.REVEALING','UI.TOAST.REVEALED'],['V08-STORYBOARD-TOAST','V08-ROOM-WK-REVEALED'])
}
for op in ['INSERT','REPLACE','SWAP','MOVE','RETURN']:
    overrides['T.RAIL.'+op]=(['UI.RAIL.SELECTED','UI.RAIL.DESTINATIONS','UI.WORK.READY','UI.WORK.NEEDS_LOOP'],['V08-RAIL-ACTIONS','V08-STORYBOARD-TILES','V08-WORK-CHANGED'])
overrides['T.RAIL.NOOP']=(['UI.RAIL.SELECTED','UI.RAIL.DESTINATIONS','UI.WORK.CERTIFIED','UI.RUN.PAUSED'],['V08-RAIL-ACTIONS','V08-WORK-SUCCESS','V08-WORK-PAUSED'])
content_bindings={}
for line in (ROOT/'07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md').read_text(encoding='utf-8-sig').splitlines():
    if line.startswith('| `T.'):
        cells=line.split('|')
        for tid in re.findall(r'`(T\.[A-Z0-9_.]+)`',cells[1]):content_bindings[tid]=cells[2].strip()
for t in tids:
    found=[]
    for line in six.splitlines():
        if t in re.findall(r'(?<![A-Z0-9_.])T\.[A-Z0-9_.]+',line):
            found.extend(re.findall(r'`(UI\.[A-Z0-9_.]+)`',line))
    ss=list(dict.fromkeys(s for s in found if s in {a[0] for a in states}))
    artifacts=list(dict.fromkeys(pattern(st)[1] for st in ss))
    if t in overrides:ss,artifacts=overrides[t]
    if not artifacts:raise ValueError('Unmapped visual transition: '+t)
    trans.append((t,ss,artifacts))
tm=['# Item 08 — transition-to-visual references','','These are all existing Item 06 transition IDs. Linked functional diagrams specify layout and visible consequences; the five ILLUSTRATED references govern final appearance and drawing quality. State sets name the applicable source, destination or shared family context, not a new linear route. Item 06 remains authoritative for exact prerequisites and commits. The canonical Item 07 action binding is repeated as a reference, not new wording. The main specification contains thirteen written traces through the designs.','','| Transition | Applicable states | Functional visual references | Canonical action/content binding from Item 07 |','|---|---|---|---|']
for t,ss,arts in trans:tm.append('| `'+t+'` | '+', '.join('`'+s+'`' for s in ss)+' | '+', '.join(link(a) for a in arts)+' | '+content_bindings[t]+' |')
(OUT/'TRANSITION-CROSSWALK.md').write_text('\n'.join(tm)+'\n',encoding='utf-8')

def lum(v):
    a=[int(v[i:i+2],16)/255 for i in [1,3,5]];a=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in a]
    return .2126*a[0]+.7152*a[1]+.0722*a[2]
contrast=[]
for a,b,role in [('ink','paper','body and paper sources'),('ink','white','control labels'),('white','teal','primary action'),('muted','white','metadata'),('focus','paper','focus outside edge'),('ink','gold','selected control'),('line','white','control/source boundaries')]:
    v=sorted([lum(c.P[a]),lum(c.P[b])]);contrast.append((a,b,round((v[1]+.05)/(v[0]+.05),2),role))
checks={'artifacts':len(reg),'svg_designs':len(reg)-len(painted),'illustrated_quality_references':len(painted),'state_count':len(states),'transition_count':len(tids),'contrast':contrast,'button_fit_failures':[(r['id'],a['label']) for r in reg for a in r.get('controls',[]) if not a['fits']],'missing_files':[r['id'] for r in reg if not (OUT/(r['id']+'.png')).exists()]}
# Verify exact frozen bodies in actual design text, normalizing only line wrap whitespace.
def visible_text(id):
    import xml.etree.ElementTree as ET
    tree=ET.fromstring((OUT/(id+'.svg')).read_text(encoding='utf-8'));return ' '.join(' '.join(e.itertext()) for e in tree.iter() if e.tag.endswith('}text'))
checks['source_checks']=[]
for id,key in [('V08-READ-E4','CT.SRC.E4'),('V08-READ-E3','CT.SRC.E3'),('V08-READ-E6','CT.SRC.E6'),('V08-READ-E7','CT.SRC.E7'),('V08-E2-FIRST','CT.SRC.E2.C'),('V08-E2-FULL','CT.SRC.E2.A'),('V08-COMPACT-SOURCE-FULL','CT.SRC.E7')]:
    expected=' '.join(c.CT[key].split());actual=' '.join(visible_text(id).split());checks['source_checks'].append({'artifact':id,'ct':key,'pass':expected in actual})
checks['e2_first_excludes_end']='Recording ends here.' not in visible_text('V08-E2-FIRST') and 'The recording ends at the doorway.' not in visible_text('V08-E2-FIRST')
checks['photo_excludes_full_notice']='OUTDOOR REHEARSAL' not in visible_text('V08-E2-PHOTO')
checks['no_gameplay_scripts']=True
(OUT/'design-checks.json').write_text(json.dumps(checks,indent=2),encoding='utf-8')
(OUT/'artifact-register.json').write_text(json.dumps(reg,ensure_ascii=False,indent=2),encoding='utf-8')
register=['# Item 08 — visual-artifact register','','The five ILLUSTRATED references govern final appearance and drawing quality. The SVG/PNG diagrams govern functional layout, source exposure, control placement and visible state, and are not acceptable finished game art. Local helpers compose documents only. Listed content/controls include the associated scroll body and stopped background chrome; only the foreground owns input under Item 06 C1, and only currently visible content counts as exposed. A listed CT dependency does not mark the source read. Scene artwork carries no new hidden controls. Canonical content conditions override every sample fixture.','',f'**{len(reg)} current references:** {len(painted)} illustrated quality references and {len(reg)-len(painted)} functional diagrams, including clean/annotated pairs and scroll companions. Overview/contact sheets are indexes, not additional game states. The earlier CAST-ORIGINAL and Stage candidates are historical, excluded from this current register.','']
for r in reg:
    ctrls=list(dict.fromkeys(a['label']+(' [unavailable]' if a['kind']=='disabled' else '') for a in r.get('controls',[])))
    register += ['## '+r['id']+' — '+r['title'],'',link(r['id'])+(' · [Editable functional composition]('+r['id']+'.svg)' if (OUT/(r['id']+'.svg')).exists() else ''),'',f'- Role: **{r["role"]}.**',f'- Canvas: {r["width"]} × {r["height"]}; 1 design pixel per declared reference pixel. '+scale_note(r),f'- Pattern and represented state: `{r["pattern"]}`; {r["state"]}.',f'- Objects/access/behavior: {r["refs"]}.',f'- Applicable exact content: {", ".join(r["ct"]) or "Appearance reference / no readable canonical source body."}',f'- Labeled controls in composition/scroll body: {"; ".join(ctrls) or "Room/cast drawing; applicable native actions are supplied by the linked world/reader/workstation pattern."}',f'- Concealed or unavailable: {r["concealed"]}',f'- Related reference: {r["companion"]}. Responsive layout: main specification §7; reduced-motion endpoint/treatment: §6. A clean/annotated pair is not itself a responsive variant.',f'- Review-only annotation / fixture: {r["note"] or "The gallery title and metadata are outside the child-facing canvas."}','']
(OUT/'ARTIFACT-REGISTER.md').write_text('\n'.join(register),encoding='utf-8')

style='''body{margin:0;background:#FFF9E9;color:#18324B;font:19px/1.55 "Segoe UI",Arial,sans-serif}main{max-width:1400px;margin:auto;padding:36px}h1{font-size:48px;line-height:1.1;max-width:850px}h2{margin-top:58px}a{color:#14646B;text-underline-offset:4px}a:focus-visible,summary:focus-visible{outline:3px solid #224FC4;outline-offset:5px}nav{display:flex;flex-wrap:wrap;gap:20px}.intro{max-width:950px}.hero{width:100%;max-height:480px;object-fit:contain;background:#FFFEFA;border:1px solid #bacdcb;border-radius:20px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.card{background:#FFFEFA;border:1px solid #bacdcb;border-radius:18px;padding:22px}.card img{width:100%;height:360px;object-fit:contain}.card h3{margin:10px 0}.meta{font-size:16px;overflow-wrap:anywhere}.meta code{font-size:15px}summary{cursor:pointer;padding:16px 4px;font-size:25px;font-weight:700}.lead{font-size:23px}.tag{font-size:14px;text-transform:uppercase;letter-spacing:2px;color:#425B6D}.plain{border-top:2px solid #c8d8d4;padding-top:20px}@media(max-width:720px){main{padding:20px}.grid{grid-template-columns:1fr}h1{font-size:36px}.card img{height:290px}}'''
def card(r):
    return f'<article class="card" data-reference="{r["id"]}"><a href="{r["id"]}.png"><img loading="lazy" src="{r["id"]}.png" alt="{html.escape(r["title"],quote=True)}"></a><p class="tag">{r["id"]} · {r["width"]} × {r["height"]}</p><h3>{html.escape(r["title"])}</h3><p class="meta">{html.escape(r["role"])}</p><p><a href="{r["id"]}.png">Open full-size reference</a>'+(' · <a href="'+r['id']+'.svg">Editable functional composition</a>' if (OUT/(r['id']+'.svg')).exists() else '')+f'</p><details class="meta"><summary>State and content references</summary><p>{html.escape(r["state"])} · {html.escape(r["refs"])}</p><p>{html.escape(r["concealed"])}</p><p>{html.escape(r["note"])}</p></details></article>'
featured=[r['id'] for r in painted]
style+=' .card[data-reference="V08-CAST-ILLUSTRATED"]{grid-column:1/-1}.card[data-reference="V08-CAST-ILLUSTRATED"] img{height:auto;max-height:610px}'
parts=['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Evidence Quest — illustrated visual direction</title><style>'+style+'</style><main><p class="tag">Evidence Quest · Checklist Item 08 · Updated visual direction</p><h1>A world worth exploring.</h1><p class="lead intro">Expressive characters, richly painted rooms, warm wood and layered paper. This is the illustrated quality target for the game.</p><p class="intro">Jo is now a white girl with fair skin and brown hair in two buns, wearing her coral shirt and teal overalls. The cast and all four room references below establish the finish for the actual game: detailed faces and fabric, tactile materials, soft light and depth.</p><nav><a href="../08-VISUAL-DIRECTION-AND-READABLE-DESIGNS.md">Design specification</a><a href="STATE-CROSSWALK.md">All 93 interface states</a><a href="ARTIFACT-REGISTER.md">Artifact register</a><a href="../EVIDENCE-QUEST-MASTER-CHECKLIST.md">Master checklist</a></nav><h2>The illustrated game-art target</h2><p class="intro">These full-scene illustrations guide appearance. The existing room plans retain exact object placement, interaction and story rules. Source text and usable controls will be separate readable layers. These are static references; no playable game is presented here.</p><div class="grid">']
parts += [card(byid[k]) for k in featured];parts+=['</div><h2>Functional layouts and state diagrams</h2><p class="intro">The simpler drawings below specify placement, controls, accessible layouts and consequences. Their drawing quality is not the final visual target. The finished game must combine these exact behaviors with the illustrated quality shown above.</p>']
categories=[('Cast and visual direction',lambda r:r['pattern']=='P.ART'),('Four rooms — clean and annotated',lambda r:r['id'].startswith('V08-ROOM')),('Reading, evidence and plans',lambda r:r['pattern'] in ('P.READER','P.COMPARE','P.PLAN','P.TALK') and not r['id'].startswith('V08-COMPACT')),('World, rehearsal and materials',lambda r:r['pattern'] in ('P.WORLD','P.WORK','P.KIT') and not r['id'].startswith(('V08-ROOM','V08-COMPACT'))),('Coaching, settings and recovery',lambda r:r['pattern'] in ('P.COACH','P.DECISION','P.HOME','P.SHEET') and not r['id'].startswith('V08-COMPACT')),('Compact and enlarged text',lambda r:r['id'].startswith('V08-COMPACT') or r['id']=='V08-LAPTOP'),('Storyboards and completion',lambda r:r['pattern'] in ('P.MOTION','P.ENDING'))]
for title,test in categories:
    rr=[r for r in reg if test(r)];parts+=['<details class="plain"><summary>'+title+' ('+str(len(rr))+')</summary><div class="grid">']+[card(r) for r in rr]+['</div></details>']
parts+=['<h2>Review evidence</h2><p>The packet includes exact-wording checks, design contrast calculations, control-fit checks, written route reviews, and rendered-image inspection. It does not establish child usability, runtime accessibility, learning gains, or a functioning game.</p><p><a href="V08-OVERVIEW.png">Visual overview</a> · <a href="TRANSITION-CROSSWALK.md">Transition references</a> · <a href="PROVENANCE.md">Art and font provenance</a> · <a href="design-checks.json">Measured design checks</a></p></main></html>']
gallery=''.join(parts);(OUT/'index.html').write_text(gallery,encoding='utf-8');assert '<script' not in gallery
print(json.dumps(checks,indent=2))
