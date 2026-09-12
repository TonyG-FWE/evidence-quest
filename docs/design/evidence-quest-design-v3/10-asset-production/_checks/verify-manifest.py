"""Validate Item10 design records. Standard library only; no game/runtime/network activity."""
import copy, hashlib, json, re, struct
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
ROOT = HERE.parent
M = json.loads((HERE / "asset-manifest.json").read_text(encoding="utf-8-sig"))
REG = json.loads((ROOT / "09-technical-contracts/REFERENCE-REGISTRY.json").read_text(encoding="utf-8-sig"))
TECH = json.loads((ROOT / "09-technical-contracts/technical-copy.json").read_text(encoding="utf-8-sig"))
RESULTS = []

def check(name, okay, detail):
    RESULTS.append({"id": name, "passed": bool(okay), "detail": detail})
def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest().upper()
def unique(xs):
    return len(xs) == len(set(xs))
def integrity(m):
    errors = []
    assets = {a["id"]: a for a in m["assets"]}
    for name, rows, key in [("asset", m["assets"], "id"), ("binding", m["bindings"], "id"), ("clip",m["clips"],"id"), ("sound",m["sounds"],"id"), ("state",m["stateCoverage"],"stateId"), ("transition",m["transitionCoverage"],"transitionId")]:
        if not unique([x[key] for x in rows]): errors.append("duplicate-"+name)
    if not unique([e["path"] for a in m["assets"] for e in a["exports"]]): errors.append("duplicate-export-path")
    variants = {v["id"] for a in m["assets"] for v in a["variants"]}
    bindings = {b["id"] for b in m["bindings"]}
    clips = {c["id"] for c in m["clips"]}
    for a in m["assets"]:
        if any(d not in assets for d in a["dependencies"]): errors.append("missing-dependency:"+a["id"])
        if any(b not in bindings for b in a["bindingIds"]): errors.append("missing-binding:"+a["id"])
        if any(e["variantId"] not in variants for e in a["exports"]): errors.append("missing-variant:"+a["id"])
        if any(c not in clips for c in a["clipIds"]): errors.append("missing-clip:"+a["id"])
    for b in m["bindings"]:
        if b["assetUse"]["manifestAssetId"] not in assets: errors.append("missing-asset-binding:"+b["id"])
    def visit(n, stack, done):
        if n in stack: errors.append("dependency-cycle:"+n); return
        if n in done or n not in assets: return
        for dep in assets[n]["dependencies"]: visit(dep, stack | {n}, done)
        done.add(n)
    done = set()
    for aid in assets: visit(aid, set(), done)
    return errors

errs = integrity(M)
check("unique-ids-references-and-dependency-dag", not errs, errs or "All asset/binding/variant/export/clip references resolve; dependency graph acyclic.")
for label, mutate, expected in [
    ("duplicate-asset", lambda x: x["assets"].append(copy.deepcopy(x["assets"][0])), "duplicate-asset"),
    ("missing-bound-asset", lambda x: x["bindings"][0]["assetUse"].update(manifestAssetId="ASSET.MISSING"), "missing-asset-binding"),
    ("dependency-cycle", lambda x: x["assets"][0]["dependencies"].append(x["assets"][0]["id"]), "dependency-cycle"),
]:
    test = copy.deepcopy(M); mutate(test); found = integrity(test)
    check("negative-control-"+label, any(expected in x for x in found), found[:3])
ct = set(REG["contentIds"] + REG["technicalContentIds"])
sr = set(REG["refs"])
allct = [x for a in M["assets"] for x in a["contentRefs"]] + [x for c in M["clips"] for x in c["captionRefs"]]
check("canonical-content-and-source-refs", set(allct) <= ct and all(set(a["sourceRefs"]) <= sr for a in M["assets"]), {"contentRefs":len(set(allct)),"sourceRefs":len({x for a in M["assets"] for x in a["sourceRefs"]})})
check("all-interface-states", {x["stateId"] for x in M["stateCoverage"]} == set(REG["uiStates"]+[s["id"] for s in TECH["states"]]), len(M["stateCoverage"]))
check("all-interface-transitions", {x["transitionId"] for x in M["transitionCoverage"]} == set(REG["transitions"]), len(M["transitionCoverage"]))
check("all-object-bindings", all(o["bindingIds"] and o["assetIds"] for o in M["objectCoverage"]), len(M["objectCoverage"]))
objectids = {o["ownerId"] for o in M["objectCoverage"]}
physical = (ROOT / "05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md").read_text(encoding="utf-8-sig")
required_objects = set(re.findall(r"\b(?:SC|ACT|ST|CY|WK|MD|KIT|PUP|MODEL|LOOP|ACC)\.[A-Z0-9_.]+", physical))
required_objects = {x for x in required_objects if not x.endswith('.') and x != 'ACC.EVIDENCE'}
required_objects.update('ACC.EVIDENCE.E'+str(i) for i in range(1,9))
required_objects.update(['ST.RAIL.B','ST.RAIL.C','ST.RAIL.D','TILE.FERRY','TILE.BRIDGE','TILE.PLANT','TILE.BLOOM'])
check("object-coverage-against-Item05", objectids == required_objects, {"required":len(required_objects),"missing":sorted(required_objects-objectids),"unexpected":sorted(objectids-required_objects)})
check("written-route-reference-integrity", all(set(r["ownerIds"]) <= objectids and set(r["stateIds"]) <= {s["stateId"] for s in M["stateCoverage"]} for r in M["routeChecks"]), {"writtenTraces":len(M["routeChecks"]),"execution":"not gameplay tested"})
check("all-assets-have-owner-bindings", all(a["bindingIds"] for a in M["assets"]), len(M["assets"]))
check("all-assets-queued", {a["id"] for a in M["assets"]} <= {a for q in M["productionQueue"] for a in q["assetIds"]}, "Every asset in at least one named production checkpoint; repeated QA is not a new commission.")
queue_seen=set()
queue_errors=[]
for q in M['productionQueue']:
    if not set(q['dependsOn']) <= queue_seen: queue_errors.append(q['id'])
    if not set(q['assetIds']) <= {a['id'] for a in M['assets']}: queue_errors.append(q['id']+':assets')
    queue_seen.add(q['id'])
