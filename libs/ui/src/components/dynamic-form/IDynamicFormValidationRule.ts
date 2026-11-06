// #region Imports

import type { DynamicFormValidationRuleKeyValue } from './DynamicFormValidationRuleKeyValue';

// #endregion

/**
 * UI-owned declarative validation rule for a dynamic form field.
 *
 * @public
 */
export interface IDynamicFormValidationRule {
    /**
     * Stable rule key interpreted by the UI renderer.
     *
     * @public
     * @readonly
     */
    readonly key: DynamicFormValidationRuleKeyValue;

    /**
     * Optional numeric rule parameter, such as the maximum string length.
     *
     * @public
     * @readonly
     */
    readonly value?: number;

    /**
     * Optional localized validation message.
     *
     * @public
     * @readonly
     */
    readonly message?: string;
}
