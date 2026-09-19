# Evidence Quest — Master Checklist and Build Readiness

**Updated:** September 12, 2026  
**Current stage:** the corrected connected game has completed independent native walkthroughs, including purposeful reading, vocabulary, investigation, failed and revised rehearsal, interrupted/resumed premiere and replay. All 52 required original image sources are integrated and reviewed in play. The final App-BzEahbjQ candidate passes 63 affected browser checks and its native saved-case/replay/earned-reading review. The isolated format matrix records 13 passes and two WebKit DPR2 active-cadence failures (51/52 ms p95 against 33.34 ms); transfer, code, usable-time, input and scoped memory limits pass in all 12 measured conditions. The configured live evaluation is halted at 1/75 attempts on exhausted API credit.  
**Next work item:** resolve the remaining WebKit DPR2 active-cadence qualification under ER13.06–07 / TASK11.20–21; resume the existing capped evaluation under ER13.08 / TASK11.19 only after available API credit is confirmed. First-time participant evaluation and final demonstration remain Items 15–16.  
**Current authority:** [Playable story and literacy correction](13-EXPERIENCE-AND-LITERACY-CORRECTION.md). This dated user-directed correction supersedes the earlier first-build-only stop and narrow educational coverage. Earlier checked design items describe historical document completion; they do not establish the newly clarified requirements or successful player experience.

The active game and execution record are in `C:\Users\TonyGuillaro\OneDrive - Summit Gov Solutions\Documents\ChatGPT\Evidence quest`. Its `BUILD-STATUS.md` tracks implementation. [Independent native observations](13-experience-correction/PARENT-NATIVE-REVIEW.md) distinguish observed gameplay and actual browser speech from unperformed participant appeal, voice-quality and learning evaluation. These observations are developer evidence, not user approval or child-testing results.

This checklist governs the next work, replacing the premature prompt to immediately build the complete prototype. The narrative and system-planning work already completed remains the design basis. Do not restart the story or invent a different game to fill implementation gaps.

Source: [Evidence Quest — Complete Game Specification v3](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/Evidence-Quest-Complete-Game-Specification-v3.md).

## How to use this checklist

- **Defined:** concrete content or rules exist in the cited specification. This does not mean implemented, playtested, or proven effective.
- **Partial:** useful material exists, but the named deliverable still has material gaps.
- **Missing:** the required deliverable has not been produced for v3. Old rejected mockups do not fill the gap.
- **Later:** belongs to implementation or evaluation; do not claim it is complete now.

Check a box only when its stated completion evidence exists. Mentioning a feature in prose is not enough to complete its detailed design. Record user decisions when actually made; do not invent approval or treat routine detail decisions as requiring a new permission question.

For each future work session, name the checklist IDs being handled, complete their deliverables, record evidence and any remaining gap, then identify the next dependency. Do not move into code, visuals, or another phase simply because the previous response ended. Use the current user instruction to determine the authorized scope.

## A. Design foundation already written

These items are complete as narrative/system design. Later usability or implementation findings can justify targeted corrections; they do not justify repeatedly reopening settled choices.

- [x] **01 — Product purpose, audience, and bounded case.** Evidence Quest, ages 9–12, narrative mystery adventure, literacy purpose, meaningful AI role, and one compact SparkFest case. Evidence: v3 §§1–2, 13. Completion means the intended player, experience, and product purpose are stated; it does not mean the final workload has been validated.
- [x] **02 — Complete story and character knowledge.** Opening, player’s role and connection to Pip, fixed history, cancellation misunderstanding, Loop’s move, character motives/knowledge, connected rehearsal, and ending. Evidence: v3 §§1–3, 8. No new story development is required to start item 05.
- [x] **03 — Educational design.** Primary skill, supporting comprehension, source connections, mistaken reasoning, assistance levels, and distinction between success and observed understanding. Evidence: v3 §§4, 6–7, 11, 15. Child appeal, difficulty calibration, and learning effects remain later evaluation.
- [x] **04 — Game rules and complete route logic.** Four-space topology, interaction vocabulary, correct-first and mistaken routes, early Loop discovery, puppet action rules, valid outcomes, reset/save principles, AI boundaries, and optional gag. Evidence: v3 §§5, 7–12. The symbolic rehearsal check covers 65 arrangements and five successes. This is not runtime verification or detailed layout completion.

