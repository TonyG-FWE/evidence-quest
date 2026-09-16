# D060: Ask when an ending does not identify the scene

Revision 3, September 13, 2026. AGREED for the shown clarification interaction and the explained AI analysis approach. Tony first answered "Yes, it does" and asked whether unclear writing is detected by enumerating phrases or by AI analysis. After the explanation below, he answered "Okay, understood. Approved. Next." Exact technical contracts and qualification remain open; this does not settle the full incorrect-output or service-failure flow.

## The child writes and tries an ending

At Sol's workbench, the original page and actually supplied later account remain available under D039. The child writes:

> I realised my repair had made a difference.

They press **Try my ending**.

The sentence is consistent with the story, but does not specify whether the intended scene is baking, the later thanks, or both. It is not treated as a factual mistake. The agreed illustrative AI response is:

> Your ending tells us the repair mattered. Which part would you like to show: Rina baking the bread or bringing you a loaf? You can include both.

The game keeps the child's draft and asks for clarification before presenting a new rehearsal scene as its interpretation. Exact previous-preview/waiting presentation remains for R15-R19; an old rehearsal must not masquerade as the newly understood draft.

## The child clarifies through their writing

The child stays in the same writing interaction and revises the ending to:

> Later, Rina brought me a loaf to thank me. That was when I realised my small repair had mattered to her.

They press **Try my ending** again. The game rehearses Rina's later visit with the loaf and keeps the child's exact words visible. Agreed illustrative feedback:

> Rina's visit gives your ending a clear moment to show. Her thanks explain why the repair mattered to Sol.

These responses are authored examples of desired behavior, not actual model outputs or guaranteed verbatim generated wording. This example adds no new event to Sol's supplied account.

The clarification is handled through writing in the existing editor, not a new questionnaire. The child can still consult Sol's account or use the existing authored-ending/original-draft alternatives. Revision is optional; this interaction must not make finishing the adventure conditional on producing a preferred explanation. Exact controls for declining clarification or correcting an AI scene interpretation remain to discuss.

## Scope and status

The distinction between a supported but underspecified ending and a factual contradiction, the shown clarification prompt, revised example and rehearsal/feedback response are agreed. Actual ambiguity detection, model mistakes on otherwise clear drafts, incorrect-scene correction, response limits, provider/data handling, latency, cancellation, stale results, unavailability and evaluation remain open under R13/R19/R20. Agreement does not complete R13.

## Agreed AI analysis approach

Use an existing language model to analyze the child's draft in the context of the actual story facts and supplied instructions. Do not implement an exhaustive inventory of phrases the child must match. D059's recognition of paraphrases remains part of this behavior.

For this interaction, ask the model to determine:

1. Which known event is described: baking, the thank-you visit, or both?
2. Whether the draft fits the story or introduces a misunderstanding or event that did not happen.
3. Whether enough information is present to choose a scene without guessing.

| Agreed example input | Intended interpretation |
|---|---|
| She came over with some bread because she was grateful. | Rina's thank-you visit, despite wording different from prior examples |
| That was when everything changed. | No event is specified sufficiently to choose a scene; ask for clarification |
| My repair made the rain stop. | Meaning is clear but contradicts the story; offer the specific source-based correction |

Here, unclear means insufficient information for scene selection. It is not a general judgment that the child's writing is bad. The model recommends the appropriate response; the game displays feedback or performs an existing scene. Building story facts, analysis instructions and permitted responses is distinct from enumerating possible child sentences.

The model can misunderstand. Checking that a recommended scene is allowed does not establish that its interpretation is right. Evaluate varied drafts, including drafts not used as examples, and provide a way for the child to correct an interpretation. D061 revision 2 now agrees the shown [scene-correction interaction](D061-CORRECTING-A-WRONG-SCENE.md) through its own subsequent approval; the analysis principle did not itself approve those controls or full recovery contracts.

The examples specify desired behavior, not actual inference results. Model/provider selection, exact request/response/source/version contracts, prompts, semantic acceptance criteria and qualified evaluation remain open. No implementation or provider request is authorized by this design agreement.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D060.REQ01 | Treat the demonstrated ending as supported but insufficient to identify a scene; ask the shown clarification instead of calling it a factual error or guessing a rehearsal | D060.AC01 |
| D060.REQ02 | Retain the draft in the existing writing interaction; after the demonstrated revision and another Try my ending, rehearse the later visit with the child's exact words and relevant feedback | D060.AC02 |
| D060.REQ03 | Keep actual sources and existing prepared-ending support available; preserve optional revision and valid alternative contributions | D060.AC01-02 |
| D060.REQ04 | Use an existing language model with actual story facts, instructions and the draft to assess described event, factual fit and sufficient scene information; interpret varied wording rather than enumerating phrases | D060.AC03 |
| D060.REQ05 | Keep unclear-for-scene-selection distinct from clear-but-contradictory writing; let the game handle the permitted response, with structural validity distinct from semantic correctness | D060.AC03 |
| D060.REQ06 | Evaluate varied drafts beyond the supplied examples and provide a way to correct model interpretation; exact evaluation and correction interaction remain to specify | D060.AC03 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D060.AC01 | Try the shown underspecified ending and receive the clarification with retained writing/source/support and no invented interpretation | NOT_RUN; ambiguity detection, semantic evaluation and input/source/preview mapping OPEN |
| D060.AC02 | Revise to the shown thanks ending and try again; rehearse the actual later visit with current exact wording and relevant feedback | NOT_RUN; draft/request/scene/version/recovery and existing task mapping OPEN |
| D060.AC03 | Analyze the three shown meaning types and varied drafts not used as examples; inspect relevant source-grounded interpretation and response, including mistaken model interpretations | NOT_RUN; model/prompts/source/semantic coverage/criteria and correction contracts OPEN; permitted scene alone is insufficient evidence |

Agreement AGREED_CLARIFICATION_AND_AI_ANALYSIS; specification COMPILED_DIRECTION for D060.REQ01-06; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75; no provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed the supported-but-underspecified ending, question and revised rehearsal | Pending at the time |
| 2 | Recorded the shown interaction while retaining the AI analysis mechanism as the current question | Tony: "Yes, it does" followed by his question about AI analysis versus phrase enumeration |
| 3 | Recorded language-model analysis, the three criteria/examples, bounded clarity meaning and need for varied evaluation and correction | Tony: "Okay, understood. Approved. Next." after the analysis explanation |
