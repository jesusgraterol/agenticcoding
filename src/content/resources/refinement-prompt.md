---
title: Preservation-first instruction refinement prompt
description: A canonical prompt for strengthening an existing coding-agent instruction system without erasing useful project guidance.
resource: refinement-prompt
---

Help me refine the coding-agent instructions in this repository so they express a disciplined Agentic Coding workflow while preserving valuable project-specific guidance.

This is an inspection-and-proposal request first. It authorizes read-only inspection and a concrete proposal, not edits. Do not modify any file until I explicitly approve proposed changes after reviewing them.

Follow this workflow.

## Stage 1: Inspect before proposing

Inspect the current instruction system and the smallest complete set of repository evidence needed to understand it. Include:

- the root `AGENTS.md` when present
- nested or scoped instruction files that may affect the same code
- other supported coding-agent instruction files
- which agents or tools consume each file and whether its filename, location, and syntax are supported
- the scope, hierarchy, precedence, and ownership of each instruction source
- whether a file is authoritative, mirrored, generated, protected, or managed elsewhere
- relevant root documentation and architecture guidance
- tooling, tests, and repository conventions needed to interpret existing rules
- the current worktree state and any pre-existing changes in instruction files

Respect repository context exclusions and access boundaries. Do not inspect dependency, build-output, archive, backup, generated, or sensitive-data locations unless current repository evidence makes that inspection necessary and permitted. Never expose secrets, credentials, tokens, private URLs, or sensitive values.

Keep inspection proportional. Do not edit, install dependencies, create generated artifacts, or change Git state.

Create an instruction map that identifies, for every relevant instruction source:

- path and consuming agent or tool
- repository, directory, file-pattern, or task scope
- precedence and interaction with other applicable instructions
- authoritative owner or source
- whether it is directly editable, generated, mirrored, or protected
- current conflicts, duplication, obsolete guidance, and synchronization requirements

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

## Stage 2: Collaborate interactively

Ask one focused question at a time only when the answer would materially change the proposal.

Do not use a generic questionnaire when repository evidence already answers the issue. Do not ask stylistic questions that do not affect behavior.

Questions may address:

- the target instruction scope and supported agents or tools
- whether plans require approval before implementation
- whether substantial plans are broken into explicitly authorized milestones
- how scope expansion and adjacent cleanup are handled
- test and review expectations
- canonical ownership, generated or mirrored files, and precedence
- exact sections or project rules that must remain unchanged
- conflicts between current instructions and the Agentic Coding values below

Do not edit while a material decision remains unresolved.

## Stage 3: Present a preservation-first proposal

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

- assign a stable proposal ID
- identify the affected instruction file, section, scope, and consuming agents or tools
- describe the current behavior and repository evidence
- provide the exact proposed rule text or a reviewable patch preview
- explain why the change is needed and what failure it prevents
- preserve existing terminology and structure where practical
- distinguish a missing engineering value from a stylistic preference
- explain effects on scope, precedence, compatibility, generated sources, or mirrors
- identify any existing rule the change replaces, consolidates, or makes unnecessary
- define concrete acceptance criteria
- avoid replacing concrete project rules with generic prose

Map every meaningful rule affected by the proposal to Preserve, Strengthen, Add, Reconcile, or Remove or consolidate. No rule should disappear without an explicit disposition and justification.

Present one coherent final proposal. Do not include optional cleanup or broad rewriting that is not required. If the current instructions already express the relevant values clearly and safely, recommend no change instead of manufacturing edits.

## Stage 4: Obtain explicit approval

Stop after the proposal and ask me to approve, reject, or amend individual proposal IDs or the complete change set.

The following do not count as approval to edit:

- this initial prompt
- permission to inspect
- answers to your questions
- discussion of alternatives
- agreement that a problem exists

Approval must identify the complete proposal or the specific proposal IDs authorized for editing. Unapproved or unresolved items remain out of scope. Treat the approved IDs and any explicit amendments as the editing contract.

Do not modify instruction files until I explicitly approve the proposed edits after the proposal is presented.

## Stage 5: Apply minimal approved edits

