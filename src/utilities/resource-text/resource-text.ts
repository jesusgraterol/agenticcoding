import { getEntry } from 'astro:content';

import type { IResourceId } from '../../site.config.ts';

import type { IResourcePayload } from './types.ts';
import { normalizeResourceText } from './utilities.ts';

/**
 * Loads one canonical public resource and its normalized raw representation.
 * @param resourceId The resource collection identifier.
 * @returns A promise that resolves to the source entry and normalized text.
 * @throws
 * - If the canonical resource is missing from the content collection
 */
export const loadResource = async (resourceId: IResourceId): Promise<IResourcePayload> => {
  const entry = await getEntry('resources', resourceId);

  if (!entry) {
    throw new Error(`Missing canonical resource: ${resourceId}`);
  }

  return {
    entry,
    text: normalizeResourceText(entry.body ?? ''),
  };
};
