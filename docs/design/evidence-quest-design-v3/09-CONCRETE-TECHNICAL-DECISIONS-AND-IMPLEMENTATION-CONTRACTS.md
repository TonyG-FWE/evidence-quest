# Evidence Quest — Item 09: Technical decisions and implementation contracts

**Date:** September 11, 2026. **Status:** Defined — Item 09 complete as technical design; no game implementation.
**Case:** `sparkfest-little-bridge-001`, content version `3`.
**Scope:** complete Item 09. Item 10 remains the next dependency; this package is not a declaration of build readiness.

## 1. Selected architecture and decisions

Use **Canvas 2D for the illustrated world, React for native readable interfaces, and TypeScript for a single deterministic game store**. Save the case in the browser's IndexedDB. A small Node HTTP service serves the eventual built game and mediates optional coaching through OpenAI's Responses API. It never owns gameplay progress.

The live model selects an eligible response written in Item 07 after interpreting the player's optional explanation. Physical results, source access, tile outcomes, launch eligibility and the wording displayed to children remain authored. Direct help and prepared fallback work locally.

[Supporting contracts and verification index](09-technical-contracts/README.md).

### Authority and narrow resolutions

Read alongside [v3](Evidence-Quest-Complete-Game-Specification-v3.md), [05](05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md), [06](06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md), [07](07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md), [08](08-VISUAL-DIRECTION-AND-READABLE-DESIGNS.md), and the [master checklist](EVIDENCE-QUEST-MASTER-CHECKLIST.md). The Item 08 artifact register, state/transition crosswalks and provenance were used; its five current illustrated references were inspected. Supporting drawings specify functional behavior; the paintings specify finish.

| ID | Precise issue | Resolution |
|---|---|---|
| D09-C1 | Older v3 “source seen” and reset prose predates 06 C5 and preference separation. | Keep component/passage exposure distinct from access; New game retains preferences. No source wording changes. |
| D09-C2 | v3 already assigns a case/content identity. | Preserve that case ID and numeric content version 3. Add technical contentRevision=1, saveFormatVersion=1 and coachContractVersion=1; application build is separate. |
| D09-C3 | Another browser tab can save newer different progress; 06's specific known-record copy calls the other record older. | Use the existing general CT.RECOVERY.REPLACE_UNKNOWN warning for a conflicting visit; never call newer progress older. Same UI.RECOVERY.REPLACE and explicit replacement action. |
| D09-C4 | Initialization failures and an earlier usable save need precise technical copy. | The small [technical copy addendum](09-technical-contracts/technical-copy.json) owns loading, artwork/runtime failures and an explicit earlier-save recovery offer. It supplements 07 without rewriting clues or silently rolling progress back. |
| D09-C5 | Stage painting shows a recovered kit and docked Loop. | It is a quality/state reference, not the opening state. Layered assets must also depict the blank opening projection and absent resources. |

No other material narrative/mechanic inconsistency was found. Historical next-step wording in older documents does not override the master checklist.

“Documented” means an official capability or published condition checked on this date. “Target” awaits measurement. “External” identifies an unverified account/environment condition. Sources and licenses are in §9.

| Decision | Selected mechanism, requirement and rationale | Alternative / tradeoff | Later verification |
|---|---|---|---|
| D09-01 | Browser ES modules; TypeScript 5.9.3 strict; Vite 8.0.10; React/react-dom 19.2.7 with plugin-react 6.0.1. Node 24 LTS, initial deployment pin 24.21.0. | One browser app and service need no server-rendering framework. TS 5.9 provides the required checks; a later compiler is not a game requirement. These are a documented baseline, not a claim every package is latest. | Exact lockfile, peer compatibility, security patch review, clean install/build. |
| D09-02 | CanvasRenderingContext2D, requestAnimationFrame, layered raster art and sprite frames. | Painted detail does not require 3D. PixiJS 8.16 offers GPU batching but adds lifecycle work; its Canvas fallback was documented as planned. Phaser brings unused physics. SVG/DOM remain useful for controls. | Frame timing and decoded memory on modest laptop/phone; optimize cache/redraw before reducing illustrated finish. |
| D09-03 | Radius-2 collision; deterministic visibility graph over expanded authored rectangles; swept keyboard collision. | Keeps exact Item 05 approaches without a physics engine or approximate teleport. | Entrance/approach reachability, corner clearance, Loop dock channel. |
| D09-04 | Native DOM controls, headings, text, forms and owned focus; Canvas projects visuals. | Canvas overlays alone do not meet the readers, text editing and reflow requirements. | Keyboard, screen reader, touch, browser zoom and Largest/Roomier operation. |
| D09-05 | One immutable store, serialized command reducer and effect coordinator; React useSyncExternalStore subscription. | No second renderer/React puzzle copy; no additional state-management library. | Duplicate callbacks, interruptions and subscription cleanup. |
| D09-06 | JSON Schema draft 2020-12, Ajv 8.17.1, schema-linked TypeScript types, separate semantic validators. | One runtime format; no coercion, default insertion or deletion of unknown fields. | Ajv compilation, schema/type parity and full content references in later build. |
| D09-07 | IndexedDB current/previous case records in an atomic transaction, separate preferences, serialized compare-and-swap writes. | Async local storage; no accounts/cloud save. Browser data remains evictable. | Quota, private mode, racing writes, reload/fault checks. |
| D09-08 | Node native HTTP and fetch; same-origin /api/coach; OpenAI gpt-6-astra, effort low, strict nonstreaming selection. | Current flagship follows provider minors guidance. Smaller models cost less but require a separate evaluated decision. No SDK is necessary for this one endpoint. | Account access, live meaning/latency/refusal tests, youth-use conditions. |
| D09-09 | Authored operation by default; synthetic/adult fixtures for live evaluation; verified conditions required for live child input. | Every route and direct answer works without credentials. Prepared fallback is not a live interpretation. | External zero data retention and appropriate minors safeguards. |
| D09-10 | Later Render Node web service, one 0.5c-512mb compute instance, HTTPS; static files and API same origin. | Avoids free-service inactivity spin-down for a demonstration. Static-only hosting covers authored operation; serverless adds another runtime boundary. | Account/region, ingress, logging, bandwidth and actual deployment performance. |
| D09-11 | Node test runner for rules/contracts; Playwright 1.61.0 for future browsers; opt-in synthetic live evaluation. | Rule truth, browser behavior, model judgment and learning evidence are distinct. | Browser, player and live-model checks remain NOT_RUN. |

The checked model page lists no dated immutable Astra snapshot. Pin its exact ID, prompt revision and contract in configuration; record the returned model ID in evaluation and rerun fixtures before release and after announced model changes. Do not promise immutable behavior or automatically switch models.

## 2. Proposed structure, ownership and commits

This tree specifies the later isolated game project; it has **not** been scaffolded.

```text
evidence-quest/
  package.json, package-lock.json, .node-version
  index.html, vite.config.ts
  tsconfig.client.json, tsconfig.server.json, tsconfig.checks.json
  contracts/       # authoritative schemas and semantic invariants
  content/         # authored JSON from 05–07 plus technical addendum
  assets/          # Item 10 manifest and later approved exports
  src/core/        # store, reducer, selectors, intent/effect types
  src/physical/    # paths, approaches, staged operations, doors, follower
  src/story/       # pure puppet rules, cue/run commits, certification
  src/content/     # validation, canonical spans, conditional CT selection
  src/ui/          # native surfaces, focus, drafts, Arrange/Watch
  src/render/      # canvas layers, interpolation, decoded asset lifetime
  src/observations/# exposure and factual records
  src/save/        # IndexedDB, write queue and recovery
  src/coach/       # client lifecycle, eligibility and authored help
  server/          # static HTTP, canonical context, model adapter
  checks/          # contracts, content, deterministic rules and faults
  evaluation/     # explicit synthetic/adult live runner and results
  browser-tests/  # F01–F15 plus technical cases
  dist/client/, dist/server/ # generated output
```

