// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { buildStructuredData } from './structured-data.ts';

describe('buildStructuredData', () => {
  test('describes the canonical website without fabricated page fields', () => {
    expect(
      buildStructuredData({
        canonicalUrl: 'https://agenticcoding.jesusgraterol.dev/',
        description: 'A disciplined approach to coding agents.',
        title: 'Agentic Coding | Better software with coding agents',
        type: 'website',
      }),
    ).toStrictEqual({
      '@context': 'https://schema.org',
      '@id': 'https://agenticcoding.jesusgraterol.dev/#website',
      '@type': 'WebSite',
      author: {
        '@type': 'Person',
        name: 'Jesus Graterol',
        url: 'https://jesusgraterol.dev/',
      },
      description: 'A disciplined approach to coding agents.',
      inLanguage: 'en',
      name: 'Agentic Coding',
      url: 'https://agenticcoding.jesusgraterol.dev/',
    });
  });

  test('describes an article with its visible title, section, author, and modified date', () => {
    expect(
      buildStructuredData({
        articleSection: 'Planning',
        canonicalUrl: 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/',
        description: 'Turn a requirement into a grounded implementation strategy.',
        title: 'Plan a feature',
        type: 'article',
        updatedAt: new Date('2026-08-19T00:00:00.000Z'),
      }),
    ).toMatchObject({
      '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/#article',
      '@type': 'Article',
      articleSection: 'Planning',
      dateModified: '2026-08-19T00:00:00.000Z',
      headline: 'Plan a feature',
      mainEntityOfPage: {
        '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/',
        '@type': 'WebPage',
      },
    });
  });

  test('describes a collection as part of the website', () => {
    expect(
      buildStructuredData({
        canonicalUrl: 'https://agenticcoding.jesusgraterol.dev/cookbook/',
        description: 'Practical workflows for coding agents.',
        title: 'Techniques, not magic prompts.',
        type: 'collection',
      }),
    ).toMatchObject({
      '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/#webpage',
      '@type': 'CollectionPage',
      isPartOf: {
        '@id': 'https://agenticcoding.jesusgraterol.dev/#website',
        '@type': 'WebSite',
      },
      name: 'Techniques, not magic prompts.',
    });
  });
});
