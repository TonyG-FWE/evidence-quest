# Item 11 — first connected build

**Future implementation instructions. Nothing in this file has been executed.** Read [the entry point](../11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md), then complete the separate Item 12 readiness checkpoint. This document defines **M11.CONNECTED**, not the illustrated release or live-AI qualification.

## Exact scope and stopping point

The first build is a complete case with individual temporary graphics. A child can start as the SparkFest premiere captain, move a visible avatar through Stage, Courtyard, Workshop and Media, choose an investigation route, recover Loop and the caddy independently, keep unread notes, arrange the story, see an unsuccessful consequence, revise, rehearse successfully and premiere The Little Bridge. The world remains the main surface; native supporting views serve its physical actions.

Included now:

- **Start and world:** no-save/continue/checking/recovery states; dismissible opening/movement guidance; persistent recoverable assignment; four exact room layouts/door connections; pointer/touch and keyboard movement; physical approaches; overlap chooser; blocked destinations; named Move to list and venue descriptions; pause/settings/return.
- **Sources:** all E1–E8 owners and NAV entries, exact canonical words, model/flaps, E2 recording/frame/end/photo/post/description separation, notice flatten/secure/cancel, source enlargement/vocabulary, empty/populated evidence tray and discovered-source reopening.
- **People and voluntary reasoning:** actual Jo/Remy/Ari topics, selected-source presentation after approach, private/in-place/addressed plan records, lead choice, “Tell crew my plan” and “Explain this plan to Jo.” No explanation, correct belief, clue count or AI approval is required to travel or play.
- **Resources:** closed/open caddy, individual tile inspection and whole-kit collection, either resource first, one following/docked Loop, carried/seated caddy, unread portable E6/E7 and mounted copies, exact Stage approach/handoff and moved-owner focus.
- **Workstation:** zero-to-four unique tiles, all non-drag and drag operations, Arrange/Watch, read-only Pip/Grandma/seed/banks, every cue/unmet/no-op result, Stop/Continue/Restart, rail/source/help inspection during playback, actual-edit invalidation and all five valid arrangements.
- **Payoff:** same Show pad as Preview/Launch/Replay, actual complete-show finalization, player's coral-backpack connection, celebration, skippable own-room reactions and factual recap.
- **Help:** authored topic/direct/fallback rules, acknowledged drafts, relevant-context/request ownership and native lifecycle views; deterministic transport fault adapter available only to development tests. Authored mode does not pretend to analyze arbitrary explanations or add a fake wait.
- **Resilience and access:** IndexedDB acknowledgments/current/previous records, session-only saving, read failure/version/damage/conflict recovery, settings separated from case reset, controlled cue settlement, uncertain hard-reload history, full keyboard/non-drag route, touch, Largest/Roomier, reduced motion, sound off and named native alternatives if artwork/Canvas fails.
- **Personality:** Maximum Toast's covered/start/reveal/skip/magnifier/replay behavior; ignoring it or canceling before starting does not affect the case.

Only these **seven supporting states** defer to **TASK11.17**: UI.COMPARE.EMPTY/PARTIAL/READY, UI.TIMELINE.EMPTY/KNOWN and UI.IDEA.DRAFT/RECORDED. Their exact Item 06 behavior remains required in the finished game and is accepted by FIX11.TOOLS and TASK11.21. Do not expose nonfunctional buttons for them in the first milestone. The evidence tray, source reader, source selection for presentation/plans, search/story plan drafts and lead selection are included now; do not remove them by confusing them with the general My ideas editor.

First-build acceptance ends at TASK11.16 with actual connected-browser evidence. Final layered paintings, optional audio, TASK11.17 tools, genuine live interpretation, full final-art/browser qualification, participant evaluation and submission work remain later named tasks. Temporary graphics are marked as such in the developer review; the rich Item 08 finish remains the final requirement.

## Local project, prerequisites and consumed inputs

**Proposed implementation directory, not created by Item 11:**

```text
C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-game
```

**Authoritative design directory:**

```text
C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3
```

Use the existing directory only if later inspection confirms it is this Evidence Quest implementation; preserve any existing work and report an ownership conflict. Do not use the current terminal directory as a project locator. No access to proprietary projects is needed.

Consume the 29 recorded authority inputs in implementation-plan.json → inputEvidence, plus the master checklist and Item 11 plan/fixtures. Key responsibilities:

