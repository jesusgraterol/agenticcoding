# Milestones: Align the Agentic Coding manifesto with the current coding instructions

## Plan reference

- Plan: `coding-agent-planning/1788132760_align-manifesto-with-coding-instructions/plan.md`
- Plan SHA-256: `05cf2ae11bcde85e0ea740ddf17577c3956841a4d8c089ca9acd6cc9fbb92292`
- Plan status: awaiting approval

## Milestone 1: Deliver the coherent public manifesto and workflow system

### Objective

Publish one internally consistent public operating model across the authoritative product specification, README, neutral foundation, cookbook, homepage, resource metadata, generated artifacts, and browser-visible experience. The finished milestone must teach command-before-intent dispatch, the Plan/Challenge/Breakdown/Execute/Review sequence, explicit Correct/Continue/Complete outcomes, and publication as a separate post-acceptance authority without exposing the developer's private technical preferences or a universal `repo push` command.

### Dependencies

- No earlier milestone.
- The current root README, `project.md`, public foundation, cookbook collection, homepage components, site configuration, tests, and installed Astro 7, Tailwind 4, Vitest, and Playwright tooling remain the implementation evidence.
- The developer's operating instructions remain external context and must not be persisted or handed off.

### In-scope ownership

- Product and state-bearing documentation:
  - `project.md`
  - `README.md`
- Public foundation and metadata:
  - `src/content/resources/agents-foundation.md`
  - `src/content/resources/agents-foundation.test-unit.ts`
  - `src/site.config.ts`
  - `src/pages/start.astro`
- Cookbook workflows and discovery:
  - `src/content/cookbook/challenge-a-plan.md`
  - `src/content/cookbook/challenge-a-plan.test-unit.ts`
  - `src/content/cookbook/review-a-change.md`
  - `src/content/cookbook/review-a-change.test-unit.ts`
  - `src/content/cookbook/publish-an-authorized-change.md`
  - `src/content/cookbook/publish-an-authorized-change.test-unit.ts`
  - `src/content/cookbook/execute-one-milestone.md`
  - `src/pages/cookbook/index.astro`
- Homepage manifesto:
  - `src/pages/index.astro`
  - `src/components/engineering-contract/engineering-contract.astro`
  - `src/components/hero-workbench/hero-workbench.astro`
  - `src/components/collaboration-workbench/collaboration-workbench.astro`
  - `src/components/context-authority/context-authority.astro`
  - `src/components/coding-modes-comparison/coding-modes-comparison.astro`
  - `src/components/resource-actions/resource-actions.astro`
- Public artifact and browser evidence:
  - `scripts/verify-build.test-integration.ts`, limited in this milestone to cookbook recipe expectations and generated-artifact coverage
  - `src/layouts/base-layout.test-e2e.ts`

### Implementation work