## B. Pre-build deliverables still needed

### 05 — Functional scene layouts and object contracts

**Status: Defined.** The four spatial plans and required-object contracts are complete as functional design. Evidence: [05 — Functional Scenes and Interactions](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md), §§2–13. No running implementation, visual-design approval, accessibility qualification, or player testing is claimed.

- [x] Define each of the four rooms as functional space: entrances/exits, walkable regions, obstacles, player spawn points, Loop’s entry/follow/dock positions, and camera bounds. Evidence: 05 §§2, 4–7, 8.3.
- [x] Place every required object, character, source, and control so the player can discover, approach, and use it. Evidence: 05 §§4–7 and completeness crosswalk §12, including fixed/portable source copies.
- [x] Define stopping points, targeting priorities, interaction cues, and how overlapping or unavailable targets behave. Evidence: 05 §§2–3, room tables and §8.
- [x] Give each object a stable ID and a contract: available states, player input, preconditions, visible response, persistent change, repeat/cancel behavior, and accessible alternative. Evidence: 05 §§3, 8–9, 11–12.
- [x] Walk the correct-first, mistaken, and Media-first routes through those layouts; check that later information makes revisits useful and travel remains short. Evidence: 05 §10's ten written routes; §13.2's limited 58-anchor coordinate check. Travel estimates are unmeasured design estimates.
- [x] Specify how small-screen and non-spatial navigation preserve the same information and actions. Evidence: 05 §11 and accessible route §10.10; runtime access testing remains later.

**Completion evidence:** four functional scene plans, stable object/access IDs, shared and per-object contracts, before/after ownership, route traces, access behavior, and a v3 completeness crosswalk in the linked 05 document. Written reviews corrected projection occlusion, unread-note handoff, and interruption/exposure ambiguities. No unresolved functional layout decision remains; later interface/art/technical work must consume these contracts.

**Depends on:** 01–04. **Completed as design; its interface handoff is now defined in 06.**

### 06 — Complete interface and player-flow specification

**Status: Defined.** The functional interface states, layouts, controls, transitions, and recovery paths are complete as design. Evidence: [06 — Complete Interface and Player Flows](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md), §§1–14. No running implementation, browser verification, accessibility qualification, or player testing is claimed.

- [x] Inventory first start, continue, in-world objective/help, pause/settings, and exit/resume behavior. Evidence: 06 §§2–4, 10; flows F01, F10, F14.
- [x] Define source inspection, clip scrubbing, evidence tray, comparison, timeline, theory entry, and presenting evidence. Evidence: 06 §2 C5, §§3, 5–6; flows F02–F03, F05.
- [x] Define tile collection, placement, swapping, removal, playback, paused/unmet/successful rehearsal, and launch. Evidence: 06 §§7–8, 11; flows F04–F11, F13, including all five valid arrangements.
- [x] Define coaching entry, waiting, ordinary hints, direct help, unavailable service, and stale-response behavior as visible player experiences. Evidence: 06 §9; flows F07, F12, including fallback acceptance and late-response handling.
- [x] Define save failure, incompatible save, reset confirmation, interrupted playback, completion, and recap variants. Evidence: 06 §§10–11; flows F09–F11, F14.
- [x] Specify hierarchy, navigation, focus restoration, text-entry behavior, and keyboard/non-drag equivalents for those states. Evidence: 06 §2 C1–C6, responsive layouts in §3, access crosswalk in §12, and keyboard/small-screen flow F13.

**Completion evidence:** 93 declared interface states, functional layout schematics with responsive variants, 121 named transitions, 15 written scenario flows, an Item 05 object/access crosswalk, and a six-subitem coverage check in 06 §14. Shared contracts specify input ownership, interruption order, draft handling, return focus, and source exposure; explicit exceptions cover changed owners, playback modes, coaching races, and recovery. One narrow clarification, D06-01, distinguishes acquiring E2's actual post package from exposing each component; it is recorded in 05 and 06 without changing source meaning. No unresolved functional interface decision remains. Structural and written checks are design evidence, not executed game tests.

**Depends on:** 05, using the existing state rules. **Completed as design; its content handoff is now defined in 07.** Final styling remains Item 08.

### 07 — Complete child-facing content and content references

