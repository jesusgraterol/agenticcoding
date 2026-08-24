# Persisted planning workflow alignment plan

## Objective

Align the public Agentic Coding planning model with the current protected `AGENTS.md` command contracts introduced by instruction-source commits `f1fc7d59c8bc38cdc31139456bcdb15440aa5c4c` and `8d3e51970a03262e37b4d9e67d35ad306cce04ee`.

The final project must teach and publish a planning workflow in which `plan` and `breakdown` remain planning-only commands while receiving narrowly bounded authority to persist their own artifacts. `breakdown` must create milestones only when a plan has at least two genuinely useful implementation slices. The `coding-agent-planning/` directory and its artifacts will belong to this repository and remain eligible for normal version control; `.gitignore` will not exclude them.

## Current behavior and repository evidence

- The repository is clean at `3d51f8ed8d454123a8a2ea8dd52b8eda777150db` on `main`, and the root `AGENTS.md` is an ignored symlink to `../coding-instructions/src/AGENTS.md`.
- [README.md](../../README.md) establishes `src/content/resources/agents-foundation.md` as the canonical public source for both `/start/` and `/AGENTS.md`; the root protected `AGENTS.md` is explicitly not the public template source.
- `src/pages/start.astro` renders the canonical foundation through `loadResource`, and `src/pages/AGENTS.md.ts` returns the same normalized source as Markdown. Updating the canonical resource therefore updates the rendered, copied, downloaded, and raw surfaces without parallel page logic.
- `src/content/resources/agents-foundation.md` currently prohibits all file changes for planning-only and breakdown-only requests. Its `plan` command also prohibits artifacts, while its `breakdown` command always converts a plan into milestones. These statements conflict with the current protected command contracts.
- `src/content/cookbook/plan-a-feature.md` tells agents to plan without modifying files or Git state. `src/content/cookbook/break-down-a-plan.md` requires an ordered milestone sequence and prohibits file changes. Both recipes teach the superseded behavior.
- `project.md` is the authoritative product specification. Sections 6.5, 13.6, 14.1, and 14.4 describe breakdown as an unconditional stage and prohibit planning-file writes. Section 21.8 does not identify the new repository-owned planning directory.
- `src/components/collaboration-workbench/collaboration-workbench.astro` and `src/components/context-authority/context-authority.astro` present breakdown as an unconditional reliability stage instead of a conditional tool for plans with useful review boundaries.
- `src/site.config.ts` publishes foundation version `2.0.1` with an update date of `2026-08-22`. The product specification classifies a material operating-model change as a major version change.
- `src/content/resources/agents-foundation.test-unit.ts` protects review and evidence language but does not protect `plan` or `breakdown`. The cookbook already uses colocated content-contract tests for important workflows, including `review-a-change.test-unit.ts` and `deepen-a-test-strategy.test-unit.ts`.
- The existing build and artifact integration tests already guarantee that the canonical foundation becomes `/AGENTS.md`, all cookbook routes are published, internal links remain valid, and test files are excluded from production output.

## Desired final behavior

### `plan`

- Continue to classify `plan` as planning-only and prohibit production, test, configuration, dependency, migration, generated-artifact, ordinary documentation, Git-index, commit, and implementation changes.
- Allow only the planning artifact writes defined by the command.
- Create `coding-agent-planning/<unix-seconds>_<descriptive-slug>/plan.md` for a new plan, using a fresh timestamp instead of overwriting an existing path.
- Reuse the same directory when revising the current plan, update the plan for current repository state and completed work, and remove an existing `milestones.md` because a revised plan invalidates the old breakdown.
- Present the repository-relative path and an exact copy of the persisted `plan.md`, ending both with `## Approval required`.
- Leave tracking policy to each adopting repository. This repository's README and specification will record the developer's decision that planning artifacts belong to the repository.

### `breakdown`

