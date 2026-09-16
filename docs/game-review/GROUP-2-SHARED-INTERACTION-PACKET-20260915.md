# Group 2: shared interaction system

September 15, 2026. **Bounded shared-interaction implementation and independent review PASS. Groups 3–8 remain open.**

Authority: Tony's originating-task instruction at 03:24:31 UTC to complete Groups 1–8 sequentially in direct collaboration. Group 1 is complete. Read the [source amendment](GROUP-1-SOURCE-AMENDMENT-20260915.md), [24 interaction requirements](GROUP-1-GROUP-2-REQUIREMENTS.md) and [event record](GROUP-1-EVENT-RECORD.json). Preserve the existing TASK11 dependency graph and the reviewed Three.js Garden trial specified in R17. This packet is a bounded correction within existing TASK11.06/.07/.08/.09/.10/.11/.13/.14/.16/.21 ownership, not a replacement task sequence.

## The interaction the player will experience

1. Approach a person or object in the world. The current role and available nearby action are visible; the keyboard and named controls use the same handler.
2. Read the situation and speak through clearly labeled responses. Replies name the speaker. Word help and reading practice remain in the reader.
3. Choose an action or prepare a proposed story contribution. Choice alone does not perform an unrelated world event.
4. Confirm the specific action. The reader gives way to the appropriate world activity. Its heading identifies who is acting and whether this is the present adventure, an earlier account, or a rehearsal.
5. See or perform the result in that world. Present-day movement, inventory, permission and event records change only through their actual handlers. A rehearsal cannot repair today's roof or send an invitation.
6. Return to the exact parent conversation or activity. Help, Pause, backpack and nested source reading must preserve the return path, reading position and focus. World movement stays stopped while a reader is open.

## This group's bounded build

| Work | Concrete behavior | Evidence |
|---|---|---|
| G2-I01: reader navigation | A bounded return stack preserves the parent panel and construction context. Closing Help from a source returns to that source; closing a source opened from the backpack returns to the backpack. Closing an encounter ends at the world. | Real reducer coverage and native nested-reader route. |
| G2-I02: focus and labels | Return controls name their destination. Keyboard focus returns to the originating control when it exists, otherwise to the restored view's heading/control. Enter/Space on a button does not also walk or talk. | Keyboard browser route and focused-element check. |
| G2-I03: world activity ownership | GardenStore owns a typed, temporary activity with its parent, actor, purpose and exact selected input. The reader does not own a second running simulation. | Handler isolation and ordinary entry/exit. |
| G2-I04: Sol rehearsal | Try an ending closes the reader and presents its exact text and selected picture in the world area. Use this ending explicitly selects that snapshot; returning without selection leaves the draft and prior selected ending intact. Stale draft snapshots cannot replace newer text. | Own/prepared input, cancel, select and stale-revision tests. |
| G2-I05: plan rehearsal | Preview shows the proposed arrangement in the world area. Preview alone sends no invitations and advances no clock. Confirmation returns to planning with only the agreed plan changed. | Invalid usual-time/Mara case and valid plan; recipient states unchanged. |
| G2-I06: interruption | Help/Pause stop activity animation/input. Return resumes the same context. Continuous movement and uncommitted construction previews stop; only an already-started atomic world step settles once under R15/R19. | Pause/Help/Back tests, no duplicate transfers or new achievements. |
| G2-I07: discoverability | Prominent current role, action instructions and notices support world activities. Confirm/cancel controls have explicit purposes; color is accompanied by text and focus states. Existing nearby actions and hints remain. | Desktop and narrow viewport inspection. |
| G2-I08: compatibility | New navigation/activity state is temporary. Existing durable runs and archives remain byte-compatible; no fabricated bakery or historical participation. Fresh-start confirmation and archive remain available during unfinished play. | Save roundtrip/regression; do not reset Tony's 4192 save. |

## Required support handed to the following groups

All 24 Group 1 requirements remain obligations of the complete build. This group supplies the shared entry/return/confirmation machinery. Group 3 adds accessible bridge placement and correct attachment-specific collapse/recovery, boat steering and planting. Group 4 adds current dock duty and the playable earlier Mara account. Group 5 adds the real bakery, permissions, tile handling, repair, baking and thank-you visit. Group 6 adds embodied invitations, arrivals and telling. Group 7 adds individual lantern payoff, reciprocal delivery and final presentation. Those encounter mechanics are not declared implemented by moving a picture into the world area.

The remaining existing reader miniatures in gathering/lantern/final presentation are explicitly assigned to Groups 6–7; they must be replaced by the appropriate world actions and records before acceptance. This group's rehearsal illustrations are labeled previews and cannot stand in for those events.

## Verification and limits

[Exact candidate and verification](../../evidence/group-2-interactions-20260915/verification.json) records 74 passing contracts, 23 authored coach cases with zero provider calls, required install/content/type/server/build checks, and 19 affected browser cases whose latest results pass across dated runs. [Independent native review](../../evidence/group-2-review-20260915/final-review.md) closes all seven findings. This is bounded acceptance of I01–I08, not a final full-suite run or complete-game acceptance. Actual current-day bakery work, boat steering, invitations, telling and lantern participation remain assigned below. Original source/import/lockfile bytes remain preserved.

Use real reducer handlers and connected browser interactions; label injected fixtures separately from ordinary play. Run the required authored/content/type/build/contract/browser commands with the existing reviewed lockfile, then inspect the changed experience through a separate owned loopback preview. Preserve pre-existing dirty work and historical evidence. Record exact candidate hashes and results in `evidence/group-2-interactions-20260915/` and update BUILD-STATUS by existing TASK11 ownership.

No provider calls, retry, model switch, ledger reset, learner activation or new production-art generation. TASK11.19 remains halted at 1/75. Final live AI, acoustic, device and performance qualification remains open until separately authorized and demonstrated.