**Status: Defined.** The canonical child-facing content, variants, conditions, source references and access/assistance boundaries are complete as content design. Evidence: [07 — Complete Child-Facing Content and References](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md), §§1–14. No running implementation, live-model validation, accessibility qualification, child testing or learning result is claimed.

- [x] Preserve and freeze the existing decisive source wording and canonical passage IDs; copies retain the same source identity. Evidence: 07 §2 source/component/passage/copy registry and §14.4 frozen-text comparison.
- [x] Complete required objective, instruction, control, caption, accessible-description, error/recovery, and recap copy for items 05–06. Evidence: 07 §§3–4, 6, 8–10; complete state and action crosswalks §§11–12.
- [x] Bind NPC responses and authored hints to the relevant evidence and state conditions; define a useful fallback for unsupported combinations. Evidence: 07 §§5/7 dialogue and coaching matrices, current-progress variants, neutral fallback and lifecycle messages.
- [x] Define any simpler reading variants actually included in scope, preserving timing, negation, conditions, and uncertainty. Evidence: 07 §10.2 explicitly includes no new rewritten-source mode; existing exact-text enlargement, spacing, vocabulary, captions and component access are fully specified.
- [x] Record assistance/output exposure accurately; direct help must not falsely mark unread sources as read. Evidence: 07 §§2.3, 7, 10.3; written flows F03/F05/F07/F12 and factual recap conditions in §9.
- [x] Check text, evidence, dialogue, and consequence descriptions against one fixed story truth. Evidence: 07 §13's fifteen written routes and semantic audit, 65-order authored-rule check and §14.4 document verification.

**Completion evidence:** one catalog with 548 stable content entries/families; bindings for all 93 Item 06 states and 121 named transitions; an Item 05 object/access crosswalk; and evidence for all six subitems in 07 §14.1. The comparison of 147 frozen text entries/excerpts found no wording mismatches. All five valid rehearsal arrangements retain their actual consequence captions and identical eligibility/payoff. Written review resolved partial-account/current-resource wording, private-record versus delivery labels, source-exposure limits and honest recap variants. No unresolved material content decision remains; runtime/player evidence remains later work.

**Depends on:** 05–06. **Completed as content design; its visual handoff is now defined in 08.** Canonical source wording remains unchanged. Item 08 uses the actual content and functional layouts.

### 08 — Visual direction and readable scene/interface designs

**Status: Defined; visual direction revised to the user's illustrated-quality requirement.** The user selected the rich cast/Stage illustration quality for the actual game and requested Jo as a white girl. The revised cast and all four illustrated rooms establish that finish; the simpler drawings specify functional layouts and states only. Evidence: [08 — Visual Direction and Readable Designs](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-VISUAL-DIRECTION-AND-READABLE-DESIGNS.md), §§1–11, and its [static visual gallery](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-visual-designs/index.html). The user-selected direction does not imply approval of every new image, a playable prototype, runtime qualification or child validation.

- [x] Establish the camera angle, character scale, world readability, typography, palette, lighting, and visual interaction hierarchy. Evidence: 08 §2; V08-DIRECTION, clean room compositions and measured design contrast.
- [x] Design the player, Loop, Jo, Remy, Ari, and puppet-world characters as one consistent set with recognizable silhouettes. Evidence: 08 §3; V08-CAST-ILLUSTRATED, matching white Jo in Stage and functional diagrams, backpack/Loop references and recurring scene/storyboard figures.
- [x] Translate the functional room plans into consistent scene designs without changing their evidence or interaction logic. Evidence: 08 §4; four illustrated appearance references, eight clean functional room-state diagrams and eight annotated companions. Item 05 retains exact geometry; production art must fit those bounds while preserving the selected finish.
- [x] Design the supporting interface states around the world, including readable sources and accessible focus/selection treatment. Evidence: 08 §§5/7; actual shared-pattern designs, Largest/Roomier and compact variants, and all 93 state/121 transition visual/content bindings.
- [x] Define the shared animation/feedback language and contrast between ordinary discovery, unmet rehearsal conditions, and successful launch. Evidence: 08 §6; operation/rehearsal/Toast/premiere storyboards, reduced-motion equivalents, exact interruption behavior and all five valid plan outcomes.
- [x] Review representative scenes and critical states as a coherent direction before producing the full asset set. Evidence: 08 §§8–9; thirteen written routes, rendered-image review, corrected artifacts, seven frozen-source checks and measured control/contrast checks. These are design reviews, not browser or player tests.