- Require the exact current plan from the current discussion and its planning directory. Do not search historical planning directories or select a plan by timestamp.
- Evaluate whether at least two coherent, independently verifiable and reviewable implementation slices exist.
- When the plan is one coherent scope, do not create `milestones.md`; remove an obsolete one if present and direct implementation to proceed as one complete scope after plan approval.
- When decomposition is useful, write the complete sequence to `milestones.md` beside `plan.md`, preserve plan scope and architecture, cover every plan requirement, and present a response body identical to the file.
- Reuse the same `milestones.md` for later breakdown revisions, preserving completed milestones unless the developer explicitly requires them to be revisited.
- Preserve the approval boundary: approving the plan or milestone sequence does not authorize implementation, and each milestone still requires explicit authorization.

### Public presentation

- Describe breakdown as conditional without removing it from the Agentic Coding workflow.
- Preserve the existing four-stage visual model while changing its copy to make clear that decomposition happens only when it creates a useful checkpoint.
- Keep the public foundation concise and repository-agnostic while retaining the material persistence, invalidation, exact-output, and authorization semantics.

## Scope

### In scope

- Synchronize the authoritative product specification, root project blueprint, public foundation, planning cookbook recipes, public resource metadata, and affected homepage workflow copy.
- Add focused colocated unit tests for the public `plan` and `breakdown` content contracts.
- Bump the public foundation to version `3.0.0` because allowing bounded planning writes and making milestone creation conditional materially changes the operating model.
- Update affected public-resource and cookbook dates to `2026-08-24`.
- Keep this planning directory as repository-owned content that can be committed with the eventual implementation.

### Explicit exclusions

- Do not edit the protected root `AGENTS.md` or its source repository.
- Do not add `coding-agent-planning/` to `.gitignore` or another exclusion mechanism.
- Do not change the `review` or `repo push` command contracts.
- Do not redesign the site, add routes, change navigation, alter content schemas, add dependencies, or modify build, deployment, lint, TypeScript, Vitest, or Playwright configuration.
- Do not migrate unrelated cookbook guidance, tests, components, or legacy file organization.
- Do not add runtime support for planning files. They are repository workflow artifacts, not website content loaded by Astro.

## Architecture and contract decisions

### Canonical public resource flow

`src/content/resources/agents-foundation.md` remains the only owner of public foundation prose. Existing resource loading continues to feed `/start/`, copy/download controls, and `/AGENTS.md`. `src/site.config.ts` remains the single owner of the public version and update date. No page or endpoint receives duplicate command text.

### Cookbook ownership

`src/content/cookbook/plan-a-feature.md` owns practical use of `plan`; `src/content/cookbook/break-down-a-plan.md` owns practical use of `breakdown`. Each recipe will explain the same public contract with task-oriented examples rather than duplicating the full foundation wording.

### Planning artifact ownership

`coding-agent-planning/` is a tracked repository-level process directory. Each timestamped task directory owns one authoritative `plan.md` and, only when useful, one `milestones.md`. The directory is not a source input, public route, generated artifact, or deployment requirement. The current plan file remains unchanged during implementation unless the developer explicitly requests a plan revision.

### Compatibility and versioning

The existing public foundation promises no planning writes and unconditional milestone creation. Changing those promises is not a wording-only correction, so `3.0.0` is the correct semantic version under `project.md` section 28. Consumers retain their previously copied files; the rendered and raw current resources change atomically on the next deployment. No compatibility shim or parallel legacy command text should remain.

## File-level changes

### `project.md`

