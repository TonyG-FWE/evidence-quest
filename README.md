# Evidence Quest

## Repository checkpoint — September 19, 2026

This checkpoint packages the integrated demo and its current repairs for private review. It is not a fully qualified release. At Tony's direction, extended testing and further fixes stopped so the current work could be committed and submitted as a PR.

The compiled repair candidate builds successfully. Earlier qualification passes the first seven required commands; saved-voice checks pass in Chromium, Firefox and WebKit at DPR1/2. The latest browser run was interrupted and is incomplete. Known remaining issues include the personal demo package omitting `garden-recorder.js`, incomplete landscape-failure recovery qualification, and metadata gaps in Read screen and dialogue-choice reading support. Native microphone acceptance, complete successor playthroughs, clean-checkout reproduction, performance qualification and Tony's experience review remain outstanding. See [BUILD-STATUS.md](BUILD-STATUS.md) and [delivery checkpoint](evidence/demo-release-20260919/private-pr-checkpoint.md). No production approval or main-branch merge is implied.

Evidence Quest is a reading adventure for ages 9–12. Guide Pip to keep his planting promise to Grandma, repair a bridge, deliver the seed by hand or boat, help at Rina's bakery, revisit Mara's earlier paper-bird story, and bring the village's stories back to Jo and Loop's studio. Reading, vocabulary support, writing, choices and optional oral practice accompany actions in the world.

The current demo is the personal landscape review profile at **http://127.0.0.1:4364/garden**. It includes the supplied village and cast, the selected six-board platform, the connected chapter and the studio. Grass instances were removed at Tony's direction. Pending artwork remains pending; this local profile does not confer production approval. [BUILD-STATUS.md](BUILD-STATUS.md) records the exact tested candidates, interrupted runs, performance failures and remaining visual acceptance. A build pass is not a complete chapter playthrough or acceptance.

## Build and play on Windows

From this repository directory in PowerShell:

```powershell
.\scripts\bootstrap.ps1
.\scripts\npm.cmd ci
.\scripts\npm.cmd run build:demo
.\scripts\npm.cmd run start:demo
```

Open **http://127.0.0.1:4364/garden**. Keep the server terminal open; Ctrl+C stops that server. If port 4364 is already occupied, inspect the existing preview instead of stopping an unrelated process. The bootstrap verifies and installs Node 24.21.0 inside `.tools`; it does not change a global installation. Initial setup needs access to the Node and npm registries. Authored play needs no provider credentials.

`build:demo` verifies the finite [demo asset packet](assets/demo/README.md), restores its exact runtime and provenance inputs into the ignored local working directories, validates content and types, builds a fresh server tree and compiles `dist/personal-review-client`. Its public staging directory contains selected artwork, authored audio and packaged decoders/approved runtime files; unrelated leftovers in `public/garden-assets` cannot enter this build. It performs no model generation, source-art conversion or recompression of the supplied 3D files. The ordinary `build` and production export retain their matching-approval gates; they are separate from this local review build.

The resulting `demo-package.json` records SHA-256 inventories of the actual build inputs and compiled client/server files. `start:demo` rechecks both inventories and rejects changed, missing or extra source/output files. Source changes require another build. The receipt includes the Git revision for provenance, while exact file hashes cover uncommitted work. Browser, performance and experience acceptance remain separate. See [BUILD-STATUS.md](BUILD-STATUS.md) for the exact candidate's clean-checkout results and remaining qualification gaps; successful build commands alone do not establish them. Git preserves source bytes without automatic newline conversion so these hashes remain stable across checkouts.

`assets/demo/operational-ledgers.json` separately binds the minimum preserved spending history. The demo ledgers may receive valid new records without making a compiled build stale; startup checks their original prefixes and the additional history present when that build was issued. Missing, truncated, rewritten or malformed history blocks startup. The TASK11.19 ledger must remain byte-for-byte unchanged. Include all four ledgers in the release; this mechanism never resets an allowance or authorizes requests.

`start:demo` fixes the host to loopback and the port to 4364, uses the personal review client and keeps `COACH_MODE=authored`. Its internal `EQ_PERSONAL_GRASS=1` flag is the historical name of the personal landscape profile; it does not restore removed grass instances. The original four-room Canvas case remains available at `/`, with a separate save namespace.

## Controls and saves

| Action | Controls |
| --- | --- |
| Walk | Click the ground, use arrow keys/WASD, or choose a destination in Places & scene description. |
| Talk or inspect nearby bridge pieces | E, or the named on-screen control. |
| Backpack | I, or Backpack. |
| Move a held object | Drag and release, or choose it with the native controls; arrow keys move, Shift makes smaller moves, Q/R turn, Enter releases, Escape cancels. |
| Boat | Use the named load, steer, dock and unload controls; Pip stays on shore. |
| Plant | Prepare, place and cover the seed, then touch the rooted sprout or use its named control to start growth. |
| Reading and writing | Use the reading area, clickable words and native buttons. Tab moves focus; Enter/Space activates a focused button. |
| Stories | Pause, resume or replay the telling; open the complete text for reading support. |
| Pause or leave support | Escape or the named Back/Pause controls. |

Actions complete through their scene gestures or equivalent native controls. Reading has no countdown. No required mistake, clue quota, score or AI answer gate controls progress. The supplied cast retains its geometry and native movement; Tony's review determines whether its appearance and contacts are acceptable.

Progress is saved in this browser origin's IndexedDB. Reload on **the same browser and port** to resume the current adventure. `localhost`, `127.0.0.1`, another port and another browser each have separate storage. Pause → Start a new adventure asks for confirmation and archives the current run. Cancelling keeps it. Save acknowledgment follows the actual transaction; a failed or conflicting save is not silently replaced. No new historical-save migration is part of this demo work.

