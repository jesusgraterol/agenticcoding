---
title: Plan a feature
description: Turn a vague requirement into a codebase-grounded implementation strategy before editing files.
slug: plan-a-feature
order: 1
category: planning
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - challenge-a-plan
  - break-down-a-plan
prompt: |
  Plan this feature before implementation. Inspect the root documentation and the smallest complete affected path, then collaborate with me on the intended behavior, architecture, ownership, contracts, risks, tests, and verification. Challenge assumptions when repository evidence supports it. Do not modify files or Git state. End with the exact implementation scope that requires my approval.
---

## Situation

You have a feature request that describes an outcome but not how it belongs in the current system.

## Common mistake

Asking the agent to start coding immediately forces it to discover architecture, contracts, edge cases, and product intent while implementation is already spreading through the repository.

## Agentic approach

Use the agent as an investigative planning partner. Let it trace the affected path, find reusable ownership, surface consequences, and challenge the initial shape before code changes make the decision expensive.

## What a good result contains

- current behavior supported by repository evidence
- intended behavior and explicit exclusions
- one authoritative architecture
- exact affected modules and contracts
- validation, error, persistence, and security considerations
- tests and verification commands
- risks, assumptions, and unresolved decisions
- an approval boundary before implementation

## Warning signs

- the plan could apply to any repository
- no existing code or test is cited
- alternatives are listed without a recommendation
- dependencies are silently added to the deliverable
- implementation begins before approval

## Developer review responsibility

Confirm that the plan solves the real product problem, assigns responsibility to the correct modules, and does not encode assumptions the repository cannot answer.
