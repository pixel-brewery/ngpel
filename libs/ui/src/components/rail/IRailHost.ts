// #region Imports

import type { Signal } from '@angular/core';

// #endregion

/**
 * Coordinates declarative rail actions with independently declared rail content.
 *
 * @public
 */
export interface IRailHost {
    /**
     * Key of the currently visible rail content.
     *
     * @public
     * @readonly
     */
    readonly activeContentKey: Signal<string | null>;

    /** Whether the current layout presents rail content in a floating sheet. */
    readonly isFloating?: Signal<boolean>;
    /** Whether actions are presented as floating action buttons inside the drawer. */
    readonly usesFloatingActions?: Signal<boolean>;

    /**
     * Activates the rail content registered for the supplied key.
     *
     * @param target - Stable content key selected by a rail action.
     * @public
     */
    activateContent(target: string): void;

    /**
     * Indicates whether content is currently registered for a key.
     *
     * @param target - Stable content key to inspect.
     * @returns Whether matching rail content exists.
     * @public
     */
    hasContent(target: string): boolean;
}
