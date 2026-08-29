import { SITE_CONFIG } from '../../site.config.ts';

import type { IBreadcrumbItem, IStructuredDataOptions } from './types.ts';
import { formatIsoDate } from './utilities.ts';

const websiteUrl = new URL('/', SITE_CONFIG.url).toString();
const websiteId = `${websiteUrl}#website`;
const openGraphImageUrl = new URL(SITE_CONFIG.openGraph.image, SITE_CONFIG.url).toString();

// author identity shared by every authored resource
const author = {
  '@type': 'Person',
  name: SITE_CONFIG.author.name,
  url: SITE_CONFIG.author.url,
};

// website reference used to connect page entities to the canonical site
const websiteReference = {
  '@id': websiteId,
  '@type': 'WebSite',
  name: SITE_CONFIG.name,
  url: websiteUrl,
};

/** Builds a breadcrumb entity from the same hierarchy shown on the page. */
const buildBreadcrumbList = (
  breadcrumbs: readonly IBreadcrumbItem[],
  canonicalUrl: string,
): Record<string, unknown> => ({
  '@id': `${canonicalUrl}#breadcrumb`,
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map(({ name, path }, index) => ({
    '@type': 'ListItem',
    item: new URL(path, SITE_CONFIG.url).toString(),
    name,
    position: index + 1,
  })),
});

/** Builds accurate JSON-LD for the supported public page category. */
export const buildStructuredData = ({
  articleSection,
  breadcrumbs,
  canonicalUrl,
  description,
  publishedAt,
  title,
  type,
  updatedAt,
}: IStructuredDataOptions): Record<string, unknown> => {
  if (type === 'website') {
    return {
      '@context': 'https://schema.org',
      '@id': websiteId,
      '@type': 'WebSite',
      author,
      description,
      inLanguage: SITE_CONFIG.language,
      name: SITE_CONFIG.name,
      url: websiteUrl,
    };
  }

  const breadcrumbList =
    breadcrumbs && breadcrumbs.length >= 2
      ? buildBreadcrumbList(breadcrumbs, canonicalUrl)
      : undefined;
  const breadcrumbReference = breadcrumbList
    ? {
        breadcrumb: {
          '@id': `${canonicalUrl}#breadcrumb`,
        },
      }
    : {};
  const pageEntity =
    type === 'collection'
      ? {
          '@id': `${canonicalUrl}#webpage`,
          '@type': 'CollectionPage',
          ...breadcrumbReference,
          description,
          inLanguage: SITE_CONFIG.language,
          isPartOf: websiteReference,
          name: title,
          url: canonicalUrl,
        }
      : {
          '@id': `${canonicalUrl}#article`,
          '@type': 'Article',
          ...(articleSection ? { articleSection } : {}),
          author,
          ...(publishedAt ? { datePublished: formatIsoDate(publishedAt) } : {}),
          ...(updatedAt ? { dateModified: formatIsoDate(updatedAt) } : {}),
          description,
          headline: title,
          image: {
            '@type': 'ImageObject',
            height: SITE_CONFIG.openGraph.height,
            url: openGraphImageUrl,
            width: SITE_CONFIG.openGraph.width,
          },
          inLanguage: SITE_CONFIG.language,
          isPartOf: websiteReference,
          mainEntityOfPage: {
            '@id': canonicalUrl,
            '@type': 'WebPage',
          },
          url: canonicalUrl,
        };

  if (!breadcrumbList) {
    return {
      '@context': 'https://schema.org',
      ...pageEntity,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [pageEntity, breadcrumbList],
  };
};
