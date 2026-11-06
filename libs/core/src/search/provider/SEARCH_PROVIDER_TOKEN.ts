// #region Imports

import { InjectionToken } from '@angular/core';
import type { ISearchProvider } from '../models/ISearchProvider';

// #endregion

/**
 * Multi-provider token for semantic search providers. Every registered provider class contributes
 * one batch, so the injected value is a list of batches which the manager flattens.
 *
 * @public
 */
export const SEARCH_PROVIDER_TOKEN = new InjectionToken<ReadonlyArray<ReadonlyArray<ISearchProvider>>>('NGPEL_SEARCH_PROVIDERS');
