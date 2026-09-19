# D034: current goals, next steps, and visible progress

Revision 2, September 13, 2026. Tony replied "Yes" to the demonstrated goal card, action-based updates, destination help, Grandma-first adaptation, and Story so far recap. Those shown details are agreed. This extends [D033's opening](D033-OPENING-AND-FIRST-ACTIONS.md) through the first encounter. Subsequent D035 revision 2 accepts the later progression and completes R07 at guidance-design scope. Full controls, layout, source mapping, and save implementation remain with their later topics. File-only interrupted-reading and camera/access details have not been promoted to agreement.

## The problem to solve

The child needs to know what Pip is trying to do, where to begin, what has changed, and what remains unfinished after exploring elsewhere. An acquired page must not displace the planting promise. Guidance must follow actual events and known information. A suggested next action should lead into the challenge while leaving its solution to the child.

## Agreed presentation

Keep a small goal card visible while the child controls Pip. Show the current story goal and one suggested next action. When Pip takes on a related unfinished task, add a short reminder. The first example is:

> **Reach Grandma's garden and plant the seed together.**
>
> Next: Talk to Mara at the dock.

After Mara actually hands Pip her page:

> **Reach Grandma's garden and plant the seed together.**
>
> Next: Look at the garden boats.
>
> You're carrying Mara's story for Grandma.

The shown delivery reminder accompanies the main planting goal. Its exact replacement at an interrupted handoff/sharing boundary remains state/copy work; it cannot claim Pip still holds a page he has handed over. Existing no-score/no-clue-count boundaries remain. Exact placement, density, readability during dialogue, and overlap with construction feedback belong to R15-R17; this is an agreed guidance interaction, not final screen artwork.

## First-encounter objective table

These rows demonstrate the suggested Mara-first route under the stated conditions. The fresh goal, handoff reminder, usable-crossing instruction, planting-to-sharing goal change, and post-sharing Sol suggestion were shown and agreed. The interrupted-reading row and precise conditional implementation remain open. This is not a compulsory event order or exhaustive state machine; a later build packet must specify the relevant combinations and exact task owners.

| Actual situation | Current goal | Suggested next action / reminder |
|---|---|---|
| Fresh river entry; Pip has the seed; no Mara conversation or usable crossing yet | Reach Grandma's garden and plant the seed together. | Talk to Mara at the dock. |
| Mara has actually given Pip her page and permission; planting still unfinished; crossing not usable | Reach Grandma's garden and plant the seed together. | Look at the garden boats. Secondary reminder: You're carrying Mara's story for Grandma. |
| The child is working on the crossing | Reach Grandma's garden and plant the seed together. | Use D030's instruction and actual gap/loose-end feedback in the current interaction. Do not reveal the narrower-location solution in the goal card. Exact card visibility while arranging remains layout work. |
| Crossing is actually usable; Pip is still on the starting bank with the seed and page | Reach Grandma's garden and plant the seed together. | Guide Pip across to Grandma. Retain the page reminder. |
| Pip reaches Grandma with the seed and plants it with her; the carried page has not been handed over or shared | Share Mara's story with Grandma. | Talk to Grandma. The planting promise is complete; the story contribution is still pending. |
| Page has been handed over/opened, but the accepted sharing interaction is unfinished | Share Mara's story with Grandma. | Continue the actual D015 interaction or return to it after leaving. Exact interrupted-reading reminder is still open; page possession/opening alone cannot mark sharing complete. |
| Mara's first sharing interaction is complete and its lantern contribution exists; Sol has not yet been visited; his workshop location is established through the scene or prior information | Find out whether Sol wants to share a story. | Visit Sol's workshop beside the garden. Do not reveal why he has stayed away or how his story ends. |

The crossing stays where the child built it. The planted seed and actual lantern contribution remain visible in the world. Help can also summarize completed events. These changes are consequences of real actions; no points or learning assessment are inferred from them. Exact contribution completion/source events retain their existing distinctions and need explicit mapping before implementation.

## Finding the suggested place

The agreed **Where is that?** control briefly points out the suggested known destination and its name. The child then guides Pip there and works out the challenge. Precise camera return and off-screen behavior were file-only details and remain to be specified; this locator does not itself perform a story action.

It does not assemble boats, select the narrow bank, cross the river, teleport Pip, reveal a private character motive, or disclose unknown story facts. Only an established place can be shown. Off-camera treatment, alternative nonvisual directions, focus, motion preferences, and exact camera behavior remain R15-R17 work. Do not infer those from this suggested label.

## Taking another route

The child can inspect the boats before Mara, or cross and follow D025's Grandma-first visit. Do not require a return to Mara before allowing the already-agreed planting interaction. For the demonstrated Grandma-first route:

1. Retain the seed/crossing state and let Pip plant with Grandma.
2. Use Grandma's already-agreed account and Pip's offer to ask Mara.
3. Then the suggested next action can become **Talk to Mara at the dock.**
4. When Mara later gives Pip her story, guide the actual return and sharing. Do not repeat the planting task or pretend Grandma already knows Mara's explanation.

For a Sol-first visit, preserve the agreed D023 work and actual report. Do not announce Sol's private reason to Grandma until an actual allowed exchange supplies it. Full combined-state priorities, all prepared/draft variants, and subsequent planning guidance still require the rest of R07's table.

## Returning after a break or losing the thread

Add the agreed **Story so far** within D033's Help. Use short statements about actual events, alongside the current goal. The shown and agreed example after planting, while Pip still holds Mara's undelivered page:

> You and Grandma planted the seed.
>
> Pip has Mara's story. Grandma hasn't heard it yet.
>
> Next: Talk to Grandma to share Mara's story.

Only use this example if those exact events are true and Pip is still at the garden. If elsewhere, the next action must account for the route back. If the page has already been handed over, do not claim Pip still carries it. If Sol has already been visited, keep his real preparation in the recap and avoid sending the child back to repeat it.

The recap is for the player. It cannot update what a character knows, count as reading the original sources, complete a delivery, or claim understanding. Returning to a saved game uses actual restored progress; loading/version/error recovery is still R19, not an implemented feature of this document.

## Later progression and remaining detailed work

The presentation is agreed. [D035 revision 2](D035-CHAPTER-PROGRESSION-AND-ENDING-GUIDANCE.md) subsequently accepts the shown later objectives, preparation/notice guidance, actual gathering and closing progression, and studio presentation. [The R07 consolidation](R07-OBJECTIVES-AND-PROGRESSION.md) records the completed discussion scope. Exact combined-state wording, interruption handling, and technical mapping remain open; the accepted guidance does not invent character knowledge or conflate chapter completion with playback.

Then connect the agreed guidance to source/possession/report/contribution and event-boundary owners in the existing TASK11 contracts. Full layout, controls, accessibility, save behavior, and evaluation remain with their assigned checklist topics. No new implementation sequence, runtime changes, provider request, or agent message is authorized by this proposal.

## Requirements from the demonstrated agreement

| Requirement | Agreed behavior | Evaluation scenario |
|---|---|---|
| D034.REQ01 | Show the small current-goal card and one suggested next action; after Mara's real page handoff retain the exact planting goal and add the shown carrying reminder | D034.AC01 |
| D034.REQ02 | Update the shown guidance after a usable crossing, actual planting, and actual Mara sharing; retain the visible crossing, rooted seed flower, and real lantern contribution | D034.AC01 |
| D034.REQ03 | Where is that? briefly identifies the suggested known destination by name; the child still moves Pip and solves the challenge | D034.AC02 |
| D034.REQ04 | Adapt to the shown Grandma-first visit without forcing the Mara-first suggestion or repeating completed planting | D034.AC03 |
| D034.REQ05 | Help includes Story so far with brief actual-event statements and a useful next action; use the shown planted/held-page/unheard-story recap only when true | D034.AC04 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D034.AC01 | Follow the shown Mara-first encounter; actual actions update the exact goal/reminder; acquiring or opening a page alone does not satisfy sharing; physical and story results persist | NOT_RUN; exact goal/source/ownership and interruption mapping pending |
| D034.AC02 | Request the suggested destination; recognize its name/location and retain control of Pip; no solved construction, teleport, or undisclosed story answer appears | NOT_RUN; camera, input, motion, and access contracts pending |
| D034.AC03 | Reach Grandma first, plant, then follow her agreed conversation toward Mara; receive the real page and return without repeating the planting task | NOT_RUN; complete combined-state priorities pending |
| D034.AC04 | At the stated planted-but-page-undelivered state, open Story so far and see the exact factual recap; later completed actions replace stale reminders | NOT_RUN; full recap variants and restored-state mapping pending |

Agreement AGREED_DEMONSTRATED_GUIDANCE; specification COMPILED_DIRECTION for D034.REQ01-05; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. No runtime, imported-source, provider, commit, or agent action occurs in this review.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed first-encounter guidance, destination help, alternate visit adaptation, and recap | Pending at the time |
| 2 | Accepted the shown guidance and copy; retained file-only and remaining chapter details as open | Tony: "Yes" to the demonstrated guidance and question about direction with room to explore |
