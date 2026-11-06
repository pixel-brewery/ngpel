// #region Imports

import type { LogicFn, OneOrMany, PathKind, ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Shared configuration accepted by every ngpel Signal Forms validator: an optional message or a
 * custom error (mutually exclusive) plus an optional activation condition. Messages and errors may
 * be static values or `LogicFn`s evaluated against the field context, which is where a product
 * plugs in its translation service.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TPathKind The kind of the validated path (root, child or array item).
 */
export type SignalValidatorConfig<TValue, TPathKind extends PathKind = PathKind.Root> =
    | {
          /** Static message or context-dependent message resolver attached to the default error. */
          readonly message?: string | LogicFn<TValue, string, TPathKind>;
          readonly error?: never;
          /** Activation condition; the validator is skipped while it returns `false`. */
          readonly when?: LogicFn<TValue, boolean, TPathKind>;
      }
    | {
          /** Custom error (or errors) replacing the validator's default error shape. */
          readonly error?: OneOrMany<ValidationError> | LogicFn<TValue, OneOrMany<ValidationError>, TPathKind>;
          readonly message?: never;
          /** Activation condition; the validator is skipped while it returns `false`. */
          readonly when?: LogicFn<TValue, boolean, TPathKind>;
      };