check('production-queue-dependencies', not queue_errors, {'errors':queue_errors,'estimatedHours':[sum(q['effortHours'][i] for q in M['productionQueue']) for i in (0,1)]})
for group in M["budget"]["groups"]:
    assets = [a for a in M["assets"] if a["loadGroup"] == group["group"]]
    for density, label in [(1, "Base"), (2, "High")]:
        actual = 0
        for a in assets:
            seen = set()
            for e in a["exports"]:
                if e["density"] == density and e["width"] is not None and e["variantId"] not in seen:
                    actual += e["width"]*e["height"]*4; seen.add(e["variantId"])
        check("decoded-"+group["group"]+"-"+label.lower(), actual == group["decoded"+label+"Bytes"], actual)
        cap = sum(a["budget"][label.lower()+"TransferCapBytes"] for a in assets)
        check("transfer-allocation-"+group["group"]+"-"+label.lower(), cap == group["transferCap"+label+"Bytes"], cap)
b = M["budget"]; d = b["decoded"]; mib=1048576
check("transfer-target-arithmetic", b["initialTransferAllocationBytes"] == (1024+1536+768+384)*1024 and b["initialTransferAllocationBytes"] <= b["targets"]["initialTransferBytes"] and all(g["transferCapHighBytes"] <= b["targets"]["roomBundleTransferBytes"] for g in b["groups"] if g["group"].startswith("room-")), "3.625MiB initial allocation, each high-density room bundle2.75MiB; encoded bytes unmeasured.")
g = {x["group"]:x for x in b["groups"]}
calc_high = d["largestRoomHighBytes"]+g["shared"]["decodedHighBytes"]+g["puppet"]["decodedHighBytes"]+d["e2HighActiveBytes"]+d["canvasHighBytes"]+d["projectionScratchHighBytes"]+d["audioBytes"]+d["reserveBytes"]
calc_base = d["largestRoomBaseBytes"]+g["shared"]["decodedBaseBytes"]+g["puppet"]["decodedBaseBytes"]+g["e2-on-demand"]["decodedBaseBytes"]+d["canvasBaseBytes"]+d["projectionScratchBaseBytes"]+d["audioBytes"]+d["reserveBytes"]
check("current-and-cache-peak-arithmetic", calc_base==d["steadyBaseBytes"] and calc_high==d["steadyHighBytes"] and calc_high+d["densitySwapOverlapBytes"]==d["peakHighWithSwapBytes"] and d["peakHighWithSwapBytes"]<=b["targets"]["currentDecodedBytes"] and d["conservativeCachePeakBytes"]==d["peakHighWithSwapBytes"]+d["adjacentBaseMaximumBytes"]+g["e2-on-demand"]["decodedBaseBytes"] and d["conservativeCachePeakBytes"]<=b["targets"]["cacheBytes"], {"baseMiB":calc_base/mib,"highMiB":calc_high/mib,"swapPeakMiB":d["peakHighWithSwapBytes"]/mib,"cacheMiB":d["conservativeCachePeakBytes"]/mib,"measured":False})
exports = [e for a in M["assets"] for e in a["exports"]]
frame_errors=[]
for a in M["assets"]:
    if a["representation"]!="raster": continue
    for v in a["variants"]:
        es=[e for e in a["exports"] if e["variantId"]==v["id"]]
        for e in es:
            if e["width"]!=e["frameWidth"]*e["columns"] or e["height"]!=e["frameHeight"]*e["rows"] or e["columns"]*e["rows"]<v["frames"]: frame_errors.append(e["id"])
        lo=next(e for e in es if e["density"]==1); hi=next(e for e in es if e["density"]==2)
        if hi["width"]!=2*lo["width"] or hi["height"]!=2*lo["height"]: frame_errors.append(v["id"])
