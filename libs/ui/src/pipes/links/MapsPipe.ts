// #region Imports

import { inject, Pipe, type PipeTransform } from '@angular/core';
import { MAPS_SEARCH_URL_FACTORY } from './MAPS_SEARCH_URL_FACTORY';
import type { MapsSearchUrlFactory } from './MapsSearchUrlFactory';
import type { MapsValue } from './MapsValue';

// #endregion

/**
 * Turns an address into a map search link: `[href]="site.address | ngpMaps: site.name"`.
 *
 * Both a single line of address text and a structured address are accepted; the parts of a
 * structured address are joined the way a postal address reads, and empty parts are dropped so no
 * query carries stray separators. An address that holds nothing yields `null`, so the template can
 * hide the link. The linked map service comes from {@link MAPS_SEARCH_URL_FACTORY}.
 *
 * @public
 */
@Pipe({ name: 'ngpMaps' })
export class MapsPipe implements PipeTransform {
    // #region Fields

    private readonly _createUrl: MapsSearchUrlFactory = inject(MAPS_SEARCH_URL_FACTORY);

    // #endregion

    // #region Methods

    /**
     * Builds the map search URL of `value`.
     *
     * @public
     * @param value The address.
     * @param placeName The name of the place, prepended to the query so the map can match a
     * well-known location before its street.
     * @returns The map search URL, or `null` when the address holds nothing.
     */
    public transform(value: MapsValue | null | undefined, placeName?: null | string): null | string {
        const query = createQuery(value, placeName);

        return query === '' ? null : this._createUrl(query);
    }

    // #endregion
}

/**
 * Assembles the address query of a value.
 *
 * @param value The address.
 * @param placeName The name of the place.
 * @returns The query, or an empty string when the address holds nothing.
 */
function createQuery(value: MapsValue | null | undefined, placeName?: null | string): string {
    if (typeof value === 'string') {
        return joinNonEmpty([placeName, value]);
    }

    if (!value) {
        return joinNonEmpty([placeName]);
    }

    return joinNonEmpty([placeName, joinNonEmpty([value.street, value.streetNumber], ' '), joinNonEmpty([value.postalCode, value.city], ' '), value.country]);
}

/**
 * Joins the parts that carry text.
 *
 * @param values The parts.
 * @param separator The separator between two parts.
 * @returns The joined text.
 */
function joinNonEmpty(values: ReadonlyArray<null | string | undefined>, separator = ', '): string {
    return values
        .map((value) => value?.trim())
        .filter((value): value is string => value !== undefined && value !== '')
        .join(separator);
}
