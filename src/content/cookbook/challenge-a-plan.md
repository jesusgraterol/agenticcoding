---
title: Challenge a plan
description: Attack a proposed strategy before implementation makes false assumptions and weak boundaries expensive.
slug: challenge-a-plan
order: 3
category: planning
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - plan-a-feature
  - break-down-a-plan
  - deepen-a-test-strategy
prompt: |
  Review the current plan adversarially without changing files or Git state. Treat the requested outcome and constraints as fixed, but challenge the proposed strategy.

  Verify the plan's important claims against repository evidence. Look for incorrect assumptions, missing callers or failure paths, duplicated ownership, security or data-integrity risks, concurrency and migration hazards, compatibility gaps, unnecessary dependencies, oversized scope, and tests that could pass while material behavior is still wrong.

  For each finding, provide its severity, the exact plan statement or omission, repository evidence, a concrete failure scenario, and the smallest correction. Distinguish blockers from non-blocking improvements. If an alternative architecture is materially stronger, recommend it and explain why in terms of this repository's contracts and constraints.

  Finish with a revised set of decisions and acceptance criteria that should be incorporated before approval. Do not redesign for preference, edit the plan silently, or begin implementation.
---

## Situation

A plan looks coherent and may already have support from the team, but implementation has not started. This is the cheapest point to discover that a key assumption is false.

Use this recipe for changes with meaningful consequences: authorization, billing, stored value, migrations, provider integrations, concurrency, public APIs, or a broad cross-module path. It is also useful when a plan feels suspiciously easy.

## Common mistake

Teams often review a plan by asking whether it sounds reasonable. That rewards fluency rather than correctness. A polished strategy can still miss the one caller that cannot migrate, rely on a nonexistent transaction boundary, or propose tests that never exercise the real integration.

The opposite mistake is unbounded skepticism. Listing every theoretical concern produces noise and delays a sound change. A useful challenge is tied to repository evidence and concrete failure.

## Agentic approach

Give the agent permission to oppose the strategy while preserving the objective. Ask it to disprove important assumptions, not to generate another generic architecture.

Review the plan through four lenses:

1. **Truth:** Are claims about current behavior, ownership, and tooling accurate?
2. **Failure:** What realistic input, race, partial failure, permission boundary, or rollout state breaks the design?
3. **Evidence:** Would the proposed tests and checks detect that failure?
4. **Restraint:** Is any complexity present because it is fashionable rather than required?

## Before you send the prompt

Provide the complete current plan and the original objective. Include amendments, exclusions, acceptance criteria, known production constraints, and unresolved decisions. A review of a summarized or stale plan cannot be authoritative.

If the plan depends on external behavior, identify the installed version or current provider contract so the agent can verify the right facts.

## Worked example

Consider a plan for the audit-log export from the previous recipe. The proposal says the browser will repeatedly request every page, concatenate the results, and generate CSV locally because this avoids a new server endpoint.

An adversarial review should produce findings such as:

1. **Blocking authorization drift:** The plan duplicates filter construction in the browser. A later server-side restriction could be absent from the export path, creating an inconsistent or unsafe result. The correction is to keep export query construction behind the server's authoritative validation and authorization boundary.
2. **Blocking resource behavior:** Exporting 100,000 records requires hundreds of sequential requests and holds the complete result in browser memory. Existing page tests would still pass. The correction is a bounded server-owned stream or asynchronous export based on measured limits.
3. **Non-blocking abstraction risk:** A repository-wide export framework is unnecessary for one known export. Keep ownership in the audit-log module until a second real use case establishes shared behavior.

This critique does more than say “client-side export does not scale.” It identifies how the failure appears, why proposed tests miss it, and what minimum design change resolves it.

## What a good result contains

- findings ordered by severity before any summary
- exact plan claims or omissions tied to repository evidence
- concrete production, security, data, compatibility, or maintenance failures
- an assessment of whether current tests could miss each material defect
- the smallest correction for every blocker
- a clear distinction between required revisions and optional improvements
- a revised decision set that can be returned to the planning conversation
- an explicit statement when no blocking issue is found

## Useful follow-ups

To probe test adequacy:

> Name one material defect that could survive every proposed test. If none exists, explain why the test boundaries cover the important failure modes.

To challenge unnecessary complexity:

> Identify every new abstraction and dependency in the plan. For each one, show the current repository evidence that justifies owning it now.

To assess rollout risk:

> Walk through old code with new data, new code with old data, partial deployment, retry, and rollback. Report any state that violates the intended contract.

## Warning signs

- generic best-practice commentary without repository evidence
- praise or a summary before findings
- speculative edge cases with no credible failure path
- redesign motivated only by style or technology preference
- no examination of authorization, data integrity, rollout, or partial failure where relevant
- “tests look sufficient” without an attempt to construct a surviving defect
- implementation changes made during the challenge

## Developer review responsibility

Decide which risks are real for the product, which tradeoffs are acceptable, and whether the plan still reflects the intended outcome. An adversarial agent improves the decision surface. It does not replace engineering judgment or approval.
