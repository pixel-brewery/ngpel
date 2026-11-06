// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

/**
 * Resolves a key through a lookup table, which replaces the `@switch` ladders a template grows once
 * a status, a severity or a kind has more than two branches:
 * `[icon]="ticket.status | ngpLookup: statusIcons : 'help'"`.
 *
 * A key that the table does not hold — including `null` and `undefined` — yields the fallback, so a
 * value the backend adds later cannot render as an empty cell.
 *
 * @public
 */
@Pipe({ name: 'ngpLookup' })
export class LookupPipe implements PipeTransform {
    // #region Methods

    /**
     * Resolves `key` through `table`.
     *
     * @public
     * @param key The key to resolve.
     * @param table The lookup table.
     * @param fallback The value for a key the table does not hold.
     * @returns The entry of `key`, or `fallback`.
     */
    public transform<TKey extends PropertyKey, TValue>(key: null | TKey | undefined, table: Readonly<Partial<Record<TKey, TValue>>>, fallback: TValue): TValue {
        const value = key === null || key === undefined ? undefined : table[key];

        return value === undefined ? fallback : value;
    }

    // #endregion
}
