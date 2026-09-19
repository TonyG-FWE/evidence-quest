# Independent bounded source and test review

Recorded: 2026-09-16T06:16:05.915Z. Reviewer: playback_checks subtask.

**Source review: PASS for the bounded findings below. Final integrated browser batch: PENDING with the root agent.** This receipt does not claim a final build or whole-game acceptance.

## Scope and ownership

Reviewed the continuous gathering/Loop controller, serialized playback ownership, complete-text support, SparkFest/Loop introduction, and affected test fixtures. This subtask changed only checks/browser tests and this new receipt; it did not edit runtime, start a server, run a build/browser/provider evaluation, or write Git state. Root executes builds, contract runs, browser suites and delivery. Earlier no-emit type checking and parse-only test-source checks passed on their then-current editions; they are not final runtime verification.

The source keeps the actual chosen/performed story text, rotates playback keys on resume/replay, requires the expected segment index, pauses during readers/background/view loss, restores interrupted gathering playback paused, and advances full tellings automatically. Caption fallback uses elapsed time; speech callbacks have key/index/text/epoch guards. World word/reading support enters a reader before opening inline tools, so caption timing pauses as well.

## Closed findings

| Finding | Current source disposition |
| --- | --- |
| Welcome help had no focus-return root before Begin. | GardenApp.tsx now selects .festival-welcome when the chapter has not started. interaction.ts returns Back to SparkFest. Both viewport cases verify the opener return. |
| Complete ending reader displayed all four paragraphs but exposure allowed only the current picture. | model.ts now accepts the exact displayed ending paragraphs independent of the paused picture, retaining canonical component/word checks. The finale contract permits the real opening and rejects an unperformed arrangement variant. |
| Replay in child narration mode switched to model speech. | playback.ts preserves the existing narration/caption mode while rotating the key and resetting index/time. The new contract asserts caption mode survives narrate replay. |
| Help/objective copy still instructed sentence-by-sentence continuation. | chapter.ts and interaction.ts now describe automatic whole telling, pause/replay and complete-text help. Rendered controls omit Continue speaking, Finish this turn and Next/Previous picture. Existing low-level reducer commands remain for compatibility checks. |
| New projector concept lacked an authored meaning; Loop/Jo descriptions were vague. | readingGlossary.ts now defines projector, festival, SparkFest, inventions and studio, and identifies Loop as Jo's rolling projector and Jo as the story writer. Intro browser assertions now require the actual projector definition, not merely an open card. These strengthened assertions await the root's final batch. |

## Test fixtures and prior results

Five focused store cases cover exact Sol text/selected ending, Mara/Grandma complete paragraphs, stale/duplicate/pause/background/reload callbacks, caption timing and Loop completion/replay. Browser cases verify exact whole spoken text, full readers, late callbacks, restored progress, real elapsed caption advance, and the 1440/320-pixel illustrated welcome. Synthetic local speech is explicitly labeled: captured callbacks are retained independently from runtime cleanup so a stale-callback assertion cannot pass merely because onend was set to null. It does not qualify native voice quality or acoustic feedback.

Prior root-run browser-focused-2.json records **18 expected passes, 0 unexpected failures, 0 skipped**, beginning 2026-09-16T06:08:30.164Z: four playback plus two welcome cases across Chromium, Firefox and WebKit. The contemporaneous playable-1 manifest is retained below. This was before the later authored projector definition/assertion and route-fixture corrections, so the 18 passes do not qualify all current source/test hashes. Root will bind the final candidate and add final results.

Earlier failures remain retained: focused-1 exposed welcome focus loss and a fixture that dereferenced an absent initial save and never resolved. savedChapter now polls for an actual persisted payload with a bounded timeout and explicit IndexedDB error handling; it is also used before migration-fixture replacement. routes-1 found a removed duplicate-toolbar selector and a one-time visibility check before Mara's physical return settled. The finale test now selects Reading tools semantically; playBird waits for the actual destination before choosing early-reader versus public-telling handling. No timeout/acceptance threshold was relaxed to conceal those defects. The route batch was interrupted and is not a passing result.

## Qualification limits

Root's final contracts, affected browser routes, native review and delivered-asset binding remain outside this receipt's completion claim. No provider requests, paid evaluation, native microphone/acoustic qualification, measured learner improvement, art acceptance, deployment or publication were performed by this reviewer. The existing TASK11.19 halt is unchanged.

## Reviewed source bytes

