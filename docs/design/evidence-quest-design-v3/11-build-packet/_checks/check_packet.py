"""Item11 document checker and derived-view generator. Not game/runtime code."""
import argparse, copy, hashlib, json, re, sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
OUT=Path(__file__).resolve().parents[1]
ROOT=OUT.parent
def read(p): return json.loads(p.read_text(encoding="utf-8-sig"))
def write(p,x): p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def total(tasks, ids=None):
    a=[t for t in tasks if ids is None or t["id"] in ids]
    return [sum(t["historicalEffortHours"][i] for t in a) for i in (0,1)]
def dag(tasks):
    table={t["id"]:t for t in tasks}
    if len(table)!=len(tasks): raise ValueError("duplicate task")
    done=set(); order=[]
    while len(done)<len(tasks):
        ready=[t["id"] for t in tasks if t["id"] not in done and set(t["dependsOn"])<=done]
        if not ready: raise ValueError("cycle or unknown dependency")
        for i in ready: done.add(i); order.append(i)
    return order
def recalc(p):
    tasks=p["tasks"]; s=p["schedule"]
    predicates={
        "required":lambda t:not t["optional"],
        "temporaryAssets":lambda t:t["category"]=="temporary-assets",
        "finalIllustration":lambda t:t["category"]=="final-art",
        "optionalAudio":lambda t:t["category"]=="optional-audio",
        "optionalDecoration":lambda t:t["category"]=="optional-polish",
        "otherRequired":lambda t:not t["optional"] and t["category"] not in ("temporary-assets","final-art"),
        "protectedRepair":lambda t:t["id"]=="TASK11.23",
        "recording":lambda t:t["id"]=="TASK11.24",
        "delivery":lambda t:t["id"]=="TASK11.25",
        "deliveryContingency":lambda t:t["id"]=="TASK11.26"}
    s["historicalScenario"]["totals"]={key:total([t for t in tasks if pred(t)]) for key,pred in predicates.items()}
    s["historicalScenario"]["totals"]["withOptional"]=total(tasks)
    connected=next(m for m in p["milestones"] if m["id"]=="M11.CONNECTED")["taskIds"]
    s["historicalScenario"]["firstConnectedIncludingReadinessHours"]=total(tasks,connected)
    s["historicalScenario"]["firstConnectedAfterReadinessHours"]=total(tasks,[x for x in connected if x!="TASK11.00"])
    deadline=datetime.fromisoformat(s["deadline"]["utc"].replace("Z","+00:00"))
    anchor=datetime.fromisoformat(s["verifiedAtUtc"].replace("Z","+00:00"))
    s["remainingSeconds"]=(deadline-anchor).total_seconds()
    s["forecast"]["milestones"]={m["id"]:{"status":m["status"],"forecastFinish":None,"remainingElapsedHours":None} for m in p["milestones"]}
    kinds={"owners":["CHECK11.CONTENT","CHECK11.HARDENING"],"states":["CHECK11.HARDENING"],"transitions":["CHECK11.HARDENING"],"content":["CHECK11.CONTENT"],"sourceRefs":["CHECK11.EXPOSURE"],"introducedFacts":["CHECK11.A09"],"assets":["CHECK11.VISUAL"],"contracts":["CHECK11.TECH"]}
    table={t["id"]:t for t in tasks}; optional=set(table["TASK11.ART08"]["assets"]["assetIds"])
    for kind,checks in kinds.items():
        for row in p["coverage"][kind]:row["checkIds"]=["CHECK11.OPTIONAL"] if kind=="assets" and row["id"] in optional else checks

def shortfixtures(ids):
    orders=[x for x in ids if x.startswith("FIX11.ORDER.")]
    rest=[x for x in ids if x not in orders]
    return ", ".join(rest+([f"FIX11.ORDER.00–64 ({len(orders)} explicit orders)"] if orders else []))
def readable(text):
    text=re.sub(r"\b(September|October|Item)(?=\d)",r"\1 ",text)
    text=re.sub(r"\b(all|All|the|The|with|including|plus|and|or|at|within|for|only|Only|Every|every|these|These)(?=\d)",r"\1 ",text)
    text=re.sub(r"\b(\d+)(?=(?:hours|hour|minutes|minute|seconds|second|days|day)\b)",r"\1 ",text)
    return text.replace("practiced2D","practiced 2D")
