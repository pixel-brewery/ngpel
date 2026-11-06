// #region Imports

import type { IWidgetGridItemLayout } from '../IWidgetGridItemLayout';
import type { IWidgetGridZoneLayout } from '../IWidgetGridZoneLayout';

// #endregion

/**
 * A structurally valid persisted layout of any schema version. It is what the runtime guards
 * establish before the codec decides whether the payload is current or has to be migrated.
 */
export interface IWidgetGridLayoutPayload {
    // #region Properties

    /**
     * The schema version the payload declares.
     */
    readonly version: number;

    /**
     * The persisted zone order.
     */
    readonly zones: ReadonlyArray<IWidgetGridZoneLayout>;

    /**
     * The persisted widget placements.
     */
    readonly items: ReadonlyArray<IWidgetGridItemLayout>;

    // #endregion
}
