# Item 09 — semantic contract rules

This file is authoritative for the cross-field constraints JSON Schema cannot express. It supplements contracts.schema.json, not a second set of types. Main-spec sections own architecture, timing and UI behavior; 05–08 retain geometry, words and gameplay meaning.

## R01 — validation, identity and construction

Validate all required fields, closed objects, enum values, lengths and nulls first; then these rules. Ajv2020 options: strict=true, allErrors=true, coerceTypes=false, useDefaults=false, removeAdditional=false. Compile only shipped schemas. Never fetch a schema named by child input. No arbitrary expression evaluation.

Case identity is sparkfest-little-bridge-001 / contentVersion 3 / contentRevision 1. SaveFormat and coaching versions are independently 1. appBuild records a future application version plus build identifier; fixtures use 0.0.0-contract and are not a released app. ID/version mismatches cannot silently migrate. A future migration requires an explicit allowlisted source→destination conversion plus fixtures; no migration is selected now.

All arrays described as sets must be unique by their identity (exposures by ref/access/CT, grants by source/access, drafts by id, records/events/runs by id, actor knowledge by actor). Sequence integers are nonnegative safe integers; increment until safe maximum, then fail to save honestly rather than wrap. Coordinate numbers must be finite. Canonical JSON uses UTF-8, LF, no comments/NaN/Infinity. Codes are never shown to children.

New-case constructor:

- New random caseRunId and visitId, revision/lastObservationSeq 0.
- Stage, avatar (20,50) facing up; Loop Media (68,45), standby.
- All physical object booleans false; caddy host MD.RACK.STATION; order empty, arrangementRevision 0.
- Grants, exposures, comparisons, records, observations, runHistory, npcReceived and coachingHistory empty; five named drafts empty with no selected references, revision 0.
- selectedLead, playback, certificate, premiere and readerResume null; historyUncertain false.
- visitedRooms contains SC.ST; encounteredActors is populated only when their actual scene/description is presented. All guidance-dismissal booleans false.
- worldReturn targets ACC.OBJECTS. No pending action/held tile/keys/request; arrange presentation by default.
- Preferences: sound on; motion follows prefers-reduced-motion for a first visit (otherwise standard); regular text and standard spacing. Existing preferences override these defaults and survive New game.

These defaults are constructor requirements, not validator mutation.

## R02 — authored content and references

AuthoredContent example-fragment proves only the shown shapes and known external references. Full content must contain four unique rooms, five physical actors, eight reciprocal door edges, all four tiles, principal E1–E8 plus NAV, every 05 source/copy/access/required object, all 548 07 CT entries/families plus the technical addendum, all NPC branches and the coaching bank. Validate the complete UI/transition bindings against the registry. Production must reject a fragment.

Do not create a second editable source body. TextEntry.text owns exact wording; SourcePart spans reference its Unicode code-point positions [start,end), where 0≤start<end≤codePointLength. Passage aliases can omit an attribution while the full source retains it. Line-break conversion from 07's <br> markup to LF is formatting only. Freeze the resulting content revision. Substitutions may never edit decisive source spans.

TextEntry slots must equal its actual {tokens}, with allowed domain from 07 §1.2. Escape childText as text; preserve wording/punctuation. Bounded values use current actual room/person/owner/tile/position/time/mode/question/count or available source title/detail. A domain does not permit arbitrary labels or hidden contents. No URL/HTML/model text slots.

Rooms and obstacles use exact 05 rectangles/anchors. R(x1,y1,x2,y2) requires increasing corners; approach points must be legal for avatar radius 2; doors match their explicit destination entries. Actors/caddy may have moved, but their current representation resolves to the same identity. Parent collision is not duplicated for a child hit target.

Copies are physical/conversational accesses, not additional evidence. KIT.NOTE.E6 and MD.SOURCE.E6 point to E6; KIT.NOTE.E7 and MD.SOURCE.E7 point to E7. Moving KIT.CADDY does not delete mounted copies. A Copy ID may intentionally be the existing physical source ID; uniqueness applies within its typed collection, not across object/access projections of the same entity.

AssetUse.slot is an owner/role binding, not an individual asset manifest. Example asset ID may be null. Item 10 fills actual IDs and filenames; a later full production build rejects an unresolved critical asset binding. Logical bounds/pivots remain subject to 05/08, never read from a painting's approximate furniture position. AssetUse.anchor is a normalized [u,v] pair across the padded image (0..1 each); static logicalBounds use room coordinates, actor/puppet bounds use offsets from their placement anchor. Matching density variants retain identical logical bounds and normalized pivots.

