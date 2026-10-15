---
title: Recover from agent drift
description: Stop a wandering implementation, preserve useful work, and re-establish a trustworthy task contract.
slug: recover-from-agent-drift
order: 4
category: execution
publishedAt: 2026-10-15
updatedAt: 2026-10-15
featured: false
draft: false
relatedSlugs:
  - control-scope
  - deepen-a-test-strategy
situation: The agent went past a checkpoint, mixed unrelated changes into the diff, or lost track of which instructions are current. The work may still be valuable, but you can no longer trust its scope. Neither undoing everything nor patching forward is safe.
example:
  - speaker: developer
    text: Stop and audit the current work against the approved milestone. Change nothing.
  - speaker: agent
    text: Nothing was edited, reset, or discarded. Here is every change and where it came from.
    artifact:
      title: Recovery audit
      status:
        label: Edits stopped
        tone: warning
      lines:
        - kind: heading
          text: Keep (approved)
        - kind: text
          text: status lookup timeout and its focused tests
        - kind: heading
          text: Needs your approval
        - kind: text
          text: abort signal added to the shared HTTP client
        - kind: heading
          text: Unapproved
        - kind: text
          text: provider SDK upgrade, payment retry rewrite
        - kind: heading
          text: Yours, left untouched
        - kind: text
          text: the logging change you made before this task
        - kind: heading
          text: Rerun after recovery
        - kind: text
          text: focused tests and the payments module suite
prompt: |
  Stop implementation and audit the current work against the latest approved task contract. Do not edit, reset, revert, clean, stash, commit, or discard anything during this audit.

  Establish the complete worktree state and separate pre-existing developer work from changes made for this task. Map every changed file and behavior to an approved requirement, required supporting work, an unapproved deviation, or unrelated work. Identify incomplete paths, duplicated ownership, stale tests or documentation, hidden assumptions, and checks whose evidence no longer applies.

  Preserve useful work. Recommend the smallest recovery plan: what can remain unchanged, what needs correction, what should be removed only with explicit authorization, which decisions require renewed approval, and which checks must be rerun. Do not continue implementation until I approve that recovery plan.

  If the approved contract is missing, contradictory, or materially invalidated by repository evidence, state that clearly and propose a fresh bounded contract instead of guessing intent.
---

If you only need the agent to stop cleanly, [`jg-pause`](/workflow/#jg-pause) stops it at a safe point and reports where things stand. Use this recipe when the scope itself is in doubt.

## What good looks like

- the exact current state: branch, `HEAD`, staged, unstaged, and untracked changes
- your pre-existing work separated from the task's changes
- every changed path mapped to an approved requirement, required support, an unapproved deviation, or unrelated work
- incomplete behavior, stale evidence, and duplicated paths identified
- useful approved work preserved
- destructive steps described, never run without your explicit authorization
- a minimal recovery plan that stops for approval before implementation resumes

You decide which deviations to keep, remove, or redesign, and you authorize any destructive step only after confirming its exact targets.

## If the result drifts

To classify a disputed change:

> Show the approved requirement or repository evidence that makes this change necessary. If neither exists, classify it as an unapproved deviation.

To preserve work safely:

> Identify the smallest coherent subset that already satisfies an approved outcome. Explain its dependencies and verification state without moving or deleting files.

To resume after approval:

> Restate the approved recovery scope, the exact files and behaviors, the preserved pre-existing work, the destructive actions authorized, and the stopping point before applying any change.

## Warning signs

- destructive Git commands proposed before changes are attributed
- every current change assumed to belong to the agent
- the agent keeps editing during the audit
- a broad refactor proposed as the easiest recovery
- old test results trusted after the state changed
- "scope cleaned up" without a file-by-file account