- Set the project specification version to `3.0.0` and `Last updated` to `2026-08-24`.
- Revise section 6.5 so the primary loop treats breakdown as an optional evaluation between plan and execution, and so repeat behavior can authorize the next milestone, the next complete scope, or a plan revision.
- Revise section 13.6 to keep the four-stage visualization while requiring the breakdown stage to communicate that milestones are created only when at least two meaningful slices exist.
- Revise section 14.1's task-intent rule to allow only command-defined planning artifact writes during explicitly invoked `plan` and `breakdown` workflows.
- Replace the old section 14.4 `plan` and `breakdown` requirements with neutral, concise versions of the persisted-file, revision, invalidation, conditional-decomposition, exact-output, coverage, and approval contracts.
- Keep section 15.4's existing "optional plan breakdown" value and synchronize any adjacent language that still assumes every plan has milestones.
- Update section 16.2's planning recipe descriptions so "Break down a plan" evaluates usefulness before decomposition and "Execute one milestone" remains explicitly conditional on a milestone sequence existing.
- Add `coding-agent-planning/` to section 21.8's suggested repository structure and describe its repository-owned `plan.md` and optional `milestones.md` purpose without making it an Astro source directory.

### `README.md`

- Add `coding-agent-planning/` to the Project blueprint as tracked implementation-planning history.
- Add one concise workflow note explaining that each timestamped directory owns an approved plan and an optional milestone sequence, and that the directory is intentionally version-controlled in this repository.
- Preserve the existing distinction between the root protected `AGENTS.md` and the canonical public foundation.

### `src/site.config.ts`

- Change only the Agentic Coding foundation metadata to version `3.0.0` and update date `2026-08-24`.
- Leave refinement-prompt metadata unchanged.

### `src/content/resources/agents-foundation.md`

- Add a narrow exception to the general no-write planning rule for artifacts explicitly authorized by invoked agent commands.
- Rewrite the `plan` section to define the timestamped directory, `plan.md`, same-directory revisions, stale `milestones.md` removal, repository tracking-policy choice, exact response/file parity, and approval boundary.
- Rewrite the `breakdown` section to define current-plan identification, the two-slice threshold, the one-scope outcome, optional `milestones.md`, plan-to-milestone coverage, revision behavior, exact response/file parity, and separate implementation authorization.
- Remove superseded statements that prohibit all planning artifacts or guarantee a milestone sequence.

### `src/content/resources/agents-foundation.test-unit.ts`

- Keep the existing review and evidence tests.
- Add focused tests asserting the public `plan` artifact path and filename, same-directory revision behavior, milestone invalidation, exact persisted/presented content, and approval boundary.
- Add focused tests asserting conditional breakdown, the one-scope no-file result, `milestones.md` ownership, complete plan coverage, and milestone-specific implementation authorization.

### `src/content/cookbook/plan-a-feature.md`

- Update `updatedAt` to `2026-08-24`.
- Revise the working prompt so it invokes the command-defined planning workflow, permits only `plan.md` persistence, and requires the repository-relative artifact path plus exact response/file parity.
- Explain the persisted plan as the stable handoff for challenge, approval, breakdown, implementation, and later revision.
- Update good-result criteria and warning signs to include artifact ownership without turning the recipe into a copy of the full command specification.

### `src/content/cookbook/plan-a-feature.test-unit.ts` (new)

- Add a colocated Node-environment content-contract test.
- Assert that the recipe permits only the planning artifact, identifies `coding-agent-planning/` and `plan.md`, preserves the approval stop, and does not authorize implementation.

### `src/content/cookbook/break-down-a-plan.md`

- Update the description and `updatedAt` date to represent evaluation before decomposition.
- Revise the working prompt to use the exact current plan, apply the two-slice threshold, return a one-scope decision without milestones when appropriate, or persist `milestones.md` beside `plan.md` when decomposition is useful.
- Expand the Agentic approach, result criteria, follow-ups, warning signs, and developer review responsibility to identify forced or artificial decomposition as a failure mode.
- Preserve the current coherent audit-log example as the positive multi-milestone case.

### `src/content/cookbook/break-down-a-plan.test-unit.ts` (new)

- Add a colocated Node-environment content-contract test.
- Assert the two-slice threshold, the valid no-milestone result, same-directory `milestones.md` persistence, plan coverage, approval boundaries, and per-milestone authorization.

### `src/components/collaboration-workbench/collaboration-workbench.astro`

