# D045: feedback on the child's spoken reading

Revision 2, September 13, 2026. Tony explicitly selected "Optional listening feedback" after the comparison and concrete example. The shown optional Read with feedback action, visible listening/Stop, one supported word-difference suggestion, replay/retry/continue, disagreement and unclear-audio handling are agreed at product-design scope. The existing [D044 practice](D044-FIRST-FLUENCY-PRACTICE.md) remains available without a microphone. Tony also identified future AI and language-learning potential while explicitly excluding that wider work now. Mechanism, provider and data/evaluation contracts remain open; this design agreement does not initiate microphone capture, child participation, provider requests or changes to the halted ledger. R10 continues with [D046](D046-FEEDBACK-OUTCOMES-AND-FALLBACKS.md).

## Alternatives and tradeoffs

| Option | What the child receives | Tradeoff |
|---|---|---|
| Keep modeled practice only | D044's example voice, exact text, cues and purposeful rereading, without capturing speech | Least additional scope; the game cannot comment on the child's actual reading |
| Add record and replay | An explicitly chosen short recording the child can replay beside the model | Simpler than automated assessment and supports self-comparison; the child must notice differences and choose what to practise |
| Add optional one-suggestion feedback | Explicitly read a selected passage for feedback; replay it, receive at most one supported word-reading suggestion, and optionally retry | More responsive support; needs a reliable speech comparison, uncertainty/disagreement handling and qualified audio behavior |

Selected: the third option, initially limited to supported word-reading differences in short known passages, retaining the agreed practice without a microphone. The model-only and record/replay-only options were considered but not selected as the complete feedback approach; their support functions remain where included in the agreed interaction. No chosen engine is claimed reliable yet. Do not add pronunciation, expression or fluency scores by interpreting a plain transcript. Full acoustic/prosody feedback would be separate scope and evidence.

## Tony's scope clarification

Tony's exact selection:

> Yes, let's go with the Optional listening feedback

His stated future opportunity:

> this could be a future AI element and a possible future ability to turn this into language learning software. Not that we're doing that now.

Record this as a future possibility, not a current language-learning feature, expansion of content/languages, provider selection, training project or separate product task. The selected current behavior remains optional reading feedback; its implementation mechanism belongs to R13 and later qualification. Do not infer either a new AI architecture or a deferral of the selected behavior from this future-direction note.

## Agreed concrete example

Keep **My turn** as D044's non-recording independent turn. Add the agreed separate **Read with feedback** action, visible listening state and **Stop**. Capture begins only after explicit selection and applicable microphone permission. The exact pre-recording explanation, duration/retention, processing destination and permission/error flow remain OPEN before implementation; do not promise browser-only processing or storage here.

The selected source sentence is:

> I promised my sister I'd keep it safe.

Illustrative child utterance, not actual audio received:

> I promised my brother I'd keep it safe.

If the system has sufficiently reliable evidence for that word difference, the agreed response is:

> I heard "brother." The page says "sister." You can listen back or try that sentence again.

Highlight only the relevant source word **sister**, keeping the full sentence available. The child may use **Hear my reading**, hear the model, try the same sentence again, or continue. A transcript mismatch is a candidate observation, not a diagnosis of ability or proof of a pronunciation error. The suggestion must be grounded in the received audio and correct source, not invented from expected text or a fictional transcript.

The agreed **I said sister** response lets the child dispute the recognition. The game replies:

> I may have misheard you. You can keep going.

Keep that result disputed rather than counting a confirmed reading error. Do not require repeated attempts or acceptance of the system's claim to continue.

If the audio is unclear or the comparison is uncertain, the agreed reply is:

> I couldn't hear that part clearly. You can try again or keep going.

Uncertainty does not mark a word wrong. If the service is unavailable, preserve D044's available practice and return options. The following service-failure wording was initially file-only in D045; Tony subsequently accepted it in D046 revision 2:

> Reading feedback isn't available right now. You can still practise or return to the story.

