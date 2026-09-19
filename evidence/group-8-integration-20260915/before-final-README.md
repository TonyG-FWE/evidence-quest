# Evidence Quest

**The Garden Adventure** is a local reading adventure for ages 9–12. Guide Pip to keep his promise to plant a seed with Grandma, then help her friends share their stories again. Read and make choices in conversations; carry out the chosen actions in the game world.

The chapter connects bridge materials and recoverable collapse, a separate seed boat, Mara's passenger work and earlier paper-bird story, Rina's leaking bakery, Sol's roof repair, bread and thanks, an ending the player helps prepare, actual invitations, three gathering arrangements, six story flowers and Loop's matching final pictures. All nine Mara/Sol outcomes remain valid. [Play guide and current controls](docs/GARDEN-COMPLETE-DEMO.md).

**Current review:** Group 1 has a completed design and Groups 2–7 have bounded implementation and independent review receipts; Group 8 is checking the final connected candidate. This is not owner or learner acceptance. The [169-item runtime ledger](docs/game-review/GROUPS-1-8-RUNTIME-COVERAGE.md) retains the original audit findings, implemented behavior, evidence and remaining qualification. Live AI and pronunciation feedback are unavailable; procedural artwork still needs final illustrated-quality acceptance.

After the setup below, open **http://127.0.0.1:8787/garden**. The original four-room SparkFest case remains at `/`, with its existing saves and qualification record preserved.

Clickable source words offer meanings in context and pronunciation when a local English voice is available. The player can practise a passage, write and revise Sol's ending, choose a prepared ending, or bring an unfinished draft to the gathering. Help is optional; story progress does not claim comprehension, pronunciation accuracy or learning improvement. A short demonstration recording is separate from the full playable chapter.

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
$env:COACH_MODE='authored'
.\scripts\npm.cmd start
```

The built same-origin server defaults to `http://127.0.0.1:8787`. Set `PORT` and `PUBLIC_ORIGIN` together for a different free loopback port. The development browser checks own port 4174 and never reuse an existing listener. No API key is needed in authored mode.

```powershell
.\scripts\npm.cmd run test:contracts
.\scripts\npm.cmd run test:browser
.\scripts\npm.cmd run eval:coach -- --mode authored
```

The Garden Adventure has native named controls as well as scene interaction. **Pause → Start a new adventure** asks for confirmation and archives the current run; cancelling keeps it. A different browser or port has a separate save. Reading and writing do not run down a gameplay timer. No clue quota, required mistake, answer score or AI approval gates progress.

For browser setup after a clean clone, set `PLAYWRIGHT_BROWSERS_PATH` to `.cache/browsers` and run `.\scripts\npm.cmd exec playwright install chromium firefox webkit`. Default browser checks run the built authored game in full Chromium's headless mode. Set `EQ_ALL_BROWSERS=1` to include Firefox/WebKit. `EQ_CHROMIUM_CHANNEL=shell` selects the older headless shell for a separate diagnostic; its recorded software-renderer timeout is retained in the integration evidence. Development-only lifecycle checks use `EQ_TEST_DEV=1` and `.\scripts\npm.cmd run test:browser -- coach-fault.spec.ts`; they visibly say that responses are scripted. Unset these environment variables when returning to the normal built test run. No browser test makes a model call.

The final review binds each result to its tested candidate. Ordinary browser routes, native desktop observations, real-handler matrices and injected fault/migration fixtures are recorded separately. See [BUILD-STATUS](BUILD-STATUS.md) for exact results and failures; tests do not establish live interpretation, participant learning, final illustration quality or every-device durability.

Saves use this browser origin's IndexedDB. Progress is acknowledged only on transaction completion. Failed, unknown or conflicting records stay intact until explicit replacement; gameplay can continue in memory. Preferences are stored separately from case resets.

The original four-room SparkFest case at `/` remains separate, including its save namespace, investigation routes, five plans, rehearsal and premiere. Its 52 original source images are preserved unchanged. The production manifest binds 267 lossless WebP/PNG pairs at two source-bounded densities. See [production qualification](docs/PRODUCTION-QUALIFICATION.md) for that experience's measured performance and remaining qualification; it is not evidence that the Garden's procedural illustrations meet the final art requirement.

TASK11.19 live evaluation remains halted after one authorized provider request returned exhausted credit (1/75 attempts used). Authored play needs no API key. The current Garden service truthfully returns unavailable for live text, word and speech assessment; it does not silently resume evaluation or send child audio.

No open-source license is granted by this repository. Deployment and public publication are outside the current authorization.
