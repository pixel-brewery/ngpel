/**
 * The span a widget grid item would take if the user released the resize handle now.
 *
 * @public
 */
export interface IWidgetGridResizePreview {
    // #region Properties

    /**
     * The previewed column span.
     *
     * @public
     * @readonly
     */
    readonly columnSpan: number;

    /**
     * The previewed row span.
     *
     * @public
     * @readonly
     */
    readonly rowSpan: number;

    // #endregion
}
