/** Formats a date as an ISO calendar date without inventing time precision. */
export const formatIsoDate = (date: Date): string => date.toISOString().slice(0, 10);
