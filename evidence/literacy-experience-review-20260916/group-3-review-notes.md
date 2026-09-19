# Group 3: complete-story reading — source findings

Status: **THREE SOURCE FINDINGS OPEN ON stories-1**.

Candidate: `evidence/literacy-experience-20260916/stories-1.json`, SHA256 `f79d6eab2e0ef0f683d66dfd43288ed9edaa61fe6baf8002a98e83cb0bd2a490`, captured by the owner at `2026-09-16T04:18:57.59Z`.

Independent copy: `group-3-source-1/`, with `group-3-source-1.json` SHA256 `a86511455cf5fe8ba939336c54fc596a9d7397f7421bfadecaea0d16e752a350`. All 130 copied files match the candidate. That byte binding is not a claim that every file was substantively reviewed.

## G3-F01 — Sol's workshop still lacks complete-story controls

`GardenApp.tsx:197` only selects the new whole-story tools for story/empty/picnic/duet. Sol's original source still receives Hear this page and first-paragraph Read a short part aloud. `ChapterPanels.tsx:31–43` provides no complete-story entry after Sol's introduction or contribution choice; its selected-writing branch at line 96 also lacks one. Complete-story tools for Sol appear during and after the gathering, although `completeStory` already supports the earlier chosen contribution.

**Required correction:** Expose the complete available Sol account after his introduction, during deliberate manuscript rereading, and while reviewing his chosen contribution before gathering. Preserve the staged introduction and the distinction between current writing and the immutable chosen ending.

**Bounded acceptance:** At the workshop after the introductory conversation and again after choosing a child/prepared ending, open whole-story reading and traverse exactly the original manuscript plus applicable chosen ending. Return without selecting, sharing or revising anything. An unfinished draft remains an equally valid whole account.

## G3-F02 — An in-progress addition replaces the performed version in every entrypoint

`storyReading.ts:13–15` prioritizes the global active sol/add-ending turn over the performed record, with no indication of which page requested the text. During add-ending, the previous unfinished draft has already been performed (`records.sol='draft'` and `gathering.solPerformed='draft'`), but the newly chosen addition has not completed its turn. `gathering.ts:60–69,114–117` retains that distinction until `finishTurn`.

The helper nevertheless returns original manuscript plus the unperformed addition and, because `records.sol` is truthy, labels it "the exact ending Sol shared." A performed-record Sol page uses this helper for its whole-story controls (`ChapterPanels.tsx:30`) while its visible body independently uses `performedEnding`, producing different versions of the same alleged performed story.

**Required correction:** Choose the reading version from the actual entry context. Reading the currently selected turn may include its pending contribution with truthful pending/current wording. Reading the already performed story must use the performed snapshot until the addition actually completes. Do not infer completed sharing merely from the existence of an earlier draft record.

**Bounded acceptance:** Share the unfinished draft; ask about an ending; start Add and share that ending; pause at the opening line. Current-turn help may read the proposed whole version, labelled accordingly. A performed-story return still reads the original draft. Neither reading changes the recorded result. After Finish this turn, the performed return includes the exact new ending.

## G3-F03 — Canceling speech does not consistently invalidate the new chunk sequence

`GardenApp.tsx:55–61` correctly gives a new whole-story speech sequence a token and checks that token before queuing each subsequent page. Only `speak` and `stopAudio` increment it. Reader close, Escape, reader/page changes and unmount call `cancelLocalSpeech()` directly (`GardenApp.tsx:69,71,78,91`). Practice start/replay/cleanup also call that utility directly (`ReadingPractice.tsx:14,26,33`); `audio.ts:3` only invokes the browser's cancel method.

Those paths therefore leave the old sequence valid. A retained/late onend callback still passes its guard and can queue the next chunk after the reader has closed or recording has begun. This is a source-level stale-callback path; the reviewer has not reproduced it on a native voice engine. The existing immediate-onend synthetic fixture does not exercise cancellation between chunks.

**Required correction:** Make every local speech cancellation invalidate its sequence ownership, including practice capture/replay and teardown, before canceling the browser utterance. A late callback must neither speak the next chunk nor run the completed-listening callback. Preserve the no-voice fallback.

**Bounded acceptance:** With an explicitly labelled controllable speech callback fixture, start a multi-page account, retain the current onend, close/change reader or start capture/replay, and then release the old callback. No new chunk or completion callback occurs. Normal uninterrupted playback still submits every exact chunk in order. This fixture does not qualify native audible voice or pronunciation.

## Other reviewed behavior

- `completeStory` preserves canonical paragraph order, exact selected/performed child wording, mixed origin and the valid original unfinished draft when no ending applies.
- The new complete Pip account uses the four actual frozen finale paragraphs and becomes available only after `story.ending` exists. Reading does not call presentation completion.
- Standalone ending reading renders its four actual source paragraphs; inside Loop's current picture the canonical exposure guard remains restricted to that picture's actual paragraph.
- `readingPages` retains every character and bounds each page to at most 1800 UTF-16 units and approximately 110 words. `readingPlace` keys progress to the target and full text. Page changes remount the practice child and retire its recording/request through existing cleanup.
- Recording remains explicit, Stop opens local review, and Get feedback remains separate. Navigation is disabled during permission/capture; changing page during feedback unmounts and aborts the old request. Existing two-minute capture limits remain.
- Source reading, assistance and saved page positions do not select a story contribution, finish an actual telling or infer learning.

The reviewer has not run runtime code, tests, builds, browser sessions, providers, Git mutations or subagents. The owner's reported 110 contracts and 23 authored checks are not reviewer execution. Final candidate binding and the owner's affected browser results remain pending.