def crosswalk(p):
    lines=["# Item11 — requirement-to-build crosswalk","","> Derived from [implementation-plan.json](implementation-plan.json). Edit task/requirement assignments there and rerun the packet checker with --derive; do not edit this table as a second source of truth.","",
    "All52 existing N/L/G/P/R/A/X/H/D IDs remain v3 §15 acceptance requirements. REQ11, TASK11, CHECK11, FIX11 and M11 are new handoff IDs, not new game entities. All checks are future acceptance, not runtime passes.","",
    "| Requirement | Required behavior / pass condition | Implementation owner(s) | Check | Concrete fixtures |","|---|---|---|---|---|"]
    for r in p["requirements"]:
        lines.append("| "+ " | ".join([r["id"],r["passCondition"].replace("|","/"),", ".join(r["taskIds"]),r["checkId"],shortfixtures(r["fixtureIds"])])+" |")
    lines+=["","## Every existing reference has an owner","","Exact per-ID assignments are in implementation-plan.json → coverage; task.references is the reverse index. These are ID/ownership mappings, not copied source words or replacement geometry.","","| Reference family | Count | Canonical membership / behavioral authority |","|---|---:|---|"]
    refs={"owners":"Item05 / Item10 objectCoverage","states":"93 Item06 states +3 Item09 technical states; Item10 stateCoverage","transitions":"121 named Item06 transitions / Item10 transitionCoverage","content":"548 Item07 CT entries +5 technical-copy entries","sourceRefs":"Item09 REFERENCE-REGISTRY refs; Item07 text/spans","introducedFacts":"Item09 introducedFacts; Item07 explicit-direct-help receipts","assets":"Item10 individual assets and binding owners","contracts":"Seven public roots + internal ModelProposal in Item09 schema"}
    for k,desc in refs.items(): lines.append(f"| {k} | {len(p['coverage'][k])} | {desc} |")
    lines+=["","All157 asset bindings,246 variants,28 animation clips and6 sounds remain individually defined in Item10. Each asset is assigned to its preparation/production/integration owners through the plan and unchanged manifest; exports are not manufactured by this table.","",
    "## Bounded tasks and acceptance evidence","","The plan owns scope, dependencies and acceptance. Hours below are historical unmeasured allowances only; current human/AI/asset/test/wait/total durations are uncalibrated in tasks[*].estimate. They do not predict elapsed time or deadline feasibility.","",
    "| Task | Output | Depends on | Historical allowance only | Evidence/check entry |","|---|---|---|---:|---|"]
    for t in p["tasks"]:
        lines.append(f"| {t['id']} | {t['title']} | {', '.join(t['dependsOn']) or 'None'} | {t['historicalEffortHours'][0]}–{t['historicalEffortHours'][1]}{' optional' if t['optional'] else ''} | {shortfixtures(t['fixtureIds'])} |")
    lines+=["","## Required connections","","- Story/education: L01/E4.a+NAV.MEDIA and L02/E6.a+E7.a/b are implemented by sources, voluntary plan records, physical travel and puppet consequences; L03/L05 govern the meaning of the evidence.","- An implementation task is not accepted merely because every ID appears. Its linked fixtures must assert actual results; TASK11.21 additionally sweeps the full Item06 state/transition inventory against its existing action/return rules.","- The first milestone defers only the7 comparison/timeline/My ideas states to TASK11.17. Evidence tray, exact readers, chosen lead and both search/story plan-recording opportunities are included immediately.","- Final quality is required even though temporary equivalents permit connected implementation. Optional audio/decorative polish has an explicit owner and disclosed deferral, without removing Toast, captions, cue endpoints or illustrated finish.",""]
    return readable("\n".join(lines))
