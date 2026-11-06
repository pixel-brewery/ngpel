// #region Imports

import type { Provider } from '@angular/core';
import type { FeatureKind } from './FeatureKind';
import type { IFeature } from './IFeature';
import type { IFeatureOptions } from './IFeatureOptions';

// #endregion

/**
 * Factory to create a typed feature from metadata and static providers.
 *
 * @public
 * @param id Stable unique id (within its kind).
 * @param kind Kind discriminator (branded).
 * @param providers Providers contributed by the feature.
 * @param options Composition options (defaults: { multi: false }).
 * @returns The created feature.
 */
export function createFeature<TKind extends string>(
    id: string,
    kind: FeatureKind<TKind>,
    providers: ReadonlyArray<Provider>,
    options: Readonly<IFeatureOptions> = { multi: false },
): IFeature<TKind> {
    const safeProviders: Provider[] = [...providers];
    const safeOptions: Readonly<IFeatureOptions> = Object.freeze({ multi: options.multi ?? false });

    return Object.freeze({
        id,
        kind,
        options: safeOptions,
        provide: (): ReadonlyArray<Provider> => safeProviders,
    });
}
