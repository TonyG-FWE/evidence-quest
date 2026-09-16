# D046: what happens after a reading attempt

Revision 2, September 13, 2026. Tony answered "Yes." to the displayed word-match, retry, self-correction and microphone/feedback/example-voice unavailability responses, including optional continuation with retained passage/progress. Those shown outcomes are agreed after [D045's selected optional listening feedback](D045-SPOKEN-READING-FEEDBACK-OPTIONS.md). D045's one-suggestion, disagreement and uncertainty behavior and D044's optional practice remain. AI/language-learning expansion remains a future possibility outside this demo's current scope. R10 continues with [D047's proposed Sol practice](D047-READING-SOLS-ENDING-ALOUD.md); no runtime or audio result is claimed.

## 1. A clear word match

Source and illustrative spoken sentence:

> I promised my sister I'd keep it safe.

When a completed, usable attempt supports a reliable match of the words to this source, agreed feedback is:

> The words I heard matched the sentence.

Offer the already-agreed **Try the last sentence** focus or **Back to the story**, and keep replay available. This statement concerns the recognized words only. It does not claim perfect pronunciation, expression, reading speed or improved fluency. Empty, incomplete, uncertain or failed processing cannot use the clear-match outcome. The recognizer must not simply reconstruct the expected text while hiding reading differences; qualification remains a prerequisite.

## 2. The child retries the suggested word

After the actual D045 brother/sister suggestion, the child chooses to retry and says the intended sentence. If the new audio supports the relevant correction, agreed feedback is:

> I heard "sister" this time. You can read the sentence again or return to the story.

Keep the feedback tied to this new attempt and source. A choice to retry alone cannot produce this response. If the new result is uncertain, use D045's uncertainty response. If the child disputes the original result, do not later credit an improvement from that disputed result merely because another attempt matches.

## 3. The child corrects themselves while reading

Illustrative utterance, not a received recording:

> I promised my brother—my sister—I'd keep it safe.

When the audio supports this self-correction, agreed feedback is:

> You changed "brother" to "sister" yourself. You can keep going.

Do not flag brother as an unresolved error or demand a full restart after the child has already corrected it. The detector must distinguish self-correction from an uncertain transcript, repetition or another speaker before making this statement. If it cannot, use the existing uncertainty path. The supported outcome is agreed; evidence that an engine can recognize it reliably remains a separate qualification requirement.

## 4. Listening feedback cannot be used

If microphone access is declined or otherwise unavailable, agreed message:

> You can practise without the microphone.

Keep the applicable D044 model, visible text, cues and return options. Enable audio controls only when their actual audio is available. The child does not need to grant microphone access to continue.

For unavailable or failed feedback processing, the previously file-only D045 message was shown in the D046 walkthrough and is now agreed:

> Reading feedback isn't available right now. You can still practise or return to the story.

Keep the page, selected excerpt and actual story progress. Do not invent a result, silently submit another attempt or present an unavailable model as working. Specific request caps, cancellation and network/error transitions remain R13/R15/R19 work.

## 5. The example voice is unavailable

If the model audio itself cannot play, agreed message:

> The example voice isn't available right now. You can still read the words and use the reading tips.

Retain the actual excerpt, pause/emphasis cues, word help that is available in text, independent reading and **Back to the story**. Apply the same principle to unavailable word-pronunciation audio: preserve available meaning/context text, without pretending sound played. Exact per-control failure labels remain for input/audio design.

## How each outcome returns to play

The child can continue from every outcome. No score, full-passage restart, mandatory repeat count or requirement to accept a suggestion is introduced. D045's **I couldn't hear that part clearly. You can try again or keep going.** and **I may have misheard you. You can keep going.** remain the already-agreed responses in their actual conditions. D044's optional last-sentence focus is available as practice, not an inferred need based on a fabricated result.

These agreed responses fill the shown continuation behavior for this short known passage. Full practice placement, different passages, exact short lantern captions, model quality and microphone/data/source implementation remain open. Qualify the word-match, retry and self-correction branches against actual audio before claiming them functional; no current runtime or child recording supplies such evidence. Exact per-control errors, capture limits and unshown technical details retain their later-topic dependencies.

## Requirements from the demonstrated agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D046.REQ01 | Use the exact word-match response only for a supported match; offer replay, expression practice or return without claiming perfect pronunciation or fluency | D046.AC01 |
| D046.REQ02 | Use the exact retry and self-correction responses only when new audio supports them; do not demand another attempt after self-correction | D046.AC02 |
| D046.REQ03 | Use the exact microphone-unavailable and feedback-unavailable messages, preserving available independent practice | D046.AC03 |
| D046.REQ04 | Use the exact example-voice unavailable message and retain visible words and reading tips | D046.AC03 |
| D046.REQ05 | Keep the passage and story progress; allow return to the adventure from every shown outcome | D046.AC01-03 |

| Scenario | What the eventual feedback must demonstrate | Current evidence |
|---|---|---|
| D046.AC01 | With the actual source and qualified audio, show the supported word-match response; uncertain/empty/partial/failed attempts do not become false matches; replay/practice/return retain context | NOT_RUN; audio mechanism, uncertainty evaluation and input/source mapping OPEN |
| D046.AC02 | Compare an actual retry or mid-attempt self-correction against its source; use the shown supported response, preserve disputed/uncertain results and allow continuation | NOT_RUN; representative recognition evaluation and attempt/state mapping OPEN |
| D046.AC03 | Encounter unavailable microphone, feedback or model; show the applicable exact message and retain available text/tips/practice and story progress | NOT_RUN; capture/audio/error/input/access/recovery mapping OPEN |

Agreement AGREED_FEEDBACK_OUTCOMES; specification COMPILED_DIRECTION for D046.REQ01-05; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. No provider, microphone, child-live, art, agent or imported-source operation is performed.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed match, retry, self-correction and unavailable-audio responses | Pending at the time |
| 2 | Recorded the six shown responses and retained passage/progress/continuation as agreed | Tony: "Yes." after the D046 walkthrough |
