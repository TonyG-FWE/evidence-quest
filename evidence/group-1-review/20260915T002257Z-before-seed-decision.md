# Group 1: connected story and gameplay review

Started September 14, 2026 (America/New_York). Status: **IN DISCUSSION; NO NEW STORY DECISION APPROVED**.

This is the record for Tony's request to review the adventure one connected issue at a time. The numbered connections below organize discussion, not implementation. No TASK11 dependency, acceptance result, imported source, runtime, asset, or provider authorization changes here. TASK11.19 remains halted at 1/75 under the existing coordinated-resume rule.

## Source review and evidence boundary

Read the complete [experience audit](EXPERIENCE-AUDIT-20260914.md), all 169 entries in the [written checklist](A-TO-Z-IMPLEMENTATION-CHECKLIST.md), the [machine checklist](A-TO-Z-IMPLEMENTATION-CHECKLIST.json), the [source register](../../evidence/coherence-audit-20260914/source-register.json), and [BUILD-STATUS](../../BUILD-STATUS.md). Followed the relevant decision passages and later corrections cited below. Checked the [existing implementation plan](../design/evidence-quest-design-v3/11-build-packet/implementation-plan.json), current Garden source, and the historical [functional verification receipt](../../evidence/full-garden-20260914/verification.json).

Read-only consistency checks: all 169 JSON IDs/titles, current findings, and acceptance descriptions match the written checklist. All 96 group/task bindings have the same dependencies as their tasks in the implementation plan. All solution fields remain empty. Those checks establish document consistency, not that the game meets the checklist.

Working context: existing dirty `codex/first-connected`, HEAD `63af7a2261553c2639842a458b54dde38311e3f7`. Review used current workspace files, including existing uncommitted Garden work. No new browser playthrough, runtime test, learner session, or provider request was performed. Historical test results are evidence only for their recorded candidates and conditions; the later failed owner acceptance controls the current experience status.

## Foundations already agreed

These do not need to be selected again:

- Ages 9-12; fluency, comprehension and vocabulary through a coherent adventure; story completion is not proof of learning.
- [D022](D022-STUDIO-AND-PIPS-ADVENTURE.md) and [D033](D033-OPENING-AND-FIRST-ACTIONS.md): Jo introduces the child's role, Loop begins ready, and the child guides Pip in the Garden Adventure. The later studio presentation uses the actual result. No equipment-recovery prerequisite.
- [D011-D012](DECISIONS.md): the garden is a place for shared stories. Mara's changed work hours and Sol's doubts precede the storm. Grandma mistakes fewer visits for lost interest. The storm later damages access.
- [D018](D018-ROUTE-CROSSING-AND-TIME.md): Pip promises to plant with Grandma before dark; the garden and Sol's workshop are across the river from Pip and Mara. Reading/help does not consume the preparation period. The event advances story time explicitly.
- [D021](D021-LANTERN-GARDEN-RULES.md): older stories remain; existing rooted flowers wait for new contributions; planting the actual seed grows Pip's separate flower; later sharing adds a record or picture. Planting does not solve people's circumstances or manufacture their stories.
- [D023](D023-VISIT-ORDER-AND-CHARACTER-KNOWLEDGE.md), [D024](D024-CHANGING-THE-GATHERING-PLAN.md), [D025](D025-GRANDMA-BEFORE-MARA.md), and [D032](D032-GATHERING-THROUGH-CHARACTER-INTERACTIONS.md): reachable alternate visit orders are valid; completed work persists; characters learn through actual communication; changed plans require updating the affected people.
- [D026](D026-REQUIRED-STORY-AND-OPTIONAL-PLAY.md): the completed chapter includes planting, both main contributions, the gathering, Grandma's account, Pip's actual remembered moment and the applicable closing. Mara need not attend; Sol need not finish his draft. Optional reading, questions, help and practice remain optional. The complete chapter and short recording are separate deliverables.
- Mara's three arrangements remain usual time/Pip reading, later/Mara reading, and later/Pip reading with Mara listening. Sol can bring a prepared ending, develop the draft during the gathering, or leave it open; both prepared emphases remain supported. Preserve every combination.
- The later [boat/bridge correction](BOAT-BRIDGE-CORRECTION-20260914.md) establishes a separate seed boat and two wooden bridge sections. It supersedes the older dual-purpose boats. Mara's passenger vessel is separate from both.
- The later [full-chapter correction](FULL-CHAPTER-IMPLEMENTATION-20260914.md) requires an attempted unsecured crossing, visible collapse, safe retreat and rebuilding. A warning or blocked crossing alone is insufficient. Preserve the five equal physical histories and unrelated progress.
- Tony's latest instruction: reading/conversation informs a choice; confirmation leads to an action and visible consequence in the world. Exact controls, geometry and presentation come later, but the action's actor, meaning and outcome must be settled here.

