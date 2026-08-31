import { z } from 'astro/zod';

// validated frontmatter contract for cookbook entries
export const CookbookEntrySchema = z
  .strictObject({
    category: z.enum(['planning', 'execution', 'review', 'instructions']),
    description: z.string().min(1),
    draft: z.boolean(),
    featured: z.boolean(),
    order: z.number().int().positive(),
    publishedAt: z.coerce.date(),
    prompt: z.string().min(1),
    relatedSlugs: z.array(z.string().min(1)),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    updatedAt: z.coerce.date(),
  })
  .refine(({ publishedAt, updatedAt }) => updatedAt >= publishedAt, {
    message: 'updatedAt must not precede publishedAt',
    path: ['updatedAt'],
  });
