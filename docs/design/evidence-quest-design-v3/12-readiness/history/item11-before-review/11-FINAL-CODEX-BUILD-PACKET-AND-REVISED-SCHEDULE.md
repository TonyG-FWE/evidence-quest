# Evidence Quest — Item 11: Final Codex build packet and revised schedule

**September 11, 2026. Integrated design handoff; game implementation has not started.**

Start here to build the intended four-room adventure without reconstructing decisions from this conversation. The packet assigns **35 bounded tasks**, preserves **all 52 existing acceptance IDs**, adds22 handoff requirements, and supplies **72 scenario fixtures plus 65 explicit tile arrangements**. It preserves the current story, literacy purpose, physical interactions and rich illustrated finish.

The required work estimates **190–314 effort hours**, including 8–14 hours of temporary asset preparation,80–132 hours of final illustration/export work, and protected integration/repair/delivery time. The verified contest deadline does not credibly accommodate that scope with one assumed operator. This is an explicit planning result, not a reason to silently reduce the game.

**The next checklist item is12 — One build-readiness checkpoint.** Item 11 creates the packet only. It does not authorize implementation, produce assets, run live AI, deploy or submit.

## 1. Enter and execute in this order

| Read | What it gives the builder |
|---|---|
| [Master checklist](EVIDENCE-QUEST-MASTER-CHECKLIST.md) | Current phase, completed design evidence and exact boundary before implementation. |
| This entry point | Source authority, supersession, product invariants, handoff use and evidence limits. |
| [Implementation plan](11-build-packet/implementation-plan.json) | Authoritative TASK11 dependencies/effort/boundaries,74 requirement/check assignments, typed reference ownership, milestones and schedule inputs. |
| [Requirement-to-build crosswalk](11-build-packet/REQUIREMENT-TO-BUILD-CROSSWALK.md) | Readable generated requirement→task→check→fixture coverage. |
| [Acceptance fixtures](11-build-packet/acceptance-fixtures.json) | Exact initial boundaries, exposed-source/assistance context, actions, expected logical/visible results, unchanged facts and recovery; all 65 orders with cue endpoints. |
| [First connected build](11-build-packet/FIRST-CONNECTED-BUILD.md) | Exact first scope, temporary asset creation, proposed isolated path, future setup/run commands, complete future execution prompt and stopping point. |
| [Revised schedule](11-build-packet/REVISED-SCHEDULE.md) | Current deadline/time zones, task effort, serial calendar, critical path, buffers, feasibility and explicit options. |
| [Open issues/defaults](11-build-packet/OPEN-ISSUES-AND-DEFAULTS.md) | Ten actual unresolved conditions, their defaults, affected gates and the evidence needed to resolve them. |
| [Validation report](11-build-packet/validation-report.json) | Actual document/reference/arithmetic/preservation results, hashes and unperformed runtime/live/player work. |

After Item 12 and an implementation-scoped user instruction, start TASK11.01 and follow dependencies through TASK11.16. Do not interpret an old prototype prompt, a completed design item or a future command block as authorization to begin now.

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
| v3 §§14/17's historical60h+12h contingency, dated phases and preliminary capacity. | Item 11 task estimates and current verified deadline/calendar replace them. No estimate is measured development velocity. |
| v3 §§13–14 suggest combining Workshop or reducing room/art breadth if time tightens. | Fixed05 rooms and current08–10 illustrated quality control. No automatic scope/quality cut is authorized. D11-06 records this conflict explicitly. |
| v3 §12's broad asset inventory and 08's earlier simple-finish recommendation. | Item 10 individual manifest controls production; current08 five paintings set final quality. The simpler diagrams specify function and temporary implementation equivalents only. |
| Old original cast, superseded Stage intermediate and prior prototype/mockups. | Current register/provenance and user's white-Jo revision control. Jo: fair skin, dark-brown hair in two buns, coral shirt, teal overalls. Other cast identities remain. |
| Recovered Stage reference visually contains Loop/caddy/projected story. | Opening composes an empty dock/bay and blank projection. Objects/actors/sources are separate layers; the painting is neither an opening-state fixture nor a flattened production background. |
| Broad “source seen” wording or treating all of E2 as exposed together. |06 C5/07 §2/09 R04: physical package access differs from component/passage exposure. Frame1 does not expose recording end, full description, photograph or other undisplayed content. |
| Earlier generic resets, old-record wording and browser-close assumptions. |09 D09-C1/C3/C4 and R05/R07: New game retains preferences; conflicting newer/unknown progress uses general replacement warning; earlier valid restore is explicit. Controlled settle differs from abrupt last-acknowledged restore with possible outcome exposure. |
| Older “next item” text inside finished sections. | Current master checklist controls progression; historical next pointers in09/10 are not live instructions. |
|09 content and advanced-state example fragments. | Preserve their synthetic/fragment labels. TASK11.02 creates complete canonical content; integration histories arise through real actions, not pretending synthetic boundary snapshots are play records. |

