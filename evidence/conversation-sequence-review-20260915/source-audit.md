# Conversation sequence: independent source audit

**Status: audit complete; implementation and candidate verification pending.**

This reviews Tony’s newly approved sequence correction within the existing TASK11 ownership. It does not extend the earlier continuity PASS to this new requirement. The reviewer changed no runtime or test file, ran no build, and accessed neither user save origin nor a provider.

## Finding

The current application often updates a fact without advancing the conversation. Its source, choices, optional writing, navigation and NPC acknowledgement occupy different areas. A selected option disappears, but the other original option can remain as though it still needs completing. The correction needs an explicit next conversational step as well as a layout change.

Recommended presentation order: **current speaker → relevant context → all choices for this decision → compact previous/continue or return controls**. A selected option leads to its acknowledgement and the next decision. Returning to an earlier choice should be an explicit review/change action, not an unfinished-looking alternate task.

## Coverage and gaps

| Scene | Current gap or behavior | Required next sequence |
|---|---|---|
| Shared reader | `ChapterContent` puts choices in the reading area, while Mara, bird and some Grandma choices sit in a separate footer. `s.notice` dialogue is appended after Back/navigation. The footer scrolls independently; the reading area expands to fill unused height. | One conversation flow and one conversation scrollbar. Put current NPC replies before the next choice group. Keep navigation compact and adjacent to the content; no bottom-anchored empty gap or separately scrolling choice footer. |
| Mara: later-time choice | `OFFER_LATER` records `asking=pending`; the unchosen page offer stays visible. The automatically opened later-time writing prompt is a feedback exercise, not preparation of a message for Grandma. | Acknowledge the later-time request, then offer prepared relay / relay in the player’s own words together. Save the selected preparation and return to the world. Do not mark Grandma informed or the time changed at the dock. |
| Mara: page choice | Taking the page and offering to carry a return story are legitimate actions, but subsequent options and acknowledgements are fragmented. Both primary approaches can look like pending work. | After the actual page handoff, show Mara’s acknowledgement and the relevant follow-up decision together. Preserve later gathering changes through an explicit revisit/change action. Preserve the ability to obtain the page later when a later gathering selects Pip as reader. |
| Grandma: actual report | The current report has an always-open optional textarea; both continuation buttons dispatch the same `REPORT_MARA` event. Typed words are stored as feedback answers, not as a selected and delivered report. | Physically reach Grandma, choose/deliver the prepared message or the saved own-word message, show Pip’s actual words, then Grandma’s reply and next relevant choice. Keep report preparation, report delivery and page possession separate. |
| Grandma: other decisions | Planting and page delivery are in the footer while reporting, asking for a later time, reporting Sol and planning are in the reading body. Several unrelated choice groups can accumulate. | Present the currently relevant visit decisions together. After one is performed, advance to its acknowledgement and next decision. Keep planting, page handoff, reading, story performance and planning as their existing distinct actions. Preserve Grandma-first and no-page visits. |
| Rina | Permission correctly advances the bakery to fetching the tile, but the acknowledgement is below navigation. The next meaningful physical step is only apparent after leaving the reader. | Introduce the problem and spare tile, group help/look-around choices, show Rina’s permission in the conversation, then return to the world with the tile-shelf task. Keep pickup, delivery, roof repair, baking and accompanied thanks as physical actions. No routine own-word textbox is needed. |
| Sol: contribution choice | Finish together / bring draft remains after a contribution is selected. Choosing finish opens the writing workspace immediately; prepared help is buried inside a disclosure. Acceptance and invitation can coexist with the original decision. | Acknowledge the chosen contribution, then show the next relevant decision. Offer own writing and prepared support where the child is actually composing an ending. Keep rehearsal separate from accepting an exact contribution. After acceptance, advance to report/invitation as appropriate; use an explicit change-ending action for revision. |
| Sol: invitations and reports | The same invitation button remains when Sol already knows the current time. His current reply can be suppressed in the body and rendered after Back. | Show the current agreement and next action. Only require a renewed invitation when the actual plan changed. Preserve reporting at Grandma and exact chosen-contribution ownership. |
| Planner | Draft time/reader controls, preview, committed-plan status and Begin are shown together. Selecting a pressed option does not itself commit the plan; Begin can still say a plan must be chosen. | Keep both options for the current planning decision together. Preview/confirm through the existing preview activity, then show the agreed plan and the next real invitation/report step. Label an explicit change-plan path. Begin only represents the actual ready-to-begin stage; no comprehension or answer gate. |
| Gathering discussion | Bread/thank-you questions are one group, add-ending buttons appear among prior source sections, and Keep draft is separate. Asked questions remain presented like the initial menu. | After the real speaking turn, show Sol’s response, then group the relevant next options: add/share that ending, ask about the other event, or keep the draft. Previously asked material may remain rereadable. All prepared/developed/unfinished outcomes remain valid. |
| Grandma’s account, memory and closing | The physical disclosure → cushions → finished account → telling order is already explicit. Memory alternatives and confirmation are connected. | Preserve this order. Apply the shared reader/nav correction without turning world actions into automatic dialogue completion. Usual-time copy pickup, walking back and Mara’s receipt must remain separate. |
| Loop | Watch/Narrate are correctly grouped and launch the corresponding world activity. A default own-word reflection competes with that mode decision. Replay is valid after completion. | Keep the mode choice together and advance into the show. Make reflection an intentional optional activity. Label completed-show choices as replay/explore, while preserving picture position, reading help and previous/next behavior. |

