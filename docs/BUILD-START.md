# Evidence Quest — Codex startup and GitHub handoff

Prepared September 11, 2026. This is a future execution instruction. Preparing this file did not create a game project, initialize Git, create a GitHub repository or push files.

## Where to work and what to provide

Open the following containing folder as the **local Codex workspace** on this computer:

C:\Users\TonyGuillaro\.codex\visualizations\2026\09\10\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1

It contains the complete design package:

C:\Users\TonyGuillaro\.codex\visualizations\2026\09\10\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1\evidence-quest-design-v3

The game goes in the planned sibling directory, which does not exist yet:

C:\Users\TonyGuillaro\.codex\visualizations\2026\09\10\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1\evidence-quest-game

The package currently contains 307 files, approximately 84.23 MiB, including visual references and historical evidence. Keep its subfolders intact. A path is sufficient for a local Codex task with filesystem access on this PC. A cloud task or another computer needs the complete folder transferred or committed to a repository it can access; the Windows path alone cannot transfer it.

## Existing checklist and build order

These files are already present under evidence-quest-design-v3:

| File | Purpose |
|---|---|
| EVIDENCE-QUEST-MASTER-CHECKLIST.md | Whole-project phases 01–16. Pre-build design/review 01–12 complete; next13. |
| 11-FINAL-CODEX-BUILD-PACKET-AND-REVISED-SCHEDULE.md | Authoritative entry point and document-reading order. |
| 11-build-packet/implementation-plan.json | Exact TASK11 task definitions, dependencies, outputs, acceptance references and milestone boundaries. |
| 11-build-packet/REQUIREMENT-TO-BUILD-CROSSWALK.md | Readable requirement → task → check → fixture mapping. |
| 11-build-packet/FIRST-CONNECTED-BUILD.md | Whole first playable case, future operating commands, required tests and stopping point. |
| 11-build-packet/acceptance-fixtures.json | Concrete scenario inputs and expected behavior, including all 65 arrangements/five successes. |
| 12-BUILD-READINESS-CHECKPOINT.md | READY decision, complete route review, scoped corrections and qualification limits. |
| 11-build-packet/REVISED-SCHEDULE.md | Corrected uncalibrated AI-led time assumptions and measurement instructions. |

The two files above have different jobs: the master checklist tracks project phases; implementation-plan.json supplies the detailed build order. Do not invent a replacement sequence.

## Verified local GitHub starting point

- Git is installed at C:\Program Files\Git\cmd\git.exe.
- GitHub CLI is installed at C:\Program Files\GitHub CLI\gh.exe.
- Active GitHub account TonyG-FWE authenticated successfully on github.com; Git protocol HTTPS.
- The first status attempt could not read the CLI configuration from the restricted execution context. The approved read-only check outside that boundary succeeded. Do not mistake a future sandbox file-access denial for an invalid login.
- Repository creation rights and an actual push have not been tested. No credentials were printed or changed.
- Proposed new remote: **TonyG-FWE/evidence-quest**, **private**. Existence has not yet been checked. No repository has been created by this handoff.

## Execution instruction to send to the build task

Execute **Item 13 / M11.CONNECTED**, the first complete playable Evidence Quest case, using the full design package at the path above and its FIRST-CONNECTED-BUILD instructions.

**This execution instruction authorizes the bounded local implementation in TASK11.01–16, creation of the specified temporary assets, and the Git/GitHub setup described below, including creation of a new private repository and normal pushes of this Evidence Quest project.** It does not authorize paid model evaluation, live child input, final artwork/audio production, website deployment, public repository publication, hackathon submission or changes to proprietary projects.

### 1. Verify and read before creating the project

Read the entry point, master checklist, Item 12 checkpoint, implementation plan, first-build instructions, fixtures and issue register. Follow their references into the full story, rooms, interfaces, copy, current illustrated direction, technical contracts and asset manifest.

Verify that the documented readiness scope matches this instruction. Record any actual mismatch; do not repeat completed design work or reopen settled choices. Pre-build validators requiring an absent game directory are historical checkpoint tools once implementation starts; they must not later be used to claim that the authorized game directory is an error.

Use only the Evidence Quest workspace. Do not inspect or modify H:\Nerva Build Ops or another proprietary project. Before initialization, confirm the game path is not inside an unrelated Git worktree. If it already exists, inspect only enough to confirm Evidence Quest ownership and preserve its work.

### 2. Extend TASK11.01 with local Git and private GitHub setup

This is an explicit addition to the previously local-only setup task. Where the older first-build prompt excludes publication/provisioning, the narrow exception is **this new private GitHub repository and its project pushes**. All other external-action limits remain.

