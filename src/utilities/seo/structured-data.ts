import { SITE_CONFIG } from '../../site.config.ts';

import type { IStructuredDataOptions } from './types.ts';

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

/** Builds accurate JSON-LD for the supported public page category. */
export const buildStructuredData = ({
  articleSection,
  canonicalUrl,
  description,
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

  if (type === 'collection') {
    return {
      '@context': 'https://schema.org',
      '@id': `${canonicalUrl}#webpage`,
      '@type': 'CollectionPage',
      description,
      inLanguage: SITE_CONFIG.language,
      isPartOf: websiteReference,
      name: title,
      url: canonicalUrl,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@id': `${canonicalUrl}#article`,
    '@type': 'Article',
    ...(articleSection ? { articleSection } : {}),
    author,
    ...(updatedAt ? { dateModified: updatedAt.toISOString() } : {}),
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
};