| Workspace-relative path | SHA256 |
| --- | --- |
| `src/garden/playback.ts` | `71457321cd14f3cc5f49eb69b44badb15e2d3dbe420a581a791c62ecb09ef0f0` |
| `src/garden/ContinuousPlayback.tsx` | `9aa84300b4e56e32bb07cd22354938bd0ca4326e03a038952aafa7bc34389009` |
| `src/garden/gathering.ts` | `5f3a104476e6003ddd86d3cfbfd867f7b17162c44dabd51e8b7bbaaa9f8e1a90` |
| `src/garden/GatheringPanels.tsx` | `1302e0de8427cc17c6165ae6cf72808ddb89e267dde5eb20ddd3676a7eb0d8e8` |
| `src/garden/FinaleActivity.tsx` | `d4e414f18641791cb6c81d882bccf9f5fd3220815c50c03f624086ab158c5b8f` |
| `src/garden/model.ts` | `c0e7f54a29d66e2359afc38d93b282c8e9b4f161e3f69b4fd6e055d9697d17d5` |
| `src/garden/GardenApp.tsx` | `62fe1ff687eff6974f92b8b9898365034f5910f27077bf5f3dcec57222d4ff8c` |
| `src/garden/interaction.ts` | `7b3cbbb807c9ade2b757a488940e1c5add23f8af90009dfc86027fa27301d56e` |
| `src/garden/chapter.ts` | `ea92fb4212be79a35a3506c8dc1be60a6339f37b7f90228db0c588411ea690d9` |
| `src/garden/ChapterPanels.tsx` | `56a6a790b3de810125f051cb9db8b67bbb3ee9f19785acbbe83a2a9fce9558aa` |
| `src/garden/readingGlossary.ts` | `55aeffc8ca1ba5703155b94809406cbb0d16115bc7976d6ab2488add9239e4c3` |
| `src/garden/FestivalWelcome.tsx` | `d315bf0b324b1ef2c3b16b9a35affa4caf48c4744284389153f739c3eb9c3ab6` |
| `src/garden/audio.ts` | `6626da7189562aa827924ed5584253b9aed4f16297eafe57980141f32146e6eb` |

## Current test bytes

| Workspace-relative path | SHA256 |
| --- | --- |
| `checks/garden-continuous-playback.test.ts` | `d4781540f7558e80a652f7eb57e50a4cb811bd5727a8d6e7948484763ff42d23` |
| `checks/garden-play-actions.ts` | `f4fb5f3fd933c1a94c2dc2637bfec48837a535cb79a0152c70a7ee4410a9351d` |
| `checks/garden-finale.test.ts` | `bdfcb8eacf0b1a2adf81ccdd622d36e3c4133d1aa974ed1098a44202fad0ee42` |
| `browser-tests/garden-playback-voice.ts` | `120b1eab268cbf66b778dd7f03222a53d6e5be787dd63f85e5c53d6507f9c446` |
| `browser-tests/garden-save-fixture.ts` | `18eef4c3505b4610f32ce949078f0f7dffa4e8f1e3acab63fe453e35a64d5bf7` |
| `browser-tests/garden-actions.ts` | `eada3d4076f3bcb18681bf06abf9db1d5fc23dee50012a2082b45f19900113da` |
| `browser-tests/garden-continuous-playback.spec.ts` | `090fe50e568abfa971d76f9d8e38a23e52c4d15d68365cba9f22b825ba459cb5` |
| `browser-tests/garden-festival-welcome.spec.ts` | `181afbe6131929b6094e6ff94c3b53526ef02c538bde27700b0909b6d3c666df` |
| `browser-tests/garden-gathering.spec.ts` | `79cd7eb8878e41f791a800d2ba0ceb5a63a6366684fb44eaa8f2b26bf2825ae1` |
| `browser-tests/garden-finale.spec.ts` | `2ae179e96c05e88d04500875f73ac8d6c52ec29797da776447d7fb9db0e2095b` |
| `browser-tests/garden-chapter.spec.ts` | `378b34cbcb390b6f03c824d3e2c68e48479c539ddc2680fcff93c7ddcb60ac15` |

## Prior edition/result bytes

| Workspace-relative path | SHA256 |
| --- | --- |
| `evidence/sparkfest-playback-20260916/playable-1.json` | `742504a18f1b9dddce3a28ecadbdec3d23dcf235bb54dda7cf8e56cbe06e837b` |
| `evidence/sparkfest-playback-20260916/browser-focused-2.json` | `dd8e2df5162787a25d4f1ad8388ddb070dce7b038324398054e0c037057d5bae` |
