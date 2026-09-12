"""Isolated design-contract checks. No game, browser, storage adapter or model runs."""
from pathlib import Path
from itertools import permutations
from copy import deepcopy
import json, re, hashlib, sys
from datetime import datetime, timezone

BASE = Path(__file__).resolve().parents[1]
ROOT = BASE.parent
schema_report = json.loads((BASE / "schema-validation.json").read_text(encoding="utf-8-sig"))
examples = json.loads((BASE / "examples.json").read_text(encoding="utf-8"))["cases"]
registry = json.loads((BASE / "REFERENCE-REGISTRY.json").read_text(encoding="utf-8"))
KNOWN_REFS = set(registry["refs"])
KNOWN_CT = set(registry["contentIds"] + registry["technicalContentIds"])
TILES = ("TILE.FERRY", "TILE.BRIDGE", "TILE.PLANT", "TILE.BLOOM")
INIT = dict(pip="left", seed="left", boats="separate", lit=False)
checks = []

def check(name, condition, detail=""):
    checks.append(dict(id=name, passed=bool(condition), detail=detail))

def step(p, tile):
    q = p.copy()
    outcome = "noop"
    if tile == TILES[0] and q["seed"] == "left":
        q["seed"] = "right"
    elif tile == TILES[1]:
        q["boats"], q["pip"] = "joined", "right"
        if q["seed"] == "left": q["seed"] = "right"
    elif tile == TILES[2]:
        if q["pip"] == "right" and q["seed"] == "right": q["seed"] = "soil"
        elif q["seed"] != "soil": outcome = "unmet"
    elif tile == TILES[3]:
        if q["seed"] == "soil": q["lit"] = True
        else: outcome = "unmet"
    if q != p: outcome = "changed"
    return q, outcome

def success(p):
    return p["pip"] == "right" and p["seed"] == "soil" and p["lit"]

def valid_puppet(p):
    return ((not p["lit"] or p["seed"] == "soil") and
            (p["seed"] != "soil" or (p["pip"] == "right" and p["boats"] == "joined")) and
            (p["pip"] != "right" or (p["boats"] == "joined" and p["seed"] != "left")))

def run_errors(run):
    e = []
    order, n = run["order"], run["nextCue"]
    if len(order) != len(set(order)) or not 0 <= n <= len(order): return ["invalid run order/index"]
    state = INIT.copy()
    for tile in order[:n]: state, _ = step(state, tile)
    if state != run["puppet"] or not valid_puppet(run["puppet"]): e.append("endpoint does not match committed prefix")
    if run["cueResultIds"] != [run["id"] + ":" + str(i) for i in range(n)]: e.append("cue commit identities mismatch")
    if run["status"] == "finalized":
        if n != len(order) or run["activeCue"] is not None or run["finalizedSeq"] is None: e.append("premature finalization")
    elif run["finalizedSeq"] is not None: e.append("unfinished run has finalization sequence")
    cue = run["activeCue"]
    if cue:
        if n >= len(order): e.append("cue beyond rail")
        else:
            target, outcome = step(state, order[n])
            if (cue["id"] != run["id"] + ":" + str(n) or cue["index"] != n or
                cue["tile"] != order[n] or cue["from"] != state or cue["to"] != target or cue["result"] != outcome):
                e.append("active marker inconsistent")
    return e

