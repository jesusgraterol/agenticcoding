---
title: Control scope
description: Give the agent enough context to understand the full path without authorizing every dependency it discovers.
slug: control-scope
order: 2
category: execution
publishedAt: 2026-10-15
updatedAt: 2026-10-15
featured: false
draft: false
relatedSlugs:
  - orient-to-a-codebase
  - recover-from-agent-drift
situation: A focused change depends on surrounding authentication, persistence, or shared contracts. The agent has to read them to work safely, but most of them should not change. Reading a dependency is not permission to refactor it.
example:
  - speaker: developer
    text: Add timeout handling to the payment status lookup. Do not touch payment creation, retries, or the provider SDK version.
  - speaker: agent
    text: The provider client cannot cancel a request, so a safe timeout needs one shared change. Approve it, or should I stop here?
    artifact:
      title: Scope map
      status:
        label: Waiting for approval
        tone: warning
      lines:
        - kind: heading
          text: Editable
        - kind: text
          text: status handler, provider lookup, timeout error, focused tests, error docs
        - kind: heading
          text: Inspect only
        - kind: text
          text: payment creation, retry policy, error mapping
        - kind: heading
          text: Out of scope
        - kind: text
          text: provider SDK version
        - kind: heading
          text: Needs your approval
        - kind: text
          text: an abort signal in the shared HTTP client
prompt: |
  Work on this bounded deliverable:

  [Describe the requested change and explicit exclusions.]

  Inspect enough surrounding code to understand the complete affected path, including callers, contracts, validation, authorization, persistence, side effects, tests, configuration, and documentation. Before editing, classify relevant paths as editable, inspect-only dependencies, or out of scope, and explain any supporting change that is strictly required for correctness.

  Modify only the requested deliverable and required supporting work. Do not perform adjacent cleanup, broad consistency changes, speculative abstractions, dependency swaps, or fixes for unrelated issues. Preserve pre-existing work.

  If repository evidence shows that the requested boundary is unsafe or incomplete, stop before expanding it. Explain the evidence, the smallest required deviation, its risks, and the decision I need to make. Report valuable unrelated findings separately without implementing them.
---

## What good looks like

- an explicit editable, inspect-only, and out-of-scope map before any edit
- enough surrounding inspection to understand the complete affected path
- only the supporting changes correctness requires, each justified by evidence
- a clear stop before any material scope expansion, with the decision you need to make
- unrelated findings reported, not fixed
- pre-existing work left untouched
- a final diff you can trace back to the request

Grant more authority only after you understand why the current boundary fails and what the smallest safe expansion is.

## If the result drifts

When a broad change is proposed:

> For every additional file, explain the direct dependency between that change and the requested outcome. Move beneficial but nonessential work to follow-up recommendations.

When the patch looks suspiciously local:

> Trace the changed behavior through its callers, contracts, persistence, side effects, tests, and documentation. Identify anything the local patch bypasses or leaves stale.

When a nearby defect appears:

> Report the defect, impact, and evidence without fixing it. Explain whether the requested work can continue safely without expanding scope.

## Warning signs

- "while here" refactors
- shared modules changed only for stylistic consistency
- a broad diff justified by broad inspection
- an unsafe local workaround used to avoid asking for a necessary contract change
- inspect-only dependencies treated as deliverables
- a scope expansion disclosed only after it was implemented
