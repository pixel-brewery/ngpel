// #region Imports

import type { IWidgetSizeRange } from './IWidgetSizeRange';

// #endregion

/**
 * A size condition a widget template checks before it renders a density variant. Each axis is
 * either an exact span or an inclusive {@link IWidgetSizeRange}; an omitted axis is unconstrained.
 *
 * @public
 */
export interface IWidgetSizeCondition {
    // #region Properties

    /**
     * The matching column span, exact or ranged.
     */
    readonly columns?: number | IWidgetSizeRange;

    /**
     * The matching row span, exact or ranged.
     */
    readonly rows?: number | IWidgetSizeRange;

    // #endregion
}
