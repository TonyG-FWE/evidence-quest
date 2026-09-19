# Private PR checkpoint — 2026-09-19

Tony directed delivery of the existing game, updated README, commit, private push and PR, without further fixes or testing. The current branch remains `codex/first-connected`.

The frozen compiled successor built successfully: input SHA-256 `7707ff96982dccc4362d7083951c4d55b2cc2f3fed465fa53cca8931cb4d643a`, output SHA-256 `4e4da51f4fe21089f34fe5b504ece6add3a6eca73d939ae7e441978b4a57532b`, audio manifest `d5e493c3168c7a3929c5ad235d5740b5eb081a2fc401806731cee727b7fd6e0b`. This receipt predates this delivery documentation; final repository inputs can be rebuilt with the documented commands.

The focused successor browser run was stopped on request. Its retained log reached 27 completed cases: 24 passes and three failures. Chromium passed desktop/compact DPR1/2 start, walking, reader transition, resize and restart; world-context and story-picture restoration passed. Reader/save/identity checks passed in Chromium and Firefox. Two synthetic recorder cases failed because the personal runtime package omits the existing recorder worklet; one synthetic landscape-failure recovery case failed and remains unresolved. WebKit successor cases were not reached. These results do not establish a complete journey or human acceptance.

Additional read-only review identified missing structured speech metadata in Read screen and dialogue-choice preview reading. These findings were not repaired after the stop instruction. No further runtime changes, provider calls, tests or main merge are part of this delivery step.

Prior evidence remains separately bound: R2 passes seven required commands (233 contracts, 23 authored checks, zero API calls), and the corrected saved-voice test passes 18/18 across three browsers at DPR1/2. All 143 original GLBs remain preserved locally. The finite repository packet includes required runtime assets, authored audio masters/clips and provenance; excludes credentials, dynamic speech, microphone recordings and local build/test archives. TASK11.19 stays 1/75 and operational ledgers remain preserved.

Still outstanding: omitted recorder delivery, reading-control gaps, remaining renderer failure recovery, complete final browser/journey matrix, native microphone/custom-voice/live-feedback acceptance, isolated clean-checkout proof, unchanged performance limits and Tony's visual/experience review.
