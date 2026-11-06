// #region Imports

import type { Provider } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { INavItem } from '../INavItem';
import { NAVIGATION_ITEM_TOKEN } from '../NAVIGATION_ITEM_TOKEN';
import type { IWithNavigationItemsOptions } from './IWithNavigationItemsOptions';
import { type NavigationFeatureKind, NavigationFeatureKinds } from './NavigationFeatureKind';

// #endregion

/**
 * Contributes navigation items. A feature library exports one such contribution; the composition
 * root passes it to `provideNavigation(...)` and decides its `order` there.
 *
 * @public
 * @param options The contribution id, its items and their default order.
 * @returns A feature for `provideNavigation(...)`.
 *
 * @example
 * ```typescript
 * export function withUserNavigation(order?: number): IFeature<NavigationFeatureKind> {
 *     return withNavigationItems({
 *         id: 'user-navigation',
 *         order,
 *         items: { key: 'users', label: 'app.nav.users', icon: 'people', region: 'main', handle: 'route:/main/users' }
 *     });
 * }
 * ```
 */
export function withNavigationItems(options: IWithNavigationItemsOptions): IFeature<NavigationFeatureKind> {
    const contributed: ReadonlyArray<INavItem> = Array.isArray(options.items) ? options.items : [options.items];
    const items: ReadonlyArray<INavItem> = contributed.map((item): INavItem =>
        options.order === undefined || item.order !== undefined ? item : { ...item, order: options.order },
    );
    const provider: Provider = { provide: NAVIGATION_ITEM_TOKEN, useValue: items, multi: true };

    return createFeature(options.id, NavigationFeatureKinds.Item, [provider], { multi: true });
}
