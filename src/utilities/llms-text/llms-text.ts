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
    'Use the foundation when a repository needs a dependable starting point. Use the refinement prompt when valuable project-specific instructions already exist. The cookbook contains focused workflows for planning, execution, investigation, and review.',
    '',
    '## Core resources',
    '',
    `- [Project overview](${SITE_CONFIG.url}/): The principles, operating model, maturity loop, and practical resources behind Agentic Coding.`,
    `- [AGENTS.md foundation](${SITE_CONFIG.url}/AGENTS.md): The canonical Markdown template for establishing production-quality coding-agent instructions.`,
    `- [Instruction refinement prompt](${SITE_CONFIG.url}/refine.txt): A preservation-first prompt for strengthening an existing instruction system.`,
    `- [Cookbook index](${SITE_CONFIG.url}/cookbook/): The complete collection of practical Agentic Coding workflows.`,
    '',
    '## Cookbook recipes',
    '',
    ...cookbookLinks,
    '',
    '## Optional',
    '',
    `- [Source repository](${SITE_CONFIG.repositoryUrl}): Source code, content, and issue tracker for this website.`,
    `- [Author](${SITE_CONFIG.author.url}): More work by ${SITE_CONFIG.author.name}.`,
    `- [Moldea](${SITE_CONFIG.moldeaUrl}): The project work through which these principles were developed and tested.`,
    '',
  ].join('\n');
};