**Completion evidence:** the linked specification and 110 current references: five illustrated quality targets and 105 functional diagrams with applicable editable SVGs, plus static gallery/contact sheets, artifact register, all-state/content and transition crosswalks, provenance and design checks. The selected rich finish applies throughout gameplay; the simple diagrams are not final game art. Source wording/exposure, resource ownership, both-bank consequences, current certification versus historical premiere, ordinary/direct help and recovery remain represented. All six subitems are defined. Layered production artwork, enjoyment, learning, font fallback and runtime access/performance remain later work.

**Depends on:** functional decisions in 05–06 and canonical content in 07. **Completed as visual design; the next task is 09.** Items 01–07 remain the design foundation. No room geometry or source/puzzle rule changed, and no production asset set or game implementation was created.

### 09 — Concrete technical decisions and implementation contracts

**Status: Defined.** Technology choices, module ownership and concrete content/state/service/save contracts are complete as technical design. Evidence: [09 — Technical Decisions and Implementation Contracts](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/09-CONCRETE-TECHNICAL-DECISIONS-AND-IMPLEMENTATION-CONTRACTS.md), §§1–12, and the [supporting contract index](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/09-technical-contracts/README.md). No production implementation or live/browser qualification is claimed.

- [x] Select the renderer/runtime, navigation method, native accessible interface integration, and project structure using the actual scene requirements. Evidence: 09 §§1–3; Canvas 2D/React/TypeScript, physical path/approach rules and complete 93-state/121-transition ownership crosswalk.
- [x] Select the model/service and specify live-versus-authored coaching behavior, validated request/response schema, eligibility rules, cancellation, fallback, and observation records. Evidence: 09 §§4/6–7; schema, CONTRACT-RULES R06 and coaching eligibility/evaluation matrix. Model access and live-child data requirements remain explicitly unverified external conditions.
- [x] Specify concrete content, world-state, puppet-state, and save formats with versioning and recovery behavior. Evidence: 09 §§4–5/7; seven schema roots, cross-field rules, accepted/rejected examples, write/restore and interruption contracts.
- [x] Verify current official documentation, component licenses, service availability, and likely operating constraints; keep secrets server-side. Evidence: 09 §§7/9; dated official documentation/license/cost references, documented capability separated from account access and later package/runtime qualification.
- [x] Define local development/evaluation operation and a later hosting route without deploying or provisioning paid services merely to complete the document. Evidence: 09 §8; future commands/configuration, authored operation, bounded synthetic evaluation and a later Render route. No setup/install/server/model call/deployment was performed.

**Completion evidence:** the decision record and concrete machine-checkable contracts exist. Executed local checks matched 35 schema expectations, 29 bounded semantic-fixture expectations and 28 reference/rule groups; 65 tile arrangements yield exactly five successes. [Validation report](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/09-technical-contracts/validation-report.json). These are document-contract and isolated rule checks, not browser tests, live-model evaluation, child playtesting or proof of learning. Routine implementation verification and unverified account conditions are recorded with their impact; no missing major product behavior is delegated to the builder.

**Depends on:** 04–08. Individual asset exports and production planning consume this item next; package installation, model-account qualification and actual runtime validation belong to the later authorized build/evaluation.

### 10 — Individual asset manifest and production plan

**Status: Defined.** Individual production requirements are complete: 96 reusable assets, 246 asset/native variants, 260 planned runtime export alternatives, 28 animation clips, six sounds and 157 owner bindings. Evidence: [10 — Individual Asset Manifest and Production Plan](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/10-INDIVIDUAL-ASSET-MANIFEST-AND-PRODUCTION-PLAN.md), [authoritative manifest](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/10-asset-production/asset-manifest.json), [object/state/transition crosswalk](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/10-asset-production/ASSET-STATE-CROSSWALK.md) and [validation report](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/10-asset-production/validation-report.json). This is asset planning; no production images/audio, game implementation or runtime qualification is claimed.

- [x] Assign every required environment, character, object, puppet element, interface graphic, animation, and sound a stable asset ID.
- [x] Define each asset’s use, variants/states, dimensions or scale constraints, format, anchors/hit regions where applicable, and reuse relationships.
- [x] Specify which assets are original-created, generated, licensed, or temporary, with provenance and license fields.
- [x] Prioritize the assets needed for the first connected playable case, followed by replacement/polish and optional work.
- [x] Define animation/audio timing and fallback expectations where they affect comprehension or interaction; use a restrained production budget.