1. Revise `project.md` first as the authoritative final product contract. Set specification version `3.1.0` and date `2026-08-30`; define command-before-intent dispatch; establish the primary Plan, Challenge, optional Breakdown, Execute, and Review sequence with Correct, Continue, or Complete outcomes; define publication as a separate post-acceptance gate; specify the six-layer engineering-contract visual; add the neutral challenge command and strengthened review expectations; retain the public `repo push` exclusion; add the thirteenth cookbook recipe; and synchronize acceptance, maintenance, testing, definition-of-done, and product-promise sections.
2. Update the neutral foundation, its contract test, site metadata, and `/start/` presentation as one versioned public contract. Add `challenge plan [<plan-path-or-identifier>]` with exact target selection, SHA-256 identity, staleness, fixed sections, word limit, deterministic recommendation, and read-only/no-approval boundaries. Strengthen review state identity, target terminology, focused test adequacy, broader regression evidence, and incomplete verdicts. Keep repository-specific technology, personal package, naming, signing, and publication commands out of the foundation.
3. Synchronize the practical workflows. Bring the challenge and review recipes and their focused tests into exact conceptual alignment with the foundation. Add `Publish an authorized change` as recipe 13 in the existing execution category, with reciprocal relationships, exact destination and history checks, secret detection, cohesive commit and repository signing policy, explicit one-branch publication, and force/bypass/multi-ref prohibitions. Update `Execute one milestone` and cookbook discovery without changing execution authorization.
4. Add the static `engineering-contract` component and integrate it between the operating-model definition and per-change workflow. Update the existing hero, lifecycle, authority, comparison, and resource components so the primary lifecycle ends in explicit review outcomes and the publication gate is visually and semantically separate. Keep data module-level, markup semantic, meaning independent of color, styling within existing Tailwind tokens, and the surface free of client scripts, new motion, and new CSS files.
5. Update generated-artifact expectations and end-to-end coverage for the new recipe route, foundation version and wording, homepage narrative, engineering-contract section, publication boundary, 320px behavior, structured metadata, sitemap and `llms.txt` inclusion, accessibility, themes, keyboard behavior, and reduced motion.
6. Synchronize README coverage only for the changed product description, workflow system, and cookbook surface. Preserve setup, blueprint, `/docs`, deployment, and public-versus-protected instruction guidance that remains accurate.
7. Review all newly authored public prose for the established voice, external-text restrictions, prohibited em dashes and decorative symbols, concise manifesto density, and clear separation between neutral principles and private technical preferences.

### Focused tests and verification

Format only this milestone's files:

```bash
npx prettier --write --config .prettierrc \
  project.md \
  README.md \
  scripts/verify-build.test-integration.ts \
  src/components/coding-modes-comparison/coding-modes-comparison.astro \
  src/components/collaboration-workbench/collaboration-workbench.astro \
  src/components/context-authority/context-authority.astro \
  src/components/engineering-contract/engineering-contract.astro \
  src/components/hero-workbench/hero-workbench.astro \
  src/components/resource-actions/resource-actions.astro \
  src/content/cookbook/challenge-a-plan.md \
  src/content/cookbook/challenge-a-plan.test-unit.ts \
  src/content/cookbook/execute-one-milestone.md \
  src/content/cookbook/publish-an-authorized-change.md \
  src/content/cookbook/publish-an-authorized-change.test-unit.ts \
  src/content/cookbook/review-a-change.md \
  src/content/cookbook/review-a-change.test-unit.ts \
  src/content/resources/agents-foundation.md \
  src/content/resources/agents-foundation.test-unit.ts \
  src/layouts/base-layout.test-e2e.ts \
  src/pages/cookbook/index.astro \
  src/pages/index.astro \
  src/pages/start.astro \
  src/site.config.ts
```

Run focused and broader evidence:

```bash
npm run test:unit -- src/content/resources/agents-foundation.test-unit.ts src/content/cookbook/challenge-a-plan.test-unit.ts src/content/cookbook/review-a-change.test-unit.ts src/content/cookbook/publish-an-authorized-change.test-unit.ts
npm run test:unit
npm run build
npm run test:integration:artifact
npx playwright test src/layouts/base-layout.test-e2e.ts
npm run check
git diff --check
git status --short
```

Manually inspect the changed homepage and cookbook route at 320px, 768px, and 1440px in light and dark themes. Confirm semantic reading order, heading hierarchy, accessible names, keyboard focus, visible focus, non-color-only meaning, mobile flattening, absence of horizontal page overflow, and unchanged reduced-motion behavior. Confirm the static Astro components add no client-side render work.

### Acceptance criteria