check("export-geometry-and-density", not frame_errors, frame_errors or "139 painted cels pack into123 raster variants with exact2x alternatives; padding charged to decode budget.")
check("planned-files-not-falsely-ready", all(not e["exists"] and e["actualBytes"] is None and e["sha256"] is None for e in exports) and all(not p["availability"]["productionFileExists"] and not p["availability"]["exportChecked"] and not p["availability"]["runtimeChecked"] for p in M["profiles"].values()), {"plannedExports":len(exports),"productionExportsCreated":0})
reference_errors=[]
for r in M["references"]:
    path=ROOT/r["path"]
    if not path.is_file(): reference_errors.append(r["path"]+":missing"); continue
    data=path.read_bytes()
    if data[:8]!=b"\x89PNG\r\n\x1a\n": reference_errors.append(r["path"]+":PNG"); continue
    wh=struct.unpack(">II",data[16:24])
    if len(data)!=r["actualBytes"] or sha(path)!=r["sha256"] or wh!=(r["width"],r["height"]): reference_errors.append(r["path"]+":metadata")
check("existing-reference-files", not reference_errors, {"checked":len(M["references"]),"visuallyInspectedThisTask":sum(r["visuallyInspectedThisTask"] for r in M["references"]),"errors":reference_errors,"limit":"Header/hash metadata is not production export or visual qualification."})
referenced={p for a in M["assets"] for p in a["appearanceRefs"]+a["functionalRefs"]}
referenced|={p for s in M["stateCoverage"] for p in s["functionalRefs"]}
referenced|={p for s in M["transitionCoverage"] for p in s["functionalRefs"]}
check("all-reference-paths-registered", referenced <= {r["path"] for r in M["references"]}, sorted(referenced-{r["path"] for r in M["references"]}))
changed=[]
for src in M["inputEvidence"]:
    if src["path"]=="EVIDENCE-QUEST-MASTER-CHECKLIST.md": continue
    if sha(ROOT/src["path"])!=src["sha256"]: changed.append(src["path"])
check("authoritative-input-preservation", not changed, {"checked":len(M["inputEvidence"])-1,"changed":changed,"checklist":"Intentionally updated only after completion; earlier/later sections compared separately."})
calc_counts={
 "uniqueAssets":len(M["assets"]),"rasterAssets":sum(a["representation"]=="raster" for a in M["assets"]),"nativeAssets":sum(a["representation"]=="native" for a in M["assets"]),"audioAssets":len(M["sounds"]),
 "variants":sum(len(a["variants"]) for a in M["assets"]),"paintedCels":sum(v["frames"] for a in M["assets"] if a["representation"]=="raster" for v in a["variants"]),
 "plannedExportFiles":len(exports),"animationClips":len(M["clips"]),"audioClips":len(M["sounds"]),"bindings":len(M["bindings"]),"objects":len(M["objectCoverage"]),"uiStates":len(M["stateCoverage"]),"transitions":len(M["transitionCoverage"]),
 "references":len(M["references"]),"inspectedReferenceImages":sum(r["visuallyInspectedThisTask"] for r in M["references"])
}
check("inventory-counts", all(M["counts"][k]==v for k,v in calc_counts.items()), calc_counts)
schemas=json.loads((HERE/"schema-check-results.json").read_text(encoding="utf-8-sig"))
check("schema-checks", schemas["passed"], {"checks":len(schemas["results"]),"engine":schemas["engine"],"artifact":"schema-check-results.json"})
report={
 "scope":"Executed document/schema/reference/arithmetic checks and written design traces only.",
 "executedAt":datetime.now(timezone.utc).isoformat(),"manifestSha256":sha(HERE/"asset-manifest.json"),"schemaSha256":sha(HERE/"asset-manifest.schema.json"),
 "passed":all(r["passed"] for r in RESULTS),"results":RESULTS,"counts":M["counts"],"budget":M["budget"]["decoded"],
 "writtenStateAndRouteChecks":{"count":len(M["routeChecks"]),"status":"authored and reviewed as design traces; not executed game tests"},
 "notPerformed":["production image/audio generation or editing","production export/alpha/pose inspection","runtime integration/browser/keyboard/touch test","actual compression/decode/load/framerate measurement","user or child playtest","educational effect evaluation","new outside-material rights verification; no outside material proposed"],
 "limits":"Passing records do not prove a game exists, is attractive at runtime, enjoyable, accessible in a tested browser, or educationally effective."
}
(HERE/"validation-report.json").write_text(json.dumps(report,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"passed":report["passed"],"checks":len(RESULTS),"failed":[r for r in RESULTS if not r["passed"]]},indent=2))
if not report["passed"]: raise SystemExit(1)
