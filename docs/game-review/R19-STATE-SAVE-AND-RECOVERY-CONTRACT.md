# R19: State, saving and recovery through a real session

Specification revision 1, September 14, 2026. SPECIFIED_DERIVED from D018-D026, D034-D043 and D061-D080, preserving the existing immutable store/serialized coordinator/IndexedDB contracts. Existing completed saves and imported content remain intact.

## Separate facts that must never be inferred from each other

| State owner | Durable information | Separate from |
|---|---|---|
| World/physical | Actor positions, same A/B boats and committed transforms/joins/attachments, actual seed owner/rooted state, flower growth, unique completed action IDs | Reading a rule, previewing an arrangement, highlighting a target or an AI recommendation |
| Sources | Versioned full texts, component/span exposure, saved reading position | Possession, understanding, assistance, source delivery or performance |
| Possessions | Actual letter/page copies carried by Pip or held by an NPC | Having read a story, knowing its title, or seeing a recap |
| Character knowledge | Facts actually disclosed/reported to that character with source event | Player knowledge, AI context, another character's private account |
| Plan | Desired time/storyteller, revision, each actual invitation/report and acceptance revision | AI approval, an uncommunicated choice, future arrival or a previous superseded plan |
| Sol writing | Current working draft/revision, selected contribution snapshot/revision, authored-example assistance and actual shared version | A rehearsal preview, automatic rewrite, typed-but-unselected revision or future sharing |
| Contributions | Actual story shared, author, version, permitted illustration, assigned rooted flower | Page possession, source opening, explanation correctness or a generated summary |
| Chapter/presentation | Actual event phase and route closing, historical chapter completion; prepared ending snapshot, current presentation page/mode and played boundaries | Entering the studio, creating a summary, narration accuracy or repeating an animation |

Derived fixed flower allocation: two already-rooted older-story lanterns for The Windy Picnic and The Unexpected Duet; rooted available flowers for Mara, Sol and Grandma; Pip's flower exists only after his seed is planted/grows. This supplies the accepted stories without a capacity puzzle. Assign each new story to its own existing available flower when actually shared, updating that same record for an authorized later revision. No duplicate contribution is created on rereading or a second visit. This is a source/asset-manifest addition to reconcile in the dated amendment.

## Drafts, invitations and outcome snapshots

Use **Use this ending** as the derived explicit contribution-selection control. It records the exact current text and selected permitted scene version, separately from writing and rehearsal. Editing afterward preserves the selected version until Use this ending is chosen again. Show **Your revised ending is saved. Sol will share the version you last chose.** If the child selects Draft to discuss, preserve the exact original open draft and its equal contribution status. Sharing commits only the selected version that actually enters the gathering.

Changing a gathering plan increments its plan revision. Previously informed characters do not automatically know it; their existing accepted contributions are retained, while the goal points to the actual people who need the revised time/role. A first invitation can include the already chosen time so the game does not create a redundant second trip. Begin the gathering validates current invitations, real participation conditions and required preparation. It freezes the event arrangement while arrival/sharing runs; editing afterward belongs to a new adventure, not rewriting the event.

Build the ending from a frozen completed-chapter snapshot. Store source references to the actual Mara/Sol versions, attendance, delivery and lantern moment. Presentation playback can advance or rewind pictures but cannot modify those facts.

## Durable save model

Create the new chapter in a distinct versioned local save namespace such as garden-adventure-v1. Do not migrate old completed cases into fictional completion of this new story or delete them. A deliberate import/migration requires a documented mapping and backup; absent that mapping, start a separate new adventure and preserve the old save.

Save stable domain commits transactionally with schemaVersion, contentRevision, saveRevision and an integrity check. Keep the previous valid snapshot until the new one is acknowledged. Draft input queues a save within 250 ms of typing pause and flushes when leaving its activity; the displayed Saved state applies only to the acknowledged revision. A save queue may coalesce superseded snapshots but cannot acknowledge an unsaved newer draft.

Persist settings, story/draft/selection/source state and stable action/presentation boundaries. Exclude microphone audio, audio URLs/buffers, pending request bodies, provider responses/transcripts, secrets, active pointer drags, held keys and live request IDs. An activity's non-sensitive assistance marker may remain where needed to avoid claiming an independent response; no raw speech history or inferred learner profile is saved.

Use the existing one-writer/concurrent-visit protections. A second tab reads the same durable state but cannot overwrite a newer save silently. A deliberate take-control operation must revoke the old writer and reload the latest acknowledged revision before accepting actions. Old provider replies remain invalid in either tab.

## Failure and recovery behavior

| Event | Required behavior and copy |
|---|---|
| Normal Back/help/pause | Stop walking and clear keys; cancel held previews; settle an already-started atomic physical action once; pause its next step; stop capture/audio; retain source/draft/stable state |
| Reload/closed page | Restore the last valid stable snapshot and exact story position; mic off, no old recording or automatic AI request; pending physical transactions use the existing acknowledged-boundary recovery rule |
| Write failure/full storage | **Your latest changes haven't been saved yet. Keep this page open and try saving again.** Keep the in-memory draft and game available; Retry save is explicit, and the UI must not show Saved |
| Invalid newest save | Validate the previous snapshot before offering **Restore previous save**; disclose that newer changes may be missing. Never replace a corrupted save with a silently fresh game |
| Content version mismatch | Keep the old save intact and identify the incompatible adventure version; offer the separately supported old save or a new separate adventure. No invented source/possession migration |
| AI timeout/old reply | R13's unavailable/cancel path; no state mutation, automatic retry, focus theft or old result attached to a new draft/recording |
| WebGL/context failure | Pause view/action progression, keep stable save/draft, offer Restore view; if it fails, retain a truthful unavailable-view state and safe exit |
| Interrupted narration | Restore paragraph/picture and mode with no microphone capture; no repeated world contribution or erased chapter completion |
| Reset/new adventure | Explicit named new adventure with confirmation and separate slot; never run against the user's existing saved case as an incidental test setup |

When an active cue was already committed before a view opened, describe its resulting state. If a hard crash prevents knowing what was shown, preserve possible-exposure uncertainty; do not call an unseen outcome an independent prediction. Routine passive save acknowledgements do not interrupt play.

## Acceptance

| ID | Required demonstration |
|---|---|
| D081.R19.AC01 | Every real transfer/report/invitation/selection/contribution updates only its owner; source exposure and AI results cannot create possession, knowledge or completion |
| D081.R19.AC02 | Save/reload at physical, writing, plan and ending boundaries; no duplicated event, lost acknowledged draft, ghost item or auto-resubmitted recording |
| D081.R19.AC03 | Simulated storage failure/corruption/concurrent writer/content mismatch produces truthful recovery and preserves original saves; seams labeled synthetic |
| D081.R19.AC04 | All nine outcome snapshots and six flower identities remain stable through revisits, changed plans and presentation replay |

Results NOT_RUN. The new namespace/migration must be implemented against the existing save code; this file alone changes no saved data.
