"""Copy approved artwork unchanged; build one PDF guide and a verified ZIP. No Tripo calls."""
from pathlib import Path
import csv, hashlib, json, re, zipfile
from datetime import datetime, timezone
from html import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'evidence/hands-on-20260916/pilot/reference-library-20260917'
refs = json.loads((SOURCE / 'asset-manifest.json').read_text('utf-8-sig'))
models = {a['id']: a for a in json.loads((ROOT / 'evidence/hands-on-20260916/pilot/articulated-library-20260917/manifest.json').read_text('utf-8-sig'))['assets']}
OUT = ROOT / 'output/tripo-reference-batches-20260917'
PACK = OUT / 'Evidence-Quest-Tripo-Reference-Pack'
PACK.mkdir(parents=True, exist_ok=True)
PDF = ROOT / 'output/pdf/Evidence-Quest-Tripo-Batch-Guide.pdf'
PDF.parent.mkdir(parents=True, exist_ok=True)
GROUPS = ['01-Buildings-and-Furniture','02-Nature-and-Landscape','03-Village-Functional-Objects','04-Sparkfest-Functional-Objects','05-Human-Characters-Optional']
HD = {'bakery','workshop','dock-office','studio-stage'}
INDIVIDUAL = {'bakery','storage-chest','rope','toolkit','tableware','writing-supplies','tape','paper-bird','seed-boat','storybook','sparkfest-writing','loop'}

