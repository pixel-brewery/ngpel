// #region Imports

import type { LoadingRef } from '../refs/LoadingRef';
import type { LoadingRefSource } from './LoadingRefSource';

// #endregion

/**
 * Narrows a {@link LoadingRefSource} to the {@link LoadingRef} an asynchronous command should drive.
 * Internal to the package; not part of the public barrel.
 *
 * @param source The ref itself, an owner exposing `loadingRef`, or `undefined`.
 * @returns The loading ref to drive, or `undefined` when none was given.
 */
export function resolveLoadingRef(source: LoadingRefSource | undefined): LoadingRef | undefined {
    if (source === undefined) {
        return undefined;
    }

    return 'loadingRef' in source ? source.loadingRef : source;
}
