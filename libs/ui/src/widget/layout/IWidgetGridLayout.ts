// #region Imports

import type { IWidgetGridItemLayout } from './IWidgetGridItemLayout';
import type { IWidgetGridZoneLayout } from './IWidgetGridZoneLayout';
import type { WIDGET_GRID_LAYOUT_VERSION } from './WIDGET_GRID_LAYOUT_VERSION';

// #endregion

/**
 * The versioned user configuration of one widget grid: the order of its zones and the placement of
 * every widget the user has ever seen.
 *
 * Display text and widget payloads intentionally stay outside this contract — it is the only part
 * of a dashboard that is persisted, and it must survive renamed labels, new translations and
 * temporarily unavailable widgets.
 *
 * @public
 */
export interface IWidgetGridLayout {
    // #region Properties

    /**
     * The schema version of this payload.
     */
    readonly version: typeof WIDGET_GRID_LAYOUT_VERSION;

    /**
     * The persisted zone order.
     */
    readonly zones: ReadonlyArray<IWidgetGridZoneLayout>;

    /**
     * The persisted widget placements, including the ones whose widget is currently unavailable.
     */
    readonly items: ReadonlyArray<IWidgetGridItemLayout>;

    // #endregion
}
