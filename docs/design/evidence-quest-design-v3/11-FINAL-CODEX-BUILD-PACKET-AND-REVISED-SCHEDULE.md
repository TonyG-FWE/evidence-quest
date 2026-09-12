# Evidence Quest — Item 11: Final Codex build packet and revised schedule

**September 11, 2026. Integrated design handoff; game implementation has not started.**

Start here to build the intended four-room adventure without reconstructing decisions from this conversation. The packet assigns **35 bounded tasks**, preserves **all 52 existing acceptance IDs**, adds22 handoff requirements, and supplies **72 scenario fixtures plus 65 explicit tile arrangements**. It preserves the current story, literacy purpose, physical interactions and rich illustrated finish.

**Item 12 correction:** the original 190–314-hour range mixed unmeasured preparation, illustrator workload and implementation/review allowances. It is not an AI execution forecast and does not establish deadline infeasibility. The current plan separates human attention, Codex elapsed iterations, AI-assisted asset preparation, integration/testing and waits; durations remain uncalibrated. Historical assumptions and dated validation are preserved.

**Item 12 is now documented complete: READY for M11.CONNECTED.** [Read the checkpoint](12-BUILD-READINESS-CHECKPOINT.md). The next checklist item is **13 — Connected gameplay implementation**. This documentation does not authorize or start it.

## 1. Enter and execute in this order

| Read | What it gives the builder |
|---|---|
| [Master checklist](EVIDENCE-QUEST-MASTER-CHECKLIST.md) | Current phase, completed design evidence and exact boundary before implementation. |
| This entry point | Source authority, supersession, product invariants, handoff use and evidence limits. |
| [Implementation plan](11-build-packet/implementation-plan.json) | Authoritative TASK11 dependencies/boundaries, historical allowances and current uncalibrated AI-led estimates,74 requirement/check assignments, typed reference ownership, milestones and schedule inputs. |
| [Requirement-to-build crosswalk](11-build-packet/REQUIREMENT-TO-BUILD-CROSSWALK.md) | Readable generated requirement→task→check→fixture coverage. |
| [Acceptance fixtures](11-build-packet/acceptance-fixtures.json) | Exact initial boundaries, exposed-source/assistance context, actions, expected logical/visible results, unchanged facts and recovery; all 65 orders with cue endpoints. |
| [First connected build](11-build-packet/FIRST-CONNECTED-BUILD.md) | Exact first scope, temporary asset creation, proposed isolated path, future setup/run commands, complete future execution prompt and stopping point. |
| [Revised schedule](11-build-packet/REVISED-SCHEDULE.md) | Current deadline/time zones, separated AI-led estimation dimensions, dependencies, calibration, delivery target and historical allowances. |
| [Open issues/defaults](11-build-packet/OPEN-ISSUES-AND-DEFAULTS.md) | Ten tracked conditions, their defaults/affected gates, completed readiness versus pending authorization, and required evidence. |
| [Validation report](11-build-packet/validation-report.json) | Actual document/reference/arithmetic/preservation results, hashes and unperformed runtime/live/player work. |

After the completed Item 12 review and a subsequent implementation-scoped user instruction, start TASK11.01 and follow dependencies through TASK11.16. Do not interpret an old prototype prompt, a completed design item or a future command block as authorization to begin now.

## 2. Source authority and versions

Existing01–10 decisions remain product truth. Use this ownership map to resolve a topic; later detailed authority overrides earlier broad proposals only for that topic.

