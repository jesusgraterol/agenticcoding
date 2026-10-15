# Plan: Align the Agentic Coding website with jg-skills and the new coding instructions

## Task contract

Refactor the Agentic Coding website so it fully aligns with the jg-skills collection (`../jg-skills`) and the upcoming coding instructions (`../jg-skills/coding-agent-planning/1792008990_jg-skills-and-website/CANDIDATE.md`). The result must look polished, modern, and visual, with concrete examples preferred over long text.

Decisions agreed in conversation:

1. Two sites with separate roles. Agentic Coding owns the method: standards (`AGENTS.md`), the refinement prompt, and visual walkthroughs. jg-skills owns the installable tools and the full skill text.
2. `project.md` is revised first because it is the binding product contract.
3. The public foundation becomes 4.0.0. It drops its command section, adds the new rules, and points to skills for workflows. The refinement prompt drops its command assumptions.
4. The cookbook splits. A new `/workflow/` page replaces the plan, challenge, breakdown, execute, review, publish, and failing-test recipes. The six recipes that no skill replaces stay in the cookbook, shorter and example-led.
5. Removed recipe URLs stay alive as small pages that point to their new location, excluded from the sitemap and `llms.txt`.
6. Bounded autonomy is the top delegation level. "Acceptance and publication remain separate decisions" is replaced by explicit publication authority, granted per change or per run, with its limits shown.
7. No new dependency, and Astro stays on 7.2.2. Only the few local components the new pages need are built. Moldea's Skill website and the jg-skills website are visual references only.
8. Example sessions use a fictional feature, stay short and technically credible, and are never presented as recorded real sessions.

Revision history:

- The first revision applied six corrections from `challenge plan` (plan SHA-256 `303fe26e86ed506cabcf6bff32f8b7427e579749fa34f78a65c5b5b4b8867eb7`): native Astro redirects instead of a custom redirect page, the `/start/` pairing moved after the components exist, the explicit-only verification limit stated wherever installation is recommended, a 4.0.0 migration note, a visual review checkpoint before the homepage refactor, and accurate example lines plus an explicit note on task-scoped review and push.
- This revision applies two corrections from `challenge plan` (plan SHA-256 `8c53750c0958b92bc5e9c926b8f3ecd3b963f776fadff7a366a52be74165284d`): the build verifier now confirms that every internal fragment link and redirect target anchor exists, and the six-recipe rewrite moves out of the workflow step into its own step, with the visual review closing the workflow step.

## Current behavior and repository evidence

