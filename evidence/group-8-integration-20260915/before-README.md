# Evidence Quest

The **Garden Adventure** at **`/garden`** is an incomplete prototype with a connected chapter state and screens. Tony's playthrough found major missing world gameplay and coherence failures; it is not an accepted complete demo. The [experience audit](docs/game-review/EXPERIENCE-AUDIT-20260914.md) and [implementation checklist](docs/game-review/A-TO-Z-IMPLEMENTATION-CHECKLIST.md) track the full gaps, including the bakery, materials, repair, consequences, lantern purpose, and the separation of reading/choices from game-world action.

Existing features include a separate seed boat, bridge construction, saved progress, restart, contextual word help, draft writing, gathering variants and temporary reading/replay. Live AI and pronunciation feedback remain unavailable pending the recorded provider qualification. [Current build controls and setup](docs/GARDEN-COMPLETE-DEMO.md).

After the setup below, open **http://127.0.0.1:8787/garden**. The original four-room SparkFest case remains at `/`, with its existing saves and qualification record preserved.

This private project implements Item 13, TASK11.17 and the **ER13 experience and literacy correction**. It includes a child-controlled story opening, purposeful reading with a local English voice, contextual vocabulary, optional narrator cards and individually replaceable illustrations. See BUILD-STATUS.md for acceptance and remaining dependencies; the earlier first-build checks are historical.

- [Build status and exact next dependency](BUILD-STATUS.md)
- [ER13 implementation and provider prerequisites](docs/ER13-CORRECTION.md)
- [Dated supporting-copy register](docs/ER13-COPY-REGISTER.md)
- [Startup authorization](docs/BUILD-START.md)
- [Authoritative design entry point](docs/design/evidence-quest-design-v3/11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md)
- [Master checklist](docs/design/evidence-quest-design-v3/EVIDENCE-QUEST-MASTER-CHECKLIST.md)
- [Task definitions and dependencies](docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json)
- [First connected build scope and checks](docs/design/evidence-quest-design-v3/11-build-packet/FIRST-CONNECTED-BUILD.md)
- [Original import hashes](evidence/design-import.json)
- [First connected acceptance ledger](evidence/first-connected-acceptance.md)
- [Artwork, code and dependency provenance](docs/PROVENANCE.md)

Architecture: TypeScript, native React interfaces, one active immutable state owner with serialized commands, IndexedDB saves, and a same-origin Node HTTP service. The Garden Adventure uses a Three.js papercraft view; the preserved four-room case uses Canvas 2D. Authored play needs no model credentials.

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

For browser setup after a clean clone, set `PLAYWRIGHT_BROWSERS_PATH` to `.cache/browsers` and run `.\scripts\npm.cmd exec playwright install chromium firefox webkit`. Default browser checks run the built authored game. Set `EQ_ALL_BROWSERS=1` to include Firefox/WebKit. Development-only lifecycle checks use `EQ_TEST_DEV=1` and `.\scripts\npm.cmd run test:browser -- coach-fault.spec.ts`; they visibly say that responses are scripted. Unset these environment variables when returning to the normal built test run. No browser test makes a model call.

Browser evidence includes the three fresh routes, all five plans, compact keyboard/touch, native Canvas-failure play, actual IndexedDB recovery/conflict, and one actual Chromium renderer crash. Injected faults and synthetic READY boundary presets are labeled. These checks do not establish live interpretation, participant learning, final illustration qualification or every-device durability.

Saves use this browser origin's IndexedDB. Progress is acknowledged only on transaction completion. Failed, unknown or conflicting records stay intact until explicit replacement; gameplay can continue in memory. Preferences are stored separately from case resets.

The 52 accepted source images are preserved unchanged. The production manifest binds 267 lossless WebP/PNG pairs at two source-bounded densities; loading, cache ownership and native image fallback are explicit. Comparison, known-time timeline, private ideas and lead selection are implemented. See [production qualification](docs/PRODUCTION-QUALIFICATION.md) for measured outcomes and the remaining WebKit DPR2 cadence gap. TASK11.19 live evaluation is halted after one authorized provider request returned exhausted credit (1/75 attempts used); authored play remains the default.

No open-source license is granted by this repository. Deployment and public publication are outside the current authorization.
