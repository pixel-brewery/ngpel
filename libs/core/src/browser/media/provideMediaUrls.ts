// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import type { MediaUrlFeatureKind } from './MediaUrlFeatureKind';
import { MediaUrlResolver } from './MediaUrlResolver';

// #endregion

/**
 * Configures media URL resolution: registers a {@link MediaUrlResolver} scoped to the composition
 * root together with the origin contributed by the given features.
 *
 * @public
 * @param features Origin features such as `withApiOrigin(...)`.
 * @returns Environment providers for the application or route composition root.
 * @throws Error when two origin features are given.
 *
 * @example
 * ```typescript
 * provideMediaUrls(withApiOrigin(() => inject(ENV)['API_URL'] ?? ''))
 * ```
 */
export function provideMediaUrls(...features: ReadonlyArray<IFeature<MediaUrlFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([MediaUrlResolver], features));
}
