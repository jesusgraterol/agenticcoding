// @vitest-environment node
import type { CollectionEntry } from 'astro:content';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { RESOURCE_IDS, type IResourceId } from '../../site.config.ts';

import { loadResource } from './resource-text.ts';

const getEntryMock = vi.hoisted(() =>
  vi.fn<
    (
      collection: 'resources',
      resourceId: IResourceId,
    ) => Promise<CollectionEntry<'resources'> | undefined>
  >(),
);

vi.mock('astro:content', () => ({ getEntry: getEntryMock }));

describe('loadResource', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('returns the source entry and normalized text', async () => {
    const entry = {
      body: '# Foundation\r\n\r\n',
      collection: 'resources',
      data: {
        description: 'A test resource.',
        resource: RESOURCE_IDS.AgentsFoundation,
        title: 'Foundation',
      },
      id: RESOURCE_IDS.AgentsFoundation,
    } satisfies CollectionEntry<'resources'>;

    getEntryMock.mockResolvedValueOnce(entry);

    await expect(loadResource(RESOURCE_IDS.AgentsFoundation)).resolves.toStrictEqual({
      entry,
      text: '# Foundation\n',
    });
    expect(getEntryMock).toHaveBeenCalledTimes(1);
    expect(getEntryMock).toHaveBeenCalledWith('resources', RESOURCE_IDS.AgentsFoundation);
  });

  test('rejects with the exact missing-resource contract', async () => {
    getEntryMock.mockResolvedValueOnce(undefined);

    await expect(loadResource(RESOURCE_IDS.RefinementPrompt)).rejects.toThrow(
      /^Missing canonical resource: refinement-prompt$/u,
    );
  });
});
