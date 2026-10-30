# Agentic Coding

[Agentic Coding](https://agenticcoding.jesusgraterol.dev) is a disciplined approach to planning, challenging, building, verifying, reviewing, and publishing software with coding agents while developers retain final engineering judgment and external-action authority.

The website is organized around one idea: `AGENTS.md` sets the standards, skills run the workflow, and the developer decides how much to delegate. It offers five practical resources:

- a concise explanation of the operating model, engineering contract, and maturity path
- a neutral `AGENTS.md` foundation for new or existing repositories
- a preservation-first prompt for refining instructions that already contain useful project knowledge
- a workflow walkthrough that shows each step of a change run through an explicit [jg-skills](https://jg-skills.jesusgraterol.dev) skill, with example output
- a cookbook of techniques for recurring situations that no skill runs, such as orienting in a new codebase or recovering from drift

jg-skills is a separate project that owns the installable skills and their full instructions. This site links to it and never duplicates the skill text.

The landing page also identifies [`moldea`](https://github.com/moldea-ai), Git-native project context for coding agents, as the real project work through which these principles were developed and tested.

Evidence is agent-operated and developer-governed. The coding agent carries the verification workload through findings-first review, tests, checks, failure investigation, and reproducible reporting tied to an exact repository state. The developer builds the proving system, challenges whether the evidence is independent and sufficient, decides when risk warrants code inspection, and grants publication explicitly, either per change or for an autonomous run.

The site is statically generated with Astro and Tailwind CSS. Its UI comes from [`jg-personal-astro-ui`](https://www.npmjs.com/package/jg-personal-astro-ui), the package Jesus Graterol's sites share: the theme and its tokens, the page head, header, footer, theme switch, sections, cards, buttons, badges, tables, the segmented control, copy buttons, code windows, conversations, file previews, steps, and the Agentic Coding mark. Pages load as ordinary documents, which crossfade where the browser supports view transitions, and a slow page shows the package's progress bar.

## Local development

### Requirements

- Node.js `24.15` or newer within Node 24
- npm `11.12` or newer within npm 11

Install dependencies:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Astro serves the project at `http://localhost:4321` by default.

### Commands

| Command                   | Purpose                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run dev`             | Start the Astro development server.                                                                     |
| `npm run build`           | Generate and validate the production site in `dist/`.                                                   |
| `npm run preview`         | Serve the current production build locally.                                                             |
| `npm run check`           | Run essential artifact tests, typechecking, linting, formatting, and one validated build.               |
| `npm test`                | Build once and run essential artifact tests.                                                            |
| `npm run check:full`      | Run all tests, typechecking, linting, formatting, and one validated build.                              |
| `npm run test:full`       | Run complete unit, integration, and browser coverage with one build.                                    |
| `npm run format`          | Format supported project files.                                                                         |
| `npm run assets:generate` | Write `favicon.svg` from the package's mark and regenerate the open-graph image from its HTML template. |

## Content and public routes

The two downloadable resources have one canonical Markdown source each:

- `src/content/resources/agents-foundation.md` generates `/start/` and the raw `/AGENTS.md` response.
- `src/content/resources/refinement-prompt.md` generates `/refine/` and the raw `/refine.txt` response.

Rendered code blocks use the same normalized text as the raw routes, and the copy buttons copy the raw routes themselves, preventing the displayed, copied, and downloaded versions from drifting apart. The root repository `AGENTS.md`, when present in a development environment, is a protected coding-instruction file and is not the public template source.

The `/workflow/` page shows the `Plan -> Challenge -> Breakdown when useful -> Execute -> Review` sequence as eleven steps, each run through a jg skill and anchored by the skill name, such as `/workflow/#jg-plan`. `WORKFLOW_STEPS` and `SUPPORTING_SKILLS` in `src/site.config.ts` hold each skill's one-line purpose and what it may change; keep them in sync with the jg-skills README whenever a skill is added, removed, renamed, or changes what it may change. The example transcripts live in `src/components/workflow-guide/constants.ts`.

The root `/llms.txt` endpoint uses the directly declared `jg-site` package to generate its index from the site configuration and published cookbook collection. It gives coding agents a concise project summary, direct links to the raw instruction resources, the workflow page, the jg-skills index, the complete ordered recipe index, and optional project context. Every public HTML page identifies the index through `rel="describedby"`; `/start/` and `/refine/` also identify their canonical raw documents through `rel="alternate"`.

Cookbook recipes live in `src/content/cookbook/`. To add one:

1. Create a kebab-case Markdown file in that directory. Add a recipe only for a recurring situation that no workflow skill runs.
2. Provide the frontmatter required by `src/content.config.ts`, including a unique slug and order, a one-to-three-sentence `situation`, an `example` transcript of at least two messages, and the copyable `prompt`.
3. Write the body as `## What good looks like`, `## If the result drifts`, and `## Warning signs`, keeping it at or below about 440 words.
4. Add reciprocal `relatedSlugs` where the relationship is useful.
5. Run `npm run check` to validate the content, generated route, internal links, and metadata. Run complete focused tests for affected behavior; browser coverage remains available through the full and focused commands.

## Project blueprint

```text
.
├── .github/workflows/       # verification and GitHub Pages deployment
├── coding-agent-planning/   # tracked plans and optional milestone sequences
├── docs/                    # concise, durable project concepts and processes
├── public/                  # static logos, agent marks, robots.txt, and generated OG image
├── scripts/                 # deterministic asset generation and build-artifact validation
├── src/
│   ├── components/          # the site's own sections and compositions of the package's components
│   ├── content/
│   │   ├── cookbook/        # recipe Markdown sources
│   │   └── resources/       # canonical public instruction resources
│   ├── layouts/             # shared metadata, breadcrumbs, navigation, and content shells
│   ├── pages/               # static routes and raw text endpoints
│   ├── styles/              # Tailwind entry point, importing the package's contract, theme, and prose styles
│   └── utilities/           # resource, recipe, LLM index, and SEO behavior with focused tests
├── vitest/                  # test-category discovery configuration
├── astro.config.ts          # static site, sitemap, the package's syntax theme and code windows, and Tailwind
├── playwright.config.ts     # production-preview browser verification
└── package.json             # exact runtime, tooling, and command contracts
```

The root layouts compose the package's page head, theme script, skip link, progress bar, header, and footer, and own the site's canonical URLs, structured data, breadcrumb hierarchy, and article publication and update dates. Page modules own page-specific hierarchy and content. Content collections own validated prose and require publication dates that do not follow their update dates. Utilities own the small pieces of behavior that must remain identical across rendered and raw surfaces.

Each timestamped directory under `coding-agent-planning/` contains one authoritative implementation plan and, when useful, its milestone sequence. These planning artifacts are intentionally version-controlled in this repository and are not Astro source inputs.

The `/docs` directory is reserved for essential, durable project concepts and processes. Documents there must remain concise and quickly scannable by humans and agents. API and HTTP endpoint documentation, if the project ever needs it, belongs in its established location outside `/docs`.

[Testing](docs/testing.md) owns essential/full membership, commands, and focused verification.

## Branding and assets

The color tokens and the Ubuntu Sans typography come from `jg-personal-astro-ui`'s theme, with accessible light and dark modes; the fonts are served locally rather than loaded from a remote webfont.

The Agentic Coding mark comes from the package, which draws the header's mark and holds the SVG that `npm run assets:generate` writes to `public/favicon.svg` and draws into the open-graph image. `public/logo.svg` is the wordmark variant. The homepage's jg-skills bridge also shows the package's `jg/` mark, which the jg-skills website uses. The paired Moldea lockups under `public/moldea/` are unmodified copies of the authoritative theme assets from the sibling Moldea app UI package. The open-graph image is committed at `public/og/agentic-coding.png` so normal builds remain deterministic. After changing its template or updating the package, regenerate it with `npm run assets:generate` and commit the template, the favicon, and the PNG.

Coding-agent marks are copied from the Moldea skill project. Their origin and use, and the two package marks', are recorded in `docs/asset-attribution.md`.

## Verification

The essential pipeline checks:

- TypeScript and Astro diagnostics
- ESLint and Prettier conformance
- production generation, sitemap output, internal links and their anchors, LLM discovery, SEO metadata, article dates, breadcrumb structured data, and raw resource fidelity
- exact canonical resource delivery and rejection of test files in production output

Run essential verification with the same command CI uses:

```bash
npm run check
```

Full retains all unit and artifact-validator scenarios plus browser accessibility, navigation progress, copy buttons, raw routes, workflow modes, themes, reduced motion, keyboard navigation, and layouts down to 320 pixels. Full runs locally only when explicitly requested:

```bash
npx playwright install chromium
npm run check:full
```

Granular and focused commands remain complete by default. Essential verification needs no browser installation.

## Deployment

`.github/workflows/pages.yml` verifies pull requests and deploys the `dist/` artifact from `main` through GitHub Pages. In the repository settings, set Pages to **GitHub Actions** and configure the custom domain `agenticcoding.jesusgraterol.dev`. Point that DNS name to the GitHub Pages hostname shown by the repository’s Pages settings; DNS ownership remains outside this repository, so no speculative `CNAME` record is committed here.

## Author and license

Created by [Jesus Graterol](https://jesusgraterol.dev). Source is available on [GitHub](https://github.com/jesusgraterol/agenticcoding) under the MIT license.
