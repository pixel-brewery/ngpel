// #region Imports

import type { LogicFn, PathKind } from '@angular/forms/signals';

// #endregion

/**
 * Static or context-dependent minimum calendar date accepted by {@link calendarDateNotBefore}.
 * `null` disables the bound.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 */
export type CalendarDateReference<TPathKind extends PathKind = PathKind.Root> = Date | null | LogicFn<Date | null, Date | null, TPathKind>;