### Closed condition language

Predicate supports all, any, not, or one test with string args. all=[] means true; any=[] means false. Limit content expressions to depth 8 and 64 leaves. No scripts, paths or model-generated predicates.

| Test | Exact args / meaning |
|---|---|
| flag | [05 object-flag name, "true" or "false"]; only Physical.objects fields. |
| room / local-owner | [SC.*] / [existing owner ID]; compare current room / resolve current physical host to this room. |
| loop-mode / kit-host | [one corresponding schema enum]. |
| available / exposed | [existing canonical ref]; legitimate grant / complete actual presentation coverage. |
| actor-knows | [ACT.JO/REMY/ARI, ref]; firsthand authored or actually delivered knowledge. |
| puppet | [pip/seed/boats/lit, legal string value]; bool lit uses "true"/"false". |
| run-status | [none/running/paused/finalized]. |
| certified / premiered | []; derive current eligibility / independently valid historical completion. |
| topic | [where-loop/cancellation/recording/story-plan]. |
| meaning | [one InterpretationTag]; only a scoped proposed live interpretation or authored fixture. Forbidden for automatic local free-text matching. |
| assistance-displayed | [existing CT help ID]; an actual displayed response, not a request/arrival. |

Wrong arity, unknown field/value, dangling ID or unsupported test rejects content. Server eligibility uses only shipped rules, never client-supplied predicates.

## R03 — state lifetimes and ownership

| Data | Lifetime / authority |
|---|---|
| Identity, source CT text, physical geometry, base NPC knowledge and tile rules | Immutable authored bundle, version checked. |
| Physical state, order/revision, grants/exposures, theories/comparisons, drafts/records, NPC received facts, run/history/certification, historical premiere, guidance flags | Durable CaseState; persist complete snapshots. |
| ReaderResume and worldReturn | Durable convenience only. Invalid/moved owners resolve or close safely; never trigger an action on reload. |
| Session input owner, active views/caller, focus/scroll, held keys/tile, path/physical intent, help opportunity, save queue | Live session only. Saving fields are bookkeeping, not nested case truth. |
| Acknowledged reader position and all draft text | Saved through CaseState; Session never owns a conflicting text copy. |
| Renderer elapsed time, draw lists, animation handles/drag ghost | Transient; not proof of a gameplay commit or source exposure. |
| Tile owner, collected/returned flags, current goal, launch readiness, story description and remyNoticeCorrected | Derived from caddy/order, Loop, knowledge and certified run; never competing writable flags. |
| CoachingHistory | Durable submitted context/selection/display reference, not raw prompt/reasoning. Undisplayed results are discarded on reload. Submitted text lives once in a coaching-submission Record. |

Physical invariants: one Loop; standby implies Media default position until wake, following implies player's room and legal floor, docked/projecting implies Stage (76,35), opened flap and actual docking. Projecting requires running playback. Before collection caddy is Media and order empty; carried caddy also has no physical Stage rail tiles. Only seated caddy supports a nonempty order. Every tile is either on the unique order or in its one storage cell; a held tile remains committed to its origin. There is no second inventory count or list to disagree with that.

Readiness = caddy seated AND Loop docked/projecting. Planning can occur with seated kit and absent Loop; playback cannot. All rooms remain accessible. An order has 0–4 unique canonical tiles; no comprehension/source conditions belong in readiness.

A running run requires player at the Stage workstation in a relevant play presentation and Loop projecting. Leaving/inspection first pauses and sets Loop docked. Paused runs can be retained while the avatar explores another room. Following has no second standby copy left in Media.

Draft IDs are private/search-plan/story-plan/coach-search/coach-story, with separate text/ref selections/revisions. Preserve excess drafts; a recorded/sent textual explanation requires 1–600 code points and non-whitespace text. Evidence-only delivery and comparisons do not require prose. Record recipient must be null for private/crew-plan/coaching-submission; ACT.JO for jo-explanation; a local actual NPC for evidence-delivery. PreviousRecordId must refer to an earlier same-context actual record, never synthetic text. Source slots are optional, at most two in a draft, and can reference only displayed available portions.

NPC received facts require an actual evidence-delivery or explicitly addressed explanation's presented refs. Evidence delivery changes no source access beyond words actually quoted in the returned authored branch. Observation sequence and delivered record must agree. Source records are not consumed.

## R04 — availability, exposure and chronology