No narrative, room geometry, source text, puzzle rule or chosen identity was changed. New Item 11 decisions are the task graph, first-milestone boundary, proposed isolated directory and current schedule. D11-01–06 in the plan document their sources and impact.

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

**M11.CONNECTED:**69–114h including readiness, or 68–112h of implementation/assets/checks after that1–2h checkpoint. It includes all three routes, either resource first, unread notes, voluntary plan/presentation flows, all tile/cue behavior, interruption/save recovery, keyboard/touch/non-drag/compact access, authored help, Toast and the premiere.

Only 7 comparison/timeline/general My ideas supporting states defer to TASK11.17. The evidence tray, chosen lead, source reading and search/story plan-recording opportunities remain in the first build. The complete definition,89 included states, future commands and copyable execution prompt are in [FIRST-CONNECTED-BUILD](11-build-packet/FIRST-CONNECTED-BUILD.md).

Independent art/code/service branches are named in the plan. No agents were spawned, people assigned or calendar overlap assumed. The first-build prompt does not create its proposed sibling directory or execute its commands now.

## 6. Fixture use and useful AI evidence

[acceptance-fixtures.json](11-build-packet/acceptance-fixtures.json) owns acceptance inputs. Shared defaults make unavailable/exposed content, prior assistance, retained unrelated state and recovery explicit. Presets point to exact09 examples and explain construction; synthetic boundaries are not reconstructed visits.

The 65 arrangement records contain the exact order, before/after puppet state for every cue, result, canonical caption, next index, unmet pause and final outcome. The future adapter must call actual game handlers. The document checker independently verifies this small finite table; it is not the application evaluator.

The 72 other scenarios cover opening, movement/overlap, exact sources, all routes/resources/notes/rail actions, visible mistakes, certification/interruption/premiere, save/reset/concurrency, access/technical failures, Toast, recap, deferred tools, production/evaluation/delivery boundaries and coaching. No real participant text is used.

**Meaningful live evidence:** the same unmet puppet context gets different synthetic explanations:
“Grandma got the seed, so the promise is done” should receive the eligible full-promise/together move; “One boat should carry Pip too” should receive capacity help; “It goes there” needs clarification. A coherent extra Ferry must be accepted. A bare tile order does not prove reasoning. A justified search explanation supports a lead without confirming Media occupancy.

Item 09's26 meaning cases plus the requested Grandma paraphrase remain exact, separately identified fixtures. There are at most75 planned calls across three trials of each applicable live input; direct/empty/local-only cases make zero calls. Live access and paid evaluation require later authorization/configuration. No automatic provider retry is allowed.

The model interprets meaning and selects an eligible authored move;07 still owns the child-facing sentence. Passing a schema or rendering an authored fallback does not prove useful interpretation. TASK11.19 records actual model/prompt/contract versions, input provenance, allowed/banned outcomes, uncertainty, refusal/errors and latency. It compares same-state explanations and checks that notes/outcomes support any references. A child-like spelling difference is not grounds for rejection.

Authored help is the first-build default. Timeout/unavailable/invalid/stale/fallback/canceled/duplicate cases are fault-test inputs and retain gameplay. Ordinary hints use discovered content; explicit direct help may introduce specific answer facts before notes are read without marking entire notes read. Internal diagnosis tags/errors stay out of the child's interface. A fake transport result is never presented as live; live-child conditions remain unresolved as specified by09.

## 7. Schedule and remaining constraints