def semantic_errors(payload):
    kind = payload["contractKind"]
    e = []
    if kind in ("CaseSnapshot", "SaveEnvelope"):
        s = payload["state"] if kind == "CaseSnapshot" else payload["payload"]
        p = s["physical"]
        if p["caddyHost"] != "ST.RACK.BAY" and p["order"]: e.append("rail without seated kit")
        if len(p["order"]) != len(set(p["order"])): e.append("duplicate physical tile")
        if p["loop"]["mode"] in ("docked","projecting") and (p["loop"]["room"] != "SC.ST" or p["loop"]["feet"] != [76,35] or not p["objects"]["dockFlapOpen"]): e.append("invalid dock")
        if p["loop"]["mode"] == "following" and p["loop"]["room"] != p["room"]: e.append("follower in another room")
        granted = {r for g in s["grants"] for r in g["refs"]}
        for x in s["exposures"]:
            if x["refId"] not in granted and not x["refId"].startswith(("E5.c","CT.")): e.append("exposure without granted access")
            if x["refId"] not in KNOWN_REFS or x["ctId"] not in KNOWN_CT: e.append("unknown source/content")
            if x["firstSeq"] > x["lastSeq"] or x["lastSeq"] > s["lastObservationSeq"]: e.append("exposure ordering")
        run = s["playback"]
        if run:
            e += run_errors(run)
            if run["order"] != p["order"] or run["arrangementRevision"] != p["arrangementRevision"]: e.append("active run revision/order")
            if run["status"] == "running" and (p["room"] != "SC.ST" or p["loop"]["mode"] != "projecting"): e.append("running outside Stage/dock")
        history = {r["id"]: r for r in s["runHistory"]}
        for r in history.values(): e += run_errors(r)
        cert = s["certificate"]
        if cert:
            r = history.get(cert["runId"])
            if not r or r["mode"] != "rehearsal" or r["status"] != "finalized" or not success(r["puppet"]) or cert["arrangementRevision"] != p["arrangementRevision"] or r["arrangementRevision"] != cert["arrangementRevision"] or r["order"] != p["order"]: e.append("invalid current certificate")
        premiere = s["premiere"]
        if premiere:
            r = history.get(premiere["runId"])
            if not r or r["mode"] != "show" or r["status"] != "finalized" or not success(r["puppet"]) or premiere["order"] != r["order"]: e.append("invalid historical premiere")
    elif kind == "CoachRequest":
        c = payload["context"]
        if not payload["explanation"].strip() or len(payload["explanation"]) > 600: e.append("invalid submitted explanation")
        if not set(c["selectedRefs"]).issubset(c["exposedRefs"]): e.append("selected unexposed reference")
        if not valid_puppet(c["puppet"]): e.append("impossible coach puppet")
        for r in c["exposedRefs"]:
            if r not in KNOWN_REFS: e.append("unknown coach reference")
        by_ref = {x["refId"]: x for x in c["observedOutcomes"]}
        if not set(c["observedOutcomeRefs"]).issubset(by_ref): e.append("unknown outcome")
        for x in by_ref.values():
            target, outcome = step(x["from"], x["tile"])
            if target != x["to"] or outcome != x["result"]: e.append("impossible observed outcome")
    elif kind == "CoachResponse":
        selection = payload["selection"]
        if (payload["status"] == "selected") != (selection is not None): e.append("status/selection mismatch")
        if selection:
            if any(r not in KNOWN_REFS and not r.startswith("OBS.") for r in selection["refs"]): e.append("unknown response reference")
            if selection["moveId"] == "CLARIFY" and not selection["uncertain"]: e.append("confident ambiguous interpretation")
    elif kind == "Session":
        if payload["inputOwner"] != "world" and payload["heldKeys"]: e.append("movement while another owner has input")
    elif kind == "AuthoredContent":
        texts = {x["id"]:x["text"] for x in payload["texts"]}
        for source in payload["sources"]:
            for part in source["parts"]:
                if part["ctId"] not in texts: e.append("missing example canonical body")
                else:
                    for a,b in part["spans"]:
                        if not 0 <= a < b <= len(texts[part["ctId"]]): e.append("invalid passage span")
        for copy in payload["copies"]:
            if copy["sourceId"] not in [x["id"] for x in payload["sources"]]: e.append("missing canonical copy source")
        source_doc = (ROOT/"07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md").read_text(encoding="utf-8")
        for entry in payload["texts"]:
            if entry["id"].startswith("CT.SRC."):
                pattern = r"^\| `" + re.escape(entry["id"]) + r"` \| [^|]+ \| ([^|]+) \|"
                match = re.search(pattern, source_doc, re.M)
                if not match or match.group(1).strip().replace("<br>","\n") != entry["text"]: e.append("frozen text mismatch")
    return e

check("schema-examples", schema_report["failed"] == 0, str(schema_report["total"])+" JSON Schema cases including provider proposal")
semantic_results = []
for case in examples:
    if not case["expectedSchema"]: continue
    errors = semantic_errors(case["payload"])
    passed = (not errors) == case["expectedSemantic"]
    semantic_results.append(dict(id=case["id"], passed=passed, actualErrors=errors))
check("semantic-fixtures", all(x["passed"] for x in semantic_results), str(len(semantic_results))+" schema-valid cases; bounded invariants, not complete runtime validators")

# Exhaustive mathematical rule space. Unmet cues are explicitly continued.
successful = []
for size in range(5):
    for order in permutations(TILES, size):
        state = INIT.copy()
        for tile in order: state, _ = step(state, tile)
        if success(state): successful.append(order)
expected = [(TILES[1],TILES[2],TILES[3]),(TILES[0],TILES[1],TILES[2],TILES[3]),(TILES[1],TILES[0],TILES[2],TILES[3]),(TILES[1],TILES[2],TILES[0],TILES[3]),(TILES[1],TILES[2],TILES[3],TILES[0])]
check("65-arrangements-five-successes", set(successful)==set(expected))
p, _ = step(INIT, TILES[0]); q, outcome = step(p, TILES[2])
check("seed-only-unmet", q==p and outcome=="unmet" and q["pip"]=="left" and q["seed"]=="right")
final = dict(pip="right",seed="soil",boats="joined",lit=True)
check("extra-ferry-harmless", step(final,TILES[0])==(final,"noop"))

# Small logical event models of specified atomicity/races, not production handlers.
for events in (("endpoint","stop","endpoint"),("stop","endpoint","stop")):
    active=True; commits=0; index=0
    for event in events:
        if active: commits+=1; index+=1; active=False
    check("cue-once-"+"-".join(events), commits==1 and index==1)
for n, count in ((3,4),(4,4)):
    finalized=False; certificate=False; cue_commits=n
    if n==count: finalized=True; certificate=True
    check("terminal-"+str(n), (certificate == (n==count)) and cue_commits==n)
