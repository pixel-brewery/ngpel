// #region Imports

import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { IWithSearchRenderersOptions } from './IWithSearchRenderersOptions';
import { SEARCH_RESULT_RENDERER_TOKEN } from './SEARCH_RESULT_RENDERER_TOKEN';
import type { SearchFeatureKind } from './SearchFeatureKind';
import { SearchKinds } from './SearchKinds';

// #endregion

/**
 * Declaratively contributes result renderer components to `provideSearch()`. The feature is
 * multi-capable: every contributing feature composes one `withSearchRenderers()` call.
 *
 * @public
 * @param options The contribution: a stable id plus the renderer entries.
 * @returns The feature to pass to `provideSearch()`.
 *
 * @example
 * ```typescript
 * provideSearch({}, withSearchRenderers({ id: 'crm', entries: [{ id: 'crm.customers', component: CustomerResultView }] }));
 * ```
 */
export function withSearchRenderers(options: IWithSearchRenderersOptions): IFeature<SearchFeatureKind> {
    return createFeature(options.id, SearchKinds.Renderers, [{ provide: SEARCH_RESULT_RENDERER_TOKEN, useValue: options.entries, multi: true }], {
        multi: true,
    });
}
