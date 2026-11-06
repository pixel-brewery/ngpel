// #region Imports

import { InjectionToken } from '@angular/core';
import type { IWidget } from '../models/IWidget';

// #endregion

/**
 * The multi-provider token every feature library contributes its widgets to. `provideWidget(...)`
 * collects the contributions and hands them to the {@link WidgetManager}; contribute through
 * `withWidgetItems(...)` rather than binding the token by hand.
 *
 * @public
 */
export const WIDGET = new InjectionToken<ReadonlyArray<IWidget>>('NGPEL_WIDGET');
