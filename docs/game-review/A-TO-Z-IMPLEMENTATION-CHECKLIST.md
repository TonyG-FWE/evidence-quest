# Garden Adventure: A-to-Z implementation and acceptance checklist

September 14, 2026. **Current experience: incomplete and rejected in the owner playthrough.** This is a defect and omission audit for joint review, not a replacement story or authorization to implement a new one.

**The governing interaction rule:** reading, speaking, understanding, choosing, and confirmation happen in the reading/conversation area. The resulting action and its consequences happen in the game world. A miniature illustration inside the reader does not satisfy a promised world activity.

Tony rejected the premature question about putting the bakery in a flashback. No flashback, present-day rewrite, crafting recipe, new resource economy, or replacement task sequence is selected here. The bakery, wood, repair, and bread requirements are recorded as open gaps. Existing wording and the latest corrections must be reconciled after the audit, with Tony.

169 individually tracked checks across 19 groups cover all R01–R20 topics. These are not percentages of a game: a missing causal sequence can invalidate several otherwise working controls. See [audit and journey](EXPERIENCE-AUDIT-20260914.md), [machine-readable checklist](A-TO-Z-IMPLEMENTATION-CHECKLIST.json), and [source inventory](../../evidence/coherence-audit-20260914/source-register.json).

Status: **MISSING** = no required interaction; **PARTIAL** = some implementation but incomplete connection; **DEFECT** = observed or code-confirmed failure; **PRESENT** = existing function worth preserving, acceptance still open; **UNVERIFIED** = not established by current evidence; **UNRESOLVED** = a mismatch that must be reviewed, not silently redesigned.

Each checkbox means the complete connected feature has been implemented, verified and accepted. It is not a claim that every unchecked item has no code.

## Journey and supporting systems

