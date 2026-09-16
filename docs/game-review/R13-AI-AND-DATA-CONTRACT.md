# R13: AI jobs, requests, data and failure behavior

Specification revision 1, September 14, 2026. SPECIFIED_DERIVED from D059-D078 under D080. This finishes the product and integration contract; actual service access, calibrated audio reliability and live qualification remain engineering evidence requirements. No provider request or ledger resume occurs.

## Each job has bounded context and output

| Job / trigger | Request context | Allowed response | What it cannot do |
|---|---|---|---|
| Sol / Try my ending | Original page, actually disclosed later events, exact current draft and revision, supported rehearsal scenes | Supported, unclear or contradictory interpretation; one short source-grounded comment or clarification; proposed scene IDs from baking, thanks or both | Rewrite/save/select the child's ending, invent events, mark the story complete or silently choose a scene after uncertainty |
| Conversation / Share my answer | Exact question, exposed relevant character account, current answer and permitted next dialogue facts | One supported acknowledgement or focused follow-up; semantic result separate from next actual action | Reschedule the event, supply permission, deliver a page, teleport Pip or invent an NPC belief |
| Additional word / selected occurrence | Word/span, sentence and needed adjacent context from the opened source; matching reviewed definition when present | Short contextual explanation; meaning only if no appropriate reviewed meaning exists | Replace a reviewed meaning, use an unseen story revelation, replace child writing or treat help as mastery |
| Spelling / requested word help | Selected token and its sentence in the child's draft | Suggested spelling and meaning, with explicit Use/Keep controls | Apply an unrequested edit or replace other occurrences |
| Reading / Get feedback | Actual recorded attempt and exact reference passage, locale and source/attempt revisions | Qualified word/sound/boundary observations that select a reviewed practice prompt | Diagnose, treat accent as error, grade expression as emotion, infer comprehension from a transcript or generate new story text |
| Spoken explanation / Get the words | Explicitly submitted answer recording, without a desired answer supplied as a forced reference | Editable transcript, with uncertainty | Submit a semantic judgment before the child confirms the words |

These are implementation roles, not menus shown to the child. Complete authored cards, basic meanings and prepared help are served locally before any optional generation.

## Shared request ownership

Every request has requestId, activityId, target/source revision, answer/draft revision where applicable, attemptId for audio, job, cancellation state and created/deadline times. The server receives only context required for that job. Source IDs are server-validated against the current content manifest; client-provided arbitrary facts are not trusted as authoritative source material.

The model returns a discriminated object: status (supported/clarify/contradiction/uncertain), bounded feedback text, referenced source IDs/spans, and allowed scene/spelling fields for that job. Validate type, length, allow-listed IDs, exposed-source membership and revision. A valid schema is not proof of correct interpretation. R20's semantic cases provide that separate check. Invalid, refused, empty or ungrounded output is unavailable; never show raw provider text or an error payload.

Derived initial payload limits: 4,000 Unicode code points for a submitted answer/draft; 12,000 for the relevant authored context; 320 for the single feedback comment/question; 240 for a generated word meaning; 64 for a proposed spelling token. These bound the service job, not the child's saved writing. Never silently truncate a draft or source to fit. Preserve longer writing and offer **Choose a shorter part for feedback. Your full writing is still saved.** only when that save is acknowledged; otherwise use **Choose a shorter part for feedback. Your full writing is still here.** The child selects the span explicitly and can continue without feedback. A submitted span retains its whole-draft revision and location so a result cannot apply to another occurrence. Overlong provider output uses the normal unavailable path, without an automatic retry.

Only the serialized game coordinator may apply a validated, current result to its existing activity. Rendering and provider callbacks cannot change possessions, story knowledge, invitations, crossing geometry, contribution selection or completion. Model instructions embedded in a child draft or source quote are data, not authority to alter the job or call tools. No provider tools, web search, conversation history or unrelated player/session content are sent.

At most one active request exists per activity and one submitted speech attempt per local session. A new explicit request invalidates the older result; duplicate clicks reuse/reject the active request ID without duplicate billing. Stop/leave/edit invalidates locally immediately and aborts transport where supported. Server cancellation and local rejection are separate. A late response cannot reopen a view, steal focus, change a draft or attach to another recording.

Use a 15-second hard deadline after a text request and a 30-second deadline after audio submission, including upload/assessment. These are DERIVED implementation bounds, not measured service promises. Show the existing waiting state immediately. Timeouts use the agreed unavailable notice and local actions. No automatic retry, automatic second provider or hidden stronger-model escalation. Explicit Check that feedback permits the single recheck defined by D062/D068/D071.

