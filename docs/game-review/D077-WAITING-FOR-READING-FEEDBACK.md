# D077: Wait for reading feedback without trapping the player

Revision 2, September 14, 2026. AGREED for the shown waiting and cancellation interaction. Tony answered "Yes, that'll work." and added a preference for the quickest AI, recorded separately in D078. D075 defines explicit recording/submission and D076 defines temporary replay recordings. D064 already handles waiting and cancellation for writing. This agreement applies the shown waiting, cancellation and failure flow to a submitted reading attempt.

## The child requests feedback

For the existing actual excerpt:

> He hesitated. Then he held out the bird.

The child records, presses Stop and chooses **Get feedback**. Agreed status:

> Checking your reading...

The microphone stays off. The passage and current recording remain available. **Hear my reading**, **Hear this part** and **Back to the story** remain usable; **Stop feedback** is available while the request is pending. Disable repeated Get feedback submissions for this active request so a double click does not send another copy.

The waiting label is not a claim that assessment has succeeded or that a word was read correctly. Replay/model audio is user-requested, and arrival of feedback must not start a new microphone recording.

## Stop waiting but keep practising

The child chooses **Stop feedback**. Agreed response:

> Feedback stopped. Your recording is still here.

Keep the current recording, passage, model and existing practice controls available. A late response from this stopped request cannot display feedback or replace a later attempt's result. Stopping is not labeled as a failed reading attempt or service unavailability.

The child can use Get feedback again if they explicitly want to request another check. There is no automatic resubmission after stopping. Exact service admission, cost/caps and overlapping-request handling remain open technical dependencies; this does not authorize a provider call in the current design review.

## Leave or start a new recording

**Back to the story** returns to the source page and removes the local recording under D076. A late reply must not reopen practice or restore that recording/feedback. If the child starts a new recording, feedback belonging to the older attempt must not appear as feedback on the new reading. New attempts still require D075's explicit start and submission.

Stopping the local feedback interaction is not a claim that an external service stopped processing or deleted the submitted data. Provider cancellation and retention need their own verified contracts. The game must reject obsolete replies regardless of the external cancellation result.

## If the request fails or times out

Use D046's already agreed response:

> Reading feedback isn't available right now. You can still practise or return to the story.

Keep the current local recording available during this practice activity for replay or an explicitly requested check. Do not send another request automatically. The wait must end at a defined timeout; the actual duration and technical mapping remain to settle rather than inventing a measured service speed.

## Scope and later dependencies

The shown Checking your reading status, retained waiting actions, duplicate-submit prevention, Stop feedback application/notice, explicit-only resubmission and obsolete-reply protections are agreed. D046's failure notice, D075's capture controls and D076's local recording lifetime retain prior agreement. The exact integration of these behaviors into final narration remains a separate mapping dependency. D078 records Tony's speed preference; it does not remove this waiting/recovery behavior or establish a response-time guarantee.

Exact request/source/attempt/version identifiers, cancellation/admission and provider costs, timeout duration, pause/model/replay coexistence, feedback arrival without focus theft, interrupted capture, capture-free waiting, keyboard/access behavior, page lifecycle/save/resume, data retention and technical/learner qualification remain open. No outcome here establishes pronunciation accuracy, comprehension or learning improvement merely from submitting or waiting.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D077.REQ01 | After explicit Get feedback, show Checking your reading with the microphone off, retain replay/model/return and prevent duplicate active submissions | D077.AC01 |
| D077.REQ02 | Stop feedback shows the recording-retained notice, keeps practice available and ignores replies from the stopped request; a new check requires an explicit request | D077.AC01-02 |
| D077.REQ03 | Leaving practice or starting a new recording invalidates old feedback; a late response cannot reopen practice, restore removed recordings or attach to a new attempt | D077.AC02 |
| D077.REQ04 | A failed or timed-out request ends waiting with D046's exact unavailable-feedback notice, retains the current practice recording and does not retry automatically | D077.AC03 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D077.AC01 | Submit, attempt a duplicate click, replay while waiting and stop feedback | NOT_RUN; exact statuses, microphone-off state, retained controls and single active submission; audio/focus/request mapping OPEN |
| D077.AC02 | Deliver a late result after stopping, leaving or starting a new attempt | NOT_RUN; no stale feedback or restored practice/recording, and explicit-only resubmission; request/source/attempt/version and cancellation mapping OPEN |
| D077.AC03 | A submitted request fails or reaches the agreed timeout | NOT_RUN; exact unavailable notice, usable practice and no automatic retry; timeout duration, service admission/cost and task mapping OPEN |

Agreement AGREED_READING_FEEDBACK_WAITING; specification COMPILED_DIRECTION for D077.REQ01-04; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75. No microphone capture, provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed waiting, stopping, failure and obsolete-reply behavior | Pending at the time |
| 2 | Recorded agreement for the shown interaction; kept the new speed preference separate in D078 | Tony: "Yes, that'll work." followed by the fastest-AI preference |