## Dependency-ordered open connections

The prerequisites in this table concern meaning and causality. They do not dictate a forced player visit order. Independent roots can be discussed separately.

| Connection | What remains unresolved | Actual prerequisite for resolving dependent events | Audit coverage |
|---|---|---|---|
| 1. Pip's seed and personal starting purpose | Establish the seed's origin and the occasion behind the existing planting promise; make its relationship to Pip's later story clear in the opening | No other open connection is needed for this narrow decision. Its outcome informs opening, planting and closing language | GA-A02-05/A07, GA-B06-08, GA-E04-06, GA-L01/L04 |
| 2. Mara's work and availability | Specify her actual job, who operates the passenger boat, people needing her help, and the difference between usual gathering time and the end of her duty | Work facts must be settled before a plan, explanation, departure or attendance scene can be complete; access remains a separate condition | GA-C01-09, GA-J01-03/J09, GA-M03 |
| 3. Bakery chronology and actors | Reconcile the completed repair account with required world gameplay; establish when Pip encounters Rina's problem and what each person does | This must precede final bakery geography, materials, failures, baking, thanks, Sol's manuscript and writing prompt. No flashback or present-day replacement is selected | GA-H01-15, GA-I01-02, GA-M05 |
| 4. Places, resources and recovery | For each required object: owner, source, permission, movement/carrying, use, destination and recovery. Include bridge pieces/fasteners, seed boat, seed, story copies, bakery materials and any tape interaction | Each local material rule depends on that scene's actors and actions. Bridge resources can be discussed independently of the bakery; a combined resource ledger cannot be finalized before connection 3. Check for materials behind the crossing they must repair and for one task consuming another's supplies | GA-B01-08, GA-D01/D06/D08/D11-12, GA-E01-03, GA-G03, GA-H07-14, GA-R02/R05 |
| 5. Crossing, planting and the next purpose | Explain why sending the seed ahead is useful; preserve carried-seed success; show bridge failure/recovery; join planting, the first lantern explanation, Grandma's concern and the next useful visit | Requires the applicable resource/recovery rules in 4 and seed context in 1. Repairing access cannot be treated as finishing Mara's work or resolving Sol's doubts | GA-D01-12, GA-E01-06, GA-F01-08, GA-A08-10 |
| 6. Accounts, writing and actual sharing | Define what can be played or changed in The Torn Wing versus what remains history; connect Sol's writing to experienced events; separate interpretation, exact child wording, rehearsal, selection, reading and contribution | Sol's factual source depends on 3. World actions depend on 4. A past event cannot become a new present-day task merely because it appears in a page. Fallback and permitted interpretation must be settled before free writing becomes an attributed record | GA-G01-06, GA-I01-09, GA-M01-08, GA-N01-08, GA-O01-03/O08, GA-P01-07 |
| 7. Agreements, invitations and knowledge | Complete the chain from offer to time agreement, role permission, notification, return report to Grandma and revisions; account for recipients still expecting an old plan | Depends on Mara's actual constraints in 2 and each contribution's actual preparation/permission in 6. Beginning must depend on completed preparations, not future arrivals, performances or return delivery | GA-C06-09, GA-J01-10, GA-F06-07, GA-R02/R04 |
| 8. Gathering and garden change | Show the welcome, actual arrival/work completion, tellers/listeners, contribution-specific responses, draft discussion, Grandma's new understanding, and individual lantern recording | Depends on 5-7. Current participants, text and knowledge must be established before displaying the corresponding world result. Check all nine Mara/Sol outcome combinations and both prepared emphases | GA-F03-05, GA-K01-10, GA-L01-02 |
| 9. Remaining promises and conclusion | Show the actual return copy when Mara is absent or reciprocal listening when present; keep Pip's selected moment and Loop's final images true to the route | Depends on 8 and on every outstanding commitment. Chapter completion, later playback and optional exploration remain distinct | GA-L01-08, GA-A06, GA-O06, GA-R03-07, GA-S01-08 |

### Recommended discussion order

Begin with connection 1, then follow the child's experience: Mara and the river, bridge materials/recovery, planting and the garden, Sol/Rina and the bakery, remembered accounts and writing, invitations, gathering, closing. This is a recommendation for a readable conversation. The bakery's chronology is a prerequisite for its material rules and Sol's writing; it is not a prerequisite for deciding how bridge pieces are recovered.

