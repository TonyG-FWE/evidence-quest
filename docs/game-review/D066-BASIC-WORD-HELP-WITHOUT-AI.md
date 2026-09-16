# D066: Keep basic word meanings available without AI

Revision 3, September 14, 2026. AGREED for the reviewed fixed-text glossary and shown fallback, with D068's subsequent normal-help precedence. Tony's initial "Yes." agreed the glossary/fallback; his later "Yes" to D068 keeps matching reviewed meanings fixed when AI context is available too. This remains a content requirement, not an existing complete glossary.

## Agreed bounded fallback coverage

Prepare a reviewed local glossary covering every selectable word use in the demo's fixed reading material. A basic glossary meaning is smaller in scope than a full authored meaning/context/listening card. It must fit the actual occurrence, including differing senses and forms, rather than applying a global definition to every matching spelling.

This is additional content work to review before building. It is not an existing complete resource or a claim of universal coverage. The exact corpus and occurrence inventory, treatment of names and phrases, wording, source provenance and verification remain to map against the agreed reading register. Arbitrary new words in a child's own writing require separate handling and are not claimed covered by the fixed-text glossary.

## The child clicks a word while AI help is unavailable

The child is reading the actual D039 passage:

> Rain dripped through the roof of Rina's bakery. She dragged her flour sacks away from the puddles.

They click **dragged**. If a full prepared contextual card exists, it remains available under D065. Otherwise, when AI cannot supply the additional help, use the locally stored basic meaning. Agreed fallback card:

> **dragged**
>
> **Meaning:** Pulled something along the ground.
>
> An explanation for this sentence isn't available right now.

The definition must be reviewed text stored with the demo, not a generated response presented as checked. Its local fallback availability is now an agreed requirement using the already illustrated meaning. Keep the actual source sentence visible and retain the word/sentence listening controls. Audio availability has its own D046 and later technical handling; a working word definition does not establish a working audio provider.

Closing the card returns to the same reading position. No retry, special recovery task or completion gate is required to obtain the basic meaning. Under the later D068 agreement, matching reviewed meanings also stay fixed during normal help while AI adds context. D065 revision 3 records that refinement; the shown unavailable-context fallback remains unchanged.

## Scope and later dependencies

The reviewed fixed-text glossary coverage, locally available basic meaning and exact fallback notice are agreed. Existing complete authored cards remain intact. Additional contextual explanations from AI retain their role; the simple fallback does not claim to provide every teaching benefit of the full card.

Incorrect generated meanings, correction controls, missing or mismatched glossary entries, arbitrary child-written words, waiting/cancellation/stale replies, source/audio/provider/data/cost and technical/learner qualification remain open under R13-R20. Actual reviewed coverage is required before claiming fixed-text word help works without AI.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D066.REQ01 | Prepare and review locally stored basic meanings for every selectable word use in the demo's fixed reading material, matching each actual context | D066.AC01 |
| D066.REQ02 | When additional AI word help is unavailable, use the stored meaning and the shown unavailable-context notice; retain actual source, listening controls and reading position | D066.AC02 |
| D066.REQ03 | Preserve complete authored cards and matching reviewed meanings during normal AI context help as well as fallback; distinguish fixed-text coverage from arbitrary new child-written words | D066.AC01-02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D066.AC01 | Compare the agreed fixed reading corpus and selectable occurrences against reviewed local meanings, including differing forms/senses | NOT_RUN; corpus/occurrence/name/phrase inventory, actual wording/provenance and coverage review OPEN; no complete glossary exists from this discussion |
| D066.AC02 | Click the shown dragged use without AI help and inspect its basic meaning, exact notice, source/listening controls and return | NOT_RUN; local lookup/source/input/audio/recovery/task mapping OPEN; separate audio availability retained |

Agreement AGREED_FIXED_TEXT_WORD_FALLBACK; specification COMPILED_DIRECTION for D066.REQ01-03; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75; no provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed reviewed fixed-text meanings and unavailable-AI fallback | Pending at the time |
| 2 | Recorded the bounded glossary requirement and exact fallback/return behavior | Tony: "Yes." after the walkthrough |
| 3 | Applied D068's reviewed-meaning precedence during normal AI help; retained the original fallback and unprepared-glossary status | Tony: "Yes" to D068 |