- Change only the static Breakdown stage summary so it describes creating coherent reviewable slices when useful.
- Preserve component structure, semantics, responsiveness, themes, motion behavior, and render cost.

### `src/components/context-authority/context-authority.astro`

- Change only the static reliability-stage label so breakdown is visibly conditional.
- Preserve the existing ordered list, accessible text, responsive layout, themes, and render behavior.

## Ordered implementation strategy

1. **Synchronize the authoritative product contract and repository ownership.** Update `project.md` and `README.md` first so the implementation has one approved definition of conditional decomposition, bounded planning writes, repository-owned artifacts, versioning, and exclusions. Review checkpoint: confirm that the specification does not simultaneously require and forbid planning-file writes, and that no language still makes milestones mandatory for every plan.
2. **Update the canonical public foundation and metadata with its focused tests.** Change `agents-foundation.md`, `site.config.ts`, and `agents-foundation.test-unit.ts` together. Remove the superseded command paths rather than preserving fallback wording. Review checkpoint: trace the public source through `/start/` and `/AGENTS.md`, confirm version `3.0.0`, and compare every material command outcome with the protected `AGENTS.md` behavior.
3. **Update each planning recipe with colocated contract coverage.** Revise `plan-a-feature.md` and `break-down-a-plan.md` together with their new unit tests. Keep the recipes actionable and concise while preserving the foundation's boundaries. Review checkpoint: verify that a developer following either copied prompt gets the correct artifact, conditional-decomposition, and approval behavior without needing hidden context.
4. **Synchronize the homepage workflow presentation.** Apply the minimal static-copy changes in the two affected Astro components. Review checkpoint: confirm that the four-stage model remains understandable while no longer implying that every plan must be decomposed.
5. **Format, audit, and verify the complete change.** Format only touched files, inspect the final diff against this plan, run focused contract tests, then run the established correctness and quality checks. Review checkpoint: confirm that no protected instruction, unrelated content, dependency, configuration, generated asset, or Git exclusion changed.

## Testing and verification

### Focused automated tests

- Run the three planning content-contract tests together:

  ```bash
  npm run test:unit -- src/content/resources/agents-foundation.test-unit.ts src/content/cookbook/plan-a-feature.test-unit.ts src/content/cookbook/break-down-a-plan.test-unit.ts
  ```

- These tests must verify application-owned content contracts rather than Markdown formatting or Astro behavior already guaranteed by the framework.

### Complete correctness regression

- Run every existing correctness category through the repository's generic test boundary:

  ```bash
  npm test
  ```

- This covers unit contracts, the built-artifact integration suite, all required static routes, browser accessibility, raw-resource fidelity, 320-pixel layouts already represented by the suite, theme behavior, navigation, and reduced motion.

### Quality checks

- Format only the files changed by the implementation with the local Prettier installation and `.prettierrc`.
- Run:

  ```bash
  npm run typecheck
  npm run lint
  npm run format:check
  npm run build
  ```

- Inspect the generated `/AGENTS.md` through the existing artifact integration coverage and confirm that no planning or test file is copied into `dist/`.

### Manual contract and frontend review

- Compare the canonical foundation, plan recipe, breakdown recipe, specification, and homepage copy in both directions so no stale mandatory-breakdown or absolute no-write statement remains.
- Inspect the homepage and both planning recipe routes at 320 pixels and a large desktop width, in light and dark themes, with keyboard navigation and reduced motion enabled. The copy-only component changes must not introduce overflow, inaccessible names, focus changes, theme regressions, motion changes, or avoidable render work.
- Confirm that the Astro components still contain only module-level static arrays and no new client state, effects, callbacks, object creation during render, or hydration cost.

## Error handling, security, persistence, and deployment