| File(s) | Governs |
|---|---|
| [Complete specification v3](Evidence-Quest-Complete-Game-Specification-v3.md), §§1–9/11–12/15–16 | Case/story/cast knowledge, primary literacy purpose and honest observations, source and cue meanings,52 original N/L/G/P/R/A/X/H/D acceptance IDs and the future2:45 demo concept. Later sources below refine implementation/copy/geometry. |
| [Item 05](05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md) | Fixed120×80 room coordinates; collisions, thresholds, arrivals/approaches; physical object/access actions, ownership and interruption endpoints. |
| [Item 06](06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md) |93 interface states,121 named transitions, functional layouts, layering/input/focus, component exposure, source/tools/plan/workstation/help/save/return behavior and F01–F15. |
| [Item 07](07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md) |548 exact CT entries/families, canonical source components/passages/copies, conditional NPC/hint/recap wording and assistance boundaries. |
| [Item 08](08-VISUAL-DIRECTION-AND-READABLE-DESIGNS.md) and [artifact register](08-visual-designs/ARTIFACT-REGISTER.md) | Current rich illustrated appearance; functional visual layouts and readable state composition. Register identifies each current reference. |
| [Visual state crosswalk](08-visual-designs/STATE-CROSSWALK.md), [transition crosswalk](08-visual-designs/TRANSITION-CROSSWALK.md) | Existing state/transition→functional visual/content references, not new game behavior. |
| [Visual provenance](08-visual-designs/PROVENANCE.md), [illustrated revision record](08-visual-designs/ILLUSTRATED-REVISION-PROMPTS.md) | Reference creation/provenance, current white-Jo revision and which historical images are superseded. Prompts here are records, not renewed editing instructions. |
| [Item 09](09-CONCRETE-TECHNICAL-DECISIONS-AND-IMPLEMENTATION-CONTRACTS.md), [contract index](09-technical-contracts/README.md) | Selected technology/model/service, ownership and event ordering, input/rendering, save/restore, service mode/configuration, future local/hosting operation and external constraints. |
| [Contract schema](09-technical-contracts/contracts.schema.json), [semantic rules](09-technical-contracts/CONTRACT-RULES.md) | Seven public root formats; internal ModelProposal; cross-field validity, source/exposure/event chronology and complete-run certification. Valid JSON shape alone is insufficient. |
| [Reference registry](09-technical-contracts/REFERENCE-REGISTRY.json), [handler ownership](09-technical-contracts/OWNERSHIP-CROSSWALK.md) | Existing IDs and their responsible handlers. Registry does not replace source words. |
| [Technical copy](09-technical-contracts/technical-copy.json) | Five CT.TECH additions and three UI.TECH states complementing07/06; no new clue. |
| [Coaching/evaluation](09-technical-contracts/COACHING-AND-EVALUATION.md) |17 authored meaning-sensitive moves, technical abstention, authored precedence,26 synthetic cases and proposed service instructions. |
| [Examples](09-technical-contracts/examples.json), [technical traces](09-technical-contracts/TECHNICAL-TRACES.md) | Labeled synthetic contracts and written route/race/recovery traces. They are not a full production content package or actual participant histories. |
| [Item 09 schema results](09-technical-contracts/schema-validation.json), [validation results](09-technical-contracts/validation-report.json), [package audit](09-technical-contracts/package-audit.json) | Prior dated, bounded design/schema/reference evidence and its limits; retained unchanged. |
| [Item 10](10-INDIVIDUAL-ASSET-MANIFEST-AND-PRODUCTION-PLAN.md), [asset manifest](10-asset-production/asset-manifest.json), [asset schema](10-asset-production/asset-manifest.schema.json) | Every individual asset, variant, export alternative, owner/anchor, clip/sound, temporary replacement, shared profile, composition rule, production queue and allocated budget. |
| [Asset/state crosswalk](10-asset-production/ASSET-STATE-CROSSWALK.md), [Item 10 validation](10-asset-production/validation-report.json), [schema-check results](10-asset-production/schema-check-results.json) | Derived asset/state/access coverage and actual prior document/schema/arithmetic checks, not manufactured exports or runtime performance. |

Identity stays **caseId=sparkfest-little-bridge-001, contentVersion=3, contentRevision=1, saveFormatVersion=1, coachContractVersion=1, coach prompt revision1**. Application build/version is separate. Item 11 packet/fixture version1 describes handoff files; it does not migrate the game case.

The plan records29 immutable authority-input file hashes. The [source snapshot](11-build-packet/source-snapshot.json) preserves the 280 pre-existing file identities and prior checklist text solely as integrity evidence. It is not a replacement specification, an instruction source or an archive to implement from.

The current appearance targets are [cast](08-visual-designs/V08-CAST-ILLUSTRATED.png), [Stage](08-visual-designs/V08-STAGE-ILLUSTRATED.png), [Courtyard](08-visual-designs/V08-COURTYARD-ILLUSTRATED.png), [Workshop](08-visual-designs/V08-WORKSHOP-ILLUSTRATED.png) and [Media](08-visual-designs/V08-MEDIA-ILLUSTRATED.png). Exact placement comes from05. These paintings were already reviewed in08/10; Item 11 preserves their files and does not claim a new visual production review.

## 3. Explicit supersession and narrow clarifications

