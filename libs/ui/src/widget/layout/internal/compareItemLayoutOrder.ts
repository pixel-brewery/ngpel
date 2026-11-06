// #region Imports

import type { IWidgetGridItemLayout } from '../IWidgetGridItemLayout';

// #endregion

/**
 * Orders persisted placements by their stored position and breaks ties by widget id.
 *
 * @param left The left placement.
 * @param right The right placement.
 * @returns A negative number, zero or a positive number, as `Array.prototype.sort` expects.
 */
export function compareItemLayoutOrder(left: IWidgetGridItemLayout, right: IWidgetGridItemLayout): number {
    return left.order - right.order || left.widgetId.localeCompare(right.widgetId);
}
