// #region Imports

import type { Signal } from '@angular/core';

// #endregion

/**
 * A URL-backed signal. `set()`, `update()` and `clear()` perform a router navigation instead of
 * mutating a local shadow value, so the next signal value always comes from the activated URL and
 * a manual URL edit, a bookmark and the back button all stay authoritative.
 *
 * @typeParam T The typed application value.
 * @public
 */
export type UrlParamSignal<T> = Signal<T | undefined> & {
    // #region Methods

    /**
     * Navigates so that the parameter carries `value`; `undefined` removes it.
     *
     * @param value The new value.
     * @returns The navigation result.
     * @throws TypeError when the codec refuses to serialize the value.
     */
    set(value: T | undefined): Promise<boolean>;

    /**
     * Navigates to the updater's result, computed from the value of the activated URL.
     *
     * @param updater Receives the current value and returns the next one.
     * @returns The navigation result.
     * @throws TypeError when the codec refuses to serialize the value.
     */
    update(updater: (currentValue: T | undefined) => T | undefined): Promise<boolean>;

    /**
     * Navigates so that the parameter is absent.
     *
     * @returns The navigation result.
     */
    clear(): Promise<boolean>;

    // #endregion
};
