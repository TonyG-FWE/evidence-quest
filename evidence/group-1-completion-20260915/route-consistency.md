# Group 1 semantic consistency review

Status: **PASS AT DESIGN SCOPE.** Reviewed September 15, 2026 UTC.

This is a review of the [walkthrough](../../docs/game-review/GROUP-1-CONNECTED-ADVENTURE.md), [event records](../../docs/game-review/GROUP-1-EVENT-RECORD.json), [audit crosswalk](../../docs/game-review/GROUP-1-AUDIT-CROSSWALK.json) and [24 handoff requirements](../../docs/game-review/GROUP-1-GROUP-2-REQUIREMENTS.md). It does not claim a playthrough, model simulation, learner result or runtime qualification.

## Connected checks and conclusions

| Review case | Design conclusion | Evidence |
|---|---|---|
| Seed origin through ending | Grandma's earlier-visit gift is the sole seed. Actual planting fulfills the promise; its actual flower receives Pip's closing picture after Grandma's invitation. | E02, E07-E10, E30 |
| Resources behind their own prerequisite | Bridge sections, ropes and standing permission are on the starting bank; no trip to Grandma is required to repair access. Bakery tile is at Rina's reachable premises when needed. | E04-E08, E16-E18 |
| Resource use across tasks | Bridge sections/ropes, seed boat, passenger boat, tile, tools, bread and page gifts have distinct owners and purposes. No task consumes another task's only resource. | Walkthrough object ledger; E04-E07, E17-E20 |
| All five physical histories | B includes the actual first crossing. Only F before that crossing may deliver the seed. Later F is harmless at its actual mooring; P and L preserve the same seed/flower. | B-P-L; F-B-P-L; B-F-P-L; B-P-F-L; B-P-L-F |
| Incomplete boat delivery | The boat retains its seed at an obstruction/wrong bank. Finish at Grandma or visibly return/unload to cancel before first crossing/conflicting work; no unsupported completed B-then-real-F history. | E07; G1-G2-07 |
| Three unsecured anchor states | Neither-end, near-only and far-only recover the same intact pieces and actual surviving attachment. Pip retreats safely; the director can move the far piece without a new crossing prerequisite. | E06; walkthrough recovery table |
| Early Grandma, no Mara/page/Sol | Grandma first knows only her own belief. After real Mara contact, a report/request may agree later without a page or Sol visit and without requiring an earlier promise to ask. | E03, E11; G1-RV01/02 |
| Page permission and teller | Actual gifted copy/access supports Pip or Mara. Page at Grandma remains usable there; later/Mara does not require an invented duplicate or permanent gift return. | E03, E13, E23, E26 |
| Bakery chronology | Pip witnesses Rina's problem, permitted tile transfer, Sol's repair, dry flour, baking and actual gift before ending work. Sol writes after the repair; baking does not start the final boat/gathering. | E16-E22 |
| Ineffective roof/bird action | Misplaced tile leaves a leak; tape beside the tear leaves the wing loose. The same material can be repositioned. No forced failure, new stock hunt or hidden damage timer. | E14, E18 |
| Earlier Mara and Sol rehearsal | Mara's story stays earlier with boy/bird/tape there; Pip stays in the current garden. Sol rehearsal retells today's established events without duplicating actual repair/bread/gift. | E13-E15, E21-E22; G1-X03/05 |
| Alternate visits and changed plans | Known/finished work persists. Only affected recipients retain an obsolete expectation and need a corrected notice. Actual time agreement, invitation, reader permission, notice, arrival and sharing remain distinct. | E11, E23-E24; walkthrough visit-order table |
| All nine story outcomes | Three Mara arrangements cross prepared, gathering-developed and open Sol outcomes. Open draft has no ending/question gate; later/Pip keeps Mara listening; usual/Pip requires actual later copy delivery. | E24-E32; all 45 physical/story cases |
| Exact Sol contribution | Working draft, rehearsal, selected version and performed text are distinct. Bread/thanks/both and brief truthful thanks remain supported; an edit does not silently replace the selected contribution. | E21-E22, E27 |
| Witnessed facts versus newly told facts | Audience-elaboration questions acknowledge Pip's bakery experience. Grandma learns Mara's reason by actual report and Sol's older reluctance through his reply, before completing The Empty Bench. | E11, E27-E29; G1-X01/02/06 |
| Garden identities | Two older stories remain optional; three waiting lanterns receive actual contributions once; Pip's real seed flower receives its moment. Early Mara sharing and public retelling preserve one lantern. | E10, E12-E15, E26-E30 |
| Closing commitments | Present Mara participates in reciprocal listening; absent Mara receives the actual Grandma copy at her dock and promises future reading. Finish there without fabricated attendance/reading or forced return. | E29-E32 |
| Loop replay, unfinished reset and old saves | Loop's four-part account matches completed events and cannot replay transfers. Pause allows a separate confirmed fresh run during unfinished play. Old completed saves cannot imply participation in the new scenes. | E32-E33; G1-G2-22/23 |
| Interruptions and knowledge | Continuous movement stops; uncommitted previews cancel; already-started atomic actions settle once at their acknowledged boundary. Hard-crash uncertainty cannot be guessed away. Absent characters do not learn from global state/source exposure. | Event global rules; G1-G2-17/22 |
| Literacy purpose and limits | Decisions use work-time, permissions, physical instructions, causal bakery facts and source evidence. Full word/phrase help and purposeful optional practice remain available. Supplied/independent work differs; unavailable AI does not claim understanding. No mastery claim follows success. | E34 and each event's literacy fields; G1-G2-13/20 |

The listed hard prerequisites have no cycle. Optional visits, practice, revision and changed-plan loops return to preserved progress; they are not circular unlock requirements. No material unresolved plot, chronology, actor, resource or source-knowledge decision remains in this packet. Exact controls, geometry, presentation, implementation and qualification are explicit later dependencies.

## Source and review handling

The validator compares all 89 documents in the original audit source register plus the original audit/checklist/register/implementation-plan hashes. It also compares all 169 copied findings and the 96 TASK11 dependency/CHECK11/FIX11 bindings with their source values. Original accepted flags remain unchanged.

The independently produced [source amendment](../../docs/game-review/GROUP-1-SOURCE-AMENDMENT-20260915.md) was read for its eight decision mappings, narrow dialogue changes and source/save context. Those content mappings agree with this packet. Its account of authorization in a different task is not used as authorization for this task; this task stops at Group 1.

The separate [independent review](../../docs/game-review/GROUP-1-INDEPENDENT-REVIEW-20260915.md) supplied checks about early requests, witnessed dialogue, delivery, closing and fresh-start boundaries. Their applicable findings were verified against the actual records. No messages, instructions or runtime work were dispatched by this Group 1 task.

## Verification meaning and correction

The first mechanical check found a verifier label mismatch: it expected shortened route names later_pip/developed while the record uses later_pip_listener/developed_during_gathering. The expected names were corrected to the documented categories, retaining the exact five-by-nine Cartesian comparison. The initial failure receipt is preserved in [verification-initial.json](verification-initial.json); no route or required outcome was dropped.

The final [verification.json](verification.json) records file/reference/source equality and case consistency. The checks are reproducible with [verify-design.ps1](verify-design.ps1). They do not run the game or providers. Legacy 65 cue orders, actual world handlers, accessible controls, visual/performance checks, independent learner play and live AI/speech remain later qualification obligations. TASK11.19 stays halted at 1/75.

