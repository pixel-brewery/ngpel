import type { IViewportClearanceReservation } from './IViewportClearanceReservation';
import type { ViewportClearanceEdge } from './ViewportClearanceEdge';
// #region Imports

import { computed, Injectable, signal, type Signal } from '@angular/core';

// #endregion

interface IViewportClearanceEntry {
    readonly id: number;
    readonly edge: ViewportClearanceEdge;
    readonly distance: number;
    readonly host: Element | null;
}

/**
 * Collects the screen areas, such as an open side panel or a session dock, that the floating surface keeps clear.
 * Overlapping reservations along one edge do not add up; a floating surface keeps clear of the widest one. A modal
 * full-screen surface opens its own layer: while it is open, only reservations inside it count, because everything
 * beneath it is covered anyway.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ViewportClearanceService {
    // #region Fields

    private readonly _entries = signal<ReadonlyArray<IViewportClearanceEntry>>([]);
    private readonly _layers = signal<ReadonlyArray<Element>>([]);
    private readonly _contentBlocks = signal(0);
    private readonly _bottom = computed(() => this.widest('bottom'));
    private readonly _right = computed(() => this.widest('right'));
    private readonly _blocked = computed(() => this._contentBlocks() > 0);
    private _nextId = 0;

    // #endregion

    // #region Properties

    /**
     * Distance from the bottom viewport edge that a floating surface keeps clear.
     *
     * @public
     * @readonly
     */
    public get bottom(): Signal<number> {
        return this._bottom;
    }

    /**
     * Distance from the right viewport edge that a floating surface keeps clear.
     *
     * @public
     * @readonly
     */
    public get right(): Signal<number> {
        return this._right;
    }

    /** Whether a content view needs the full viewport without a floating surface. */
    public get blocked(): Signal<boolean> {
        return this._blocked;
    }

    // #endregion

    // #region Methods

    /**
     * Starts an empty reservation along one edge.
     *
     * @param edge - Viewport edge the surface occupies.
     * @param host - Element that occupies the space; decides the layer the reservation belongs to.
     * @public
     */
    public reserve(edge: ViewportClearanceEdge, host: Element | null = null): IViewportClearanceReservation {
        const id = this._nextId++;
        this._entries.update((entries) => [...entries, { id, edge, distance: 0, host }]);

        return {
            update: (distance: number) => {
                const normalized = Number.isFinite(distance) ? Math.max(0, Math.round(distance)) : 0;
                this._entries.update((entries) =>
                    entries.map((entry) => (entry.id === id && entry.distance !== normalized ? { ...entry, distance: normalized } : entry)),
                );
            },
            release: () => this._entries.update((entries) => entries.filter((entry) => entry.id !== id)),
        };
    }

    /** Keeps a floating surface hidden while a dense content view is mounted. */
    public blockForContent(): () => void {
        this._contentBlocks.update((count) => count + 1);
        let released = false;
        return () => {
            if (released) return;
            released = true;
            this._contentBlocks.update((count) => Math.max(0, count - 1));
        };
    }

    /**
     * Opens a layer for a modal surface that covers everything beneath it.
     *
     * @param root - Root element of the modal surface.
     * @returns Closes the layer again.
     * @public
     */
    public openLayer(root: Element): () => void {
        this._layers.update((layers) => [...layers, root]);
        return () => this._layers.update((layers) => layers.filter((layer) => layer !== root));
    }

    private widest(edge: ViewportClearanceEdge): number {
        const topLayer = this._layers().at(-1);
        return this._entries().reduce(
            (widest, entry) =>
                entry.edge === edge && (topLayer === undefined || (entry.host !== null && topLayer.contains(entry.host)))
                    ? Math.max(widest, entry.distance)
                    : widest,
            0,
        );
    }

    // #endregion
}
