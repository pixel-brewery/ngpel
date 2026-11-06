// #region Imports

import type { LocalStorageOperation } from './LocalStorageOperation';
import { LocalStorageUnavailableError } from './LocalStorageUnavailableError';

// #endregion

/**
 * Enforces the mutating half of the unavailable-storage policy documented on
 * {@link LocalStorageUnavailableError}: an absent storage is never silently ignored, so no write is
 * lost without the caller noticing. Every mutating surface of this entry point passes through this
 * function, which is what keeps the policy a single decision instead of a per-adapter habit.
 *
 * @internal
 * @param storage The resolved storage, or `null` when storage is unavailable.
 * @param key The storage key of the attempted operation.
 * @param operation The attempted operation.
 * @returns The storage, when it is available.
 * @throws LocalStorageUnavailableError when `storage` is `null`.
 */
export function requireStorage(storage: Storage | null, key: string, operation: LocalStorageOperation): Storage {
    if (storage === null) {
        throw new LocalStorageUnavailableError(key, operation);
    }

    return storage;
}
