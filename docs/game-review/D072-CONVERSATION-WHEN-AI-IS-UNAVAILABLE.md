# D072: Continue Mara's conversation when AI feedback is unavailable

Revision 2, September 14, 2026. AGREED for the shown unavailable-feedback interaction. Tony answered "yes" after the walkthrough. D049 already provides rereading, help and continuation without an answer gate. D070 agrees adaptive conversation feedback, and D071 agrees recovery from the shown misunderstanding. This agreement supplies the unavailable-feedback interaction and accepts D049's previously file-only Help me explain label and supplied wording as shown here.

## The child has written an explanation

Use the existing question:

> How would starting later help me get to the gathering?

Example child answer:

> You'd have more time.

If AI feedback cannot be provided, retain this exact answer. Show a separate game notice, not dialogue attributed to Mara:

> Feedback isn't available right now. Your answer is still here.

No acknowledgement or correction is invented for this answer. The game has not assessed what the child meant. The example is authored discussion material, not an actual request or service failure.

## Agreed available actions

Offer these actions in the conversation support area:

- **Reread Mara's explanation** opens her actual disclosed account, including the work-time and passenger-duty passages. Return to the same question and unchanged answer afterward.
- **Help me explain** opens the prepared help below, separately from the child's answer.
- **Continue planning** returns to the existing next planning step, asking Grandma about a later gathering. The player still needs to go and speak with Grandma; this control does not reschedule the event or teleport Pip.

These are support controls within the existing conversation, not a new plan-selection menu or a replacement for actual gameplay. The other valid gathering arrangements retain their existing routes.

## The prepared help

Under a visible **Help** label, show the following prepared text, originally proposed in D049 and now agreed through this walkthrough:

> Mara has to stay until the last passengers leave. A later gathering would give her time to finish that work before the stories begin.

This is prepared explanatory text available locally, independent of AI. It explains the connection between the source and the plan. It does not say the child's answer was correct or pretend to have interpreted their particular wording.

Keep the child's original answer separate and unchanged. They can revise it themselves or continue planning. Merely opening help neither fills in an answer nor submits another AI request. Using this explanation is assistance, not evidence that the child independently made the connection. The rereading and help also remain available when AI is working, consistent with D049's existing support direction.

## Scope and later dependencies

The shown unavailable notice, three controls, source/answer continuity, Help label, supplied text and return to actual planning are agreed. D049's general support and no-answer-gate principles retain existing agreement. D049 revision 3 records this subsequent agreement for its previously file-only help; D072 is the source of that acceptance, not the original D049 walkthrough.

Exact feedback submission, timeout/retry, editing and cancellation, stale replies, source/question/answer/version/input/focus mapping, persistence, help exposure and evidence, generalization to other comprehension exchanges, provider/data/cost and technical/learner qualification remain open. Continuation is not a correctness judgment, task completion, source delivery or demonstrated literacy improvement. All normal actual conversations, notices, physical work and arrival conditions still apply.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D072.REQ01 | When conversation feedback is unavailable, retain the exact answer and show the separate Feedback isn't available right now notice without inventing an assessment | D072.AC01 |
| D072.REQ02 | Offer Reread Mara's explanation, Help me explain and Continue planning with the shown source/answer continuity and actual next planning step | D072.AC01-02 |
| D072.REQ03 | Show the exact prepared explanation under Help, available without AI and separate from the unchanged child answer; support remains available when AI is working | D072.AC02 |
| D072.REQ04 | Allow the child to revise or continue; supplied help is assistance, and continuation still requires the real Grandma conversation rather than automatically arranging the gathering | D072.AC01-02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D072.AC01 | The shown more-time answer receives no AI response; inspect the notice, reread the actual source and continue to the existing planning step | NOT_RUN; source/question/answer/request/input/state/recovery and task mapping OPEN |
| D072.AC02 | Use Help me explain with and without available AI; inspect the exact supplied explanation, retained answer and voluntary revision or continued play | NOT_RUN; local-help/source/exposure/assistance/focus/persistence and technical qualification OPEN |

Agreement AGREED_CONVERSATION_FEEDBACK_FALLBACK; specification COMPILED_DIRECTION for D072.REQ01-04; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75; no provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed unavailable conversation feedback and prepared help | Pending at the time |
| 2 | Recorded the shown notice, three controls, prepared help and actual planning continuation | Tony: "yes" after the walkthrough |