**Completion evidence:** individual IDs/variants, precise export dimensions and anchors, unchanged Item 09 AssetUse bindings, source/exposure boundaries, provenance and explicit unknowns, per-asset temporary equivalents, ordered production groups, animation/audio contracts, and calculated transfer/decoded budgets. The crosswalk covers 107 Item 05 identities, 96 interface states (93 existing plus three technical) and 121 transitions. Seven schema checks and 58 document/reference/arithmetic checks pass; fifteen route checks are written design traces, not executed gameplay.

**Depends on:** 05–09. **All final assets do not have to be manufactured before coding.** Their requirements and production order must be defined; decorative polish and remaining exports can be produced during implementation.

### 11 — Final Codex build packet and revised schedule

**Status: Defined.** The integrated handoff is complete as documentation. Evidence: [11 — Final Codex Build Packet and Revised Schedule](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md), §§1–9, and its [validation report](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/11-build-packet/validation-report.json). No game, production assets or live-model result is claimed. Item 12 now records design readiness separately from absent implementation authorization.

- [x] Create one entry point identifying the current authoritative files and superseded material. Evidence: 11 §§1–3; 29 authority-input hashes, current source responsibilities and explicit legacy architecture/schedule/art/reset/exposure precedence.
- [x] Package the scene plans, interaction contracts, complete interface/content catalog, visual direction, asset manifest, and technical contracts without contradictory duplicate truth. Evidence: 11 §2; unchanged01–10 authority, plan typed references and generated crosswalk; derived files identify their owning inputs and regeneration.
- [x] Map each story, education, gameplay, AI, accessibility, save/recovery, and personality requirement to an implementation task and acceptance check. Evidence: implementation-plan.json and REQUIREMENT-TO-BUILD-CROSSWALK.md;35 bounded tasks and74 requirements/checks, including all52 existing acceptance IDs and complete owner/state/transition/content/source/asset/contract membership.
- [x] Specify the first connected playable milestone, its temporary assets, local setup requirements, and exact completion boundary. Evidence: FIRST-CONNECTED-BUILD.md and TASK11.01–16; four-room case, individual Q00/Q01 creation, authored default, future operating commands/execution prompt and browser evidence;7 secondary supporting states explicitly assigned to TASK11.17.
- [x] Convert the proposed checks into concrete fixtures/scenarios where appropriate, including all equivalent valid plans and assistance cases. Evidence: acceptance-fixtures.json;72 scenario definitions plus65 explicit unique-tile orders with exact per-cue states/captions, five successes, source/assistance context and recovery boundaries. These are future acceptance inputs, not runtime passes.
- [x] Update time and effort estimates from the remaining work and current deadline. Do not carry forward the old dated schedule or 60-hour allowance as a verified forecast. Evidence: corrected REVISED-SCHEDULE.md and Item 12 §10; refreshed official deadline, historical unmeasured ranges (including first build), six separated AI-led estimate dimensions, explicit calibration and required delivery work. Prior deficit conclusion withdrawn; current elapsed durations uncalibrated.
- [x] Explicitly list unresolved items with their impact, chosen default, and whether they block the first build. Avoid hidden design assumptions. Evidence: OPEN-ISSUES-AND-DEFAULTS.md; ten actual readiness/setup/production/capacity/live/runtime/delivery/evaluation conditions, named affected tasks/gates, defaults, resolving evidence and independent work.

**Completion evidence:** one authoritative entry point,35 bounded tasks,74 requirement/check mappings,137 fixture inputs, first connected execution instructions and an honest revised schedule. Executed document checks cover identifiers, original acceptance-ID preservation, references, dependency ordering, source/asset coverage, all65 arrangement outcomes, effort/date arithmetic, negative controls, derived views and preservation of all280 pre-existing files except this permitted checklist update. That dated Item 11 result is preserved in the Item 12 historical archive. Current Item 12 checks permit its own completion and preserve Items 01–10 and 13–16. Browser/gameplay, live AI, production quality, participant/learning evidence and deployment remain unperformed.

**Depends on:** 05–10. **Completed as the build packet; Item 12 review is now documented below.**

### 12 — One build-readiness checkpoint

