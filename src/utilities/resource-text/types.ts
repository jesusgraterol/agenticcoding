import type { CollectionEntry } from 'astro:content';

// canonical resource payload returned to rendered pages and raw endpoints.
export interface IResourcePayload {
  entry: CollectionEntry<'resources'>;
  text: string;
}
