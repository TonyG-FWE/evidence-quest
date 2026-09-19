# Group 1 independent review: Mara's choices and the first garden visit

Reviewed September 15, 2026 UTC by the originating review task. This is feedback to the task that owns the Group 1 decision record. It does not approve a new story, change runtime behavior, or replace that record.

## Result

**Current review, September 15, final Group 1 pass:** All seven story/event findings G1-RV01-07 and the later E30/E33 prerequisite checks are resolved. The complete walkthrough, event record, 169-item crosswalk and 24-requirement handoff pass independent design review. No material Group 1 question remains. No runtime finding is closed by these written connections. Earlier sections preserve the original findings; the final disposition is at the end.

The three Mara arrangements remain coherent in principle. The current explanation does not yet supply a complete route from choosing **ask for a later gathering without taking a page** to the existing planning interaction. That is a specific missing connection, not evidence that the proposed ferry-attendant role is wrong.

At the initial review checkpoint, Tony had agreed that Grandma gave Pip the seed during an earlier visit; his question about the other dialogue choice was not occupation approval. He subsequently replied "ok" to the completed explanation, and the owning task recorded Mara's dock-attendant role with a separate boat operator as agreed. Do not reopen that settled role. His later "Yes, that works" accepted recovering the usable sections of Grandma's damaged footbridge with her maintenance ropes available nearby. He then accepted nearby collapse recovery with surviving fastenings. The seed boat's proposed ownership and preparation purpose are the current discussion.

## Findings requiring a concrete response

### G1-RV01 — The no-page first visit cannot reuse the demonstrated page-delivery/planning scenes unchanged

**Trace:** Pip hears Mara's work explanation → offers to ask Grandma for a later gathering → takes no page → crosses → plants with Grandma → asks about the time.

The current Group 1 explanation moves from this first visit to agreeing the time and notifying Sol. D015's first garden scene instead starts with Pip holding Mara's page and permission. Its opening says Mara asked him to share the page. D032's demonstrated planning scene starts after the page and work explanation have been shared, and after Sol has selected a contribution. Its opening report says Pip and Sol finished the story.

Those lines are false on the traced first-visit route. Referring to D032 establishes the later planning pattern; it does not supply this missing first-visit conversation. This does not prove that the runtime requires a page for every arrangement: its readiness logic correctly checks for a copy only when Pip is the reader.

**Needed in the joined scene record:**

- The actual report Pip can make without a page, and Grandma's response to that information.
- What happens to the request for a later time at this visit: is the time agreed here, or is the request carried forward to the later planning conversation? Resolve that explicitly rather than borrowing the wrong starting conditions.
- The reason Grandma directs Pip toward Sol, what Pip knows about Sol at that point, and the next task's wording. Neither Sol's contribution nor bakery work may silently become complete.
- A later/Mara route that never requires an unnecessary copy, early reading, or page delivery solely to unlock the scene.

This is the consequential sequence decision. Exact wording can follow the chosen sequence; it is not a reason to ask Tony to approve individual connective sentences.

**Evidence:** [D015 starting point](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/D015-MARAS-STORY-TO-GRANDMA.md:9>), [D032 prerequisites and report](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/D032-GATHERING-THROUGH-CHARACTER-INTERACTIONS.md:15>), [current joined explanation](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/GROUP-1-CONNECTED-STORY-REVIEW.md:160>), [reader-specific runtime prerequisite](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/src/garden/chapter.ts:33>).

Audit coverage: GA-C06/C09, GA-F01/F06/F07, GA-J01/J07.

### G1-RV02 — The offer needs a continuing purpose after the player leaves Mara

The current scene record calls the later-time offer an actual commitment to ask Grandma. The existing button only changes a local reply string. It does not dispatch a story event that records that commitment. The audit already identifies this problem; the new scene packet needs to turn it into a specific story requirement.

**Needed:** record what Pip has offered, keep that purpose understandable after leaving the conversation, and resolve it through the actual Grandma conversation. Asking, agreeing a time, notifying Mara, accepting a role, and attending remain separate events. Taking a page afterward must not silently erase the request or lock the usual-time route. This specifies story continuity; exact journal layout and persistence implementation belong to later groups.

**Evidence:** [later-time button](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/src/garden/GardenApp.tsx:173>), [current commitment statement](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/GROUP-1-CONNECTED-STORY-REVIEW.md:154>), [audit finding](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/A-TO-Z-IMPLEMENTATION-CHECKLIST.md:207>).

Audit coverage: GA-C06, GA-B06, GA-J01/J06/J07, GA-R02/R04.