| Earlier material | Current controlling decision |
|---|---|
| v3 §13 says technology/hosting selection occurs later. | Item 09 D09-01–11 now selects it: Canvas2D, native React/TypeScript, one state owner, IndexedDB and Node service; exact baseline in09 §8. Do not reopen stack selection. |
| v3 §§14/17's historical60h+12h contingency, dated phases and preliminary capacity. | Current Item 12-corrected AI-led schedule controls. Both the old 60-hour envelope and Item 11 serial allowance scenario are historical; neither is measured velocity. |
| v3 §§13–14 suggest combining Workshop or reducing room/art breadth if time tightens. | Fixed05 rooms and current08–10 illustrated quality control. No automatic scope/quality cut is authorized. D11-06 records this conflict explicitly. |
| v3 §12's broad asset inventory and 08's earlier simple-finish recommendation. | Item 10 individual manifest controls production; current08 five paintings set final quality. The simpler diagrams specify function and temporary implementation equivalents only. |
| Old original cast, superseded Stage intermediate and prior prototype/mockups. | Current register/provenance and user's white-Jo revision control. Jo: fair skin, dark-brown hair in two buns, coral shirt, teal overalls. Other cast identities remain. |
| Recovered Stage reference visually contains Loop/caddy/projected story. | Opening composes an empty dock/bay and blank projection. Objects/actors/sources are separate layers; the painting is neither an opening-state fixture nor a flattened production background. |
| Broad “source seen” wording or treating all of E2 as exposed together. |06 C5/07 §2/09 R04: physical package access differs from component/passage exposure. Frame1 does not expose recording end, full description, photograph or other undisplayed content. |
| Earlier generic resets, old-record wording and browser-close assumptions. |09 D09-C1/C3/C4 and R05/R07: New game retains preferences; conflicting newer/unknown progress uses general replacement warning; earlier valid restore is explicit. Controlled settle differs from abrupt last-acknowledged restore with possible outcome exposure. |
| Older “next item” text inside finished sections. | Current master checklist controls progression; historical next pointers in09/10 are not live instructions. |
|09 content and advanced-state example fragments. | Preserve their synthetic/fragment labels. TASK11.02 creates complete canonical content; integration histories arise through real actions, not pretending synthetic boundary snapshots are play records. |

No narrative, room geometry, source text, puzzle rule or chosen identity was changed. Item 11 decisions are the task graph, first-milestone boundary and isolated directory. D11-01–06 preserve those decisions; D12-01–03 and the correction register document the estimate, authorization and fixture corrections without changing the game.

## 4. Preserve the actual game and its educational purpose

The child is the premiere captain for a shared paper story and made Pip's coral backpack. Loop was borrowed for the flower recording, not stolen or broken. The goal remains meaningful even if Media is found immediately: retrieve the kit/projector, make Pip's promise happen in rehearsal, then launch the crew's premiere.

**Target skill:** use relevant details from more than one source to infer a reason or plan that those sources do not state completely, and revise it when a detail conflicts.

Two concrete implementations connect reading to freely chosen action:

- **Search:** E4.a supplies Ari's need for still paper and a plain wall; NAV.MEDIA supplies an indoor filming space with a plain wall. An optional pre-arrival plan can justify Media as a sensible search. Entering Media supplies confirmation; the navigation entry never reveals occupancy. E3's outdoor/premiere distinction is a separate scope correction.
- **Paper story:** E6.a requires Pip to arrive and plant with Grandma; E7.a/b distinguishes a boat carrying only the seed from joined boats carrying Pip. FERRY can succeed at delivering the seed while leaving Pip left. PLANT then pauses with Grandma holding the seed and Pip still across the river. A child can connect the promise and capacity rule, add BRIDGE, rehearse again and create joint planting and light. E7.c's soil prerequisite supports the later Bloom condition.

Keep BPL, FBPL, BFPL, BPFL and BPLF equally valid. A harmless Ferry after the light still needs to finish before whole-run certification. Keep both banks, Pip, Grandma, seed/roots, boats and light readable; the projected figures are state displays, not draggable substitutes.

Optional explanations make reasoning observable; they do not unlock action. Private drafts, in-place records, words actually delivered to Jo, evidence actually presented to a character, authored assistance and live interpretation remain separate. A child may solve by experimenting or guessing. Completion without a rationale is game success with reading reasoning unobserved. After-result reflection, assisted performance or uncertain interrupted exposure cannot become an independent pre-result inference. No learning gain, fluency improvement or child enjoyment has been demonstrated.

## 5. Task graph and first milestone

