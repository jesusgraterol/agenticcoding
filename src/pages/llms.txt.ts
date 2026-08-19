import type { APIRoute } from 'astro';

import { loadPublishedRecipes } from '../utilities/cookbook/index.ts';
import { buildLlmsText } from '../utilities/llms-text/index.ts';

/** Returns the curated LLM-readable index for the public website. */
export const GET: APIRoute = async () => {
  const recipes = await loadPublishedRecipes();
  const text = buildLlmsText(
    recipes.map(({ data }) => ({
      description: data.description,
      slug: data.slug,
      title: data.title,
    })),
  );

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
