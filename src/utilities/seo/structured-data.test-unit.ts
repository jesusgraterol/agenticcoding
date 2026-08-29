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

  test('describes an article with date-only metadata and a separate breadcrumb entity', () => {
    const structuredData = buildStructuredData({
      articleSection: 'Planning',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Cookbook', path: '/cookbook/' },
        { name: 'Plan a feature', path: '/cookbook/plan-a-feature/' },
      ],
      canonicalUrl: 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/',
      description: 'Turn a requirement into a grounded implementation strategy.',
      publishedAt: new Date('2026-08-19T00:00:00.000Z'),
      title: 'Plan a feature',
      type: 'article',
      updatedAt: new Date('2026-08-19T00:00:00.000Z'),
    });

    expect(structuredData).toStrictEqual({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/#article',
          '@type': 'Article',
          articleSection: 'Planning',
          author: {
            '@type': 'Person',
            name: 'Jesus Graterol',
            url: 'https://jesusgraterol.dev/',
          },
          dateModified: '2026-08-19',
          datePublished: '2026-08-19',
          description: 'Turn a requirement into a grounded implementation strategy.',
          headline: 'Plan a feature',
          image: {
            '@type': 'ImageObject',
            height: 630,
            url: 'https://agenticcoding.jesusgraterol.dev/og/agentic-coding.png',
            width: 1200,
          },
          inLanguage: 'en',
          isPartOf: {
            '@id': 'https://agenticcoding.jesusgraterol.dev/#website',
            '@type': 'WebSite',
            name: 'Agentic Coding',
            url: 'https://agenticcoding.jesusgraterol.dev/',
          },
          mainEntityOfPage: {
            '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/',
            '@type': 'WebPage',
          },
          url: 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/',
        },
        {
          '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/#breadcrumb',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              item: 'https://agenticcoding.jesusgraterol.dev/',
              name: 'Home',
              position: 1,
            },
            {
              '@type': 'ListItem',
              item: 'https://agenticcoding.jesusgraterol.dev/cookbook/',
              name: 'Cookbook',
              position: 2,
            },
            {
              '@type': 'ListItem',
              item: 'https://agenticcoding.jesusgraterol.dev/cookbook/plan-a-feature/',
              name: 'Plan a feature',
              position: 3,
            },
          ],
        },
      ],
    });
  });

  test('describes a collection as part of the website', () => {
    expect(
      buildStructuredData({
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Cookbook', path: '/cookbook/' },
        ],
        canonicalUrl: 'https://agenticcoding.jesusgraterol.dev/cookbook/',
        description: 'Practical workflows for coding agents.',
        title: 'Techniques, not magic prompts.',
        type: 'collection',
      }),
    ).toMatchObject({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/#webpage',
          '@type': 'CollectionPage',
          isPartOf: {
            '@id': 'https://agenticcoding.jesusgraterol.dev/#website',
            '@type': 'WebSite',
          },
          name: 'Techniques, not magic prompts.',
        },
        {
          '@id': 'https://agenticcoding.jesusgraterol.dev/cookbook/#breadcrumb',
          '@type': 'BreadcrumbList',
        },
      ],
    });
  });
});
