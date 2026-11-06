// #region Imports

import { InjectionToken } from '@angular/core';
import type { IWidgetData } from '../models/IWidgetData';

// #endregion

/**
 * The token a widget shell binds in the child injector of a rendered widget view, so the view can
 * read the payload its widget was registered with.
 *
 * @public
 */
export const WIDGET_DATA = new InjectionToken<IWidgetData>('NGPEL_WIDGET_DATA');