**Status: Complete as a documented readiness review — READY FOR THE FIRST CONNECTED BUILD.** Evidence: [12 — Build-Readiness Checkpoint](12-BUILD-READINESS-CHECKPOINT.md), [correction register](12-readiness/CHANGE-REGISTER.md), and [current scoped validation](12-readiness/validation-report.json). This is one reviewable handoff, not a separate permission request for every task.

- [x] Confirm items 05–11 have their required evidence, or explicitly scoped non-blocking deferrals. Evidence: checkpoint §§2/9 and preserved authoritative source hashes.
- [x] Trace one complete correct-first route and one mistaken route through actual scene plans, content, state rules, and interface states. Evidence: checkpoint §§3–5; actual actions, IDs, exposure and recovery.
- [x] Check that the learning still depends on the intended source relationships and that feedback does not accidentally supply the answer first. Evidence: checkpoint §7; corrected preview/record fixture expectations; no comprehension gate.
- [x] Confirm the necessary initial assets or specified temporary equivalents are ready or included in the first implementation task. Evidence: checkpoint §9; explicit Q00/Q01 creation in TASK11.03–04, no manufactured assets claimed.
- [x] Present the concrete first-build scope, remaining risks, and what will be testable at its end. Evidence: checkpoint §§1/6/8–11 and corrected FIRST-CONNECTED-BUILD.md.
- [x] Proceed to implementation only within the user’s authorization for that concrete scope. Evidence: checkpoint §§1/11 records authorization absent and implementation unstarted; future prompt reviewed, not executed. This checked box enforces the boundary and does not grant permission.

**Completion evidence:** Items 05–11 matrix, two full written contract traces, alternative/recovery/education/AI/asset audit, corrected AI-led estimation basis, scoped validation and exact first-build handoff. TASK11.00/M11.READINESS are DOCUMENTED_COMPLETE only. No product, live-service, art or browser qualification is inferred.

**Implementation authorization:** not granted by this checkpoint. A subsequent instruction can authorize M11.CONNECTED as one bounded local milestone. No per-task approval loop is required. **Next: 13 — Connected gameplay implementation.**

## C. Work after the pre-build handoff

These are part of the overall project checklist, not work required to finish every design item before any code can exist.

- [x] **13 — Connected gameplay implementation.** The isolated game implements the corrected opening→investigation→recovery→rehearsal→premiere loop, with all 52 required original art sources integrated. Parent-controlled browser walkthroughs include physical exploration, either resource first, failed and revised rehearsal, completed premiere, interruption/resume and replay. The recorded cross-engine baseline passed fresh correct-first, cancellation and Media-first routes. [Actual native evidence and candidate boundaries](13-experience-correction/PARENT-NATIVE-REVIEW.md). This closes connected implementation only; Item 14's performance and live-model qualification and Items 15–16 remain open.
- [ ] **14 — Asset production, live AI, and hardening.** Produce/replace assets according to the manifest, integrate the real coaching service and fallback, complete accessible operation, saving, interruptions, and expressive feedback. These can overlap safely after their dependencies are defined.
- [ ] **15 — Evaluation and targeted revision.** Distinguish deterministic/runtime checks, browser walkthroughs, first-time usability observations, child playtesting, and learning evidence. Test what actually exists; do not claim unperformed validation. Feed material findings back into the relevant design entries.
- [ ] **16 — Final demonstration and submission preparation.** Record functioning gameplay, verify the educational/AI claims, complete disclosures and asset provenance, recheck official requirements and access, and prepare the final materials. Publish/submit only within the user’s authorization.

## Current next-step boundary

**Implement the user-directed [Item 13 experience and literacy correction](13-EXPERIENCE-AND-LITERACY-CORRECTION.md).** The first connected technical build has been completed in the dedicated game project. Its temporary visual presentation and incomplete narrative/literacy experience were rejected by the user. The September 12 instruction authorizes the specified corrective implementation and necessary illustrated production; prior first-build-only instructions do not prevent those corrections.

Track the correction through the existing build tasks with these linked entries. These boxes are open until actual implementation and the stated acceptance evidence exist:

