# Garden Adventure: what is wrong and what is missing

September 14, 2026. **The current game is incomplete at the experience level. Tony's playthrough rejected its coherence, interaction depth, and layout.** Earlier passing tests established specific handlers and routes; they did not establish that the agreed game had been delivered.

The full [implementation and acceptance checklist](A-TO-Z-IMPLEMENTATION-CHECKLIST.md) has **169 checks in 19 groups**, covering all twenty review topics. The [JSON checklist](A-TO-Z-IMPLEMENTATION-CHECKLIST.json) retains each finding, existing task owners, acceptance condition, and empty fields for the eventual decision, implementation packet, and evidence. These counts describe audit rows, not a percentage of the game that is missing.

## The central failure

The game frequently substitutes reading screens, supplied answers, miniature pictures, and progress flags for the activity the story describes. The player is told that something matters without first experiencing the situation, taking the relevant action, and seeing its consequence.

Tony clarified the required separation:

**Reading and conversation → understanding the situation → making and confirming a choice → action in the game world → visible consequence → the next meaningful interaction.**

This applies to the entire game: construction, materials, giving and receiving items, the bakery, story events, invitations, passenger work, sharing stories, and the gathering. Putting a picture of the result inside the reading area does not deliver that gameplay. Nor does running a handoff animation behind an open reading panel make the result sufficiently visible.

The reading and conversation area remains part of the game. The failure is that it has become the place where much of the adventure appears to occur, while the world does little beyond walking and the bridge puzzle.

## What the audit establishes

The audit compares the R01–R20 consolidations, D001–D081 records and relevant exact interactions with the current Garden source, state handlers, rendering, controls, and existing tests. A separate native browser at port 4195 was used for the opening, approach to materials, construction layout, return to Pip, and backpack. Tony's reported later-play failures remain direct owner evidence. This is not represented as a new complete playthrough of every branch or a learner test.

The source inventory indexes the 81 decision records, twenty topics, and 344 written requirement definitions. An indexed statement is not automatically an approved requirement: tentative and superseded examples retain their status. See the [source register](../../evidence/coherence-audit-20260914/source-register.json).

No new flashback, present-day bakery timeline, crafting recipe, resource count, or replacement storyline has been selected. Tony rejected deciding those before the audit. His subsequent instruction settles where gameplay belongs: in the game world. The actor, chronology, and exact actions of an expanded bakery sequence still need to be reconciled with the written account after this audit; they are not grounds for leaving the omission out of the checklist.

## The journey from beginning to end, and where it breaks

This is the connected journey described by the existing story and latest corrections. It identifies the missing links; it does not approve an unreviewed replacement sequence. Supported alternate visit orders remain valid.

| Part of the journey | Why it exists | What the current game actually supplies | What is broken or absent |
|---|---|---|---|
| Jo and Loop introduce Pip's adventure | Establish the child's role and the story they will help bring to a conclusion | A studio model, introductory text, and Begin | The connection between director, Pip, storyteller, and narrator is weak; later role changes are not clearly introduced. |
| Pip carries a seed and Grandma's letter | Establish a concrete promise and the question of why friends stopped visiting | Backpack entries and the opening passage | The backpack has little felt purpose beyond an inventory list; the larger question is not developed as a coherent activity. |
| Pip meets Mara at work | Learn that she wants to visit but has a real obligation and time conflict | A person at an empty dock and a full explanation in text | The passenger boat, passengers, and work are not present while the child needs to understand them. |
| Pip finds a way across | Use the note, physical materials, reach, and fastening to solve an actual obstacle | Two ready-made decks, move/join/fasten controls, hidden alignment rules | Loose wood has no collection/use sequence. Posts do not clearly identify valid placement. Normal crossing still blocks the reported failure case. |
| Seed and Pip reach Grandma | Fulfill the promise together, whether the seed is carried or sent first | Real seed-boat transport, ownership, planting and growth handlers | Seed-first has a weakly explained purpose; planting and handoffs can occur behind the reader; the resulting next task is crowded. |
| Grandma learns what Mara said and receives her story | Change an assumption through information and let an absent person contribute | Report flags, supplied explanation buttons, full story and picture choices | The explanation, physical page handoff, sharing, Grandma's response, and recording in a lantern are not a clear connected sequence. |
| Sol's repair story becomes an experienced sequence | Establish a meaningful problem and consequence before the child helps express its ending | A manuscript and a small already-repaired bakery illustration | No playable bakery, roof fault, flour threat, material collection, repair, bread-making sequence, or world-level thanks. Exact chronology/actor remains an audit follow-up. |
| The child helps Sol express or discuss his ending | Connect cause and effect, write/read with a purpose, and help Sol see the value of contributing | A dense writing panel, prepared alternatives, manual scene selection, and separate draft/selected text | The prompt lacks an experienced event to conclude. Any nonempty writing can be accepted even if it contradicts the source; the picture is selected separately from meaning. |
| Pip and the characters arrange sharing | Use the actual work conflict and each person's intentions to make a workable plan | Time/speaker button groups and saved invitation flags | Planning feels like configuring a form; character-led reasoning and the final report to Grandma are incomplete. |
| The selected time and invitations take effect | Demonstrate why the chosen plan matters | A later boat/passenger/arrival animation, or Sol arriving while Mara stays away | Work was not established before the decision. Consequences are concentrated into a short transition after the setup has already been skipped. |
| The gathering shares each actual contribution | Bring the personal story threads together | Sequential readers, next-story buttons, record flags, and some miniature pictures | Speaking/listening, contribution-specific audience responses, and each story entering its world lantern are incomplete. |
| Pip completes reciprocal sharing and returns to Loop | Resolve the original promise and show the ending the child helped produce | Return-copy state, four branch-dependent captions, replay and narration controls | The final result does not yet feel earned by the preceding gameplay. The world presentation and narration continuity remain incomplete. |

