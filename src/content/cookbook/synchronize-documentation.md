---
title: Synchronize documentation
description: Update durable documentation from the implemented behavior without turning the task into a documentation rewrite.
slug: synchronize-documentation
order: 3
category: execution
publishedAt: 2026-10-15
updatedAt: 2026-10-15
featured: false
draft: false
relatedSlugs:
  - control-scope
  - refine-coding-instructions
situation: A change altered a contract, error, setup step, or module responsibility. The work is not done while the repository still describes the previous state, but prose the change did not affect should stay as it is.
example:
  - speaker: developer
    text: Synchronize the documentation for the new audit-log export.
  - speaker: agent
    text: Three sources would become false without an update. One stale section is unrelated, so I only reported it.
    artifact:
      title: Change-to-document map
      lines:
        - kind: heading
          text: Update
        - kind: text
          text: 'API reference source: endpoint, admin permission, CSV fields, row limit'
        - kind: text
          text: 'errors/: export timeout and authorization contracts'
        - kind: text
          text: 'audit-log README: export reuses the list filters'
        - kind: heading
          text: Regenerate, never hand-edit
        - kind: text
          text: API reference output from the schemas
        - kind: heading
          text: Report only
        - kind: text
          text: retention section in docs/operations.md is stale and unrelated
prompt: |
  Synchronize state-bearing documentation for the current implementation change. First inspect the complete diff, the repository's documentation ownership and generation workflows, and every current-state document directly affected by the changed behavior.

  Build a change-to-document map covering public contracts, architecture and module ownership, setup, environment, operations, migrations, deployment, errors, cache behavior, examples, and generated references where applicable. Distinguish durable behavior from task-specific implementation detail.

  Update only authoritative documentation required to keep the repository accurate. Preserve unrelated prose and established voice. Use the required generator or handoff for generated, protected, mirrored, or externally managed files rather than editing them directly.

  Verify documentation in both directions: every documented changed contract matches implementation, and every implementation change that developers or operators must know is documented. Run existing documentation, link, build, and generated-reference checks. Report stale documentation outside scope without rewriting it.
---

## What good looks like

- a traceable map from each changed behavior to the document that owns it
- every affected current-state contract updated
- authoritative sources updated instead of generated output
- protected or external documentation handled through its required workflow
- no task diary, speculative roadmap, or rewrite of unaffected prose
- examples and commands checked against current behavior
- documentation, link, and generator checks actually run
- stale, out-of-scope documentation reported separately

Review externally visible contracts and operating guidance with the same care as code. Stale instructions cause failures even when the implementation is correct.

## If the result drifts

To find missing obligations:

> For every changed public contract, error, environment value, migration, module owner, cache behavior, and operational step, identify the authoritative documentation source and whether it remains accurate.

To reduce noise:

> Remove documentation edits that only restate implementation details or improve unrelated prose. Keep the changes required to describe the current system truthfully.

To audit both directions:

> Compare the final implementation with the affected documentation in both directions. Find documented behavior that is no longer reachable and reachable behavior that is not yet documented.

## Warning signs

- "no documentation needed" without inspecting current-state sources
- a changelog entry used instead of contract documentation
- generated files edited directly
- protected instructions changed outside their handoff
- internal helper names copied into public docs
- unrelated stale documentation rewritten because it was nearby
- documentation checks claimed but not run
