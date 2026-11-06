// #region Imports

import type { SignalCacheChangedReason } from './SignalCacheChangedReason';

// #endregion

/**
 * Describes a single change event emitted by a {@link SignalCacheRegistrar}.
 *
 * @public
 */
export interface ISignalCacheChange<TValue> {
    // #region Properties

    /**
     * The reason for the change.
     */
    readonly reason: SignalCacheChangedReason;

    /**
     * The current items in the cache after the change.
     */
    readonly items: ReadonlyArray<TValue>;

    // #endregion
}