After approval:

- modify only the approved instruction files
- apply only the approved changes
- preserve pre-existing worktree changes and distinguish them from your edits
- preserve unrelated guidance and project-specific constraints
- retain useful examples and exact terminology
- avoid broad rewrites and cosmetic restructuring
- deduplicate only when meaning and precedence remain intact
- do not remove a meaningful rule merely to shorten the file
- do not add conflicting parallel rules
- edit an authoritative source rather than generated or mirrored output when repository evidence establishes that ownership
- follow the repository's required handoff instead of bypassing a protected or externally managed instruction file
- do not reset, clean, stash, revert, or overwrite unrelated work
- do not modify production code, tests, application documentation, or configuration outside the approved instruction scope

Approval to edit instruction files does not authorize commits, pushes, pull requests, deployments, releases, production or shared-environment changes, external messages, dependency installation, or account and service actions. Require separate explicit authorization for those actions.

If new repository evidence would materially change the approved proposal, stop and request approval for the revised change before deviating.

## Stage 6: Audit the result

After editing, compare the final instructions against the original files, the pre-existing worktree state, the instruction map, and the approved proposal.

Verify that:

- filenames, locations, scopes, frontmatter, glob patterns, and other instruction syntax remain valid for their consuming agents or tools
- authoritative and approved mirrored instruction surfaces are synchronized without creating competing owners
- precedence is unambiguous and no applicable lower-scope rule silently contradicts the result
- command names, activation conditions, permissions, approval boundaries, and stopping conditions are explicit where commands exist
- every meaningful original rule has an intentional final disposition
- existing instruction-specific linters, formatters, or repository checks pass when available, without installing new tooling

Review the resulting system against representative failure scenarios when they apply: an answer-only request, planning without implementation approval, partial proposal approval, a scoped-instruction conflict, pre-existing developer changes, a high-blast-radius change, and an unauthorized commit, push, deployment, or external action.

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
- checks and scenarios evaluated, their results, and checks not run
- pre-existing changes that were preserved
- the exact files changed

Review the final diff and do not claim success if the result diverges from the approved change set or if a material instruction conflict remains unresolved. Stop after the audit unless I separately authorize another action.

## Agentic Coding values to assess

Introduce or strengthen these values only in forms that fit the repository:

1. correctness, clarity, maintainability, consistency, and reviewability over cleverness
2. task-intent classification and explicit authorization boundaries, including separate authority for external actions
3. a clear decision-precedence model and correct handling of scoped instruction files
4. codebase-first reasoning grounded in the smallest complete affected path
5. collaborative planning in which the agent may investigate, propose, and challenge
6. explicit plan approval before substantial implementation when appropriate
7. optional decomposition of approved plans into coherent milestones
8. milestone-scoped execution with clear stopping points
9. wide context and narrow modification authority
10. reuse of existing architecture, abstractions, and ownership boundaries
11. avoidance of adjacent refactors, speculative abstractions, and duplicate implementations
12. meaningful tests, verification, and self-correction
13. test-failure triage before changing production code or expectations
14. adversarial, findings-first review
15. preservation of developer-authored, unrelated, and pre-existing work
16. security, privacy, authorization, data integrity, and safe handling of destructive actions
17. deliberate handling of high-blast-radius changes and domain-specific production safeguards
18. synchronization of state-bearing documentation and governance files with current behavior
19. unambiguous command activation, permissions, approval boundaries, and stopping conditions
20. transparent assumptions, blockers, skipped checks, deviations, and uncertainty
21. progressively broader delegation only after the project establishes clear rails
22. developer accountability for intent, direction, tradeoffs, authority, and final quality

Do not blindly impose:

- a language or framework
- a folder structure or naming scheme
- a package manager
- exact test filenames or scripts
- database conventions
- a coding-agent vendor or model
- specific dependencies, personal packages, or third-party libraries
- a universal instruction hierarchy unsupported by the repository's actual agents or tools
- another repository's private instructions
- the full text of a generic instruction template when a smaller repository-specific change is better

Agentic Coding values are portable. Their concrete expression must be grounded in this repository.
