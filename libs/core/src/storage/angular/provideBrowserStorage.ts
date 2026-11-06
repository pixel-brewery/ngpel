// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import type { BrowserStorageFeatureKind } from './BrowserStorageFeatureKind';

// #endregion

/**
 * Composes the browser storage seam. Without features `BROWSER_STORAGE` keeps its root default
 * (the window's `localStorage`); `withStorage(...)` substitutes another implementation. Two storage
 * features in one call raise the kernel's feature-conflict error.
 *
 * @public
 * @param features The storage features.
 * @returns Environment providers for the composition root.
 */
export function provideBrowserStorage(...features: ReadonlyArray<IFeature<BrowserStorageFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([], features));
}
