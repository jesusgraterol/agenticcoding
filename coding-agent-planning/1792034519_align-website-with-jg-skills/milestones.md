# Milestones: Align the Agentic Coding website with jg-skills and the new coding instructions

Source plan: `coding-agent-planning/1792034519_align-website-with-jg-skills/plan.md` (SHA-256 `53dc191bd300d226506869d21bd48b272d4702ee83c5d7dc0419836cf1281c93`).

The plan's seven steps become five milestones:

- Milestone 1 is plan step 1.
- Milestone 2 is plan step 2.
- Milestone 3 combines plan steps 3 and 4, because the shared components have no consumer or verification until the workflow page uses them.
- Milestone 4 is plan step 5.
- Milestone 5 is plan step 6 plus the closing verification of step 7.

The `README.md` updates from step 7 move into the milestones whose behavior they describe. Every `src/layouts/base-layout.test-e2e.ts` assertion change sits in the milestone that changes the asserted behavior, so each milestone from 2 onward ends with `npm run check` passing.

The site is only consistent end to end after Milestone 5. Earlier milestones leave older homepage copy in place, so avoid deploying `main` between milestones.

## Milestone 1: Revise the product contract

**Objective:** `project.md` 4.0.0 specifies the final product, so every later milestone implements a written contract instead of contradicting it.

**Dependencies:** none.

**Scope:** `project.md`.

**Implementation work:**

- Set version 4.0.0 and the current date.
- §2: the offerings are the method (foundation, refinement prompt, workflow walkthrough, cookbook) plus jg-skills as the companion collection.
- §3, §4, §5.3: publication is an explicit grant, per change or per run.
- §6.1: skill dispatch before ordinary intent.
- §6.6: the sequence has an optional brainstorm, and publication runs through `jg-push` or an autonomous run.
- §6.8: explicit publication; the site still does not advocate unrestricted autonomy.
- §6.10: autonomous runs as the top delegation level, with their limits.
- §7.3: the method stays vendor-neutral; jg-skills is named as the companion, with explicit-only invocation verified with Claude Code and Codex.
- §8 goals.
- §11: add `/workflow/` and the seven redirect URLs.
- §12: Start, Workflow, Refine, Cookbook, external Skills link, Source, theme control.
- §13: the hero transcript absorbs §13.6; §13.7 becomes the skill pipeline with the supervised/autonomous toggle; §13.14 has four destinations.
- §14.3 and §14.4: skill dispatch, planning records, root-cause pattern search, failing-test-first bug fixes, publication authority; workflows come from skills, and task-scoped review and push stay with them.
- §14.5: the `/start/` pairing block and the 4.0.0 note.
- §15.4: refinement values.
- §16: six recipes and the example-led content model.
- A new Workflow page section.
- §17.2: install command copy.
- §23: redirect pages excluded from the sitemap.
- §26: tests, including redirect and anchor verification.
- §30 (maintenance rules), §31 (definition of done), §32 (promise).

**Verification:** review the full diff. No build input changes, and `project.md` is excluded from Prettier by `.prettierignore`, so no automated check applies.

**Acceptance criteria:**

- No section still requires command dispatch, a foundation command section, thirteen recipes, or publication as a separate post-acceptance gate.
- The spec states the two-site split, explicit per-change or per-run publication with its limits, the explicit-only verification limit, `/workflow/`, the redirect and anchor contract, and the six-recipe cookbook.
- Nothing outside `project.md` changes.

**Review checkpoint:** read §6.8, §7.3, §13, §14, §16, and §30 to confirm that the autonomy stance and the vendor-neutrality wording say exactly what you intend before the site is built against them.

## Milestone 2: Publish foundation 4.0.0 and refinement prompt 2.0.0

**Objective:** the downloadable `/AGENTS.md` and `/refine.txt` reflect the skill-based operating model, with matching versions and pages.

**Dependencies:** Milestone 1.

**Scope:**