NOTES = {
'pip': 'ALREADY COMPLETED: reference only. Do not pay to regenerate Pip. Keep the current P2 mesh, Tripo skeleton and idle/walk unchanged. Backpack belongs to the torso. Attachment sheet is explanatory only.',
'grandma': 'Preserve white hair, face, layered clothing and skirt. Inspect knees under the skirt; hands must not pull the skirt or attach to leg weights. Seed handoff and planting contact will need separate movement review.',
'mara': 'Preserve the approved dock-worker identity. Her remembered bird-repair episode is earlier than Pip\'s present adventure. Hands must remain empty in the base mesh for tape and bird contact.',
'rina': 'Preserve the approved bakery clothing and apron. Keep wrists and hands clear of the apron. Mixing, kneading, portioning and bread handoffs are later action requirements, not guaranteed by idle/walk.',
'sol': 'Preserve workshop clothing and identity. Empty hands need clearance for tile/tool use, roof repair and handling story cards and manuscripts. Keep tools separate from the character.',
'boy': 'Preserve the reference proportions and clothing. The flute is a separate object. Check both elbows/wrists; independent flute finger placement is not supplied by Pip\'s current Tripo skeleton.',
'operator': 'Keep the approved passenger-operator identity and empty hands. Preserve deck clearance for walking and boarding-related gestures. Do not merge the character with a boat or gangway.',
'passenger': 'Use the adult passenger reference, not the boy or operator. Keep limbs separate and hands empty. Boarding and seated poses need inspection against the actual boat.',
'jo': 'Sparkfest materials: coral fabric shirt, teal overalls, brown double buns, cream shoes and modeled face. Preserve full hands. Keep the storybook and cards separate. Do not apply village paper-sculpture skin/clothes.',
'loop': 'Mechanical character, not a humanoid. Cream/teal casing, glass lens, coral button, open handle and rubber wheels. Wheels must be independently movable about their axles; lens/button need distinct surfaces. Do not use humanoid auto-rig.',
'bakery': 'Inspect individually before batching. Keep the open work bay, usable preparation counter, oven chamber and ONE tile-sized repair opening over the flour side. Do not fill the intentional roof hole. Cutaway is construction guidance, not an alternate camera view to combine blindly. Roof tile, dough and tools stay separate.',
'workshop': 'Leave the covered work bay and story workbench accessible. Door/window apertures need real depth. Keep cards, manuscript, tile and tools independent of shelves and building.',
'dock-office': 'Keep the service window, doorway and counter accessible for Mara and tape retrieval. The tape remains a separate prop. Do not seal openings with painted surfaces.',
'passenger-dock': 'Keep a flat traversable deck, supported pilings, readable edge and mooring points. Gangway and passenger boat stay separate. Do not generate the entire river scene as one mesh.',
'garden-landing': 'Keep the low deck, cleat and seed-boat approach unobstructed. The boat must reach the landing and the seed must be removable. Avoid a raised lip blocking delivery.',
'arbor': 'Preserve the open span and lattice. People must fit underneath. Vine is a separate reusable asset; do not fuse benches or characters into the arbor.',
'bench': 'Keep the seat, back and legs recognizable, grounded and usable by seated characters. No people or cushions fused into the mesh.',
'worktable': 'Village paper/painted timber treatment. Keep the tabletop clear and level for dough and story cards. Reuse this design in village scenes; Sparkfest has its own table.',
'storage-chest': 'Body and hinged lid must be separate usable parts with a clear opening. Cushions remain separate. An attractive sealed box does not meet the requirement.',
'studio-stage': 'Sparkfest wood platform/ramp, fabric curtain and painted walls; keep open presentation space. Jo, Loop, table, book, plant and projection content are separate. Use the context image only to understand placement; never generate the complete context as one model.',
'sparkfest-table': 'Sparkfest smooth wood and teal painted accents, not village sculpted-paper timber. Keep the top clear; book, cups, cards and paperwork are separate.',
'river-shore': 'A modular shoreline treatment, not the whole square game world. Water surface must remain separate from banks/pebbles so the game can animate water and steer boats. Tripo does not create navigation or flow logic.',
'sloping-bank': 'Preserve gentle traversable slopes and irregular outer edges. Avoid vertical platform walls. Bank shapes must be fitted to the approved layout later; a generation does not guarantee exact navigation dimensions.',
'path': 'Keep the walkable middle clear and the branching shape readable. Use reusable path pieces; stones and edges must not become impassable bumps. No giant surrounding landscape in this asset.',
'shade-tree': 'Keep the root flare, trunk and distinct leaf clusters. Grounded base, no display pedestal. Leave clearance below the canopy near paths.',
'willow': 'Preserve branching silhouette and hanging leaf clusters like the approved reference. Do not turn all foliage into a solid drooping blob or close the open gaps between branches.',
'shrub': 'Reusable shrub/hedge module. Preserve the irregular silhouette; avoid long solid walls that block intended travel.',
'grass': 'One reusable tuft with readable blades and grounded roots. No oversized soil pedestal. Repeated grass does not require new paid generations.',
'meadow-flowers': 'One reusable clump; keep flowers and stalks readable. No unrelated surrounding meadow or extra base plate.',
'reeds': 'Readable separate stems/seed heads and a grounded root cluster. Keep shoreline channels open; do not generate a solid wall of reeds.',
'rocks': 'One reusable rounded river-rock design with a stable underside. Repeat and rotate it later rather than paying per instance.',
'garden-plants': 'Preserve recognizable herb leaves and rooted base. Keep it distinct from the magical lantern flower.',
'arbor-vine': 'Separate climbing module with gaps between leaves/stems so it can sit on the arbor. Do not generate another arbor around it.',
'sparkfest-plant': 'Natural leaves, ordinary soil, terracotta pot and saucer. This belongs to Sparkfest, not the sculpted-paper garden.',
'bridge-a': 'Independent first walkway section; keep end connectors, walking surface and edge/post attachment areas readable. It must be placeable and secured before section B. Reference joint sheet explains the full system; do not fuse the whole crossing.',
'bridge-b': 'Independent second section, compatible with section A and the far bank. Keep its join edge usable. Do not attach bank terrain, posts or ropes permanently to the mesh.',
'bank-post': 'One reusable bank-post design, instanced FOUR times. Visible rope socket/wrapping area above the walkway and a ground insertion base. Do not generate four unrelated paid designs.',
'center-post': 'One reusable center-post design, instanced TWICE beside the walkway. Needs attachments for first-half and second-half rope runs. Keep it out of the walking lane.',
'rope': 'TWO side ropes, each bank corner -> center -> far corner. Loose coil, wrapping and tightened knot are separate usable states, not one fused specimen board. Attachment ends must be accessible. A static rope mesh does not implement live dragging or tying.',
'material-crate': 'Open accessible container beside repair materials. Keep movable posts, sections and ropes separate; no additional collection hunt or permanently fused contents.',
'gangway': 'Independent boarding ramp with a usable deck and supported ends. Keep the docking ends accessible; do not fuse it to the passenger boat.',
'passenger-boat': 'Open passenger area, usable deck/seats and boarding point. Leave room for operator and passengers. Gangway and characters remain separate.',
'landing-marker': 'One readable grounded marker that can be reused. Preserve the distinct shape/color; generated lettering is not authoritative gameplay text.',
'seed': 'One standalone lantern seed. Same object must fit hand, boat cradle and planting hollow. No soil, boat or plant permanently attached.',
'planting-bed': 'Existing bed with separate visual states: unprepared, prepared hollow, seed placed, covered mound. Keep seed/plant independent. Soil must meet the surrounding ground; no floating tray unless the reference shows one.',
'trowel': 'Keep handle, neck and blade continuous, with a clear hand grip. No hand or soil fused onto the tool.',
'paper-bird': 'Body and independently alignable torn wing are required. Keep the tear seam accessible for a separate tape strip. Torn/aligned/taped images are state guidance, not three camera views of one unchanged bird.',
'tape': 'Roll and applied strip must be separate. Keep the roll opening visible and give the strip enough thickness to display. Do not fuse the strip to the roll or to the bird in the base prop.',
'roof-tile': 'Separate intact and cracked tile states. Preserve overlap/lip and thickness so an intact tile can cover the bakery\'s actual roof opening. Match the roof color and curvature.',
'ladder': 'Usable rung spacing, open gaps and supported feet. Separate from the bakery and characters. Preserve side rails without filling the openings.',
'toolkit': 'The container and any tools used in hand must be separate usable parts. Do not submit a multi-object reference as a single fused lump. Preserve clear tool grips.',
'flour-sack': 'Dry and damp-flour consequence states. Preserve the mouth/opening; flour used during preparation must not become an immovable plug merged with a bowl.',
'scoop': 'Hollow scoop with a clear handle grip. Preserve the cavity and rim; no fused hand or flour heap.',
'mixing-bowl': 'Hollow interior, readable rim and stable base. Dough, flour and mixing tool must stay separate; reject a solid filled bowl.',
'dough': 'Whole/kneaded dough and FOUR similar independent portions. State sheet is a visual recipe, not a batch of camera angles. Division and pressing behavior will be implemented separately.',
'bread': 'Well-baked portions, unshaped underdone batch and recovered bake. Keep the poor batch recoverable in presentation; do not replace all states with a single perfect loaf.',
'oven': 'Actual open mouth, deep baking chamber and accessible hearth. Bread and peel stay separate. Lighting/heat appearance is separate from the static brick mesh.',
'story-card': 'Thin backing with a replaceable flat illustrated face. Keep the village picture flat, not raised scene geometry. Reuse backing for witnessed pictures and the chosen memory insert.',
'manuscript': 'Separate handleable manuscript/copy design. Pages must remain distinguishable; final readable writing belongs to the game, not AI-generated lettering.',
'cushion': 'Reusable soft cushion with visible seams and stable contact. Keep it separate from benches, chest and people.',
'picnic-cloth': 'Thin cloth with FOUR free corners and a readable border. No food, table or people fused to it. Wind/deformation is a later behavior.',
'cake': 'Preserve cake, icing and plate. If a serving piece must move, it needs a separate part; do not spend on variants without checking the scene need.',
'tableware': 'Plate, cup and spoon are distinct reusable pieces. Open cup and handle. A reference showing several objects needs individual component preparation or inspected segmentation.',
'flute': 'Preserve mouthpiece, bore and finger holes. Keep the instrument separate from the boy. Tiny painted dots are not equivalent to readable holes in close views.',
'writing-supplies': 'Holder and loose usable pencils must be separate. Preserve hand-sized grips; keep written content out of generated textures.',
'dock-bell': 'Bell shell, clapper and pull cord must remain identifiable; moving clapper/cord need separate parts. Keep mounting stable.',
'wall-lamp': 'Separate lamp appearance from the game\'s light source. Preserve wall plate, support and shade; retain unlit/warm-light requirements.',
'bread-basket': 'Open woven bowl with a thick rim and stable base. Bread stays removable rather than merged into the basket.',
'ceramic-jug': 'Hollow mouth, pouring lip, open handle and stable base. Keep a clear hand grip. Water/pouring appearance is a later separate effect.',
'bread-peel': 'Flat paddle and long grip with enough clearance to enter the oven. Bread remains separate. Hanging hole stays open.',
'seed-boat': 'Inspect individually: master depicts cargo context. Required output is an OPEN hull with accessible EMPTY cradle; the actual seed is separate. Use the detail image to check loading space. Do not approve a boat with the seed welded into it.',
'lantern-flower': 'Rooted base touching soil, visible stem/leaves and lantern petals. Seed, shoot/bud and bloom are growth-state requirements, not one fused lineup. Chosen memory needs an accessible attachment area.',
'projection': 'Blank matte projection surface with frame and brackets. The village image is supplied separately at runtime, not baked relief or a permanent screenshot.',
'storybook': 'Ordinary clothbound Sparkfest book with separate miniature village insert. Do not fuse the whole miniature to the pages. Reuse accepted village models for the inset; preserve the spine and readable page surfaces.',
'sparkfest-writing': 'Smooth glazed cup and wood pencils with graphite tips. At least the usable loose pencil must be separate. Match Sparkfest materials rather than the village paper treatment.',
'sparkfest-paperwork': 'Thin ordinary paper sheets/stack with coral cotton tie through the corner. Keep it distinct from a gift-wrapped parcel. Actual readable copy is supplied separately.',
'sparkfest-cards': 'Thin smooth cardstock with FLAT printed village artwork. No embossed boat, landscape diorama or paper-sculpture border. Front image is replaceable; backing is reusable.'
}
assert set(NOTES) == set(models), 'Every design needs an item-specific instruction'

