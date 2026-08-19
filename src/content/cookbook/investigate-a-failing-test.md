---
title: Investigate a failing test
description: Determine intended behavior before changing production code or an expectation.
slug: investigate-a-failing-test
order: 6
category: review
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - review-a-change
  - control-scope
prompt: |
  Investigate this failing test without assuming that either the production code or the expectation is wrong. Inspect the task contract, current diff, nearby implementation, related tests, documented behavior, invariants, and relevant history. Explain the intended behavior supported by the strongest evidence, identify whether the implementation or expectation should change, and preserve the failing signal if intent remains materially ambiguous.
---

## Situation

A test fails after implementation changed, and the easiest response is to make one side match the other.

## Common mistake

Treating a newer implementation as automatically correct or an older test as automatically authoritative. Recency is evidence, not proof.

## Agentic approach

Investigate intent before editing. Compare the request, contracts, implementation, tests, invariants, and history. Change the side that evidence shows is wrong.

## What a good result contains

- the exact mismatch
- evidence for intended behavior
- an assessment of whether the failure is a regression, stale expectation, or unresolved ambiguity
- a focused correction that preserves meaningful coverage
- explicit reasoning when an expectation changes

## Warning signs

- snapshots or strings updated without contract evidence
- production code rolled back only to restore an old assertion
- assertions weakened or deleted
- a passing suite presented without explaining the behavioral decision
- ambiguity silently normalized

## Developer review responsibility

Confirm the interpretation of intended behavior. When evidence is weak, preserve the failure until the product or contract decision is explicit.