The [plan](11-build-packet/implementation-plan.json) is the task/dependency/effort authority. Each task contains its output, completion boundary, dependencies, source sections and typed IDs, temporary/final assets, required capability, estimate, requirement/check/fixture references, evidence and repair condition. No available staff is invented.

The order starts with Item 12's TASK11.00 checkpoint, then canonical content/toolchain/native primitives/temporary graphics, a single state owner, the connected world, source/NPC/resource mechanics, rail/puppet/premiere, saving and authored help. TASK11.16 checks the whole connected result. It is not an isolated opening demonstration.

**M11.CONNECTED:** current elapsed time is **uncalibrated**. The old 69–114-hour range including readiness and 68–112 after readiness are historical unmeasured allowances, not AI turnaround estimates. It includes all three routes, either resource first, unread notes, voluntary plan/presentation flows, all tile/cue behavior, interruption/save recovery, keyboard/touch/non-drag/compact access, authored help, Toast and the premiere.

Only 7 comparison/timeline/general My ideas supporting states defer to TASK11.17. The evidence tray, chosen lead, source reading and search/story plan-recording opportunities remain in the first build. The complete definition,89 included states, future commands and copyable execution prompt are in [FIRST-CONNECTED-BUILD](11-build-packet/FIRST-CONNECTED-BUILD.md).

Independent art/code/service branches are named in the plan. No agents or additional people are assigned. Disjoint tool waits/review may overlap when actually available; no guaranteed overlap is credited. The first-build prompt does not create its proposed sibling directory or execute its commands now.

## 6. Fixture use and useful AI evidence

[acceptance-fixtures.json](11-build-packet/acceptance-fixtures.json) owns acceptance inputs. Shared defaults make unavailable/exposed content, prior assistance, retained unrelated state and recovery explicit. Presets point to exact09 examples and explain construction; synthetic boundaries are not reconstructed visits.

The 65 arrangement records contain the exact order, before/after puppet state for every cue, result, canonical caption, next index, unmet pause and final outcome. The future adapter must call actual game handlers. The document checker independently verifies this small finite table; it is not the application evaluator.

The 72 other scenarios cover opening, movement/overlap, exact sources, all routes/resources/notes/rail actions, visible mistakes, certification/interruption/premiere, save/reset/concurrency, access/technical failures, Toast, recap, deferred tools, production/evaluation/delivery boundaries and coaching. No real participant text is used.

**Meaningful live evidence:** the same unmet puppet context gets different synthetic explanations:
“Grandma got the seed, so the promise is done” should receive the eligible full-promise/together move; “One boat should carry Pip too” should receive capacity help; “It goes there” needs clarification. A coherent extra Ferry must be accepted. A bare tile order does not prove reasoning. A justified search explanation supports a lead without confirming Media occupancy.

Item 09's26 meaning cases plus the requested Grandma paraphrase remain exact, separately identified fixtures. There are at most75 planned calls across three trials of each applicable live input; direct/empty/local-only cases make zero calls. Live access and paid evaluation require later authorization/configuration. No automatic provider retry is allowed.

The model interprets meaning and selects an eligible authored move;07 still owns the child-facing sentence. Passing a schema or rendering an authored fallback does not prove useful interpretation. TASK11.19 records actual model/prompt/contract versions, input provenance, allowed/banned outcomes, uncertainty, refusal/errors and latency. It compares same-state explanations and checks that notes/outcomes support any references. A child-like spelling difference is not grounds for rejection.

Authored help is the first-build default. Timeout/unavailable/invalid/stale/fallback/canceled/duplicate cases are fault-test inputs and retain gameplay. Ordinary hints use discovered content; explicit direct help may introduce specific answer facts before notes are read without marking entire notes read. Internal diagnosis tags/errors stay out of the child's interface. A fake transport result is never presented as live; live-child conditions remain unresolved as specified by09.

## 7. Corrected AI-led schedule and remaining constraints