## Authored audio and optional services

The authored cast library is `public/audio/cast/manifest.json`, its hash-bound master recordings and separately bounded line clips. The approved roles are Narrator, Pip, Grandma, Mara, Sol, Rina, the boy and Jo. Original masters and generation receipts stay in the repository as verified regeneration inputs. The compiled demo contains only the manifest and its selected independent clips; rejected or obsolete batches and original masters are not served. Clips play locally; text and reading controls remain available when audio is unavailable. The complete source catalogue and copied runtime clips must pass their respective audio checks before a demo receipt is issued.

Optional live services are explicitly separate. For the authorized adult recording session, put server-only configuration in ignored `.env.server.local`, using [.env.example](.env.example) as a reference. Never use a `VITE_` variable for a secret. Sol-ending feedback requires `EQ_GARDEN_AI_DEMO=1`, `EQ_GARDEN_AI_SESSION=recording` and `OPENAI_API_KEY`; `COACH_MODE` stays `authored`. The durable $10 total allowance includes prior reservations. Preserve `evidence/demo-ai-20260919/openai-attempts.jsonl` and its predecessor ledger: deleting or resetting them does not create a new allowance. Without explicit activation and credentials, authored play continues without this provider.

Optional narration of player-written text requires `EQ_CAST_DYNAMIC_VOICE=1` and `FISH_API_KEY` for generation. It uses the separate ignored `.cache/cast-audio-dynamic` cache; existing cached audio can replay with generation disabled. `start:demo` also reads an existing ignored `.env.fish-audition.local`, then `.env.server.local`; a new setup can keep all optional settings in `.env.server.local`. This is separate from the tracked authored library. Do not put personal written text, dynamic audio or credentials in the repository.

Microphone practice starts off and requires the explicit Start listening action and browser permission. Stop, temporary replay and discard are separate; leaving practice discards its temporary clip. Authored playback is not a recording of the player. Automatic transcription and pronunciation assessment are outside this demo's scope. Optional live feedback and native device capture have separate availability and evidence; synthetic checks do not establish reading ability or learning. TASK11.19 remains halted at **1/75** and is not resumed by this demo profile.

## Development and evidence

The application uses TypeScript, React, imperative Three.js, native accessible controls, one immutable store with serialized commands, IndexedDB and a same-origin Node service. The demo packet preserves source hashes and approval state, and location ownership controls model loading and disposal. Its 154 packaged files occupy 588,716,585 bytes, with retained authored audio and public artwork additional to that total. The release file manifest reports the complete byte count. Repository size is not a claim that location transfer or scene-memory budgets pass.

The eight required qualification commands remain `npm ci`, `npm run validate:content`, `npm run check`, `npm run build:server`, `npm run test:contracts`, `npm run eval:coach -- --mode authored`, `npm run build` and `npm run test:browser`. `scripts/verify-demo-release.mjs` hydrates the finite inputs first, binds code, source artwork and authority documents, disables live-service flags, removes provider credentials from child environments and runs those commands on the personal review profile. It rejects input changes during the run. `check` regenerates schema/types/validators; ordinary `build` may regenerate production-art outputs. Those must remain byte-identical to the candidate or be reviewed and bound as a new candidate. `build:demo` does not replace this qualification protocol. Do not run competing GPU playtests or overwrite an active candidate's build.

Browser binaries are a separate setup prerequisite after `npm ci`. In PowerShell, set `$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.cache/browsers'`, then run `.\scripts\npm.cmd exec -- playwright install chromium firefox webkit`. Qualification uses an owned port and all three browser projects; required DPR1/2, complete fresh journeys and quiet performance runs remain separate evidence scopes. Browser installation and provider-free checks do not authorize live evaluation.

Before release, run `npm run demo:release-files` to write the explicit `assets/demo/release-files.json` list, review it, then run `npm run verify:demo-release-files`. Required additions include runtime images referenced by `content/production-assets.json`, literary revision and staged bridge authority documents, test fixtures, audio generation inputs and durable allowance ledgers. Add compact evidence only with explicit `--evidence evidence/.../file.json` arguments to the staging-list script. This command never runs Git. Do not stage the whole workspace: temporary copies and historical pilot exports are outside the finite release. `npm run verify:demo-originals` separately checks all 143 locally preserved originals; those originals are not all required by a clean checkout.

Complete fresh journeys, saved-fixture replays, six browser/DPR conditions, quiet performance measurements and Tony's play review are separate evidence scopes. The R17 checkpoint and any subsequent audio/feedback changes are identified in [BUILD-STATUS.md](BUILD-STATUS.md) and the [dated integration record](docs/game-review/FINAL-DEMO-INTEGRATION-20260918.md). No full current qualification is inferred from older results.

The repository keeps required runtime files, source, test programs, authentic fixtures and compact provenance. Large recordings, traces, duplicate snapshots, provider secrets and dynamic voice caches remain local and ignored; [retention details](docs/TEST-ARTIFACT-RETENTION.md) explain historical links and the finite staging boundary. No source artwork was deleted to produce this package.

Product authority: [design package](docs/design/evidence-quest-design-v3/11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md), [task dependencies](docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json), [master checklist](docs/design/evidence-quest-design-v3/EVIDENCE-QUEST-MASTER-CHECKLIST.md), and [provenance](docs/PROVENANCE.md). No open-source license is granted. Local build commands do not deploy or publish the game.
