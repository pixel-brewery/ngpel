// #region Imports

import type { ReactiveCacheChangedReason } from './ReactiveCacheChangedReason';

// #endregion

/**
 * Describes a single change event emitted by a {@link ReactiveCacheRegistrar}.
 *
 * @public
 */
export interface IReactiveCacheChange<TValue> {
    // #region Properties

    /**
     * The reason for the change.
     */
    readonly reason: ReactiveCacheChangedReason;

    /**
     * The current items in the cache after the change.
     */
    readonly items: ReadonlyArray<TValue>;

    // #endregion
}
