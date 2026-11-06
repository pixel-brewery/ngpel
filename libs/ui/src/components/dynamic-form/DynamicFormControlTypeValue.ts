// #region Imports

import type { DynamicFormControlType } from './DynamicFormControlType';

// #endregion

/**
 * Union of supported dynamic form renderer kinds.
 *
 * @public
 */
export type DynamicFormControlTypeValue = (typeof DynamicFormControlType)[keyof typeof DynamicFormControlType];
