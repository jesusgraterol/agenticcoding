---
title: Execute one milestone
description: Authorize one complete implementation slice, verify it proportionally, then hand it to agent and developer review.
slug: execute-one-milestone
order: 5
category: execution
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - break-down-a-plan
  - control-scope
  - review-a-change
  - synchronize-documentation
prompt: |
  Implement only [milestone number and name] from the approved plan and breakdown. Treat the approved plan, breakdown, and the following amendments as the complete task contract:

  [List amendments, or write "No amendments."]

  Before editing, confirm the milestone's exact outcome, editable scope, inspect-only dependencies, acceptance criteria, and required checks from current repository evidence. Preserve unrelated and pre-existing work.

  Complete the milestone's production behavior together with its contracts, validation, error handling, tests, documentation, migrations, compatibility work, and verification. Inspect each logical step and the final diff. If new evidence requires crossing the milestone boundary or materially changing the approved strategy, stop before doing so and explain the required deviation.

  Report files changed, behavior delivered, tests and checks actually run, skipped checks and limitations, migration or deployment state, documentation synchronization, and remaining risks. Stop so the developer can invoke `review` or `review <branch-name>` for the agent review and then perform the developer review. Do not scaffold or begin a later milestone, commit, push, deploy, or perform another external action unless separately authorized.
---

## Situation

An approved plan has been divided into coherent milestones, and one named milestone is ready to build.

This recipe turns approval into a precise execution contract. It is especially useful when a long conversation contains several versions of the plan, because “go ahead” may otherwise leave the active scope ambiguous.

## Common mistake

Authorizing “the next part” without naming it allows the agent to infer boundaries from convenience. It may prepare later abstractions, apply adjacent cleanup, or keep working after the intended checkpoint because the next action appears obvious.

Another mistake is interpreting a milestone as production code only. Tests, migrations, documentation, and verification are part of a complete behavior, not cleanup for a future turn.

## Agentic approach

Name the exact milestone and restate amendments made after the breakdown. Require the agent to finish that outcome and nothing beyond it.

Execution should follow a tight loop:

1. Confirm the contract against current repository state.
2. Implement one logical step.
3. Inspect the step and run the narrowest useful check.
4. Reconfirm that remaining work still belongs to the milestone.
5. Run the complete milestone verification and inspect the final diff.
6. After implementation stops, invoke `review` or `review <branch-name>` for the agent review, then complete the developer review, typically in the pull request.

## Before you send the prompt

Include:

- the milestone number and exact name
- the approved plan and breakdown, or a stable location where both are available
- every amendment made after approval
- any pre-existing worktree changes the agent must preserve
- separate authorization for any commit, push, deployment, external message, or shared-environment action you actually want

Do not combine “implement milestone 2” with vague permission to “handle anything else you find.”

## Worked example

Suppose milestone 1 is “Prove the bounded audit-log export path.” A complete authorization should include the server operation, canonical filters, permission checks, CSV transformation, tests, documentation, and verification described by that milestone.

It should not include:

- the download button owned by milestone 2
- a queue for hypothetical large exports
- refactoring unrelated audit-event formatting
- a reusable export framework for future modules
- committing or deploying the result

If inspection reveals that the current database query cannot stream safely without a schema or index change omitted from the approved plan, the agent should not hide that fact behind in-memory pagination. It should stop, show the query and workload evidence, explain the required plan change, and ask for direction.

A strong completion report would say which contract now exists, which permission and boundary cases are covered, which checks passed, whether any migration was generated or executed, and what the developer should inspect before milestone 2.

## What a good result contains

- only the named milestone and its required supporting work
- preservation of unrelated and pre-existing changes
- production behavior, contracts, tests, migrations, and documentation delivered together
- exact verification results rather than assumed success
- explicit handling of failures or stale test expectations
- a final diff audit for accidental scope growth and dead paths
- a clear handoff to agent review and developer review, with no later-milestone work

## Useful follow-ups

When the agent reports a newly discovered dependency:

> Explain whether this dependency is inspect-only, required supporting work within the milestone, or a material scope change. Show the repository evidence and stop if additional authority is required.

When verification fails:

> Triage the failure against the task contract, implementation, test expectation, and existing behavior. Do not change production code or weaken the test until intended behavior is established.

Before accepting completion:

> Compare the final diff with the milestone contract line by line. Identify any change that is not required for the milestone or any acceptance criterion without evidence.

## Warning signs

- later-milestone types, configuration, or scaffolding appear in the diff
- “while here” cleanup is presented as required without evidence
- tests or documentation are postponed
- a migration is created but its execution state is unclear
- checks are claimed from memory or an earlier repository state
- the agent automatically commits, pushes, deploys, or continues

## Developer review responsibility

After the agent review, inspect the milestone at the promised checkpoint, typically as the pull request reviewer. Verify the behavior and evidence, decide whether new discoveries change the remaining plan, and authorize the next milestone only when the repository is in a coherent state.
