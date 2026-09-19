# SparkFest introduction and continuous stories

Tony's confirmation was approval to implement this correction. This dated presentation amendment retains the imported design, canonical manuscripts and existing TASK11 sequence. SparkFest frames the available story experiences; the Garden Adventure is the playable demo. Grandma's gathering remains part of Pip's story. It is not recast as a festival assignment or a contribution Pip is making to SparkFest.

## Introduction

The opening uses the original illustrated story studio and inventions workshop. Jo introduces SparkFest as a place where children share stories and things they have made, and introduces Loop as the rolling projector that puts paper stories on a screen. The player then enters Pip's adventure. The studio ending welcomes the player back and explains Loop's performance in that established context.

Existing saves retain their progress and can revisit the introduction through Help → About SparkFest and Loop. The introduction has the same complete-text listening, oral-reading and word-help access as other reading. Authored meanings include projector, festival, inventions and studio. Reading an explanation does not start the adventure or count as a comprehension result.

The runtime images are byte-identical copies; the imported originals are unchanged:

| Original under `docs/design/evidence-quest-design-v3/08-visual-designs/` | Runtime copy under `public/art/sparkfest/` | SHA256 |
| --- | --- | --- |
| `V08-STAGE-ILLUSTRATED.png` | `story-studio-original.png` | `5078ba1105350e500cdad1939cac951e456d4e58b9edfe77c52ca96f1ff526ba` |
| `V08-WORKSHOP-ILLUSTRATED.png` | `inventions-original.png` | `4bd15addcb0e6d9b3888683762faf664770d79ccc501b830c9170e946a1e5b96` |

Loop's role follows section 1 of the imported experience/literacy correction. The later approved framing above governs the runtime wording. The old courtyard illustration is not used because its cancellation sign would introduce an unrelated problem.

## Complete telling and playback

When a character starts telling a story at the gathering, that telling advances automatically to its end. Sol uses the exact selected/performed contribution; Mara and Grandma use their complete actual stories. Real conversation decisions still occur between tellings. Mara's earlier bird-repair gameplay remains an interactive sequence; its return leads into the complete public telling.

Loop presents all four paragraphs of Pip's actual ending with automatic picture changes. There are no per-sentence or per-picture Next controls. Pause, resume, replay and reading without narration remain available. Full-text help opens the complete story with vocabulary, listening and oral-reading tools. An interrupted telling restores its saved paragraph paused; resume restarts that paragraph. Replay restarts the complete current story and preserves the chosen narration mode.

The serialized store owns playback. Speech callbacks must match the current story, paragraph and playback key. Old or duplicate callbacks cannot complete a later story. Opening reading help, leaving the tab or losing the view pauses progression. Where a local voice is unavailable, visible captions advance at a bounded reading pace, with pause and full-text reading still available. Completion means the performance ran; it is not a fluency, pronunciation or comprehension score.

## Existing ownership and evidence

| Existing tasks | Existing checks and fixtures | Bounded correction |
| --- | --- | --- |
| TASK11.07/.08/.09 | CHECK11.CONTENT / EXPOSURE / STORY; FIX11.NPC / SEARCH / RECAP | Introduction, named complete stories, actual performed text and word support. |
| TASK11.09/.13 | CHECK11.ROUTES / RESOURCES / PAYOFF | Preserved real choices, public tellings and corresponding Loop ending. |
| TASK11.09/.14 | CHECK11.RECORDS / SAVE / INTERRUPT; FIX11.SAVE_INTERRUPTED / SAVE_RECOVERY / RESET | Paused recovery, guarded callbacks, replay and unchanged user saves. |
| TASK11.07/.21 | CHECK11.G06 / X01 / X02 / VISUAL; FIX11.ACCESS / OPEN / MOVE | Original illustrations, compact controls, full-text help and focus return. |
| TASK11.16 | Existing connected contract and browser acceptance checks | Required commands, affected browser routes, native inspection and delivered-asset checks. |

Exact final results and source editions are recorded in [verification.json](../../evidence/sparkfest-playback-20260916/verification.json). The independent source review records closed findings and its earlier passing browser edition; the root verification receipt binds the final integrated results. Earlier type errors, the sandbox build denial, the welcome focus defect and test-fixture failures remain preserved with their dispositions.

Native inspection covers the illustrated help, authored projector meaning, reading controls and return to the existing saved scene. Automated speech tests use explicitly synthetic voices to test sequencing and cancellation. They do not establish audible voice quality or native microphone/acoustic accuracy. No full repository browser qualification or learner study is claimed.

TASK11.19 remains halted at exactly 1/75 with no provider request or reset. Existing TASK11.20/.21 and ER13.06–08 owner, learner, live/audio, art and device/performance gaps remain open. Changes are local and uncommitted; no deployment or publication is part of this correction.
