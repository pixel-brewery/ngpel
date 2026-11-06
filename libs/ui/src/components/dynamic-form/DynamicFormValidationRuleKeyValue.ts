// #region Imports

import type { DynamicFormValidationRuleKey } from './DynamicFormValidationRuleKey';

// #endregion

/**
 * Supported declarative dynamic-form validation rule key.
 *
 * @public
 */
export type DynamicFormValidationRuleKeyValue = (typeof DynamicFormValidationRuleKey)[keyof typeof DynamicFormValidationRuleKey];