D046 revision 2 now records the accepted word-match, retry and self-correction responses. Full technical handling of pauses, repeated words, multiple speakers and partial recordings remains OPEN. Never fill those gaps with fabricated praise or a score. Whole-adventure progress, lanterns and the child's chosen story outcome remain independent of accepting or retrying a speech suggestion.

## What this would teach or support

The initial automated suggestion would target word-reading accuracy: notice a possible difference, hear the actual attempt and model, and reread the sentence. D044 still supplies pause/expression practice. The first limited detector would not by itself assess complete fluency or demonstrate improvement. D046 revision 2 settles the shown word-match and other outcome responses; full practice distribution remains open in R10. R11/R12 cover meaning and vocabulary, and R13/R20 must qualify any speech-processing mechanism and claims.

## Evidence informing the distinction

Read September 13, 2026: [Gothi et al., A Dataset and Two-pass System for Reading Miscue Detection, Interspeech 2024](https://www.isca-archive.org/interspeech_2024/gothi24_interspeech.html) identifies accurate miscue detection with limited false positives as a challenge in children's L2 English oral reading. [Harmsen et al., Can ASR generate valid measures of child reading fluency?, Interspeech 2025](https://www.isca-archive.org/interspeech_2025/harmsen25_interspeech.html) separately evaluates phrasing, smoothness and pacing measures on Dutch child speech against human-transcript measures. These are research examples, not qualification of a provider, this game's age/language population or the proposed example. They support keeping recognized-word feedback, full fluency measurement and learning-gain claims distinct.

## Review and build boundary

The selected optional feedback behavior and shown example are agreed by Tony's explicit response to D045, separately from D044. Later agreement in D046 revision 2 covers the six shown additional outcome/fallback responses. Exact provider/local mechanism, useful false-positive/uncertainty criteria, representative evaluation, audio retention/disclosure, privacy/permission/capture limits, cancellation/retry/cost/data flow, model audio, full copy, inputs/access, source/save mapping and TASK11/FIX11/CHECK11 ownership remain OPEN. Existing restrictions on child-live activity, paid evaluation and the 1/75 halted ledger remain intact. No provider credit is consumed and no live audio is recorded.

## Requirements from the demonstrated agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D045.REQ01 | Offer optional Read with feedback with visible listening and Stop, retaining D044's independent practice without a microphone | D045.AC01 |
| D045.REQ02 | Give at most one supported source-word suggestion at a time; retain the exact brother/sister example, source highlight and replay/model/retry/continue choices | D045.AC02 |
| D045.REQ03 | Allow the shown I said sister disagreement and exact reply; retain unclear-audio response without marking an uncertain word wrong or requiring agreement/retry | D045.AC02-03 |
| D045.REQ04 | Keep current feedback focused on word-reading accuracy; full pronunciation/prosody/fluency judgments require separate scope and qualification | D045.AC02-03; R13/R20 |
| D045.REQ05 | Record AI/language-learning expansion as a future possibility only; current scope and implementation mechanism remain bounded as stated above | Scope review; R13/R20 mapping OPEN |

| Scenario | What the eventual feedback must demonstrate | Current evidence |
|---|---|---|
| D045.AC01 | Select independent practice or explicitly request listening; show the real listening/Stop state and preserve access to practice without microphone use | NOT_RUN; permission/capture/data/input/access and provider mapping OPEN |
| D045.AC02 | Use actual appropriately qualified audio with the correct source; show the supported single word suggestion, replay/model/retry/continue, and actual disagreement response | NOT_RUN; speech mechanism, representative false-positive/uncertainty evaluation and source/data mapping OPEN |
| D045.AC03 | Encounter unclear audio or a disputed recognition; preserve uncertainty/dispute and allow continuation without a score, required retry or false claim of improvement | NOT_RUN; full evaluation, copy and recovery mapping OPEN |

Agreement AGREED_OPTIONAL_LISTENING_FEEDBACK; specification COMPILED_DIRECTION for D045.REQ01-05; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Compared three approaches and proposed one-suggestion optional feedback | Pending at the time |
| 2 | Recorded the explicit selection, shown interaction and future-only AI/language-learning opportunity | Tony: "Yes, let's go with the Optional listening feedback" and the scope clarification quoted above |
