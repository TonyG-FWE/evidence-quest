# Reader and save repairs — 2026-09-19

Focused validation passes: client/checks TypeScript compilation, 17 reader/physical/playback contracts, and three Chromium browser regressions in 20.6 seconds. [Exact commands, scope and source hashes](results.json).

The browser regressions prove late microphone grant cancellation using an explicitly synthetic permission seam; pending selected-voice cancellation on draft edit using a synthetic provider response; and actual IndexedDB conflict recovery between two browser pages, preserving both exact drafts through reload. The application receives ordinary UI interactions. No live providers were called.

This is development-source evidence at port 4366. Native human microphone acceptance, actual cast audio, the compiled candidate, full cross-browser reader coverage, fresh journeys, performance budgets and Tony’s visual review remain separate checks. The first browser attempt never launched because its default runtime path was absent; its report is preserved in output/reader-repair-20260919/launch-failed-results.json.

Final guard follow-up: staged maintenance edition is now retained through canonical reading requests, and conflicted writing fields remain selectable but read-only. Client/checks compilation and all five reader contracts pass. [Follow-up source hashes and exact scope](final-guards.json). The two-window browser test now additionally checks that typing cannot change the read-only draft; that new assertion is NOT_RUN pending the frozen compiled candidate. Earlier browser passes remain bound to their recorded source.

Landscape loading follow-up: personal image/JSON requests and native image decoding now have a20second deadline, cancellation cleanup, and explicit failure state so Restore view can be offered. Six focused synthetic loader contracts and client/checks compilation pass. [Exact source hashes and proof boundary](landscape-loader.json). Native decoder/CSP, rendered source fidelity and path rendering remain for compiled browser qualification.
