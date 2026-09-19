# Voice audition and bounded Sol feedback demo — 2026-09-18

This is a separately authorized local supplement to TASK11.07/.08/.09 and the AI work recorded under TASK11.19. It does not resume, reset or qualify the halted TASK11.19 evaluation. The existing ledger remains HALTED at 1/75. Game integration and native qualification under TASK11.20/.21 retain their existing requirements.

## Delivered for cast review

Open [the local audition](http://127.0.0.1:4374/). There are two saved voices each for Narrator, Pip, Grandma, Mara, Sol, Rina, Jo and the boy. Listen is explicit; starting another voice stops the current clip. Escape, changing review sections and hiding the page stop playback. Listening does not select a voice. Choices persist locally and can be downloaded as JSON. No browser route can generate paid audio.

All sixteen MP3 clips are under `output/voice-audition-20260918/public/audio`. Exact existing story words, voice IDs, source spans, hashes and provider provenance are in `public/manifest.json`. The voice audition uses Fish Official synthetic voice designs; the API's distinct licensed filter returned no candidates. These are local review candidates, not a claim of commercial distribution clearance. Pip and the boy especially need an age/tone review. Some exact sample spans include their speech attribution; full speaker-span routing remains future work.

Fish generated 2,510 UTF-8 input bytes on `s2.1-pro-free`, with no paid fallback and no new voice designs. Expected generation cost is $0 at the published free-model rate. Saved playback needs neither a key nor the Fish service. Cast selection is required before full dialogue generation and game audio replacement. Existing game browser speech and continuous-story playback are unchanged by this audition.

## AI behavior and measured results

The existing `FeedbackActivity` now holds an AI picture suggestion separately from the player's selected picture. **Use suggested picture** is explicit; **Keep my picture** dismisses it. Feedback never edits the draft, previews an ending, confirms it or delivers it. Revision and draft-revision checks discard stale results, and availability comes from the local server configuration.

`server/gardenDemo.ts` admits only Sol-ending requests, on loopback, with explicit `EQ_GARDEN_AI_DEMO=1` and a server key. Defaults remain offline/authored. A separate persistent ledger, exclusive lock, request-ID deduplication, two-attempt ceiling and $0.10 conservative combined reservation cap prevent automatic spending after restart, duplicate requests, failure or cancellation. It uses OpenAI `gpt-5.6-luna`, reasoning `none`, strict structured feedback and `store:false`; the existing story/save/API contracts are preserved. The old coach model and its halted ledger are unchanged.

Two paid browser requests were made through the real feedback component and adapter:

| Input | Provider and UI result |
| --- | --- |
| “Sol fixed the broken tile, so the flour stayed dry. Rina could bake the bread she had promised.” | HTTP 200; validated `supported`; grounded feedback and bread suggestion. The selected thanks picture stayed unchanged until explicit acceptance. The exact draft stayed unchanged. |
| “After that, things were better.” | HTTP 200; response rejected by the adapter validator. The UI preserved the text and picture and offered its unavailable fallback. A useful live clarification is **not qualified**. |

Combined provider-reported usage: **1,793 input tokens + 183 output tokens**, estimated **$0.0005782** at $0.20/M input and $1.20/M output. Conservative reservations total **$0.00495**. The account balance was not queried. There were no retries, and the authorized two-attempt allowance is exhausted. Saved results can be shown in the workshop without another API call.

The failed response body was not retained, so the exact validation rejection is unknown. Do not label it a successful ambiguity test, infer a cause or loosen validation to make it pass. A future authorized diagnostic run should retain bounded validation diagnostics before any further paid request. The successful response also uses the rather technical phrase “the later source”; voice/personality polish and broader content evaluation remain open.

## Verification and boundaries

- Three focused budget contract tests pass with injected providers: offline defaults, loopback restriction, durable restart/deduplication limit, serialized concurrent requests, failure/no retry and pre-aborted cancellation.
- Client and server TypeScript checks pass. The isolated Vite build passes.
- All 16 saved MP3s decode through the browser's AudioContext. Switching voices, Escape, independent choice controls and keyboard focus were exercised.
- Audition checks at actual CSS 1440×900, 1280×720, 700×700 and 390×844 show no horizontal overflow or clipped controls. The same sizes pass with larger text and roomier spacing; the feedback workshop also passes these larger-text size checks. The existing browser zoom required viewport compensation, and actual `innerWidth/innerHeight` were verified.
- These are adult local browser checks, not a child usability study or an end-to-end world journey. The workshop stages source exposure outside the game and explicitly labels that fixture. Mobile software-keyboard behavior and complete source/draft return journeys are not qualified by this page.
- Full shared-source required commands and connected browser tests are coordinated with **Implement final 3D demo integration**. Its dated frozen-run result remains the authority for the combined build. No GPU game browser or Vite/esbuild helper is kept by this task.
- Pronunciation assessment remains unavailable. This work does not activate Azure, child-live AI, deployment, publication or a finished voice release.

Machine-readable evidence and source hashes: `output/voice-audition-20260918/records/verification.json`. Live receipts: `records/openai-results.json`, `records/openai-attempts.snapshot.json`, and the authoritative budget `evidence/voice-ai-demo-20260918/openai-attempts.jsonl`. Fish attempt receipts are in `records/fish-attempts.jsonl`. Credentials remain in ignored local environment files, absent from the audition bundle.

## Reopening the saved review

From the workspace, run `.\.tools\node-v24.21.0-win-x64\node.exe output/voice-audition-20260918/serve.mjs`, then open port 4374. This default command has no provider access. Its prebuilt `site` directory serves the saved audio and review page.

The developer-only `--live-smoke` switch with `.env.server.local` enables the same durable two-attempt ledger; it does not replenish it. Do not remove/reset that ledger or a stale lock to retry paid requests. The game counterpart is the explicit `EQ_GARDEN_AI_DEMO=1` flag; the allowance is shared with the local workshop. A new demo-video allowance requires separate authorization, not a reset disguised as a restart.

## Current documentation used

- [Fish voice discovery and reuse](https://docs.fish.audio/developer-guide/sdk-guide/cookbook/discover-library-voice) and [model catalogue](https://docs.fish.audio/api-reference/endpoint/model/list-models).
- [Fish model pricing](https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits), [free-model announcement](https://fish.audio/blog/s2-1-pro-free-api/) and [terms](https://fish.audio/terms/).
- [OpenAI pricing](https://developers.openai.com/api/docs/pricing) and [gpt-5.6-luna model](https://developers.openai.com/api/docs/models/gpt-5.6-luna).
- [Vite configuration](https://vite.dev/config/), fetched through Context7 along with provider documentation.
