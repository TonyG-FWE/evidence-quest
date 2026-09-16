# Test artifact retention

On September 16, Tony requested committing and pushing everything required for the game, with unnecessary testing records removed to free space. Source, runtime assets, original design files, test programs and setup instructions remain in the repository.

Generated browser recordings, trace archives, screenshots, raw browser output and duplicate source/build snapshots are excluded from future commits. The approved cleanup removed 299 verified Playwright trace archives and per-test video recordings, freeing 6,669,862,038 bytes (about 6.7 GB). Trace archives were identified by their actual trace entries; videos were checked for their container header. The [removed-file inventory](../evidence/repository-checkpoint-20260916/removed-playwright-recordings.json) records their paths and sizes.

Automatic approval review rejected the broader removal of historical snapshots. Those snapshots and two incomplete recording archives remain local and excluded from the game commit. No source history or original artwork was deleted. This narrower cleanup does not require Git LFS and makes no account or billing changes.

Small verification summaries are retained to preserve the actual results, initial failures and open qualification gaps. Their historical links and hashes can refer to raw artifacts no longer available in the repository. A retained result is a dated observation, not a claim that the deleted raw capture can still be inspected. Historical archive-reconstruction scripts may need those captures; normal build and test commands do not.

The following records have active dependencies and remain available:

- `evidence/group-6-review-20260915/group-5-migration-inputs.json` and `evidence/group-7-review-20260915/group-6-migration-inputs.json`: authentic saved-game fixtures consumed by current contracts and browser tests.
- `evidence/er13/production-art-exports.json` and `evidence/er13/art-runtime-inventory.json`: verified artwork cache and original-asset integrity checks.
- `evidence/group-7-finale-20260915/content-manifest.json`: generated content manifest and its current build output directory.
- Original import receipts and the `parent-import-history` / `import-history` folders: preserved authoritative source bytes.
- `evidence/er13/live-evaluation/`: the persisted provider-attempt history, including the unchanged halt at exactly 1/75. Cleanup must never reset that ledger.

Runtime game code reads no testing records under `evidence/` or `output/`. Original game assets remain under `public/` and the design package. Required small records and fixtures are included in an ordinary clone; no large-file download is needed to play.
