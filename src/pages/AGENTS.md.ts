import type { APIRoute } from 'astro';

import { RESOURCE_IDS } from '../site.config.ts';
import { loadResource } from '../utilities/resource-text/index.ts';

/**
 * Returns the canonical public coding-instruction foundation as Markdown.
 * @returns A promise that resolves to the Markdown response.
 * @throws
 * - Missing canonical resource
 */
export const GET: APIRoute = async () => {
  const { text } = await loadResource(RESOURCE_IDS.AgentsFoundation);

  return new Response(text, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
