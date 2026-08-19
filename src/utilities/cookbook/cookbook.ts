import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Loads published cookbook entries in their explicit editorial order.
 * @returns A promise that resolves to ordered public recipes.
 */
export const loadPublishedRecipes = async (): Promise<CollectionEntry<'cookbook'>[]> => {
  const recipes = await getCollection('cookbook', ({ data }) => !data.draft);

  return recipes.toSorted(
    (firstRecipe, secondRecipe) => firstRecipe.data.order - secondRecipe.data.order,
  );
};
