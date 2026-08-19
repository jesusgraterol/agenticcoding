import type { APIRoute } from 'astro';

import { RESOURCE_IDS } from '../site.config.ts';
import { loadResource } from '../utilities/resource-text/index.ts';

/** Returns the canonical instruction-refinement prompt as plain text. */
export const GET: APIRoute = async () => {
  const { text } = await loadResource(RESOURCE_IDS.RefinementPrompt);

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