| Input | What is consumed |
|---|---|
| v3 §§1–9/11–12/15 | Story, literacy purpose, source relationships, route/cue meaning and preserved acceptance IDs. |
| Item 05 §§2–12 | All 107 scene/object/access identities, logical120×80 geometry, collisions/approaches, doorway arrivals and physical operations. |
| Item 06 §§2–12 | Supporting-layer ownership,93 original states/121 transitions, controls, responsive/focus/recovery rules and F01–F15. |
| Item 07 §§2–12 | All 548 canonical CT entries/families, exact source words/spans, character branches, cue captions, assistance and recap conditions. |
| Item 08 and its current register/crosswalks | Functional layouts/state visibility and the five illustrated quality targets. Current white Jo; no old cast restoration. |
| Item 09 schema/rules/registry/technical-copy | Seven public roots plus internal ModelProposal; CaseSnapshot/Session/SaveEnvelope lifetimes;5 technical CT entries/3 states. |
| Item 09 examples and coaching/traces | Labeled synthetic boundary inputs and failures;26 meaning cases,17 authored moves, NO_ELIGIBLE_MOVE technical routing; authored precedence and race rules. |
| Item 10 manifest | All 96 asset IDs,157 bindings, per-asset temporary methods, owners/anchors/variants/clips, shared profiles, composition rules and budgets. Q00/Q01 are creation tasks; their temporary files do not exist yet. |
| Item 11 acceptance-fixtures.json |72 scenario/boundary definitions plus 65 explicit orders with per-cue expected states/captions/pause behavior; future test inputs, not passed tests. |

Do not ship the 09 `canonical-note-copy-fragment` as full content. Construct the complete schema-valid AuthoredContent by transcription from05/07/09/10. Verify exact wording and source spans; bind native text rather than burning decisive words into images. A local compiled content copy records its source version/hashes and is regenerated when the authority changes.

Keep the existing choices: **TypeScript5.9.3, Vite8.0.10, React/react-dom19.2.7, plugin-react6.0.1, Node24LTS initial pin24.21.0, Ajv8.17.1 and Playwright1.61.0**. These are Item 09 baseline pins awaiting installation, lockfile/peer compatibility and runtime qualification; they are not a claim every version is latest. Verify compatibility in the future setup; document a concrete incompatibility before any narrow patch change. Do not switch renderer/framework/provider.

Use Canvas2D for the world, native React controls/readers for access, a single immutable state owner and serialized command/effect coordinator, IndexedDB for local saves, and the specified Node same-origin service. Keep strict compiler flags, explicit browser targets, NodeNext server output and standalone client validators from09 §8.

## Future setup, validation and run commands

**These are planned operating commands. They cannot run successfully in today's design-only directory.** TASK11.01 must first create the specified package and script contracts in the proposed implementation directory. No game package, dependencies, browsers or server were created during Item 11.

For the first authorized setup, write the pinned package/configuration and review the resulting lockfile after:

```powershell
Set-Location -LiteralPath 'C:\Users\TonyGuillaro\.codex\visualizations\2026\09\10\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1\evidence-quest-game'
node --version
npm --version
npm install
npm run validate:content
npm run check
npm run build:server
npm run test:contracts
npm run eval:coach -- --mode authored
npm run build
```

For subsequent clean reproduction use **npm ci**, not a broad dependency update. Initial npm install creates the reviewed exact lockfile; do not run npm ci without one. Scripts must have the behavior specified by09 §8, not merely these names.

For development, use separate project-owned terminals after the initial server compilation:

```powershell
npm run dev:types
```

```powershell
npm run dev:api
```

```powershell
npm run dev:web
```

The API defaults to127.0.0.1:8787 and Vite to127.0.0.1:5173 with strictPort and an /api proxy. If occupied, determine ownership and use an available project-specific port consistently; do not terminate another task's process. Record the actual ports/origin. For the built same-origin candidate:

```powershell
npm run start
```

