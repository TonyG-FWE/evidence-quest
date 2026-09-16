# D069: Offer a spelling suggestion without changing the child's word automatically

Revision 2, September 14, 2026. AGREED for the shown requested spelling-help interaction. Tony answered "yes" after the walkthrough. The suggestion/meaning, candidate audio, explicit selected-word replacement and option to keep the original are agreed. This does not introduce continuous grading or automatic rewriting.

## The child requests help for a word they typed

Example child draft, including the misspelling:

> Rina brought me a loaf to show her apreciation.

The child opens **Read my ending aloud** and clicks **apreciation** in the actual displayed sentence. For this example, AI uses that spelling and its sentence context to suggest a likely intended word. Agreed illustrative response:

> Did you mean **appreciation**?
>
> **appreciation:** A feeling of thanks.

Offer **Hear suggested word**, clearly playing the displayed candidate appreciation. This is a labeled suggested-word audio target, not the original misspelled token being silently treated as corrected. Normal sentence playback continues to use the current actual draft.

Agreed actions:

- **Use appreciation**
- **Keep what I wrote**

## The child decides

Selecting **Use appreciation** replaces only the selected occurrence. The sentence becomes:

> Rina brought me a loaf to show her appreciation.

All other words and punctuation remain unchanged. The child can return to the same reading paragraph with the corrected spelling and use its normal meaning/pronunciation support. This explicit word replacement does not accept the ending, change the story or automatically request a new full-ending review. Earlier feedback for an obsolete draft cannot take over under D064's agreed principle; exact word-edit/version integration remains to specify.

Selecting **Keep what I wrote** preserves the original sentence and returns to reading without requiring a correction. The child can continue the adventure through the existing routes.

## Scope and later dependencies

The candidate spelling is a suggestion, not a claim to know the child's intent. This example does not define every ambiguous spelling, proper name or invented word; uncertain candidates and unavailable help must not invent a definition or silently change text. D067's honest unavailable-help path remains available where no suitable assistance can be given, with exact classification/flow still to specify.

The shown sentence, suggestion/meaning, Hear suggested word, Use appreciation and Keep what I wrote controls, and explicit single-occurrence replacement are agreed. Exact candidate accuracy, source/draft/span binding, version/conflict handling, audio/access controls, undo/persistence, provider/data/cost and technical/learner qualification remain open. Using a suggestion is assistance, not evidence of independent spelling or reading mastery. The example is authored discussion material, not actual model output.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D069.REQ01 | On requested help for the shown apreciation occurrence, use the actual spelling/sentence to offer the appreciation suggestion and shown meaning | D069.AC01 |
| D069.REQ02 | Offer Hear suggested word for the displayed candidate, clearly distinguished from the unchanged original spelling | D069.AC01 |
| D069.REQ03 | Use appreciation replaces only the selected occurrence and retains all other wording; Keep what I wrote preserves the original and returns to reading | D069.AC01-02 |
| D069.REQ04 | Show the suggestion on a word-help request and change writing only after the child's explicit choice; retain subsequent reading and normal story access | D069.AC02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D069.AC01 | Request help for the actual misspelling, hear the candidate and choose Use appreciation | NOT_RUN; candidate/source/audio accuracy and exact single-occurrence edit required; span/draft/version/input mapping OPEN |
| D069.AC02 | Request help then Keep what I wrote, or enter text without requesting help | NOT_RUN; original retained and no automatic suggestion-driven edit required; pending-request/audio/undo/recovery/task mapping OPEN |

Agreement AGREED_REQUESTED_SPELLING_HELP; specification COMPILED_DIRECTION for D069.REQ01-04; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75; no provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed requested spelling suggestion and optional replacement | Pending at the time |
| 2 | Recorded the shown suggestion, meaning, audio, Use/Keep actions and selected-word edit | Tony: "yes" after the walkthrough |