- `project.md` (v3.1.0, tracked) declares precedence over the repository's coding instructions and specifies the routes, homepage sections, foundation contents, cookbook recipes, tests, and maintenance rules. It requires command-before-intent dispatch (§6.1, §14.3, §14.4), publication shown as a separate post-acceptance gate (§6.6, §6.8, §13.7, §30), thirteen recipes (§16.2, §31.1), and product-neutral content (§7.3, §30).
- `src/content/resources/agents-foundation.md` (v3.1.0 in `RESOURCE_CONFIG`, `src/site.config.ts`) defines its own `## Agent commands` section (`plan`, `breakdown`, `challenge plan`, `review`) at lines 218-292 and a `## Publication authority` section at lines 294-298. `agents-foundation.test-unit.ts` asserts those command contracts.
- `src/content/resources/refinement-prompt.md` (v1.1.0) checks "command names, activation conditions" (line 161) and injects value 19, "unambiguous command activation" (line 206). Value 2 requires "separate authority for external actions".
- `src/pages/index.astro` composes eight sections. The hero (`hero-workbench.astro:50`) and lede (`index.astro:57`) state that acceptance and publication remain separate decisions. Section 03 (`collaboration-workbench.astro`) renders a three-message planning dialogue, five stage cards, and Correct/Continue/Complete outcomes. Most visuals are sentences arranged in grids.
- `src/content/cookbook/` contains 13 recipes, each 6-10 KB with nine fixed sections. Seven of them (plan-a-feature, challenge-a-plan, break-down-a-plan, execute-one-milestone, investigate-a-failing-test, review-a-change, publish-an-authorized-change) teach workflows that a jg skill now performs; five of those seven have content-contract tests. Outside the cookbook pages, only `src/pages/cookbook/index.astro` (starting points) and recipe `relatedSlugs` link to recipes.
- No page mentions jg-skills. The jg-skills site (`https://jg-skills.jesusgraterol.dev/`, live, skill pages at `/skills/<name>/`, live `/llms.txt`) already links back through `agenticCodingUrl` in its site config.
- jg-skills' explicit-only invocation, the property that keeps `jg-push` and `jg-execute autonomous` from running unprompted, is verified with Claude Code and Codex only (`../jg-skills/README.md:29`). Its README table defines what each skill may change; for example, `jg-plan` writes `plan.md` and removes a stale `milestones.md`.
- The new instructions move all workflows into skills and add four durable rules: planning files are retained as the task record and changed only through an invoked planning or execution skill; a repeatable root cause triggers a search for the same pattern; bug fixes start with a test that fails for the reported reason; review and push are scoped to the current task's files.
- `jg-execute autonomous` reviews, commits, and pushes each milestone. It asks before pushing to the default branch or publishing unpushed commits, and stops on decisions, scope changes, three failed fix attempts, `Review incomplete`, three blocking review rounds, merge conflicts, failed pushes, or unexplained changes. It never weakens a check.
- Astro 7.2.2 generates static redirect pages from the `redirects` config. A destination that is not an exact route key, such as `/workflow/#jg-plan`, is kept as a string, so its fragment survives (`node_modules/astro/dist/core/routing/create-manifest.js:386`, `core/redirects/render.js`). The generated page has a zero-delay meta refresh, `noindex`, a canonical link, and a visible link, but no `lang` attribute (`core/routing/3xx.js`). Redirect routes never reach the sitemap, because only `page` routes are recorded (`core/build/generate.js:414,431`; `@astrojs/sitemap/dist/index.js:86`).
- `scripts/verify-build.ts` requires every non-404 HTML page to carry full metadata, appear in the sitemap, and have article or collection structured data, so it would reject redirect pages as written. It strips fragments before resolving internal links (line 79) and skips `/#` links, so a missing anchor is never detected. The site currently has no internal links with fragments.
- Existing patterns to reuse: `CopyControl`, `ContentLayout`, `BaseLayout`, semantic tokens in `src/styles/global.css` (including `code`, `success`, `warning`, `error`, `accent-on-primary`, `shadow-raised`), and `context-authority.astro` (inspect/edit file tree).
- Pattern references outside this repository: jg-skills `session-demo.astro` (transcript), `workflow-run.astro` (CSS-only supervised/autonomous radio toggle), `terminal-window.astro` and `install-command.astro` (command block with copy). They use the same design tokens. No official UI package is intended for this site; `@moldea.ai/website-ui` belongs to Moldea and is not adopted.
- Worktree before planning: the previous plan's `plan.md` and `milestones.md` (`coding-agent-planning/1788132760_align-manifesto-with-coding-instructions/`) are deleted but unstaged. That deletion predates this plan and is preserved untouched.

## Desired final behavior

### Positioning

The site states one thesis everywhere: **`AGENTS.md` sets the standards. Skills run the workflow. You decide how much to delegate.** The method stays vendor-neutral. jg-skills is presented as the companion collection that runs it, installed through the skills CLI. Every place that recommends installing it states that explicit-only invocation is verified with Claude Code and Codex, and does not imply that guarantee for other agents.

Publication is always an explicit grant. It is given per change (`jg-push` after `jg-review`) or per run (`jg-execute autonomous`). Implementation authority alone never publishes. In an autonomous run the developer grants the run up front, the review gate and stop conditions bound it, and the developer still judges the published result. The site still does not advocate unrestricted autonomy.

Every statement of what a skill may change matches the "What it may change" column of the jg-skills README.

### Homepage

