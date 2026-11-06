// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The kinds of features `provideNavigation(...)` accepts. Both kinds are multi: any number of
 * feature libraries may contribute items, and any number of policies may guard them.
 *
 * @public
 */
export type NavigationFeatureKind = 'item' | 'guard';

/**
 * The branded kind vocabulary of the navigation entry point.
 *
 * @public
 */
export const NavigationFeatureKinds = {
    Item: featureKind<NavigationFeatureKind>('item'),
    Guard: featureKind<NavigationFeatureKind>('guard'),
} as const satisfies Record<string, FeatureKind<NavigationFeatureKind>>;
