// #region Imports

import type { LogicFn, PathKind } from '@angular/forms/signals';

// #endregion

/**
 * Static or context-dependent exclusive lower bound accepted by {@link dateAfter}. `null` disables
 * the bound.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 */
export type DateReference<TPathKind extends PathKind = PathKind.Root> = Date | null | LogicFn<Date | null, Date | null, TPathKind>;
