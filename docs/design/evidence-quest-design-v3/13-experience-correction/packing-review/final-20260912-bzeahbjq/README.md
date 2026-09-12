# Final production candidate evidence — September 12, 2026

Candidate: **App-BzEahbjQ / App-CvfCOyJg.css / index-CNmoZ-9P**. These are preserved copies of the builder's final outputs, checked by the parent against their source SHA-256 values. `integrity.json` records all 21 copied source paths and hashes. `summary.json` reports the two distinct browser runs and all 12 measured format conditions. Every raw qualification report was checked to be at or after the final format run's start; historical results were not substituted.

At final import reconciliation, the builder refreshed only the license inventory's `checkedAt` from 10:03:01.208Z to 13:30:58.855Z. The parent verified that its remaining contents were identical. This snapshot preserves the earlier inventory bytes and hash; the import receipt records that timestamp-only source drift. The other 20 copied source files still matched exactly.

| Evidence | Actual result | Scope |
|---|---|---|
| `final-rendering-matrix.json` / `.txt` | 63 passed; 0 failed, flaky or skipped | Affected rendering, recovery, foreground/narrator and five-arrangement browser cases across Chromium, Firefox and WebKit. |
| `final-production-contracts.txt` | 39 passed | Production contract/rule checks; not browser or child testing. |
| `production-codec-ledger-tests.txt` | 5 passed | Exact RGBA/deterministic codec and durable bounded-call accounting checks. |
| `final-formats-matrix.json` / `.txt` | 13 passed; 2 failed; 0 flaky or skipped | 12 browser/density/format cases plus three image-failure/retry cases. |
| Twelve `*-qualification.json` files | Transfer, code, usable latency, input and scoped memory limits pass in every condition | Three engines × DPR1/DPR2 × WebP/PNG; active visible rehearsal sampled. |
| `production-art-verification.json` | Required art and production derivative verification | Original-source provenance and 267 lossless WebP/PNG pairs; no image-quality downgrade inferred or authorized. |
| `production-tool-licenses.json` | Dated package inventory and source references | Provenance record, not a blanket rights/legal clearance. |
| `final-production-build.txt` | Production build output | Candidate identity; compilation alone does not qualify gameplay. |

The two remaining failures are WebKit DPR2 active animation cadence: **51 ms p95 WebP and 52 ms p95 PNG**, against the unchanged **33.34 ms** target. Their raw input measurements are 15 ms and 17 ms against <100 ms. All measured first-play/later-room transfer, code bytes, usable latency and scoped memory limits pass. Maximum current and global conservative memory estimates are **81,671,594 B** and **162,217,072 B**, within **96 MiB / 192 MiB**. No failed limit was loosened to declare a pass.

These results use the current Windows host, loopback and emulated density. RAF during active changing story pixels measures scheduling cadence, not physical-display FPS. Memory accounting estimates defined consumers/buffers, not total browser/GPU resident memory. The 63 affected passes do not mean every historical test was rerun; earlier failures and repair runs remain in their dated snapshot directories.

[Parent native review](../../PARENT-NATIVE-REVIEW.md) records final ordinary Continue → physical Replay premiere → earned reading, with preserved saves and three actual screenshots. [Preview restart receipt](../../preview-4176-restart.json) records the current authored server. The final architecture retains the existing single Store; the presentation-snapshot experiment was removed.

[Live evaluation](../../LIVE-EVALUATION-STATUS.md) remains separately halted after 1/75 attempts on `credit_balance_exhausted`; no successful model response is inferred. Physical-device review, actual app-window foreground return, participant enjoyment/learning, a recorded final demo and submission remain unperformed. The master checklist therefore keeps ER13.06–08 and Items 14–16 open.