The game needs this chain to make sense on screen. A developer explaining the connections aloud, or a guide listing which button to press, cannot supply the missing experience.

## Objects and actions that currently have no adequate gameplay role

| Object or system | Present implementation | Missing function or connection | Checklist |
|---|---|---|---|
| Pip's backpack | Lists the real seed, letter and carried copies; updates ownership | Introduction of its role, meaningful visible use, and connection to any intended collected materials | GA-B06–08 |
| Loose wood and ready-made decks | Two finished bridge sections start on the bank; other scraps are scenery | Where the material came from, what can be collected, why it is useful, and what using it changes | GA-B04–05, GA-D01 |
| Bridge posts | Four small posts and two fastening buttons | A clear relation between visible targets, bridge position, and validity | GA-D02–03, GA-D06 |
| Seed boat | A separate cargo boat with a real seed delivery animation | A clearly motivated alternative to carrying the seed and honest treatment of the empty-boat action | GA-E01–03 |
| Passenger boat | Hidden until a later gathering starts | A working dock context before the decision about Mara's availability | GA-C01–04 |
| Passengers | Two models appear briefly during the later arrival | People whose needs make Mara's obligation understandable when the player hears it | GA-C03, GA-J09 |
| Sol's workbench and tools | Small outside props and a manuscript source | A clear encounter and meaningful object interaction; decorative tools cannot count as repair gameplay | GA-H01–02 |
| Rina and the bakery | Only in a miniature ending illustration | A world situation with a clear problem, role, and relationship to the adventure | GA-H03–05 |
| Damaged roof and leak | The miniature starts already repaired | Damage, incoming water, player action, and observable repair consequence | GA-H06, GA-H09–10 |
| Flour sacks | Three static miniature sacks | Threat, condition, intended handling, and connection to making bread | GA-H07 |
| Repair materials | No pickup/use/consumption state | What is collected, from where, by whom, and how it actually repairs the problem | GA-H08 |
| Bread | A completed loaf becomes visible automatically | An understandable sequence in which dry flour makes the promised baking possible | GA-H11 |
| Thank-you loaf | Moves with miniature Rina during rehearsal | The actual visit, exchange, and meaning for Sol | GA-H12–13 |
| Waiting lanterns | Three reserved flowers are hidden until story flags exist | Visible places waiting for contributions and an explanation of the garden's purpose | GA-F01, GA-F03 |
| Individual story lanterns | Every world flower opens the same library | A specific title, author, picture, page, and physical recording event for each lantern | GA-F04–05 |
| Old stories | Two full pages and small pictures | Why these are earlier contributions, why they are available now, and how they relate to the current task | GA-F02, GA-F08 |
| The Torn Wing props | A static boy, bird and tape patch in a miniature | The sequence involving trust, permission, torn wing, fetching tape, and repair in the game | GA-G01–03 |
| Gathering participants | World models arrive, then largely remain still | Actual story performance, listening, reactions, and contribution changes | GA-K01–09 |
| Loop's display | A reader with four branch-dependent miniatures | A coherent final world presentation of the events the child helped cause | GA-L05–07 |

