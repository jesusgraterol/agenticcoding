---
title: Review a change
description: Have the agent assemble adversarial evidence for the developer's acceptance decision.
slug: review-a-change
order: 11
category: review
publishedAt: 2026-08-19
updatedAt: 2026-08-30
featured: true
draft: false
relatedSlugs:
  - execute-one-milestone
  - investigate-a-failing-test
  - deepen-a-test-strategy
  - synchronize-documentation
  - recover-from-agent-drift
  - publish-an-authorized-change
prompt: |
  Review [the complete uncommitted change or the active branch against target branch] without editing files, updating snapshots, or applying fixes.

  For uncommitted work, inspect staged, unstaged, untracked, deleted, renamed, and relevant submodule changes against HEAD. Record a reproducible staging-insensitive fingerprint of the complete state that `git add -A` would stage.

  For a branch review, require an active branch and resolve the named local or remote-tracking target unambiguously. Refresh the relevant remote-tracking ref when available, report freshness limitations, find the merge base, inspect the commits and cumulative diff that would enter the target, account for target-side changes, and assess the prospective merge result. Record the effective target and merge-base commits. Exclude uncommitted changes from the branch review and report them separately.

  Inspect the task contract, root documentation, affected implementation path, callers, public contracts, tests, configuration, and state-bearing documentation. Evaluate correctness, regressions, security, privacy, authorization, data integrity, error behavior, compatibility, scope, ownership, dead paths, maintainability, and relevant frontend or operational requirements.

  Evaluate focused test adequacy independently from test execution. Ask whether a material defect could survive every focused test, especially when tests and implementation share assumptions. Run the narrowest relevant non-writing checks first, then the affected package, application, workspace, or repository regression boundary. Triage failures instead of assuming the implementation or test is wrong.

  Report findings first in severity order. For each finding, include the exact location, violated contract, concrete failure scenario, and smallest correction. Then report reviewed scope and immutable state, checks run and not run, limitations, and one verdict: Ready to commit, Ready to merge into [target branch], Not ready, or Review incomplete. Use Review incomplete when exact scope, target freshness, mergeability, material test adequacy, or required verification cannot be established confidently.

  After the verdict, stop. The developer uses the evidence to choose Correct when a defect, stale contract, or material uncertainty remains; Continue when an accepted milestone is complete and another authorized slice remains; or Complete when the accepted state satisfies the task contract and no implementation work remains. The verdict informs but never authorizes developer acceptance or publication.
---

## Situation

Implementation is complete enough to inspect, but plausible output and passing checks are not yet trusted. The agent must produce findings and reproducible evidence for the exact change so the developer can challenge the proof and make the acceptance decision.

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

Readiness is the agent's evidence verdict, not the developer's workflow outcome. The developer uses that evidence to choose Correct, Continue, or Complete. Publication remains a separate decision after acceptance.

The agent should carry most of the operational burden: inspect the implementation, run the checks, attack test depth, investigate failures, and identify uncertainty. The developer supervises the evidence rather than repeating the entire review by default.

## Before you send the prompt

When the repository uses the Agentic Coding foundation, prefer `review` for the complete uncommitted worktree or `review <target-branch>` for committed work intended for a target branch. Use the prompt above when those commands are unavailable or when you need to provide additional review constraints.

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
- explicit identification of implementation and test assumptions that may fail together
- independent oracles or adversarial checks for material correlated risk
- a staging-insensitive complete-state fingerprint for uncommitted work, or effective-target and merge-base commits for branch review
- target freshness and prospective merge evidence when reviewing a branch
- checks run, exact results, skipped checks, and environmental limitations
- a ready, not-ready, or incomplete verdict that follows from the evidence
- a clear handoff to the developer's Correct, Continue, or Complete decision
- explicit confirmation when no findings remain

## Useful follow-ups

To challenge a green suite:

> Construct the most damaging realistic defect that could survive these tests. Identify the missing boundary or assertion that allows it.

To inspect integration quality:

> Identify every mocked internal collaborator. Explain whether the important correctness property depends on those collaborators working together and which boundary should remain real in an integration test.

To demand independent evidence:

> Identify the strongest assumption shared by the implementation and its tests. Propose the smallest property, mutation, differential check, integration boundary, or system invariant that could disprove it independently.

To re-review after fixes:

> Re-establish the complete scope and immutable state. Confirm each previous finding against the new implementation, then inspect the correction for new regressions before issuing a fresh verdict.

After developer acceptance, if publication is separately authorized:

> Use the Publish an authorized change workflow. Re-resolve the exact destination and current state instead of treating this review verdict as publication authority.

## Warning signs

- praise or a change summary before findings
- only changed lines are inspected
- “tests pass” is the complete correctness argument
- no attempt to test permissions, failures, retries, concurrency, or malformed input where relevant
- implementation and tests repeat the same assumptions without an independent oracle
- snapshots or tests are modified during review
- material uncertainty is hidden behind a ready verdict
- the reviewed state cannot be reproduced
- a branch target is assumed, stale target evidence is hidden, or target-side changes are ignored
- focused tests are rerun but the affected broader regression boundary is skipped without justification

## Developer review responsibility

After the agent review, challenge its interpretation of product intent, its risk model, and the independence of its evidence. Choose Correct when work or proof remains deficient, Continue when an accepted milestone is complete and another authorized slice remains, or Complete when the accepted state satisfies the task contract. Inspect code when evidence is weak, correlated, novel, incomplete, or attached to a high-impact change. The agent's verdict informs the decision but never authorizes acceptance or publication.
