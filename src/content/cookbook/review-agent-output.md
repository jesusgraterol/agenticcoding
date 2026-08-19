---
title: Make agent outputs verifiable
description: Convert a completed model output into machine-checkable claims before accepting the change.
slug: make-agent-output-verifiable
order: 11
category: review
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - review-a-change
  - investigate-a-failing-test
  - control-scope
prompt: |
  You produced a candidate patch or changed suggestions. Your task now is validation, not advocacy. Do the following:

  1) Restate exactly what behavior changed.
  2) List each behavior-to-file mapping.
  3) Map each mapping to a check command and expected observable result.
  4) Identify at least one edge case where the patch may still fail.
  5) Rank findings by severity and indicate any blocking points.

  If the patch can be accepted, return a concise risk matrix and remaining caveats, and avoid praise.
  If evidence is incomplete, request additional inspection explicitly.
---

## Situation

A model has completed implementation and the remaining risk is that generated code passed only subjective inspection.

## Common mistake

Declaring success because code compiles, while the changed behavior can still be wrong in realistic edge cases.

## Agentic approach

Treat the patch as a hypothesis. Validate each claim with explicit checks.

## What a good result contains

- Findings-first review.
- Check commands paired with expected outcomes.
- Edge cases that could survive passing tests.
- A clear recommendation with no ambiguity.

## Concrete example

**Claim**

> "The new navigation progress bar only shows during page transitions."

**Validation map**

- Route navigation in e2e (e.g., `/` -> `/start/`) shows progress at start and hides on `page:after`.
- Failed navigation preparation path does not leave the bar visible.
- Keyboard-triggered routes have the same behavior.
- Axe checks inside the progress region return no violations.

**Edge case**

- If a long request never resolves and history navigation happens rapidly, the bar must still clean up on error/reload.

## Acceptance style

Use this recipe as a final filter before merge: every non-trivial change must map to at least one explicit check.
