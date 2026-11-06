// #region Imports

import type { IFeature } from '@pixel-brewery/ngpel-core';
import { type UpdateFeatureKind } from '../provider/UpdateFeatureKind';
import { withUpdateSource } from '../provider/withUpdateSource';
import { ServiceWorkerUpdateSource } from './ServiceWorkerUpdateSource';

// #endregion

/**
 * Registers the {@link ServiceWorkerUpdateSource} as the update source. The application must also
 * call `provideServiceWorker()` from `@angular/service-worker`.
 *
 * @public
 */
export function withServiceWorkerUpdateSource(): IFeature<UpdateFeatureKind> {
    return withUpdateSource('serviceWorker', ServiceWorkerUpdateSource);
}
