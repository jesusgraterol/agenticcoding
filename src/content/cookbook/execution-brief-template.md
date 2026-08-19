---
title: Build an execution brief before handoff
description: Convert an approved plan into implementation-ready tasks with ownership, invariants, and rollback conditions.
slug: execution-brief-template
order: 10
category: execution
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - break-down-a-plan
  - execute-one-milestone
  - review-a-change
prompt: |
  Create an execution brief from the approved plan. Return:

  A) Ordered tasks with clear ownership
  B) Exact file-level touch list
  C) Error, compatibility, and scope safeguards
  D) Verification commands and pass criteria
  E) A rollback path if tests fail after this patch

  Use only the task scope already approved. If a needed task falls outside scope, stop and request explicit authorization.
  Include milestones only when the plan is too large to be released safely in one coherent change.
  End with: "Approved scope check: proceed only with explicit milestone authorization."
---

## Situation

A plan is approved, but implementation is still high-risk because there are many touchpoints.

## Common mistake

Starting implementation by editing everything that appears related, instead of declaring explicit checkpoints.

## Agentic approach

Move from strategy to executable sequence with ownership and rollback in the same artifact.

## What a good result contains

- One-to-one mapping from plan objective to code paths.
- Required tests mapped to each task.
- An explicit point to pause and review before moving on.
- A rollback path that does not rely on external tooling.

## Concrete example

**Approved plan**

- Add a safer theme control pattern.

**Execution brief output**

- Task 1: Update `src/components/theme-control/theme-control.astro` UI control and event handling.
  - Tests: update `src/pages/cookbook`? no, `src/layouts/base-layout.test-e2e.ts` theme behavior test.
  - Rollback: remove new control file only if tests or accessibility checks fail.

- Task 2: Align layout metadata and accessibility label updates.
  - Verification: run `npm run test:e2e -- src/layouts/base-layout.test-e2e.ts`.

- Task 3: Review + commit checkpoint.
  - Approval required before the next milestone.

## When to stop

Stop after one approved milestone. Do not start milestone N+1 until there is explicit authorization.
