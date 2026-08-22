# Agentic Coding

[Agentic Coding](https://agenticcoding.jesusgraterol.dev) is a disciplined approach to planning, building, verifying, and reviewing software with coding agents while developers retain final engineering judgment.

The website turns that approach into four practical resources:

- a concise explanation of the operating model and its maturity path
- a neutral `AGENTS.md` foundation for new or existing repositories
- a preservation-first prompt for refining instructions that already contain useful project knowledge
- a field guide of reusable conversations, worked examples, and recovery techniques for planning, execution, investigation, agent-operated evidence, and developer acceptance

The landing page also identifies [`moldea`](https://moldea.ai/) as the real project work through which these principles were developed and tested.

Evidence is agent-operated and developer-governed. The coding agent carries the verification workload through findings-first review, tests, checks, failure investigation, and reproducible reporting. The developer builds the proving system, challenges whether the evidence is independent and sufficient, decides when risk warrants code inspection, and owns the acceptance decision.

The site is statically generated with Astro and Tailwind CSS. It uses the same Ubuntu Sans typography and core color palette as the Moldea projects while establishing a minimal technical product-documentation visual language. Client-routed navigation provides an accessible progress indicator while the next page is loading.

## Local development

### Requirements

- Node.js `24.15` or newer within Node 24
- npm `11.12` or newer within npm 11

Install dependencies and the Chromium browser used by the end-to-end suite:

```bash
npm ci
npx playwright install chromium
```

Start the local development server:

```bash
npm run dev
```

Astro serves the project at `http://localhost:4321` by default.

### Commands

| Command                   | Purpose                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `npm run dev`             | Start the Astro development server.                                                                          |
| `npm run build`           | Generate and validate the production site in `dist/`.                                                        |
| `npm run preview`         | Serve the current production build locally.                                                                  |
| `npm run check`           | Run unit tests, typechecking, linting, formatting, the build, artifact integration tests, and browser tests. |
| `npm test`                | Run all unit, integration, and end-to-end test categories.                                                   |
| `npm run format`          | Format supported project files.                                                                              |
| `npm run assets:generate` | Regenerate the committed open-graph image from its HTML template.                                            |

## Content and public routes

The two downloadable resources have one canonical Markdown source each:

- `src/content/resources/agents-foundation.md` generates `/start/` and the raw `/AGENTS.md` response.
- `src/content/resources/refinement-prompt.md` generates `/refine/` and the raw `/refine.txt` response.

Rendered code blocks and copy controls use the same normalized text as the raw routes, preventing the displayed, copied, and downloaded versions from drifting apart. The root repository `AGENTS.md`, when present in a development environment, is a protected coding-instruction file and is not the public template source.

The root `/llms.txt` endpoint is generated from the site configuration and published cookbook collection. It gives coding agents a concise project summary, direct links to the raw instruction resources, the complete ordered recipe index, and optional project context. Every public HTML page identifies it through `rel="describedby"`; `/start/` and `/refine/` also identify their canonical raw documents through `rel="alternate"`.

Cookbook recipes live in `src/content/cookbook/`. To add one:

1. Create a kebab-case Markdown file in that directory.
2. Provide the frontmatter required by `src/content.config.ts`, including a unique slug and order.
3. Add reciprocal `relatedSlugs` where the relationship is useful.
4. Run `npm run check` to validate the content, generated route, internal links, metadata, and browser behavior.

## Project blueprint

```text
.
├── .github/workflows/       # verification and GitHub Pages deployment
├── docs/                    # concise, durable project concepts and processes
├── public/                  # static logos, agent marks, robots.txt, and generated OG image
├── scripts/                 # deterministic asset generation and build-artifact validation
├── src/
│   ├── components/          # focused Astro presentation and interaction modules
│   ├── content/
│   │   ├── cookbook/        # recipe Markdown sources
│   │   └── resources/       # canonical public instruction resources
│   ├── layouts/             # shared document metadata, navigation, and content shells
│   ├── pages/               # static routes and raw text endpoints
│   ├── styles/              # Tailwind entry point and branded semantic design tokens
│   └── utilities/           # resource, recipe, LLM index, SEO, and theme behavior with focused tests
├── vitest/                  # test-category discovery configuration
├── astro.config.ts          # static site, sitemap, syntax highlighting, and Tailwind setup
├── playwright.config.ts     # production-preview browser verification
└── package.json             # exact runtime, tooling, and command contracts
```

The root layouts own canonical URLs, search and social metadata, structured data, theme bootstrap behavior, the skip link, global navigation, and the footer. Page modules own page-specific hierarchy and content. Content collections own validated prose. Utilities own the small pieces of behavior that must remain identical across rendered and raw surfaces.

The `/docs` directory is reserved for essential, durable project concepts and processes. Documents there must remain concise and quickly scannable by humans and agents. API and HTTP endpoint documentation, if the project ever needs it, belongs in its established location outside `/docs`.

## Branding and assets

The semantic color tokens in `src/styles/global.css` derive from the Moldea base palette and include accessible light and dark modes. The site uses the variable Ubuntu Sans package locally rather than loading a remote webfont.

The Agentic Coding logo is a code-mark SVG with a wordmark variant. The paired Moldea lockups under `public/moldea/` are unmodified copies of the authoritative theme assets from the sibling Moldea app UI package. The open-graph image is committed at `public/og/agentic-coding.png` so normal builds remain deterministic. After changing its template, regenerate it with `npm run assets:generate` and commit both the template and PNG.

Coding-agent marks are copied from the Moldea skill project. Their origin and use are recorded in `docs/asset-attribution.md`.

## Verification

The quality pipeline checks:

- application-owned text normalization, reading-time, sorting, and theme preference behavior
- TypeScript and Astro diagnostics
- ESLint and Prettier conformance
- production generation, sitemap output, internal links, LLM discovery, SEO metadata, structured data, and raw resource fidelity
- browser accessibility, navigation progress, copy controls, raw routes, theme persistence, reduced motion, keyboard navigation, and layouts down to 320 pixels

Run the complete pipeline before publishing:

```bash
npm run check
```

## Deployment

`.github/workflows/pages.yml` verifies pull requests and deploys the `dist/` artifact from `main` through GitHub Pages. In the repository settings, set Pages to **GitHub Actions** and configure the custom domain `agenticcoding.jesusgraterol.dev`. Point that DNS name to the GitHub Pages hostname shown by the repository’s Pages settings; DNS ownership remains outside this repository, so no speculative `CNAME` record is committed here.

## Author and license

Created by [Jesus Graterol](https://jesusgraterol.dev). Source is available on [GitHub](https://github.com/jesusgraterol/agenticcoding) under the MIT license.