Grant is issued only by an authorized access after its physical/conversational commit. Granting an entire document permits later inspection, but not source-specific coaching on unshown portions. Exposures require a legitimate grant or explicit authored account/observation. E2 photo cannot grant E3. Possessed portable notes confer a physical first-reading route, not an exposure event.

Canonical finer references: E2.a/frame1, E2.a/frame2, E2.a/frame3, E2.a/end and E2.a/description map to 07's exact frame/marker/full-description CT entries. E2.a is an aggregate reached by description or all three frames plus end. E5.c/seen and E5.c/response map to CT.OBS.LOOP.SEEN/RESPONSE. E8/TILE.FERRY, E8/TILE.BRIDGE, E8/TILE.PLANT, E8/TILE.BLOOM are local descriptions of E8. These name existing components, not new clues. CT.REMY.CLIP is a spoken origin distinct from E2's recording file. CT.OBJ.NOTICE_PARTIAL is a visible curled-state description, not E3.a/b.

Exposure spans are sorted, disjoint/merged and within their CT body. A required passage is eligible only when its complete canonical span is covered; visualComplete alone applies only to frames/images/observations, not an unread text source. Mark only actual visible words/explicit accessible presentation; component entry never means every child component was displayed. Repeated exposure updates count/lastSeq without making a new principal source.

Known-time timeline uses source metadata only: E4 posted545, E3 posted550, E2 recorded552/message553, E5 slate captured558 (minutes since midnight). A declared intention is not a completed event, even when earlier in time. Player-created supports/conflicts-with/happened-before relations are saved claims, never automatic truth. Do not fill unknown story times from wall clock, visits or route duration.

Observation kind-specific rules:

- source-available: valid grant origin; no comprehension claim.
- source-displayed: refs/CT/span report from displayed content; source fields are present, no model tag.
- physical-commit: actual action and stable owner result; repeated no-op cannot duplicate inventory.
- cue-started/outcome: actual run/index; outcome uses rule endpoint, not inferred animation.
- explanation-recorded/evidence-delivered: actual record ID and ordered submission/delivery.
- help-requested: actual explicit request, no assistance level yet.
- help-selected: validated live proposal/tag with uncertainty, not exposure.
- help-displayed: actual CT IDs, origin and level 1–4; access-level 0 is a separate source/access record.
- possible-outcome/history-uncertain: recovery boundary; cannot support an independent-before-result conclusion.

No model chain-of-thought, prompt, provider token count or key belongs in CaseState. Tags are fallible local interpretation, never diagnosis. Observation seq must not exceed lastObservationSeq. Local records are not authenticated assessment evidence.

## R05 — rail, cues and recovery invariants

Rail insertion from caddy at gap g (0..length) inserts once; dropping on occupied i replaces and returns displaced tile. Rail→rail occupied swaps. Rail→gap removes original index i then inserts at g-(g>i?1:0). Same resulting order is a no-op. Left/right swap adjacent; end-bound operations preserve revision. A canceled/outside drop preserves original committed order and current certification.

Run.order equals physical order and run.arrangementRevision equals current revision for a resumable run. Initial puppet is left/left/separate/dark. Valid reachable invariants: lit implies soil; soil implies Pip right/boats joined; Pip right implies boats joined and seed right/soil. Pip right with seed left is invalid, not an authored branch.

Reconstruct the committed state by applying run.order[0:nextCue] from initial state. It must equal run.puppet and each recorded outcome. Unmet still consumes its cue when the endpoint commits, then pauses; Continue proceeds to the next tile. nextCue≤order length. Unique cueResultIds match runId:index in order with count=nextCue.

activeCue, if present, is at nextCue and matches the corresponding tile, from=committed puppet and to/result=pure authored rule. The stored committed puppet remains from until endpoint commit. No finalized run has activeCue. status finalized requires nextCue=length and finalizedSeq present; otherwise finalizedSeq=null. Empty order is a valid unsuccessful finalized rehearsal. A terminal paused run has nextCue=length, no activeCue, no finalization; Continue must finalize, not replay.

Certification must reference a valid finalized successful rehearsal of the exact current order/revision. It can remain through show playback and canceled selection. Actual order edits and Reset rehearsal clear it; a new rehearsal clears it at start. Historical premiere references a finalized successful show with full cues and completion sequence. It survives edits/reset/clear but not New game. A paused or partly played show is not premiere completion.

One pure cue commit advances once using runId/index, even if animation callback and Stop race. On controlled interruption settle active cue, append actual outcome, pause, then open information. Actual editing happens after that settle and resets state. A background event uses the same rule when delivered. A crash restores last acknowledged marker/boundary, returns pending physical actions to their existing committed owners and adds possible outcome/history uncertainty. Never mark the restored earlier puppet pose as proof the endpoint was never seen.

