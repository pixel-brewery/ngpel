// #region Imports

import { InjectionToken } from '@angular/core';
import type { ISearchConfig } from './ISearchConfig';

// #endregion

/**
 * Configuration of the search engine, published by `provideSearch(config, ...)`. Both the manager
 * and every session read it optionally, so the engine also works without it.
 *
 * @public
 */
export const SEARCH_CONFIG = new InjectionToken<ISearchConfig>('NGPEL_SEARCH_CONFIG');
