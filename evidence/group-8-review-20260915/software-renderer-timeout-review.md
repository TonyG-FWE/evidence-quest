# Review of the recorded software-renderer timeout

The failed `later Mara tells; Sol developed` run is preserved under the implementation task's `browser-chapter-outcomes` report and copied artifacts. Its error says the unchanged 450,000 ms whole-test budget expired. The reported 10.8 minutes also includes teardown.

The final error-context snapshot shows a completed adventure, but that snapshot alone does not locate the timed-out call. Inspection of the recorded trace shows the test was still advancing visible world speaking controls near the deadline. For example, `call@576` clicked **Continue speaking** from 448,173.762 ms to 451,169.471 ms in that trace's clock; the immediately preceding visibility query took about 468 ms. The initial possibility of a blocked final save read was therefore not established. No new save defect is inferred.

The implementation task's separate `renderer-probe/result.json` identifies full Chromium 149.0.7827.55 in headless mode using the RTX 3070 Ti through D3D11, with video and tracing enabled. That short ordinary-input probe collected 47 active samples at a 16.8 ms p95. Its result explicitly says it is a probe, not full-route qualification. The earlier software-renderer failure remains preserved.

The test configuration now selects installed full Chromium for the Chromium project and retains the older shell through an explicit environment option. The chapter timeout, expectations, game code, artwork and performance targets are unchanged. The complete 113-case run must finish on that documented environment before the integration review closes. Native review remains valid for its separately bound, unchanged game runtime.
