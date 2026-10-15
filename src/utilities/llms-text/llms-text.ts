import { SITE_CONFIG } from '../../site.config.ts';

import type { ILlmsRecipe } from './types.ts';

/** Escapes text used as a Markdown link label. */
const escapeMarkdownLabel = (label: string): string =>
  label.replaceAll('\\', '\\\\').replaceAll('[', '\\[').replaceAll(']', '\\]');

/** Collapses prose into one concise line for a Markdown file list. */
const normalizeDescription = (description: string): string =>
  description.replaceAll(/\s+/gu, ' ').trim();

/** Builds the canonical LLM-readable index from current public content. */
export const buildLlmsText = (recipes: ILlmsRecipe[]): string => {
  const cookbookLinks = recipes.map(
    ({ description, slug, title }) =>
      `- [${escapeMarkdownLabel(title)}](${SITE_CONFIG.url}/cookbook/${slug}/): ${normalizeDescription(description)}`,
  );

  return [
    `# ${SITE_CONFIG.name}`,
    '',
    `> ${SITE_CONFIG.defaultDescription}`,
    '',
    'Use the foundation when a repository needs a dependable starting point. Use the refinement prompt when valuable project-specific instructions already exist. The workflow page shows each step of a change run through an explicit agent skill, and the cookbook covers recurring situations that no skill runs.',
    '',
    '## Core resources',
    '',
    `- [Project overview](${SITE_CONFIG.url}/): The principles, operating model, maturity loop, and practical resources behind Agentic Coding.`,
    `- [AGENTS.md foundation](${SITE_CONFIG.url}/AGENTS.md): The canonical Markdown template for establishing production-quality coding-agent instructions.`,
    `- [Instruction refinement prompt](${SITE_CONFIG.url}/refine.txt): A preservation-first prompt for strengthening an existing instruction system.`,
    `- [Workflow](${SITE_CONFIG.url}/workflow/): The Plan, Build, and Ship workflow, step by step, with the skill that runs each step and example output.`,
    `- [${SITE_CONFIG.skills.name} index](${new URL('llms.txt', SITE_CONFIG.skills.url).toString()}): The installable skills that run the workflow, with their full instructions.`,
    `- [Cookbook index](${SITE_CONFIG.url}/cookbook/): Techniques for recurring situations that no skill covers.`,
    '',
    '## Cookbook recipes',
    '',
    ...cookbookLinks,
    '',
    '## Optional',
    '',
    `- [Source repository](${SITE_CONFIG.repositoryUrl}): Source code, content, and issue tracker for this website.`,
    `- [Author](${SITE_CONFIG.author.url}): More work by ${SITE_CONFIG.author.name}.`,
    `- [moldea Agent Skill](${SITE_CONFIG.moldeaUrl}): Git-native project context for coding agents, from the project work through which these principles were developed and tested.`,
    '',
  ].join('\n');
};
