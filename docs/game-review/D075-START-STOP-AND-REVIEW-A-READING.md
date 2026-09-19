# D075: Start, stop and review a reading before requesting feedback

Revision 2, September 14, 2026. AGREED for the shown story-practice recording flow. Tony answered "Yes, that should work." after the walkthrough. D045 already agrees explicit optional listening, a visible listening state and Stop. D073-D074 agree feedback, actual replay and optional retry. This agreement settles the concrete pre-recording, capture and review flow for a story-practice attempt. It does not turn on a microphone or send a recording in this design review.

## 1. Ready to read

The child opens the existing **Read with feedback** for this actual excerpt:

> He hesitated. Then he held out the bird.

Opening this screen does not start capture. Agreed notice:

> Your microphone is off. Choose Start listening when you're ready to read.

Agreed explanation shown before recording:

> Your recording is sent for feedback only when you choose Get feedback.

**Start listening** begins a new recording only after the child's explicit action and applicable microphone permission. Existing model listening and independent reading remain available without recording. The exact permission-denied response remains D046's agreed You can practise without the microphone; complete permission/access handling remains a technical dependency.

## 2. Listening

Once capture is actually active, show a clear **Listening...** indicator and the existing **Stop** control. Keep the actual words visible. The child reads, then presses Stop.

Stop ends microphone capture and moves to review of this attempt; it does not send the recording or claim that the whole passage was read. Capture is off while the child reviews, hears audio or reads feedback. The indicator must reflect actual microphone state rather than merely the last button selected.

## 3. Review or request feedback

Agreed notice:

> Microphone off. You can listen to your recording or get feedback.

Actions:

- **Hear my reading** plays the actual local recording without submitting it.
- **Get feedback** sends this recording and the exact passage reference for speech assessment, then uses the agreed supported-feedback flow.
- **Discard recording** removes the unsubmitted recording from this practice attempt and returns to the ready state with the same passage.

Listening back is optional. The child can request feedback immediately after stopping. Capture and pre-submission replay stay on the device under the agreed design; this is a requirement, not verified browser behavior. The exact service, destination disclosure, transmitted fields and provider handling still need discussion before implementation. Do not describe all processing as local.

## 4. Leave or try again

**Back to the story** stops any capture, discards an unsubmitted recording and returns to the source page with game progress and reading position preserved. This agreement makes the unsubmitted clip temporary; it does not alter the story or the child's written ending.

An existing retry action returns to the appropriate passage ready to read, with the microphone off. Recording starts again only after Start listening. No retry button, model playback, passage opening or navigation silently starts capture.

This scope defines the unsubmitted clip's discard behavior. It does not promise deletion from a provider after a submitted request or define post-submission recording retention. Those are explicit later data/recovery dependencies.

## Scope and later dependencies

The two pre-recording notices, Start listening, actual Listening/Stop behavior, review notice, Get feedback and Discard recording, local pre-submission boundary, leaving and retry behavior are agreed. D045's general explicit-listening/Stop principle and D073-D074's feedback controls retain prior agreement. The separate Get feedback action adds review before submission; it is not a requirement to replay audio before receiving feedback.

Later integration must reconcile this agreed explicit submission action with D048's file-only Done with this part proposal. This agreement neither promotes that unshown label nor changes the agreed active feedback after each selected narration paragraph. Applying the shown practice flow to final narration and free-spoken comprehension answers still requires its explicit mappings.

No-speech/partial attempts, duration limits, unexpected microphone loss, model/capture exclusion, double actions, in-flight cancellation and stale replies, source/attempt/version/input/focus binding, refresh/resume, local persistence, recording and provider retention, adult/demo consent setup, provider/cost and qualification remain open. Pressing Stop or Get feedback alone is not evidence of reading accuracy, comprehension, completed practice or learning gains.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D075.REQ01 | Opening Read with feedback leaves the microphone off and shows both pre-recording notices; only explicit Start listening with applicable permission begins capture | D075.AC01 |
| D075.REQ02 | Show actual Listening/Stop state; Stop ends capture and shows the review notice without sending audio; keep capture off during playback and feedback | D075.AC01 |
| D075.REQ03 | Hear my reading replays the local attempt, Get feedback explicitly sends that recording and its passage reference, and Discard recording removes the unsent attempt; replay is optional | D075.AC01-02 |
| D075.REQ04 | Back to the story stops capture, discards unsent audio and preserves reading position/progress; retry returns to readiness and requires another explicit start | D075.AC02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D075.AC01 | Open practice, explicitly start, read, stop, optionally replay and request feedback | NOT_RUN; exact notices, actual capture/indicator, local pre-submission boundary, source/attempt/input/provider mapping OPEN |
| D075.AC02 | Discard an unsubmitted attempt, return to the story or retry | NOT_RUN; clip removal, capture stop, retained source/progress and no automatic recording/submission required; audio/state/recovery/qualification OPEN |

Agreement AGREED_READING_CAPTURE_AND_REVIEW; specification COMPILED_DIRECTION for D075.REQ01-04; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75. No microphone capture, provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed explicit recording, optional review and separate feedback submission | Pending at the time |
| 2 | Recorded the shown notices, controls, capture/submission boundary and discard/return/retry behavior | Tony: "Yes, that should work." after the walkthrough |
