# ER13 experience and literacy implementation

Dated 2026-09-12. The [superseding addendum](design/evidence-quest-design-v3/13-EXPERIENCE-AND-LITERACY-CORRECTION.md) governs this correction. Original imports and first-build evidence remain historical. The [copy register](ER13-COPY-REGISTER.md) records the reachable supporting-copy changes.

## State and old saves

CaseState has an optional closed experience extension with version 1. An absent extension is accepted by the decoder; RESTORE adds defaults without replacing the case ID, progress, records or preferences. An old save gets a dismissible crew invitation, with no forced introduction. New cases start with the skippable Jo greeting. The imported multi-root schema remains intact; scripts/er13-schema.mjs extends the generated runtime schema. The four-room geometry, 65 orders and five successful plans remain unchanged.

## Literacy evidence

READ.WELCOME uses the opening. READ.PROMISE uses complete canonical E6 through its existing exposure spans. READ.ENDING requires observed successful rehearsal or premiere. Browser speech uses a local English voice and a child-triggered exact displayed passage. Only utterance onstart records reading-model-played. Practice requests, self-reports, source exposure and word lookups are separate records. Word contexts are encountered only after their complete sentence is visible; still selects the relevant meaning. No microphone, recording, timing score or learning claim. A narrator card is optional, read-only and can pause at cue boundaries.

Full-notice interpretation and failed joint-plant interpretation are supplied support, retained separately from source reading. The instructional rationale in the addendum is not evidence that this app improves learning. Child appeal, fluency change and retention require participant work and remain NOT_RUN.

## Selected-provider adapter

server/coach.ts calls only the OpenAI Responses API with gpt-6-astra, low effort, store=false, no tools, no conversational reuse, and strict nonstreaming selection. It reconstructs eligible displayed source spans from shipped content, rejects impossible source/outcome context, and enforces current eligible moves, 16 KiB assembled input, 256 KiB provider wire response and 8 KiB client envelope.

The adapter permits four concurrent calls, six attempts per minute per visit and 100 attempts per process, with ten-minute request tombstones, a 15-second deadline and no retries. Refusals, invalid selections, missing or multiple output messages become prepared fallback. The server never logs or persists raw child wording or provider replies. Provider/hosting data retention is a separate external condition.

The client uses same-origin /api/config and /api/coach. Only an explicitly activated loopback adult-evaluation server can advertise live availability. A missing or invalid key leaves authored play usable. Configuration presence was checked without printing values: no local config/key was present. The real HTTP code is locally tested through an injected synthetic provider transport. These tests are not live interpretation evidence.

The concrete prerequisites for paid synthetic/adult evaluation are explicit authorization for that evaluation and a server-only OPENAI_API_KEY in ignored .env.server.local, plus account access to the selected model. COACH_MODE=adult-evaluation is loopback-only. Child-live activation remains disabled pending external account/data-control/minors-safeguard evidence required by the design. No paid API call, deployment or public publication occurred.

Current API documentation was retrieved through Context7: [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) and [MDN browser speech synthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).
