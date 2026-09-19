# D068: Preserve reviewed meanings and check disputed explanations

Revision 2, September 14, 2026. AGREED for reviewed-meaning precedence and the shown disputed-explanation recovery. Tony answered "Yes" after the walkthrough. This refines D065/D066 and retains D067 for new uses without a matching reviewed meaning. It does not claim a completed glossary or an infallible semantic check.

## Keep a matching reviewed meaning fixed

Where a reviewed stored meaning fits the actual selected use, display that meaning unchanged. AI may supply the additional sentence explanation, but must not replace the reviewed definition. A complete prepared contextual card still takes priority. For new child-written uses without a matching stored meaning, D067's normal generated-help path remains available.

This explicitly refines D065/D066's normal-path precedence for the basic meaning field, recorded in their revision 3. The match must be to the actual contextual use, not spelling alone.

## An incorrect contextual explanation slips through

Actual source sentence in Sol's page:

> She dragged her flour sacks away from the puddles.

The reviewed basic meaning remains:

> **dragged**
>
> **Meaning:** Pulled something along the ground.

Suppose the AI's additional explanation incorrectly says:

> Rina lifted the sacks and carried them away from the puddles.

That is a hypothetical error example, not acceptable instructional copy or an error the child must encounter. The child selects the agreed control:

> Check this explanation

The game keeps the real sentence and reviewed meaning visible, withdraws the disputed generated explanation as current advice, and requests one recheck using the actual word, sentence/context and matching reviewed meaning. For this example, an appropriate replacement is:

> Rina pulled her flour sacks away from the puddles.

The source and any child writing remain unchanged. Actual listening and return controls remain available.

## If the explanation remains unresolved

Remove the disputed generated explanation and keep the matching reviewed basic meaning. Reuse D066's notice:

> An explanation for this sentence isn't available right now.

For a new word in the child's writing with no appropriate reviewed meaning and no reliable rechecked help, use D067's existing unavailable-help response instead:

> Word help isn't available for this word right now. Your writing is unchanged.

A dispute alone does not select a new meaning or prove the child right. The recheck is a model response requiring qualification, not independent evidence of accuracy. Exact criteria for accepting a correction, handling justified original explanations and supplying no misleading fallback remain open. Review/evaluation must address errors before release; reporting a bad explanation is a recovery option, not the sole quality check placed on a child.

## Scope and later dependencies

The reviewed-meaning precedence, Check this explanation control, shown single recheck and fallback reuse are agreed. D065/D066 revision 3 records the refinement while preserving D067 for new uses without a matching stored meaning. Exact definition matching, fixed-source versus child-draft binding, quote fidelity, request/version/cancellation, audio coordination, provider/data/cost and semantic/learner qualification remain open. Missing fixed-text glossary coverage is still an unfulfilled D066 requirement, not a successfully handled case.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D068.REQ01 | Keep a matching reviewed definition fixed during normal word help; AI may add context, with complete prepared cards still preferred | D068.AC01 |
| D068.REQ02 | Offer Check this explanation; withdraw the disputed generated explanation while retaining the actual sentence/meaning and request one recheck against those references | D068.AC02 |
| D068.REQ03 | Replace the shown carrying error with an appropriate source-supported explanation; if unresolved, retain the reviewed meaning with D066's notice or use D067's notice when no suitable meaning exists for child-written text | D068.AC02 |
| D068.REQ04 | Retain source/writing/listening/return and require evaluation of generated explanations; a dispute or recheck alone establishes neither correctness nor learning | D068.AC01-02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D068.AC01 | A reviewed meaning matches the actual use and AI returns additional content | NOT_RUN; stored definition must remain fixed and prepared cards preferred; matching/source/response/semantic qualification OPEN |
| D068.AC02 | The shown erroneous explanation is challenged, followed by a supported or unresolved recheck | NOT_RUN; one check, actual references and appropriate correction/fallback with unchanged work required; claim/source/request/version/audio/recovery/task mapping OPEN; injected error labeled synthetic |

Agreement AGREED_REVIEWED_MEANINGS_AND_EXPLANATION_CHECK; specification COMPILED_DIRECTION for D068.REQ01-04; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75; no provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed reviewed-meaning precedence and disputed explanation check | Pending at the time |
| 2 | Recorded the shown refinement, one recheck and fallback reuse; updated D065/D066 explicitly | Tony: "Yes" after the walkthrough |
