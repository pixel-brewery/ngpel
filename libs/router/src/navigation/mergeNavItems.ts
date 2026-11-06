// #region Imports

import type { INavItem } from './INavItem';
import { sortByOrder } from './sortByOrder';

// #endregion

/**
 * A child as declared inline on a navigation item.
 */
type NavItemChild = NonNullable<INavItem['children']>[number];

/**
 * Merges a repeated contribution of an already registered key into the first registration, so
 * several feature libraries can fill one shared group.
 *
 * The merge is deliberately conservative: every scalar is first-wins so an established entry keeps
 * its identity, `order` takes the lower value so the group floats to its earliest requested slot,
 * and only `capabilities` and `children` actually combine.
 *
 * @internal
 * @param registered The contribution registered first.
 * @param addition The repeated contribution.
 * @returns The merged item.
 */
export function mergeNavItems(registered: INavItem, addition: INavItem): INavItem {
    const children = mergeChildren(registered.children, addition.children);

    return {
        ...registered,
        icon: registered.icon ?? addition.icon,
        handle: registered.handle ?? addition.handle,
        region: registered.region ?? addition.region,
        badge: registered.badge ?? addition.badge,
        variant: registered.variant ?? addition.variant,
        parent: registered.parent ?? addition.parent,
        data: registered.data ?? addition.data,
        order: Math.min(registered.order ?? 0, addition.order ?? 0),
        capabilities: mergeCapabilities(registered.capabilities, addition.capabilities),
        children: children.length > 0 ? children : undefined,
    };
}

/**
 * Unions two OR-linked capability lists. An absent or empty list means unrestricted and therefore
 * makes the merged item unrestricted too, instead of narrowing it to the other contributor's list.
 */
function mergeCapabilities(registered: ReadonlyArray<string> | undefined, addition: ReadonlyArray<string> | undefined): ReadonlyArray<string> | undefined {
    if (registered === undefined || registered.length === 0 || addition === undefined || addition.length === 0) {
        return undefined;
    }

    return [...new Set<string>([...registered, ...addition])];
}

/**
 * Concatenates two child lists de-duplicated by key (first-wins) and sorted by `order`, because
 * hosts render `children` in array order.
 */
function mergeChildren(registered: ReadonlyArray<NavItemChild> = [], addition: ReadonlyArray<NavItemChild> = []): ReadonlyArray<NavItemChild> {
    const children = new Map<string, NavItemChild>();

    for (const child of [...registered, ...addition]) {
        if (!children.has(child.key)) {
            children.set(child.key, child);
        }
    }

    return sortByOrder([...children.values()]);
}
