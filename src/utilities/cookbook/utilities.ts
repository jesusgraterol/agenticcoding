/**
 * Estimates concise recipe reading time from its canonical Markdown body.
 * @param body The recipe Markdown body.
 * @returns The minimum one-minute reading estimate.
 */
export const calculateReadingTime = (body: string): number => {
  const wordCount = body.trim().split(/\s+/u).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 220));
};
