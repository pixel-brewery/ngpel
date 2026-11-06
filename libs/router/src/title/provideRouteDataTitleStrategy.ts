// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders, type Provider } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import type { IRouteTitleOptions } from './IRouteTitleOptions';
import { ROUTE_TITLE_OPTIONS } from './ROUTE_TITLE_OPTIONS';
import { RouteDataTitleStrategy } from './RouteDataTitleStrategy';

// #endregion

/**
 * Registers {@link RouteDataTitleStrategy} as the application's `TitleStrategy`. Translation of
 * the title segments stays a separate seam: bind `ROUTE_TITLE_TEXT_RESOLVER` when route data holds
 * translation keys.
 *
 * @public
 * @param options The application name, separator and route data keys; omitted members keep their
 * neutral defaults.
 * @returns Environment providers for the application composition root.
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *     providers: [provideRouter(routes), provideRouteDataTitleStrategy({ appName: 'Contoso' })]
 * };
 * ```
 */
export function provideRouteDataTitleStrategy(options?: IRouteTitleOptions): EnvironmentProviders {
    const providers: Provider[] = [RouteDataTitleStrategy, { provide: TitleStrategy, useExisting: RouteDataTitleStrategy }];

    if (options !== undefined) {
        providers.push({ provide: ROUTE_TITLE_OPTIONS, useValue: options });
    }

    return makeEnvironmentProviders(providers);
}
