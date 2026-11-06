// #region Imports

import { Injectable, signal, type Signal } from '@angular/core';
import type { IContentNavigationItem } from './IContentNavigationItem';

// #endregion

export type ContentNavigationScrollDirection = 'down' | 'up';

export interface IContentNavigationViewportState {
    readonly direction: ContentNavigationScrollDirection;
    readonly isAtEnd: boolean;
    readonly isAtStart: boolean;
}

interface IRegisteredContentNavigationItem {
    readonly item: Required<Pick<IContentNavigationItem, 'id' | 'label' | 'level'>> & Pick<IContentNavigationItem, 'order'>;
    readonly navigate?: () => void;
    readonly sequence: number;
}

/**
 * Route-scoped registry for stable in-page navigation destinations.
 *
 * @public
 */
@Injectable()
export class ContentNavigationContext {
    // #region Fields

    private readonly _activeItemId = signal<string | null>(null);
    private readonly _intersectingItemIds = new Set<string>();
    private readonly _items = signal<ReadonlyArray<IContentNavigationItem>>([]);
    private readonly _registrations = new Map<string, IRegisteredContentNavigationItem>();
    private _nextSequence = 0;

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /**
     * Registered destinations in their deterministic display order.
     *
     * @public
     * @readonly
     */
    public get items(): Signal<ReadonlyArray<IContentNavigationItem>> {
        return this._items.asReadonly();
    }

    /**
     * Identifier of the destination that currently represents the viewport.
     *
     * @public
     * @readonly
     */
    public get activeItemId(): Signal<string | null> {
        return this._activeItemId.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Marks a registered destination as the current viewport destination.
     *
     * Unknown identifiers are ignored because an observer callback can arrive
     * immediately after its routed content has been destroyed.
     *
     * @param id - Registered destination identifier.
     * @public
     */
    public activate(id: string): void {
        const normalizedId = id.trim();

        if (!this._registrations.has(normalizedId)) {
            return;
        }

        this._activeItemId.set(normalizedId);
    }

    /**
     * Activates a registered destination and invokes its owner-provided navigation behavior.
     *
     * @param id - Registered destination identifier.
     * @public
     */
    public navigate(id: string): void {
        const normalizedId = id.trim();
        const registration = this._registrations.get(normalizedId);

        if (!registration) {
            return;
        }

        this._activeItemId.set(normalizedId);
        registration.navigate?.();
    }

    /**
     * Registers one destination and returns an idempotent cleanup callback.
     *
     * @param item - Destination metadata supplied by the content owner.
     * @param navigate - Optional navigation behavior owned by the destination.
     * @returns Cleanup callback for the registration.
     * @public
     */
    public register(item: IContentNavigationItem, navigate?: () => void): () => void {
        const normalizedItem = this.normalize(item);

        if (this._registrations.has(normalizedItem.id)) {
            throw new Error(`Content navigation anchor "${normalizedItem.id}" is already registered.`);
        }

        this._registrations.set(normalizedItem.id, {
            item: normalizedItem,
            navigate,
            sequence: this._nextSequence,
        });
        this._nextSequence += 1;
        this.publish();

        let isRegistered = true;

        return (): void => {
            if (!isRegistered) {
                return;
            }

            isRegistered = false;
            this._intersectingItemIds.delete(normalizedItem.id);
            this._registrations.delete(normalizedItem.id);
            this.publish();
        };
    }

    /**
     * Synchronizes one destination's tracking-band intersection with the active outline item.
     *
     * @param id - Registered destination identifier.
     * @param isIntersecting - Whether the destination currently crosses the tracking band.
     * @param viewport - Current scroll direction and boundary state.
     * @public
     */
    public synchronizeIntersection(id: string, isIntersecting: boolean, viewport: IContentNavigationViewportState): void {
        const normalizedId = id.trim();

        if (!this._registrations.has(normalizedId)) {
            return;
        }

        if (isIntersecting) {
            this._intersectingItemIds.add(normalizedId);
        } else {
            this._intersectingItemIds.delete(normalizedId);
        }

        this.synchronizeViewport(viewport);
    }

    /**
     * Resolves the active destination from scroll boundaries, direction, and current intersections.
     *
     * @param viewport - Current scroll direction and boundary state.
     * @public
     */
    public synchronizeViewport(viewport: IContentNavigationViewportState): void {
        const items = this._items();

        if (items.length === 0) {
            return;
        }

        const firstItemId = items[0]?.id ?? null;

        if (viewport.isAtStart) {
            this._activeItemId.set(firstItemId);
            return;
        }

        if (viewport.isAtEnd) {
            this._activeItemId.set(items.at(-1)?.id ?? firstItemId);
            return;
        }

        const intersectingItems = items.filter((item) => this._intersectingItemIds.has(item.id));

        if (intersectingItems.length === 0) {
            return;
        }

        const activeItem = viewport.direction === 'down' ? intersectingItems.at(-1) : intersectingItems[0];
        this._activeItemId.set(activeItem?.id ?? firstItemId);
    }

    private normalize(item: IContentNavigationItem): IRegisteredContentNavigationItem['item'] {
        const id = item.id.trim();
        const label = item.label.trim();
        const level = item.level ?? 1;

        if (!/^[A-Za-z][A-Za-z0-9:_-]*$/.test(id)) {
            throw new Error('Content navigation anchor IDs must start with a letter and contain only safe URL characters.');
        }

        if (label.length === 0) {
            throw new Error('Content navigation labels must not be empty.');
        }

        if (!Number.isInteger(level) || level < 1 || level > 6) {
            throw new Error('Content navigation levels must be integers between one and six.');
        }

        if (item.order !== undefined && !Number.isFinite(item.order)) {
            throw new Error('Content navigation ordering values must be finite numbers.');
        }

        return {
            id,
            label,
            level,
            ...(item.order === undefined ? {} : { order: item.order }),
        };
    }

    private publish(): void {
        const registrations = [...this._registrations.values()].sort((left, right) => {
            const leftOrder = left.item.order ?? left.sequence;
            const rightOrder = right.item.order ?? right.sequence;

            return leftOrder - rightOrder || left.sequence - right.sequence;
        });

        const items = registrations.map((registration) => registration.item);
        this._items.set(items);

        if (items.some((item) => item.id === this._activeItemId())) {
            return;
        }

        this._activeItemId.set(items[0]?.id ?? null);
    }

    // #endregion
}