- [A. Purpose, opening, and the whole journey](#a-purpose-opening-and-the-whole-journey)
- [B. Places, characters, materials, and backpack](#b-places-characters-materials-and-backpack)
- [C. Mara, her work, and the passenger boat](#c-mara-her-work-and-the-passenger-boat)
- [D. Footbridge construction and consequences](#d-footbridge-construction-and-consequences)
- [E. The seed, transport, and planting](#e-the-seed-transport-and-planting)
- [F. First garden visit and lantern purpose](#f-first-garden-visit-and-lantern-purpose)
- [G. Mara's story, The Torn Wing](#g-maras-story-the-torn-wing)
- [H. Sol, the bakery, repair, and bread](#h-sol-the-bakery-repair-and-bread)
- [I. Writing, choosing, and performing Sol's ending](#i-writing-choosing-and-performing-sols-ending)
- [J. Planning, invitations, time, and travel](#j-planning-invitations-time-and-travel)
- [K. The gathering brings the threads together](#k-the-gathering-brings-the-threads-together)
- [L. Closing, returning a story, and Loop's presentation](#l-closing-returning-a-story-and-loops-presentation)
- [M. Comprehension through action and conversation](#m-comprehension-through-action-and-conversation)
- [N. Vocabulary and readable source material](#n-vocabulary-and-readable-source-material)
- [O. Fluency, narration, and optional listening](#o-fluency-narration-and-optional-listening)
- [P. AI behavior, honesty, and implementation boundaries](#p-ai-behavior-honesty-and-implementation-boundaries)
- [Q. Layout, controls, hints, and accessibility](#q-layout-controls-hints-and-accessibility)
- [R. State, save, interruption, and consistency](#r-state-save-interruption-and-consistency)
- [S. Acceptance, demo readiness, and evidence](#s-acceptance-demo-readiness-and-evidence)

## A. Purpose, opening, and the whole journey

Review topics: R01, R02, R03, R04, R06, R18. Existing implementation ownership: TASK11.02, TASK11.07, TASK11.15, TASK11.16. These IDs retain their original dependencies.

Sources: [D001](DECISIONS.md), [D002](DECISIONS.md), [D003](DECISIONS.md), [D004](DECISIONS.md), [D006](DECISIONS.md), [D007](DECISIONS.md), [D009](DECISIONS.md), [D011](DECISIONS.md), [D012](DECISIONS.md), [D022](D022-STUDIO-AND-PIPS-ADVENTURE.md), [D026](D026-REQUIRED-STORY-AND-OPTIONAL-PLAY.md), [D033](D033-OPENING-AND-FIRST-ACTIONS.md).

Inspected implementation: [GardenApp.tsx](../../src/garden/GardenApp.tsx), [content.ts](../../src/garden/content.ts), [chapter.ts](../../src/garden/chapter.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-A01 — An independently understandable adventure** · DEFECT

  **Now:** Tony cannot explain the current journey from A to Z after playing it. Passing handler tests did not establish this.

  **To close:** A fresh player can explain who they are helping, what the current problem is, what they can do, and what changed, using the game itself.

- [ ] **GA-A02 — Jo, Loop, and the entry into Pip's world** · PARTIAL

  **Now:** Jo and Loop are modeled and the introduction exists. Begin jumps to the river; the projection and return framing are weak.

  **To close:** The ready studio clearly introduces Pip's story, the child's role, and the transition into the playable world without an equipment quest.

- [ ] **GA-A03 — The seed promise and its stakes** · PARTIAL

  **Now:** The opening says plant with Grandma before dark. It is largely a text premise; its relationship to the larger story needs a visible payoff.

  **To close:** The seed, Grandma, planting place, promise, and later story memory remain connected throughout play.

- [ ] **GA-A04 — Why the garden became quiet** · PARTIAL

  **Now:** The letter, Mara's explanation, and Sol's doubt exist in separate panels. Their relationship is not established as a coherent investigation.

  **To close:** The child encounters Grandma's belief, each actual reason, and the changed understanding through connected scenes.

- [ ] **GA-A05 — Storm chronology** · PARTIAL

  **Now:** Correct past facts exist in prose, but the broken crossing dominates the visible problem and can imply it caused all absence.

  **To close:** Work changes and Sol's reluctance precede the storm; repairing the bridge visibly solves access without pretending it solves work or confidence.

- [ ] **GA-A06 — One complete chapter and a separate recording** · UNVERIFIED

  **Now:** A route reaches an ending. Actual coherent pacing, independent enjoyment, and a final three-minute recording have not been accepted.

  **To close:** The full bounded chapter works independently; recording length does not replace story completeness or introduce filler.

- [ ] **GA-A07 — Child role versus Pip, storyteller, and narrator** · DEFECT

  **Now:** Controls alternate among Pip movement, director construction, first-person Sol writing, and Loop narration with insufficient transition context.

  **To close:** Every change of role identifies whose actions or words the child controls and returns to the correct game situation.

- [ ] **GA-A08 — All gameplay resolves in the world** · DEFECT

  **Now:** Confirmations often leave the player in a reader, planner, or miniature rehearsal rather than showing the action and consequence in the game.

  **To close:** Apply Tony's latest instruction: read/speak/choose/confirm in the reading area, then perform and observe the action and consequence in the game world.

- [ ] **GA-A09 — Purposeful tasks instead of following buttons** · DEFECT

  **Now:** Most later progress consists of opening a panel and selecting a supplied successful continuation.

  **To close:** The reading gives information needed to make a meaningful decision; the confirmed decision has an understandable world consequence and a reason for the next task.

- [ ] **GA-A10 — Literal, age-appropriate language** · PARTIAL

  **Now:** Titles and full passages exist, but references such as finish the ending and what did the repair make possible are not grounded in the player's experience.

  **To close:** Each instruction has a clear actor, object, action, and reason understandable to ages 9–12; challenging vocabulary receives support without vague prose.


## B. Places, characters, materials, and backpack

Review topics: R05, R08, R15, R17, R19. Existing implementation ownership: TASK11.05, TASK11.06, TASK11.08, TASK11.10, TASK11.15. These IDs retain their original dependencies.

Sources: [D009](DECISIONS.md), [D018](D018-ROUTE-CROSSING-AND-TIME.md), [D028](D028-3D-AND-DEMO-SCOPE.md), [D036](D036-CAST-AND-PLACES.md), [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md).

Inspected implementation: [art.ts](../../src/garden/art.ts), [chapterWorld.ts](../../src/garden/chapterWorld.ts), [GardenApp.tsx](../../src/garden/GardenApp.tsx), [model.ts](../../src/garden/model.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-B01 — Recognizable places with functions** · PARTIAL

  **Now:** Studio, dock, river, workshop, and garden exist; the workshop is a small outside façade and there is no bakery destination or playable bakery scene.

  **To close:** Every required place has a clear purpose, approach, relevant objects, and observable activity. The bakery requirement stays open until its connection is resolved with Tony.

- [ ] **GA-B02 — Distinguishable character identities** · PARTIAL

  **Now:** Named main characters exist. Reused Rina, boy, and Sol models also depict generic passengers or remembered people.

  **To close:** The child can identify who is speaking or acting, and historical people or passengers cannot be mistaken for another active character.

- [ ] **GA-B03 — Usable objects versus scenery** · DEFECT

  **Now:** Broken scraps, ready-made bridge sections, tiny posts, seed boat, workshop props, and flowers have inconsistent cues and interactivity.

  **To close:** A player can tell which objects are usable, why, and how; decorative objects do not appear to promise unavailable actions.

- [ ] **GA-B04 — Where the planks came from** · MISSING

  **Now:** Two completed bridge decks begin on the bank. Nearby broken wood is decoration with no recovery, inspection, or collection action.

  **To close:** Establish the source and intended use of the material in play; account for Tony's requested wood collection without silently inventing quantities or a crafting system.

- [ ] **GA-B05 — Collecting and using materials** · MISSING

  **Now:** The state and commands have no wood/tool/material pickup, carry, use, or consumption sequence.

  **To close:** The requested collection has a concrete world source, purpose, player action, item state, use, and consequence. Exact mechanics remain an audit follow-up, not an approved new design.

- [ ] **GA-B06 — Backpack purpose** · PARTIAL

  **Now:** The backpack is a possession list for seed, letter, Mara's copy, and Grandma's return copy. It is not connected to material collection and its purpose is easy to miss.

  **To close:** The player understands what is carried, where it came from, what it is for, and what changes when it is used or given away.

- [ ] **GA-B07 — Backpack contents and ownership** · PRESENT

  **Now:** Seed/page ownership changes are modeled and displayed. Sol keeps his manuscript; reading a page does not generally create possession.

  **To close:** Verify contents against visible pickup, handoff, planting, return delivery, and restart; preserve the distinction between owned items and readable story records.

- [ ] **GA-B08 — Using an item at the relevant place** · PARTIAL

  **Now:** Plant/share/give buttons select the item automatically; the item-to-task connection is mostly explanatory text.

  **To close:** The game makes the actual item, recipient or target, and resulting transfer unmistakable. Manual inventory selection is not assumed to be the answer.

- [ ] **GA-B09 — World scale and camera readability** · DEFECT

  **Now:** In the audit view, the whole island shrinks while the construction panel scrolls; posts and damaged bridge details become hard to identify.

  **To close:** Required objects, hands, materials, attachment points, and consequences remain readable at the demo viewport without exact-pixel searching.


## C. Mara, her work, and the passenger boat

Review topics: R04, R05, R07, R08, R11, R18. Existing implementation ownership: TASK11.02, TASK11.06, TASK11.09, TASK11.10, TASK11.15. These IDs retain their original dependencies.

Sources: [D014](D014-INTERACTION-DRAFT.md), [D018](D018-ROUTE-CROSSING-AND-TIME.md), [D032](D032-GATHERING-THROUGH-CHARACTER-INTERACTIONS.md), [D043](D043-ALTERNATE-GATHERING-DIALOGUE.md), [D049](D049-EXPLAINING-A-PLAN-TO-MARA.md), [D050](D050-SHARING-STORIES-WHILE-MARA-WORKS.md).

Inspected implementation: [GardenApp.tsx](../../src/garden/GardenApp.tsx), [GardenScene.tsx](../../src/garden/GardenScene.tsx), [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [chapter.ts](../../src/garden/chapter.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-C01 — Mara doing her job when first met** · MISSING

  **Now:** Mara stands at an empty dock. The passenger boat and passengers are hidden during planning.

  **To close:** The game establishes her actual work and why she cannot leave, before asking the child to solve her scheduling problem.

- [ ] **GA-C02 — Passenger boat distinct from seed boat** · PARTIAL

  **Now:** A separate passenger vessel is constructed, but it only appears for a later gathering and uses a scaled seed-boat model.

  **To close:** The passenger vessel is recognizable in purpose, size, route, and timing and cannot be confused with seed transport or bridge material.

- [ ] **GA-C03 — People affected by Mara's duty** · MISSING

  **Now:** Two passengers exist only during the final arrival animation and disappear ashore. There is no pre-decision evidence of the people she must help.

  **To close:** The obligation to passengers is observable and relevant to the child's plan; passenger-management mechanics are not silently invented.

- [ ] **GA-C04 — The time conflict before choosing** · PARTIAL

  **Now:** Usual time and after the last boat returns are text choices. The difference is not established through the working dock and gathering context.

  **To close:** The child can explain what overlaps and what postponement changes without needing an external explanation or a forced real-time wait.

- [ ] **GA-C05 — Bridge repair does not finish her work** · MISSING

  **Now:** The original bridge-only conversational misunderstanding is absent as a direct offer. A later optional explanation box is the remaining avenue.

  **To close:** Preserve a meaningful way to discover the difference between access and availability, with a specific character response and world evidence.

- [ ] **GA-C06 — An offer versus an agreed invitation** · PARTIAL

  **Now:** The first later-time offer is transient local reply state; actual invitations are saved separately, but the interface does not clearly distinguish the two.

  **To close:** After each conversation the child knows what has been proposed, agreed, still needs telling, and will happen next.

- [ ] **GA-C07 — Story copy and permission** · PARTIAL

  **Now:** Take-page ownership and animation exist, but the reader remains open and obscures the world handoff.

  **To close:** Mara visibly gives permission and the actual copy, then the game shows Pip carrying it; this does not imply she is attending.

- [ ] **GA-C08 — Reciprocity while Mara works** · PARTIAL

  **Now:** Copy delivery back to Mara is modeled at the end. The child's proposed answer is not used to form the commitment.

  **To close:** Mara's wish to hear a story is connected to a comprehensible promise and actual later return delivery.

- [ ] **GA-C09 — Consequences of all three arrangements** · PARTIAL

  **Now:** Usual/Pip, later/Pip, and later/Mara affect state, attendance, and ending wording; their preparation and payoff are largely panels.

  **To close:** The selected time, work, travel, teller/listener roles, and return-copy duty are visible in the game world for each arrangement.


## D. Footbridge construction and consequences

Review topics: R05, R08, R14, R15, R17, R19. Existing implementation ownership: TASK11.05, TASK11.06, TASK11.10, TASK11.11, TASK11.15, TASK11.21. These IDs retain their original dependencies.

Sources: [D029](D029-FIRST-PLAYABLE-ENCOUNTER.md), [D030](D030-CROSSING-CHALLENGE.md), [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md).

Inspected implementation: [model.ts](../../src/garden/model.ts), [GardenScene.tsx](../../src/garden/GardenScene.tsx), [GardenApp.tsx](../../src/garden/GardenApp.tsx), [garden-chapter.spec.ts](../../browser-tests/garden-chapter.spec.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-D01 — The original damage and the repair task** · PARTIAL

  **Now:** Broken scraps appear at a different crossing from the usable construction spot. There is little connection between that damage and the loose decks.

  **To close:** The player understands what broke, what can be reused or repaired, and what the resulting route will connect.

- [ ] **GA-D02 — Placement based on visible reach** · DEFECT

  **Now:** reaches() requires the bridge center within 0.22 world units of z=3 or z=-2, in addition to visible bank overlap. This hidden rule rejects otherwise plausible positions.

  **To close:** Visible geometry and feedback explain valid placement; no hidden exact-position requirement without an obvious corresponding world target.

- [ ] **GA-D03 — Opposing posts and attachment targets** · DEFECT

  **Now:** Four small posts exist. They sit at z+0.53 while validity tests the bridge center at z, and the valid pair is not explained.

  **To close:** If a required location remains, opposing posts and the placement instruction unambiguously show it, as Tony requested.

- [ ] **GA-D04 — Joining the sections** · PARTIAL

  **Now:** Joining requires near-exact spacing and alignment; only generic short-ends feedback is shown.

  **To close:** Ordinary dragging or native controls make contact, orientation, preview, join, and failure readable without numerical knowledge.

- [ ] **GA-D05 — Wide versus narrow river challenge** · PARTIAL

  **Now:** River width and fixed deck length exist, but a hidden coordinate stripe competes with the intended reach reasoning.

  **To close:** The child can predict and observe a genuine reach difference, then move the same materials without rescaling them.

- [ ] **GA-D06 — Fastening each real end** · PARTIAL

  **Now:** Two buttons and rope states exist; posts are tiny and some controls fall below the fold.

  **To close:** Each end has an obvious loose/secure state and corresponding world fastening; one fastening does not imply both are secure.

- [ ] **GA-D07 — Ordinary unsecured crossing attempt** · DEFECT

  **Now:** Main Go to Grandma requires bridgeReady. Try crossing requires the hidden alignment rule; normal movement can emit the old loose-end block. Tony reports the requested attempt remains inaccessible.

  **To close:** Keyboard movement, scene clicking, and named movement all let Pip step onto a reaching but unsecured bridge and trigger the consequence.

- [ ] **GA-D08 — Collapse, retreat, and rebuilding** · PARTIAL

  **Now:** A three-second collapse handler and animation exist after bridgeAttemptable succeeds. This is not proof the player can trigger it through normal placement and movement.

  **To close:** The bridge visibly fails, Pip returns safely, pieces have a readable new location, and rebuilding is required while unrelated progress survives.

- [ ] **GA-D09 — Honest feedback for the actual failure** · DEFECT

  **Now:** GO and blocked keyboard movement can report fastening when the real cause is placement or a gap.

  **To close:** Gap, alignment, loose connection, obstruction, and unavailable action receive distinct relevant feedback.

- [ ] **GA-D10 — Construction role and current instruction** · DEFECT

  **Now:** The audit entered construction while the goal still said Talk to Mara; joining, fastening, and Back to Pip were below the initial visible panel.

  **To close:** The active construction task, controls, current selection, confirmation, and return to Pip are clear at once without a competing instruction.

- [ ] **GA-D11 — Seed-boat channel and permanent route** · PARTIAL

  **Now:** The placement code reserves a hidden channel; warnings refer to farther along the river. The completed bridge then locks in place.

  **To close:** The navigable boat route and retained bridge are visually understandable; no invisible exclusion area or later disappearing route.

- [ ] **GA-D12 — Recovery and successful alternatives** · PRESENT

  **Now:** State preserves the five physical histories and collapses only the bridge arrangement. Existing tests use controlled placement.

  **To close:** Exercise ordinary-input success with no mistake, one loose end, two loose ends, repeated recovery, seed-first, carried-seed, and save interruption.


## E. The seed, transport, and planting

Review topics: R04, R05, R08, R11, R15, R17. Existing implementation ownership: TASK11.08, TASK11.10, TASK11.11, TASK11.12, TASK11.15. These IDs retain their original dependencies.

Sources: [D018](D018-ROUTE-CROSSING-AND-TIME.md), [D020](D020-GRANDMAS-STORY-AND-CLOSING.md), [D021](D021-LANTERN-GARDEN-RULES.md), [D029](D029-FIRST-PLAYABLE-ENCOUNTER.md), [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md).

Inspected implementation: [model.ts](../../src/garden/model.ts), [GardenScene.tsx](../../src/garden/GardenScene.tsx), [GardenApp.tsx](../../src/garden/GardenApp.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-E01 — A reason to send the seed first** · PARTIAL

  **Now:** Sending it ahead changes ownership, but Pip must still make the same crossing; the purpose or consequence of the alternative is weakly communicated.

  **To close:** The child understands what sending ahead accomplishes, what it does not accomplish, and how it differs from carrying it.

- [ ] **GA-E02 — Actual cargo movement and receipt** · PRESENT

  **Now:** A separate seed boat moves with the seed and Grandma walks to receive it. This is one of the existing world actions.

  **To close:** Ordinary play visibly preserves seed identity, cargo transfer, Pip on shore, and Grandma returning with it.

- [ ] **GA-E03 — Boat limits and harmless later use** · PARTIAL

  **Now:** The note says the boat cannot carry Pip. Later Watch the empty seed boat is a bobbing action with little gameplay purpose.

  **To close:** Boat actions and limits are intelligible; an empty demonstration is not counted as another substantive game mechanic.

- [ ] **GA-E04 — Pip and Grandma plant together** · PARTIAL

  **Now:** Planting changes state and the seed moves, but the Grandma reader can remain open during the action.

  **To close:** Confirmation returns attention to the game, shows both characters and the real seed being planted, and returns to the resulting situation.

- [ ] **GA-E05 — Roots, soil, and the flower** · PRESENT

  **Now:** Soil, growth, and bloom states exist; the seed does not bloom in the boat or hand.

  **To close:** The visible growth follows actual planting, survives interruption once, and is clearly the fulfillment of the seed promise.

- [ ] **GA-E06 — Planting changes the next objective** · PARTIAL

  **Now:** The goal changes to finding stories, but it immediately exposes several competing destinations and library actions.

  **To close:** A visible response from Grandma connects keeping the promise to finding out why stories and visits stopped.


## F. First garden visit and lantern purpose

Review topics: R03, R04, R07, R08, R09, R12, R17. Existing implementation ownership: TASK11.02, TASK11.07, TASK11.08, TASK11.09, TASK11.15. These IDs retain their original dependencies.

Sources: [D015](D015-MARAS-STORY-TO-GRANDMA.md), [D020](D020-GRANDMAS-STORY-AND-CLOSING.md), [D021](D021-LANTERN-GARDEN-RULES.md), [D025](D025-GRANDMA-BEFORE-MARA.md), [D035](D035-CHAPTER-PROGRESSION-AND-ENDING-GUIDANCE.md), [D041](D041-OLDER-LANTERN-STORIES.md).

Inspected implementation: [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [GardenScene.tsx](../../src/garden/GardenScene.tsx), [chapterWorld.ts](../../src/garden/chapterWorld.ts), [chapter.ts](../../src/garden/chapter.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-F01 — Grandma explains her garden** · MISSING

  **Now:** The agreed first-visit explanation about old stories and waiting lanterns is missing. A library button appears instead.

  **To close:** Grandma establishes what the lanterns are, why they hold stories, and why new contributions matter before the library is used as a task.

- [ ] **GA-F02 — Old stories versus current tasks** · DEFECT

  **Now:** The Windy Picnic and The Unexpected Duet are available immediately after crossing. A short older-story label does not explain why the player is seeing them.

  **To close:** Clearly identify these as earlier contributions, their owners, optional purpose, and how to return to the ongoing adventure.

- [ ] **GA-F03 — Empty flowers waiting for stories** · DEFECT

  **Now:** The three reserved NPC flowers are hidden until their records exist, rather than visible empty rooted lanterns waiting for contributions.

  **To close:** The player can see and inspect old contributions, waiting places, and Pip's separately planted flower before the corresponding sharing events.

- [ ] **GA-F04 — Selecting a particular world lantern** · MISSING

  **Now:** All flowers use the same lanterns target and open the same library grid; they do not open their own named story directly.

  **To close:** Each world lantern identifies and opens its own page, author, status, and picture, with the current goal retained.

- [ ] **GA-F05 — New story enters its lantern** · MISSING

  **Now:** Record flags show flowers or library cards. There is no staged Grandma exchange and visible title/picture transfer into the selected world flower.

  **To close:** Sharing causes the visible world lantern to gain the correct title, author, page, and supported image once.

- [ ] **GA-F06 — Grandma's belief changes through information** · PARTIAL

  **Now:** A saved report flag changes replies, but the report panel has two buttons that dispatch the same explanation and the world reaction is absent.

  **To close:** The player sees what Pip communicated and how Grandma's understanding changes; no automatic claim that the child explained it.

- [ ] **GA-F07 — Sol-first and Grandma-first continuity** · PARTIAL

  **Now:** State supports alternate visit orders. Several generic greetings and goals do not demonstrate the promised conditional conversational sequence.

  **To close:** Each character responds only to what has been told, and a completed visit does not become a purposeless repeat errand.

- [ ] **GA-F08 — Library purpose after the ending** · PRESENT

  **Now:** Old and new pages remain available with separate authors and draft status. Their physical relationship to the garden is weak.

  **To close:** Revisit the same world contributions without duplicates, reset, required rereading, or a claim that opening them proves comprehension.


## G. Mara's story, The Torn Wing

Review topics: R04, R05, R09, R10, R11, R12, R17. Existing implementation ownership: TASK11.02, TASK11.08, TASK11.09, TASK11.13, TASK11.15. These IDs retain their original dependencies.

Sources: [D015](D015-MARAS-STORY-TO-GRANDMA.md), [D038](D038-READING-FORMAT-AND-MARAS-PAGE.md), [D052](D052-THE-BOYS-WORDS-AND-ACTIONS.md), [D054](D054-WORD-HELP-IN-DIFFERENT-CONTEXTS.md).

Inspected implementation: [content.ts](../../src/garden/content.ts), [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [StoryStage.tsx](../../src/garden/StoryStage.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-G01 — Who is telling which event** · PARTIAL

  **Now:** The full page has author attribution, but the transition from current Mara to her remembered boy-and-bird account is not staged.

  **To close:** Establish teller, setting, chronology, and the child's role before presenting the events or choices.

- [ ] **GA-G02 — Boy, damaged wing, promise, and hesitation** · PARTIAL

  **Now:** These exist as sentences. The miniature uses a static taped bird and little behavioral change.

  **To close:** The game makes the sequence and visible behavior clear enough to relate the boy's action to the words without asserting his unspoken motive as fact.

- [ ] **GA-G03 — Tape, permission, and mending** · MISSING

  **Now:** There is no tape-fetch or repair interaction; the illustration starts with a tape-colored patch already present.

  **To close:** Account for each intended event and object in the game world, with explicit control and consequence under Tony's world-gameplay rule.

- [ ] **GA-G04 — Interpretation changes presentation meaningfully** · PARTIAL

  **Now:** Two picture buttons change a small illustration; the account and real adventure largely proceed identically.

  **To close:** Make clear what this choice changes, why both supported interpretations are valid, and how the chosen emphasis appears in the eventual world contribution.

- [ ] **GA-G05 — Consequences and misconception feedback** · PARTIAL

  **Now:** An optional text question and generic prepared help exist; live interpretation is unavailable.

  **To close:** A misunderstanding about when the wing tore or why the boy hesitated receives evidence-based feedback without invented motives or a compulsory correct-answer gate.

- [ ] **GA-G06 — Rehearsal and actual sharing stay separate** · PARTIAL

  **Now:** Records are separate internally, but reading from the backpack can expose picture choices and finishing the reader can record early sharing.

  **To close:** The player knows whether they are inspecting, practising, choosing a picture, or actually sharing with Grandma or the gathering.


## H. Sol, the bakery, repair, and bread

Review topics: R04, R05, R08, R09, R11, R17. Existing implementation ownership: TASK11.02, TASK11.05, TASK11.08, TASK11.09, TASK11.10, TASK11.15. These IDs retain their original dependencies.

Sources: [D016](D016-SOLS-UNFINISHED-STORY.md), [D019](D019-THE-GATHERING.md), [D023](D023-VISIT-ORDER-AND-CHARACTER-KNOWLEDGE.md), [D031](D031-SOLS-PLAYER-WRITTEN-ENDING.md), [D036](D036-CAST-AND-PLACES.md), [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md), [D039](D039-SOLS-PAGE-AND-WRITING-SOURCES.md), [D053](D053-DEVELOPING-A-BRIEF-SOL-ENDING.md).

Inspected implementation: [chapterWorld.ts](../../src/garden/chapterWorld.ts), [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [StoryStage.tsx](../../src/garden/StoryStage.tsx), [chapter.ts](../../src/garden/chapter.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-H01 — Why Pip visits Sol** · PARTIAL

  **Now:** A goal points to the workshop, but the source page and ending choices dominate the first meeting.

  **To close:** Establish Grandma's invitation, Sol's reluctance, his unfinished account, and the specific help he wants in a natural world encounter.

- [ ] **GA-H02 — Sol's workshop and manuscript as usable objects** · PARTIAL

  **Now:** A façade, outside workbench, and page model exist. The child talks to Sol to open the page; tools have no gameplay role.

  **To close:** Each intended workshop object has a clear purpose, available action, and visible response; scenery is not counted as interactive work.

- [ ] **GA-H03 — Where and when the bakery story happens** · UNRESOLVED

  **Now:** Older written decisions treat it as Sol's earlier repair; Tony now explicitly requires the events to take place in the game. The premature flashback suggestion was rejected.

  **To close:** Resolve this gap with Tony after the audit. No flashback, present-day retcon, controlled character, or additional mission is selected by this checklist.

- [ ] **GA-H04 — Rina and her promised bread** · MISSING

  **Now:** Rina's request exists only in the manuscript. The player does not encounter her problem as an unfolding world situation.

  **To close:** Establish Rina, what she promised, who depends on it, and why the flour and roof matter before asking about the ending.

- [ ] **GA-H05 — Recognizable bakery** · MISSING

  **Now:** There is no playable bakery. A small building appears only inside an ending illustration.

  **To close:** The required bakery events take place in the game with recognizable space, access, relevant objects, and a clear relationship to the current story.

- [ ] **GA-H06 — Broken roof and incoming water** · MISSING

  **Now:** The illustration is built with the repaired roof/tile already in place. There is no damaged-to-repaired state or leak interaction.

  **To close:** Show the actual fault, water entering, what is at risk, the repair action, and the stopped leak while outside rain remains distinct.

- [ ] **GA-H07 — Flour sacks and the threat to them** · MISSING

  **Now:** Three static sacks decorate the illustration. No moving/protecting/checking sacks or changing condition exists.

  **To close:** Flour condition and any intended player action affect or explain the consequence in the game, not only in the passage.

- [ ] **GA-H08 — Wood, tools, and repair materials** · MISSING

  **Now:** There is no collection or use sequence. The older story specifies a cracked tile, so treating arbitrary wood as that repair would silently change the account.

  **To close:** Account explicitly for Tony's requested material collection and the actual repair mechanism; provenance, ownership, use, and remaining material must be clear.

- [ ] **GA-H09 — Player performs the intended repair** · MISSING

  **Now:** No command, world target, or state transition lets a player repair the bakery.

  **To close:** The agreed repair interaction changes visible physical state and has a clear success/failure response and recovery path.

- [ ] **GA-H10 — Observable repair consequence** · MISSING

  **Now:** The text states the flour stayed dry; the game does not show a before/action/after causal sequence.

  **To close:** A child can observe why the repair changed what Rina could do and distinguish fixing the leak from changing the weather.

- [ ] **GA-H11 — Bread being made** · MISSING

  **Now:** The illustration makes a completed loaf visible after 0.7 seconds. It has no visible flour-to-bread activity or baking sequence.

  **To close:** Bread production follows the supported events with an understandable time transition and actual in-world activity; no invented crafting recipe is approved here.

- [ ] **GA-H12 — Rina's thanks and the loaf** · PARTIAL

  **Now:** A tiny Rina model moves horizontally with a loaf in the rehearsal; no separate world visit or contextual handoff occurs.

  **To close:** The child can see who thanks whom, why, where, and what the loaf represents in the actual story sequence.

- [ ] **GA-H13 — Sol discovers why the small repair mattered** · PARTIAL

  **Now:** A writing prompt asks for the conclusion before the experience has established its cause and consequence.

  **To close:** Sol's changed view follows the visible events and the child's contribution, making the ending a payoff to something that happened.

- [ ] **GA-H14 — Consequence of an ineffective action** · MISSING

  **Now:** There is no bakery gameplay model, so there are no meaningful action outcomes or recoverable setbacks there.

  **To close:** Define and show consequences for intended actions before calling this an interactive episode; the audit does not invent punishments or mandatory mistakes.

- [ ] **GA-H15 — Sol prepares to participate** · PARTIAL

  **Now:** Choosing draft/ending changes flags and replies. The promised putting-away of the page and readiness movement are not clearly performed.

  **To close:** Sol visibly retains the actual page, prepares it, and responds to the invitation; preparation, attendance, sharing, and stored story stay distinct.


## I. Writing, choosing, and performing Sol's ending

Review topics: R05, R09, R10, R11, R13, R16, R19. Existing implementation ownership: TASK11.02, TASK11.09, TASK11.13, TASK11.17, TASK11.18. These IDs retain their original dependencies.

Sources: [D031](D031-SOLS-PLAYER-WRITTEN-ENDING.md), [D039](D039-SOLS-PAGE-AND-WRITING-SOURCES.md), [D047](D047-READING-SOLS-ENDING-ALOUD.md), [D053](D053-DEVELOPING-A-BRIEF-SOL-ENDING.md), [D059](D059-AI-INTERPRETS-SOLS-ENDING.md), [D060](D060-UNCLEAR-ENDING-CLARIFICATION.md), [D061](D061-CORRECTING-A-WRONG-SCENE.md), [D062](D062-CHECKING-DISPUTED-WRITING-FEEDBACK.md), [D063](D063-WRITING-WHEN-AI-IS-UNAVAILABLE.md), [D064](D064-EDITING-WHILE-FEEDBACK-IS-PENDING.md).

Inspected implementation: [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [chapter.ts](../../src/garden/chapter.ts), [FeedbackActivity.tsx](../../src/garden/FeedbackActivity.tsx), [DraftReader.tsx](../../src/garden/DraftReader.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-I01 — An ending to an established sequence** · DEFECT

  **Now:** Finish the ending together jumps straight to original/later text, a writing prompt, and multiple control groups. Tony reasonably cannot tell what ending is being requested.

  **To close:** The writer has just encountered the relevant situation, events, consequence, speaker, and purpose, and can identify what remains to be said.

- [ ] **GA-I02 — Original account versus later information** · PARTIAL

  **Now:** Both headings exist, but FINISH_WITH_SOL discloses laterKnown and opens both immediately.

  **To close:** Make clear which events were in Sol's draft, what he tells the child next, and how that supplies a possible ending.

- [ ] **GA-I03 — One coherent writing interaction** · DEFECT

  **Now:** Source, extra account, writing, word help, feedback, picture selection, try/use controls, and prepared endings coexist inside a dense reader.

  **To close:** The child can follow one clear current activity and understand the next action without losing the source or mistaking tools for story choices.

- [ ] **GA-I04 — Child's exact writing** · PRESENT

  **Now:** Draft text, selected contribution, and revision are separate; later edits do not automatically replace the selected text.

  **To close:** Preserve exact words through revision, reading practice, saving, selection, performance, and replay, with accurate authorship.

- [ ] **GA-I05 — Meaning determines the performed scene** · DEFECT

  **Now:** Try my ending directly uses the manually selected bread/thanks/both scene. Optional AI feedback may suggest a scene but is unavailable locally.

  **To close:** The game truthfully relates the child's intended meaning to the supported world performance and asks for clarification when it cannot, without pretending a keyword or picture choice understood the writing.

- [ ] **GA-I06 — Unsupported writing does not become Sol's fact** · DEFECT

  **Now:** Any nonblank child contribution matching its revision can be selected and published as Sol's ending, even when it contradicts the source.

  **To close:** Preserve the child's draft and a valid way forward while avoiding presenting unverified or contradicted writing as an event Sol witnessed; no AI score gate is required.

- [ ] **GA-I07 — Try, revise, confirm, perform** · PARTIAL

  **Now:** Separate flags and controls exist, but rehearsal and results remain small pictures inside the learning area.

  **To close:** The reading area handles wording and confirmation; the game world performs the corresponding scene and returns to the next meaningful interaction.

- [ ] **GA-I08 — Prepared support and open draft** · PRESENT

  **Now:** Prepared bread/thanks endings and a draft-discussion path exist; all can reach later states.

  **To close:** They remain understandable supported alternatives with honest credit and equal story value, not buttons that conceal missing gameplay.

- [ ] **GA-I09 — Selected ending changes the later contribution** · PARTIAL

  **Now:** Exact selected text and scene feed the gathering, but reactions and world performance are incomplete.

  **To close:** The eventual sharing visibly uses what was actually prepared; subsequent edits or rehearsals cannot silently replace it.


## J. Planning, invitations, time, and travel

Review topics: R04, R05, R07, R11, R15, R18, R19. Existing implementation ownership: TASK11.02, TASK11.06, TASK11.07, TASK11.09, TASK11.10, TASK11.12. These IDs retain their original dependencies.

Sources: [D017](D017-PLANNING-THE-GATHERING.md), [D018](D018-ROUTE-CROSSING-AND-TIME.md), [D023](D023-VISIT-ORDER-AND-CHARACTER-KNOWLEDGE.md), [D024](D024-CHANGING-THE-GATHERING-PLAN.md), [D025](D025-GRANDMA-BEFORE-MARA.md), [D032](D032-GATHERING-THROUGH-CHARACTER-INTERACTIONS.md), [D043](D043-ALTERNATE-GATHERING-DIALOGUE.md), [D049](D049-EXPLAINING-A-PLAN-TO-MARA.md), [D050](D050-SHARING-STORIES-WHILE-MARA-WORKS.md), [D051](D051-GRANDMAS-ASSUMPTION-AND-MARAS-ACCOUNT.md).

Inspected implementation: [chapter.ts](../../src/garden/chapter.ts), [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [GardenApp.tsx](../../src/garden/GardenApp.tsx), [GardenScene.tsx](../../src/garden/GardenScene.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-J01 — Planning grows out of the conversations** · DEFECT

  **Now:** The planner reduces time and speaker to adjacent button groups. It does not deliver the full agreed character-led sequence.

  **To close:** Each decision follows what the player learned from that person and produces a comprehensible commitment in the world.

- [ ] **GA-J02 — All three valid Mara arrangements** · PRESENT

  **Now:** The three combinations are stored and used later; usual-time/Mara is rejected.

  **To close:** Preserve all three and make their different attendance, teller/listener, timing, and reciprocal-sharing consequences observable.

- [ ] **GA-J03 — Meaningful failed plan and revision** · PARTIAL

  **Now:** An unavailable combination shows a preview explanation and cannot be saved. Most other choices already work.

  **To close:** The child can see why a plan fails a real constraint and how changing it alters what happens, consistent with agreed routes and without compulsory failure.

- [ ] **GA-J04 — Actual in-person invitations** · PARTIAL

  **Now:** Distance checks and invitation state exist, but result replies frequently remain notices inside the same panel.

  **To close:** The child sees who has heard which plan and the character's specific response before leaving to the next task.

- [ ] **GA-J05 — Changing a plan already communicated** · PRESENT

  **Now:** Old invitation expectations are retained until retold. The planner lists who needs an update.

  **To close:** Ordinary play visibly carries the change through relevant people, with a clear reason to revisit and no unnecessary repeat trip.

- [ ] **GA-J06 — Pip reports the arranged roles to Grandma** · MISSING

  **Now:** The planner reads global invitation flags. There is no distinct final player report of Mara's agreed role followed by Grandma's readiness exchange.

  **To close:** Grandma receives the relevant arrangement through the agreed interaction; player/global knowledge cannot substitute for character communication.

- [ ] **GA-J07 — Readiness is preparation, not a quiz** · PARTIAL

  **Now:** Before we begin lists state prerequisites. With many other actions present, it feels like a hidden task checklist.

  **To close:** Each prerequisite was established as a natural story task; the child knows what remains and why without a clue count or answer score.

- [ ] **GA-J08 — Story time advances at the event boundary** · PRESENT

  **Now:** Begin gathering starts the arrival transition; reading duration does not advance story time.

  **To close:** Make the time change clear in the game and preserve deliberate reading pace without a real-time penalty.

- [ ] **GA-J09 — Passengers finish, then Mara travels** · PARTIAL

  **Now:** A short arrival animation exists for the later plan, but the preceding job context and work completion are weak.

  **To close:** Show arrival, safe disembarkation, Mara finishing duty, and travel across the actual bridge in a readable sequence before she participates.

- [ ] **GA-J10 — Sol's arrival with his chosen page** · PARTIAL

  **Now:** Sol walks from the workshop during arrival, with a page model. Preparation and the chosen version are mostly text.

  **To close:** Carry his actual prepared/draft contribution through the visible departure, travel, arrival, and sharing.


## K. The gathering brings the threads together

Review topics: R04, R05, R09, R10, R11, R17, R18. Existing implementation ownership: TASK11.02, TASK11.09, TASK11.12, TASK11.13, TASK11.15. These IDs retain their original dependencies.

Sources: [D019](D019-THE-GATHERING.md), [D020](D020-GRANDMAS-STORY-AND-CLOSING.md), [D021](D021-LANTERN-GARDEN-RULES.md), [D032](D032-GATHERING-THROUGH-CHARACTER-INTERACTIONS.md), [D042](D042-ENDING-NARRATION-AND-CHOICES.md), [D043](D043-ALTERNATE-GATHERING-DIALOGUE.md), [D048](D048-LANTERN-AND-ENDING-PRACTICE.md).

Inspected implementation: [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [chapter.ts](../../src/garden/chapter.ts), [GardenScene.tsx](../../src/garden/GardenScene.tsx), [StoryStage.tsx](../../src/garden/StoryStage.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-K01 — An actual gathering in the game** · DEFECT

  **Now:** Arrivals occur in the world, then the sequence becomes a stack of reading screens and next-story buttons; game characters mostly stand still.

  **To close:** Confirmed actions return to a visible gathering with current speaker, listeners, page, response, and resulting story contribution.

- [ ] **GA-K02 — Welcome reflects the chosen plan** · PARTIAL

  **Now:** Three correct welcome texts exist and practice is offered; its world performance is not connected to the child confirming the welcome.

  **To close:** The appropriate speaker visibly welcomes the actual participants, with the correct reason for Mara's attendance or absence.

- [ ] **GA-K03 — Mara's actual teller/listener role** · PARTIAL

  **Now:** Plan-dependent text says who is reading. The reader uses the same repair illustration and world speaker behavior is not clearly staged.

  **To close:** Pip reading for absent Mara, Pip reading while she listens, and Mara telling are visibly different world events.

- [ ] **GA-K04 — Prepared Sol ending and audience response** · MISSING

  **Now:** The selected ending is printed, then Invite/Next advances. The agreed bread-versus-thanks audience reaction is absent.

  **To close:** Sol shares the chosen version and the audience responds specifically to the consequence or emphasis the child helped retain.

- [ ] **GA-K05 — An open draft leads to real discussion** · PARTIAL

  **Now:** Two question buttons, replies, and add/keep choices exist inside the reader.

  **To close:** The game's participants ask, answer, revise or retain the draft and respond visibly; no requirement to ask both questions or invent a finished ending.

- [ ] **GA-K06 — Ending added during the gathering** · PARTIAL

  **Now:** ADD_ENDING changes state and prints the result, but a new in-world telling and audience response are not performed.

  **To close:** Show the change as made during this discussion, then share the added ending without falsely claiming it was prepared earlier.

- [ ] **GA-K07 — Grandma hears Sol's reason** · PARTIAL

  **Now:** The exact question and response are printed together in one screen.

  **To close:** Show the actual exchange and Grandma's change of understanding as part of the gathering.

- [ ] **GA-K08 — The Empty Bench explains the whole problem** · PARTIAL

  **Now:** The full story and chronology note exist; the world does not stage the earlier empty evenings and renewed welcome.

  **To close:** Clearly connect her assumption to both actual reasons and her action now, while keeping earlier events distinct from the present.

- [ ] **GA-K09 — Stories enter the garden as they are shared** · MISSING

  **Now:** NEXT_STORY flips record flags; NPC flowers appear without individual title/picture recording actions in the world.

  **To close:** Each actual contribution changes its own existing lantern visibly and retains its author, text, selected image, and draft history.

- [ ] **GA-K10 — All nine outcome combinations** · PRESENT

  **Now:** Three Mara outcomes times three Sol outcomes are modeled and covered by prior contracts.

  **To close:** Independently play the meaningful differences and see them reflected in world participants, contributions, closing duty, and narration; state combinations alone are insufficient.


## L. Closing, returning a story, and Loop's presentation

Review topics: R04, R07, R10, R17, R18, R19. Existing implementation ownership: TASK11.07, TASK11.09, TASK11.10, TASK11.12, TASK11.13, TASK11.15. These IDs retain their original dependencies.

Sources: [D020](D020-GRANDMAS-STORY-AND-CLOSING.md), [D021](D021-LANTERN-GARDEN-RULES.md), [D022](D022-STUDIO-AND-PIPS-ADVENTURE.md), [D035](D035-CHAPTER-PROGRESSION-AND-ENDING-GUIDANCE.md), [D042](D042-ENDING-NARRATION-AND-CHOICES.md), [D048](D048-LANTERN-AND-ENDING-PRACTICE.md).

Inspected implementation: [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [GardenScene.tsx](../../src/garden/GardenScene.tsx), [chapter.ts](../../src/garden/chapter.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-L01 — Pip's lantern records a real event** · PARTIAL

  **Now:** Two choices change a miniature and a record flag; the world flower does not visibly display the chosen picture.

  **To close:** The same planted flower gains the chosen actual planting or gathering moment, with correct participants and a clear meaning.

- [ ] **GA-L02 — Mara attends and hears Grandma** · PARTIAL

  **Now:** Later-plan closing lines exist in the reader. The actual listening, acknowledgement, and departure context are weak.

  **To close:** The world shows the reciprocal sharing the plan enabled, rather than just stating everyone had a chance.

- [ ] **GA-L03 — Absent Mara receives a real copy** · PARTIAL

  **Now:** Copy and delivery actions have state and animation, but the reader can obscure the handoff.

  **To close:** Grandma visibly gives the copy, Pip carries it across the retained bridge, and Mara receives it at work with an appropriate reply.

- [ ] **GA-L04 — A conclusion to the original purpose** · DEFECT

  **Now:** Finish the chapter is available after flags are satisfied, but the assembled screens have not made the renewal and contribution feel earned to Tony.

  **To close:** The child can connect bridge access, individual reasons, chosen plan, actual stories, seed promise, and changed garden at the end.

- [ ] **GA-L05 — Return to Jo and ready Loop** · PARTIAL

  **Now:** The studio view returns and a reader contains four pictures. The whole-world presentation transition is weak.

  **To close:** The game visibly returns to Jo/Loop and presents the ending produced by the adventure with clear optional watch/narrate choices.

- [ ] **GA-L06 — Four pictures match actual events** · PARTIAL

  **Now:** Correct branch text and the selected Sol scene reach four miniature pictures. Their world presentation and correspondence to the child's written meaning remain unaccepted.

  **To close:** Each picture and caption truthfully depicts the completed route, selected contribution, participants, and delivery or shared listening.

- [ ] **GA-L07 — Pause and resume narration at a useful boundary** · DEFECT

  **Now:** Only the picture number is stored. Watch restarts that paragraph, without the specified saved sentence position.

  **To close:** Model listening and child-paced narration pause/resume without losing the current text or silently completing unread content.

- [ ] **GA-L08 — Replay, explore, and start fresh** · PRESENT

  **Now:** Pause/new-adventure archive and post-ending replay/explore controls exist; fresh start was inspected on the separate audit origin.

  **To close:** Both cancellation and restart work without affecting other saves; replay does not duplicate game events, stories, or claimed learning.


## M. Comprehension through action and conversation

Review topics: R02, R05, R09, R11, R14. Existing implementation ownership: TASK11.02, TASK11.09, TASK11.13, TASK11.17, TASK11.18. These IDs retain their original dependencies.

Sources: [D007](DECISIONS.md), [D009](DECISIONS.md), [D049](D049-EXPLAINING-A-PLAN-TO-MARA.md), [D050](D050-SHARING-STORIES-WHILE-MARA-WORKS.md), [D051](D051-GRANDMAS-ASSUMPTION-AND-MARAS-ACCOUNT.md), [D052](D052-THE-BOYS-WORDS-AND-ACTIONS.md), [D053](D053-DEVELOPING-A-BRIEF-SOL-ENDING.md).

Inspected implementation: [FeedbackActivity.tsx](../../src/garden/FeedbackActivity.tsx), [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [chapter.ts](../../src/garden/chapter.ts), [GardenApp.tsx](../../src/garden/GardenApp.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-M01 — Reading changes a decision or action** · DEFECT

  **Now:** Most authored continuation options already contain the solution; clicking them completes the same sequence without using the passages.

  **To close:** Identify the information needed for every decision and the observable consequence of applying or misunderstanding it in play.

- [ ] **GA-M02 — Own reasoning versus supplied words** · PARTIAL

  **Now:** Typed explanations are saved, but later state changes do not use them. Report offers two buttons wired to the same event.

  **To close:** Make clear when the child supplied reasoning, requested help, or asked Pip to explain; preserve the intended connection to the decision without claiming assessment.

- [ ] **GA-M03 — Work-time inference** · PARTIAL

  **Now:** The later-time question exists, but the actual work conflict is not established visibly and live response interpretation is absent.

  **To close:** The child's explanation can connect changed hours, final passengers, and gathering time using the relevant account and actual consequences.

- [ ] **GA-M04 — Belief versus evidence** · PARTIAL

  **Now:** Grandma's letter and Mara's account can be compared in a details section. Correct reporting is supplied automatically.

  **To close:** The player can distinguish Grandma's assumption from Mara's explanation, communicate relevant facts, and observe a changed response.

- [ ] **GA-M05 — Cause, sequence, and a changed outcome** · DEFECT

  **Now:** Sol's sequence is written, not played; questions ask for significance without the necessary experience.

  **To close:** Connect leak, repair, dry flour, possible baking, and thanks through observable events and accurate language.

- [ ] **GA-M06 — Plausible interpretation and uncertainty** · PARTIAL

  **Now:** The boy's motive is correctly treated as inference in provider instructions, but the usable demo cannot interpret a novel explanation.

  **To close:** Discuss evidence and plausible uncertainty without forcing one private motive or rewarding keyword matching.

- [ ] **GA-M07 — Consequences without an answer gate** · DEFECT

  **Now:** Avoiding a compulsory correct answer has resulted in very few meaningful recoverable setbacks outside bridge construction.

  **To close:** Preserve voluntary help and alternate valid outcomes while letting a mistaken plan or action produce a relevant, understandable world consequence.

- [ ] **GA-M08 — No invented learning achievement** · PRESENT

  **Now:** No child ability profile or mastery score is recorded. Technical tests and source exposure remain separate fields.

  **To close:** Continue to distinguish participation, assistance, reading exposure, actual observed speech, comprehension evidence, and measured improvement.


## N. Vocabulary and readable source material

Review topics: R01, R02, R09, R12, R13. Existing implementation ownership: TASK11.02, TASK11.08, TASK11.13, TASK11.18. These IDs retain their original dependencies.

Sources: [D002](DECISIONS.md), [D038](D038-READING-FORMAT-AND-MARAS-PAGE.md), [D039](D039-SOLS-PAGE-AND-WRITING-SOURCES.md), [D040](D040-GRANDMAS-PAGE-AND-CHRONOLOGY.md), [D041](D041-OLDER-LANTERN-STORIES.md), [D042](D042-ENDING-NARRATION-AND-CHOICES.md), [D043](D043-ALTERNATE-GATHERING-DIALOGUE.md), [D054](D054-WORD-HELP-IN-DIFFERENT-CONTEXTS.md), [D055](D055-USING-SECURE-IN-PLAY-AND-STORY.md), [D056](D056-VOCABULARY-FOCUS-AND-REUSE-MAP.md), [D057](D057-HELP-FOR-WHOLE-PHRASES.md), [D058](D058-REMAINING-VOCABULARY-HELP-CARDS.md), [D065](D065-AI-HELP-FOR-ADDITIONAL-WORDS.md), [D066](D066-BASIC-WORD-HELP-WITHOUT-AI.md), [D067](D067-WORD-HELP-IN-THE-CHILDS-ENDING.md), [D068](D068-CHECKING-WORD-EXPLANATIONS.md), [D069](D069-HELP-WITH-A-MISSPELLED-WORD.md).

Inspected implementation: [content.ts](../../src/garden/content.ts), [chapterContent.ts](../../src/garden/chapterContent.ts), [chapterGlossary.ts](../../src/garden/chapterGlossary.ts), [AdditionalWordHelp.tsx](../../src/garden/AdditionalWordHelp.tsx), [DraftReader.tsx](../../src/garden/DraftReader.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-N01 — Complete titled reading inventory** · PRESENT

  **Now:** Opening/letter, dock account, crossing note, Torn Wing, Small Repair, later account, Empty Bench, two old stories, prepared endings, notice, and ending lines exist.

  **To close:** Each appears for a comprehensible story reason, with the correct author, chronology, and route-specific wording; text presence alone does not close the related gameplay item.

- [ ] **GA-N02 — Every displayed reading word has a usable help path** · PARTIAL

  **Now:** Fixed source paragraphs have word buttons; many instructions, replies, welcome and selected child-ending displays are plain text.

  **To close:** Apply the agreed word-help coverage consistently to the child's actual reading surfaces, including dialogue, captions and their own writing.

- [ ] **GA-N03 — Meaning in the exact sentence** · PARTIAL

  **Now:** Authored focus cards and general dictionary groups exist; additional contextual explanations depend on unavailable AI.

  **To close:** The definition, pronoun reference, phrase, and example match this occurrence without silently borrowing a different story's meaning.

- [ ] **GA-N04 — Six focus words and reuse** · PARTIAL

  **Now:** secure, obligation, postpone/postponed, hesitated, mended, and assumed are present, but several related world actions are absent or unclear.

  **To close:** Encounter and reuse these words in meaningful situations, including bridge/picnic secure and both hesitated contexts, without a compulsory lookup count.

- [ ] **GA-N05 — Whole phrases and title vocabulary** · PRESENT

  **Now:** Phrase cards and context-limited duet title help are implemented.

  **To close:** Verify kept his promise, stayed put, and relevant title/phrase audio in their actual contexts and return to the same reading position.

- [ ] **GA-N06 — Words in the child's own ending** · PARTIAL

  **Now:** Word selection exists; all contextual explanations for new child wording require unavailable word help.

  **To close:** Provide a truthful, useful word-help path with exact occurrence/revision binding and a workable unavailable-service state.

- [ ] **GA-N07 — Spelling suggestion, use, keep, undo** · PARTIAL

  **Now:** Controls and revision-safe replacement exist; no live spelling understanding is available locally.

  **To close:** The child explicitly chooses a valid suggestion for that occurrence or keeps their words, and can undo without unrelated text changes.

- [ ] **GA-N08 — Disputing a wrong word explanation** · PARTIAL

  **Now:** Check this explanation sends a bounded recheck request; the service is unavailable and usability is unaccepted.

  **To close:** Preserve the sentence and writing, withdraw uncertain help, recheck once, and avoid replacing a reviewed correct definition with invented certainty.


## O. Fluency, narration, and optional listening

Review topics: R02, R10, R13, R16, R17. Existing implementation ownership: TASK11.13, TASK11.15, TASK11.18, TASK11.19, TASK11.21. These IDs retain their original dependencies.

Sources: [D044](D044-FIRST-FLUENCY-PRACTICE.md), [D045](D045-SPOKEN-READING-FEEDBACK-OPTIONS.md), [D046](D046-FEEDBACK-OUTCOMES-AND-FALLBACKS.md), [D047](D047-READING-SOLS-ENDING-ALOUD.md), [D048](D048-LANTERN-AND-ENDING-PRACTICE.md), [D073](D073-AUDIO-BASED-PRONUNCIATION-FEEDBACK.md), [D074](D074-PAUSES-AND-EXPRESSION-IN-READING.md), [D075](D075-START-STOP-AND-REVIEW-A-READING.md), [D076](D076-TEMPORARY-RECORDINGS-AFTER-FEEDBACK.md), [D077](D077-WAITING-FOR-READING-FEEDBACK.md), [D078](D078-FAST-AI-WITH-RELIABLE-FEEDBACK.md).

Inspected implementation: [ReadingPractice.tsx](../../src/garden/ReadingPractice.tsx), [DraftReader.tsx](../../src/garden/DraftReader.tsx), [GardenApp.tsx](../../src/garden/GardenApp.tsx), [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [gardenSpeech.ts](../../server/gardenSpeech.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-O01 — Practice has a story purpose** · PARTIAL

  **Now:** Read a short part aloud is widely available, but usually chooses paragraph zero. Mara's first practice target is her introductory sentence rather than the agreed obligation passage.

  **To close:** Each offered practice part prepares a useful welcome, character line, explanation, chosen ending, or narration and names that purpose.

- [ ] **GA-O02 — Model, independent turn, purposeful rereading** · PARTIAL

  **Now:** The own-draft reader offers My turn and emphasis rereading; generic practice does not consistently expose the same clear sequence.

  **To close:** The child can hear a model, read independently without recording, and reread for a concrete phrasing or expression purpose.

- [ ] **GA-O03 — Exact target and speaker** · PARTIAL

  **Now:** Text/target IDs exist; role and voice cues are inconsistent across source paragraphs, own endings, and final narration.

  **To close:** Show whose words are being read, retain the exact selected passage/revision, and never assess a different or stale target.

- [ ] **GA-O04 — Explicit start, stop, review, discard** · PRESENT

  **Now:** Local recording UI and temporary audio cleanup are implemented; no actual microphone was used in this audit.

  **To close:** Verify microphone permission, visible recording state, stop, replay, discard, interruption, and return on the target demo device.

- [ ] **GA-O05 — Active listening feedback actually works** · UNVERIFIED

  **Now:** Live acoustic feedback is unavailable. A local recording or transcription is not pronunciation evaluation.

  **To close:** Qualify actual-audio pronunciation, omissions, pauses, expression, uncertainty and latency before claiming adaptive listening; preserve the existing provider hold.

- [ ] **GA-O06 — Optional feedback during final narration** · PARTIAL

  **Now:** Practice this part is nested under Watch/Narrate rather than presenting the specified clear feedback narration path.

  **To close:** The child understands when they are narrating for the story and when they explicitly ask to review a recording; no compulsory assessed performance.

- [ ] **GA-O07 — No overlap or accidental listening** · PARTIAL

  **Now:** Audio cancellation, temporary buffers, and blur cleanup exist; full native behavior and all race conditions are not accepted.

  **To close:** Model speech, recorded playback, microphone, word audio, route changes, and discarded attempts never overlap or leak into another activity.

- [ ] **GA-O08 — Fallback and uncertain feedback** · PARTIAL

  **Now:** Unavailable messages exist, often under About details or after a request. This does not establish a useful feedback experience.

  **To close:** Explain availability at the relevant choice; retain independent practice and the story when speech access or assessment fails.


## P. AI behavior, honesty, and implementation boundaries

Review topics: R13, R19, R20. Existing implementation ownership: TASK11.13, TASK11.18, TASK11.19. These IDs retain their original dependencies.

Sources: [D059](D059-AI-INTERPRETS-SOLS-ENDING.md), [D060](D060-UNCLEAR-ENDING-CLARIFICATION.md), [D061](D061-CORRECTING-A-WRONG-SCENE.md), [D062](D062-CHECKING-DISPUTED-WRITING-FEEDBACK.md), [D063](D063-WRITING-WHEN-AI-IS-UNAVAILABLE.md), [D064](D064-EDITING-WHILE-FEEDBACK-IS-PENDING.md), [D065](D065-AI-HELP-FOR-ADDITIONAL-WORDS.md), [D066](D066-BASIC-WORD-HELP-WITHOUT-AI.md), [D067](D067-WORD-HELP-IN-THE-CHILDS-ENDING.md), [D068](D068-CHECKING-WORD-EXPLANATIONS.md), [D069](D069-HELP-WITH-A-MISSPELLED-WORD.md), [D070](D070-AI-FEEDBACK-IN-MARAS-CONVERSATION.md), [D071](D071-CHECKING-MISUNDERSTOOD-CONVERSATION-ANSWERS.md), [D072](D072-CONVERSATION-WHEN-AI-IS-UNAVAILABLE.md), [D073](D073-AUDIO-BASED-PRONUNCIATION-FEEDBACK.md), [D074](D074-PAUSES-AND-EXPRESSION-IN-READING.md), [D075](D075-START-STOP-AND-REVIEW-A-READING.md), [D076](D076-TEMPORARY-RECORDINGS-AFTER-FEEDBACK.md), [D077](D077-WAITING-FOR-READING-FEEDBACK.md), [D078](D078-FAST-AI-WITH-RELIABLE-FEEDBACK.md), [D080](D080-ACCELERATED-REVIEW-AND-REMAINING-WORK.md), [D081](D081-COMPLETED-REMAINING-SPECIFICATION.md).

Inspected implementation: [garden.ts](../../server/garden.ts), [gardenWords.ts](../../server/gardenWords.ts), [gardenSpeech.ts](../../server/gardenSpeech.ts), [FeedbackActivity.tsx](../../src/garden/FeedbackActivity.tsx), [AdditionalWordHelp.tsx](../../src/garden/AdditionalWordHelp.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-P01 — Live understanding versus prepared help** · UNVERIFIED

  **Now:** The current authored demo returns unavailable for live text, word, transcription, and speech jobs. Prepared hints are not adaptive understanding.

  **To close:** Demonstrate each promised AI job with honest provenance before presenting it as working. No provider call or activation is authorized by this audit.

- [ ] **GA-P02 — Ambiguous or brief writing** · PARTIAL

  **Now:** Bounded status/feedback contracts exist, but actual semantic accuracy across short, unclear, paraphrased, or unusual answers is unqualified.

  **To close:** Give specific clarification grounded in the text without replacing the child's answer or confusing brevity with lack of comprehension.

- [ ] **GA-P03 — Feedback changes the right thing** · PARTIAL

  **Now:** Most feedback is optional text; a supported Sol result can only suggest a scene. Story progress still comes from separate commands.

  **To close:** Explicitly identify what is adapted: explanation, hint, clarification, or supported scene suggestion, and what the child must confirm before world action.

- [ ] **GA-P04 — Only disclosed sources and current revisions** · PARTIAL

  **Now:** Request IDs, revisions, source references, cancellation and strict server outputs exist; actual qualification remains open.

  **To close:** Neither hidden later events nor stale answers can drive feedback or modify the current choice; world actions remain under the game coordinator.

- [ ] **GA-P05 — User edits or disputes while waiting** · PARTIAL

  **Now:** Requests cancel on editing and one recheck is available; this is engineering scaffolding with synthetic coverage.

  **To close:** Verify preserve/edit/stop/recheck/leave/retry sequences without stale replies, hidden retries, or lost writing.

- [ ] **GA-P06 — Long draft span selection** · MISSING

  **Now:** Over 4,000 code points produces Choose a shorter part to discuss, but no actual span-selection control is provided.

  **To close:** Keep the full draft and let the child explicitly select the shorter part for feedback rather than forcing deletion or silent truncation.

- [ ] **GA-P07 — Truthful service availability and latency** · PARTIAL

  **Now:** Limits and unavailable states exist, but buttons often offer jobs whose unavailable status is explained only later.

  **To close:** The demo clearly distinguishes usable local help from unavailable live feedback and remains playable during failure or slow response.

- [ ] **GA-P08 — Qualification ledger and protected data** · PRESENT

  **Now:** Provider qualification remains halted at 1/75; audio is temporary and keys are server-side.

  **To close:** Preserve cap, records, no hidden requests, no child profile, and no persisted raw audio; resume only under the existing explicit coordinated authorization process.


## Q. Layout, controls, hints, and accessibility

Review topics: R06, R07, R14, R15, R16, R17. Existing implementation ownership: TASK11.05, TASK11.06, TASK11.07, TASK11.15, TASK11.16, TASK11.21. These IDs retain their original dependencies.

Sources: [D033](D033-OPENING-AND-FIRST-ACTIONS.md), [D034](D034-GOALS-AND-NEXT-STEPS.md), [D035](D035-CHAPTER-PROGRESSION-AND-ENDING-GUIDANCE.md), [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md), [D079](D079-ASKING-FOR-A-HINT.md), [D081](D081-COMPLETED-REMAINING-SPECIFICATION.md).

Inspected implementation: [GardenApp.tsx](../../src/garden/GardenApp.tsx), [ChapterPanels.tsx](../../src/garden/ChapterPanels.tsx), [garden.css](../../src/garden/garden.css), [GardenScene.tsx](../../src/garden/GardenScene.tsx). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-Q01 — Reading area versus game action** · DEFECT

  **Now:** Important world animations can run behind an open reader and most story performances happen inside miniature reader illustrations.

  **To close:** Reading and confirmed choices lead back to visible world action and consequence, with a clear return point; apply this to every encounter.

- [ ] **GA-Q02 — One current task and next step** · DEFECT

  **Now:** Goal card, notice, dialogue, action footer, library access, and workshop travel can compete; construction still showed the previous Talk to Mara suggestion.

  **To close:** The child can identify the current task, available action, and reason for it in every mode and visit order.

- [ ] **GA-Q03 — Choices look like choices** · PARTIAL

  **Now:** Paired colored buttons and legends were added, but planner, source reading, support, continuation, and story actions still mix multiple groups.

  **To close:** Identify whose choice is being made, what confirmation does, and which controls are reading help; color supplements clear text and state.

- [ ] **GA-Q04 — Every response identifies its speaker** · PARTIAL

  **Now:** Reply labels exist, but plain quoted greetings, notices, source paragraphs, and multiple simultaneous replies remain inconsistent.

  **To close:** Every conversational turn is attributable and follows the child's actual choice in an understandable order.

- [ ] **GA-Q05 — Current passage remains usable** · PARTIAL

  **Now:** Large source, nested writing, feedback, and lower fixed actions produce competing scroll regions. In construction, key controls fall below the fold.

  **To close:** Keep current text, relevant choice, and navigation usable at the demo viewport and larger text sizes without crowding the game or losing context.

- [ ] **GA-Q06 — Hints are discoverable and relevant** · PARTIAL

  **Now:** A prominent hint/status banner exists and fixes an earlier visibility complaint. Hints are mostly a single direct answer and can reflect generic rather than active subtask state.

  **To close:** The child can find a small hint or fuller help, see what it refers to, and continue without an automatic solution or action.

- [ ] **GA-Q07 — Control meaning across modes** · PARTIAL

  **Now:** Movement, construction arrows, word navigation, text input, E, and Escape have guards, but their mode transitions and labels need coherent experience review.

  **To close:** No held key crosses modes; an input always acts on the visible role/selection; confirm/cancel/back behave predictably.

- [ ] **GA-Q08 — Native equivalents for all world actions** · PARTIAL

  **Now:** Native bridge/movement controls exist. New required bakery/material/story-world actions have no corresponding controls because they are missing.

  **To close:** Every implemented world action has usable keyboard and non-drag equivalents with clear focus and target feedback.

- [ ] **GA-Q09 — Continue returns to the right context** · PARTIAL

  **Now:** Many readers close to the garden globally, rather than restoring the immediate conversation or activity the child was doing.

  **To close:** Returning from word help, source, story library, practice, draft and plan preserves the intended source/task and relevant position.

- [ ] **GA-Q10 — Visual and sensory access** · UNVERIFIED

  **Now:** Large text, roomier text, reduced motion, focus traps and some compact tests exist; full target-device, touch and screen-reader qualification is open.

  **To close:** Demonstrate readable text/contrast, usable targets, focus return, sound-off play, reduced-motion consequences and appropriate compact layout without overstating device support.


## R. State, save, interruption, and consistency

Review topics: R15, R19, R20. Existing implementation ownership: TASK11.03, TASK11.04, TASK11.10, TASK11.14, TASK11.21. These IDs retain their original dependencies.

Sources: [D023](D023-VISIT-ORDER-AND-CHARACTER-KNOWLEDGE.md), [D024](D024-CHANGING-THE-GATHERING-PLAN.md), [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md), [D064](D064-EDITING-WHILE-FEEDBACK-IS-PENDING.md), [D075](D075-START-STOP-AND-REVIEW-A-READING.md), [D076](D076-TEMPORARY-RECORDINGS-AFTER-FEEDBACK.md), [D081](D081-COMPLETED-REMAINING-SPECIFICATION.md).

Inspected implementation: [model.ts](../../src/garden/model.ts), [chapter.ts](../../src/garden/chapter.ts), [persistence.ts](../../src/garden/persistence.ts), [serialized.ts](../../src/core/serialized.ts). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-R01 — One authoritative world state** · PRESENT

  **Now:** A serialized GardenStore owns chapter changes; pictures derive from state. New required material/bakery actions are absent from it.

  **To close:** Add only reviewed actions to the same coherent state model; no separate reader-only fiction or animation state masquerades as a world consequence.

- [ ] **GA-R02 — Ownership, exposure, knowledge, and completion** · PARTIAL

  **Now:** Separate seed/page/source/assistance/report/record states exist. Global invitations can still inform Grandma without a distinct return report.

  **To close:** Preserve all distinctions during physical and conversational actions and do not infer character knowledge from interface visibility.

- [ ] **GA-R03 — Working draft, selected contribution, shared record** · PRESENT

  **Now:** Separate text and revision fields are implemented. Selection acceptance still has the unsupported-content defect in GA-I06.

  **To close:** Preserve exact text/version and sharing history across edits, retries, scene confirmation, gathering, archive, and replay.

- [ ] **GA-R04 — Save the coherent current task** · PARTIAL

  **Now:** Domain state is saved but several local choices, replies and in-progress activity selections reset on closing a panel.

  **To close:** Returning after interruption restores the meaningful task and confirms what is committed, pending, merely proposed, or discarded.

- [ ] **GA-R05 — Interrupted movement and consequences** · PRESENT

  **Now:** Movement, bridge failure, arrival, handoff, and growth have interruption settlement logic and prior synthetic/browser checks.

  **To close:** Recheck every revised world event at start/middle/end without duplicate transfer, lost material, false arrival, or unexplained teleportation.

- [ ] **GA-R06 — Save failure, stale window, version migration** · PRESENT

  **Now:** Retry, conflict handling, prior save recovery, and archived migrations exist with prior evidence.

  **To close:** Retain these protections through the eventual scene changes; saved acknowledgement follows successful persistence.

- [ ] **GA-R07 — Fresh start is safe and findable** · PRESENT

  **Now:** New adventure can be started from Pause and completed routes while retaining an archive.

  **To close:** Verify cancel, restart, and replay through visible controls without deleting unrelated saves or the user's active review run.


## S. Acceptance, demo readiness, and evidence

Review topics: R01, R02, R18, R20. Existing implementation ownership: TASK11.16, TASK11.18, TASK11.19, TASK11.20, TASK11.21. These IDs retain their original dependencies.

Sources: [D003](DECISIONS.md), [D006](DECISIONS.md), [D026](D026-REQUIRED-STORY-AND-OPTIONAL-PLAY.md), [D028](D028-3D-AND-DEMO-SCOPE.md), [D080](D080-ACCELERATED-REVIEW-AND-REMAINING-WORK.md), [D081](D081-COMPLETED-REMAINING-SPECIFICATION.md).

Inspected implementation: [BUILD-STATUS.md](../../BUILD-STATUS.md), [garden-chapter.spec.ts](../../browser-tests/garden-chapter.spec.ts), [garden.spec.ts](../../browser-tests/garden.spec.ts), [verification.json](../../evidence/full-garden-20260914/verification.json), [renderer-measurements.json](../../evidence/full-garden-20260914/renderer-measurements.json). User reports and the bounded native audit are additional evidence; source inspection is not a fresh full playthrough.

- [ ] **GA-S01 — Replace the unsupported complete claim** · DEFECT

  **Now:** Full-chapter checkboxes and guide text implied the agreed game was complete. Tony's playthrough establishes failed coherence acceptance.

  **To close:** Mark the current build incomplete at the experience level, retain historical test receipts, and link every open feature to this audit.

- [ ] **GA-S02 — Tests use normal player discoverability** · DEFECT

  **Now:** Bridge tests project known world coordinates into pixel-perfect mouse targets or use fixed nudge counts. They verify handlers, not that a child can locate a valid crossing.

  **To close:** Verify ordinary controls, visible guidance, plausible imprecision, and the actual failing routes; keep synthetic or programmed geometry checks honestly labeled.

- [ ] **GA-S03 — Every scene demonstrates a full interaction** · MISSING

  **Now:** No complete accepted scene-by-scene matrix proves passage, comprehension, choice, confirmation, world action, consequence and return.

  **To close:** Each checklist item links to an observed sequence and an acceptance result; a screenshot, model, button, or flag alone is not completion.

- [ ] **GA-S04 — Complete route and branch coverage** · PARTIAL

  **Now:** Prior contracts and three chapter browser routes cover state combinations. Many unimplemented world actions cannot have been verified.

  **To close:** Cover five physical histories, nine story combinations, changed plans, alternate visit orders, genuine setbacks and recovery after corresponding features exist.

- [ ] **GA-S05 — Visual and performance quality** · UNVERIFIED

  **Now:** Current performance/device exclusions remain open and the game has not received final visual acceptance. Primitive illustrative scenes do not fulfill the agreed finish by existing alone.

  **To close:** Retain unchanged quality and performance targets, inspect every connected scene, and distinguish native measured scope from software-renderer failures.

- [ ] **GA-S06 — Live AI and speech qualification** · UNVERIFIED

  **Now:** Authored checks and unavailable adapters do not prove actual understanding, acoustic feedback, or live latency.

  **To close:** Complete authorized provider qualification and reviewed activation before claiming live demo capability; preserve the 1/75 hold now.

- [ ] **GA-S07 — Independent 9–12-year-old usability** · UNVERIFIED

  **Now:** No learner playtest demonstrates understanding, enjoyment, fluency improvement, or vocabulary gains. Tony's current adult review has found fundamental failures.

  **To close:** Establish coherent adult review first; any later learner evidence must be actually collected and reported separately under appropriate authorization.

- [ ] **GA-S08 — Three-minute demonstration and runnable repository** · PARTIAL

  **Now:** Setup and a proposed recording route exist; the coherent final chapter and final screen recording are not accepted deliverables.

  **To close:** After feature acceptance, prove a fresh local run and a recording that demonstrates actual reading, choice, world action, consequence and ending; retain honest AI limitations.

## Turning an agreed answer into something buildable

The checklist identifies the work; it does not substitute for a scene specification. After we review an item, fill the corresponding JSON row with its actual decision/source, bounded packet and verification. Use the existing [build packet template](BUILD-PACKET-TEMPLATE.md), expanded with the fields below. Routine implementation details do not need another questionnaire. Material unresolved story choices are not to be silently invented.

1. row ids
2. user decision and source
3. existing t a s k11 owners and dependencies
4. starting world state
5. who where when why
6. exact reading and dialogue
7. player inputs
8. choice and confirmation
9. world action and visible consequence
10. alternate outcome and recovery
11. required assets and object ownership
12. next task and return context
13. literacy purpose and evidence limit
14.  a i job and unavailable behavior
15. save and interruption
16. ordinary input acceptance scenarios
17. verification receipts and open limits

The acceptance recording must show the exact passage → player action/choice → confirmation → game-world action → visible consequence → next task. Test the intended action and a plausible incorrect action through ordinary controls. Preserve supported alternate routes; do not add mandatory mistakes or an AI answer gate.

Read and reconcile these groups in journey order for discussion. Build scheduling continues through the existing TASK11 dependency graph; these GA row IDs are coverage identifiers, not a competing task sequence. No row is ready for blind delegation.
