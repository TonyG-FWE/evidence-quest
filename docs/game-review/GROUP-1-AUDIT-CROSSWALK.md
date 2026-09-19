# Group 1: complete audit crosswalk

Status: **COMPLETE FOR CONNECTED DESIGN; RUNTIME ACCEPTANCE UNCHANGED.**

All **169** original audit items were reviewed across sections A-S, including literacy, access, save/recovery, AI and acceptance dependencies. **130** have their story meaning resolved by the agreed design; **39** have an explicit later interaction, implementation or qualification dependency. **No material Group 1 decision remains unresolved.**

“Design resolved” does not mean implemented or accepted. Every original finding/status/acceptance condition, owner and TASK11 dependency/CHECK11/FIX11 binding is retained in the [machine crosswalk](GROUP-1-AUDIT-CROSSWALK.json). The [original audit](A-TO-Z-IMPLEMENTATION-CHECKLIST.json) is unchanged; its experience acceptance remains **REJECTED_BY_OWNER_PLAYTHROUGH**. New design wording is not substituted for the evidence required by an original finding.

## How to read the record

- **Design resolved:** prior approved D/R decisions, the eight Group 1 agreements and explicitly derived connective detail settle the story dependency.
- **Later dependency:** the story meaning is fixed in the row; exact control, geometry, presentation, engineering or qualification still needs later work.
- The final column points to [Group 2 support requirements](GROUP-1-GROUP-2-REQUIREMENTS.md). Those requirements state the concrete behavior and later demonstration. Preparing them is Group 1 work; execution is not authorized by this packet.
- The machine crosswalk also names the precise [event records](GROUP-1-EVENT-RECORD.json), source decisions and original engineering owners. Each original acceptance condition remains applicable after the referenced actions are implemented.

## A. Purpose, opening, and the whole journey

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-A01 — An independently understandable adventure** | DEFECT | **Later dependency.** The ready studio establishes the child's role; the seed promise leads to access, planting, real reports, shared contributions and the applicable closing. Each event names its immediate purpose and next trigger. | G1-G2-01, G1-G2-02, G1-G2-03, G1-G2-24 |
| **GA-A02 — Jo, Loop, and the entry into Pip's world** | PARTIAL | **Design resolved.** Jo introduces guidance/directing; Loop is ready; an actual transition enters Pip's world and the completed chapter returns to the same framing. | G1-G2-01, G1-G2-02, G1-G2-19 |
| **GA-A03 — The seed promise and its stakes** | PARTIAL | **Design resolved.** The seed is Grandma's gift from an earlier visit. Pip carries or sends that same seed, plants with her, and later records a real moment in its flower. | G1-G2-04, G1-G2-08, G1-G2-19 |
| **GA-A04 — Why the garden became quiet** | PARTIAL | **Design resolved.** Grandma's belief, Mara's work constraint and Sol's older doubts are distinct. Actual reports/disclosures let Grandma revise her belief before completing her account. | G1-G2-09, G1-G2-17 |
| **GA-A05 — Storm chronology** | PARTIAL | **Design resolved.** Mara's changed hours and Sol's reluctance precede the storm. Bridge repair restores access; later timing and reciprocal sharing separately address absence. | G1-G2-05, G1-G2-09, G1-G2-17 |
| **GA-A06 — One complete chapter and a separate recording** | UNVERIFIED | **Later dependency.** The complete chapter includes the dock delivery when Mara is absent. Loop's four-part account is a separate presentation; a short recording cannot replace the adventure. | G1-G2-19, G1-G2-24 |
| **GA-A07 — Child role versus Pip, storyteller, and narrator** | DEFECT | **Design resolved.** Every event declares actor and context: Pip, directed bridge/Sol actions, earlier Mara, Sol rehearsal or Loop narrator. The parent scene survives each transition. | G1-G2-01, G1-G2-12, G1-G2-22 |
| **GA-A08 — All gameplay resolves in the world** | DEFECT | **Design resolved.** Every event records a resulting world action and consequence after confirmation, including repairs, travel, telling and gifts. A reader-panel depiction cannot fulfill it. | G1-G2-02, G1-G2-10, G1-G2-11, G1-G2-16 |
| **GA-A09 — Purposeful tasks instead of following buttons** | DEFECT | **Design resolved.** Visible need and source information precede meaningful actions; failed placement, work-conflict proposals and supported interpretation choices have specific consequences and recovery. | G1-G2-02, G1-G2-06, G1-G2-10, G1-G2-11, G1-G2-13 |
| **GA-A10 — Literal, age-appropriate language** | PARTIAL | **Design resolved.** Instructions name the actor, object, action and reason. Sol's ending prompt follows witnessed baking/thanks; source-specific vocabulary and optional fluency support preserve the full text. | G1-G2-02, G1-G2-20, G1-G2-21 |

## B. Places, characters, materials, and backpack

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-B01 — Recognizable places with functions** | PARTIAL | **Design resolved.** Starting bank and dock, far-bank garden, bakery and workshop have distinct functions; directions follow Sol's actual current bakery/workshop location and the retained bridge reconnects them. | G1-G2-03, G1-G2-11 |
| **GA-B02 — Distinguishable character identities** | PARTIAL | **Later dependency.** Show Mara as dock attendant, a separate boat operator, Sol as repairer/writer, Rina as baker and Grandma as host. Speaker/controlled-actor identity persists in every scene. | G1-G2-01, G1-G2-03, G1-G2-21 |
| **GA-B03 — Usable objects versus scenery** | DEFECT | **Design resolved.** Expose maintained bridge materials, marked ropes, permitted spare tile, seed and real pages as usable. Tools/workplace stock have named owners; scenery creates no implied inventory quest. | G1-G2-03, G1-G2-04, G1-G2-05, G1-G2-11 |
| **GA-B04 — Where the planks came from** | MISSING | **Design resolved.** Two intact sections of Grandma's storm-damaged footbridge remain near the crossing. Her marked maintenance ropes and standing permission are available before reaching her. | G1-G2-04, G1-G2-05 |
| **GA-B05 — Collecting and using materials** | MISSING | **Design resolved.** Pip obtains Rina's permission and carries her spare tile to Sol; the child moves bridge sections as world objects. Collection and use have distinct visible transitions. | G1-G2-04, G1-G2-05, G1-G2-11 |
| **GA-B06 — Backpack purpose** | PARTIAL | **Design resolved.** The backpack holds small actual possessions needed for delivery/use. It does not contain large bridge sections, remembered reasons, attendance or completed source records. | G1-G2-04 |
| **GA-B07 — Backpack contents and ownership** | PRESENT | **Design resolved.** Seed, tile and page records follow actual handoffs and travel. Author, owner, current holder, accessible source and delivered status remain separate. | G1-G2-04, G1-G2-22 |
| **GA-B08 — Using an item at the relevant place** | PARTIAL | **Design resolved.** Offer the actual held item at its applicable person/place. An unrelated or already-delivered item cannot be silently consumed or duplicate an earlier action. | G1-G2-03, G1-G2-04 |
| **GA-B09 — World scale and camera readability** | DEFECT | **Later dependency.** The fixed locations/actors/objects must be readable at gameplay scale and while moving; precise camera, geometry and illustrated finish require later visible qualification. | G1-G2-03, G1-G2-21, G1-G2-24 |