This is not a proposal to make every decorative item collectible. It is an accounting of promised or currently implied functions that the implementation does not adequately deliver. The exact material interactions must be specified after the omissions are acknowledged.

## Concrete bridge defect, rather than another claim that it is fixed

The collapse is partly implemented. It is not sufficiently reachable through ordinary play.

- `reaches()` accepts the bridge only near two hidden center coordinates, within 0.22 world units, even when the deck appears to span the banks. See [model.ts](../../src/garden/model.ts).
- The posts are placed offset from those centers, with no child-facing explanation of that relationship. They are small at the actual construction view. See [GardenScene.tsx](../../src/garden/GardenScene.tsx).
- **Go to Grandma** in the main action bar requires a fully fastened bridge. **Try crossing the bridge** appears only after the hidden reach predicate succeeds. Blocked movement can still say to fasten an end when the real problem is position. See [GardenApp.tsx](../../src/garden/GardenApp.tsx).
- Existing successful collapse tests place the sections by calculating the exact world-to-screen coordinates first. They prove the collapse handler works for that constructed state, not that a child can discover and attempt a plausibly placed unsecured bridge. See [garden-chapter.spec.ts](../../browser-tests/garden-chapter.spec.ts).

The audit retains Tony's requested behavior: attempt the reaching unsecured bridge, observe failure and retreat, then rebuild. It also retains his requirement for clear opposing posts if placement is constrained to a particular spot. No geometry or controls were changed in this audit.

## The reading and teaching problems are connected to the gameplay problems

The three literacy purposes remain fluency, comprehension, and vocabulary. They are not delivered merely by making text available.

- **Comprehension:** the information must help the child understand an actual problem, make a decision, and recognize its consequence. Current later choices frequently contain the solution and advance flags regardless of whether the child has understood the account.
- **Vocabulary:** contextual cards exist, but several words refer to actions the world does not clearly demonstrate. A definition for obligation or repair has less purpose when the associated work or repair is missing. Some dialogue, instructions and captions also lack the source reader's word-help path.
- **Fluency:** model reading, temporary recording, and some purposeful rereading exist. Practice targets and roles are inconsistent. The generic short-reading control often selects the first paragraph rather than the agreed character line. Active acoustic feedback is unavailable and unqualified.
- **Writing and AI:** the app can preserve a child's draft, but Try my ending does not by itself analyze it. A separate manually selected picture is used, and any nonblank current draft can be confirmed as Sol's account. This can publish unsupported facts even though the approved fallback keeps a valid authored/draft route available.
- **Consequences:** avoiding compulsory wrong answers or an AI progress gate does not require removing meaningful mistakes from the game. An action or plan can fail for a story reason, show what happened, and leave a comprehensible way to recover.

These findings are tracked in groups M–P as well as the relevant scenes. No learning improvement is claimed from the existing software checks.

## The layout problems are functional problems

The native construction audit showed the old **Talk to Mara** suggestion alongside the active bridge task. Joining, fastening, and returning to Pip fell below the initial panel viewport. The player is expected to reconcile the goal card, notice banner, scene, sidebar, and action footer.

The writing activity combines the source, new information, own writing, reading tools, AI feedback, picture choice, rehearsal, confirmation, prepared support, and current selected ending. Distinct state internally does not make those distinctions clear to a child.

The garden exposes the library and workshop before explaining the relationship among those activities. Later scenes continue with several groups of buttons rather than a clear conversation followed by world action. Speaker labels and different choice colors are useful existing corrections, but they do not resolve this structure. All of these remain open under group Q.

## How this becomes buildable after review

Each checklist row contains the current evidence and a condition for closing it. Its solution and build-packet fields are deliberately empty. The next work is to review the connected gaps with Tony, record the actual resolution, and turn it into a bounded scene packet using the existing TASK11 owners and dependencies.

A usable packet must state: who is present; where and when it happens; why the child is doing it; the exact passage and dialogue; available player inputs; choice and confirmation; the world action; success and plausible failure consequences; item ownership and assets; what happens next; literacy purpose; AI/fallback behavior; save/interruption behavior; and a normal-input acceptance walkthrough.

Completion requires the whole demonstrated chain. A modeled bakery, a button labelled repair, a passage about bread, or a green test for a state flag is not sufficient. The actual game must let the player understand, act, observe, and continue.

The original imported files, runtime, assets, provider ledger, and user's port-4192 play session remain unchanged in this audit. Earlier completion claims are superseded; their prior bytes and test receipts are retained as dated evidence. Provider TASK11.19 remains halted at 1/75, and the existing performance/device gaps remain open.
