// #region Imports

import { InjectionToken, type Signal } from '@angular/core';
import type { IWidgetSize } from '../models/IWidgetSize';

// #endregion

/**
 * The token a widget shell binds to publish the logical grid size of the widget it renders,
 * including a live resize preview. A view reads it through `WidgetViewDirective` and adapts its
 * density to the space it actually has.
 *
 * @public
 */
export const WIDGET_SIZE = new InjectionToken<Signal<IWidgetSize>>('NGPEL_WIDGET_SIZE');