## C. Mara, her work, and the passenger boat

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-C01 — Mara doing her job when first met** | MISSING | **Design resolved.** Mara visibly assists passengers at her dock during today's work; another crew member operates the passenger boat. Talking pauses and resumes the correct working scene. | G1-G2-01, G1-G2-09 |
| **GA-C02 — Passenger boat distinct from seed boat** | PARTIAL | **Design resolved.** Mara's passenger vessel serves people; Grandma's seed boat carries only its permitted seed cargo; repaired footbridge carries Pip and later visitors. Keep all three distinct. | G1-G2-03, G1-G2-07, G1-G2-09 |
| **GA-C03 — People affected by Mara's duty** | MISSING | **Design resolved.** Passengers need Mara's dock assistance through the final arrival. Work concludes through that actual service event on the later route before she travels. | G1-G2-09, G1-G2-15 |
| **GA-C04 — The time conflict before choosing** | PARTIAL | **Design resolved.** Mara explains that usual gathering time overlaps work before invitation choices. The child can reason about time, carrying her account and reciprocal sharing. | G1-G2-09, G1-G2-14 |
| **GA-C05 — Bridge repair does not finish her work** | MISSING | **Design resolved.** Repairing access does not unload passengers or release Mara from duty. A bridge-only proposal receives the specific remaining work conflict and permits revision. | G1-G2-05, G1-G2-09, G1-G2-14 |
| **GA-C06 — An offer versus an agreed invitation** | PARTIAL | **Design resolved.** Offering to ask creates an asking promise; Grandma's actual agreement sets time; dock conversations set Mara's invitation/role. None implies finished travel or telling. | G1-G2-09, G1-G2-14 |
| **GA-C07 — Story copy and permission** | PARTIAL | **Design resolved.** Read-story permission includes an actual gifted copy or actual existing-page access. Later/Mara with Pip's copy grants reading access without an invented replacement or compulsory permanent return. | G1-G2-04, G1-G2-09, G1-G2-14 |
| **GA-C08 — Reciprocity while Mara works** | PARTIAL | **Design resolved.** Usual/Pip uses Mara's permission and later delivers Grandma's actual story to her. Later routes show Mara listening in person; receipt at work remains different from later reading. | G1-G2-09, G1-G2-19 |
| **GA-C09 — Consequences of all three arrangements** | PARTIAL | **Design resolved.** Preserve usual/Pip with Mara working, later/Mara as teller and later/Pip with Mara listening. Welcome, performance, record and ending use the same actual arrangement. | G1-G2-14, G1-G2-15, G1-G2-16, G1-G2-19 |

## D. Footbridge construction and consequences

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-D01 — The original damage and the repair task** | PARTIAL | **Design resolved.** The storm damaged Grandma's footbridge. Repair reuses its two intact nearby sections and maintenance ropes rather than collecting unexplained planks. | G1-G2-05 |
| **GA-D02 — Placement based on visible reach** | DEFECT | **Later dependency.** A visible wide gap is beyond the two sections' span; the opposing crossing posts show the workable reach. Feedback identifies reach/join failures; exact tolerances remain later work. | G1-G2-05, G1-G2-21 |
| **GA-D03 — Opposing posts and attachment targets** | DEFECT | **Design resolved.** Both opposite-bank posts and the actual section ends are the fastening targets. Rope placement near a target is not attachment; each end shows its own condition. | G1-G2-05 |
| **GA-D04 — Joining the sections** | PARTIAL | **Design resolved.** Join both original sections in the world to span the workable gap, preserving their real positions and identities through recovery. | G1-G2-05, G1-G2-06 |
| **GA-D05 — Wide versus narrow river challenge** | PARTIAL | **Design resolved.** The wide-gap attempt exposes unspanned water; choosing the reachable crossing resolves that geometric problem. It is different from a reaching bridge with loose ropes. | G1-G2-05, G1-G2-06 |
| **GA-D06 — Fastening each real end** | PARTIAL | **Design resolved.** Fasten each real end to its corresponding bank attachment. Near-only and far-only states remain distinct; secure means actually fastened so it stays in place. | G1-G2-05, G1-G2-06, G1-G2-20 |
| **GA-D07 — Ordinary unsecured crossing attempt** | DEFECT | **Design resolved.** An ordinary attempt on a reaching unsecured bridge proceeds into visible tip/separation and safe retreat. A warning or blocked interaction alone is insufficient. | G1-G2-06 |
| **GA-D08 — Collapse, retreat, and rebuilding** | PARTIAL | **Design resolved.** Recover the same intact nearby sections. Retain every correctly attached bank anchor, rebuild and cross; neither-end, near-only and far-only cases are explicit. | G1-G2-06 |
| **GA-D09 — Honest feedback for the actual failure** | DEFECT | **Design resolved.** Feedback names wide-gap, join or actual loose-end cause. Correcting one problem must not falsely claim the others are solved. | G1-G2-05, G1-G2-06, G1-G2-21 |
| **GA-D10 — Construction role and current instruction** | DEFECT | **Design resolved.** The child directs construction while Pip waits; Back to Pip returns to travel and a separate actual crossing. Role and immediate instruction remain clear. | G1-G2-01, G1-G2-05 |
| **GA-D11 — Seed-boat channel and permanent route** | PARTIAL | **Design resolved.** The usable bridge stays for returns and guests, while the separate boat channel remains clear. The empty boat stays at its real mooring after successful delivery. | G1-G2-05, G1-G2-07, G1-G2-08 |
| **GA-D12 — Recovery and successful alternatives** | PRESENT | **Design resolved.** All five successful physical histories remain equal. Collapse is avoidable and recoverable without replacement resources or lost carried items; legacy 65 cue orders remain later regression obligations. | G1-G2-06, G1-G2-08, G1-G2-24 |