- The product specification, README, foundation, start page, cookbook, homepage, metadata, generated artifacts, and tests describe one consistent command-first operating model.
- The public foundation is version `3.1.0`, dated `2026-08-30`, and adds a neutral `challenge plan` command without adding `repo push` or leaking private implementation rules.
- Review clearly distinguishes exact state, focused test adequacy, broader regression evidence, incomplete verification, agent evidence, developer acceptance, and the Correct/Continue/Complete outcomes.
- Publication is presented only as a separate post-acceptance authority. Implementation, review readiness, plan approval, and milestone completion never imply publication authority.
- `Publish an authorized change` is recipe 13, uses the existing execution category, has reciprocal relationships, loads directly, and appears in the sitemap and `llms.txt`.
- The homepage contains the new six-layer engineering-contract visual, preserves the established editorial system, works from 320px through large desktop widths, remains accessible in light and dark themes, and requires no JavaScript or animation.
- Existing routes and raw resource fidelity remain compatible, foundation version metadata is synchronized, and no obsolete parallel command or publication path is introduced.
- All focused and broader automated checks pass, and the manual frontend verification finds no accessibility, responsiveness, theme, reduced-motion, or visual-quality regression.
- No protected instruction file, persistence artifact, handoff prompt, dependency, infrastructure, deployment configuration, or unrelated file is changed.

### Review checkpoint

Before proceeding, the developer should inspect the final public meaning rather than only individual copy edits: command dispatch must precede ordinary intent classification; challenge must be exact and advisory; Review must terminate in Correct, Continue, or Complete; publication must remain a distinct accepted-state gate; and the neutral foundation must remain useful across repositories without inheriting private TypeScript, NestJS, PostgreSQL, package, naming, or signing policy. The developer should also inspect the new mobile and desktop composition, the security-sensitive publication prompt, the versioned public resource diff, and the complete Milestone 1 verification evidence.

## Milestone 2: Complete native-error contracts and final repository audit

### Objective

Complete the one-time native-error contract cleanup for canonical resource loading and build verification while preserving every observable runtime message and invalid-JSON cause. Finish with focused failure evidence for every intentional verifier family and a final read-only audit of the complete plan scope.

### Dependencies

- Milestone 1 must be complete and reviewed.
- `scripts/verify-build.test-integration.ts` carries forward Milestone 1's accepted recipe and artifact expectations; this milestone extends the same file without weakening or replacing them.
- A successful current `dist` build is required as the immutable source fixture for verifier corruption cases.

### In-scope ownership

- Build-verifier contracts and integration evidence:
  - `scripts/verify-build.ts`
  - `scripts/verify-build.test-integration.ts`
- Canonical resource loader and unit evidence:
  - `src/utilities/resource-text/resource-text.ts`
  - rename the existing `src/utilities/resource-text/resource-text.test-unit.ts` normalization test to `src/utilities/resource-text/utilities.test-unit.ts`
  - create `src/utilities/resource-text/resource-text.test-unit.ts` for loader behavior
- Propagating raw resource boundaries:
  - `src/pages/AGENTS.md.ts`
  - `src/pages/refine.txt.ts`
- Read-only final audit scope:
  - every file changed by Milestones 1 and 2
  - relevant state-bearing documentation and protected instruction-file path metadata, without reading excluded backup or archive directories

### Implementation work

1. Add non-exported stable-message ownership without creating a public error surface: `MISSING_CANONICAL_RESOURCE_MESSAGE` in the loader and a descriptive `VERIFY_BUILD_ERROR_MESSAGES` `as const` map containing all sixteen intentional verifier families.
2. Rebuild each intentional native `Error` from its owned stable message while preserving the current full message, punctuation, diagnostic suffix, native error type, and invalid structured-data `cause` exactly. Do not translate incidental filesystem or programmer failures into invented contracts.
3. Synchronize exact caller-facing `@throws` entries. Document `- Missing canonical resource` on the loader and both raw route handlers; document exact reachable stable messages on `parseStructuredData`, `extractStructuredDataEntities`, and `verifyBuild`; and add `- Canonical resource frontmatter is malformed.` to the documented integration-test helper. Audit forward and backward so every documented contract is reachable and every reachable intentional contract is documented.
4. Correct test ownership by moving the existing normalization assertions to `utilities.test-unit.ts`. Add a new loader unit test that mocks only Astro's `getEntry` boundary, exercises the real normalization path, verifies the returned entry and text, and asserts `Missing canonical resource: <resourceId>` exactly.
5. Extend the build integration suite with one validated `mkdtemp` root and one disposable copy of the successful `dist` artifact per table-driven case. Apply only the minimal case mutation and assert the exact full failure for missing, invalid, non-object, and invalid-graph structured data; emitted test files; missing metadata; duplicate descriptions and titles; missing sitemap canonicals; mismatched page structured data; incomplete article and breadcrumb data; broken page links; an indexable 404; invalid `llms.txt` structure; and broken `llms.txt` links. Assert that invalid JSON retains its original parsing `SyntaxError` as `cause`. Remove only the validated disposable root in `finally`.
6. Perform the final plan-to-diff, documentation-state, test-placement, production-build-exclusion, protected-instruction, and native-error contract audits. Preserve Milestone 1's accepted public behavior; any material discrepancy requiring a change outside this milestone must stop for plan or milestone revision rather than silently expanding scope.

