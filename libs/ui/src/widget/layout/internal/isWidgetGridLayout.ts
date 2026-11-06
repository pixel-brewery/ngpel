// #region Imports

import type { IWidgetGridLayout } from '../IWidgetGridLayout';
import { WIDGET_GRID_LAYOUT_VERSION } from '../WIDGET_GRID_LAYOUT_VERSION';
import { isWidgetGridLayoutOfVersion } from './isWidgetGridLayoutOfVersion';

// #endregion

/**
 * Validates an untrusted persisted payload against the current schema version.
 *
 * @param value The untrusted payload.
 * @returns Whether the payload is a structurally valid layout of the current version.
 */
export function isWidgetGridLayout(value: unknown): value is IWidgetGridLayout {
    return isWidgetGridLayoutOfVersion(value, WIDGET_GRID_LAYOUT_VERSION);
}