## E. The seed, transport, and planting

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-E01 — A reason to send the seed first** | PARTIAL | **Design resolved.** Early delivery lets Grandma receive the seed and prepare its soil while waiting to plant with Pip. It never removes Pip's crossing or planting promise. | G1-G2-07, G1-G2-08 |
| **GA-E02 — Actual cargo movement and receipt** | PRESENT | **Design resolved.** Pip loads/launches, the child guides the boat, and Grandma physically receives the same seed. Wrong-bank navigation retains cargo and supports redirection/cancel return. | G1-G2-04, G1-G2-07 |
| **GA-E03 — Boat limits and harmless later use** | PARTIAL | **Design resolved.** The seed boat takes neither Pip nor bridge pieces/pages. Completed delivery leaves an empty boat at the actual mooring; later harmless use cannot fabricate cargo. | G1-G2-07, G1-G2-08 |
| **GA-E04 — Pip and Grandma plant together** | PARTIAL | **Design resolved.** Actual Pip and Grandma place the held seed in prepared soil together. The carried and delivered histories satisfy the same planting promise. | G1-G2-04, G1-G2-08 |
| **GA-E05 — Roots, soil, and the flower** | PRESENT | **Design resolved.** The planted seed becomes the rooted flower; bloom is a separate recoverable step. The flower later receives a real picture, not another seed or plant. | G1-G2-08, G1-G2-18 |
| **GA-E06 — Planting changes the next objective** | PARTIAL | **Design resolved.** Planting fulfills the before-dark promise; Grandma introduces the quiet garden, older stories and actual reports, leading to invitations and Sol's bakery encounter. | G1-G2-08, G1-G2-09, G1-G2-11, G1-G2-18 |

## F. First garden visit and lantern purpose

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-F01 — Grandma explains her garden** | MISSING | **Design resolved.** Grandma explains that the rooted lantern flowers preserve shared stories, making the connection between Pip's seed and rebuilding the gathering visible. | G1-G2-08, G1-G2-18 |
| **GA-F02 — Old stories versus current tasks** | DEFECT | **Design resolved.** The Windy Picnic and The Unexpected Duet are optional older accounts with meaningful vocabulary reuse. They support the garden's purpose without blocking today's tasks. | G1-G2-18, G1-G2-20 |
| **GA-F03 — Empty flowers waiting for stories** | DEFECT | **Design resolved.** Keep two older contributions, three waiting story places and Pip's seed flower distinct. Waiting lanterns do not imply a clue quota or erased history. | G1-G2-18 |
| **GA-F04 — Selecting a particular world lantern** | MISSING | **Later dependency.** Select the actual world lantern to open its titled source; return restores that object, source and parent task. Exact hit/focus treatment is a later interaction dependency. | G1-G2-18, G1-G2-21 |
| **GA-F05 — New story enters its lantern** | MISSING | **Design resolved.** Actual telling fills the designated existing lantern with the right author, page/version and supported image; retelling or adding Sol's ending updates the same contribution. | G1-G2-16, G1-G2-18 |
| **GA-F06 — Grandma's belief changes through information** | PARTIAL | **Design resolved.** Grandma learns through Pip's real Mara report and Sol's actual explanation. A changed schedule, held page or hidden world flag alone cannot reveal someone's private reason. | G1-G2-14, G1-G2-17 |
| **GA-F07 — Sol-first and Grandma-first continuity** | PARTIAL | **Design resolved.** A first garden visit without Mara supplies no invented work reason. Actual Mara knowledge allows early time agreement without page/Sol prerequisites; prior Sol progress persists on revisits. | G1-G2-09, G1-G2-11, G1-G2-14, G1-G2-17 |
| **GA-F08 — Library purpose after the ending** | PRESENT | **Design resolved.** After completion, the garden's particular lanterns remain readable and exploration retains the real ending location. Rereading changes exposure, not completed event history. | G1-G2-18, G1-G2-19, G1-G2-23 |

## G. Mara's story, The Torn Wing

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-G01 — Who is telling which event** | PARTIAL | **Design resolved.** The present garden teller introduces Mara's earlier arrival. The child directs Mara in that earlier event while Pip and today's Mara retain their current locations and duties. | G1-G2-01, G1-G2-10 |
| **GA-G02 — Boy, damaged wing, promise, and hesitation** | PARTIAL | **Design resolved.** The boy's sister made the paper bird for his grandmother and he promised to keep it safe. His observable hesitation supports multiple interpretations, not a declared hidden motive. | G1-G2-10, G1-G2-13 |
| **GA-G03 — Tape, permission, and mending** | MISSING | **Design resolved.** Mara asks, receives permission, fetches workplace tape and helps align/mend the wing. Ineffective tape placement stays adjustable; the boy retains the repaired original. | G1-G2-04, G1-G2-10 |
| **GA-G04 — Interpretation changes presentation meaningfully** | PARTIAL | **Design resolved.** Choose A promise to his sister or A gift repaired together, with the supported repair default. The selected emphasis changes the actual lantern image/caption without changing source facts. | G1-G2-10, G1-G2-18 |
| **GA-G05 — Consequences and misconception feedback** | PARTIAL | **Design resolved.** A misplaced repair leaves the wing loose; redirection repairs it. Interpretation feedback distinguishes source evidence from possible motives and permits revision without an answer gate. | G1-G2-10, G1-G2-13 |
| **GA-G06 — Rehearsal and actual sharing stay separate** | PARTIAL | **Design resolved.** Opening, practice, interpretation and historical enactment retain their context; actual telling creates the one contribution. A later public retelling reuses it without mandatory duplicate repair. | G1-G2-01, G1-G2-10, G1-G2-18 |

