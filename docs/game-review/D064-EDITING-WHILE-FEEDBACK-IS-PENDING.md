# D064: Keep feedback attached to the ending it reviewed

Revision 2, September 14, 2026. AGREED for the shown waiting/editing/stopping interaction. Tony answered "Yes." after the walkthrough. This extends D059's revision-sensitive feedback and D063's direct rehearsal access; it does not select a provider or settle all R19 persistence contracts.

## The child changes an ending while waiting

The child writes:

> My repair kept the flour dry, so Rina could bake.

They press **Try my ending**. Agreed status:

> Looking at your ending...

The editor remains usable. Before feedback arrives, they change the draft to:

> Later, Rina brought me a loaf to thank me.

The earlier request no longer applies. Agreed notice:

> Your ending has changed. Press Try my ending to check this version.

If the old response arrives, it does not display feedback about the baking draft, change the child's words or start a baking rehearsal. Pressing **Try my ending** again explicitly requests feedback for the revised thanks draft. For the shown supported interpretation, the new result rehearses Rina's later visit with current exact writing. No request is automatically submitted on each edit.

## The child can stop waiting

Agreed control while feedback is pending:

> Stop feedback

Selecting it ends the active feedback interaction while retaining the exact draft. Agreed response:

> Feedback stopped. Your ending is still here.

The child can keep writing or use **Choose a scene** to rehearse directly, using D061/D063's existing illustrated choices. A late response from the stopped request cannot take over their chosen scene or display obsolete advice. Stopping is not labeled as service unavailability or successful assessment.

## Request and draft boundaries

The desired result is feedback for the active request's exact draft and actual source context only. New submissions supersede earlier ones. Editing and then restoring identical wording must not resurrect a superseded request. Canceling a visible interaction does not claim the provider necessarily stopped computation; the game must reject the late result either way.

These implementation distinctions are implications to resolve in the later technical contract, not separately demonstrated product choices or a newly approved provider action. Exact request/version identifiers, source binding, pending/previous-preview layout, keyboard/access behavior, timeout duration, leaving the workbench, reconnect/refresh/save handling and full evaluation remain later technical scope. Existing D061 corrections and D062 rechecks need the same protection against obsolete feedback, with exact integration still open.

## Scope and status

The shown waiting status, editable draft, edit notice, explicit resubmission, ignored earlier reply, Stop feedback control/response and subsequent direct-scene access are agreed. Full service failure continues under D063; no fixed waiting duration, automatic retry loop or mandatory wait is established by this agreement.

## Requirements from the shown agreement

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D064.REQ01 | Show Looking at your ending... after Try my ending while keeping the editor usable | D064.AC01 |
| D064.REQ02 | On the shown edit, retain the new draft and show the exact changed-ending notice; ignore the earlier response and require an explicit new Try my ending to request feedback for the revision | D064.AC01 |
| D064.REQ03 | Offer Stop feedback while waiting; retain writing, show the exact stopped response and allow continued writing or direct scene choice | D064.AC02 |
| D064.REQ04 | Prevent an obsolete or stopped reply from displaying old advice, modifying writing or taking over the selected rehearsal; editing alone submits no request | D064.AC01-02 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D064.AC01 | Submit the baking draft, edit to thanks before the reply, then explicitly resubmit; deliver responses in different orders | NOT_RUN; exact notices, current draft/rehearsal and no edit-triggered requests required; source/version/coordinator mapping OPEN |
| D064.AC02 | Stop a pending check, continue writing or choose a scene, then receive the late reply | NOT_RUN; exact stopped response, retained draft/chosen scene and ignored late output required; input/state/cancellation/recovery/task mapping OPEN |

Agreement AGREED_PENDING_FEEDBACK_CONTINUITY; specification COMPILED_DIRECTION for D064.REQ01-04; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. TASK11.19 remains halted at 1/75; no provider request, runtime change, source amendment or agent message occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed waiting, edits, explicit resubmission and stopping feedback | Pending at the time |
| 2 | Recorded the exact shown notices, interaction and protection against obsolete replies | Tony: "Yes." after the walkthrough |
