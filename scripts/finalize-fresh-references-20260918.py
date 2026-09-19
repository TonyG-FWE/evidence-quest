"""Copy ten fresh PNG references without resizing, editing, or making an archive."""
from pathlib import Path
import hashlib, json, shutil
from html import escape
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'output/tripo-reference-batches-20260917'
generation=json.loads((BASE/'fresh-renders-20260918-generation.json').read_text('utf-8'))
baseline=json.loads((BASE/'fresh-renders-20260918-source-hashes.json').read_text('utf-8-sig'))
inputs=json.loads((BASE/'fresh-renders-20260918-inputs.json').read_text('utf-8'))
source_by_id={s['id']:s for s in inputs['specs']}
OUT=Path(generation['out'])
assert OUT.resolve().is_relative_to(BASE.resolve())
OUT.mkdir(parents=True,exist_ok=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assets=[]
for r in generation['renders']:
    src=Path(r['sourcePath'])
    target=OUT/r['name']
    if target.exists():assert sha(target)==sha(src), f'Refusing to replace different file: {target}'
    else:shutil.copy2(src,target)
    with Image.open(target) as image:
        image.load()
        assert image.format=='PNG'
        assert 'A' not in image.getbands() or image.getchannel('A').getextrema()==(255,255)
        size=list(image.size)
    original=Path(source_by_id[r['id']]['source'])
    assert sha(target)==sha(src)
    assert sha(target)!=sha(original)
    assets.append({
        'id':r['id'],'file':r['name'],'world':r['world'],'role':r['role'],
        'sha256':sha(target),'bytes':target.stat().st_size,'dimensions':size,
        'referenceSource':str(original),'referenceSha256':sha(original),
        'generatedSource':str(src),'prompt':r['prompt'],
        'approvalStatus':'fresh-reference-awaiting-human-review',
    })
assert len(assets)==10
for s in baseline:assert sha(Path(s['path']))==s['sha256'],s['id']
assert len(list(OUT.glob('*.png')))==10
record_dir=OUT/'_records';record_dir.mkdir(exist_ok=True)
manifest={
    'date':'2026-09-18','scope':'Ten requested fresh reference PNG renders only',
    'generator':'image_gen.imagegen (built-in)',
    'process':'Fresh rendering from supplied design references. Original output bytes preserved; no local cropping, background removal, scaling or re-encoding.',
    'zipCreated':False,'newTripoCredits':0,'assets':assets,
}
(record_dir/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
notes={
'river-shore':'Shore/water assembly reference. Water must remain separate when building the playable scene.',
'storybook':'Assembled book and miniature reference. Use the separate empty book from the preceding supplement when generating individual parts.',
'studio-context':'Context view only. Do not batch-generate Jo, Loop and the furnished stage as one fused object.',
'studio-stage':'Empty stage reference. Keep the projection surface separate for runtime use if already generated separately.',
}
html=['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fresh reference renders — 18 September</title><style>body{font:17px/1.5 system-ui,sans-serif;max-width:1200px;margin:30px auto;padding:0 24px;color:#263d38;background:#f6f2e9}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}article{padding:16px;border:1px solid #c8c2b5;border-radius:12px;background:white}img{width:100%;height:330px;object-fit:contain;background:#eee}a{color:#175c69}h2{font-size:19px;overflow-wrap:anywhere}.meta{font-size:14px;color:#53665c}p{max-width:950px}</style></head><body><h1>Ten fresh reference renders</h1><p>Each full-resolution PNG is saved directly in this folder. Click a thumbnail to open it. These are fresh renders of the supplied designs; original references remain unchanged. New renders await your image review.</p><p>The furnished studio is context only. The storybook shows the assembled miniature. Use separate component inputs for those assemblies, as described in the preceding supplement.</p><div class="grid">']
for a in assets:
    name=escape(a['file'],quote=True)
    html.append(f'<article><a href="{name}"><img src="{name}" alt="{escape(a["id"])}"></a><h2><a href="{name}">{name}</a></h2><p class="meta">{escape(a["world"])} · {a["dimensions"][0]} × {a["dimensions"][1]} PNG</p><p>{escape(notes.get(a["id"],"One fresh asset reference, complete silhouette on a clean neutral background."))}</p></article>')
html.append('</div><p>Built-in image generation. Exact prompts, source and output hashes: <a href="_records/manifest.json">manifest</a>. No ZIP or Tripo spending.</p></body></html>')
(OUT/'index.html').write_text(''.join(html),encoding='utf-8')
(OUT/'README.txt').write_text('Ten fresh PNG reference renders — 18 September 2026\n\nAll ten PNG files are directly in this folder. Open index.html for thumbnails.\nThe previous reference packs and approved original files are unchanged.\nNo ZIP was created. No Tripo calls or credits were used.\n\nStudio-context is a context image only, not a single-model batch input.\nStorybook shows the assembled miniature; the previous supplement has the empty book input.\nRiver-shore illustrates both bank and water; these need separate parts in the actual game.\n\nThese are fresh image-review candidates. Exact prompts and hashes are in _records/manifest.json.\n',encoding='utf-8')
verification={
    'images':10,'pngDecode':'PASS 10/10','newImagesOpaque':'PASS 10/10',
    'sourceOutputByteIntegrity':'PASS 10/10','allTenOriginalsUnchanged':True,
    'allTenRendersDifferFromOriginalBytes':True,'zipCreated':False,
    'newTripoCredits':0,'dimensions':{a['file']:a['dimensions'] for a in assets},
}
(record_dir/'verification.json').write_text(json.dumps(verification,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'folder':str(OUT),'verifiedImages':10,'totalPngBytes':sum(a['bytes'] for a in assets),'originalsUnchanged':True,'zipCreated':False},indent=2))

