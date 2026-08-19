import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { RESOURCE_IDS } from './site.config.ts';

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.strictObject({
    description: z.string().min(1),
    resource: z.enum([RESOURCE_IDS.AgentsFoundation, RESOURCE_IDS.RefinementPrompt]),
    title: z.string().min(1),
  }),
});

const cookbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cookbook' }),
  schema: z.strictObject({
    category: z.enum(['planning', 'execution', 'review', 'instructions']),
    description: z.string().min(1),
    draft: z.boolean(),
    featured: z.boolean(),
    order: z.number().int().positive(),
    prompt: z.string().min(1),
    relatedSlugs: z.array(z.string().min(1)),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { cookbook, resources };
