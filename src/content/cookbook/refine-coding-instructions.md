---
title: Refine coding instructions
description: Strengthen an existing instruction system without erasing repository knowledge or granting silent authority.
slug: refine-coding-instructions
order: 12
category: instructions
updatedAt: 2026-08-19
featured: false
draft: false
relatedSlugs:
  - orient-to-a-codebase
  - plan-a-feature
  - control-scope
  - synchronize-documentation
prompt: |
  Use the canonical Agentic Coding refinement process at /refine.txt.

  Inspect the repository's supported instruction system, consuming agents or tools, scope and precedence, authoritative and generated sources, current worktree, and relevant engineering evidence. Preserve valuable project-specific guidance.

  Present a preservation-first proposal with stable proposal IDs, exact rule text or patch previews, repository evidence, scope and precedence effects, acceptance criteria, and an explicit disposition for every affected rule. Organize changes as Preserve, Strengthen, Add, Reconcile, and Remove or consolidate.

  Stop for explicit approval of the complete proposal or specific proposal IDs before editing. Approval to edit instructions does not authorize production changes, dependency installation, commits, pushes, deployments, external messages, or account actions.
---

## Situation

A repository already contains useful coding-agent instructions, but its planning, authorization, scope, testing, or review behavior is incomplete or contradictory.

The objective is to improve how agents work in this repository while retaining the knowledge that makes the repository distinct.

## Common mistake

Replacing existing instructions with a generic template destroys accumulated decisions about architecture, commands, tests, naming, protected files, deployment, and risk. The replacement may sound disciplined while becoming less useful to the agents that actually work there.

Another mistake is editing immediately after identifying a problem. Agreement that a rule is weak is not approval of replacement text.

## Agentic approach

Treat instruction refinement as governed configuration work:

1. Map the instruction system and its consumers.
2. Establish what is valuable, missing, contradictory, obsolete, or owned elsewhere.
3. Ask only questions that repository evidence cannot answer.
4. Present exact proposed changes with stable IDs.
5. Obtain approval for the complete proposal or selected IDs.
6. Apply only approved edits and audit the result against the original system.

Use the canonical refinement prompt because it contains the full approval, preservation, ownership, and audit contract. The shorter prompt above is only a launcher.

## Before you send the prompt

Identify the repository and agent ecosystem you want to refine. Mention instruction files that are generated, mirrored, protected, or managed by another workflow if you know them. State any sections that must remain unchanged.

Make sure the worktree is in a state where pre-existing instruction edits can be identified and preserved. Do not ask the agent to “clean up everything.”

## Worked example

Suppose a repository's `AGENTS.md` says to run tests after implementation but does not distinguish planning from editing, does not protect unrelated work, and gives no rule for failures caused by stale expectations.

A poor refinement replaces the complete file with a standard template.

A strong proposal might contain:

- **P-01 Preserve:** Keep the exact package commands and module ownership rules because current configuration and imports confirm them.
- **S-01 Strengthen:** Extend the existing planning rule with an explicit stop before implementation and exact approval boundary.
- **A-01 Add:** Add worktree preservation because current contributors routinely work with uncommitted changes and no current rule protects them.
- **A-02 Add:** Add test-failure triage so agents establish intended behavior before changing production code or expectations.
- **R-01 Reconcile:** Resolve conflicting instructions about whether documentation updates are optional by following the repository's state-bearing documentation contract.

Each item should show the exact text, location, evidence, scope, and acceptance criteria. The agent should then stop. The developer may approve `S-01` and `A-02`, amend `A-01`, and reject `R-01` without authorizing any edit outside those decisions.

## What a good result contains

- a map of instruction files, consumers, scopes, precedence, ownership, and editability
- repository-specific evidence rather than generic preference
- valuable original rules preserved deliberately
- exact proposed text under stable IDs
- contradictions reconciled at the correct ownership layer
- removals individually justified
- partial approval that does not leak into unapproved edits
- a final audit of syntax, precedence, work preservation, rule disposition, and checks

## Useful follow-ups

When a proposal feels generic:

> For each proposed rule, cite the repository behavior or recurring failure it addresses. Remove rules that cannot be justified for this repository.

When the proposal is too broad:

> Separate authority, safety, and correctness gaps from style cleanup. Keep only the high-impact changes and provide exact patch previews.

After approved edits:

> Compare the final instruction system with the original files and approved proposal IDs. Report every preserved, strengthened, added, reconciled, and removed rule, plus any unresolved conflict.

## Warning signs

- wholesale replacement
- unsupported assumptions about instruction filenames or precedence
- generic rules overriding concrete project guidance
- cosmetic restructuring presented as an engineering improvement
- edits to generated, mirrored, or protected files instead of their authoritative source or handoff
- removal justified only by length
- editing before proposal approval
- approval to edit instructions treated as authority to commit, push, or change production code

## Developer review responsibility

Protect the repository knowledge accumulated in its current instructions. Review changes that affect agent authority especially carefully, approve material proposals individually when useful, and confirm that the final system remains understandable to every supported agent or tool.