- `src/content/resources/agents-foundation.md`, `agents-foundation.test-unit.ts`
- `src/content/resources/refinement-prompt.md`, `refinement-prompt.test-unit.ts`
- `src/site.config.ts` (`RESOURCE_CONFIG`: foundation 4.0.0, refinement prompt 2.0.0, update dates)
- `src/pages/start.astro` (intro copy only)
- `src/pages/refine.astro` (no change expected; its intro does not mention commands)
- `README.md` (intro wording that describes a command-first model or publication as a separate decision)
- `src/layouts/base-layout.test-e2e.ts` (start and refine page assertions)

**Implementation work:**

- Foundation:
  - Replace command dispatch with skill dispatch.
  - Point the file-modification exception at planning artifacts written by an invoked planning or execution skill.
  - Add the planning-records rule, root-cause pattern search, and failing-test-first bug fixes with independent expected values.
  - State that task-scoped review and push stay with the skills.
  - Remove `review` command references from Coherent execution and Review.
  - Delete `## Agent commands`.
  - Rewrite `## Publication authority` for explicit grants per request or per invoked skill.
  - Keep the file tool-neutral, with no mention of jg-skills.
- Refinement prompt:
  - Add skill-aware inspection to Stage 1.
  - Use skill or command invocation wording in Stage 6 and value 19.
  - Change value 2 to per-action or per-run authority.
  - Add values for planning records, failing-test-first fixes, and root-cause pattern search.
- Update `/start/` intro copy to describe 4.0.0 without commands or separate-publication wording.
- Rewrite the foundation and refinement unit tests to the new contracts.
- In the start-page end-to-end test, replace `Version 3.1.0`, the date, and the `challenge plan [<plan-path-or-identifier>]` assertion with 4.0.0, the new update date, and skill-dispatch text. Add a refine-page assertion for version 2.0.0.

**Verification:** `npm run test:unit`, then `npm run check`.

**Acceptance criteria:**

- Both raw resources match their rendered and copied sources (existing synchronization tests pass).
- The foundation has no command definitions, no `challenge plan` or `repo push`, and no jg-skills name.
- The foundation keeps agent-operated evidence and Correct/Continue/Complete.
- `/start/` shows 4.0.0 and `/refine/` shows 2.0.0.
- `npm run check` passes.

**Review checkpoint:** read the rendered `/AGENTS.md` once as a new adopter would. Confirm it stands alone without skills, and that the publication rule allows an autonomous run only when one is explicitly invoked.

## Milestone 3: Ship the workflow page and move the workflow recipes

**Objective:** `/workflow/` presents the nine skill steps visually. The seven workflow recipes are replaced by native redirects to their steps, and navigation, `llms.txt`, `/start/`, and build verification reflect the new structure.

**Dependencies:** Milestone 2.

**Scope:**

- Content contracts:
  - `src/content/types.ts` (`TranscriptMessageSchema`, `ArtifactSchema`, `ITranscriptMessage`, `IArtifact`)
  - `src/content/index.ts`
  - `src/content/types.test-unit.ts` (only if a custom refinement is added)
- New components:
  - `src/components/artifact-panel/artifact-panel.astro`
  - `src/components/session-transcript/session-transcript.astro`
  - `src/components/install-command/install-command.astro`
- Configuration: `src/site.config.ts` (`skills` with name, URL, install command, and explicit-only verification note; `WORKFLOW_STEPS`; workflow page dates; `MOVED_COOKBOOK_RECIPES`; Workflow navigation item) and `astro.config.ts` (`redirects`).
- Workflow page: `src/pages/workflow.astro`, plus `src/components/workflow-guide/workflow-guide.astro`, `constants.ts`, and `workflow-guide.test-e2e.ts`.
- Start page: `src/pages/start.astro` (pairing block and "What changed in 4.0.0" note).
- Removals: the seven moved recipes under `src/content/cookbook/` (plan-a-feature, challenge-a-plan, break-down-a-plan, execute-one-milestone, investigate-a-failing-test, review-a-change, publish-an-authorized-change) and the tests owned by five of them (plan-a-feature, challenge-a-plan, break-down-a-plan, review-a-change, publish-an-authorized-change).
- Remaining cookbook: `src/pages/cookbook/index.astro` (starting points only) and `relatedSlugs` in the six remaining recipes.
- Discovery: `src/utilities/llms-text/llms-text.ts`, `llms-text.test-unit.ts`.
- Navigation: `src/components/site-navigation/site-navigation.astro`, `src/components/site-footer/site-footer.astro`.
- Build verification: `scripts/verify-build.ts`, `scripts/verify-build.test-integration.ts`.
- `src/layouts/base-layout.test-e2e.ts` (routes, accessibility routes, cookbook flow, copy controls, `llms.txt`, navigation, redirects, overflow).
- `README.md` (intro resource list, Content and public routes, Verification).

