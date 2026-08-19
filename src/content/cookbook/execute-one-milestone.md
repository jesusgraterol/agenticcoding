---
title: Execute one milestone
description: Authorize one coherent implementation slice and stop before later work.
slug: execute-one-milestone
order: 4
category: execution
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - break-down-a-plan
  - review-a-change
prompt: |
  Implement only the specified approved milestone. Treat the approved plan, breakdown, and amendments as the task contract. Include the milestone's required production behavior, tests, contracts, documentation, migrations, and verification. Preserve unrelated work, review the final diff, report checks and limitations, and stop at the milestone's review checkpoint without starting later milestones.
---

## Situation

An approved plan and breakdown exist, and one named milestone is ready for implementation.

## Common mistake

Authorizing “the next part” without restating the boundary can let convenient adjacent work or the following milestone enter the change.

## Agentic approach

Name the milestone explicitly. Require a complete slice, including its tests and documentation, then stop for review even when the next step appears obvious.

## What a good result contains

- only the authorized milestone
- production changes and correctness evidence together
- preservation of unrelated work
- focused and broader verification results
- a final diff audit
- a clear stopping point

## Warning signs

- later milestone scaffolding appears in the diff
- adjacent cleanup is described as necessary without evidence
- tests are postponed
- verification is claimed rather than shown
- the agent continues automatically after reporting success

## Developer review responsibility

Inspect the checkpoint before authorizing more work. Verify that the repository is coherent and that new evidence has not invalidated later milestone assumptions.
