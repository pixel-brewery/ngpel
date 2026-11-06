/**
 * The logical size of a widget inside its owning grid, in grid cells. A shell publishes it under
 * `WIDGET_SIZE` so a widget view can adapt its density to the space it actually occupies.
 *
 * @public
 */
export interface IWidgetSize {
    // #region Properties

    /**
     * The number of grid columns the widget spans.
     */
    readonly columnSpan: number;

    /**
     * The number of grid rows the widget spans.
     */
    readonly rowSpan: number;

    // #endregion
}
