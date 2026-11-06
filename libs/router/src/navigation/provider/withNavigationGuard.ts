// #region Imports

import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { NAVIGATION_GUARD_TOKEN } from '../NAVIGATION_GUARD_TOKEN';
import type { IWithNavigationGuardOptions } from './IWithNavigationGuardOptions';
import { type NavigationFeatureKind, NavigationFeatureKinds } from './NavigationFeatureKind';

// #endregion

/**
 * Contributes a navigation guard. Guards decide which items a user may see; which capabilities
 * that means stays a product policy.
 *
 * @public
 * @param options The contribution id and the guard class.
 * @returns A feature for `provideNavigation(...)`.
 *
 * @example
 * ```typescript
 * provideNavigation(withNavigationGuard({ id: 'capabilities', guard: CapabilityNavigationGuard }));
 * ```
 */
export function withNavigationGuard(options: IWithNavigationGuardOptions): IFeature<NavigationFeatureKind> {
    return createFeature(options.id, NavigationFeatureKinds.Guard, [{ provide: NAVIGATION_GUARD_TOKEN, useClass: options.guard, multi: true }], {
        multi: true,
    });
}