def sha(data): return hashlib.sha256(data).hexdigest()
def group(a):
    m=models[a['id']]
    if a['id']=='loop': return GROUPS[3]
    if a['category']=='Characters': return GROUPS[4]
    if a['category']=='Buildings': return GROUPS[0]
    if a['category']=='Nature/Landscape': return GROUPS[1]
    return GROUPS[3] if m['world']=='Sparkfest' else GROUPS[2]
def profile(a):
    i=a['id']
    if i in HD: return 'HD v3.1 | 30,000-50,000 triangles | 4K texture'
    if a['category']=='Characters' and i!='loop': return 'P2 | adaptive triangle count where available | standard PBR from original reference'
    if i in {'shade-tree','willow','passenger-boat','seed-boat','lantern-flower'}: return 'P2 | 8,000-15,000 triangles | 2K; 4K only for important close-ups'
    if a['category']=='Buildings': return 'P2 | 3,000-8,000 triangles | 2K texture'
    if a['category']=='Nature/Landscape': return 'P2 | 500-3,000 triangles for small modules | 2K texture'
    if i=='storybook': return 'P2 | 5,000-10,000 triangles, book only | 4K close-up pages'
    return 'P2 | 1,000-5,000 triangles | 2K texture'

for g in GROUPS:
    for method in ['HD','P2']: (PACK/g/method).mkdir(parents=True,exist_ok=True)
