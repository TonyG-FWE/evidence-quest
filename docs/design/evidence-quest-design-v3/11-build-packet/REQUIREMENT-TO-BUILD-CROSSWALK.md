# Item 11 — requirement-to-build crosswalk

> Derived from [implementation-plan.json](implementation-plan.json). Edit task/requirement assignments there and rerun the packet checker with --derive; do not edit this table as a second source of truth.

All 52 existing N/L/G/P/R/A/X/H/D IDs remain v3 §15 acceptance requirements. REQ11, TASK11, CHECK11, FIX11 and M11 are new handoff IDs, not new game entities. All checks are future acceptance, not runtime passes.

| Requirement | Required behavior / pass condition | Implementation owner(s) | Check | Concrete fixtures |
|---|---|---|---|---|
| L01 | E4 + discovered NAV.MEDIA supports a suitable search destination, not guaranteed occupancy; E3 scope correction is labeled separately | TASK11.08, TASK11.09, TASK11.16, TASK11.17, TASK11.21, TASK11.15, TASK11.18, TASK11.19 | CHECK11.L01 | FIX11.SEARCH, FIX11.TOOLS, FIX11.COACH.E19 |
| L02 | Child’s explanation can connect personal arrival/joint planting with boat capacity/crossing, not merely name a tile | TASK11.12, TASK11.15, TASK11.16, TASK11.18, TASK11.19, TASK11.21 | CHECK11.L02 | FIX11.UNMET, FIX11.COACH.E01, FIX11.COACH.E02, FIX11.COACH.E03, FIX11.COACH.E04, FIX11.COACH.E05, FIX11.COACH.E06, FIX11.COACH.E07, FIX11.COACH.E08, FIX11.COACH.E09, FIX11.COACH.E10, FIX11.COACH.E11, FIX11.COACH.E12, FIX11.COACH.E13, FIX11.COACH.E14, FIX11.COACH.E15, FIX11.COACH.E16, FIX11.COACH.E17, FIX11.COACH.E18, FIX11.COACH.E20, FIX11.COACH.E21, FIX11.COACH.E22, FIX11.COACH.E23, FIX11.COACH.E24, FIX11.COACH.E25, FIX11.COACH.E26, FIX11.COACH.GRANDMA |
| L03 | Prior answer hint, relevant outcome exposure, later reflection, and copied response cannot become a false independent prediction | TASK11.05, TASK11.14, TASK11.21, TASK11.09, TASK11.13, TASK11.22, TASK11.16 | CHECK11.L03 | FIX11.SAVE_INTERRUPTED, FIX11.RECAP |
| L04 | Seed ahead then crossing receives the same recognition as carrying the seed across; no penalty for harmless excess | TASK11.12, TASK11.16, TASK11.21 | CHECK11.L04 | FIX11.ORDER.00–64 (65 explicit orders) |
| L05 | Completion without a rationale remains success with reasoning unobserved; navigation/inactivity never becomes a reading diagnosis | TASK11.07, TASK11.16, TASK11.09, TASK11.13, TASK11.21, TASK11.22 | CHECK11.L05 | FIX11.OPEN, FIX11.RECAP |
| L06 | Record voluntary investigation, confusion, revisions, and desire to continue separately; adult checks cannot establish child enjoyment or lasting learning | TASK11.22 | CHECK11.L06 | FIX11.OBSERVE |
| G01 | Old pending interaction canceled; new reachable intent honored | TASK11.06, TASK11.07, TASK11.16 | CHECK11.G01 | FIX11.MOVE |
| G02 | No wall crossing, remote interaction, or stranded avatar | TASK11.06, TASK11.07, TASK11.16 | CHECK11.G02 | FIX11.MOVE |
| G03 | Screen-relative movement; typing never moves character | TASK11.06, TASK11.07, TASK11.16 | CHECK11.G03 | FIX11.MOVE |
| G04 | One Loop, correct scene/location, no trapped follower | TASK11.06, TASK11.07, TASK11.16 | CHECK11.G04 | FIX11.MOVE |
| G05 | One canonical record, source preserved, knowledge consistent, no item consumed | TASK11.08, TASK11.15, TASK11.16, TASK11.09, TASK11.10, TASK11.14, TASK11.17, TASK11.21 | CHECK11.G05 | FIX11.E2, FIX11.NPC, FIX11.NOTES, FIX11.TOOLS |
| G06 | Full case completes; recap does not claim a cancellation revision | TASK11.07, TASK11.16, TASK11.08, TASK11.09, TASK11.13 | CHECK11.G06 | FIX11.OPEN, FIX11.SEARCH, FIX11.TOAST |
| G07 | Physical notice discovery; narrow contradiction; convenient onward route | TASK11.08, TASK11.16, TASK11.09 | CHECK11.G07 | FIX11.NOTICE, FIX11.NPC |
| G08 | Local facts, rack, notes, and Loop all available; no hidden evidence gate | TASK11.06, TASK11.08, TASK11.10, TASK11.16 | CHECK11.G08 | FIX11.MEDIA_FIRST |
| P01 | Exactly the state outcomes defined in section 9; no hard-coded preference over equivalent success | TASK11.05, TASK11.12, TASK11.14, TASK11.16, TASK11.21 | CHECK11.P01 | FIX11.CUE_RACE, FIX11.ORDER.00–64 (65 explicit orders) |
| P02 | Seed right/Pip left; no joint planting; no light; visible unmet state; no lost evidence | TASK11.12, TASK11.15, TASK11.16, TASK11.21 | CHECK11.P02 | FIX11.UNMET, FIX11.ORDER.00–64 (65 explicit orders) |
| P03 | Same completed promise and launch eligibility, including harmless Ferry positions | TASK11.12, TASK11.16, TASK11.21 | CHECK11.P03 | FIX11.TERMINAL, FIX11.ORDER.00–64 (65 explicit orders) |
| P04 | No impossible planting/light, no teleportation; state preserved and later cues act on actual state | TASK11.12, TASK11.15, TASK11.16, TASK11.21 | CHECK11.P04 | FIX11.UNMET, FIX11.ORDER.00–64 (65 explicit orders) |
| P05 | Old success does not authorize launch of the edited plan | TASK11.11, TASK11.16, TASK11.12, TASK11.14, TASK11.21 | CHECK11.P05 | FIX11.RAIL, FIX11.CERT_EDIT, FIX11.RESET |
| P06 | Completion retained; seed never uprooted or returned across river | TASK11.12, TASK11.16, TASK11.21 | CHECK11.P06 | FIX11.TERMINAL, FIX11.ORDER.00–64 (65 explicit orders) |
| A01 | Eligible, useful move; source boundaries preserved; record failures rather than invent a percentage | TASK11.15, TASK11.18, TASK11.19, TASK11.21, TASK11.16 | CHECK11.A01 | FIX11.COACH.E01, FIX11.COACH.E02, FIX11.COACH.E12, FIX11.COACH.E14, FIX11.COACH.E16, FIX11.COACH.E18, FIX11.COACH.E19, FIX11.COACH.E20, FIX11.COACH.E21, FIX11.COACH.E24, FIX11.COACH.E26, FIX11.COACH.GRANDMA |
| A02 | No correction based solely on an extra Ferry; equivalent meaning accepted | TASK11.15, TASK11.18, TASK11.19, TASK11.21 | CHECK11.A02 | FIX11.COACH.E04, FIX11.COACH.E06, FIX11.COACH.E07, FIX11.COACH.E08 |
| A03 | Clarification or neutral response, not confident diagnosis | TASK11.15, TASK11.18, TASK11.19, TASK11.21 | CHECK11.A03 | FIX11.COACH.E03, FIX11.COACH.E22 |
| A04 | No new clue text/state mutation; invalid reference rejected | TASK11.08, TASK11.15, TASK11.16, TASK11.18, TASK11.19, TASK11.21, TASK11.09 | CHECK11.A04 | FIX11.E2, FIX11.COACH.E09, FIX11.COACH.E10, FIX11.COACH.E13, FIX11.COACH.E15, FIX11.COACH.E17, FIX11.COACH.E23, FIX11.COACH.MISSING, FIX11.COACH.INVALID |
| A05 | Authored fallback and all game actions usable | TASK11.09, TASK11.15, TASK11.18, TASK11.19, TASK11.21, TASK11.16 | CHECK11.A05 | FIX11.COACH.REFUSAL, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK |
| A06 | Relevant stale response discarded | TASK11.09, TASK11.15, TASK11.18, TASK11.19, TASK11.21, TASK11.16 | CHECK11.A06 | FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE |
| A07 | No false independent inference label | TASK11.09, TASK11.13, TASK11.21, TASK11.22, TASK11.15, TASK11.18, TASK11.19, TASK11.16 | CHECK11.A07 | FIX11.RECAP, FIX11.COACH.E05 |
| A08 | Modes honestly identified in evidence; no simulated response presented as a live model result | TASK11.15, TASK11.18, TASK11.19, TASK11.21, TASK11.24, TASK11.16 | CHECK11.A08 | FIX11.COACH.E01, FIX11.COACH.E02, FIX11.COACH.E03, FIX11.COACH.E04, FIX11.COACH.E05, FIX11.COACH.E06, FIX11.COACH.E07, FIX11.COACH.E08, FIX11.COACH.E09, FIX11.COACH.E10, FIX11.COACH.E11, FIX11.COACH.E12, FIX11.COACH.E13, FIX11.COACH.E14, FIX11.COACH.E15, FIX11.COACH.E16, FIX11.COACH.E17, FIX11.COACH.E18, FIX11.COACH.E19, FIX11.COACH.E20, FIX11.COACH.E21, FIX11.COACH.E22, FIX11.COACH.E23, FIX11.COACH.E24, FIX11.COACH.E25, FIX11.COACH.E26, FIX11.COACH.GRANDMA, FIX11.DEMO |
| A09 | Useful authored level-4 answer; actual new information recorded; no fake full-source discovery; ordinary hints retain spoiler limits | TASK11.15, TASK11.18, TASK11.19, TASK11.21, TASK11.09, TASK11.16 | CHECK11.A09 | FIX11.COACH.E25, FIX11.COACH.DIRECT |
| A10 | Acknowledge the plan using observed outcomes; no invented note reference or two-text inference claim | TASK11.15, TASK11.18, TASK11.19, TASK11.21 | CHECK11.A10 | FIX11.COACH.E11 |
| X01 | Movement alternatives, evidence, rail, hints, launch, reset all operable | TASK11.11, TASK11.16, TASK11.07, TASK11.21, TASK11.20 | CHECK11.X01 | FIX11.RAIL, FIX11.ACCESS, FIX11.ART_FAILURE |
| X02 | Same necessary information and actions available | TASK11.07, TASK11.16, TASK11.21 | CHECK11.X02 | FIX11.ACCESS |
| X03 | Readable sources, no clipped decisive words, usable object access | TASK11.07, TASK11.16, TASK11.21, TASK11.20 | CHECK11.X03 | FIX11.ACCESS, FIX11.ART_FAILURE |
| X04 | Equal story outcomes and source information, no compulsory elaborate animation | TASK11.07, TASK11.16, TASK11.21 | CHECK11.X04 | FIX11.ACCESS |
| X05 | Predictable focus and no unintended movement or vanished instructions | TASK11.06, TASK11.07, TASK11.16, TASK11.08, TASK11.10, TASK11.14, TASK11.21 | CHECK11.X05 | FIX11.MOVE, FIX11.NOTES, FIX11.ACCESS |
| REQ11.AUTHORITY | One authoritative, isolated entry point and bounded readiness | TASK11.00, TASK11.01 | CHECK11.AUTHORITY | FIX11.READINESS |
| REQ11.STORY | Player as premiere captain, missing borrowed Loop and Little Bridge assignment | TASK11.07, TASK11.16, TASK11.02, TASK11.09, TASK11.13 | CHECK11.STORY | FIX11.OPEN |
| REQ11.EDUCATION | Use relevant details from more than one source to infer a reason or plan and revise a conflicting idea; access is not answer help | TASK11.08, TASK11.09, TASK11.16, TASK11.12, TASK11.15, TASK11.22 | CHECK11.EDUCATION | FIX11.SEARCH, FIX11.UNMET, FIX11.OBSERVE |
| REQ11.CONTENT | Complete exact canonical copy/geometry/accesses and information slices, not example fragments | TASK11.02, TASK11.05, TASK11.16 | CHECK11.CONTENT | FIX11.CONTENT |
| REQ11.EXPOSURE | E2 components, curled/full E3 and source availability/exposure/interpretation remain separate | TASK11.08, TASK11.15, TASK11.16 | CHECK11.EXPOSURE | FIX11.E2, FIX11.NOTICE |
| REQ11.ROUTES | Correct-first, cancellation and Media-first are freely chosen complete routes | TASK11.06, TASK11.08, TASK11.10, TASK11.16 | CHECK11.ROUTES | FIX11.MEDIA_FIRST |
| REQ11.RESOURCES | Loop and caddy recovered independently with real approaches and a single physical owner | TASK11.10, TASK11.11, TASK11.16 | CHECK11.RESOURCES | FIX11.KIT_FIRST, FIX11.LOOP_FIRST |
| REQ11.NOTES | Two unread portable notes, mounted copies and surviving-owner focus | TASK11.08, TASK11.10, TASK11.14, TASK11.16 | CHECK11.NOTES | FIX11.NOTES |
| REQ11.RAIL | All four unique tiles and exact committed versus pending manipulation | TASK11.11, TASK11.16, TASK11.12 | CHECK11.RAIL | FIX11.RAIL, FIX11.CERT_EDIT |
| REQ11.INTERRUPT | Cue settle-once, retained mode/next index, terminal finalization and uncertain crash exposure | TASK11.05, TASK11.12, TASK11.14, TASK11.16, TASK11.13, TASK11.21 | CHECK11.INTERRUPT | FIX11.CUE_RACE, FIX11.TERMINAL, FIX11.PREMIERE, FIX11.SAVE_INTERRUPTED |
| REQ11.PAYOFF | Player backpack, actual complete-show milestone, skippable own-room aftermath and replay | TASK11.13, TASK11.14, TASK11.16 | CHECK11.PAYOFF | FIX11.PREMIERE |
| REQ11.RECORDS | Private/recorded/addressed/presented/requested-help records and honest recap chronology | TASK11.09, TASK11.16, TASK11.13, TASK11.21, TASK11.22, TASK11.15, TASK11.18, TASK11.19 | CHECK11.RECORDS | FIX11.NPC, FIX11.RECAP, FIX11.COACH.DRAFT |
| REQ11.TOOLS | Evidence tray, comparison, known-time timeline, optional theory and leads | TASK11.17, TASK11.21, TASK11.08, TASK11.09 | CHECK11.TOOLS | FIX11.TOOLS |
| REQ11.SAVE | Valid/failed/corrupt/incompatible/previous/concurrent save handling, reset separation and draft recovery | TASK11.14, TASK11.16, TASK11.21, TASK11.05, TASK11.11 | CHECK11.SAVE | FIX11.SAVE_FAILURE, FIX11.SAVE_RECOVERY, FIX11.SAVE_INTERRUPTED, FIX11.RESET |
| REQ11.AI_LIFECYCLE | Meaningful live interpretation, bounded selection, authored/no-key default, source eligibility and request races | TASK11.09, TASK11.15, TASK11.18, TASK11.19, TASK11.21, TASK11.16 | CHECK11.AI_LIFECYCLE | FIX11.COACH.MISSING, FIX11.COACH.REFUSAL, FIX11.COACH.INVALID, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK, FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE, FIX11.COACH.DIRECT, FIX11.COACH.DRAFT |
| REQ11.PERSONALITY | Maximum Toast and restrained expressive feedback remain optional but present | TASK11.13, TASK11.16, TASK11.ART04 | CHECK11.PERSONALITY | FIX11.TOAST |
| REQ11.VISUAL | Rich current illustrated finish with white Jo; individual layers replace temporary equivalents | TASK11.07, TASK11.20, TASK11.21, TASK11.03, TASK11.04, TASK11.ART02, TASK11.ART03, TASK11.ART04, TASK11.ART05, TASK11.ART06, TASK11.ART07, TASK11.16 | CHECK11.VISUAL | FIX11.ART_FAILURE, FIX11.TEMP, FIX11.ART |
| REQ11.PERFORMANCE | Real exports and runtime measurements against allocated transfer/decoded memory budgets | TASK11.ART02, TASK11.ART03, TASK11.ART04, TASK11.ART05, TASK11.ART06, TASK11.ART07, TASK11.20 | CHECK11.PERFORMANCE | FIX11.ART |
| REQ11.TECH | Chosen Canvas/React/TS/Node architecture, strict seven-root contracts and isolated operating commands | TASK11.01, TASK11.02, TASK11.05, TASK11.18, TASK11.16 | CHECK11.TECH | FIX11.TOOLCHAIN, FIX11.CONTENT |
| REQ11.HARDENING | Connected actual browser/usable-state evidence and protected repair capacity | TASK11.23, TASK11.16, TASK11.21 | CHECK11.HARDENING | FIX11.REPAIR |
| REQ11.DELIVERY | Working ≤3min evidence, meaningful live contribution, accurate disclosures and authorized reviewer access/delivery | TASK11.24, TASK11.25, TASK11.26, TASK11.19 | CHECK11.DELIVERY | FIX11.DEMO, FIX11.DELIVER |
| REQ11.OPTIONAL | Only Q08 audio and Q09 decorative refinements may be deferred as optional polish | TASK11.ART08, TASK11.ART09 | CHECK11.OPTIONAL | FIX11.OPTIONAL |
| N01 | Fresh observer can identify the avatar and describe the goal without facilitator explanation; proposed target first 45 seconds, adjusted for access needs rather than scored reading speed | TASK11.07, TASK11.16, TASK11.22 | CHECK11.N01 | FIX11.OPEN, FIX11.OBSERVE |
| N02 | No contradictory tense, invented witness, inaccurate current-location claim, or duplicate-copy “independent source” | TASK11.08, TASK11.15, TASK11.16, TASK11.09, TASK11.06, TASK11.10, TASK11.17, TASK11.21, TASK11.02, TASK11.05 | CHECK11.N02 | FIX11.E2, FIX11.NPC, FIX11.MEDIA_FIRST, FIX11.TOOLS, FIX11.CONTENT |
| N03 | Early Ari supplies full local facts/materials; Jo does not invent a room; Remy can revise a claim while retaining expertise about boats | TASK11.09, TASK11.16, TASK11.06, TASK11.08, TASK11.10 | CHECK11.N03 | FIX11.NPC, FIX11.MEDIA_FIRST |
| N04 | Rehearsal is established before retrieval and is not an unrelated new assignment introduced only afterward | TASK11.07, TASK11.16, TASK11.06, TASK11.08, TASK11.10, TASK11.13, TASK11.14 | CHECK11.N04 | FIX11.OPEN, FIX11.MEDIA_FIRST, FIX11.PREMIERE |
| R01 | Restore consistent source/world/puppet state; playback paused, no duplicate cue | TASK11.08, TASK11.10, TASK11.14, TASK11.16, TASK11.05, TASK11.12, TASK11.21 | CHECK11.R01 | FIX11.NOTES, FIX11.CUE_RACE, FIX11.TERMINAL, FIX11.SAVE_INTERRUPTED |
| R02 | Scopes remain distinct and clearly explained | TASK11.11, TASK11.14, TASK11.21, TASK11.16 | CHECK11.R02 | FIX11.RESET |
| R03 | No silent success or migrated old-story facts; clear new-run recovery | TASK11.14, TASK11.21, TASK11.16 | CHECK11.R03 | FIX11.SAVE_RECOVERY |
| R04 | Session remains playable with clear saving limitation | TASK11.14, TASK11.16 | CHECK11.R04 | FIX11.SAVE_FAILURE |
| R05 | Idempotent state; no duplicate tiles, follower, or completion record | TASK11.08, TASK11.16, TASK11.10, TASK11.11, TASK11.13, TASK11.14 | CHECK11.R05 | FIX11.NOTICE, FIX11.KIT_FIRST, FIX11.LOOP_FIRST, FIX11.PREMIERE |
| R06 | Settled result, control retained, stable save on return | TASK11.13, TASK11.14, TASK11.16 | CHECK11.R06 | FIX11.PREMIERE, FIX11.TOAST |
| H01 | Identical case completion | TASK11.06, TASK11.08, TASK11.10, TASK11.16, TASK11.13 | CHECK11.H01 | FIX11.MEDIA_FIRST, FIX11.TOAST |
| H02 | Bounded behavior, no case facts or farmable scores | TASK11.13, TASK11.16 | CHECK11.H02 | FIX11.TOAST |
| H03 | The personal creation and unfinished opening receive the promised visible payoff | TASK11.07, TASK11.16, TASK11.13, TASK11.14, TASK11.ART02, TASK11.ART03, TASK11.ART04, TASK11.ART05, TASK11.ART06, TASK11.ART07, TASK11.20 | CHECK11.H03 | FIX11.OPEN, FIX11.PREMIERE, FIX11.ART |
| D01 | All showcased behavior exists; time skips and AI mode are truthful | TASK11.24 | CHECK11.D01 | FIX11.DEMO |
| D02 | Every incorporated item has origin, applicable license, modifications, and assistance disclosure | TASK11.02, TASK11.05, TASK11.ART02, TASK11.ART03, TASK11.ART04, TASK11.ART05, TASK11.ART06, TASK11.ART07, TASK11.20, TASK11.24, TASK11.25, TASK11.26, TASK11.16 | CHECK11.D02 | FIX11.CONTENT, FIX11.ART, FIX11.DEMO, FIX11.DELIVER |
| D03 | Working, free, accessible through required period; no dependency on creator’s private session | TASK11.11, TASK11.14, TASK11.21, TASK11.25, TASK11.26, TASK11.16 | CHECK11.D03 | FIX11.RESET, FIX11.DELIVER |
| D04 | Under three minutes; functioning experience, description, disclosures, and actual chosen delivery route ready | TASK11.24, TASK11.25, TASK11.26 | CHECK11.D04 | FIX11.DEMO, FIX11.DELIVER |