- [x] ER13.01 — implemented opening, festival, crew, Loop, story and purpose. Native review observed the opening and broken-bridge model; first-time child comprehension remains to be evaluated.
- [x] ER13.02 — current mission, recoverable story context and meaningful physical routes. Native resource recovery, physical handoff, room travel and interrupted-premiere return were observed.
- [x] ER13.03 — purposeful reading practice, actual spoken model, phrase support, rereading and narrator card. Actual browser speech initiation and reading controls were observed; no fluency score or learning gain is inferred.
- [x] ER13.04 — contextual vocabulary, repeated meaningful encounters and preserved exposure boundaries. Native review checked both meanings of “still” and neutral transfer examples; vocabulary mastery is not inferred.
- [x] ER13.05 — reachable-copy correction with source-preservation evidence. Current runtime copy register records 586 CT entries with all original CT.SRC bodies and 35 references retained; native review caught and verified repairs to stale E3 descriptions, source grouping and Toast wording.
- [ ] ER13.06 — illustrated characters/objects/scenes and understandable consequences in motion. All 51 accepted manifest sources plus Stage are delivered with matching original/copy hashes; production verification covers 267 WebP/PNG pairs with exact decoded RGBA equality. Native review passed corrected carrying scale, exterior controls, source enlargement, cold actor/photo presentation, objective visibility, the bounded Stage sign and connected paper-story consequences. Complete compact Watch graphics and captions pass in the final affected browser suite. This remains open because WebKit DPR2 active cadence measures 51 ms for WebP and 52 ms for PNG against the unchanged 33.34 ms limit. [Source delivery](13-experience-correction/ACCEPTED-ART-DELIVERY.md), [native findings](13-experience-correction/PARENT-NATIVE-REVIEW.md), [final qualification evidence](13-experience-correction/packing-review/final-20260912-bzeahbjq/README.md).
- [ ] ER13.07 — corrected playable routes, accessibility/save regression and independent visual review. Final App-BzEahbjQ passes 63 affected browser checks across Chromium, Firefox and WebKit (zero failed, flaky or skipped), plus 39 production contract checks and five codec/ledger checks. Parent-controlled ordinary Continue, physical Replay premiere and the earned reading passage passed after the final preview restart without resetting a save. The isolated format matrix records 13 passes and two active-cadence failures; every one of the 12 browser/density/format conditions passes transfer, code, usable-time, input and scoped memory limits. This remains open for the two WebKit DPR2 cadence failures; physical-device performance and actual app-window foreground return are also unverified. Earlier candidate failures and their repairs remain historical evidence, not a single combined final suite. [Final evidence](13-experience-correction/packing-review/final-20260912-bzeahbjq/README.md), [prior failures](13-experience-correction/packing-review/active-cadence-and-compact-20260912/README.md).
- [ ] ER13.08 — real coaching integration and explicit live status. Adapter and synthetic checks exist. The user-authorized capped evaluation executed and halted after attempt 1/75 on HTTP429 `credit_balance_exhausted`, with no model selection. Configuration and paid permission are satisfied; available API credit is the current dependency. [Actual live result](13-experience-correction/LIVE-EVALUATION-STATUS.md). Authored default remains active and child-live is not enabled.

Completion evidence for ER13.01–05 is the linked parent native review plus the runtime `docs/ER13-COPY-REGISTER.md`, `evidence/er13/native-speech.json`, `evidence/er13/review-ledger.md` and `evidence/er13/checkpoint-evidence.json`. The checkpoint ledger records named outcomes across successive candidates; its totals must be read with those candidate identities. The final candidate's 63-case affected suite and separate 15-case qualification matrix are preserved with their own identities and results; they do not make the cumulative ledger a single final full-suite run. Source acceptance and deterministic checks do not close the remaining performance or live-model gaps.

Original numbered task definitions and technical evidence remain in the game's imported package. The correction supersedes only the specified experience/scope decisions and must retain working mechanics. Participant appeal and learning effects require actual evaluation and remain unproven.

The earlier 190–314 and 69–114/68–112-hour ranges remain historical unmeasured assumptions. They are not AI execution forecasts or proof of deadline infeasibility. Current AI/human/asset/test/wait durations are uncalibrated; calibration occurs within authorized existing tasks. Required illustrations are delivered and integrated; final runtime qualification and meaningful live interpretation evidence remain outstanding.

The preceding Item 12 descriptions are historical design-review evidence. The original imported bytes are preserved in the game project and its design-import inventory. The September 12 correction is active work; do not use historical statements that implementation had not started as the current project status.