### G1-RV03 — Specify the page transfer for the later/Pip route at the moment it becomes necessary

**Trace:** Pip chooses only the later-time offer → agrees a later gathering → asks Mara to listen while Pip reads → Pip still has no copy.

The current record correctly says that permission and a handoff must happen. It does not yet show that connected interaction. D032 explicitly warns that its listening example already assumes permission; a route without it needs its own request and handoff. The current invitation handler and page-transfer action are separate, so a role agreement alone cannot establish possession.

**Needed:** locate the actual request, permission, visible handoff, and next task in the scene. For the already-has-a-copy variant, retain the existing copy and skip duplicate acquisition. For later/Mara, specify which actual page Mara reads, including the variant where Pip previously delivered his copy to Grandma. Preserve D014's copy gift; do not invent a compulsory return of that gift.

**Evidence:** [D032's explicit alternative-route requirement](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/D032-GATHERING-THROUGH-CHARACTER-INTERACTIONS.md:75>), [current conditional handoff statement](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/GROUP-1-CONNECTED-STORY-REVIEW.md:162>), [invitation action](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/src/garden/chapter.ts:76>).

Audit coverage: GA-B07, GA-C07/C09, GA-J04/J07, GA-R02.

## Branch comparison to use while writing the joined scene

These are constraints from the existing agreements, not newly selected plot outcomes.

| Route | Actual preparation | Visible result at gathering | Remaining commitment |
|---|---|---|---|
| Usual time; Pip reads | Actual copy/permission, applicable information given to Grandma, Sol's contribution and invitation, Mara told the agreed plan | Mara remains at work; Pip shares her story | Grandma gives Pip her actual story copy; Pip carries and delivers it to Mara |
| Later; Mara reads; Pip never took a copy | Work conflict reported without inventing a page delivery; later time agreed; actual reading invitation; Sol prepared and informed; actual arrangements reported | Final boat returns; passengers disembark with Mara's help; Mara crosses and tells her story | Mara hears Grandma at the gathering; no absent-person delivery task |
| Later; Pip reads; no initial copy | Same later planning, plus an explicit request, permission and actual page handoff before Pip reads | Mara finishes duty, crosses and listens while Pip reads | Mara hears Grandma there; no duplicate copy collection |

## Counterexamples the completed Mara connection must answer

1. Choose the later-time offer only. Reach Grandma without a page and before meeting Sol. No character claims a delivery, reading, finished contribution, or invitation that has not happened.
2. Choose the later-time offer, then also take the page. Both completed actions survive; the initial offer is not an ending selection.
3. Choose later/Pip with no copy. The story naturally leads to permission and handoff before readiness; it does not first reveal that task as an unexplained final blocker.
4. Share Mara's page early, then invite Mara to tell it herself later. Keep the actual ownership history and one lantern record; do not fabricate a second acquisition or compulsory return of a gifted copy.
5. Tell Sol a later time, then change the plan before speaking to Mara. Only actual conflicting expectations need correction. Do not make everyone repeat unchanged conversations.
6. Complete the usual-time gathering and return Grandma's copy. Mara can receive it while still on duty; receipt is not evidence that she has already read or heard it.

For each trace, supply the exact relevant dialogue, the player's next action, the world response, and what remains to do. A prose assurance that an action 'must happen' is an open requirement until those connections are specified.

## Checks already satisfied in the current written record

- The opening ferry visit is explicitly an earlier service arrival, not the final return. Preserve that distinction in the child's eventual passage and world sequence; it is not a newly discovered missing fact. [Current record](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/GROUP-1-CONNECTED-STORY-REVIEW.md:130>).
- Mara finishes passenger assistance before leaving; bridge repair alone does not free her from work.
- The bridge-only dialogue proposal is distinct from an actual unsecured crossing and collapse. Do not add a mandatory mistake or treat a conversational correction as evidence that physical consequences are implemented.
- D024 already establishes targeted updates when plans change. Preserve those rules rather than reopening them. [Changed-plan cases](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/D024-CHANGING-THE-GATHERING-PLAN.md:71>).
- In the usual-time closing, Mara keeps the delivered page and will read it after the last boat returns. The delivery does not end her shift or complete that reading. [Actual closing](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/D020-GRANDMAS-STORY-AND-CLOSING.md:139>).

## Scope and handoff

The owning task should reconcile G1-RV01-03 in its scene record, retaining the distinction between missing dialogue, existing source constraints, and any material sequence decision requiring Tony. This feedback does not require reopening the approved seed origin or selecting Mara's occupation on Tony's behalf.

Review method: current source documents, current Group 1 record, the actual recent user/assistant messages, and targeted handler inspection. These are written-sequence counterexamples, not browser tests or learner evidence. No runtime, assets, saves, provider state, or shared decision record were changed by this review.

## Follow-up review: September 15, 2026, 00:53 UTC

The owning record now explicitly retains G1-RV01-03 and their six counterexamples. This is successful triage, not resolution: the no-page first-visit scene, continuing asking commitment, and conditional handoff still need their concrete joined interactions. Review them when that scene is reached; the bridge discussion does not require answering the first-visit timing question early.

### G1-RV04 — Retaining a fastened rope requires different recovery cases

The current recovery proposal would keep usable material nearby and retain any correctly fastened rope. Test that against **both** possible single-end attachments. Either bank can be fastened first in the existing rule: [FASTEN handler](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/src/garden/model.ts:149>). The existing collapse implementation instead resets both attachments and returns the pieces to Pip's starting bank; it does not establish the proposed retained-rope behavior: [collapse settlement](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/src/garden/model.ts:86>).

| State before the attempted crossing | Required consistency in the recovery proposal |
|---|---|
| Neither end fastened | Identify where both loose sections stop, why they remain recoverable, and what the player does to bring them back into position. Do not replace the same material invisibly. |
| Pip's bank fastened; Grandma's bank loose | If the proper fastening survives, the held section remains attached to Pip's bank. Show the loose part's movement and the rejoining/repositioning task. Do not claim both ropes came loose. |
| Grandma's bank fastened; Pip's bank loose | If that fastening survives, it remains on Grandma's bank. The held section cannot reset beside Pip while still attached there. Specify how the existing construction controls let the player release or reposition the actual material in the world while Pip stays safe; do not require Pip to cross the broken bridge to recover the means of crossing. |

The third case is the easily missed one. It does not require a new far-bank quest: the approved construction role already lets the child manipulate world pieces while Pip waits. The recovery explanation must use that role consistently and make the next action understandable.

For each case, account for Pip's retreat, each section, the join, both bank attachments, the next recovery action, and the renewed crossing attempt. If a retained fastening is released, that must be an actual visible action. Preserve the seed's actual holder, story-page ownership, and prior conversations; bridge failure does not restart those tasks or create new ropes.

This is a counterexample for the pending nearby-versus-downstream recovery discussion, not a selected recovery solution. Keep Tony's current decision with the owning task. Audit coverage: GA-B05/B07, GA-D06/D07/D08/D09/D12, GA-E02 and GA-R02/R05.

**Review disposition:** G1-RV01-03 are acknowledged and open for their joined scenes. G1-RV04 is sent for checking against the recovery proposal. No finding is marked implemented or accepted.

## Verification follow-up: September 15, 2026, 01:07 UTC

**G1-RV04 is resolved at the story/gameplay-rule level.** Tony accepted the demonstrated nearby recovery at 01:00 UTC. I checked the owning record's actual three-case table, rather than its acknowledgement alone: [neither-end and single-end recovery cases](<C:/Users/TonyGuillaro/OneDrive - Summit Gov Solutions/Documents/ChatGPT/Evidence quest/docs/game-review/GROUP-1-CONNECTED-STORY-REVIEW.md:283>).

- Neither end fastened: both original pieces remain visible in their respective shallow margins; both require recovery, rejoining and fastening.
- Only Pip's bank fastened: the near section retains that attachment; the far loose section remains at the far margin and is recovered through construction.
- Only Grandma's bank fastened: the held section remains at Grandma's post. Construction restores it there and recovers the near section; Pip does not have to cross to retrieve it.
- Any release needed for repositioning is a visible action followed by actual refastening. Section identity is independent of which bank it occupied in this attempt.
- The join fails in each case. Surviving rope alone does not make the crossing usable. Seed ownership, pages, prior conversations and the separate boat channel are retained.

This closes the specific narrative counterexample. Geometry, controls, animation and actual player recovery remain unverified implementation work. The existing reset-all handler remains incompatible with the approved rule.

**G1-RV01-03 remain open** for the first-garden and invitation scenes. No newly completed wording or interaction was supplied for those in this pass.

The current seed-delivery proposal was checked against its five physical histories. It explicitly distinguishes early receipt/preparation from planting, supports sending after construction but before Pip crosses, preserves carried-seed success, and leaves late empty-boat actions harmless. The owner/purpose proposal still awaits Tony. The exact launch/navigation mechanism is already identified as open in that record; it is not silently treated as specified by ownership or a travel animation. No additional question or duplicate feedback is warranted at this checkpoint.

## Verification follow-up: September 15, 2026, 03:33 UTC

The owning record now supplies the substantive connections requested by G1-RV01-03. This pass checked the actual scenes and state distinctions, rather than an acknowledgement of the findings.

| Finding | Verified written resolution | Remaining implementation or integration limit |
|---|---|---|
| G1-RV01 | The first-garden scene at lines 424-442 supplies actual planting, the lantern explanation, a no-page work report, Grandma's later-time agreement before Sol, and truthful variants when Mara is unmet, a copy is held, or Sol has already been visited. It does not borrow a false page-delivery or finished-Sol report. | The destination at lines 428/464 still says workshop/open chronology. The newly agreed first Sol encounter is at Rina's bakery. This is a routine connective correction already sent to the owning task; it does not reopen the early-time decision. World scenes and handlers remain unverified. |
| G1-RV02 | Lines 450-454 distinguish the offer, the actual asking, Grandma's agreement, each person's received information and later notifications. The asking commitment survives page collection, construction, travel and resume; taking the page does not select an ending. | Persist and present those actual events in the shared interaction and save system, then verify interrupted and changed-plan routes. The current local-reply-only action is not accepted. |
| G1-RV03 | Lines 748-761 give the actual no-copy request/permission and world handoff; already-held and Grandma-held copies remain the same page. Mara reading uses actual page access without a forced permanent return of the gift. Interrupted transfers leave possession with the last actual holder. | Implement and verify the handoff, reading placement and return of the actual gifted copy. The role choice alone still cannot count as possession. |
| G1-RV04 | The earlier three-case collapse record retains the actual bank attachment and original section identities. | Existing reset-all behavior still requires replacement and visible native verification. |

The invitation section at lines 763-779 also retains actual reporting, final passenger disembarkation before Mara's later arrival, the usual-time work distinction, and targeted updates after changed plans. These are design connections, not evidence that the existing rendered game performs them.

Additional integration checks sent directly to the owning task:

- Route the first-garden suggestion to the approved bakery encounter. Do not retain an unresolved chronology or send Pip to an unexplained empty workshop.
- The bakery's explicit baking-time transition remains within preparation. It cannot silently finish Mara's final service or impose a reading deadline. The existing record already states that the episode cannot complete another character's work; carry this into the complete event ledger.
- Pip witnesses repair, baking and thanks on the newly approved route. Later questions and AI source context must not treat those witnessed facts as unknown. Grandma still needs an actual report or telling. Sol's private doubt remains separate from the visible repair and loaf.
- Tony's actual 03:26:56 UTC reply chose player-guided tape collection and mending as Mara in her earlier account. That story-agency choice is settled. Keep the remembered boat and props separate from current passengers, inventory and gathering time, and return to the actual current teller/listener situation.

These checks use the current source record and the actual later user replies. No historical D document, runtime file, asset, save, provider ledger or acceptance checkbox was changed. All eight groups are still subject to their own bounded implementation and verification; completing this independent review does not mark Group 1 or the demo complete.

## Complete-walkthrough review: September 15, 2026, 03:40 UTC

Reviewed [GROUP-1-CONNECTED-ADVENTURE.md](GROUP-1-CONNECTED-ADVENTURE.md), including the fourteen-scene walkthrough, five physical histories, all nine outcome cells, changes of plan, object/knowledge ledger and binding dependencies. The new walkthrough correctly locates the first Sol encounter at the bakery. Its new Grandma/Sol exchange explains his pre-existing doubt about ordinary work rather than pretending today's repair kept him away before today. The final page, actual cushions action, delivery and Loop composition remain connected.

The following narrow corrections were sent to the owning task. They are routine integration details under the existing agreements, not new product choices for Tony.

| Review ID | Counterexample or gap | Required correction |
|---|---|---|
| G1-RV05 | The child hears Mara's work constraint, takes her page without making the later-time offer, then independently proposes a later time to Grandma. Walkthrough section 5 currently conditions the request on both having heard and previously offered. | Knowing the actual work constraint supplies the report/request. A previous offer creates a commitment to fulfill, but is not an extra conversation gate. If there was no offer, do not invent or require one retroactively. |
| G1-RV06 | Pip watches the bread being baked and accompanies Rina's thank-you visit, then hears Sol's draft at the gathering. Section 11 still gives Pip the old first-discovery questions: whether Rina baked or Sol heard from her again. | Supply exact, truthful discussion invitations that ask Sol to tell the listeners about those witnessed events. Preserve the two emphases, optional questions, adding an ending and the equally valid open draft. A statement that knowledge is preserved does not correct incongruous spoken lines. |
| G1-RV07 | The seed boat belongs to Grandma and carries the seed, but the earlier record explicitly left its launch/navigation mechanism unresolved. The complete walkthrough states travel without resolving that physical link. | Specify how the small boat is sent/guided and remains at its actual mooring, with any required world prop accounted for. Retain the clear channel, actual seed holder, no Pip transport and harmless later actions. Ordinary staging can follow the agreed delivery purpose; no extra resource quest is needed. |

Other checked boundaries remain correct in the written walkthrough: a second telling retains one Mara contribution; historical tape/bird never enter Pip's current inventory; Sol's rehearsal does not repeat the real repair or gift; a usual-time ending requires actual delivery but does not say Mara read it; the other two rows retain her actual reading/listening role. Source reference: D019, D020, D021, D040 and D042 together with the later Group 1 decisions.

At this checkpoint the event record, complete audit crosswalk and Group 2 requirement files were still being prepared. Their existence, coverage and consistency have not yet been verified by this review. Group 1 therefore remains in progress.

## Event-record review: September 15, 2026, 03:48 UTC

The new [event record](GROUP-1-EVENT-RECORD.json) contains 34 unique events, their required actor/information/choice/world-result/recovery fields, and 45 unique combinations of the five physical histories and nine story outcomes. All 142 audit IDs linked from events exist in the original checklist. These read-only structural checks passed; no browser or game behavior was exercised.

The semantic pass checked each event's prerequisites, choices, physical actions and state changes. E11 now permits a later-time request with or without a prior asking promise (RV05). E27 supplies witness-aware invitations to tell the listeners about bread or thanks (RV06). E07 supplies the child-director boat movement, docking, wrong-bank redirection and real cargo/cancellation rules (RV07). Mirror those details into the narrative walkthrough before final closure.

Two remaining event prerequisites were sent for a narrow correction: E30's final memory choice needs the actual closing invitation after Grandma's telling, not just an existing planting image; E33 must distinguish completed-outcome replay from the established Pause -> Start a new adventure action available during an unfinished run. Fresh-start cancellation and archival must preserve the current run. These are existing sequence/reset requirements, not new questions for Tony.

For the Group 2 handoff, continuous movement and atomic transfers need different interruption boundaries: pause does not teleport a navigated boat or guess an unacknowledged handoff. The existing R15/R19 rule settles an already-started committed atomic step once and pauses its next step. Preserve earlier saved chapters rather than inventing their participation in the new bakery and paper-bird gameplay.

## Verified correction closure: September 15, 2026, 03:52 UTC

Read back the 03:50 revisions of the complete walkthrough and event JSON. All seven named findings now have their story/event resolution in those current documents. The walkthrough mirrors the spontaneous request (section 5), witness-aware discussion (section 11), and directed boat navigation with separate atomic transfer boundaries (section 4). Its bakery destination and closing remain coherent.

E30 now explicitly requires Grandma's actual telling and closing/moment invitation. E33 separates existing-outcome replay from Pause -> Start a new adventure during an unfinished run. The matrix field is now `solHasEndingAfterSharing`, avoiding an unintended finished-ending preparation condition for the draft-discussion route. Every recorded TASK11 owner exists in the current implementation plan.

Disposition: **REVIEW_FINDINGS_RESOLVED_AT_DESIGN_LEVEL**. The forthcoming crosswalk/handoff still needs its own final check; runtime, browser and learner acceptance remain unverified for these changes.

## Final Group 1 independent sign-off

**PASS FOR CONNECTED DESIGN.** All four required deliverables now exist and have been reviewed. The [dated source amendment](GROUP-1-SOURCE-AMENDMENT-20260915.md) maps the approved changes and derived dialogue to the historical sources without changing their original bytes.

The crosswalk preserves all 169 original findings and acceptance conditions, with 130 design resolutions and 39 explicit later interaction/implementation/qualification dependencies. Its references resolve to the 34 events and 24 handoff requirements. All 19 source-group anchors and 96 original TASK11 dependency bindings match the original audit/implementation plan. The document-link check found 126 valid local links and no missing target. The event matrix contains 45 unique design combinations; these are not executed playthroughs.

The full semantic review covered every crosswalk row, the complete walkthrough, all event choices/world changes and the handoff. No unresolved material story decision or missing causal connection was found after the corrections above. Completing the design does not establish native interaction, game quality, independent child comprehension, live AI, pronunciation feedback or provider qualification.

The next dependency is Group 2's shared interaction system under Tony's later direct instruction to complete Groups 1-8 sequentially. The originating task will own its bounded implementation and the peer task will review it, preserving a single writer for runtime changes. Existing TASK11 ownership and the 1/75 provider halt remain in effect.