- No application exception contract, `@throws` path, authentication rule, authorization rule, user data, secret, external integration, database, cache, queue, or value-bearing behavior changes.
- Planning artifact persistence is ordinary Git worktree persistence. It does not require runtime storage, migrations, environment variables, deployment ordering, or rollback tooling.
- The planning directory must not be loaded into the generated website or exposed as a new route. Its content is published only if the repository itself is public and the files are committed, which is the developer's explicit choice for this project.
- Deployment remains the existing static GitHub Pages workflow. The new public foundation and recipe content publish atomically with the next normal build and deployment.
- Rollback is a normal content revert covering the specification, canonical foundation, metadata, recipes, tests, and presentation copy together. Do not restore partial legacy wording that would make the public surfaces disagree.

## Risks and mitigations

- **Public contract drift:** The same workflow appears in the specification, foundation, recipes, and homepage. Mitigate with one canonical foundation owner, concise recipe-specific wording, focused string-contract tests, and a final repository search for superseded statements.
- **Forced decomposition survives in generic copy:** Search active, non-excluded files for unconditional phrases such as `produce ordered implementation milestones`, `create ordered milestones`, and planning `do not modify files` before completion; evaluate each occurrence in context rather than replacing unrelated review-only guidance.
- **Version metadata drift:** Update only the foundation metadata in `site.config.ts`; the rendered page already consumes it directly. Leave refinement-prompt versioning untouched.
- **Planning files accidentally treated as site content:** Keep `coding-agent-planning/` outside `src/` and do not change Astro content loaders or build inputs.
- **Over-testing static prose:** Test the material command semantics that could regress. Do not add tests for dates, ordinary wording, Markdown formatting, or framework-guaranteed rendering.
- **Frontend regression from longer labels:** Keep replacement text short, preserve the current responsive grid and semantic lists, and verify the affected surfaces at 320 pixels and in both themes.

## Assumptions and resolved decisions

- The August 24 protected instruction changes are intended to become part of the public Agentic Coding operating model, not remain a private repository-only divergence.
- `coding-agent-planning/` belongs to this repository and must remain unignored and eligible for commit. No `.gitignore` change is authorized or needed.
- The public foundation should express the new behavior neutrally without importing unrelated personal package, language, framework, database, or repository-specific rules from the protected instructions.
- Version `3.0.0` is required because the public command changes from strictly read-only planning to bounded artifact persistence and from mandatory to conditional milestone creation.
- No current milestone breakdown exists for this plan, so there is no `milestones.md` to remove.

## Acceptance criteria

- The specification, README, canonical public foundation, planning recipes, foundation metadata, and homepage workflow copy agree that planning commands may write only their defined planning artifacts.
- A new `plan` produces the required timestamped directory and `plan.md`; a revision reuses it and invalidates an existing milestone breakdown.
- `breakdown` creates `milestones.md` only for at least two meaningful slices and otherwise leaves the plan as one complete implementation scope.
- Persisted planning and milestone bodies exactly match their presented response bodies and end with the required approval boundary.
- Approval of a plan or milestone sequence never implicitly authorizes implementation, and milestone execution remains individually authorized.
- `coding-agent-planning/` is documented as repository-owned and is not ignored, loaded by Astro, or emitted into the production site.
- The public foundation displays version `3.0.0` and update date `2026-08-24`; affected cookbook recipes display the same update date.
- Focused content-contract tests pass, the complete correctness suite passes, typechecking passes, linting passes, formatting passes, and the production build passes.
- Responsive behavior down to 320 pixels, accessibility, light and dark themes, reduced motion, and Astro render efficiency remain intact.
- No protected coding-instruction file, unrelated content, dependency, lockfile, deployment configuration, or generated asset changes.

## Approval required

Approve the complete scope above to synchronize the project specification, tracked planning-directory documentation, public foundation version `3.0.0`, planning cookbook recipes, focused contract tests, and conditional-breakdown homepage copy with the current protected `plan` and `breakdown` command behavior. Approval authorizes implementation of this complete plan as one scope; it does not authorize committing, pushing, deployment, or any unrelated change.
