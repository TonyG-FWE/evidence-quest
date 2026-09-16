# Group 2: Rina's connected bakery story — source review notes

Status: **ONE CONCRETE HANDOFF DEFECT FOUND AND CORRECTED IN SOURCE; FINAL CANDIDATE BINDING PENDING**.

Scope: the approved present-day bakery correction, including meaningful decisions, physical consequences, return from reading, save compatibility and evidence boundaries. No Group 3 work is included. Runtime changes, tests/builds, browser sessions, provider calls, subagents and Git mutations were not performed by this reviewer.

## Evidence and authority

`group-2-source-1.json` records 50 source/contract/test-definition copies at 2026-09-16T04:07:08.2618921Z. All copies matched their working files immediately after capture. The snapshot includes the seven requested files plus their garden state/reading/persistence dependencies, existing bakery test definitions, and these contracts:

- `GROUP-5-BAKERY-PACKET-20260915.md`: current-day repair, dry flour, baking, accompanied thanks, exact Sol manuscript, actual resource states and compatible old saves. Existing TASK11.02/.05–14/.16/.21 and their CHECK11/FIX11 bindings remain authoritative.
- `R15-CONTROLS-AND-PHYSICAL-STATE.md`: commands operate on actual people/materials/previews rather than prose-only outcomes.
- `R19-STATE-SAVE-AND-RECOVERY-CONTRACT.md`: stable commits, exact contributions, interruption settlement once, truthful recovery and no fabricated knowledge/completion.

Compared with the sealed Group 1 snapshot, the intersecting runtime changes are `bakery.ts`, `BakeryControls.tsx`, `bakeryWorld.ts`, `conversation.ts`, `GardenApp.tsx` and `model.ts`; `BakeryConversation.tsx` is new. Canonical source passages remain separate from the new connective dialogue.

## Actual state sequence reviewed

| State/action | Result and continuity |
|---|---|
| Arrival and offer | Original arrival source is presented first. The live follow-up identifies customers' orders and the actual spare tile. Permission is explicit; reading alone does not collect it. |
| Pick up/deliver spare | Location guards and existing transfers remain shelf → Pip → Sol. Sol uses his ladder and tools; Pip does not become the roof-repair actor. |
| Remove/preview/place tile | The same spare tile can be placed over the opening or beside it. Misplacement leaves the leak open and can be corrected with that same tile. Correct placement stops indoor water while outdoor rain continues. |
| Check flour | Rina's check and Sol's return to the workshop settle before the next conversation. The new dialogue correctly distinguishes stopping the leak from stopping rain. |
| Mix | The world action represents measuring, mixing/kneading and elapsed resting/rising time. It reaches `mixed`, with no loaf granted. |
| Shape and bake | The player can shape immediately and bake successfully. Optional questions and a failed batch are not prerequisites. Successful baking alone creates the baked-loaf state. |
| Bake the whole lump | The optional action returns `mixed → checked`, records an actual unshaped batch and leaves `loaf='none'`. The roof, tile, dry-flour checkpoint and Sol's workshop position are retained. The world keeps an uneven batch aside. The next action is making fresh dough, not replaying the roof repair. |
| Take loaf/escort/thanks | Rina carries the actual loaf and waits when Pip leaves the path. The thank-you handoff requires both actors near the workshop. Only that completed handoff sets loaf ownership to Sol and bakery stage to done. |
| Continue with Sol | The corrected button closes the live bakery conversation before starting Sol's live talk. His original manuscript, further account, child draft and selected contribution remain separate. |

## G2-F01 — Bakery-to-Sol handoff entered the wrong kind of reader

**Found in snapshot 1; corrected in the subsequently read working source.**

The done-stage button originally sent `TALK('sol')` while the bakery panel was still open (`BakeryConversation.tsx:70`). `enterReader` pushed a parent frame with `panel='bakery'`. `accountReading` treats a source opened from another reader as a reread, so `activeConversation` became null and Sol's live contribution choices were hidden. This affected the normal new end-to-end bakery route, not merely a malformed state.

The corrected handler captures its actual opener, sends CLOSE, then sends TALK for Sol. This removes the bakery parent before entering the live conversation while preserving the existing distinction for deliberate account rereads. The reviewer inspected the correction; the implementation owner is verifying the actual browser handoff.

**Bounded acceptance:** Complete the physical thanks, choose Talk to Sol, finish his live conversation and see both the finish-together and bring-the-draft alternatives without having to back out manually to the world.

## Other focused findings

- The owner's planned restrictions were already present in snapshot 1: historical `earlier-chapter` bakery saves reject `unshapedBatches`, and the current Talk with Rina control is shown only in walk mode, not roof-repair mode.
- The new failure field is optional for existing connected saves. If present, it must be an integer from 1 through 100 and the bakery must have reached at least checked. It cannot create a recorded failure in an earlier stage or an unrecorded historical edition.
- The existing action history prevents the same started action from settling twice. The optional batch failure is applied in the same serialized action settlement as successful baking. Support/interruption follows the existing settle-once rule; a pending preview remains distinct from a placed object.
- Stage-specific conversation is tied to the actual bakery stage. Optional contextual questions are disclosure/read operations; none writes an answer, grants a tile/loaf, advances a stage or asserts learning.
- New `Reply`/`ReadingParagraph` dialogue is dynamic authored text. It does not replace source paragraphs or receive canonical source exposure IDs. `unshapedBatches` records an actual action outcome, not inferred misunderstanding or mastery.
- The new world mesh and stage renderer represent the set-aside uneven batch. This is source wiring evidence only; it does not qualify visual legibility, rendering quality or animation on a device.

No additional concrete source defect was found in this focused review. This is not a claim that unexecuted runtime or qualification cases pass.

## Bounded acceptance for the owner

1. **Successful first attempt:** repair → check → mix → shape → bake → carry → thanks → live Sol conversation. No forced wrong tile, failed batch or question/answer gate.
2. **Wrong tile:** place beside the gap; actual leak remains; move the same tile to the gap; no duplicated spare or false repaired state.
3. **Wrong batch and retry:** mix → bake whole lump → checked; uneven batch visible, no deliverable loaf, roof still repaired; mix again → shape → bake normally. Repeated optional retries remain recoverable.
4. **Reader/world return:** each action started from Rina's conversation takes place in the world and returns to the relevant next exchange. Taking the loaf returns to walking with Rina. The corrected Sol button enters live talk, not an account reread.
5. **Interruption and reduced motion:** help/pause/view interruption during repair, mixing, failed baking and taking the loaf settle a started atomic action once, restore the stable stage/actors and do not invent a second batch or gift. Reduced motion preserves the same outcomes.
6. **Reload/compatibility:** reload after a failed batch, during retry and after thanks. Old connected saves with no failure field remain usable; valid historical saves remain historical; malformed historical/premature/noninteger failure counts are rejected.
7. **Source and choice boundaries:** open/close optional questions and reading tools, including inspecting both dough choices. No stage, resource, delivery, source-exposure or learning claim is granted by inspection alone. Original Sol words and all valid contribution choices remain available.

The reviewer has not executed these cases. Final source approval will bind to the sealed candidate supplied by the implementation owner, and implementation acceptance still depends on its exact browser/handler results.