def schedule_md(p):
    s=p["schedule"]; h=s["historicalScenario"]; rem=int(s["remainingSeconds"])
    days=rem//86400; hours=rem%86400//3600; minutes=rem%3600//60; seconds=rem%60
    lines=["# Item 11 — revised AI-led schedule","",
    "> Current authority: implementation-plan.json → schedule and tasks[*].estimate. This view is generated; edit the plan and regenerate. Item 12 replaces the unsupported AI-time conclusion. Archived files preserve the earlier scenario, not a competing schedule.","",
    "## Current decision and clock","",
    "**Deadline feasibility is undetermined; AI-led durations remain uncalibrated.** The first connected build is design-ready, with implementation still unauthorized and unstarted by Item 12. Final illustrated/live-AI submission readiness is not established.","",
    f"Official deadline verified at **{s['verifiedAtUtc']}** (September 11, 2026, 5:13:07 p.m. EDT): September 18 at 11:59 p.m. CDT = September 19 at 12:59 a.m. EDT = September 19 at 04:59 UTC. Remaining at that recorded instant: **{days} days, {hours} hours, {minutes} minutes, {seconds} seconds**. This is a dated clock reading, not remaining time at every later viewing. [Official rules §1.1](https://hackathon.nerdy.com/terms).","",
    "Delivery needs a working learning experience, written what/how/next, a functioning demo video of at most three minutes and applicable AI/third-party disclosures. Code/deployment links are optional; free unrestricted reviewer access lasts through September 23. English materials and limits on post-close changes apply. [Official rules §§4–5/7.6](https://hackathon.nerdy.com/terms).",
    "The selected literacy direction combines reading comprehension with narrative gameplay. This project's intended AI contribution still needs real interpretation evidence. [Official challenge](https://hackathon.nerdy.com/).","",
    "## Actual workflow and separated estimates","",s["staffing"],"",
    "The user offered 16–19 hours/day as possible availability. It is not an output rate, a promise, or a basis for subtracting mixed human/AI workload from wall-clock time. No hired illustrator, mandatory manual asset pipeline, generic AI speed multiplier, generation success rate or parallel-agent capacity is assumed.","",
    "| Quantity | Current numerical estimate | What must be recorded |","|---|---|---|"]
    for d in s["estimationDimensions"]:lines.append(f"| {d['id']} | Uncalibrated (null) | {d['meaning']} |")
    lines+=["","These dimensions overlap; they are not additive bins. Tony reviewing one generated frame while Codex runs an independent check consumes attention inside the same elapsed interval. Failed generations, rejected layers and repeated repair still count. An unknown wait is never zero.","",
    "## Milestones and dependency constraints","",
    "| Milestone | Current state | Finish forecast | Required evidence |","|---|---|---|---|"]
    for m in p["milestones"]:lines.append(f"| {m['id']} | {m['status']} | Uncalibrated; no date promised | {m['condition']} |")
    lines+=["","TASK11.00 is complete as documentation; its old 1–2-hour allowance is not a measured duration. TASK11.01–16 remain the first authorized implementation scope. Only the seven named comparison/timeline/general My ideas states defer to TASK11.17; both plan-recording opportunities stay included.","",
    "The acyclic task graph and prerequisites remain unchanged. Content/toolchain and Q00/Q01 feed state/world/source/resource/rail/run/save/help work and connected acceptance. Final exports feed integration and final browser checks; live evidence depends on authorized eligible service and semantic evaluation. Demo/access work remains after actual candidate evidence. A numerical longest elapsed path requires calibrated durations and actual shared-resource availability.","",
    "implementationOrder is a dependency-safe default traversal, not a serial calendar. Independent art can overlap only when that later scope is authorized; listing it later is not a resource constraint.","",
    "| Potential overlap | Required boundary; no time credit assumed |","|---|---|"]
    for x in s["parallelCandidates"]:lines.append("| After "+x["after"]+": "+" / ".join(" → ".join(b) for b in x["branches"])+" | "+x["condition"]+" |")
    lines+=["","## Calibration within authorized tasks","",
    "No prototype, setup, artwork generation, server or paid call is run to calibrate during this checkpoint.","",
    "| Calibration | Existing tasks | Evidence and limits |","|---|---|---|"]
    for c in s["calibration"]:lines.append(f"| {c['id']} | {', '.join(c['tasks'])} | {c['measure']} |")
    lines+=["","Future task records use actual start/end, Codex iteration count/durations, active human minutes, generation/export outcomes, unattended checks, external waits, disjoint overlap and acceptance failures/repair. Re-estimate by comparable work family after 01–02, 04–06 and 16. Preserve uncertainty for unsampled art/live/device work. Temporary assets and document generation cannot benchmark finished illustration or runtime engineering. Publish numerical scenarios only when their assumption and measurement basis exists.","",
    "## Delivery reserves and triggers","",
    "Retain **September 18, 8 p.m. EDT** as a provisional internal delivery target, leaving **4 hours 59 minutes** to official close. It is a target, not a forecast. TASK11.23 repair, TASK11.24 recording/materials, TASK11.25 access/delivery and TASK11.26 contingency remain required work; their allocations need calibration. Neither feature work nor a late start silently consumes these obligations.",""]
    for t in s["reviewTriggers"]:lines.append("- "+t)
    lines+=["","There is currently no supported commitment to finish before the deadline and no supported conclusion that AI-led completion is impossible. If measured progress later indicates a miss, present specific remaining work and options. Do not automatically remove rooms, sources, access, meaningful AI or illustrated quality. Q08/Q09 remain the only existing optional refinements.","",
    "## Historical allowances — superseded as forecasts","",
    "Original assumptions remain for provenance and Item 10 queue reconciliation. They are **not measured human productivity, measured AI productivity, current AI elapsed ranges, or evidence of calendar infeasibility**. Do not compare these totals to the user's availability to establish a deficit.","",
    "| Historical category | Old assumed hours |","|---|---:|"]
    for k,label in [("required","All required work"),("temporaryAssets","Q00–Q01 temporary preparation"),("finalIllustration","Q02–Q07 illustration/export"),("otherRequired","Other implementation/review/delivery allowances"),("withOptional","Including optional audio/decor")]:
        v=h["totals"][k];lines.append(f"| {label} | {v[0]}–{v[1]} |")
    lines+=["| First connected including readiness | 69–114 |","| First connected after readiness | 68–112 |","",
    "The 80–132-hour art component assumed practiced illustrator workload. It is neither an AI-generation/export benchmark nor a requirement to hire an illustrator. Original serial dates, 12-hour productive calendar, critical-path hours and availability deficit are withdrawn as current forecasts and preserved only in [the archive](../12-readiness/history/item11-before-review/11-build-packet/REVISED-SCHEDULE.md).","",
    "Each task preserves its range in historicalEffortHours; its current estimate uses explicit uncalibrated dimensions. [The crosswalk](REQUIREMENT-TO-BUILD-CROSSWALK.md) labels the old task allowances. [Historical Item 11 validation](../12-readiness/history/item11-before-review/11-build-packet/validation-report.json) checked that arithmetic, not its productivity assumption. [Item 12](../12-BUILD-READINESS-CHECKPOINT.md) controls readiness.",""]
    return "\n".join(lines)

