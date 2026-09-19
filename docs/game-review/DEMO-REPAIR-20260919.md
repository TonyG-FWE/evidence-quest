# Evidence Quest rendering, audio and release repair — 2026-09-19

## Current user authority

Tony explicitly requested implementation of the complete plan, titled
“Evidence Quest: complete rendering, audio and release repair”, in this task.
The work remains in the existing `codex/first-connected` workspace and follows
TASK11.ART02–07 → TASK11.20 → TASK11.21.

The approved plan states:

> Repair only missing or defective authored recordings using the approved free Fish model.

It separately states:

> Retain strict Sol-feedback validation and the durable **$10 total OpenAI cap**, including prior spending, testing and review. Missing or invalid accounting must disable further requests.

> Preserve the exhausted earlier ledger and TASK11.19 at **1/75**.

These are separate operations and accounting systems. Missing authored cast audio
uses the existing approved Fish `s2.1-pro-free` model and selected voices. It is
not an OpenAI coaching evaluation and does not resume TASK11.19. No paid model,
new character generation, deployment, publication, or ledger reset is authorized.

## Preserved predecessor

The starting branch is `codex/first-connected`, HEAD
`7cc938a10bb52226a7a13493b64828eccf9c53d2`, with existing uncommitted integration.
`output/submitted-before-repair-20260919/baseline.json` records 670 source/config
inputs and the starting tracked change list. Its sibling `source` and `dist`
directories preserve those bytes and the submitted personal client/server before
repairs. This local archive is intentionally excluded from release staging.

All 143 original GLBs match their inventory; see
`evidence/demo-release-20260919/originals-preservation.json`. Originals and distinct
states remain preserved. Pending artwork approval remains pending.

## Implementation and evidence in progress

- FIX11.REPAIR01: Begin mounts the village beside the introduction. Compact
  screens show a bounded live preview; Start playing stays in the reader footer.
- FIX11.REPAIR02: Renderer lifetime is independent of reader/control DOM changes.
  Loading/recovering/failure status, diagnostic causes, native-DPR resize, bounded
  asset work and location-scoped resource ownership are implemented.
- CHECK11.REPAIR01: The actual development application passed two ordinary native
  Chromium Begin → village → walking → restart sequences. Scene screenshots were
  inspected, and the renderer element persisted across Start playing. Evidence:
  `output/rendering-repair-20260919/checkpoint.json`. This is an implementation
  checkpoint, not frozen release qualification.
- FIX11.REPAIR03: Sol demo accounting rejects absent/empty/malformed histories,
  duplicate reservation IDs and unreserved responses before provider execution.
  Existing historical ledgers are unchanged. Focused synthetic contracts pass;
  no live Sol request was made for this repair.

Final command results, browser/audio checks, source bindings, visual review and
private PR/merge remain open. Earlier R17 or submitted-build results do not qualify
this evolving candidate. No complete release or human acceptance is claimed here.
