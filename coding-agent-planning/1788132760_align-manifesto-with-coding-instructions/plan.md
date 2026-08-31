# Plan: Align the Agentic Coding manifesto with the current coding instructions

## Task contract

Revise the Agentic Coding website so its manifesto and practical resources clearly communicate the durable engineering system expressed by the developer's current coding instructions. The result must explain not just that agents can plan, implement, and review, but how task intent, repository evidence, module ownership, bounded authority, coherent delivery, adversarial verification, documentation synchronization, developer acceptance, and separately authorized publication work together.

The implementation must preserve the project's established product boundaries:

- The homepage remains the concise, editorial manifesto.
- The public `AGENTS.md` remains a neutral, repository-agnostic foundation rather than a copy of the developer's TypeScript, NestJS, PostgreSQL, package, naming, or signing preferences.
- The cookbook carries concrete, reusable workflows that need more operational detail than the manifesto.
- The repository's protected coding instructions remain distinct from the public foundation and must not be created or edited by this implementation.
- Existing accessibility, responsive, light/dark theme, reduced-motion, static-output, raw-resource synchronization, SEO, and verification contracts remain mandatory.

## Current behavior and repository evidence

- `project.md` defines the product as a manifesto and toolkit, but its primary change loop is still `Plan -> Breakdown when useful -> Execute -> Review`. It does not yet include adversarial plan challenge or distinguish the primary change loop from a separately authorized post-acceptance publication gate.
- `src/pages/index.astro` already communicates developer control, collaborative planning, bounded execution, wide context with narrow authority, agent-operated evidence, and developer-governed acceptance. These are strong foundations, but task classification, repository truth, ownership, coherent state synchronization, and publication authority are mostly implicit.
- `src/components/collaboration-workbench/collaboration-workbench.astro` visualizes only Plan, Breakdown, Execute, and Review. `src/components/context-authority/context-authority.astro` similarly omits the explicit challenge step and the distinction between lifecycle completion and separately authorized publication.
- `src/content/resources/agents-foundation.md` already defines `plan`, `breakdown`, `review`, and `review <branch-name>`, but it does not define the new read-only `challenge plan` command. Its review command mentions exact scope but does not yet require the same explicit immutable state evidence and focused-versus-regression test distinction as the current instructions.
- `project.md` deliberately requires the public foundation to remain language-, framework-, model-, and vendor-agnostic, and it explicitly keeps repository-specific `repo push` policy out of the neutral foundation. That separation remains correct even though publication authority now needs clearer product treatment.
- `src/content/cookbook/challenge-a-plan.md` already teaches adversarial plan review, but its prompt and output contract are less deterministic than the current `challenge plan` command. `src/content/cookbook/review-a-change.md` already covers immutable review state and adversarial evidence. No cookbook recipe currently owns safe, separately authorized repository publication.
- `src/site.config.ts` publishes foundation version `3.0.0`, last updated on `2026-08-24`. Adding a compatible command and strengthening existing workflow guidance is a semantic-minor foundation change.
- The current test architecture already follows the project's required categories: unit tests under `src`, artifact integration tests under `scripts`, and Playwright end-to-end tests under `src`. `package.json` exposes `test:unit`, `test:integration`, `test:e2e`, the aggregate `test`, and the broader `check` pipeline.
- `src/layouts/base-layout.test-e2e.ts` already verifies required routes, automated accessibility in light and dark themes, homepage narrative, 320px behavior, keyboard navigation, reduced motion, raw-resource fidelity, and navigation state. These checks should be extended rather than replaced.
- The current native error paths have a contained ownership, documentation, and coverage mismatch: `src/utilities/resource-text/resource-text.ts` and `scripts/verify-build.ts` define intentional messages inline and use trigger descriptions instead of exact stable messages in `@throws`; the raw resource route handlers propagate the resource-loading failure without documenting it; the resource-text unit test is named after the loader while testing the normalization utility; the build integration suite exercises only the verifier success path; and the documented integration-test frontmatter helper omits its intentional error contract.
- No protected coding-instruction file is tracked in the repository. The developer has confirmed that this is intentional: the coding instructions are operator-owned context and must not be persisted or handed off for persistence by this project.

## Desired final behavior

### Manifesto

