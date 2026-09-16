# First encounter: Tony's playtest feedback

September 14, 2026. This is the first playtest amendment to the bounded Garden encounter. It records Tony's feedback, the authorized presentation corrections, and an unresolved gameplay decision. It does not approve a new full-chapter design.

## Checklist

- [x] Give the alternative story action the same visible button treatment as the first choice, using a distinct color. Green and blue distinguish choices without labeling correctness. Apply consistently to Mara, the boat note, Grandma's page handoff and the completion reader.
- [x] Make hints and changing action feedback easy to notice. Show one labeled, high-contrast status area above the scene; make requested hint controls prominent gold buttons. Keep the live region stable, do not move keyboard focus, and respect both reduced-motion settings.
- [x] Keep help truthful to the current state. A completed bridge must not receive the wide-gap hint. When the remaining objective is collecting Mara's page, Where is that? must point to Mara. Requested help remains assistance, not source exposure or mastery.
- [x] Keep Places & scene description inside the scene, clear of the compact boat controls; its expanded contents remain scrollable.
- [ ] Review the complete story flow with Tony. His comment that the encountered functions work is not acceptance of the entire game.
- [ ] Agree how interpreting the reading changes a player's plan and its actual consequences. Do not implement this decision or issue it to another agent before that discussion.

**Later scope clarification, September 14:** Tony then asked whether this was the complete agreed story. It is only the first encounter. D049/D050 already specify explanation opportunities and story-sharing plans; D024 specifies actual invitation changes and consequences; D026/R18 specify the complete chapter. Those approved decisions remain authoritative. The unchecked item above records the initial playtest concern, not a new approval requirement for implementing those existing decisions. First implement and review the approved full-story behavior; discuss any additional substantive change with Tony. See [the current implementation inventory](PLAYABLE-SCOPE-20260914.md).

## Current comprehension gap

The existing Mara account explains that her work hours changed before the storm, that she misses the garden, and that she must help the passengers off the last boat. The source is `src/garden/content.ts`, Mara's account. The current Take page action records a physical handoff. The current Report action then supplies Pip's correct explanation and marks Grandma as informed automatically. Neither requires the player to interpret the account. The later-gathering button currently produces a conversational reply only; the first encounter does not implement that gathering.

The river has actual wide-gap and loose-end failures. Those establish physical constraints, not story comprehension. Button presses, page visibility and successful delivery must not be reported as evidence that a child understood the reading. Merely adding a wrong button would still allow guessing through the interaction.

## One proposed interaction for discussion — not approved or implemented

**Exact existing passage:**

> Mara lowered the page. "I miss it. But my work hours changed before the storm. I used to finish before the storytelling began. Now I have to wait for the last boat to return. By then, everyone at the garden has gone home."

**Proposed player task:** Help Grandma plan how Mara can take part. The player uses the invitation and story page in the world to try a plan. Event order is chosen explicitly; reading time does not advance a clock.

**Proposed actions and visible responses:**

| What the player does | What the game would show | What the reading contributes |
|---|---|---|
| Delivers an invitation to the usual gathering, assuming repairing the bridge solved Mara's absence | Mara remains at the dock when the gathering begins. She says, "The passengers still need me here. I can leave after the last boat returns." The player can revise the invitation. | The work problem began before the storm; repairing the bridge alone cannot solve it. |
| Arranges with Grandma to begin after the last boat returns, then delivers that invitation | Once the passengers are ashore, Mara leaves the dock and joins Grandma. | Apply Mara's work constraint to event order. |
| Keeps the usual gathering and offers to carry Mara's page | Grandma can read Mara's contribution while Mara remains at work. Mara's wish to hear Grandma's stories is still unresolved until the player brings a story back. | Distinguish contributing a story from attending and hearing someone else's story. |

This proposal would require actual invitation, event-order, attendance and reciprocal-delivery states with visible consequences. It is not a new quiz, a required mistake, an arbitrary wrong-answer penalty or a learning claim. Multiple supported plans can succeed. It also needs Tony's review against the complete chapter before construction; it is recorded here so the unresolved design is not mistaken for implemented behavior.

## Existing ownership and verification scope

UI corrections remain under TASK11.06/.07/.08/.09/.15/.16/.21: CHECK11.VISUAL/X01–05/EXPOSURE/ROUTES, FIX11.ACCESS/NPC/RECAP and D081.R14.AC01–02. The existing Garden browser fixtures exercise both routes, the actual alternative buttons, unchanged possession/exposure after help, state-aware hints, compact layout and focus. Dated build/browser/visual evidence belongs in `evidence/garden-feedback-20260914/`; the original first-encounter receipts remain historical and unchanged.

No gameplay domain or source text is changed by this correction. TASK11.19 remains halted at 1/75. Existing performance, full-chapter and native-device qualification gaps remain open. Changes are local and uncommitted.

Final verification: production build PASS and 6/6 connected Chromium Garden fixtures PASS. Both playable routes, actual alternative-choice response, state-aware hints, source/possession preservation after help, compact layout/focus, save recovery and renderer restoration were exercised. The current 4192 preview's HTML and Garden asset hashes match the tested candidate. [Dated evidence](../../evidence/garden-feedback-20260914/verification.json). Tony's active tab was not navigated or reset.
