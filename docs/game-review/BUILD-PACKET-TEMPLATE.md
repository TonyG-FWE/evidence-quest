# Evidence Quest: build packet template

TEMPLATE ONLY - NOT READY - NOT SENT.

Prepare a dated packet from the agreed [BUILD-SPEC.md](BUILD-SPEC.md). Replace every applicable placeholder, give non-applicable fields a reason, and retain this template for later packets. Do not send the template itself as an instruction to implement.

D080 directs routine specification choices to be resolved from existing answers. Identify each included change as DIRECT_AGREEMENT or DERIVED_DETAIL and cite its supporting D IDs. Derived detail must preserve the agreed behavior and is not a separately quoted approval. Ask Tony only about a material choice those answers cannot settle; this process rule does not replace the packet's implementation authority or the existing task dependencies.

## Packet identity and agreed scope

| Field | Required value |
|---|---|
| Packet ID / revision / date | <packet identifier, revision, date> |
| Status | DRAFT / READY / SENT / IMPLEMENTED / VERIFIED / ACCEPTED; use NEEDS_UPDATE if an input decision changes |
| Review topics and agreed decision revisions | <R IDs and D IDs with links> |
| User agreement and implementation authority | <actual conversation evidence and scope; use existing authorization without requesting it again> |
| Receiving existing task / builder | <verified current task ID and title> |
| Review owner | <who checks the connected result> |
| Existing implementation tasks | <verified TASK11 / ER13 IDs and dependencies> |
| Current source baseline | <workspace, branch, HEAD, relevant working-file hashes, dirty-file ownership, and candidate build when applicable> |
| Required predecessor results | <exact decisions/packets/results this change consumes> |
| Active-work coordination | <current shared files, edit owner, and safe handoff point> |

Identify the actual current shared checkout. Preserve unrelated dirty work and coordinate overlapping files with the existing builder. Do not create another checkout, revert concurrent changes, or reuse another task's ports. Resolve a relevant baseline mismatch before editing the affected files.

## The problem and intended result

**Current player experience:** <Concrete trigger, what happens now, and evidence.>

**Agreed player experience:** <What the child should understand, do, and see as a result.>

**Why this change belongs in the game:** <Connection to the agreed story, play, and learning goals.>

**Scope:** <Included behavior/content and material exclusions. Use the agreed boundary, not a new feature list.>

## Exact source and requirement changes

| Requirement / decision | Existing file, section, and canonical IDs | Before | Agreed after | Runtime/content/asset owners affected | Acceptance ID |
|---|---|---|---|---|---|
| <requirement> | <verified references> | <current behavior/text> | <exact behavior/text> | <verified owners> | <scenario> |

Attach the applicable dated authority amendment and preserved-original receipt when source truth changes. Do not silently overwrite an imported source or treat old checked statuses as evidence for a changed requirement.

## Player flow and implementation contract

<Insert the complete relevant journey, interaction/state contracts, exact child-facing copy, layout/asset references, and literacy/AI rules from the agreed specification. Reference their fixed revisions.>

The packet must answer, where applicable:

- What starts the behavior; its preconditions and allowed player inputs.
- What is visible and available before, during, and after the action.
- Which state/knowledge/resource owner changes and which source component becomes exposed.
- What happens on repetition, cancellation, alternate order, interruption, revisit, and reload.
- How keyboard, touch, focus, readable text, reduced motion, and unavailable audio are handled.
- How hints, authored fallback, late AI replies, and assistance records relate to the actual current state.
- What exact content/artifact files are supplied, what may be reused, and what must be produced within scope.
- Which saved-data migration is needed, or why none is needed.
- Which implementation details can be chosen locally without changing the agreed player experience.

If a product decision is missing, name it and leave the affected packet DRAFT. The builder must not invent story, teaching, or control behavior to complete a placeholder. Finish independent work already authorized when a separate dependency is unresolved.

## Acceptance and regression evidence

| Scenario ID / existing FIX11 or CHECK11 | Starting state | Player action | Required observable result | Evidence method / candidate | Result |
|---|---|---|---|---|---|
| <exact existing IDs and linked added scenario> | <Given> | <When> | <Then> | <real handler/browser/native review as appropriate> | NOT_RUN |

Include relevant alternate routes and failure/recovery paths. Preserve existing source-exposure and ownership boundaries, all five successful arrangements, save guarantees, and other applicable invariants unless a specifically agreed, dated authority amendment changes one. Do not infer a broader redesign from a local requirement.

Use the repository's implemented commands and applicable current tooling instructions:

```text
npm ci
npm run validate:content
npm run check
npm run build:server
npm run test:contracts
npm run eval:coach -- --mode authored
npm run build
npm run test:browser
```

On this host, the repository documents scripts/npm.cmd as its npm entry point. Coordinate command execution with the existing builder. Record commands, environment, final candidate identity, actual outcomes, and remaining gaps. Required checks cannot be replaced with stubs. Additional checks should target actual new behavior or risk. Observe changed connected behavior in the browser; label synthetic seams and retain excluded native/player/production cases as NOT_RUN. Mockups and successful compilation do not establish the agreed experience.

Provider requests remain a separate recorded boundary. TASK11.19 is halted at 1/75 attempts; this template authorizes no retry, reset, child-live activation, deployment, public publication, or submission.

## Required return from the builder

1. A concise account of the implemented player behavior, mapped to the exact decision and requirement revisions.
2. Changed source/content/asset files, relevant dated authority amendments, and existing TASK11 / ER13 updates in BUILD-STATUS.md.
3. Exact candidate/commit references and local playable review location, with process and port ownership when applicable.
4. Acceptance results linked to the scenario IDs and exact FIX11 / CHECK11 evidence; screenshots, in-motion observations, and recovery evidence where relevant.
5. Remaining failures, NOT_RUN cases, unimplemented scope, and any departure from the agreed decision. Do not call an unimplemented behavior complete.
6. Verification that connected unchanged behaviors still work where this change could affect them.

## Closeout in this review

- [ ] The returned implementation matches the current agreed decision revisions.
- [ ] Every included acceptance scenario has an actual result and linked evidence.
- [ ] The playable experience has been reviewed against the agreed purpose and behavior.
- [ ] User acceptance is recorded where given; unresolved objections remain open.
- [ ] DECISIONS.md and BUILD-SPEC.md link the result, evidence, limitations, and any follow-up.
- [ ] CHECKLIST.md shows the next discussion accurately; implementation status was not confused with discussion agreement.

Record what is demonstrated, what is still uncertain, and the next existing dependency. Learning improvement requires its own evidence; do not promote technical completion into an educational claim.
