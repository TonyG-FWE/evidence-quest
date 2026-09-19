# Group 5 independent initial review

## Passing ordinary cases

`migration-initial.json` passes262 assertions across26 authentic final Group4 payloads:18 eligible pre-Sol states and8 historical Sol states. Original bytes, prior fields, one normalization revision, new-material knowledge boundaries, stable roundtrip and actual BOOT are preserved.

`handlers-initial.json` passes56 actual-handler assertions covering permission/proximity, physical tile and loaf ownership, misplaced-tile recovery, correct-first success, flour/baking/thanks sequence, current-day invariance, keyboard/Grandma escort detours and return, Help/reload, a Sol-first route before any Mara meeting, exact working/selected text, rehearsal non-mutation and explicitly synthetic contradictory material saves.

Expanded `handlers-boundaries-initial.json` adds passing baking/thanks hard-reload boundaries and first Mara-story interleaving while Rina waits with her real loaf. It has63 passing checks and the two corrupt-input failures below. Ordinary routes remain passing.

## G5-RV01: unproven meeting and historical bypass accepted by codec

Two explicitly synthetic corrupt saves are accepted by `validChapter`:

1. A fresh chapter that has not crossed the river with `bakery.met=true`.
2. A fresh chapter with no prior Sol knowledge changed to the historical bakery edition and unrecorded materials.

The first claims an unreachable current bakery meeting. The second skips the new required sequence without the actual prior-Sol evidence that the migration factory itself requires. Current meeting validation should require crossing; historical validation should require the same prior-Sol evidence as `earlierBakery`. All eight authentic historical cases must remain valid. Sent directly to the implementation task; no runtime files changed by this review.

The escort corridor mismatch was identified during source review and corrected by the implementation task before this compiled run. The actual detour/reload/return checks pass and Rina retains the same loaf. A separate writing note identifies the need for a supported shorter feedback excerpt while preserving the full long draft; the implementation task is addressing it during Group5.

Native geometry, ordinary final UI, source/reading layouts and excerpt behavior await the built candidate. The user4192 save and TASK11.19's1/75 halt remain untouched.
