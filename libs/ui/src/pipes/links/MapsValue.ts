// #region Imports

import type { IMapsAddress } from './IMapsAddress';

// #endregion

/**
 * Everything {@link MapsPipe} can turn into a map query: a structured address or a single line of
 * address text.
 *
 * @public
 */
export type MapsValue = IMapsAddress | string;
