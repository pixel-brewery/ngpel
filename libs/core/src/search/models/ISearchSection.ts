// #region Imports

import type { ICommandItem } from './ICommandItem';
import type { ISearchResult } from './ISearchResult';
import type { SearchSectionLayout } from './SearchSectionLayout';

// #endregion

/**
 * A visual group of the search surface, produced by `SearchSession`. Sections are the rendering
 * unit; flattening them in order yields the keyboard navigation order.
 *
 * @public
 */
export interface ISearchSection {
    // #region Properties

    /**
     * Stable section identifier used for tracking and keyboard flattening.
     */
    readonly id: string;

    /**
     * Optional translation key for sections whose wording is owned by the application. The session
     * emits it for the command section when `ISearchConfig.commandSectionLabelKey` is configured.
     */
    readonly labelKey?: string;

    /**
     * Optional already-resolved label for sections named after provider-owned data.
     */
    readonly label?: string;

    /**
     * Layout of this section. Defaults to `'list'`.
     */
    readonly layout?: SearchSectionLayout;

    /**
     * Items displayed inside this section, in display order.
     */
    readonly items: ReadonlyArray<ICommandItem | ISearchResult>;

    // #endregion
}
