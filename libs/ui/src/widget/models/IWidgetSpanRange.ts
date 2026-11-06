/**
 * The supported span range of one widget axis together with the span it starts out with. The same
 * shape describes a contributed {@link IWidgetLayout} and a reconciled
 * {@link IWidgetGridItemDefinition}, so a widget declares its constraints exactly once.
 *
 * @public
 */
export interface IWidgetSpanRange {
    // #region Properties

    /**
     * The span used until a persisted layout overrides it.
     */
    readonly default: number;

    /**
     * The smallest span the widget still renders correctly at.
     */
    readonly min: number;

    /**
     * The largest span the widget may grow to.
     */
    readonly max: number;

    // #endregion
}