### Focused tests and verification

Format only this milestone's files:

```bash
npx prettier --write --config .prettierrc \
  scripts/verify-build.ts \
  scripts/verify-build.test-integration.ts \
  src/pages/AGENTS.md.ts \
  src/pages/refine.txt.ts \
  src/utilities/resource-text/resource-text.ts \
  src/utilities/resource-text/resource-text.test-unit.ts \
  src/utilities/resource-text/utilities.test-unit.ts
```

Run focused and final regression evidence:

```bash
npm run test:unit -- src/utilities/resource-text/resource-text.test-unit.ts src/utilities/resource-text/utilities.test-unit.ts
npm run test:unit
npm run build
npm run test:integration:artifact -- scripts/verify-build.test-integration.ts
npm run test:integration:artifact
npm run check
git diff --check
git status --short
```

Inspect the production build configuration and generated `dist` contents to confirm that the renamed and new `*.test-unit.*` files and the expanded `*.test-integration.*` file remain excluded from production artifacts. Review the temporary-fixture path construction and cleanup before running corruption cases. Complete the end-to-end `@throws` audit in both directions.

### Acceptance criteria

- The loader has one non-exported stable message owner, retains `Missing canonical resource: <resourceId>` exactly, and documents `- Missing canonical resource` at every affected documented boundary.
- The verifier has one non-exported message map covering all sixteen intentional families; every existing runtime message, suffix, and punctuation mark remains unchanged.
- Invalid structured-data failures retain the original parsing `SyntaxError` as `cause`, and the integration test proves it.
- `parseStructuredData`, `extractStructuredDataEntities`, `verifyBuild`, and `extractMarkdownBody` have exact reachable `@throws` entries with no stale trigger descriptions.
- Normalization tests live in `utilities.test-unit.ts`; loader behavior lives in `resource-text.test-unit.ts`; both are co-located and named from the implementation they primarily test.
- Every intentional verifier family has a minimally corrupted disposable-artifact case that asserts its exact full message without mutating canonical `dist` or user files.
- No error registry, new dependency, public error documentation, new error type, or exported internal error surface is introduced.
- Production artifacts contain no unit, integration, end-to-end, or benchmark tests, and all focused and full verification commands pass.
- The complete final diff remains bounded by the plan, all state-bearing documentation is synchronized, Milestone 1 behavior remains intact, and no protected instruction, persistence, handoff, infrastructure, deployment, or unrelated file is changed.

### Review checkpoint

The developer should inspect the stable-message map and every changed throw site for byte-for-byte runtime compatibility, verify that exact `@throws` entries match reachable contracts in both directions, confirm that the invalid-JSON cause is preserved, and review the disposable fixture creation and cleanup for path safety. The final repository review should then compare the complete diff and executed checks against both milestones before any acceptance or separately authorized publication decision.

## Approval required

Approval authorizes this two-milestone sequence and, because the underlying plan is not yet approved, also approves the referenced plan unless the developer limits that approval. It does not authorize implementation. Milestone 1 must receive explicit implementation authorization and reach its review checkpoint before Milestone 2 can be authorized; completing or approving Milestone 1 does not authorize Milestone 2. The complete sequence covers the coherent public manifesto and workflow release first, followed by the native-error contract cleanup and final repository audit.