## Every existing reference has an owner

Exact per-ID assignments are in implementation-plan.json → coverage; task.references is the reverse index. These are ID/ownership mappings, not copied source words or replacement geometry.

| Reference family | Count | Canonical membership / behavioral authority |
|---|---:|---|
| owners | 107 | Item 05 / Item 10 objectCoverage |
| states | 96 | 93 Item 06 states +3 Item 09 technical states; Item 10 stateCoverage |
| transitions | 121 | 121 named Item 06 transitions / Item 10 transitionCoverage |
| content | 553 | 548 Item 07 CT entries +5 technical-copy entries |
| sourceRefs | 35 | Item 09 REFERENCE-REGISTRY refs; Item 07 text/spans |
| introducedFacts | 5 | Item 09 introducedFacts; Item 07 explicit-direct-help receipts |
| assets | 96 | Item 10 individual assets and binding owners |
| contracts | 8 | Seven public roots + internal ModelProposal in Item 09 schema |

All 157 asset bindings,246 variants,28 animation clips and 6 sounds remain individually defined in Item 10. Each asset is assigned to its preparation/production/integration owners through the plan and unchanged manifest; exports are not manufactured by this table.

## Bounded tasks and acceptance evidence

The plan owns scope, dependencies and acceptance. Hours below are historical unmeasured allowances only; current human/AI/asset/test/wait/total durations are uncalibrated in tasks[*].estimate. They do not predict elapsed time or deadline feasibility.

