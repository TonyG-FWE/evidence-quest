# D073: Use recorded speech to support pronunciation feedback

Revision 2, September 14, 2026. AGREED for the shown pronunciation approach and interaction. Tony answered "Yes, that works." after the walkthrough. D045-D048 already agree optional listening, a supported word suggestion, replay/model/retry/continuation, uncertainty and active final narration. D048 explicitly requires pronunciation support beyond a matching transcript. This agreement makes the speech-analysis and game-coaching responsibilities concrete; it does not reopen those product choices or select a provider.

## Agreed division of work

1. A speech-assessment component receives the actual recording and the exact displayed passage for that attempt. It analyzes the sounds against the reference words and supplies word-level findings with their audio locations and uncertainty. A transcript matching the expected spelling is not enough to declare pronunciation correct.
2. The game selects one short, reviewed practice prompt using a supported finding and the actual word/sentence. These demo reading prompts use prepared wording; no additional language-model generation is needed. A sentence, a low score alone or the child's written answer cannot supply evidence of a sound error. No percentage grade is shown to the child.

The product requires a defensible pronunciation observation before selecting a correction. Word/sound scores and alignment are candidate evidence requiring qualification, not automatic truth. Expected-text conditioning must not conceal what was actually spoken. Accepted pronunciation variation, unreliable alignment, self-corrections and uncertain audio must be accounted for under the existing principles; exact decisions and thresholds remain open.

## The agreed interaction

The actual excerpt from Mara's page is:

> He hesitated. Then he held out the bird.

The child chooses the existing **Read with feedback**, explicitly starts listening and reads the excerpt. After they finish, suppose qualified analysis of that recording supports a pronunciation difficulty with hesitated. This is a hypothetical condition, not a received recording, phonetic diagnosis or observed service output.

Highlight the actual word. Agreed feedback for the shown supported finding:

> Let's practise "hesitated." Listen to the word, then try it in the sentence.

Agreed controls and targets:

- **Hear my reading** plays the child's actual attempt.
- **Hear hesitated** plays the reviewed example pronunciation of that word.
- **Hear the sentence** plays the actual sentence **He hesitated.**
- **Try the sentence** offers an explicitly started new attempt at that sentence.
- **Back to the story** returns to the same story context.

The child can compare their recording with the example, listen to the sentence and try it themselves, or return to play. A retry does not automatically earn praise or clear the previous difficulty. Any new observation must come from the new recording; the same selected word must not trigger a canned claim of improvement.

If the recording is unclear, retain the already agreed response:

> I couldn't hear that part clearly. You can try again or keep going.

If pronunciation assessment itself is unavailable, retain D046's existing unavailable-feedback response and independent practice. Do not quietly substitute transcript matching for the required sound-based support. Existing disagreement and self-correction behavior remains; this agreement adds no compulsory retry or speech score gate.

## Documentation checked for feasibility

Read-only documentation review on September 14, 2026, including the Context7 skill at C:/Users/TonyGuillaro/.agents/skills/context7-mcp/SKILL.md. Resolved **Speech service** as `/websites/learn_microsoft_en-us_azure_ai-services_speech-service` for its direct official coverage, then queried pronunciation-assessment outputs and limitations.

[Microsoft's pronunciation-assessment documentation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/pronunciation-assessment-tool) describes analysis of recorded/uploaded speech using reference text and reports word, syllable and phoneme scores. This establishes that the proposed kind of audio analysis is available in existing services. It does not validate a service's accuracy for children aged 9-12, accept its accent norms for this game, establish a specific error-detection threshold or select Microsoft as the provider.

Context7 also surfaced the official [assessment output documentation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment), including phoneme scores and timing. Those outputs inform the proposed separation of sound evidence from coaching. No service was called to assess speech, no recording was made, and no working integration or qualified model result is claimed.

## Scope and later dependencies

The shown speech-assessment/prepared-coaching division, reviewed prompt selection, hesitated prompt and exact listening/retry controls are agreed. Existing source and optional listening/uncertainty/continuation principles remain agreed. This sample requests word practice; it does not approve arbitrary phoneme-specific instructions or diagnose a speech condition. Exact assessment output fields and reliability criteria are still implementation and qualification dependencies.

Provider selection and cost, child-relevant and pronunciation-variation evaluation, audio quality and alignment, source/attempt/version references, start/stop/capture limits, playback and microphone exclusion, cancellation/latency, data handling, positive feedback criteria, sentence rhythm/expression, semantic comprehension and exact TASK11 mapping remain open. Active pronunciation feedback remains a current design requirement, with technical qualification NOT_RUN; it is not silently deferred to the future language-learning idea.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D073.REQ01 | Compare the actual recording with its displayed passage using sound-based assessment; a matching transcript alone does not establish pronunciation accuracy | D073.AC01-02 |
| D073.REQ02 | Select one reviewed practice prompt from a supported finding; highlight hesitated and show the exact prompt for the demonstrated case | D073.AC01 |
| D073.REQ03 | Provide Hear my reading, Hear hesitated, Hear the sentence, Try the sentence and Back to the story with their actual recording, word, sentence and return targets | D073.AC01 |
| D073.REQ04 | Base retry feedback on the new recording, retain the shown uncertainty response and optional continuation, and do not infer improvement merely from retrying | D073.AC02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D073.AC01 | Read the actual excerpt; use representative audio supporting a hesitated pronunciation difficulty, then hear actual/model targets and optionally retry or return | NOT_RUN; sound/word alignment, accepted variation, reviewed prompt/audio, source/attempt/input and existing task mapping OPEN |
| D073.AC02 | Compare a new attempt, uncertain recording or matching transcript without sufficient sound evidence | NOT_RUN; age-relevant reliability and false-feedback evaluation required; no automatic improvement or unsupported accuracy claim; data/state/recovery/qualification OPEN |

Agreement AGREED_AUDIO_BASED_PRONUNCIATION; specification COMPILED_DIRECTION for D073.REQ01-04; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75; documentation reads are not speech-provider attempts. No runtime change, recording, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed speech assessment, prepared prompts and the hesitated interaction, informed by official documentation | Pending at the time |
| 2 | Recorded the shown mechanism, prompt, controls, retry and uncertainty behavior | Tony: "Yes, that works." after the walkthrough |
