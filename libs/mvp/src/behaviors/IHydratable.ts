// #region Imports

import type { Signal } from '@angular/core';
import type { HydrationOperation } from './HydrationOperation';

// #endregion

/**
 * Contract of the Hydratable presenter behavior: the one-time load that has to finish before the
 * View can show anything, kept apart from the ongoing loading state.
 *
 * @public
 */
export interface IHydratable {
    // #region Properties

    /**
     * Whether the presenter is still loading the data required for its initial presentation.
     */
    readonly isHydrating: Signal<boolean>;

    // #endregion

    // #region Methods

    /**
     * Creates the initial hydration operation. Override in presenters that need asynchronous
     * initial data.
     *
     * @remarks
     * Public because TypeScript mixins cannot declare protected extension points. It is a subclass
     * extension point — do not call it from a template.
     *
     * @returns The hydration operation, or `undefined` when no initial data is required.
     */
    onHydrate(): HydrationOperation;

    /**
     * Handles a hydration error the operation did not handle itself. Override when the presenter
     * has domain-specific recovery; the default rethrows.
     *
     * @param error The unhandled hydration error.
     */
    onHydrationError(error: unknown): void;

    // #endregion
}
