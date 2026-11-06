// #region Imports

import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import type { IViewMentionOption } from './IViewMentionOption';
import type { IViewMentionSource } from './IViewMentionSource';

// #endregion

/**
 * Tracks active presenter contributions and selects mentions for the current Angular route.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class ViewMentionRegistry {
    // #region Fields

    private readonly _sources: Set<IViewMentionSource> = new Set<IViewMentionSource>();
    private readonly _location: Location = inject(Location);

    // #endregion

    // #region Properties

    /**
     * Key of the most recently registered source matching the current route.
     *
     * @public
     * @readonly
     */
    public get activeViewKey(): string | null {
        return this.activeSource()?.viewKey ?? null;
    }

    // #endregion

    // #region Methods

    /**
     * Registers a source until its presenter releases it.
     *
     * @public
     * @param source The presenter-owned source to register.
     * @returns A callback that releases the registration.
     */
    public register(source: IViewMentionSource): () => void {
        this._sources.add(source);

        return (): void => {
            this._sources.delete(source);
        };
    }

    /**
     * Returns up to fifty current items whose labels contain the query, ignoring case.
     *
     * @public
     * @param query The label fragment to match.
     * @returns Matching resources from the source selected for the current route.
     */
    public items(query: string): ReadonlyArray<IViewMentionOption> {
        const source = this.activeSource();

        if (!source) {
            return [];
        }

        const normalized = query.trim().toLocaleLowerCase();

        return source
            .items()
            .filter((item) => item.label.toLocaleLowerCase().includes(normalized))
            .slice(0, 50);
    }

    /**
     * Selects the most recent contribution whose route prefix contains the current path.
     */
    private activeSource(): IViewMentionSource | undefined {
        const path = this._location.path().split('?')[0] ?? '';

        return [...this._sources].reverse().find((source) => path === source.routePrefix || path.startsWith(`${source.routePrefix}/`));
    }

    // #endregion
}
