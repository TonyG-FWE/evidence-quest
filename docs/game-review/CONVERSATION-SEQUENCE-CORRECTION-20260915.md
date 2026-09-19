# Conversation sequence correction

Tony approved this correction after reviewing the broken Mara interaction: a chosen reply must advance a normal conversation, with new choices appropriate to the next moment. Writing is offered when it serves that moment, rather than appearing automatically after every choice.

This work retains TASK11.07/.08/.09/.13/.14/.16/.21 ownership and the existing Groups 1–8 world sequence. It does not replace the implementation plan or claim the open provider, learner, art or device qualifications.

## Shared presentation

- One scrolling conversation contains the passage, named replies and the current choices. Character replies do not appear below navigation.
- Choices for a decision stay together. Completed decisions advance to acknowledgements and relevant follow-ups; explicit revision controls expose earlier alternatives.
- Compact previous/continue controls follow the conversation without an artificial blank spacer. World return is labeled “Continue to the game”; nested returns name their destination.
- A new decision focuses its heading. Returning from Help or word support restores the actual originating control. Typing does not advance the step or move focus.
- Optional reflections are deliberate disclosures, labeled as reflection rather than an unsolicited character question. Their answers do not advance the game.

## Connected sequences

| Interaction | Sequence and boundary |
|---|---|
| Mara’s later-time offer | Pip offers to ask Grandma → Mara explains the useful time → choose prepared relay or own wording → confirm message → return to the world. Preparing the message changes no report, possession, invitation or gathering time. |
| Message delivery | Pip physically reaches Grandma → opens the conversation → delivers the confirmed words → Pip’s actual wording appears → Grandma responds → choose the next planning step. The delivered words are a separate saved snapshot. |
| Own wording | Draft and chosen method survive Help, return and reload. A blank draft can be replaced with prepared wording. Delivery is not a claim of semantic correctness: the dock account is separately identified before Grandma responds from its facts. Live AI is not required. |
| Mara’s page | Actual handoff → Mara’s acknowledgement → offer a return story where relevant → carry the page to Grandma. Another arrangement is an explicit discussion, not an unfinished-looking alternate initial task. |
| Rina | Read the problem and tile instructions → choose to help or look around → Rina gives permission → return to the tile shelf in the world. Pickup, delivery, roof repair, flour, baking and thanks retain their physical steps. |
| Sol | Read his draft → choose to develop it or bring it unfinished → acknowledge that contribution → report it or deliver the current invitation. Changing the contribution is explicit. A current invitation is not offered again as pending work. |
| Ending composition | Write or use prepared support → rehearse the exact selected text in the world → accept → Sol acknowledges the chosen ending → continue the conversation or deliberately revise. |
| Grandma | Planting, message/page delivery, reporting Sol and planning are grouped visit choices. Completed actions disappear from the active group; her next reply remains in the conversation. Lantern history is optional and explained. |
| Planner | Choose time and reader → preview/confirm in the world → show the selected plan and the next real task. Changing the plan reopens its choices. Beginning appears when the actual arrangements are ready. |
| Gathering | Ask about bread or thanks → hear Sol’s real speaking turn → see his response → choose a relevant ending, ask the remaining question, or keep the draft. Asked questions no longer remain as the initial menu. |
| Grandma’s ending | Preserve disclosure → cushions → completed account → world telling → memory → actual closing and, where needed, copy delivery. |
| Loop | Group watch/narrate/explore choices. Optional reflection is separate and deliberate. Reading help returns to the same world picture. |

## Verification record

The supplemental Garden cases retain the existing fixture families: FIX11.NPC/SEARCH/RECAP for dialogue context and actual outcomes, FIX11.ACCESS/OPEN/MOVE for reading and physical travel, and FIX11.SAVE_INTERRUPTED/SAVE_RECOVERY/RESET for saved progress. Imported fixture definitions are unchanged.

| Existing ownership | Existing check bindings | Current evidence |
|---|---|---|
| TASK11.07/.08/.09 | CHECK11.CONTENT / EXPOSURE / STORY | Named inline dialogue, context-specific grouped choices, exact source rereading; `garden-sequence.spec.ts` and `garden-continuity.spec.ts`. |
| TASK11.09/.14 | CHECK11.RECORDS / SAVE / INTERRUPT | Prepared versus delivered message, exact delivered snapshot, support/reload and prior-save compatibility; `garden-message.test.ts`, ordinary relay routes and independent saved-payload review. |
| TASK11.09/.13 | CHECK11.ROUTES / RESOURCES / PAYOFF | Physical page/seed/bridge/bakery/invitation/arrival/ending sequence; all nine `garden-chapter.spec.ts` outcomes and focused bakery/gathering/Mara routes. |
| TASK11.07/.21 | CHECK11.G06 / X01 / X02 / VISUAL | One scrolling conversation, adjacent navigation, 28px roomier text, word support and explicit clicked-control focus restoration in Chromium, Firefox and WebKit. |
| TASK11.16 | Existing connected contract/browser acceptance checks | Required install/build, 103 contracts, 23 authored checks with no provider calls, dated browser reports and independent native review. |

The dated implementation/evidence directory is `evidence/conversation-sequence-20260915/`; independent review is `evidence/conversation-sequence-review-20260915/`. Their candidate receipts and final verification records determine which checks passed on which build. Earlier failures and superseded builds remain dated rather than being relabeled.

No source-read quota, answer gate, forced mistake, mandatory microphone or provider call is added. Original canonical source words and art are preserved. TASK11.19 remains halted at exactly 1/75; live feedback, learner outcomes and existing qualification gaps remain open. User saves on 4192 and 4200 are not reset.