- Recheck the installed tools and active github.com account without exposing tokens. Use the existing TonyG-FWE session if still valid. Do not log out, replace credential managers, switch unrelated accounts or change global Git identity/settings.
- If interactive browser sign-in is actually needed, present the exact sign-in action to the user and retain the local setup state. Never ask for a token to be pasted into chat. A sandbox access denial should be handled as an access issue before attempting login changes.
- Initialize Git only inside evidence-quest-game, with main as the initial branch. Respect the user's existing valid author identity; use repository-local settings if a correction is needed. Do not invent a personal email or change other repositories.
- Prepare .gitignore before staging: exclude secrets and local environment values, dependencies, build outputs, caches, temporary tool files and raw private input logs. Include source, the reviewed lockfile, approved design inputs/references and useful acceptance evidence.
- Copy the complete supplied design folder into docs/design/evidence-quest-design-v3, preserving relative structure and original bytes for the imported baseline. Create a source inventory/hash record for the import. Copy this startup instruction into docs/BUILD-START.md. Do not copy the surrounding .codex folder, credentials or unrelated projects.
- The original design package remains the product authority on this PC; the repository copy makes it available to other checkouts. Keep the copy synchronized when an explicitly recorded source/status update is made, preserving dated evidence. On another machine, use that complete imported package; historical absolute paths do not authorize access to unrelated locations.
- Add a root README with repository-relative links to the design entry point, master checklist, build plan, first-build scope and progress record. Add a concise project AGENTS.md explaining these authorities, path boundaries, chosen architecture, check commands and where progress is recorded. This provides context to a fresh Codex task without relying on this conversation.
- Make the initial main commit after reviewing the staged file list. Check whether TonyG-FWE/evidence-quest already exists. Use it only if positively identified as this same newly established project; never overwrite or adopt an unrelated repository. If occupied by another project, use a new private name such as evidence-quest-sparkfest, verifying availability and recording the choice.
- Create the private remote from this local repository, set origin and push main. Verify exact owner/name, private visibility, remote URL and that the pushed commit exists. Do not add an open-source license or make it public automatically.
- Work on codex/first-connected. Make meaningful commits and normal upstream pushes after coherent verified changes. Never force-push or rewrite existing remote history. Record local versus remote status accurately; an unpushed commit is not a verified backup.
- A blocked GitHub sign-in/creation/push does not stop independent local implementation once safe local Git setup is complete. Report the exact blocked step; do not pretend the remote exists or is synchronized.

### 3. Track work without inventing the next step

Create BUILD-STATUS.md in the new game repository as the **execution progress record**, keyed to the existing TASK11 IDs. Its task definitions and dependencies come from the supplied implementation-plan.json; it is not a second independently designed plan.

For each active/completed task record status, result, relevant FIX11/CHECK11 evidence, actual failure/blocker, commit reference and the next dependency-ready task. Record Git initialization, imported design snapshot, active account verification, remote creation/visibility and verified push under TASK11.01.

Read this progress record at the start of every continuation. Complete unfinished dependency work first. Update the master checklist's implementation phase only when its acceptance evidence exists, and keep the committed design copy current with that recorded status change. Preserve the distinction between design readiness, implemented behavior, actual tests and unperformed live/player evaluation.

TASK11.00 is already DOCUMENTED_COMPLETE. Implement TASK11.01–16 in their dependency order; do not restart Item 12 or jump to later production/release work.

### 4. Build the full connected case and verify it

Preserve the complete opening → four-room investigation → independent resource recovery → tile rehearsal → revision → premiere loop. Include visible avatar movement, physical source/object actions, E2 component exposure, optional plan recording/presentation, unread portable notes, all rail operations, all 65 rule cases/five valid arrangements, visible puppet consequences, saving/recovery, keyboard/touch/non-drag access, authored/direct help and Maximum Toast.

Create the individual Q00/Q01 temporary equivalents within their assigned tasks. Preserve the selected rich illustrated final direction and current cast; temporary graphics do not replace that final quality requirement. Do not use a flattened room image as a substitute for interactable owners.

Keep the seven named comparison/timeline/general My ideas states deferred to TASK11.17. Both search/story plan-recording opportunities remain included. Do not add comprehension locks, mandatory errors, clue counts, forms or AI approval gates.

Use Item 09's selected stack and full canonical content. Verify packages/lockfile and actual scripts in the new project; example fragments cannot ship as the full game. Authored operation requires no model credentials. Test actual handlers and browser-visible behavior, with labeled local transport/storage fault injection where specified; do not present fixtures or scripted replies as live interpretation or player evidence.

Measure actual Codex iterations, human attention, asset preparation, testing/repair, waits and disjoint overlap during the existing calibration tasks. The historical 190–314 / 69–114 / 68–112-hour allowances are not AI execution forecasts. Update the same schedule from actual observations; do not promise an unmeasured completion time.

Continue routine authorized implementation without asking for approval at each task. Resolve technical details within the frozen contracts, documenting a narrow incompatibility at its owning source if necessary.

### 5. Stop and deliver at the defined milestone

Stop when M11.CONNECTED's applicable acceptance evidence is complete. Open the actual playable result in the browser and report:

- Local game folder and running address.
- What the child can do through the whole case.
- Actual check results and any remaining failures.
- Temporary graphics, authored help and the seven deferred supporting states.
- GitHub repository URL/privacy, branch, last local commit and verified remote commit.
- Current master phase, BUILD-STATUS and exact next dependency.

Do not claim the full illustrated/live-AI submission is complete. Do not automatically proceed to later artwork, paid live evaluation, deployment or submission.

## Documentation consulted for Git/GitHub setup

[GitHub authentication status](https://cli.github.com/manual/gh_auth_status), [creating a private repository from local source](https://cli.github.com/manual/gh_repo_create), [Git initialization](https://git-scm.com/docs/git-init), and [upstream push](https://git-scm.com/docs/git-push). These support the future setup instructions; successful sign-in is not proof that repository creation/push already occurred.

