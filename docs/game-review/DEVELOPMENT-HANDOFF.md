# Continuing Evidence Quest development

This workspace retains the playable game and the materials needed to iterate on it. On September 26, 2026 Tony requested a lean development workspace and explicitly declined retaining local demo recordings; his own recording is on YouTube. Local video captures and their generated players were removed. In-game voices, authored audio masters, microphone functionality and source code remain.

## What to keep

- **Product and implementation authority:** `docs/design/`, the narrative decisions under `docs/game-review/`, `BUILD-STATUS.md`, and the existing implementation-plan task IDs. The design package and its imported originals remain authoritative.
- **Application and tests:** `src/`, `server/`, `content/`, `contracts/`, `scripts/`, `checks/`, `browser-tests/`, `evaluation/`, configuration files and the reviewed package lock.
- **Game assets:** `public/` contains current art and authored voices. `assets/demo/manifest.json` declares the exact finite demo packet and where its files are hydrated. Do not treat `.cache/final-demo-review/assets` or the selected landscape paths as arbitrary caches: their selected files are build inputs.
- **Editable and supplied originals:** `evidence/hands-on-20260916/pilot/`, `output/tripo-reference-batches-20260917/`, `output/personal-landscape-20260918/` and `output/grass-tuft-20260918/`. These preserve model sources, fits, reference material, provenance and authoring inputs. All 143 supplied model hashes were reverified after cleanup.
- **Development tools:** the pinned local Node toolchain, Blender, texture/asset tools, installed dependencies and testing browsers. Git history remains intact.
- **Compact evidence:** actual pass/fail results, approvals, design decisions, import/asset inventories and durable provider accounting. Old screenshots, recordings and obsolete source/build snapshots are no longer generally available; a historical path or hash is not a promise that its raw capture remains present.

## GitHub versus local assets

The tracked repository includes the game source, selected runtime assets, design documentation, tests and retained evidence. It is sufficient for the packaged demo workflow described in the README. The full collection of editable/supplied originals is larger than the finite runtime packet and is **not all tracked in Git**. Keep the original folders above if continuing art or game development; a fresh GitHub checkout alone does not restore every local authoring source. The [local-only development inventory](../../evidence/lean-development-20260926/local-only-originals.json) identifies retained original files absent from the current Git index by path, size and hash.

No competition outcome has been assumed. This cleanup neither publishes the repository nor removes local originals. Cleanup maintenance edits are local until separately committed and pushed. The remote README may contain newer user edits; do not overwrite it from a stale local checkout.

## Run and verify

Use Node 24.21.x and the project's npm scripts. On this machine the pinned executable is under `.tools/node-v24.21.0-win-x64/`; put that directory on the terminal's PATH when Node is not already available.

```powershell
$env:EQ_GARDEN_AI_DEMO = '0'
$env:EQ_CAST_DYNAMIC_VOICE = '0'
npm run build:demo
npm run start:demo
```

The standard demo launcher uses `http://127.0.0.1:4364/garden`. The existing cleanup-session game remains on port 4496. Use owned loopback processes and avoid starting a second server on an occupied port. Providers are unnecessary for authored play and build verification. Do not resume TASK11.19 or reset any provider ledger; its recorded status is HALTED 1/75.

For subsequent implementation, follow the required checks in `AGENTS.md`. This cleanup passed the demo rebuild (including content/type/server checks), 251 handler contracts, 23 authored feedback checks, exact runtime/original asset verification, compiled-receipt verification and a fresh browser startup. It did not repeat the broad full-game/browser/performance matrix. The compiled bytes match the preceding candidate.

## Remaining development work

Read the current build status before changing behavior. Earlier broad browser failures, resource budgets, artwork approval gaps and broader TASK11.20/.21 qualification are still open. Accepted short-word pronunciation limitations are not complete audio quality acceptance. The interrupted last full-route repeat remains recorded as interrupted. Cleanup does not close any of those issues or establish learning outcomes.

Keep generated browser captures bounded. Demo public staging now cleans up after its awaited consumer succeeds or fails. Interrupted processes and diagnostic scripts can still leave outputs; remove them only after checking ownership and dependencies. Rebuild old test/experiment bundles from their source when needed instead of retaining multiple complete candidate trees.

See the [lean-cleanup record](../../evidence/lean-development-20260926/summary.json) and [retention policy](../TEST-ARTIFACT-RETENTION.md) for the exact preservation and removal scope.