- **Hero:** keeps the H1 "A disciplined way to build software with coding agents." The lede states the thesis. CTAs: "Start with the foundation" (`/start/`) and "See the workflow" (`/workflow/`). The visual is a session transcript (at most eight messages, speakers "You" and "Coding agent") using the fictional organization API keys feature: a `jg-brainstorm` exchange in which the agent redirects a proposed parallel keys table toward the existing token ownership (this satisfies the collaborative-planning demonstration), then `jg-plan` with a short `plan.md` excerpt, `jg-execute`, `jg-review` with a "Ready to commit" status, and `jg-push` with a signed commit line.
- **01 Operating model:** the semantic comparison table remains; its Implementation, Review, and Publication rows reflect skills and explicit per-change or per-run publication. The definition block is trimmed.
- **02 Engineering contract:** the six layers remain. Layer 1 becomes skill dispatch before ordinary intent; layer 6 becomes explicit publication authority. Each layer gains one short monospace example line and loses explanatory prose. Example lines are accurate, for instance "`jg-plan` writes `plan.md` and never touches code".
- **03 Workflow:** a skill pipeline replaces `collaboration-workbench.astro`. Three stages (Plan, Build, Ship) show skill chips that link to `/workflow/#<skill>`, with optional skills marked by text, not color. A supervised/autonomous toggle shows who runs `jg-review` and `jg-push`. The Correct/Continue/Complete outcomes and the publication note remain. A link leads to `/workflow/`.
- **04 Maturity:** Demonstrate, Codify, Delegate, Verify and the acceptance ladder remain. Delegate now runs from supervised milestones to autonomous runs, and a compact list shows the autonomy limits.
- **05-07:** wide context, leverage, and Moldea sections keep their structure; copy referring to commands or separate publication is updated.
- **08 Resources:** four destinations: Start (`/start/`), Workflow (`/workflow/`), Refine (`/refine/`), Cookbook (`/cookbook/`).

### Workflow page (`/workflow/`)

- Article page with breadcrumbs Home > Workflow, visible publication and update dates, and an install command block with copy (`npx skills add jesusgraterol/jg-skills --skill "*" -y`). Beside it: the explicit-only verification note, one line on invocation syntax (`/jg-plan` in Claude Code, `$jg-plan` in Codex), and one line stating that skills defer engineering standards to the repository's `AGENTS.md`, linking to `/start/`.
- One H2 per stage (Plan, Build, Ship) and one H3 per step with the skill name as its anchor: `jg-brainstorm`, `jg-plan`, `jg-challenge-plan`, `jg-breakdown`, `jg-execute`, `jg-debug`, `jg-pause`, `jg-review`, `jg-push`. Each step shows a one-sentence purpose, an "Optional" or "When needed" marker where applicable, what it may change, a short transcript with one artifact, and a link to the skill's jg-skills page.
- Step examples continue the API keys story: the brainstorm recommendation; a `plan.md` excerpt ending in `## Approval required`; a challenge verdict "Plan revision required before proceeding" with one numbered decision; a `milestones.md` excerpt with a `**Status:** done` line; supervised and autonomous execution behind a toggle, the autonomous view showing the Implement, Checks, Review, Fix, Push cycle and the stop conditions; a `jg-debug` example with a failing test, a fix diff, and a passing test; a `jg-pause` status report; review findings with a verdict and the Correct/Continue/Complete outcomes, noting `jg-review <target-branch>` for branches; a `jg-push` signed-off, signed commit and push line.
- A closing "More skills" section lists `jg-feedback` and `jg-session` with links, and points to the cookbook for situations no skill covers.

### Start page (`/start/`)

- Intro copy describes the 4.0.0 foundation without commands or separate-publication wording.
- A pairing block, outside the copyable file, recommends jg-skills with the install command, the explicit-only verification note, and a link to `/workflow/`.
- A short "What changed in 4.0.0" note, also outside the file, maps the removed commands to skills: `plan` to `jg-plan`, `challenge plan` to `jg-challenge-plan`, `breakdown` to `jg-breakdown`, `review` and `review <target-branch>` to `jg-review` and `jg-review <target-branch>`, and notes that publication now runs through `jg-push` or `jg-execute autonomous`.

### Cookbook

