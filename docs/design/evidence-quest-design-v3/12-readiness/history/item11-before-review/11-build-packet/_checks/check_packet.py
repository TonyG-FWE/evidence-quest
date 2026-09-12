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
    return [sum(t["effortHours"][i] for t in a) for i in (0,1)]
def dag(tasks):
    table={t["id"]:t for t in tasks}
    if len(table)!=len(tasks): raise ValueError("duplicate task")
    done=set(); order=[]
    while len(done)<len(tasks):
        ready=[t["id"] for t in tasks if t["id"] not in done and set(t["dependsOn"])<=done]
        if not ready: raise ValueError("cycle or unknown dependency")
        for i in ready: done.add(i); order.append(i)
    return order
def fmt(t): return t.strftime("%b %d, %Y %I:%M %p EDT")
def calendar_at(hours, schedule):
    t=datetime.fromisoformat(schedule["productiveCalendar"]["hypotheticalStart"])
    segments=[(t,t.replace(hour=22,minute=0))]
    while hours>=0:
        for start,end in segments:
            length=(end-start).total_seconds()/3600
            if hours<=length+1e-9: return start+timedelta(hours=hours)
            hours-=length
        day=(segments[-1][1]+timedelta(days=1)).replace(hour=0,minute=0)
        segments=[(day.replace(hour=8),day.replace(hour=12)),(day.replace(hour=13),day.replace(hour=21))]
def capacity_ceiling(start,end,cap):
    cur=start; result=0
    while cur<end:
        nxt=min(end,(cur+timedelta(days=1)).replace(hour=0,minute=0,second=0,microsecond=0))
        result+=min(cap,(nxt-cur).total_seconds()/3600)
        cur=nxt
    return result
