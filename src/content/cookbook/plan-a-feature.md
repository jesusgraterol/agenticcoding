---
title: Plan a feature
description: Turn a desired outcome into a codebase-grounded implementation strategy with an explicit approval boundary.
slug: plan-a-feature
order: 2
category: planning
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - orient-to-a-codebase
  - challenge-a-plan
  - break-down-a-plan
prompt: |
  Plan this change without modifying files or Git state:

  [Describe the desired user or system outcome. Include known constraints and explicit exclusions.]

  Start with the repository's root documentation, then inspect the smallest complete affected path from its entry point through validation, authorization, business logic, persistence, side effects, public contracts, tests, and operational documentation. Distinguish files that need to change from dependencies that are inspect-only.

  Establish the current behavior with repository evidence. Surface only material questions the codebase cannot answer. Then recommend one authoritative implementation: ownership, data flow, exact modules and contracts, validation and failure behavior, security and data-integrity implications, tests, documentation, deployment or migration concerns, rollback, and verification commands. Identify superseded paths that the change should remove and compatibility paths that must remain.

  Keep optional improvements outside the implementation scope. End with the exact proposed scope, assumptions, unresolved decisions, and acceptance criteria that require my approval. Do not begin implementation.
---

## Situation

You know what should improve for a user or system, but you do not yet know where the behavior belongs or what the repository already provides.

Planning is most valuable when the change crosses a boundary: UI and API, validation and persistence, authentication and ownership, a provider integration, a public contract, or a deployment step. The goal is not a longer task list. It is a reliable model of the change before code starts spreading.

## Common mistake

Asking the agent to “make it work” forces architecture discovery, product clarification, and implementation into the same turn. The agent may commit to the first plausible design, duplicate an existing owner, miss a caller, or hide an unresolved product decision inside code.

An equally weak result is a generic plan that could describe any repository. “Add an endpoint, update the UI, and write tests” does not establish how this system works.

## Agentic approach

Use the agent as an investigative planning partner. Give it a concrete outcome and explicit exclusions, then let it trace the complete affected path. Ask for one recommendation grounded in current modules, contracts, and tests.

Keep three boundaries visible throughout the conversation:

1. **Context boundary:** what the agent may inspect to understand the system.
2. **Change boundary:** what the proposed implementation would modify.
3. **Approval boundary:** what remains undecided until you approve the final plan.

## Before you send the prompt

Provide the information the repository cannot infer:

- the observable outcome, preferably from a user or operator's point of view
- constraints such as compatibility, rollout order, latency, privacy, or supported clients
- explicit exclusions and behavior that must remain unchanged
- any acceptance criteria already agreed with stakeholders

Do not prescribe files or architecture unless they are part of the contract. Let repository evidence establish ownership.

## Worked example

Suppose the request is: “Let workspace administrators export the current audit-log search as CSV. Do not expose events they cannot already view, and do not change the existing pagination experience.”

A grounded planning conversation should uncover questions such as:

- Does the existing list query already enforce workspace ownership and role checks?
- Are filters represented by a validated shared contract or reconstructed independently in the browser?
- Can the current query stream the complete filtered result, or does it only support page-sized reads?
- Does export belong in the audit-log module, a generic file-export module, or an asynchronous job system?
- What prevents a large export from exhausting request memory or timing out?
- Which audit event fields are safe to expose in a downloaded file?

A useful plan might recommend a server-owned export operation that reuses the list filter schema and authorization path, streams bounded rows, records safe diagnostics, and leaves UI pagination untouched. It should name the actual modules found during inspection, define the CSV contract, cover empty and pathological result sets, and state whether a background job is necessary now or only at a measured scale threshold.

The plan should not quietly add a generic export framework, redesign the audit page, or introduce a queue without evidence that the requested behavior needs it.

## What a good result contains

- current behavior with concrete file, symbol, test, and documentation evidence
- desired behavior, exclusions, and measurable acceptance criteria
- one recommended ownership and data-flow design
- exact production, test, configuration, migration, and documentation changes
- validation, authorization, error, persistence, concurrency, and compatibility analysis where applicable
- focused tests plus broader regression and build commands
- rollout, rollback, and operational considerations proportional to risk
- assumptions and decisions that still require the developer
- an explicit stop before implementation

## Useful follow-ups

If the first plan is vague:

> Trace one representative request from the public entry point to its final side effect. Name every contract and ownership boundary it crosses, then revise the plan around that evidence.

If the scope is growing:

> Separate work required for the requested behavior from beneficial follow-up work. Keep only correctness-critical supporting changes in the implementation scope.

If two designs remain plausible:

> Recommend one design. Compare the alternative only on the material tradeoffs that could change the decision, using repository evidence rather than general preference.

## Warning signs

- the plan could be pasted into an unrelated repository
- existing implementations, callers, tests, or public contracts are not cited
- alternatives are listed without a recommendation
- every inspected dependency becomes an editable deliverable
- product ambiguity is silently converted into an implementation assumption
- tests cover file changes instead of failure modes
- implementation starts before approval

## Developer review responsibility

Confirm that the plan solves the real product problem, assigns ownership to the correct modules, and makes tradeoffs you are prepared to support in production. The agent can expose consequences and challenge assumptions. It cannot decide which product constraints matter most or grant itself implementation authority.
