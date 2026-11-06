import { computed, inject, Injectable, type Signal } from '@angular/core';
import type { IViewItemAction } from './IViewItemAction';
import { VIEW_ITEM_ACTIONS } from './VIEW_ITEM_ACTIONS';

/**
 * Resolves the actions contributed by enabled frontend features.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ViewItemActionRegistry {
    private readonly _actions = inject(VIEW_ITEM_ACTIONS, { optional: true }) ?? [];
    private readonly _byId = new Map<string, IViewItemAction>();

    /**
     * Available actions in deterministic menu order.
     *
     * @public
     * @readonly
     */
    public readonly available: Signal<ReadonlyArray<IViewItemAction>> = computed(() =>
        this._actions.filter((action) => action.isAvailable()).sort((left, right) => left.order - right.order || left.id.localeCompare(right.id)),
    );

    public constructor() {
        for (const action of this._actions) {
            if (
                !action ||
                typeof action.id !== 'string' ||
                !action.id.trim() ||
                typeof action.labelKey !== 'string' ||
                !action.labelKey.trim() ||
                typeof action.iconName !== 'string' ||
                !action.iconName.trim() ||
                !Number.isFinite(action.order) ||
                typeof action.isAvailable !== 'function' ||
                typeof action.execute !== 'function' ||
                (action.choices !== undefined && typeof action.choices !== 'function') ||
                this._byId.has(action.id)
            ) {
                throw new Error(`Invalid or duplicate view item action: ${action?.id ?? '<missing>'}`);
            }
            this._byId.set(action.id, action);
        }
    }

    /**
     * Finds one registered action by its feature-owned identity.
     *
     * @param id - Stable action identifier.
     * @returns The registered action, if present.
     * @public
     */
    public resolve(id: string): IViewItemAction | undefined {
        return this._byId.get(id);
    }
}