## H. Sol, the bakery, repair, and bread

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-H01 — Why Pip visits Sol** | PARTIAL | **Design resolved.** Grandma's garden purpose leads Pip to ask Sol to contribute. Current directions locate him helping at the bakery before the manuscript/ending work. | G1-G2-03, G1-G2-11 |
| **GA-H02 — Sol's workshop and manuscript as usable objects** | PARTIAL | **Design resolved.** After repair/baking/thanks, Sol is at his workshop finishing his original account. Its real page opens the source and ending interaction; it does not exist before its events. | G1-G2-03, G1-G2-11, G1-G2-12 |
| **GA-H03 — Where and when the bakery story happens** | UNRESOLVED | **Design resolved.** Tony agreed that the bakery incident happens during Pip's current visit. It precedes workshop ending work; the older completed-repair-only framing is an explicit dated content amendment. | G1-G2-11, G1-G2-24 |
| **GA-H04 — Rina and her promised bread** | MISSING | **Design resolved.** Rina has promised bread; rain threatening her flour prevents baking. Her explanation establishes why the particular roof repair matters. | G1-G2-11, G1-G2-20 |
| **GA-H05 — Recognizable bakery** | MISSING | **Later dependency.** Rina's bakery visibly contains roof fault, protected flour, permitted spare tile and baking activity. Exact art/staging must show those fixed functions during later qualification. | G1-G2-03, G1-G2-11, G1-G2-21 |
| **GA-H06 — Broken roof and incoming water** | MISSING | **Design resolved.** Rain enters through the cracked tile; Sol removes that tile and replaces the fault with Rina's intact spare. Outside rain continues after the indoor leak stops. | G1-G2-11 |
| **GA-H07 — Flour sacks and the threat to them** | MISSING | **Design resolved.** Rina moves/checks the sacks so the preserved dry flour can be used. There is no hidden spoilage countdown or silent restoration of already-ruined flour. | G1-G2-11 |
| **GA-H08 — Wood, tools, and repair materials** | MISSING | **Design resolved.** The repair needs Rina's permitted spare roof tile and Sol's ordinary working tools/ladder. No bridge wood, invented recipe, additional tool hunt or mixed wooden task is required. | G1-G2-04, G1-G2-11 |
| **GA-H09 — Player performs the intended repair** | MISSING | **Design resolved.** Pip collects/hands over the tile; the player directs Sol's removal/replacement in the game world. A page describing the repair is insufficient. | G1-G2-01, G1-G2-02, G1-G2-11 |
| **GA-H10 — Observable repair consequence** | MISSING | **Design resolved.** Correct replacement visibly stops incoming water and Rina checks dry flour. The roof consequence follows real placement rather than a choice flag. | G1-G2-02, G1-G2-11 |
| **GA-H11 — Bread being made** | MISSING | **Design resolved.** Rina visibly prepares dough, shapes and bakes bread with clear preparation time. This does not trigger the last passenger service or gathering, or introduce an ingredient puzzle. | G1-G2-11, G1-G2-15 |
| **GA-H12 — Rina's thanks and the loaf** | PARTIAL | **Design resolved.** Pip accompanies Rina taking a real loaf to Sol and sees the handoff. Remaining bread belongs to her existing promise; no invisible completion of all customers' deliveries is inferred. | G1-G2-04, G1-G2-11 |
| **GA-H13 — Sol discovers why the small repair mattered** | PARTIAL | **Design resolved.** Sol's account has not yet expressed the baking/thanks enabled by his repair. Ending support and audience response help him see that ordinary work can interest others. | G1-G2-11, G1-G2-12, G1-G2-16 |
| **GA-H14 — Consequence of an ineffective action** | MISSING | **Design resolved.** Putting the tile beside the fault leaves the leak active. The same tile can be repositioned; the player neither consumes extra stock nor waits for damage to reset. | G1-G2-11 |
| **GA-H15 — Sol prepares to participate** | PARTIAL | **Design resolved.** After actual bakery events, Sol can prepare an exact ending or bring the open draft. Time notice and invitation are actual conversations, not automatic consequences of roof success. | G1-G2-12, G1-G2-14, G1-G2-15 |

## I. Writing, choosing, and performing Sol's ending

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-I01 — An ending to an established sequence** | DEFECT | **Design resolved.** The child writes after seeing repair, protected flour, baking and thanks. The ending expresses the consequence of that established sequence rather than inventing what happened. | G1-G2-11, G1-G2-12 |
| **GA-I02 — Original account versus later information** | PARTIAL | **Design resolved.** Sol's titled original account, later account and child wording stay distinct. Pip's witnessed knowledge is retained; source access does not become a new world event. | G1-G2-12, G1-G2-17 |
| **GA-I03 — One coherent writing interaction** | DEFECT | **Design resolved.** One ending interaction keeps source, exact draft, help, rehearsal and selection connected. Leaving/revising returns to the same working task and version. | G1-G2-12, G1-G2-21, G1-G2-22 |
| **GA-I04 — Child's exact writing** | PRESENT | **Design resolved.** Keep exact child words through editing, feedback, rehearsal, selection and performance. Prepared wording remains attributed support rather than claimed independent writing. | G1-G2-12, G1-G2-13, G1-G2-22 |
| **GA-I05 — Meaning determines the performed scene** | DEFECT | **Later dependency.** Qualified interpretation maps the current meaning to baking, thanks or both; unclear meaning asks a specific clarification. Unavailable interpretation uses D063's labeled direct scene-choice path. | G1-G2-12, G1-G2-13 |
| **GA-I06 — Unsupported writing does not become Sol's fact** | DEFECT | **Design resolved.** Invented or contradicted statements cannot rewrite the completed bakery events. Preserve the draft and source-based help, revision, prepared support and open-draft alternatives. | G1-G2-12, G1-G2-13 |
| **GA-I07 — Try, revise, confirm, perform** | PARTIAL | **Design resolved.** Try my ending enacts a world rehearsal; revise and try again; Use this ending selects its exact text/scene. Actual contribution performance is a later distinct event. | G1-G2-01, G1-G2-12, G1-G2-16 |
| **GA-I08 — Prepared support and open draft** | PRESENT | **Design resolved.** Prepared bread/thanks support and the original open draft remain valid. Brief accurate thanks is enough; development and questions are optional, with no answer/length gate. | G1-G2-12, G1-G2-13, G1-G2-16 |
| **GA-I09 — Selected ending changes the later contribution** | PARTIAL | **Design resolved.** Prepared text is performed as selected; gathering-added text is shared then; unchanged open draft stays open. All update the same Sol lantern and factual ending composition. | G1-G2-12, G1-G2-16, G1-G2-18, G1-G2-19 |