**Implementation work:**

1. **Redirect check first.** Remove `plan-a-feature.md` and its test, add its redirect to `/workflow/#jg-plan`, and run `npx astro build` directly. `npm run build` would also run the build verifier, which only accepts redirect pages after item 8. Confirm that `dist/cookbook/plan-a-feature/index.html` keeps `#jg-plan` in its refresh URL and that the sitemap does not list it. If either fails, stop and report instead of switching mechanisms.
2. **Schemas and components.** Add the transcript and artifact schemas and the three components, with semantic markup, visible speakers and status text, `+`/`-` markers with screen-reader labels, internal scrolling, light and dark tokens, and 320px layouts.
3. **Configuration.** Add `skills`, `WORKFLOW_STEPS` ("may change" text taken from the jg-skills README), workflow page dates, and `MOVED_COOKBOOK_RECIPES`. Generate `redirects` from it in `astro.config.ts`.
4. **Workflow page.** Build `/workflow/`:
   - install block with copy, verification note, invocation syntax line, and a link to `/start/`;
   - one H2 per stage and one H3 per step with the skill-name anchor;
   - per-step transcripts and artifacts that continue the API keys story;
   - the supervised/autonomous toggle on `jg-execute`, with the autonomous cycle and stop conditions;
   - the `jg-debug` failing-test, diff, and passing-test example;
   - the Correct/Continue/Complete outcomes on `jg-review`;
   - a "More skills" section with `jg-feedback`, `jg-session`, and a link to the cookbook.
5. **Start page.** Add the `/start/` pairing block using `InstallCommand` and the 4.0.0 note mapping each removed command to its skill.
6. **Removals.** Remove the remaining six moved recipes and their four tests. Repoint the cookbook starting points ("I need a plan" to `/workflow/#jg-plan`, and the challenge starting point replaced by "Something is broken" to `/workflow/#jg-debug`), and prune `relatedSlugs` so no internal link targets a redirect.
7. **Discovery and navigation.**
   - Complete all seven redirects.
   - Add the workflow and jg-skills `llms.txt` links to `buildLlmsText` and update its intro sentence.
   - Add Workflow and the external Skills link to desktop and mobile navigation, and keep the footer's derived links correct.
8. **Build verification.**
   - Require `workflow/index.html`.
   - Exclude the configured redirect pages from full-page checks, and verify each one: zero-delay refresh to its exact target, `noindex`, existing target artifact, absent from the sitemap.
   - Replace the `/#` skip with a check that every internal fragment link and redirect target matches an `id` in its target artifact.
   - Add stable messages, including `Broken internal anchor`, to `VERIFY_BUILD_ERROR_MESSAGES` and the `verifyBuild` `@throws` block.
9. **Integration tests.**
   - Reduce the expected recipe lists to six.
   - Add failure fixtures for a redirect page without `noindex`, a wrong refresh target, a missing target artifact, a redirect page in the sitemap, and a missing anchor on a redirect target and on an internal link.
10. **End-to-end tests.**
    - Accessibility routes (light and dark): `/`, `/workflow/`, `/start/`, `/refine/`, `/cookbook/`, `/cookbook/control-scope/`.
    - `REQUIRED_ROUTES`: drop the seven recipes and add `/workflow/`.
    - Cookbook flow: "I need a plan" lands on `/workflow/#jg-plan`, and the recipe-heading assertions move to `/cookbook/recover-from-agent-drift/`.
    - 320px overflow covers `/cookbook/control-scope/`, `/workflow/`, and `/start/`.
    - `llms.txt` assertions cover the workflow link and a surviving recipe.
    - The copy-control test uses `control-scope-prompt` and the `/workflow/` install command.
    - The top-navigation test expects Start, Workflow, Refine, Cookbook, a Workflow route case, and the external Skills link.
    - The mobile-navigation test uses `/cookbook/control-scope/`.
    - New test: each old URL ends at its anchor with the step heading in the viewport, and the redirect document is `noindex`.
    - New `workflow-guide.test-e2e.ts`: nine anchors, exact jg-skills URLs, the install copy writing the exact command, the verification note, and execute-toggle keyboard switching with both modes in the DOM.