| Owner | Accepts / reads | Sole responsibility |
|---|---|---|
| core/store | Validated intents and effect events | Owns CaseState, Session and Preferences. Allocates IDs/revisions outside the pure reducer. No DOM, storage, network, randomness or clock reads inside the reducer. |
| physical | World, Move to and object intentions; 05 geometry | Proposes paths and commits through the reducer. Animator cannot collect or dock independently. |
| story | Rail/run intentions and resource readiness | Calculates endpoints, commits one cue/finalization, issues presentation effects. |
| UI/focus | Store selectors, CT entries, native events | Submits intentions, draft edits and display reports. No separate durable draft in component state. |
| renderer | Read-only snapshot and animation plan | Draws/interpolates and reports a named endpoint. Never infers a rule from a visual frame. |
| observations | Committed events and displayed content reports | Appends records/exposure through the same reducer revision. No understood/mastery field. |
| save | Immutable snapshot and expected slot revision | Writes one transaction; reports matching acknowledgment/failure without replacing live state. |
| coach client | Explicit request, eligibility and current context | One response opportunity, context rechecks, authored fallback. No gameplay mutations. |
| server/model | Bounded request and server canonical content | Returns an authored move selection or failure; no access to local save, movement, rail or launch. |

Client/server may share pure contracts, content selectors and rules. Server configuration cannot enter a client bundle. Renderer cannot import saving/coaching. Replaying an observation never executes its event. React subscriptions/effects must dispose correctly under remount and development Strict Mode.

[Ownership crosswalk](09-technical-contracts/OWNERSHIP-CROSSWALK.md) assigns all 93 original UI states and 121 original transitions to handlers, preserving canonical content references and explicit exceptions.

Each intent has a unique ID, caseRunId, visitId, expected relevant revision and canonical target. Only one physical intention, active cue, save transaction and coaching opportunity may exist in each domain; these are independent, not a global game lock.

1. Normalize native input; ignore duplicate delivery of the same intent.
2. Check owner, target, location and real prerequisite. Return the exact 07 reason on failure without mutation.
3. Stage an operation. A path is replaceable. Recheck on reaching A before operating.
4. Endpoint, reduced-motion completion and controlled interruption call the same commit handler with the same operation ID. Accept only an active, uncommitted operation.
5. Apply atomic changes, append observation sequence, increment durable revision, notify readers and enqueue persistence. Ignore later obsolete callbacks.
6. New game changes caseRunId and invalidates old operations/requests. Acknowledging an old save never resets the current visit.

Repeated activation after completion is evaluated against current state: it may reopen the acquired kit, but never duplicates it. Rehearse/Launch while starting/playing are ignored. Explicit Restart while paused creates a new run.

## 3. Rendering, movement, input and asset interface

### Coordinates and paths

Keep 05's complete 120×80 frame and V/C/H/A geometry. Fit with s=min(availableWidth/120,availableHeight/80), center with letterbox offsets. Pointer conversion subtracts element origin and offsets, then divides by s. Reject letterbox clicks instead of clamping to an exit. CSS zoom/pixel ratio never changes logical coordinates.

Canvas backing dimensions are CSS dimensions × min(devicePixelRatio,2), rounded up. Reset the transform on resize; no compounded scaling. Text/focus rings stay in CSS pixels at 08 sizes.

Legal avatar centers lie in floor R(4,28,116,76) inset by radius 2, minus furniture rectangles expanded by 2. Rectangular expansion is conservative at corners. Build a visibility graph using expanded obstacle corners, current position, destination and authored A/door anchors. Connect legal segments that may touch boundaries but never enter obstacle interiors. Dijkstra uses Euclidean lengths; ties within 0.000001 use stable object/corner IDs. NPCs/following Loop are yielding figures, never hard cuts.

Movement uses a fixed 60 Hz step at 15 logical units/second; normalize diagonals. Sweep movement segments and stop at collision; diagonal sliding checks x then y. Cap delayed-frame catch-up at 100 ms; hidden tabs do not simulate movement. Save positions rounded to 0.001 only if still legal, otherwise retain last legal point. Renderer interpolates movement samples; persistence checkpoints at stops and at most once/second while walking.

Choose the shortest reachable listed A, with listed order breaking ties. Within 0.1 unit, snap to exact A, face the contact, recheck and operate. Keyboard Interact offers a named nearby candidate when its legal approach path is at most 2 units; activation walks that last segment before operating. Multiple candidates use the existing chooser. Native named object actions can request the full approach from elsewhere in the room. This technical tolerance avoids precision positioning without removing the physical approach. Focus alone never grants proximity. Blocked floor/unreachable targets use 07's existing reasons.

Named global room navigation chains adjacent doors using shortest physical route cost, ties by door ID. It does not append inspection. At a threshold, atomically commit destination room, avatar/facing and following Loop anchor. Clear held keys; require release before re-crossing the arrival threshold. A fresh command works immediately.

Loop follows legal path history 7 units behind. At an approach choose nearest legal floor at least 5 units from the avatar, preferring behind the path; brief overlap is allowed if needed. Door table anchors are recovery fallbacks. Only Loop uses the dock channel: staging (76,48), seated (76,35), avatar (86,48). Canceled pre-contact docking returns following on legal floor and keeps any opened flap. After contact, Loop stays docked. Projecting is the same entity.

### Targets and layering

Input priority: active native surface → visible actionable child → parent. Independent expanded hit regions open UI.WORLD.CHOOSER. Targets aim for 48 CSS pixels without expanding collision footprints. Noninteractive scenery and projected entities cannot intercept floor input.

Render painted floor/wall, rear layers, bounded projection, ground shadows, furniture/actor segments sorted by ground y/stable ID, safe foreground trim, then DOM focus/target indicators. Split tall furniture when needed. Keep y58–62 spine, exits, source faces and avatars at A unobscured. The console/interface cannot conceal a resolving cue.

Puppet rendering uses stable state plus one cue interpolation. Both banks, Pip, Grandma, seed, boats, roots and backpack stay understandable. Compact Watch enlarges the same state in another viewport, not another simulation. Puppets remain read-only.

### Input, focus and reflow

06 C1–C6, 07 labels and 08 layouts govern one task and one owned child workspace. Only the workstation accepts deliberate world-floor/door dismissal: cancel selection, settle/pause, then walk. Reading surfaces never click through.

| Owner | Input | Exit |
|---|---|---|
| World | Screen-relative arrows/WASD, native object controls, floor taps, Interact. | Escape settles/pauses and opens Pause. Stop walking cancels path only. |
| Task | Native controls, Tab and scrolling. | Close/Back restores parent; Return to room unwinds supporting views. |
| Text | Typing, selection, composition, ordinary editing. | No movement. Composition Enter does not submit. Close preserves draft. |
| Picker/held tile | Select/place, insert/replace/swap, move left/right, return/cancel; drag optional. | First Escape cancels at committed origin; next returns to room. |
| Confirmation | Native controls; safe cancel initially focused. | Cancel preserves case; acceptance alone resets/replaces. |
| Passive status | No input/focus ownership. | Arrival updates a quiet marker, never a surface. |

