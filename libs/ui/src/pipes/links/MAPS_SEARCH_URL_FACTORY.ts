// #region Imports

import { InjectionToken } from '@angular/core';
import type { MapsSearchUrlFactory } from './MapsSearchUrlFactory';

// #endregion

/**
 * The map service {@link MapsPipe} links to. Defaults to the Google Maps search URL; provide a
 * different factory to link to another map provider or to an in-house map view.
 *
 * @example
 * ```typescript
 * providers: [
 *     {
 *         provide: MAPS_SEARCH_URL_FACTORY,
 *         useValue: (query: string): string => `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`
 *     }
 * ]
 * ```
 *
 * @public
 */
export const MAPS_SEARCH_URL_FACTORY = new InjectionToken<MapsSearchUrlFactory>('NGPEL_MAPS_SEARCH_URL_FACTORY', {
    providedIn: 'root',
    factory:
        (): MapsSearchUrlFactory =>
        (query: string): string =>
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
});
