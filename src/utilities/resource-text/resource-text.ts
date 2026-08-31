import { getEntry } from 'astro:content';

import type { IResourceId } from '../../site.config.ts';

import type { IResourcePayload } from './types.ts';
import { normalizeResourceText } from './utilities.ts';

// stable message for a missing canonical content entry.
const MISSING_CANONICAL_RESOURCE_MESSAGE = 'Missing canonical resource';

/**
 * Loads one canonical public resource and its normalized raw representation.
 * @param resourceId The resource collection identifier.
 * @returns A promise that resolves to the source entry and normalized text.
 * @throws
 * - Missing canonical resource
 */
export const loadResource = async (resourceId: IResourceId): Promise<IResourcePayload> => {
  const entry = await getEntry('resources', resourceId);

  if (!entry) {
    throw new Error(`${MISSING_CANONICAL_RESOURCE_MESSAGE}: ${resourceId}`);
  }

  return {
    entry,
    text: normalizeResourceText(entry.body ?? ''),
  };
};
