// #region Imports

import type { ParamMap, Params } from '@angular/router';

// #endregion

/**
 * Copies a query parameter map into router `Params`, preserving repeated values as arrays so an
 * unrelated multi-valued parameter survives a single-parameter navigation.
 *
 * @internal
 * @param paramMap The query parameter map of the activated route.
 * @returns The copied parameters.
 */
export function copyQueryParams(paramMap: ParamMap): Params {
    const queryParams: Params = {};

    for (const name of paramMap.keys) {
        const values = paramMap.getAll(name);

        if (values.length === 1) {
            queryParams[name] = values[0];
        } else if (values.length > 1) {
            queryParams[name] = values;
        }
    }

    return queryParams;
}
