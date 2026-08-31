---
title: Break down a plan
description: Evaluate a current strategy and create outcome-based milestones only when they provide useful implementation boundaries.
slug: break-down-a-plan
order: 4
category: planning
publishedAt: 2026-08-19
updatedAt: 2026-08-24
featured: true
draft: false
relatedSlugs:
  - plan-a-feature
  - challenge-a-plan
  - execute-one-milestone
prompt: |
  breakdown

  Use the exact current plan and its planning directory from this discussion. Do not search historical planning directories or change the plan's strategy, scope, exclusions, contracts, or acceptance criteria.

  First determine whether the plan has at least two coherent implementation slices that can each be completed, verified, and reviewed as a meaningful finished state. If it is one coherent scope, do not create milestones.md. Remove an obsolete milestone file if one exists, explain that the plan should be implemented as one complete scope after approval, and stop.

  When decomposition is useful, build milestone boundaries around coherent outcomes, not file types or engineering layers. Each milestone must leave the repository internally valid for the scope reached and include the production behavior, public contracts, tests, documentation, migrations, compatibility work, verification, and cleanup required for that outcome.

  For every milestone, provide: objective, dependencies, exact owned scope, implementation work, focused and regression checks, acceptance criteria, and a developer review checkpoint. Cover every plan requirement in the visible sequence. Identify risks that must be resolved before the next milestone. Do not create temporary duplication, unused scaffolding, tests-later phases, or compatibility paths that the plan did not require.

  Write the complete sequence to milestones.md beside plan.md. This planning file is the only authorized write: do not modify source code, tests, configuration, ordinary documentation, dependencies, generated artifacts, or Git state. Report its repository-relative path and present the exact milestones.md body. End both the file and response with an Approval required section. Make clear that approving the sequence does not authorize implementation and that each milestone requires separate authorization.
---

## Situation

A concrete plan exists, and you need to determine whether dividing it would create useful execution and review checkpoints.

A milestone is useful when it creates a meaningful checkpoint: a contract becomes usable, a migration safely expands the system, one end-to-end behavior is complete, or a risky integration is proven. It is not simply a smaller pile of files.

Some plans are already one coherent implementation slice. In that case, the right breakdown result is to create no milestones and preserve the plan as one complete scope.

## Common mistake

Forced or mechanical breakdowns follow the folder tree:

1. add types
2. add database code
3. add service code
4. add UI
5. add tests and documentation

This leaves deliberately broken states, separates behavior from its correctness evidence, and encourages approval based on activity rather than outcomes. It also creates pressure to keep temporary scaffolding because later milestones depend on it.

## Agentic approach

First decide whether at least two states are worth reviewing independently. When they are, decompose around those states. A strong milestone may cross several layers because contracts, behavior, tests, and documentation belong together.

Use these questions to find boundaries:

- What is the smallest end-to-end capability that can be complete and verified?
- Which work must land together to preserve compatibility or data integrity?
- Where does developer judgment materially affect the next step?
- Which risk should be resolved before the rest of the plan becomes cheap?
- Can the repository stop after this milestone without carrying dead or misleading paths?

## Before you send the prompt

Make sure the agent has the exact current plan and its planning directory, not an earlier draft found elsewhere. Include all developer amendments and explicitly identify compatibility, deployment, migration, and rollback requirements.

If the plan is not approved, make that status explicit. A breakdown should not become a back door for settling architecture, and its approval boundary must cover the current plan as well as the sequence when both still await approval.

## Worked example

For the audit-log CSV export, a weak breakdown would create the endpoint, tests, and UI in separate milestones. The endpoint milestone would expose an unused contract; the UI milestone could not be verified until later tests arrived.

A coherent sequence could be:

### Milestone 1: Prove the bounded export path

- Add the server-owned export operation using the existing filter and authorization contracts.
- Stream CSV with explicit safe columns and deterministic formatting.
- Cover authorization, empty output, escaping, result bounds, cancellation, and persistence failures where applicable.
- Document the export contract and operational limit.
- Verify the owning package and production build.

**Review checkpoint:** Confirm that data exposure, memory behavior, and the synchronous size limit are safe before adding a public control.

### Milestone 2: Expose export to administrators

- Add the accessible UI action and loading, success, cancellation, and error states.
- Preserve the existing paginated list state while forwarding its validated filters.
- Add integration or browser coverage for permissions, keyboard use, narrow viewports, and both themes.
- Synchronize user-facing documentation.

**Review checkpoint:** Confirm the complete user flow and decide whether measured demand justifies a future asynchronous export path.

Each milestone is useful on its own, carries its tests with it, and leaves the repository coherent. Neither creates a generic export framework or background job that the approved plan did not require.

## What a good result contains

- a clear decision about whether useful milestone boundaries exist
- no `milestones.md` when the plan is one coherent scope
- milestones ordered by real dependencies and risk
- one finished outcome per milestone
- exact owned files, symbols, contracts, configuration, migrations, and documentation when known
- implementation and correctness evidence in the same milestone
- acceptance criteria that can be observed rather than inferred
- focused checks and the broader regression boundary
- a developer review checkpoint with a real decision or risk to inspect
- one repository-relative `milestones.md` path whose content matches the presented sequence when milestones are created
- no redesign, scope growth, or automatically authorized later work

## Useful follow-ups

If the plan appears to be one coherent scope:

> Explain why no independently useful review boundary exists. Do not create milestones merely because the plan contains multiple files or implementation steps.

If milestones look like file batches:

> Rewrite each milestone as an observable completed capability. Move its tests, contracts, and documentation into the same milestone.

If a milestone is too large:

> Identify the earliest point where one risk can be resolved and the repository can remain coherent. Split there without introducing temporary ownership or unused scaffolding.

If compatibility work is unclear:

> Show which old and new components may coexist at each milestone. Keep only compatibility paths required by an actual deployment or persisted-data constraint.

## Warning signs

- one milestone per file, layer, or artifact type
- milestones created for a plan that is already one coherent scope
- tests, migrations, cleanup, or documentation deferred to a final phase
- temporary duplicate paths introduced only to manufacture boundaries
- a milestone that cannot pass its relevant verification
- new architecture decisions hidden inside the breakdown
- a response that differs from the persisted `milestones.md`
- every milestone implicitly authorized by breakdown approval

## Developer review responsibility

First confirm that decomposition is useful. When a sequence exists, confirm that each checkpoint is meaningful, that it reflects real dependencies, and that stopping after any milestone leaves an honest repository state. Approve the sequence separately from authorizing a specific milestone.