| Task | Output | Depends on | Historical allowance only | Evidence/check entry |
|---|---|---|---:|---|
| TASK11.00 | One build-readiness checkpoint | None | 1–2 | FIX11.READINESS |
| TASK11.01 | Isolated project and contract toolchain | TASK11.00 | 3–5 | FIX11.TOOLCHAIN |
| TASK11.02 | Canonical content and four-room data | TASK11.01 | 6–10 | FIX11.CONTENT |
| TASK11.03 | Native primitive preparation (Q00) | TASK11.02 | 2–4 | FIX11.TEMP |
| TASK11.04 | Individual temporary graphics (Q01) | TASK11.03 | 6–10 | FIX11.TEMP |
| TASK11.05 | Single state owner and command/effect coordination | TASK11.02 | 4–7 | FIX11.CUE_RACE, FIX11.SAVE_INTERRUPTED, FIX11.CONTENT |
| TASK11.06 | Explorable world and physical approaches | TASK11.04, TASK11.05 | 6–10 | FIX11.MOVE, FIX11.MEDIA_FIRST |
| TASK11.07 | Native shell, input, focus and responsive modes | TASK11.03, TASK11.05, TASK11.06 | 5–8 | FIX11.OPEN, FIX11.MOVE, FIX11.ACCESS, FIX11.ART_FAILURE |
| TASK11.08 | Physical sources and component-aware evidence | TASK11.02, TASK11.06, TASK11.07 | 4–7 | FIX11.SEARCH, FIX11.E2, FIX11.NOTICE, FIX11.MEDIA_FIRST, FIX11.NOTES |
| TASK11.09 | Characters, presentation and voluntary plans | TASK11.08 | 4–6 | FIX11.SEARCH, FIX11.NPC, FIX11.RECAP, FIX11.COACH.MISSING, FIX11.COACH.REFUSAL, FIX11.COACH.INVALID, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK, FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE, FIX11.COACH.DIRECT, FIX11.COACH.DRAFT |
| TASK11.10 | Independent resource recovery and portable notes | TASK11.08, TASK11.06 | 4–6 | FIX11.MEDIA_FIRST, FIX11.KIT_FIRST, FIX11.LOOP_FIRST, FIX11.NOTES |
| TASK11.11 | Rail manipulation | TASK11.10, TASK11.07 | 3–5 | FIX11.KIT_FIRST, FIX11.RAIL, FIX11.CERT_EDIT, FIX11.RESET |
| TASK11.12 | Puppet engine, rehearsal and interruption | TASK11.11, TASK11.05 | 5–8 | FIX11.UNMET, FIX11.CUE_RACE, FIX11.TERMINAL, FIX11.CERT_EDIT, FIX11.ORDER.00–64 (65 explicit orders) |
| TASK11.13 | Premiere, aftermath and Maximum Toast | TASK11.12, TASK11.09 | 3–5 | FIX11.PREMIERE, FIX11.TOAST, FIX11.RECAP |
| TASK11.14 | Durable save, recovery and concurrent visits | TASK11.05, TASK11.07, TASK11.10, TASK11.12 | 5–8 | FIX11.NOTES, FIX11.CUE_RACE, FIX11.PREMIERE, FIX11.SAVE_FAILURE, FIX11.SAVE_RECOVERY, FIX11.SAVE_INTERRUPTED, FIX11.RESET |
| TASK11.15 | Authored help and coaching lifecycle | TASK11.09, TASK11.12, TASK11.14 | 3–5 | FIX11.E2, FIX11.UNMET, FIX11.COACH.E01, FIX11.COACH.E02, FIX11.COACH.E03, FIX11.COACH.E04, FIX11.COACH.E05, FIX11.COACH.E06, FIX11.COACH.E07, FIX11.COACH.E08, FIX11.COACH.E09, FIX11.COACH.E10, FIX11.COACH.E11, FIX11.COACH.E12, FIX11.COACH.E13, FIX11.COACH.E14, FIX11.COACH.E15, FIX11.COACH.E16, FIX11.COACH.E17, FIX11.COACH.E18, FIX11.COACH.E19, FIX11.COACH.E20, FIX11.COACH.E21, FIX11.COACH.E22, FIX11.COACH.E23, FIX11.COACH.E24, FIX11.COACH.E25, FIX11.COACH.E26, FIX11.COACH.GRANDMA, FIX11.COACH.MISSING, FIX11.COACH.REFUSAL, FIX11.COACH.INVALID, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK, FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE, FIX11.COACH.DIRECT, FIX11.COACH.DRAFT |
| TASK11.16 | First connected browser milestone | TASK11.13, TASK11.14, TASK11.15 | 5–8 | FIX11.OPEN, FIX11.MOVE, FIX11.SEARCH, FIX11.E2, FIX11.NOTICE, FIX11.NPC, FIX11.MEDIA_FIRST, FIX11.KIT_FIRST, FIX11.LOOP_FIRST, FIX11.NOTES, FIX11.RAIL, FIX11.UNMET, FIX11.CUE_RACE, FIX11.TERMINAL, FIX11.CERT_EDIT, FIX11.PREMIERE, FIX11.SAVE_FAILURE, FIX11.ACCESS, FIX11.TOAST, FIX11.SAVE_RECOVERY, FIX11.SAVE_INTERRUPTED, FIX11.RESET, FIX11.ART_FAILURE, FIX11.RECAP, FIX11.CONTENT, FIX11.TEMP, FIX11.TOOLCHAIN, FIX11.COACH.MISSING, FIX11.COACH.REFUSAL, FIX11.COACH.INVALID, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK, FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE, FIX11.COACH.DIRECT, FIX11.COACH.DRAFT, FIX11.COACH.E24, FIX11.COACH.E25, FIX11.ORDER.00–64 (65 explicit orders) |
| TASK11.17 | Comparison, timeline and theory tools | TASK11.16 | 4–7 | FIX11.TOOLS |
| TASK11.18 | Real coaching service integration | TASK11.16 | 3–5 | FIX11.COACH.E01, FIX11.COACH.E02, FIX11.COACH.E03, FIX11.COACH.E04, FIX11.COACH.E05, FIX11.COACH.E06, FIX11.COACH.E07, FIX11.COACH.E08, FIX11.COACH.E09, FIX11.COACH.E10, FIX11.COACH.E11, FIX11.COACH.E12, FIX11.COACH.E13, FIX11.COACH.E14, FIX11.COACH.E15, FIX11.COACH.E16, FIX11.COACH.E17, FIX11.COACH.E18, FIX11.COACH.E19, FIX11.COACH.E20, FIX11.COACH.E21, FIX11.COACH.E22, FIX11.COACH.E23, FIX11.COACH.E24, FIX11.COACH.E25, FIX11.COACH.E26, FIX11.COACH.GRANDMA, FIX11.COACH.MISSING, FIX11.COACH.REFUSAL, FIX11.COACH.INVALID, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK, FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE, FIX11.COACH.DIRECT, FIX11.COACH.DRAFT |
| TASK11.19 | Authorized live interpretation evaluation | TASK11.18 | 3–6 | FIX11.COACH.E01, FIX11.COACH.E02, FIX11.COACH.E03, FIX11.COACH.E04, FIX11.COACH.E05, FIX11.COACH.E06, FIX11.COACH.E07, FIX11.COACH.E08, FIX11.COACH.E09, FIX11.COACH.E10, FIX11.COACH.E11, FIX11.COACH.E12, FIX11.COACH.E13, FIX11.COACH.E14, FIX11.COACH.E15, FIX11.COACH.E16, FIX11.COACH.E17, FIX11.COACH.E18, FIX11.COACH.E19, FIX11.COACH.E20, FIX11.COACH.E21, FIX11.COACH.E22, FIX11.COACH.E23, FIX11.COACH.E24, FIX11.COACH.E25, FIX11.COACH.E26, FIX11.COACH.GRANDMA, FIX11.COACH.MISSING, FIX11.COACH.REFUSAL, FIX11.COACH.INVALID, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK, FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE, FIX11.COACH.DIRECT, FIX11.COACH.DRAFT |
| TASK11.20 | Final art integration and runtime performance | TASK11.16, TASK11.ART07 | 5–9 | FIX11.ART_FAILURE, FIX11.ART |
| TASK11.21 | Complete browser/access/recovery qualification | TASK11.17, TASK11.18, TASK11.20 | 6–10 | FIX11.SAVE_RECOVERY, FIX11.SAVE_INTERRUPTED, FIX11.RESET, FIX11.ACCESS, FIX11.ART_FAILURE, FIX11.RECAP, FIX11.TOOLS, FIX11.COACH.E01, FIX11.COACH.E02, FIX11.COACH.E03, FIX11.COACH.E04, FIX11.COACH.E05, FIX11.COACH.E06, FIX11.COACH.E07, FIX11.COACH.E08, FIX11.COACH.E09, FIX11.COACH.E10, FIX11.COACH.E11, FIX11.COACH.E12, FIX11.COACH.E13, FIX11.COACH.E14, FIX11.COACH.E15, FIX11.COACH.E16, FIX11.COACH.E17, FIX11.COACH.E18, FIX11.COACH.E19, FIX11.COACH.E20, FIX11.COACH.E21, FIX11.COACH.E22, FIX11.COACH.E23, FIX11.COACH.E24, FIX11.COACH.E25, FIX11.COACH.E26, FIX11.COACH.GRANDMA, FIX11.COACH.MISSING, FIX11.COACH.REFUSAL, FIX11.COACH.INVALID, FIX11.COACH.TIMEOUT, FIX11.COACH.FALLBACK, FIX11.COACH.CANCEL, FIX11.COACH.DUPLICATE, FIX11.COACH.STALE, FIX11.COACH.DIRECT, FIX11.COACH.DRAFT, FIX11.ORDER.00–64 (65 explicit orders) |
| TASK11.22 | First-time usability and learning observations | TASK11.21 | 4–6 | FIX11.RECAP, FIX11.OBSERVE |
| TASK11.23 | Protected integration and repair allowance | TASK11.19, TASK11.22 | 8–12 | FIX11.REPAIR |
| TASK11.24 | Working demo and submission materials | TASK11.23 | 4–6 | FIX11.DEMO |
| TASK11.25 | Authorized delivery and reviewer access | TASK11.24 | 2–3 | FIX11.DELIVER |
| TASK11.26 | Protected recording/delivery contingency | TASK11.25 | 2–4 | FIX11.DELIVER |
| TASK11.ART02 | Backpack motif master first, then five character masters and 61 world-actor cels with current Jo identity. | TASK11.03 | 22–36 | FIX11.ART |
| TASK11.ART03 | Four empty rich room backplates and 3 doorway variants. | TASK11.03 | 12–20 | FIX11.ART |
| TASK11.ART04 | Furniture, all physical carriers/state pieces, caddy/lid, notice and complete Toast parts. | TASK11.ART03 | 20–32 | FIX11.ART |
| TASK11.ART05 | Reusable terrain, two figures, seed, boats, roots and flower with cue endpoint poses. | TASK11.ART02 | 10–16 | FIX11.ART |
| TASK11.ART06 | Four equal-status tile faces, three E2 historical frames and frozenpartial photo. | TASK11.ART02, TASK11.ART03, TASK11.ART04 | 6–10 | FIX11.ART |
| TASK11.ART07 | Pack/export/alpha cleanup and review shared28clip endpoints; inspect representative connected compositions against Item 08. | TASK11.ART02, TASK11.ART03, TASK11.ART04, TASK11.ART05, TASK11.ART06 | 10–18 | FIX11.ART |
| TASK11.ART08 | Six original short foley masters/MP3 exports. | TASK11.03 | 2–4 optional | FIX11.OPTIONAL |
| TASK11.ART09 | Refine contact shadows, restrainedpetal/Toast flourish and lens lighting already specified; no added assets/features. | TASK11.ART04, TASK11.ART07 | 3–6 optional | FIX11.OPTIONAL |

## Required connections

- Story/education: L01/E4.a+NAV.MEDIA and L02/E6.a+E7.a/b are implemented by sources, voluntary plan records, physical travel and puppet consequences; L03/L05 govern the meaning of the evidence.
- An implementation task is not accepted merely because every ID appears. Its linked fixtures must assert actual results; TASK11.21 additionally sweeps the full Item 06 state/transition inventory against its existing action/return rules.
- The first milestone defers only the 7 comparison/timeline/My ideas states to TASK11.17. Evidence tray, exact readers, chosen lead and both search/story plan-recording opportunities are included immediately.
- Final quality is required even though temporary equivalents permit connected implementation. Optional audio/decorative polish has an explicit owner and disclosed deferral, without removing Toast, captions, cue endpoints or illustrated finish.