def recalc(p):
    tasks=p["tasks"]; s=p["schedule"]; required=[t for t in tasks if not t["optional"]]
    s["totals"]={key:total([t for t in tasks if predicate(t)]) for key,predicate in {
        "required":lambda t:not t["optional"],
        "temporaryAssets":lambda t:t["category"]=="temporary-assets",
        "finalIllustration":lambda t:t["category"]=="final-art",
        "optionalAudio":lambda t:t["category"]=="optional-audio",
        "optionalDecoration":lambda t:t["category"]=="optional-polish",
        "otherRequired":lambda t:not t["optional"] and t["category"] not in ("temporary-assets","final-art"),
        "protectedRepair":lambda t:t["id"]=="TASK11.23",
        "recording":lambda t:t["id"]=="TASK11.24",
        "delivery":lambda t:t["id"]=="TASK11.25",
        "deliveryContingency":lambda t:t["id"]=="TASK11.26"
    }.items()}
    s["totals"]["withOptional"]=total(tasks)
    cumulative=[0,0]; table={t["id"]:t for t in tasks}; timings={}
    for tid in s["implementationOrder"]:
        t=table[tid]; before=list(cumulative)
        for i in (0,1): cumulative[i]+=t["effortHours"][i]
        timings[tid]={"start":[calendar_at(x,s).isoformat() for x in before],"finish":[calendar_at(x,s).isoformat() for x in cumulative],"cumulativeHours":list(cumulative)}
    path={}
    for tid in dag(required):
        t=table[tid]; values=[]; chains=[]
        for i in (0,1):
            pred=max(t["dependsOn"],key=lambda d:path[d]["hours"][i],default=None)
            values.append((path[pred]["hours"][i] if pred else 0)+t["effortHours"][i])
            chains.append((path[pred]["chains"][i] if pred else [])+[tid])
        path[tid]={"hours":values,"chains":chains}
    critical=path["TASK11.26"]
    marks={}
    for mark in p["milestones"]:
        indices=[s["implementationOrder"].index(t) for t in mark["taskIds"]]
        endid=s["implementationOrder"][max(indices)]
        marks[mark["id"]]={"lastTask":endid, "forecastFinish":timings[endid]["finish"],"cumulativeHours":timings[endid]["cumulativeHours"],"scopeEffortHours":total(tasks,mark["taskIds"])}
    anchor=datetime.fromisoformat(s["verifiedAtUtc"].replace("Z","+00:00")).astimezone(timezone(timedelta(hours=-4)))
    deadline=datetime.fromisoformat(s["deadline"]["userLocal"])
    ceiling=[capacity_ceiling(anchor,deadline,c) for c in s["availabilityCeilingHoursPerDay"]]
    sched_capacity=0
    while calendar_at(sched_capacity+1,s)<=deadline: sched_capacity+=1
    s["forecast"]={"method":"Single operator serial resource schedule; no overlap credited. Low/high are effort endpoints, not confidence bounds or guaranteed dates.","taskTimings":timings,"milestones":marks,"logicalCriticalPath":critical,"nominalProductiveHoursBeforeDeadline":sched_capacity,"maximumAvailabilityHoursFromVerifiedTime":ceiling,"minimumEffortGapAgainstMaximumCeiling":s["totals"]["required"][0]-ceiling[1],"gapAgainstNominalCapacity":[h-sched_capacity for h in s["totals"]["required"]]}
    kinds={"owners":["CHECK11.CONTENT","CHECK11.HARDENING"],"states":["CHECK11.HARDENING"],"transitions":["CHECK11.HARDENING"],"content":["CHECK11.CONTENT"],"sourceRefs":["CHECK11.EXPOSURE"],"introducedFacts":["CHECK11.A09"],"assets":["CHECK11.VISUAL"],"contracts":["CHECK11.TECH"]}
    optional=set(table["TASK11.ART08"]["assets"]["assetIds"])
    for kind,checks in kinds.items():
        for row in p["coverage"][kind]: row["checkIds"]=["CHECK11.OPTIONAL"] if kind=="assets" and row["id"] in optional else checks
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
    "## Bounded tasks and acceptance evidence","","The plan has the full scope, completion boundary, references, assets, capability, effort, fixtures, failure condition and recovery for each row.","",
    "| Task | Output | Depends on | Hours | Evidence/check entry |","|---|---|---|---:|---|"]
    for t in p["tasks"]:
        lines.append(f"| {t['id']} | {t['title']} | {', '.join(t['dependsOn']) or 'None'} | {t['effortHours'][0]}–{t['effortHours'][1]}{' optional' if t['optional'] else ''} | {shortfixtures(t['fixtureIds'])} |")
    lines+=["","## Required connections","","- Story/education: L01/E4.a+NAV.MEDIA and L02/E6.a+E7.a/b are implemented by sources, voluntary plan records, physical travel and puppet consequences; L03/L05 govern the meaning of the evidence.","- An implementation task is not accepted merely because every ID appears. Its linked fixtures must assert actual results; TASK11.21 additionally sweeps the full Item06 state/transition inventory against its existing action/return rules.","- The first milestone defers only the7 comparison/timeline/My ideas states to TASK11.17. Evidence tray, exact readers, chosen lead and both search/story plan-recording opportunities are included immediately.","- Final quality is required even though temporary equivalents permit connected implementation. Optional audio/decorative polish has an explicit owner and disclosed deferral, without removing Toast, captions, cue endpoints or illustrated finish.",""]
    return readable("\n".join(lines))