The homepage must explain the instruction system as a coherent reliability model:

1. Dispatch explicitly invoked agent commands before ordinary task-intent classification, then establish the task contract and distinguish inspection, planning, implementation, review, and external action authority.
2. Ground decisions in root documentation, current code, installed versions, established ownership, and public contracts.
3. Plan collaboratively, challenge material assumptions before approval, break down only when useful, execute one authorized scope, review exact immutable state, then correct, continue, or complete according to the evidence.
4. Keep implementation together with the tests, documentation, exports, migrations, and other state required to make the change honest and complete.
5. Use adversarial evidence to find defects that implementation-shaped tests may miss, while preserving developer responsibility for acceptance.
6. Codify project-specific technical rules after the neutral foundation rather than pretending one universal template can own every language, framework, database, or operational decision.

Publication must appear as a separate post-acceptance gate, not as the final stage of the primary loop. Only a developer-accepted state plus explicit publication authority may enter that gate; review readiness, implementation authority, plan approval, or milestone completion must not imply it.

The narrative must remain concise and editorial. It should compress the detailed private instructions into durable principles, not reproduce their full technical catalogue.

### Public foundation

The public foundation must:

- state that explicitly invoked agent commands are resolved before ordinary answer, investigation, planning, review, or implementation intent, and that ordinary classification runs only when no command is invoked;
- add a neutral `challenge plan [<plan-path-or-identifier>]` command;
- require an exact target, complete-plan hash, minimal evidence-based inspection, material findings only, fixed result sections, and one deterministic recommendation;
- make clear that challenge neither edits nor approves the plan and becomes stale after plan revision;
- strengthen `review` and `review <target-branch>` with immutable state evidence, focused test-adequacy analysis, the affected broader regression boundary, and incomplete verdicts when material evidence cannot be established;
- consistently use `<target-branch>` as the branch-review argument name;
- retain the existing explicit boundary that implementation authority does not authorize commits, pushes, deployments, or other external actions;
- remain neutral and omit a universal `repo push` command because signing, staging, destination, and publication policies are repository-specific.

This compatible expansion will publish foundation version `3.1.0` with `updatedAt` set to `2026-08-30`. The refinement prompt remains version `1.1.0` because its preservation-first inspection, proposal, approval, protected-file, command-contract, and audit workflow already covers the updated instruction system.

### Cookbook

- `Challenge a plan` must become the practical companion to the new command, including exact target selection, content hashing, staleness detection, material-impact reporting, developer decisions, and the three permitted recommendations.
- `Review a change` must use the same `<target-branch>` terminology and clearly separate focused test adequacy from the broader regression suite required for readiness.
- Add `Publish an authorized change` as the thirteenth recipe. It must teach that publication is a separate authority, require exact destination resolution, inspect uncommitted state and unpublished history, stop on conflicts, secrets, ambiguous destinations, unresolved findings, or incohesive changes, follow the repository's staging/signing policy, push only the active branch with an explicit one-branch refspec, and forbid force, bypass, implicit multi-ref, and surprise tag publication.
- The publication recipe must not claim that every repository has a `repo push` command or prescribe `-S` universally. It translates the private command's durable safety model into a repository-neutral workflow.

### Native error contracts

Resolve the identified native `Error` paths as a complete, one-time contract cleanup without changing their observable runtime messages:

- Give each owning module one non-exported stable-message owner: a scalar resource-loader constant and an `as const` verifier message map with one descriptive key per family. Runtime errors must use the exact stable message and append current resource, file, route, link, or pattern diagnostics after `: ` where the existing behavior already does so.
- The resource-loading family has the stable message `Missing canonical resource`. The loader and both raw resource route handlers must document exactly `- Missing canonical resource`; the runtime message remains `Missing canonical resource: <resourceId>`.
- The build verifier owns these stable messages: `Missing structured data`, `Invalid structured data`, `Structured data is not an object`, `Structured data graph is invalid`, `Production build contains a test file`, `Missing required metadata`, `Missing or duplicate page description`, `Missing or duplicate page title`, `Canonical URL is missing from the sitemap`, `Structured data does not match the canonical page`, `Article structured data is incomplete`, `Breadcrumb hierarchy is incomplete`, `Broken internal link`, `The custom 404 page must remain excluded from search indexes.`, `llms.txt does not follow the required project index structure.`, and `Broken internal llms.txt link`. The relevant helper and `verifyBuild` `@throws` blocks must list the exact reachable stable messages, while incidental filesystem and programmer errors remain undocumented.
- The integration-test frontmatter helper must document exactly `- Canonical resource frontmatter is malformed.`
- Rename the current normalization test so its filename is derived from `utilities.ts`, then add focused loader and verifier failure-path tests that assert full runtime messages, including diagnostic suffixes.
- Keep native `Error`, preserve existing `cause` behavior for invalid JSON, require the invalid-JSON integration case to assert that its rejection retains the parsing `SyntaxError` as `cause`, and do not add an error registry, public error documentation, or a dependency for internal build and resource-loading failures.