Demo targets to measure under R20: usable text response within 2 seconds median and 5 seconds p95; speech feedback within 5 seconds median and 10 seconds p95 for the demonstrated short passages. If measured speed misses these targets, improve the implementation/model choice; do not pretend the target passed or drop accuracy requirements.

## Concrete service direction

Choose a qualified small OpenAI text model first, using GPT-5.6 Luna as the initial engineering candidate documented in D078. Keep selection server-side and pinned in the eventual qualification manifest. The older gpt-6-astra contract is a preserved baseline, not the chosen proof for this new semantic behavior. Change candidates locally if results warrant it; Tony need not select a model name.

Use Azure Speech scripted pronunciation assessment as the initial audio adapter and its non-scripted speech recognition for spoken explanations. This is an engineering selection for qualification, not an established accuracy claim. Official documentation provides word/phoneme observations and notes that recordings over 30 seconds require continuous recognition, where omission/insertion handling is not supplied by EnableMiscue. [Assessment documentation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment).

Capture locally and submit only after the explicit control. Encode a complete recording as mono 16 kHz PCM WAV, maximum 120 seconds / 4 MiB. Use the SDK with an in-memory stream after submission, including continuous mode for longer attempts. Do not use the short REST endpoint to silently truncate longer recordings; its assessment limit is 30 seconds. [Short-audio limits](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-speech-to-text-short).

Preserve segment time offsets when aligning continuous results to the actual reference. Transcript alignment can support omission/insertion observations, but pronunciation prompts require sound-level evidence. Whole-recording prosody scores cannot establish a particular missing pause. The D074 pause prompt is enabled only after a labeled boundary case and acceptable natural alternatives demonstrate reliable mapping. Never show raw numerical pronunciation/fluency scores as learning grades.

The audio adapter's qualification file must identify its model/service/locale, enabled observations, alignment rules, reviewed prompt IDs and tested false-positive cases. Until a capability qualifies, its path uses the exact uncertainty/unavailable response. This does not count as delivering the required live feature in R20.

## Data, disclosure and service access

No account/sign-in or learner profile is required for local demo play. Persist story progress, settings and written ending locally; do not persist raw audio, pronunciation traces or free-form AI conversations. Normal diagnostics contain job/status/duration/version and technical error codes, with no source body, child text, audio, credentials or transcript. Synthetic evaluation fixtures are separately labeled and contain no participant recordings.

Keys remain in server-owned environment/configuration and never enter client bundles or repo exports. Use the same-origin local server to mediate requests, enforce size/concurrency/timeout limits and validate results. Text requests retain the existing store=false/no background/no tools direction; this does not by itself guarantee provider zero retention.

Alongside the existing capture/temporary-recording notices, provide **About reading feedback** explaining the configured speech provider and the submitted passage/recording. For text activities provide **About AI feedback**: **When you ask for AI feedback, your answer and the relevant story text are sent to the AI service. Your story progress stays in this browser.** These disclosures describe the actual configured path; a provider change updates them.

Microsoft's current documentation states that pronunciation-assessment data is not retained by its service. Confirm that the configured product mode matches that statement and that our server/logging does not add retained copies before shipping that claim. [Speech data policy](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/speech-service/speech-to-text/data-privacy-security). The game's own local deletion policy remains distinct from a provider policy. No batch storage, custom voice, speaker identification or child-live activation is part of this demo contract.

Known readiness gap: the existing TASK11.19 ledger is halted at 1/75 after exhausted provider credit. Preserve it. A funded, explicitly coordinated evaluation scope for changed text and new speech services is needed before live qualification; neither research nor this selection changes that authorization. Prepare the exact fixtures/cap and configuration first. Authored operation and all interface work remain independently implementable.

## Acceptance

| ID | Required demonstration |
|---|---|
| D081.R13.AC01 | For each text job, enforce exact context/output ownership; actual varied wording receives appropriate source-grounded feedback without direct story mutation |
| D081.R13.AC02 | Duplicate/stop/edit/leave/late/recheck/failure paths preserve the current activity, answer and authored support with no automatic provider retry |
| D081.R13.AC03 | Genuine audio cases support the enabled word/sound/pause observations; unclear audio, valid variation and matching-transcript-only cases produce no unsupported judgment |
| D081.R13.AC04 | Network/save/log inspection verifies explicit submission, complete audio, private keys, minimal context and no persisted voice or raw diagnostic content |
| D081.R13.AC05 | Report complete response-time distributions and exact model/configuration under the authorized call cap; authored examples cannot substitute for live results |

All results NOT_RUN. These service and request specifications are derived implementation decisions, with cost/access and qualification reported separately from product completeness.
