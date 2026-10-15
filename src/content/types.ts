import { z } from 'astro/zod';

// one line of a file, diff, or command artifact; added and removed lines render as a diff
export const ArtifactLineSchema = z.strictObject({
  kind: z.enum(['text', 'heading', 'added', 'removed', 'muted']),
  text: z.string(),
});

// file, diff, or command output attached to a transcript message
export const ArtifactSchema = z.strictObject({
  lines: z.array(ArtifactLineSchema).min(1),
  status: z
    .strictObject({
      label: z.string().min(1),
      tone: z.enum(['success', 'warning', 'error', 'neutral']),
    })
    .optional(),
  title: z.string().min(1),
});

// one message of a static example transcript; it must show at least one kind of content
export const TranscriptMessageSchema = z
  .strictObject({
    artifact: ArtifactSchema.optional(),
    invocation: z.string().min(1).optional(),
    speaker: z.enum(['developer', 'agent']),
    text: z.string().min(1).optional(),
  })
  .refine(
    ({ artifact, invocation, text }) =>
      artifact !== undefined || invocation !== undefined || text !== undefined,
    { message: 'A transcript message needs an artifact, an invocation, or text' },
  );

export type IArtifactLine = z.infer<typeof ArtifactLineSchema>;
export type IArtifact = z.infer<typeof ArtifactSchema>;
export type ITranscriptMessage = z.infer<typeof TranscriptMessageSchema>;

// validated frontmatter contract for cookbook entries
export const CookbookEntrySchema = z
  .strictObject({
    category: z.enum(['planning', 'execution', 'review', 'instructions']),
    description: z.string().min(1),
    draft: z.boolean(),
    // short conversation shown before the prompt so the technique is seen before it is explained
    example: z.array(TranscriptMessageSchema).min(2),
    featured: z.boolean(),
    order: z.number().int().positive(),
    publishedAt: z.coerce.date(),
    prompt: z.string().min(1),
    relatedSlugs: z.array(z.string().min(1)),
    situation: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    updatedAt: z.coerce.date(),
  })
  .refine(({ publishedAt, updatedAt }) => updatedAt >= publishedAt, {
    message: 'updatedAt must not precede publishedAt',
    path: ['updatedAt'],
  });
