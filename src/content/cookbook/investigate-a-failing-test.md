---
title: Investigate a failing test
description: Establish intended behavior before changing production code, expectations, fixtures, or snapshots.
slug: investigate-a-failing-test
order: 9
category: review
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - deepen-a-test-strategy
  - review-a-change
  - recover-from-agent-drift
prompt: |
  Investigate this failing test without editing files and without assuming that either production code or the expectation is wrong:

  [Paste the failing command, test name, assertion diff, and relevant error output.]

  Inspect the task contract, current diff, nearby implementation, related tests, documented contracts, existing invariants, and relevant file or Git history. Reproduce the narrow failure when practical and distinguish a regression caused by the current change from a stale expectation, pre-existing defect, environment problem, or unresolved product ambiguity.

  Explain the intended behavior supported by the strongest evidence. Identify the smallest correct change and which side should change. If the expectation is stale, show why the current implementation is intentional and contract-compatible. If production behavior is wrong, show the failure path and affected callers. If intent remains materially ambiguous, preserve the failing signal and state the decision required.

  Do not weaken assertions, accept snapshots, roll back newer code, or make the suite pass until the behavioral decision is established.
---

## Situation

A test fails after code, copy, fixtures, configuration, or dependencies changed. The diff makes one fact clear: actual and expected behavior disagree. It does not establish which behavior is correct.

## Common mistake

Agents are very good at making a red test green. Without an explicit investigation step, they may update a snapshot to match a regression, weaken an assertion, or revert intentional production behavior because the test is older.

Recency is useful evidence, not authority. New code can be wrong, and old tests can encode the right contract.

## Agentic approach

Treat the failure as a decision problem before treating it as an editing problem.

Use an evidence ladder:

1. explicit task objective and acceptance criteria
2. public and documented contracts
3. security, data-integrity, accessibility, and compatibility invariants
4. current implementation and related callers
5. focused tests that encode the same behavior
6. relevant history and commit intent
7. stylistic preference or what seems most convenient

The strongest consistent evidence determines the intended behavior. If the top evidence conflicts or is missing, keep the test failing until a developer decides.

## Before you send the prompt

Include the exact command, test name, assertion diff, stack trace, and environment. State whether the failure is local, CI-only, intermittent, or reproducible. If the worktree contains user-authored changes, identify them.

Do not paste secrets, credentials, private payloads, or production data into the prompt.

## Worked example

Suppose a checkout test expects a disabled “Pay now” button while tax is loading, but the new component keeps the button enabled and validates tax only after submission.

The implementation is newer, but that alone does not make it right. Investigation should ask:

- Does the task explicitly change submission behavior?
- Do accessibility or product docs define when the action becomes available?
- Does the server reject totals calculated without current tax?
- Are there related tests for keyboard users, double submission, or stale totals?
- Does history show that the disabled state prevented a real race?

If the documented invariant says a payable total must include current tax, production code is wrong even if the new interaction looks faster. Fix the component and add a regression case for submitting while a tax request is in flight.

If the product contract intentionally changed to server-side validation and the button now exposes a clear loading state, the old test may be stale. Update the expectation, but record the evidence and retain coverage for duplicate submission, error feedback, and the server rejection path.

If neither behavior is documented and both are plausible, preserve the failure and ask the developer when payment should become actionable.

## What a good result contains

- the exact mismatch and a reliable reproduction result
- attribution to the current change, existing behavior, environment, or unknown cause
- evidence-ranked reasoning about intended behavior
- a concrete failure scenario if production code is wrong
- justification if an expectation, fixture, mock, or snapshot is stale
- the smallest correction that preserves meaningful coverage
- an explicit unresolved decision when evidence is insufficient

## Useful follow-ups

To expose weakened coverage:

> If we make the proposed expectation change, name a realistic regression that the old test caught and show where that protection will live afterward.

To investigate a flaky failure:

> Identify shared state, timing, ordering, network, clock, random, and concurrency dependencies. Separate a race in production behavior from nondeterminism owned only by the test.

Before editing:

> State the intended behavior in one sentence, cite the evidence, and list the exact production and test changes that follow from that decision.

## Warning signs

- snapshots or strings updated without contract evidence
- assertions weakened, broadened, skipped, or deleted to obtain green output
- production code rolled back only because the test is older
- mocks changed until they agree with implementation details
- a passing suite presented without explaining the behavioral decision
- intermittent failure dismissed after one successful rerun
- ambiguity silently normalized

## Developer review responsibility

Confirm the interpretation of intended behavior and the evidence behind it. When product intent is genuinely missing, make the decision explicitly rather than asking the agent to infer policy from whichever file is easiest to change.
