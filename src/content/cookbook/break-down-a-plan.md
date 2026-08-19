---
title: Break down a plan
description: Convert an approved strategy into coherent implementation milestones without redesigning it.
slug: break-down-a-plan
order: 3
category: planning
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - plan-a-feature
  - execute-one-milestone
prompt: |
  Break down the current approved plan into ordered implementation milestones. Preserve its strategy, scope, exclusions, and acceptance criteria. Each milestone must leave the repository coherent and include its behavior, contracts, tests, documentation, migrations, verification, acceptance criteria, and review checkpoint. Do not redesign the plan or begin implementation. End with the milestone sequence that requires approval.
---

## Situation

The implementation strategy is approved, but completing it in one change would be difficult to verify or review safely.

## Common mistake

Splitting work by file creation, with types first, wiring later, and tests last, leaves deliberately incomplete states and separates behavior from its correctness evidence.

## Agentic approach

Decompose by coherent outcomes. A milestone may touch several files and may depend on earlier work, but it should represent a finished, reviewable state rather than scaffolding for its own sake.

## What a good result contains

- ordered milestones based on real dependencies
- objective and owned scope for each milestone
- implementation and supporting correctness work together
- focused verification and acceptance criteria
- a developer review checkpoint
- no new strategy or expanded scope

## Warning signs

- one milestone per file
- tests or documentation deferred to a cleanup milestone
- temporary duplicate paths introduced only for staging
- milestones that cannot pass verification independently
- later work beginning without separate authorization

## Developer review responsibility

Confirm that each boundary is meaningful, reviewable, and worth authorizing independently. Approving a breakdown is not the same as authorizing every milestone.
