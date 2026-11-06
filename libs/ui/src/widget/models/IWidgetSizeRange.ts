/**
 * An inclusive span range used by one axis of an {@link IWidgetSizeCondition}. An omitted bound is
 * unconstrained.
 *
 * @public
 */
export interface IWidgetSizeRange {
    // #region Properties

    /**
     * The smallest matching span, inclusive.
     */
    readonly min?: number;

    /**
     * The largest matching span, inclusive.
     */
    readonly max?: number;

    // #endregion
}
