// #region Imports

import type { UrlTree } from '@angular/router';

// #endregion

/**
 * One recorded entry of the {@link NavigatorJournal}.
 *
 * @public
 */
export interface INavigatorJournalEntry {
    // #region Properties

    /**
     * The URL tree that was navigated to.
     */
    readonly urlTree: UrlTree;

    // #endregion
}
