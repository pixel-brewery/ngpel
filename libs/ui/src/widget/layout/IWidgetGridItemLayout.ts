/**
 * The persisted placement of one widget: where the user put it, how large they made it and whether
 * they kept it visible.
 *
 * @public
 */
export interface IWidgetGridItemLayout {
    // #region Properties

    /**
     * The id of the widget this placement belongs to.
     */
    readonly widgetId: string;

    /**
     * The id of the zone the widget sits in.
     */
    readonly zoneId: string;

    /**
     * The zero-based position within the zone. Reconciliation normalizes it per zone.
     */
    readonly order: number;

    /**
     * The number of grid columns the widget spans, clamped to the widget's own constraints.
     */
    readonly columnSpan: number;

    /**
     * The number of grid rows the widget spans, clamped to the widget's own constraints.
     */
    readonly rowSpan: number;

    /**
     * Whether the user keeps the widget visible. A hidden widget keeps its placement, so showing
     * it again puts it back where it was.
     */
    readonly enabled: boolean;

    // #endregion
}