- `/cookbook/` keeps its route, name, and four tracks, and frames recipes as techniques for situations no skill covers. Its starting points route to both surfaces: "The codebase is new to me" (orient recipe), "I need a plan" (`/workflow/#jg-plan`), "Something is broken" (`/workflow/#jg-debug`), "The agent has drifted" (recover recipe).
- Six recipes remain, renumbered 1-6: orient-to-a-codebase (planning), control-scope, synchronize-documentation, recover-from-agent-drift (execution), deepen-a-test-strategy (review), refine-coding-instructions (instructions).
- Each recipe is example-led: a one-to-three-sentence situation, a rendered example transcript, the copyable prompt, then three short body sections: `## What good looks like`, `## If the result drifts`, `## Warning signs`. The former Common mistake, Agentic approach, Before you send the prompt, and Developer review responsibility content is folded into those parts. Target body length is at most about 440 words (two minutes at the existing reading-time rate). Related links that pointed to removed recipes are pruned.

### Public foundation 4.0.0

- `## Command dispatch, task intent, and authority` becomes skill dispatch: when the developer invokes a skill, follow that skill's workflow, authorization, and output contract, and apply the rest of the foundation to the work it performs; otherwise classify ordinary intent.
- The file-modification exception refers to planning artifacts written by an invoked planning or execution skill. A short planning-records rule states that planning files change only through an invoked skill, are retained as the task record, and describe history rather than current behavior.
- Additions: search for other instances of a repeatable root cause and report those outside scope; start a bug fix with a test that fails for the reported reason when automated coverage adds confidence, and take expected values from an independent source.
- Task-scoped review and push stay with the skills that perform them. The foundation deliberately does not restate that rule.
- Coherent execution and Review no longer name `review` commands; they refer to an invoked review skill or the developer's review request. Evidence stays agent-operated and developer-governed, with Correct/Continue/Complete outcomes.
- `## Agent commands` is removed. `## Publication authority` states that implementation, plan approval, milestone completion, review readiness, and acceptance do not by themselves authorize publication; publication requires an explicit developer request or an invoked skill whose workflow includes it, such as an autonomous run that reviews and publishes each milestone within its stop conditions; staging, signing, and destination follow repository policy or that skill.
- The file stays tool-neutral: it does not name jg-skills. The `/start/` page makes the pairing.

### Refinement prompt 2.0.0

- Stage 1 also inspects installed agent skills that define workflows, so proposals do not duplicate or contradict them in instruction files.
- Stage 6 and value 19 refer to skill or command invocation. Value 2 becomes explicit authority for external actions, granted per action or per explicitly invoked autonomous run. New values: planning records retained as the task record, failing-test-first bug fixes, and root-cause pattern search. The major version reflects the changed operating model under `project.md` §28.

### Navigation, discovery, and moved URLs

- Primary navigation: Start, Workflow, Refine, Cookbook, an external "Skills" link to jg-skills, Source, and the theme control, on desktop and mobile.
- `/llms.txt` lists the workflow page and jg-skills' `/llms.txt` under Core resources and the six recipes under Cookbook recipes.
- Astro's `redirects` config, generated from `MOVED_COOKBOOK_RECIPES`, emits one page per removed URL with a zero-delay refresh to the target anchor, `noindex`, a canonical link, and a visible link. Astro keeps these pages out of the sitemap; `llms.txt` lists only published recipes; the build verifier checks each redirect page.
- The build verifier fails when any internal link or redirect target names a fragment that has no matching `id` in the target page.

| Removed recipe                            | Target                         |
| ----------------------------------------- | ------------------------------ |
| `/cookbook/plan-a-feature/`               | `/workflow/#jg-plan`           |
| `/cookbook/challenge-a-plan/`             | `/workflow/#jg-challenge-plan` |
| `/cookbook/break-down-a-plan/`            | `/workflow/#jg-breakdown`      |
| `/cookbook/execute-one-milestone/`        | `/workflow/#jg-execute`        |
| `/cookbook/investigate-a-failing-test/`   | `/workflow/#jg-debug`          |
| `/cookbook/review-a-change/`              | `/workflow/#jg-review`         |
| `/cookbook/publish-an-authorized-change/` | `/workflow/#jg-push`           |

## In scope

- `project.md` revision to 4.0.0
- foundation 4.0.0, refinement prompt 2.0.0, resource metadata, `/start/` and `/refine/` copy, the `/start/` pairing and 4.0.0 note
- new local components, the `/workflow/` page, native redirects for moved recipes, anchor verification, navigation, `llms.txt`, build verification
- the cookbook content model and the six rewritten recipes
- a developer visual review checkpoint before the cookbook rewrite and homepage refactor
- the homepage refactor
- tests at every affected level and `README.md` synchronization