## In scope

- Product specification and README synchronization for the revised manifesto, command set, cookbook, resource version, and publication boundary.
- Homepage copy and code-native visuals needed to communicate the expanded operating model.
- Public foundation content, version metadata, start-page summary, and contract tests.
- Challenge and review cookbook synchronization.
- One new publication recipe, its contract test, route discovery, sitemap/build assertions, and LLM index inclusion through the existing collection flow.
- Stable-message ownership, exact `@throws` synchronization, test-file naming correction, and focused failure-path coverage for the identified resource-loading and build-verification native-error paths.
- Unit, integration, end-to-end, formatting, type, lint, build, accessibility, responsive, theme, reduced-motion, and documentation verification required by the changed surfaces.

## Explicit exclusions

- Do not create, edit, rename, move, delete, or reformat `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, Copilot instruction files, or `.github/instructions/*.instructions.md`.
- Do not persist, summarize for persistence, or produce a coding-instructions handoff for the developer's operator-owned instructions. Their absence from the repository is intentional.
- Do not copy the developer's personal package catalogue, TypeScript naming rules, NestJS structure, PostgreSQL naming scheme, or required Git signing flags into the neutral public foundation.
- Do not add a universal public `repo push` command.
- Do not change the refinement prompt unless implementation evidence reveals a concrete contradiction; no such contradiction is currently present.
- Do not add React, client-side state, a backend, a database, dependencies, environment variables, migrations, deployment changes, analytics, or external services.
- Do not redesign navigation, typography, color tokens, theme mechanics, copy controls, content collection architecture, SEO architecture, or GitHub Pages deployment.
- Do not replace existing brand assets or generate new raster imagery. The established code-native diagrams are the appropriate visual language for this conceptual change.
- Do not refactor unrelated content, utilities, tests, or legacy wording merely for consistency.

## Proposed architecture and ownership

### Manifesto compression layer

Add `src/components/engineering-contract/engineering-contract.astro` as a focused, static presentation component owned by the homepage. It will use module-level `as const` data and semantic HTML to visualize six durable instruction layers:

1. command dispatch, task intent, and authority;
2. repository evidence and precedence;
3. ownership, reuse, and contracts;
4. coherent implementation and state synchronization;
5. adversarial evidence and developer acceptance;
6. separately authorized publication and external action.

The component will have no props, client script, animation, or new CSS file. It will use the existing Tailwind 4 utilities and semantic theme tokens directly in the Astro markup. The mobile layout will be a flat, edge-to-edge ordered sequence with compact insets; larger breakpoints may enhance it into a bordered grid. Meaning and ordering must not depend on color.

`src/pages/index.astro` will own the section heading, narrative position, and revised section numbering. Existing components continue owning their focused visuals:

- `hero-workbench` demonstrates the task contract and evidence relationship;
- `collaboration-workbench` owns the per-change lifecycle;
- `context-authority` owns inspect-versus-edit scope and the reliability sequence;
- `maturity-system` owns how project-specific rules become durable assets;
- `coding-modes-comparison` owns the comparison across development modes.

### Content ownership

- `project.md` remains the authoritative product contract.
- `src/content/resources/agents-foundation.md` remains the single public foundation source for rendered, copied, downloaded, and raw output.
- `src/content/cookbook/*.md` remains the canonical owner for reusable workflow prompts and explanations.
- `src/site.config.ts` remains the single owner of public resource versions and dates.
- Existing content loaders, raw endpoints, layouts, SEO utilities, and `llms.txt` generation require no architectural changes.

### Public contract impact

- `/AGENTS.md` and `/start/` will expose foundation version `3.1.0` with a compatible new command and strengthened review wording.
- `/cookbook/publish-an-authorized-change/` will be a new stable public route included in the sitemap and `llms.txt`.
- Existing routes, raw resource paths, content types, schemas, navigation URLs, and deployment behavior remain unchanged.
- The branch-review placeholder changes from `<branch-name>` to `<target-branch>` across current public content. This is terminology synchronization, not a behavioral incompatibility.

## File-level change map

### Product and state-bearing documentation

- `project.md`
  - bump the specification version to `3.1.0` and last-updated date to `2026-08-30`;
  - expand the core thesis and product principles with command-first dispatch, task contracts, repository truth, coherent state, adversarial challenge, and explicit publication authority;
  - revise the homepage specification and primary sequence to `Plan -> Challenge -> Breakdown when useful -> Execute -> Review`, followed by explicit Correct, Continue, or Complete outcomes;
  - define publication as a separate post-acceptance gate that requires both developer acceptance and explicit publication authority;
  - add the engineering-contract visual requirements;
  - add the neutral `challenge plan` foundation command and strengthen review requirements;
  - retain and explain the exclusion of a universal `repo push` command;
  - add the thirteenth publication recipe and update recipe counts, testing expectations, maintenance rules, definition of done, and final product promise.
- `README.md`
  - update the concise project description and cookbook coverage to mention plan challenge, coherent state synchronization, and governed publication;
  - keep the current blueprint, setup, deployment, `/docs` ownership, and public-versus-protected instruction distinction intact.

### Homepage manifesto

- `src/pages/index.astro`
  - insert the new engineering-contract section after the operating-model definition and before the per-change workflow;
  - revise the hero and section copy to state that the project translates durable coding instructions into a reliability system;
  - change the primary lifecycle wording to include challenge and evidence-driven correction or completion;
  - present publication next to, but outside, the lifecycle as a post-acceptance gate with independent authority;
  - renumber subsequent editorial sections without changing route structure;
  - preserve concise external prose and avoid em dashes or decorative Unicode symbols.
- `src/components/engineering-contract/engineering-contract.astro`
  - add the new static six-layer visual described above;
  - provide semantic headings or descriptions, ordered reading order, and accessible non-color-only distinctions;
  - implement responsive and light/dark behavior entirely through existing tokens and Tailwind utilities.
- `src/components/hero-workbench/hero-workbench.astro`
  - revise the plan item to include adversarial challenge and make the evidence item explicitly precede developer acceptance;
  - keep publication as a distinct external-action boundary rather than a lifecycle result.
- `src/components/collaboration-workbench/collaboration-workbench.astro`
  - expand the primary stage sequence to Plan, Challenge, Breakdown when useful, Execute, and Review;
  - make Review return to planning or correction when evidence fails, continue to another authorized slice when work remains, or complete when the developer accepts the evidence;
  - render publication as a visually separate, unnumbered post-acceptance gate that requires explicit authority and is not connected as an automatic next stage;
  - adapt the static responsive grid without adding JavaScript or animation.
- `src/components/context-authority/context-authority.astro`
  - synchronize its reliability-stage list with task contract, challenge, coherent execution, developer decision, correction, continuation, and completion;
  - show authorized publication separately from the reliability-stage list.
- `src/components/coding-modes-comparison/coding-modes-comparison.astro`
  - add publication/external action as a comparison dimension so the difference between controlled agentic publication and implicit delegation is visible.
- `src/components/resource-actions/resource-actions.astro`
  - update the cookbook description to include challenge, evidence, correction, and governed publication.

### Public foundation

- `src/content/resources/agents-foundation.md`
  - revise task-intent and command-dispatch guidance so a clearly invoked command is selected before ordinary request classification, and ordinary intent is classified only when no command applies;
  - add the neutral `challenge plan [<plan-path-or-identifier>]` command with exact target, SHA-256 identity, staleness, fixed report sections, word limit, deterministic recommendation, and no-write/no-approval boundaries;
  - strengthen review state identity, focused test adequacy, broader regression, and incomplete-verdict language;
  - rename `<branch-name>` to `<target-branch>` consistently;
  - reinforce that publication is a distinct external authority governed by repository policy while retaining the deliberate omission of `repo push`.
- `src/content/resources/agents-foundation.test-unit.ts`
  - add focused assertions for command-before-intent dispatch, challenge target selection, hash/staleness, fixed sections and recommendations, no-write authority, strengthened review evidence, `<target-branch>`, and the absence of a public `repo push` command;
  - preserve the existing plan, breakdown, evidence, and acceptance assertions.
- `src/site.config.ts`
  - set the foundation version to `3.1.0` and `updatedAt` to `2026-08-30`;
  - leave refinement-prompt metadata unchanged;
  - update the default site description only if needed to mention challenge and governed publication without making metadata verbose.
- `src/pages/start.astro`
  - update the introductory summary to mention challenge, coherent state synchronization, and explicit external-action boundaries while preserving the foundation's neutral exclusions.

### Cookbook

- `src/content/cookbook/challenge-a-plan.md`
  - update the prompt and explanatory sections to match the new neutral command contract;
  - require exact target identity and hash, material findings only, fixed result sections, deterministic recommendation, and staleness after revision;
  - set `updatedAt` to `2026-08-30`.
- `src/content/cookbook/challenge-a-plan.test-unit.ts`
  - add a co-located unit contract test for those command properties.
- `src/content/cookbook/review-a-change.md`
  - synchronize `<target-branch>` terminology, exact state fingerprint language, target freshness and prospective merge behavior, focused test adequacy, broader regression checks, and readiness limitations;
  - add the publication recipe as a reciprocal related recipe;
  - set `updatedAt` to `2026-08-30`.
- `src/content/cookbook/review-a-change.test-unit.ts`
  - update terminology assertions and add focused assertions for immutable state, test-adequacy versus regression evidence, and the publication boundary.
- `src/content/cookbook/publish-an-authorized-change.md`
  - add the thirteenth recipe with `order: 13`, `category: execution`, `publishedAt` and `updatedAt` set to `2026-08-30`, and reciprocal relations to review and execution recipes;
  - include all established recipe sections and a working prompt that itself grants publication authority while enforcing destination, state, history, security, signing-policy, and explicit-refspec safeguards.
- `src/content/cookbook/publish-an-authorized-change.test-unit.ts`
  - assert the separate authority boundary, exact destination, full state/history inspection, secret detection, cohesive commit requirement, repository-specific signing policy, explicit one-branch push, and prohibition on force or bypass.
- `src/content/cookbook/execute-one-milestone.md`
  - add the publication recipe as a reciprocal related recipe without changing its execution authorization contract.
- `src/pages/cookbook/index.astro`
  - update the execution-track description and, if needed for discoverability, the starting-point choices so an accepted change can route to governed publication without making the index visually unbalanced at 320px.

### Verification and error-contract synchronization

- `scripts/verify-build.test-integration.ts`
  - add `publish-an-authorized-change` to both expected recipe lists;
  - add the exact `- Canonical resource frontmatter is malformed.` contract to `extractMarkdownBody` because that documented helper intentionally throws on malformed canonical frontmatter;
  - add focused table-driven verifier failure cases for all sixteen intentional error families by copying the successful `dist` fixture into a separately created case directory, applying one minimal mutation, and asserting the exact full rejection including its diagnostic suffix where applicable;
  - make the invalid structured-data case additionally assert that the rejection's `cause` is the original JSON parsing `SyntaxError`;
  - cover missing, invalid, non-object, and invalid-graph structured data; an emitted test file; required metadata; duplicate page description and title; a canonical URL missing from the sitemap; structured data that disagrees with its page; incomplete article and breadcrumb data; a broken internal page link; an indexable custom 404; invalid `llms.txt` structure; and a broken internal `llms.txt` link;
  - create one validated disposable root with `mkdtemp`, copy fixtures with the Node filesystem API, mutate only files under that root, and remove only that root in `finally` so the successful `dist` artifact and user files remain untouched;
  - keep the existing successful full-artifact verification test.
- `src/layouts/base-layout.test-e2e.ts`
  - add the publication route to `REQUIRED_ROUTES`;
  - extend the homepage operating-model test with the engineering-contract heading, Challenge stage, coherent-state message, and conditional publication message;
  - add or extend 320px assertions for the new section and expanded workflow;
  - include the new route in automated accessibility coverage when it provides distinct content risk, while retaining representative dark-theme coverage rather than multiplying identical route checks mechanically.
- `src/utilities/resource-text/resource-text.ts`
  - own a non-exported `MISSING_CANONICAL_RESOURCE_MESSAGE` constant with the exact value `Missing canonical resource`;
  - build the current runtime error from that constant and the resource identifier so the full message remains unchanged;
  - replace the trigger-style `@throws` entry with exactly `- Missing canonical resource`.
- `src/utilities/resource-text/resource-text.test-unit.ts` -> `src/utilities/resource-text/utilities.test-unit.ts`
  - rename the existing file because it tests `normalizeResourceText` from `utilities.ts`, preserving its current assertions unchanged.
- `src/utilities/resource-text/resource-text.test-unit.ts`
  - add a new co-located loader test that mocks only Astro's `getEntry` content boundary;
  - assert successful entry loading and normalized text through the real `normalizeResourceText` path;
  - assert the exact full `Missing canonical resource: <resourceId>` rejection when the canonical entry is absent.
- `src/pages/AGENTS.md.ts` and `src/pages/refine.txt.ts`
  - document exactly `- Missing canonical resource` on both exported route handlers because they intentionally propagate the loader contract.
- `scripts/verify-build.ts`
  - own a non-exported `VERIFY_BUILD_ERROR_MESSAGES` `as const` map with descriptive keys for all sixteen intentional verifier error families listed in the desired error-contract behavior;
  - construct every intentional runtime error from its stable-message constant while retaining each current full message, diagnostic suffix, punctuation, and invalid-JSON `cause`;
  - document exact reachable stable messages on `parseStructuredData`, `extractStructuredDataEntities`, and `verifyBuild`, with no trigger-style substitutions;
  - do not document incidental filesystem or programmer errors and do not export an internal error surface.

## Ordered implementation strategy

1. **Update the authoritative product contract first.** Revise `project.md` to define the manifesto compression model, command-before-intent dispatch, the primary `Plan -> Challenge -> Breakdown when useful -> Execute -> Review` sequence and its Correct, Continue, or Complete outcomes, the separate post-acceptance publication gate, public challenge command, governed publication recipe, neutral-foundation boundary, version, acceptance criteria, and verification obligations. Review the result against the developer's current instructions before changing public copy so later implementation has one authoritative target.

2. **Strengthen the neutral foundation and its direct presentation.** Update `agents-foundation.md`, its contract tests, resource metadata, and the `/start/` summary as one public-contract change. Confirm that command dispatch precedes ordinary intent classification, challenge and review are operationally precise, and repository-specific technology and signing policies remain excluded. Confirm that rendered, copied, downloaded, and raw output continue to share the same source.

3. **Synchronize the practical workflows.** Update the challenge and review recipes, add the publication recipe and focused contract tests, update reciprocal relationships and cookbook discovery copy, then extend build-artifact expectations. Confirm that no workflow silently treats review readiness as developer acceptance or treats implementation authority as publication authority.

4. **Expand the homepage manifesto.** Add the engineering-contract component, integrate it into the editorial sequence, and update the existing lifecycle, context, comparison, hero, and resource components. Keep the primary lifecycle visually and semantically distinct from the post-acceptance publication gate. Keep the page static, code-native, responsive, accessible, theme-aware, and visually consistent with the existing technical editorial system. Inspect every new external sentence for natural voice, prohibited em dashes, decorative symbols, and unnecessary repetition.

5. **Complete the native-error contract cleanup.** Centralize the sixteen verifier stable messages and the resource-loader stable message in their owning modules, preserve every current full runtime message and diagnostic suffix, synchronize exact `@throws` entries through each documented boundary, correct the normalization test filename, and add focused loader coverage plus table-driven verifier coverage for every intentional error family. Require the invalid-JSON case to protect the original parsing `SyntaxError` cause. Review the resulting implementation and tests together to confirm that there is one message owner per family, no public error registry, no dependency change, no stale trigger-style entry, and no undocumented or untested intentional native-error contract in the affected path.

6. **Update focused and regression evidence.** Extend unit contract tests, route/build integration assertions, and homepage/browser coverage. Run targeted checks after each content boundary, then run the complete existing verification pipeline. Triage any copy expectation failures against the revised `project.md` contract rather than mechanically restoring old wording.

7. **Perform the final state and documentation audit.** Compare the final diff against this plan, confirm every new public workflow is represented consistently in `project.md`, README, homepage, foundation, cookbook, resource metadata, sitemap assertions, and tests, and confirm no protected instruction file, instruction-persistence artifact, handoff prompt, or unrelated content changed. Audit the intentional native-error paths in both directions so every documented stable message is reachable and every reachable intentional contract is documented.

## Testing strategy

### Focused unit coverage

- Foundation contract tests must fail if command dispatch no longer precedes ordinary task-intent classification or if `challenge plan` loses exact target selection, plan hashing, staleness, required report sections, deterministic recommendation, or no-write boundaries.
- Challenge recipe tests must fail if its working prompt drifts from the public command contract.
- Review recipe tests must fail if immutable scope, target freshness, focused test adequacy, broader regression evidence, or developer acceptance boundaries disappear.
- Publication recipe tests must fail if publication ceases to require separate authority, exact destination, complete state/history inspection, security checks, a cohesive commit, repository signing policy, explicit one-branch publication, or safe stopping conditions.
- Resource-loader tests must fail if the loader stops normalizing the canonical text, fails to return the loaded entry, or changes the exact `Missing canonical resource: <resourceId>` failure contract.
- Do not add tests for static copy that has no durable behavioral or workflow contract.

### Integration coverage

- The artifact test must prove the new recipe is built, present in the sitemap, and included in the generated `llms.txt` through the existing collection flow.
- The verifier integration tests must prove that each of the sixteen intentional error families rejects a minimally corrupted artifact with its exact full message while using disposable copies so the successful `dist` artifact and user files remain untouched; the invalid structured-data case must also prove that the original parsing `SyntaxError` remains available as `cause`.
- Existing foundation/raw and refinement/raw fidelity tests must continue proving one canonical source for rendered and raw resources.
- Production-build exclusion must continue proving that no unit, integration, end-to-end, or benchmark test file appears in `dist`.

### End-to-end and manual UI coverage

- The homepage must expose the revised manifesto and primary lifecycle in static HTML, with publication represented as a separate post-acceptance gate rather than an automatic lifecycle stage.
- The new publication route must load directly with canonical metadata and breadcrumb structured data.
- The new engineering-contract visual, primary lifecycle, and separate publication gate must not overflow at 320px, and the page must remain usable at 768px and 1440px.
- Automated accessibility checks must remain clean in representative light and dark routes.
- Keyboard focus, semantic reading order, visible focus, and non-color-only meaning must be inspected for the new visual.
- No new motion is planned. Existing reduced-motion tests must remain green, and the new content must remain complete without animation or JavaScript.
- Review light and dark contrast, hierarchy, typography, spacing, density, and mobile flattening against the existing design system.

## Verification commands

Run the smallest relevant checks first, then the established full boundary:

```bash
npm run test:unit -- src/content/resources/agents-foundation.test-unit.ts src/content/cookbook/challenge-a-plan.test-unit.ts src/content/cookbook/review-a-change.test-unit.ts src/content/cookbook/publish-an-authorized-change.test-unit.ts src/utilities/resource-text/resource-text.test-unit.ts src/utilities/resource-text/utilities.test-unit.ts
npm run test:unit
npm run build
npm run test:integration:artifact
npx playwright test src/layouts/base-layout.test-e2e.ts
npm run check
git diff --check
git status --short
```

Before `npm run check`, format exactly the planned touched files with the locally installed Prettier:

```bash
npx prettier --write --config .prettierrc \
  project.md \
  README.md \
  scripts/verify-build.ts \
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
  src/pages/AGENTS.md.ts \
  src/pages/cookbook/index.astro \
  src/pages/index.astro \
  src/pages/refine.txt.ts \
  src/pages/start.astro \
  src/site.config.ts \
  src/utilities/resource-text/resource-text.ts \
  src/utilities/resource-text/resource-text.test-unit.ts \
  src/utilities/resource-text/utilities.test-unit.ts
```

Do not use the repository-wide write-format command because a protected instruction file may exist in another development environment.

## Security, compatibility, deployment, and rollback

- This changes static content and presentation plus internal resource/build validation contracts. It introduces no user input, secrets, authentication, authorization, persistence, database, queue, webhook, cache, billing, or external-provider behavior.
- The publication recipe is security-sensitive prose. It must never contain example credentials, private URLs, implicit destinations, force-push guidance, hook bypasses, or instructions that publish tags or multiple refs accidentally.
- Existing URLs remain compatible. The new recipe adds one route without removing or renaming any current route.
- Foundation `3.1.0` is backward-compatible: existing commands remain, `challenge plan` is additive, and `<target-branch>` only clarifies an argument placeholder. No compatibility copy or deprecated parallel resource is needed.
- Deployment remains the existing GitHub Pages workflow. Implementation and verification must not deploy or push.
- Rollback is source-level and reversible: revert the new recipe, foundation version/content, manifesto component/copy, tests, and documentation together. Do not leave metadata at `3.1.0` if the new foundation command is rolled back.

## Risks and mitigations

- **Risk: the homepage becomes an instruction manual instead of a manifesto.** Keep detailed mechanics in the foundation and cookbook; limit the homepage to the six durable engineering layers, one primary lifecycle, and one concise publication gate.
- **Risk: private technical preferences leak into the universal template.** Review every foundation addition against the language-, framework-, vendor-, and repository-neutral contract in `project.md`.
- **Risk: `repo push` appears universally safe.** Keep it out of the foundation and make the publication recipe explicitly subordinate to repository-specific staging, signing, and destination policy.
- **Risk: publication is mistaken for an automatic lifecycle stage.** Make the primary loop terminate in correction, continuation, or completion, then present publication as a separately labeled post-acceptance gate in the specification, homepage, foundation boundary, cookbook, and tests.
- **Risk: similar command-dispatch or lifecycle wording drifts across surfaces.** Treat `project.md` as authoritative, update foundation and cookbook next, then derive homepage copy and tests from the settled command-first model and explicit Correct, Continue, or Complete review outcomes.
- **Risk: content assertions become brittle snapshots.** Assert durable command and workflow clauses, not entire paragraphs or incidental formatting.
- **Risk: the expanded lifecycle creates mobile density or horizontal overflow.** Use a mobile-first vertical or two-column composition and preserve the existing 320px E2E checks.
- **Risk: centralizing error messages accidentally changes observable diagnostics.** Assert the full loader message and every full verifier-family message, preserve punctuation and diagnostic suffixes exactly, and keep invalid JSON's original `cause` behavior.
- **Risk: verifier failure testing mutates the canonical build artifact or deletes an unsafe path.** Copy `dist` into a newly created disposable directory, validate that exact directory value before use, add only the synthetic test file there, and remove only that directory in `finally`.

## Assumptions and developer decisions resolved

- The developer's statement that the project should communicate the current coding instructions authorizes revising the manifesto and public resources, but not copying every private implementation rule literally.
- `challenge plan` is durable and neutral enough for the public foundation.
- Safe publication is part of the manifesto and cookbook as a separate post-acceptance gate, while the exact `repo push` command remains repository-specific.
- The public foundation receives a minor version bump to `3.1.0`; the refinement prompt remains unchanged at `1.1.0`.
- The new publication recipe is the thirteenth recipe and uses the existing `execution` category rather than introducing a new content category.
- The developer's coding instructions are operator-owned context. Repository-local persistence and a completion-time handoff prompt are explicitly out of scope.

## Approval required

Approval authorizes a future implementation to revise the product specification, README, homepage manifesto, neutral foundation, challenge and review workflows around command-before-intent dispatch and explicit Correct, Continue, or Complete review outcomes; add the `Publish an authorized change` recipe as a separate post-acceptance gate; update the associated versions and tests; and complete the identified native-error stable-message ownership, exact `@throws`, test-filename, full-message, and invalid-JSON `cause` coverage cleanup exactly as described. It does not authorize persisting or handing off the developer's coding instructions, editing protected coding-instruction files, implementing a universal public `repo push` command, adding dependencies or infrastructure, committing, pushing, deploying, or beginning any work before explicit approval.