## J. Planning, invitations, time, and travel

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-J01 — Planning grows out of the conversations** | DEFECT | **Design resolved.** Reports and actual conversations establish the time and contribution roles. Early Grandma agreement solves only time; reachable unfinished preparations remain visible. | G1-G2-09, G1-G2-14 |
| **GA-J02 — All three valid Mara arrangements** | PRESENT | **Design resolved.** Preserve usual/Pip, later/Mara and later/Pip-with-Mara-listening as equal solutions. Each has its actual permission/page, notice, attendance and closing dependencies. | G1-G2-09, G1-G2-14, G1-G2-16, G1-G2-19 |
| **GA-J03 — Meaningful failed plan and revision** | PARTIAL | **Design resolved.** Bridge-only reasoning leaves Mara's duty unresolved and prompts the actual constraint. The child may revise without a forced mistake or correct-answer gate. | G1-G2-09, G1-G2-13, G1-G2-14 |
| **GA-J04 — Actual in-person invitations** | PARTIAL | **Design resolved.** Pip visits the affected characters to invite/inform them. Actual confirmation creates that recipient's expectation, not teleportation or a global invitation to everyone. | G1-G2-14, G1-G2-15 |
| **GA-J05 — Changing a plan already communicated** | PRESENT | **Design resolved.** Changing time/role leaves affected recipients on their previous communicated plan until told. Revisit only changed recipients; preserve unchanged agreements and all physical work. | G1-G2-14, G1-G2-22 |
| **GA-J06 — Pip reports the arranged roles to Grandma** | MISSING | **Design resolved.** Pip's report to Grandma names only the arranged time, actual storyteller/listener roles and Sol's real prepared/open status. It does not claim an uninformed person's acceptance. | G1-G2-14, G1-G2-17 |
| **GA-J07 — Readiness is preparation, not a quiz** | PARTIAL | **Design resolved.** Readiness checks real planting, required preparation, permissions and communicated arrangements. Older stories, optional questions and a finished Sol ending are not gates. | G1-G2-08, G1-G2-12, G1-G2-14, G1-G2-15 |
| **GA-J08 — Story time advances at the event boundary** | PRESENT | **Design resolved.** Begin the gathering advances the agreed event time and fixes its roles. Reading/help/rehearsal/baking do not run an invisible gathering timer. | G1-G2-11, G1-G2-14, G1-G2-15 |
| **GA-J09 — Passengers finish, then Mara travels** | PARTIAL | **Design resolved.** At later time show passengers assisted, Mara finishing dock duty and then walking to the garden. At usual time she remains working; invitation alone changes no location. | G1-G2-09, G1-G2-15 |
| **GA-J10 — Sol's arrival with his chosen page** | PARTIAL | **Design resolved.** Sol comes from the workshop with the actual selected page or open draft. Arrival preserves exact selection and never requires an ending merely to attend. | G1-G2-12, G1-G2-15 |

## K. The gathering brings the threads together

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-K01 — An actual gathering in the game** | DEFECT | **Design resolved.** Begin leads to actual arrivals, positions, welcome, turn-taking, telling and listener responses in the world; the garden visibly changes with contributions. | G1-G2-02, G1-G2-15, G1-G2-16, G1-G2-18 |
| **GA-K02 — Welcome reflects the chosen plan** | PARTIAL | **Design resolved.** Welcome names the real Mara/Pip teller, Mara's actual absence/listening and Sol's prepared/open participation. It cannot assume one default arrangement. | G1-G2-15, G1-G2-16 |
| **GA-K03 — Mara's actual teller/listener role** | PARTIAL | **Design resolved.** Usual/Pip tells with Mara absent; later/Mara tells herself; later/Pip tells while Mara listens. Source possession and permission match the actual teller. | G1-G2-09, G1-G2-16 |
| **GA-K04 — Prepared Sol ending and audience response** | MISSING | **Design resolved.** Sol performs the exact selected ending and receives an audience response tied to its baking/thanks emphasis. Working edits cannot replace that selected version implicitly. | G1-G2-12, G1-G2-16 |
| **GA-K05 — An open draft leads to real discussion** | PARTIAL | **Design resolved.** An open draft can invite audience-oriented elaboration about baking/thanks Pip witnessed. Asking none and keeping the draft remains valid; being heard is not falsely recorded as receiving discussion. | G1-G2-12, G1-G2-16, G1-G2-17 |
| **GA-K06 — Ending added during the gathering** | PARTIAL | **Design resolved.** After real discussion the child may choose Add this ending. Sol visibly adds/shares that exact ending now, updating the existing contribution instead of creating another. | G1-G2-12, G1-G2-16, G1-G2-18 |
| **GA-K07 — Grandma hears Sol's reason** | PARTIAL | **Design resolved.** Grandma asks about Sol's reluctance before today; he explains his doubts about ordinary making/fixing. Today's roof story cannot have caused his earlier absence. | G1-G2-17 |
| **GA-K08 — The Empty Bench explains the whole problem** | PARTIAL | **Design resolved.** Grandma's account distinguishes pre-storm absence, later damage, her assumption and reasons actually learned. She brings out cushions and completes its present-day conclusion before telling it. | G1-G2-17, G1-G2-18 |
| **GA-K09 — Stories enter the garden as they are shared** | MISSING | **Design resolved.** Mara, Sol and Grandma each fill their designated rooted lantern through actual sharing. Retelling and authorized Sol revision preserve one identity each. | G1-G2-16, G1-G2-18 |
| **GA-K10 — All nine outcome combinations** | PRESENT | **Design resolved.** The event record enumerates all three Mara arrangements times three Sol outcomes across all five physical histories: 45 design cases. Runtime branch coverage remains later evidence. | G1-G2-08, G1-G2-16, G1-G2-19, G1-G2-24 |

## L. Closing, returning a story, and Loop's presentation

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-L01 — Pip's lantern records a real event** | PARTIAL | **Design resolved.** Only after Grandma's telling/moment invitation, Pip's actually grown flower keeps planting or real sharing with actual attendees. Earlier image availability cannot trigger premature closing. | G1-G2-08, G1-G2-18, G1-G2-19 |
| **GA-L02 — Mara attends and hears Grandma** | PARTIAL | **Design resolved.** When Mara attends, she actually hears Grandma's telling and exchanges the closing response in the garden. Later/Pip still gives Mara the listening role. | G1-G2-16, G1-G2-19 |
| **GA-L03 — Absent Mara receives a real copy** | PARTIAL | **Design resolved.** When absent, Grandma's actual copy is handed to Pip, carried across the retained bridge and delivered to Mara at work. She will read later; the chapter can finish at the dock. | G1-G2-04, G1-G2-19 |
| **GA-L04 — A conclusion to the original purpose** | DEFECT | **Design resolved.** Completion joins actual planting, contributions, learned reasons, preserved stories, Pip's moment and the applicable reciprocal-sharing commitment. No unresolved required delivery is hidden by an ending. | G1-G2-17, G1-G2-18, G1-G2-19 |
| **GA-L05 — Return to Jo and ready Loop** | PARTIAL | **Design resolved.** Finishing returns to Jo and ready Loop with Watch the ending and Narrate the ending; the studio is framing, not another equipment quest. | G1-G2-01, G1-G2-19 |
| **GA-L06 — Four pictures match actual events** | PARTIAL | **Design resolved.** D042's four parts and pictures use actual planting, Mara arrangement, Sol outcome and closing. Selected manuscript text remains separately preserved, and absent/listening/open states remain truthful. | G1-G2-12, G1-G2-16, G1-G2-19 |
| **GA-L07 — Pause and resume narration at a useful boundary** | DEFECT | **Design resolved.** Pause/resume preserves paragraph/picture and exact narration target, stops capture/audio and does not claim an unread part was spoken or replay world transactions. | G1-G2-19, G1-G2-20, G1-G2-22 |
| **GA-L08 — Replay, explore, and start fresh** | PRESENT | **Design resolved.** Replay preserves completed events; explore keeps the actual ending place; Start a new adventure remains available from Pause during unfinished play with confirmation, separate run and Cancel preservation. | G1-G2-19, G1-G2-23 |

