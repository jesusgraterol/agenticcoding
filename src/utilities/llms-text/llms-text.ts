import { buildLlmsText as buildLlmsTextFile } from 'jg-personal-astro-ui/llms-text';

import { SITE_CONFIG } from '../../site.config.ts';

import type { ILlmsRecipe } from './types.ts';

/** Builds the canonical LLM-readable index from current public content. */
export const buildLlmsText = (recipes: ILlmsRecipe[]): string =>
  buildLlmsTextFile({
    name: SITE_CONFIG.name,
    summary: SITE_CONFIG.defaultDescription,
    details: [
      'Use the foundation when a repository needs a dependable starting point. Use the refinement prompt when valuable project-specific instructions already exist. The workflow page shows each step of a change run through an explicit agent skill, and the cookbook covers recurring situations that no skill runs.',
    ],
    sections: [
      {
        heading: 'Core resources',
        links: [
          {
            title: 'Project overview',
            url: `${SITE_CONFIG.url}/`,
            description:
              'The principles, operating model, maturity loop, and practical resources behind Agentic Coding.',
          },
          {
            title: 'AGENTS.md foundation',
            url: `${SITE_CONFIG.url}/AGENTS.md`,
            description:
              'The canonical Markdown template for establishing production-quality coding-agent instructions.',
          },
          {
            title: 'Instruction refinement prompt',
            url: `${SITE_CONFIG.url}/refine.txt`,
            description:
              'A preservation-first prompt for strengthening an existing instruction system.',
          },
          {
            title: 'Workflow',
            url: `${SITE_CONFIG.url}/workflow/`,
            description:
              'The Plan, Build, and Ship workflow, step by step, with the skill that runs each step and example output.',
          },
          {
            title: `${SITE_CONFIG.skills.name} index`,
            url: new URL('llms.txt', SITE_CONFIG.skills.url).toString(),
            description:
              'The installable skills that run the workflow, with their full instructions.',
          },
          {
            title: 'Cookbook index',
            url: `${SITE_CONFIG.url}/cookbook/`,
            description: 'Techniques for recurring situations that no skill covers.',
          },
        ],
      },
      {
        heading: 'Cookbook recipes',
        links: recipes.map(({ description, slug, title }) => ({
          title,
          url: `${SITE_CONFIG.url}/cookbook/${slug}/`,
          description,
        })),
      },
      {
        heading: 'Optional',
        links: [
          {
            title: 'Source repository',
            url: SITE_CONFIG.repositoryUrl,
            description: 'Source code, content, and issue tracker for this website.',
          },
          {
            title: 'Author',
            url: SITE_CONFIG.author.url,
            description: `More work by ${SITE_CONFIG.author.name}.`,
          },
          {
            title: 'moldea',
            url: SITE_CONFIG.moldea.githubUrl,
            description:
              'Git-native project context for coding agents, and the project work through which these principles were developed and tested.',
          },
        ],
      },
    ],
  });