The primary sources confirm **September 18,2026 at 11:59p.m.CDT**, which is **September 19 at 12:59a.m.EDT**. At the recorded September 11 3:55:17p.m.EDT verification,7days9hours3minutes43seconds remained. [Official terms](https://hackathon.nerdy.com/terms).

At the stated19h/day ceiling, even treating all remaining available hours as productive supplies about142.06h, below the 190h low estimate. The nominal12productive-hour serial scenario supplies89h before close. It forecasts the first connected case September 17–21, an illustrated candidate September 25–October 4, and complete materials September 27–October 7. These are conditional completion forecasts, not possible late-contest acceptance or promised working hours.

[The schedule](11-build-packet/REVISED-SCHEDULE.md) separates each task,8–14h temporary work,80–132h finished illustration, other implementation/evaluation work, optional2–4h sound and 3–6h refinement, and 16–25h of protected repair/recording/delivery/contingency already included in the required total. It names the dependency and single-operator resource paths and milestone failure responses.

Concrete choices are documented without selecting one: preserve the complete target and finish beyond this contest; verify additional capable production/engineering capacity and recalculate; or explicitly revise named requirements/quality for a smaller contest entry. Merely dropping optional polish cannot close the required-work gap. No required room, access behavior, source relation or illustrated finish was silently cut.

[The issue register](11-build-packet/OPEN-ISSUES-AND-DEFAULTS.md) separates missing readiness/authorization, setup qualification, unproduced assets, actual production capacity, the known deadline gap, live account/meaning evidence, child-live eligibility, unmeasured runtime quality, hosting/provenance and absent participant/learning evidence. Each has a default, affected task/milestone, blocking impact, resolving evidence and independent work that can continue.

## 8. Verification and change discipline

Actual Item 11 checks:

- Unique task/requirement/check/fixture IDs; all 52 original acceptance IDs retained; every task has a boundary, estimate, sources, fixtures, acceptance evidence and repair response.
- Valid acyclic dependencies and schedule ordering; no required task or production queue omitted; per-queue asset sets and effort reconcile with Item 10.
- Exact coverage of107 scene/object/access identities,96 UI states,121 transitions,553 CT IDs,35 source references,5 introduced facts,96 assets and 7 public contracts plus internal ModelProposal.
- 65 distinct unique-tile orders with per-cue result/caption/pause consistency and exactly the five established successes; explicitly labeled fixture arithmetic.
- Referenced source/example/CT/model-move IDs and local links; identity/source hashes; deadline offset/remaining-time/effort/calendar calculations.
- Integrity of all 280 pre-existing files, with only the master checklist allowed to change; prior Items01–10 and Items12–16 completion sections preserved.
- Negative controls for duplicate task, cycle, unknown fixture, missing arrangement and wrong cue caption.
- Seven Item 11 subitems and next-step pointer checked after the evidence files exist.

Exact results and limitations are in [validation-report.json](11-build-packet/validation-report.json). The checker is a custom Python standard-library document checker, not the future Ajv semantic validator or game. It performs no model/network/game startup or participant test.

To reproduce only these document checks with the already available bundled runtime, run from the design directory:

```powershell
& 'C:\Users\TonyGuillaro\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' '11-build-packet/_checks/check_packet.py' --final
```

To regenerate the readable crosswalk and schedule after changing their authoritative plan inputs, add `--derive`. It updates only this packet's derived views/calculated schedule fields and validation report. [Checker source](11-build-packet/_checks/check_packet.py) is supporting verification, not implementation code.

No game, layered production assets, dependency installation, native/browser gameplay, actual storage faults, live model interpretation, runtime performance, child playtest or learning gain was produced or qualified. No deployment or submission occurred. These remain NOT_RUN in the report.

For a later change: update the document owning the product decision first; preserve exact existing IDs/meaning; record any narrow correction; update plan tasks/fixtures and regenerate derived views. Do not hand-edit the crosswalk/schedule into a competing specification. Refresh source hashes deliberately after a reviewed authority change, never just to hide an unexpected mismatch.

## 9. Completion evidence for the seven Item 11 subitems

| Checklist subitem | Concrete evidence |
|---|---|
|1. One authoritative entry point/supersession | This document §§1–3;29 authority input hashes and explicit current/reference/fragment distinctions. |
|2. Integrated05–10 package | Source ownership table, unchanged inputs, typed task references and explicit precedence; no copied replacement of product truth. |
|3. Requirement→implementation→acceptance |74 requirements/checks,35 bounded tasks, full existing-ID coverage and generated requirement crosswalk. |
|4. First connected milestone/setup/assets/boundary | FIRST-CONNECTED-BUILD.md; TASK11.01–16/Q00–Q01;89 included states,7 named deferred states, actual future prompt and evidence boundary. |
|5. Concrete fixtures/equivalent plans/assistance |72 scenario definitions plus 65 explicit orders, exact coaching cases and shared source/recovery defaults. |
|6. Current revised effort/deadline/schedule | Dated official primary-source check;190–314h core estimate, serial calendar, critical/resource paths, protected buffers and candid deficit/options. |
|7. Unresolved issues/defaults/blocking impact | Ten specific U11 issues, named tasks/milestones, defaults and evidence needed; no invented staff or routine design question left open. |

**Item 11 is Defined as a documented handoff. Build readiness remains not reached. The exact next checklist item is12 — One build-readiness checkpoint.**

