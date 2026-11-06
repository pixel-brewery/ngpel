// #region Imports

import type { LogicFn, PathKind } from '@angular/forms/signals';

// #endregion

/**
 * Static or context-dependent expected value accepted by {@link equalTo}.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TPathKind The kind of the validated path.
 */
export type EqualToReference<TValue, TPathKind extends PathKind = PathKind.Root> = TValue | LogicFn<TValue, TValue, TPathKind>;
