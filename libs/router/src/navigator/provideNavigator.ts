// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Navigator } from './Navigator';
import { NavigatorJournal } from './NavigatorJournal';

// #endregion

/**
 * Registers {@link Navigator} and its {@link NavigatorJournal}. Both are environment-scoped, so
 * the journal spans the whole application while its subscriptions end with the injector.
 *
 * @public
 * @returns Environment providers for the application composition root.
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *     providers: [provideRouter(routes), provideNavigator()]
 * };
 * ```
 */
export function provideNavigator(): EnvironmentProviders {
    return makeEnvironmentProviders([NavigatorJournal, Navigator]);
}