Clear held keys on blur, ownership change, task opening, visibility change and room transition. Unavailable meaningful controls remain named and explain their reason. Touch scrolling works outside the dedicated drag area; pointer cancellation returns an uncommitted tile.

Open focuses the heading, not a field. Blocking surfaces contain Tab with an immediately available exit; browser shortcuts remain outside game handling. Restore original invoker → current kit/tile representation → current room Move to. Preserve surviving parent scroll/selection; never focus a removed Media caddy.

Desktop applies only with at least 900×600 remaining usable space. Otherwise use compact full-room overview/named navigation. At 390×844 the overview is 390×260. Largest body is 36 px; Roomier source leading is 67.5 px. Use vertical action rows and independent scrolling, accounting for the on-screen keyboard. Keep Close/Return and active field reachable; never shrink decisive text or crop a bank to fit.

Use conditional CT.SCENE and CT.STORY descriptions. Announce committed captions once, not movement frames. Reduced motion shows equivalent endpoints; normal successful/no-op cues continue, unmet Hill/Flower pause. Sound/color/hover/speed are unnecessary. Access support is distinct from answer assistance.

### Item 10 export/loading contract

Original layered masters feed opaque high-quality WebP backgrounds with PNG fallback; alpha sprites/props/puppets use lossless WebP or PNG. Same-origin script-free SVG is allowed for original icons, not a replacement for painted cast quality. Later audio exports use MP3/WAV masters with equivalent visual information; no voice service is added.

Use 1440×960 base room exports (12 px/logical unit), with 2880×1920 versions where masters support them. Enlarging the current 1536×1024 painting does not manufacture detail. Actors/props need base/2× exports, transparent padding, a normalized image-local feet/pivot anchor and logical V bounds. AssetUse.anchor uses [u,v] in [0,1] across the complete padded frame; the frame's width/height and pivot agree across resolution variants. Static bounds are room-local; actor/puppet bounds are offsets from their current placement. Convert 05's normalized puppet projection positions into its fixed projection rectangle, then room coordinates. Preserve faces, clothing, paper edges, materials, warm light and current white Jo.

Animation is an authored sequence of frames/transforms/opacity with explicit endpoints and commit markers, not a whole prerecorded successful story. Crops and pivots do not define collision. Item 10 supplies individual IDs/files/frame counts/durations/provenance and substitutes; no individual manifest is created here.

Validate compact authored content first; decode current room/shared cast/story layers, then prefetch adjacent rooms at low priority. Cache current and adjacent decoded rooms only and release unused bitmaps. Optional decoration may be omitted on load failure. Missing informative art shows the technical limitation while named controls/descriptions remain usable; no missing picture is recorded as displayed. Invalid core content/geometry prevents starting that case and offers Retry/Back. A Canvas failure retains the specified non-spatial access. Neither degraded access mode is acceptable evidence of completed illustrated production quality.

**Unmeasured targets:** usable opening ≤5 seconds at 10 Mbps/100 ms latency; initial transfer ≤4 MiB, core code/text ≤1 MiB compressed, one room ≤3 MiB; current decoded scene ≤96 MiB and cache ≤192 MiB (not total browser-process memory). Aim 60 fps laptop, at least 30 fps compact, input feedback ≤100 ms and ordinary main-thread tasks <50 ms. Check compression against rich references at actual scale. Resolve failures through packing/cache/redraw work before lowering visual quality.


## 4. Concrete formats and information boundaries

The authoritative machine format is [contracts.schema.json](09-technical-contracts/contracts.schema.json); [CONTRACT-RULES.md](09-technical-contracts/CONTRACT-RULES.md) supplies required semantic constraints, construction defaults and field lifetimes. [examples.json](09-technical-contracts/examples.json) includes accepted and rejected examples. These are design fixtures, not captured child data.

Schema roots cover AuthoredContent, CaseSnapshot, SaveEnvelope, Preferences, CoachRequest, CoachResponse and Session. Objects are closed; fields are required, with null explicitly meaning absence. Empty arrays are valid where no item exists. Missing fields are invalid, not implicit defaults. IDs reference the actual 05/06/07 registry. JSON forbids executable content; text is rendered as text, never inner HTML.

A later content build transcribes canonical words once from 07 into TextEntry; source passages point to Unicode-code-point spans of those entries. Normalize document line-break notation to LF, preserving all decisive words and punctuation. Copies point to the same source/parts. The example fragment is deliberately incomplete; a production content build rejects completeness=example-fragment and requires every 05 access, all 548 existing CT entries/families, the technical addendum and all state/transition bindings. Do not parse Markdown opportunistically in the running game.

Distinguish these dimensions:

| Dimension | Authority and durable representation | What it cannot prove |
|---|---|---|
| Authored history | Canonical source/provenance, known storyMinute and intention/completed-event meaning | A player action time does not alter fictional 9:05/9:18 events. |
| Physical progress | Current room/feet, one Loop, committed object flags, caddy host, unique rail order/revision | Owning notes does not expose their wording. |
| Available content | Grants with legitimate access origin and available parts | Available does not mean scrolled into view or understood. |
| Displayed information | Exact text spans, frames/end marker, source origin and sequence | Presentation is an upper bound on possible reading, not attention/comprehension. |
| Draft / deliberate record | Immediate draft versus immutable private/crew-plan/Jo-delivery/evidence-delivery/coaching-submission snapshot | Autosaving is not delivery; selecting two details alone is not a reason. |
| Puppet/run | Current endpoint, active cue marker, run mode/order/revision, nextCue, finalization | A correct-looking endpoint before the trailing cue is not a completed run. |
| Assistance | Requested, selected and actually displayed content separately, level/origin/references | A hidden ready response has not helped the child yet. |
| Historical completion | First actually finalized successful premiere | Current rail eligibility and reading skill are independent. |

Source exposure reports are produced only by mounted, visible content or explicitly selected accessible equivalents after legitimate access. For text, collect the canonical character spans whose word rectangles enter the unobscured reading viewport; union coverage and allow a passage-specific hint only when its decisive complete span has been presented. No dwell timer or required scrolling. Visual frames/markers report their own completion. Do not send exposure reports merely from component mounting behind another surface.

Offscreen accessible reading can be difficult to observe: do not claim the screen reader spoke every paragraph. The existing passage picker/Describe controls explicitly present that chosen part in the owned readable region and permit equivalent reporting; ordinary accessibility access remains available even when its listening cannot be inferred. Under-recording is preferable to a false comprehension or unseen-content claim. There is no eye/attention monitoring.

E2 post acquisition grants its package; initial display reports frame 1 and the visible message spans only. Frame 2, frame 3, end marker, full description and cropped photo have distinct references. Full E2.a eligibility requires the explicit complete description, or complete frame sequence plus end marker. A recording-end hint needs later/end information or the actual Remy limit account; the first still cannot satisfy it. Enlarging the photograph never becomes full E3.

E6/E7 mounted, Stage/Courtyard and portable copies all resolve to E6/E7. Caddy collection changes ownership only; portable reading before seating is in hand, after seating first access approaches ST.RACK.BAY. Evidence reopening uses an acquired record. NAV.MEDIA becomes referenceable when displayed and means suitable indoor filming space, never confirmed occupancy.

NPC knowledge is authored firsthand knowledge plus the union of actually delivered selected facts. Remy does not learn E3 from standing near its board. A canceled approach delivers nothing. Full correction requires the relevant E3 scope/status facts, including earlier delivered parts when combined; partial presentation produces its partial branch. Quoted NPC accounts preserve their own origin and do not grant unseen files.

