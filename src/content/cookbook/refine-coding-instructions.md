---
title: Refine coding instructions
description: Strengthen an existing instruction system through a preservation-first, approval-gated process.
slug: refine-coding-instructions
order: 8
category: instructions
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - plan-a-feature
  - control-scope
prompt: |
  Use the canonical Agentic Coding refinement process at /refine.txt. Inspect the current instruction hierarchy and repository evidence before proposing changes. Preserve valuable project-specific guidance, organize the proposal as Preserve, Strengthen, Add, Reconcile, and Remove or consolidate, then stop for explicit approval before editing instruction files.
---

## Situation

A repository already has useful coding-agent instructions, but its planning, authorization, scope, testing, or review model is incomplete.

## Common mistake

Replacing the file with a generic template destroys project knowledge and creates rules that sound polished but do not fit the actual system.

## Agentic approach

Inspect first, preserve deliberately, ask only material questions, and propose minimal changes grouped by intent. Editing begins only after explicit approval.

## What a good result contains

- repository-specific evidence
- valuable original rules preserved
- missing values added in the project’s own terms
- contradictions reconciled
- removals individually justified
- clear scope and precedence
- a final audit against the original instructions

## Warning signs

- wholesale replacement
- generic rules overriding concrete project guidance
- cosmetic restructuring presented as improvement
- removal justified only by length
- editing before the proposal is approved

## Developer review responsibility

Protect the repository knowledge accumulated in its current instructions. Approve changes individually when their effect on agent authority or engineering behavior is material.
