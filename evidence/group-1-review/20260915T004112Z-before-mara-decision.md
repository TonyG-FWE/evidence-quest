# Group 1: connected story and gameplay review

Started September 14, 2026 (America/New_York). Updated September 14, 2026, 20:22 EDT (2026-09-15 00:22 UTC). Status: **IN DISCUSSION; SEED ORIGIN AGREED; MARA'S JOB PROPOSED**.

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
- Group 1 decision, September 14: Grandma gave Pip the seed during an earlier visit. This supplies its origin; the existing planting promise and flower/memory rules remain the basis. The exact occasion, last-versus-earlier visit, and complete opening wording are not expanded beyond Tony's reply.
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
| 1. Pip's seed and personal starting purpose | **Origin agreed:** Grandma gave it to Pip during an earlier visit. The complete joined opening and planting-to-next-task transition remain open | The origin now informs opening, possession, planting and closing language; it does not close the surrounding experience findings | GA-A02-05/A07, GA-B06-08, GA-E04-06, GA-L01/L04 |
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
5. **Seed provenance: now resolved at design-fact level.** The reviewed opening and original CT.SRC.E6 established possession and a promise without its origin. Tony has now specified that Grandma gave Pip the seed during an earlier visit. D021 already establishes its later use as Pip's flower. The opening script still needs to incorporate that fact; no seed economy, emergency or extra gardening task follows from it.
6. **Mara aboard versus waiting ashore: newly isolated gap.** D014 has her at the dock waiting for the last boat; the older The Unexpected Duet describes travelling on her boat. These can coexist, but the present job and vessel operator are not explicit enough to stage. Do not silently make Mara simultaneously sail an approaching boat and wait for it ashore. This is an unresolved role question, not a proven historical contradiction.
7. **Shared-resource accounting: additional explicit check.** Neither scattered wood nor a bridge-repair flag establishes a usable supply of bakery materials. If materials are shared, establish which remain available for the other task; if separate, establish each actual source. Collapse recovery must not strand the only required material across an unusable crossing.
8. **Early sharing versus gathering sharing: join without duplication.** D015/D021 allow Mara's page to be shared and recorded with Grandma before the gathering; D026 also includes her contribution at the gathering. Both can be real tellings of the same story. Specify the second event's purpose and preserve one record; later/Mara must remain possible without an invented early copy or compulsory early reading.
9. **Witnessed bakery events versus later disclosure: consequence of connection 3.** If Pip witnesses bread and thanks in world play, a later question cannot pretend those facts are unknown to Pip. Sol may still need help expressing their significance. If he recounts unseen events, their source and disclosure must be explicit. This affects the original-draft discussion and AI's permitted source information.
10. **No remote character knowledge.** Current [chapter.ts](../../src/garden/chapter.ts) has separate reports but uses global invitation data for readiness without D032's distinct final report of the arrangements. [ChapterPanels](../../src/garden/ChapterPanels.tsx) supplies the same `REPORT_MARA` action from two differently worded continuations. Preserve the difference between the child's answer, supplied help, Pip's report and Grandma's acquired knowledge.

## What existing implementation establishes

Source inspection confirms opening text and seed possession, distinct seed transport and bridge state, planting/bloom states, draft/version distinctions, invitations, story records and closing-copy states. [StoryStage](../../src/garden/StoryStage.tsx) builds an already-repaired bakery illustration with flour and bread; that is not an implemented bakery repair sequence. The passenger boat in [GardenScene](../../src/garden/GardenScene.tsx) is hidden until a later gathering starts. Gathering and writing frequently use reader-contained scenes.

The historical full-Garden receipt records 68 contract checks, 17 final Garden browser checks and a separate later layout check. It expressly distinguishes those candidates from the earlier full-suite run with failures. The owner audit subsequently rejected experience completeness. None of those receipts is new verification in this review or approval of the missing world actions. Live text/speech, performance and device gaps stay open.

## Settled issue: the seed's origin

**Status: AGREED ORIGIN; JOINED SCENE STILL INCOMPLETE.** Tony's exact reply: "Grandma gave Pip the seed during an earlier visit." This settles the source of the seed. It does not approve every word of the earlier example or complete the opening, seed-boat purpose, or first-garden transition.

Already agreed: Pip carries the seed, promises to plant it with Grandma before dark, and later uses its flower for an actual planting or gathering memory. The opening in D033 and current `content.ts` states the promise without the seed's origin. GA-A03, GA-B06-08, GA-E04-06 and GA-L01/L04 are affected.

