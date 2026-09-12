# Evidence Quest build status

## Active correction — ER13 (2026-09-12)

The user rejected the first build experience. The dated [experience and literacy addendum](docs/design/evidence-quest-design-v3/13-EXPERIENCE-AND-LITERACY-CORRECTION.md) now authorizes narrative, literacy, art integration and selected-provider correction on codex/first-connected. Imported SHA-256: 2475eb13f589d478dcd97eccd903cbcadf2b7f1308de94f5cd90535955d88f7f. Original design files and first-build evidence below remain historical.

| ID | Work | Status | Evidence / next action |
|---|---|---|---|
| ER13.01 | Opening, world, cast and purpose | IMPLEMENTED_REVIEWING | Skippable Jo opening, accepted illustrated portraits and home composition; physical model now has a live large view and visible consequence. |
| ER13.02 | Mission, recap and independent routes | IMPLEMENTED_REVIEWING | Current-state mission and encountered cast; both recovery orders still pass. Native equipment return and seed-only revision observed; unmet pauses retain the visible consequence. |
| ER13.03 | Reading, browser speech and narrator cards | IMPLEMENTED_REVIEWING | Three bounded cards, phrases, requested rereading and optional cue pauses; actual local English speech start observed in native browser. [Voice](evidence/er13/native-speech.json). |
| ER13.04 | Contextual vocabulary | IMPLEMENTED_REVIEWING | Actual sentences and encounter guards; still meanings tested separately. Lookups are assistance, not mastery. |
| ER13.05 | Reachable copy and dated change register | IMPLEMENTED_REVIEWING | [Dated register](docs/ER13-COPY-REGISTER.md), 575 CT entries and unchanged original CT.SRC bodies. |
| ER13.06 | Rich individual art and readable motion | IN_PROGRESS | Accepted Stage plus 15-asset cumulative delivery integrated with explicit crops/feet and device aspect, player walking frames, one Loop drawing with native state overlays and three Stage fixtures. Remaining fixture/story prop/Toast art awaits accepted parent delivery. |
| ER13.07 | Actual play, regression and recovery | IN_PROGRESS | 24 contracts pass. 38/44 initial Chromium, then all 12 focused corrections pass; original reports retained. All 27 three-engine opening/literacy/connected/compact checks pass, plus 3 HTTP/model/narrator and 3 development lifecycle checks. Nine further three-engine panel/reading checks and five seed-only/compact/focus/drag checks pass. [Review ledger](evidence/er13/review-ledger.md). |
| ER13.08 | Selected-provider coaching path and status | IMPLEMENTED_LOCAL_ONLY | Real Responses adapter and client HTTP transport tested through injected provider responses. No server key/config exists; paid adult evaluation needs explicit authorization and selected-model account access. [Prerequisites](docs/ER13-CORRECTION.md). Zero live calls. |

Current next task: finish accepted art integration and ER13.07 actual visual/motion review; retain explicit gaps until demonstrated. Live interpretation and child appeal/learning/retention are NOT_RUN. No deployment, submission or public publication.

Latest review repairs: lower world controls restore a visible new panel heading and return action; clipped narrator words count only when displayed; automatic unmet planting keeps the large split-bank view and adjacent caption. The growing flower's visual bounds were widened to keep it above the kneeling puppets. All original collision/approach geometry, source bodies and five valid solutions remain preserved. Code and evidence are checkpointed on the existing private branch; completion of the full visual target is still pending.

## Historical first connected build record

Updated 2026-09-12T03:28:55.692Z. Item 13 / M11.CONNECTED is **COMPLETE for its authorized first-build scope**.

Read this file first on every continuation. Task definitions and dependencies come only from [implementation-plan.json](docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json). TASK11.00 is documented complete. This execution is authorized for TASK11.01–16 and normal pushes to a new private TonyG-FWE repository.

## Workspace and setup evidence