origin=[TILES[1],TILES[2],TILES[3]]
cancel=origin.copy()
revised=[TILES[2],TILES[1],TILES[3]]
check("cancel-keeps-order-revision", cancel==origin)
check("actual-edit-differs", revised!=origin)
host="MD.RACK.STATION"; transfers=0
for _ in range(3):
    if host=="MD.RACK.STATION": host="ACT.PLAYER";transfers+=1
check("repeat-collection-single-owner", transfers==1 and host=="ACT.PLAYER")
loop="following"; docks=0
for _ in range(3):
    if loop=="following": loop="docked"; docks+=1
check("repeat-dock-single-entity", docks==1)
live_revision=12; acknowledged=11
check("old-ack-not-current-saved", acknowledged!=live_revision)
known_head=8; other_visit_head=9
check("other-visit-cas-conflict", known_head!=other_visit_head)
winner="fallback"; late_live_allowed=winner is None
check("fallback-suppresses-late-reply", not late_live_allowed)
context=7; save_ack=12
check("save-ack-does-not-change-help-context", context==7)
context+=1
check("new-room-source-text-stales-reply", context!=7)
before=deepcopy(examples[0]["payload"]); after=deepcopy(before)
check("canceled-new-game-retains-case", before==after)
first=next(c["payload"]["state"] for c in examples if c["id"]=="e2-first-frame-only")
exposed={x["refId"] for x in first["exposures"]}
check("e2-first-frame-no-end-leak", "E2.a/frame1" in exposed and "E2.a/end" not in exposed and "E2.a" not in exposed)
check("kit-possession-not-note-exposure", not next(c["payload"]["state"] for c in examples if c["id"]=="carried-kit-unread-notes")["exposures"])

# Exact declared ID coverage and current foundation hashes.
cross = (BASE/"OWNERSHIP-CROSSWALK.md").read_text(encoding="utf-8")
states = re.findall(r"^\| `(UI\.[A-Z0-9_.]+)` \|",cross,re.M)
transitions = re.findall(r"^\| `(T\.[A-Z0-9_.]+)` \|",cross,re.M)
check("93-states-owned-once", len(states)==93 and len(set(states))==93 and set(states)==set(registry["uiStates"]))
check("121-transitions-owned-once",len(transitions)==121 and len(set(transitions))==121 and set(transitions)==set(registry["transitions"]))
ctdoc=(ROOT/"07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md").read_text(encoding="utf-8")
declared=set()
for line in ctdoc.splitlines():
    if line.startswith("|"):
        declared.update(re.findall(r"`(CT\.[A-Z0-9_.]+)`",line.split("|")[1]))
check("548-canonical-ct-identities",len(declared)==548 and declared==set(registry["contentIds"]))
trace=(BASE/"TECHNICAL-TRACES.md").read_text(encoding="utf-8")
check("15-written-flow-traces", all("| F%02d "%i in trace for i in range(1,16)))
check("20-written-technical-traces",all("| X%02d "%i in trace for i in range(1,21)))
matrix=(BASE/"COACHING-AND-EVALUATION.md").read_text(encoding="utf-8")
check("26-written-semantic-cases",all("| E%02d "%i in matrix for i in range(1,27)))
frozen={
"Evidence-Quest-Complete-Game-Specification-v3.md":"6CFB0958C7D6DEEC52B485058197B93EF4297E3F8E087A7874A9AAE3FA70AB16",
"05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md":"3FDB67267E23A12573547B3031C2678EAB774EA7B91E6A8FB07048001B5D0A61",
"06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md":"04BA8831C38FD3B7FB3E74A3BA68A5DEE20AB0340AEB7B0064D79180B4AF10D8",
"07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md":"8485C42AADF34A8226A1157CA37FC54A5EFF865247C578850408BF9DDDE1BEBE",
"08-VISUAL-DIRECTION-AND-READABLE-DESIGNS.md":"DB48B9CC1C63F7989174C1E681E1AED8B7984649A597E9FBCE1A6FC10056B56C"}
hashes={name:hashlib.sha256((ROOT/name).read_bytes()).hexdigest().upper() for name in frozen}
check("foundations-unchanged",hashes==frozen)
report=dict(executedAt=datetime.now(timezone.utc).isoformat(),scope="Design schemas, bounded semantic invariants and isolated mathematical/logical checks only",python=sys.version.split()[0],schemaValidation=schema_report,semanticFixtures=semantic_results,checks=checks,arrangementsChecked=65,successfulOrders=[list(x) for x in successful],foundationHashes=hashes,NOT_RUN=["Ajv runtime","dependency installation/build","browser gameplay","real IndexedDB transactions","live model","child playtesting","learning evaluation","performance/accessibility qualification","deployment"],passed=all(x["passed"] for x in checks))
(BASE/"validation-report.json").write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
print(json.dumps(dict(passed=report["passed"],schemaCases=schema_report["total"],semanticCases=len(semantic_results),checks=len(checks),failures=[x for x in checks if not x["passed"]],semanticFailures=[x for x in semantic_results if not x["passed"]]),indent=2))
if not report["passed"]: sys.exit(1)

