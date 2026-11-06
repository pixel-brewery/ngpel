// #region Imports

import type { DynamicFormOptionValue } from './DynamicFormOptionValue';

// #endregion

/**
 * Selectable option owned by the frontend dynamic form contract.
 *
 * @public
 */
export interface IDynamicFormOption {
    /**
     * Human-readable option label.
     *
     * @public
     * @readonly
     */
    readonly label: string;

    /**
     * Stable scalar option value.
     *
     * @public
     * @readonly
     */
    readonly value: DynamicFormOptionValue;

    /**
     * Whether the option cannot currently be selected.
     *
     * @public
     * @readonly
     */
    readonly disabled?: boolean;
}
