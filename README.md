# Evidence Quest

A four-room SparkFest adventure about bringing Loop back and premiering **The Little Bridge**. The player investigates physical sources, retrieves the projector and story kit, rehearses a paper story and launches the crew's premiere.

This private project contains **Item 13 / M11.CONNECTED**, with individual temporary graphics and authored help. See the build status for the recorded acceptance result. The approved rich illustrated finish and live interpretation qualification remain later milestones.

- [Build status and exact next dependency](BUILD-STATUS.md)
- [Startup authorization](docs/BUILD-START.md)
- [Authoritative design entry point](docs/design/evidence-quest-design-v3/11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md)
- [Master checklist](docs/design/evidence-quest-design-v3/EVIDENCE-QUEST-MASTER-CHECKLIST.md)
- [Task definitions and dependencies](docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json)
- [First connected build scope and checks](docs/design/evidence-quest-design-v3/11-build-packet/FIRST-CONNECTED-BUILD.md)
- [Original import hashes](evidence/design-import.json)
- [First connected acceptance ledger](evidence/first-connected-acceptance.md)
- [Artwork, code and dependency provenance](docs/PROVENANCE.md)

Architecture: TypeScript, Canvas 2D world, native React interfaces, one immutable state owner, IndexedDB saves, and a same-origin Node HTTP service. The case works in authored mode without model credentials.

On Windows, prepare the pinned workspace-local Node 24.21.0 runtime, then use its npm wrapper. The bootstrap verifies the official archive SHA-256 and leaves global installations unchanged. The current workspace already has this runtime:

```powershell
.\scripts\bootstrap.ps1
.\scripts\npm.cmd ci
.\scripts\npm.cmd run build
.\scripts\npm.cmd start
```

The built same-origin server defaults to `http://127.0.0.1:8787`. Set `PORT` and `PUBLIC_ORIGIN` together for a different free loopback port. The development browser checks own port 4174 and never reuse an existing listener. No API key is needed in authored mode.

```powershell
.\scripts\npm.cmd run test:contracts
.\scripts\npm.cmd run test:browser
.\scripts\npm.cmd run eval:coach -- --mode authored
```

The case includes freely chosen correct-first, cancellation and Media-first investigations; independent Loop/kit recovery; readable physical and portable sources; voluntary plans and evidence delivery; native and drag tile operations; unsuccessful consequences, revision, all five valid plans, rehearsal and premiere; Maximum Toast; and factual recap. No clue quota, required explanation or AI approval gates progress.

For browser setup after a clean clone, set `PLAYWRIGHT_BROWSERS_PATH` to `.cache/browsers` and run `.\scripts\npm.cmd exec playwright install chromium firefox webkit`. Default browser checks run the built authored game. Set `EQ_ALL_BROWSERS=1` to include Firefox/WebKit. Development-only lifecycle checks use `EQ_TEST_DEV=1` and `.\scripts\npm.cmd run test:browser -- coach-fault.spec.ts`; they visibly say that responses are scripted. Unset these environment variables when returning to the normal built test run. No test makes a model call.

Browser evidence includes the three fresh routes, all five plans, compact keyboard/touch, native Canvas-failure play, actual IndexedDB recovery/conflict, and one actual Chromium renderer crash. Injected faults and synthetic READY boundary presets are labeled. These checks do not establish live interpretation, participant learning, final illustration qualification or every-device durability.

Saves use this browser origin's IndexedDB. Progress is acknowledged only on transaction completion. Failed, unknown or conflicting records stay intact until explicit replacement; gameplay can continue in memory. Preferences are stored separately from case resets.

Temporary artwork consists of 58 separately replaceable assets and 246 PNG density/variant exports. The current white Jo and approved cast are retained. These flat temporary equivalents do not replace the approved illustrated finish. Only the seven named comparison/timeline/general My ideas states defer beyond this first build; search and story plans are included.

No open-source license is granted by this repository. Deployment and public publication are outside the current authorization.