### Alternatives considered

| Proposal | Consequence |
|---|---|
| **Selected origin: Grandma gave Pip the seed during an earlier visit.** | Gives the existing carried seed a personal source. Today's planting fulfills the already-agreed promise. The letter retains its existing role. No extra playable errand is introduced. |
| Not selected: Grandma sent the seed with her pre-storm letter and invited Pip to plant it with her; Pip agreed in a reply. | Would make the letter both invitation and evidence, requiring correspondence changes. Retained only as the alternative considered. |

### Concrete proposed opening addition

> On an earlier visit, Grandma had given Pip a lantern seed. They planned to plant it together in her garden, where its flower would hold a story of Pip's own.

Retain the agreed before-dark promise, last-night storm and pre-storm letter. Do not reveal Mara's or Sol's actual reasons in advance. The seed history is now agreed; this combined wording remains a draft. "Earlier visit" follows Tony's actual wording; the previous "last visit" wording is not promoted to fact. The previous record is preserved in the dated snapshot linked in the decision log.

### Event record after the origin decision

| Field | Current basis or unresolved part |
|---|---|
| Location/time/participants | Existing studio introduction followed by Pip at the river during the pre-gathering period; Grandma across the river. The seed was given during an earlier visit. Its exact date and setting are unspecified; no extra playable handoff scene is introduced |
| Motive and knowledge | Keep the planting promise; Pip knows Grandma gave him the seed and has her letter, which expresses her belief rather than either friend's actual motive |
| Immediate goal | Reach Grandma and plant the actual seed together |
| What the player sees/reads | Pip carrying his backpack, the damaged crossing and far-bank garden; agreed opening/letter plus only the eventual approved addition |
| Decision/confirmation | Existing Begin and Start playing enter the adventure. No gift-selection menu or compulsory comprehension answer. Later crossing/seed choices remain available |
| World actor/action | The child guides Pip; he carries the actual seed. At planting, Pip and Grandma plant it together. Receiving a seed by boat alone cannot complete that promise |
| Visible consequence | On actual planting the seed leaves its holder and grows into Pip's flower. Its later picture comes from a real event. No automatic restoration of other contributions or arrival of friends |
| Ineffective actions/recovery | No new opening failure. Crossing collapse, resource recovery and seed-first purpose remain unresolved in their own connection; do not invent lost seeds or deadline failure |
| Possessions/promises/knowledge | Grandma previously gave the seed to Pip; at the playable opening he carries that same seed in his backpack. The letter is separate. Planting fulfills the existing promise; knowledge of the friends' circumstances requires later encounters |
| Next task | The broken route explains crossing work. The actual first Grandma exchange must then connect the kept promise to the quiet garden and relevant friends. Its joined script remains open |
| Literacy role | Promise/action correspondence; letter observation versus interpretation; later physical reading instructions. Optional vocabulary and reading practice do not certify improvement |
| Dependencies/limits | Gift origin agreed. Seed transport motivation, complete opening/first-garden script and complete chapter remain open. Exact camera/layout/controls/assets remain later work |

This decision closes only the origin question. Related GA findings remain open until their other design and eventual gameplay acceptance conditions are met.

## Current issue for Tony: Mara's job and the returning boat

**Status: PROPOSAL ONLY.** This is the next narrow decision under connection 2. The work-hours conflict and three successful arrangements are already agreed; they are not being reopened.

### Source of the uncertainty

