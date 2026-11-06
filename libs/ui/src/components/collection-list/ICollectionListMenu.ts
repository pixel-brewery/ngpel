// #region Imports

import type { ICollectionListMenuOption } from './ICollectionListMenuOption';

// #endregion

/**
 * Dropdown menu displayed in a collection-list header.
 *
 * @public
 */
export interface ICollectionListMenu {
    /**
     * Stable menu identifier.
     *
     * @public
     * @readonly
     */
    readonly id: string;

    /**
     * Visible menu label.
     *
     * @public
     * @readonly
     */
    readonly label: string;

    /**
     * Ordered menu options.
     *
     * @public
     * @readonly
     */
    readonly options: ReadonlyArray<ICollectionListMenuOption>;

    /**
     * Optional summary of the active option.
     *
     * @public
     * @readonly
     */
    readonly subLabel?: string;

    /**
     * Optional stable test identifier.
     *
     * @public
     * @readonly
     */
    readonly testId?: string;
}
