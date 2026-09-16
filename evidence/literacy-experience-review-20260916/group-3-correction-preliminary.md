# Group 3 corrections — preliminary working-source check

This is a preliminary read requested by the implementation owner after the stories-final edition. Final acceptance requires its next frozen snapshot.

- **G3-F01:** Complete-story tools are now present after the live Sol introduction, in deliberate source rereads and in the chosen-writing acknowledgement. The active staged introduction retains its existing bounded passage controls. The shared helper uses the chosen contribution snapshot, not an unconfirmed later draft.
- **G3-F02:** The helper now accepts available/performed/current-turn context. The performed Sol record requests performed explicitly; the active gathering turn requests current-turn explicitly and describes recording as happening after sharing finishes. A pending addition no longer replaces the prior performed draft by default. The new contract assertions check both versions and verify that reading does not mutate the chapter.
- **G3-F03 core:** Every cancel increments a shared local-speech version before browser cancellation. Both chunk continuation and completion/error callbacks validate that version as well as the owning App sequence, covering direct cancel calls from practice and draft tools. The new synthetic retained-onend check exercises reader closure.

## G3-F03 indicator follow-up

The changed callback guard also ignores the old canceled-error event that could previously clear the App's speaking state. Practice start/replay/cleanup and DraftReader's My turn invoke cancelLocalSpeech directly, without setting that state false. As initially corrected, Hear this part → Start listening → Stop/return can therefore leave Stop listening displayed after model playback is canceled.

The reviewer requested synchronous owner-aware cancellation notification or equivalent state cleanup, with a check that stale callbacks cannot clear a newer voice. This is a narrow UI-state follow-up to G3-F03, not a new provider or acoustic qualification requirement.

No runtime, test, build, browser, provider, Git or subagent action was performed by the reviewer. The next frozen candidate will preserve exact byte binding for the final disposition.

## Follow-up resolved in working source

The owner added synchronous cancel observers in audio.ts and a mounted App subscription that clears speaking. Cancellation invalidates the version and notifies the current owner before invoking browser cancel. Late callbacks still fail their ownership check and cannot clear a newer voice. The observer unregisters on cleanup. The new contract definition checks cancellation/version notification and unsubscribe; the browser definition starts model speech before capture and checks that Stop listening is absent after return.

Reviewed runtime hashes: audio.ts `6626da7189562aa827924ed5584253b9aed4f16297eafe57980141f32146e6eb`; GardenApp.tsx `7a14e1bf7726eb544f6f795946d9468d766a9786d2cf27cc73b6e44ca293db42`. A read-only comparison against all 131 stories-reviewed entries found exactly these two runtime changes and the two corresponding reading test-definition changes. No other live candidate file differed at that comparison.

All three findings, including the indicator follow-up, are now resolved in the inspected working source. Final receipt remains pending the separately frozen candidate; the owner is preserving the reviewed build while its browser runs finish.
