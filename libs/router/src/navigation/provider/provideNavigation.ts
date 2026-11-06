// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { NavigationHandleDispatcher } from '../NavigationHandleDispatcher';
import { NavigationManager } from '../NavigationManager';
import type { NavigationFeatureKind } from './NavigationFeatureKind';

// #endregion

/**
 * Composes the navigation registry: the {@link NavigationManager} and the
 * {@link NavigationHandleDispatcher}, plus every contributed item and guard. Nothing else is pulled
 * in — `route:` and `ext:` handles work out of the box, and `cmd:` handles are enabled by binding
 * an `INavHandleHandler` under `NAV_HANDLE_HANDLER`.
 *
 * @public
 * @param features Contributions from `withNavigationItems(...)` and `withNavigationGuard(...)`.
 * @returns Environment providers for the application composition root.
 * @throws Error when two contributions of the same kind share an id.
 *
 * @example
 * ```typescript
 * provideNavigation(
 *     withNavigationGuard({ id: 'capabilities', guard: CapabilityNavigationGuard }),
 *     withUserNavigation(10),
 *     withSettingsNavigation(90)
 * );
 * ```
 */
export function provideNavigation(...features: ReadonlyArray<IFeature<NavigationFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([NavigationHandleDispatcher, NavigationManager], features));
}
