// #region Imports

import { Injectable } from '@angular/core';
import { BusyScope } from './BusyScope';

// #endregion

/**
 * Factory service for per-component {@link BusyScope} instances with strict typing.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class BusyScopeService {
    // #region Methods

    /**
     * Creates a strictly typed {@link BusyScope}. Only the provided `states` are allowed.
     *
     * @public
     * @typeParam TState A string union of all allowed state names.
     * @param states The allowed state names for the new scope (use a `const` tuple for best typing).
     * @param options Optional settings (diagnostic `name`).
     * @returns A fully initialized {@link BusyScope}.
     */
    public create<TState extends string>(states: ReadonlyArray<TState>, options?: { readonly name?: string }): BusyScope<TState> {
        return new BusyScope<TState>(states, options?.name);
    }

    // #endregion
}
