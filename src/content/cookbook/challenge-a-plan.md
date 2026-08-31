---
title: Challenge a plan
description: Attack a proposed strategy before implementation makes false assumptions and weak boundaries expensive.
slug: challenge-a-plan
order: 3
category: planning
publishedAt: 2026-08-19
updatedAt: 2026-08-30
featured: true
draft: false
relatedSlugs:
  - plan-a-feature
  - break-down-a-plan
  - deepen-a-test-strategy
prompt: |
  Challenge plan [plan path or unambiguous identifier]. Perform a concise, read-only challenge of that exact plan without editing files or Git state, approving or rejecting the plan, creating a breakdown, or beginning implementation.

  Read the complete target plan, the original task contract, and applicable developer amendments. Treat the plan's own task summary as an untrusted claim. Record the plan's repository-relative path or supplied identifier and SHA-256 hash of its complete contents. Verify the hash again immediately before responding and stop if the plan changed.

  Reuse current repository evidence and perform only the smallest additional read-only inspection needed to verify material uncertainty, staleness, or a high-impact claim. Determine what the plan will actually build, change, remove, migrate, expose, or deploy. Compare that result with the developer's objective, constraints, exclusions, acceptance criteria, and amendments.

  Challenge material scope, architecture, ownership, data, public contracts, security, concurrency, dependencies, migrations, compatibility, rollback, removals, and verification. Look for unsupported assumptions, hidden blast radius, parallel ownership, unnecessary complexity, and tests that could pass while important behavior remains wrong. For every finding, state the concrete mismatch or risk, why it matters, and the smallest correction.

  Respond in no more than 1,000 words using exactly these sections: Plan at a glance, Material impact, Challenges, Developer decisions required, and Recommendation. End with exactly one recommendation: No material concerns, Plan revision required before proceeding, or Developer decision required before proceeding.

  Use Plan revision required before proceeding whenever a material plan defect exists, even when developer input is also required. Use Developer decision required before proceeding only when the plan is otherwise sound but cannot proceed safely without a material developer decision. Use No material concerns only when neither condition applies. A challenge is advisory and applies only to the exact hashed plan version.
---

## Situation

A concrete plan looks coherent and may already have support from the team, but changing course is still inexpensive. This is the right point to discover that a key assumption is false, the intended result has drifted, or the proposed evidence could miss a material defect.

Use this recipe for any plan whose scope, contracts, architecture, data, security, compatibility, operations, or test strategy deserves an approval checkpoint. It is also useful when a plan feels suspiciously easy.

## Common mistake

Teams often review a plan by asking whether it sounds reasonable. That rewards fluency rather than correctness. A polished strategy can still miss the one caller that cannot migrate, rely on a nonexistent transaction boundary, or propose tests that never exercise the real integration.

The opposite mistake is unbounded skepticism. Listing every theoretical concern produces noise and delays a sound change. A useful challenge is tied to repository evidence and concrete failure.

## Agentic approach

Give the agent permission to oppose the strategy while preserving the objective. Ask it to disprove important assumptions, not to generate another generic architecture. Require one exact target and content hash so the result cannot be reused after the plan changes.

Review the plan through four lenses:

1. **Truth:** Are claims about current behavior, ownership, and tooling accurate?
2. **Failure:** What realistic input, race, partial failure, permission boundary, or rollout state breaks the design?
3. **Evidence:** Would the proposed tests and checks detect that failure?
4. **Restraint:** Is any complexity present because it is fashionable rather than required?

The result should contain only material information that helps with approval. A challenge does not revise the plan, make the developer's decision, authorize breakdown, or authorize implementation.

## Before you send the prompt

Provide the complete current plan or one unambiguous path or identifier, plus the original objective. Include amendments, exclusions, acceptance criteria, known production constraints, and unresolved decisions. A challenge of a summarized, ambiguous, or stale plan cannot be authoritative.

If the plan depends on external behavior, identify the installed version or current provider contract so the agent can verify the right facts.

## Worked example

Consider a plan for the audit-log export from the previous recipe. The proposal says the browser will repeatedly request every page, concatenate the results, and generate CSV locally because this avoids a new server endpoint.

An adversarial review should produce findings such as:

1. **Blocking authorization drift:** The plan duplicates filter construction in the browser. A later server-side restriction could be absent from the export path, creating an inconsistent or unsafe result. The correction is to keep export query construction behind the server's authoritative validation and authorization boundary.
2. **Blocking resource behavior:** Exporting 100,000 records requires hundreds of sequential requests and holds the complete result in browser memory. Existing page tests would still pass. The correction is a bounded server-owned stream or asynchronous export based on measured limits.
3. **Non-blocking abstraction risk:** A repository-wide export framework is unnecessary for one known export. Keep ownership in the audit-log module until a second real use case establishes shared behavior.

This critique does more than say “client-side export does not scale.” It identifies how the failure appears, why proposed tests miss it, and what minimum design change resolves it.

## What a good result contains

- the exact plan path or identifier and SHA-256 hash
- a concise account of what the plan will actually deliver and explicitly exclude
- material architectural, data, contract, security, operational, compatibility, and rollback impact
- challenges ordered by decision impact, each tied to concrete evidence and the smallest correction
- only unresolved developer decisions that materially affect behavior, scope, safety, data, architecture, or operations
- exactly one permitted recommendation
- an explicit `No material concerns found` statement when no material issue exists

## Useful follow-ups

To probe test adequacy:

> Name one material defect that could survive every proposed test. If none exists, explain why the test boundaries cover the important failure modes.

To challenge unnecessary complexity:

> Identify every new abstraction and dependency in the plan. For each one, show the current repository evidence that justifies owning it now.

To assess rollout risk:

> Walk through old code with new data, new code with old data, partial deployment, retry, and rollback. Report any state that violates the intended contract.

## Warning signs

- the target plan is inferred from recency or a directory search
- the plan hash is omitted or not rechecked before the response
- generic best-practice commentary without repository evidence
- praise or a summary before findings
- speculative edge cases with no credible failure path
- redesign motivated only by style or technology preference
- no examination of authorization, data integrity, rollout, or partial failure where relevant
- “tests look sufficient” without an attempt to construct a surviving defect
- implementation changes made during the challenge
- a challenge is reused after the plan changes

## Developer review responsibility

Decide which risks are real for the product, which tradeoffs are acceptable, and whether the plan still reflects the intended outcome. An adversarial agent improves the decision surface. Its recommendation is advisory and does not approve, reject, revise, break down, or authorize implementation of the plan.
