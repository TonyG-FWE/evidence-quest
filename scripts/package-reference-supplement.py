"""Package fresh imagegen outputs unchanged. No image editing or Tripo calls."""
from pathlib import Path
import csv, hashlib, json, shutil, zipfile
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/tripo-reference-batches-20260917'
OLD = OUT / 'Evidence-Quest-Tripo-Reference-Pack'
PACK = OUT / 'Evidence-Quest-Individual-References-Supplement'
SOURCE = ROOT / 'evidence/hands-on-20260916/pilot/reference-library-20260917'
record = json.loads((OUT / 'supplement-generation-final.json').read_text('utf-8'))
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def dump(p, value): p.write_text(json.dumps(value, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')
notes = {
'projection': 'One blank framed projection surface. Keep the fabric face flat; village imagery is displayed later, never modeled as relief.',
'landing-marker': 'One complete marker. Reuse it for landing locations; preserve the pointed stake and readable pennant.',
'paper-bird-body': 'Damaged crane BODY only, with the near wing ending at its torn edge. Generate separately from the matching tip.',
'paper-bird-wingtip': 'One missing wingtip. Match its torn edge to the body during later assembly; independent generations do not guarantee an exact seam.',
'lantern-flower-bloom': 'One rooted flowering plant. Roots touch the planting soil; do not add a display pedestal.',
'lantern-flower-shoot': 'One rooted shoot growth state. Reuse the original separate seed before this state.',
'lantern-flower-bud': 'One rooted closed-bud state. Align roots and stem position with the shoot and bloom later.',
'roof-tile-cracked': 'One cracked tile. The original intact tile is already separate. Match both to the same roof opening later.',
'dough-portion': 'Generate ONE portion and reuse FOUR copies. Scale each to roughly a quarter of the whole dough volume; do not pay for four identical models.',
'bread-underdone': 'One irregular underdone batch, with pale crust and dense interior. Keep it recognizably recoverable.',
'bread-recovered': 'Appearance target for the recovered irregular batch. Prefer the same underdone mesh with changed baked appearance if feasible; do not automatically generate another model.',
'planting-rim': 'One reusable stone border with an empty middle. Place soil inserts inside it later.',
'soil-unprepared': 'One rough circular soil insert. Reuse the stone rim; no seed or plant belongs to this mesh.',
'soil-hollow': 'One soil insert with an empty planting hollow. The existing seed is placed separately.',
'soil-covered': 'One covered-soil insert with a small central mound. No seed or plant fused into it.',
'flour-sack-damp': 'Damp appearance reference. Prefer a texture/material variant of the existing dry sack, keeping the same geometry; do not automatically buy a second sack.',
'toolkit-empty': 'Empty tool container with a usable handle. Hammer, pouch and pegs stay independent.',
'hammer': 'One hammer with an unobstructed grip. Do not fuse it into the toolbox.',
'peg-pouch': 'One empty pouch. Reuse the separate peg model for its contents.',
'wooden-peg': 'One wooden peg. Duplicate as needed rather than generating repeated pegs.',
'plate': 'One plate, reused across the gathering.',
'cup': 'One hollow cup with an open handle, reused across the gathering.',
'spoon': 'One spoon with a readable bowl and hand grip.',
'village-pencil-holder': 'One empty handmade-paper holder. Pencils are separate.',
'village-pencil': 'One village pencil. Reuse copies in the holder and for writing.',
'sparkfest-pencil-holder': 'One empty glazed holder. Sparkfest ceramic material; separate pencils.',
'sparkfest-pencil': 'One real wooden coral pencil. Reuse copies; no village sculpted-paper finish.',
'storybook-empty': 'One open clothbound book with empty pages. Assemble the miniature later from accepted village assets; do not generate another fused miniature.',
'loop-complete': 'Appearance/assembly GUIDE only. Use body plus two wheel instances for generation. No humanoid rig.',
'loop-body': 'Loop body with casing, lens, handle and button; no wheels. Preserve wheel-mount clearance. No humanoid rig.',
'loop-wheel': 'Generate ONE wheel and reuse TWO instances. Align axle centers during assembly.',
'rope-straight': 'One short straight rope segment reference. Later tying/deformation and attachment behavior are separate from a static model.',
'rope-knot': 'One hollow wrap/knot without a post. Fit it around an accepted post; do not fuse in the post.',
'tape-roll': 'One tape roll with an open center and no long attached strip.',
'tape-strip': 'One thin applied-strip component, separate from roll and bird. Preserve visibility and translucency.',
'chest-base': 'One open empty chest body without a lid. Check its opening and hinge mounts.',
'chest-lid': 'One detached lid. Match to the base and fit its hinge pivot later.',
'village-card-blank': 'One thin flat village card backing. The nine approved picture illustrations become 2D face artwork; no nine scene-model generations.',
'sparkfest-card-blank': 'One ordinary flat Sparkfest cardstock backing. Add the approved printed artwork later; no embossed miniature.',
'bird-repaired-guide': 'ASSEMBLY GUIDE ONLY: aligned tip with a tape strip across the tear. Generate body, tip and tape separately.',
'bridge-connection-guide': 'ASSEMBLY GUIDE ONLY: two deck sections, six posts and two side ropes. Existing section/post masters are already individual inputs.',
}
guides = {'loop-complete','bird-repaired-guide','bridge-connection-guide'}
alternatives = {'flour-sack-damp','bread-recovered'}
first_refs = {'projection':'projection-sparkfest-r1.png','landing-marker':'landing-marker-r1.png','paper-bird-body':'paper-bird-r2-r1.png'}
# Exact original filenames are resolved from the approved manifest where needed.
ref_manifest = json.loads((SOURCE / 'asset-manifest.json').read_text('utf-8-sig'))
masters = {a['id']: next(i for i in a['images'] if i['role']=='master')['path'] for a in ref_manifest['assets']}
first_refs['projection'] = Path(masters['projection']).name
first_refs['landing-marker'] = Path(masters['landing-marker']).name
first_refs['paper-bird-body'] = Path(masters['paper-bird']).name

assets, payload = [], []
for r in record['renders']:
    aid = r['id']
    world = r.get('world') or ('Sparkfest' if aid=='projection' else 'Village')
    category = '01-Buildings-and-Furniture' if aid.startswith('chest-') else ('04-Sparkfest-Functional-Objects' if world=='Sparkfest' else '03-Village-Functional-Objects')
    role = 'ASSEMBLY-GUIDES-NOT-FOR-UPLOAD' if aid in guides else ('OPTIONAL-APPEARANCE-REFERENCES' if aid in alternatives else 'BATCH-INPUTS')
    rel = Path(role) / category / ('P2' if role=='BATCH-INPUTS' else 'Reference-Only') / f'{world}--{aid}.png'
    target = PACK / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    src = Path(r['sourcePath'])
    shutil.copy2(src, target)
    with Image.open(target) as im:
        im.load()
        assert im.format == 'PNG'
        assert 'A' not in im.getbands() or im.getchannel('A').getextrema() == (255,255), aid
        dimensions = list(im.size)
    assert sha(src) == sha(target)
    ref = SOURCE / 'images' / (r.get('ref') or first_refs[aid])
    assert ref.is_file(), ref
    assets.append({
        'id':aid,'label':aid.replace('-',' ').capitalize(),'world':world,
        'role':role,'category':category,'file':rel.as_posix(),'sha256':sha(target),
        'bytes':target.stat().st_size,'dimensions':dimensions,
        'generator':'image_gen.imagegen','process':'Fresh render; no cropping, background extraction, resizing or image re-encoding.',
        'prompt':r['prompt'],'sourceOutput':str(src),
        'designReference':str(ref.relative_to(ROOT)).replace('\\','/'),'designReferenceSha256':sha(ref),
        'approvalStatus':'fresh-reference-awaiting-human-review',
        'instructions':notes[aid]
    })
    payload.append(target)
assert len(assets)==41 and len({a['id'] for a in assets})==41
originals = list(csv.DictReader((OLD/'Reference-Inventory.csv').open(encoding='utf-8-sig', newline='')))
old_checks = []
alpha = []
for row in originals:
    old_file, approved = OLD/row['file'], SOURCE/row['source']
    assert sha(old_file)==sha(approved)==row['sha256'], row['file']
    old_checks.append({'file':row['file'],'sha256':row['sha256'],'sourceUnchanged':True})
    with Image.open(old_file) as im:
        if 'A' in im.getbands() and im.getchannel('A').getextrema()[0]<255:
            alpha.append(row['file'])
assert len(originals)==91 and len(alpha)==7
original_zip = OUT/'Evidence-Quest-Tripo-Reference-Pack.zip'
old_verification = json.loads((OUT/'package-verification.json').read_text('utf-8-sig'))
assert sha(original_zip)==old_verification['zipSha256']
coverage = {
'projection':['projection'],
'landing-marker':['landing-marker'],
'paper-bird':['paper-bird-body','paper-bird-wingtip','bird-repaired-guide'],
'lantern-flower':['lantern-flower-shoot','lantern-flower-bud','lantern-flower-bloom'],
'bridge-joint-detail':['bridge-connection-guide'],
'bird-repair':['bird-repaired-guide'],
'loop':['loop-complete','loop-body','loop-wheel'],
}
manifest = {
 'schema':'eq.reference-supplement.v1','date':'2026-09-17',
 'scope':'Fresh individual reference images and replacement renders only',
 'referenceApproval':'New images await human review; original 91 approved images remain unchanged.',
 'newTripoCredits':0,'recordedCumulativeTripoCredits':2140,'remainingRecordedCredits':360,
 'task19':'HALTED 1/75','assets':assets,
 'originalTransparencyAudit':{'count':7,'files':alpha,'freshReplacementCoverage':coverage},
 'unmodifiedOriginalImages':old_checks,
 'limitations':['Independent generated component references need scale, seam and pivot fitting during later model assembly.',
                'These images do not implement geometry, animation, interaction or game integration.']
}
dump(PACK/'manifest.json',manifest); payload.append(PACK/'manifest.json')
with (PACK/'Reference-Inventory.csv').open('w',encoding='utf-8-sig',newline='') as f:
    fields=['id','world','role','file','sha256','approvalStatus','instructions']
    w=csv.DictWriter(f,fields,extrasaction='ignore');w.writeheader();w.writerows(assets)
payload.append(PACK/'Reference-Inventory.csv')

intro = """
<h1>Individual reference supplement</h1>
<p class="lead">41 fresh renders. One part or state per upload image. Original references preserved.</p>
<div class="callout"><strong>Start here:</strong> unzip the package, review these fresh images, then upload only the individual PNGs in <code>BATCH-INPUTS</code> that you still need.
They use the P2 workflow from the original guide. There are no new HD building inputs in this supplement.</div>
<ol>
<li><strong>BATCH-INPUTS — 36 images:</strong> each file represents one part or growth/soil state. Generate each needed design once. Skip parts you already have in usable form.</li>
<li><strong>OPTIONAL-APPEARANCE-REFERENCES — 2 images:</strong> damp flour sack and recovered bread show changed appearance. Reuse the existing geometry with a texture/material change where feasible. These are not extra automatic batch jobs.</li>
<li><strong>ASSEMBLY-GUIDES-NOT-FOR-UPLOAD — 3 images:</strong> the bridge, repaired bird and complete Loop explain how parts belong together. Do not submit these assembled guides for generation.</li>
</ol>
<p>The projection screen, landing marker and paper bird have been freshly rendered. Fresh replacements also cover the other transparent/cutout-style references found in the original pack: the rooted flower, Loop and bridge/bird detail sheets. These files have solid neutral backgrounds; none was made by cropping or removing a background. The original ZIP and approved images are unchanged.</p>
<h2>What to do with the earlier state sheets</h2>
<table><thead><tr><th>Earlier sheet / grouped image</th><th>Use these individual inputs</th><th>Reuse and assembly</th></tr></thead><tbody>
<tr><td>Bread states</td><td>New underdone batch; recovered appearance reference</td><td>Original good bread remains usable. Recovery changes the irregular batch's baked appearance.</td></tr>
<tr><td>Bridge joint detail</td><td>Original separate section A, section B, bank-post and center-post masters; new straight rope and knot</td><td>Four bank posts, two center posts, two side ropes. Original rope coil remains reusable. The new full bridge image is a guide only.</td></tr>
<tr><td>Dough states</td><td>Original whole dough + new single portion</td><td>Reuse the portion four times. Smaller/larger divisions can use scale; do not generate a model per portion.</td></tr>
<tr><td>Flour states</td><td>Original dry sack + new damp appearance reference</td><td>Prefer one mesh with dry/damp materials. No new damp-sack generation is required if that is feasible.</td></tr>
<tr><td>Flower growth</td><td>Original separate seed + fresh shoot, bud and bloom</td><td>Align their rooted bases at one planting point. Do not generate the lineup.</td></tr>
<tr><td>Planting states</td><td>New stone rim + unprepared, hollow and covered soil inserts</td><td>Reuse the rim. Seed-in-hole is the hollow insert plus the original independent seed, not another bed model.</td></tr>
<tr><td>Roof tile states</td><td>Original intact tile + new cracked tile</td><td>The tile patch in the sheet is an assembly example. Fit replacement tiles to the roof later.</td></tr>
<tr><td>Story pictures</td><td>One new blank village card; one new blank Sparkfest card</td><td>The approved pictures are 2D face artwork. They are not nine separate 3D scenes. Reuse card backings for pictures and memory inserts.</td></tr>
</tbody></table>
<h2>Other separated parts</h2>
<ul>
<li><strong>Bird:</strong> body, missing wingtip and tape strip. The repaired whole bird is an assembly guide. The separate references do not guarantee identical torn edges after 3D generation; seam/contact alignment must be checked later.</li>
<li><strong>Tape:</strong> roll and applied strip are separate. Do not generate the old roll-and-tail grouping.</li>
<li><strong>Chest:</strong> empty base and lid are separate. Check their dimensions and hinge alignment during later assembly.</li>
<li><strong>Toolkit:</strong> empty container, hammer, empty pouch and one peg. Duplicate the peg as needed.</li>
<li><strong>Tableware:</strong> one plate, cup and spoon; reuse copies.</li>
<li><strong>Writing:</strong> separate holder and pencil in each world's materials. Duplicate pencils; no new generation for every pencil.</li>
<li><strong>Loop:</strong> body plus two instances of one wheel. The complete Loop image is a visual guide. Keep wheel axles movable; no humanoid rig.</li>
<li><strong>Storybook:</strong> empty open book. The miniature is assembled later from accepted village assets.</li>
<li><strong>Seed boat:</strong> the existing master already shows an empty usable cradle and can be used unchanged. The old guide's claim that the master includes cargo was inaccurate. Keep the existing separate seed independent.</li>
<li><strong>Bakery:</strong> the existing single-building master remains the building input. Its cutaway explains access and the roof opening; it is not a tray of objects to batch.</li>
</ul>
<h2>Scope and review</h2>
<p>All new images are review candidates. Previous approval of the original artwork remains recorded; it does not automatically approve these fresh renders. This package creates no 3D assets and spends no Tripo credits. Static rope, soil and dough references do not implement tying, digging or kneading. Compatible dimensions, pivots, contact and movement are checked during later modeling/integration.</p>
<p>Use the original pack for unchanged individual designs not repeated here. The thumbnails below link to the full-resolution PNGs. You may print this page as the single overall instruction document.</p>
<nav><a href="#batch">Batch inputs</a><a href="#optional">Optional appearances</a><a href="#guides">Assembly guides</a></nav>
"""
html=['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Evidence Quest — Individual references</title><style>',
'body{font:17px/1.55 system-ui,sans-serif;color:#243b39;background:#f4f0e6;max-width:1250px;margin:32px auto;padding:0 24px}h1{font-size:36px}h2{margin-top:42px}.lead{font-size:21px}.callout{background:#d9eee6;padding:20px;border-left:5px solid #28685b}code{overflow-wrap:anywhere}nav{display:flex;gap:20px;flex-wrap:wrap}a{color:#155a75}table{border-collapse:collapse;width:100%}td,th{border:1px solid #b6beb2;text-align:left;padding:12px;vertical-align:top}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}.card{background:white;border:1px solid #d2c9b5;border-radius:12px;padding:15px}.card img{width:100%;height:270px;object-fit:contain;background:#eeedeb}.card h3{margin:10px 0}.tag{font-size:13px;font-weight:bold;color:#28685b}.filename{font-size:12px;overflow-wrap:anywhere}.card p{font-size:15px}@media print{nav{display:none}.card{break-inside:avoid}.card img{height:180px}.grid{grid-template-columns:repeat(2,1fr)}}',
'</style></head><body>',intro]
for anchor,role,title in [('batch','BATCH-INPUTS','Batch inputs — individual parts'),
                          ('optional','OPTIONAL-APPEARANCE-REFERENCES','Optional appearance references — do not batch automatically'),
                          ('guides','ASSEMBLY-GUIDES-NOT-FOR-UPLOAD','Assembly guides — do not upload')]:
    html.append(f'<h2 id="{anchor}">{title}</h2><div class="grid">')
    for a in assets:
        if a['role']!=role:continue
        p=escape(a['file'],quote=True)
        html.append(f'<article class="card"><div class="tag">{a["world"]} · Fresh reference awaiting review</div><a href="{p}"><img src="{p}" alt="{escape(a["label"])}" loading="lazy"></a><h3>{escape(a["label"])}</h3><p>{escape(a["instructions"])}</p><p class="filename">{p}</p></article>')
    html.append('</div>')
html.append('<p>Manifest and CSV preserve file hashes, generation prompts, source references and individual instructions. Evidence Quest • 17 September 2026.</p></body></html>')
guide=PACK/'START-HERE.html';guide.write_text(''.join(html),encoding='utf-8');payload.append(guide)
class Links(HTMLParser):
    def __init__(self): super().__init__();self.files=[]
    def handle_starttag(self,tag,attrs):
        for k,v in attrs:
            if k in ('src','href') and v and not v.startswith('#'):self.files.append(v)
links=Links();links.feed(guide.read_text('utf-8'))
assert len(links.files)==82
assert all((PACK/p).is_file() for p in links.files)
# Preserve failed artwork separately, never in upload folders or the delivered ZIP.
history=OUT/'supplement-rejected-history';history.mkdir(exist_ok=True)
for i,r in enumerate(record.get('rejected',[])):
    p=Path(r['sourcePath'])
    if p.is_file():shutil.copy2(p,history/f'rejected-{i+1}-{p.name}')
archive=OUT/'Evidence-Quest-Individual-References-Supplement.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for p in payload:z.write(p,(Path(PACK.name)/p.relative_to(PACK)).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    for a in assets:
        assert hashlib.sha256(z.read(PACK.name+'/'+a['file'])).hexdigest()==a['sha256']
    assert len(z.namelist())==44
verification={
 'createdAt':datetime.now(timezone.utc).isoformat(),'freshImages':41,
 'batchInputs':36,'optionalAppearances':2,'assemblyGuides':3,
 'allPngsDecode':True,'allNewImagesOpaque':True,'allSourceCopiesByteIdentical':True,
 'all91OriginalSourceAndPackageHashesUnchanged':True,'originalZipUnchanged':True,
 'htmlImageInstances':41,'htmlLocalLinksChecked':82,'allHtmlLinksExist':True,
 'zipEntries':44,'zipCrc':'PASS','zipImageHashes':'PASS','zipBytes':archive.stat().st_size,
 'zipSha256':sha(archive),'newTripoCredits':0,
 'gameRegressionCommands':'NOT_RUN: reference-image packaging only; no game or character changes'
}
dump(OUT/'supplement-verification.json',verification)
print(json.dumps(verification,indent=2))

