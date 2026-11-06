/**
 * The data payload attached to one widget instance. A widget shell binds it into the child
 * injector of the rendered view under `WIDGET_DATA`, which is how a view reads what its widget was
 * configured with without the registry knowing the payload's shape.
 *
 * @public
 */
export interface IWidgetData {
    // #region Properties

    /**
     * The unique identifier of this payload.
     */
    readonly id: string;

    /**
     * Free-form payload entries owned by the contributing feature.
     */
    readonly [key: string]: unknown;

    // #endregion
}
