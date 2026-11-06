// #region Imports

import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import type { IMapConfiguration } from './IMapConfiguration';
import { MAP_CONFIGURATION } from './MapConfigurationToken';

// #endregion

/**
 * Registers application-owned Maps configuration without loading Google's SDK.
 *
 * @param configuration - Public browser key and optional Maps localization.
 * @returns Application-level providers for maps and Places consumers.
 * @public
 */
export function provideMap(configuration: IMapConfiguration): EnvironmentProviders {
    return makeEnvironmentProviders([{ provide: MAP_CONFIGURATION, useValue: configuration }]);
}
