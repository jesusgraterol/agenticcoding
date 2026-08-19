---
title: Recover from agent drift
description: Stop a wandering implementation, preserve useful work, and re-establish a trustworthy task contract.
slug: recover-from-agent-drift
order: 8
category: execution
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - control-scope
  - investigate-a-failing-test
  - review-a-change
prompt: |
  Stop implementation and audit the current work against the latest approved task contract. Do not edit, reset, revert, clean, stash, commit, or discard anything during this audit.

  Establish the complete worktree state and separate pre-existing developer work from changes made for this task. Map every changed file and behavior to an approved requirement, required supporting work, an unapproved deviation, or unrelated work. Identify incomplete paths, duplicated ownership, stale tests or documentation, hidden assumptions, and checks whose evidence no longer applies.

  Preserve useful work. Recommend the smallest recovery plan: what can remain unchanged, what needs correction, what should be removed only with explicit authorization, which decisions require renewed approval, and which checks must be rerun. Do not continue implementation until I approve that recovery plan.

  If the approved contract is missing, contradictory, or materially invalidated by repository evidence, state that clearly and propose a fresh bounded contract instead of guessing intent.
---

## Situation

The agent has wandered from the approved plan, continued past a checkpoint, mixed unrelated cleanup into the diff, or lost track of which instructions are current. The work may still contain valuable implementation, but trust in the scope is gone.

This recipe is also useful after a long interrupted conversation or context compaction when the current state no longer matches the narrative.

## Common mistake

The instinct is to say “undo the extra changes” or restart from a clean checkout. That can destroy developer-authored work, discard correct implementation, and hide why the drift occurred.

The other failure is to keep patching forward. Once the active contract is unclear, every new edit increases the cost of recovery.

## Agentic approach

Stop mutation and rebuild trust from evidence.

Audit in this order:

1. **Current state:** exact branch, HEAD, worktree, staged and untracked changes, and active Git operations.
2. **Authority:** latest approved plan, milestone, amendments, exclusions, and stopping conditions.
3. **Attribution:** pre-existing work versus task changes.
4. **Disposition:** approved, required supporting work, unapproved deviation, unrelated, or incomplete.
5. **Recovery:** smallest safe path to a coherent state, with destructive steps requiring explicit authorization.

The objective is not to preserve every line the agent wrote. It is to preserve evidence and valuable work while restoring a clear contract.

## Before you send the prompt

Stop editing. Provide the latest approved plan, milestone, amendments, and any commentary where scope changed. Identify work that existed before the agent began.

Do not run reset, checkout, clean, stash, or broad formatting commands. If a command may discard data, leave it for a separately approved recovery step.

## Worked example

Suppose an agent was authorized to add timeout handling to the payment status lookup. The resulting diff also upgrades the provider SDK, rewrites shared error handling, changes payment creation retries, and updates snapshots across the module.

The audit might classify:

- status lookup timeout and its focused tests: approved
- one shared client abort-signal change: required supporting work, but only if current client evidence shows no local safe boundary
- provider SDK upgrade: unapproved deviation
- payment creation retry rewrite: unrelated behavior change
- broad snapshot updates: unresolved until intended behavior and assertion differences are investigated
- developer's pre-existing logging change: preserve untouched

The recovery plan could retain the bounded timeout implementation, ask for approval on the shared client change, remove the SDK and retry deviations only after the developer authorizes exact reversions, investigate snapshots independently, and rerun focused plus module regression checks.

This is safer than resetting the module or asking the same drifting agent to “clean things up.”

## What a good result contains

- an immutable description of the complete current state
- explicit separation of pre-existing and task-authored work
- every changed path mapped to authority and purpose
- incomplete behavior, stale evidence, and duplicate paths identified
- useful approved work preserved
- destructive recovery actions described but not performed without authorization
- a minimal ordered recovery plan with decisions and checks
- a renewed stop before implementation resumes

## Useful follow-ups

To classify a disputed change:

> Show the exact approved requirement or repository evidence that makes this change necessary. If neither exists, classify it as an unapproved deviation.

To preserve work safely:

> Identify the smallest coherent subset that already satisfies an approved outcome. Explain its dependencies and verification state without moving or deleting files.

To resume after approval:

> Restate the approved recovery scope, exact files and behaviors, preserved pre-existing work, destructive actions authorized, and stopping point before applying any change.

## Warning signs

- destructive Git commands proposed before attribution is established
- every current change assumed to belong to the agent
- the agent continues editing during the audit
- a new broad refactor proposed as the easiest recovery
- approved and unapproved changes blended into one verdict
- old test results applied after the state changed
- “scope cleaned up” without a file-by-file disposition

## Developer review responsibility

Decide which deviations to keep, remove, or redesign. Authorize destructive recovery steps explicitly and only after confirming their exact targets. Then restore a bounded contract before implementation resumes.