## R06 — coaching contract and display eligibility

### Provider schema projection

Derive the provider schema from $defs.ModelProposal; do not maintain a second editable move list. Inline InterpretationTag. Keep the root object, its four properties, all four required names and additionalProperties=false. Replace moveId.enum with the state-eligible authored move IDs plus NO_ELIGIBLE_MOVE. "State-eligible" applies source/resource/outcome conditions before generation; the model must still match the explanation's meaning. Keep interpretation as the documented tag enum and uncertain as boolean.

For refs, use type=array, minItems=0, maxItems=64, and items type=string with enum equal to the union of permitted exposed/source/outcome IDs. If this set is empty, use items type=string and maxItems=0 instead of an invalid empty enum. Omit uniqueItems, maxLength, local $id/$schema and other nonessential local keywords from this provider projection. Apply the complete local ModelProposal schema plus semantic validation to the returned JSON. This uses the documented provider subset while preserving stronger local constraints; it is not permission to accept duplicate or unknown references.

NO_ELIGIBLE_MOVE requires refs=[], interpretation=unclear and uncertain=true. It has no authored CT entry; map it to CoachResponse status=unavailable with selection=null. It is never passed to the client as a CoachSelection or recorded as a diagnosed misconception. Other proposals must satisfy the exact authored move matrix before forming a selected response.

### Context and display

Context must be legal and self-consistent: certified implies current valid rehearsal; actual observed outcomes must match authored tile transitions. exposedRefs must be known eligible references; selectedRefs subset exposedRefs; availableAccesses resolve to current/local or legitimately acquired access. Dynamic outcome refs refer only to provided validated observed outcomes. The client is responsible for reporting actual display; server consistency checks cannot authenticate a child's reading.

Ordinary move references must be a subset of context's actual exposed references/valid displayed outcome references and that move's allowed reference set. No E6/E7 reference merely from ownership/direct-help facts. Model-supplied tags must match the move family; CLARIFY requires uncertain=true. Off-topic redirection cannot add a hidden clue. Unknown facts must be genuinely unrecorded, not an alternate way to disclose withheld content.

Only status=selected permits non-null selection; all other response statuses require null. Identity/request/visit/context must match the active opportunity. Semantic checks run again just before display. A validation failure becomes prepared fallback; do not silently repair a malformed output into a confident interpretation.

Modeled explanation semantics remain a future evaluation question. The structural/eligibility validator does not prove that “the seed got there” was understood correctly. Authored fallback uses explicit topic/state only, per the separate matrix.

Context equality is visit+case+revision plus exact projected fields, including source availability/exposure, selected refs, current room/resources, theory/explanation revisions, order/puppet/run position and already displayed help. An unrelated save acknowledgment changes none of this. A new source/cue/room/text or assistance does. Selection/arrival is not assistance; actual display is.

Display winner is write-once per opportunity. fallback/direct acceptance suppresses held/late live selections. A focused fallback control remains stable when a reply arrives. Closing Help leaves a request pending; editing/canceling/replacement invalidates it. Reopening checks current context before rendering. Reload keeps draft/submission and displayed history only; no held response or automatic request.

## R07 — save/restore and complete vs partial evidence

A disk restore always sets historyUncertain=true for any possible activity after its acknowledged snapshot. An active saved cue identifies a specific possibly exposed endpoint; absence of that marker does not prove no later exposure occurred. Same-page Continue uses the live state without inventing this interruption.

SaveEnvelope.payload is a complete CaseState at its revision. Header slotRevision is an adapter-owned storage sequence, not CaseState revision. JSON-byte/head comparison and one readwrite transaction preserve a usable previous record where supported; older writes/acks cannot replace current session truth. ISO writtenAt must parse as an actual date; never use it to order player reasoning.

Case validation is independent of pending playback validation only where the complete physical/investigation/history groups can be checked. Recovering an invalid run clears that run/current certificate; it cannot manufacture successful history. If those other groups fail, show damaged/incompatible recovery. Valid source grants survive moved copies, while invalid convenience view references are closed/resolved without discarding source ownership.

Do not overwrite unknown or conflicting saves without the existing explicit replacement decision. New game acceptance preserves preferences and changes caseRunId. Canceled reset leaves case unchanged. Real browser transaction guarantees and visibility events remain runtime verification, not proven by this document's isolated checks.