## M. Comprehension through action and conversation

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-M01 — Reading changes a decision or action** | DEFECT | **Design resolved.** Work hours inform plans; instructions inform reach/fastening; the torn bird motivates permission/repair; bakery causes inform endings; evidence informs Grandma's revised belief. | G1-G2-02, G1-G2-09, G1-G2-10, G1-G2-11, G1-G2-12 |
| **GA-M02 — Own reasoning versus supplied words** | PARTIAL | **Design resolved.** Record own wording separately from supplied alternatives, model reading, hints and prepared endings. A correct supported action is not evidence of independent reasoning. | G1-G2-13, G1-G2-20, G1-G2-24 |
| **GA-M03 — Work-time inference** | PARTIAL | **Design resolved.** Mara's explicit duty/time explains why access alone is insufficient and supports three actual arrangements, including reciprocal delivery while she works. | G1-G2-09, G1-G2-14 |
| **GA-M04 — Belief versus evidence** | PARTIAL | **Design resolved.** Grandma's belief is identified as an assumption; actual Mara report and Sol disclosure supply the reasons that change her account. | G1-G2-17, G1-G2-20 |
| **GA-M05 — Cause, sequence, and a changed outcome** | DEFECT | **Design resolved.** Leaking roof threatens flour; effective tile repair preserves it; baking and thanks follow. Rehearsed telling may emphasize these consequences without inventing a new past. | G1-G2-11, G1-G2-12 |
| **GA-M06 — Plausible interpretation and uncertainty** | PARTIAL | **Design resolved.** The boy's words/actions support more than one plausible explanation of hesitation. Select a supported presentation emphasis without declaring an unspoken private motive. | G1-G2-10, G1-G2-13 |
| **GA-M07 — Consequences without an answer gate** | DEFECT | **Design resolved.** Failed placement and inadequate work plans have recoverable world/conversation consequences. Correct construction and multiple supported interpretations may succeed without mandatory mistakes. | G1-G2-06, G1-G2-09, G1-G2-10, G1-G2-11 |
| **GA-M08 — No invented learning achievement** | PRESENT | **Design resolved.** Records report actual actions, exposure, support and participation only. Completion, successful repair, rereading or help use cannot prove improved reading or mastery. | G1-G2-13, G1-G2-20, G1-G2-24 |

## N. Vocabulary and readable source material

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-N01 — Complete titled reading inventory** | PRESENT | **Design resolved.** Retain R09's complete titled sources, instruction texts, older stories, selected child ending and outcome narration. Apply only the explicitly dated Group 1 source amendments. | G1-G2-20, G1-G2-24 |
| **GA-N02 — Every displayed reading word has a usable help path** | PARTIAL | **Later dependency.** Every displayed reading word needs a discoverable help path across letters, pages, instructions, choices, captions and the child's draft. Its exact source context stays available. | G1-G2-20, G1-G2-21 |
| **GA-N03 — Meaning in the exact sentence** | PARTIAL | **Design resolved.** Word help explains meaning in the exact sentence and speaker context, including source-specific secure/hesitated uses. It does not silently replace the source passage. | G1-G2-20 |
| **GA-N04 — Six focus words and reuse** | PARTIAL | **Design resolved.** Keep secure, obligation, postpone/postponed, hesitated, mended and assumed with meaningful reuse. Optional older-story encounters do not become a six-word completion quota. | G1-G2-10, G1-G2-17, G1-G2-18, G1-G2-20 |
| **GA-N05 — Whole phrases and title vocabulary** | PRESENT | **Design resolved.** Help includes whole phrases such as kept his promise and stayed put and words in titles. Keep the selected phrase/source span distinct from isolated-word meaning. | G1-G2-20 |
| **GA-N06 — Words in the child's own ending** | PARTIAL | **Design resolved.** Own-ending word help uses the exact current draft and revision; supplied definitions/corrections remain help. A lookup cannot alter the selected or performed contribution. | G1-G2-12, G1-G2-13, G1-G2-20 |
| **GA-N07 — Spelling suggestion, use, keep, undo** | PARTIAL | **Design resolved.** Spelling support proposes without replacing; Use, Keep and undo retain exact draft provenance and do not silently change a previously chosen contribution. | G1-G2-12, G1-G2-20 |
| **GA-N08 — Disputing a wrong word explanation** | PARTIAL | **Design resolved.** A disputed explanation returns to the selected source/word and preserves the original. Unavailable or unsupported help is explicit and does not make an incorrect explanation canonical. | G1-G2-13, G1-G2-20 |

## O. Fluency, narration, and optional listening

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-O01 — Practice has a story purpose** | PARTIAL | **Design resolved.** Optional practice prepares a real telling, listening exchange or final narration. Source/title/role remain connected to that purpose rather than a separate compulsory exercise. | G1-G2-19, G1-G2-20 |
| **GA-O02 — Model, independent turn, purposeful rereading** | PARTIAL | **Design resolved.** Retain model listening, independent turns and purposeful rereading without forced recording. Assistance is marked separately from independent performance. | G1-G2-20 |
| **GA-O03 — Exact target and speaker** | PARTIAL | **Design resolved.** Bind practice to exact source, speaker, span and revision, including Sol's own ending and Loop paragraph. Stale feedback cannot attach to different words. | G1-G2-12, G1-G2-20, G1-G2-22 |
| **GA-O04 — Explicit start, stop, review, discard** | PRESENT | **Later dependency.** Recording begins only with explicit Start and supports Stop, Review and Discard. Transitions stop capture; discarded/transient audio is not durable story evidence. | G1-G2-20, G1-G2-22 |
| **GA-O05 — Active listening feedback actually works** | UNVERIFIED | **Later dependency.** The design requires meaningful optional listening feedback, but microphone/acoustic/provider correctness remains unqualified. No authored response or documentation pass establishes it. | G1-G2-20, G1-G2-24 |
| **GA-O06 — Optional feedback during final narration** | PARTIAL | **Later dependency.** Final narration may request optional feedback at useful parts; Watch, practice without feedback and pause remain valid. Only actual spoken/played portions can be recorded as such. | G1-G2-19, G1-G2-20 |
| **GA-O07 — No overlap or accidental listening** | PARTIAL | **Later dependency.** Model playback, recording and narration must not overlap or begin automatically. Context changes stop them while preserving exact target and current task. | G1-G2-20, G1-G2-22 |
| **GA-O08 — Fallback and uncertain feedback** | PARTIAL | **Later dependency.** Uncertain/unavailable speech feedback states its limit, preserves the target and offers retry only by explicit action, model listening or continuing without feedback; no invented pronunciation diagnosis. | G1-G2-13, G1-G2-20, G1-G2-24 |

