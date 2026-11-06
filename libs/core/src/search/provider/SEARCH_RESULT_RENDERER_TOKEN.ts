// #region Imports

import { InjectionToken } from '@angular/core';
import type { ISearchResultRendererEntry } from '../models/ISearchResultRendererEntry';

// #endregion

/**
 * Multi-provider token for custom result renderers. Every `withSearchRenderers()` feature
 * contributes one batch of entries, so the injected value is a list of batches which the surface
 * flattens.
 *
 * @public
 */
export const SEARCH_RESULT_RENDERER_TOKEN = new InjectionToken<ReadonlyArray<ReadonlyArray<ISearchResultRendererEntry>>>('NGPEL_SEARCH_RESULT_RENDERERS');