## Explicit exclusions

- no new dependencies, dependency upgrades, React, client framework, or new animation
- no changes to the jg-skills repository, its website, or its skills
- no changes to protected coding-instruction files, including the root `AGENTS.md` symlink
- no installation of jg-skills into this repository
- no changes to the Open Graph image, Moldea assets, coding-agent marks, deployment workflow, or domain configuration
- no new theme mechanism or design tokens beyond the existing set
- no commits or pushes as part of implementation

## Architecture and ownership

### New and changed modules

| Module                                 | Responsibility                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/types.ts`                 | Owns `TranscriptMessageSchema`, `ArtifactSchema`, and the extended `CookbookEntrySchema`; exports inferred `ITranscriptMessage` and `IArtifact` through `src/content/index.ts`.                                                                                                                                                                                                                                                                                                                                                                 |
| `src/site.config.ts`                   | Adds `skills` (name, site URL, install command, explicit-only verification note), `WORKFLOW_STEPS` (skill name, stage, optional marker, one-line purpose, what it may change), workflow page dates, and `MOVED_COOKBOOK_RECIPES` (slug to target path and anchor). Bumps resource versions and adds the Workflow navigation item.                                                                                                                                                                                                               |
| `astro.config.ts`                      | Adds `redirects` generated from `MOVED_COOKBOOK_RECIPES`. No sitemap filter is needed.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `src/components/artifact-panel/`       | Framed file or output surface: header label, optional status with visible text and tone, and typed lines (`text`, `heading`, `added`, `removed`, `muted`) with `+`/`-` markers and screen-reader labels. Scrolls internally.                                                                                                                                                                                                                                                                                                                    |
| `src/components/session-transcript/`   | Ordered conversation (`<ol>` with an accessible name). Each message has a visible speaker, an optional skill invocation chip, text, and an optional `ArtifactPanel`. Adapted from jg-skills `session-demo.astro` and the current dialogue markup.                                                                                                                                                                                                                                                                                               |
| `src/components/install-command/`      | Command block with a non-copied prompt marker, the existing `CopyControl`, and the explicit-only verification note, adapted from jg-skills `install-command.astro` and `terminal-window.astro`.                                                                                                                                                                                                                                                                                                                                                 |
| `src/components/hero-session/`         | Hero transcript data and composition. Replaces `hero-workbench/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `src/components/skill-pipeline/`       | Homepage Plan/Build/Ship pipeline with a CSS-only radio toggle, outcomes, and publication note. Replaces `collaboration-workbench/`.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `src/components/workflow-guide/`       | `/workflow/` step sections; `constants.ts` holds the per-step example transcripts and artifacts typed by the content schemas.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `src/utilities/llms-text/llms-text.ts` | Adds the workflow page and jg-skills index links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `scripts/verify-build.ts`              | Requires `workflow/index.html`; excludes the configured redirect pages from full-page checks and verifies for each one a zero-delay refresh to its exact target, `noindex`, an existing target artifact, and absence from the sitemap; for every internal link and redirect target with a fragment, requires a matching `id` in the target artifact, replacing the current `/#` skip. New stable messages, including `Broken internal anchor`, follow the existing `VERIFY_BUILD_ERROR_MESSAGES` pattern and the `verifyBuild` `@throws` block. |

Components keep the repository's direct `.astro` import pattern; component-local `constants.ts` and `types.ts` are added only where a component owns data. Static presentational data stays with its component, matching existing homepage components; data shared across pages (`WORKFLOW_STEPS`, skills config, moved recipes) lives in `src/site.config.ts`, as the skill catalog does in jg-skills.

### Toggles

Both supervised/autonomous toggles use native radio inputs inside a `fieldset` with a visible or screen-reader legend and Tailwind `group-has-[…:checked]` variants. Both modes' content is in the static HTML, the toggle works without JavaScript, and keyboard arrow keys switch modes natively.

### Collections and resources

The cookbook (six entries) and workflow steps (nine) are small, durably bounded editorial collections rendered at build time; no pagination or caching is warranted. No runtime I/O is added. The anchor check reads target artifacts the verifier already loads, so its cost stays proportional to the small number of fragment links.

### Public contract impact

