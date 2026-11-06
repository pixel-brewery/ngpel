// #region Imports

import type { DynamicFormGridSpan } from './DynamicFormGridSpan';
import type { DynamicFormGridStart } from './DynamicFormGridStart';

// #endregion

/**
 * Semantic placement of a field in a twelve-column grid.
 *
 * @public
 */
export interface IDynamicFormGridPlacement {
    /**
     * Number of columns occupied by the field.
     *
     * @public
     * @readonly
     */
    readonly span: DynamicFormGridSpan;

    /**
     * Optional one-based start column.
     *
     * @public
     * @readonly
     */
    readonly start?: DynamicFormGridStart;
}
