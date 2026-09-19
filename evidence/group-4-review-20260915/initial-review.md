# Group 4 independent initial review

## Passing routes

`migration-reviewed.json` passes122 assertions across13 authentic earlier payloads, including early sharing retained into the gathering welcome and the not-yet-performed public telling. `handlers-reviewed.json` passes41 checks covering current dock service, both ask/copy orders, real agreement, source-only non-completion, consent/tape/repair/return, correct-first and recoverable misplaced tape, all three reader arrangements, exact current-day state and page ownership, repeat sharing, Escape, Help, background, reload and atomic pickup boundaries.

## G4-RV01: codec permits impossible completed progress

Two additional explicitly synthetic corrupted payloads are accepted by `validChapter`:

1. A first scene at `stage: ask` with `participated: true`.
2. An unfinished first scene with `sharedAt: early` and a completed Mara story record.

These are not results produced by the ordinary handlers; they are invalid save inputs. The codec must reject the conflicting completion claims. While a first scene is active, sharing has not completed and player participation is complete only at the acknowledged `done` stage. Completed historical sharing with no scene remains valid without invented new participation. See `handlers-codec-reviewed.json`:41 passing checks,2 failing rejection cases. Sent directly to the implementation task.

## Review expectation corrections

The preserved initial files reported failures caused by over-strict review expectations: migration intentionally advances the chapter revision once, and atomic actions append their receipt IDs to the deduplication history. The review now checks the exact one-step revision advance, preservation of all story/gameplay fields, unchanged physical B/F/P/L/page-delivery history, and unchanged actual current-day actors/objects/plan. New review action IDs have a separate prefix from captured old IDs. No runtime change was requested for these expectation corrections, and no failing initial artifact was overwritten.

At this initial checkpoint native review awaited the candidate. Later initial native observations are in `native-review-initial.md`. No provider requests, browser-state injection or user4192 activity occurred.

## G4-RV01 verification

After the implementation task corrected the active-scene invariants, `handlers-codec-fixed.json` passed43/43 assertions, including both previously accepted corrupt inputs. The initial failure evidence remains unchanged. Later additions and final built geometry still require their scoped checks.
