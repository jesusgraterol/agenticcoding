---
title: Refine coding instructions
description: Strengthen an existing instruction system without erasing repository knowledge or granting silent authority.
slug: refine-coding-instructions
order: 6
category: instructions
publishedAt: 2026-08-19
updatedAt: 2026-10-15
featured: false
draft: false
relatedSlugs:
  - orient-to-a-codebase
  - synchronize-documentation
situation: A repository already has useful agent instructions, but its planning, authority, testing, or review rules are incomplete or contradictory. Improve them without erasing the knowledge that makes this repository distinct.
example:
  - speaker: developer
    text: Use the canonical refinement process at /refine.txt for this repository.
  - speaker: agent
    text: The proposal is ready. I have not edited anything. Approve, amend, or reject each ID.
    artifact:
      title: Refinement proposal
      status:
        label: Waiting for approval
        tone: neutral
      lines:
        - kind: text
          text: 'P-01 Preserve: package commands and module ownership rules'
        - kind: text
          text: 'S-01 Strengthen: stop before implementation until a plan is approved'
        - kind: text
          text: 'A-01 Add: preserve pre-existing worktree changes'
        - kind: text
          text: 'A-02 Add: triage a failing test before changing its expectation'
        - kind: text
          text: 'R-01 Reconcile: planning steps duplicated by installed skills'
prompt: |
  Use the canonical Agentic Coding refinement process at /refine.txt.

  Inspect the repository's supported instruction system, consuming agents or tools, installed workflow skills, scope and precedence, authoritative and generated sources, current worktree, and relevant engineering evidence. Preserve valuable project-specific guidance.

  Present a preservation-first proposal with stable proposal IDs, exact rule text or patch previews, repository evidence, scope and precedence effects, acceptance criteria, and an explicit disposition for every affected rule. Organize changes as Preserve, Strengthen, Add, Reconcile, and Remove or consolidate.

  Stop for explicit approval of the complete proposal or specific proposal IDs before editing. Approval to edit instructions does not authorize production changes, dependency installation, commits, pushes, deployments, external messages, or account actions.
---

The short prompt above launches the [canonical refinement prompt](/refine/), which carries the complete approval, preservation, ownership, and audit contract.

## What good looks like

- a map of instruction files, their consumers, scope, precedence, and ownership
- workflows that installed skills already define left to those skills, not restated
- repository evidence behind every proposal, not generic preference
- valuable original rules preserved on purpose
- exact proposed text under stable IDs, each with acceptance criteria
- every removal justified individually
- no edits until you approve, and partial approval that stays partial
- a final audit of syntax, precedence, preserved work, and every rule's disposition

Protect the knowledge the current instructions hold, and review rules that change agent authority especially carefully.

## If the result drifts

When a proposal feels generic:

> For each proposed rule, cite the repository behavior or recurring failure it addresses. Remove rules that cannot be justified for this repository.

When the proposal is too broad:

> Separate authority, safety, and correctness gaps from style cleanup. Keep only the high-impact changes and provide exact patch previews.

After approved edits:

> Compare the final instruction system with the original files and the approved proposal IDs. Report every preserved, strengthened, added, reconciled, and removed rule, plus any unresolved conflict.

## Warning signs

- wholesale replacement with a template
- assumptions about instruction filenames or precedence the tools do not support
- generic rules overriding concrete project guidance
- generated, mirrored, or protected files edited instead of their source
- removal justified only by length
- editing before the proposal is approved
- approval to edit instructions treated as authority to commit or push