Observations use monotonic sequence numbers within caseRunId and visitId, not fabricated fictional timestamps. Sequence establishes relative player events even if the device clock changes. ISO writtenAt is diagnostic metadata only. Keep actual child wording and sourced before/after records; no generated rewrite, mastery score, ability diagnosis or automatic independence verdict. historyUncertain or possibly seen outcomes restrict recaps to neutral factual wording.

## 5. Deterministic actions and playback

Item 05's individual physical commit/recovery rules remain authoritative. The [ownership crosswalk](09-technical-contracts/OWNERSHIP-CROSSWALK.md) assigns their handlers; [CONTRACT-RULES.md](09-technical-contracts/CONTRACT-RULES.md) adds technical invariants. Core examples:

| Intention / guard | Commit and visible result | Cancel / persistence / record |
|---|---|---|
| Flatten CY.SOURCE.E3 at (92,48) | Only at flat-and-secured endpoint set noticeFlat; then render exact E3. | Earlier cancel stays curled without full text. Later close keeps flat. Record actual displayed spans separately. |
| Open source flap/drawer/request/caddy at its A | Set open when the readable/open surface is available. | Before endpoint restore closed. Opening caddy and collecting it are separate commits. |
| Collect at MD.ACCESS.E8 | Lift whole caddy; transfer host MD.RACK.STATION→ACT.PLAYER once. | Pre-lift cancel keeps opened recess; afterward keep carried. Four tiles/two notes remain canonical, unread unless inspected. |
| Seat kit at Stage bay | Approach (55,58); host→ST.RACK.BAY on contact, then walk to requested rail/control A. | Never seat at room entry; cancel before contact keeps carried. |
| Wake Loop / dock following Loop | Turned responsive pose→following; seated contact→docked. | Precommit restores standby/following respectively. Dock flap can remain opened. No second Loop. |
| Show evidence / explanation to Jo | At actual actor A and deliberate delivery commit, add record/received facts; display authored response. | Selection/private record alone conveys nothing. Cancel before delivery leaves NPC knowledge unchanged. |
| Start Toast | Reveal intent commits its durable revealed state at start; authored animation remains optional. | Leave/Skip settles revealed. Cancel approach before start stays covered. No clue or puzzle effect. |

Controlled interruption order is mandatory: stop walk/clear keys → cancel held tile → resolve physical action by its rule → settle active cue once and record displayed outcome → pause before next cue → settle Toast → open requested surface/focus. Passive save/help arrival does not interrupt. A mid-animation hard crash instead restores the last usable durable boundary, with possible-exposure uncertainty.

### Puppet rules and complete-run certification

Initial state: pip=left, seed=left, boats=separate, lit=false; Grandma remains at the right hill. Seed soil represents joint planting; roots appear only then.

| Tile | Deterministic endpoint | Result / continuation |
|---|---|---|
| TILE.FERRY | If seed left, seed→right; Pip unchanged. Otherwise unchanged. | changed or harmless noop. Both continue normally. |
| TILE.BRIDGE | boats→joined; Pip→right; seed left→right, otherwise retain seed. | changed or harmless noop; no return crossing. |
| TILE.PLANT | If Pip right and seed right, seed→soil. If already soil, unchanged. Otherwise unchanged. | changed/noop continue; unmet prerequisite pauses for inspection. |
| TILE.BLOOM | If seed soil, lit→true. Otherwise unchanged. | changed/noop continue; unplanted result is unmet and pauses. |

Success is pip right AND seed soil AND lit, evaluated **after all cues and run finalization**. Every unique order of zero to four tiles is legal to try. No sequence whitelist.

Run creation snapshots exact order/revision, assigns runId, initializes puppet state and nextCue=0, clears current certification for a new rehearsal and saves. Before each animation, create activeCue with ID runId:index, from/to/result, queue a save of that marker, then animate. Saving cannot block a playable session indefinitely; absence of marker acknowledgment means outcome history might be incomplete after a crash.

Cue commit checks matching active ID/index and unchanged arrangement revision, updates puppet to endpoint, appends that cue result once, advances nextCue, clears activeCue and enqueues save. Unmet pauses; a normal cue schedules the next begin event. Stop/inspect/leave commits only an already active cue and prevents that next begin. Before a blocking view appears, the endpoint/caption is made available and its exposure recorded.

After the last cue commits, nextCue equals order length, activeCue is null and finalization is pending. Normal playback dispatches finalize next; an intervening Stop/leave preserves this terminal state. Continue finalizes once without replaying the last cue. An empty rail reaches unsuccessful finalization with the existing empty-rail message. Do not certify a still-active trailing Ferry.

A successful finalized rehearsal issues certificate(runId,arrangementRevision). Launch/Replay requires physical kit/dock readiness and that current certificate, starts show mode from initial puppets, and preserves the qualifying rehearsal record. Premiere success finalizes the whole show and commits the first historical premiere before celebration. Skip/leave cannot undo it. Replaying never creates another first-completion milestone.

Continue retains actual run mode and next unfinished cue. Restart creates a new run from initial state in the same requested mode; restarting a premiere still requires its unchanged qualifying certificate. Rehearse explicitly starts rehearsal. Returning to Stage never autoplays.

An actual rail order change atomically increments revision, clears certification, archives the interrupted run as an observation and resets puppets/run. The 05 insertion/removal/swap rules apply. Selecting, canceled placement, same-final-position moves and end-bound Move left/right do not change revision or certification. Reset rehearsal clears run/current eligibility and puppets but retains order. Clear rail also returns tiles and increments revision only if the order changed. New game is the only whole-case reset.

All five final arrangements have identical success/Launch/payoff treatment, including the full trailing cue:
Joined Boats→Hill→Flower; One Boat→Joined Boats→Hill→Flower; Joined Boats→One Boat→Hill→Flower; Joined Boats→Hill→One Boat→Flower; Joined Boats→Hill→Flower→One Boat.

## 6. Live coaching and authored help

### Service and API contract

Primary service: OpenAI Responses API, POST https://api.openai.com/v1/responses, model gpt-6-astra, reasoning.effort=low, store=false, stream=false, background=false, max_output_tokens=1536, truncation=disabled. No tools, conversation, previous_response_id, images, audio, metadata containing child text, or requested reasoning summary. Use native server fetch with AbortController. Return only validated selection fields to the client.

The provider's strict text.format uses type=json_schema, name=evidence_quest_coach and strict=true. Derive its single object from $defs.ModelProposal using the exact projection in CONTRACT-RULES R06; send only the documented schema subset. Retain full local validation afterward. ModelProposal permits the 17 authored moves plus NO_ELIGIBLE_MOVE, a technical abstention with no child text. That result requires empty refs, interpretation=unclear and uncertain=true; the server maps it to status=unavailable, selection=null and the existing prepared-help offer. CoachSelection remains exactly the 17 authored moves. Never send the whole multi-root local schema to the model. Accept one completed assistant message containing one output_text JSON object; ignore recognized reasoning metadata without recording it. Refusals, incomplete status, missing/multiple messages, extra fields or invalid content take the bounded failure path; never render partial model text.

The server retrieves canonical passages/CT move meanings from its matching content bundle. The client sends identifiers and exposure/context claims, not replacement story text. Validate ID existence, source/exposure relationships, legal order/puppets, observed-outcome consistency and move eligibility; reconstruct source bodies server-side. Client state is not tamper-proof proof of reading. This is a coaching product, not an anti-cheat assessment.

