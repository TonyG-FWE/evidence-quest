# Group 3: complete-story reading — final source review

Status: **PASS_BOUNDED_GROUP3_SOURCE_REVIEW**.

All three concrete findings and the cancellation-indicator follow-up are resolved in the sealed source candidate. No unresolved source finding remains in the agreed Group 3 scope. This is the third literacy correction; it does not renumber the original eight gameplay groups or replace existing TASK11 ownership.

## Exact edition

- Owner candidate: `evidence/literacy-experience-20260916/sealed.json`, captured at `2026-09-16T04:58:36.663Z`.
- Candidate SHA256: `95ab7e8b1da9423ced2bdfedb09909da6c76dbbdab3db95a476694a32534a9f2`.
- Independent copies: `group-3-source-3/`, captured at `2026-09-16T04:59:45.1185843Z`.
- Snapshot metadata: `group-3-source-3.json`, SHA256 `edc5fa108f35d84bcdf013eac5da6a1e3d5147a3f847707fe85b2fb27a59e063`.
- All 131 copied files match the owner's candidate. This byte binding does not imply that every file received a new substantive review; the reviewed scope is the complete-story helper/entrypoints, reading/session controls, audio ownership, ending access/exposure, their dependencies and affected test definitions.
- Since `stories-reviewed`, the final edition changes only `audio.ts`, `GardenApp.tsx`, the two reading regression definitions and the generated manifest. The two runtime hashes exactly match the accepted observer follow-up recorded in `group-3-correction-preliminary.md`.
- Recorded assets: `GardenApp-DUsy7GAC.js`, `index-B_XuWWxS.js`, and `GardenApp-BFC0cA8q.css`. Their current local byte hashes are recorded in the JSON receipt; the reviewer did not build or qualify their rendering.

## Findings closed

| Finding | Final source disposition |
|---|---|
| G3-F01 — missing Sol workshop whole-story access | Whole-story controls now appear after Sol's staged introduction, during deliberate manuscript rereading and in the chosen-writing acknowledgement. They use the actual manuscript and applicable chosen ending. The original unfinished draft remains valid. |
| G3-F02 — pending addition substituted for the performed version | `completeStory` accepts available/performed/current-turn context. The performed-record reader requests performed explicitly; active gathering help requests current-turn explicitly and describes the contribution as recorded after sharing finishes. An unperformed addition no longer overwrites the prior recorded draft in the reader. |
| G3-F03 — cancellation left later chunks authorized | Every local cancel invalidates a shared speech version before browser cancellation. Chunk continuation and completion/error callbacks check that version and their App sequence. Close, navigation, practice capture/replay and teardown therefore invalidate old callbacks. |
| G3-F03 indicator follow-up | Synchronous cancel observers clear the mounted App's speaking state before browser cancel. The subscription is removed on cleanup. The old callback cannot clear a newer voice, and the stopped voice does not leave a false Stop listening control. |

Initial findings remain in `group-3-review-notes.md`; the still-failing `stories-final` checkpoint remains in `group-3-source-2-review.md`. Neither was overwritten with a retrospective pass.

## Connected reading behavior

The complete Mara, Grandma and older stories preserve canonical paragraph order. Sol's full account combines the original manuscript with the actual selected, current-turn or performed ending appropriate to its entrypoint. Child wording remains exact and has mixed origin in that combined account. Unconfirmed writing does not silently replace a chosen or performed contribution.

Pip's complete ending uses all four frozen outcome paragraphs. The new standalone ending reader is available only after that actual ending exists. Inside Loop's picture show, the current-picture source exposure remains limited to its actual paragraph; standalone reading allows only the four paragraphs in the played outcome. A caption does not replace the ending, and reading does not finish a telling, delivery or presentation.

Whole-story listening submits every bounded chunk in order. Oral reading retains the complete text across saved pages; the target and full-text key determine the saved place. Page changes retire the previous practice recording/request. Recording requires explicit Start, Stop opens local review, and submission remains separate. Shorter-part practice remains available through the current-picture, current-turn, draft and contextual word/passage tools.

The Duet title fix preserves its existing exposure-dependent explanation. The recording Stop control stays tied to the actual listening phase in the sticky header. Canonical `content.ts` and `chapterContent.ts` are byte-identical to the previously sealed Group 1 sources.

## Runtime evidence — implementation owner execution

The reviewer read these result files; the reviewer did not run their commands or browser cases. Each batch retains its own source edition.

| Owner evidence | Edition and recorded outcome |
|---|---|
| `build-sealed.log`, `contracts-sealed.log` | Sealed build completes; 111 contracts pass, zero failures and zero skips. |
| `browser-endings-reviewed.json` | `stories-reviewed`: all nine complete ending routes pass; zero unexpected cases, skips, flaky cases or run errors. This precedes the final cancellation-observer change. |
| `browser-final-reading.json` | `stories-final`: 18 shared reading cases pass across the recorded three-browser matrix; zero unexpected cases, skips, flaky cases or run errors. This precedes the three final source corrections. |
| `browser-reviewed.json` | `stories-reviewed`: all six bakery/whole-reading cases have passing functional results, but the run retains two worker-teardown errors. It is not a clean overall run. |
| Final six-case rerun | The owner reported the sealed rerun active at this source-review checkpoint. Its completion is not claimed by this receipt. |

Whole-reading voice ordering, late callbacks and capture/Stop checks use explicitly synthetic speech/microphone seams. They do not qualify native audible voice, microphone hardware, replay decoding, pronunciation assessment or live feedback. The retained WebKit native WAV playback limitation is not closed by the graceful error notice.

## Review boundaries and handoff

The reviewer made no runtime edits, builds, test runs, game/browser calls, provider calls, Git mutations or subagent calls. A failed messaging fallback performed two desktop app-discovery calls and no desktop input; normal task messaging subsequently delivered the findings. All written artifacts remain in this review directory.

Source review is complete. The implementation owner retains final browser-run disposition, build-status updates and the playable handoff. Existing TASK11.20/.21 and ER13.06–08 qualifications are not waived; provider, learner, final-art, device and acoustic gaps remain at their recorded status. TASK11.19 remains halted at exactly 1/75, with no authorization inferred for a retry or ledger reset.
