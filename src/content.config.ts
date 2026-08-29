import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { CookbookEntrySchema } from './content/index.ts';
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
  schema: CookbookEntrySchema,
});

export const collections = { cookbook, resources };