rows=[]; items=[]
for a in refs['assets']:
    method='HD' if a['id'] in HD else 'P2'
    base=Path(group(a))/method
    if a['id']=='pip': base /= 'Already-Completed-Reference-Only'
    elif a['id'] in INDIVIDUAL: base /= 'Individual-Setup'
    master=None;details=[]
    for im in a['images']:
        assert im['approvalStatus']=='approved-reference', im['path']
        src=SOURCE/im['path'];data=src.read_bytes();assert sha(data)==im['sha256'],src
        is_master=im['role']=='master'
        rel=base/(f"{models[a['id']]['world']}--{a['id']}.png" if is_master else f"Reference-Details-DO-NOT-BATCH/{a['id']}--{im['id']}.png")
        dst=PACK/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(data)
        rows.append(dict(asset_id=a['id'],world=models[a['id']]['world'],category=group(a),method=method,role=im['role'],file=rel.as_posix(),source=im['path'],sha256=im['sha256'],approval='approved-reference'))
        if is_master: master=rel
        else: details.append(rel)
    assert master is not None
    items.append(dict(asset=a,group=group(a),method=method,master=master,details=details))
for im in refs.get('contextImages',[]):
    data=(SOURCE/im['path']).read_bytes();assert sha(data)==im['sha256'];assert im['approvalStatus']=='approved-reference'
    rel=Path('06-Context-DO-NOT-BATCH')/Path(im['path']).name;(PACK/rel).parent.mkdir(parents=True,exist_ok=True);(PACK/rel).write_bytes(data)
    rows.append(dict(asset_id=im['id'],world='Sparkfest with embedded Village',category='Context',method='Do not generate',role='context',file=rel.as_posix(),source=im['path'],sha256=im['sha256'],approval='approved-reference'))