- `/AGENTS.md` and `/refine.txt` change content and major versions; their routes, media types, and copy, download, and raw synchronization are unchanged.
- Seven recipe URLs become redirect pages; six recipe URLs keep their slugs.
- `/workflow/` is a new public route; `/llms.txt` structure keeps its required headings.

## File-level change map

### Product and repository documentation

- `project.md`: version 4.0.0 and current date. Revise §2 (offerings: method plus jg-skills companion), §3 and §4 (publication as an explicit grant), §5.3, §6.1 (skill dispatch), §6.6 (sequence with an optional brainstorm and publication through `jg-push` or an autonomous run), §6.8 (explicit publication, no unrestricted autonomy), §6.10 (autonomous runs as the top delegation level and their limits), §7.3 (method vendor-neutral; jg-skills named as the companion, with explicit-only invocation verified with Claude Code and Codex), §8 goals, §11 routes (add `/workflow`, moved recipe redirects), §12 navigation, §13 homepage (hero transcript absorbs §13.6, §13.7 becomes the skill pipeline, §13.14 four destinations), §14.3 and §14.4 (new foundation rules; workflows come from skills), §14.5 (pairing block and 4.0.0 note), §15.4 values, §16 (six recipes, example-led content model), a new Workflow page section, §17.2 (install command copy), §23 (redirect pages excluded from the sitemap), §26 (tests, including anchor verification), §30 (maintenance rules), §31 (definition of done), and §32 (promise).
- `README.md`: intro resource list, Content and public routes (workflow page, `WORKFLOW_STEPS`, moved recipes and where they are configured), how to add a recipe (new fields), Verification bullets (redirects and anchor checks).

### Resources

- `src/content/resources/agents-foundation.md`, `agents-foundation.test-unit.ts`
- `src/content/resources/refinement-prompt.md`, `refinement-prompt.test-unit.ts`
- `src/site.config.ts` (`RESOURCE_CONFIG` versions and dates)
- `src/pages/start.astro` (intro copy in step 2; pairing block and 4.0.0 note in step 4), `src/pages/refine.astro` (copy only where it mentions commands)

### Shared components

- add `src/components/artifact-panel/artifact-panel.astro`
- add `src/components/session-transcript/session-transcript.astro`
- add `src/components/install-command/install-command.astro`
- `src/content/types.ts`, `src/content/index.ts`, `src/content/types.test-unit.ts` (transcript and artifact schemas)

### Workflow page, redirects, and discovery