def schedule_md(p):
    s=p["schedule"]; fc=s["forecast"]; tt=s["totals"]; rem=s["remainingSeconds"]; days=int(rem//86400); hrs=int(rem%86400//3600); mins=int(rem%3600//60); secs=int(rem%60)
    lines=["# Item11 — revised schedule","","> Derived numbers and dates from implementation-plan.json → tasks/schedule. Recalculate with --derive after an effort, start, capacity or dependency change. Dates below are forecasts under stated assumptions, not commitments or authorization.","",
    "## Verified deadline and delivery conditions","",
    f"Verified **September11,2026 at19:55:17UTC /3:55:17p.m.EDT**. Official close: **Friday,September18,2026 at11:59p.m.CDT (UTC−5)**. In the user's New York zone this is **Saturday,September19 at12:59a.m.EDT (UTC−4)**, or **September19 04:59UTC**. Remaining at verification: **{days}days {hrs}hours {mins}minutes {secs}seconds**. [Official terms §1.1](https://hackathon.nerdy.com/terms).","",
    "The entry needs a working learning product, written what/how/next, a demo no longer than3minutes, and applicable disclosures. Repo/live-demo URLs are optional in the terms; reviewer access must remain free and unrestricted throughSeptember23. Post-close changes are restricted. [Official terms §§4–5/7.6](https://hackathon.nerdy.com/terms).","",
    "The landing page asks for an AI-powered learning tool and a literacy game combining educational rigor with narrative play. Its timeline says project link plus video, while its form and controlling terms make repository/deployment URLs optional. Plan accessible working-product review and a2:45–3:00 video, without inventing a compulsory public repository. Keep genuine live interpretation evidence for this project's AI promise; authored help alone is not that evidence. [Official challenge](https://hackathon.nerdy.com/).","",
    "These dated primary-source checks replace the old deadline assumptions and60-hour envelope. Entry rights, third-party disclosures and student-data limits remain governed by the already referenced official terms and Items09/10; no additional external action was taken.","",
    "## Capacity and feasibility","",
    f"Required work is **{tt['required'][0]}–{tt['required'][1]} effort hours**; with optional audio/decor, **{tt['withOptional'][0]}–{tt['withOptional'][1]}hours**. The first connected milestone including the one readiness checkpoint is **69–114hours** (actual implementation/temporary assets/checks after that checkpoint:68–112hours).","",
    f"One operator directs Codex. No artist, second engineer, participant recruitment pipeline, paid-account access or guaranteed AI-production speed is assumed. Your earlier16–19hours/day is an availability ceiling. Even if every remaining calendar day contributes up to19hours, only **{fc['maximumAvailabilityHoursFromVerifiedTime'][1]:.2f}hours** remain from the verification instant; the low estimate exceeds that by **{fc['minimumEffortGapAgainstMaximumCeiling']:.2f}hours**. The16-hour ceiling gives **{fc['maximumAvailabilityHoursFromVerifiedTime'][0]:.2f}hours**. These optimistic ceilings include the partial first/last days and no productive-efficiency discount.","",
    f"The serial forecast uses a hypothetical September11 5p.m.EDT start, five hours that evening, then12productive hours/day (08:00–12:00 and13:00–21:00). This supplies **{fc['nominalProductiveHoursBeforeDeadline']}hours** before the deadline, leaving **{fc['gapAgainstNominalCapacity'][0]}–{fc['gapAgainstNominalCapacity'][1]}hours** of required work beyond it. This is an arithmetic planning assumption, not a request to work these hours. A later Item12/start shifts the forecast; waiting for authorization is not silently credited as progress.","",
    "**The established scope and illustrated quality do not credibly fit the contest deadline with the assumed single operator.** The art ranges themselves assume practiced illustration/export capability, which is unverified; the high estimate is not a guaranteed upper bound. Deferring5–10hours of optional sound/refinement cannot close a deficit in required work.","",
    "| Work category | Hours | Counted boundary |","|---|---:|---|",
    "| Temporary preparation Q00–Q01 |8–14|Native primitive preparation and58 individual temporary equivalents; no game handlers.|",
    "| Finished illustration/export Q02–Q07 |80–132|Original layered cast/rooms/props/paper story/tile/source work, cleanup and export review.|",
    f"| Other required work |{tt['otherRequired'][0]}–{tt['otherRequired'][1]}|Readiness, code, integration, verification, evaluation, repair and delivery.|",
    "| Optional audio Q08 |2–4|Six original sounds; sound-off play complete.|",
    "| Optional refinement Q09 |3–6|Existing decorative polish; no essential consequence or required finish removed.|","",
    "Q00 preparation is not TASK11.07's functional UI wiring. Q07's graphic cleanup/export review is not TASK11.20's runtime loading, integration or measurement. Existing source reading/transcription is TASK11.02 once. Ordinary local verification is included in each task; TASK11.23 is additional protected cross-system repair. All work is counted serially; repeated asset references are workflow stages, not duplicate asset commissions.","",
    "## Dependency and calendar forecast","","No task is scheduled before its dependencies. Asset work can be independent of some code work, but the calendar gives no overlap credit without an actually available capable person.","",
    "| Milestone | Cumulative serial effort | Low-effort finish | High-effort finish | Gate |","|---|---:|---|---|---|"]
    for mark in p["milestones"]:
        v=fc["milestones"][mark["id"]]
        lines.append(f"| {mark['id']} | {v['cumulativeHours'][0]}–{v['cumulativeHours'][1]}h | {fmt(datetime.fromisoformat(v['forecastFinish'][0]))} | {fmt(datetime.fromisoformat(v['forecastFinish'][1]))} | {mark['condition']} |")
    lines+=["","The low forecast reaches a connected temporary-art case onSeptember17; it does not reach an illustrated submission candidate bySeptember18. The high forecast misses even the connected milestone. Later forecast dates describe finishing the project, not a valid late entry.","",
    "Logical critical path if unlimited appropriate workers existed (not the staffing assumption):"]
    for i,label in enumerate(["low","high"]):
        lines.append(f"- {label}: {fc['logicalCriticalPath']['hours'][i]}h — "+ " → ".join(fc["logicalCriticalPath"]["chains"][i]))
    lines+=["","The single-operator resource path is the full implementationOrder and dominates any hypothetical parallel path. Potential independent branches and prerequisites are explicitly recorded under schedule.parallelCandidates; no agents or people were assigned.","",
    "| Task | Effort | Low forecast start → finish | High forecast start → finish |","|---|---:|---|---|"]
    table={t["id"]:t for t in p["tasks"]}
    for tid in s["implementationOrder"]:
        v=fc["taskTimings"][tid];t=table[tid]
        lines.append(f"| {tid} — {t['title']} | {t['effortHours'][0]}–{t['effortHours'][1]}h | {fmt(datetime.fromisoformat(v['start'][0]))} → {fmt(datetime.fromisoformat(v['finish'][0]))} | {fmt(datetime.fromisoformat(v['start'][1]))} → {fmt(datetime.fromisoformat(v['finish'][1]))} |")
    lines+=["","## Protected buffers, triggers and options","",
    "TASK11.23 reserves8–12h for integration/repair; TASK11.24 reserves4–6h for recording/materials; TASK11.25 reserves2–3h for access/delivery; TASK11.26 adds2–4h contingency. These16–25h are included once in the190–314h. They are protected even when art or code overruns.","",
    "For any contest attempt, retain September18 8p.m.EDT as the internal delivery target, leaving4h59m to official close. Count backward at least the recording/access/contingency work from that point. Under the verified workload these protected windows cannot be filled by a qualifying candidate; the table intentionally shows the miss rather than moving buffers out of sight.","",
    "| Trigger | Required response |","|---|---|",
    "| First connected fixture fails or69h low budget is exceeded | Fix its owner, retain failure evidence and re-estimate; an opening room is not milestone completion. |",
    "| A required asset is missing, wrong identity/anchor or below the selected finish | Keep illustrated gate open; repair/reforecast. Temporary diagrams cannot pass it. |",
    "| Live account inaccessible, source leak or wrong meaning in evaluation | Keep live gate open; continue authored development and report precise limitation. Do not record a scripted response as live. |",
    "| Usability exposes confusion about goal, sources or consequences | Use protected repair and repeat the affected observation; do not label completion as learning. |",
    "| Candidate cannot meet internal delivery target | Choose an explicit scope/capacity/timeline option; do not imply late acceptance, omit required evidence or claim submission. |","",
    "Available options, none automatically selected or authorized:",""]
    for opt in s["options"]: lines.append(f"- **{opt['id']}** — {opt['description']}")
    lines+=["","Optional deferral: Q08/Q09 only. Removing required rooms, source access, recovery/accessibility, learning behavior, the meaningful live demonstration or the rich final finish requires a named scope change and updated requirements/fixtures, not an invisible schedule adjustment.",""]
    return readable("\n".join(lines))
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
        need(len(t["effortHours"])==2 and 0<=t["effortHours"][0]<=t["effortHours"][1],t["id"]+" effort")
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
        need(len(ts)==1 and ts[0]["effortHours"]==q["effortHours"] and set(ts[0]["assets"]["assetIds"])==set(q["assetIds"]),q["id"]+" queue reconciliation")
    expected_p=copy.deepcopy(p);recalc(expected_p)
    need(expected_p["schedule"]==p["schedule"],"derived schedule mismatch")
    dt=s["deadline"]
    need(datetime.fromisoformat(dt["official"])==datetime.fromisoformat(dt["userLocal"])==datetime.fromisoformat(dt["utc"].replace("Z","+00:00")),"deadline timezone mismatch")
    need(s["remainingSeconds"]==(datetime.fromisoformat(dt["utc"].replace("Z","+00:00"))-datetime.fromisoformat(s["verifiedAtUtc"].replace("Z","+00:00"))).total_seconds(),"remaining time mismatch")
    for e in p["inputEvidence"]:need((ROOT/e["path"]).is_file() and sha(ROOT/e["path"])==e["sha256"].lower(),"source changed "+e["path"])
    return errors
def main():
    ap=argparse.ArgumentParser();ap.add_argument("--derive",action="store_true");ap.add_argument("--final",action="store_true");a=ap.parse_args()
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
    add("items12-through16-preserved",between(before,"### 12","## Current next-step boundary")==between(after,"### 12","## Current next-step boundary"),"No readiness/later completion altered.")
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
        add("next-step12-not-readiness", "**Next work item:** 12 — One build-readiness checkpoint." in after and "**Build readiness:** not reached." in after,"Next pointer12; readiness unchanged.")
    notrun=["Game scaffolding/implementation","Dependency installation/Ajv runtime compilation","Production asset manufacture/export qualification","Browser/native keyboard/touch/screen-reader walkthroughs","Actual IndexedDB fault/concurrency transactions","Runtime performance/font measurements","Paid/live model interpretation","Live child input/data eligibility","Participant/child usability and learning effects","Hosting/publication/submission"]
    report={"packetVersion":1,"executedAtUtc":datetime.now(timezone.utc).isoformat(),"scope":"Actual local document/reference/graph/fixture arithmetic and preservation checks only.","engine":"Python stdlib custom checker; no claim of production-schema/runtime validation of newly defined fixtures.","passed":all(x["passed"] for x in results),"checkGroups":len(results),"results":results,"counts":{"tasks":len(p["tasks"]),"requirements":len(p["requirements"]),"checks":len(p["checks"]),"scenarioFixtures":len(f["fixtures"]),"arrangementFixtures":len(f["arrangements"]),"successfulOrders":sum(x["success"] for x in f["arrangements"]),"coverage":{k:len(v) for k,v in p["coverage"].items() if isinstance(v,list)},"protectedInputFiles":len(base["files"])},"notRun":notrun,"hashes":{x.name:sha(x) for x in [OUT/"implementation-plan.json",OUT/"acceptance-fixtures.json",OUT/"source-snapshot.json"]}}
    write(OUT/"validation-report.json",report)
    print(json.dumps({"passed":report["passed"],"groups":len(results),"failures":[x for x in results if not x["passed"]],"totals":p["schedule"]["totals"],"milestones":p["schedule"]["forecast"].get("milestones",{})},ensure_ascii=False))
    return 0 if report["passed"] else 1
if __name__=="__main__":sys.exit(main())
