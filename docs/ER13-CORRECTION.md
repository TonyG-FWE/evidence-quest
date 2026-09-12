> Current 2026-09-12 update: all 51 accepted manifest PNGs plus Stage are delivered. Final integration and browser qualification continue. TASK11.19 is authorized and halted after one real attempt returned HTTP429 insufficient_quota / credit_balance_exhausted (1/75 used, 74 remain). Earlier authorization-review and zero-call statements below are historical and superseded; no retry is running. See BUILD-STATUS.md and evidence/er13/live-evaluation/attempt-001.json.

# ER13 experience and literacy implementation

Dated 2026-09-12. The [superseding addendum](design/evidence-quest-design-v3/13-EXPERIENCE-AND-LITERACY-CORRECTION.md) governs this correction. Original imports and first-build evidence remain historical. The [copy register](ER13-COPY-REGISTER.md) records the reachable supporting-copy changes.

## State and old saves

CaseState has an optional closed experience extension with version 1. An absent extension is accepted by the decoder; RESTORE adds defaults without replacing the case ID, progress, records or preferences. An old save gets a dismissible crew invitation, with no forced introduction. New cases start with the skippable Jo greeting. The imported multi-root schema remains intact; scripts/er13-schema.mjs extends the generated runtime schema. The four-room geometry, 65 orders and five successful plans remain unchanged.

## Literacy evidence

READ.WELCOME uses the opening. READ.PROMISE uses complete canonical E6 through its existing exposure spans. READ.ENDING requires observed successful rehearsal or premiere. Browser speech uses a local English voice and a child-triggered exact displayed passage. Only utterance onstart records reading-model-played. Practice requests, self-reports, source exposure and word lookups are separate records. Word contexts are encountered only after their complete sentence is visible; still selects the relevant meaning. No microphone, recording, timing score or learning claim. A narrator card is optional, read-only and can pause at cue boundaries.

The secured full-notice reader displays its exact source without an automatic interpretation or stale curled-state description. Requested conversations/help retain their own support receipts. Failed joint-plant interpretation is separately recorded support. The instructional rationale in the addendum is not evidence that this app improves learning. Child appeal, fluency change and retention require participant work and remain NOT_RUN.

Independent review replaced together and motion-still transfer examples with neutral box-carrying and toy-car sentences, avoiding an unseen planting premise or indoor-location inference. The original exact encountered context is still quoted. Premiere/rehearsal examples explain only public show purpose; E3's continuing-still example uses a neutral library sentence; the original displayed sentence remains separately quoted. Save validation rejects source-word contexts without their matching exposed sentence, ending-word contexts before an observed successful run, and lookup records absent from the encountered-word list. Introduction dialogue and vocabulary support never count as reading E6.

## Selected-provider adapter

server/coach.ts calls only the OpenAI Responses API with gpt-6-astra, low effort, store=false, no tools, no conversational reuse, and strict nonstreaming selection. It reconstructs eligible displayed source spans from shipped content, rejects impossible source/outcome context, and enforces current eligible moves, 16 KiB assembled input, 256 KiB provider wire response and 8 KiB client envelope.

The adapter permits four concurrent calls, six attempts per minute per visit and 100 attempts per process, with ten-minute request tombstones, a 15-second deadline and no retries. Refusals, invalid selections, missing or multiple output messages become prepared fallback. The server never logs or persists raw child wording or provider replies. Provider/hosting data retention is a separate external condition.

The client uses same-origin /api/config and /api/coach. Only an explicitly activated loopback adult-evaluation server can advertise live availability. A missing or invalid key leaves authored play usable. At the original checkpoint no key was present; the parent has since configured the ignored server-only file under the later user instruction in [authority section 9](design/evidence-quest-design-v3/13-EXPERIENCE-AND-LITERACY-CORRECTION.md). The real HTTP code is locally tested through an injected synthetic provider transport. These tests are not live interpretation evidence.

The user authorized the original adult/synthetic evaluation and the supplied temporary server-only key, with at most75 total provider attempts. The parent submitted the reviewed command through normal approval using that direct-user context. It was approved and made exactly one actual attempt: HTTP429 insufficient_quota / credit_balance_exhausted after2291ms. The durable ledger records1/75 used and74 remaining; no model output was received. It is halted pending provider project funding and a coordinated cap-preserving resume. No retry, reset or further provider call is running. Earlier pre-execution approval rejections and zero-call records are historical; they are retained, not treated as the current blocker. Authored play remains default and child-live remains disabled. [Actual attempt](../evidence/er13/live-evaluation/attempt-001.json).

Current API documentation was retrieved through Context7: [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) and [MDN browser speech synthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).


## TASK11.17 and native source review

The parent-appended section 8 restores the existing optional comparison, known-time timeline and general private ideas/revisions scope. An optional closed reasoning extension stores only revision baselines and the deliberately selected known destination; absent legacy data remains valid with save format 1. Comparison rows and private records preserve actual immutable snapshots. Displayed metadata has its own observation and never exposes source body spans. Closing a reader clears its convenience bookmark; nested reading/word views retain it until that reader closes. Room entry scrolls to the top without changing internal reader positions. See [TASK11.17](TASK11.17.md).