The current [schedule](11-build-packet/REVISED-SCHEDULE.md) and plan replace the unsupported deadline conclusion, including the first-build ranges. At the September 11, 2026 21:13:07 UTC / 5:13:07 p.m. EDT check, **7 days, 7 hours, 45 minutes, 53 seconds** remained to **September 18, 11:59 p.m. CDT / September 19, 12:59 a.m. EDT**. [Official terms](https://hackathon.nerdy.com/terms).

Tony directs Codex implementation/debugging/integration, AI-assisted asset generation/revision/layer/export work, and personally reviews decisions/testing/demo preparation. No hired illustrator or extra human team is assumed. Historical 190–314 required, 80–132 illustration/export and 69–114/68–112 connected ranges are not current AI elapsed predictions. The original serial dates/availability deficit are withdrawn as current conclusions, while their dated files remain [archived](12-readiness/history/item11-before-review/README.md).

Each task preserves its historical allowance separately from current numerical estimates, which are null/uncalibrated. The schedule distinguishes attention, AI time, asset work, testing/integration/repair, external waits and total elapsed time. It identifies permissible disjoint overlap without assuming simultaneous reviews/shared-file edits or multiplying AI speed.

Calibration occurs during existing authorized tasks: 01–02 setup/content, 04–06 temporary assets/store/world and 16 connected validation. Later art and live work require their own measured iterations. No benchmark prototype is required or created. Keep required repair/recording/access/contingency packages and the provisional September 18, 8 p.m. EDT internal target; neither constitutes a completion promise.

[Open issues/defaults](11-build-packet/OPEN-ISSUES-AND-DEFAULTS.md) separates completed readiness from absent implementation authorization, setup/asset qualification, uncalibrated capacity, live account/meaning evidence, child-live eligibility, measured runtime quality, provenance/delivery and absent participant evidence. Forecast uncertainty blocks a reliable deadline commitment, not design readiness. No scope/quality cut is selected.

## 8. Verification and change discipline

Current [Item 11 validation](11-build-packet/validation-report.json) checks this corrected package in Item 12 phase. [Item 12 validation](12-readiness/validation-report.json) additionally checks the scoped change set, route references, preserved source files, schedule classification, fixture corrections and readiness boundary.

The substantive ID, dependency, complete coverage, source-hash, queue-asset, 65-order/caption and negative-control checks remain. Historical queue ranges are reconciled as history, not AI forecasts. Phase checks now allow Item 12 completion while preserving Items 01–10 and 13–16. The [original dated report](12-readiness/history/item11-before-review/11-build-packet/validation-report.json) and original [source snapshot](11-build-packet/source-snapshot.json) are retained; their old hashes are historical, not silently updated.

To reproduce the document checks from the design directory with the bundled runtime:

    & 'C:\Users\TonyGuillaro\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' '11-build-packet/_checks/check_packet.py' --final --phase item12
    & 'C:\Users\TonyGuillaro\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' '12-readiness/_checks/check_readiness.py'

Add --derive to the first command only when regenerating crosswalk/schedule from the authoritative plan. These are pre-build document checkers, not the future game's runtime tests; the phase intentionally requires an absent implementation directory. After implementation begins, retain this dated checkpoint and use the future build's actual acceptance checks.

No game, temporary/production asset manufacture, dependency setup, browser gameplay, live model, child testing, hosting or submission ran during Item 12. For later changes, edit the owning source, record narrow corrections and regenerate derived views; never alter source hashes just to hide a mismatch.

## 9. Completion evidence for the seven Item 11 subitems

| Checklist subitem | Concrete evidence |
|---|---|
|1. One authoritative entry point/supersession | This document §§1–3;29 authority input hashes and explicit current/reference/fragment distinctions. |
|2. Integrated05–10 package | Source ownership table, unchanged inputs, typed task references and explicit precedence; no copied replacement of product truth. |
|3. Requirement→implementation→acceptance |74 requirements/checks,35 bounded tasks, full existing-ID coverage and generated requirement crosswalk. |
|4. First connected milestone/setup/assets/boundary | FIRST-CONNECTED-BUILD.md; TASK11.01–16/Q00–Q01;89 included states,7 named deferred states, actual future prompt and evidence boundary. |
|5. Concrete fixtures/equivalent plans/assistance |72 scenario definitions plus 65 explicit orders, exact coaching cases and shared source/recovery defaults. |
|6. Current revised effort/deadline/schedule | Refreshed official deadline; historical ranges explicitly classified, unsupported AI-time deficit withdrawn, six separated estimation dimensions/calibration, dependencies and delivery reserves. |
|7. Unresolved issues/defaults/blocking impact | Ten specific U11 issues, named tasks/milestones, defaults and evidence needed; no invented staff or routine design question left open. |

**Item 11 remains Defined; Item 12 establishes readiness for the first connected build. Implementation is not authorized or started by this checkpoint. The exact next checklist item is 13 — Connected gameplay implementation.**

