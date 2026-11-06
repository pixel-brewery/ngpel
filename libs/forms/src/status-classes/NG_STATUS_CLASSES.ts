// #region Imports

import type { SignalFormsConfig } from '@angular/forms/signals';

// #endregion

/**
 * The classic Angular status classes (`ng-touched`, `ng-dirty`, `ng-valid`, ...) expressed as Signal
 * Forms class predicates, so stylesheets written for reactive forms keep working:
 * `provideSignalFormsConfig({ classes: NG_STATUS_CLASSES })`.
 *
 * @public
 */
export const NG_STATUS_CLASSES: Readonly<NonNullable<SignalFormsConfig['classes']>> = {
    'ng-touched': (formField) => formField.state().touched(),
    'ng-untouched': (formField) => !formField.state().touched(),
    'ng-dirty': (formField) => formField.state().dirty(),
    'ng-pristine': (formField) => !formField.state().dirty(),
    'ng-valid': (formField) => formField.state().valid(),
    'ng-invalid': (formField) => formField.state().invalid(),
    'ng-pending': (formField) => formField.state().pending(),
};