- add `src/pages/workflow.astro`
- add `src/components/workflow-guide/workflow-guide.astro`, `constants.ts`, `workflow-guide.test-e2e.ts`
- remove the seven moved recipes and the five tests owned by them (`plan-a-feature`, `challenge-a-plan`, `break-down-a-plan`, `review-a-change`, `publish-an-authorized-change`)
- `src/pages/cookbook/index.astro` (starting points that linked to removed recipes now link to `/workflow/` anchors) and `relatedSlugs` in the six remaining recipes (references to removed recipes pruned)
- `src/utilities/llms-text/llms-text.ts`, `llms-text.test-unit.ts`
- `src/components/site-navigation/site-navigation.astro`, `src/components/site-footer/site-footer.astro` (if the footer's derived navigation needs the external link excluded or added)
- `astro.config.ts`, `scripts/verify-build.ts`, `scripts/verify-build.test-integration.ts`

### Cookbook

- `src/content/types.ts` (`CookbookEntrySchema` gains `situation` and `example`)
- `src/pages/cookbook/[slug].astro` (situation and example rendering, new section order), `src/pages/cookbook/index.astro` (framing as techniques no skill covers)
- rewrite the six remaining recipes; update `deepen-a-test-strategy.test-unit.ts` if its asserted phrases change

### Homepage

- `src/pages/index.astro`
- add `src/components/hero-session/hero-session.astro`; remove `src/components/hero-workbench/` including its test
- add `src/components/skill-pipeline/skill-pipeline.astro` and `skill-pipeline.test-e2e.ts`; remove `src/components/collaboration-workbench/`
- update copy in `coding-modes-comparison.astro`, `engineering-contract.astro`, `maturity-system.astro`, `context-authority.astro` (only where it names commands), `resource-actions.astro`
- `src/layouts/base-layout.test-e2e.ts` (routes, redirects, homepage, start, cookbook, navigation assertions)

## Ordered implementation strategy

1. **Revise the product contract.** Update `project.md` to 4.0.0 as described. Review checkpoint: the spec states the two-site split, skill dispatch, explicit per-change or per-run publication with its limits, the explicit-only verification limit, the workflow route, the redirect and anchor contract, and the six-recipe cookbook, and no section still requires the removed command model.
2. **Update the public resources.** Rewrite the foundation and refinement prompt, bump versions and dates, update their unit tests, and update the `/start/` intro and `/refine/` copy. Review checkpoint: raw and rendered resources still match; the foundation contains no command definitions or jg-skills name.
3. **Build the shared components.** Add the transcript and artifact schemas and the artifact, transcript, and install-command components with light and dark, 320px, and keyboard behavior. Depends on step 1.
4. **Ship the workflow page and redirects.** Start by adding the redirect for one removed slug, building, and confirming that the generated page keeps the `#anchor` in its refresh URL and is absent from the sitemap; if either fails, stop and report instead of switching mechanisms. Then add the skills config, `WORKFLOW_STEPS`, and `MOVED_COOKBOOK_RECIPES`; build `/workflow/`; add the `/start/` pairing block and 4.0.0 note; remove the seven moved recipes and their tests; repoint the cookbook starting points and prune `relatedSlugs` so no internal link targets a redirect; complete the remaining redirects, `llms.txt`, navigation, and build verification including anchor checks. These land together because every redirect needs its target. Depends on steps 2 and 3. Review checkpoints: every old recipe URL lands on its step heading, and the build verifier passes, including anchors. The step closes with the visual review: capture screenshots of `/workflow/` in light and dark at 320px and 1440px for developer review before step 5, then delete the screenshots and stop the preview server.
5. **Rewrite the cookbook.** Extend `CookbookEntrySchema` with `situation` and `example`, update `[slug].astro` rendering and the index framing, and rewrite the six recipes to the example-led model, applying any changes from the visual review. Depends on steps 3 and 4. Review checkpoint: every recipe renders its example and prompt, keeps its slug, and stays within the length target.
6. **Refactor the homepage.** Add the hero session and skill pipeline, apply any changes from the visual review, update the remaining sections' copy, remove the replaced components, and update homepage tests. Depends on step 4 for anchors.
7. **Synchronize documentation and verify.** Update `README.md`, run the full pipeline, and complete manual visual checks.

## Testing strategy

### Unit

- Foundation: skill dispatch precedes ordinary intent; no `## Agent commands`, `challenge plan`, `repo push`, or jg-skills name; planning records are retained and skill-owned; root-cause pattern search; failing-test-first bug fixes with independent expected values; publication requires an explicit request or an invoked skill that includes it; agent-operated evidence and Correct/Continue/Complete remain.
- Refinement prompt: the six stages remain; skill-aware inspection; skill or command invocation in the audit and values; value 2's explicit per-action or per-run authority.
- `CookbookEntrySchema`: existing date refinement plus any custom refinement added for examples; library-guaranteed Zod behavior is not tested.
- `buildLlmsText`: workflow and jg-skills links present; recipe ordering preserved.

### Integration (build artifact)

- Required paths include `workflow/index.html`; the six recipes appear in the sitemap and `llms.txt`; redirect pages do not.
- New failure fixtures: a redirect page without `noindex`, with a wrong refresh target, whose target artifact is missing, or listed in the sitemap; a redirect target or internal link whose fragment has no matching `id`. Each fails with its documented message.
- Raw resource synchronization for both resources.

### End-to-end

- Route list, accessibility scans (light and dark) for `/`, `/workflow/`, `/start/`, `/refine/`, `/cookbook/`, and one recipe.
- Homepage: new section headings, transcript content, pipeline links to `/workflow/` anchors, outcomes and publication note.
- Skill pipeline and workflow execute toggle: both modes present in the DOM, keyboard switching, who runs review and push changes per mode.
- Workflow page: nine step anchors, each linking to its exact jg-skills URL; install command copy writes the exact command; the explicit-only verification note appears beside it.
- Start page: version 4.0.0, skill-dispatch text in the rendered file, the pairing block with its verification note, and the 4.0.0 note mapping each removed command; refine page shows 2.0.0.
- Redirects: each old URL ends at its target anchor with the matching step heading in the viewport, and the redirect document is `noindex`.
- Cookbook: each recipe renders its situation, example transcript, and working prompt.
- No horizontal overflow at 320px on `/`, `/workflow/`, `/start/`, `/cookbook/`, and a recipe; navigation including the Skills link works at 320px and by keyboard.

### Manual

Check 320, 375, 768, 1024, and 1440px; light and dark; keyboard and focus; reduced motion; long artifact lines scrolling internally; visual hierarchy, spacing, and consistency with the existing tokens; and the redirect experience with JavaScript disabled.

## Verification commands

```bash
npm run test:unit
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:integration:artifact
npm run test:e2e:artifact
npm run check
```

Format only files touched by this task with the repository's Prettier configuration.

## Security, compatibility, deployment, and rollback

- No data collection, scripts, or third-party requests are added. External links use the existing safe-opener pattern.
- Install recommendations carry the explicit-only verification limit so users of other agents are not led to assume publishing skills cannot run unprompted.
- Deployment stays on the existing GitHub Pages workflow from `main`. Rollback is a revert of the implementation commits, which restores the thirteen recipe pages and removes `/workflow/`.
- Search impact: seven recipe URLs leave the sitemap and redirect to `/workflow/` anchors; this is intended.

## Risks and mitigations

- **Skill text drifting from jg-skills.** This site keeps only one-line roles and "may change" summaries taken from the jg-skills README; full text is linked. The README notes that `WORKFLOW_STEPS` must change when jg-skills adds, removes, or renames a skill or changes what one may change.
- **jg-skills URL changes.** All links derive from one configured base URL.
- **Astro redirect output.** Step 4 confirms the fragment and sitemap behavior on the first redirect; the build verifier fails loudly if a later Astro version changes the redirect page.
- **Broken anchors.** The build verifier rejects any internal link or redirect target whose fragment has no matching `id`.
- **Redirect pages without `lang`.** Accepted: they are zero-delay transitional pages excluded from search and accessibility scans, and they still show a visible link.
- **CSS-only toggles hiding content.** Tests confirm both modes exist in the DOM and switch by keyboard.
- **Transcript density on small screens.** Messages wrap; artifacts scroll inside their panel; 320px tests cover it.
- **Instructions switching mid-implementation.** If `CANDIDATE.md` takes effect during implementation, planning files may change only through jg skills, which are not installed here. Installing them is outside this plan.

## Assumptions and decisions

Resolved defaults (agreed or derived from them):

- Foundation stays tool-neutral and does not name jg-skills; `/start/` makes the pairing and carries the 4.0.0 note.
- Refinement prompt goes to 2.0.0 because its operating model changes.
- The cookbook route and name stay; only seven recipes move.
- Removed recipe URLs use Astro's native `redirects`, verified from Astro's source and confirmed by the first build in step 4.
- Skill names appear bare in examples, with one line on per-agent invocation syntax.
- The hero H1 and Open Graph image stay unchanged.
- Planning files for this task are retained as the task record after completion, consistent with the README and the new instructions.

Decisions still open: none blocking. The developer can override any default above when approving.

## Approval required

Approve implementation of this plan: revise `project.md` to 4.0.0; publish foundation 4.0.0 and refinement prompt 2.0.0, with a `/start/` pairing block and 4.0.0 migration note; add the transcript, artifact, and install-command components; add `/workflow/` with nine skill steps and the explicit-only verification note wherever installation is recommended; turn seven recipe URLs into native Astro redirects that stay out of the sitemap and `llms.txt`, with the build verifier checking every fragment link and redirect anchor; pause for a developer visual review of `/workflow/` before the cookbook rewrite and homepage refactor; reduce the cookbook to six example-led recipes; refactor the homepage around the hero session and skill pipeline with explicit per-change or per-run publication; update navigation, `llms.txt`, tests, and `README.md`. No dependencies, protected instruction files, jg-skills files, deployment configuration, commits, or pushes are included. Run `breakdown` first if you want milestone checkpoints, and `challenge plan` again if you want the revision checked.
