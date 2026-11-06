// #region Imports

import type { Type } from '@angular/core';
import type { IQuickCreateItem } from './IQuickCreateItem';
import type { IQuickCreateItemSource } from './IQuickCreateItemSource';

// #endregion

/**
 * Options for contributing contextual create actions.
 *
 * @public
 */
export interface IWithQuickCreateItemsOptions {
    /**
     * Stable unique id for this feature contribution.
     */
    readonly id: string;

    /**
     * Static quick-create items to contribute.
     */
    readonly items?: ReadonlyArray<IQuickCreateItem>;

    /**
     * Injectable classes that provide quick-create items dynamically.
     */
    readonly sources?: ReadonlyArray<Type<IQuickCreateItemSource>>;
}
