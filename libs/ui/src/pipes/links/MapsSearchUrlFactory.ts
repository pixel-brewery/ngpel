/**
 * Builds the URL of a map search for an already assembled address query.
 *
 * @public
 * @param query The address query, not yet URL-encoded.
 * @returns The URL that opens the map search.
 */
export type MapsSearchUrlFactory = (query: string) => string;
