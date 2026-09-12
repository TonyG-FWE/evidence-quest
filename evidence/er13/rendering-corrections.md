# Bounded rendering corrections and retained failed comparisons

This record describes diagnosis, not acceptance. Final qualification is reported in production-qualification.json and the isolated final-formats-matrix.json. All targets remain unchanged except the already imported section10 format allocation. Source pixels and original gameplay rules are unchanged.

The CJ2 active matrix had8pass/7fail. Its old screenshots/reports remain in cj2-active-performance and cj2-active-formats. The prior settled-scene RAF samples were not active animation measurements. The current check samples two seconds during an actual running rehearsal, requires changed Canvas pixels and a changed committed story description, and keeps both Canvas consumers on screen. Raw input includes pixel readback cost without subtraction. These are scheduling/latency measurements on the Windows automation host, not physical display FPS.

WebKit DPR2 compositor diagnostics used the same actual rehearsal while changing a bounded implementation detail:

| Recorded candidate | Active p95 | Finding |
|---|---:|---|
| Before prepared poses |239ms|Both compositor and readback observations were slow. Readback alone did not explain the failure.|
| One-density preparation |164ms|Zero evictions; six later base-density poses still loaded.|
| Both densities plus exact static terrain/backplate |84ms|No active image loads or evictions; recurring rendering cost remained.|
| Static Stage props/frame/model/rail |53ms|Reduced recurring World work; still failed33.34ms.|
| Opaque synchronized Canvas contexts |57ms|No demonstrated cadence improvement by itself. Cold opaque rooms now explicitly retain the established light-wood color.|
| Stationary projection-only repaint |53ms|Keeps the unchanged room/actors, repaints the original projection rectangle; state/image/size/input changes force full rendering.|
| Primitive preference dependencies |51ms|Stops unchanged preference objects from rewriting root styles every tick.|
| Separate clock-only presentation snapshot experiment |50ms|No meaningful improvement. Removed from the final Store; its40-contract report and presentation-experiment.patch are retained only as an experiment.|
| Quiet diagnostic attributes on that experiment |51ms|Frame counters moved to a plain diagnostic property; unchanged cache attributes are not rewritten.|

The final build retains the existing single Store and React publication behavior. Its39 contracts include the new raster and encoded-response ownership/budget/failure checks. A stale compiled test for the removed experiment initially remained in TypeScript output; the retained final-contracts-stale-experiment.txt records that failure. prepare-checks now removes only generated test files whose matching source no longer exists, inside its fixed generated directory. The fresh39-test suite passes.

The two-second instrumented call diagnostic measured8ms total structuredClone,5ms freeze and1ms UUID time across28 ticks. Synchronous Canvas calls were also short; this does not measure deferred raster/compositing or total React commit cost. Deliberately suppressing World/whole-story/both drawing localized the larger recurring cost to World. Those frozen arms are explicitly excluded from gameplay and performance acceptance.

The final renderer reserves at most48MiB decoded Canvas images,24MiB exact-device-pixel static surfaces and8MiB shared immutable encoded responses. Every cached layer retains its source dependencies and is invalidated by image decode/retry, source state or device geometry. Incomplete layers are never retained as finished art. Static Stage caching is bypassed during physical operations; actors, cues and source-word overlays remain live. Current/global measurements additionally count native consumers, live backing/compositor buffers, encoded bytes plus an equal transfer-copy allowance, and the original reserves. These are conservative estimates, not measured GPU residency.

Forced PNG originally duplicated Home SVG and Canvas fetches because browser routing disables normal HTTP caching. The shared encoded-response pool fixes that actual cross-consumer behavior and supports the Home cover backdrop's previously missing PNG fallback. Home selects density from its real cover box. The fully loaded CaAvlVNZ Chromium PNG Home-to-Stage path measured4,700,228 encoded bytes under5MiB, with one high-density backdrop fetch reused by both consumers. Native Home, failed light-wood room, Retry and resized-cache screenshots are retained per engine.

The pre-final CaAvlVNZ WebKit DPR2 qualification passed raw input19ms, cold transfer3,587,141bytes and current/global estimates77,743,080/162,049,608bytes. Active p9554ms still failed. This remains a failed full check; the later final matrix determines the current verdict. No claim is made that the remaining issue is inherently unfixable or caused solely by the browser host.
