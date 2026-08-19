---
title: Control scope
description: Give the agent enough context to understand the full path without authorizing every dependency it discovers.
slug: control-scope
order: 6
category: execution
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - orient-to-a-codebase
  - execute-one-milestone
  - recover-from-agent-drift
prompt: |
  Work on this bounded deliverable:

  [Describe the requested change and explicit exclusions.]

  Inspect enough surrounding code to understand the complete affected path, including callers, contracts, validation, authorization, persistence, side effects, tests, configuration, and documentation. Before editing, classify relevant paths as editable, inspect-only dependencies, or out of scope, and explain any supporting change that is strictly required for correctness.

  Modify only the requested deliverable and required supporting work. Do not perform adjacent cleanup, broad consistency changes, speculative abstractions, dependency swaps, or fixes for unrelated issues. Preserve pre-existing work.

  If repository evidence shows that the requested boundary is unsafe or incomplete, stop before expanding it. Explain the evidence, the smallest required deviation, its risks, and the decision I need to make. Report valuable unrelated findings separately without implementing them.
---

## Situation

A focused change depends on surrounding authentication, persistence, shared utilities, or public contracts. The agent must inspect those areas to work safely, but most of them should not change.

This is where “wide context, narrow authority” becomes operational. Reading a dependency is not permission to refactor it.

## Common mistake

Overly narrow instructions starve the agent of context, producing local patches that break callers or bypass existing ownership. Overly broad instructions turn every discovery into a deliverable and produce large diffs filled with cleanup unrelated to the objective.

The false choice is “inspect only the target file” versus “fix everything nearby.” A strong workflow separates what the agent may understand from what it may modify.

## Agentic approach

Make scope a visible artifact before editing:

- **Editable:** paths and contracts directly required for the requested outcome.
- **Inspect-only:** dependencies needed to understand correctness but not expected to change.
- **Out of scope:** areas that should not influence or enter the current work.
- **Escalate:** a possible supporting change that requires evidence and developer approval before crossing the boundary.

This classification can change only when new evidence demonstrates that the original boundary cannot produce a safe, complete result.

## Before you send the prompt

State the observable deliverable and exclusions. If you already know that a directory, contract, dependency, or migration must remain untouched, say so and explain whether that is a hard constraint or a current expectation.

Tell the agent about pre-existing worktree changes so it can distinguish them from the task. Avoid listing editable files unless ownership is already established.

## Worked example

Suppose the task is: “Add timeout handling to the payment-provider status lookup. Do not change payment creation, retries, or the provider SDK version.”

The agent may need to inspect:

- the public status endpoint
- the payment service that orchestrates the lookup
- the provider client and installed SDK contract
- error mapping and documented exceptions
- retry configuration
- tests for status polling and timeout behavior

That does not authorize refactoring payment creation, replacing the HTTP client, normalizing every provider error, or upgrading the SDK.

A useful scope map might classify the status handler, provider lookup method, timeout error contract, focused tests, and error documentation as editable. Payment creation and retry paths are inspect-only because they establish shared behavior. The SDK is out of scope because the request excludes upgrades.

If the provider client has no way to cancel or bound a request, adding safe timeout handling may require a shared client change. The agent should show that evidence and ask whether to expand scope. It should not simulate a timeout with a UI timer while the server request continues consuming resources.

## What a good result contains

- an explicit editable, inspect-only, and out-of-scope map
- enough surrounding inspection to understand the complete affected path
- only required supporting changes, each justified by correctness evidence
- preservation of unrelated code and worktree changes
- separately reported opportunities rather than opportunistic fixes
- a clear stop before material scope expansion
- a final diff that can be traced back to the task contract

## Useful follow-ups

When a broad change is proposed:

> For every additional file, explain the direct dependency between that change and the requested outcome. Move beneficial but nonessential work to follow-up recommendations.

When the patch looks suspiciously local:

> Trace the changed behavior through its callers, contracts, persistence, side effects, tests, and documentation. Identify anything the local patch bypasses or leaves stale.

When a nearby defect appears:

> Report the defect, impact, and evidence without fixing it. Explain whether the requested work can continue safely without expanding scope.

## Warning signs

- “while here” refactors
- shared modules changed only for stylistic consistency
- a broad diff justified solely by broad inspection
- an unsafe local workaround used to avoid reporting a necessary contract change
- inspect-only dependencies treated as task deliverables
- unrelated user changes reformatted or overwritten
- a material scope expansion disclosed only after implementation

## Developer review responsibility

Confirm that the field of view is wide enough for correctness and the edit boundary remains faithful to the objective. Grant additional authority only after understanding why the current boundary fails and what the smallest safe expansion entails.