11. **README.** Update the intro resource list and Content and public routes (workflow page, `WORKFLOW_STEPS` kept in sync with the jg-skills README, `MOVED_COOKBOOK_RECIPES` and redirects, the `llms.txt` paragraph), and add redirect and anchor checks to Verification.

**Verification:** `npm run test:unit`, `npm run build`, `npm run test:integration:artifact`, `npm run test:e2e:artifact`, then `npm run check`.

**Acceptance criteria:**

- `/workflow/` renders all nine steps with transcripts, artifacts, and jg-skills links.
- Every install recommendation carries the explicit-only verification note.
- Each removed recipe URL lands on its step heading.
- Redirect pages are `noindex` and absent from the sitemap and `llms.txt`.
- The build verifier rejects missing anchors.
- The navigation shows Workflow and Skills.
- `/start/` shows the pairing block and the 4.0.0 note.
- `npm run check` passes.

**Review checkpoint:**

- Visual review: capture screenshots of `/workflow/` and `/start/` in light and dark at 320px and 1440px, and review typography, spacing, transcript density, artifact legibility, toggle clarity, and token consistency. Recipe and homepage work only continues after your feedback. Delete the screenshots and stop the preview server afterwards.
- Also confirm that the step examples describe each skill accurately against the jg-skills README.

## Milestone 4: Rewrite the cookbook as example-led techniques

**Objective:** the six remaining recipes lead with a situation and an example transcript, then the prompt and three short sections, each readable in about two minutes.

**Dependencies:** Milestone 3 (components, schemas, repointed starting points, and visual review feedback).

**Scope:**

- `src/content/types.ts` (`CookbookEntrySchema` gains `situation` and `example`)
- `src/content/types.test-unit.ts` (only if a custom refinement is added)
- `src/pages/cookbook/[slug].astro` (situation, example transcript, prompt, then body)
- `src/pages/cookbook/index.astro` (framing and description as techniques no skill covers)
- the six recipes: `orient-to-a-codebase.md`, `control-scope.md`, `synchronize-documentation.md`, `recover-from-agent-drift.md`, `deepen-a-test-strategy.md`, `refine-coding-instructions.md`
- `src/content/cookbook/deepen-a-test-strategy.test-unit.ts` (only if its asserted phrases change)
- `src/layouts/base-layout.test-e2e.ts` (recipe page headings)
- `README.md` (how to add a recipe: new fields and sections)

**Implementation work:**

- Extend the schema.
- Render the situation lead and the `SessionTranscript` example above the working prompt.
- Rewrite each recipe:
  - one-to-three-sentence `situation`;
  - an `example` of at most a few messages;
  - the same copyable prompt intent, tightened;
  - body sections `## What good looks like`, `## If the result drifts`, `## Warning signs`, folding in the former Common mistake, Agentic approach, Before you send the prompt, and Developer review responsibility content.
- Renumber `order` 1-6, keep slugs and categories, and keep `relatedSlugs` among survivors.
- Update the cookbook index framing.
- Apply relevant visual review feedback.
- Replace the end-to-end `Worked example` and `Useful follow-ups` heading assertions with the new headings, and assert that the situation and example transcript render.

**Verification:** `npm run test:unit`, `npm run build`, `npm run test:integration:artifact`, `npm run test:e2e:artifact`, then `npm run check`.

**Acceptance criteria:**

- All six recipes render their situation, example transcript, working prompt with copy, and the three sections.
- Each recipe's body is at most about 440 words (reading time two minutes or less).
- Slugs and URLs are unchanged.
- All four tracks remain populated.
- `npm run check` passes.

**Review checkpoint:** compare one rewritten recipe with its previous version and confirm that nothing essential was lost in the compression, especially the warning signs and the developer's responsibility.

## Milestone 5: Refactor the homepage and close verification

