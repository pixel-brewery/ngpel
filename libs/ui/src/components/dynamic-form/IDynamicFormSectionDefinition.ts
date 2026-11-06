// #region Imports

import type { IDynamicFormFieldDefinition } from './IDynamicFormFieldDefinition';

// #endregion

/**
 * Visual section containing related dynamic form fields.
 *
 * @public
 */
export interface IDynamicFormSectionDefinition {
    /**
     * Stable section key.
     *
     * @public
     * @readonly
     */
    readonly key: string;

    /**
     * Optional section title.
     *
     * @public
     * @readonly
     */
    readonly title?: string;

    /**
     * Optional section description.
     *
     * @public
     * @readonly
     */
    readonly description?: string;

    /**
     * Fields rendered in their declared order.
     *
     * @public
     * @readonly
     */
    readonly fields: ReadonlyArray<IDynamicFormFieldDefinition>;
}
