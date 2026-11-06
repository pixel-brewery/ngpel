// #region Imports

import type { Signal } from '@angular/core';
import type { Command } from '../commands/Command';

// #endregion

/**
 * Contract of the Pageable presenter behavior: the paging window a data query needs and the
 * command a paginator binds to.
 *
 * @public
 */
export interface IPageable {
    // #region Properties

    /**
     * Number of items to skip for the current page.
     */
    readonly skip: Signal<number>;

    /**
     * Number of items per page.
     */
    readonly take: Signal<number>;

    /**
     * Total number of items available, as reported by {@link IPageable.setTotal}.
     */
    readonly total: Signal<number>;

    /**
     * Current page, counted from one.
     */
    readonly currentPage: Signal<number>;

    /**
     * Command a paginator executes when the page changes.
     *
     * @remarks
     * Accepts a one-based page number, an object carrying a zero-based `pageIndex`, or a custom
     * event whose `detail` carries one. Anything else is ignored, so an unrecognised event cannot
     * move the presenter to an undefined page.
     */
    readonly pageChangedCommand: Command<unknown>;

    // #endregion

    // #region Methods

    /**
     * Runs after the page changed. Override to reload the data for the new window.
     *
     * @remarks
     * Public because TypeScript mixins cannot declare protected extension points. It is a subclass
     * extension point — do not call it from a template.
     */
    onPageChanged(): void;

    /**
     * Reports how many items exist in total.
     *
     * @param value The new total.
     */
    setTotal(value: number): void;

    /**
     * Returns to the first page, for example after a filter changed.
     */
    resetPage(): void;

    // #endregion
}