CoachRequest contains identity, request ID, context visit/revision, explicit topic, optional-selected references, exposure/assistance state and nonempty explanation (1–600 Unicode code points). Each reported observedOutcomes entry carries its refId, tile, from/to puppet state and result; observedOutcomeRefs must resolve within that set. The server recomputes each endpoint using the pure tile rules and never converts outcome evidence into a note citation. Whitespace-only text uses local topic help and is not sent. Preserve over-limit drafts visibly; show the existing shortening message and counter; never truncate. Count Array.from(text).length consistently with schema maxLength, so an emoji surrogate pair counts once. Preserve raw wording; trim only to test emptiness.

The response envelope echoes request/visit/context revision, has a bounded status and either one CoachSelection or null. Selection contains allowed moveId, coarse interpretation tag, permitted refs and uncertainty. Server checks semantic eligibility in the [coaching matrix](09-technical-contracts/COACHING-AND-EVALUATION.md); client repeats those checks against the still-current context before display. A valid structure cannot establish that an interpretation is correct.

If ambiguous, CLARIFY has uncertain=true and no invented referent. Clear spelling variants or pronouns resolved by context are acceptable. A bare tile order may receive ARRANGEMENT_ONLY when physically ready; it cannot receive a comprehension conclusion. VALID_DIRECT/VALID_EXTRA require expressed meaning supported by displayed notes or actual outcomes; no fabricated note citations when the child experimented. Unknown details retain uncertainty; off-topic or override text receives RETURN_TO_CASE. The model has no executable action field.

An eligible move set may contain several possibilities; the model chooses using meaning. Same state, different explanation must distinguish FULL_PROMISE from BOAT_CAPACITY, CLARIFY, VALID_EXTRA and ARRANGEMENT_ONLY. If state excludes an appropriate meaning-sensitive source hint, return prepared access/attention help without inventing the missing citation or claiming a diagnosed error.

### Relevant context and races

Context revision is independent of durable save revision. Increment on room change, relevant Loop/kit transition, availability/exposure change, selected topic/reference/lead, changed explanation or theory text, actual rail revision, cue start/commit/reset/finalization, displayed outcome, delivered NPC information, or newly displayed assistance. Record the same explicit context projection with the request; compare both revision and its values.

Do **not** increment for save acknowledgments, focus, mere scrolling with no new exposure, pixel-size changes, sound settings, decorative Toast frames, avatar movement within the same room, or a held tile that leaves the order unchanged. A changed context that later returns to the same values is still newer; it cannot revive an old response. Request IDs include a new visit's identity, so reload never resumes old network work.

| Lifecycle state/event | Required behavior |
|---|---|
| Help opening | Apply interruption order first; then snapshot context if requested. Preserve acknowledged draft. Opening alone sends/reveals nothing. |
| Help me think with empty text | UI.COACH.TOPIC; choose a relevant explicit topic and display authored attention. No live request or alleged text analysis. |
| Submit | Capture immutable coaching-submission record and context; allocate request ID; UI.COACH.PENDING. One current opportunity only. |
| 2 seconds elapsed | UI.COACH.WAITING target; gameplay remains available. |
| 8 seconds elapsed | UI.COACH.FALLBACK_OFFER target; prepared content remains hidden until accepted. Closed panel gets Help available. |
| Current valid result before an offer | Open unchanged surface may show response; closed surface holds READY_CLOSED with no content announcement. |
| Result while fallback offer exists | Keep the offered control stable, especially if focused; hold reply and add View new reply. It never replaces a button under the pointer/focus. |
| Reopen / View new reply | Recheck current context and winner first. Only then display the authored CT entry and record assistance once. |
| Continue walking / close help | Request can continue until deadline/context change. No focus stealing or forced opening. Closing is not canceling. |
| Draft edit / relevant state change | Mark pending/held opportunity stale; abort best effort; discard any later result. Preserve new text, show existing stale message only when appropriate. |
| Cancel or replacement | Tombstone old opportunity; retain draft. Replacement captures a fresh request only on explicit submission. |
| Accept prepared hint | Atomically set winner=fallback, tombstone live opportunity, display state/topic-selected authored text, record actual help. Late live response is ignored. |
| Show me a way | winner=direct immediately; choose exact local CT.DIRECT by 07 priority. Never wait for a model, even with unread notes. Record introduced facts, not entire sources read. |
| 15-second server / 20-second client deadline | Abort best effort; status timeout and fallback offer. No silent automatic retry. Server deadline is measured from request admission; client deadline from explicit submission. |
| Failure/refusal/invalid output | Generic authored unavailable/fallback UI; internal details stay out of children's interface. Retry creates a new ID/context at explicit request. |
| Reload | Discard live requests/held undisplayed replies; restore acknowledged draft. Earlier displayed help remains historical. No automatic resend. |

Only rendering a useful response in the active readable region (or explicit accessible presentation) records help-displayed and assistance. Request/selection alone does not. Displaying the winning response increments assistance context after validation; it must not retroactively discard itself. Later changes label it Earlier help. A previously hidden response never becomes history merely because it arrived.

One active request per client; server allows four concurrent upstream calls with no queue, at most six attempts/minute per visit and 100 attempts per process lifetime. Exceeding a limit yields busy/prepared help; limits do not affect gameplay. These are bounded demonstration defaults, not a global billing cap across restarts. No automatic retries. Same request ID/body is admitted at most once within a ten-minute bounded tombstone cache; conflicting reuse is rejected. Cancellation may not stop provider processing/billing. Client JSON request limit is 32 KiB and client CoachResponse envelope limit is 8 KiB. Bound the provider's complete wire response separately at 256 KiB, including metadata; the extracted proposal must still fit the client contract. Canonical model input target is ≤2,000 tokens with a hard assembled UTF-8 limit of 16 KiB. Reject oversize context to fallback rather than dropping source boundaries silently.

### Authored selection

07 §7.3 remains authoritative. Explicit story-arrangement direct topic selects CT.DIRECT.RAIL even before notes/delivery, followed by actual missing-resource status only. Otherwise select unresolved resource state first (SEARCH/KIT/FOLLOW_KIT/DELIVER variants), then current Launch/Replay condition, then RAIL. It never moves an actor or places a tile.

Ordinary fallback uses state and explicit topic: search→SEARCH_ATTENTION (or the known-topic clarification); untried story→STORY_UNTRIED; displayed result→STORY_ATTENTION; accessible unread notes→NOTE_ACCESS. After an explicit repeat, the already exposed promise and actual seed-right/Pip-left result permit PROMISE_ATTENTION→PROMISE_SOURCE→PROMISE_RELATION. No escalation from waiting/travel or keyword-derived diagnosis; level 4 remains explicitly requested. The exact eligibility/precedence and representative semantic evaluations are linked above.


## 7. Saving, recovery and data handling

Use IndexedDB database evidence-quest, database version 1, object stores caseSlots (keys current and previous) and preferences (key current). Store validated JSON strings; the schema covers their payloads. Two case copies and preferences are updated only through the save adapter. No localStorage mirror, cloud storage, service worker save or account is added.

Request strict transaction durability where supported, otherwise use the browser default. Acknowledgment requires transaction completion, not an individual put success. This is the browser's local transaction acknowledgment, not guaranteed survival of eviction, device failure, private-session closure or power loss. Saving language remains CT.SAVE.SAVED; genuine failure gets CT.SAVE.FAILED/DETAIL.

### Write protocol

