# Group 2: Rina's connected bakery story — final source review

Status: **PASS_BOUNDED_GROUP2_SOURCE_REVIEW**.

The reviewed `bakery-1` candidate closes the one concrete source defect found in this review. No unresolved source defect remains in the agreed bakery scope. This receipt does not qualify later Group 3 edits or replace the implementation owner's runtime acceptance.

## Exact candidate

- Candidate: `evidence/literacy-experience-20260916/bakery-1.json`, captured at `2026-09-16T04:09:47.097Z`.
- Candidate SHA256: `45cbf2a8f111266401844467a24a5c8e74540c0363981cdab536765b3cdfcb28`.
- Independent source copy: `group-2-reviewed-candidate/`, recorded in `group-2-reviewed-candidate.json` at `2026-09-16T04:13:34.5101359Z`.
- Snapshot metadata SHA256: `f2192ea3a7da71051e368ba958862fff028819269f4fd378113f3eb0648cb84f`.
- All 50 copied files were rehashed successfully. The 47 source/test-definition files match their entries in the candidate exactly; three companion contract documents retain their initial review hashes. The review does not claim that the working tree, now undergoing Group 3 changes, still matches this candidate.
- Recorded build manifest: `assets/GardenApp-C9VeFe3A.js`, `assets/index-D-OzP8cU.js`, and `assets/GardenApp-CKnqLie0.css`. These are candidate manifest references, not a separate reviewer build or asset qualification.

## Findings and resolution

**G2-F01 — resolved:** After the actual thank-you handoff, the Talk to Sol button previously opened Sol's account as a nested reread. That suppressed his live contribution choices. The corrected handler captures the button's focus, closes the bakery conversation, then starts Sol's live conversation. The reviewed `BakeryConversation.tsx` hash is `f0559e422d4bc2d49165b5995b8da7ac1c6721caf768bf65809a70c431e9d6ea`.

The reviewed flow connects the actual spare tile, roof repair, dry flour, mixing, shaping, baking, Rina's walk and loaf handoff to Sol's existing manuscript. Reading dialogue does not grant physical outcomes. Sol remains the repair actor, Rina carries the thank-you loaf, and the handoff requires both actors at the workshop.

The whole-lump baking alternative has a recoverable physical consequence. It records an uneven batch, returns to making fresh dough, grants no loaf, and preserves the repaired roof. The player can instead shape and bake successfully on the first attempt; neither a mistake nor an optional question is required.

Existing connected saves remain valid without the optional failure counter. New counter values are bounded and rejected in historical or premature states. Existing settle-once action handling and reader/world return rules remain in use. Canonical source passages, source exposure, actual possession, contribution and inferred learning remain separate.

Detailed state tracing, save findings and seven bounded acceptance cases are retained in `group-2-review-notes.md`. Its pending-binding statement describes the earlier review checkpoint; this receipt supplies the final binding.

## Test evidence attribution

The reviewer read the final test-definition changes and the implementation owner's result files. The reviewer did not execute tests or open a browser.

- `contracts-bakery-3.log` records 109 passing contracts, zero failures and zero skipped tests. Earlier failed runs remain historical evidence.
- `browser-bakery-1.json` records one expected passing case, zero unexpected failures, zero flaky cases and zero skips. Its start time is `2026-09-16T04:09:47.77Z`.
- The ordinary browser definition exercises wrong-tile recovery at 320 px, the optional whole-lump outcome, saved reload, fresh-dough recovery, actual thanks, and the live Sol contribution/draft route. This test does not establish that every acceptance case in the notes was separately executed on every device.

## Boundaries retained

This was source review only. The reviewer made no runtime edits, builds, test runs, browser calls, provider calls, Git writes or subagent calls. Review artifacts were written only in this review evidence directory.

Existing TASK11 IDs and CHECK11/FIX11 evidence remain authoritative. Source inspection and the owner's bounded test results do not close live-provider, learner, final-art, device or acoustic qualifications. TASK11.19 remains halted; the previously recorded WebKit native WAV playback limitation remains open. Later whole-story tool changes belong to Group 3 and require their own reviewed candidate.