For **every** event, resolve the needed reading information, a plausible misunderstanding and its consequence, vocabulary in context, useful optional fluency practice, character knowledge and promises, and the unavailable-AI path. This covers the story-level parts of M-P and Q-S throughout the review. Exact layout, control placement, animation timing, rendering, service/model choice and device qualification belong later. Their later implementation does not justify deferring the story action itself.

## Source conflicts and additional gaps to retain

1. **Two boats versus separate boat and bridge: resolved by an existing later decision.** D018/D030/D037/R15 still contain dual-purpose-boat descriptions. The September 14 boat/bridge correction supersedes those portions. It does not explain who supplied the wooden sections or establish a wood collection system.
2. **Blocked crossing versus collapse: resolved by an existing later correction, incompletely delivered.** The full-chapter correction supersedes blocked-only behavior. Current `reaches()` in [model.ts](../../src/garden/model.ts) still tests hidden narrow coordinate tolerances. [GardenApp](../../src/garden/GardenApp.tsx) still conditions named crossing actions on these predicates. The audit's ordinary-input failure remains open despite a tested collapse handler.
3. **Historical bakery versus playable repair: unresolved with Tony.** [D039](D039-SOLS-PAGE-AND-WRITING-SOURCES.md) says Sol replaced a cracked tile, left, and later received Rina's thanks. [D036](D036-CAST-AND-PLACES.md) and [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md) explicitly exclude a current Pip/Rina repair quest. Tony now requires the relevant bakery actions in the world. His correction establishes the gameplay requirement; it has not selected its chronology, actor or repair mechanism. The discrepancy includes cast/geography/material scope, not only verb tense.
4. **Audit assumption about historical play: unresolved, not automatic scope.** GA-G03 calls for tape fetching/mending; D038 presents those as Mara's remembered account. Tony's current request explicitly asks us to distinguish recounted events, sharing choices and player-changeable events. The world-gameplay rule does not by itself make every older story a new quest. Settle The Torn Wing's playable agency explicitly and preserve its facts and supported interpretations.
5. **Seed provenance: newly isolated gap.** The reviewed opening and original CT.SRC.E6 establish possession and a promise, but do not identify where the seed came from or the occasion for the planting plan. D021 already establishes its later use as Pip's flower. Do not invent a seed economy, emergency or extra gardening task to fill this gap.
6. **Mara aboard versus waiting ashore: newly isolated gap.** D014 has her at the dock waiting for the last boat; the older The Unexpected Duet describes travelling on her boat. These can coexist, but the present job and vessel operator are not explicit enough to stage. Do not silently make Mara simultaneously sail an approaching boat and wait for it ashore. This is an unresolved role question, not a proven historical contradiction.
7. **Shared-resource accounting: additional explicit check.** Neither scattered wood nor a bridge-repair flag establishes a usable supply of bakery materials. If materials are shared, establish which remain available for the other task; if separate, establish each actual source. Collapse recovery must not strand the only required material across an unusable crossing.
8. **Early sharing versus gathering sharing: join without duplication.** D015/D021 allow Mara's page to be shared and recorded with Grandma before the gathering; D026 also includes her contribution at the gathering. Both can be real tellings of the same story. Specify the second event's purpose and preserve one record; later/Mara must remain possible without an invented early copy or compulsory early reading.
9. **Witnessed bakery events versus later disclosure: consequence of connection 3.** If Pip witnesses bread and thanks in world play, a later question cannot pretend those facts are unknown to Pip. Sol may still need help expressing their significance. If he recounts unseen events, their source and disclosure must be explicit. This affects the original-draft discussion and AI's permitted source information.
10. **No remote character knowledge.** Current [chapter.ts](../../src/garden/chapter.ts) has separate reports but uses global invitation data for readiness without D032's distinct final report of the arrangements. [ChapterPanels](../../src/garden/ChapterPanels.tsx) supplies the same `REPORT_MARA` action from two differently worded continuations. Preserve the difference between the child's answer, supplied help, Pip's report and Grandma's acquired knowledge.

## What existing implementation establishes

Source inspection confirms opening text and seed possession, distinct seed transport and bridge state, planting/bloom states, draft/version distinctions, invitations, story records and closing-copy states. [StoryStage](../../src/garden/StoryStage.tsx) builds an already-repaired bakery illustration with flour and bread; that is not an implemented bakery repair sequence. The passenger boat in [GardenScene](../../src/garden/GardenScene.tsx) is hidden until a later gathering starts. Gathering and writing frequently use reader-contained scenes.

The historical full-Garden receipt records 68 contract checks, 17 final Garden browser checks and a separate later layout check. It expressly distinguishes those candidates from the earlier full-suite run with failures. The owner audit subsequently rejected experience completeness. None of those receipts is new verification in this review or approval of the missing world actions. Live text/speech, performance and device gaps stay open.