The start script runs `node --env-file-if-exists=.env.server.local dist/server/index.js`; build produces dist/client and dist/server. The optional environment file may be absent. Vite preview is not the production server. These behaviors were checked against [Vite8 documentation](https://github.com/vitejs/vite/blob/v8.0.10/docs/guide/static-deploy.md) and [Node24 CLI documentation](https://nodejs.org/docs/latest-v24.x/api/cli.html) through Context7; installation/build remains unperformed.

Future browser setup and checks:

```powershell
npm exec playwright install chromium firefox webkit
npm run test:browser
```

Run only within the later authorized implementation scope. Test scripts run deterministic/authored cases by default; no paid live call in install/build/test/CI.

Initial configuration is **COACH_MODE=authored**; no OPENAI_API_KEY is required, inspected or sent to the browser. The public configuration reports authored availability honestly. Local prepared/direct help works without credentials/network; arbitrary text gets an authored topic/neutral response unless a later genuine live request interprets it. The fake transport exercises lifecycle faults and is clearly a test seam, never represented to a child or judge as live AI.

The future live operating command remains09's opt-in `npm run eval:coach -- --mode live --fixtures synthetic`, but it is **outside this first-build authorization** and must not be run automatically. Server-only secrets, adult-evaluation limits and the unresolved child-live eligibility conditions stay unchanged.

## Required connected walkthroughs

| Route | Actual player actions and observable result |
|---|---|
| Correct-first | Start/dismiss guidance → physically inspect ST.SOURCE.E4 → WK.ACCESS.NAV/NAV.MEDIA → optionally record a testable search plan before arrival → WK.EXIT.MD → local Ari/Loop/caddy → recover/handoff/dock → B,P,L → full rehearsal → Launch. No E3/Toast requirement and no invented cancellation revision. |
| Cancellation | Inspect E2's selected recording/photo/post components → choose the mistaken lead if desired → flatten and secure CY.SOURCE.E3 → optionally record a narrower idea or present actual E3 parts to Remy → freely continue search/recovery/rehearsal/premiere. Reading alone never sends evidence or fabricates a changed mind. |
| Media-first | ST.EXIT.WK → WK.EXIT.MD before earlier source inspections → local sources/resources available → collect with notes unread → return Stage → inspect portable notes there → complete the same case. No hidden clue gate. |
| Kit first | Collect caddy with Loop in Media → handoff at Stage bay before rail action → edit tiles with blank projection/actual missing Loop status → return for Loop → dock and rehearse the retained order. |
| Loop first | Leave caddy in Media → lead/dock Loop at Stage → see actual missing-kit status → retrieve caddy → handoff → arrange/rehearse. |
| Seed-only mistake | F,P,L: F sends only seed; P pauses with Pip left/Grandma holding seed; inspect notes/help or Continue; L stays dark/unplanted and pauses. Insert B after F, rehearse F,B,P,L anew; joint planting/light follows. No mandatory mistake on other routes. |
| Resume in both modes | Stop/view/door during a cue settles it once; return shows the correct mode/next cue; Continue resumes, Restart begins same order from initial state. Last-cue pause finalizes once. Hard reload restores acknowledged boundary with possible-exposure uncertainty. |
| Keyboard compact | Native Move to/actions/source readers/plan fields/tile Select/place → Arrange/Watch → rehearsal/Launch; Largest/Roomier, reduced motion and sound off preserve decisive text and both banks. Typing never moves the avatar. |

B=Joined Boats/TILE.BRIDGE; P=Hill/TILE.PLANT; L=Flower/TILE.BLOOM; F=One Boat/TILE.FERRY. All five accepted orders are BPL, FBPL, BFPL, BPFL and BPLF. Those abbreviations belong in build/test notes, not as an answer recipe in the child's interface.

The 65-order fixture protocol distinguishes pure empty-order evaluation from the actual empty-rail UI: empty Rehearse shows CT.WORK.EMPTY; it does not need to create a runtime empty run. Every unmet cue consumes its endpoint and waits for explicit Continue. Harmless Ferry continues without penalty. Certification requires the whole current successful rehearsal, including a trailing Ferry.

## Evidence needed to finish M11.CONNECTED

Execute TASK11.01–16 in dependency order after TASK11.00. Provide:

1. Exact project path, checked versions/lockfile and actual command results. No command listed above counts as run until executed.
2. Complete content/reference checks and production-handler tests against all 65 orders and the relevant09 accepted/rejected examples.
3. Browser-visible evidence for the three fresh routes, both recovery orders, unread-note handoff/reopening, all five successful plans, seed-only/unmet revision and both-mode interruption/finalization.
4. Keyboard/non-drag compact/Largest/reduced-motion evidence, visible focus restoration and exact source exposure including E2 first frame and canceled E3 flattening.
5. Actual save/recovery/reset/conflict behavior and truthful limitations. Use labeled synthetic browser fault injection; do not claim it proves actual every-device durability.
6. Authored/direct-help call counts/introduced facts and the request-lifecycle fault tests. The 27 meaning cases remain acceptance inputs for later live qualification; a scripted selected move cannot pass TASK11.19.
7. A review record identifying temporary assets and the 7 deferred supporting states. No required core interaction may be silently absent.

Core fixture set: FIX11.OPEN through FIX11.RECAP, excluding FIX11.TOOLS; FIX11.TOOLCHAIN/CONTENT/TEMP; authored/direct/draft and transport-fault coaching fixtures; FIX11.ORDER.00–64. Where a fixture has later final-art/live/participant criteria, pass only its applicable first-build part and leave the rest NOT_RUN. Do not mark the entire fixture passed because its local subset works.

## Complete future execution prompt

Copy this section only after Item 12's single readiness checkpoint has established the concrete starting scope.

> Execute **M11.CONNECTED**, the first complete playable Evidence Quest case, using the authoritative package at:
>
> C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3
>
> This request authorizes the isolated local implementation described in11-build-packet/FIRST-CONNECTED-BUILD.md and TASK11.01–16 of11-build-packet/implementation-plan.json. Confirm the recorded Item 12 checkpoint matches this scope; if it is missing, report that precise gap before treating implementation as authorized. Do not infer readiness from the title or length of the packet.
>
> Use the proposed implementation directory:
>
> C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-game
>
> Keep all game work there, preserve existing Evidence Quest work if present and verify directory ownership. The current terminal location is not authorization to inspect or modify a proprietary project. Do not create extra tasks/worktrees or use another task's port.
>
> Read the Item 11 entry point, first-build scope, plan, exact fixtures, issues and current master checklist. Follow source authority: v3 story/literacy,05 geometry/actions,06 interfaces/flows,07 exact words,08 rich illustrated direction/current white Jo,09 technical contracts,10 individual assets. Preserve every existing ID and the numeric case/content/save/coach versions. An older prompt, simpler diagram or partial content example does not replace the current package.
>
> Build the whole opening→four-room investigation→independent resource recovery→tile rehearsal→premiere loop. Include source/evidence access, NPC presentation, both optional plan-recording opportunities, source-component exposure, unread portable notes, physical Stage handoff, all rail operations, all 65 rule cases/five valid plans, read-only visible puppet consequences, correct interruption/resume/reset/save behavior, authored/direct help, native keyboard/touch/non-drag access and Maximum Toast. The world and avatar remain the main experience.
>
> Only the 7 comparison/timeline/general My ideas states listed in FIRST-CONNECTED-BUILD.md defer to TASK11.17. Do not silently omit required actions or show nonfunctional buttons. Do not impose reading/answer forms, mandatory mistakes, clue counts or AI approval.
>
> Create the currently nonexistent Q00/Q01 temporary equivalents using each Item 10 asset's method/anchors/owners. Keep them individually replaceable; do not make a flattened room screenshot stand in for interactive objects. The final illustrated quality is still required later.
>
> Set up the 09 pinned stack and actual scripts/lockfile. Validate full canonical content rather than shipping example fragments. Run authored mode with no credentials/network requirement. No paid live call, child-live activation, production artwork/audio manufacturing, provisioning, publication, deployment or submission is authorized by this milestone. Use a labeled local fake transport only for lifecycle fault tests.
>
> Implement and verify each bounded task, then complete the connected browser evidence in FIRST-CONNECTED-BUILD.md. Test real behavior, not a replacement toy rule model. Distinguish command checks, browser-visible evidence, injected faults and unperformed live/player/learning evaluation.
>
> Resolve routine implementation details within the frozen product contracts. Document a material incompatibility narrowly at its owning source; do not redesign the game or ask for confirmation at each task. If an external blocker appears, finish independent authorized work and state exactly what is blocked.
>
> Stop when M11.CONNECTED's applicable acceptance evidence is complete. Open the actual playable result in the browser and provide its local address, project path, what the child can do, exact checks/results, temporary/deferred work and any remaining failure. Update only the implementation/checklist statuses evidenced by this work. Do not advance to final art, live qualification or release merely because the first build is done.