## P. AI behavior, honesty, and implementation boundaries

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-P01 — Live understanding versus prepared help** | UNVERIFIED | **Design resolved.** Prepared choices and authored support are labeled distinctly from qualified live understanding. D063 keeps writing/scene choice usable during current unavailability without pretending assessment occurred. | G1-G2-12, G1-G2-13 |
| **GA-P02 — Ambiguous or brief writing** | PARTIAL | **Design resolved.** Unclear writing gets a specific clarification when supported; a brief accurate thanks ending remains valid and optional development stays optional. | G1-G2-12, G1-G2-13 |
| **GA-P03 — Feedback changes the right thing** | PARTIAL | **Design resolved.** Feedback addresses the actual action/draft under review and cannot grant ownership, knowledge, attendance, selected text or completed sharing by itself. | G1-G2-04, G1-G2-12, G1-G2-13, G1-G2-22 |
| **GA-P04 — Only disclosed sources and current revisions** | PARTIAL | **Design resolved.** Use only disclosed sources, current role and exact revision. Historical enactment/rehearsal cannot leak private knowledge or create today's source facts. | G1-G2-01, G1-G2-13, G1-G2-17, G1-G2-22 |
| **GA-P05 — User edits or disputes while waiting** | PARTIAL | **Later dependency.** Edits, cancellation and disputes retain the current draft/context; stale replies cannot replace text, steal focus or perform the pending world action. | G1-G2-13, G1-G2-20, G1-G2-22 |
| **GA-P06 — Long draft span selection** | MISSING | **Design resolved.** When feedback length is limited, let the child select a span while retaining the full exact draft and selected version. No silent truncation or misleading whole-draft assessment. | G1-G2-12, G1-G2-13 |
| **GA-P07 — Truthful service availability and latency** | PARTIAL | **Later dependency.** Availability and latency must be truthful; unavailable support offers the authored/source alternatives. Fast qualified live behavior and stale/cancel handling need later measurement. | G1-G2-13, G1-G2-24 |
| **GA-P08 — Qualification ledger and protected data** | PRESENT | **Later dependency.** Keep TASK11.19's ledger halted at exactly 1/75 with protected input/data boundaries. No Group 1 output authorizes a provider request, resets the ledger or claims live qualification. | G1-G2-13, G1-G2-22, G1-G2-24 |

## Q. Layout, controls, hints, and accessibility

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-Q01 — Reading area versus game action** | DEFECT | **Later dependency.** The reading area carries information/choices/confirmation; the world performs the action and result and returns to the correct parent task. Exact panel/view treatment is later work. | G1-G2-01, G1-G2-02, G1-G2-21 |
| **GA-Q02 — One current task and next step** | DEFECT | **Later dependency.** Each event supplies one immediate purpose and concrete next trigger; navigation uses current character location and unfinished promises rather than replaying completed tasks. | G1-G2-02, G1-G2-03, G1-G2-21 |
| **GA-Q03 — Choices look like choices** | PARTIAL | **Later dependency.** Use recognizable actionable choices with confirmation distinct from prose. Preserve equal legitimate branches, ineffective actions and native equivalents; exact visual treatment requires later review. | G1-G2-02, G1-G2-21 |
| **GA-Q04 — Every response identifies its speaker** | PARTIAL | **Later dependency.** Every response identifies its actual speaker; Sol's first-person writing and quoted Rina, present storyteller and earlier Mara are distinct. Detailed presentation remains later work. | G1-G2-01, G1-G2-12, G1-G2-21 |
| **GA-Q05 — Current passage remains usable** | PARTIAL | **Later dependency.** Keep the current titled passage/draft usable during help, practice and return, with exact selected span and revision. No detached page or lost scroll/focus context. | G1-G2-12, G1-G2-20, G1-G2-21 |
| **GA-Q06 — Hints are discoverable and relevant** | PARTIAL | **Later dependency.** Hints are findable, source-grounded and relevant to the current actual obstacle. They do not silently take an action, reveal an uninformed character's knowledge or become mandatory. | G1-G2-13, G1-G2-20, G1-G2-21 |
| **GA-Q07 — Control meaning across modes** | PARTIAL | **Later dependency.** Travel, construction, boat steering, earlier repair, writing rehearsal and narration declare their controlled actor/mode and preserve a clear return. Final input mapping remains later work. | G1-G2-01, G1-G2-05, G1-G2-07, G1-G2-10, G1-G2-12, G1-G2-21 |
| **GA-Q08 — Native equivalents for all world actions** | PARTIAL | **Later dependency.** Every world action needs native keyboard/touch/access equivalents with the same ownership, physical consequences and recovery. Design contracts do not establish usable controls. | G1-G2-05, G1-G2-06, G1-G2-07, G1-G2-11, G1-G2-21 |
| **GA-Q09 — Continue returns to the right context** | PARTIAL | **Later dependency.** Continue/Back restores the actual source, actor, parent place and task without replaying already-committed transfers, repairs or shared contributions. | G1-G2-01, G1-G2-21, G1-G2-22 |
| **GA-Q10 — Visual and sensory access** | UNVERIFIED | **Later dependency.** Readable scale/contrast, focus, motion/audio alternatives and equivalent access must support all fixed scenes and meanings. Visual/sensory qualification remains a later dependency. | G1-G2-03, G1-G2-20, G1-G2-21, G1-G2-24 |

## R. State, save, interruption, and consistency

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-R01 — One authoritative world state** | PRESENT | **Later dependency.** The chapter has one authoritative immutable state/coordinator. Earlier story, rehearsal and presentation are distinct role contexts, not independently mutating copies of today's world. | G1-G2-01, G1-G2-22 |
| **GA-R02 — Ownership, exposure, knowledge, and completion** | PARTIAL | **Design resolved.** Save source exposure, possession, permission, character reports, promises, invitations, help and completion separately. Only actual world events change the corresponding holders/records. | G1-G2-04, G1-G2-17, G1-G2-22 |
| **GA-R03 — Working draft, selected contribution, shared record** | PRESENT | **Design resolved.** Keep working draft, exact selected text/revision, performed text and lantern record distinct. Edits and previews cannot silently replace a contribution already selected or shared. | G1-G2-12, G1-G2-18, G1-G2-22 |
| **GA-R04 — Save the coherent current task** | PARTIAL | **Later dependency.** Restore actual task/parent scene, holders, physical state, reports, notices and exact text at acknowledged stable boundaries. No ghost item, repeated planting or implicit event completion. | G1-G2-22, G1-G2-23 |
| **GA-R05 — Interrupted movement and consequences** | PRESENT | **Later dependency.** Stop continuous motion/boat steering; cancel previews; settle an already-started atomic action once and pause later steps. Hard-crash recovery cannot guess unacknowledged transfer or independent exposure. | G1-G2-06, G1-G2-07, G1-G2-22 |
| **GA-R06 — Save failure, stale window, version migration** | PRESENT | **Later dependency.** Preserve storage failure, previous-snapshot recovery and stale-writer controls. Old completed saves cannot invent participation in the revised bakery/bird scenes; retain original run or explicit compatible mapping. | G1-G2-22, G1-G2-23 |
| **GA-R07 — Fresh start is safe and findable** | PRESENT | **Later dependency.** Start a new adventure is available from Pause during unfinished play and after completion. Confirm a separate named run, preserve the old one, and let Cancel keep the current game. | G1-G2-23 |

