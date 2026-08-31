// machine-readable alternate document exposed from an HTML page
export interface IAlternateDocument {
  href: string;
  mediaType: 'text/markdown' | 'text/plain';
  title: string;
}

// one visible hierarchy step shared with breadcrumb structured data
export interface IBreadcrumbItem {
  name: string;
  path: string;
}

// structured page categories supported by the shared metadata layout
export type IStructuredDataType = 'article' | 'collection' | 'website';

// values required to build one truthful page-level JSON-LD object
export interface IStructuredDataOptions {
  articleSection?: string | undefined;
  breadcrumbs?: readonly IBreadcrumbItem[] | undefined;
  canonicalUrl: string;
  description: string;
  publishedAt?: Date | undefined;
  title: string;
  type: IStructuredDataType;
  updatedAt?: Date | undefined;
}