assert len(items)==77 and len(rows)==91 and len({r['file'] for r in rows})==91
with (PACK/'Reference-Inventory.csv').open('w',newline='',encoding='utf-8-sig') as f:
    writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)

styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleEQ',fontName='Helvetica-Bold',fontSize=27,leading=31,textColor=colors.HexColor('#24483f'),spaceAfter=17))
styles.add(ParagraphStyle(name='HeadingEQ',fontName='Helvetica-Bold',fontSize=17,leading=21,textColor=colors.HexColor('#24483f'),spaceAfter=12))
styles.add(ParagraphStyle(name='ItemEQ',fontName='Helvetica-Bold',fontSize=11,leading=14,textColor=colors.HexColor('#24483f'),spaceBefore=9,spaceAfter=5))
styles.add(ParagraphStyle(name='BodyEQ',fontName='Helvetica',fontSize=9.6,leading=13.1,spaceAfter=7))
styles.add(ParagraphStyle(name='SmallEQ',fontName='Helvetica',fontSize=8,leading=10.5,spaceAfter=5,textColor=colors.HexColor('#4b5753')))
styles.add(ParagraphStyle(name='CellEQ',fontName='Helvetica',fontSize=8.2,leading=11,spaceAfter=0))
def clean(s): return str(s).translate(str.maketrans({'’':"'",'‘':"'",'“':'"','”':'"','–':'-','—':'-','→':'->','×':'x'}))
def p(s,style='BodyEQ'): return Paragraph(escape(clean(s)),styles[style])
story=[]
def add(s,style='BodyEQ'): story.append(p(s,style))
def table(data,widths):
    t=Table([[p(cell,'CellEQ') for cell in row] for row in data],colWidths=widths,repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#deebe4')),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,0),.7,colors.HexColor('#8fa89d')),('BOTTOMPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#f4f5f0')])]))
    story.append(t);story.append(Spacer(1,12))

add('Evidence Quest\nTripo batch reference guide','TitleEQ')
add('Approved artwork package | 17 September 2026','HeadingEQ')
add('77 designs. 91 unchanged approved images. One guide for batch settings, special preparation, functional requirements and export handoff.')
add('Start here','HeadingEQ')
for s in [
'1. Extract the entire ZIP before uploading anything. Each production category contains HD and P2 folders. HD means HD Model v3.1; P2 means Smart Mesh P2.0 Preview.',
'2. Direct PNG files inside an HD/P2 folder are one master per asset. Select only those files when making a same-settings batch. Do not recursively select every image in the package.',
'3. Individual-Setup contains masters that need a separate parts/interior/state decision. Read that asset\'s entry before submitting it. These images are approved, but blind batch conversion could fuse required parts.',
'4. Reference-Details-DO-NOT-BATCH contains cutaways, state sheets and connection details. They are not extra models or automatically compatible multiview photos. Never submit a broken/repaired lineup as a single model.',
'5. 06-Context-DO-NOT-BATCH shows the studio arrangement. It is not a generation input for a fused room.',
'6. Human references are included separately for completeness. Pip is already completed and is isolated in Already-Completed-Reference-Only. Do not regenerate him.',
'7. First inspect one building, one tree and one interactive prop. Then run small batches with matching texture and geometry needs. Preserve every original download before further processing.'
]: add(s)
table([['Folder','Designs','Purpose'],['01 Buildings and Furniture','11','4 HD building/stage masters; 7 P2 furniture/dock/arbor masters'],['02 Nature and Landscape','13','P2 reusable environmental designs, including Sparkfest plant'],['03 Village Functional Objects','38','P2 props, construction pieces and required state references'],['04 Sparkfest Functional Objects','6','5 studio prop designs plus mechanical Loop'],['05 Human Characters - Optional','9','8 future P2 humans; Pip reference only']],[170,46,300])
add('Empty HD folders are intentional where P2 is the recommended default. File names start with Village or Sparkfest. Reference-Inventory.csv records every source image hash and destination; it is an inventory, not another instruction document.','SmallEQ')

story.append(PageBreak());add('Settings for production batches','HeadingEQ')
table([['Use','Model / triangles','Texture'],['Detailed buildings and stage','HD Model v3.1; start 30,000-50,000','4K'],['Furniture, docks and arbor','P2; start 3,000-8,000','2K'],['Trees / detailed boats / lantern flower','P2; start 8,000-15,000','2K; 4K if justified by close-up'],['Small landscape modules','P2; start 500-3,000','2K'],['Ordinary functional objects','P2; start 1,000-5,000','2K'],['Sparkfest storybook','P2; start 5,000-10,000, excluding inset village','4K close-up pages'],['Humans','P2; adaptive where available; inspect before rigging','Standard PBR, original image']],[169,245,102])
for s in [
'Counts are starting recommendations in TRIANGLES, not visual acceptance limits. If a cap destroys silhouette, holes, fingers or thin parts, stop and reconsider it. Do not automatically reroll. Prefer adaptive where available; the successful API Pip used adaptive rather than an imposed 8,000-triangle target.',
'Topology: Triangle for direct GLB delivery. Your screenshot selected Quad; 5,000 quads can render as roughly 10,000 triangles. Do not equate those counters.',
'Textures: on. PBR: on. Use the exact original reference for texturing where offered. Do not substitute the surrounding studio background or redraw approved clothing/materials.',
'Ultra Mesh Quality: off initially for these batches. 8K: off. The screenshot\'s 2,000,000-polygon target is not the default for this browser game. Preserve any high-detail original if a later Tripo retopology step is needed.',
'Remove Lighting: recommended on for environment/prop textures so the game supplies lighting; inspect that painted color and surface character remain. Preserve Pip\'s proven character texture recipe rather than experimenting on every human.',
'AI Complete: leave off initially for complete approved references. It must not decide to close a roof repair opening, bowl, boat cradle or doorway. This Studio label is not assumed to be identical to every API completion parameter.',
'Generate in Parts: off for ordinary static objects. For selected interactive objects, inspect part generation or segmentation separately. Settings, charges and available outputs may differ from normal textured generation; parts are not guaranteed to be usable just because a task succeeds.'
]: add(s)
add('Keep the two visual worlds distinct','HeadingEQ')
add('Village: sculpted handmade-paper forms, layered clothing/leaves, tactile surfaces and warm painted timber. Sparkfest: modeled people, fabric clothing, smooth painted equipment, ordinary paper, wood and glass. Village pictures printed on Sparkfest cards/screens stay flat. The physical card, book and studio do not inherit the village\'s paper-sculpture treatment.')

story.append(PageBreak());add('Functional models and export handoff','HeadingEQ')
for s in [
'A generated model does not supply gameplay. Separate pieces, usable cavities, state variants and visible attachment points must survive production. Navigation, collisions, river flow, rope manipulation, dough interaction and story outcomes are implemented later.',
'For multi-object references, choose individual component generation or inspected segmentation rather than accepting fused geometry. This package intentionally does not crop, repaint or otherwise alter approved images. If a clean component input is needed, prepare/review it as a separate step; do not treat that missing input as already included.',
'Cutaways and state sheets explain intent. They are not necessarily simultaneous views of one unchanged object. In particular, do not combine torn/repaired wings or whole/divided dough as multiview images.',
'Share reusable designs: four bank posts use one bank-post model; two center posts use one center-post model. Repeated rocks, benches, reeds, cards, copies and cups do not each need a new generation. The memory insert reuses the story-card design.',
'Export GLB with original textures/materials. Keep the untouched downloaded model, its Tripo task ID/link, source image name, settings and actual credit charge. For animated humans keep the original static model, rigged result and animated output separately.',
'Name deliveries with asset IDs, for example bakery.glb, seed-boat.glb or jo-walk.glb. For distinct parts/states use explicit suffixes: paper-bird-body, paper-bird-wing, roof-tile-intact, roof-tile-cracked. Do not rename an uninspected fused model as if it supplied separate parts.',
'Inspect front, both sides, rear and underside; compare to the original image. Check open handles, cavities, thin surfaces, grounded supports and working contact areas. Keep context props out of the base asset. Human model approval remains separate from reference-image approval.',
'This package performs no generation, purchase, rigging, model editing or gameplay integration. No new Tripo credits were spent.'
]: add(s)
add('Budget reminder - check the actual Studio button','HeadingEQ')
add('The supplied offer shows $14 for the first month / 3,000 Studio credits, then $20 monthly. The shown generation buttons are 55 credits (HD configuration) and 65 credits (P2 configuration). At those rates 3,000 buys 54 or 46 generations before extra processing, not 200. Prices can change with settings. The 68 non-human designs would be 3,740-4,420 credits if every first pass cost 55-65; this is not an all-in quote for separate parts/states/textures.')
add('Studio credits and API credits are separate. Recorded API spending remains 895/2,500, with the last verified available balance 1,605. Eight fresh humans using Pip\'s API recipe are estimated at 1,240 credits (155 each), excluding extra animations. This guide does not authorize or submit any of those jobs.')
add('Documentation consulted','HeadingEQ')
for label,url in [('Image-to-model P series','https://developers.tripo3d.ai/en/docs/generation-image-to-model/p'),('HD model settings','https://developers.tripo3d.ai/en/docs/generation-image-to-model/standard'),('Humanoid rig','https://developers.tripo3d.ai/en/docs/animations-rig'),('Animation presets','https://developers.tripo3d.ai/en/docs/animations-retarget'),('API pricing','https://developers.tripo3d.ai/en/pricing'),('Studio/API billing separation','https://www.tripo3d.ai/help/api-plugins/tripo-studiotripo-api')]:
    story.append(Paragraph(f'{escape(label)}: <link href="{url}" color="#156276">{url}</link>',styles['SmallEQ']))

story.append(PageBreak());add('Human characters: preserve the proven workflow','HeadingEQ')
for s in [
'The human references are supplied for completeness, separately from scenery batches. The intended next character workflow is fresh P2 generation for the eight humans other than Pip. Loop is in Sparkfest objects and requires mechanical parts, not a humanoid skeleton.',
'Pip\'s successful recipe: P2-20260801, standard PBR textures, original-image texture alignment, image autofix disabled, adaptive triangle count and direct GLB. In Studio use Smart Mesh P2.0 Preview; if a corresponding advanced setting is not exposed, do not assume the UI reproduces it exactly.',
'Inspect the untouched mesh first. Then free rig check; explicitly choose humanoid v1.0-20240301 / biped / Tripo specification where available. Add native idle and walk in place, with geometry included. Keep clips and original files unchanged.',
'Check both arms, forward knee bending, foot orientation/contact, sleeves, skirt and backpack through complete normal/slow cycles. The present Pip result has hand bones but no independent finger/thumb joints. Do not promise individual grips or flute fingering from that skeleton.',
'Tripo presets can help with digging, shoveling, lifting, greeting, sitting and turning. Rope tying, seed placement, wing taping, kneading and precise handoffs are not established by a generic preset. Review each proposed story action against the actual object.',
'Any later custom action must be separately authorized and reviewed. Preserve accepted mesh, weights, bone hierarchy and existing clips; do not silently rebuild anatomy or fingers. This package contains reference images only, not new skeletons or animations.'
]: add(s)
add('How to read the item catalog','HeadingEQ')
add('Each entry below gives the exact master filename, world, recommended profile, required parts/states and a specific inspection note. Individual-Setup means stop before submitting a blind batch. Details listed beneath an item are visual instructions, not extra generation jobs. The category folder is printed at the start of its catalog section.')

for g in GROUPS:
    story.append(PageBreak());add(g.replace('-', ' '),'HeadingEQ')
    members=[i for i in items if i['group']==g]
    add(f'{len(members)} designs. Paths below are relative to this category folder. All master/detail images retain their approved source bytes.','SmallEQ')
    for item in members:
        a=item['asset'];m=models[a['id']]
        bits=[p(f"{m['label']}  [{a['id']}]",'ItemEQ'),p(f"{m['world']} | {profile(a)}",'SmallEQ'),p(f"Master: {item['master'].relative_to(g).as_posix()}",'SmallEQ'),p(NOTES[a['id']])]
        bits.append(p('Required parts: '+', '.join(m['requiredParts'])+'.','SmallEQ'))
        states=[s for s in m['requiredStates'] if s not in {'static master','neutral full body'}]
        if states: bits.append(p('Required states / variants: '+', '.join(dict.fromkeys(states))+'.','SmallEQ'))
        if item['details']: bits.append(p('Detail references: '+'; '.join(x.name for x in item['details'])+'.','SmallEQ'))
        story.append(KeepTogether(bits));story.append(Spacer(1,5))

def page_header(canvas,doc):
    canvas.saveState();w,h=A4
    canvas.setStrokeColor(colors.HexColor('#bdd0c6'));canvas.line(39,h-31,w-39,h-31)
    canvas.setFont('Helvetica',8);canvas.setFillColor(colors.HexColor('#52635a'))
    canvas.drawString(39,h-23,'EVIDENCE QUEST  /  APPROVED REFERENCES  /  TRIPO STUDIO')
    canvas.drawString(39,23,'17 September 2026  |  Reference package only  |  No new Tripo spending')
    canvas.drawRightString(w-39,23,str(doc.page));canvas.restoreState()
doc=SimpleDocTemplate(str(PDF),pagesize=A4,rightMargin=39,leftMargin=39,topMargin=47,bottomMargin=40,title='Evidence Quest - Tripo Batch Reference Guide',author='Evidence Quest')
doc.build(story,onFirstPage=page_header,onLaterPages=page_header)
(PACK/'START-HERE-Tripo-Batch-Guide.pdf').write_bytes(PDF.read_bytes())
reader=PdfReader(PDF);pdf_text='\n'.join(page.extract_text() for page in reader.pages)
assert all(f'[{a}]' in pdf_text for a in models), 'PDF must cover all 77 IDs'
assert all('None' not in page.extract_text() for page in reader.pages)
expected={r['file'] for r in rows}|{'Reference-Inventory.csv','START-HERE-Tripo-Batch-Guide.pdf'}
actual={p.relative_to(PACK).as_posix() for p in PACK.rglob('*') if p.is_file()}
assert actual==expected, f'Unexpected package contents: {actual^expected}'
ZIP=OUT/'Evidence-Quest-Tripo-Reference-Pack.zip'
with zipfile.ZipFile(ZIP,'w',compression=zipfile.ZIP_STORED) as z:
    for d in sorted(p for p in PACK.rglob('*') if p.is_dir()): z.write(d,arcname=(Path(PACK.name)/d.relative_to(PACK)).as_posix()+'/')
    for f in sorted(p for p in PACK.rglob('*') if p.is_file()): z.write(f,arcname=(Path(PACK.name)/f.relative_to(PACK)).as_posix())
with zipfile.ZipFile(ZIP) as z:
    assert z.testzip() is None
    for row in rows: assert sha(z.read(f"{PACK.name}/{row['file']}"))==row['sha256']
    assert z.read(f'{PACK.name}/START-HERE-Tripo-Batch-Guide.pdf')==PDF.read_bytes()
verification={'createdAt':datetime.now(timezone.utc).isoformat(),'designs':len(items),'images':len(rows),'allImagesApproved':True,'allImageHashesMatchSourceAndZip':True,'pdfPages':len(reader.pages),'pdfCoversAllAssetIds':True,'zipBytes':ZIP.stat().st_size,'zipSha256':sha(ZIP.read_bytes()),'zipCrcCheck':'PASS','newTripoCredits':0,'groups':{g:sum(i['group']==g for i in items) for g in GROUPS},'pdf':str(PDF),'zip':str(ZIP)}
(OUT/'package-verification.json').write_text(json.dumps(verification,indent=2)+'\n',encoding='utf-8')
print(json.dumps(verification,indent=2))
