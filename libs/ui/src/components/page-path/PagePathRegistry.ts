import { computed, Injectable, type Signal, signal } from '@angular/core';
import type { IPagePathLevel } from './IPagePathLevel';

/** Resolves the latest mounted page path while retaining previous mounted declarations. @public */
@Injectable({ providedIn: 'root' })
export class PagePathRegistry {
    // #region Fields

    private readonly _declarations = signal<ReadonlyArray<{ readonly levels: Signal<ReadonlyArray<IPagePathLevel>> }>>([]);

    // #endregion

    // #region Properties

    /** The current declaration's live levels. */
    public readonly levels = computed<ReadonlyArray<IPagePathLevel>>(() => this._declarations().at(-1)?.levels() ?? []);

    // #endregion

    // #region Methods

    /**
     * Registers a page path until its owner releases it.
     * @param levels Live path supplied by the owning page.
     * @returns Releases this registration.
     */
    public register(levels: Signal<ReadonlyArray<IPagePathLevel>>): () => void {
        const declaration = { levels };
        this._declarations.update((declarations) => [...declarations, declaration]);

        return (): void => this._declarations.update((declarations) => declarations.filter((entry) => entry !== declaration));
    }

    // #endregion
}
