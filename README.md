# Evidence Quest

A four-room SparkFest adventure about bringing Loop back and premiering **The Little Bridge**. The player investigates physical sources, retrieves the projector and story kit, rehearses a paper story and launches the crew's premiere.

This private project is implementing **Item 13 / M11.CONNECTED**, with individual temporary graphics and authored help. The approved rich illustrated finish and live interpretation qualification remain later milestones.

- [Build status and exact next dependency](BUILD-STATUS.md)
- [Startup authorization](docs/BUILD-START.md)
- [Authoritative design entry point](docs/design/evidence-quest-design-v3/11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md)
- [Master checklist](docs/design/evidence-quest-design-v3/EVIDENCE-QUEST-MASTER-CHECKLIST.md)
- [Task definitions and dependencies](docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json)
- [First connected build scope and checks](docs/design/evidence-quest-design-v3/11-build-packet/FIRST-CONNECTED-BUILD.md)
- [Original import hashes](evidence/design-import.json)

Architecture: TypeScript, Canvas 2D world, native React interfaces, one immutable state owner, IndexedDB saves, and a same-origin Node HTTP service. The case works in authored mode without model credentials.

Use the workspace-local Node 24.21.0 runtime through the Windows wrapper:

```powershell
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

The current connected case can be played through resource collection, rehearsal and premiere. Full Item 13 acceptance is still in progress; see BUILD-STATUS for the exact remaining branches. Browser evidence includes one fresh Media-first premiere and real IndexedDB recovery/conflict checks. Fault injection is labeled in the tests. Do not interpret these checks as live interpretation, player evaluation, final illustration qualification or every-device durability.

Saves use this browser origin's IndexedDB. Progress is acknowledged only on transaction completion. Failed, unknown or conflicting records stay intact until explicit replacement; gameplay can continue in memory. Preferences are stored separately from case resets.

Temporary artwork consists of 58 separately replaceable assets and 246 PNG density/variant exports. The current white Jo and approved cast are retained. These flat temporary equivalents do not replace the approved illustrated finish. Only the seven named comparison/timeline/general My ideas states defer beyond this first build; search and story plans are included.

No open-source license is granted by this repository. Deployment and public publication are outside the current authorization.
