# Testing

`npm test` and `npm run check` select essential coverage. CI always runs `npm run check`; full runs locally only when explicitly requested. There is no full CI input, schedule, or recurring manual routine.

## Membership

Essential protects the site's primary resource-delivery guarantees through the real production build:

- `/AGENTS.md` and `/refine.txt` match their canonical Markdown bodies exactly. Expected bytes come from the canonical files, independently of the production normalization helper.
- The artifact validator rejects emitted test source before deployment.

Both selections keep the production build's existing validation of routes, content, links, metadata, and output hygiene. All current unit families are full-only: content and instruction-copy contracts, resource-loader observations, newline formatting, reading time, schema/SEO permutations, and index structure. The integration suite additionally keeps validator-corruption scenarios and content inventories in full. All seven browser E2E files are full-only, including their complete accessibility, keyboard/focus, 320px, light/dark, no-JavaScript, and motion coverage. Add no replacement essential browser smoke.

Classify each new or materially changed scenario by its concrete failure consequence. Authority, privacy/isolation, core persistence, primary workflows, and necessary recovery belong in essential when applicable. Speed, test level, and frontend/backend location do not establish importance. Unassessed existing cases remain essential until assessed; every current family has been assessed here.

Useful secondary cases/suites carry the Vitest `full` tag declared in the category configurations. Mixed cases stay co-located. Entirely full-only categories, currently unit and browser E2E, are omitted from essential together with their preparation. If a new unit family establishes an essential guarantee, add its essential invocation before the build in both aggregates; exclude wholly full-only files before imports. Do not keep a new consequential case out of essential merely because its category is currently omitted. Unexpectedly empty required selections must fail.

## Commands

| Command                             | Selection and preparation                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `npm test`                          | One validated build, then essential integration tests                              |
| `npm run check`                     | Typecheck, lint, formatting, one validated build, then essential integration tests |
| `npm run test:full`                 | Complete unit, integration, and browser coverage with one build                    |
| `npm run check:full`                | Complete coverage plus typecheck, lint, formatting, and one build                  |
| `npm run test:unit`                 | Complete unit category                                                             |
| `npm run test:integration`          | Build, then complete integration category                                          |
| `npm run test:e2e`                  | Build, then complete Chromium category                                             |
| `npm run test:integration:artifact` | Complete integration category against an existing build                            |
| `npm run test:e2e:artifact`         | Complete Chromium category against an existing build                               |

Install Chromium for browser checks with `npx playwright install chromium`. Essential needs no browser. Aggregate flags apply only to their invocation; granular and focused commands include full-only cases by default. Both correctness aggregates build once; artifact commands allow focused checks to reuse that build while its inputs are unchanged.

During development, prefer complete focused checks. Completion requires essential regression plus complete focused coverage of affected behavior and consumers, including full-only cases. Reuse successful evidence while its relevant source, dependencies, configuration, selection, and environment remain unchanged.

```bash
npm run test:unit -- src/utilities/resource-text/utilities.test-unit.ts
npm run build
npm run test:integration:artifact -- scripts/verify-build.test-integration.ts --retry=0
npm run test:e2e:artifact -- src/layouts/base-layout.test-e2e.ts --repeat-each=3 --retries=0
```

Run changed integration files three times with retries off; Vitest 4.1.10 needs three separate invocations. Playwright uses `--repeat-each=3 --retries=0`. Tests remain co-located with their owning implementation, category discovery stays separate, and test discovery excludes archive/backup directories. Tests must not enter production output; the build validator and its essential rejection scenario enforce that boundary.
