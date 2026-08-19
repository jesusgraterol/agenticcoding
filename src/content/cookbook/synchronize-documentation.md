---
title: Synchronize documentation
description: Update durable documentation from the implemented behavior without turning the task into a documentation rewrite.
slug: synchronize-documentation
order: 7
category: execution
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - execute-one-milestone
  - review-a-change
  - refine-coding-instructions
prompt: |
  Synchronize state-bearing documentation for the current implementation change. First inspect the complete diff, the repository's documentation ownership and generation workflows, and every current-state document directly affected by the changed behavior.

  Build a change-to-document map covering public contracts, architecture and module ownership, setup, environment, operations, migrations, deployment, errors, cache behavior, examples, and generated references where applicable. Distinguish durable behavior from task-specific implementation detail.

  Update only authoritative documentation required to keep the repository accurate. Preserve unrelated prose and established voice. Use the required generator or handoff for generated, protected, mirrored, or externally managed files rather than editing them directly.

  Verify documentation in both directions: every documented changed contract matches implementation, and every implementation change that developers or operators must know is documented. Run existing documentation, link, build, and generated-reference checks. Report stale documentation outside scope without rewriting it.
---

## Situation

Implementation changed a behavior, contract, module responsibility, setup step, error, migration, or operational workflow. The code is not complete if the repository still teaches the previous state.

Documentation synchronization is not the same as adding a changelog sentence. It updates the durable sources people and agents rely on to understand or operate the current system.

## Common mistake

Documentation is either skipped as “non-code work” or expanded into a broad cleanup. The first leaves stale contracts. The second rewrites nearby prose that the implementation did not affect, creating a noisy diff and new review risk.

Another failure is editing generated references or protected instruction files directly, only for a later generator or governance workflow to overwrite the result.

## Agentic approach

Map implementation changes to documentation obligations before editing.

Classify each potential update:

- **Required state synchronization:** existing documentation would become false or incomplete without the change.
- **Required new durable knowledge:** future developers or operators need a new concept or process that has no current home.
- **Generated or governed:** update the authoritative source or follow the required handoff.
- **Task detail:** useful in a review summary but not durable enough for repository documentation.
- **Unrelated stale content:** report separately unless the current change directly affects it.

## Before you send the prompt

Provide the exact implementation scope and verification state. Identify generated docs, protected instruction files, API reference generators, migration tooling, and external documentation systems if known.

If the implementation is still changing, synchronize after its contracts stabilize. Otherwise the agent may document an intermediate state.

## Worked example

Suppose the audit-log export adds a new administrator-only endpoint, a CSV field contract, a synchronous export limit, and a documented timeout error.

The documentation map might require:

- API reference source: endpoint, permission, filters, media type, field order, result limit, and error contract
- audit-log module documentation: export ownership and reuse of the list filter contract
- canonical error registry and affected `@throws` entries: stable timeout and authorization behavior
- operator documentation: request limit and diagnostic signals if exports fail
- root README blueprint: only if module responsibility or setup meaningfully changed

It should not add internal helper names, narrate the implementation sequence, or rewrite unrelated audit-log prose. If API reference is generated from schemas, the agent should update schemas and generator inputs, then regenerate and review the artifact through the established command.

## What a good result contains

- a traceable map from changed behavior to documentation owners
- direct updates to every affected current-state contract
- no task diary, speculative roadmap, or unrelated prose cleanup
- authoritative sources updated instead of generated output
- protected or external documentation handled through the required workflow
- examples and commands verified against current behavior
- link, build, generator, and documentation checks actually run when available
- stale out-of-scope documentation reported separately

## Useful follow-ups

To find missing obligations:

> For every changed public contract, error, environment value, migration, module owner, cache behavior, and operational step, identify the authoritative documentation source and whether it remains accurate.

To reduce noise:

> Remove documentation edits that only restate implementation details or improve unrelated prose. Keep changes required to describe the current system truthfully.

To audit both directions:

> Compare the final implementation with affected documentation in both directions. Find documented behavior no longer reachable and reachable durable behavior not yet documented.

## Warning signs

- “no documentation needed” without inspecting current state-bearing sources
- a changelog entry used as a substitute for contract documentation
- generated files edited directly
- protected instructions changed outside their handoff workflow
- internal class and helper details copied into public docs
- examples or commands added without verification
- unrelated stale documentation rewritten because it was nearby
- documentation checks claimed but not run

## Developer review responsibility

Confirm which knowledge must remain durable and who owns it. Review externally visible contracts and operational guidance with the same care as production code, because stale instructions can create failures even when the implementation is correct.
