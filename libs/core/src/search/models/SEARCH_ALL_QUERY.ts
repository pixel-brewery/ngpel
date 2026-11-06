/**
 * Sentinel query understood by `SearchManager.getCommands()`, `SearchManager.search()` and
 * `SearchManager.query()`: it asks for the complete catalogue instead of a filtered match. The
 * manager never forwards the sentinel — command sources and search providers are called with an
 * empty query, which is their documented "return everything you have" input.
 *
 * @public
 */
export const SEARCH_ALL_QUERY = '*';
