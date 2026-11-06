// #region Imports

import type { IDynamicFormGridPlacement } from './IDynamicFormGridPlacement';

// #endregion

/**
 * Responsive semantic layout for a dynamic form field.
 *
 * @public
 */
export interface IDynamicFormFieldLayout {
    /**
     * Placement used without a breakpoint match.
     *
     * @public
     * @readonly
     */
    readonly base?: IDynamicFormGridPlacement;

    /**
     * Placement used on small viewports and wider.
     *
     * @public
     * @readonly
     */
    readonly small?: IDynamicFormGridPlacement;

    /**
     * Placement used on medium viewports and wider.
     *
     * @public
     * @readonly
     */
    readonly medium?: IDynamicFormGridPlacement;

    /**
     * Placement used on large viewports and wider.
     *
     * @public
     * @readonly
     */
    readonly large?: IDynamicFormGridPlacement;
}
