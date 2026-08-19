---
title: Preservation-first instruction refinement prompt
description: A canonical prompt for strengthening an existing coding-agent instruction system without erasing useful project guidance.
resource: refinement-prompt
---

Help me refine the coding-agent instructions in this repository so they express a disciplined Agentic Coding workflow while preserving valuable project-specific guidance.

This is an inspection-and-proposal request first. Do not edit any file until I explicitly approve a concrete change set after your analysis.

Follow this workflow.

## Stage 1 — Inspect before proposing

Inspect the current instruction system and the repository evidence needed to understand it. Include:

- the root `AGENTS.md` when present
- nested or scoped instruction files that may affect the same code
- other supported coding-agent instruction files
- relevant root documentation and architecture guidance
- tooling, tests, and repository conventions needed to interpret existing rules
- instruction hierarchy, scope, and precedence

Do not edit yet.

Summarize:

- valuable existing guidance that should be preserved
- project-specific rules and terminology
- the current planning, authorization, execution, testing, and review model
- overlapping or duplicated instructions
- contradictions, ambiguity, or unclear precedence
- Agentic Coding values that are missing or too weak
- guidance that repository evidence suggests may be obsolete
- decisions that genuinely require my input

Base every conclusion on the current repository. Distinguish evidence from inference.

## Stage 2 — Collaborate interactively

Ask one focused question at a time only when the answer would materially change the proposal.

Do not use a generic questionnaire when repository evidence already answers the issue. Do not ask stylistic questions that do not affect behavior.

Questions may address:

- whether plans require approval before implementation
- whether substantial plans are broken into explicitly authorized milestones
- how scope expansion and adjacent cleanup are handled
- test and review expectations
- instruction-file ownership and precedence
- exact sections or project rules that must remain unchanged
- conflicts between current instructions and the Agentic Coding values below

Do not edit while a material decision remains unresolved.

## Stage 3 — Present a preservation-first proposal

Organize the proposed changes under these headings:

### Preserve

Existing guidance that is useful, accurate, and project-specific.

### Strengthen

Existing concepts that should become clearer, more enforceable, or more complete.

### Add

Missing Agentic Coding values that materially improve how agents work in this repository.

### Reconcile

Conflicting, ambiguous, or overlapping rules that need one authoritative expression.

### Remove or consolidate

Instructions that are demonstrably obsolete, harmful, or redundant. Removal requires especially clear repository evidence and justification.

For every proposed material change:

- explain why it is needed
- identify the affected instruction file and section
- preserve existing terminology and structure where practical
- distinguish a missing engineering value from a stylistic preference
- explain any effect on instruction scope or precedence
- avoid replacing concrete project rules with generic prose

Present one coherent final proposal. Do not include optional cleanup or broad rewriting that is not required.

## Stage 4 — Obtain explicit approval

Stop after the proposal and ask me to approve, reject, or amend the change set.

The following do not count as approval to edit:

- this initial prompt
- permission to inspect
- answers to your questions
- discussion of alternatives
- agreement that a problem exists

Do not modify instruction files until I explicitly approve the proposed edits.

## Stage 5 — Apply minimal approved edits

After approval:

- modify only the approved instruction files
- apply only the approved changes
- preserve unrelated guidance and project-specific constraints
- retain useful examples and exact terminology
- avoid broad rewrites and cosmetic restructuring
- deduplicate only when meaning and precedence remain intact
- do not remove a meaningful rule merely to shorten the file
- do not add conflicting parallel rules
- do not modify production code, tests, application documentation, or configuration outside the approved instruction scope

If new repository evidence would materially change the approved proposal, stop and request approval for the revised change before deviating.

## Stage 6 — Audit the result

After editing, compare the final instructions against the original files and the approved proposal.

Report:

- what was preserved
- what was strengthened
- what was added
- what was reconciled
- what was removed or consolidated
- why each material change was made
- whether instruction scope and precedence remain clear
- whether any important original rule was accidentally lost
- any remaining conflict, ambiguity, or unverified assumption
- the exact files changed

Review the final diff and do not claim success if the result diverges from the approved change set.

## Agentic Coding values to assess

Introduce or strengthen these values only in forms that fit the repository:

1. correctness, clarity, maintainability, consistency, and reviewability over cleverness
2. task-intent classification and explicit authorization boundaries
3. codebase-first reasoning grounded in the smallest complete affected path
4. collaborative planning in which the agent may investigate, propose, and challenge
5. explicit plan approval before substantial implementation when appropriate
6. optional decomposition of approved plans into coherent milestones
7. milestone-scoped execution with clear stopping points
8. wide context and narrow modification authority
9. reuse of existing architecture, abstractions, and ownership boundaries
10. avoidance of adjacent refactors, speculative abstractions, and duplicate implementations
11. meaningful tests, verification, and self-correction
12. test-failure triage before changing production code or expectations
13. adversarial, findings-first review
14. transparent assumptions, blockers, skipped checks, deviations, and uncertainty
15. progressively broader delegation only after the project establishes clear rails
16. developer accountability for intent, direction, tradeoffs, authority, and final quality

Do not blindly impose:

- a language or framework
- a folder structure or naming scheme
- a package manager
- exact test filenames or scripts
- database conventions
- a coding-agent vendor or model
- third-party libraries
- another repository's private instructions
- the full text of a generic instruction template when a smaller repository-specific change is better

Agentic Coding values are portable. Their concrete expression must be grounded in this repository.