def validate(p,f):
    errors=[]
    def need(v,msg):
        if not v: errors.append(msg)
    tasks=p["tasks"]; tids={t["id"] for t in tasks}; req={a["id"] for a in p["requirements"]}; checks={a["id"] for a in p["checks"]}
    fixids=[a["id"] for a in f["fixtures"]+f["arrangements"]]; fx=set(fixids); presets={a["id"] for a in f["presets"]}
    need(len(tids)==len(tasks),"duplicate task")
    need(len(req)==len(p["requirements"]),"duplicate requirement")
    need(len(checks)==len(p["checks"]),"duplicate check")
    v3=(ROOT/p["documents"]["v3"]).read_text(encoding="utf-8-sig")
    accept_section=v3[v3.index("## 15."):v3.index("## 16.")]
    original_ids=set(re.findall(r"^\| ([A-Z]\d\d) \|",accept_section,re.M))
    need(len(original_ids)==52 and original_ids<=req,"existing v3 acceptance ID coverage")
    need(len(fx)==len(fixids),"duplicate fixture")
    try: dag(tasks)
    except ValueError as e: errors.append(str(e))
    for t in tasks:
        need(t["dependsOn"]!=[t["id"]],t["id"]+" self dependency")
        need(all(x in tids for x in t["dependsOn"]),t["id"]+" unknown dependency")
        need(len(t["historicalEffortHours"])==2 and 0<=t["historicalEffortHours"][0]<=t["historicalEffortHours"][1],t["id"]+" effort")
        for field,known in [("requirementIds",req),("checkIds",checks),("fixtureIds",fx)]:
            need(bool(t[field]) and set(t[field])<=known,t["id"]+" "+field)
        for field in ("result","completionBoundary","capability","expectedEvidence","failureAndRecovery"): need(bool(t[field]),t["id"]+" missing "+field)
        for src in t["sources"]: need(bool(src.get("file")) and (ROOT/src["file"]).is_file(),t["id"]+" source missing "+str(src))
    for a in p["requirements"]:
        need(bool(a["taskIds"]) and set(a["taskIds"])<=tids,a["id"]+" task refs")
        need(bool(a["fixtureIds"]) and set(a["fixtureIds"])<=fx,a["id"]+" fixture refs")
        need(a["checkId"] in checks,a["id"]+" check ref")
        need((ROOT/a["authority"]["file"]).is_file(),a["id"]+" authority missing")
    registry=read(ROOT/p["documents"]["registry"]); manifest=read(ROOT/p["documents"]["assets"]); schema=read(ROOT/p["documents"]["schema"])
    expected={"owners":{a["ownerId"] for a in manifest["objectCoverage"]},"states":{a["stateId"] for a in manifest["stateCoverage"]},"transitions":set(registry["transitions"]),"content":set(registry["contentIds"]+registry["technicalContentIds"]),"sourceRefs":set(registry["refs"]),"introducedFacts":set(registry["introducedFacts"]),"assets":{a["id"] for a in manifest["assets"]},"contracts":{"AuthoredContent","CaseSnapshot","SaveEnvelope","Preferences","CoachRequest","CoachResponse","Session","ModelProposal"}}
    for kind,known in expected.items():
        rows=p["coverage"][kind]; need({a["id"] for a in rows}==known and len(rows)==len(known),kind+" coverage mismatch")
        for row in rows:
            need(bool(row["taskIds"]) and set(row["taskIds"])<=tids,row["id"]+" owner")
            need(bool(row["checkIds"]) and set(row["checkIds"])<=checks,row["id"]+" check")
    for t in tasks:
        for field in ("owners","states","transitions","content","sourceRefs","contracts"):need(set(t["references"][field])<=expected[field],t["id"]+" typed "+field)
        need(set(t["assets"]["assetIds"])<=expected["assets"],t["id"]+" asset refs")
    for a in f["fixtures"]:
        need(a["preset"] in presets,a["id"]+" preset")
        need(set(a["taskIds"])<=tids and set(a["requirementIds"])<=req,a["id"]+" refs")
        need(bool(a["actions"]) and bool(a["expected"]["logical"]) and bool(a["expected"]["visible"]),a["id"]+" behavior")
        need(set(a["sourceContext"]["actuallyExposedRefs"])<=expected["sourceRefs"],a["id"]+" exposed refs")
        need(set(a["sourceContext"]["availableAccessIds"])<=expected["owners"],a["id"]+" access refs")
        need(set(a["expected"]["contentRefs"])<=expected["content"],a["id"]+" CT refs")
        for mid in a["expected"].get("allowedMoveIds",[]): need(mid in schema["$defs"]["ModelProposal"]["properties"]["moveId"]["enum"],a["id"]+" model move")
        for ref in a["expected"].get("allowedReferenceIds",[]):
            need(ref in expected["sourceRefs"] or ref.startswith("OBS.FIX11."),a["id"]+" model ref")
        for field in ("unchangedOrAbsent","cancelRepeatInterruptionRecovery","verification"):need(bool(a[field]),a["id"]+" missing "+field)
    examples=read(ROOT/p["documents"]["examples"])
    eids={a["id"] for a in examples["cases"]}
    for a in f["presets"]: need(a["exampleId"] in eids,a["id"]+" example")
    need(next(a for a in examples["cases"] if a["id"]=="canonical-note-copy-fragment")["payload"]["completeness"]=="example-fragment","fragment relabeled")
    orders=f["arrangements"]; unique={tuple(a["order"]) for a in orders}
    need(len(orders)==65 and len(unique)==65,"arrangement set count")
    need(all(len(a["order"])==len(set(a["order"])) and len(a["order"])<=4 for a in orders),"arrangement repetition")
    good=[]
    for a in orders:
        state={"pip":"left","seed":"left","boats":"separate","lit":False}
        need(len(a["steps"])==len(a["order"]),a["id"]+" step count")
        for i,(tile,step) in enumerate(zip(a["order"],a["steps"])):
            need(step["before"]==state,a["id"]+" before")
            outcome="changed"
            if tile=="TILE.FERRY":
                if state["seed"]=="left":state["seed"]="right";caption="CT.CUE.FERRY"
                else:outcome="noop";caption="CT.CUE.FERRY_EMPTY"
            elif tile=="TILE.BRIDGE":
                caption="CT.CUE.BRIDGE_CARRY" if state["seed"]=="left" else "CT.CUE.BRIDGE_REUNITE"
                state["pip"]="right";state["boats"]="joined"
                if state["seed"]=="left":state["seed"]="right"
            elif tile=="TILE.PLANT":
                if state["pip"]=="right" and state["seed"]=="right":state["seed"]="soil";caption="CT.CUE.PLANTED"
                else:outcome="unmet";caption="CT.CUE.HILL_MISSING_PIP" if state["seed"]=="right" else "CT.CUE.HILL_BOTH_LEFT"
            elif tile=="TILE.BLOOM":
                if state["seed"]=="soil":state["lit"]=True;caption="CT.CUE.FLOWER"
                else:outcome="unmet";caption="CT.CUE.UNPLANTED"
            else:errors.append(a["id"]+" unknown tile")
            need(step["after"]==state and step["result"]==outcome and step["captionCtId"]==caption,a["id"]+" endpoint")
            need(step["nextCue"]==i+1 and step["pauseForInspection"]==(outcome=="unmet"),a["id"]+" pause")
        success=state["pip"]=="right" and state["seed"]=="soil" and state["lit"]
        need(a["final"]==state and a["success"]==success,a["id"]+" final")
        if success:good.append(tuple(a["order"]))
    required={("TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"),("TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"),("TILE.BRIDGE","TILE.FERRY","TILE.PLANT","TILE.BLOOM"),("TILE.BRIDGE","TILE.PLANT","TILE.FERRY","TILE.BLOOM"),("TILE.BRIDGE","TILE.PLANT","TILE.BLOOM","TILE.FERRY")}
    need(set(good)==required,"five expected successes")
    s=p["schedule"]; order=s["implementationOrder"]; required_ids={t["id"] for t in tasks if not t["optional"]}
    need(set(order)==required_ids and len(order)==len(required_ids),"schedule omits/duplicates required work")
    for t in tasks:
        if t["optional"]:continue
        need(all(order.index(d)<order.index(t["id"]) for d in t["dependsOn"]),t["id"]+" scheduled before dependency")
    for q in manifest["productionQueue"]:
        ts=[t for t in tasks if t["assets"]["queueRef"]==q["id"]]
        need(len(ts)==1 and ts[0]["historicalEffortHours"]==q["effortHours"] and set(ts[0]["assets"]["assetIds"])==set(q["assetIds"]),q["id"]+" queue reconciliation")
    expected_p=copy.deepcopy(p);recalc(expected_p)
    need(expected_p["schedule"]==p["schedule"],"derived schedule mismatch")
    dt=s["deadline"]
    need(datetime.fromisoformat(dt["official"])==datetime.fromisoformat(dt["userLocal"])==datetime.fromisoformat(dt["utc"].replace("Z","+00:00")),"deadline timezone mismatch")
    need(s["remainingSeconds"]==(datetime.fromisoformat(dt["utc"].replace("Z","+00:00"))-datetime.fromisoformat(s["verifiedAtUtc"].replace("Z","+00:00"))).total_seconds(),"remaining time mismatch")
    need(s["forecast"]["status"]=="UNCALIBRATED" and all(s["forecast"][k] is None for k in ("firstConnectedElapsedHours","remainingRequiredElapsedHours","criticalPathElapsedHours")),"unmeasured AI forecast promoted to number")
    for t in tasks:
        need(all(t["estimate"][d["id"]] is None for d in s["estimationDimensions"]),t["id"]+" unknown estimate is not null")
    need(s["deadline"]["official"].endswith("-05:00") and s["deadline"]["userLocal"].endswith("-04:00"),"official/local zone representation")
    for e in p["inputEvidence"]:need((ROOT/e["path"]).is_file() and sha(ROOT/e["path"])==e["sha256"].lower(),"source changed "+e["path"])
    return errors