- CaseState.revision increases for each durable change; observation seq orders recorded events independently. Session holds currentRevision, requestedRevision and acknowledgedRevision. Only the latest equal revision may display Saved.
- Keep one transaction in flight. Coalesce queued requests to the newest complete immutable snapshot. After it completes, write the newest queued revision if different. Do not merge stale partial snapshots.
- In the readwrite transaction, compare current slot revision **and stored JSON bytes** to the adapter's last acknowledged/read head. Different head means another visit changed progress: do not overwrite automatically. Enter the existing replacement flow while current play continues.
- In one transaction, rotate a known validated current head to previous and write the new current head with slotRevision+1. Never replace a usable previous record with a known damaged current record.
- Acknowledge only matching caseRunId, visitId, state revision and transaction token. An older acknowledgment may advance that transaction's bookkeeping but cannot clear a newer pending indicator or replace the current case.
- Actual physical/rail/cue/finalization/source/help/record commits enqueue immediately. Draft edits update memory immediately and save after 400 ms idle, at most 2 seconds during continuous editing. Close/task switch flushes the latest draft request, without waiting or claiming a write succeeded. Source scroll/resume selection is debounced 400 ms.
- Maximum serialized case save is 2 MiB. Do not silently truncate child text or delete observations to fit. If exceeded or quota fails, show the existing saving limitation, retain current session, and permit Retry of its latest state. This is a save bound, not an explanation/gameplay lock.
- Failed write leaves current memory playable and the previous transaction intact where the browser preserves it. Retry writes the latest state. Pending writes for a retired case cannot be issued after New game; an already running transaction may finish, then the new-case snapshot follows. Report failed replacement honestly.

### Read and restore

Startup gets a five-second UI budget. If read/validation has not resolved, UI.RECOVERY.READ offers Retry, Play without saving, Back and Settings. Timeout is not proof of an empty slot. Use a read-generation ID so a late older check cannot replace a current visit.

Read current first. If invalid/incompatible, inspect previous without modifying either. A validated compatible previous record adds CT.TECH.PREVIOUS and the existing Continue control to UI.RECOVERY.DAMAGED or UI.RECOVERY.VERSION. Keep that recovery heading as initial focus; Back preserves both records. Continue adopts the earlier complete state into a new live visit, paused as applicable, and returns to UI.WORLD.IDLE with UI.SAVE.SESSION/CT.SAVE.DETAIL and saving.mode=conflict. It does not overwrite either slot. Try saving again uses UI.RECOVERY.REPLACE and CT.RECOVERY.REPLACE_UNKNOWN; acceptance writes the latest live state while preserving the usable previous record, with the same head recheck. Cancel stays playable and unsaved. Do not silently rewind an active visit. If no usable compatible record exists, preserve raw records until explicit reset/replacement.

Validate JSON, envelope/identity, physical/investigation/reference integrity, then playback separately. Unknown save/content revision is incompatible, not migrated by guesswork. Invalid structures or impossible physical/source/ownership facts are damaged. If only the pending playback is invalid while the physical/order, source, records and historical completion groups independently validate, retain those groups, discard that run/current certificate and enter UI.RECOVERY.RUN. Do not salvage selected flags from an otherwise untrusted case. A bad historical completion must not be synthesized from a successful-looking order.

A valid active/paused run restores at its committed boundary, paused in its actual mode. An active marker restores the unfinished cue with a possibly-exposed outcome observation, never a claim it was unseen. Invalid drag/path/delivery intentions disappear. Retain acknowledged drafts, current physical host and valid readable source/component/scroll, with focus on its heading. Invalid view owners resolve through current kit/tile owner or Move to. Acquired E6/E7 do not disappear because the physical copy moved.

Every restore from disk sets historyUncertain=true for the interval after the last acknowledged snapshot: even a snapshot with no active marker cannot prove nothing else was displayed before the page ended. A saved active marker additionally identifies its specific possibly exposed cue. This conservative uncertainty changes no physical progress or reading access; records still support factual recap. Same-page Continue retains the live visit and does not manufacture a crash. No guaranteed final browser-close event or custom close confirmation is promised.

Choosing Play without saving after an unknown read starts a separate in-memory visit and preserves the old slot. A later successful read cannot auto-save over it. Explicit Retry saving opens UI.RECOVERY.REPLACE; accept replaces current slot once, cancel remains unsaved. For a known conflicting visit use D09-C3 wording. A further competing write before a known-head replacement commits reopens conflict rather than overwriting newer work.

Back to start retains the current page's live visit, even if unsaved; Continue uses it before durable data. Browser backgrounding, if delivered, applies controlled interruption and attempts saving. Foreground return clears held keys and never auto-walks, auto-plays or resends help.

New game confirmation describes the whole-case reset using CT.RESET.SCOPE and initially focuses Keep playing/Keep saved game. Cancel changes nothing except the already-required playback pause. Accept allocates a new caseRunId, resets case/kit/Loop/sources/ideas/history and retains preferences. If writing that new case fails, CT.SAVE.OLD_MAY_RETURN explains that an older game may return on reopening. Preference writes have separate revision/status and failure copy; a preference failure does not falsely report case loss.

### Minimum data and external youth-use constraint

The server receives only the current bounded explanation, source/context identifiers, selected facts and relevant puppet/assistance context. No name, date of birth, school, voice, whole save, other documents or persistent user profile is requested. It forwards the minimal reconstructed context, not a full case transcript. Do not rely on a personal-data filter as proof that arbitrary text contains no personal information.

Application request bodies, raw provider replies and child wording are not logged or persisted server-side. Keep in-memory cancellation/rate metadata for up to ten minutes; aggregate operational counts/status/duration may be logged without text or identifying client fields. No third-party analytics. Hosting/provider transport logs and retention remain separately subject to verified settings; do not claim they vanish because application logging is off.

