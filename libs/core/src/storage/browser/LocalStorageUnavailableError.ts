// #region Imports

import type { LocalStorageOperation } from './LocalStorageOperation';

// #endregion

/**
 * Error raised when a storage operation cannot be performed because browser storage is unavailable:
 * outside a browser (server-side rendering), when the window denies the storage accessor, or when
 * the host bound `BROWSER_STORAGE` to `null` on purpose.
 *
 * This error carries the single unavailable-storage policy of `@pixel-brewery/ngpel-core/storage`.
 * Every surface of the entry point — `localStorageSignal()` and every `IUserPreferenceStorage`
 * adapter — follows it:
 *
 * - Implicit reads degrade. A signal starts out `undefined`, `IUserPreferenceStorage.read()` returns
 *   `undefined` and cross-document listeners are never attached, so an application still renders
 *   and behaves as if nothing had been persisted yet.
 * - Mutations and explicit re-reads fail loud. `set()`, `update()`, `clear()`, `refresh()`,
 *   `write()` and `remove()` throw this error instead of dropping the value, because a silently
 *   discarded write is data loss the caller cannot detect.
 *
 * Hosts for which persistence is optional catch it at the call site; hosts that require persistence
 * let it surface. Hosts that render without storage on purpose bind
 * `provideBrowserStorage(withStorage(null))` and keep their writes out of that code path.
 *
 * @public
 */
export class LocalStorageUnavailableError extends Error {
    // #region Fields

    private readonly _key: string;
    private readonly _operation: LocalStorageOperation;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `LocalStorageUnavailableError` class.
     *
     * @public
     * @param key The storage key of the failed operation.
     * @param operation The operation that failed.
     */
    public constructor(key: string, operation: LocalStorageOperation) {
        super(`Cannot ${operation} storage key "${key}" because browser storage is unavailable in the current execution context.`);
        this.name = 'LocalStorageUnavailableError';
        this._key = key;
        this._operation = operation;
    }

    // #endregion

    // #region Properties

    /**
     * The storage key of the failed operation.
     *
     * @public
     */
    public get key(): string {
        return this._key;
    }

    /**
     * The operation that failed.
     *
     * @public
     */
    public get operation(): LocalStorageOperation {
        return this._operation;
    }

    // #endregion
}
