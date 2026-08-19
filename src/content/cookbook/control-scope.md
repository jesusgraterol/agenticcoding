---
title: Control scope
description: Give the agent enough context to understand dependencies without authorizing adjacent work.
slug: control-scope
order: 7
category: execution
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - plan-a-feature
  - execute-one-milestone
prompt: |
  Inspect enough surrounding code to understand the complete affected path, but treat the requested deliverable as the only modification authority. Distinguish inspect-only dependencies from editable paths before implementation. Do not perform adjacent cleanup or broaden the task. If correctness would require a material scope change, stop, explain the evidence and deviation, and request direction before applying it.
---

## Situation

A focused change depends on authentication, persistence, shared utilities, or other surrounding code that the agent must understand.

## Common mistake

Either starving the agent of context or granting modification authority over every dependency it discovers.

## Agentic approach

Separate the field of view from the target. Name inspect-only dependencies and editable paths, then require a pause if repository evidence makes the original boundary unsafe.

## What a good result contains

- a complete affected-path understanding
- explicit editable and inspect-only areas
- no unrelated cleanup
- supporting changes only when required for correctness
- a clear stop when material expansion needs developer authority

## Warning signs

- “while here” refactors
- shared modules changed only for stylistic consistency
- a broad diff justified by broad inspection
- a local workaround used to avoid reporting a necessary contract change
- dependencies treated as deliverables

## Developer review responsibility

Confirm that the boundary is neither dangerously narrow nor casually broad. Grant additional authority only when the evidence and tradeoff are understood.
