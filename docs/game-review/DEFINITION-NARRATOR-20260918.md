# Definition narrator — September 18, 2026

Tony explicitly requested narrator readback for word definitions as quickly as possible. This narrow supplement relates to TASK11.07 and TASK11.08; it does not close the broader TASK11.20/.21 qualification gaps or resume TASK11.19.

The actual Garden word card now includes **Hear the meaning**. It reads the displayed authored definition in Tony's selected **Expressive Male Voice** narrator (`07a44a6958304fa28cef60b0d4023c04`). While preparing audio the control becomes **Cancel reading**; during playback it becomes **Stop listening**. Escape, closing word help, existing speech/navigation cancellation and hiding the page stop playback. Failure preserves the visible definition and reports that the narrator is unavailable; it never substitutes computer speech for the meaning.

The implementation and compiled personal candidate are ready at [the isolated game preview](http://127.0.0.1:4376/garden). The main integration task requested that the current [4364 demo](http://127.0.0.1:4364/garden) remain unchanged until its combined reader/cast/AI candidate is verified. This task therefore did not replace that client or restart that process. The full R17 source, server build and personal client remain preserved under `output/word-narrator-20260918/baseline-r17`.

## Provider behavior

The new POST endpoint accepts only one known authored-definition ID. The catalogue contains 808 exact meanings; it is local data, not 808 generated recordings. No arbitrary input, draft or child writing reaches this endpoint. A first explicit request uses Fish `s2.1-pro-free` with the approved narrator, then saves the MP3 for reuse. There is no paid fallback or automatic retry. At most two generation requests run concurrently. New generation requires loopback plus `EQ_DEFINITION_NARRATOR=1` and a server-side `FISH_API_KEY`. Saved audio remains playable without a key. Existing story/save/coach contracts are unchanged.

Two actual free-model requests completed: one initial definition sample and the native game click for **A light inside a protective cover.** Combined input was 66 UTF-8 bytes, with expected generation cost $0. Cached replay made no additional request. This change made no OpenAI requests. The original two-request OpenAI ledger remains byte-identical. The main task has separately relayed Tony's newer **$10 total OpenAI cap**; this narrator change does not activate or spend that allowance.

Automatic approval review rejected the proposed remaining 807-definition bulk generation because the complete bulk export was not specifically authorized. That operation did not run. The code uses the supported explicit on-demand alternative, and the old bulk helper is disabled.

## Verification

- Clean install, content validation, TypeScript/schema checks, server build, review build and isolated personal build passed. The review-profile contracts passed **206/206**, including two narrator contract tests; authored coaching passed **23/23 with zero API calls**.
- All six cancellation/failure browser cases passed across Chromium, Firefox and WebKit. Saved real MP3 playback passed through native media in Chromium and Firefox. The test transport is synthetic and makes no provider request.
- Windows Playwright WebKit rejected native MP3 playback with `NotSupportedError`. The test now explicitly excludes a browser that reports no MP3 decoder. This is a retained platform limitation, not a Safari pass. Safari/macOS and physical iOS remain **NOT_RUN**. [Playwright documents platform-dependent media codecs](https://github.com/microsoft/playwright/blob/main/docs/src/browsers.md#webkit).
- Actual native CUA game playback used the selected narrator and reported `paused:false`, `readyState:4`, advancing playback time and no media error. Stop removed the media source; closing help restored focus to the word. On an actual CSS 390×844 viewport, the 48px control and complete word card fit without horizontal overflow. The normal desktop layout was also checked.
- Earlier missing-fixture failures and the WebKit diagnostic/teardown failures remain retained; successful focused reruns do not erase them. The last bounded rerun passed Chromium, then reached its 45-second cap during Firefox setup/teardown before WebKit ran. That rerun is incomplete; the earlier Firefox pass remains separately recorded. Full combined-game browser qualification remains with the main integration task.

Exact source hashes, provider receipts, source copies, command results and observations are in [the handoff record](../../output/word-narrator-20260918/records/handoff.json). The saved lantern MP3 also serves as `browser-tests/fixtures/narrator-meaning-lantern.mp3`; tests do not call Fish.

## Integration handoff

`GardenApp.tsx` mounts `DefinitionNarration` directly after the displayed word definition. `server/index.ts` exposes the narrow endpoint and accepts a loopback-only `EQ_REVIEW_CLIENT_DIRECTORY` for isolated builds. `audio.ts` is unchanged; the component subscribes to its existing cancellation bus. Full story dialogue, **Hear the word** and **Hear the sentence** still use existing speech in this candidate; those belong to the main task's complete cast integration.

The isolated server uses bundled Node 24 with `--env-file=.env.fish-audition.local dist/server/index.js`, `HOST=127.0.0.1`, `PORT=4376`, matching `PUBLIC_ORIGIN`, `EQ_ASSET_PROFILE=review`, `EQ_PERSONAL_GRASS=1`, `COACH_MODE=authored`, `EQ_GARDEN_AI_DEMO=0`, `EQ_DEFINITION_NARRATOR=1` and `EQ_REVIEW_CLIENT_DIRECTORY=output/word-narrator-20260918/candidate-client`. The historical personal-grass flag chooses the personal profile; the removed grass stays removed. No key is in client files or this record.

All shared source files are released to the main task. It began changing `GardenApp.tsx` before the final source-delta copy; those newer bytes were deliberately excluded from this candidate's source copy. The complete old R17 source and compiled candidate remain retained. Both timed-out test-server leftovers on 4377 were stopped after exact PID/executable/port verification; the isolated 4376 preview and unchanged 4364 demo remain running. No commit, push, deployment or publication was performed by this narrow supplement.