- Current dedicated game workspace: C:\Users\TonyGuillaro\OneDrive - Summit Gov Solutions\Documents\ChatGPT\Evidence quest
- Historical proposed path in the startup packet is superseded by the user's current dedicated workspace boundary. The folder was verified empty except for an unborn Git repository, with no remote and no commits; no nested repository is created.
- Source path's missing separator was corrected to C:\Users\TonyGuillaro\.codex.
- Complete original import: 307 files, 88318888 bytes; all 29 authority hashes and every copied byte verified. [Inventory](evidence/design-import.json). Original source remains unchanged; dated execution/status changes live in this repository.
- Active GitHub CLI account TonyG-FWE verified with existing keyring authentication. Initial sandbox configuration denial resolved through approved read-only access. No credentials changed.
- GitHub repository: https://github.com/TonyG-FWE/evidence-quest, verified PRIVATE, HTTPS origin. Initial main commit `6cad51f0756939e7f293593cafd6ec54ce9947a2` matches `git ls-remote origin refs/heads/main`. Active implementation branch: `codex/first-connected`. Checkpoint `3dd68a6` was previously pushed; final code/evidence publication is recorded in `evidence/git-verification.json` and the branch history.
- Git author is repository-local Tony Guillaro / `217523024+TonyG-FWE@users.noreply.github.com`, using the verified GitHub account ID. Global test identity and credentials are unchanged.
- Workspace-local Node 24.21.0 / npm 11.19.0 installed from official archive; SHA-256 `158f7685b44de51f6c0df1d153526cbcd3e1bc739a8dfc607721cef75de9e541` verified. All approved package pins and selected exact type packages were verified against the official npm registry. Clean install, lockfile review and zero-vulnerability audit passed. Use `scripts/npm.cmd` on this host to bypass its broken default npm wrapper and select the prescribed runtime.

## Task progress

| ID | Existing task | Status | Dependencies | Result / evidence |
|---|---|---|---|---|
| TASK11.00 | One build-readiness checkpoint | DOCUMENTED_COMPLETE | — | Imported Item 12 checkpoint; design evidence only. |
| TASK11.01 | Isolated project and contract toolchain | COMPLETE | TASK11.00 | Clean installation, strict builds, 33 schema expectations, three contract checks and 23 authored guards pass; private origin verified. This initial setup record is supplemented by the final connected acceptance below. [Evidence](evidence/toolchain.json). |
| TASK11.02 | Canonical content and four-room data | COMPLETE | TASK11.01 | Full canonical transcription and FIX11.CONTENT structure pass. Runtime conditional behavior is tested in dependent tasks. [Evidence](evidence/content-validation.json). |
| TASK11.03 | Native primitive preparation (Q00) | COMPLETE | TASK11.02 | 32 native asset definitions, 13 original icons, palette, focus and 48px control tokens prepared; browser behavior remains TASK11.07/16. [Evidence](evidence/native-assets.json). |
| TASK11.04 | Individual temporary graphics (Q01) | COMPLETE | TASK11.03 | 58 original temporary raster assets; 123 variants and 246 PNG exports, exact dimensions/anchors and per-density budgets checked. Contact sheet inspected; composition is tested in TASK11.06/16. [Evidence](evidence/temp-assets.json). |
| TASK11.05 | Single state owner and command/effect coordination | COMPLETE | TASK11.02 | 21 contract tests pass, including all 65 orders through real handlers, cue/terminal idempotence, immutable snapshots, reentrant effects and matching save acknowledgments. Storage transport remains TASK11.14. [Evidence](evidence/runtime-tests.txt). |
| TASK11.06 | Explorable world and physical approaches | COMPLETE | TASK11.04, TASK11.05 | All 61 approaches, legal follower routes, approach clearance, remote-owner rejection and retarget cancellation pass; four-room browser route and full Media-first recovery/premiere passed. [Evidence](evidence/runtime-tests.txt). |
| TASK11.07 | Native shell, input, focus and responsive modes | COMPLETE | TASK11.03, TASK11.05, TASK11.06 | Native keyboard/touch and Largest/Roomier compact flows pass; both banks remain whole. Stable control, tile and moved-note focus returns are verified. [Evidence](evidence/chromium-compact-unmet-pass.json). |
| TASK11.08 | Physical sources and component-aware evidence | COMPLETE | TASK11.02, TASK11.06, TASK11.07 | Exact recording frames, photo, post, full description, canceled and secured notice, native zoom/vocabulary and source-component exposure pass. [Evidence](evidence/chromium-final-main.json). |
| TASK11.09 | Characters, presentation and voluntary plans | COMPLETE | TASK11.08 | Local character branches, scope-only versus full Remy delivery, Ari before/after recovery, in-place records and actual approached Jo explanation pass. [Evidence](evidence/chromium-final-boundaries.json). |
| TASK11.10 | Independent resource recovery and portable notes | COMPLETE | TASK11.08, TASK11.06 | Three fresh routes pass, including independent kit-first and Loop-first recovery, unread notes, physical docking/handoff and surviving-owner access. [Evidence](evidence/chromium-final-main.json). |
| TASK11.11 | Rail manipulation | COMPLETE | TASK11.10, TASK11.07 | Native and drag insertion/replacement/swap/return, boundary/no-op/cancel/invalid drops, uniqueness and certification invalidation pass. [Evidence](evidence/chromium-final-main.json). |
| TASK11.12 | Puppet engine, rehearsal and interruption | COMPLETE | TASK11.11, TASK11.05 | All 65 orders, five native successful plans, 36 cue-race variants, terminal finalization and both-mode Stop/Continue pass. Compact seed-only revision passes separately. [Evidence](evidence/runtime-tests.txt). |
| TASK11.13 | Premiere, aftermath and Maximum Toast | COMPLETE | TASK11.12, TASK11.09 | Full-show milestone, coral-backpack payoff, optional staged Toast, own-room reactions and factual recap chronology pass. [Evidence](evidence/chromium-final-boundaries.json). |
| TASK11.14 | Durable save, recovery and concurrent visits | COMPLETE | TASK11.05, TASK11.07, TASK11.10, TASK11.12 | Real IndexedDB acknowledgment, previous/damaged/version/read/quota/conflict/reset cases, retained Unicode drafts and actual renderer crash recovery pass. Fault-injection limits remain explicit. [Evidence](evidence/chromium-final-main.json). |
| TASK11.15 | Authored help and coaching lifecycle | COMPLETE | TASK11.09, TASK11.12, TASK11.14 | Authored/direct native assistance and three labeled development lifecycle tests pass, including real admission timeout. Twenty-three eligibility guards and ownership tests pass; no live model call. [Evidence](evidence/coach-fault-final.json). |
| TASK11.16 | First connected browser milestone | COMPLETE | TASK11.13, TASK11.14, TASK11.15 | 39 production Chromium, 16 Firefox/WebKit and 3 labeled development coaching checks pass across recorded runs. All 65 production-handler orders pass. Actual playable preview inspected; exact first-build and NOT_RUN boundaries recorded. [Evidence](evidence/first-connected-acceptance.md). |