def main():
    ap=argparse.ArgumentParser();ap.add_argument("--derive",action="store_true");ap.add_argument("--final",action="store_true");ap.add_argument("--phase",choices=["item11","item12"],default="item12");a=ap.parse_args()
    p=read(OUT/"implementation-plan.json");f=read(OUT/"acceptance-fixtures.json")
    if a.derive:
        recalc(p);write(OUT/"implementation-plan.json",p)
        (OUT/"REQUIREMENT-TO-BUILD-CROSSWALK.md").write_text(crosswalk(p),encoding="utf-8")
        (OUT/"REVISED-SCHEDULE.md").write_text(schedule_md(p),encoding="utf-8")
    errors=validate(p,f)
    results=[]
    def add(id,passed,detail):
        results.append({"id":id,"passed":bool(passed),"detail":detail})
    add("structure-ids-dag-fixtures-coverage-queue-time-arithmetic",not errors,errors or "Custom structural/reference/semantic fixture checks passed; no application was executed.")
    base=read(OUT/"source-snapshot.json"); changed=[];missing=[]
    for e in base["files"]:
        q=ROOT/e["path"]
        if not q.is_file():missing.append(e["path"])
        elif sha(q)!=e["sha256"].lower():changed.append(e["path"])
    add("preexisting-file-integrity",not missing and set(changed)<={"EVIDENCE-QUEST-MASTER-CHECKLIST.md"},{"checked":len(base["files"]),"changed":changed,"missing":missing})
    before=base["masterChecklistBefore"].replace("\r\n","\n").strip();after=(ROOT/"EVIDENCE-QUEST-MASTER-CHECKLIST.md").read_text(encoding="utf-8-sig").replace("\r\n","\n").strip()
    def between(s,start,end):return s[s.index(start):s.index(end)]
    add("items01-through10-preserved",between(before,"## A.","### 11")==between(after,"## A.","### 11"),"Compared unchanged completed foundation sections.")
    start="### 12" if a.phase=="item11" else "## C."
    add("later-checklist-statuses-preserved",between(before,start,"## Current next-step boundary")==between(after,start,"## Current next-step boundary"),"Item 12 changes allowed only in item12 phase; Items 13–16 remain unchanged.")
    add("no-game-or-assets-created",not Path(p["implementationPath"]).exists() and all(e.get("exists") is False for asset in read(ROOT/p["documents"]["assets"])["assets"] for e in asset.get("exports",[])),"Proposed isolated implementation directory absent; unchanged manifest exports remain false. No setup/install/game/model/deploy command used.")
    linkerrors=[]
    docs=[ROOT/"11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md"]+list(OUT.glob("*.md"))
    for doc in docs:
        if not doc.is_file():linkerrors.append(str(doc));continue
        for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)",doc.read_text(encoding="utf-8")):
            target=target.strip("<>").split("#",1)[0]
            if not target or re.match(r"https?://",target):continue
            dest=Path(target) if re.match(r"^[A-Za-z]:[/\\]",target) else doc.parent/target
            if not dest.exists():linkerrors.append(doc.name+" → "+target)
    add("handoff-local-links",not linkerrors,linkerrors or "All current local Markdown destinations exist; future directory shown as code, not a file link.")
    add("derived-crosswalk-and-schedule-current",(OUT/"REQUIREMENT-TO-BUILD-CROSSWALK.md").read_text(encoding="utf-8")==crosswalk(p) and (OUT/"REVISED-SCHEDULE.md").read_text(encoding="utf-8")==schedule_md(p),"Readable views match authoritative plan inputs and this generator.")
    # Negative controls demonstrate that the document validator rejects the intended mistakes.
    for name,change in [
        ("duplicate-task",lambda pp,ff:pp["tasks"].append(copy.deepcopy(pp["tasks"][0]))),
        ("cycle",lambda pp,ff:pp["tasks"][0]["dependsOn"].append("TASK11.16")),
        ("unknown-fixture",lambda pp,ff:pp["requirements"][0]["fixtureIds"].append("FIX11.NOT_REAL")),
        ("missing-required-order",lambda pp,ff:ff["arrangements"].pop()),
        ("wrong-endpoint-caption",lambda pp,ff:ff["arrangements"][1]["steps"][0].update({"captionCtId":"CT.CUE.FLOWER"}))
    ]:
        pp=copy.deepcopy(p);ff=copy.deepcopy(f);change(pp,ff)
        try: rejected=bool(validate(pp,ff))
        except (ValueError,KeyError,IndexError):rejected=True
        add("negative-control-"+name,rejected,"Deliberately bad in-memory copy rejected; stored files unchanged.")
    if a.final:
        item=between(after,"### 11","### 12")
        add("seven-item11-subitems-complete",len(re.findall(r"^- \[x\]",item,re.M))==7 and "**Status: Defined." in item,"Exactly seven Item11 boxes; this is document completion only.")
        if a.phase=="item11":
            add("next-step12-not-readiness","**Next work item:** 12 — One build-readiness checkpoint." in after and "**Build readiness:** not reached." in after,"Historical item11 phase.")
        else:
            item12=between(after,"### 12","## C.")
            add("item12-readiness-and-authorization",len(re.findall(r"^- \[x\]",item12,re.M))==6 and "**Next work item:** 13 — Connected gameplay implementation." in after and p["readiness"]["implementationAuthorization"]=="NOT_GRANTED_BY_THIS_CHECKPOINT" and p["tasks"][0]["status"]=="DOCUMENTED_COMPLETE" and all(t["status"]=="NOT_STARTED" for t in p["tasks"][1:]),"Six documented review items; next13; readiness complete without implementation authorization or started tasks.")
    notrun=["Game scaffolding/implementation","Dependency installation/Ajv runtime compilation","Production asset manufacture/export qualification","Browser/native keyboard/touch/screen-reader walkthroughs","Actual IndexedDB fault/concurrency transactions","Runtime performance/font measurements","Paid/live model interpretation","Live child input/data eligibility","Participant/child usability and learning effects","Hosting/publication/submission"]
    report={"packetVersion":1,"packetRevision":p.get("packetRevision",1),"phase":a.phase,"historicalRecord":"12-readiness/history/item11-before-review/11-build-packet/validation-report.json","executedAtUtc":datetime.now(timezone.utc).isoformat(),"scope":"Actual local document/reference/graph/fixture arithmetic and preservation checks only.","engine":"Python stdlib custom checker; no claim of production-schema/runtime validation of newly defined fixtures.","passed":all(x["passed"] for x in results),"checkGroups":len(results),"results":results,"counts":{"tasks":len(p["tasks"]),"requirements":len(p["requirements"]),"checks":len(p["checks"]),"scenarioFixtures":len(f["fixtures"]),"arrangementFixtures":len(f["arrangements"]),"successfulOrders":sum(x["success"] for x in f["arrangements"]),"coverage":{k:len(v) for k,v in p["coverage"].items() if isinstance(v,list)},"protectedInputFiles":len(base["files"])},"notRun":notrun,"hashes":{x.name:sha(x) for x in [OUT/"implementation-plan.json",OUT/"acceptance-fixtures.json",OUT/"source-snapshot.json"]}}
    write(OUT/"validation-report.json",report)
    print(json.dumps({"passed":report["passed"],"groups":len(results),"failures":[x for x in results if not x["passed"]],"historicalTotalsOnly":p["schedule"]["historicalScenario"]["totals"],"milestones":p["schedule"]["forecast"].get("milestones",{})},ensure_ascii=False))
    return 0 if report["passed"] else 1
if __name__=="__main__":sys.exit(main())
