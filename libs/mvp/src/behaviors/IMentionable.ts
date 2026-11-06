// #region Imports

import type { IViewMentionSource } from '../mentions/IViewMentionSource';

// #endregion

/**
 * Contract for a presenter that offers its loaded resources as context-aware mentions.
 *
 * @public
 */
export interface IMentionable {
    // #region Methods

    /**
     * Creates the source of mention options for the current view.
     *
     * @returns The source to register, or `null` when this presenter contributes no resources.
     */
    getViewMentionSource(): IViewMentionSource | null;

    // #endregion
}
