/**
 * Normalizes a canonical public resource to LF line endings and one final newline.
 * @param sourceText The source text to normalize.
 * @returns The normalized resource text.
 */
export const normalizeResourceText = (sourceText: string): string =>
  `${sourceText.replace(/\r\n?/g, '\n').trimEnd()}\n`;
