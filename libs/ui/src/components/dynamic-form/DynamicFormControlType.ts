/**
 * Supported renderer kinds for a dynamic form field.
 *
 * @public
 * @readonly
 */
export const DynamicFormControlType = {
    Text: 'text',
    Password: 'password',
    Email: 'email',
    Multiline: 'multiline',
    Number: 'number',
    Select: 'select',
    Boolean: 'boolean',
    Date: 'date',
    Link: 'link',
    Readonly: 'readonly',
} as const;
