// #region Imports

import type { Provider } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { BROWSER_STORAGE } from './BROWSER_STORAGE';
import { type BrowserStorageFeatureKind, BrowserStorageFeatureKinds } from './BrowserStorageFeatureKind';

// #endregion

/**
 * Binds `BROWSER_STORAGE` to a specific storage implementation. Pass a factory when the storage
 * must be resolved lazily or needs the injection context (for example a Capacitor bridge); pass
 * `null` to declare storage unavailable.
 *
 * Binding `null` does not silently disable persistence; it declares its absence. Reads then degrade
 * to `undefined` and every mutation throws `LocalStorageUnavailableError`, which carries the entry
 * point's single unavailable-storage policy.
 *
 * @public
 * @param storage The storage, `null`, or a factory producing either.
 * @returns The storage feature for `provideBrowserStorage()`.
 */
export function withStorage(storage: Storage | null | (() => Storage | null)): IFeature<BrowserStorageFeatureKind> {
    const provider: Provider =
        typeof storage === 'function' ? { provide: BROWSER_STORAGE, useFactory: storage } : { provide: BROWSER_STORAGE, useValue: storage };

    return createFeature('storage', BrowserStorageFeatureKinds.Storage, [provider]);
}
