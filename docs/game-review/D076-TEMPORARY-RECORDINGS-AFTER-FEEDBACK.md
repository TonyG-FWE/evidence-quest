# D076: Keep a submitted recording only for the current practice

Revision 2, September 14, 2026. AGREED for the shown temporary-recording policy. Tony answered "Approved." after the walkthrough. D075 agrees explicit capture, optional local review and Get feedback, including removal of unsubmitted clips on leaving. This agreement defines what the game keeps after feedback has returned. External provider retention remains a distinct unselected dependency.

## The child receives feedback and can listen back

Use the existing D073 example. The actual source is:

> He hesitated. Then he held out the bird.

After an explicitly submitted recording and a supported pronunciation finding, retain the agreed response:

> Let's practise "hesitated." Listen to the word, then try it in the sentence.

**Hear my reading** still plays that actual attempt while the child is in this practice activity. The model, sentence retry and return remain available. Agreed explanation in the reading interface:

> You can listen to this recording during practice. The game removes it when you leave or start a new recording.

The child can compare their attempt with the example without the game creating a saved collection of voice recordings.

## Agreed local lifetime

- Retain only the current attempt for replay during this practice activity.
- Starting a new recording removes the previous local attempt and uses the new recording for subsequent replay and feedback. Merely opening the retry-ready screen does not begin capture.
- **Back to the story** stops playback/capture and removes the game's local recording even if that attempt was previously submitted.
- Returning to practice later opens without an old recording or the previous attempt's feedback. The source and normal word/help controls remain available; they can record a new attempt explicitly.

Keep audio out of game saves, application-created recording files and routine logs. A temporary in-memory replay copy is a possible implementation of this policy; exact resource handling remains open. An ordinary page refresh or closing the game must not restore an old recording or its feedback from a game save. This is agreed application behavior, not a claim of verified secure erasure from hardware or control of copies made by the user outside the game.

The child's story progress, reading position and written ending keep their existing save/return behavior. This decision concerns voice recordings and the current practice feedback, not deleting their writing or replaying completed story actions. No voice-history interface or automatic recording export is proposed.

## The copy sent for assessment is separate

Removing the game's replay copy does not prove that an external speech service has deleted data already sent to it. No service is selected by D073 or D075. The service's actual processing, retention, logging and training settings must be checked before we settle the final disclosure or claim that all copies disappear. Do not promise provider deletion or no provider retention from the local-copy policy.

This agreement covers the game's temporary replay copy and absence of a persisted practice history. Choosing the service and its data policy remains open; there is no provider request, account/configuration change or new permission to resume TASK11.19.

## Scope and later dependencies

The shown recording-lifetime explanation, current-attempt-only replay, removal on leaving or starting a new recording, fresh practice on return and exclusion from saves/files/routine logs are agreed. Existing replay and explicit listening principles remain agreed. The local policy does not settle an external provider's retention or deletion behavior.

Exact audio/source/attempt/version and feedback ownership, releasing audio resources, interrupted/new capture, browser page lifecycle, in-flight request cancellation and late replies, local/server transient handling, selected-provider retention and disclosure, evidence metadata, review/recording accessibility and qualification remain open. Authorized evaluation fixtures remain a separate scope; this agreement does not create or preserve any participant recording as test evidence.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D076.REQ01 | Retain only the current recording for replay during practice after feedback and show the exact recording-lifetime explanation | D076.AC01 |
| D076.REQ02 | Remove the local attempt when leaving practice or starting a new recording; reopening practice has no previous recording or feedback | D076.AC01-02 |
| D076.REQ03 | Exclude recordings from game saves, recording files and routine logs, while preserving normal story-progress and written-ending save behavior | D076.AC02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D076.AC01 | Replay the submitted attempt after feedback, then start a new recording | NOT_RUN; exact explanation, current-attempt ownership, prior-copy removal and audio/source/resource mapping OPEN |
| D076.AC02 | Leave and reopen practice or inspect a saved game | NOT_RUN; no prior recording/feedback restored and no voice in saves/files/routine logs; normal story/writing preserved; lifecycle/server/data/task qualification OPEN |

Agreement AGREED_TEMPORARY_PRACTICE_RECORDINGS; specification COMPILED_DIRECTION for D076.REQ01-03; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75. No microphone capture, provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed current-practice replay and temporary recording lifetime | Pending at the time |
| 2 | Recorded the shown explanation, replacement/removal, fresh return and save/log exclusions | Tony: "Approved." after the walkthrough |
