/**
 * Resolved user-facing labels needed by the generic widget-grid editor.
 *
 * @public
 */
export interface IWidgetGridLabels {
    // #region Properties

    readonly editorTitle: string;
    readonly editorDescription: string;
    readonly reset: string;
    readonly show: string;
    readonly hide: string;
    readonly sizeConstraints: string;
    readonly minimumSize: string;
    readonly maximumSize: string;
    readonly emptyZone: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
    readonly dragWidget: string;
    readonly dragZone: string;
    readonly resizeWidget: string;
    readonly arrangeZone: string;
    readonly moveZoneEarlier: string;
    readonly moveZoneLater: string;
    /** Optional explanation shared by both zone move actions. */
    readonly moveZoneDescription?: string;
    readonly arrangeWidget: string;
    readonly moveWidgetEarlier: string;
    readonly moveWidgetLater: string;
    readonly moveWidgetToPreviousZone: string;
    readonly moveWidgetToNextZone: string;
    /** Optional explanation shared by the widget move actions. */
    readonly moveWidgetDescription?: string;
    readonly makeWidgetNarrower: string;
    readonly makeWidgetWider: string;
    readonly makeWidgetShorter: string;
    readonly makeWidgetTaller: string;
    /** Optional explanation shared by the widget resize actions. */
    readonly resizeWidgetDescription?: string;
    /** Optional explanation for hiding a widget. */
    readonly hideWidgetDescription?: string;

    // #endregion
}
