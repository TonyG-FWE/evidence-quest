# R10: Fluency, recording and final narration

Specification revision 1, September 14, 2026. SPECIFIED_DERIVED under D080 and the user's instruction to finish the remaining sections. Existing agreements: D042, D044-D048 and D073-D077. New control/caption integration below is DERIVED_DETAIL, not a separately quoted approval. Runtime and audio qualification: NOT_RUN.

## One practice interaction throughout the game

The practice target is an immutable tuple of source ID, source revision, paragraph/sentence range and exact displayed text. A child-written target also includes the draft revision. The picture and word help refer to that target. Changing the draft, passage or paragraph invalidates its recording/feedback; revisiting opens a fresh practice attempt.

| State | Child-facing controls and text | Transition and retained information |
|---|---|---|
| Reading normally | Hear this part; My turn; Read with feedback; word/phrase help | No microphone capture. My turn stops model playback and leaves text visible. |
| Recording ready | D075's microphone-off and explicit-submission notices; Start listening; Back to the story | Start listening requests permission and starts capture only when available. Denial retains non-microphone practice. |
| Capturing | Listening...; Stop; Back to the story | Model/replay audio stops before capture. Stop ends capture and opens local review without uploading. Leaving stops and removes this recording. |
| Local review | Microphone off. You can listen to your recording or get feedback.; Hear my reading; Get feedback; Discard recording | Replay is optional. Get feedback explicitly submits this attempt. Discard removes it and returns to recording ready. |
| Waiting | Checking your reading...; replay/model/return; Stop feedback | D077 controls duplicate requests, cancellation and stale replies. Microphone stays off. |
| Feedback | At most one supported observation with its word/sentence target; replay/model/retry/continue; applicable disagreement control | Retry opens recording ready for that target. It neither captures automatically nor declares improvement. |

Retain D076's exact temporary-recording notice. Only the current attempt exists for practice replay. New capture, leaving practice, changing target or a page reload removes the local clip and its feedback. Audio does not enter saves, exported game files or routine logs. The story, reading position and written ending retain their normal saves.

A capture may last up to 120 seconds as a resource boundary, without a countdown, score or story-time change. If reached, stop locally into review and show: **Recording stopped after two minutes. You can listen to it or practise a shorter part.** Do not discard it, submit automatically or call the reading wrong. The backend must support the complete accepted clip; no silent truncation to a provider's shorter endpoint limit.

## Exact captions and narration integration

For **Planting the seed together**, reuse D042's paragraph exactly: **Pip crossed the river and planted the seed with Grandma. He had kept his promise.**

For **Sharing our stories**, combine the actual Mara paragraph and actual Sol paragraph from D042. This preserves all nine combinations and the unfinished-draft outcome. These captions replace neither the underlying stories nor the full four-paragraph ending.

Use D048's already written optional cues as derived connective copy: **Read this part aloud as the narrator. Pause at each full stop.** Planting reread cue: **Make "kept his promise" stand out. Pip did what he had promised Grandma.** Gathering cue: **Pause before the sentence about Sol. You're moving from one person's story to another.** These are optional modeling prompts, not measured claims about the child's expression.

**Practise this part** opens the common practice flow for the current lantern or ending target. **Back to the lantern** and **Back to the ending** return to exactly that preview/paragraph. Merely practising does not select a lantern moment. **Keep this moment** applies the preview selection once, with the existing planting default available if the child continues without changing it.

The completed studio ending has four pages, each with the corresponding D042 paragraph and picture. Show **Previous picture**, **Next picture**, **Practise this part** and **Back to the studio**. Previous is unavailable on page one; on page four Next becomes **Finish narration** in narration modes. Page changes stop current audio, end/remove any practice recording, invalidate its feedback and never repeat an adventure action.

| Presentation | Behavior |
|---|---|
| Watch the ending | Prepared narration for each actual paragraph. Pause stops audio/progression; Continue resumes that paragraph from its saved sentence boundary. Manual Next/Previous is available. Audio failure retains the words/picture and manual navigation, using D046's model-unavailable notice. |
| Narrate the ending | Child-paced pages. No automatic microphone use or assumed reading completion. |
| Narrate with feedback | Each page offers the common Start listening → Stop → local review → Get feedback flow. Show **Read this part aloud. Choose Stop when you finish.** Feedback follows the explicitly submitted part. Next remains a voluntary continuation. |

D048's file-only **Done with this part** combined stop-and-submit proposal is not used: D075's later explicit Stop/review/Get feedback agreement supplies the consistent final-narration contract. This resolves the older proposal without changing the agreed active-listening purpose.

**Finish narration** records only that the presentation reached its end. It does not establish that the child read accurately or comprehended it. **Watch again** and **Narrate again** reuse the frozen completed outcome; they do not rerun deliveries, the gathering or planting.

## Meaning is a separate interaction

After the ending, retain D048's optional question: **What does "kept his promise" mean here? What did Pip do that shows it?** A typed answer is primary. The optional **Say my answer** uses explicit recording, followed by **Get the words** to request transcription. Show that transcript in an editable answer field; **Use these words** confirms it before semantic feedback. A recognizer's uncertain words are not evidence of misunderstanding. **Keep typing** remains available.

For the demonstrated supported answer, use D048's existing unshown acknowledgement as derived copy: **You connected his promise to what he did: planting the seed with Grandma before dark.** For crossing alone, retain the agreed follow-up. Other equivalent wording is interpreted under R13. **Reread this part**, **Help me explain** and **Back to the studio** remain available; no correct-answer gate follows the ending.

## Acceptance

| ID | Required demonstration | Sources |
|---|---|---|
| D081.R10.AC01 | Record/review/explicitly submit, cancel, retry and leave the same exact target with no accidental capture, upload or restored clip | D044-D047, D075-D077 |
| D081.R10.AC02 | Traverse four ending pages in all three presentation modes, including silent/no-mic/failure cases and changing pages during an old request | D042, D048, D064, D077 |
| D081.R10.AC03 | Produce planting and all nine gathering-caption variants, preserving selected Sol text and source truth | D020, D042, D048 |
| D081.R10.AC04 | Confirm/edit a spoken answer before meaning feedback; handle the correct, incomplete and uncertain cases without a completion gate | D048, D070-D072 |

All results NOT_RUN. Source files and control implementations still have to be built; the interaction decisions above are now specified.
