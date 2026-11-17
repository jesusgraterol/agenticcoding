# Agentic Coding

[Agentic Coding](https://agenticcoding.jesusgraterol.dev) is a content-first website about building software with coding agents while developers retain engineering judgment and control over external actions. It offers an operating model, downloadable coding-instruction foundations and refinement prompts, a skill-based workflow walkthrough, and a cookbook for recurring situations. The installable workflows belong to the separate jg-skills project; this site explains their use.

## Project blueprint

| Task                                                                | Documentation                                                                                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Understand the product, intended experience and acceptance criteria | [Project specification](project.md), the product-intent authority.                                                                |
| Find source owners, public routes and content conventions           | [Architecture](docs/architecture.md), including canonical downloadable resources, cookbook authoring and the detailed source map. |
| Develop locally, regenerate assets or understand deployment         | [Development](docs/development.md), with requirements, commands, branding assets and Pages setup.                                 |
| Choose verification                                                 | [Testing](docs/testing.md), covering essential/full selections, focused checks and production-artifact guarantees.                |
| Inspect asset provenance and licences                               | [Asset attribution](docs/asset-attribution.md).                                                                                   |
| Integrate and deliver a change                                      | [Delivery](docs/delivery.md), defining development/main stops and live verification.                                              |

`src/` owns pages, validated content and shared behavior; `scripts/` owns asset generation and artifact validation; `public/` holds static assets. `docs/` contains durable implementation guides. Product intent stays in `project.md`, and skill instructions stay with jg-skills.

## Author and license

Created by [Jesus Graterol](https://jesusgraterol.dev). Source is available on [GitHub](https://github.com/jesusgraterol/agenticcoding) under the MIT license.
