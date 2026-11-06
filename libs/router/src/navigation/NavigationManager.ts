// #region Imports

import { computed, DestroyRef, inject, Injectable, type Signal, signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { INavigationGuard } from './INavigationGuard';
import type { INavItem } from './INavItem';
import { mergeNavItems } from './mergeNavItems';
import { NAVIGATION_GUARD_TOKEN } from './NAVIGATION_GUARD_TOKEN';
import { NAVIGATION_ITEM_TOKEN } from './NAVIGATION_ITEM_TOKEN';
import { NavigationHandleDispatcher } from './NavigationHandleDispatcher';
import { parseHandle } from './parseHandle';
import { sortByOrder } from './sortByOrder';

// #endregion

/**
 * The signal-based navigation registry: it collects every contributed {@link INavItem}, runs the
 * registered {@link INavigationGuard}s over them, indexes the result by key, region and parent, and
 * exposes it as signals so hosts re-render on their own.
 *
 * Guard evaluation is asynchronous, so {@link NavigationManager.isReady} reports whether the
 * current evaluation has completed. Whenever a guard's `stateChanges` fires — a sign-in, a
 * sign-out, a permission refresh — the registry is cleared immediately and evaluated again; a
 * monotonic registration version makes a slower, outdated evaluation discard its result instead of
 * restoring the navigation of a previous user.
 *
 * Registered by `provideNavigation(...)`.
 *
 * @public
 */
@Injectable()
export class NavigationManager {
    // #region Fields

    private readonly _dispatcher: NavigationHandleDispatcher = inject(NavigationHandleDispatcher);
    private readonly _guards: ReadonlyArray<INavigationGuard>;
    private readonly _sourceItems: ReadonlyArray<INavItem>;
    private readonly _items = signal<ReadonlyMap<string, INavItem>>(new Map());
    private readonly _parentOf = signal<ReadonlyMap<string, string>>(new Map());
    private readonly _childrenOf = signal<ReadonlyMap<string, ReadonlyArray<string>>>(new Map());
    private readonly _isReady = signal<boolean>(false);
    private readonly _all: Signal<ReadonlyArray<INavItem>> = computed((): ReadonlyArray<INavItem> => sortByOrder([...this._items().values()]));
    private readonly _roots: Signal<ReadonlyArray<INavItem>> = computed((): ReadonlyArray<INavItem> => {
        const parentOf = this._parentOf();

        return sortByOrder([...this._items().values()].filter((item): boolean => !parentOf.has(item.key)));
    });
    private _registrationVersion = 0;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `NavigationManager` class.
     *
     * @public
     */
    public constructor() {
        const destroyRef = inject(DestroyRef);

        this._guards = inject(NAVIGATION_GUARD_TOKEN, { optional: true }) ?? [];
        this._sourceItems = inject(NAVIGATION_ITEM_TOKEN, { optional: true })?.flat() ?? [];

        for (const item of this._sourceItems) {
            validateNavItem(item);
        }

        this.rebuildNavigation();

        const subscriptions = this._guards
            .map((guard): Observable<unknown> | undefined => guard.stateChanges)
            .filter((stateChanges): stateChanges is Observable<unknown> => stateChanges !== undefined)
            .map((stateChanges) => stateChanges.subscribe((): void => this.rebuildNavigation()));

        if (subscriptions.length > 0) {
            destroyRef.onDestroy((): void => {
                for (const subscription of subscriptions) {
                    subscription.unsubscribe();
                }
            });
        }
    }

    // #endregion

    // #region Properties

    /**
     * Whether the current guard evaluation has completed. It drops back to `false` while the
     * registry is rebuilt, so a host can hold its skeleton instead of flashing an empty menu.
     *
     * @public
     * @readonly
     */
    public get isReady(): Signal<boolean> {
        return this._isReady.asReadonly();
    }

    /**
     * Every registered item by key.
     *
     * @public
     * @readonly
     */
    public get items(): Signal<ReadonlyMap<string, INavItem>> {
        return this._items.asReadonly();
    }

    /**
     * Every registered item, sorted by order.
     *
     * @public
     * @readonly
     */
    public get all(): Signal<ReadonlyArray<INavItem>> {
        return this._all;
    }

    /**
     * Every item without a registered parent, sorted by order.
     *
     * @public
     * @readonly
     */
    public get roots(): Signal<ReadonlyArray<INavItem>> {
        return this._roots;
    }

    // #endregion

    // #region Methods

    /**
     * Creates a signal of the items of one region, sorted by order.
     *
     * @public
     * @param region The region, for example `'main'`.
     * @returns The region's items.
     */
    public byRegion(region: INavItem['region']): Signal<ReadonlyArray<INavItem>> {
        return computed((): ReadonlyArray<INavItem> => sortByOrder([...this._items().values()].filter((item): boolean => item.region === region)));
    }

    /**
     * Creates a signal of the items of one region that have no registered parent, sorted by order.
     *
     * @public
     * @param region The region, for example `'main'`.
     * @returns The region's root items.
     */
    public rootsByRegion(region: INavItem['region']): Signal<ReadonlyArray<INavItem>> {
        return computed((): ReadonlyArray<INavItem> => {
            const parentOf = this._parentOf();

            return sortByOrder([...this._items().values()].filter((item): boolean => item.region === region && !parentOf.has(item.key)));
        });
    }

    /**
     * Creates a signal of one item.
     *
     * @public
     * @param key The item key.
     * @returns The item, or `undefined` while it is not registered.
     */
    public item(key: string): Signal<INavItem | undefined> {
        return computed((): INavItem | undefined => this._items().get(key));
    }

    /**
     * Creates a signal of an item's parent.
     *
     * @public
     * @param childKey The child's key.
     * @returns The parent, or `undefined` for a root item.
     */
    public parent(childKey: string): Signal<INavItem | undefined> {
        return computed((): INavItem | undefined => {
            const parentKey = this._parentOf().get(childKey);

            return parentKey === undefined ? undefined : this._items().get(parentKey);
        });
    }

    /**
     * Creates a signal of an item's children, sorted by order.
     *
     * @public
     * @param parentKey The parent's key.
     * @returns The children.
     */
    public children(parentKey: string): Signal<ReadonlyArray<INavItem>> {
        return computed((): ReadonlyArray<INavItem> => {
            const childKeys = this._childrenOf().get(parentKey) ?? [];
            const items = this._items();

            return sortByOrder(childKeys.map((childKey): INavItem | undefined => items.get(childKey)).filter((item): item is INavItem => item !== undefined));
        });
    }

    /**
     * Creates a signal telling whether an item is registered.
     *
     * @public
     * @param key The item key.
     * @returns Whether the item is registered.
     */
    public has(key: string): Signal<boolean> {
        return computed((): boolean => this._items().has(key));
    }

    /**
     * Executes an item's handle.
     *
     * @public
     * @param keyOrItem The item, or the key of a registered item.
     * @returns A promise that settles when the handle has been executed.
     * @throws Error when the key is not registered, or the handle cannot be executed.
     */
    public async execute(keyOrItem: string | INavItem): Promise<void> {
        const item = typeof keyOrItem === 'string' ? this._items().get(keyOrItem) : keyOrItem;

        if (item === undefined) {
            throw new Error(`[NavigationManager] Navigation item "${String(keyOrItem)}" is not registered.`);
        }

        await this._dispatcher.execute(item);
    }

    /**
     * Executes an item's handle, reporting failure instead of throwing.
     *
     * @public
     * @param keyOrItem The item, or the key of a registered item.
     * @returns Whether the handle was executed.
     */
    public async tryExecute(keyOrItem: string | INavItem): Promise<boolean> {
        try {
            await this.execute(keyOrItem);

            return true;
        } catch {
            return false;
        }
    }

    /**
     * Clears the registry and evaluates every contributed item again. The version stamp makes an
     * outdated evaluation discard its result.
     */
    private rebuildNavigation(): void {
        const registrationVersion = ++this._registrationVersion;

        this._items.set(new Map());
        this._parentOf.set(new Map());
        this._childrenOf.set(new Map());
        this._isReady.set(false);

        void this.registerAsync(this._sourceItems, registrationVersion);
    }

    /**
     * Runs the guards over the contributed items and publishes the resulting indices.
     */
    private async registerAsync(items: ReadonlyArray<INavItem>, registrationVersion: number): Promise<void> {
        const allowedItems = await this.applyGuards(items);
        const itemsMap = new Map<string, INavItem>();

        for (const item of allowedItems) {
            const registered = itemsMap.get(item.key);
            itemsMap.set(item.key, registered === undefined ? item : mergeNavItems(registered, item));
        }

        const { parentOf, childrenOf } = buildRelations(allowedItems, itemsMap);

        if (registrationVersion !== this._registrationVersion) {
            return;
        }

        this._items.set(itemsMap);
        this._parentOf.set(parentOf);
        this._childrenOf.set(childrenOf);
        this._isReady.set(true);
    }

    /**
     * Passes every item through the guard chain; a guard receives the previous guard's result.
     */
    private async applyGuards(items: ReadonlyArray<INavItem>): Promise<ReadonlyArray<INavItem>> {
        const allowedItems: INavItem[] = [];

        for (const item of items) {
            let allowed: INavItem | null = item;

            for (const guard of this._guards) {
                allowed = await guard.canRegister(allowed);

                if (allowed === null) {
                    break;
                }
            }

            if (allowed !== null) {
                allowedItems.push(allowed);
            }
        }

        return allowedItems;
    }

    // #endregion
}

/**
 * Fails fast on a malformed item: a missing key or label, or an unparsable handle, is a
 * programming error and not something a host can render around. Contributions are checked while
 * the manager is constructed, so the error surfaces at composition time rather than inside an
 * asynchronous guard evaluation nobody awaits.
 */
function validateNavItem(item: INavItem): void {
    if (!item.key || !item.label) {
        throw new Error('[NavigationManager] Invalid navigation item: "key" and "label" are required.');
    }

    if (item.handle !== undefined) {
        parseHandle(item.handle);
    }
}

/**
 * Indexes the parent and children relations. A relation whose counterpart is not registered — most
 * often because a guard removed it — is skipped, which turns the orphan into a root item.
 */
function buildRelations(
    items: ReadonlyArray<INavItem>,
    itemsMap: ReadonlyMap<string, INavItem>,
): { parentOf: ReadonlyMap<string, string>; childrenOf: ReadonlyMap<string, ReadonlyArray<string>> } {
    const parentOf = new Map<string, string>();
    const childrenOf = new Map<string, string[]>();

    const link = (parentKey: string, childKey: string): void => {
        parentOf.set(childKey, parentKey);
        const siblings = childrenOf.get(parentKey) ?? [];

        if (!siblings.includes(childKey)) {
            siblings.push(childKey);
        }

        childrenOf.set(parentKey, siblings);
    };

    for (const item of items) {
        const parentKey = typeof item.parent === 'string' ? item.parent : item.parent?.key;

        if (parentKey !== undefined && itemsMap.has(parentKey)) {
            link(parentKey, item.key);
        }
    }

    for (const item of items) {
        for (const child of item.children ?? []) {
            if (itemsMap.has(child.key) && !parentOf.has(child.key)) {
                link(item.key, child.key);
            }
        }
    }

    const orderedChildrenOf = new Map<string, ReadonlyArray<string>>();
    for (const [parentKey, childKeys] of childrenOf) {
        const children = childKeys.map((childKey): INavItem | undefined => itemsMap.get(childKey)).filter((child): child is INavItem => child !== undefined);

        orderedChildrenOf.set(
            parentKey,
            sortByOrder(children).map((child): string => child.key),
        );
    }

    return { parentOf, childrenOf: orderedChildrenOf };
}