OpenAI documents that processing personal data of under-13s requires zero data retention first and recommends current flagship models for experiences serving minors. Account approval/settings and appropriate safeguards have not been verified here. Therefore COACH_MODE defaults to authored. Adult-evaluation mode is loopback-only with synthetic/adult-written fixtures. Public child-live activation requires recorded account eligibility, data controls and minors-safeguard review; setting a flag alone is not that evidence. No accounts, birthday form or parental workflow is designed here. [Under-18 guidance](https://developers.openai.com/api/docs/guides/safety-checks/under-18-api-guidance).

The provider documents default abuse-monitoring retention of up to 30 days, subject to exceptions; zero data retention requires eligibility/approval. store=false does not itself establish zero data retention. API content is not used for model training by default unless opted in. Retain neither conversations nor raw prompts in this app. [API data controls](https://developers.openai.com/api/docs/guides/your-data).

## 8. Local operation and later hosting

These commands are the **future project's operating contract**, not commands executed in this design task. A package/lockfile and their scripts must first be created in the later authorized build.

| Command | Required behavior |
|---|---|
| npm ci | Install exact checked-in lockfile; no broad upgrade. First build creates/reviews that lockfile after verifying the baseline pins. |
| npm run validate:content | Validate full canonical content, exact CT words/spans, all ID references, geometry anchors and manifest bindings; reject example fragments. |
| npm run check | Type-check client, server and checks; validate schema/type fixtures; report all failures. |
| npm run build:server | tsc -p tsconfig.server.json → dist/server. NodeNext ESM, target ES2022; relative imports use .js paths. |
| npm run dev:types | tsc -p tsconfig.server.json --watch; separate terminal after initial build. |
| npm run dev:api | node --env-file-if-exists=.env.server.local --watch dist/server/index.js. Default 127.0.0.1:8787; fail if occupied. |
| npm run dev:web | Vite at 127.0.0.1:5173, strictPort=true; /api proxy to the configured loopback API port. Fail instead of taking another project's port. |
| npm run test:contracts | Compile check sources and run Node test runner; no provider calls. |
| npm run build | Content/contract validation and type check, server compilation, Vite client build → dist/client; include required license notices. |
| npm run start | node --env-file-if-exists=.env.server.local dist/server/index.js; serves built client and API. Vite preview is not the production server. |
| npm exec playwright install chromium firefox webkit | Future explicit browser installation only. Pin browsers to the locked test package. |
| npm run test:browser | Run F01–F15 and technical scenarios at desktop/compact/Largest/reduced motion; retain screenshots and results, not child data. |
| npm run eval:coach -- --mode authored | Evaluate deterministic eligibility/fallback fixtures; no API use. |
| npm run eval:coach -- --mode live --fixtures synthetic | Explicit paid evaluation only after separate authorization/configuration; 3 trials per case, record errors, moves, latency and token cost. Never auto-run in build/CI. |

Client compiler: strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, jsx=react-jsx, moduleResolution=bundler, target ES2022, noEmit. Set Vite build.target explicitly to chrome111, edge111, firefox114 and safari16.4; do not depend on a changing default target. Server/checks: same strictness, NodeNext, ES2022, separate output, no browser dependencies. Vite's React plugin handles JSX. Runtime validation uses compiled standalone Ajv validators in the client so production CSP need not allow eval; server can compile known schemas at startup. Reject untrusted remote schemas.

The browser uses relative /api/config and /api/coach. /api/config exposes only content/contract versions and whether live help is available. /healthz returns status without secrets. Same-origin JSON POST only, bounded body, allowed Origin/Host, no wildcard CORS. Serve known built files with path containment and correct content types; no arbitrary filesystem paths. Cache hashed assets immutably, entry/config no-cache, coaching responses no-store. CSP restricts scripts/connect/images to self; no model output becomes HTML.

| Server configuration | Default / meaning |
|---|---|
| OPENAI_API_KEY | Server-only secret, absent by default; .env.server.local ignored by Git. Never VITE_ prefixed. |
| COACH_MODE | authored; alternative adult-evaluation (loopback only) or child-live only after external eligibility evidence. |
| OPENAI_MODEL | gpt-6-astra; reject unevaluated override in release configuration. |
| COACH_PROMPT_REVISION / COACH_CONTRACT_VERSION | 1 / 1; versioned with evaluation fixtures. |
| COACH_SERVER_DEADLINE_MS | 15000; bounded client overall deadline 20000. |
| COACH_MAX_CONCURRENT / COACH_MAX_ATTEMPTS | 4 / 100 per process; rate/cost limitations above. |
| HOST / PORT | 127.0.0.1 / 8787 locally. Render binds 0.0.0.0 and its supplied PORT. |
| PUBLIC_ORIGIN | Actual browser origin; local default http://127.0.0.1:5173 for dev proxy. |
| CONTENT_DIRECTORY / STATIC_DIRECTORY | App-owned resolved paths, never user-supplied URLs or arbitrary project paths. |

With no key/network, build/start remains usable and prepared/direct help behaves identically to the authored rules. Invalid live credentials disable live requests and offer authored fallback; never fail the case. Reviewer evaluation distinguishes origin=live-selection, authored-topic, authored-fallback, authored-direct or NPC in local records and separate adult evaluation output. The child sees only approved labels such as Prepared hint, not model/provider diagnostics.

Later hosting: Render Node web service, one paid 0.5c-512mb instance, selected nearby US region after account check, build npm ci then npm run build, start npm run start, Node pinned via .node-version, health path /healthz, HTTPS and the assigned public origin. No persistent disk or database. Keep production authored until live-child conditions are verified. Account creation, repository publication, provisioning and deployment are not authorized or performed by this document. No hosting credentials have been inspected.

## 9. Official documentation, licenses and costs

Verification date is September 11, 2026. Context7 resolve-library-id followed by query-docs was used for React, Vite, PixiJS, TypeScript, Ajv, Node, MDN, Playwright, Render, OpenAI and the local PowerShell validator. Primary sources below fill current release/license/pricing gaps. A tutorial or package-name listing is not evidence of account access.

| Dependency / policy | Verified capability and distribution condition | Official reference |
|---|---|---|
| React/react-dom 19.2.7 | External-store subscription and imperative integration documented. MIT: retain copyright/license notice in distribution. | [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore), [release license](https://raw.githubusercontent.com/facebook/react/v19.2.7/LICENSE) |
| Vite 8.0.10 / plugin-react 6.0.1 | Official React TS template uses plugin 6.0.1; client-prefixed VITE variables are exposed. MIT repository/plugin licenses; retain notices. Release package/transitive license inventory remains first-install evidence. | [pinned template](https://raw.githubusercontent.com/vitejs/vite/v8.0.10/packages/create-vite/template-react-ts/package.json), [environment guide](https://github.com/vitejs/vite/blob/v8.0.10/docs/guide/env-and-mode.md), [Vite license](https://raw.githubusercontent.com/vitejs/vite/main/LICENSE), [plugin license](https://raw.githubusercontent.com/vitejs/vite-plugin-react/main/packages/plugin-react/LICENSE) |
| TypeScript 5.9.3 | Bundler/NodeNext/JSX options documented; selected compiler baseline. Apache-2.0; retain license/required notices and mark redistributed modifications. | [compiler option guidance](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html), [release license](https://raw.githubusercontent.com/microsoft/TypeScript/v5.9.3/LICENSE.txt) |
| Ajv 8.17.1 | Ajv2020 supports draft 2020-12; Unicode string lengths and meta-validation. MIT; include notice for distributed runtime/standalone code and applicable dependencies. | [JSON Schema](https://ajv.js.org/json-schema.html), [standalone validators](https://ajv.js.org/standalone.html), [release license](https://raw.githubusercontent.com/ajv-validator/ajv/v8.17.1/LICENSE) |
| Node 24 LTS | HTTP, fetch, AbortController, test runner and TypeScript limitations documented. Pin a supported 24.x security patch, initially 24.21.0. Core MIT plus bundled third-party notices; preserve runtime licenses if redistributed. | [release status](https://nodejs.org/en/about/previous-releases), [24 archive](https://nodejs.org/en/download/archive/v24), [CLI](https://nodejs.org/docs/latest-v24.x/api/cli.html), [license](https://raw.githubusercontent.com/nodejs/node/v24.21.0/LICENSE) |
| Native browser APIs | Canvas image scaling, pixel-ratio handling, IndexedDB completion/durability are documented capabilities. No separate browser library shipped. API support must be feature-tested; syntax transformation is not a polyfill. | [Canvas images](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images), [pixel ratio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio), [IDB transactions](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction), [storage limits](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) |
| Playwright 1.61.0 | Chromium/Firefox/WebKit projects and explicit browser installation documented. Apache-2.0 plus separate browser notices; test tooling is not shipped in the game. | [projects](https://playwright.dev/docs/test-projects), [release license](https://raw.githubusercontent.com/microsoft/playwright/v1.61.0/LICENSE) |
| OpenAI gpt-6-astra | Responses, structured outputs and low effort documented; current flagship. Hosted API terms, not redistributable weights. No free-tier/access/credit/ZDR assumption. | [model](https://developers.openai.com/api/docs/models/gpt-6-astra), [structured output](https://developers.openai.com/api/docs/guides/structured-outputs), [reasoning limits](https://developers.openai.com/api/docs/guides/reasoning), data/minors sources in §7 |
| Render | Node web services use configurable build/start and platform port. Current 0.5c-512mb plan is former Starter, 512 MB/0.5 CPU. Hosted-service terms apply. | [web services](https://render.com/docs/web-services), [compute plans](https://render.com/docs/compute-plans), [pricing](https://render.com/pricing), [workspace changes](https://render.com/docs/new-workspace-plans), [bandwidth](https://render.com/docs/outbound-bandwidth) |
| Fonts | Keep Segoe UI, Arial, sans-serif as installed-font names only; distribute no font binaries. Use platform sans-serif fallback if neither exists. CSS naming/rendered graphics permission does not grant webfont redistribution. | [Microsoft font FAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq) |
| Local validation tool only | PowerShell 7.6.5 Test-Json and bundled Python 3.12.14 used for document contracts; neither is a game dependency. Ajv itself was not installed/executed here. | [Test-Json](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/test-json) |

Target browser syntax floor is Chrome/Edge 111, Firefox 114 and Safari 16.4; qualify current stable desktop Chrome/Edge first, then Firefox/WebKit plus actual Safari/phone touch. Canvas2D, PointerEvent and IndexedDB availability are detected separately. Text/focus fallback must work on a machine without Segoe UI/Arial using the same 08 size/reflow contract. No font file is extracted from Windows. Later cross-platform metrics/visual checks are required; this document does not claim they passed.

Exact versions are locked without ^ or ~ for direct dependencies at implementation; transitive versions use the reviewed lockfile. Matching @types/node 24 and @types/react/react-dom 19 are development-only with their actual MIT/notice records checked at install. Security patch changes within the selected approach require lockfile update and relevant checks; a major/provider change needs a documented decision. No dependency has been installed for the game.

### Cost assumptions — USD, September 11, 2026

Astra standard pricing is $10 per million input tokens and $50 per million output tokens; documented cache-write input is $12.50 per million. Output estimates include reasoning tokens, not just the short JSON reply. Use no tools, batch, priority/fast mode or extended-context pricing. Assume 2,000 input tokens and 400 total output tokens per attempted request: approximately **$0.040–$0.045**, allowing the cache-write rate for the upper input estimate. Actual token use/latency remain unmeasured. [Model pricing](https://developers.openai.com/api/docs/models/gpt-6-astra).

| Assumed use | Model estimate |
|---|---|
| 20 live attempts in one demonstration/evaluation visit | $0.80–$0.90 |
| 100 synthetic/adult evaluation attempts | $4.00–$4.50 |
| 2,000 attempts across later sessions | $80–$90 |

The 1,536-output-token ceiling can cost substantially more than the 400-token estimate; canceled/incomplete attempts may still incur charges. No automatic retry or “free fallback model” assumption. Prepared/direct local help has no model token cost.

Render lists the selected compute at **$7/month**; workspace subscription, bandwidth and other metered charges are separate. Current Hobby workspace documentation lists 5 GB outbound included and $0.15/additional GB; account plan/aggregate usage are unverified. Exclude taxes, domain, artwork/audio production, development labor and other services. These estimates authorize no charge. [Render pricing](https://render.com/pricing), [workspace allowances](https://render.com/docs/outbound-bandwidth).

## 10. Technical scenarios and evaluation evidence

[TECHNICAL-TRACES.md](09-technical-contracts/TECHNICAL-TRACES.md) traces all 15 Item 06 flows and required technical races through actual IDs, prerequisites, commits and recovery. [COACHING-AND-EVALUATION.md](09-technical-contracts/COACHING-AND-EVALUATION.md) contains exact synthetic explanations, allowed moves and prohibited conclusions. [validation-report.json](09-technical-contracts/validation-report.json) records the executed checks and limitations.

Executed on September 11: all 35 JSON Schema expectations matched; all 29 schema-valid examples matched their expected bounded semantic outcome; 28 rule/reference check groups passed. Exhaustive evaluation of 65 unique tile arrangements yielded exactly the five valid results. The crosswalk contains each of the 93 UI states and 121 named transitions once, and its registry matches the 548 canonical CT declarations. Five foundation-document hashes remained unchanged. See the report for individual limits; these counts are not implemented gameplay or learning evidence.

Evidence classes remain separate:

- **Executed contract checks:** schema examples, reference/coverage checks and isolated finite-state/race checks listed in that report. They execute no actual game.
- **Written design checks:** F01–F15 and detailed scenario traces.
- **NOT_RUN:** install/build against the selected stack, real IndexedDB transactions, browser/input/accessibility/performance, live model interpretation/latency, child playtesting and learning evaluation.

Future live evaluation uses at least three trials per semantic case; compare eligible move, grounding, uncertainty and banned claims. Zero source leaks or invented actions are allowed. Report observed case counts/errors and latency distribution, not a fabricated accuracy claim. A disappointing result requires prompt/eligibility/model review and a rerun; deterministic prepared fallback does not pass a live-meaning test.

## 11. Item 09 completion crosswalk

| Master checklist subitem | Concrete evidence |
|---|---|
| Renderer/runtime/navigation/native interface/project structure | §§1–3; full UI/transition ownership crosswalk; exact 05 geometry retained. |
| Service, live/authored distinction, schemas, eligibility, cancellation and observations | §§4/6–7; machine schemas, semantic coaching matrix and race traces. |
| Content/world/puppet/save formats, versions and recovery | Schema roots and CONTRACT-RULES; §§4–5/7; accepted/rejected fixtures. |
| Current docs, licenses, access/operating limits, server secrets | §§7/9; dated official sources and explicitly unverified account settings. |
| Local development/evaluation and later hosting | §8 command/configuration contracts; §§9–10 costs and qualification boundaries. |

Technical preparation can be complete with external live-use conditions unresolved because the selected contracts and authored operation are fully specified. It does not mean the game is built or every selected dependency was installed/tested. The checklist update is limited to Item 09 and necessary next-step pointers.

## 12. Remaining constraints and exact Item 10 handoff

| Constraint / decision | Current assumption and required evidence | Impact |
|---|---|---|
| U09-01 / D09-08–09 | Account can later access Astra; neither credentials nor credits checked. Require successful authorized synthetic evaluation and verified limits. | Live integration/evaluation, not local authored implementation. |
| U09-02 / D09-09 | No verified zero-data-retention approval or minors-safeguard review. Require actual account controls and appropriate release review, not an environment flag alone. | Blocks live child text use; authored child play and adult/synthetic local evaluation remain specified. |
| U09-03 / D09-01–07 | Baseline pins/APIs documented; exact lockfile, Ajv/browser behavior not yet installed or qualified. Require clean build, contract parity and platform checks. | Required first-build verification, not missing product behavior. |
| U09-04 / D09-02/04 | Painted references are not layered production assets; fallback-font metrics and asset budgets unmeasured. Require Item 10 exports plus real scale/load/reflow checks. | Blocks claiming final visual/runtime quality, not defining the asset plan. |
| U09-05 / D09-08 | Model alias may change; meaning/latency unmeasured and deadline can produce fallback. Require recorded model/prompt version and fixture results. | Live qualification; no promise the timing targets are met. |
| U09-06 / D09-10 | Hosting account/region/logging/allowances not verified. Require later authorized configuration review and deployment checks. | Hosting/live release, not local implementation. |

**Exact next item: 10 — Individual asset manifest and production plan.**

Item 10 receives: fixed 05 logical geometry and actors; current white Jo/cast and five rich 08 references; native text/focus separation; image/audio formats, base/high-density sizes, layers/anchors/alpha, animation endpoints and loading/decoded-memory budgets; source/CT/scene/access/state IDs; single caddy/tile/Loop ownership; read-only both-bank puppet states; the technical-copy additions; and requirements for provenance, scale inspection and temporary equivalents. It must map individual assets to these contracts without changing source access, room geometry or cue outcomes.

Item 10 must not treat the simple diagrams as final art or a flattened room painting as an interactive asset set. No individual asset manifest, production game, deployment or later checklist completion is included here.
