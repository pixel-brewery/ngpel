// #region Imports

import { inject, Injectable } from '@angular/core';
import { QUICK_CREATE_ITEM_TOKEN, QUICK_CREATE_SOURCE_TOKEN } from './quickCreateTokens';
import type { IQuickCreateItem } from './IQuickCreateItem';
import type { IQuickCreateItemSource } from './IQuickCreateItemSource';

// #endregion

/**
 * Resolves and executes contextual create actions registered by feature modules.
 *
 * @public
 */
@Injectable()
export class QuickCreateManager {
    // #region Fields

    private readonly _staticItems: ReadonlyArray<IQuickCreateItem>;
    private readonly _sources: ReadonlyArray<IQuickCreateItemSource>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `QuickCreateManager` class.
     *
     * @public
     */
    public constructor() {
        this._staticItems = (inject<ReadonlyArray<ReadonlyArray<IQuickCreateItem>>>(QUICK_CREATE_ITEM_TOKEN, { optional: true }) ?? []).flat();
        this._sources = inject<ReadonlyArray<IQuickCreateItemSource>>(QUICK_CREATE_SOURCE_TOKEN, { optional: true }) ?? [];
    }

    // #endregion

    // #region Properties

    /**
     * Gets all registered actions that the current user is allowed to execute.
     * Dynamic sources are resolved for each read so permissions and translations stay current.
     *
     * @public
     * @readonly
     */
    public get items(): ReadonlyArray<IQuickCreateItem> {
        const dynamicItems = this._sources.flatMap((source) => source.getItems());
        const allItems = [...this._staticItems, ...dynamicItems];
        const itemIds = new Set<string>();

        return allItems.filter((item) => {
            if (itemIds.has(item.id)) {
                throw new Error(`Duplicate quick-create item id: "${item.id}".`);
            }

            itemIds.add(item.id);
            return item.canExecute();
        });
    }

    // #endregion

    // #region Methods

    /**
     * Resolves an executable create action by its stable identifier.
     *
     * @param itemId - Stable identifier of the action to resolve.
     * @returns The permitted action, or `undefined` when it is unavailable.
     *
     * @public
     */
    public getItem(itemId: string): IQuickCreateItem | undefined {
        return this.items.find((item) => item.id === itemId);
    }

    /**
     * Resolves the permitted action registered for a navigation item.
     *
     * @param navigationItemKey - Feature-owned navigation item key.
     * @returns The permitted action, or `undefined` when no action is registered or available.
     *
     * @public
     */
    public getItemForNavigation(navigationItemKey: string): IQuickCreateItem | undefined {
        const items = this.items.filter((item) => item.navigationItemKey === navigationItemKey);

        if (items.length > 1) {
            throw new Error(`Duplicate quick-create navigation registration: "${navigationItemKey}".`);
        }

        return items[0];
    }

    /**
     * Executes the permitted create action identified by the navigation item.
     *
     * @param itemId - Stable identifier of the action to execute.
     *
     * @public
     */
    public async execute(itemId: string): Promise<void> {
        const item = this.getItem(itemId);

        if (item === undefined) {
            throw new Error(`Quick-create item is unavailable: "${itemId}".`);
        }

        await item.execute();
    }

    // #endregion
}