## S. Acceptance, demo readiness, and evidence

| Audit item | Original status | Group 1 disposition and resolved meaning | Later requirements |
|---|---|---|---|
| **GA-S01 — Replace the unsupported complete claim** | DEFECT | **Design resolved.** Group 1 completion means connected design only. Current gameplay acceptance remains rejected and all original audit accepted/complete flags remain unchanged. | G1-G2-24 |
| **GA-S02 — Tests use normal player discoverability** | DEFECT | **Later dependency.** Later tests must begin at normal discoverable controls and perform actual world interactions, including ordinary unsecured attempts. Synthetic seams cannot establish player discoverability. | G1-G2-02, G1-G2-06, G1-G2-21, G1-G2-24 |
| **GA-S03 — Every scene demonstrates a full interaction** | MISSING | **Later dependency.** Each of 34 events specifies encounter, information, decision, actor action, visible result, recovery and next purpose. Later acceptance must demonstrate those connected sequences in the real game. | G1-G2-02, G1-G2-24 |
| **GA-S04 — Complete route and branch coverage** | PARTIAL | **Later dependency.** Retain five physical histories, nine story outcomes, 45 combined design cases, three anchor recoveries, visit/plan variants and legacy 65 cue orders. These documents are not executed route tests. | G1-G2-06, G1-G2-08, G1-G2-14, G1-G2-16, G1-G2-24 |
| **GA-S05 — Visual and performance quality** | UNVERIFIED | **Later dependency.** Preserve final illustrated quality and required visual/performance evidence across all connected scenes. Geometry, rendering and cadence gaps remain open; documentation does not qualify them. | G1-G2-03, G1-G2-21, G1-G2-24 |
| **GA-S06 — Live AI and speech qualification** | UNVERIFIED | **Later dependency.** Live AI/speech and related qualification remain NOT_RUN here; preserve TASK11.19 at 1/75 and the existing TASK11.20/.21 and ER13 qualification gaps. | G1-G2-13, G1-G2-20, G1-G2-24 |
| **GA-S07 — Independent 9–12-year-old usability** | UNVERIFIED | **Later dependency.** The coherent design enables later independent 9-12-year-old usability review; completion and handler checks establish neither independent understanding nor reading improvement. | G1-G2-20, G1-G2-21, G1-G2-24 |
| **GA-S08 — Three-minute demonstration and runnable repository** | PARTIAL | **Later dependency.** The standalone complete chapter and actual four-part ending support a later three-minute demonstration/runnable repository. No demo, release, recording or publication is produced or authorized by Group 1. | G1-G2-19, G1-G2-24 |

## Additional connections isolated during Group 1

| Record | Gap | Agreed/derived resolution | Event |
|---|---|---|---|
| G1-X01 | Today's repair cannot explain withholding that incident before today | Sol's actual reply concerns his established older doubts about ordinary making/fixing. | G1-E28 |
| G1-X02 | Grandma's complete page could reveal undisclosed reasons/future cushions action | Complete the current conclusion only after actual reports/disclosure and bringing out the cushions. | G1-E28, G1-E29 |
| G1-X03 | Current-day Sol rehearsal could duplicate actual bread/repair/gift | Explicit world rehearsal of established events with preserved parent state and exact selection. | G1-E21, G1-E22, G1-E27 |
| G1-X04 | Treating assembled bridge as completed B could contradict later actual seed delivery | Legacy B includes the actual first crossing; pre-cross delivery remains F-B-P-L. | G1-E05, G1-E07, G1-E08 |
| G1-X05 | Mara's earlier story could move today's actors or inventory | Explicit earlier-story role; boy keeps bird, tape stays there, today's Pip/Mara and clock retain their parent state. | G1-E13, G1-E14, G1-E15 |
| G1-X06 | Old discovery questions contradict Pip's witnessed bakery knowledge | Use the exact audience-elaboration questions in E27; later information remains a distinct source. | G1-E27 |
| G1-RV01 | First-garden later-time request has no valid no-page/Sol-unvisited path | Actual report/request permits Grandma's early time agreement independently of page/Sol and of any earlier asking promise. | G1-E11 |
| G1-RV02 | Offer-to-ask and changing a communicated plan could silently complete obligations | Track asking, time agreement and affected recipients separately; only actual conversations update each commitment/expectation. | G1-E03, G1-E11, G1-E23 |
| G1-RV03 | Later/Pip or later/Mara could lack a permitted actual page | Actual gifted-copy handoff or existing-copy access precedes telling; no invented duplicate or mandatory permanent return. | G1-E03, G1-E23, G1-E26 |
| G1-RV04 | Partial anchor recovery could reset a valid attachment or create replacement stock | Neither/near-only/far-only cases preserve actual section and anchor ownership through safe retreat and rebuild. | G1-E06 |

These are additional design gaps, not replacements for the original GA IDs. The walkthrough identifies direct agreements and necessary derived corrections. Independent review also checked spontaneous time requests, witness-aware dialogue, delivery navigation/atomic boundaries, closing prerequisites and fresh-start availability; the event record and handoff now contain those rules.

## Unchanged execution and acceptance boundaries

No runtime, provider, browser, native, learner, speech or performance test was run to establish these design changes. The **45 physical/story combinations are design cases**, not playthrough results. Existing 65 cue-order coverage and all relevant later qualification remain required. TASK11.19 remains halted at **1/75**; recorded TASK11.20/.21 and ER13 gaps remain open.

The original task sequence is [implementation-plan.json](../design/evidence-quest-design-v3/11-build-packet/implementation-plan.json). Group 1/event/requirement references organize this design without replacing it. The complete chapter walkthrough is [here](GROUP-1-CONNECTED-ADVENTURE.md). Further work awaits Tony's instruction.

