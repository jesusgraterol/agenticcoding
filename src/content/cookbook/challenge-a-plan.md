---
title: Challenge a plan
description: Attack a proposed strategy before implementation makes its weaknesses expensive.
slug: challenge-a-plan
order: 2
category: planning
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - plan-a-feature
  - break-down-a-plan
prompt: |
  Review this plan adversarially without changing files. Inspect the repository evidence behind its assumptions. Identify missing cases, conflicting contracts, security or data-integrity risks, duplicated ownership, weaker alternatives, unnecessary scope, and tests that could pass while the behavior is still wrong. Recommend concrete revisions, distinguishing blockers from optional improvements.
---

## Situation

A plausible plan exists, but the team has not yet committed implementation effort.

## Common mistake

Treating agreement as validation. A coherent plan can still depend on a false assumption, miss a failure path, or introduce a second owner for existing behavior.

## Agentic approach

Ask the agent to take the opposing position. It should inspect the claims behind the strategy, identify how the plan could fail, and recommend the smallest correction before approval.

## What a good result contains

- findings ordered by impact
- the repository evidence behind each concern
- concrete failure scenarios
- a distinction between blocking problems and optional improvements
- the smallest correction that preserves the objective
- an explicit assessment of test adequacy

## Warning signs

- generic best-practice commentary
- praise before findings
- objections unsupported by current code
- redesign motivated only by preference
- no attempt to find a defect that could survive the proposed tests

## Developer review responsibility

Decide which tradeoffs reflect the real product and operational constraints. Adversarial review should improve the plan, not transfer architecture ownership away from the developer.