[D014](D014-INTERACTION-DRAFT.md) places Mara on the dock, waiting for the last boat and responsible for helping its passengers safely ashore. [D041's The Unexpected Duet](D041-OLDER-LANTERN-STORIES.md) describes her aboard a boat in an earlier account: "When we reached the dock..." Both can be true. The present job, boat operator and distinction between that earlier trip and today's duty need to be explicit. Neither passage alone establishes that she captains the boat.

Current implementation still hides the passenger boat until the later gathering transition (`GardenScene.tsx` passenger visibility). That is source-inspected behavior, not a new browser observation. A working dock must be visible before the child is asked to reason about Mara's availability. Relevant findings: GA-C01-05/C09, GA-J09, GA-M03, GA-B02 and GA-A07.

### Role alternatives and their consequences

| Proposal | Effect on the connected adventure |
|---|---|
| **Recommended: Mara is a ferry attendant, assigned to the dock today; another crew member operates the boat.** | She helps passengers board and disembark, stays available for Pip's conversations and usual-time return-copy delivery, and completes today's duty when the final passengers are safely ashore. Her earlier account of accompanying a trip still fits the job. The operator is a visible supporting worker, not an additional quest or invitation. Today's dock assignment and separate operator are proposed facts, not existing approvals. |
| Mara captains the passenger boat herself. | Makes her trips the visible work, but she must leave the dock. This requires revising D014's waiting-for-the-boat wording, defining when Pip can deliver invitations, and reconciling the usual-time closing where she receives Grandma's copy while still waiting for the last boat. Those consequences need explicit follow-up; selecting this role would not silently approve their rewritten scenes. |

### Concrete proposed encounter

The first dock encounter shows a moored passenger boat and Mara helping people ashore, with its operator identifiable. This is an earlier service arrival, not the final return that ends her duty. The current work is separate from The Torn Wing and The Unexpected Duet; their historical passengers are not automatically today's passengers.

Draft role clarification, followed by the already-agreed work-hours explanation:

> **Mara:** "I help passengers get on and off the ferry. Today I'm working here at the dock while another crew member takes the boat out. I have to stay until the last passengers are safely ashore."

Retain the existing information that her hours changed before the storm and now overlap the usual garden gathering. Optional help for **obligation** explains her duty using the visible passenger assistance. The child can propose the existing later gathering, offer to carry/read her story, or test the bridge-only idea.

For the existing "I can read your story to Grandma" choice, confirmation leads to the world handoff: Mara gives Pip the actual permitted copy, Pip carries it, and Mara returns to her passenger work. Possession is not sharing or attendance. The next task is taking the page to Grandma using the crossing while retaining the planting promise. This uses an already-agreed outcome to demonstrate why the proposed role matters.

The bridge-only proposal receives the agreed explanation that a crossing helps her travel but does not finish her duty. It leaves work and invitations unchanged and keeps the supported alternatives available. There is no required wrong answer. Her work ends only at its eventual actual event boundary, not when Pip reads, practices or chooses a plan.

### Other dialogue choices under the same proposed role

September 14 follow-up: Tony asked, "That reconciles the one dialogue. **'I can read your story to Grandma,'**, but what about the other dialogue choice?" This is a request to complete the branch explanation, not approval of the proposed job. The following connects existing D014/D049/D032 agreements; Mara's new role/crew details remain proposed.

**Offer to ask for a later gathering.** Keep the existing player choice:

> **Pip:** "I'll ask Grandma to start the next gathering later."

And D014's existing response:

> **Mara:** "Please do. If it starts after the last boat returns, I can come once there's a crossing we can use."

Under the proposed dock-duty role, finishing work means the final passengers are safely ashore, as D049/D032 already require. The boat's arrival alone does not release Mara from that duty. The first conversation leaves her at work with her page and gives Pip an actual commitment to ask Grandma. It does not transfer the page, reschedule the event, invite Mara or create attendance. Any page previously obtained through another actual choice remains where it is.

D049's optional own-words follow-up, "How would starting later help me get to the gathering?", uses the actual work-hours account. An explanation connecting later timing to finishing passenger assistance receives the agreed acknowledgement. A bridge-only explanation receives the existing distinction between access and working hours. Help and ordinary continuation remain available; the follow-up is not an answer gate or compulsory oral exercise.

The later consequence requires the connected actions:

1. Pip makes the crossing usable, reaches Grandma and fulfills the actual planting promise. He communicates Mara's work constraint; any other actual completed work is retained.
2. Grandma and Pip agree the later gathering through their conversation. The opening offer alone cannot do this.
3. Pip tells Sol the time and asks Mara whether she will tell her story or listen while Pip reads. The outstanding visits can happen in either order. If Mara reads, she can bring her own page; no early copy is required. If Pip will read and has not obtained a copy/permission, that handoff must actually happen during an applicable Mara encounter.
4. Pip reports the actual arrangements to Grandma. When all applicable preparations are complete, Begin the gathering advances story time.
5. The world shows the last boat return, Mara help its passengers ashore, and then her walk across the usable footbridge. Sol arrives from his workshop. The gathering visibly uses the agreed reader/listener roles.

**Offer to carry/read the story.** The actual permission and copy handoff let Mara's story travel before Mara is free. This does not lock the player into a usual-time gathering. A later plan can still let Mara attend as reader or listener, with the actual page ownership and invitations retained.

**Bridge-only idea.** Keep "I'll fix the bridge so you can come at the usual time" and Mara's reply, "Fixing the bridge would help me cross the river. But I would still be working when the storytelling starts." This proposal leaves the scheduling problem open; the other offers remain available. It is distinct from the later physical unsecured-bridge collapse requirement.

The two helpful offers therefore address different things: arranging a time Mara can attend, or carrying her contribution while she works. They are compatible preparations, not mutually exclusive ending selections. The role proposal must support both and the recoverable bridge-only misunderstanding.

### Partial event record for this decision

| Field | Proposed detail or retained agreement |
|---|---|
| Place/time/participants | Mara's starting-bank dock during preparation; Pip, Mara, passengers and a boat operator. Operator/assignment and first-encounter work staging are proposals |
| Motive/known facts | Mara still values the garden; today's passenger duty overlaps the usual gathering. Her historical aboard-the-boat story remains an earlier event. Grandma learns the actual explanation only through an appropriate report |
| Player purpose | Understand her absence and choose a workable way for stories to be shared |
| Reading/choices | Existing work-hours and obligation account, proposed role clarification, and existing later-time/page/bridge-only choices. The source remains available during the decision |
| Confirmation/world result | The actual chosen offer or permitted page transfer occurs. A later-time offer only creates a task to ask Grandma; it does not reschedule the gathering. A page handoff gives possession/permission while Mara stays at work |
| Failure/recovery | Bridge-only reasoning leaves the work conflict unresolved; Mara explains why. The player can reconsider, use help or leave. No lost page, forced answer or mandatory mistake |
| Possessions/commitments/knowledge | Preserve distinct source exposure, Mara's copy/permission, any offer to ask Grandma, and the conditional wish for a return story. No remote notification or instant attendance |
| Later consequence | A later arrangement can bring Mara after final disembarkation, reading or listening. At usual time Pip represents her contribution and later delivers Grandma's copy through the existing route |
| Open dependencies | Actual role awaits Tony. Complete passenger-service geography, vessel ownership, detailed work/arrival sequence and joined dialogue remain to be specified consistently with the chosen role. No exact counts, clock times or passenger minigame are selected |

The question now concerns her job: ferry attendant on dock duty today, or captain. The demonstrated role clarification and staging remain proposed wording/details until reconciled with Tony's decision. Existing gathering outcomes remain agreed.

## Decision log

### September 14, 2026: seed origin agreed

- **Exact user reply:** "Grandma gave Pip the seed during an earlier visit."
- **Agreed fact:** Grandma gave the seed to Pip on an earlier visit; it is the seed he carries at the beginning of the adventure.
- **Existing rules carried forward:** planting with Grandma before dark, the actual seed's ownership and growth, and the later actual-memory choice follow D018/D021/D033. The reply does not make the gift the last visit, establish a new date, or approve the complete draft passage.
- **Record effect:** connection 1's origin subquestion is resolved at design-fact level; corresponding event/possession context updated. No GA item is marked implemented, accepted or fully resolved by this limited decision.
- **Preserved prior record:** [exact before snapshot](../../evidence/group-1-review/20260915T002257Z-before-seed-decision.md), SHA-256 `a360e7eaa9c99b88b225889495ffbdb890b85c8bdd72047650b80991ce6424ac`.
- **Next discussion:** Mara's actual job and why she remains at the dock. Both role alternatives and new explanatory dialogue above remain proposals.

Continue appending Tony's actual replies and their scope before promoting further proposals. Existing source decisions and their bytes remain intact.

## Completion deliverables still open

- Plain-English complete walkthrough, with the routes where they diverge and reconnect.
- Complete dependency map and event/object/knowledge/promise records.
- Audit crosswalk for every relevant finding: agreed design resolution, unresolved, or later-group implementation dependency. Include the newly isolated gaps above. Design agreement and runtime acceptance remain separate.
- Precise Group 2 requirements derived from the agreed actions, roles, outcomes, interruptions and return context. No exact interface solution is selected in this record.

Before Group 1 can close, check circular prerequisites, unexplained objects, invisible actions, chronology, resource use, uncommunicated knowledge, all five physical histories, all nine Mara/Sol outcomes, prepared emphases, alternate visit orders and changed plans. Updating this file does not complete that review or implement the game.
