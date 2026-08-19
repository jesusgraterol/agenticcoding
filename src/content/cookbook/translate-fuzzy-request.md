---
title: Translate fuzzy requests into an execution brief
description: Turn ambiguous user asks into a bounded plan with explicit scope, acceptance criteria, and verification.
slug: translate-fuzzy-request
order: 9
category: planning
updatedAt: 2026-08-19
featured: true
draft: false
relatedSlugs:
  - plan-a-feature
  - break-down-a-plan
  - control-scope
prompt: |
  Convert this request into a draft execution brief that I can approve before implementation.

  Follow this exact output structure:

  1) Situation and target behavior
  2) What we already know from repository evidence
  3) Precise scope boundaries (in-scope / out-of-scope)
  4) Explicit decision points that need my approval
  5) Risks, failure modes, and tradeoffs
  6) Required tests, checks, and acceptance criteria
  7) A staged milestone proposal if this is large

  For every item, cite repository files, exports, interfaces, or public paths you inspected.
  Do not edit files. End by asking only for explicit approval of the scope.
---

## Situation

You get a feature request like: “can we make this better?” and the developer wants to avoid wasting time in speculative work.

This recipe is about making requests execution-ready before any code changes happen.

## Common mistake

People often let the first assistant response become the plan. That often bakes in assumptions that should be challenged with repository evidence first.

## Agentic approach

Force the agent to do a narrow discovery pass and return a bounded brief with explicit approvals, not a solution.

## What a good result contains

- The exact user-facing behavior the developer is trying to improve.
- Explicit dependencies that must be inspected before any edits.
- A clear boundary: what is changed _because_ of the request and what is intentionally untouched.
- One concrete success/failure matrix and a verifiable testing path.
- A checkpoint where the developer can approve or reject before work starts.

## Concrete example

**Input from developer**

> “The theme toggle is a little confusing. Make it better.”

**Expected conversion**

1. Situation and target behavior

- Convert current theme control to a reliable cycle that preserves preference persistence and system fallback.
- Preserve dark/light logo behavior and avoid layout regressions on `320px` viewport.

2. What we know from evidence

- Theme control event contract is `agentic-theme-change`.
- Theme state is stored with `THEME_STORAGE_KEY` in `localStorage`.
- Verification suite includes visual and reduced-motion checks for navigation/theme behavior.

3. Scope

- In scope: `src/components/theme-control/theme-control.astro`, keyboard and label updates, tests around theme preference.
- Out of scope: authentication, design-system rearchitecture, or content migration.

4. Decision points

- Should users be able to cycle `system -> dark -> light` or `system -> dark -> light` with explicit reset?
- Is animated indicator motion acceptable on this element?

5. Risks

- Accessibility regressions if button labels do not match state.
- Broken persisted preference if event contract changes.

6. Tests

- Unit tests for utility functions.
- E2E theme-persistence test.

7. Milestones

- Milestone 1: UI control + persistence behavior.
- Milestone 2: Tests and accessibility parity checks.

## How I use this recipe

Paste your draft request into this prompt. Ask the assistant to return only the structured brief.
Then approve the scope before implementation.
