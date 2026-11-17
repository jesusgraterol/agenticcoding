# Development

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

## Branding and assets

The color tokens and the Ubuntu Sans typography come from `jg-personal-astro-ui`'s theme, with accessible light and dark modes; the fonts are served locally rather than loaded from a remote webfont.

The Agentic Coding mark comes from the package, which draws the header's mark and holds the SVG that `npm run assets:generate` writes to `public/favicon.svg` and draws into the open-graph image. `public/logo.svg` is the wordmark variant. The homepage's jg-skills bridge also shows the package's `jg/` mark, which the jg-skills website uses. The paired Moldea lockups under `public/moldea/` are unmodified copies of the authoritative theme assets from the sibling Moldea app UI package. The open-graph image is committed at `public/og/agentic-coding.png` so normal builds remain deterministic. After changing its template or updating the package, regenerate it with `npm run assets:generate` and commit the template, the favicon, and the PNG.

Coding-agent marks are copied from the Moldea skill project. Their origin and use, and the two package marks', are recorded in `docs/asset-attribution.md`.

## Deployment

`.github/workflows/pages.yml` verifies pull requests and deploys the `dist/` artifact from `main` through GitHub Pages. In the repository settings, set Pages to **GitHub Actions** and configure the custom domain `agenticcoding.jesusgraterol.dev`. Point that DNS name to the GitHub Pages hostname shown by the repository’s Pages settings; DNS ownership remains outside this repository, so no speculative `CNAME` record is committed here.

[Testing](testing.md) owns essential/full membership and focused completion. [Delivery](delivery.md) distinguishes source integration from main/Pages activation.