## First issue for Tony: the seed's origin

**Status: PROPOSAL ONLY.** This is the first narrow unresolved connection, not a reopening of the garden premise or a replacement opening.

Already agreed: Pip carries the seed, promises to plant it with Grandma before dark, and later uses its flower for an actual planting or gathering memory. The opening in D033 and current `content.ts` states the promise without the seed's origin. GA-A03, GA-B06-08, GA-E04-06 and GA-L01/L04 are affected.

### Alternatives

| Proposal | Consequence |
|---|---|
| **Recommended: Grandma gave Pip the seed during an earlier visit, and they planned to plant it together.** | Gives possession and the promise one personal origin. Today's planting continues an existing shared plan. The current letter remains evidence of Grandma's concern; it need not become a seed-delivery mechanism. No extra playable errand is required. |
| Grandma sent the seed with her pre-storm letter and invited Pip to plant it with her; Pip agreed in a reply. | Makes the letter both invitation and evidence. Requires reconciling its complete wording and when Pip replied. Changes more of the approved opening correspondence, while leaving the same planting and ending possible. |

### Concrete proposed opening addition

> On his last visit, Grandma had given Pip a lantern seed. They planned to plant it together in her garden, where its flower would hold a story of Pip's own.

Retain the agreed before-dark promise, last-night storm and pre-storm letter. Do not reveal Mara's or Sol's actual reasons in advance. The proposed addition is unapproved wording and unapproved seed history.

### Event record, pending this decision

| Field | Current basis or unresolved part |
|---|---|
| Location/time/participants | Existing studio introduction followed by Pip at the river during the pre-gathering period; Grandma across the river. Earlier seed handoff would be backstory, not an extra playable scene |
| Motive and knowledge | Keep the planting promise; Pip has Grandma's letter, which expresses her belief rather than either friend's actual motive. Earlier gift/plan is proposed |
| Immediate goal | Reach Grandma and plant the actual seed together |
| What the player sees/reads | Pip carrying his backpack, the damaged crossing and far-bank garden; agreed opening/letter plus only the eventual approved addition |
| Decision/confirmation | Existing Begin and Start playing enter the adventure. No gift-selection menu or compulsory comprehension answer. Later crossing/seed choices remain available |
| World actor/action | The child guides Pip; he carries the actual seed. At planting, Pip and Grandma plant it together. Receiving a seed by boat alone cannot complete that promise |
| Visible consequence | On actual planting the seed leaves its holder and grows into Pip's flower. Its later picture comes from a real event. No automatic restoration of other contributions or arrival of friends |
| Ineffective actions/recovery | No new opening failure. Crossing collapse, resource recovery and seed-first purpose remain unresolved in their own connection; do not invent lost seeds or deadline failure |
| Possessions/promises/knowledge | Seed initially belongs in Pip's carried possessions; letter is separate; planting fulfills that promise only. Knowledge of the friends' circumstances requires later encounters |
| Next task | The broken route explains crossing work. The actual first Grandma exchange must then connect the kept promise to the quiet garden and relevant friends. Its joined script remains open |
| Literacy role | Promise/action correspondence; letter observation versus interpretation; later physical reading instructions. Optional vocabulary and reading practice do not certify improvement |
| Dependencies/limits | Gift origin awaits Tony; no exact camera/layout/controls/asset work; seed transport motivation, first-garden script and complete chapter remain open |

Only the seed-origin decision is being requested now. Approval of that decision would not approve the remaining event details, another scene, implementation, or the whole Group 1 sequence.

## Decision log

No new decisions yet. Append Tony's actual reply and its scope here before promoting any proposal to agreed. Keep any revised or rejected proposal identifiable. Existing decisions remain linked above; do not overwrite their original bytes.

## Completion deliverables still open

- Plain-English complete walkthrough, with the routes where they diverge and reconnect.
- Complete dependency map and event/object/knowledge/promise records.
- Audit crosswalk for every relevant finding: agreed design resolution, unresolved, or later-group implementation dependency. Include the newly isolated gaps above. Design agreement and runtime acceptance remain separate.
- Precise Group 2 requirements derived from the agreed actions, roles, outcomes, interruptions and return context. No exact interface solution is selected in this record.

Before Group 1 can close, check circular prerequisites, unexplained objects, invisible actions, chronology, resource use, uncommunicated knowledge, all five physical histories, all nine Mara/Sol outcomes, prepared emphases, alternate visit orders and changed plans. Updating this file does not complete that review or implement the game.