**Objective:** the homepage tells the thesis through the hero session and skill pipeline, with explicit per-change or per-run publication throughout, and the whole site passes final verification.

**Dependencies:** Milestone 3 (workflow anchors). Sequenced after Milestone 4 to apply consistent visual feedback.

**Scope:**

- `src/pages/index.astro`
- New: `src/components/hero-session/hero-session.astro`, `src/components/skill-pipeline/skill-pipeline.astro`, `skill-pipeline.test-e2e.ts`
- Removed: `src/components/hero-workbench/` (including `hero-workbench.astro.test-e2e.ts`) and `src/components/collaboration-workbench/`
- Copy updates:
  - `src/components/coding-modes-comparison/coding-modes-comparison.astro`
  - `src/components/engineering-contract/engineering-contract.astro`
  - `src/components/maturity-system/maturity-system.astro`
  - `src/components/context-authority/context-authority.astro` (only where it names commands)
  - `src/components/resource-actions/resource-actions.astro`
- `src/layouts/base-layout.test-e2e.ts` (homepage, engineering contract, comparison, homepage overflow assertions)

**Implementation work:**

- Hero: keep the H1, rewrite the lede as the thesis, set CTAs to `/start/` and `/workflow/`, and add the transcript of at most eight messages (brainstorm redirect, plan excerpt, execute, review "Ready to commit", signed push).
- Section 01: update the Implementation, Review, and Publication rows and trim the definition block.
- Section 02: change layer 1 to skill dispatch and layer 6 to explicit publication; give every layer one accurate example line consistent with the jg-skills README, and remove explanatory prose.
- Section 03: the skill pipeline with stage chips linking to `/workflow/#<skill>`, text-marked optional skills, the supervised/autonomous toggle showing who runs review and push, Correct/Continue/Complete, the publication note, and a link to `/workflow/`.
- Section 04: Delegate from supervised milestones to autonomous runs, with the autonomy limits list.
- Sections 05-07: update copy that names commands or separate publication.
- Section 08: four destinations.
- Apply relevant visual review feedback.
- Rewrite the homepage end-to-end assertions for the new headings, transcript content, pipeline anchor links, outcomes, publication note, and contract layers, and keep the comparison and overflow tests.
- New `skill-pipeline.test-e2e.ts`: both modes in the DOM, keyboard switching, and who runs review and push per mode.
- Close verification: run the full pipeline and the plan's manual checks across `/`, `/workflow/`, `/start/`, `/refine/`, `/cookbook/`, a recipe, and a redirect with JavaScript disabled. Confirm that `README.md` matches the final state.

**Verification:** `npm run test:unit`, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run test:integration:artifact`, `npm run test:e2e:artifact`, then `npm run check`, plus manual checks at 320, 375, 768, 1024, and 1440px in light and dark, with keyboard and focus, reduced motion, and long artifact lines.

**Acceptance criteria:**

- No page states that acceptance and publication are separate decisions or names the removed commands.
- The homepage shows the hero session, the skill pipeline with a working toggle, the updated contract, maturity, and resource sections.
- `hero-workbench` and `collaboration-workbench` are gone with no remaining imports.
- Accessibility scans pass in both themes.
- No page overflows at 320px.
- `npm run check` passes.

**Review checkpoint:**

- Final visual pass across the whole site.
- Confirm the homepage's autonomy framing matches `project.md` §6.8 and §6.10.
- Decide whether the result is ready to publish.

## Approval required

The complete sequence is five milestones:

1. Revise `project.md` to 4.0.0.
2. Publish foundation 4.0.0 and refinement prompt 2.0.0, with the start and refine page updates.
3. Ship `/workflow/` with the shared components, the `/start/` pairing and 4.0.0 note, native redirects for the seven moved recipes, navigation, `llms.txt`, and anchor-checked build verification, ending with a visual review.
4. Rewrite the six remaining recipes as example-led techniques.
5. Refactor the homepage and close verification.

The plan has not been approved yet. Approving this sequence approves the plan and the sequence, but does not authorize any milestone. Each milestone needs its own explicit authorization, for example "Approve and implement Milestone 1", and implementation stops at that milestone's review checkpoint.