## Verification and boundaries

**No unresolved blocker remains within TASK11.01–16.** [Acceptance ledger](evidence/first-connected-acceptance.md) maps all 104 required fixture IDs and all 74 original check IDs with their applicable results and remaining qualification boundaries. Its machine record contains exact source/test hashes and per-test outcomes. Superseded test-selector/navigation assumptions and earlier product failures remain visible in the retained reports and [repair record](evidence/integration-repairs.md).

- Strict production build, complete content validation (557 CT entries / 35 source refs / 107 owners / 96 states / 121 transitions / 157 asset bindings), 33 schema expectations and 21 contract tests pass. The order test exercises all 65 orders and five successes through real handlers; interruption checks include 36 callback/event combinations.
- Browser evidence: 39 production Chromium checks, 16 Firefox/WebKit checks and 3 explicitly scripted development lifecycle checks. The game completes through three fresh routes, both recovery orders, seed-only revision and all five valid plans; compact keyboard/touch, source boundaries, native Canvas-failure play, reset/save/conflict and factual recap are verified. Zero live model calls; 23 authored guards pass. Current npm audit reports zero vulnerabilities.
- [Play locally](http://127.0.0.1:4173/). Task-owned Node process 40720 was verified and the actual Stage was opened visibly in the Codex browser; [preview record](evidence/preview.json). Use README commands to restart the server. Saves are specific to the browser origin, and the existing preview save was preserved.
- Q00/Q01 temporary assets are separately replaceable. Current white Jo and the approved rich Item 08 visual target remain required. The seven comparison/timeline/general My ideas states defer to TASK11.17; search/story plans, lead selection and evidence presentation are included.
- Final art/audio, meaningful live interpretation, child-live eligibility, participant/learning evaluation, deployment, demonstration/submission and public publication remain **NOT_RUN**. Source/client bundles are about 195 KB as static gzip equivalents; Vite still reports its generic 500 KB raw-chunk warning. This is not final-art runtime-performance qualification. Browser faults and one actual renderer crash do not establish all-device durability.

## Current next dependency

No remaining work within the authorized first connected milestone. **TASK11.17 — Comparison, timeline and theory tools** is the next existing numbered task; TASK11.18 and the named final-art tasks are separate later work. Their statuses remain NOT_STARTED. Do not infer authorization for live calls, final-art production or release from this completion.

## Calibration

Human active minutes and a trustworthy whole-milestone elapsed total remain unknown. Host UTC task events, temporary preparation intervals, browser durations and repair evidence are recorded in [calibration.json](evidence/calibration.json) and [measured-schedule.md](evidence/measured-schedule.md). Overlapping intervals are not summed. Comparable automated route timings calibrate browser execution only, not final-art or future live/evaluation work.