## Important implementation boundaries

1. **Do not use `s.notice` as the durable conversation step.** It is cleared by navigation and reading transitions. Derive or store the selected intent and next step in validated chapter state; keep transient announcements separate.
2. **Prepared is not delivered.** Preparing a relay at Mara cannot set `maraReported`, `grandmaHeard`, the agreed time, an invitation or a completed action. The existing proximity checks and world travel remain authoritative.
3. **Own words need a delivered snapshot.** Preserve the editable draft separately from what Pip actually said. Later typing, feedback, switching methods or reopening Help must not rewrite a past delivery. Do not claim semantic correctness or tailored understanding from an unchecked response; use a truthful authored acknowledgement and retain the canonical source for rereading.
4. **No required AI or correct answer.** Own-word writing belongs to the chosen relay/composition/reflection activity. A prepared route and ordinary continuation remain available. Feedback cannot choose the branch or qualify the reply.
5. **Changing a choice must be intentional and reversible where the story permits it.** Do not permanently exclude an existing valid gathering arrangement to solve the stale-menu problem. Preserve saves containing both an earlier page handoff and a later-time promise.
6. **Keep source words and exposure intact.** Speaker scaffolding, the player’s message and NPC replies are not new canonical source paragraphs. Source rereading remains read only, including beside its author.
7. **Treat step transitions as reading/focus transitions.** The current focus, audio cancellation and exposure effects depend on panel/part, not on a new decision step. A choice can change content without changing the panel. Restore attention to the new speaker/decision, retain word-help return and avoid reusing an unrelated step’s scroll position.
8. **Update persistence validation and old-save restoration with any new state.** Do not infer delivery from an old feedback draft or erase actual commitments. Existing completed endings and physical state must remain unchanged.

## Bounded verification coverage for the next candidate

- Later-time choice: acknowledgement precedes the paired relay-method choices; the unchosen original page offer is absent from the active next step.
- Both relay methods: prepare at Mara, leave, repair/cross as needed, physically approach Grandma, explicitly deliver, then see her response and next choice. No earlier report/time mutation.
- Own words: Help, Back and reload preserve the chosen method and draft; actual delivery preserves its exact text independently of later edits. Empty own-word drafts retain a prepared/return path.
- Page-first, Grandma-first, no-page report, old opened-only Mara save, existing page-plus-later promise, and already completed saves remain usable.
- Rina permission leads to the tile task; all physical bakery actions remain connected; no stale help menu or acknowledgement below Back.
- Sol draft/prepared/own ending: each selection advances; explicit revision remains possible; exact selected text survives rehearsal and later draft edits; current invitations do not look unfinished.
- Plan changes still require the relevant real invitations; planning preview does not itself notify anyone.
- Gathering bread/thanks/keep-draft follow-ups appear together after the corresponding world reply. All nine Mara/Sol ending combinations remain valid.
- Grandma’s disclosure, cushions, account, telling, memory and both closing routes retain physical order.
- Loop watch/narrate, pause/reading help, completion, replay and optional reflection retain their distinct behavior.
- At normal and largest/roomier text, desktop and 320×568: one conversation scrolling surface, no independently scrolling footer, no large artificial gap, visible NPC reply before choices, reachable compact navigation and word-help return.
- Keyboard/focus, interrupted audio, source exposure, Help/backpack returns, and reload work at each new decision step. No source-read quota, forced mistake or answer gate is added.

## Source binding

The [16-file snapshot](source-baseline.json) freezes the audit inputs. Fourteen files matched the previous `GardenApp-C_gM6ax5.js` candidate’s source hashes. `GardenApp.tsx` and `garden.css` were already under revision when captured; their exact captured bytes are retained, so this audit does not claim that the snapshot as a whole is the earlier compiled candidate.

Key anchors in the snapshot: [reader composition and footer](source-baseline/GardenApp.tsx), [Mara decision conditions](source-baseline/ConversationControls.tsx), [Grandma/Sol/planning/Loop branches](source-baseline/ChapterPanels.tsx), [state transitions and proximity guards](source-baseline/chapter.ts), [physical bakery steps](source-baseline/bakery.ts), [gathering decisions](source-baseline/GatheringPanels.tsx), [optional feedback draft](source-baseline/FeedbackActivity.tsx), and [reader layout](source-baseline/garden.css).

Existing source/art/save protections and TASK11.19 HALTED at 1/75 remain in force. No runtime acceptance is claimed by this source audit.
