---
title: Review a change
description: Review the exact change adversarially, test its real risks, and issue a readiness verdict supported by evidence.
slug: review-a-change
order: 11
category: review
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - execute-one-milestone
  - investigate-a-failing-test
  - deepen-a-test-strategy
  - synchronize-documentation
  - recover-from-agent-drift
prompt: |
  Review the complete current change without editing files, updating snapshots, or applying fixes. Establish the exact scope against HEAD, including staged, unstaged, untracked, deleted, renamed, and relevant submodule changes. Record an immutable state identifier so the verdict applies to one reproducible change.

  Inspect the task contract, root documentation, affected implementation path, callers, public contracts, tests, configuration, and state-bearing documentation. Evaluate correctness, regressions, security, privacy, authorization, data integrity, error behavior, compatibility, scope, ownership, dead paths, maintainability, and relevant frontend or operational requirements.

  Evaluate test adequacy separately from test execution. Ask whether a material defect could survive while every focused test passes. Run the narrowest relevant non-writing checks and the established broader regression suite when practical. Triage failures instead of assuming the implementation is wrong.

  Report findings first in severity order. For each finding, include the exact location, violated contract, concrete failure scenario, and smallest correction. Then report reviewed scope, immutable state, checks run and not run, limitations, and one verdict: ready, not ready, or review incomplete. Do not issue a ready verdict while a material finding or uncertainty remains.
---

## Situation

Implementation is complete enough to inspect, but plausible output and passing checks are not yet trusted. You need to know whether this exact change is safe to accept.

## Common mistake

Shallow reviews paraphrase the diff, comment on style, and end with “tests pass.” They miss broken callers, stale documentation, weak mocks, authorization gaps, incomplete migrations, and behavior that only fails after integration.

Another common mistake is reviewing a moving target. If files change after the review, the verdict no longer describes the current worktree.

## Agentic approach

Use the agent as an adversarial reviewer, not as the author defending its work. Separate four questions:

1. **Scope:** What exact state is being reviewed?
2. **Correctness:** Does it satisfy the task and repository contracts across the complete affected path?
3. **Evidence:** Do tests and checks exercise the risks that matter?
4. **Readiness:** Is the evidence strong enough for this exact commit or merge decision?

Findings come first because a blocking defect should not be buried beneath a completion summary.

## Before you send the prompt

Provide the original task, approved plan or milestone when one exists, and the intended destination branch for branch reviews. Mention unavailable infrastructure or known pre-existing failures.

Stop editing while the review runs. A state hash, tree identifier, or equivalent fingerprint is useful only if the worktree remains unchanged.

## Worked example

Suppose the audit-log export implementation passes unit tests for CSV escaping and a browser test for clicking “Export.” A shallow review might declare it ready.

An adversarial review asks whether a material defect survives:

- The browser test uses an administrator fixture, but no test proves a normal member is denied.
- The export query accepts the workspace id from the request without comparing it with the authenticated membership.
- Unit tests mock the query service, so the authorization bypass never reaches the real data path.

A useful finding would look like this:

> **Blocking: workspace ownership is not enforced on export.** The export handler forwards the request workspace id directly to the query path, while the list endpoint resolves accessible workspace membership first. A member who knows another workspace id could download its audit events. Reuse the established membership resolution before constructing the export query and add an integration case that exercises the real handler, authorization service, and query boundary with only the external data store stubbed.

The finding identifies the violated local pattern, a credible exploit, the smallest correction, and the test boundary needed to prove it.

## What a good result contains

- findings before summary, ordered by severity
- exact locations and violated task or repository contracts
- concrete failure or regression scenarios
- the smallest correction without unrelated redesign
- separate analysis of focused test depth and executed regression checks
- scope evidence tied to an immutable state
- checks run, exact results, skipped checks, and environmental limitations
- a ready, not-ready, or incomplete verdict that follows from the evidence
- explicit confirmation when no findings remain

## Useful follow-ups

To challenge a green suite:

> Construct the most damaging realistic defect that could survive these tests. Identify the missing boundary or assertion that allows it.

To inspect integration quality:

> Identify every mocked internal collaborator. Explain whether the important correctness property depends on those collaborators working together and which boundary should remain real in an integration test.

To re-review after fixes:

> Re-establish the complete scope and immutable state. Confirm each previous finding against the new implementation, then inspect the correction for new regressions before issuing a fresh verdict.

## Warning signs

- praise or a change summary before findings
- only changed lines are inspected
- “tests pass” is the complete correctness argument
- no attempt to test permissions, failures, retries, concurrency, or malformed input where relevant
- snapshots or tests are modified during review
- material uncertainty is hidden behind a ready verdict
- the reviewed state cannot be reproduced

## Developer review responsibility

Validate the review's interpretation of product intent and risk. Decide whether the evidence meets the real commit, merge, or release threshold. A review verdict is evidence for a decision, not a substitute for ownership of that decision.
