// #region Imports

import type { DynamicFormControlTypeValue } from './DynamicFormControlTypeValue';
import type { DynamicFormValue } from './DynamicFormValue';
import type { IDynamicFormFieldLayout } from './IDynamicFormFieldLayout';
import type { IDynamicFormLinkConfiguration } from './IDynamicFormLinkConfiguration';
import type { IDynamicFormOption } from './IDynamicFormOption';
import type { IDynamicFormValidationRule } from './IDynamicFormValidationRule';

// #endregion

/**
 * UI-owned definition of one dynamically rendered form field.
 *
 * @public
 */
export interface IDynamicFormFieldDefinition {
    /**
     * Stable field key used to address its value.
     *
     * @public
     * @readonly
     */
    readonly key: string;

    /**
     * Renderer kind selected by the UI.
     *
     * @public
     * @readonly
     */
    readonly controlType: DynamicFormControlTypeValue;

    /**
     * Human-readable field label.
     *
     * @public
     * @readonly
     */
    readonly label: string;

    /**
     * Optional supporting description.
     *
     * @public
     * @readonly
     */
    readonly description?: string;

    /**
     * Optional empty-input hint.
     *
     * @public
     * @readonly
     */
    readonly placeholder?: string;

    /**
     * Whether a non-empty value is required.
     *
     * @public
     * @readonly
     */
    readonly required?: boolean;

    /**
     * Declarative validation rules owned and interpreted by the UI.
     *
     * @public
     * @readonly
     */
    readonly validationRules?: ReadonlyArray<IDynamicFormValidationRule>;

    /**
     * Whether an otherwise editable renderer is locked.
     *
     * @public
     * @readonly
     */
    readonly isReadonly?: boolean;

    /** Whether an optional field offers a clear action. Defaults to true. */
    readonly isClearable?: boolean;

    /**
     * Initial value used when the value map has no matching key.
     *
     * @public
     * @readonly
     */
    readonly initialValue?: DynamicFormValue;

    /**
     * Choice options or display mappings for the field. Multiple-choice options use string values.
     *
     * @public
     * @readonly
     */
    readonly options?: ReadonlyArray<IDynamicFormOption>;

    /**
     * Responsive twelve-column placement.
     *
     * @public
     * @readonly
     */
    readonly layout?: IDynamicFormFieldLayout;

    /**
     * Initial row count for a multiline textbox.
     *
     * @public
     * @readonly
     */
    readonly multilineRows?: number;

    /**
     * Minimum accepted number.
     *
     * @public
     * @readonly
     */
    readonly minimum?: number;

    /**
     * Maximum accepted number.
     *
     * @public
     * @readonly
     */
    readonly maximum?: number;

    /** Whether a number field accepts only whole values. */
    readonly integer?: boolean;

    /**
     * Increment used by a number renderer.
     *
     * @public
     * @readonly
     */
    readonly step?: number;

    /**
     * Earliest accepted date.
     *
     * @public
     * @readonly
     */
    readonly minimumDate?: Date | string;

    /**
     * Latest accepted date.
     *
     * @public
     * @readonly
     */
    readonly maximumDate?: Date | string;

    /**
     * Label shown for a missing readonly value.
     *
     * @public
     * @readonly
     */
    readonly emptyValueLabel?: string;

    /**
     * Labels used by a read-only link renderer.
     *
     * @public
     * @readonly
     */
    readonly link?: IDynamicFormLinkConfiguration;
}
