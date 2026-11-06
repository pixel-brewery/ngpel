// #region Imports

import type { IWidgetGridZoneLayout } from '../IWidgetGridZoneLayout';

// #endregion

/**
 * Orders persisted zones by their stored position and breaks ties by zone id.
 *
 * @param left The left zone.
 * @param right The right zone.
 * @returns A negative number, zero or a positive number, as `Array.prototype.sort` expects.
 */
export function compareZoneLayoutOrder(left: IWidgetGridZoneLayout, right: IWidgetGridZoneLayout): number {
    return left.order - right.order || left.zoneId.localeCompare(right.zoneId);
}
