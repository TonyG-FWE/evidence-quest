"""Item 12 document-readiness validation only; never starts the proposed game."""
from pathlib import Path
from datetime import datetime, timezone
import json, hashlib, re, importlib.util, copy, sys
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"12-readiness"
def read(p):return json.loads(p.read_text(encoding="utf-8-sig"))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def txt(p):return p.read_text(encoding="utf-8-sig").replace("\r\n","\n")
def section(s,a,b):return s[s.index(a):s.index(b)]
def main():
    base=read(OUT/"source-snapshot.json")
    hist=OUT/"history/item11-before-review"
    p=read(ROOT/"11-build-packet/implementation-plan.json")
    f=read(ROOT/"11-build-packet/acceptance-fixtures.json")
    oldp=read(hist/"11-build-packet/implementation-plan.json")
    oldf=read(hist/"11-build-packet/acceptance-fixtures.json")
    reg=read(ROOT/p["documents"]["registry"]); assets=read(ROOT/p["documents"]["assets"])
    report11=read(ROOT/"11-build-packet/validation-report.json")
    doc=txt(ROOT/"12-BUILD-READINESS-CHECKPOINT.md")
    results=[]
    def add(id,ok,detail):results.append({"id":id,"passed":bool(ok),"detail":detail})
    permitted={
      "EVIDENCE-QUEST-MASTER-CHECKLIST.md","11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md",
      "11-build-packet/implementation-plan.json","11-build-packet/acceptance-fixtures.json",
      "11-build-packet/REQUIREMENT-TO-BUILD-CROSSWALK.md","11-build-packet/FIRST-CONNECTED-BUILD.md",
      "11-build-packet/REVISED-SCHEDULE.md","11-build-packet/OPEN-ISSUES-AND-DEFAULTS.md",
      "11-build-packet/validation-report.json","11-build-packet/_checks/check_packet.py"}
    changed=[];missing=[];unchanged=[]
    for e in base["files"]:
        target=ROOT/e["path"]
        if not target.is_file():missing.append(e["path"]);continue
        h=sha(target)
        if h!=e["sha256"]:
            changed.append({"path":e["path"],"beforeSha256":e["sha256"],"afterSha256":h,"beforeBytes":e["bytes"],"afterBytes":target.stat().st_size})
        else:unchanged.append(e["path"])
    add("scoped-preexisting-file-integrity",not missing and {x["path"] for x in changed}<=permitted,{"baselineFiles":len(base["files"]),"unchangedFiles":len(unchanged),"changedFiles":len(changed),"missing":missing})
    archives=[]
    for e in base["files"]:
        if e["path"] in permitted:
            a=hist/e["path"];archives.append({"path":e["path"],"matchesBefore":a.is_file() and sha(a)==e["sha256"]})
    add("original-hashes-and-dated-evidence-preserved",all(x["matchesBefore"] for x in archives),archives)
    before=txt(hist/"EVIDENCE-QUEST-MASTER-CHECKLIST.md");after=txt(ROOT/"EVIDENCE-QUEST-MASTER-CHECKLIST.md")
    add("foundation-and-later-statuses-preserved",section(before,"## A.","### 11")==section(after,"## A.","### 11") and section(before,"## C.","## Current next-step boundary")==section(after,"## C.","## Current next-step boundary"),"Items 01–10 and 13–16 byte-equivalent normalized sections; no later implementation checkbox changed.")
    add("current-item11-validation",report11["passed"] and report11["phase"]=="item12" and report11["hashes"]["implementation-plan.json"]==sha(ROOT/"11-build-packet/implementation-plan.json") and report11["hashes"]["acceptance-fixtures.json"]==sha(ROOT/"11-build-packet/acceptance-fixtures.json"),{"groups":report11["checkGroups"],"executedAtUtc":report11["executedAtUtc"],"scope":"ID/DAG/source/queue/fixture arithmetic and negative controls, not runtime."})
    oldTasks={t["id"]:t for t in oldp["tasks"]}
    keep=["id","title","category","optional","dependsOn","assets"]
    taskErrors=[]
    for t in p["tasks"]:
        old=oldTasks[t["id"]]
        for k in keep:
            if t[k]!=old[k]:taskErrors.append(t["id"]+" "+k)
        if t["historicalEffortHours"]!=old["effortHours"]:taskErrors.append(t["id"]+" historical range")
    add("task-identity-dependencies-assets-preserved",not taskErrors and set(oldTasks)=={t["id"] for t in p["tasks"]},taskErrors or "35 task identities, dependency edges, asset sets/queues and historical ranges preserved.")
    add("all-arrangement-fixtures-unchanged",f["arrangements"]==oldf["arrangements"] and f["arrangementProtocol"]==oldf["arrangementProtocol"],{"orders":len(f["arrangements"]),"successfulOrders":sum(x["success"] for x in f["arrangements"]),"meaning":"Original 65 exact per-cue inputs/results unchanged; their pure arithmetic is rechecked by Item 11."})
    oldfx={x["id"]:x for x in oldf["fixtures"]};fx={x["id"]:x for x in f["fixtures"]}
    contentChanges={"FIX11.OPEN","FIX11.SEARCH","FIX11.ACCESS","FIX11.READINESS","FIX11.NOTES"}
    fixtureErrors=[];ownerAdded=[];fixtureChanged=[]
    for id,x in fx.items():
        o=oldfx[id]
        if x==o:continue
        fixtureChanged.append(id)
        if "TASK11.16" in x["taskIds"] and "TASK11.16" not in o["taskIds"]:ownerAdded.append(id)
        if id not in contentChanges:
            xx=copy.deepcopy(x);oo=copy.deepcopy(o);xx.pop("taskIds");oo.pop("taskIds")
            if xx!=oo:fixtureErrors.append(id+" changed beyond acceptance owner")
    add("fixture-corrections-bounded",not fixtureErrors and set(fx)==set(oldfx) and len(ownerAdded)==20,{"changedFixtures":fixtureChanged,"addedFirstAcceptanceOwner":ownerAdded,"errors":fixtureErrors})
    def safe_expectations(ff):
        ff={x["id"]:x for x in ff["fixtures"]}
        return (ff["FIX11.OPEN"]["expected"]["contentRefs"]==["CT.GOAL.ASSIGNMENT"]
          and ff["FIX11.SEARCH"]["expected"]["contentRefs"]==["CT.SRC.E4","CT.NAV.MEDIA","CT.PLAN.RECORDED"]
          and "Rehearse F,P; hold Hill unmet" in ff["FIX11.ACCESS"]["actions"][2]
          and "then actually insert B before P" in ff["FIX11.ACCESS"]["actions"][3])
    add("no-unsolicited-preview-or-plan-hint-and-real-unmet",safe_expectations(f),"Explicit fixture actions/expected copy agree with Item 06/07: Preview absent when not used; Record neutral; compact unmet before Bridge.")
    neg=[]
    for label,fn in [
      ("preview-leak",lambda z:next(x for x in z["fixtures"] if x["id"]=="FIX11.OPEN")["expected"]["contentRefs"].append("CT.WORK.PREVIEW_RESULT")),
      ("plan-hint-leak",lambda z:next(x for x in z["fixtures"] if x["id"]=="FIX11.SEARCH")["expected"]["contentRefs"].append("CT.HINT.TESTABLE_LEAD")),
      ("wrong-compact-order",lambda z:next(x for x in z["fixtures"] if x["id"]=="FIX11.ACCESS")["actions"].__setitem__(2,"Place F,P then insert B before P before rehearsing."))]:
        z=copy.deepcopy(f);fn(z);neg.append({"input":label,"rejected":not safe_expectations(z)})
    add("new-fixture-negative-controls",all(x["rejected"] for x in neg),neg)
    known=set(reg["uiStates"]+reg["transitions"]+reg["contentIds"]+reg["technicalContentIds"]+reg["introducedFacts"])
    known.update(x["ownerId"] for x in assets["objectCoverage"])
    known.update(x["stateId"] for x in assets["stateCoverage"])
    known.update(t["id"] for t in p["tasks"])
    known.update(fx);known.update(x["id"] for x in f["arrangements"]);known.update(m["id"] for m in p["milestones"])
    # Full written tokens; slash-compressed families are also cross-checked manually against source tables.
    tokens={x.rstrip(".") for x in re.findall(r"\b(?:UI|CT|T|ACC|ACT|SC|ST|CY|WK|MD|PUP|KIT|TILE|LOOP|FACT|TASK11|FIX11|M11)\.[A-Za-z0-9_.]+",doc)}
    unknown=sorted(x for x in tokens if x not in known)
    add("written-trace-reference-membership",not unknown,{"checkedTokens":len(tokens),"unknown":unknown,"limit":"Membership is not behavior proof; route semantics were separately reviewed against source text/rules."})
    skill="Use relevant details from more than one source to infer a reason or plan that the sources do not state completely, and revise it when a detail conflicts."
    complete=all(f"| A{i:02d}" in doc for i in range(1,15)) and all(f"| B{i:02d}" in doc for i in range(1,16))
    add("route-and-education-review-evidence",complete and skill in doc and skill in txt(ROOT/p["documents"]["v3"]) and all(x in doc for x in ["E4.a + NAV.MEDIA","E6.a + E7.a/b","CT.PLAN.RECORDED","history uncertainty","written contract traces"]),{"routeSteps":{"A":14,"B":15},"review":"Written connection/action/exposure/ownership/cancel review; no browser/player tests."})
    dims=[x["id"] for x in p["schedule"]["estimationDimensions"]]
    add("uncalibrated-ai-estimate-with-real-deadline",len(dims)==6 and all(all(t["estimate"][k] is None for k in dims) for t in p["tasks"]) and p["schedule"]["forecast"]["status"]=="UNCALIBRATED" and p["schedule"]["remainingSeconds"]==632753 and p["schedule"]["deadline"]["official"]=="2026-09-18T23:59:00-05:00",{"checkedAtUtc":p["schedule"]["verifiedAtUtc"],"remainingSecondsAtThatTime":p["schedule"]["remainingSeconds"],"firstBuildElapsedHours":None,"deadlineFeasibility":"UNDETERMINED"})
    t17=next(t for t in p["tasks"] if t["id"]=="TASK11.17")
    deferred={"UI.COMPARE.EMPTY","UI.COMPARE.PARTIAL","UI.COMPARE.READY","UI.TIMELINE.EMPTY","UI.TIMELINE.KNOWN","UI.IDEA.DRAFT","UI.IDEA.RECORDED"}
    first=txt(ROOT/"11-build-packet/FIRST-CONNECTED-BUILD.md")
    add("first-scope-and-seven-deferred-states",set(t17["references"]["states"])==deferred and all(x in first for x in ["both optional plan-recording opportunities","TASK11.01–16","Q00/Q01","no credentials","future","uncalibrated"]),{"includedStates":len(assets["stateCoverage"])-len(deferred),"deferred":sorted(deferred),"boundary":"Temporary equivalents authored first; live/final-art qualifications later."})
    newPaths=sorted(str(q.relative_to(ROOT)).replace("\\","/") for q in ROOT.rglob("*") if q.is_file() and str(q.relative_to(ROOT)).replace("\\","/") not in {x["path"] for x in base["files"]})
    add("no-game-or-production-created",not Path(p["implementationPath"]).exists() and all(x=="12-BUILD-READINESS-CHECKPOINT.md" or x.startswith("12-readiness/") for x in newPaths) and all(e["exists"] is False for a in assets["assets"] for e in a.get("exports",[])),{"proposedGamePathAbsent":not Path(p["implementationPath"]).exists(),"newFiles":newPaths,"assetExportFlags":"All remain false; source manifest unchanged."})
    add("readiness-not-authorization",p["readiness"]["status"]=="READY_FOR_FIRST_CONNECTED_BUILD" and p["readiness"]["implementationAuthorization"]=="NOT_GRANTED_BY_THIS_CHECKPOINT" and p["tasks"][0]["status"]=="DOCUMENTED_COMPLETE" and all(t["status"]=="NOT_STARTED" for t in p["tasks"][1:]) and len(re.findall(r"^- \[x\]",section(after,"### 12","## C."),re.M))==6 and "**Next work item:** 13 — Connected gameplay implementation." in after,"Six review items complete; only TASK11.00/M11.READINESS documented complete; all implementation/later tasks remain unstarted.")
    linkErrors=[]
    for d in [ROOT/"12-BUILD-READINESS-CHECKPOINT.md",OUT/"CHANGE-REGISTER.md"]:
        for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)",txt(d)):
            target=target.strip("<>").split("#",1)[0]
            if not target or target.startswith(("http://","https://")):continue
            dest=Path(target) if re.match(r"^[A-Za-z]:[/\\]",target) else d.parent/target
            if not dest.exists():linkErrors.append(d.name+" -> "+target)
    add("checkpoint-and-register-local-links",not linkErrors,linkErrors or "All current local file destinations exist.")
    notrun=["Game scaffolding/implementation","Temporary or final asset generation/export","Dependency/package installation or toolchain runtime qualification","Browser/player/gameplay tests","Actual storage transaction/crash/concurrency tests","Paid/live model calls or child-live activation","Child usability/enjoyment/learning evaluation","Actual runtime performance/font/reflow qualification","Provisioning/publication/deployment/submission"]
    report={"checkpointVersion":1,"executedAtUtc":datetime.now(timezone.utc).isoformat(),"scope":"Actual local document/reference/preservation/fixture/schedule checks plus identified written contract review; no game execution.",
     "passed":all(x["passed"] for x in results),"checkGroups":len(results),"results":results,
     "decision":"READY_FOR_FIRST_CONNECTED_BUILD","implementationAuthorization":"NOT_GRANTED_BY_THIS_CHECKPOINT","implementationStarted":False,
     "changedPreexistingFiles":changed,"baseline":{"path":"12-readiness/source-snapshot.json","sha256":sha(OUT/"source-snapshot.json"),"files":len(base["files"])},
     "historicalItem11Report":{"path":"12-readiness/history/item11-before-review/11-build-packet/validation-report.json","sha256":sha(hist/"11-build-packet/validation-report.json")},
     "currentItem11Report":{"path":"11-build-packet/validation-report.json","sha256":sha(ROOT/"11-build-packet/validation-report.json")},
     "visuallyInspected":["08-visual-designs/V08-CAST-ILLUSTRATED.png","08-visual-designs/V08-STAGE-ILLUSTRATED.png"],
     "sourceVerification":{"officialTerms":"https://hackathon.nerdy.com/terms","officialChallenge":"https://hackathon.nerdy.com/","checkedAtUtc":p["schedule"]["verifiedAtUtc"],"deadline":p["schedule"]["deadline"]},
     "notRun":notrun,"limits":["Pure fixture arithmetic is not the implemented game's evaluator.","ID membership/file integrity does not prove usability or educational understanding.","Written route checks are not browser or player tests.","All AI-led duration dimensions remain uncalibrated; no measured feasibility verdict.","Current READY decision concerns preparation for M11.CONNECTED only."]}
    (OUT/"validation-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"passed":report["passed"],"groups":len(results),"failures":[x for x in results if not x["passed"]],"changedFiles":len(changed),"unchangedFiles":len(unchanged)},ensure_ascii=False))
    return 0 if report["passed"] else 1
if __name__=="__main__":sys.exit(main())

